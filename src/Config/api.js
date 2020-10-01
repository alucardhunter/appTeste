import axios from 'axios';

const endPoints = {
  token: '/token',
  user: '/user',
  bank: '/bank-accounts',
  operation: '/operations',
  user_register: 'auth/local/register',
  user_login: '/auth/local'

};

export const SERVER_URL = 'http://server.5dev.com.br:1337';

export const API = endPoints;

export const http = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});