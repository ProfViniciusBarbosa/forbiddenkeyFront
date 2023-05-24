import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  BackHandler,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import COR from '../assets/CSS/COR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../componentes/customAxios';
import Config from '../assets/mocks/Config';
import RadioForm from 'react-native-simple-radio-button';
import { useNavigation } from '@react-navigation/native';

export default function TelaCartao(props) {
  
  const [number, setNumber] = useState('');
  
  const [holder, setHolder] = useState('');
  
  const [expirationDateMonth, setExpirationDateMonth] = useState('');
  
  const [expirationDateYear, setExpirationDateYear] = useState('');
  
  const [securityNumber, setSecurityNumber] = useState('');
  
  const [holderCpf, setHolderCpf] = useState('');
  
  const [itensCard, setItensCard] = useState([]);

  const [bandeiraSelecionada,setBandeiraSelecionada] = useState(1)

  const navigation = useNavigation();

  useEffect(()=>{
    getBanners();
  },[])

  useEffect(() => {
    const backAction = () => {

      props.navigation.goBack()
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  async function getBanners(){

    let token = await AsyncStorage.getItem('token');

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    axios.get(Config.API_PEGA_BANDEIRAS_CARTAO,config)
    .then((resp)=>{
      console.log(resp.data);
      if(Object.keys(resp.data).length > 1){

        let newArray = [];
  
        const quantidadeChaves = Object.keys(resp.data).length
  
        for(var i = 0; i < quantidadeChaves; i++){
            newArray.push({
                label: resp.data[i].name,
                value: resp.data[i].id,
            })}
            setItensCard(newArray)
        }
      // setItensCard(resp.data);
    })
    .catch((e)=>{
      console.log(e)
    })
  
  }

  async function addNewCart() {

    let role = await AsyncStorage.getItem('tipoUser');
    let token = await AsyncStorage.getItem('token');

    var params = {
      number: number,
      holder: holder,
      expirationDateMonth: expirationDateMonth,
      expirationDateYear: expirationDateYear,
      securityNumber: securityNumber,
      holderCpf: holderCpf,
      bannerDTO: {
        id:bandeiraSelecionada
    }
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    if(role == "ROLE_CUSTOMER"){
        axios.post(Config.API_BASE_URL_CARD, params,config).then((resp)=>{
          console.log(resp)
          Alert.alert(
          "Cartão cadastrado com sucesso !",
          "Você já pode usa-lo para realizar as suas compras!",
          [
            {
              text: "OK",
              onPress: () => (props.navigation.navigate("Catalogo",{nav:navigation}))
            },
          ]
        );
      }).catch((e)=>{
        console.log(e)
        Alert.alert(
        "Erro ao cadastrar o novo cartão !",
        "Verifique as informações passada e tente novamente!",
        [
          {
            text: "OK",
          },
        ]
      );})
    }     
  }
  return (
    <KeyboardAvoidingView style={styles.center}>
      <ScrollView>
      <View style={styles.viewtitulo}>
        <Text style={styles.titulo}>Adicionar Cartão </Text>
      </View>

      <View style={styles.viewDados}>
        <Text style={styles.label}>Número do cartão: </Text>
        <TextInput
          placeholder="xxxx xxxx xxxx xxxx"
          onChangeText={value => setNumber(value)}
          style={styles.input}
          maxLength={16}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Nome: </Text>
        <TextInput
          placeholder="Titular do cartão"
          onChangeText={value => setHolder(value)}
          style={styles.input}
        />

        <Text style={styles.label}>Mês de vencimento: </Text>
        <View style={styles.viewdataVencimento}>
          <TextInput
            onChangeText={value => setExpirationDateMonth(value)}
            style={styles.inputData}
            placeholder="MM"
            maxLength={2}
            keyboardType="numeric"
          />

          <TextInput
            onChangeText={value => setExpirationDateYear(value)}
            style={styles.inputData}
            placeholder="YYYY"
            maxLength={4}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.label}>CVV: </Text>
        <TextInput
          onChangeText={value => setSecurityNumber(value)}
          placeholder="CVV"
          style={styles.inputData}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Cpf: </Text>
        <TextInput
          onChangeText={value => setHolderCpf(value)}
          placeholder="xxx xxx xxx xx"
          style={styles.input}
          keyboardType="numeric"
          maxLength={11}
        />
      </View>
      <View style={styles.RadioButton}>
            <RadioForm
              radio_props={itensCard}
              initial={0}
              onPress={item => {
                console.log(item)
              setBandeiraSelecionada(item);
              }}
              buttonColor={COR.verdeFosco}
            />
          </View>
      <TouchableOpacity onPress={() => addNewCart()} style={[styles.viewButton,{marginTop:20}]}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginVertical: 50,
    marginTop: 30,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  label: {
    width: 200,
    fontSize: 20,
    fontWeight: '200',
    color: COR.preto,
    // paddingRight: 1,
  },
  viewRow: {
    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  viewDados: {
    width: '90%',
    marginBottom: 80,
  },
  input: {
    width: '65%',
    // width: 200,
    height: 40,
    lineHeight: 10,
    fontSize: 15,
    fontWeight: '200',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COR.verdeFosco,
    borderRadius: 8,
    marginVertical: 5,
  },
  inputData: {
    width: '40%',
    // width: 200,
    height: 40,
    fontSize: 15,
    lineHeight: 10,
    fontWeight: '200',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COR.verdeFosco,
    borderRadius: 8,
    marginVertical: 5,
  },
  viewdataVencimento: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    // borderWidth: 1,
    // borderColor: COR.verdeFosco,
  },
  viewButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: COR.verdeFosco,
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '500',
    color: COR.branco,
  },
  RadioButton: {
    marginVertical: 10,
  },
});