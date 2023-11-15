import axiosClient from '~/api/global/axiosClient';
import BaseApi from '~/api/global/baseApi';

class PriceSeatApi extends BaseApi {
    constructor() {
        super('price');
    }
    async getListPriceDbBySeatTypeIds(objFind) {
        console.log(objFind);
        return axiosClient.post('/price/get/price-by-seattype', objFind);
    }
}
const priceSeatApi = new PriceSeatApi();
export default priceSeatApi;
