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
  ScrollView,
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
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function TelaCart({navigation}) {

  const navigation1 = useNavigation();

  const [value, setValue] = useState('');

  const [currentCart, setCurrentCart] = useState([{}]);

  const [card, setCard] = useState([{}])

  const [permitirCompra,setPermitirCompra] = useState(false)

  const [itemRemove, setItemRemove] = useState(false)


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

  useEffect(()=>{
    GetCurrentCart()
  },[itemRemove])
  
  const [itensCard, setItensCard] = useState([]);
  
  async function GetCartoes(){
    let token = await AsyncStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.get(Config.API_BASE_URL_CARD,config).then((resp)=>{
      if(resp){
        setCard(resp.data)

        let newArray = [];

        var quantidadeChaves = Object.keys(resp.data).length
        if(quantidadeChaves>0){
          setPermitirCompra(true)
        for(var i = 0; i < quantidadeChaves; i++){
          newArray.push({
            label: resp.data[i].bannerDTO.name,
            value: resp.data[i].id,
          })

            setItensCard(newArray)
        }
        }
      }else{
        setPermitirCompra(false)
      }
    }).catch((e)=>{console.log(e)})     
  }

  async function GetCurrentCart(){
    let role = await AsyncStorage.getItem('tipoUser');
    let token = await AsyncStorage.getItem('token');

        
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    if(role == "ROLE_CUSTOMER"){
        axios.get(Config.API_CURRENT_CART,config).then((resp)=>{
          if(resp != null){
          setCurrentCart(resp.data)
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
          }}).catch((e)=>{
          if(e == 'AxiosError: Request failed with status code 404'){

          }else{
            Alert.alert(
              "Não é possivel adicionar ou vizualizar itens do carrinho !",
              "Logue na aplicação para vizualizar e adiconar itens ao carrinho!",
              [
                {
                  text: "OK",
                  onPress: () => (navigation1.navigate("Entrar"))
                },
              ]
            );
          }
            
          })
   
      }else{
        setCurrentCart([{}])
        Alert.alert(
          "Não é possivel adicionar ou vizualizar itens do carrinho !",
          "Logue na aplicação para vizualizar e adiconar itens ao carrinho!",
          [
            {
              text: "OK",
              onPress: () => (navigation1.navigate("Entrar"))
            },
          ]
        );
      }
    }

  async function removeItemByCart(idItem) {
    let token = await AsyncStorage.getItem('token');

        
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    axios.delete(Config.API_BASE_URL_CART + idItem,config).then(()=>{
        setItemRemove(!itemRemove)
        Alert.alert('Item removido',
        'Operção feita com sucesso',[
         {
           text:"OK"
          },
        ]);
      }
    ).catch((error)=>{
      Alert.alert(
        "Error!" + error,
        "Não foi possivel remover item do carrinho!",
        [
          {
            text: "OK",
          },
        ]
      );
    })
  }

  async function finalizaCompra(){

    let token = await AsyncStorage.getItem('token');
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    if(permitirCompra == false){
      Alert.alert(
        "OPS!",
        "Você não colocou uma forma de pagamento, adicione uma para poder comprar!.",
        [
          {
            text: "OK",onPress: ()=> null
          },
        ]
      )
    }else{
    Alert.alert(
      "Finalizar compra?!",
      "Você está prestes a finalizar sua compra, deseja prosseguir?",
      [
        {text: 'Sim', onPress: () => {
            axios.post(Config.API_FINALIZA_COMPRA+'/'+value,null, config)
            .then(() => {
              Alert.alert(
                "Compra Finalizada!",
                "Aguarde a aprovação, você pode acompanha-lo pelo hisórico de compra.",
                [
                  {
                    text: "OK",onPress: ()=> navigation1.navigate("Entrar")
                  },
                ]
              );
            })
            .catch((e)=>{Alert.alert(
              "OPS!",
              "Você não selecionou o método de pagamento...Selecione uma para prosseguir!",
              [
                {
                  text: "OK",onPress: ()=> null
                },
              ]
            );});}
          }
          , {text: 'Não', onPress: () => null},
     ],
     { cancelable: false }
    );
  }}

  return (
    <ScrollView style={styles.center}>
      <View style={{alignItems: 'center',marginBottom:20}}>
      <View style={styles.viewtitulo}>
        <Text style={styles.titulo}> Carrinho </Text>
      </View>
      
      {
        currentCart.products?
        currentCart.products.map((jogo,key)=>(
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
                <Text style={styles.precoCardCarrinho}>
                R$ {jogo.price}
                </Text>
            <TouchableOpacity onPress={()=>removeItemByCart(jogo.id)} style={styles.viewRemover}>
              <Text style={styles.Remover}>remover</Text>
            </TouchableOpacity>
          </View>
        </View>
        )): <Text style={{fontSize:20,textAlign:'center',color:COR.vinho}}>
          Não Existem jogos no carrinho atual!
          Adicione jogos para compra-los
        </Text>
      }
      
      <View style={styles.linha} />

      <View style={styles.viewRow}>
        <Text style={styles.Total}>TOTAL</Text>

        <Text style={styles.Total}>R$ {currentCart.totalValue? parseFloat((currentCart.totalValue).toFixed(2)):null}</Text>
      </View> 

      <View style={styles.linha} />

      <View style={styles.viewAddPagamento}>
        <Text style={styles.AddPagamento}>Escolher forma de pagamento</Text>
      </View>

          <View style={styles.RadioButton}>
            <RadioForm
              radio_props={itensCard}
              animation={false}
              initial={1}
              onPress={item => {
              console.log(item)
              setValue(item);
              }}
              buttonColor={COR.verdeFosco}
            />
          </View>

      {/*
      <TouchableOpacity>
        <Text>Cartao final 1234</Text>
      </TouchableOpacity> */}

      <TouchableOpacity onPress={() =>navigation.navigate("Cartao",{navigation:navigation})} style={styles.viewRemover}>
        <Text style={styles.Remover}>Adicionar cartão</Text>
      </TouchableOpacity>

      <View style={styles.linha} />

      <TouchableOpacity onPress={()=>{finalizaCompra()}}style={styles.viewComprar}>
        <Text style={styles.Comprar}>Finalizar compra</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    // justifyContent: 'center',
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
  precoCardCarrinho:{
      fontSize: 18,
      fontWeight: '500',
      color: COR.branco,
      // paddingHorizontal: 8,
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
