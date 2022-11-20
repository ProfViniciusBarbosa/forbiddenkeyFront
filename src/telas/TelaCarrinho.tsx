import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import COR from '../assets/CSS/COR';

const { width } = Dimensions.get('window');
const cartao = [
  {
    label: 'Cartão MASTERCARD final 1234',
    value: 1,
  },
  {
    label: 'Cartão VISA final 5678',
    value: 2,
  },
  {
    label: 'Cartão ELO final 7890',
    value: 3,
  },
];
export default function TelaCart() {
  const [value, setValue] = useState('');
  return (
    <View style={styles.center}>
      <View style={styles.viewtitulo}>
        <Text style={styles.titulo}>Tela carrinho </Text>
      </View>

      <View style={styles.cardFormato}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/pt/3/34/Nova_capa_de_The_Sims_4.png',
          }}
          style={{ width: 130, height: 100 }}
        />

        <View style={styles.content}>
          <View style={styles.viewTituloJogo}>
            <Text numberOfLines={1} style={styles.tituloJogo}>
              THE SIMS 4 - DELUXE
            </Text>
          </View>

          <TouchableOpacity style={styles.viewRemover}>
            <Text style={styles.Remover}>remover</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.linha} />

      <View style={styles.viewRow}>
        <Text style={styles.Total}>TOTAL</Text>

        <Text style={styles.Total}>150,90</Text>
      </View>

      <View style={styles.linha} />

      <View style={styles.viewAddPagamento}>
        <Text style={styles.AddPagamento}>Escolher forma de pagamento</Text>
      </View>
      <View style={styles.RadioButton}>
        <RadioForm
          radio_props={cartao}
          initial={0}
          onPress={item => {
            setValue(item);
          }}
          buttonColor={COR.verdeFosco}
        />
      </View>
      {/*
      <TouchableOpacity>
        <Text>Cartao final 1234</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.viewRemover}>
        <Text style={styles.Remover}>Adicionar cartão</Text>
      </TouchableOpacity>

      <View style={styles.linha} />

      <TouchableOpacity style={styles.viewComprar}>
        <Text style={styles.Comprar}>Finalizar compra</Text>
      </TouchableOpacity>
    </View>
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

  cardFormato: {
    width: '90%',
    flexDirection: 'row',
    height: 130,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    // backgroundColor: COR.branco,
    backgroundColor: COR.verdeFosco,
    shadowColor: COR.preto,
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
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTituloJogo: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 8,
  },
  tituloJogo: {
    color: COR.marrom,
    fontSize: 20,
    fontWeight: '500',
  },
  viewRemover: {
    backgroundColor: COR.azulado,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 4,
    marginTop: 5,
  },
  Remover: {
    fontSize: 18,
    fontWeight: '500',
    color: COR.verdeFosco,
    paddingHorizontal: 8,
  },
  linha: {
    width: '100%',
    height: 1,
    backgroundColor: COR.cinza,
    margin: 10,
  },
  viewRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  Total: {
    fontSize: 18,
    fontWeight: '500',
    color: COR.verdeFosco,
  },
  viewAddPagamento: {
    borderWidth: 1,
    borderColor: COR.cinza,
    padding: 5,
    borderRadius: 8,
    marginTop: 10,
  },
  AddPagamento: {
    fontSize: 20,
    paddingHorizontal: 10,
    fontWeight: '500',
    color: COR.verdeFosco,
  },
  RadioButton: {
    marginVertical: 10,
  },
  viewComprar: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: COR.verdeFosco,
    padding: 5,
    borderRadius: 8,
    marginTop: 20,
  },
  Comprar: {
    fontSize: 25,
    fontWeight: '500',
    color: COR.branco,
  },
});
