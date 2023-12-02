import BaseApi from '~/api/global/baseApi';

class ArticleApi extends BaseApi {
    constructor() {
        super('article');
    }

}
const articleApi = new ArticleApi();
export default articleApi;

