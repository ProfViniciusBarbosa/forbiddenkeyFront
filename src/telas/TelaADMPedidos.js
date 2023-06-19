import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import COR from '../assets/CSS/COR';
import axios from 'axios';
import Config from '../assets/mocks/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TelaPedidosAdm() {
  const [status, setStatus] = useState('[]');
  const [openStatus, setOpenStatus] = useState(false);

  const [temItens,setTemItens] = useState(false);

  const [orders, setOrdes] = useState([{}]);

  const [produtos, setProdutos] = useState([{}]);

  const [itensStatus, setItensStatus] = useState([
    { label: 'CANCELADO', value: '1' },
    { label: 'FINALIZADO', value: '2' },
  ]);

  useEffect(()=>{
    getPedidos();
  },[])

  async function getPedidos(){

    let token = await AsyncStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    axios.get(Config. API_GET_ORDER_ADM,config)
    .then((response)=> {

      console.log(response.data)
      
      if(Object.keys(response.data).length > 0){

        setTemItens(true)

        let newArray = [];
        let arrayProdutos = [];
        const quantidadeChaves = Object.keys(response.data).length

        for(var i = 0; i < quantidadeChaves; i++){

          newArray.push({
            id: response.data[i].id,
            protocolo: response.data[i].protocol,
            data: response.data[i].orderCreatDate,
            produtos: Object.keys(response.data[i].cartDTO.products).length,
            pagamento: response.data[i].cardDTO.bannerDTO.name,
            valor: response.data[i].cartDTO.totalValue,
            status: response.data[i].orderStatus
          })
          for(var j = 0; j < newArray[i].produtos ; j++){

          arrayProdutos.push({
            comanda:i,
            produto: response.data[i].cartDTO.products[j]
        })

      }
      }
            setOrdes(newArray)
            setProdutos(arrayProdutos)
        }else{
          setTemItens(false);
        }
     
    })
    .catch((e)=>{console.log("Error:" + e)})
  
  }

  async function cancelaPedidos(id){
    let token = await AsyncStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const params = {
      orderStatus: "CANCELADO",
    };
    
    Alert.alert("Cancelar Compra ?", "Você realmente deseja cancelar pedido?", [
      {
        text: "Sim",
        onPress: () => {
          axios.put(Config.API_ATUALZA_ORDER_STATUS+id,params,config)
          .then(()=>{
            getPedidos()
          })
          .catch((e)=>{console.log(e)})
        },
        style: "cancel"
      },
      { text: "Nâo", onPress: () => null }
    ]);
    
  }

  async function finalizaPedido(id){
    let token = await AsyncStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    const params = {
        orderStatus: "FINALIZADO",
    }

    
    Alert.alert(" Deseja aprovar compra ?", "Você realmente deseja aprovar pedido?", [
      {
        text: "Sim",
        onPress: () => {
          axios.put(Config.API_ATUALZA_ORDER_STATUS+id,params,config)
          .then(()=>{
            getPedidos()
          })
          .catch((e)=>{console.log(e)})
        },
        style: "cancel"
      },
      { text: "Nâo", onPress: () => null }
    ]);
  }

  return (
    <ScrollView>
      <View style={styles.center}>
        <View style={styles.viewtitulo}>
          <Text style={styles.titulo}>Pedidos Adm</Text>
        </View>

        <View style={styles.linha} />

        {
          temItens?
          orders.map((pedido,key) => (
            <View key={key} style={styles.viewDados}>
            <View style={styles.viewRow}>
              <View style={styles.viewRow}>
                <Text>Protocolo: </Text>
                <Text style={styles.info}> {pedido.protocolo} </Text>
              </View>
  
              <View style={styles.viewRow}>
                <Text>Data:  </Text>
                <Text style={styles.info}>{pedido.data?pedido.data.substring(pedido.data,10):null}</Text>
              </View>
            </View>
  
           
                {
                  produtos?
                    produtos.filter((comanda)=>{
                
                            if(comanda.comanda == key){
                                return comanda
                            }
                        }
                    ).map(
                      (jogos, key) => ( 
                        <View key={key} style={styles.viewProduto}>
                              <View style={styles.viewRow}>
                              <Text>Produto: </Text>
                              <View style={styles.viewTextProduto}>
                                {console.log(jogos)}
                                <Text numberOfLines={1} style={styles.textoAzul}>
                                  {jogos.produto.name}
                                </Text>
                              </View>
                             </View>
                         </View>
                      )
                    )
                    :
                    <>
                    </>
                }
              
  
            <View style={styles.viewRow}>
              <View style={styles.viewRow}>
                <Text>Pagamento: </Text>
                <Text style={styles.info}> {pedido.pagamento} </Text>
              </View>
  
              <View style={styles.viewRow}>
                <Text>Valor </Text>
                <Text style={styles.info}>R$ {pedido.valor? parseFloat((pedido.valor).toFixed(2)):null}</Text>
              </View>
            </View>
  
            <View style={styles.viewRow}>
              <Text>Status: </Text>
              <Text style={styles.textoAzul}> {pedido.status} </Text>
              {
                pedido.status== "EM_PROCESSAMENTO"?
                <View>
                <TouchableOpacity style={styles.viewRemover} onPress={()=>cancelaPedidos(pedido.id)}>
                  <Text style={styles.Remover}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewFinalizar} onPress={()=>finalizaPedido(pedido.id)}>
                  <Text style={styles.Remover}>Finalizar</Text>
                </TouchableOpacity>
                </View>

              :
              <View style={styles.viewRemoverOculto}>
                <Text style={styles.RemoverOculto}>Finalizado</Text>
              </View>
              }
              
            </View>

            <View style={styles.linha2} />
          </View>
          
          ))       
        :
        <Text style={{fontSize:20,textAlign:'center',color:COR.vinho}}>
          Sem itens até o momento
        </Text>
        }
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,

    alignItems: 'center',
    textAlign: 'center',
  },
  viewtitulo: {
    marginVertical: 10,
    marginTop: 30,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  viewRow: {
    // width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  viewDados: {
    width: '90%',
  },
  viewProduto: {
    width: '95%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COR.verdeFosco,

    alignSelf: 'center',
  },
  viewTextProduto: {
    width: '70%',
  },
  viewRemover: {
    backgroundColor: COR.vinho,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 4,
    marginTop: 5,
  },
  viewFinalizar: {
    backgroundColor: COR.verdeFosco,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 4,
    marginTop: 5,
  },
  viewRemoverOculto: {
    backgroundColor: COR.branco,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 4,
    marginTop: 5,
  },
  Remover: {
    fontSize: 15,
    fontWeight: '500',
    color: COR.branco,
    paddingHorizontal: 8,
  },
  RemoverOculto: {
    fontSize: 15,
    fontWeight: '500',
    color: COR.cinza,
    paddingHorizontal: 8,
  },
  textoAzul: {
    fontSize: 15,
    fontWeight: '500',

    color: COR.verdeFosco,
    paddingHorizontal: 8,
  },

  viewInfo: {
    marginTop: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  info: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  edit: {
    fontSize: 15,
    fontWeight: '200',
    marginLeft: 10,
  },
  linha: {
    width: '100%',
    height: 1,
    backgroundColor: COR.cinza,
    margin: 20,
  },
  linha2: {
    width: 500,
    height: 1,
    backgroundColor: COR.cinza,
    marginBottom:10,
    marginTop:10,
    marginLeft:-20
  },
  label: {
    fontSize: 20,
    fontWeight: '200',
    paddingRight: 10,
  },
});