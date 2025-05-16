import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import MapView, { MapPressEvent, Marker } from "react-native-maps";
import SearchBox from "../ui/SearchBox";
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { latLngDelta } from "../../types/types";

const HANEDA_COORDS = {
  latitude: 35.55343641528788,
  longitude: 139.78658326242095,
  latitudeDelta: 0.1,
  longitudeDelta: 0.1,
};
interface propsType {
  setLng: React.Dispatch<React.SetStateAction<string>>
  setLat: React.Dispatch<React.SetStateAction<string>>
}
export default function SelectFromMap(prop: propsType) {
  const { setLng, setLat } = prop;
  const [region, setRegion] = useState<latLngDelta>(HANEDA_COORDS)
  const [marker, setMarker] = useState<{latitude: number, longitude: number} | null>(null);
  const [mapType, setMapType] = useState<'standard'|'satellite'|'hybrid'>('standard');
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    mapRef.current?.animateToRegion(region, 3000)
  }, [region])

  function getLatLng({ latitude, longitude }: { latitude: number; longitude: number }) {
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    })
  }

  function switchMapFun() {
    if (mapType === 'standard') {
      setMapType('satellite');
    } else if (mapType === 'satellite') {
      setMapType('hybrid');
    } else {
      setMapType('standard');
    }
  }

  function handleMapPress (e: MapPressEvent){
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
  };

  function setLatLngToData(){
    if(marker){
      setLat(marker.latitude.toString());
      setLng(marker.longitude.toString());
    }
  }

  return (
    <>
      {/* 検索バー */}
      <SearchBox
        getLatLng={getLatLng}
      />

      <View style={styles.page}>
        {/* 地図 */}
        <MapView
          ref={mapRef}
          style={styles.map}
          mapType={mapType}
          initialRegion={region}
          onPress={handleMapPress}
        >
          {marker && <Marker coordinate={marker} />}
        </MapView>

        {/* 下のボタン類 */}
        <View style={styles.buttonContainer}>

          {/* 緯度経度取得ボタン */}
          {marker ? (
            <TouchableOpacity onPress={setLatLngToData} style={{flex: 1}}>
              <Text style={styles.button}>
                GET MARKER LAT/LNG
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.button, {backgroundColor: 'gray', flex: 1}]}>
              Tap to set touchdown
            </Text>
          )}


          {/* map切り替えボタン */}
          <TouchableOpacity onPress={switchMapFun}>
            <View style={[styles.button, {backgroundColor: 'orange'}]}>
              {mapType === 'standard' ? (
                <>
                  <MaterialIcons name="satellite-alt" size={20} color="white" />
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.explanation}>Switch to</Text>
                    <Text style={styles.explanation}>Sattelite</Text>
                  </View>
                </>
              ) : mapType === 'satellite' ? (
                <>
                  <MaterialIcons name="satellite" size={20} color="white" />
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.explanation}>Switch to</Text>
                    <Text style={styles.explanation}>Hybrid</Text>
                  </View>
                </>
              ) : (
                <>
                  <Entypo name="map" size={20} color="white" />
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.explanation}>Switch to</Text>
                    <Text style={styles.explanation}>Standard</Text>
                  </View>
                </>
              )}
            </View>
          </TouchableOpacity>

        </View>

      </View>
    </>
  )
}
const styles = StyleSheet.create({
  page: {
    width: '100%',
    height: 400,
    marginBottom: 16,
    backgroundColor: '#F5FCFF'
  },
  mapBox: {
    width: '100%',
    height: 300,
    position: 'relative'
  },
  redCross: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    zIndex: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 24,
    padding: 10,
    width: '100%',
  },
  button: {
    color: 'white',
    borderRadius: 4,
    backgroundColor: 'blue',
    padding: 8,
    marginLeft: 4,
    textAlign: 'center',
    flexDirection: 'row',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  explanation: {
    fontSize: 6,
    color: 'white',
    margin: 0,
    padding: 0,
    alignSelf: 'center',
  }
});

