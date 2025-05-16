import { router } from "expo-router"
import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Menu } from "react-native-paper"
import { FlightPointData } from "../../types/types"

interface PropsType {
  showDialog: () => void
  data: FlightPointData | undefined
  switchMapFun: () => void
}
export default function ButtonBox(prop: PropsType){
  const { showDialog, data, switchMapFun } = prop
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const [nameArrayStr, setNameArrayStr] = useState<string>('')
  const [latArrayStr, setLatArrayStr] = useState<string>('')
  const [lngArrayStr, setLngArrayStr] = useState<string>('')
  const [altArrayStr, setAltArrayStr] = useState<string>('')
  const [headingArrayStr, setHeadingArrayStr] = useState<string>('')

  useEffect(()=>{
    // 配列用を作成
    if(data){
      let points = [
        data.beforeDownwind,
        data.abeamPoint,
        data.baseTurnStartPoint,
        data.baseTurnEndPoint,
        data.finalTurnStartPoint,
        data.finalTurnEndPoint,
        data.agl500,
        data.ThresholdPoint
      ];
      points.sort((a, b) => {
        if (a.alt === b.alt) return 0; // altが同じ場合は、元の順序を維持するため0を返す
        return b.alt - a.alt; // 降順にソート
      })
      const name = points.map(point=>
        point === data.beforeDownwind ? 'Before Downwind' :
        point === data.abeamPoint? 'Abeam Threshold':
        point === data.baseTurnStartPoint? 'Start Base Turn':
        point === data.baseTurnEndPoint? 'Base Leg':
        point === data.finalTurnStartPoint? 'Start Final Turn':
        point === data.finalTurnEndPoint? 'On final':
        point === data.agl500? '500ft AGL':
        point === data.ThresholdPoint? 'Over Threshold': ''
      ).join('=')
      setNameArrayStr(name)
      setLatArrayStr(points.map(point=>point.lat).join('='))
      setLngArrayStr(points.map(point=>point.lng).join('='))
      setAltArrayStr(points.map(point=>point.alt).join('='))
      setHeadingArrayStr(points.map(point=>point.heading).join('='))
    }
  },[])

  return(
    <View style={styles.buttonBox}>
      {/* 左側Menuボタン */}
      <Menu
        visible={menuVisible}
        onDismiss={()=>setMenuVisible(false)}
        anchor={
          <TouchableOpacity onPress={()=>setMenuVisible(true)}>
            <Text style={[styles.CesiumButton, {backgroundColor: 'gray'}]}>Menu</Text>
          </TouchableOpacity>
        }
        contentStyle={{borderRadius: 24}}
      >
        <Menu.Item leadingIcon='home' title="Back to Home" onPress={()=>router.replace('01-home')}/>
        <Menu.Item leadingIcon='folder' title="Save this Data" onPress={()=>{
          showDialog()
          setMenuVisible(false)
        }}/>
        <Menu.Item leadingIcon='map' title="Change Map Style" onPress={switchMapFun}/>
      </Menu>

      {/* 右側CesiumButton */}
      <TouchableOpacity
        onPress={()=>router.replace({
          pathname: '05-cesiumWebView',
          params: {
            nameArrayStr,
            latArrayStr,
            lngArrayStr,
            altArrayStr,
            headingArrayStr,
            varidation: data?.touchdownpoint.varidation
          },
        })}
      >
        <Text style={styles.CesiumButton}>3D View</Text>
      </TouchableOpacity>

    </View>
  )
}
const styles = StyleSheet.create({
  buttonBox: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 16,
  },
  CesiumBox: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
  },
  CesiumButton: {
    backgroundColor: 'orange',
    color: 'white',
    padding: 16,
    borderRadius: 24,
    fontWeight: 'bold',
    // Android用の影スタイル
    textShadowColor: 'black',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    elevation: 5,
    // iOS用の影スタイル
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
})
