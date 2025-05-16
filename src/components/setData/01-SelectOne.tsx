import { StyleSheet, Text } from "react-native";
import CustomRadio from "../ui/CustomRadio";

interface propsType {
  checked: string
  setChecked: React.Dispatch<React.SetStateAction<string>>
}
export default function SelectOne(prop: propsType){
  const { checked, setChecked } = prop
  return (
    <>
      <Text style={styles.title}>1. Select One</Text>
      <CustomRadio
        checked={checked}
        setChecked={setChecked}
        label='Search by Airport ICAO 4 Letters'
        buttonName='icao'
      />
      <CustomRadio
        checked={checked}
        setChecked={setChecked}
        label='Set Airport Config by yourself'
        buttonName='custom'
      />
    </>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  }
})
