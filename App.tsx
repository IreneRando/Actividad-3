import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import {useFonts} from "expo-font";

import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'Poppins': require('./assets/fonts/Poppins-Medium.ttf')
  })

  if(!fontsLoaded && !error){
    return null
  }

  return (
    <>
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <SafeAreaView>
      <StatusBar style="auto" />
      </SafeAreaView>
    </>
  );
}
