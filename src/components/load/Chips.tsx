import { router } from "expo-router"
import { useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import { Chip, Menu } from "react-native-paper"
import { removeData, saveData } from "../../seeds/cache"
import { FlightData, FlightPointData } from "../../types/types"

interface PropsType {
  setNum: React.Dispatch<React.SetStateAction<number>>
  cacheDatas: FlightData
  setOldName: React.Dispatch<React.SetStateAction<string>>
}
export default function Chips(prop:PropsType){
  const { setNum, cacheDatas, setOldName } = prop
  const [menuVisibilities, setMenuVisibilities] = useState<Record<string, boolean>>({})
  const openMenu = (key: string) => setMenuVisibilities(prev => ({ ...prev, [key]: true }))
  const closeMenu = (key: string) => setMenuVisibilities(prev => ({ ...prev, [key]: false }))

  function loadFun(data: FlightPointData) {
    saveData('NewData', data)
    router.replace('04-trafficPattern')
  }

  function deleteFun(key: string){
    Alert.alert(
      'DELETE',
      'Are you sure you want to delete this data?',
      [
        { text: 'Delete', onPress: ()=>{
          removeData(key)
          setNum(prev => prev + 1)
        }},
        { text: 'Cancel', style: 'cancel'}
      ]
    )
  }

  return (
    <View style={styles.chipsBox}>
      {Object.entries(cacheDatas).map(([key, data]) => {
        return (
          key !== 'NewData' &&

            <Menu
              key={key}
              visible={menuVisibilities[key] || false}
              onDismiss={()=>closeMenu(key)}
              anchor={
                <Chip
                  style={{margin: 4, backgroundColor: 'rgba(23, 109, 194, 0.28)'}}
                  onPress={()=>loadFun(data)}
                  onLongPress={()=>openMenu(key)}
                >
                  {key}
                </Chip>
              }
              contentStyle={{borderRadius: 24}}
            >
              <Text style={styles.menuHeader}>{key}</Text>
              <Menu.Item leadingIcon='reload' title="Load" onPress={()=>loadFun(data)} />
              <Menu.Item leadingIcon='pen' title="Edit" onPress={()=>{
                setOldName(key)
                closeMenu(key)
              }} />
              <Menu.Item leadingIcon='delete' title="Delete" onPress={()=>deleteFun(key)} />
            </Menu>

        )
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  chipsBox: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuHeader: {
    textAlign: 'center',
    color: 'gray',
  },
})

