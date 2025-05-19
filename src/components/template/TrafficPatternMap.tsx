import { Platform, StyleSheet, Text, View } from "react-native"
import MapView, { Marker, Polyline } from "react-native-maps"
import { FlightPointData, latLngAltHdg } from "../../types/types"

interface PropsType {
  points: latLngAltHdg[]
  routeCoordinates: {latitude: number; longitude: number;}[]
  touchdownPoint: latLngAltHdg | undefined
  data: FlightPointData | undefined
  mapType: 'satellite' | 'hybrid' | 'standard'
}
export default function TrafficPatternMap(prop: PropsType){
  const { points, routeCoordinates, touchdownPoint, data, mapType } = prop

  if(!touchdownPoint || !data) { return <Text>Error</Text> }

  return (
    <MapView
      style={{ width: '100%', flex: 1 }}
      mapType={mapType}
      initialRegion={{
        latitude: touchdownPoint.lat || 35.6812,
        longitude: touchdownPoint.lng || 139.7671,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {points.map(point => {

        const withLabel = [
          touchdownPoint,
          data.abeamPoint,
          data.baseTurnStartPoint,
          data.TODPoint,
          ...(data.agl1000 !== undefined ? [data.agl1000] : []),
          data.agl500
        ].includes(point)

        return (
          Platform.OS === 'android' ? (

            // ANDROID用
            <Marker
              coordinate={{ latitude: point.lat, longitude: point.lng }}
              key={`${point.lat}-${point.lng}`}
              title={
                point === touchdownPoint ? 'Touchdown' :
                point === data.abeamPoint ? 'Abeam THR' :
                point === data.baseTurnStartPoint ? `${Math.floor(data.secondsToTurn)}s to Turn` :
                point === data.TODPoint ? 'TOD' :
                point === data.agl1000 ? '1000ft AGL' :
                point === data.agl500 ? '500ft AGL' : ''
              }
              pinColor={withLabel ? 'red' : 'blue'}
            />

          ) : (

            // IOS用表示
            <Marker
              coordinate={{ latitude: point.lat, longitude: point.lng }}
              key={`${point.lat}-${point.lng}`}
            >
              <View style={{ alignItems: 'center'}}>

                {/* ピン */}
                <View style={[styles.pointStyle, {backgroundColor: withLabel ? 'red' : 'blue'}]} />

                {/* ラベル表示 */}
                <View style={styles.mapTextBox}>
                  <Text style={styles.mapText}>
                    {
                      point === touchdownPoint ? 'Touchdown' :
                      point === data.abeamPoint ? 'Abeam THR' :
                      point === data.baseTurnStartPoint ? `${Math.floor(data.secondsToTurn)}s to Turn` :
                      point === data.TODPoint ? 'TOD' :
                      point === data.agl1000 ? '1000ft AGL' :
                      point === data.agl500 ? '500ft AGL' : ''
                    }
                  </Text>
                </View>

              </View>
            </Marker>

          )
        )
      })}
      {routeCoordinates.length > 1 && (
        <Polyline coordinates={routeCoordinates} strokeWidth={2} strokeColor="blue" />
      )}
    </MapView>
  )
}
const styles = StyleSheet.create({
  mapTextBox: {
    position: 'absolute',
    top: -20,
    width: 84,
    zIndex: 10
  },
  mapText: {
    fontSize: 12,
    textAlign: 'center',
    color: 'red'
  },
  pointStyle: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
})
