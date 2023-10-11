import axiosClient from '../../global/axiosClient';

const url = 'service';

const serviceApi = {
    getserviceId: async (serviceId) => {
        return axiosClient.get(url + '/' + serviceId);
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
    delete: async (serviceId) => {
        return axiosClient.delete(url + '/' + serviceId);
    },
};

export default serviceApi;
