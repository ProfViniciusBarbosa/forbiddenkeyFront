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

import COR from '../assets/COR';
import UserPhoto from '../assets/User.png';

const { width } = Dimensions.get('window');

export default function TelaConta() {
  const [isEditing, setIsEditing] = useState(false);

  // Valores mocados pegar do backend e alterar
  const [nome, setNome] = useState('Bob');
  const [sobrenome, setSobrenome] = useState('Jhonsons');
  const [email, setEmail] = useState('bob@gmail.com');
  const [telefone, setTelefone] = useState('111234567');
  const [cpf, setCpf] = useState('123456');

  return (
    <View style={styles.center}>
      <View style={styles.viewtitulo}>
        <Text style={styles.titulo}>Tela Perfil </Text>
      </View>
      <View style={styles.foto}>
        <Image source={UserPhoto} style={{ width: 90, height: 90 }} />
      </View>
      <View style={styles.viewInfo}>
        <View>
          <Text style={styles.info}>Bob</Text>
        </View>
        <Text style={styles.info}>bob@gmail.com</Text>
      </View>

      <View style={styles.linha} />
      <View style={styles.viewDados}>
        <Text style={styles.label}>Editar dados: </Text>
        <View style={styles.viewRow}>
          <Text style={styles.label}>Nome: </Text>
          <TextInput
            value={nome}
            onChangeText={value => setNome(value)}
            autoFocus
            onBlur={() => setIsEditing(false)}
            style={styles.input}
          />
        </View>

        <View style={styles.viewRow}>
          <Text style={styles.label}>Sobrenome: </Text>
          <TextInput
            value={sobrenome}
            onChangeText={value => setSobrenome(value)}
            autoFocus
            onBlur={() => setIsEditing(false)}
            style={styles.input}
          />
        </View>

        <View style={styles.viewRow}>
          <Text style={styles.label}>Telefone: </Text>
          <TextInput
            value={email}
            onChangeText={value => setEmail(value)}
            autoFocus
            onBlur={() => setIsEditing(false)}
            style={styles.input}
          />
        </View>

        <View style={styles.viewRow}>
          <Text style={styles.label}>Telefone: </Text>
          <TextInput
            value={telefone}
            onChangeText={value => setTelefone(value)}
            autoFocus
            onBlur={() => setIsEditing(false)}
            style={styles.input}
          />
        </View>

        <View style={styles.viewRow}>
          <Text style={styles.label}>CPF: </Text>
          <TextInput
            value={cpf}
            onChangeText={value => setCpf(value)}
            autoFocus
            onBlur={() => setIsEditing(false)}
            style={styles.input}
          />
          {/* <Text style={styles.label}>11112222334</Text> */}
        </View>
      </View>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  center: {
    flex: 1,

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
  foto: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COR.cinza,
    borderRadius: 50,
  },
  viewInfo: {
    marginTop: 10,
    alignItems: 'center',
    textAlign: 'center',
  },
  info: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  edit: {
    fontSize: 15,
    fontWeight: '200',
    marginLeft: 10,
  },
  linha: {
    width: '100%',
    height: 1,
    backgroundColor: COR.cinza,
    margin: 10,
  },
  label: {
    fontSize: 20,
    fontWeight: '200',
    paddingRight: 10,
  },
  viewRow: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  viewDados: {
    width: '90%',
    marginBottom: 100,
  },
  input: {
    width: '60%',
    // width: 200,
    height: 40,
    fontSize: 20,
    fontWeight: '200',
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COR.verdeFosco,
    borderRadius: 8,
  },
  viewButton: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: COR.verdeFosco,
    padding: 5,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: '500',
    color: COR.branco,
  },
});