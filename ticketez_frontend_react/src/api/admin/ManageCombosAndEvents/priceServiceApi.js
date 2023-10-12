import axiosClient from '../../global/axiosClient';

const url = 'price-service';

const priceServiceApi = {
    getserviceId: async (priceServiceApi) => {
        return axiosClient.get(url + '/' + priceServiceApi);
    },
    get: async () => {
        return axiosClient.get(url);
    },
    post: async (data) => {
        return axiosClient.post(url, data);
    },
    put: async (id ,data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    delete: async (priceServiceApi) => {
        return axiosClient.delete(url + '/' + priceServiceApi);
    },
};

export default priceServiceApi;
