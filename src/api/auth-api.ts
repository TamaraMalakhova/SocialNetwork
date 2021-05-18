import {instance, ResponseType, ResultCodeForCaptcha, ResultCodesEnum} from './api'

type MeResponseDataType = {
  id: number
  email: string
  login: string
}

type LoginResponseDataType = {
  userId: number
}

export const authAPI = {
  me() {
      return instance.get<ResponseType<MeResponseDataType>>(`auth/me`)
          .then(response => {
              return response.data
          });
  },

  login(email:string, password:string, rememberMe = false, captcha: null | string = null) {
      return instance.post<ResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptcha >>(`auth/login`, { email, password, rememberMe, captcha })
          .then(response => {
              return response.data;
          });
  },

  logout() {
      return instance.delete(`auth/login`)
          .then(response => {
              return response.data;
          });
  }
}