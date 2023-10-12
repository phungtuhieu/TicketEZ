import axiosClient from '../../global/axiosClient';

const baseUrl = 'movie-studio';
const movieStudioApi = {
    getById: async (id) => {
        return axiosClient.get(`${baseUrl}/${id}`);
    },
    getAll: async () => {
        return axiosClient.get(baseUrl);
    },
    post: async (data) => {
        return axiosClient.post(baseUrl, data);
    },
    put: async (id, data) => {
        return axiosClient.put(`${baseUrl}/${id}`, data);
    },
    delete: async (id) => {
        return axiosClient.delete(`${baseUrl}/${id}`);
    },
};
export default movieStudioApi;
