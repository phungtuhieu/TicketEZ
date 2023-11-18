import { useLocation } from 'react-router-dom';

function BookingPaid() {
    const location = useLocation();

    // Lấy dữ liệu từ state
    const paymentInfo = location.state?.paymentInfo;
    return (
        <>
            <h1>{JSON.stringify(paymentInfo)}</h1>
        </>
    );
}

export default BookingPaid;
