import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Text, TouchableOpacity } from "react-native";

export default function TimePickerExample({ value,
  onChange }) {
  const [show, setShow] = useState(false);


  if (Platform.OS === "ios") {
    return (

      <DateTimePicker
        value={value}
        mode="time"
        is24Hour
        onChange={(e, date) => {
          if (date) onChange(date);
        }}
      />
    );
  }

  if (Platform.OS === "android") {
    return (
      <>
        <TouchableOpacity
          onPress={() => setShow(true)}
          className="bg-gray-500/30 flex items-center justify-center  backdrop-blur-3xl px-6 py-3 rounded-2xl"
        >
          <Text className="text-white font-semibold">
            {value.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={value}
            mode="time"
            is24Hour
            onChange={(e, date) => {
              setShow(false);

              if (date) onChange(date);
            }}
          />
        )}
      </>
    );
  }
}