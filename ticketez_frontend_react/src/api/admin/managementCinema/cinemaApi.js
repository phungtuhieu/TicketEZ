import axiosClient from '../../global/axiosClient';

const url = 'cinema';

const cinemaApi = {
    getId: async (actorId) => {
        return axiosClient.get(url + '/' + actorId);
    },
    getAll: async () => {
        return axiosClient.get(url);
    },
    postActor: async (data) => {
        return axiosClient.post(url, data);
    },
    putActor: async (id, data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    deleteActor: async (actorId) => {
        return axiosClient.delete(url + '/' + actorId);
    },
};

export default cinemaApi;
