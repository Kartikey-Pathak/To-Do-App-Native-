import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const [is, isnot] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('welcome');
        if (value !== null) {
        is=value;
        }
      } catch (e) {
        // error reading value
      }
    };
  }, [])

  if(!is){
    return <Redirect href="/welcome" />;

  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View className="flex-1 items-center justify-center bg-black">
        <Text className="text-red-700 text-5xl">
          Hello World !!
        </Text>
      </View>
    </SafeAreaView>
  );
}
