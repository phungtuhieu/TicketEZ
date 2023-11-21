import React, { useState, useEffect } from 'react';
import { Button, Input, Space, Col, Row, Form, message, Popconfirm, Upload, Image, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import axiosClient from '~/api/global/axiosClient';

import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
import funcUtils from '~/utils/funcUtils';
import { seatChartApi } from '~/api/admin';
import uploadApi from '~/api/service/uploadApi';

import classNames from 'classnames/bind';
import style from './SeatType.module.scss';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const cx = classNames.bind(style);
const { TextArea } = Input;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const AdminSeatChart = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    // const [checkNick, setCheckNick] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [posts, setPosts] = useState([]);

    const [workSomeThing, setWorkSomeThing] = useState(false);

    //call api
    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await axiosClient.get(`seatchart/getAll`);
                console.log(res);
                setPosts(res.data);
                setLoading(false);
            } catch (error) {
                if (error.hasOwnProperty('response')) {
                    message.error(error.response.data);
                } else {
                    console.log(error);
                }
            }
        };
        getList();
    }, [workSomeThing]);

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            width: '10%',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Tên sơ đồ',
            dataIndex: 'name',
            width: '30%',
        },
        {
            title: 'Trạng thái',
            render: (_, record) => (record.status ? 'Còn hoạt động' : 'Không còn hoạt động'),
            width: '30%',
        },
        {
            title: 'Chuỗi rạp chiếu',
            render: (_, record) => record.cinema.cinemaComplex.cinemaChain.name,
            width: '30%',
        },
        {
            title: 'Cụm rạp',
            render: (_, record) => record.cinema.cinemaComplex.name,
            width: '30%',
        },
        {
            title: 'rạp',
            render: (_, record) => record.cinema.name,
            width: '30%',
        },

        {
            title: 'Thao tác',
            render: (_, record) => (
                <Space size="middle">
                    <FontAwesomeIcon
                        icon={faPen}
                        className={cx('icon-pen')}
                        onClick={() => {
                            handleEditData(record);
                        }}
                    />
                </Space>
            ),
        },
    ];

    const onChangeUpload = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const showModal = () => {
        form.resetFields();
        setEditData(null);
        setOpen(true);
        setResetForm(true);
        setFileList([]);
    };

    const handleEditData = (record) => {
        setOpen(true);
        setResetForm(false);
        setEditData(record);
        form.setFieldsValue({
            ...record,
        });
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            const values = await form.validateFields();
            console.log(values.status);
            if (editData) {
                let putData = {
                    id: editData.id,
                    name: values.name,
                    status: values.status,
                };

                try {
                    const resPatch = await axiosClient.patch(`seatchart/${putData.id}`, putData);
                    console.log(resPatch);
                    if (resPatch.status === 200) {
                        funcUtils.notify('Cập nhật loại ghế thành công', 'success');
                    }
                } catch (error) {
                    if (error.hasOwnProperty('response')) {
                        message.error(error.response.data);
                    } else {
                        console.log(error);
                    }
                }
            }
            setOpen(false);
            form.resetFields();
            setLoading(false);
            setWorkSomeThing(!workSomeThing);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleResetForm = () => {
        form.resetFields();
        setFileList([]);
        console.log(form);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <>
            <Row>
                <Col span={22}>
                    <h1 className={cx('title')}>Bảng dữ liệu sơ đồ</h1>
                </Col>
                <Col span={2}></Col>
                <BaseModal
                    maskClosable={false}
                    open={open}
                    width={'60%'}
                    title={editData ? 'Cập nhật' : 'Thêm mới'}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Thoát
                        </Button>,
                        resetForm && (
                            <Button key="reset" onClick={handleResetForm}>
                                Làm mới
                            </Button>
                        ),
                        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                            {editData ? 'Cập nhật' : 'Thêm mới'}
                        </Button>,
                    ]}
                >
                    <Form form={form} name="dynamic_rule" style={{ maxWidth: 1000 }}>
                        <Form.Item
                            {...formItemLayout}
                            name="name"
                            label="Tên ghế"
                            rules={[{ required: true, message: 'Vui lòng tên ghế' }]}
                        >
                            <Input placeholder="Tên ghế" />
                        </Form.Item>

                        <Form.Item {...formItemLayout} name="status" label="Trạng thái" valuePropName="checked">
                            <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" defaultChecked />
                        </Form.Item>
                    </Form>
                </BaseModal>
            </Row>
            <BaseTable
                pagination={false}
                columns={columns}
                dataSource={posts.map((post) => ({
                    ...post,
                    key: post.id,
                }))}
            />
        </>
    );
};

export default AdminSeatChart;
