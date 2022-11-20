import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import COR from '../assets/CSS/COR';
import axios from '../componentes/customAxios';
import Config from '../assets/mocks/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function TelaCart({navigation}) {

  const [value, setValue] = useState('');

  const [currentCart, setCurrentCart] = useState([{}]);

  const [card, setCard] = useState([{}])


  useEffect(()=>{
    GetCurrentCart();
    GetCartoes();

    const backAction = () => {

      navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  
  const [itensCard, setItensCard] = useState([]);
  
  async function GetCartoes(){
      
    try{
      const resp = await axios.get(Config.API_BASE_URL_CARD)

       if(resp != null && resp != undefined){
        setCard(resp.data)

        let newArray = [];

        var quantidadeChaves = Object.keys(card).length

        for(var i = 0; i < quantidadeChaves; i++){

            newArray.push({
                label: card[i].bannerDTO.name,
                value: card[i].id,
            })

            setItensCard(newArray)
        }
        }
        
    }
      catch (e)
      {
        console.log(e)
      }
  }


  async function GetCurrentCart(){
    let role = await AsyncStorage.getItem('tipoUser');
    if(role == "ROLE_CUSTOMER"){
      try{
        const response  = await axios.get(Config.API_CURRENT_CART)

        console.log(response.data)

        if(response != null){
          setCurrentCart(response.data)
        }
        else{
          Alert.alert(
            "Carrinho vazio !",
            "Adicione itens ao seu carrinho, para vizualizar !",
            [
              {
                text: "OK",
              },
            ]
          );
        }
      }
        catch (erros)
        {
          console.log(erros)
        }
    }
    else{
      Alert.alert(
        "Não é possivel adicionar ou vizualizar itens do carrinho !",
        "Logue na aplicação para vizualizar e adiconar itens ao carrinho!",
        [
          {
            text: "OK",
            onPress: () => (navigation.navigate("Entrar"))
          },
        ]
      );
    }
  }

  async function removeItemByCart(idItem) {
    try{
      const response = await axios.delete(Config.API_BASE_URL_CART + idItem)
      Alert.alert('Item removido',
      'Operção feita com sucesso',[
        {
          text:"OK"
        },
      ]);
    }
    catch(error){

      Alert.alert(
        "Error!" + error,
        "Não foi possivel remover item do carrinho!",
        [
          {
            text: "OK",
          },
        ]
      );
    }
  }

  // async function GetCards() {
  //   try{
  //     const response = await axios.get(Config.API_BASE_URL_CARD)

  //     if(response != null){
  //       setCard(response.data.content);
  //     }
  //     else{
  //       Alert.alert(
  //         "Vazio, nenhum cartão cadastrado!",
  //         "Deseja cadastar um novo ?!",
  //         [
  //           {
  //             text: "sim",
  //             onPress: () => (navigation.navigate(""))
  //           },

  //           {
  //             text: "não",
  //             onPress: () => (navigation.navigate(""))
  //           },
  //         ]
  //       );
  //     }
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // }

  return (
    <View style={styles.center}>
      <View style={styles.viewtitulo}>
        <Text style={styles.titulo}> Carrinho </Text>
      </View>

      {
        currentCart?
        currentCart.map((jogo,key)=>(
          <View key={key} style={styles.cardFormato}>
          <Image
            source={{
              uri: jogo.imgUrl,
            }}
            style={{ width: 130, height: 100 }}
          />
  
          <View style={styles.content}>
            <View style={styles.viewTituloJogo}>
              <Text numberOfLines={1} style={styles.tituloJogo}>
                {jogo.name}
              </Text>
            </View>
  
            <TouchableOpacity onPress={()=>removeItemByCart(jogo.id)} style={styles.viewRemover}>
              <Text style={styles.Remover}>remover</Text>
            </TouchableOpacity>
          </View>
        </View>
        )): null
      }
      
      <View style={styles.linha} />

      <View style={styles.viewRow}>
        <Text style={styles.Total}>TOTAL</Text>

        <Text style={styles.Total}>{currentCart.totalValue}</Text>
      </View> 

      <View style={styles.linha} />

      <View style={styles.viewAddPagamento}>
        <Text style={styles.AddPagamento}>Escolher forma de pagamento</Text>
      </View>

          <View style={styles.RadioButton}>
            <RadioForm
              radio_props={itensCard}
              initial={0}
              onPress={item => {
              setValue(item);
              }}
              buttonColor={COR.verdeFosco}
            />
          </View>

      {/*
      <TouchableOpacity>
        <Text>Cartao final 1234</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.viewRemover}>
        <Text style={styles.Remover}>Adicionar cartão</Text>
      </TouchableOpacity>

      <View style={styles.linha} />

      <TouchableOpacity style={styles.viewComprar}>
        <Text style={styles.Comprar}>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    // justifyContent: 'center',
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

  cardFormato: {
    width: '90%',
    flexDirection: 'row',
    height: 130,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    // backgroundColor: COR.branco,
    backgroundColor: COR.verdeFosco,
    shadowColor: COR.preto,
    margin: 10,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  content: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTituloJogo: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
  },
  tituloJogo: {
    color: COR.marrom,
    fontSize: 20,
    fontWeight: '500',
  },
  viewRemover: {
    backgroundColor: COR.azulado,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 4,
    marginTop: 5,
  },
  Remover: {
    fontSize: 18,
    fontWeight: '500',
    color: COR.verdeFosco,
    paddingHorizontal: 8,
  },
  linha: {
    width: '100%',
    height: 1,
    backgroundColor: COR.cinza,
    margin: 10,
  },
  viewRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  Total: {
    fontSize: 18,
    fontWeight: '500',
    color: COR.verdeFosco,
  },
  viewAddPagamento: {
    borderWidth: 1,
    borderColor: COR.cinza,
    padding: 5,
    borderRadius: 8,
    marginTop: 10,
  },
  AddPagamento: {
    fontSize: 20,
    paddingHorizontal: 10,
    fontWeight: '500',
    color: COR.verdeFosco,
  },
  RadioButton: {
    marginVertical: 10,
  },
  viewComprar: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: COR.verdeFosco,
    padding: 5,
    borderRadius: 8,
    marginTop: 20,
  },
  Comprar: {
    fontSize: 25,
    fontWeight: '500',
    color: COR.branco,
  },
});
