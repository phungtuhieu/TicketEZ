import React, {  useState, useEffect } from 'react';
import {
    Button,
    Input,
    Space,
    Col,
    Row,
    Form,
    message,
    Popconfirm,
    DatePicker,
    Upload,
    Image,
    Tag,
    Select,
    Switch,
} from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';

import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
import funcUtils from '~/utils/funcUtils';

import { accountApi } from '~/api/admin';
import uploadApi from '~/api/service/uploadApi';

import classNames from 'classnames/bind';
import style from './Account.module.scss';
import PaginationCustom from '~/components/Admin/PaginationCustom';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const cx = classNames.bind(style);

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const AdminAccount = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    // const [checkNick, setCheckNick] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [posts, setPosts] = useState([]);

    const [workSomeThing, setWorkSomeThing] = useState(false);

    const [totalItems, setTotalItems] = useState(0); // Tổng số mục
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10); // Số mục trên mỗi trang

    const [active, setActive] = useState(true);
    const [search, setSearch] = useState('');

    //call api
    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await accountApi.getByPage(currentPage, pageSize, active, search);
                setTotalItems(res.totalItems);
                setPosts(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                funcUtils.notify(error.response.data, 'error');
            }
        };
        getList();
    }, [currentPage, pageSize, workSomeThing, active, search]);

    const columns = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'image',
            render: (_, record) => (
                <Space size="middle">
                    <Image
                        width={105}
                        height={80}
                        style={{ objectFit: 'contain' }}
                        alt="ảnh rỗng"
                        src={`http://localhost:8081/api/upload/${record.image}`}
                    />
                </Space>
            ),
        },
        {
            title: 'Họ và tên',
            dataIndex: 'fullname',
            // width: '30%',
            // ...getColumnSearchProps('fullname'),
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            render: (_, record) => (record.gender ? 'Nam' : 'Nữ'),
        },
        {
            title: 'email',
            dataIndex: 'email',
            // width: '10%',
        },
        {
            title: 'Hoạt động',
            dataIndex: 'active',
            render: (_, record) => {
                const statusText = record.active ? 'Hoạt động' : 'Khoá ';
                const tagColor = record.active ? 'green' : 'red';

                return <Tag color={tagColor}>{statusText}</Tag>;
            },
            align: 'center',
        },
        {
            title: 'Thao tác',
            render: (_, record) => (
                <Space size="middle">
                    {record.active && (
                        <FontAwesomeIcon
                            icon={faPen}
                            className={cx('icon-pen')}
                            onClick={() => {
                                handleEditData(record);
                            }}
                        />
                    )}

                    <Popconfirm
                        title={record.active ? 'Khoá tài khoản' : 'Mở khoá tài khoản'}
                        description={record.active ? 'Chắn chắn khoá?' : 'Chắn chắn mở?'}
                        okText="Đồng ý"
                        cancelText="Huỷ"
                        onConfirm={() => handleActive(record)}
                    >
                        {record.active ? (
                            <FontAwesomeIcon icon={faLockOpen} className={cx('icon-trash')} />
                        ) : (
                            <FontAwesomeIcon icon={faLock} className={cx('icon-trash')} />
                        )}
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const onChangeUpload = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleActive = async (record) => {
        try {
            if (record.phone) {
                const active = record.active ? false : true;
                const res = await accountApi.patchActive(record.phone, active);
                if (res.status === 200 && !active) {
                    funcUtils.notify('Khoá tài khoản thành công', 'success');
                } else {
                    funcUtils.notify('Mở tài khoản thành công', 'success');
                }
            }
        } catch (error) {
            console.log(error);
            funcUtils.notify(error.response.data, 'error');
        }
        setWorkSomeThing(!workSomeThing);
    };

    const handleEditData = (record) => {
        console.log(record);
        const newUploadFile = {
            uid: record.phone.toString(),
            name: record.image,
            url: `http://localhost:8081/api/upload/${record.image}`,
        };
        setFileList([newUploadFile]);
        setOpen(true);
        setResetForm(false);
        setEditData(record);
        form.setFieldsValue({
            ...record,
            birthday: dayjs(record.birthday, 'DD-MM-YYYY'),
        });
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            const values = await form.validateFields();
            console.log(values);
            if (fileList.length > 0) {
                if (editData) {
                    let upl = {
                        ...values,
                    };
                    console.log(upl);
                    if (upl.image.fileList) {
                        const file = upl.image.fileList[0].originFileObj;
                        console.log(file);
                        const image = await uploadApi.put(editData.image, file);
                        upl = {
                            ...upl,
                            image: image,
                        };
                    }
                    await accountApi.patchInfoUser(values.phone, upl);
                    funcUtils.notify('Cập nhật diễn viên thành công', 'success');
                }
                setOpen(false);
                form.resetFields();
                setLoading(false);
                setFileList([]);
                setWorkSomeThing(!workSomeThing);
            } else {
                setLoading(false);
                message.error('vui lòng chọn ảnh');
            }
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };

    // useEffect(() => {
    //     form.validateFields(['nickname']);
    // }, [checkNick, form]);

    //form
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

    // Xử lý sự kiện thay đổi trang
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setActive(value);
    };
    return (
        <>
            <Row>
                <Col span={22}>
                    <h1 className={cx('title')}>Bảng dữ liệu</h1>
                </Col>

                <Col>
                    <Select
                        defaultValue={true}
                        style={{
                            width: 150,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                label: 'Danh sách tài khoản',
                                options: [
                                    { label: 'Hoạt động', value: true },
                                    { label: 'Bị khoá', value: false },
                                ],
                            },
                        ]}
                    />
                    <Input onChange={(e) => setSearch(e.target.value)} />
                </Col>

                <BaseModal
                    maskClosable={false}
                    open={open}
                    width={'60%'}
                    title="Cập nhật"
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
                        <Button key="submit" type="primary" loading={loading} onClick={() => form.submit()}>
                            Cập nhật
                        </Button>,
                    ]}
                >
                    <Form form={form} name="dynamic_rule" onFinish={handleOk} style={{ maxWidth: 1000 }}>
                        <Form.Item name="phone" style={{ display: 'none' }}></Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="fullname"
                            label="Họ và tên"
                            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                        >
                            <Input placeholder="Họ và tên" />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            name="birthday"
                            label="Ngày sinh"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày' }]}
                        >
                            <DatePicker placeholder="Ngày sinh" format={'DD-MM-YYYY'} style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            name="gender"
                            label="Giới tính"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày' }]}
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="Nam" unCheckedChildren="Nữ" defaultChecked />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            name="email"
                            label="Emai"
                            rules={[{ required: true, message: 'Vui lòng nhập ngày' }]}
                        >
                            <Input placeholder="Họ và tên" />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Ảnh đại diện"
                            name="image"
                            rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện' }]}
                        >
                            <Upload
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                accept=".png, .jpg"
                                listType="picture-card"
                                onChange={onChangeUpload}
                                onPreview={onPreview}
                                fileList={fileList}
                                name="image"
                                maxCount={1}
                            >
                                {fileList.length < 2 && '+ Upload'}
                            </Upload>
                        </Form.Item>
                    </Form>
                </BaseModal>
            </Row>
            <BaseTable
                pagination={false}
                columns={columns}
                dataSource={posts.map((post) => ({
                    ...post,
                    key: post.phone,
                    birthday: `${('0' + new Date(post.birthday).getDate()).slice(-2)}-${(
                        '0' +
                        (new Date(post.birthday).getMonth() + 1)
                    ).slice(-2)}-${new Date(post.birthday).getFullYear()}`,
                }))}
            />
            <div className={cx('wrapp-pagination')}>
                <PaginationCustom
                    howSizeChanger={false}
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default AdminAccount;
