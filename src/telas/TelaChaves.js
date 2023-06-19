import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../assets/mocks/Config';
import React, { useEffect, useState } from 'react';
import { View , Alert, StyleSheet , Dimensions, TouchableOpacity , ScrollView , Image, Text, BackHandler, RefreshControl} from 'react-native';
import axios  from '../componentes/customAxios';
import COR from '../assets/CSS/COR';
import BarraSuperior from '../componentes/BarraSuperior';
import TelaCadastroJogo from './TelaADMCadastraJogo';

const { width , height} = Dimensions.get('window');


export default function TelaChaves({ navigation }){

    const [gamesCustomer, setgamesCustomer] = useState([]);
    
    const [role,setRole] = useState(async () => {
        const data = await AsyncStorage.getItem('tipoUser')
        setRole(data || null)
      }
    ); 

    const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }

    useEffect(() => {

        gamesAll();

        const backAction = () => {
          
          navigation.goBack()
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

      async function gamesAll(){

        let token = await AsyncStorage.getItem('token');
        
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get(Config.API_GET_GAMES_COSTUMER,config).then((response)=>{
            setgamesCustomer(response.data)
            
        }).catch((e) => {
            setgamesCustomer([])
            console.log("Não Há Jogos no momento")
        })

      }

      async function verJogos(id){
        let token = await AsyncStorage.getItem('token');

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        Alert.alert(
            "Deseja revelar Chave de Jogo?!",
            "Você está prestes a revelar a sua chave, deseja prosseguir?",
            [
              {
                text: 'Sim', onPress: () => {
                    axios.put(Config.API_SEE_GAME_KEY +id , null, config)
                    .then(()=>{
                        gamesAll();
                        onRefresh();
                    })
                    .catch((e)=>{console.log(e)})
                }
            },
              {text: 'Não', onPress: ()=> null}
            ])
      }

    return(
        <>
        {
            role == "ROLE_CUSTOMER"?
            <View>
                <BarraSuperior title="Compras" navigation = {navigation} />

                <View style={styles.fundoChaves}>
                    <Text style={styles.textoChaves}>
                        Chaves
                    </Text>
                </View>

                <ScrollView style={styles.telaChave} 
                refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>

                    {
                        gamesCustomer.length < 1 || gamesCustomer == undefined?
                        <View>
                            <Text style={{alignSelf:'center',marginVertical:250, fontSize:26,textAlign:'center',color:COR.vinho,width:300}}>
                            Lista de jogos vazia!
                            </Text>
                        </View>  
                        :
                        gamesCustomer != undefined && gamesCustomer != null?
                        gamesCustomer.map((games,key)=>(
                        <View key={key} style={styles.cardChave}>
                            <Image source={{uri:games.productDTO.imgUrl}} style={{height:180,width:width-60,marginVertical:15,borderRadius:8}}/>
                            <Text style={{fontSize:20,fontWeight:'bold',marginBottom:2,color:COR.verdeFosco}}>{games.productDTO.name}</Text>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>CHAVE: {games.seen == true? games.activationKey :'*************'}</Text>
                            
                                {
                                    games.seen == true?
                                    <View style={{marginTop:10}}>
                                        <Text style={[styles.textoBotaoRevelarChave,{color:COR.cinza}]}> Chave Revelada! </Text>
                                    </View>
                                    :
                                    <View style={styles.caixaInferiorChave}>
                                    <TouchableOpacity onPress={()=>{verJogos(games.id)}}>
                                        <Text style={[styles.textoBotaoRevelarChave,{color:COR.vinho}]}> Revelar Chave </Text>
                                    </TouchableOpacity>
                                    </View>
                                }
                            
                        </View>
                        ))
                        :
                        null
                    }
                </ScrollView>
        
        </View>
            :
            role == "ROLE_ADMIN"?
            <TelaCadastroJogo navigation = {navigation} />
            :
            <View>
                <BarraSuperior title="Compras" navigation = {navigation} />
            
            <View style={styles.fundoChaves}>
                <Text style={styles.textoChaves}>
                    Chaves
                </Text>
            </View>
                <Text style={{alignSelf:'center',marginVertical:250, fontSize:26,textAlign:'center',color:COR.vinho,width:300}}>
                    É necessário fazer Login para ver seu produtos!
                </Text>
               
            </View>
        }
        </>
        
    )
    
}

const styles = StyleSheet.create({
telaChave:{
    width:width-10,
    alignSelf:'center',
    height:height*0.81,
},
cardChave:{
    width:width-30,
    height:350,
    alignSelf:'center',
    alignItems:'center',
    marginTop:20,
    backgroundColor:COR.azulado,
    borderRadius:8,
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
    marginBottom:10
},
caixaInferiorChave:{
    marginTop:10,
    height:40,
    width:200,
    alignSelf:'center',
    marginBottom:20,
    backgroundColor:COR.branco,
    borderRadius:8,
    borderColor:COR.cinza,
    borderWidth:2,
},
textoChaves:{
    fontSize:22,
    fontWeight:'bold',
  },
  fundoChaves:{
    width:140,
    height:40,
    alignSelf:'center',
    alignItems:'center',
    backgroundColor:COR.verdeFosco,
    borderBottomLeftRadius:8,
    borderBottomRightRadius:8,
  },
  textoBotaoRevelarChave:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center',
  },
})