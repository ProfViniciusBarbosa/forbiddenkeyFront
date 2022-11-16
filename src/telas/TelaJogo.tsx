import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View ,StyleSheet, Dimensions, Image, ScrollView, TouchableOpacity} from 'react-native';
import COR from '../assets/CSS/COR';
import Config from '../assets/mocks/Config';
import BarraSuperior from '../componentes/BarraSuperior';
import carrinho from '../assets/icons/carrinho.png';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const { width } = Dimensions.get('window');

export default function TelaJogo({route}){
    
    const [jogoGetById,setJogoGetById] = useState([{}]);

    async function checkCarrinhoELoginEnvio(idJogo){
        
    }

    useEffect(()=>{
        GetJogos();
      },[])
    

    async function GetJogos(){
      
        try{
          const resp = await axios.get(Config.API_PEGA_JOGUINHO+route.params.idJogo,
           Config.TIMEOUT_REQUEST,Config.HEADER_REQUEST.Accept)
  
           if(resp != null){
            console.log(resp.data)
            setJogoGetById(resp.data)
           }
        }
          catch (e)
          {
            console.log(e)
          }
      }

    return(
        <View>
            <BarraSuperior title ='Jogo' navigation = {route.params.nav}/>
            
            <View style={styles.fundoPromocoes}>
                <Text style={styles.textoPromocoes}>
                    { jogoGetById.name }
                </Text>
            </View>
            <ScrollView  style={{height:580,width:width,marginBottom:10}}>
                <View style={styles.imagemJogo}>
                    <Image style={{width:'100%',height:'100%'}} source={{uri:jogoGetById.imgUrl}}/>
                </View>
            <View style={{flexDirection:'row',width:width,height:70}}>
                <View style={styles.precoBox}>
                    <Text style={styles.precoTexto}>
                        R${jogoGetById.price}
                 </Text>
                </View>
                <TouchableOpacity style={styles.carrinhoBox} onPress={()=>checkCarrinhoELoginEnvio(jogoGetById.id)}>
                    <Image style={{width:50,height:50}} source={carrinho} />
                 </TouchableOpacity>
            </View>
            <View style={styles.descricaoJogo}>
                <Text style={styles.descricaoTexto}>Descrição</Text>
                <Text style={styles.descricaoCompleta}>{jogoGetById.description}</Text>
            </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
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
    },
    imagemJogo:{
        width: width-20,
        marginTop:20,
        alignSelf:'center',
        height: 300,
        shadowColor: COR.preto,
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
        backgroundColor:COR.verdeFosco,
        borderRadius:4,
        shadowColor: COR.preto,
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
        color:COR.branco,
        backgroundColor:COR.preto,
        borderRadius:4,
        shadowColor: COR.preto,
        shadowOffset: {
	        width: 0,
	        height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        paddingLeft:10,
        paddingRight:10,
    },
    precoBox:{
        width:180,
        height:50,
        marginLeft:30,
        backgroundColor:COR.vermelho,
        borderRadius:8,
        marginTop:10,
        marginBottom:10
    },
    precoTexto:{
        color:COR.branco,
        fontSize:30,
        alignSelf:'center',
    },
    carrinhoBox:{
        width:70,
        height:51,
        marginTop:10,
        marginLeft:80,
        backgroundColor:COR.cinza,
        shadowColor: COR.preto,
        shadowOffset: {
	        width: 0,
	        height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
        borderRadius:8,
        paddingHorizontal:7,
    }
    });