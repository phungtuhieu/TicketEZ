import axiosClient from '../../global/axiosClient';

const url = 'director';
const directorApi = {
    getDirectorId: async (directorId) => {
        return axiosClient.get(url + '/' + directorId);
    },
    getDirector: async () => {
        return axiosClient.get(url);
    },
    postDirector: async (data) => {
        return axiosClient.post(url, data);
    },
    putDirector: async (id ,data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    deleteDirector: async (directorId) => {
        return axiosClient.delete(url + '/' + directorId);
    },
};

export default directorApi;