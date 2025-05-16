export default{
  expo: {
    name: "Traffic Pattern Maker",
    slug: "Traffic Pattern Maker",
    scheme: "com.trafficpatternmaker",
    version: "1.0.1",
    orientation: "default",
    icon: "./assets/adaptive-icon.png",
    splash: {
      "image": "./assets/adaptive-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    userInterfaceStyle: "light",
    newArchEnabled: true,
    ios: {
      bundleIdentifier: "com.trafficpatternmaker",
      buildNumber: "1.0.1",
      supportsTablet: false,
      config: {
        googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY_FOR_IOS
      },
      usesAppleSignIn: true
    },
    android: {
      package: "com.trafficpatternmaker",
      versionCode: 1,
      permissions: [],
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      config: {
        googleMaps: {
          apiKey: process.env.GOOGLE_MAP_API_KEY_FOR_ANDROID
        }
      }
    },
    web: {
      favicon: "./assets/adaptive-icon.png"
    },
    androidStatusBar: {
      hidden: true
    },
    androidNavigationBar: {
      visible: "sticky-immersive"
    },
    plugins: [
      'expo-router',
    ],
    extra: {
      // eas: {
      //   projectId: process.env.PROJECT_ID
      // },
      GOOGLE_MAP_API_KEY_FOR_ANDROID: process.env.GOOGLE_MAP_API_KEY_FOR_ANDROID,
      GOOGLE_MAP_API_KEY_FOR_IOS: process.env.GOOGLE_MAP_API_KEY_FOR_IOS,
      CESIUM_API_KEY: process.env.CESIUM_API_KEY
    },
    "assetBundlePatterns": ["**/*"]
  }
}
