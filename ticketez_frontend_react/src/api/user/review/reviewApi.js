import { accountApi, movieApi } from '~/api/admin';
import axiosClient from '../../global/axiosClient';
const url = 'review'
const urlMovie = 'movie'

const reviewApi = {
    getId: async (reviewId) => {
        return axiosClient.get(url + '/' + reviewId);
    },
    get: async () => {
        return axiosClient.get(url + '/get/all');
    },
    post: async (data, accountId, movieId) => {
        const [account, movie] = await Promise.all([
            accountApi.getById(accountId),
            movieApi.getById(movieId),
        ]);
        const values = { ...data, account: account.data, movie: movie.data.movie };
        console.log('values', values);
        return axiosClient.post(url, values);
    },
    put: async ( data) => {
    
        const values = { ...data };
        return axiosClient.put(url + '/' + values.id ,  values);
    },
    delete: async (reviewId) => {
        return axiosClient.delete(url + '/' + reviewId);
    },
    getMovieId: async (movieId) => {
        return axiosClient.get(url +  '/get/by-movie/' + movieId);
    },
    getActorAndDirectorId: async (movieId) => {
        return axiosClient.get(urlMovie +  '/get/actor-director-by-movie/' + movieId);
    }


}

export default reviewApi;