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

    const categories = jogoGetById.categories;

    const [desenvolvedora,setDesenvolvedor] = useState('');

    const [distribuidora,setDistribuidora] = useState('');

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
            setDesenvolvedor(resp.data.developerDTO.name)
            setDistribuidora(resp.data.distributorDTO.name)

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
                    <Image style={{width:40,height:40,alignSelf:'center'}} source={carrinho} />
                 </TouchableOpacity>
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
                    <TouchableOpacity onPress={ ()=> route.params.nav.navigate("Catalogo",{categoria:game.name})} key={key} style={styles.categoriasJogos}>
                        <Text style={styles.categoriasText}>{game.name}</Text>
                    </TouchableOpacity>
                ))
                :
                null
            }
                
            </View>

            <View style={[styles.categoriaFormat,{marginTop:10,marginBottom:10,width:200}]}>
                 <Text style={styles.categoriasTitulo}>Desenvolvedora</Text>
            </View>

            <View style={styles.linhaDivisoria} />

                    <TouchableOpacity onPress={()=>route.params.nav.navigate("Catalogo",{desenvolvedora:desenvolvedora})} style={[styles.categoriasJogos,{alignSelf:'center',marginBottom:20,width:300}]}>
                        <Text style={styles.categoriasText}>{desenvolvedora}</Text>
                    </TouchableOpacity>

            <View style={[styles.categoriaFormat,{marginBottom:10,width:200}]}>
                 <Text style={styles.categoriasTitulo}>Distribuidora</Text>
            </View>
            <View style={styles.linhaDivisoria} />
                    <TouchableOpacity onPress={()=>route.params.nav.navigate("Catalogo",{distribuidora:distribuidora})} style={[styles.categoriasJogos,{alignSelf:'center',marginBottom:20,width:300}]}>
                        <Text style={styles.categoriasText}>{distribuidora}</Text>
                    </TouchableOpacity>
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