import axiosClient from '../../global/axiosClient';

const url = 'actor';

const actorApi = {
    getActorId: async (actorId) => {
        return axiosClient.get(url + '/' + actorId);
    },
    getActor: async () => {
        return axiosClient.get(url);
    },
    postActor: async (data) => {
        return axiosClient.post(url, data);
    },
    putActor: async (id ,data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    deleteActor: async (actorId) => {
        return axiosClient.delete(url + '/' + actorId);
    },
};

export default actorApi;
