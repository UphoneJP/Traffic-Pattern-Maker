import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native'

interface propsType {
  label: string
  val: string
  setVal: React.Dispatch<React.SetStateAction<string>>
  state?: string
  setState?: React.Dispatch<React.SetStateAction<string>>
  keyboard?: 'default'|'ascii-capable'|'decimal-pad'
  placeholder?: string
  disabled?: boolean
  autofocus?: boolean
  customAirport?: boolean
}
export default function CustomInput(prop: propsType){
  const {label, val, setVal, state, setState, keyboard='decimal-pad', placeholder, disabled=false, autofocus=false, customAirport=false} = prop

  // 英大文字のみにフィルタリング
  const handleChangeText = (text: string) => {
    if(setState){
      setState(text)
      const filtered = text.toUpperCase().replace(/[^A-Z]/g, '')
      setVal(filtered)
    } else {
      setVal(text)
    }
  }

  return (
    <View>
      {disabled?(
        <>
          {customAirport &&
            <Text style={{color: 'white'}}>
              {label}
            </Text>
          }
          <Text style={{fontSize: 24, color: 'white'}}>
            {val}
          </Text>
        </>
      ):(
        <>
          <Text style={{color: 'white'}}>
            {label}
          </Text>
          <TextInput
            value={state ? state : val}
            onChangeText={handleChangeText}
            keyboardType={keyboard}
            placeholder={placeholder}
            placeholderTextColor={'#888888'}
            style={styles.input}
            autoFocus={autofocus}
            autoCapitalize='none'
          />
        </>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    color: 'white',
    fontSize: 24,
    marginBottom: 16,
  }
})
