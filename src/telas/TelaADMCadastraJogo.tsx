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

import RadioForm, { RadioButton } from 'react-native-simple-radio-button';
import COR from '../assets/CSS/COR';
import Config from '../assets/mocks/Config';
import CustomAxios from '../componentes/customAxios';

const { width } = Dimensions.get('window');

export default function TelaCadastroJogo({navigation}) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [distribuidor, setDistribuidor] = useState('');
  const [desenvolvedor, setDesenvolvedor] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState([]);
  const [getCompletoCategorias,setGetCompletoCategorias] = useState([{}])
  const [openCategoria, setOpenCategoria] = useState(false);
  const [itensCategoria, setItensCategoria] = useState([
    { label: 'Categoria 1', value: '1' },
  ]);

  async function GetCategorias(){
      
    try{
      const resp = await CustomAxios.get(Config.API_PEGA_FILTROS)

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

  useEffect(()=>{
    GetCategorias()
  },[])
  return (
    <ScrollView>
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
          <TextInput
            onChangeText={value => setDistribuidor(value)}
            style={styles.input}
          />

          <Text style={styles.label}>Desenvolvedor: </Text>
          <TextInput
            onChangeText={value => setDesenvolvedor(value)}
            style={styles.input}
          />

          <Text style={styles.label}>Imagem: </Text>
          <TextInput
            placeholder="https://imagem.png"
            onChangeText={value => setDesenvolvedor(value)}
            style={styles.input}
          />

          <Text style={styles.label}>Categoria: </Text>
          <View style={styles.viewSelect}>
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
              multiple
              style={styles.Select}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.viewButton}>
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
    height: 40,
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
