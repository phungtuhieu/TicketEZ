import { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, Popconfirm, Row, Select, Space, TimePicker, message } from 'antd';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';

import style from './Movie.module.scss';
import classNames from 'classnames/bind';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosClient from '~/api/global/axiosClient';
import Highlighter from 'react-highlight-words';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import PaginationCustom from '~/components/Admin/PaginationCustom';
import { movieApi, movieStudioApi } from '~/api/admin';
import '~/scss/_global.scss';
import moment from 'moment';

const cx = classNames.bind(style);

function AdminMovie() {
    const [status, setStatus] = useState();
    const formatDate = 'DD-MM-YYYY';
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
    const [workSomething, setworkSomething] = useState(10); // Số mục trên mỗi trang
    const [loadingButton, setLoadingButton] = useState(false); // Số mục trên mỗi trang
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 20 },
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async () => {
        setLoadingButton(true);
        try {
            const values = await form.validateFields();
            console.log(values);
            if (!dataEdit) {
                const resp = await axiosClient.post('movie', values);
                setLoadingButton(false);
                setworkSomething(!workSomething);
                form.resetFields();
                message.success('thêm thành công');
            } else {
                const resp = await movieApi.update(dataEdit.id, {
                    ...values,
                    releaseDate: moment(values.releaseDate).format('YYYY-MM-DD'),
                    duration: moment(values.duration).format('HH:mm:ss'),
                    rating: dataEdit.rating,
                    id: dataEdit.id,
                });
                setLoadingButton(false);
                setList(list.map((item) => (item.id === dataEdit.id ? resp.data : item)));
                setworkSomething(!workSomething);
                message.success('cập nhật thành công');
                form.setFieldValue(resp.data);
            }
        } catch (error) {
            setLoadingButton(false);
            if (error.hasOwnProperty('response')) {
                message.error(error.response.data);
            } else {
                message.error('Thêm thất bại');
                console.log(error);
            }
        }
    };
    const handleResetForm = () => {
        form.resetFields();
    };
    const handleCancelModal = () => {
        setIsModalOpen(false);
        handleResetForm();
        if (dataEdit != null) {
            setDataEdit(null);
        }
    };
    const handleEditData = async (id) => {
        const resp = await movieApi.getById(id);
        let data = resp.data;
        setIsModalOpen(true);
        setDataEdit(data);
        console.log(data);
        form.setFieldsValue({
            ...data,
            releaseDate: moment(data.releaseDate, 'DD-MM-YYYY'),
            duration: moment(data.duration, 'HH:mm:ss'),
        });
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        console.log(selectedKeys);
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleDelete = async (record) => {
        setLoadingButton(true);
        try {
            const resp = await axiosClient.delete(`movie/${record.id}`);
            if (resp.status === 200) {
                setLoadingButton(false);
                message.success('Đã xoá thành công!');
                setworkSomething(!workSomething);
            }
        } catch (error) {
            if (error.hasOwnProperty('response')) {
                message.error(error.response.data);
            } else {
                message.error('Xoá thất bại');
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [movieData, movieStudioData] = await Promise.all([
                    movieApi.getByPage(currentPage, pageSize),
                    // movieStudioApi.get(),
                ]);
                console.log(movieData);
                // console.log(movieStudioData.data);
                const formatData = movieData.data.map((item) => ({
                    ...item,
                    releaseDate: moment(item.releaseDate, formatDate).format(formatDate),
                }));
                setList(formatData);
                setTotalItems(movieData.totalItem);
            } catch (error) {
                if (error.hasOwnProperty('response')) {
                    message.error(error.response.data);
                } else {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, [currentPage, pageSize, workSomething]);
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
            title: 'Tên phim',
            dataIndex: 'title',
            key: 'title',
            sorter: {
                compare: (a, b) => a.title.localeCompare(b.name),
                multiple: 4,
            },
            ...getColumnSearchProps('title'),
        },
        {
            title: 'Thời lượng',
            dataIndex: 'duration',
            key: 'duration',
            // ...getColumnSearchProps('duration'),
        },
        {
            title: 'Ngày phát hành',
            dataIndex: 'releaseDate',
            key: 'releaseDate',
            // render: (_, record) => {
            //     const formattedDate = moment(record.releaseDate).format('DD-MM-YYYY');
            //     return <span>{formattedDate}</span>;
            // },
        },
        {
            title: 'Quốc gia',
            dataIndex: 'country',
            key: 'country',
            ...getColumnSearchProps('country'),
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
        },

        {
            title: 'Thao tác',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <Space size="middle">
                    <FontAwesomeIcon
                        icon={solidIcons.faPen}
                        onClick={() => handleEditData(id)}
                        className={cx('icon-pen')}
                    />
                    <Popconfirm
                        title="Bạn có chắc"
                        description="Muốn xoá hay không?"
                        okText="Yes"
                        onConfirm={() => handleDelete(id)}
                        cancelText="No"
                    >
                        <FontAwesomeIcon icon={solidIcons.faTrash} className={cx('icon-trash')} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Vui lòng chọn thời gian!',
            },
        ],
    };
    const expandedRowRender = (record) => {
        return (
            <ul className={cx('wrapp-more-info')}>
                <li>
                    <span>
                        <b>Mô tả: </b> {record.description}
                    </span>
                </li>
                <li>
                    <span>
                        <b>Hãng phim: </b> {`${record.movieStudio.name} (${record.movieStudio.country})`}
                    </span>
                </li>
                <li>
                    <span>
                        <b>Loại phim (MPAA): </b>{' '}
                    </span>
                    {`${record.mpaaRating.ratingCode} ( ${record.mpaaRating.description})`}
                </li>
                <li>
                    <span>
                        <b>Video trailer: </b>
                        <a
                            href={record.videoTrailer}
                            className={cx('table-link-video')}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {record.videoTrailer}
                        </a>
                    </span>
                </li>
            </ul>
        );
    };
    // Xử lý sự kiện thay đổi trang
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <>
            <Row>
                <Col span={22}>
                    <h1>Phim</h1>
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
                className={cx('modal-form')}
                open={isModalOpen}
                title={dataEdit ? 'Cập nhật' : 'Thêm mới'}
                width={'45%'}
                onOk={handleOk}
                onCancel={handleCancelModal}
                footer={[
                    <div className={cx('wrapp-btn-modal')}>
                        <Button key="back" onClick={handleCancelModal}>
                            Thoát
                        </Button>

                        {!dataEdit && (
                            <Button key="reset" onClick={handleResetForm}>
                                Làm mới
                            </Button>
                        )}

                        <Button key="submit" type="primary" loading={loadingButton} onClick={handleOk}>
                            {dataEdit ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </div>,
                ]}
            >
                <Form
                    form={form}
                    name="basic"
                    {...formItemLayout}
                    style={{
                        maxWidth: 600,
                    }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên phim"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên phim!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="duration" label="Thời lượng" {...config}>
                        <TimePicker style={{ width: 150 }} placeholder="Chọn thời lượng" />
                    </Form.Item>
                    {dataEdit && (
                        <Form.Item
                            label="Đánh giá"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên phim!',
                                },
                            ]}
                        >
                            <Input disabled />
                        </Form.Item>
                    )}
                    <Form.Item name="releaseDate" label="Ngày phát hành" {...config}>
                        <DatePicker placeholder="Chọn ngày phát hành" format={formatDate} />
                    </Form.Item>
                    <Form.Item name="country" label="Quốc gia" rules={[{ required: true }]}>
                        <Select
                            placeholder="Chọn quốc gia ở bên dưới"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            <Select.Option value="VN">sss Nam</Select.Option>
                            <Select.Option value="EN">sssAnh</Select.Option>
                            <Select.Option value="IDA">Ấn Độ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="movieStudio" label="hãng phim" rules={[{ required: true }]}>
                        <Select
                            placeholder="Chọn quốc gia ở bên dưới"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            {/* <Select.Option value="VN">sss Nam</Select.Option>
                            <Select.Option value="EN">sssAnh</Select.Option>
                            <Select.Option value="IDA">Ấn Độ</Select.Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Link trailer video"
                        name="videoTrailer"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập link video trailer!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="country" label="Quốc tịch" rules={[{ required: true }]}>
                        <Select
                            placeholder="Chọn quốc gia
                                ở bên dưới"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            <Select.Option value="VN">Việt Nam</Select.Option>
                            <Select.Option value="EN">Anh</Select.Option>
                            <Select.Option value="IDA">Ấn Độ</Select.Option>
                        </Select>
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
                expandable={{ expandedRowRender }}
            />

            <PaginationCustom
                current={currentPage}
                pageSize={pageSize}
                total={totalItems}
                onChange={handlePageChange}
            />
        </>
    );
}

export default AdminMovie;
