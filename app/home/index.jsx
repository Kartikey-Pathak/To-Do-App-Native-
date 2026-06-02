import { Ionicons } from '@expo/vector-icons';
import { GlassView } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import * as Notifications from 'expo-notifications';
import { MotiText, MotiView } from "moti";
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useToast } from "react-native-toast-notifications";
import TimePickerExample from "../../components/TimePickerExample";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function page() {
     const toast = useToast();
    const [selectedTime, setSelectedTime] = useState(new Date());  //for the notification...

    const [notify, setnotify] = useState(true);
    const [activedate, setactivedate] = useState(new Date());
    const [tasks, settasks] = useState([]);
    const [texts, settexts] = useState("");

    //Permission For Notifications...
    useEffect(() => {
        async function requestPermissions() {
            const { status } =
                await Notifications.requestPermissionsAsync();

            console.log(status);
        }

        requestPermissions();
    }, []);

    useEffect(() => {
        console.log(Platform.OS);
    }, [])


    async function scheduleTaskNotification(
        title,
        date
    ) {
        if (date <= new Date()) {
            alert("Please select a future time");
            return;
        };
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Task Reminder",
                body: title,
                sound: true,
            },

            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DATE,
                date,
            },
        });
    }

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

    //task filter based on the date 
    const filteredTasks = useMemo(() => {
        return tasks.filter(
            task => task.activeDate === activedate.toDateString()
        );
    }, [tasks, activedate]);


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
                    }} className=" text-white text-center text-4xl font-bold">Tasks</MotiText>



                <TouchableOpacity onPress={async () => {
                    await Haptics.selectionAsync(); const newNotify = !notify;

                    setnotify(newNotify);

                   toast.show(newNotify?"Notifications On":"Notifications Off");
                }} className=" absolute right-5">
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
                        const isSelected = activedate.toDateString() === item.fullDate.toDateString();
                        return (
                            <TouchableOpacity onPress={async () => { await Haptics.selectionAsync(); setactivedate(item.fullDate); }} className={` p-6 rounded-4xl gap-3 w-26 ${isSelected ? "bg-[#D97706]" : null} flex items-center justify-center flex-col`}>
                                <Text className={` ${isSelected ? "text-white" : "text-[#495057]"}  `}>{item.month}</Text>
                                <Text className={`text-white font-semibold text-3xl`}>{item.date}</Text>
                                <Text className={`${isSelected ? "text-white" : "text-[#495057]"} `}>{item.day}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />

                <View className="w-full mt-10 flex items-center flex-row justify-between">
                    <Text className=" text-2xl ml-5 text-[#495057] font-bold ">Tasks: </Text>
                    <TouchableOpacity onPress={async () => {
                        await Haptics.selectionAsync(); settasks(prev => [
                            ...prev,
                            {
                                id: Date.now().toString(),
                                title: "Add Title",
                                status: "Progress",
                                activeDate: activedate.toDateString(),
                                reminderTime: new Date(),
                            }
                        ]); console.log(tasks)
                    }} className=" mr-5"><Ionicons className=" text-white" size={42} name='add-circle-sharp' /></TouchableOpacity>
                </View>

            </View>

            {Platform.OS === "ios" ?

                <FlatList

                    data={filteredTasks}
                    vertical
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 20, gap: 50, alignItems: "center" }}

                    renderItem={({ item }) => {

                        return (

                            <MotiView
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
                                    duration: 250,
                                }}

                            >
                                <GlassView style={{ height: 190, width: 350, marginTop: 20, borderRadius: 40, display: 'flex', flexDirection: 'column' }} >
                                    <View className="h-full w-full flex flex-col p-10">
                                        <TextInput
                                            className="w-full h-28 font-semibold text-white text-3xl"
                                            multiline={true}

                                            onChangeText={(text) => {
                                                settasks(prev =>
                                                    prev.map(task =>
                                                        task.id === item.id ? { ...task, title: text } : task
                                                    )
                                                )

                                            }}
                                            value={item.title}
                                        />


                                        <View className=" flex flex-row justify-between items-center">
                                            <TouchableOpacity className=" w-12" onPress={() => {
                                                Haptics.selectionAsync(); settasks(prev =>
                                                    prev.filter(task => task.id !== item.id)
                                                );
                                            }}>
                                                <Ionicons size={40} name='remove-circle-outline' className="text-red-600" />
                                            </TouchableOpacity>
                                            {/* <Text className=" font-semibold text-white text-3xl">{item.title}</Text> */}


                                            <TimePickerExample value={item.reminderTime}
                                                onChange={async (date) => {
                                                    settasks(prev =>
                                                        prev.map(task =>
                                                            task.id === item.id
                                                                ? { ...task, reminderTime: date }
                                                                : task
                                                        )
                                                    );
                                                    const notificationDate = new Date(activedate);

                                                    notificationDate.setHours(
                                                        date.getHours()
                                                    );

                                                    notificationDate.setMinutes(
                                                        date.getMinutes()
                                                    );

                                                    notificationDate.setSeconds(0);

                                                    await scheduleTaskNotification(
                                                        item.title,
                                                        notificationDate
                                                    );
                                                }}
                                            />
                                        </View>

                                    </View>
                                </GlassView></MotiView>
                        )

                    }}
                />

                : 
                  <FlatList

                    data={filteredTasks}
                    vertical
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 20, gap: 50, alignItems: "center" }}

                    renderItem={({ item }) => {

                        return (

                            <MotiView
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
                                    duration: 250,
                                }}

                            >
                                <GlassView style={{ height: 190, width: 350, marginTop: 20, borderRadius: 40, display: 'flex', flexDirection: 'column' }} >
                                    <View className="h-full w-full flex flex-col p-10">
                                        <TextInput
                                            className="w-full h-28 font-semibold text-white text-3xl"
                                            multiline={true}

                                            onChangeText={(text) => {
                                                settasks(prev =>
                                                    prev.map(task =>
                                                        task.id === item.id ? { ...task, title: text } : task
                                                    )
                                                )

                                            }}
                                            value={item.title}
                                        />


                                        <View className=" flex flex-row justify-between items-center">
                                            <TouchableOpacity className=" w-12" onPress={() => {
                                                Haptics.selectionAsync(); settasks(prev =>
                                                    prev.filter(task => task.id !== item.id)
                                                );
                                            }}>
                                                <Ionicons size={40} name='remove-circle-outline' className="text-red-600" />
                                            </TouchableOpacity>
                                            {/* <Text className=" font-semibold text-white text-3xl">{item.title}</Text> */}


                                            <TimePickerExample value={item.reminderTime}
                                                onChange={async (date) => {
                                                    settasks(prev =>
                                                        prev.map(task =>
                                                            task.id === item.id
                                                                ? { ...task, reminderTime: date }
                                                                : task
                                                        )
                                                    );
                                                    const notificationDate = new Date(activedate);

                                                    notificationDate.setHours(
                                                        date.getHours()
                                                    );

                                                    notificationDate.setMinutes(
                                                        date.getMinutes()
                                                    );

                                                    notificationDate.setSeconds(0);

                                                    await scheduleTaskNotification(
                                                        item.title,
                                                        notificationDate
                                                    );
                                                }}
                                            />
                                        </View>

                                    </View>
                                </GlassView></MotiView>
                        )

                    }}
                />
                }





        </View>
    )
}
