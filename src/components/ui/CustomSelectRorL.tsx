import { Picker } from "@react-native-picker/picker"
import { View, Text, Alert } from 'react-native';

interface propsType {
  RorL: "R" | "L"
  setRorL: React.Dispatch<React.SetStateAction<"R" | "L">>
}
export default function CustomSelectRorL(prop: propsType){
  const {RorL, setRorL} = prop
  return (
    <View style={{ flexDirection: "row", alignItems: "center", height: 64}}>
      <Text style={{color: 'white'}}>
        R/L Side: 
      </Text>
      <Picker
        selectedValue={RorL}
        style={{ flex:1 }}
        onValueChange={async(value: 'R'|'L') => {
          setRorL(value)
        }}
      >
        {['R', 'L'].map(item => {
          return (
            <Picker.Item
              key={item}
              label={`${item} hand Pattern`}
              value={item}
              color="white"
              style={{ backgroundColor: '#00660080', textAlign: 'center'}}
            />
          )
        })}
      </Picker>
    </View>
  )
}
