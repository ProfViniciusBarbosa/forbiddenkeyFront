import axios from 'axios';
import * as qs from 'qs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../assets/mocks/Config';
import { useState } from 'react';


class LoginService {
  static signin = async (data) => {
    try {
      const { username, password } = data;
      const params = {
        username: username,
        password: password,
        grant_type: 'password',
        scope: 'read write',
        client_id: 'forbiddenkey',
        client_secret: 'forbiddenkey123',
      };
      const response = await axios.post(
        Config.API_LOGA_USER,
        qs.stringify(params),
        {
          headers: { 
            'Authorization': 'Basic Zm9yYmlkZGVua2V5OmZvcmJpZGRlbmtleTEyMw==',
            'Content-Type': 'application/x-www-form-urlencoded' },
        }
      );
      await AsyncStorage.setItem('token', response.data['access_token']);
      let roleUser = '';
      response.data.role.map( (role) => (roleUser = role.authority));
      await AsyncStorage.setItem('tipoUser', roleUser);
      console.log(roleUser)
      return response.data;
    } catch (e) {
      console.log(JSON.stringify(e));
    }
  };
}

export default LoginService;