import * as Haptics from 'expo-haptics';
import { MotiImage, MotiText } from "moti";
import { Text, TouchableOpacity, View } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";
export default function page() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View className="flex-1 items-center gap-4 justify-center">
        <MotiImage
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            type: "timing",
            duration: 2000,
          }}


          source={require("../../assets/images/logo.png")} contentFit='contain' style={{ width: 300, height: 300 }} />

        <MotiText
          from={{
            opacity: 0,
            translateY: 30,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            type: "timing",
            duration: 1000,
          }}
          className="text-4xl text-white font-semibold"
        >
          Welcome
        </MotiText>
        <MotiText
          from={{
            opacity: 0,
            translateY: 40,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            type: "timing",
            duration: 1000,
          }}

          className="text-2xl text-gray-500 font-semibold">Your Super Productivity To-Do App</MotiText>
         
              <TouchableOpacity onPress={()=>{Haptics.selectionAsync()}} className="mt-30 flex items-center justify-center h-17 w-72 bg-[#191B1C] rounded-4xl">
          <Text className="font-semibold text-center text-white text-2xl">Next</Text>
        </TouchableOpacity>

      
      </View>
    </SafeAreaView>
  )
}