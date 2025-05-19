import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { router } from 'expo-router';
import {AntDesign} from '@expo/vector-icons';

export default function CustomHeader() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    !isLandscape &&
    <View style={[styles.headerContainer, {height: isLandscape? 40: 80}]}>
      <Video
        source={require('../../../assets/movie2.mp4')}
        rate={1.0}
        isMuted
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.overlay}>
        <View style={styles.row}>

          <TouchableOpacity
            onPress={()=>router.replace('04-trafficPattern')}
            style={styles.backButton}
          >
            <AntDesign name="back" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('01-home')}
          >
            <Text style={styles.title}>
              Traffic Pattern Maker
              <AntDesign name="home" size={20} color="white" />
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  row: {
    alignItems: 'center',
    marginBottom: 8,
    width: '100%'
  },
  backButton: {
    position: 'absolute',
    left: 32,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});

