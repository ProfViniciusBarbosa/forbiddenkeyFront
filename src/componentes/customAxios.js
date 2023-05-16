import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class CustomAxios {
  static post = async (url = '', payload = {}, headers = {}) => {
    const defaultHeader = {
      Authorization: '',
      'Content-Type': 'application/json',
    };
    const token = await AsyncStorage.getItem('token');
    if (token) {
      defaultHeader.Authorization = `Bearer ${token}`;
    }

    return axios.post(url, payload, {
      headers: {...defaultHeader, ...headers},
    });
  };

  static get = async (url = '', headers = {}) => {
    const defaultHeader = {Authorization: ''};
    // const defaultHeader = {  };
    const token = await AsyncStorage.getItem('token');
    if (token) {
      defaultHeader.Authorization = `Bearer ${token}`;
    }
    
    return axios.get(url, {headers: {...defaultHeader, ...headers}});
  };

  static put = async (url = '', payload = {}, headers = {}) => {
    const defaultHeader = {
      Authorization: '',
      'Content-Type': 'application/json',
    };
    const token = await AsyncStorage.getItem('token');
    if (token) {
      defaultHeader.Authorization = `Bearer ${token}`;
    }

    return axios.put(url, payload, {
      headers: {...defaultHeader, ...headers},
    });
  };

  static delete = async (url = '', headers = {}) => {
    const defaultHeader = {
      Authorization: '',
      'Content-Type': 'application/json',
    };
    const token = await AsyncStorage.getItem('token');
    if (token) {
      defaultHeader.Authorization = `Bearer ${token}`;
    }

    return axios.delete(url, {headers: {...defaultHeader, ...headers}});
  };
}

export default CustomAxios;