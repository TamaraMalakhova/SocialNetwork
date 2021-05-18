import {instance, ResponseType} from './api'
import { ProfilePhotosType, ProfileType } from './../types/types'

type SavePhotoResponseDataType = {
  photos: ProfilePhotosType
}

export const profileAPI = {

  getProfile(userId: number) {
      return instance.get<ProfileType>(`profile/${userId}`)
          .then(response => {
              return response.data;
          })
  },

  getStatus(userId: number) {
      return instance.get<string>(`profile/status/${userId}`).then(response => {
        return response.data;
      })
  },

  updateStatus(status: string) {
      return instance.put<ResponseType>(`profile/status`, { status: status }).then(response => {
        return response.data;
      })
  },

  savePhoto(photoFile: File){
      const formData = new FormData();
      formData.append('image', photoFile);
      return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }).then(response => {
        return response.data;
      })
  },

  saveProfile(profile: ProfileType){
      return instance.put<ResponseType>(`profile`, profile).then(response => {
        return response.data;
      })
  }

}