import axiosClient from '../../global/axiosClient';

const urlMovie = 'movie';
const urlAccount= 'account';
const urlBooking = 'booking';

const AdminDashboardApi = {
    getTotalMovieAndTicket: async () => {
        return axiosClient.get(urlMovie + '/get/total-movie-ticket');
    },
    getTotalUser: async () => {
        return axiosClient.get(urlAccount + '/get/total-user');
    },
    getRevenueStatistics: async () => {
        return axiosClient.get(urlBooking + '/get/Revenue-statistics');
    },
};

export default AdminDashboardApi;
