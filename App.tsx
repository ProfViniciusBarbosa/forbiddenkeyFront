import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import  InferiorNav  from './src/navegacao/bottom/InferiorNav';

function App (){


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
