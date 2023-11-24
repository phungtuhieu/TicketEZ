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
}
const priceSeatApi = new PriceSeatApi();
export default priceSeatApi;
