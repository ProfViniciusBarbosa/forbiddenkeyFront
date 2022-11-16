import React from 'react';
import { View,Text, TouchableOpacity, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';
import COR from '../assets/CSS/COR';
import menu from '../assets/icons/menu.png';
import pesquisa from '../assets/icons/pesquisa.png';
import carrinho from '../assets/icons/carrinho.png';

export default function BarraSuperior(props){
    
    const { height, width } = useWindowDimensions();

    return(
    <View style={{width:width,height:70, backgroundColor:COR.verdeFosco,borderBottomLeftRadius:8,borderBottomRightRadius:8}}>
        <View style={{flexDirection:'row',width:width,height:60,backgroundColor:COR.branco,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
        <TouchableOpacity style={{paddingVertical:15,paddingLeft:5,height:30,width:30}}>
            <Image source={menu} style={{height:30,width:30}}/>
        </TouchableOpacity>
        <Text style={{marginLeft:60,alignSelf:'center',fontSize:25,width:160}}>{props.title}</Text>
        <TouchableOpacity style={{paddingVertical:15,paddingHorizontal:20,height:35,width:35}} onPress={() => props.navigation.navigate("Catalogo")} >
            <Image source={pesquisa} style={{height:35,width:35}}/>
        </TouchableOpacity>
        <TouchableOpacity style={{paddingVertical:15,marginLeft:30,height:36,width:37}}>
            <Image source={carrinho} style={{height:36,width:37}}/>
        </TouchableOpacity>
        </View>
   </View>
   
    )
}