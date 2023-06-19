import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TelaInicial from '../../telas/TelaInicial';
import TelaCatalogo from '../../telas/TelaCatalogo';
import TelaLogin from '../../telas/TelaLogin';
import TelaCriarLogin from '../../telas/TelaCriarLogin';
import TelaChaves from '../../telas/TelaChaves';
import TelaJogo from '../../telas/TelaJogo';
import TelaCarinho from '../../telas/TelaCarrinho';
import TelaCartao from '../../telas/telaCartao';
import TelaConta from '../../telas/TelaConta';
import TelaCadastroJogo from '../../telas/TelaADMCadastraJogo';
import TelaPedidos from '../../telas/TelaPedidos';
import TelaPedidosAdm from '../../telas/TelaADMPedidos';
import TelaEditaJogo from '../../telas/TelaADMEditaJogo';


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
      <Stack.Screen name="Carrinho" component={TelaCarinho} />
      <Stack.Screen name="Cartao" component={TelaCartao} />
      <Stack.Screen name="Entrar" component={TelaLogin} />
      <Stack.Screen name="CriarLogin" component={TelaCriarLogin} />
      <Stack.Screen name="Conta" component={TelaConta} />
      <Stack.Screen name="Pedidos" component={TelaPedidos} />
      <Stack.Screen name="ADMPedidos" component={TelaPedidosAdm} />
      <Stack.Screen name="ADMCadastra" component={TelaCadastroJogo} />
      <Stack.Screen name="Chave" component={TelaChaves} />
      <Stack.Screen name="ADMEditaJogo" component={TelaEditaJogo} />


    </Stack.Navigator>
  );
}

const SecundariaNavegacao = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Entrar" component={TelaLogin} />
      <Stack.Screen name="Catalogo" component={TelaCatalogo} />
      <Stack.Screen name="Jogo" component={TelaJogo} />
      <Stack.Screen name="Carrinho" component={TelaCarinho} />
      <Stack.Screen name="Cartao" component={TelaCartao} />
      <Stack.Screen name="Iniciar" component={TelaInicial} />
      <Stack.Screen name="CriarLogin" component={TelaCriarLogin} />
      <Stack.Screen name="Conta" component={TelaConta} />
      <Stack.Screen name="Pedidos" component={TelaPedidos} />
      <Stack.Screen name="ADMPedidos" component={TelaPedidosAdm} />
      <Stack.Screen name="ADMCadastra" component={TelaCadastroJogo} />
      <Stack.Screen name="Chave" component={TelaChaves} />
      <Stack.Screen name="ADMEditaJogo" component={TelaEditaJogo} />
    </Stack.Navigator>
  );
}
const TerceiraNavegacao = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
  <Stack.Screen name="Chave" component={TelaChaves} />
      <Stack.Screen name="Catalogo" component={TelaCatalogo} />
      <Stack.Screen name="Jogo" component={TelaJogo} />
      <Stack.Screen name="Carrinho" component={TelaCarinho} />
      <Stack.Screen name="Cartao" component={TelaCartao} />
      <Stack.Screen name="Entrar" component={TelaLogin} />
      <Stack.Screen name="CriarLogin" component={TelaCriarLogin} />
      <Stack.Screen name="Conta" component={TelaConta} />
      <Stack.Screen name="Pedidos" component={TelaPedidos} />
      <Stack.Screen name="ADMPedidos" component={TelaPedidosAdm} />
      <Stack.Screen name="ADMCadastra" component={TelaCadastroJogo} />
      <Stack.Screen name="Iniciar" component={TelaInicial} />
      <Stack.Screen name="ADMEditaJogo" component={TelaEditaJogo} />
 
    </Stack.Navigator>
  );
}

export { PrincipalNavegacao , SecundariaNavegacao, TerceiraNavegacao  };