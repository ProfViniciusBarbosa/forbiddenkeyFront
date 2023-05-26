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
  Alert,
  ScrollView ,
} from 'react-native';

import COR from '../assets/CSS/COR';
import UserPhoto from '../assets/icons/User.png';
import Config from '../assets/mocks/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width , height } = Dimensions.get('window');

export default function TelaConta(props) {
  
  const [isEditing, setIsEditing] = useState(false);

  const [getUsuario,setGetUsuario] = useState([{}])

  const [nome, setNome] = useState('');

  const [sobrenome, setSobrenome] = useState('');

  const [email, SetEmail] = useState('');

  const [telefone, setTelefone] = useState('');

  const [dataNascimento,setDataNascimento] = useState('');

  const [cpf, setCpf] = useState('');

  const [role, setRole] = useState('');

  async function sairTela (){
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('tipoUser');
    await AsyncStorage.setItem("logado","false");
    props.setLogado("false");

  }

  async function atulizaInformacoes() {

    const paramsCUSTOMER = {
      cpf : cpf,
      birthDate : dataNascimento,
      phone : telefone,
      firstName: nome,
		  lastName : sobrenome,
    }

    if(cpf==''){
      Alert.alert(
        "Campo CPF obrigatório!",
        "Informe o CPF para salvar!", 
        [
          {
             text: "OK",
          },
        ]
      );
    }

    if(role == "ROLE_CUSTOMER"){
      axios.put(Config.API_UPDATE_CUSTOMER, paramsCUSTOMER).then((response) => {        
        console.log(response.data)
        
        setGetUsuario(response.data);
        setNome(response.data.firstName);
        setSobrenome(response.data.lastName);
        setDataNascimento(response.data.birthDate);
        setTelefone(response.data.phone);
        setCpf(response.data.cpf);
  
        Alert.alert(
          "Ação concluida!!",
          "Informações atualizadas com sucesso !!", 
          [
            {
               text: "OK",
            },
          ]
        );
      }).catch((error) => {console.log(error.response)})
    }
    else{
      console.log("algo de errado")
    }
  }

  useEffect(()=>{
    async function getRoleUse(){
      let roleUser = await AsyncStorage.getItem('tipoUser');
      setRole(roleUser);
    }
    getRoleUse();
    
    const backAction = () => {
      Alert.alert(
        "Alerta !!", 
        "Você realmente deseja sair do app?", 
        [
          {
            text: "Sim", 
            onPress: () => BackHandler.exitApp() 
          },

          {
            text: "não",
            onPress: () => null,
            style: "cancel"
          }
        ]
      );

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  },[])

  useEffect(()=>{
    if(role!=''){
      getDadosUsuario();
    }
  },[role])

  async function getDadosUsuario () {

    if(role == "ROLE_CUSTOMER"){

      axios.get(Config.API_PEGA_USER).then((response) => {

        console.log(response)

        setGetUsuario(response.data)
        SetEmail(response.data.user.email)
        setNome(response.data.firstName)
        setSobrenome(response.data.lastName);
        setDataNascimento(response.data.birthDate)
        setTelefone(response.data.phone)
        setCpf(response.data.cpf)
        
      }).catch((e)=>console.log(e))

    }
    else
    {
      
        axios.get(Config.API_PEGA_ADM).then((response) => {
          setGetUsuario(response.data)
          setNome(response.data.firstName)
          setSobrenome(response.data.lastName);
          SetEmail(response.data.email)
        }).catch((e)=>console.log(e))
      
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
        <Text style={styles.info}>{email}</Text>
      </View>
      {
         role == 'ROLE_ADMIN'?
         <TouchableOpacity style={styles.botaoVaiParaOHistorico} onPress={()=>props.navigation.navigate("ADMPedidos")}>
         <Text style={styles.buttonText}>Histórico de Clientes</Text>
         </TouchableOpacity>
         :
        <TouchableOpacity style={styles.botaoVaiParaOHistorico} onPress={()=>props.navigation.navigate("Pedidos")}>
        <Text style={styles.buttonText}>Histórico de Compras</Text>
        </TouchableOpacity>

      }
     
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
        {
          role == 'ROLE_ADMIN'?
          <>
          </>
          :
          <>
          <View style={styles.viewRow}>
            <Text style={styles.label}>Nascimento:</Text> 
            <TextInput
              value={dataNascimento? dataNascimento : dataNascimento}
              onChangeText={value => setDataNascimento(value)}
              autoFocus
              placeholder='Digite data de nascimento..'
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
              placeholder= 'Digite seu telefone..'
              onBlur={() => setIsEditing(false)}
              style={styles.input}
            />
          </View>
  
          <View style={styles.viewRow}>
            <Text style={{color: COR.vermelho, fontSize: 20, marginRight: -50}}>*</Text>
            <Text style={styles.label}>CPF:</Text>
            <TextInput
              value={cpf}
              onChangeText={value => setCpf(value)}
              autoFocus
              placeholder='Digite seu cpf...'
              onBlur={() => setIsEditing(false)}
              style={styles.input}
            />
          </View>
          </>
        }
       
      </View>
      {
        role == 'ROLE_ADMIN'?
        <>
        </>
        :
        <TouchableOpacity onPress={()=> atulizaInformacoes()} style={styles.viewButton}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      }
        
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
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COR.verdeFosco,
    borderRadius: 8,
    lineHeight:18,
  },
  viewButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: COR.verdeFosco,
    padding: 5,
    borderRadius: 8,
    marginTop:-80,
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
    fontSize: 22,
    fontWeight: '500',
    color: COR.branco,
  },
  botaoVaiParaOHistorico:{
    width: '60%',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'green',
    height:65,
    marginTop:10,
    marginBottom:10,
    borderRadius: 8,
  }
});