import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import RemoveImg from '../assets/icons/remover.png';
import COR from '../assets/CSS/COR';
import Config from '../assets/mocks/Config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function TelaCadastroJogo({navigation}) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [distribuidor, setDistribuidor] = useState('');
  const [desenvolvedor, setDesenvolvedor] = useState('');
  const [preco, setPreco] = useState('');
  //distribuidora
  const [getCompletoDistribuidoras,setGetCompletoDistribuidoras] = useState([{}])
  const [itensDistribuidora, setItensDistribuidora] = useState([]);
  const [distribuidora, setDistribuidora] = useState('');
  const [openDistribuidora, setOpenDistribuidora] = useState(false);
  //desenvolvedora
  const [getCompletoDesenvolvedoras,setGetCompletoDesenvolvedoras] = useState([{}])
  const [itensDesenvolvedora, setItensDesenvolvedora] = useState([]);
  const [Desenvolvedora, setDesenvolvedora] = useState('');
  const [openDesenvolvedora, setOpenDesenvolvedora] = useState(false);
  //categoria1
  const [categoria, setCategoria] = useState('');
  const [getCompletoCategorias,setGetCompletoCategorias] = useState([{}])
  const [openCategoria, setOpenCategoria] = useState(false);
  const [itensCategoria, setItensCategoria] = useState([]);
  //categoria2
  const [categoria2, setCategoria2] = useState('');
  const [getCompletoCategorias2,setGetCompletoCategorias2] = useState([{}])
  const [openCategoria2, setOpenCategoria2] = useState(false);
  const [itensCategoria2, setItensCategoria2] = useState([]);
   //categoria3
   const [categoria3, setCategoria3] = useState('');
   const [getCompletoCategorias3,setGetCompletoCategorias3] = useState([{}])
   const [openCategoria3, setOpenCategoria3] = useState(false);
   const [itensCategoria3, setItensCategoria3] = useState([]);
    //categoria4
  const [categoria4, setCategoria4] = useState('');
  const [getCompletoCategorias4,setGetCompletoCategorias4] = useState([{}])
  const [openCategoria4, setOpenCategoria4] = useState(false);
  const [itensCategoria4, setItensCategoria4] = useState([]);

  const [imagemUri, setimagemUri] = useState('');

  var formularioJogo = {
    name: nome,
    quantity: quantidade,
    description: descricao,
    price: preco,
    developerDTO: {
        id: Desenvolvedora
    },
    distributorDTO:{
        id: distribuidora
    },
    launchDate: "2018-11-28T00:00:00Z",
    imgUrl: imagemUri,
    categories: [
        {
            id: categoria,
            name: categoria? itensCategoria[categoria-1].label : '',
            products: []
        },
        {
            id: categoria2,
            name: categoria2? itensCategoria[categoria2-1].label:'',
            products: []
        },
        
        {
          id: categoria3,
          name: categoria3? itensCategoria[categoria3-1].label : '',
          products: []
      },
      {
          id: categoria4,
          name: categoria4? itensCategoria[categoria4-1].label : '',
          products: []
      }
    ]
}


async function enviaDados(){

  let token = await AsyncStorage.getItem('token');
    
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
  
  if( nome != '' && quantidade != '' && descricao != '' &&
  preco != '' && distribuidora != '' && Desenvolvedora != '' && imagemUri != '' && categoria != ''){
    console.log(formularioJogo.categories)
    axios.post(Config.API_CRIA_JOGOS,formularioJogo,config)
    .then(()=>{console.log("Cadastrou o game")})
    .catch((e)=>{console.log(e)})
  }
 
}

  useEffect(()=>{
    GetCategorias();
    GetDistribuidoras();
    GetDesenvolvedores();
  },[])

  //Categoria 01
  useEffect(()=>{
    if(Object.keys(getCompletoCategorias).length > 1){

      let newArray = [];

      const quantidadeChaves = Object.keys(getCompletoCategorias).length

      for(var i = 0; i < quantidadeChaves; i++){
          newArray.push({
              label: getCompletoCategorias[i].name,
              value: getCompletoCategorias[i].id,
          })}
          setItensCategoria(newArray)
      }
          
    },[getCompletoCategorias])

  async function GetCategorias(){

    axios.get(Config.API_PEGA_FILTROS).then((resp)=>{
    
        setGetCompletoCategorias(resp.data)
        setGetCompletoCategorias2(resp.data)
        setGetCompletoCategorias3(resp.data)
        setGetCompletoCategorias4(resp.data)
        
    }).catch((e)=>{console.log(e)})

}

//Categoria 02
  useEffect(()=>{
    if(Object.keys(getCompletoCategorias2).length > 1){

      let newArray = [];

      const quantidadeChaves = Object.keys(getCompletoCategorias2).length

      for(var i = 0; i < quantidadeChaves; i++){
          newArray.push({
              label: getCompletoCategorias2[i].name,
              value: getCompletoCategorias2[i].id,
          })}
          setItensCategoria2(newArray)
      }
          
    },[getCompletoCategorias2])
// Categoria 02


//Categoria 03
useEffect(()=>{
  if(Object.keys(getCompletoCategorias3).length > 1){

    let newArray = [];

    const quantidadeChaves = Object.keys(getCompletoCategorias3).length

    for(var i = 0; i < quantidadeChaves; i++){
        newArray.push({
            label: getCompletoCategorias3[i].name,
            value: getCompletoCategorias3[i].id,
        })}
        setItensCategoria3(newArray)
    }
        
  },[getCompletoCategorias3])
// Categoria 03

//Categoria 04
useEffect(()=>{
  if(Object.keys(getCompletoCategorias4).length > 1){

    let newArray = [];

    const quantidadeChaves = Object.keys(getCompletoCategorias4).length

    for(var i = 0; i < quantidadeChaves; i++){
        newArray.push({
            label: getCompletoCategorias4[i].name,
            value: getCompletoCategorias4[i].id,
        })}
        setItensCategoria4(newArray)
    }
        
  },[getCompletoCategorias4])
// Categoria 04


//Distribuidoras
useEffect(()=>{
  console.log(categoria)
},[categoria])
useEffect(()=>{
  if(Object.keys(getCompletoDistribuidoras).length > 1){
  
    let newArray = [];

    var quantidadeChaves = Object.keys(getCompletoDistribuidoras).length

    for(var i = 0; i < quantidadeChaves; i++){
        newArray.push({
            label: getCompletoDistribuidoras[i].name,
            value: getCompletoDistribuidoras[i].id,
        })
    }
        setItensDistribuidora(newArray)
    }
},[getCompletoDistribuidoras])
//Distribuidoras


//Desenvolvedoras
useEffect(()=>{
  if(Object.keys(getCompletoDesenvolvedoras).length > 1){
    let newArray = [];

    var quantidadeChaves = Object.keys(getCompletoDesenvolvedoras).length

    for(var i = 0; i < quantidadeChaves; i++){
        newArray.push({
            label: getCompletoDesenvolvedoras[i].name,
            value: getCompletoDesenvolvedoras[i].id,
        })
    }
        setItensDesenvolvedora(newArray)
  }
},[getCompletoDesenvolvedoras])
//Desenvolvedoras

function GetDistribuidoras(){
  axios.get(Config.API_PEGA_DISTRIBUIDORAS,
  Config.TIMEOUT_REQUEST,Config.HEADER_REQUEST.Accept).then((resp)=>{
    setGetCompletoDistribuidoras(resp.data)
   }).catch ((e)=>
  {
    console.log(e)
  })
}

function GetDesenvolvedores(){
axios.get(Config.API_PEGA_DESENVOLVEDORES,
Config.TIMEOUT_REQUEST,Config.HEADER_REQUEST.Accept).then((resp)=>{

    setGetCompletoDesenvolvedoras(resp.data)

})}

  return (
    <ScrollView style={{marginBottom:10}}>
      <View style={styles.center}>
        <View style={styles.viewtitulo}>
          <Text style={styles.titulo}>Cadastrar jogo</Text>
        </View>

        <View style={styles.viewDados}>
          <Text style={styles.label}>Nome do jogo: </Text>
          <TextInput
            onChangeText={value => setNome(value)}
            style={styles.input}
          />

          <Text style={styles.label}>Quantidade: </Text>
          <TextInput
            onChangeText={value => setQuantidade(value)}
            style={styles.input}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Descrição: </Text>
          <TextInput
            onChangeText={value => setDescricao(value)}
            style={styles.textArea}
            multiline
          />

          <Text style={styles.label}>Preço: </Text>
          <TextInput
            onChangeText={value => setPreco(value)}
            style={styles.input}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Distribuidora: </Text>
          <View style={styles.viewSelect}>
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
              <TouchableOpacity onPress={() =>{
              setDistribuidora('')
            }} style={{marginHorizontal:20,marginVertical:10}}>
              <Image source={RemoveImg} />
            </TouchableOpacity>
            </View>

          <Text style={styles.label}>Desenvolvedor: </Text>
            <View style={styles.viewSelect}>
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
              <TouchableOpacity onPress={() =>{
              setDesenvolvedora('')
            }} style={{marginHorizontal:20,marginVertical:10}}>
              <Image source={RemoveImg} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Imagem: </Text>
          <TextInput
            placeholder="https://imagem.png"
            value={imagemUri}
            onChangeText={value => setimagemUri(value)}
            style={styles.input}
          />

          <Text style={styles.label}>Categorias: </Text>
          <View style={styles.viewSelect}>
          <DropDownPicker
            listMode="MODAL"
            open={openCategoria}
            value={categoria}
            items={itensCategoria}
            setOpen={setOpenCategoria}
            setValue={setCategoria}
            setItems={setItensCategoria}
            placeholder="Categoria 1"
            searchable
            searchPlaceholder="Pesquisar"
          />
          <TouchableOpacity onPress={() =>{
              setCategoria('')
            }} style={{marginHorizontal:20,marginVertical:10}}>
              <Image source={RemoveImg} />
            </TouchableOpacity>
            </View>
          <View style={styles.viewSelect}>
          <DropDownPicker
            listMode="MODAL"
            open={openCategoria2}
            value={categoria2}
            items={itensCategoria2}
            setOpen={setOpenCategoria2}
            setValue={setCategoria2}
            setItems={setItensCategoria2}
            placeholder="Categoria 2"
            searchable
            searchPlaceholder="Pesquisar"
          />
           <TouchableOpacity onPress={() =>{
              setCategoria2('')
            }} style={{marginHorizontal:20,marginVertical:10}}>
              <Image source={RemoveImg} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewSelect}>
          <DropDownPicker
            listMode="MODAL"
            open={openCategoria3}
            value={categoria3}
            items={itensCategoria3}
            setOpen={setOpenCategoria3}
            setValue={setCategoria3}
            setItems={setItensCategoria3}
            placeholder="Categoria 3"
            searchable
            searchPlaceholder="Pesquisar"
          />
           <TouchableOpacity onPress={() =>{
              setCategoria3('')
            }} style={{marginHorizontal:20,marginVertical:10}}>
              <Image source={RemoveImg} />
            </TouchableOpacity>
          </View>

          <View style={styles.viewSelect}>
          <DropDownPicker
            listMode="MODAL"
            open={openCategoria4}
            value={categoria4}
            items={itensCategoria4}
            setOpen={setOpenCategoria4}
            setValue={setCategoria4}
            setItems={setItensCategoria4}
            placeholder="Categoria 4"
            searchable
            searchPlaceholder="Pesquisar"
          />
           <TouchableOpacity onPress={() =>{
              setCategoria4('')
            }} style={{marginHorizontal:20,marginVertical:10}}>
              <Image source={RemoveImg} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={()=>enviaDados()} style={styles.viewButton}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
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
    // marginVertical: 50,
    marginTop: 30,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  label: {
    width: 200,
    fontSize: 20,
    fontWeight: '200',
    color: COR.preto  
    // paddingRight: 1,
  },
  viewRow: {
    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  viewDados: {
    width: '90%',
    marginBottom: 30,
  },
  input: {
    width: '90%',
    // width: 200,
    lineHeight:20,
    fontSize: 20,
    fontWeight: '200',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COR.verdeFosco,
    borderRadius: 8,
    marginVertical: 5,
  },
  textArea: {
    width: '90%',
    height: 200,
    fontSize: 20,
    fontWeight: '200',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COR.verdeFosco,
    borderRadius: 8,
    textAlignVertical: 'top',
    padding: 10,
    marginVertical: 5,
  },
  viewSelect: {
    width: '48%',
    flexDirection:'row',
  },
  Select: {
    backgroundColor: 'transparent',
    borderColor: COR.verdeFosco,
    marginVertical: 5,
  },
  viewButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: COR.verdeFosco,
    padding: 5,
    borderRadius: 8,
  },
  viewAddFoto: {
    backgroundColor: COR.azulado,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 4,
    marginVertical: 15,
  },
  addFoto: {
    fontSize: 18,
    fontWeight: '500',
    color: COR.verdeFosco,
    paddingHorizontal: 5,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '500',
    color: COR.branco,
  },
});
