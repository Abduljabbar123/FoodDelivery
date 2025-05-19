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
