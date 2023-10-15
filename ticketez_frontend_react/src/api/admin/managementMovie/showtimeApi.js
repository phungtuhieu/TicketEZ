import axiosClient from '../../global/axiosClient';
import cinemaApi from '../managementCinema/cinemaApi';
import movieApi from './movieApi';

const url = 'showtime';

const showtimeApi = {
    getActorId: async (actorId) => {
        return axiosClient.get(url + '/' + actorId);
    },
    getShowtime: async (page, limit) => {
        const params = {
            page: page,
            limit: limit,
        };
        const res = await axiosClient.get(url, { params });
        return res.data;
    },
    post: async (data, movieId, cinemaId) => {
        const [movie, cinema] = await Promise.all([movieApi.getById(movieId), cinemaApi.getId(cinemaId)]);
        const values = { ...data, movie: movie.data, cinema: cinema.data };
        console.log('values', values);
        return axiosClient.post(url, values);
    },
    put: async (id, data, movieId, cinemaId) => {
        const [movie, cinema] = await Promise.all([movieApi.getById(movieId), cinemaApi.getId(cinemaId)]);
        const values = {id: id, ...data, movie: movie.data, cinema: cinema.data };

        return axiosClient.put(url + '/' + id, values);
    },
    delete: async (actorId) => {
        return axiosClient.delete(url + '/' + actorId);
    },
};

export default showtimeApi;
