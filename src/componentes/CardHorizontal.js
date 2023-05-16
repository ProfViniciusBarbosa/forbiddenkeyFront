import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image, Text } from 'react-native';
import COR from '../assets/CSS/COR';
import AutoScroll from "@homielab/react-native-auto-scroll";

const { width } = Dimensions.get('window');


export default function CardHorizontal(props){

  const [ativador,setAtivador ] = useState(false)

  const EnviarDadosTelaJogoENavegar = (idJogo) =>{
    props.navigation.navigate("Jogo",{idJogo:idJogo,nav:props.navigation});
  }


  useEffect(()=>{
    setTimeout(() => {
      setAtivador(!ativador)
    }, 1000);
    
  },[])
  
    return (
      <AutoScroll key={ativador}>
        <ScrollView style={{width:width*3,marginEnd:-100}}
          //pagingEnabled={true}
          horizontal= {true}
          decelerationRate={0}
          snapToInterval={width}
          snapToAlignment={"center"}
          contentInset={{
            top: 0,
            left: 30,
            bottom: 0,
            right: 30,
          }}>
            <TouchableOpacity onPress={()=>{EnviarDadosTelaJogoENavegar(props.games[0].id)}}>
            <View style={styles.viewBanner}/>
              <Image style={styles.imagemJogo} source={{uri:props.games[0].imgUrl}}/>
              <View style={styles.formatoPreco}>
                <Text style={styles.TextoPreco}>
                  R$ {props.games[0].price}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{EnviarDadosTelaJogoENavegar(props.games[1].id)}}>
            <View style={styles.viewBanner}/>
              <Image style={styles.imagemJogo} source={{uri:props.games[1].imgUrl}}/>
              <View style={styles.formatoPreco}>
                <Text style={styles.TextoPreco}>
                R$ {props.games[1].price}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{EnviarDadosTelaJogoENavegar(props.games[2].id)}}>
            <View style={styles.viewBanner}/>
              <Image style={styles.imagemJogo} source={{uri:props.games[2].imgUrl}}/>
              <View style={styles.formatoPreco}>
                <Text style={styles.TextoPreco}>
                  R$ {props.games[2].price}
                </Text>
              </View>
            </TouchableOpacity>
          
        </ScrollView>
      </AutoScroll>
      );
    }

    const styles = StyleSheet.create({
        viewBanner: {
          marginTop: 10,
          width: width - 20,
          margin: 10,
          height: 200,
          borderRadius: 10,
          shadowColor: COR.cinza,
          shadowOffset: {
              width: 0,
              height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 15,
          //paddingHorizontal : 30
        },
       
        imagemJogo:{
          position:'absolute',
          alignSelf:'center',
          height:200,
          marginTop: 10,
          width:width - 20,
          borderRadius:10,
        },

        formatoPreco:{
          position:'absolute',
          height:30,
          width:100,
          marginVertical:165,
          marginHorizontal:40,
          backgroundColor:COR.branco,
          borderRadius:8,
          alignItems:'center',
        },
        TextoPreco:{
          color:COR.verdeFosco,
          fontSize:20,
          fontWeight:'bold',
        }
      });  