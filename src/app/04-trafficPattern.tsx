import { useEffect, useState } from "react";
import { loadData } from "../seeds/cache";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { createArcPoints } from "../seeds/units";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FlightPointData, latLngAltHdg } from "../types/types";
import { PaperProvider } from "react-native-paper";
import CustomDialog from "../components/ui/CustomDialog";
import TrafficPatternMap from "../components/template/TrafficPatternMap";
import ButtonBox from "../components/ui/ButtonBox";

export default function TrafficPattern() {
  const [loading, setLoading] = useState(true);
  const [touchdownPoint, setTouchdownPoint] = useState<latLngAltHdg | undefined>(undefined);
  const [data, setData] = useState<FlightPointData|undefined>(undefined)
  const [points, setPoints] = useState<latLngAltHdg[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number, longitude: number}[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [mapType, setMapType] = useState<'satellite' | 'hybrid' | 'standard'>('hybrid')

  function showDialog () { setDialogVisible(true) }
  function hideDialog () { setDialogVisible(false) }
  function switchMapFun() {
    if (mapType === 'hybrid') { setMapType('satellite') }
    else if (mapType === 'satellite') { setMapType('standard') }
    else { setMapType('hybrid') }
  }

  // ①各座標の読み込み
  useEffect(() => {
    loadData('NewData')
    .then((res)=>{
      setTouchdownPoint({
        lat: res.touchdownpoint.lat,
        lng: res.touchdownpoint.lng,
        alt: res.touchdownpoint.elevation,
        heading: res.touchdownpoint.finalApproachCourse
      });
      setData(res)
    })
  }, []);

  // ②データ取得後、各データを使えるように加工
  useEffect(() => {
    if(data && touchdownPoint){
      // ポイント一覧を作成
      setPoints([
        data.abeamPoint,
        data.baseTurnStartPoint,
        data.baseTurnEndPoint,
        data.finalTurnStartPoint,
        data.finalTurnEndPoint,
        data.ThresholdPoint,
        touchdownPoint,
        data.TODPoint,
        ...(data.agl1000.lat !== undefined ? [data.agl1000] : []),
        data.agl500,
      ]);
      // 経路（曲線込み）を作成
      setRouteCoordinates([
        { latitude: data.beforeDownwind.lat, longitude: data.beforeDownwind.lng },
        { latitude: data.abeamPoint.lat, longitude: data.abeamPoint.lng },
        { latitude: data.baseTurnStartPoint.lat, longitude: data.baseTurnStartPoint.lng },
        ...createArcPoints(data.baseTurnStartPoint, data.baseTurnTopPointLatLng, data.baseTurnEndPoint),
        { latitude: data.baseTurnEndPoint.lat, longitude: data.baseTurnEndPoint.lng },
        { latitude: data.finalTurnStartPoint.lat, longitude: data.finalTurnStartPoint.lng },
        ...createArcPoints(data.finalTurnStartPoint, data.finalTurnTopPointLatLng, data.finalTurnEndPoint),
        { latitude: data.finalTurnEndPoint.lat, longitude: data.finalTurnEndPoint.lng },
        { latitude: touchdownPoint.lat, longitude: touchdownPoint.lng }
      ]);
    }
  }, [touchdownPoint, data]);

  // 読み込みと加工が終えたら表示する。読み込み中はローディング表示
  useEffect(() => {
    if(points.length > 0 && routeCoordinates.length > 0){
      setLoading(false);
    }
  }, [points,routeCoordinates]);
  if (loading) {
    return (
      <View style={styles.page}>
        <ActivityIndicator size="large" color="#0000ff"/>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <View style={styles.page}>

          {/* MAP */}
          <TrafficPatternMap
            points={points}
            routeCoordinates={routeCoordinates}
            touchdownPoint={touchdownPoint}
            data={data}
            mapType={mapType}
          />

          {/* ボタン類 */}
          <ButtonBox
            showDialog={showDialog}
            data={data}
            switchMapFun={switchMapFun}
          />

          {/* Save画面ダイアログ */}
          {dialogVisible &&
            <CustomDialog hideDialog={hideDialog} data={data}/>
          }

        </View>
      </PaperProvider>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  page: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})
