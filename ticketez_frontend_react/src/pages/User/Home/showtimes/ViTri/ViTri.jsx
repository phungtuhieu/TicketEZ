import React, { useState } from 'react';
import { Button, Modal, Row, Col, Input } from 'antd';
import { EnvironmentOutlined, AimOutlined } from '@ant-design/icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './ViTri.scss';

function ViTri() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        <>
            <span className="title">Vị trí </span>
            <Button className="btn-first" onClick={showModal} icon={<EnvironmentOutlined />}>
                Hồ Chí Minh
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
                        <Button className="btn btn-active">Hồ Chí Minh</Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        <Button type="text" className="btn btn-text">
                            Hà Nội
                        </Button>
                        
                        
                    </Col>
                </Row>
            </Modal>

            <Button className="btn-second" icon={<AimOutlined />}>
                Gần bạn
            </Button>
        </>
    );
}

export default ViTri;
