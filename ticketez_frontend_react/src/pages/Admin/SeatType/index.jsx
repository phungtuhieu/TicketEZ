import classNames from 'classnames/bind';
import style from './SeatType.module.scss';
import FormOption from './FormOption';
import React from 'react';
import { useState } from 'react';
import { Modal } from 'antd';
import { Button, Input, Space, Col, Row, Form, message, Popconfirm, Table, Card, Breadcrumb } from 'antd';
import { SearchOutlined, PlusOutlined, HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
const cx = classNames.bind(style);

const columns = [
    {
        title: 'Tên loại ghế',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Jim',
                value: 'Jim',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Green',
                        value: 'Green',
                    },
                    {
                        text: 'Black',
                        value: 'Black',
                    },
                ],
            },
        ],
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Ghi chú',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Jim Red',
        age: 32,
        address: 'London No. 2 Lake Park',
    },
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
function AdminSeatType() {
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
        <div>
            <Card bordered={false} className={cx('card-Breadcrumb')}>
                <Breadcrumb
                    items={[
                        {
                            href: '',
                            title: <HomeOutlined />,
                        },
                        {
                            href: '',
                            title: (
                                <>
                                    <VideoCameraOutlined />
                                    <span> Ghế</span>
                                </>
                            ),
                        },
                        {
                            title: 'ghế',
                        },
                    ]}
                />
            </Card>
            <Card bordered={false} className={cx('card-chart-donut')}>
                <div className={cx('right')}>
                    <Button type="primary" onClick={showModal}>
                        Thêm mới
                    </Button>
                    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <FormOption/>
                    </Modal>
                </div>

                <div>
                    <Table columns={columns} dataSource={data} onChange={onChange} />;
                </div>
            </Card>
        </div>
    );
}

export default AdminSeatType;
