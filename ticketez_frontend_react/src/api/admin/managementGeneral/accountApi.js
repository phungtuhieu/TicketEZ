import axiosClient from '../../global/axiosClient';

const url = 'account';

const accountApi = {
    getId: async (accountId) => {
        return axiosClient.get(url + '/' + accountId);
    },
    getPage: async (page, limit, active, search) => {
        const params = {
            page: page,
            limit: limit,
            active: active,
            search: search
        };
        const res = await axiosClient.get(url, { params });
        return res.data ;
    },
    post: async (data) => {
        return axiosClient.post(url, data);
    },
    patchActive: async (id, booleanActive) => {
        return axiosClient.patch(url + '/active/' + id, { active: booleanActive });
    },
    patchInfoUser: async (id, data) => {
        return axiosClient.patch(url + '/infoUser/' + id, data);
    },
    put: async (id, data) => {
        return axiosClient.put(url + '/' + id, data);
    },
    delete: async (accountId) => {
        return axiosClient.delete(url + '/' + accountId);
    },
};

export default accountApi;
