import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
    
    axios.get(Config.API_FINALIZA_COMPRA,config)
    .then((response)=> {

      console.log(response.data[0])
      
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
    .catch((e)=>{console.log('deu ruim'+e)})
  
  }

  return (
    <ScrollView>
      <View style={styles.center}>
        <View style={styles.viewtitulo}>
          <Text style={styles.titulo}>Pedidos Adm</Text>
        </View>

        <View style={styles.viewDados}>
          <View style={styles.viewRow}>
            <View style={styles.viewRow}>
              <Text>Protocolo: </Text>
              <Text style={styles.info}>123456789 </Text>
            </View>

            <View style={styles.viewRow}>
              <Text>Data: </Text>
              <Text style={styles.info}>19/11/2022</Text>
            </View>
          </View>

          <View style={styles.viewProduto}>
            <View style={styles.viewRow}>
              <Text>Produto: </Text>
              <View style={styles.viewTextProduto}>
                <Text numberOfLines={1} style={styles.textoAzul}>
                  Thes sims 4 deluxe
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.viewRow}>
            <View style={styles.viewRow}>
              <Text>Pagamento: </Text>
              <Text style={styles.info}>cartão</Text>
            </View>

            <View style={styles.viewRow}>
              <Text>Valor </Text>
              <Text style={styles.info}>R$140,90</Text>
            </View>
          </View>

          <View style={styles.viewRow}>
            <Text>Status: </Text>
            <View style={styles.viewSelect}>
              <DropDownPicker
                listMode="MODAL"
                open={openStatus}
                value={status}
                items={itensStatus}
                setOpen={setOpenStatus}
                setValue={setStatus}
                setItems={setItensStatus}
                placeholder="Selecione"
                style={styles.Select}
              />
            </View>
            <TouchableOpacity style={styles.viewSalvar}>
              <Text style={styles.Salvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.linha} />
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
  viewSelect: {
    width: '48%',
  },
  Select: {
    backgroundColor: 'transparent',
    borderColor: COR.verdeFosco,
    marginVertical: 5,
  },
  viewSalvar: {
    backgroundColor: COR.azulado,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 4,
    marginTop: 5,
  },
  Salvar: {
    fontSize: 15,
    fontWeight: '500',
    color: COR.verdeFosco,
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
  label: {
    fontSize: 20,
    fontWeight: '200',
    paddingRight: 10,
  },
});