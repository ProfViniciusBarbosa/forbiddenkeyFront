import React, { useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PrincipalNavegacao, SecundariaNavegacao, TerceiraNavegacao } from "../stack/SuperiorNav.tsx"; 

import COR from "../../assets/CSS/COR";
import inicio from '../../assets/icons/inicio.png';
import logado from '../../assets/icons/logado.png';
import deslogado from '../../assets/icons/deslogado.png';
import chave from '../../assets/icons/chave.png';
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

const InferiorNav = ({navigation}) => {

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
          <Tab.Screen name="Login" component={SecundariaNavegacao} initialParams={{navigation:navigation}} options={{
          tabBarLabel: 'Login',tabBarIcon: () => {
            return (<Image 
                style={{ width: 30, height: 30 }}
                source={deslogado}/>)}}}
                />
          <Tab.Screen name="Chaves" component={TerceiraNavegacao} options={{
          tabBarLabel: 'Chaves',tabBarIcon: () => {
            return (<Image
                style={{ width: 30, height: 30 }}
                source={chave}/>)}}}/>
          </Tab.Navigator>
      );
};

export default InferiorNav;