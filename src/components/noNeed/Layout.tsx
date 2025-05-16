import { router, Stack } from "expo-router";
import { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { PageContext } from "./pageContext";

export default function Layout() {
  const { selectedPage, setSelectedPage } = useContext(PageContext);

  return (
    <Stack
      screenOptions={{
        header: selectedPage === 'home' ? () => null : undefined,
        headerTitleAlign: 'center',
        headerTitle: () => (
          <TouchableOpacity onPress={() => {
            setSelectedPage('home');
            router.push('01-home');
          }}>
            <Text style={styles.headerTitle}>
              Traffic Pattern Maker
            </Text>
          </TouchableOpacity>
        ),
        headerBackground: () => (
          <Image
            source={require('../../../assets/header.png')}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'cover',
            }}
          />
        ),
      }}
    />
  );
}
const styles = StyleSheet.create({
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    headerBackground: {
      backgroundColor: 'blue'
    }
})
