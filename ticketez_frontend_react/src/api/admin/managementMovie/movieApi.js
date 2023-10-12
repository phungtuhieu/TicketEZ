import axiosClient from '../../global/axiosClient';

const url = 'movie';

const movieApi = {
    getId: async (movieId) => {
        return axiosClient.get(url + '/' + movieId);
    },
    getAll: async () => {
        return axiosClient.get(url);
    },
    post: async (data) => {
        return axiosClient.post(url, data);
    },
    put: async (id, data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    delete: async (movieId) => {
        return axiosClient.delete(url + '/' + movieId);
    },
};

export default movieApi;
