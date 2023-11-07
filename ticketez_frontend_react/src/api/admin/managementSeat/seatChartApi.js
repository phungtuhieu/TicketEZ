import BaseApi from '~/api/global/baseApi';

class SeatChartApi extends BaseApi {
    constructor() {
        super('seatchart');
    }
}
const seatChartApi = new SeatChartApi();


export default seatChartApi;

