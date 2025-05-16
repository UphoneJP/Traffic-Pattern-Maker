import { Animated, StyleSheet, Text } from "react-native"
import React, { useContext, useEffect, useRef, useState } from 'react';
import { router } from "expo-router";

import CustomButton from "../components/ui/CustomButton";
import BackgroundMovie from "../components/template/BackgroundMovie";
import { PageContext } from "../components/noNeed/pageContext";

export default function Home(){
  const {setSelectedPage} = useContext(PageContext)
  const [start, setStart] = useState<boolean>(false)

  // アニメーション用の値
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  function startFun(){
    Animated.timing(fadeOutAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setStart(true); // フェードアウト完了後に state 更新
    });
  }

  // アニメーションの開始
  useEffect(() => {
    if (start) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          friction: 5,
          delay: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [start]);


  return (
    <BackgroundMovie select='movie0'>
      <Text style={styles.title}>
        Traffic Pattern Maker
      </Text>

      {start ? (
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <CustomButton
            label='Load previously created patterns'
            fun={()=>{
              setSelectedPage('other')
              router.push('02-load')
            }}
            color='skyblue'
          />
          <CustomButton
            label='Create New Pattern'
            fun={()=>{
              setSelectedPage('other')
              router.push('03-setData')
            }}
            color='green'
          />
        </Animated.View>
      ) : (
        <Animated.View
          style={{opacity: fadeOutAnim}}
        >
          <CustomButton
            label='  >> START <<  '
            fun={startFun}
          />
        </Animated.View>
      )}

    </BackgroundMovie>
  )
}
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white',
  }
})
