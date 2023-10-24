import axiosClient from '~/api/global/axiosClient';
import funcUtils from '~/utils/funcUtils';

const urlCinemaComplex = 'cinemaComplex';
export const cinemaComplexUserApi = {
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
        const result = await axiosClient.get(
            urlCinemaComplex + '/get/get-cinemaComplex-by-provinceId-cinemaChainName-searchNameCCX',
            { params },
        );
        return result.data;
    },
};

// ****************************************************************

const urlMovie = 'movie';
export const movieUserApi = {
    getMovieByCinemaComplex: async (cinemaComplexId) => {
        try {
            if (cinemaComplexId ?? cinemaComplexId) {
                const result = await axiosClient.get(urlMovie + '/get/movies-by-cinemaComplex/' + cinemaComplexId);
                return result.data;
            }
            return funcUtils.notify('CinemaComplexId không tồn tại', 'error');
        } catch (error) {
            console.log(error);
            return error;
        }
    },
};

// ****************************************************************

// const urlGenreMovie = 'genreMovie';
// export const genreMovieUserApi = {
//     getAllGenreMovie: async () => {
//         try {
//             // console.log(data);
//             const result = await axiosClient.get(urlGenreMovie);
//             return result.data;
//         } catch (error) {
//             // console.log(error);
//             return error;
//         }
//     },
// };

// ****************************************************************

// const urlFormatMovie = 'formatMovie';
// export const formatMovieUserApi = {
//     getAllFormatMovie: async () => {
//         try {
//             const result = await axiosClient.get(urlFormatMovie);
//             return result.data;
//         } catch (error) {
//             return error;
//         }
//     },
// };

const urlGenre = 'genre';
export const genreUserApi = {
    getGenreByMovie: async (movieId) => {
        try {
            if (movieId ?? movieId) {
                const result = await axiosClient.get(urlGenre + '/get/genre-by-movie/' + movieId);
                return result.data;
            }
            return funcUtils.notify('MovieId không tồn tại', 'error');
        } catch (error) {
            return error;
        }
    },
};

const urlFormat = 'format';
export const formatUserApi = {
    getFormatByMovie: async (movieId) => {
        try {
            if (movieId ?? movieId) {
                const result = await axiosClient.get(urlFormat + '/get/format-by-movie/' + movieId);
                return result.data;
            }
            return funcUtils.notify('MovieId không tồn tại', 'error');
        } catch (error) {
            return error;
        }
    },
};

const urlCinema = 'cinema';
export const cinemaUserApi = {
    getCinemaByCinemaComplex: async (movie) => {
        try {
            const result = await axiosClient.post(urlCinema + '/get/cinema-by-cinemaComplex', movie);
            return result.data;
        } catch (error) {
            return error;
        }
    },
};
