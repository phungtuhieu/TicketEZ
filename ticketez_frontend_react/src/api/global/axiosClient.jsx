import axios from 'axios';

const baseUrl = process.env.REACT_APP_TICKET_PRODUCTION_REST_API;
// // setup axios client
// console.log(process.env.REACT_APP_TICKET_PRODUCTION_REST_API);
// console.log(process.env);

const axiosClient = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-type': 'application/json',
        
    },
});

// // GET
// export const get = async (api, options = {}) => {
//     try {
//         const response = await axiosClient.get(api, options);
//         if (response.status === 200) {
//             return response.data;
//         }
//         throw new Error(`Yêu cầu không thành công với trạng thái ${response.status}`);
//     } catch (error) {
//         throw error;
//     }
// };

// // POST
// export const post = async (api, data = {}, options = {}) => {
//     try {
//         const response = await axiosClient.post(api, data, options);
//         if (response.status === 200) {
//             return response.data;
//         }
//         throw new Error(`Yêu cầu không thành công với trạng thái ${response.status}`);
//     } catch (error) {
//         throw error;
//     }
// };

// // PUT
// export const put = async (api, data = {}, options = {}) => {
//     try {
//         const response = await axiosClient.put(api, data, options);
//         if (response.status === 200) {
//             return response.data;
//         }
//         throw new Error(`Yêu cầu không thành công với trạng thái ${response.status}`);
//     } catch (error) {
//         throw error;
//     }
// };

// // DELETE
// export const remove = async (api, options = {}) => {
//     try {
//         const response = await axiosClient.delete(api, options);
//         if (response.status === 200) {
//             return response.data;
//         }
//         throw new Error(`Yêu cầu không thành công với trạng thái ${response.status}`);
//     } catch (error) {
//         throw error;
//     }
// };

// axiosClient.interceptors.request.use(
//   (config) => {
//     console.log('Interceptor is running');
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//       console.log('yes');
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default axiosClient;
