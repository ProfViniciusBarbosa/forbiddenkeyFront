import axios  from '../componentes/customAxios';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  Alert
} from 'react-native';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';

import COR from '../assets/CSS/COR';
import UserPhoto from '../assets/icons/User.png';
import Config from '../assets/mocks/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput } from 'react-native-mask-text';

const { width , height } = Dimensions.get('window');

export default function TelaConta(props) {
  const [isEditing, setIsEditing] = useState(false);

  const [getUsuario,setGetUsuario] = useState([{}])

  const [nome, setNome] = useState('');

  const [sobrenome, setSobrenome] = useState('');

  const [telefone, setTelefone] = useState('');

  const [dataNascimento,setDataNascimento] = useState('');

  const [cpf, setCpf] = useState('');

  function sairTela (){
    removeItemValue();
    props.navigation.navigate("Entrar",{logado:"false"});
  }
  async function removeItemValue() {
    try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('tipoUser');
        await AsyncStorage.setItem("logado","false")
    }
    catch(exception) {   
    }
}

  async function atulizaInformacoes() {
    const paramsCUSTOMER = {
      cpf: cpf,
      birthDate: dataNascimento,
      phone: telefone
    }

    let role = await AsyncStorage.getItem('tipoUser');
    if(role == "ROLE_CUSTOMER"){
      try{
        const response = await axios.put(Config.API_UPDATE_CUSTOMER, paramsCUSTOMER)
        
        setGetUsuario(response.data)
        setNome(getUsuario.firstName)
        setSobrenome(getUsuario.lastName);
        setDataNascimento(getUsuario.birthDate)
        setTelefone(getUsuario.phone)
        setCpf(getUsuario.cpf)

        console.log(response.data)

        Alert.alert("Sucesso !", "Informações atualizadas com sucesso!", [
          {
            text: "OK",
          },
        ]);
      }
      catch(e){
        console.log(e.message)
      }
    }
  }

  useEffect(()=>{
    getDadosUsuario();
    const backAction = () => {
      Alert.alert("Calma ae amigão!", "Você realmente deseja sair do app?", [
        {
          text: "não",
          onPress: () => null,
          style: "cancel"
        },
        { text: "Sim", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  },[])

  async function getDadosUsuario () {
    let role = await AsyncStorage.getItem('tipoUser');
    if(role == "ROLE_CUSTOMER"){
      try{
        const resp = await axios.get(Config.API_PEGA_USER)
        setGetUsuario(resp.data)
        setNome(getUsuario.firstName)
        setSobrenome(getUsuario.lastName);
        setDataNascimento(getUsuario.birthDate)
        setTelefone(getUsuario.phone)
        setCpf(getUsuario.cpf)

      }catch(e){
        console.log(e)
      }
    }
    else{
      try{
        const resp = await axios.get(Config.API_PEGA_ADM)
        setGetUsuario(resp.data)
        setNome(getUsuario.firstName)
        setSobrenome(getUsuario.lastName);

      }catch(e){
        console.log(e)
      }
    }
      
  }

  return (
    <ScrollView style={styles.ScrollTela}>
          
    <View style={styles.center}>
      <View style={styles.viewtitulo}>
        <Text style={styles.titulo}>Tela Perfil</Text>
      </View>
      <View style={styles.foto}>
        <Image source={UserPhoto} style={{ width: 90, height: 90 }} />
      </View>
      <View style={styles.viewInfo}>
        <View>
          <Text style={styles.info}>{getUsuario.firstName}</Text>
        </View>
        <Text style={styles.info}>{getUsuario.email}</Text>
      </View>

      <View style={styles.linha} />
      <View style={styles.viewDados}>
        <Text style={styles.label2}>Editar dados:</Text>
        <View style={styles.viewRow}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.label}>{getUsuario.firstName}</Text>
        </View>

        <View style={styles.viewRow}>
          <Text style={styles.label}>Sobrenome:</Text>
          <Text style={styles.label}>{getUsuario.lastName}</Text>
        </View>

        <View style={styles.viewRow}>
          <Text style={styles.label}>Nascimento:</Text>
          <TextInput
            value={dataNascimento}
            onChangeText={value => setDataNascimento(value)}
            autoFocus
            onBlur={() => setIsEditing(false)}
            style={styles.input}
          />
        </View>

        <View style={styles.viewRow}>
          <Text style={styles.label}>Telefone:</Text>
          <TextInput
            value={telefone}
            onChangeText={value => setTelefone(value)}
            autoFocus
            
            onBlur={() => setIsEditing(false)}
            style={styles.input}
          />
        </View>

        <View style={styles.viewRow}>
          <Text style={styles.label}>CPF:</Text>
          <TextInput
            value={cpf}
            onChangeText={value => setCpf(value)}
            autoFocus
            onBlur={() => setIsEditing(false)}
            style={styles.input}
          />
        </View>
      </View>
      <TouchableOpacity onPress={()=> atulizaInformacoes()} style={styles.viewButton}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> sairTela()} style={styles.viewButton2}>
        <Text style={styles.buttonText}>Sair do Login</Text>
      </TouchableOpacity>
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
  ScrollTela:{
    height: height,
    width:width
  },
  viewtitulo: {
    marginVertical: 10,
    marginTop: 30,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  foto: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COR.cinza,
    borderRadius: 50,
  },
  viewInfo: {
    marginTop: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  info: {
    fontSize: 20,
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
    margin: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  label2: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 10,
    alignSelf:'center',
  },
  viewRow: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  viewDados: {
    width: '90%',
    marginBottom: 100,
  },
  input: {
    width: '60%',
    // width: 200,
    height: 40,
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COR.verdeFosco,
    borderRadius: 8,
  },
  viewButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: COR.verdeFosco,
    padding: 5,
    borderRadius: 8,
  },
  viewButton2: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: COR.vermelho,
    marginTop:10,
    marginBottom:10,
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '500',
    color: COR.branco,
  },
});