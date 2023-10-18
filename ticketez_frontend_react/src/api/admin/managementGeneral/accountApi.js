import axiosClient from '../../global/axiosClient';

// const url = 'account';

// const accountApi = {
//     getId: async (accountId) => {
//         return axiosClient.get(url + '/' + accountId);
//     },
//     getByPage: async (page, limit, active, search) => {
//         const params = {
//             page: page,
//             limit: limit,
//             active: active,
//             search: search
//         };
//         const res = await axiosClient.get(url, { params });
//         return res.data ;
//     },
//     post: async (data) => {
//         return axiosClient.post(url, data);
//     },
//     patchActive: async (id, booleanActive) => {
//         return axiosClient.patch(url + '/active/' + id, { active: booleanActive });
//     },
//     patchInfoUser: async (id, data) => {
//         return axiosClient.patch(url + '/infoUser/' + id, data);
//     },
//     put: async (id, data) => {
//         return axiosClient.put(url + '/' + id, data);
//     },
//     delete: async (accountId) => {
//         return axiosClient.delete(url + '/' + accountId);
//     },
// };

// export default accountApi;

import BaseApi from '~/api/global/baseApi';

const url = 'account';
class AccountApi extends BaseApi {
    constructor() {
        super('account');
    }
    async getByPage(page, limit, search, status) {
        const params = {
            page,
            limit,
            search,
            status,
        };
        const res = await axiosClient.get(url, { params });
        return res.data;
    }
    async patchStatus(id, Status) {
        return axiosClient.patch(url + '/status/' + id, { status: Status });
    }
    async patchInfoUser(id, data) {
        return axiosClient.patch(url + '/infoUser/' + id, data);
    }
}
const accountApi = new AccountApi();
export default accountApi;
