import axiosClient from '../../global/axiosClient';
import provinceApi from './provinceApi';

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
        return res.data;
    },

    get: async () => {
        return axiosClient.get(url);
    },
    post: async (data, provinceId) => {
        const [province] = await Promise.all([
            provinceApi.getId(provinceId),
           
        ]);
        const values = { ...data, province: province.data};
        console.log('values', values);
        return axiosClient.post(url, values);
    },
    put: async (id, data, provinceId) => {
        const [province] = await Promise.all([
            provinceApi.getId(provinceId),
        ]);
        const values = { id: id, ...data, province:  province.data};
        return axiosClient.put(url + '/' + id, values);
    },
    delete: async (cinemaComplexId) => {
        return axiosClient.delete(url + '/' + cinemaComplexId);
    },
};

export default cinemaComplexApi;
