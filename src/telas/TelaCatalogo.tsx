import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
import { RefreshControl } from 'react-native-gesture-handler';
import COR from '../assets/CSS/COR';

import SearchImg from '../assets/icons/lupinha.png';
import Config from '../assets/mocks/Config';

const { width , height} = Dimensions.get('window');

export default function TelaCatalogo({route}){

    useEffect(()=>{
        GetJogos()
        GetCategorias()
        GetDistribuidoras()
        GetDesenvolvedores()
    },[refreshing])

    const [gamesGet,setGamesGet] = useState([{}]);

    const[getCompletoCategorias,setGetCompletoCategorias] = useState([{}])

    const [getCompletoDesenvolvedoras,setGetCompletoDesenvolvedoras] = useState([{}])

    const [getCompletoDistribuidoras,setGetCompletoDistribuidoras] = useState([{}])

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

      async function GetCategorias(){
      
        try{
          const resp = await axios.get(Config.API_PEGA_FILTROS,
           Config.TIMEOUT_REQUEST,Config.HEADER_REQUEST.Accept)
  
           if(resp != null && resp != undefined){
            setGetCompletoCategorias(resp.data.content)

            let newArray = [];

            var quantidadeChaves = Object.keys(getCompletoCategorias).length

            for(var i = 0; i < quantidadeChaves; i++){
                console.log(getCompletoCategorias[i].name)

                newArray.push({
                    label: getCompletoCategorias[i].name,
                    value: getCompletoCategorias[i].id,
                })
            }
                setItensCategoria(newArray)
            }
            
        }
          catch (e)
          {
            console.log(e)
          }
      }

      async function GetDistribuidoras(){
      
        try{
          const resp = await axios.get(Config.API_PEGA_DISTRIBUIDORAS,
           Config.TIMEOUT_REQUEST,Config.HEADER_REQUEST.Accept)
  
           if(resp != null && resp != undefined){
            setGetCompletoDistribuidoras(resp.data.content)

            let newArray = [];

            var quantidadeChaves = Object.keys(getCompletoDistribuidoras).length

            for(var i = 0; i < quantidadeChaves; i++){
                console.log(getCompletoDesenvolvedoras[i].name)

                newArray.push({
                    label: getCompletoDistribuidoras[i].name,
                    value: getCompletoDistribuidoras[i].id,
                })
            }
                setItensDistribuidora(newArray)
            }
            
        }
          catch (e)
          {
            console.log(e)
          }
      }
      
      async function GetDesenvolvedores(){
      
        try{
          const resp = await axios.get(Config.API_PEGA_DESENVOLVEDORES,
           Config.TIMEOUT_REQUEST,Config.HEADER_REQUEST.Accept)
  
           if(resp != null && resp != undefined){
            setGetCompletoDesenvolvedoras(resp.data.content)

            let newArray = [];

            var quantidadeChaves = Object.keys(getCompletoDesenvolvedoras).length

            for(var i = 0; i < quantidadeChaves; i++){
                console.log(getCompletoDesenvolvedoras[i].name)

                newArray.push({
                    label: getCompletoDesenvolvedoras[i].name,
                    value: getCompletoDesenvolvedoras[i].id,
                })
            }
                setItensDesenvolvedora(newArray)
            }
            
        }
          catch (e)
          {
            console.log(e)
          }
      }

      const [itensCategoria, setItensCategoria] = useState([]);

      const [itensDistribuidora, setItensDistribuidora] = useState([]);
    
      const [itensPreco, setItensPreco] = useState([
        
        { label: 'Abaixo de R$20,00', value: '1' },
        { label: 'Abaixo de R$50,00', value: '2' },
        { label: 'Abaixo de R$100,00', value: '3' },
     
      ]);
    
      const [itensDesenvolvedora, setItensDesenvolvedora] = useState([]);

      const EnviarDadosTelaJogoENavegar = (idJogo) =>{
        route.params.nav.navigate("Jogo",{idJogo:idJogo,nav:route.params.nav});
      }
    
      const [categoria, setCategoria] = useState(route.params.categoria? route.params.categoria : '');

      const [openCategoria, setOpenCategoria] = useState(false);
    
      const [distribuidora, setDistribuidora] = useState(route.params.distribuidora? route.params.distribuidora : '');
      const [openDistribuidora, setOpenDistribuidora] = useState(false);
    
      const [preco, setPreco] = useState('');
      const [openPreco, setOpenPreco] = useState(false);
    
      const [Desenvolvedora, setDesenvolvedora] = useState(route.params.desenvolvedora? route.params.desenvolvedora : '');
      const [openDesenvolvedora, setOpenDesenvolvedora] = useState(false);
    
      const [refreshing, setRefreshing] = useState(false);

       //atualiza tela
     const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2300);
      };

      return (
        <ScrollView style={{height:height-130,width:width}}
          decelerationRate={0}
          refreshControl={
            <RefreshControl refreshing={refreshing} 
              onRefresh={onRefresh}/>
          }>
        <View style={styles.center}>
          <View style={styles.viewtitulo}>
            <Text style={styles.titulo}>Tela catalogo</Text>
          </View>
          <View style={styles.pesquisa}>
            <TouchableOpacity style={styles.icon}>
              <Image source={SearchImg} />
            </TouchableOpacity>
            <TextInput
              style={{ width: '100%', height: 48 }}
              placeholder="Pesquisar"
            />
          </View>
          <View style={styles.viewRow}>
            <View style={styles.select}>
            <DropDownPicker
            listMode="MODAL"
            open={openCategoria}
            value={categoria}
            items={itensCategoria}
            setOpen={setOpenCategoria}
            setValue={setCategoria}
            setItems={setItensCategoria}
            placeholder="Categoria"
            searchable
            searchPlaceholder="Pesquisar"
          />
            </View>
            <View style={styles.select}>
              <DropDownPicker
                listMode="MODAL"
                open={openDistribuidora}
                value={distribuidora}
                items={itensDistribuidora}
                setOpen={setOpenDistribuidora}
                setValue={setDistribuidora}
                setItems={setItensDistribuidora}
                placeholder="Distribuidora"
                searchable
                searchPlaceholder="Pesquisar"
              />
            </View>
          </View>
          <View style={styles.viewRow}>
            <View style={styles.select}>
              <DropDownPicker
                listMode="MODAL"
                open={openDesenvolvedora}
                value={Desenvolvedora}
                items={itensDesenvolvedora}
                setOpen={setOpenDesenvolvedora}
                setValue={setDesenvolvedora}
                setItems={setItensDesenvolvedora}
                placeholder="Desenvolvedora"
                searchable
                searchPlaceholder="Pesquisar"
              />
            </View>
            <View style={styles.select}>
              <DropDownPicker
                listMode="MODAL"
                open={openPreco}
                value={preco}
                items={itensPreco}
                setOpen={setOpenPreco}
                setValue={setPreco}
                setItems={setItensPreco}
                placeholder="Preço"
              />
            </View>
          </View>
          <View style={{flexDirection:'row',flexWrap:'wrap',marginTop:10}}>
          {
            gamesGet?
            gamesGet.filter((game) =>{
                if(categoria != ''){
                    for (let i = 0;i< Object.keys(game.categories).length;i++){
                        console.log(categoria)
                        if(game.categories[i].name == categoria){
                            
                            return game
                        }
                    }
                    
                }
                else if (categoria ==''){
                    return game
                }

            }).map((game,key)=>(
                
                      <View key={key} style={styles.cardFormato}>
                        <TouchableOpacity onPress={()=>EnviarDadosTelaJogoENavegar(game.id)}>
                          <Image
                            source={{uri:game.imgUrl}}
                            style={{ width: '100%', height: 100 }}
                          />
                          <View style={styles.content}>
                            <Text numberOfLines={1} style={styles.tituloJogo}>
                              {game.name}
                            </Text>
                            <View style={styles.viewValores}>
                              <View style={styles.viewPreco}>
                                <Text style={styles.preco}>R${game.price}</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
            )):
            null        
          }
            </View>
        </View>
        </ScrollView>
      );
    }
    
    const styles = StyleSheet.create({
      center: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      },
      viewtitulo: {
        marginVertical: 10,
        marginTop: 30,
      },
      titulo: {
        fontSize: 30,
        fontWeight: 'bold',
      },
      pesquisa: {
        width: '80%',
        borderWidth: 1,
        borderColor: COR.cinza,
    
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        borderRadius: 8,
      },
      icon: {
        marginHorizontal: 10,
      },
      select: {
        width: '48%',
      },
      viewRow: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 5,
      },
      cardFormato: {
        width: (width - 40) / 2,
        height: 200,
        borderRadius: 8,
        // backgroundColor: COR.branco,
        backgroundColor: COR.verdeFosco,
        shadowColor: COR.cinza,
        margin: 10,
        shadowOffset: {
          width: 0,
          height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
      },
      content: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      },
      tituloJogo: {
        width: '90%',
        color: COR.branco,
        fontSize: 20,
        fontWeight: '500',
      },
      viewPromocao: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
        padding: 5,
        borderRadius: 8,
      },
      promocao: {
        fontSize: 15,
        fontWeight: '500',
      },
      viewPreco: {
        backgroundColor: COR.azulado,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 8,
      },
      preco: {
        fontSize: 18,
        fontWeight: '500',
      },
      viewValores: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
      },
    });
    