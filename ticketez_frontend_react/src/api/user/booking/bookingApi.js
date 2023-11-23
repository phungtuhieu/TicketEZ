import axiosClient from '~/api/global/axiosClient';
import BaseApi from '~/api/global/baseApi';

class BookingApi extends BaseApi {
    constructor() {
        super('booking');
    }
    async getPaymentInfoParams(params) {
        return axiosClient.get(`/booking/vnpay-payment`, { params });
    }
    async getPaymentInfoById(id) {
        return axiosClient.get(`/booking/payment-info/${id}`);
    }
}
const bookingApi = new BookingApi();
export default bookingApi;
