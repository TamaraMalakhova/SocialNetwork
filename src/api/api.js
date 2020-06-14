import * as axios from "axios";

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
    },

    getProfile(userId) {
        console.warn('Obsolete method. Use profileAPI method, please!');
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {

    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    getStatus(userId) {
        return instance.get(`profile/status/${userId}`);
    },

    updateStatus(status) {
        return instance.put(`profile/status`, { status: status });
    }

}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data
            });
    },

    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe })
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

