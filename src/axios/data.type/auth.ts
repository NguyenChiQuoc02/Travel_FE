export interface ILogin {
  accessToken: string;
  id: number;
  username: string;
  email: string;
  roles: string[];
  tokenType: string;
}
export interface IRegister {
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
}
