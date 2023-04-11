import React, {useState,useRef, useEffect} from 'react';
import {Text, View ,TextInput, KeyboardAvoidingView, Image, ImageBackground,TouchableOpacity,BackHandler,Alert } from 'react-native';
import olhoAberto from "../assets/icons/olho.png";
import olhoFechado from "../assets/icons/olho-2.png";
import fundoLogin from "../assets/fundo/login.jpg";
import logo from "../assets/logo/logo.png";
import COR from '../assets/CSS/COR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginService from '../componentes/loginService';
import TelaConta from './TelaConta';


const TelaLogin = (props)=>{

   const [usuarioLogin,setUsuarioLogin] = useState("")
   
   const [senhaLogin,setSenhaLogin] = useState("")
     //input ref
   const refInput = useRef();
   //olho
   const olho = useRef();
   // esconder senha
   const [hidePass,setHidePass] = useState (true);

   const [Errou,setErrou] = useState(false)

   const [token,setToken] = useState('');

   const [logado,setLogado] = useState("false");
   
   useEffect(()=>{

    async function FuncaoVeLogin() {
       const situacaoLogin = await AsyncStorage.getItem("logado")
       console.log(situacaoLogin
        )
        
       if(situacaoLogin == undefined || situacaoLogin == "false"){
        setLogado("false");
       }else{
        setLogado("true");
       }
    }
    FuncaoVeLogin();
   
   },[])

   useEffect(() => {
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
 
   
   const botaoLogin = async() => {
    if(usuarioLogin.length <= 2 || senhaLogin.length <= 2){
       
       setErrou(true)
       setTimeout(() => {
          setErrou(false)
      }, 1500);
    }else{
      try{
          var params = {
              client_id: usuarioLogin,
              client_secret: senhaLogin,
              grant_type: "client_credentials",
          }
             const resp = await LoginService.signin({username:usuarioLogin,password: senhaLogin})

              var tokenzin = await AsyncStorage.getItem('token')
              if(tokenzin != null){
                setToken(JSON.stringify(tokenzin));
                await AsyncStorage.setItem("logado","true")
                setLogado("true");

                Alert.alert(
                  "Bem vindo !!", 
                  "É muito bom te ter de volta mais uma vez", 
                  [
                    {
                      text: "Continuar", 
                    },
                  ]
                );
              }
              
             }
             catch(error)
             {
                Alert.alert(
                  "Algo deu errado !!!",
                  "Não foi possivel logar, tente novamente",
                  [
                    {
                    text: "OK",
                    }
                  ])
              }
       }
       
}
    
    return(
      <>
      {
        logado == "false"?
        <ImageBackground source = {fundoLogin}
        resizeMode="cover"
        style={{flex:1,
            justifyContent:'flex-end'}}>

        <KeyboardAvoidingView style={{flex:1,height:"100%",justifyContent:"center"}}>
          <View style={{height:480,width:'90%',alignSelf:'center',backgroundColor:'rgba(61, 43, 31, 0.3)',borderRadius:10}}>
            <View style={{alignSelf:'center',width:200, height:80,backgroundColor:COR.branco,borderRadius:4}}>
            <Image source={logo} style={{alignSelf:'center',width:400, height:200,marginVertical:-70}}/>
            </View>
        <Text style={{marginTop:25,color:Errou? COR.branco:COR.branco,fontWeight:'bold', alignSelf:'center', fontSize:26, textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: COR.vinho}}>Usuário</Text>
            <View style={{ 
            backgroundColor:'rgba(255, 255, 255, 1)',
            marginTop:3,
            alignSelf:'center',
            width:'80%',
            borderRadius:8,
            height: 42}}>
            <TextInput
            onSubmitEditing = {() => {
                refInput.current.focus();
             }}
            returnKeyType="next"
            blurOnSubmit={false}
            placeholder="Digite Usuário"
            placeholderTextColor={Errou? COR.branco:COR.cinza}
            multiline={false}
            autoComplete={"username"}
            maxLength={35}
            onChangeText={(value) => setUsuarioLogin(value)}
            value={usuarioLogin}
            style={{
              height: 42,
              marginLeft:5,
              marginRight:5,
              fontSize:20,
              marginVertical:3,
              color:COR.preto
            
        }}
      />
      </View>
      <Text style={{color:Errou? COR.branco:COR.branco,alignSelf:'center',fontWeight:'bold',fontSize:26, textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: COR.vinho}}>Senha</Text>
      <View style={{
            flexDirection:"row",
            backgroundColor:'rgba(255, 255, 255, 1)',
            width:'80%',
            marginTop:3,
            alignSelf:'center',
            borderRadius:8,
            height: 42}}>
        <TextInput
                ref={refInput}
                returnKeyType="next"
                blurOnSubmit={false}
                placeholder="Digite Senha"
                placeholderTextColor={Errou? COR.branco:COR.cinza}
                multiline={false}
                autoComplete={"password"}
                maxLength={30}
                onChangeText={(value) =>setSenhaLogin(value)}
                secureTextEntry = {hidePass}
                value={senhaLogin}
                style={{
                    height: 42,
                    marginLeft:5,
                    fontSize:20,
                    width:230,
                    marginVertical:3,
                    color:COR.preto
                    
            }}
        />
        <TouchableOpacity style={{
          marginVertical:13,
          marginLeft:5
        }} onPress ={() => setHidePass(!hidePass)} ref={olho}>
            {
               hidePass ?
               <Image source={olhoAberto} style={{
                tintColor:'black',
                width: 27,
                height: 16,
              }}/> 
               :
               <Image source={olhoFechado} style={{
                tintColor:'black',
                width: 27,
                height: 16,
              }}/>
            }
            
         </TouchableOpacity>
      </View>

      <TouchableOpacity style={{width:'70%',alignSelf:'center',borderRadius:8,marginTop:20}}>
        <Text style={{
          fontSize:22,
          alignSelf:'center',
          color:COR.branco,
          textDecorationLine: 'underline',
          textShadowOffset: {width: 3, height: 3},
          textShadowRadius: 5,
          textShadowColor: COR.vinho
          }}>Esqueci minha senha...</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => botaoLogin()} style={{alignSelf:'center', marginTop:30,backgroundColor:COR.verdeFosco, width:150, height:40, borderRadius:8}}>
        <Text style={{fontSize:20,paddingVertical:6,alignSelf:'center',color:COR.branco}}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{alignSelf:'center', marginTop:20,backgroundColor:COR.vinho, width:150, height:40, borderRadius:8}}
            onPress={() => props.navigation.navigate("CriarLogin")}>
            <Text style={{fontSize:20,paddingVertical:6,alignSelf:'center',color:COR.branco}}>Cadastrar-se</Text>
        </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
        </ImageBackground>
        :
        <TelaConta navigation = {props.navigation} setLogado = {setLogado} passwordUser={senhaLogin}/>
      }
      </>
    )
}
export default TelaLogin;