import { ChangeEvent } from 'react';
import * as FireAuth from 'firebase/auth';

export type ChangeInput = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export interface IParams {
  page: string;
  id: string;
}

export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  email: string;
  password: string;
  remember: boolean;
}

export interface IAuth extends FireAuth.User {}

export interface IProfile {
  name: string;
  email: string;
  address: string;
  website: string;
  phone: string;
  about: string;
}

export interface ICollection {
  id?: string;
  uid?: string;
  title?: string;
  photos?: string[];
  createdAt?: number;
}
