import {ICommonResponse} from '../../Reducers/types';

export interface IAddress {
  _id: string;
  user: string;
  addressType: string;
  label: string;
  address: string;
  apartment?: string;
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
  instructions?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAddressResponse extends ICommonResponse {
  address?: IAddress;
  addresses?: IAddress[];
  count?: number;
}

export interface IAddressRequest {
  addressType: string;
  label: string;
  address: string;
  apartment?: string;
  street: string;
  city: string;
  state: string;
  postCode: string;
  country: string;
  isDefault?: boolean;
  latitude?: number;
  longitude?: number;
  instructions?: string;
}
