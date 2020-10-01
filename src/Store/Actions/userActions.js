import {
  LOGIN_USER,  
  USER_LOADED_SUCCESS,
  USER_LOADED_FAILURE,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE
} from './actionTypes'


export const loginUser = () => {  
  return ({
    type:LOGIN_USER,    
  })
}

export const userLoadedSuccess = (user) => {
  return ({
    type:USER_LOADED_SUCCESS,
    payload: user
  })
}

export const userLoadedFailure = () => {
  return ({
    type:USER_LOADED_FAILURE,    
  })
}

export const userRegister = () => {
  return ({
    type: REGISTER_USER,
  })  
}

export const userRegisterSuccess = () => {
  return ({
    type: REGISTER_USER_SUCCESS,
  })  
}

export const userRegisterFailure = () => {
  return ({
    type:   REGISTER_USER_FAILURE
    ,
  })  
}