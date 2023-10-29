import axiosClient from '../../global/axiosClient';

const url = 'formatMovie';

const formatMovieApi = {
    getId: async (formatId) => {
        return axiosClient.get(url + '/' + formatId);
    },
    get: async () => {
        return axiosClient.get(url);
    },
    getDistinctMovieIds: async () => {
        return axiosClient.get(url + '/getDistinctMovie');
    },
    getDistinctFormarIds: async () => {
        return axiosClient.get(url + '/getDistinctFormat');
    },
    post: async (data) => {
        return axiosClient.post(url, data);
    },
    put: async (id, data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    delete: async (formatId) => {
        return axiosClient.delete(url + '/' + formatId);
    },
};

export default formatMovieApi;
