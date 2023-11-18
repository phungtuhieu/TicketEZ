import { data } from 'autoprefixer';
import axios from 'axios';
import axiosClient from '~/api/global/axiosClient';


const auth = 'auth/signin'

const authApi = {

    getLogin: async (valus) => {

        // try {

        const { data } = await axiosClient.post(auth, valus)
        localStorage.setItem('token', JSON.stringify(data.token))
        localStorage.setItem('user', JSON.stringify(data))
        return axiosClient.post(auth, valus)
        // } catch (error) {

        //     return console.log(error);
        // }


    },
    getToken() {
        return JSON.parse(localStorage.getItem('token'))
    },

    getUser() {
        return JSON.parse(localStorage.getItem('user'))
    },




    logout() {
        localStorage.removeItem('user');
        return axiosClient.get(auth)
    }



}



export default authApi;
