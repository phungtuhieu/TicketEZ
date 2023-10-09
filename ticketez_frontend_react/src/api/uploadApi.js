import axiosClient from './global/axiosClient';

const url = 'upload';

const headers = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
};

const uploadApi = {
    // getActor: async () => {},
    postUpload: async (originFileObj) => {
        var formData = new FormData();
        formData.append('file_to_upload', originFileObj);
        return axiosClient.post(url, formData, headers);
    },

    putUpload: async (id, originFileObj) => {
        var formData = new FormData();
        formData.append('file_to_upload', originFileObj);
        return axiosClient.put(url + '/' + id, formData, headers);
    },

    deleteUpload: async (nameImage) => {
        return axiosClient.delete(url + '/' + nameImage);
    },
};

export default uploadApi;
