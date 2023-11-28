import { data } from 'autoprefixer';
import axios from 'axios';
import axiosClient from '~/api/global/axiosClient';

const updateUserEndpoint = '/api/auth';
const auth = 'auth/signin'
const signupSecurity = 'auth/signup'
const logoutSecurity = 'auth/signup'



const authApi = {

    getLogin: async (values) => {
        try {
            const response = await axiosClient.post(auth, values);

            if (response.data.token) {
                localStorage.setItem('token', JSON.stringify(response.data.token));
                console.log('Token:', response.data.token);
            }
            else {
                console.log('Không có dữ liệu user trong phản hồi');
            }
            if (response.data && response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
            } else {
                console.log('Không có dữ liệu user trong phản hồi');
            } if (response.data && response.data.roles) {
                localStorage.setItem('roles', JSON.stringify(response.data.roles));
            } else {
                console.log('Không có dữ liệu roles trong phản hồi');
            }
            console.log('Phản hồi từ server:', response);

            return response;
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            throw error;
        }
    },


    signup: async (values) => {
        try {
            const response = await axiosClient.post(signupSecurity, values);
            const { data } = response;
            if (data.token) {
                localStorage.setItem('token', JSON.stringify(data.token));
            }
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
            }

            return data;
        } catch (error) {
            console.error('lỗi', error);
            throw error;
        }
    },


    getToken() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                return JSON.parse(token);
            } catch (e) {
                console.error('Lỗi khi phân tích token:', e);
                return null;
            }
        }
        return null;
    },

    getUser() {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                return JSON.parse(user);
            } catch (e) {
                console.error('Lỗi khi phân tích user:', e);
                return null;

            }
        }
        return null;
    },


    putUser: async (id, securityAccount) => {
        try {
          const response = await axiosClient.put(`${updateUserEndpoint}/${id}`, securityAccount);
          return response.data; 
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      },



    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        return axiosClient.get(logoutSecurity)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    },





}



export default authApi;
