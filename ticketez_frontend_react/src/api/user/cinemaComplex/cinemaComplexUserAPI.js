import axiosClient from '~/api/global/axiosClient';

const url = 'cinemaComplex';
const cinemaComplexUserApi = {
    getByResultsProvinceIdAndCinemaChainNameAndSearchName: async (
        results,
        provinceId,
        cinemaChainName,
        searchNameCCX,
    ) => {
        const params = {
            results,
            provinceId,
            cinemaChainName,
            searchNameCCX,
        };
        const result = await axiosClient.get(url + '/get/abc', { params });
        return result.data;
    },
};

export default cinemaComplexUserApi;
