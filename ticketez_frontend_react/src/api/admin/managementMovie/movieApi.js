import axiosClient from '../../global/axiosClient';

const url = 'movie';

const movieApi = {
    getId: async (actorId) => {
        return axiosClient.get(url + '/' + actorId);
    },
    getAll: async () => {
        return axiosClient.get(url);
    },
    post: async (data ) => {
        return axiosClient.post(url, data);
    },
    put: async (id, data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    delete: async (actorId) => {
        return axiosClient.delete(url + '/' + actorId);
    },
};

export default movieApi;
