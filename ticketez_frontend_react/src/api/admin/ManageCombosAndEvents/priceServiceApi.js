import BaseApi from '~/api/global/baseApi';
import cinemaComplexApi from '../managementCinema/cinemaComplexApi';
import serviceApi from './serviceApi';
import axiosClient from '~/api/global/axiosClient';
const url = 'priceService';

class PriceServiceApi extends BaseApi {
    constructor() {
        super('priceService');
    }


    async post(data, serviceId, cinemaComplexId) {
        try {
            const [service, cinemaComplex] = await Promise.all([serviceApi.getById(serviceId), cinemaComplexApi.getId(cinemaComplexId)]);
            const values = { ...data, service: service.data, cinemaComplex: cinemaComplex.data };
            console.log('values', values);
            return axiosClient.post(url, values);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    async put(id, data, serviceId, cinemaComplexId) {
        try {
            const [service, cinemaComplex] = await Promise.all([serviceApi.getById(serviceId), cinemaComplexApi.getId(cinemaComplexId)]);
            const values = { id: id, ...data, service: service.data, cinemaComplex: cinemaComplex.data };
            console.log('values', values);
            return axiosClient.put(url + '/' + id, values);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }



}
const priceServiceApi = new PriceServiceApi();
export default priceServiceApi;
