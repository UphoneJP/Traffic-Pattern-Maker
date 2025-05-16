import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FlightData } from "../types/types"
import { editName, loadAllData } from "../seeds/cache"
import BackgroundMovie from "../components/template/BackgroundMovie"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import DraggableMenuButton from "../components/ui/DraggableMenuButton"
import { router } from "expo-router"
import { PaperProvider } from "react-native-paper"
import { sortFun } from "../seeds/sortFun"
import Chips from "../components/load/Chips"

export default function Load(){
  const [cacheDatas, setCacheDatas] = useState<FlightData | undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const [num, setNum]= useState<number>(0)
  const [oldName, setOldName] = useState<string>('')
  const [newName, setNewName] = useState<string>('')
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)

  useEffect(()=>{
    loadAllData()
    .then((response)=>setCacheDatas(sortFun(response)))
    .catch(()=>Alert.alert('Error', 'Failed to load data from cache'))
  }, [num])

  useEffect(()=>{
    if(oldName) {
      setNewName(oldName)
      setDialogVisible(true)
    }
  }, [oldName])

  // load中の処理
  useEffect(()=>{
    if(cacheDatas)setLoading(false)
  }, [cacheDatas])
  if(loading || !cacheDatas){
    return (
      <View style={styles.home}>
        <Text>Loading...</Text>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{marginTop: 16}}
        />
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <PaperProvider>
        <BackgroundMovie select='movie1'>
          <View style={styles.home}>

            <Text style={styles.title}>
              Saved Data
            </Text>

            <Text style={styles.subtitle}>
              Tap or long press chip
            </Text>

            <Chips
              setNum={setNum}
              cacheDatas={cacheDatas}
              setOldName={setOldName}
            />

            {dialogVisible && (
              <TouchableOpacity
                style={styles.mask}
                onPress={()=>setDialogVisible(false)}
                key={`dialog${oldName}`}
              >

                <TouchableOpacity style={styles.dialog} onPress={()=>{}}>
                  <Text style={styles.dialogTitle}>Rename</Text>
                  <TextInput
                    value={newName}
                    onChangeText={text=> setNewName(text)}
                    style={styles.input}
                  />
                  <View style={styles.dialogAction}>
                    <TouchableOpacity onPress={()=>{
                      if(newName){
                        editName(oldName, newName)
                        .then(()=>{
                          setDialogVisible(false)
                          setOldName('')
                          setNewName('')
                          Alert.alert('Edit successfully!')
                          setNum(prev => prev + 1)
                        })
                        .catch(()=>{
                          Alert.alert('Error saving data')
                          setDialogVisible(false)
                        })
                      } else {
                        Alert.alert('input new name')
                      }
                    }}>
                      <Text style={{color: 'white', margin: 8}}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>setDialogVisible(false)}>
                      <Text style={{color: 'white', margin: 8}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
            )}

            <View style={{padding: 64}} />
          </View>
        </BackgroundMovie>

        {/* Backボタン */}
        <DraggableMenuButton
          onPress={()=>router.replace('01-home')}
          backgroundColor="rgba(23, 109, 194, 0.36)"
        />

      </PaperProvider>
    </GestureHandlerRootView>
  )
}
const styles = StyleSheet.create({
  home: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    padding: 64,
    position: 'relative'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    marginVertical: 8,
  },
  subtitle: {
    marginBottom: 32
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dialog: {
    backgroundColor: 'rgba(0, 114, 19, 0.70)',
    width: '80%',
    padding: 24,
    borderRadius: 16
  },
  dialogTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  },
  dialogAction: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'flex-end'
  },
  input: {
    width: '100%',
    paddingTop: 16,
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 24,
    marginBottom: 32,
  },
})
