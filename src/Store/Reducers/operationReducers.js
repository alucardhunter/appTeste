import {
  OPERATION_LIST,
  OPERATION_LOADED_SUCESS,
  OPERATION_LOADED_FAILURE
} from '#/Store/Actions/actionTypes';

const initialState = {
  isLoading: false,
  hasOperations: false,
  operations:[]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case OPERATION_LIST:
      return{
        ...state,
        isLoading: true
      };
      case OPERATION_LOADED_SUCESS:
      return{
        ...state,
        operations: action.payload,
        isLoading: false,
        hasOperations: true
      };
      case OPERATION_LOADED_FAILURE:
      return{
        ...state,
        isLoading: false,
        hasOperations: false
      };
    default:
      return state
  }
}