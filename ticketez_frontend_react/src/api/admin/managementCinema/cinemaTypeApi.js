import axiosClient from '../../global/axiosClient';

const url = 'cinemaType';

const cinemaTypeApi = {

    getId: async (cinemaTypeId) => {
        return axiosClient.get(url + '/' + cinemaTypeId);
    },
    

    get: async () => {
        return axiosClient.get(url);
    },
    post: async (data) => {
        return axiosClient.post(url, data);
    },
    put: async(id, data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    delete: async (cinemaTypeId) => {
        return axiosClient.delete(url + '/' + cinemaTypeId);
    }
};

export default cinemaTypeApi;