import axiosClient from '../../global/axiosClient';

import BaseApi from '~/api/global/baseApi';

const url = 'auth';
class ProfileApi extends BaseApi {
    constructor() {
        super('auth');
    }
    async putUser(id, data) {
        return axiosClient.put(url + '/' + id, data);
    }


}
const profileApi = new ProfileApi();
export default profileApi;
