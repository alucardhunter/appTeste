import {
  BANK_LIST,
  BANK_LOADED_SUCESS,
  BANK_LOADED_FAILURE
} from '#/Store/Actions/actionTypes';

export const listBanks = () => {  
  return ({
    type:BANK_LIST,    
  })
}

export const banksLoadedSuccess = bank => {  
  return ({
    type:BANK_LOADED_SUCESS,
    payload: bank
  })
}

export const banksLoadedFailure = () => {  
  return ({
    type:BANK_LOADED_FAILURE,    
  })
}