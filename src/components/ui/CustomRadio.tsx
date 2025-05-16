import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { RadioButton } from 'react-native-paper';

interface propsType {
  checked: string
  setChecked: React.Dispatch<React.SetStateAction<string>>
  label: string
  buttonName: string
}
export default function CustomRadio(prop: propsType){
  const { checked, setChecked, label, buttonName } = prop;

  return (
      <TouchableOpacity
        style={styles.box}
        onPress={() => setChecked(buttonName)}
        key={buttonName}
      >
        <RadioButton
          value="icao"
          status={ checked === buttonName ? 'checked' : 'unchecked' }
          color="white"
          onPress={() => setChecked(buttonName)}
        />
        <Text style={[
          styles.text,
          {
            fontWeight: checked === buttonName ? 'bold' : 'normal',
            color: checked === '' || checked === buttonName ? 'white' : 'gray',
          },
        ]}>
          {label}
        </Text>
      </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  box: {
    flexDirection: 'row'
  },
  text: {
    alignSelf: 'center'
  }
})
