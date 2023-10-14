import BaseApi from '~/api/global/baseApi';

class MovieStudioApi extends BaseApi {
    constructor() {
        super('movie-studio');
    }
}
const movieStudioApi = new MovieStudioApi();
export default movieStudioApi;
