import { useRef } from "react"
import { Animated, TouchableOpacity, StyleSheet, Text } from "react-native"
import { PanGestureHandler, State } from "react-native-gesture-handler"
import { Ionicons } from "@expo/vector-icons"

interface PropsType {
  onPress: () => void
  backgroundColor?: string
}
export default function DraggableMenuButton({ onPress, backgroundColor="#00552250"}: PropsType) {

  const translateX = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(0)).current
  const lastOffset = useRef({ x: 0, y: 0 }).current

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: false }
  )

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      lastOffset.x += event.nativeEvent.translationX
      lastOffset.y += event.nativeEvent.translationY
      translateX.setOffset(lastOffset.x)
      translateY.setOffset(lastOffset.y)
      translateX.setValue(0) // リセット
      translateY.setValue(0) // リセット
    }
  }

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.buttonContainer,
          { transform: [{ translateX }, { translateY }] }
        ]}
      >
        <TouchableOpacity style={[styles.button, {backgroundColor: backgroundColor}]} onPress={onPress}>
          <Ionicons name="return-up-back-outline" size={32} color="white" />
          <Text style={styles.string}>BACK</Text>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    top: 64,
    right: 24
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  string: {
    color: 'white',
    marginTop: -8
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5
  }
})
