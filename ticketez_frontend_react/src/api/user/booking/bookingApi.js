import axiosClient from '~/api/global/axiosClient';
import BaseApi from '~/api/global/baseApi';

class BookingApi extends BaseApi {
    constructor() {
        super('booking');
    }
    async getPaymentInfo(params) {
        return axiosClient.get(`/booking/vnpay-payment`, { params });
    }
}
const bookingApi = new BookingApi();
export default bookingApi;
