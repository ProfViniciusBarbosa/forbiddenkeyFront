import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Dimensions, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import COR from '../assets/CSS/COR';
import Config from '../assets/mocks/Config';
import BarraSuperior from '../componentes/BarraSuperior';
import CardHorizontal from '../componentes/CardHorizontal';

const { width , height} = Dimensions.get('window');

export default function TelaInicial ({ navigation }){

  const [refreshing, setRefreshing] = useState(false);

  const [gamesGet,setGamesGet] = useState([{}]);

  useEffect(()=>{
    GetJogos();
  },[refreshing])

     //atualiza tela
     const onRefresh = () => {
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 2300);
    };

    const EnviarDadosTelaJogoENavegar = (idJogo) =>{
      navigation.navigate("Jogo",{idJogo:idJogo,nav:navigation});
    }

    async function GetJogos(){
      
      try{
        const resp = await axios.get(Config.API_PEGA_JOGOS,
         Config.TIMEOUT_REQUEST,Config.HEADER_REQUEST.Accept)

         if(resp != null){
          setGamesGet(resp.data.content)
         }
      }
        catch (e)
        {
          console.log(e)
        }
    }
    return (
      <View style={{backgroundColor:COR.branco}}>
      <BarraSuperior title='Destaques' navigation = {navigation}/>
      <ScrollView style={{height:height-130,width:width}}
          decelerationRate={0}
          refreshControl={
            <RefreshControl refreshing={refreshing} 
              onRefresh={onRefresh}/>
          }>
      <View style={styles.fundoPromocoes}>
        <Text style={styles.textoPromocoes}>
          Promoções
        </Text>
      </View>
        <View style={{marginTop:-5}}>
          <CardHorizontal/>
        </View>
        <View style={[styles.fundoPromocoes,{marginBottom:10}]}>
        <Text style={styles.textoPromocoes}>
          Jogos
        </Text>
        </View>
        
        <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {
              gamesGet?
              gamesGet.map((game,key) =>(

              <View key={key}
               style={styles.container}>
            <TouchableOpacity key={game.id} style={styles.cardFormato} onPress={()=>EnviarDadosTelaJogoENavegar(game.id)}>
                <View style={styles.LugarImagem}>
                    <Image style={{width:'100%',height:'100%',borderRadius:8}} source={{uri:game.imgUrl}}/>
                </View>
                <Text style={{paddingLeft:8,paddingRight:5,color:COR.branco,fontSize:15}}>{game.name}</Text>
                <View style={{justifyContent:'flex-end'}}>
                
                </View>

            </TouchableOpacity>
            <View style={styles.campoPreco}>
                    <Text style={styles.textoPreco}>{'R$'+game.price}</Text>
                </View>
            </View>
              ))
              :
              null
            }
            </View>
               </ScrollView>

        </View>
      );
    };
    
    const styles = StyleSheet.create({
      center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      },
      container: {
        height:230,
        width:((width)/2)-10,
        marginTop:5,
        marginLeft:5,
        marginRight:5,
        marginBottom:5,
        

    },
    cardFormato:{
        width:(width-30)/2,
        height:230,
        alignSelf:'center',
        borderRadius:8,
        backgroundColor:COR.verdeFosco,
        shadowColor: COR.cinza,
        shadowOffset: {
	        width: 0,
	        height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,

    },
    LugarImagem:{
        width:((width-30)/2),
        height:120,
        borderRadius:8,
        marginBottom:10,
    },
    campoPreco:{
      height:30,
      width:100,
      marginTop:-40,
      borderRadius:8,
      justifyContent:'flex-end',
      marginBottom:5,
      marginHorizontal:75,
      alignItems:'center',
      backgroundColor:COR.branco,
    },
    textoPreco:{
      color:COR.verdeFosco,
      fontSize:20,
      fontWeight:'bold',
    },
    textoPromocoes:{
      fontSize:22,
      fontWeight:'bold',
    },
    fundoPromocoes:{
      width:140,
      height:40,
      alignSelf:'center',
      alignItems:'center',
      backgroundColor:COR.verdeFosco,
      borderBottomLeftRadius:8,
      borderBottomRightRadius:8,
    },
    });