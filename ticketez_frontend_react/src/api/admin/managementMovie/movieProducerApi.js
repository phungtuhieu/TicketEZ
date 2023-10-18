import BaseApi from '~/api/global/baseApi';

class MovieProducerApi extends BaseApi {
    constructor() {
        super('movie-producer');
    }
}
const movieProducerApi = new MovieProducerApi();
export default movieProducerApi;
