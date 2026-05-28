import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import { MotiText } from "moti";
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
export default function page() {
    const [notify, setnotify] = useState(true);
    const [activedate, setactivedate] = useState(new Date());
    const [tasks,settasks]=useState([]);
    
  
    useEffect(()=>{
   console.log(Platform.OS);
    },[])

  const dates = useMemo(() => {   //hook that remembers (memoizes) a computed value between renders
    const arr = []; 

    for (let i = 0; i < 30; i++) {
        const date = new Date();

        date.setDate(date.getDate() + i);

        arr.push({
            id: String(i),
            fullDate: date,
            day: date.toLocaleDateString("en-US", {
                weekday: "short",
            }),
            date: date.getDate(),
            month: date.toLocaleDateString("en-US", {
                month: "short",
            }),
        });
    }

    return arr;
}, []);

    return (
        <View className=" flex-1 w-full pt-20 bg-black">
            <View className="relative w-full  flex flex-row items-center justify-center">

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
                    }} className=" text-white text-center text-4xl font-bold">Today's Tasks</MotiText>



                <TouchableOpacity onPress={async () => { await Haptics.selectionAsync(); setnotify(!notify) }} className=" absolute right-5">
                    <MotiText
                        from={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            type: "timing",
                            duration: 1000,
                        }}><Ionicons name={`${notify ? "notifications-circle-outline" : "notifications-off-circle-outline"}`} size={42} className=" text-white" /></MotiText>
                </TouchableOpacity>
            </View>

            <View className="flex items-start mt-10 justify-center w-full">
                <FlatList
                    data={dates}
                    horizontal
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 20 }}



                    renderItem={({ item }) => {
                        const isSelected =activedate.toDateString() === item.fullDate.toDateString();
                        return (
                            <TouchableOpacity onPress={async() => { await Haptics.selectionAsync(); setactivedate(item.fullDate); }} className={` p-6 rounded-4xl gap-3 w-26 ${isSelected ? "bg-[#D97706]" : null} flex items-center justify-center flex-col`}>
                                <Text className={` ${isSelected?"text-white":"text-[#495057]"}  `}>{item.month}</Text>
                                <Text className={`text-white font-semibold text-3xl`}>{item.date}</Text>
                                <Text className={`${isSelected?"text-white":"text-[#495057]"} `}>{item.day}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                   
                   <View className="w-full mt-10 flex items-center flex-row justify-between">
                   <Text className=" text-2xl ml-5 text-[#495057] font-bold ">Tasks: </Text>
                   <TouchableOpacity onPress={async() => { await Haptics.selectionAsync(); settasks(...tasks,tasks.push({title:"Add Title",status:"Progress",time:})) }} className=" mr-5"><Ionicons className=" text-white" size={42} name='add-circle-sharp' /></TouchableOpacity>
                   </View>

            </View>

            <ScrollView bounces={true} showsVerticalScrollIndicator={false} contentContainerStyle={{
          alignItems: "center",
          gap: 20,
          paddingTop:50,
          paddingBottom: 320,
        }}>
            {Platform.OS==="ios"?

                 <GlassView style={{height:190,width:350,borderRadius:40}} ></GlassView>
                
                :<View className="h-48 w-80 bg-gray-500"></View>

            }

            </ScrollView>



        </View>
    )
}
