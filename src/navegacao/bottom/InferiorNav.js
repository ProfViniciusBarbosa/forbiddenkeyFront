import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrincipalNavegacao} from "../stack/SuperiorNav.js"; 

import COR from "../../assets/CSS/COR";
import inicio from '../../assets/icons/inicio.png';
import logadoIMG from '../../assets/icons/logado.png';
import deslogadoIMG from '../../assets/icons/deslogado.png';
import chave from '../../assets/icons/chave.png';
import { Image } from "react-native";
import TelaLogin from "../../telas/TelaLogin.js";
import TelaChaves from "../../telas/TelaChaves.js";

const Tab = createBottomTabNavigator();

export default function InferiorNav ({navigation}){

  const [varTempo,setVarTempo] = useState(0)

  const timer = setTimeout(() => {
    setVarTempo(varTempo+1)
  }, 1000);
  

  const [logado,setLogado] = useState(0);


  useEffect(()=>{
    async function PegaLogin(){
      const tipoDeLogin = await AsyncStorage.getItem('logado'); 
      if(tipoDeLogin == undefined || tipoDeLogin == null || tipoDeLogin == "false"){
        if(logado!=0){
            setLogado(0)
        }
      }
      else{
        if(logado!=1){
          setLogado(1)
      }
      }
    }
   PegaLogin();
   if(varTempo>9){
    setVarTempo(0)
   }
   return () => clearTimeout(timer);
  },[varTempo]) 

    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveBackgroundColor:COR.cinza,
            tabBarActiveTintColor:COR.branco,
            headerShown:false,
        }}>
          <Tab.Screen name="Destaques" component={PrincipalNavegacao} options={{
          tabBarLabel: 'Inicio',tabBarIcon: () => {
            return (<Image
                style={{ width: 30, height: 30 }}
                source={inicio}/>)}}}
          />
          <Tab.Screen name="Login" component={TelaLogin} initialParams={{navigation:navigation}} options={{
          tabBarLabel: 'Login',tabBarIcon: () => {
            return (<Image 
                style={{ width: 30, height: 30 }}
                source={logado == 0? deslogadoIMG : logadoIMG}/>)}}}
                />
          <Tab.Screen name="Chaves" component={TelaChaves} options={{
          tabBarLabel: 'Chaves',tabBarIcon: () => {
            return (<Image
                style={{ width: 30, height: 30 }}
                source={chave}/>)}}}/>
          </Tab.Navigator>
      );
};