import { latLng, latLngAltHdg } from "../types/types";

// 定数 ヘルパー関数
const ft_to_m = 0.3048;
const m_to_ft = 1 / 0.3048
const NM_to_m = 1852;
const m_to_NM = 1 / 1852
const ft_to_NM = 1 / 6076.115;
const NM_to_ft = 6076.115;
const kt_to_mps = 1852 / 3600
const deg_to_Radians = (degrees: number) => (degrees * Math.PI) / 180;
const Radians_to_deg = (radians: number) => (radians * 180) / Math.PI;

/*　2点間の距離をメートルで計算する　*/
function calculate_2points_distance_m(
    point1:{lat: number, lng: number},
    point2:{lat: number, lng: number}
) {
    const R = 6371e3; // 地球の半径 (メートル)
    const φ1 = deg_to_Radians(point1.lat);
    const φ2 = deg_to_Radians(point2.lat);
    const Δφ = deg_to_Radians(point2.lat - point1.lat);
    const Δλ = deg_to_Radians(point2.lng - point1.lng);
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

/* ある地点から距離と方位で別の地点の座標を計算する　*/
function createNewPoint (
    originPoint: {lat: number, lng: number},
    distance_NM: number,
    bearing_deg: number,
    varidation_deg: number,
) {
    const R = 6371e3; // 地球の半径 (メートル)
    const brad = deg_to_Radians(bearing_deg + varidation_deg);
    const distance_m = distance_NM * NM_to_m
    const angularDistance = distance_m / R;
    const lat1Rad = deg_to_Radians(originPoint.lat);
    const lng1Rad = deg_to_Radians(originPoint.lng);
    const lat2Rad = Math.asin(Math.sin(lat1Rad) * Math.cos(angularDistance) +
        Math.cos(lat1Rad) * Math.sin(angularDistance) * Math.cos(brad));

    const lng2Rad = lng1Rad + Math.atan2(
        Math.sin(brad) * Math.sin(angularDistance) * Math.cos(lat1Rad),
        Math.cos(angularDistance) - Math.sin(lat1Rad) * Math.sin(lat2Rad)
    );
    const lng2 = (lng2Rad + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

    return {
        lat: Radians_to_deg(lat2Rad),
        lng: Radians_to_deg(lng2),
    };
};

/*　指定高度におけるTASを計算する */
function calculateTAS (
    indicatedAirspeed_kt: number,
    altitude_ftMSL: number,
    temp_degC: number,
    QNH_inHg: number
){
    const QNH_to_hPa = QNH_inHg * 33.8639;
    const standardPressure_hPa = 1013.25;   // 標準海面気圧 (hPa)

    // 圧力高度 (Pressure Altitude) を計算 (フィート)
    const pressureALTft = (1 - Math.pow(QNH_to_hPa / standardPressure_hPa, 1 / 5.255876)) * 145366.45;

    // 近似式を使用 (圧力高度に基づいて温度を補正)
    const temperatureC = temp_degC - 0.00198 * altitude_ftMSL; // 地上気温を使用
    const standardTemperatureC = 15.04 - 0.0019812 * pressureALTft;
    const temperatureK = temperatureC + 273.15;
    const standardTemperatureK = standardTemperatureC + 273.15;

    // 気圧比と密度比を計算 (圧力高度を使用)
    const pressureRatio = Math.pow(QNH_to_hPa / standardPressure_hPa, 1 / 5.255876);
    const densityRatio = pressureRatio * (standardTemperatureK / temperatureK);

    // 真対気速度 (TAS) を計算
    const tas = indicatedAirspeed_kt * Math.sqrt(1 / densityRatio);
    return tas;
};

/* トラフィックパターンを描画するための座標と高度を計算する */
function calculateTrafficPattern (
    RorL: 'R' | 'L',
    DW_ALT_ft_MSL: number = 1500,
    DW_width_NM: number = 2.5,
    DW_IAS_kt: number,
    apch_IAS_kt: number,
    distance_to_base_NM: number = 2.5,
    metarTemp: number = 15,
    metarQNH: number = 29.92,
    touchdownpoint: {
        lat: number,
        lng: number,
        elevation: number,
        finalApproachCourse: number,
        varidation: number,
        distanceFromThreshold: number
    }
) {
    // Threshold
    const ThresholdPointLatLng = createNewPoint(
        touchdownpoint,
        touchdownpoint.distanceFromThreshold * ft_to_NM,
        touchdownpoint.finalApproachCourse + 180,
        touchdownpoint.varidation
    )

    // abeamPoint
    const abeamDirection = RorL === 'R' ? touchdownpoint.finalApproachCourse + 90 : touchdownpoint.finalApproachCourse - 90
    const abeamPointLatLng = createNewPoint(
        ThresholdPointLatLng,
        DW_width_NM,
        abeamDirection,
        touchdownpoint.varidation
    )

    // abeamPointから2NM手前
    const beforeDownwindLatLng = createNewPoint(
        abeamPointLatLng,
        2,
        touchdownpoint.finalApproachCourse,
        touchdownpoint.varidation
    )

    // アプローチ速度Bank25度での旋回半径
    const apch_TAS_mps = calculateTAS(
        apch_IAS_kt,
        DW_ALT_ft_MSL,
        metarTemp,
        metarQNH
    ) * kt_to_mps;
    const standard_g = 9.80665;
    const turningRadius_m = Math.pow(apch_TAS_mps, 2) / (standard_g * Math.tan(deg_to_Radians(25)));

    // ベースターン開始地点
    const distance_to_base_m = distance_to_base_NM * NM_to_m;
    const baseTurnStartPointLatLng = createNewPoint(
        abeamPointLatLng,
        (distance_to_base_m - turningRadius_m) * m_to_NM,
        touchdownpoint.finalApproachCourse + 180,
        touchdownpoint.varidation
    );

    // ベースターンTOP地点
    const baseTurnTopPointLatLng = createNewPoint(
        baseTurnStartPointLatLng,
        turningRadius_m * m_to_NM,
        touchdownpoint.finalApproachCourse + 180,
        touchdownpoint.varidation
    )

    // ベースターン終了地点
    const baseDirection = RorL === 'R' ? touchdownpoint.finalApproachCourse - 90 : touchdownpoint.finalApproachCourse + 90
    const baseTurnEndPointLatLng = createNewPoint(
        baseTurnTopPointLatLng,
        turningRadius_m * m_to_NM,
        baseDirection,
        touchdownpoint.varidation
    )

    // ファイナルターン開始地点
    const DW_width_m = DW_width_NM * NM_to_m;
    const finalTurnStartPointLatLng = createNewPoint(
        baseTurnEndPointLatLng,
        (DW_width_m - turningRadius_m * 2) * m_to_NM,
        baseDirection,
        touchdownpoint.varidation
    )

    // ファイナルターンTOP地点
    const finalTurnTopPointLatLng = createNewPoint(
        finalTurnStartPointLatLng,
        turningRadius_m * m_to_NM,
        baseDirection,
        touchdownpoint.varidation
    )

    // ファイナルターン終了地点
    const finalTurnEndPointLatLng = createNewPoint(
        finalTurnTopPointLatLng,
        turningRadius_m * m_to_NM,
        touchdownpoint.finalApproachCourse,
        touchdownpoint.varidation
    )

    // ベースターン開始までの秒数を計算
    const meanTAS_kt = (
        calculateTAS(
            DW_IAS_kt,
            DW_ALT_ft_MSL,
            metarTemp,
            metarQNH
        ) + calculateTAS(
            apch_IAS_kt,
            DW_ALT_ft_MSL,
            metarTemp,
            metarQNH
        )) / 2;
    const TAS_mps = meanTAS_kt * kt_to_mps
    const abeamToBaseTurn_m = calculate_2points_distance_m(abeamPointLatLng, baseTurnStartPointLatLng);
    const secondsToTurn = abeamToBaseTurn_m / TAS_mps;



    // TDPからの距離
    const lengthFromFinalTurnEnd_NM = touchdownpoint.distanceFromThreshold * ft_to_NM + distance_to_base_NM - turningRadius_m * m_to_NM
    const turnDistance_m = 2 * Math.PI * turningRadius_m / 4; // Final Turn, Base Turn
    const turnDistance_NM = turnDistance_m * m_to_NM; // Final Turn, Base Turn
    const lengthFromFinalTurnStart_NM = lengthFromFinalTurnEnd_NM + turnDistance_NM
    const lengthFromBaseTurnEnd_NM = lengthFromFinalTurnStart_NM + DW_width_NM - 2 * turningRadius_m * m_to_NM
    const lengthFromBaseTurnStart_NM = lengthFromBaseTurnEnd_NM + turnDistance_NM
    const lengthFromAbeam_NM = lengthFromBaseTurnStart_NM + distance_to_base_NM - turningRadius_m * m_to_NM
    const lengthFromBeforeDW_NM = lengthFromAbeam_NM + 2

    // 指定高度からのTOD位置を計算
    function calculateDecentPointFrom(ALT: number){
        const altitudeToLose_ft = ALT; // 処理しなければならない高度ft
        const distanceToDescend_ft = altitudeToLose_ft / Math.tan(deg_to_Radians(3)); // 必要な距離ft
        const distanceToDescend_NM = distanceToDescend_ft * ft_to_NM; // 必要な距離NM

        // FinalにTOD
        if(distanceToDescend_NM <= lengthFromFinalTurnEnd_NM){
            return createNewPoint(
                touchdownpoint,
                distanceToDescend_NM,
                touchdownpoint.finalApproachCourse + 180,
                touchdownpoint.varidation
            )

        // Final Turn中にTOD
        } else if(distanceToDescend_NM <= lengthFromFinalTurnStart_NM){
            const distanceFromFinalTurnStartToTOD_m = (lengthFromFinalTurnStart_NM - distanceToDescend_NM) * NM_to_m
            const angleFromFinalTurnStart_rad = distanceFromFinalTurnStartToTOD_m / (turnDistance_m * 2);
            const angleFromFinalTurnStart_deg = angleFromFinalTurnStart_rad * 180 / Math.PI

            const innerPoint = createNewPoint(
                finalTurnStartPointLatLng,
                turningRadius_m * m_to_NM,
                touchdownpoint.finalApproachCourse,
                touchdownpoint.varidation
            )
            return createNewPoint(
                innerPoint,
                turningRadius_m * m_to_NM,
                RorL === 'R' ? touchdownpoint.finalApproachCourse + 180 + angleFromFinalTurnStart_deg : touchdownpoint.finalApproachCourse + 180 - angleFromFinalTurnStart_deg,
                touchdownpoint.varidation
            )

        // BaseにTOD
        } else if(distanceToDescend_NM <= lengthFromBaseTurnEnd_NM){
            const distanceFromBaseTurnEndToTOD_NM = lengthFromBaseTurnEnd_NM - distanceToDescend_NM
            return createNewPoint(
                baseTurnEndPointLatLng,
                distanceFromBaseTurnEndToTOD_NM,
                baseDirection,
                touchdownpoint.varidation
            )

        // Base Turn中にTOD
        } else if(distanceToDescend_NM <= lengthFromBaseTurnStart_NM){
            const distanceToBaseTurnStartToTOD_m = (lengthFromBaseTurnStart_NM - distanceToDescend_NM) * NM_to_m;
            const angleFromBaseTurnStart_rad = distanceToBaseTurnStartToTOD_m / turningRadius_m;
            const angleFromBaseTurnStart_deg = angleFromBaseTurnStart_rad * 180 / Math.PI;
            const innerPoint = createNewPoint(
                baseTurnEndPointLatLng,
                turningRadius_m * m_to_NM,
                touchdownpoint.finalApproachCourse,
                touchdownpoint.varidation
            )
            return createNewPoint(
                innerPoint,
                turningRadius_m * m_to_NM,
                RorL === 'R' ? touchdownpoint.finalApproachCourse + 90 + angleFromBaseTurnStart_deg : touchdownpoint.finalApproachCourse -90 - angleFromBaseTurnStart_deg,
                touchdownpoint.varidation
            )

        // Base Turn前にTOD
        } else if(distanceToDescend_NM > lengthFromBaseTurnStart_NM){
            const distanceFromAbeamToTOD_NM = distanceToDescend_NM - lengthFromBaseTurnStart_NM;
            return createNewPoint(
                baseTurnStartPointLatLng,
                distanceFromAbeamToTOD_NM,
                touchdownpoint.finalApproachCourse + 180,
                touchdownpoint.varidation
            )
        }
    }

    // TOD地点
    const TODPointLatLng = calculateDecentPointFrom(DW_ALT_ft_MSL - touchdownpoint.elevation)
    let agl1000LatLng: latLng | undefined = undefined
    if(DW_ALT_ft_MSL - touchdownpoint.elevation > 1000){
        agl1000LatLng = calculateDecentPointFrom(1000) // 1000ft AGL地点
    }
    const agl500LatLng = calculateDecentPointFrom(500) // 500ft AGL地点

    /*　高度計算 */
    function calcHeight(
        distance_NM: number,
        originHeight_ft: number
    ){
        const path3degree_rad = 3 * Math.PI / 180
        return distance_NM * NM_to_ft * Math.tan(path3degree_rad) + originHeight_ft
    }
    // それぞれの3度パス上の仮想高度
    const vElev_ft = touchdownpoint.elevation
    const vthereshold_ft = calcHeight(touchdownpoint.distanceFromThreshold * ft_to_NM, vElev_ft)
    const vfinalTurnEnd_ft = Math.min(calcHeight(lengthFromFinalTurnEnd_NM, touchdownpoint.elevation), DW_ALT_ft_MSL)
    const vfinalTurnStart_ft = Math.min(calcHeight(lengthFromFinalTurnStart_NM, touchdownpoint.elevation), DW_ALT_ft_MSL)
    const vbaseTurnEnd_ft = Math.min(calcHeight(lengthFromBaseTurnEnd_NM, touchdownpoint.elevation), DW_ALT_ft_MSL)
    const vbaseTurnStart_ft = Math.min(calcHeight(lengthFromBaseTurnStart_NM, touchdownpoint.elevation), DW_ALT_ft_MSL)
    const vabeam_ft = Math.min(calcHeight(lengthFromAbeam_NM, touchdownpoint.elevation), DW_ALT_ft_MSL)
    const vbeforeDW_ft = Math.min(calcHeight(lengthFromBeforeDW_NM, touchdownpoint.elevation), DW_ALT_ft_MSL)
    const vTOD_ft = DW_ALT_ft_MSL
    const v1000agl_ft = 1000 + vElev_ft
    const v500agl_ft = 500 + vElev_ft

    const ThresholdPoint = {
        lat: ThresholdPointLatLng.lat,
        lng: ThresholdPointLatLng.lng,
        alt: vthereshold_ft,
        heading: touchdownpoint.finalApproachCourse + touchdownpoint.varidation
    }
    const finalTurnEndPoint = {
        lat: finalTurnEndPointLatLng.lat,
        lng: finalTurnEndPointLatLng.lng,
        alt: vfinalTurnEnd_ft,
        heading: touchdownpoint.finalApproachCourse + touchdownpoint.varidation
    }
    const finalTurnStartPoint = {
        lat: finalTurnStartPointLatLng.lat,
        lng: finalTurnStartPointLatLng.lng,
        alt: vfinalTurnStart_ft,
        heading: RorL === 'R' ? touchdownpoint.finalApproachCourse - 90 + touchdownpoint.varidation : touchdownpoint.finalApproachCourse + 90 + touchdownpoint.varidation
    }
    const baseTurnEndPoint = {
        lat: baseTurnEndPointLatLng.lat,
        lng: baseTurnEndPointLatLng.lng,
        alt: vbaseTurnEnd_ft,
        heading: RorL === 'R' ? touchdownpoint.finalApproachCourse - 90 + touchdownpoint.varidation : touchdownpoint.finalApproachCourse + 90 + touchdownpoint.varidation
    }
    const baseTurnStartPoint = {
        lat: baseTurnStartPointLatLng.lat,
        lng: baseTurnStartPointLatLng.lng,
        alt: vbaseTurnStart_ft,
        heading: touchdownpoint.finalApproachCourse + touchdownpoint.varidation + 180
    }
    const abeamPoint = {
        lat: abeamPointLatLng.lat,
        lng: abeamPointLatLng.lng,
        alt: vabeam_ft,
        heading: touchdownpoint.finalApproachCourse + touchdownpoint.varidation + 180
    }
    const beforeDownwind = {
        lat: beforeDownwindLatLng.lat,
        lng: beforeDownwindLatLng.lng,
        alt: vbeforeDW_ft,
        heading: touchdownpoint.finalApproachCourse + touchdownpoint.varidation + 180
    }
    const TODPoint = {
        lat: TODPointLatLng?.lat,
        lng: TODPointLatLng?.lng,
        alt: vTOD_ft,
        heading: touchdownpoint.finalApproachCourse + touchdownpoint.varidation
    }
    const agl1000 = {
        lat: agl1000LatLng?.lat,
        lng: agl1000LatLng?.lng,
        alt: v1000agl_ft,
        heading: touchdownpoint.finalApproachCourse + touchdownpoint.varidation
    }
    const agl500 = {
        lat: agl500LatLng?.lat,
        lng: agl500LatLng?.lng,
        alt: v500agl_ft,
        heading: touchdownpoint.finalApproachCourse + touchdownpoint.varidation
    }

    return {
        touchdownpoint,
        ThresholdPoint,
        beforeDownwind,
        abeamPoint,
        baseTurnStartPoint,
        baseTurnTopPointLatLng,
        baseTurnEndPoint,
        finalTurnStartPoint,
        finalTurnTopPointLatLng,
        finalTurnEndPoint,
        TODPoint,
        agl1000,
        agl500,
        secondsToTurn
    };
};

// 曲線を作る関数（2次ベジエ）
function createArcPoints(
    start: latLngAltHdg,
    control: latLng,
    end: latLngAltHdg,
    steps = 20
){
    const arc: {latitude: number, longitude: number}[] = [];
    for (let t = 0; t <= 1; t += 1 / steps) {
      const x =
        Math.pow(1 - t, 2) * start.lng +
        2 * (1 - t) * t * control.lng +
        Math.pow(t, 2) * end.lng;
      const y =
        Math.pow(1 - t, 2) * start.lat +
        2 * (1 - t) * t * control.lat +
        Math.pow(t, 2) * end.lat;
      arc.push({latitude: y, longitude: x});
    }
    return arc;
}

export { m_to_ft, calculateTrafficPattern, createArcPoints }
