import axiosClient from '../../global/axiosClient';
import cinemaChainApi from './cinemaChainApi';
import provinceApi from './provinceApi';

const url = 'cinemaComplex';

const cinemaComplexApi = {
    getId: async (cinemaComplexId) => {
        return axiosClient.get(url + '/' + cinemaComplexId);
    },

    getAll: async () => {
        return axiosClient.get(url + '/getAll');
    },
    getPage: async (page, limit) => {
        const params = {
            page: page,
            limit: limit,
        };
        const res = await axiosClient.get(url, { params });
        return res.data;
    },

    post: async (data, provinceId, cinemaChainId) => {
        const [province, cinemaChain] = await Promise.all([
            provinceApi.getId(provinceId),
            cinemaChainApi.getId(cinemaChainId),
           
        ]);
        const values = { ...data, province: province.data, cinemaChain: cinemaChain.data};
        console.log('values', values);
        return axiosClient.post(url, values);
    },
    put: async (id, data, provinceId, cinemaChainId) => {
        const [province, cinemaChain] = await Promise.all([
            provinceApi.getId(provinceId),
            cinemaChainApi.getId(cinemaChainId),
        ]);
        const values = { id: id, ...data, province:  province.data, cinemaChain: cinemaChain.data};
        return axiosClient.put(url + '/' + id, values);
    },
    delete: async (cinemaComplexId) => {
        return axiosClient.delete(url + '/' + cinemaComplexId);
    },
};

export default cinemaComplexApi;
