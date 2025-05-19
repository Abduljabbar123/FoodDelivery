import {TUser} from 'src/Redux/Reducers/types';

export interface ILogin {
  otp: number | string;
  email: number | string;
}

export type TCallback<T> = (args: T) => void;
export type TGetError = (res: any) => string;

export interface ICommonResponse {
  success: boolean;
  message: string;
}

export interface ILoginResponse extends ICommonResponse {
  user: TUser;
  token?: string;
}
export interface ISignupResponse extends ICommonResponse {
  user: TUser;
}
