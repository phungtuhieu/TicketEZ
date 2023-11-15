import BaseApi from '~/api/global/baseApi';

class BookingApi extends BaseApi {
    constructor() {
        super('booking');
    }
}
const bookingApi = new BookingApi();
export default bookingApi;
