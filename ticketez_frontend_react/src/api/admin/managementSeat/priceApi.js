import axiosClient from '~/api/global/axiosClient';
import BaseApi from '~/api/global/baseApi';

class PriceSeatApi extends BaseApi {
    constructor() {
        super('price');
    }
    async getListPriceDbBySeatType(objFind) {
        const { cinemaCplxId, movieId } = objFind;
        return axiosClient.get(`/price/findByCinemaComplexIdAndMovieId/${cinemaCplxId}/${movieId}`);
    }

    async getPriceByMovieAndCinemaComplexAndDate(movieId, cinemaComplexId, date) {
        return axiosClient.get(
            '/price/get/price-by-movie-cinemaComplex/' + movieId + '/' + cinemaComplexId + '/' + date,
        );
    }
    async findAllPriceAndPriceSeatTypeDTOByCinemaComplexIdAndMovieId(cinemaComplexId, movieId) {
        return axiosClient.get('/price/findByCinemaComplexIdAndMovieId/' + cinemaComplexId + '/' + movieId);
    }
}
const priceSeatApi = new PriceSeatApi();
export default priceSeatApi;
