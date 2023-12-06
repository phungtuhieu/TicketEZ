import { Button, Col, Divider, Input, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import styles from './BookingCombo.module.scss';
import classNames from 'classnames/bind';
import comboPic from './../../../assets/img/combo-1.png';
import Paragraph from 'antd/es/typography/Paragraph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import { serviceApi } from '~/api/admin';
const cx = classNames.bind(styles);
function BookingCombo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [quatity, setQuantity] = useState(0);

    useEffect(() => {
        const loadCombo = async () => {
            const resp = await serviceApi.findByCplx(15);
            console.log('combo', resp);
        };
        loadCombo();
    }, []);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleMinus = () => {
        if (quatity > 0) {
            setQuantity((quatity) => (quatity -= 1));
        }
    };
    const handlePlus = () => {
        setQuantity((quatity) => (quatity += 1));
    };
    const [ellipsis, setEllipsis] = useState(true);
    return (
        <>
            <div className={cx('wrapper')}>
                <Button onClick={showModal}>Open</Button>
                <Modal
                    title="Combo - bắp nước"
                    open={isModalOpen}
                    width={520}
                    onCancel={handleCancel}
                    footer={[
                        <div key="wrappFooter" className={cx('wrapp-footer-modal')}>
                            <div className={cx('info-total')}>
                                <span className={cx('title')}>Tổng cộng: </span>
                                <span className={cx('amount')}>200.000đ </span>
                            </div>
                            <Button type="primary" className={cx('btn-continue')}>
                                Tiếp tục
                            </Button>
                        </div>,
                    ]}
                >
                    <Row>
                        <Col className={cx('wrapp-content')} span={24}>
                            <Row gutter={10}>
                                <Col span={8}>
                                    <div className={cx('wrapp-box-image')}>
                                        <img className={cx('image')} src={comboPic} alt="" />
                                    </div>
                                </Col>
                                <Col span={16}>
                                    <div className={cx('wrapp-box-info')}>
                                        <ul>
                                            <li className={cx('combo-header')}>
                                                <span className={cx('combo-name-inner')}></span> My Combo -{' '}
                                                <span className={cx('price-combo-inner')}>87.000đ</span>{' '}
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
                                                    1 bắp lớn + 1 nước siêu lớn. Nhận trong ngày xem phim* * Miễn phí
                                                    đổi vị bắp Caramel * **Đổi vị phô mai phụ thu thêm tiền** 1 bắp lớn
                                                    + 1 nước siêu lớn. Nhận trong ngày xem phim* * Miễn phí đổi vị bắp
                                                    Caramel * **Đổi vị phô mai phụ thu thêm tiền**
                                                </Paragraph>
                                            </li>
                                            <li className={cx('wrapp-quatity')}>
                                                <span
                                                    className={cx('btn-number', { disabled: quatity <= 0 })}
                                                    onClick={handleMinus}
                                                >
                                                    <FontAwesomeIcon icon={solidIcon.faCircleMinus} />
                                                </span>
                                                <Input readOnly className={cx('number')} value={quatity} />
                                                <span className={cx('btn-number')} onClick={handlePlus}>
                                                    <FontAwesomeIcon icon={solidIcon.faCirclePlus} />
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </Col>
                                <Divider />
                            </Row>
                        </Col>
                    </Row>
                </Modal>
            </div>
        </>
    );
}

export default BookingCombo;
