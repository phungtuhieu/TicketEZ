import axiosClient from '../../global/axiosClient';
import cinemaComplexApi from '../managementCinema/cinemaComplexApi';

const url = 'event';

const eventApi = {
    getId: async (Id) => {
        return axiosClient.get(url + '/' + Id);
    },
    getPage: async (page, limit) => {
        const params = {
            page: page,
            limit: limit,
        };
        const res = await axiosClient.get(url, { params });
        return res.data;
    },
    getAll: async () => {
        return axiosClient.get(url);
    },
    post: async (data, cinemaComplexId) => {
        const [cinemaComplex] = await Promise.all([cinemaComplexApi.getId(cinemaComplexId)]);
        const values = { ...data, cinemaComplex: cinemaComplex.data };
        console.log('values', values);
        return axiosClient.post(url, values);
        // return axiosClient.post(url, data);
    },
    put: async (id, data, cinemaComplexId) => {
        const [cinemaComplex] = await Promise.all([cinemaComplexApi.getId(cinemaComplexId)]);
        const values = { id: id, ...data, cinemaComplex: cinemaComplex.data };
        return axiosClient.put(url + '/' + id, values);
    },
    delete: async (actorId) => {
        return axiosClient.delete(url + '/' + actorId);
    },
};

export default eventApi;
