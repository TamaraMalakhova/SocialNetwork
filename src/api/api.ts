import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': 'dd6d4e37-41f6-4587-a551-8fbf770d3ce7'
    }
});

export type ResponseType<D={}, RC=ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
  }

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
  }
  
export enum ResultCodeForCaptcha {
    CaptchIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}