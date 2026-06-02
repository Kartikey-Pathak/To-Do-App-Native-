import { Stack } from "expo-router";
import { ToastProvider } from 'react-native-toast-notifications';
import "../global.css";
export default function RootLayout() {

  return <ToastProvider  duration={800}><Stack  screenOptions={{headerShown:false, animation:"slide_from_right"} } /></ToastProvider> ;
}
