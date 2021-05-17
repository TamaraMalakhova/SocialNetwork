import axios from "axios";

import { ProfileType } from './../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'dd6d4e37-41f6-4587-a551-8fbf770d3ce7'
    }
});

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },

    unfollow(id = 1) {
        return instance.delete(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    },

    follow(id = 1) {
        return instance.post(`follow/${id}`)
            .then(response => {
                return response.data;
            });
    }
}

export const profileAPI = {

    getProfile(userId: number) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/${userId}`);
    },

    updateStatus(status: string) {
        return instance.put(`profile/status`, { status: status });
    },

    savePhoto(photoFile: any){
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    saveProfile(profile: ProfileType){
        return instance.put(`profile`, profile);
    }

}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchIsRequired = 10
}

type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => {
                return response.data
            });
    },

    login(email:string, password:string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
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

export const securityAPI = {
    getCaptchaURL() {
        return instance.get(`security/get-captcha-url`);
    }
}
