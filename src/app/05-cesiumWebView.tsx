import { useRef } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import CustomHeader from '../components/template/CustomHeader';
import { useLocalSearchParams } from 'expo-router';
import Constants from 'expo-constants';

export default function App() {
  const { nameArrayStr, latArrayStr, lngArrayStr, altArrayStr, headingArrayStr, varidation } = useLocalSearchParams()
  const webViewRef = useRef<WebView>(null);
  const CESIUM_ION_TOKEN = Constants.expoConfig?.extra?.CESIUM_API_KEY

  // WebView がロードされた後にトークンを送信
  function handleWebViewLoad () {
    if (webViewRef.current) {
      const data = {
        type: 'cesiumToken',
        CESIUM_ION_TOKEN,
        nameArrayStr,
        latArrayStr,
        lngArrayStr,
        altArrayStr,
        headingArrayStr,
        varidation
      }
      webViewRef.current.postMessage(JSON.stringify(data));
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader />
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={ require('../../assets/cesiumView/cesium.html') }
        onLoad={handleWebViewLoad}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        style={{backgroundColor: 'black'}}
      />
    </View>
  );
}
