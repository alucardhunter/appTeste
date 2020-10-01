import {
  BANK_LIST,
  BANK_LOADED_SUCESS,
  BANK_LOADED_FAILURE
} from '#/Store/Actions/actionTypes';

const initialState = {
  isLoading: false,
  hasBanks: false,
  banks:[]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case BANK_LIST:
      return{
        ...state,
        isLoading: true
      };
      case BANK_LOADED_SUCESS:
      return{
        ...state,
        banks: action.payload,
        isLoading: false,
        hasBanks: true
      };
      case BANK_LOADED_FAILURE:
      return{
        ...state,
        isLoading: false,
        hasBanks: false
      };
    default:
      return state
  }
}