import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View , StyleSheet , Dimensions, TouchableOpacity , ScrollView , Image, Text, BackHandler} from 'react-native';
import COR from '../assets/CSS/COR';
import BarraSuperior from '../componentes/BarraSuperior';
import TelaCadastroJogo from './TelaADMCadastraJogo';

const { width , height} = Dimensions.get('window');

export default function TelaChaves({ navigation }){
    
    const [role,setRole] = useState(async () => {
        const data = await AsyncStorage.getItem('tipoUser')
        setRole(data || null)
      }
    ); 

    useEffect(() => {

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

            <ScrollView style={styles.telaChave}>

                <View style={styles.cardChave}>
                    <Image />
                    <View style={styles.caixaInferiorChave}>
                        <TouchableOpacity >
                            <Text style={styles.textoBotaoRevelarChave}>Revelar Chave</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>
        
        </View>
            :
            <TelaCadastroJogo navigation = {navigation} />
        }
        </>
        
    )
    
}

const styles = StyleSheet.create({
telaChave:{
    width:width-10,
    alignSelf:'center',
    height:height,
    marginBottom:10,
},
cardChave:{
    width:width-30,
    height:250,
    alignSelf:'center',
    marginTop:20,
    backgroundColor:COR.azulado,
    borderRadius:8,
    flexDirection:'column-reverse',
    shadowColor: COR.cinza,
    shadowOffset: {
        width: 0,
        height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
},
caixaInferiorChave:{
    height:50,
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

  },
})