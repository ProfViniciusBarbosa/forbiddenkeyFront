import React, {useState,useRef} from 'react';
import { Text, View ,TextInput, KeyboardAvoidingView, Image, ImageBackground,TouchableOpacity } from 'react-native';
import COR from '../assets/CSS/COR';
import olhoAberto from "../assets/icons/olho.png";
import olhoFechado from "../assets/icons/olho-2.png";
import logo from "../assets/logo/logo.png";
import fundoCadastro from '../assets/fundo/cadastro.jpg';

export default function TelaCriarLogin(){

    const [usuarioLogin,setUsuarioLogin] = useState("")

    const [senhaLogin,setSenhaLogin] = useState("")
     //input ref
     const refInput = useRef();
     //olho
     const olho = useRef();
     // esconder senha
     const [hidePass,setHidePass] = useState (true);
      
      return(
          <ImageBackground source={fundoCadastro}
          resizeMode="cover"
          style={{flex:1,
              justifyContent:'flex-end'}}>
  
          <KeyboardAvoidingView style={{flex:1,height:"100%",justifyContent:"center"}}>
            <View style={{height:500,width:'90%',alignSelf:'center',backgroundColor:'rgba(61, 43, 31, 0.5)',borderRadius:10}}>
              <View style={{alignSelf:'center',width:200, height:80,backgroundColor:COR.branco,borderRadius:4}}>
              <Image source={logo} style={{alignSelf:'center',width:400, height:200,marginVertical:-70}}/>
              </View>
              <Text style={{marginTop:25,color:COR.branco,fontWeight:'bold', alignSelf:'center', fontSize:26,textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: COR.azulado}}>Nome</Text>
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
              placeholderTextColor={COR.cinza}
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
          <Text style={{color:COR.branco,fontWeight:'bold', alignSelf:'center', fontSize:26,textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: COR.azulado}}>Sobrenome</Text>
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
              placeholderTextColor={COR.cinza}
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
        <Text style={{color:COR.branco,fontWeight:'bold', alignSelf:'center', fontSize:26,textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: COR.azulado}}>Email</Text>
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
              placeholderTextColor={COR.cinza}
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
        <Text style={{color:COR.branco,alignSelf:'center',fontWeight:'bold',fontSize:26,textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: COR.azulado}}>Senha</Text>
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
                  placeholderTextColor={COR.cinza}
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
  
          <TouchableOpacity style={{alignSelf:'center', marginTop:20,backgroundColor:COR.azulado, width:150, height:40, borderRadius:8}}
              onPress={() => null}>
              <Text style={{fontSize:20,paddingVertical:6,alignSelf:'center',color:COR.branco}}>Cadastrar</Text>
          </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
          </ImageBackground>
      )
}