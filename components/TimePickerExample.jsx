import DateTimePicker from '@react-native-community/datetimepicker';

export default function TimePickerExample({ value,
  onChange}) {
 

  return (
    <DateTimePicker
      value={value}
      mode="time"
      is24Hour={true}
      onChange={(event, date) => {
        if (date) {
          onChange(date);
        }
      }}
    />
  );
}