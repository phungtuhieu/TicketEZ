import BaseApi from '~/api/global/baseApi';

class PriceServiceApi extends BaseApi {
    constructor() {
        super('priceService');
    }

}
const priceServiceApi = new PriceServiceApi();
export default priceServiceApi;
