import Button from '~/components/Admin/Button/index';
import { PoweroffOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Modal } from 'antd';

function AdminIndex() {
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
            <h1>Index admin</h1>
            <Button type="icon" onClick={showModal}>
                {<PoweroffOutlined />}
            </Button>

            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <Button type="primary" icon={<PoweroffOutlined />}>
                    ok
                </Button>
            </Modal>

            <Button type="primary" icon={<PoweroffOutlined />} black>
                Xoá
            </Button>
        </>
    );
}

export default AdminIndex;
