import axiosClient from '../../global/axiosClient';

const url = 'mpaaRating';

const mpaaRatingApi = {
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
    post: async (data) => {
        return axiosClient.post(url, data);
    },
    put: async (id, data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    delete: async (actorId) => {
        return axiosClient.delete(url + '/' + actorId);
    },
};

export default mpaaRatingApi;
