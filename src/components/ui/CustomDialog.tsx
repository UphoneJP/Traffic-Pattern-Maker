import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { saveData } from "../../seeds/cache"
import { useState } from "react"
import { FlightPointData } from "../../types/types"

interface PropsType {
  hideDialog: () => void
  data: FlightPointData | undefined
}
export default function CustomDialog(prop: PropsType){
  const { hideDialog, data} = prop
    const [newName, setNewName] = useState<string>('')
  return (
    <TouchableOpacity
      style={styles.mask}
      onPress={hideDialog}
    >
      <TouchableOpacity style={styles.dialog} onPress={()=>{}}>
        <Text style={styles.dialogTitle}>Name save</Text>
        <TextInput
          value={newName}
          onChangeText={text=> setNewName(text)}
          style={styles.input}
        />
        <View style={styles.dialogAction}>
          <TouchableOpacity onPress={()=>{
            if(data && newName){
              saveData(newName, data)
              .then(()=>{
                Alert.alert('Saved successfully!')
                hideDialog()
              })
              .catch((err)=>{
                console.log(err)
                Alert.alert('Error saving data')
                hideDialog()
              })
            } else {
              Alert.alert('input data name')
            }
          }}>
            <Text style={{color: 'white', margin: 8}}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hideDialog}>
            <Text style={{color: 'white', margin: 8}}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(0, 114, 19, 0.45)',
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
  }
})
