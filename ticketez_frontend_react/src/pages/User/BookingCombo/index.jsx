import { Button, Col, Divider, Input, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import styles from './BookingCombo.module.scss';
import classNames from 'classnames/bind';
import comboPic from './../../../assets/img/combo-1.png';
import Paragraph from 'antd/es/typography/Paragraph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import { serviceApi } from '~/api/admin';
import priceSeatApi from '~/api/admin/managementSeat/priceApi';
import Item from 'antd/es/list/Item';
import priceServiceApi from '~/api/admin/ManageCombosAndEvents/priceServiceApi';
import uploadApi from '~/api/service/uploadApi';
const cx = classNames.bind(styles);
function BookingCombo(props) {
    const { showtime, seatBooking } = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comboQuantities, setComboQuantities] = useState({});
    const [total, setTotal] = useState(0.0);
    const [listCombo, setListCombo] = useState([]);
    useEffect(() => {
        const loadCombo = async () => {
            try {
                const resp = await priceServiceApi.findByCplx(2);
                setListCombo(resp.data);
                console.log('combo', resp.data);
            } catch (error) {
                console.log('combo', error);
            }
        };
        // if (isModalOpen) {
        loadCombo();
        // }
    }, []);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handlePlus = (comboId, price) => {
        setTotal((pr) => (pr += price));
        setComboQuantities((prevQuantities) => ({
            ...prevQuantities,
            [comboId]: (prevQuantities[comboId] || 0) + 1,
        }));
    };

    const handleMinus = (comboId, price) => {
        if (comboQuantities[comboId] > 0) {
            setTotal((pr) => (pr -= price));
            setComboQuantities((prevQuantities) => ({
                ...prevQuantities,
                [comboId]: prevQuantities[comboId] - 1,
            }));
        }
    };

    const [ellipsis, setEllipsis] = useState(true);
    return (
        <>
            <div className={cx('wrapper')}>
                <Button onClick={showModal}>Open</Button>
                <Modal
                    {...props}
                    title="Combo - bắp nước"
                    // open={isModalOpen}
                    width={520}
                    // onCancel={handleCancel}
                    footer={[
                        <div key="wrappFooter" className={cx('wrapp-footer-modal')}>
                            <div className={cx('info-total')}>
                                <span className={cx('title')}>Tổng cộng: </span>
                                <span className={cx('amount')}>
                                    {new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(total)}
                                </span>
                            </div>
                            <Button type="primary" className={cx('btn-continue')}>
                                Tiếp tục
                            </Button>
                        </div>,
                    ]}
                >
                    <Row>
                        {isModalOpen &&
                            listCombo.map((combo) => (
                                <Col key={combo.service.id} className={cx('wrapp-content')} span={24}>
                                    <Row gutter={10}>
                                        <Col span={8}>
                                            <div className={cx('wrapp-box-image')}>
                                                <img
                                                    className={cx('image')}
                                                    src={uploadApi.get(combo.service.image)}
                                                    alt=""
                                                />
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <div className={cx('wrapp-box-info')}>
                                                <ul>
                                                    <li className={cx('combo-header')}>
                                                        <span className={cx('combo-name-inner')}>
                                                            {combo.service.name}
                                                        </span>
                                                        <span> - </span>
                                                        <span className={cx('price-combo-inner')}>
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(combo.price.price)}
                                                        </span>
                                                    </li>
                                                    <li className={cx('combo-description')}>
                                                        <Paragraph
                                                            ellipsis={
                                                                ellipsis
                                                                    ? {
                                                                          rows: 4,
                                                                          expandable: true,
                                                                          symbol: 'more',
                                                                      }
                                                                    : false
                                                            }
                                                        >
                                                            {combo.service.description}
                                                        </Paragraph>
                                                    </li>
                                                    <li className={cx('wrapp-quatity')}>
                                                        <span
                                                            className={cx('btn-number', {
                                                                disabled: comboQuantities[combo.service.id] <= 0,
                                                            })}
                                                            onClick={() =>
                                                                handleMinus(combo.service.id, combo.price.price)
                                                            }
                                                        >
                                                            <FontAwesomeIcon icon={solidIcon.faCircleMinus} />
                                                        </span>
                                                        <Input
                                                            readOnly
                                                            className={cx('number')}
                                                            value={comboQuantities[combo.service.id] || 0}
                                                        />
                                                        <span
                                                            className={cx('btn-number')}
                                                            onClick={() =>
                                                                handlePlus(combo.service.id, combo.price.price)
                                                            }
                                                        >
                                                            <FontAwesomeIcon icon={solidIcon.faCirclePlus} />
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </Col>
                                        <Divider />
                                    </Row>
                                </Col>
                            ))}
                    </Row>
                </Modal>
            </div>
        </>
    );
}

export default BookingCombo;
