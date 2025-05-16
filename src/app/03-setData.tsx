import { ScrollView, View } from "react-native"
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { router } from "expo-router";

import SelectOne from "../components/setData/01-SelectOne";
import SetAirportAndRwy from "../components/setData/02-SetAirportAndRwy";
import { touchdownType } from "../types/types";
import SetConfig from "../components/setData/03-SetConfig";
import { calculateTrafficPattern } from "../seeds/units";
import { saveData } from "../seeds/cache";
import BackgroundMovie from "../components/template/BackgroundMovie";
import DraggableMenuButton from "../components/ui/DraggableMenuButton";

export default function setData(){
  const [checked, setChecked] = useState('');
  const [touchdown, setTouchdown] = useState<touchdownType | undefined>(undefined)
  const [RorL, setRorL] = useState<'R' | 'L'>('R')
  const [DW_ALT_ft_MSL, setDW_ALT_ft_MSL] = useState("1500")
  const [DW_width_NM, setDW_width_NM] = useState("2.5")
  const [DW_IAS_kt, setDW_IAS_kt] = useState("170")
  const [apch_IAS_kt, setApch_IAS_kt] = useState("140")
  const [distance_to_base_NM, setDistance_to_base_NM] = useState("2.5")
  const [metarTemp, setMetarTemp] = useState("15")
  const [metarQNH, setMetarQNH] = useState("29.92")
  const [allComplete, setAllComplete] = useState(false)

  // 全ての入力が完了したらキャッシュに保存して04へ移動
  useEffect(()=>{
    if(allComplete&&touchdown){
      const newData = calculateTrafficPattern(
        RorL,
        parseFloat(DW_ALT_ft_MSL),
        parseFloat(DW_width_NM),
        parseFloat(DW_IAS_kt),
        parseFloat(apch_IAS_kt),
        parseFloat(distance_to_base_NM),
        parseFloat(metarTemp),
        parseFloat(metarQNH),
        touchdown
      )
      saveData('NewData', newData)
      .then(()=>{
        console.log('Data saved successfully!')
        router.replace('/04-trafficPattern')
      })

    }
  }, [allComplete])

  return (
    <GestureHandlerRootView>
      <BackgroundMovie select='movie2'>
        <ScrollView style={{width: '100%', padding: 32, marginVertical: 64}}>

          {/* 1 ４レターかカスタム入力か選ぶ */}
          <SelectOne
            checked={checked}
            setChecked={setChecked}
          />

          {/* 2 ４レター入力とカスタム入力　*/}
          <SetAirportAndRwy
            checked={checked}
            touchdown={touchdown}
            setTouchdown={setTouchdown}
          />

          {/* 3 各種パラメータの設定 */}
          <SetConfig
            touchdown={touchdown}
            RorL={RorL}
            setRorL={setRorL}
            DW_ALT_ft_MSL={DW_ALT_ft_MSL}
            setDW_ALT_ft_MSL={setDW_ALT_ft_MSL}
            DW_width_NM={DW_width_NM}
            setDW_width_NM={setDW_width_NM}
            distance_to_base_NM={distance_to_base_NM}
            setDistance_to_base_NM={setDistance_to_base_NM}
            DW_IAS_kt={DW_IAS_kt}
            setDW_IAS_kt={setDW_IAS_kt}
            apch_IAS_kt={apch_IAS_kt}
            setApch_IAS_kt={setApch_IAS_kt}
            metarTemp={metarTemp}
            setMetarTemp={setMetarTemp}
            metarQNH={metarQNH}
            setMetarQNH={setMetarQNH}
            setAllComplete={setAllComplete}
          />

          <View style={{padding: 128}} />

        </ScrollView>
        <DraggableMenuButton onPress={()=>router.replace('01-home')} />
      </BackgroundMovie>
    </GestureHandlerRootView>
  )
}
