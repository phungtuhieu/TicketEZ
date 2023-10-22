import axiosClient from '~/api/global/axiosClient';

const url = 'movie';
const movieUserApi = {
    getMovieByCinemaComplex: async (data) => {
        try {
            const result = await axiosClient.post(url + '/get/movie', data);
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};

export default movieUserApi;
