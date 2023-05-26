import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import  InferiorNav  from './src/navegacao/bottom/InferiorNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App (){

  useEffect(()=>{
    DeslogarSistema()
  },[])
  async function DeslogarSistema() {
    await AsyncStorage.setItem("logado","false")
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('tipoUser')
  }
  return(
  <>
    <NavigationContainer>
      <InferiorNav/>
    </NavigationContainer>

  </>
    
  )
}


const styles = StyleSheet.create({
  
});

export default App;
