import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View ,StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity, Alert,BackHandler} from 'react-native';
import COR from '../assets/CSS/COR';
import Config from '../assets/mocks/Config';
import BarraSuperior from '../componentes/BarraSuperior';
import carrinho from '../assets/icons/carrinho.png';
import lapisEdit from '../assets/icons/lapis.png'
import { useNavigation } from '@react-navigation/native';
import { LogBox } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


const { width,height } = Dimensions.get('window');

export default function TelaJogo({route}){
    
    const [jogoGetById,setJogoGetById] = useState([{}]);
    
    const [tipoUser,setTipoUser] = useState('ROLE_CUSTOMER')
    
    const categories = jogoGetById.categories;

    const [desenvolvedora,setDesenvolvedor] = useState('');

    const [distribuidora,setDistribuidora] = useState('');

    const navigation1 = useNavigation();

    useEffect(() => {
        GetJogos();

        const backAction = () => {
    
          navigation1.goBack()
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    async function addItemToCart(idJogo) {

        let role = await AsyncStorage.getItem('tipoUser');
        let token = await AsyncStorage.getItem('token');

        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

       axios.get(Config.API_CURRENT_CART,config).then((responseCart)=>{

        if(responseCart.data.currentCart == true && role == "ROLE_CUSTOMER"){
            axios.put(Config.API_BASE_URL_CART + idJogo,null,config).then(()=>
                 Alert.alert(
                   "Operação realizada com exito!",
                  "Item adicionado ao carrinho",
                    [{
                       text:"OK",
                       onPress: () => (navigation1.navigate('Carrinho'))
                  }]))


                }
                else{
                    Alert.alert(
                        "Erro, Cadastro nescessario para concluir ação! ", "Nescessario fazer login para prosseguir...",
                        [{ text: "OK", onPress: () => (navigation1.nav.navigate('Login')) }] 
                    )
                }
            }).catch((error)=>{
                axios.post(Config.API_BASE_URL_CART+idJogo,null,config).then(()=>{
                    Alert.alert(
                        "Operação realizada com exito!",
                       "Item adicionado ao carrinho",
                         [{
                            text:"OK",
                            onPress: () => (navigation1.navigate('Carrinho'))
                       }])
                }).catch((e)=>{
                    console.log(e)
                    Alert.alert(
                        "Erro, Cadastro nescessario para prosseguir!",
                        "Nescessario fazer login para prosseguir...",
                        [{
                            text: "OK",
                           onPress: () => (navigation1.navigate('Login'))
                       }]
                      )
                })
                })
            }

    const editarDadosJogo = (idJogo) =>{
        navigation1.navigate("ADMEditaJogo",{idJogo:idJogo,nav:navigation1});
    }

    async function GetJogos(){

        setTipoUser(await AsyncStorage.getItem('tipoUser'));
      
        axios.get(Config.API_PEGA_JOGUINHO+route.params.idJogo,
           Config.TIMEOUT_REQUEST,Config.HEADER_REQUEST.Accept).then((resp)=>{

            if(resp != null){
            // console.log(resp.data)
            setJogoGetById(resp.data)
            setDesenvolvedor(resp.data.developerDTO.name)
            setDistribuidora(resp.data.distributorDTO.name)
           }
            
           }
           ).catch ((e)=>{
            console.log(e)
          })
      }

    return(
        <View>
            <BarraSuperior title ='Jogo' navigation = {navigation1}/>
            
            <View style={styles.fundoPromocoes}>
                <Text style={styles.textoPromocoes}>
                    { jogoGetById.name }
                </Text>
            </View>
            <ScrollView  style={{height:height-170,width:width,marginBottom:10}}>
                <View style={styles.imagemJogo}>
                    <Image style={{width:'100%',height:'100%'}} source={{uri:jogoGetById.imgUrl}}/>
                </View>
            <View style={{flexDirection:'row',width:width,height:100}}>
                <View style={styles.precoBox}>
                    <Text style={styles.precoTexto}>
                        R${jogoGetById.price}
                 </Text>

                 {
                    tipoUser == 'ROLE_ADMIN'?
                    <Text style={{marginTop:10,color:COR.vinho,fontSize:18,alignSelf:'center'}}>
                        Estoque: {jogoGetById.quantity} unidade
                    </Text>
                    :
                    null
                 }
                 
                </View>
                {
                    tipoUser == 'ROLE_ADMIN'?
                    <TouchableOpacity style={styles.editarJogo} onPress={()=>{
                        editarDadosJogo(jogoGetById.id)
                        }}>
                        <Image style={{width:40,height:40,alignSelf:'center'}} source={lapisEdit} />
                     </TouchableOpacity>
                    :
                <TouchableOpacity style={styles.carrinhoBox} onPress={()=>{
                    addItemToCart(jogoGetById.id)
                    }}>
                    <Image style={{width:40,height:40,alignSelf:'center'}} source={carrinho} />
                 </TouchableOpacity>
                }
            </View>
            <View style={styles.descricaoJogo}>
                <Text style={styles.descricaoTexto}>Descrição</Text>
                <Text style={styles.descricaoCompleta}> {jogoGetById.description}</Text>
            </View>

            <View style={styles.categoriaFormat}>
                 <Text style={styles.categoriasTitulo}>Categorias</Text>
            </View>
            <View style={styles.linhaDivisoria} />
            <View style={{flexDirection:'row',flexWrap:'wrap',width:width,marginBottom:10,paddingHorizontal:30}}> 
            
            {
                categories?
                categories.map((game,key) =>(
                    <View key={key} style={styles.categoriasJogos}>
                        <Text style={styles.categoriasText}>{game.name}</Text>
                    </View>
                ))
                :
                null
            }
                
            </View>

            <View style={[styles.categoriaFormat,{marginTop:10,marginBottom:10,width:200}]}>
                 <Text style={styles.categoriasTitulo}>Desenvolvedora</Text>
            </View>

            <View style={styles.linhaDivisoria} />

                    <View style={[styles.categoriasJogos,{alignSelf:'center',marginBottom:20,width:300}]}>
                        <Text style={styles.categoriasText}>{desenvolvedora}</Text>
                    </View>

            <View style={[styles.categoriaFormat,{marginBottom:10,width:200}]}>
                 <Text style={styles.categoriasTitulo}>Distribuidora</Text>
            </View>
            <View style={styles.linhaDivisoria} />
                    <View style={[styles.categoriasJogos,{alignSelf:'center',marginBottom:20,width:300}]}>
                        <Text style={styles.categoriasText}>{distribuidora}</Text>
                    </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    linhaDivisoria:{
        backgroundColor:COR.verdeFosco,
        width:'100%',
        height:1,
        marginBottom:10

    },
    textoPromocoes:{
      fontSize:22,
      justifyContent:'center',
      fontWeight:'bold',
      flexWrap:'wrap',
    },
    fundoPromocoes:{
      width:300,
      height:60,
      alignSelf:'center',
      alignItems:'center',
      backgroundColor:COR.verdeFosco,
      borderBottomLeftRadius:8,
      borderBottomRightRadius:8,
      marginBottom:0,
    },
    imagemJogo:{
        width: width-20,
        marginTop:20,
        alignSelf:'center',
        height: 220,
        shadowColor: COR.cinza,
        shadowOffset: {
	        width: 0,
	        height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    descricaoJogo:{
        width: width-20,
        alignSelf:'center',
        marginBottom:20
    },
    descricaoTexto:{
        fontSize:25,
        alignSelf:'center',
        fontWeight:'bold',
        borderRadius:4,
        marginBottom:10,
        shadowColor: COR.cinza,
        shadowOffset: {
	        width: 0,
	        height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    descricaoCompleta:{
        fontSize:20,
        color:COR.verdeFosco,
        textAlign:'justify',
        // borderRadius:4,
        // shadowColor: COR.cinza,
        // shadowOffset: {
	    //     width: 0,
	    //     height: 7,
        // },
        // shadowOpacity: 0.43,
        // shadowRadius: 9.51,
        // elevation: 15,
        paddingLeft:10,
        paddingRight:10,
    },
    precoBox:{
        width:180,
        height:50,
        marginLeft:30,
        backgroundColor:COR.branco,
        borderRadius:8,
        marginTop:10,
        marginBottom:10,
        borderColor:COR.verdeFosco,
        borderWidth:2,
    },
    precoTexto:{
        color:COR.verdeFosco,
        fontSize:30,
        alignSelf:'center',
    },
    carrinhoBox:{
        width:70,
        height:50,
        marginTop:10,
        marginLeft:80,
        backgroundColor:COR.vermelho,
        shadowColor: COR.cinza,
        shadowOffset: {
	        width: 0,
	        height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        borderRadius:8,
        paddingHorizontal:7,
        justifyContent:'center',
    },
    editarJogo:{
        width:70,
        height:50,
        marginTop:10,
        marginLeft:80,
        backgroundColor:COR.marrom,
        shadowColor: COR.cinza,
        shadowOffset: {
	        width: 0,
	        height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        borderRadius:8,
        paddingHorizontal:7,
        justifyContent:'center',
    },
    categoriaFormat:{
        alignSelf:'center',
        fontWeight:'bold',
        borderRadius:4,
        shadowColor: COR.cinza,
        shadowOffset: {
	        width: 0,
	        height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    categoriasTitulo:{
        fontSize:25,
        fontWeight:'bold',
        alignSelf:'center',
    },
    categoriasJogos:{
        width:150,
        height:60,
        marginTop:10,
        marginLeft:10,
        backgroundColor:COR.cinza,
        shadowColor: COR.cinza,
        shadowOffset: {
	        width: 0,
	        height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        borderRadius:8,
        paddingHorizontal:7,
        justifyContent:'center'
    },
    categoriasText:{
        color:COR.branco,
        fontSize:20,
        alignSelf:'center',
        fontWeight:'bold',
    }
    });