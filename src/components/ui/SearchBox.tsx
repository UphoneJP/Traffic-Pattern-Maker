import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import Constants from "expo-constants";
import { AntDesign } from '@expo/vector-icons';

interface propsType {
  getLatLng: ({ latitude, longitude }: { latitude: number; longitude: number; }) => void;
}
export default function SearchBox({ getLatLng }: propsType) {
  const [input, setInput] = useState('');
  const GOOGLE_API_KEY = Platform.OS === 'android' ?
    Constants.expoConfig?.extra?.GOOGLE_MAP_API_KEY_FOR_ANDROID
    : Constants.expoConfig?.extra?.GOOGLE_MAP_API_KEY_FOR_IOS;

  async function searchFun() {
    if (!input) return console.warn('場所を入力してください');
    const encodedAddress = encodeURIComponent(input);
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_API_KEY}&language=ja`
    );
    const data = await response.json();

    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      getLatLng({ latitude: lat, longitude: lng });
    } else {
      console.warn('場所が見つかりませんでした');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Input any airport or place"
        style={styles.input}
        value={input}
        onChangeText={text => setInput(text)}
      />
      <TouchableOpacity onPress={searchFun}>
        <Text style={styles.button}>
          <AntDesign name="search1" size={20} color="white" />
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 0,
    zIndex: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    backgroundColor: 'white',
    flex: 1
  },
  button: {
    color: 'white',
    borderRadius: 4,
    backgroundColor: '#ff0055',
    padding: 8,
    marginLeft: 4,
  },

});
