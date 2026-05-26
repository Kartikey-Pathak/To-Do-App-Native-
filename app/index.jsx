import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {

  const [is, setis] = useState(null);
  const [load,setload]=useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('welcome');
        if (value !== null) {
          setis(value);
        }
      } catch (e) {
        console.log(e);
      }finally{
        setload(false);
      }
    };

    getData();
  }, [])


  // Wait until storage check finishes
  if (load) {
    return null;
  }

  if (!is) {
    return <Redirect href="/welcome" />;
  }


  return (
    <Redirect href="/home" />
  );
}
