import BaseApi from '~/api/global/baseApi';

class ReviewApi extends BaseApi {
    constructor() {
        super('review');
    }
}
const reviewApi = new ReviewApi();
export default reviewApi;