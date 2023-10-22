import axiosClient from '~/api/global/axiosClient';

const urlCinemaComplex = 'cinemaComplex';
export  const cinemaComplexUserApi = {
    getByResultsProvinceIdAndCinemaChainNameAndSearchName: async (
        results,
        provinceId,
        cinemaChainName,
        searchNameCCX,
    ) => {
        const params = {
            results,
            provinceId,
            cinemaChainName,
            searchNameCCX,
        };
        const result = await axiosClient.get(urlCinemaComplex + '/get/get-cinemaComplex-by-provinceId-cinemaChainName-searchNameCCX', { params });
        return result.data;
    },
};

// ****************************************************************

const urlMovie = 'movie';
export const movieUserApi = {
    getMovieByCinemaComplex: async (data) => {
        try {
            const result = await axiosClient.post(urlMovie + '/get/movies-by-cinemaComplex', data);
            return result.data;
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};

// ****************************************************************

const urlGenreMovie = 'genreMovie';
export const genreMovieUserApi = {
    getAllGenreMovie: async () => {
        try {
            // console.log(data);
            const result = await axiosClient.get(urlGenreMovie);
            return result.data;
        } catch (error) {
            // console.log(error);
            return error;
        }
    },
};

// ****************************************************************


const urlFormatMovie = 'formatMovie';
export const formatMovieUserApi = {
    getAllFormatMovie: async () => {
        try {
            const result = await axiosClient.get(urlFormatMovie);
            return result.data;
        } catch (error) {
            return error;
        }
    },
};

