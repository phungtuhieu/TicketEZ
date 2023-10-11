import axiosClient from '../../global/axiosClient';

const url = 'cinemaComplex';

const cinemaComplexApi = {

    getId: async (cinemaComplexId) => {
        return axiosClient.get(url + '/' + cinemaComplexId);
    },
    getPage: async (page, limit) => {
        const params = {
            page: page,
            limit: limit,
        };
        const res = await axiosClient.get(url, { params });
        return res.data ;
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
    delete: async (cinemaComplexId) => {
        return axiosClient.delete(url + '/' + cinemaComplexId);
    }
};


export default cinemaComplexApi;