import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';

interface propsType {
  label: string
  fun: () => void
  color?: string
  disabled?: boolean
}
export default function CustomButton(prop: propsType){
  const {label, fun, color="blue", disabled=false} = prop
  return (
    <TouchableOpacity style={{marginTop: 32}}>
      <Button
        onPress={fun}
        style={{backgroundColor: color}}
        labelStyle={{color: 'white', fontWeight: 'bold'}}
        mode="contained"
        disabled={disabled}
      >
        {label}
      </Button>
    </TouchableOpacity>
  )
}
