import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Input } from 'antd';
import { EnvironmentOutlined, AimOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './ViTri.scss';
import axiosClient from '~/api/global/axiosClient';

function ViTri() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [provinces, setProvinces] = useState('Thành phố Hà Nội');
    const [dataProvinces, setDataProvinces] = useState([]);

    useEffect(() => {
        const get = async () => {
            const res = await axiosClient.get('https://provinces.open-api.vn/api/');
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
    return (
        <div className='wrapper-vitri'>
            <span className="title">Vị trí </span>
            <Button className="btn-first" onClick={showModal} icon={<EnvironmentOutlined />}>
                {provinces}
                <span className="btn-first-icon-right">
                    <FontAwesomeIcon icon={faAngleDown} />
                </span>
            </Button>
            <Modal
                className="modal"
                footer={[
                    <Button className="modal-footer-btn-close" onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Row className="modal-header">
                    <Col span={24} className="modal-header-col1">
                        <span className="modal-header-col1-title">Chọn địa điểm</span>
                        <Input
                            className="modal-header-col1-inputSearch"
                            suffix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                            placeholder="Tìm địa điểm ..."
                        />
                    </Col>
                    <Col span={24} className="modal-header-col2">
                        {dataProvinces.map((a, index) => (
                            <Button
                                key={index}
                                type={a.name === provinces ? '' : 'text'}
                                className={a.name === provinces ? 'btn btn-active' : 'btn btn-text'}
                                onClick={() => {
                                    console.log(a.name);
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

            <Button className="btn-second" icon={<AimOutlined />}>
                Gần bạn
            </Button>
        </div>
    );
}

export default ViTri;
