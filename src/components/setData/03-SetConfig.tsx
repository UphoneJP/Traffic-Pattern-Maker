import { StyleSheet, Text, View } from "react-native"
import { Divider } from "react-native-paper";

import CustomButton from "../ui/CustomButton";
import CustomInput from "../ui/CustomInput";
import CustomSelectRorL from "../ui/CustomSelectRorL";
import { touchdownType } from "../../types/types";

interface propsType {
  touchdown: touchdownType | undefined
  RorL: 'R' | 'L'
  setRorL: React.Dispatch<React.SetStateAction<'R' | 'L'>>
  DW_ALT_ft_MSL: string
  setDW_ALT_ft_MSL: React.Dispatch<React.SetStateAction<string>>
  DW_width_NM: string
  setDW_width_NM: React.Dispatch<React.SetStateAction<string>>
  distance_to_base_NM: string
  setDistance_to_base_NM: React.Dispatch<React.SetStateAction<string>>
  DW_IAS_kt: string
  setDW_IAS_kt: React.Dispatch<React.SetStateAction<string>>
  apch_IAS_kt: string
  setApch_IAS_kt: React.Dispatch<React.SetStateAction<string>>
  metarTemp: string
  setMetarTemp: React.Dispatch<React.SetStateAction<string>>
  metarQNH: string
  setMetarQNH: React.Dispatch<React.SetStateAction<string>>
  setAllComplete: React.Dispatch<React.SetStateAction<boolean>>
}
export default function SetConfig(prop: propsType) {
  const {
    touchdown,
    RorL,
    setRorL,
    DW_ALT_ft_MSL,
    setDW_ALT_ft_MSL,
    DW_width_NM,
    setDW_width_NM,
    distance_to_base_NM,
    setDistance_to_base_NM,
    DW_IAS_kt,
    setDW_IAS_kt,
    apch_IAS_kt,
    setApch_IAS_kt,
    metarTemp,
    setMetarTemp,
    metarQNH,
    setMetarQNH,
    setAllComplete
  } = prop

  return (
    <>
      {touchdown && (
        <>
          <Divider style={{marginVertical: 32}} />
          <Text style={styles.title}>
            3. Set Your Config
          </Text>

          <View style={styles.BoxBorder}>
            <Text style={styles.subtitle}>
              Set Your Config
            </Text>
            <CustomInput
              label='Downwind Altitude [ft MSL]'
              val={DW_ALT_ft_MSL}
              setVal={setDW_ALT_ft_MSL}
            />
            <CustomInput
              label='Downwind Width [NM]'
              val={DW_width_NM}
              setVal={setDW_width_NM}
            />
            <CustomInput
              label='Distance to Base [NM]'
              val={distance_to_base_NM}
              setVal={setDistance_to_base_NM}
            />
            <CustomInput
              label='Downwind IAS [kt]'
              val={DW_IAS_kt}
              setVal={setDW_IAS_kt}
            />
            <CustomInput
              label='Approach IAS [kt]'
              val={apch_IAS_kt}
              setVal={setApch_IAS_kt}
            />
            <CustomInput
              label='METAR TEMP [deg C]'
              val={metarTemp}
              setVal={setMetarTemp}
            />
            <CustomInput
              label='METAR QNH [inHg]'
              val={metarQNH}
              setVal={setMetarQNH}
            />
            <CustomSelectRorL
              RorL={RorL}
              setRorL={setRorL}
            />
          </View>

          <CustomButton
            label='calculate'
            fun={()=>setAllComplete(true)}
          />
        </>
      )}
    </>
  )
}
const styles = StyleSheet.create({
  BoxBorder: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 16,
    textDecorationLine: 'underline',
    color: 'white',
  }
})
