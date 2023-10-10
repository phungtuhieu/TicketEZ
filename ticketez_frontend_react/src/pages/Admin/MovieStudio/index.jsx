import { useEffect, useRef, useState } from 'react';
import { DownOutlined, HomeOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Pagination, Popconfirm, Row, Select, Space, message } from 'antd';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
import { LayoutPageDefault } from '~/layouts';
import style from './MovieStudio.module.scss';
import classNames from 'classnames/bind';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosClient from '~/api/global/axiosClient';
import Highlighter from 'react-highlight-words';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';

const cx = classNames.bind(style);
function AdminMovieStudio() {
    const [list, setList] = useState([]);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const [totalItems, setTotalItems] = useState(0); // Tổng số mục
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [pageSize, setPageSize] = useState(10); // Số mục trên mỗi trang

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log(values);
            if (!dataEdit) {
                const resp = await axiosClient.post('movie-studio', values);
                fetchData();
                form.resetFields();
                message.success('thêm thành công');
            } else {
                const resp = await axiosClient.put(`movie-studio/${dataEdit.id}`, {
                    ...values,
                    id: dataEdit.id,
                });

                setList(list.map((item) => (item.id === dataEdit.id ? resp.data : item)));
                setDataEdit(null);
                fetchData();
                message.success('cập nhật thành công');
                form.setFieldValue(resp.data);
            }
        } catch (error) {
            message.success('thêm thất bại');
        }
    };
    const handleResetForm = () => {
        form.resetFields();
    };
    const handleCancelModal = () => {
        setIsModalOpen(false);
    };
    const handleEditData = (record) => {
        setIsModalOpen(true);
        setDataEdit(record);
        form.setFieldsValue({
            ...record,
        });
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        console.log(selectedKeys);
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleDelete = async (record) => {
        try {
            const resp = await axiosClient.delete(`movie-studio/${record.id}`);
            if (resp.status === 200) {
                message.success('Đã xoá thành công!');
                fetchData();
            }
        } catch (error) {
            message.error('Xoá thất bại');
        }
    };
    const fetchData = async () => {
        try {
            const resp = await axiosClient.get(`movie-studio?page=${currentPage - 1}&limit=${pageSize}`);
            setList(resp.data.data);
            setTotalItems(resp.data.totalItem);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]);
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
                    placeholder={`Nhập từ khoá`}
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
                        Tìm
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Làm mới
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
                        Lọc
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        Đóng
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
        render: (text) =>
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
            title: 'Tên hãng',
            dataIndex: 'name',
            key: 'name',
            sorter: {
                compare: (a, b) => a.name.localeCompare(b.name),
                multiple: 4,
            },
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Quốc gia',
            dataIndex: 'country',
            key: 'country',
            ...getColumnSearchProps('country'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Thao tác',
            key: 'description',
            render: (_, record) => (
                <Space size="middle">
                    <FontAwesomeIcon
                        icon={solidIcons.faPen}
                        onClick={() => handleEditData(record)}
                        className={cx('icon-pen')}
                    />
                    <Popconfirm
                        title="Bạn có chắc"
                        description="Muốn xoá hay không?"
                        okText="Yes"
                        onConfirm={() => handleDelete(record)}
                        cancelText="No"
                    >
                        <FontAwesomeIcon icon={solidIcons.faTrash} className={cx('icon-trash')} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Xử lý sự kiện thay đổi trang
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <LayoutPageDefault
            itemsBreadcrumb={[
                {
                    href: '/admin/index',
                    title: <HomeOutlined />,
                },
                {
                    title: (
                        <>
                            <span>Hãng phim</span>
                        </>
                    ),
                },
            ]}
        >
            <Row>
                <Col span={22}>
                    <h1>Hãng phim</h1>
                </Col>
                <Col span={2} className={cx('wrap-act-top-right')}>
                    <Button
                        type="primary"
                        size={'large'}
                        onClick={showModal}
                        icon={<FontAwesomeIcon icon={solidIcons.faPlus} />}
                    >
                        Thêm
                    </Button>
                </Col>
            </Row>
            <BaseModal
                forceRender
                open={isModalOpen}
                width={'45%'}
                onOk={handleOk}
                onCancel={handleCancelModal}
                footer={[
                    <Button key="back" onClick={handleCancelModal}>
                        Thoát
                    </Button>,
                    <Button key="reset" onClick={handleResetForm}>
                        Làm mới
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        {dataEdit ? 'Cập nhật' : 'Thêm'}
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên hãng"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên hãng phim!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item name="country" label="Quốc tịch" rules={[{ required: true }]}>
                        <Select
                            placeholder="Chọn quốc tịch ở bên dưới"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            <Select.Option value="VN">Việt Nam</Select.Option>
                            <Select.Option value="EN">Anh</Select.Option>
                            <Select.Option value="IDA">Ấn Độ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập email của hãng phim!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name={'description'} label="Mô tả">
                        <Input.TextArea />
                    </Form.Item>
                </Form>
            </BaseModal>
            <BaseTable
                pagination={false}
                columns={columns}
                dataSource={list.map((item) => ({
                    ...item,
                    key: item.id,
                }))}
            />

            <div className={cx('wrapp-pagination')}>
                <Pagination
                    showSizeChanger
                    // onShowSizeChange={onShowSizeChange}
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                />
            </div>
        </LayoutPageDefault>
    );
}

export default AdminMovieStudio;
