import {
  OPERATION_LIST,
  OPERATION_LOADED_SUCESS,
  OPERATION_LOADED_FAILURE
} from '#/Store/Actions/actionTypes';

export const listOperations = () => {  
  return ({
    type:OPERATION_LIST,    
  })
}

export const operationsLoadedSuccess = OPERATIONS => {  
  return ({
    type:OPERATION_LOADED_SUCESS,
    payload: OPERATIONS
  })
}

export const operationsLoadedFailure = () => {  
  return ({
    type:OPERATION_LOADED_FAILURE,    
  })
}