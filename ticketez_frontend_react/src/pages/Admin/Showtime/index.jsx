import React, { useRef, useState, useEffect } from 'react';
import { Button, Input, Space, Col, Row, Form, message, Popconfirm, DatePicker, Tag, Card, Switch, Select } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
import Highlighter from 'react-highlight-words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Showtime.module.scss';
import axiosClient from '~/api/global/axiosClient';
import moment from 'moment';
const { RangePicker } = DatePicker;

const cx = classNames.bind(style);

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const AdminShowtime = () => {
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
            ...getColumnSearchProps('id'),
        },
        {
            title: 'Giờ bắt đầu',
            dataIndex: 'startTime',
            render: (startTime) => {
                return startTime ? moment(startTime).format('DD-MM-YYYY HH:mm:ss') : '';
            },
        },
        {
            title: 'Giờ kết thúc',
            dataIndex: 'endTime',
            render: (endTime) => {
                return endTime ? moment(endTime).format('DD-MM-YYYY HH:mm:ss') : '';
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, record) => {
                const statusText = record.status === 1 ? 'Hoạt động' : 'Kết thúc';
                const tagColor = record.status === 1 ? 'green' : 'red';

                return <Tag color={tagColor}>{statusText}</Tag>;
            },
        },
        {
            title: 'Tiêu đề phim',
            dataIndex: 'movie',
            render: (movie) => (movie ? movie.title : ''),
        },
        {
            title: 'Tên rạp chiếu',
            dataIndex: 'cinema',
            render: (cinema) => (cinema ? cinema.name : ''),
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

    const showModal = () => {
        form.resetFields();
        setEditData(null);
        setOpen(true);
        setResetForm(true);

        setFileList([]);
        form.setFieldsValue({
            'range-time-picker': []
        });
    };

    const handleDelete = async (record) => {
        setResetForm(true);
        const res = await axiosClient.delete(`showtime/${record.id}`);
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
        const formattedStartTime = record.startTime ? moment(record.startTime) : null;
        const formattedEndTime = record.endTime ? moment(record.endTime) : null;

        form.setFieldsValue({
            status: record.status === 1,
            movie: record.movie?.id,
            cinema: record.cinema?.id,
            'range-time-picker': [formattedStartTime, formattedEndTime],
        });

        setDataStartTime(formattedStartTime);
        setDataEndTime(formattedEndTime);
        setStatusValue(record.status);
        setOpen(true);
        setResetForm(false);
        setEditData(record);
    };


    const [dataStartTime, setDataStartTime] = useState();
    const [dataEndTime, setDataEndTime] = useState();
    const [statusValue, setStatusValue] = useState(1);
    const onChangeDate = (dates) => {
        if (dates && dates.length === 2) {
            setDataStartTime(dates[0]);
            setDataEndTime(dates[1]);
        }
    };


    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            console.log(values.movie);
            values = {
                ...values,
                startTime: dataStartTime,
                endTime: dataEndTime,
                status: statusValue,
            };
            console.log(values);
            if (editData) {
                const respMovie = await axiosClient.get(`movie/${values.movie}`);
                const respCinema = await axiosClient.get(`cinema/${values.cinema}`);

                values = {
                    ...values,
                    startTime: new Date(dataStartTime),
                    endTime: new Date(dataEndTime),
                    movie: respMovie.data,
                    cinema: respCinema.data,
                };
                const res = await axiosClient.put(`showtime/${editData.id}`, values);
                message.success('Cập nhật thành công');
            }
            if (!editData) {
                try {
                    const respMovie = await axiosClient.get(`movie/${values.movie}`);
                    const respCinema = await axiosClient.get(`cinema/${values.cinema}`);

                    values = {
                        ...values,
                        startTime: new Date(dataStartTime),
                        endTime: new Date(dataEndTime),
                        movie: respMovie.data,
                        cinema: respCinema.data,
                    };

                    console.log(values);
                    const resp = await axiosClient.post('showtime', values);
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
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
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
        apiSelectMovie();
        apiSelectCinema();
    }, []);

    const handleResetForm = () => {
        form.resetFields();
        setFileList([]);
        console.log(form);
    };

    const getList = async () => {
        setLoading(true);
        try {
            const res = await axiosClient.get('showtime');
            setPosts(res.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const [selectMovie, setSelectMovie] = useState();
    const apiSelectMovie = async () => {
        try {
            const resp = await axiosClient.get(`movie`);
            setSelectMovie(resp.data.content);
        } catch (error) {
            console.error('Error fetching province data:', error);
        }
    };

    const [selectCinema, setSelectCinema] = useState();
    const apiSelectCinema = async () => {
        try {
            const resp = await axiosClient.get(`cinema`);
            setSelectCinema(resp.data);
            console.log(resp.data);
        } catch (error) {
            console.error('Error fetching province data:', error);
        }
    };

    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            },
        ],
    };
    return (
        <div>
            <Card>
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
                        <Form form={form} style={{ maxWidth: 1000 }} {...formItemLayout}>
                            <Form.Item label="Trạng thái" name="status">
                                <Switch
                                    checked={statusValue === 1}
                                    onChange={(checked) => setStatusValue(checked ? 1 : 0)}
                                    checkedChildren={'Đang hoạt động'}
                                    unCheckedChildren={'Kết Thúc '}
                                    defaultChecked
                                />
                            </Form.Item>
                            <Form.Item name="range-time-picker" label="Ngày giờ" {...rangeConfig}>
                                <RangePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    value={[dataStartTime, dataEndTime]}
                                    onChange={onChangeDate}
                                />
                            </Form.Item>

                            <Form.Item
                                {...formItemLayout}
                                name="movie"
                                label="Chọn phim"
                                rules={[{ required: true, message: 'Vui lòng chọn phim' }]}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    showSearch
                                    placeholder="Chọn loại"
                                    optionFilterProp="children"
                                    // onChange={onchangeSelectLoaiVanBan}
                                    //onSearch={onSearchSelectBox}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={selectMovie?.map((movie) => ({
                                        value: movie.id,
                                        label: movie.title,
                                    }))}
                                />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="cinema"
                                label="Chọn rạp"
                                rules={[{ required: true, message: 'Vui lòng chọn rạp' }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Chọn loại"
                                    optionFilterProp="children"
                                    // onChange={onchangeSelectLoaiVanBan}
                                    //onSearch={onSearchSelectBox}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={selectCinema?.map((cinema) => ({
                                        value: cinema.id,
                                        label: cinema.name,
                                    }))}
                                />
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
            </Card>
        </div>
    );
};

export default AdminShowtime;
