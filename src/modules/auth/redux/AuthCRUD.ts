import axios ,  { AxiosPromise } from 'axios'
import {AuthModel} from '../models/AuthModel'
import {UserModel} from '../models/UserModel'

const API_URL = process.env.NEXT_PUBLIC_API_URL
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/user/fetch_user_details`
export const LOGIN_URL = `${API_URL}/auth/users/sign_in`
export const REGISTER_URL = `${API_URL}/auth/users`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel

export function login(formData: FormData): AxiosPromise {
  return axios.post(LOGIN_URL, formData);
}

// Server should return AuthModel
export function register(email: string, firstname: string, lastname: string, password: string) {
  const formData = new FormData();
  formData.append('user[email]', email);
  formData.append('user[first_name]', firstname);
  formData.append('user[last_name]', lastname);
  formData.append('user[password]', password);
  return axios.post<AuthModel>(REGISTER_URL, formData)
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.get<{result: boolean}>(REQUEST_PASSWORD_URL, {
    params: {
      email: email,
    },
  })
}

export function getUserByToken(){
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}
