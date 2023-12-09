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
    getMovieId: async (movieId, page, limit,) => {
        const params ={ page, limit}
        return axiosClient.get(url +  '/get/by-movie/' + movieId, {params});
    },
    getActorAndDirectorId: async (movieId) => {
        return axiosClient.get(urlMovie +  '/get/actor-director-by-movie/' + movieId);
    },

    //lấy movie theo thể loại và đang chiếu
    getMovieByShowtimeShowingByGenres: async (genresId) => {
        return axiosClient.get(urlMovie + '/get/movie-by-showtime-showing-genres/' + genresId);
    },
    //check tài khoản
    getcheckAccountBooking: async (accountId, movieId) => {
        return axiosClient.get(url + `/get/check-account-booking?accountId=${accountId}&movieId=${movieId}`);
    },
    getMovieOrReview: async (page, limit) => {
        const params = {
            page: page,
            limit: limit,
        };
        return axiosClient.get(url + `/get/by-movie-review`, {params});
    }

}

export default reviewApi;