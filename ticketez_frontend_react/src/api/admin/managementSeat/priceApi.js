import axiosClient from '~/api/global/axiosClient';
import BaseApi from '~/api/global/baseApi';

class PriceSeatApi extends BaseApi {
    constructor() {
        super('price');
    }
    async getListPriceDbBySeatTypeIds(objFind) {
        return axiosClient.post('/price/get/price-by-seattype', objFind);
    }

    async findAllPriceAndPriceSeatTypeDTOByCinemaComplexIdAndMovieId(idCinemaComPlex, idMovie) {
        return axiosClient.get('/findByCinemaComplexIdAndMovieId/' + idCinemaComPlex + '/' + idMovie);
    }
}
const priceSeatApi = new PriceSeatApi();
export default priceSeatApi;
