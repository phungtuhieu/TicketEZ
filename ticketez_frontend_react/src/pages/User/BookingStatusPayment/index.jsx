import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import style from './BookingStatusPayment.module.scss';
import { TicketDetails } from '../../User';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { Button, Col, QRCode, Row, Tag } from 'antd';
import datrungphuongnamImg from '../../../assets/img/datrungphuongnam.jpg';
import logorap from '../../../assets/img/lotte.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(style);
function BookingStatusPayment() {
    // const location = useLocation();
    const getColorForRating = (ratingCode) => {
        switch (ratingCode) {
            case 'NC-17':
                return '#D80032';
            case 'R':
                return '#FFCD4B';
            case 'PG-13':
                return '#FF9B50';
            case 'PG':
                return '#7A9D54';
            case 'G':
                return '#1A5D1A';
            default:
                return '#f50';
        }
    };
    // Lấy dữ liệu từ state
    // const paymentInfo = location.state?.paymentInfo;
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div style={{ display: 'flex' }}>
                        <div className={cx('wrapper-box-status', 'light')}>
                            <div className={cx('wrapp-icon')}>
                                <FontAwesomeIcon icon={solidIcons.faCircleCheck} style={{ fontSize: 100 }} />
                            </div>
                            <div></div>
                            <p className={cx('info')}>
                                Bạn đã thanh toán thành công có thể kiểm tra các vé ở bên dưới!
                            </p>
                            <Button className="">Vé của tôi</Button>
                        </div>
                        {/* <TicketDetails></TicketDetails> */}
                        <div className={cx('wrapper-ticket-details', 'light')}>
                            <TicketDetails></TicketDetails>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingStatusPayment;
