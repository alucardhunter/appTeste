import {
  LOGIN_USER,  
  USER_LOADED_SUCCESS,
  USER_LOADED_FAILURE,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
} from '#/Store/Actions/actionTypes';
import AsyncStorage from '@react-native-community/async-storage';


const initialState = {
  isLoading: false,
  isRegistering: false,
  userToken: undefined,
  id: null,
  username: '',
  email: '',
  created_at: '',
  updated_at: '',
  role: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        userToken: action.payload.jwt,
        id: action.payload.user.id,
        username: action.payload.user.username,
        email: action.payload.user.email,
        created_at: action.payload.created_at,
        updated_at: action.payload.updated_at,
        role: action.payload.user.role.name,
        isLoading: false
      };
    case USER_LOADED_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    case REGISTER_USER:
      return {
        ...state,
        isRegistering: true
      };
    case REGISTER_USER_SUCCESS:{
      AsyncStorage.clear();
      state = initialState
    };     
  case REGISTER_USER_FAILURE:
    return {
      ...state,
      isRegistering: false
    };        
    default:
      return state;
  }
}