import { ImageBackground, StyleSheet, View } from "react-native";

interface propsType {
  children: React.ReactNode
  select: string
}
export default function BackgroundImage({select, children}: propsType) {
  const background: { [key: string]: any } = {
    image0 : require('../../../assets/backgroundImage.jpeg'),

  }
  const url = background[select]
  
  return (
    <View style={styles.background}>
      <ImageBackground
        source={url}
        style={styles.background}
      >
        {children}
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  background: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
