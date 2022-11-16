import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TelaInicial from '../../telas/TelaInicial';
import TelaCatalogo from '../../telas/TelaCatalogo';
import TelaLogin from '../../telas/TelaLogin';
import TelaCriarLogin from '../../telas/TelaCriarLogin';
import TelaChaves from '../../telas/TelaChaves';
import TelaJogo from '../../telas/TelaJogo';
import TelaDesenvolvedora from '../../telas/TelaDesenvolvedora';


const Stack = createStackNavigator();

const screenOptionStyle = {
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerShown: false,
};

const PrincipalNavegacao = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Iniciar" component={TelaInicial} />
      <Stack.Screen name="Catalogo" component={TelaCatalogo} />
      <Stack.Screen name="Jogo" component={TelaJogo} />
      <Stack.Screen name="Desenvolvedora" component={TelaDesenvolvedora} />

    </Stack.Navigator>
  );
}

const SecundariaNavegacao = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Entrar" component={TelaLogin} />
      <Stack.Screen name="CriarLogin" component={TelaCriarLogin} />
    </Stack.Navigator>
  );
}
const TerceiraNavegacao = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Chave" component={TelaChaves} />
    </Stack.Navigator>
  );
}

export { PrincipalNavegacao , SecundariaNavegacao, TerceiraNavegacao };