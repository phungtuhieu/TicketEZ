import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Input } from 'antd';
import { EnvironmentOutlined, AimOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './ViTri.module.scss';
import axios from 'axios';
import Ngay from '../Ngay/Ngay';

const cx = classNames.bind(style);

function ViTri() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [provinces, setProvinces] = useState('Thành phố Hà Nội');
    const [dataProvinces, setDataProvinces] = useState([]);

    useEffect(() => {
        const get = async () => {
            const res = await axios.get('https://provinces.open-api.vn/api/');
            // console.log(res.data);
            setDataProvinces(res.data);
        };
        get();
    }, [provinces]);
    // console.log(dataProvinces);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // console.log(provinces);

    return (
        <Row style={{  display: 'flex', paddingTop:15 }}>
            <Col
                span={24}
                style={{
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className={cx('khungne')}>
                    <span className={cx('ten-phim')}>Lịch chiếu Đất Rừng Phương Nam</span>
                    <div className={cx('wrapper-vitri')}>
                        <Button className={cx('btn-first')} onClick={showModal} icon={<EnvironmentOutlined />}>
                            {provinces}
                            <span className={cx('btn-first-icon-right')}>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                        </Button>
                        <Modal
                            className={cx('modal', 'slideIn')}
                            footer={
                                <Button className={cx('modal-footer-btn-close')} onClick={handleCancel}>
                                    Đóng
                                </Button>
                            }
                            open={isModalOpen}
                            onOk={handleOk}
                            closeIcon={false}
                            onCancel={handleCancel}
                        >
                            <div className={cx('icon-close')}>
                                <FontAwesomeIcon icon={faXmark} onClick={handleCancel} />
                            </div>
    
                            <Row className={cx('modal-header')}>
                                <Col span={24} className={cx('modal-header-col1')}>
                                    <span className={cx('modal-header-col1-title')}>Chọn địa điểm</span>
                                    <Input
                                        className={cx('modal-header-col1-inputSearch')}
                                        suffix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                                        placeholder="Tìm địa điểm ..."
                                    />
                                </Col>
                                <Col span={24} className={cx('modal-header-col2')}>
                                    {dataProvinces.map((a, index) => (
                                        <Button
                                            key={index}
                                            type={a.name === provinces ? '' : 'text'}
                                            // className={a.name === provinces ? 'btn btn-active' : 'btn btn-text'}
                                            className={cx('btn', {
                                                'btn-active': a.name === provinces,
                                                'btn-text': a.name !== provinces,
                                            })}
                                            onClick={() => {
                                                // console.log(a.name);
                                                setProvinces(a.name);
                                                setIsModalOpen(false);
                                            }}
                                        >
                                            {a.name}
                                        </Button>
                                    ))}
    
                                    {/* <Button className="btn btn-active">{provinces}</Button>
                            <Button type="text" className="btn btn-text">
                                Hà Nội
                            </Button> */}
                                </Col>
                            </Row>
                        </Modal>
    
                        <Button className={cx('btn-second')} icon={<AimOutlined />}>
                            Gần bạn
                        </Button>
                    </div>
                </div>
            </Col>
                    
            <Col span={24} style={{marginTop: 5}}>
               <Ngay/>
            </Col>
        </Row>
    );
}

export default ViTri;
