import axiosClient from '../global/axiosClient';

const url = 'actor';

const actorApi = {
    getActor: async () => {
        return axiosClient.get(url);
    },
    postActor: async (data) => {
        return axiosClient.post(url, data);
    },
    putActor: async (data) => {
        return axiosClient.put(url + '/' + data.id, data);
    },
    deleteActor: async (id) => {
        return axiosClient.delete(url + '/' + id);
    },
};

export default actorApi;
