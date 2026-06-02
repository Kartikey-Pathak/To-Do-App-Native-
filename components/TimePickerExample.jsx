import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Button, Platform } from "react-native";

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
        <Button
        className="bg-black/50 backdrop-blur-3xl"
          title={value.toLocaleTimeString()}
          onPress={() => setShow(true)}
        />

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