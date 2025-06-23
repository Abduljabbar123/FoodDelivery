import {
  ADD_ADDRESS,
  GET_ADDRESSES,
  GET_ADDRESS_BY_ID,
  UPDATE_ADDRESS,
  DELETE_ADDRESS,
  SET_DEFAULT_ADDRESS,
  GET_DEFAULT_ADDRESS,
  SET_ADDRESS_LOADING,
  CLEAR_ADDRESSES,
} from './actions';
import {IAddress} from './actions.d';

export interface TAddressState {
  addresses: IAddress[];
  selectedAddress: IAddress | null;
  defaultAddress: IAddress | null;
  loading: boolean;
}

const initialState: TAddressState = {
  addresses: [],
  selectedAddress: null,
  defaultAddress: null,
  loading: false,
};

const addressReducers = (
  state: TAddressState = initialState,
  action: any,
): TAddressState => {
  switch (action.type) {
    case ADD_ADDRESS:
      return {
        ...state,
        addresses: [action.payload, ...state.addresses],
      };

    case GET_ADDRESSES:
      return {
        ...state,
        addresses: action.payload || [],
      };

    case GET_ADDRESS_BY_ID:
      return {
        ...state,
        selectedAddress: action.payload,
      };

    case UPDATE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(address =>
          address._id === action.payload._id ? action.payload : address,
        ),
        selectedAddress:
          state.selectedAddress?._id === action.payload._id
            ? action.payload
            : state.selectedAddress,
        defaultAddress:
          state.defaultAddress?._id === action.payload._id
            ? action.payload
            : state.defaultAddress,
      };

    case DELETE_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.filter(
          address => address._id !== action.payload,
        ),
        selectedAddress:
          state.selectedAddress?._id === action.payload
            ? null
            : state.selectedAddress,
        defaultAddress:
          state.defaultAddress?._id === action.payload
            ? null
            : state.defaultAddress,
      };

    case SET_DEFAULT_ADDRESS:
      return {
        ...state,
        addresses: state.addresses.map(address => ({
          ...address,
          isDefault: address._id === action.payload,
        })),
        defaultAddress:
          state.addresses.find(address => address._id === action.payload) ||
          null,
      };

    case GET_DEFAULT_ADDRESS:
      return {
        ...state,
        defaultAddress: action.payload,
      };

    case SET_ADDRESS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case CLEAR_ADDRESSES:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default addressReducers;
