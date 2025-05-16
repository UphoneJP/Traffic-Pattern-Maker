import { View } from "react-native"
import { router } from "expo-router";

import CustomButton from "../ui/CustomButton";
import BackgroundMovie from "../template/BackgroundMovie";

export default function LoadOrCreate(){

  return (
    <BackgroundMovie select='movie1'>
      <CustomButton
        label='Load previously created patterns'
        fun={()=>router.push('03-load')}
        color='skyblue'
      />
      <CustomButton
        label='Create New Pattern'
        fun={()=>router.push('04-setData')}
        color='green'
      />
      <View style={{padding: 64}} />
    </BackgroundMovie>
  )
}

