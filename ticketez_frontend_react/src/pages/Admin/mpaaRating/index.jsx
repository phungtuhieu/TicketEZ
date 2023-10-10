import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Space, Col, Row, Form, message, Popconfirm, DatePicker, Upload, Card } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import BaseTable from '~/components/common/BaseTable/BaseTable';
import BaseModal from '~/components/common/BaseModal/BaseModal';
import Highlighter from 'react-highlight-words';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './mpaaRating.module.scss';
import axiosClient from '~/api/global/axiosClient';
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';

const cx = classNames.bind(style);

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const AdminMpaaRating = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [posts, setPosts] = useState([]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, record) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Mã',
            dataIndex: 'id',
            width: '10%',
            defaultSortOrder: 'sorting',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Biểu tượng phân loại',
            dataIndex: 'ratingCode',
            width: '30%',
            ...getColumnSearchProps('ratingCode'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'icon',
            dataIndex: 'icon',
            render: (_, record) => (
                <Space size="middle">
                    <img src={`http://localhost:8081/api/upload/${record.icon}`} alt="" width={65} />
                </Space>
            ),
        },
        {
            title: 'Action',
            render: (_, record) => (
                <Space size="middle">
                    <FontAwesomeIcon
                        icon={faPen}
                        className={cx('icon-pen')}
                        onClick={() => {
                            handleEditData(record);
                        }}
                    />

                    <Popconfirm
                        title="Bạn có chắc"
                        description="Muốn xoá hay không?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record)}
                    >
                        <FontAwesomeIcon icon={faTrash} className={cx('icon-trash')} />
                    </Popconfirm>
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

    const handleDelete = async (record) => {
        const res = await axiosClient.delete(`mpaaRating/${record.id}`);
        if (res.code === 500) {
            message.error('Xoá thất bại ');
        }
        if (res.status === 200) {
            message.success('Xóa dữ liệu thành công');
        } else {
            message.error(res.message);
        }
        getList();
    };

    const handleEditData = (record) => {
        // const formatDate = moment(record.birthday, 'YYYY-MM-DD');
        const newUploadFile = {
            uid: record.id.toString(),
            name: record.avatar,
            url: `http://localhost:8081/api/upload/${record.icon}`,
        };
        setFileList([newUploadFile]);
        setOpen(true);
        setResetForm(false);
        setEditData(record);
        form.setFieldsValue({
            ...record,
            //    birthday: formatDate,
        });
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            console.log(values);
            if (fileList.length > 0) {
                values = {
                    ...values,
                };
                if (editData) {
                    console.log(values);
                    values = {
                        id: editData.id,
                        ...values,
                    };
                    if (values.icon.file) {
                        const file = values.icon.fileList[0].originFileObj;
                        var formData = new FormData();
                        formData.append('file_to_upload', file);
                        const res = await axiosClient.post('upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                        values = {
                            ...values,
                            icon: res.data.fieldName,
                        };
                    }
                    const res = await axiosClient.put(`mpaaRating/${editData.id}`, values);
                    message.success('Cập nhật thành công');
                }
                if (!editData) {
                    const file = values.icon.fileList[0].originFileObj;
                    var formData = new FormData();
                    formData.append('file_to_upload', file);
                    const res = await axiosClient.post('upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    try {
                        values = {
                            ...values,
                            icon: res.data.fieldName,
                        };
                        const resp = await axiosClient.post('mpaaRating', values);
                        message.success('Thêm thành công');
                    } catch (error) {
                        console.log(error);
                    }
                }
                setOpen(false);
                form.resetFields();
                setLoading(false);
                setFileList([]);
                getList();
            } else {
                setLoading(false);
                message.error('vui lòng chọn ảnh');
            }
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            message.error('Có lỗi xảy ra vui lòng thử lại');
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    useEffect(() => {
        getList();
    }, []);

    //form
    const handleResetForm = () => {
        form.resetFields();
        setFileList([]);
        console.log(form);
    };
    //call api
    const getList = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('mpaaRating');
            setPosts(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
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

      const propsUpload = {
          onRemove: (file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
          },
          beforeUpload: (file) => {
              setFileList([...fileList, file]);
              return false;
          },
          fileList,
      };

    return (
        <div>
                <Row>
                    <Col span={22}>
                        <h1 className={cx('title')}>Bảng dữ liệu</h1>
                    </Col>
                    <Col span={2}>
                        <Button
                            type="primary"
                            className={cx('button-title')}
                            icon={<PlusOutlined />}
                            onClick={showModal}
                        >
                            Thêm
                        </Button>
                    </Col>
                    <BaseModal
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
                                name="ratingCode"
                                label="Phân loại"
                                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                            >
                                <Input placeholder="Please input your name" />
                            </Form.Item>

                            <Form.Item
                                {...formItemLayout}
                                name="description"
                                label="Mô tả"
                                rules={[{ required: true, message: 'Vui lòng nhập ngày' }]}
                            >
                                <TextArea />
                            </Form.Item>

                            <Form.Item
                                {...formItemLayout}
                                label="icon"
                                name="icon"
                                rules={[{ required: true, message: 'Vui lòng chọn ảnh' }]}
                            >
                                <Upload
                                    {...propsUpload}
                                    listType="picture-card"
                                    onChange={onChangeUpload}
                                    onPreview={onPreview}
                                    fileList={fileList}
                                    name="icon"
                                    maxCount={1}
                                >
                                    {fileList.length < 2 && '+ Upload'}
                                </Upload>
                            </Form.Item>
                        </Form>
                    </BaseModal>
                </Row>

                <BaseTable
                    columns={columns}
                    onClick={() => {
                        handleDelete();
                    }}
                    dataSource={posts.map((post) => ({
                        ...post,
                        key: post.id,
                        birthday: `${('0' + new Date(post.birthday).getDate()).slice(-2)}-${(
                            '0' +
                            (new Date(post.birthday).getMonth() + 1)
                        ).slice(-2)}-${new Date(post.birthday).getFullYear()}`,
                    }))}
                    // expandable={{
                    //     expandedRowRender: (record) => (
                    //         <p
                    //             style={{
                    //                 margin: 0,
                    //             }}
                    //         >
                    //             {record.body}
                    //         </p>
                    //     ),
                    // }}
                />
        </div>
    );
};

export default AdminMpaaRating;
