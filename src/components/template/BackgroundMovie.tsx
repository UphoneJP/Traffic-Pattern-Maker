import { StyleSheet, View } from "react-native";
import { ResizeMode, Video } from 'expo-av';

interface PropsType {
  children: React.ReactNode;
  select: string
}
export default function BackgroundMovie({children, select}: PropsType) {
  const background: { [key: string]: any } = {
    movie0 : require('../../../assets/movie0.mp4'),
    movie1 : require('../../../assets/movie1.mp4'),
    movie2 : require('../../../assets/movie2.mp4'),
  }
  const url = background[select]

  return (
    <View style={styles.container}>
      <Video
        source={url}
        rate={1.0}
        isMuted={true}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />

      {/* 半透明の白いオーバーレイ */}
      {select === 'movie2' && (
        <View style={styles.whiteOverlay} />
      )}

      {/* 子要素を表示 */}
      <View style={styles.overlay}>
        {children}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  whiteOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    // backgroundColor: 'rgba(0, 114, 19, 0.8)',
  },
  overlay: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
