import {instance, GetItemsType, ResponseType} from './api'

export const userAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
      return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
          .then(response => {
              return response.data;
          });
  },

  unfollow(id = 1) {
      return instance.delete<ResponseType>(`follow/${id}`)
          .then(response => {
              return response.data;
          });
  },

  follow(id = 1) {
      return instance.post<ResponseType>(`follow/${id}`)
          .then(response => {
              return response.data;
          });
  }
}