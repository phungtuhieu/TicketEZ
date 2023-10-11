import funcUtils from '~/utils/funcUtils';
import axiosClient from '../global/axiosClient';

const url = 'upload';

const headers = {
    headers: {
        'Content-Type': 'multipart/form-data',
    },
};

const uploadApi = {
    // getActor: async () => {},
    post: async (originFileObj) => {
        var formData = new FormData();
        formData.append('file_to_upload', originFileObj);
        const dataUpload = await axiosClient.post(url, formData, headers);
        const imageName = dataUpload.data.fieldName;
        console.log(dataUpload);
        if (dataUpload.data.error) {
            funcUtils.notify(dataUpload.data.error, 'error');
            return null;
        }

        return imageName;
    },

    put: async (id, originFileObj) => {
        var formData = new FormData();
        formData.append('file_to_upload', originFileObj);
        const dataUpload = await axiosClient.put(url + '/' + id, formData, headers);
        if (dataUpload.data.error) {
            funcUtils.notify(dataUpload.data.error, 'error');
            return null;
        }

        const imageName = dataUpload.data.fieldName;
        return imageName;
    },

    delete: async (nameImage) => {
        return axiosClient.delete(url + '/' + nameImage);
    },
};

export default uploadApi;
