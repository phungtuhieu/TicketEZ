import React, { useRef, useState, useEffect } from 'react';
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
    Tag,
    Switch,
    Select,
    Pagination,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
import Highlighter from 'react-highlight-words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Showtime.module.scss';
import moment from 'moment';
import { showtimeApi, cinemaApi, movieApi } from '~/api/admin';
import funcUtils from '~/utils/funcUtils';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

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
    const [checkNick] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [posts, setPosts] = useState([]);
    //lưu dữ liệu Movie, Cinema
    const [selectMovie, setSelectMovie] = useState();
    const [selectCinema, setSelectCinema] = useState();
    //set dữ liệu khi người dùng chọn
    const [dataStartTime, setDataStartTime] = useState();
    const [dataEndTime, setDataEndTime] = useState();
    const [statusValue, setStatusValue] = useState(1);
    //phân trang
    const [totalItems, setTotalItems] = useState(0); // Tổng số mục
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tạif
    const [pageSize, setPageSize] = useState(10); // Số mục trên mỗi trang
    const [workSomeThing, setWorkSomeThing] = useState(false);

    //load dữ liệu và phân trang
    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await showtimeApi.getShowtime(currentPage, pageSize);
                console.log(res);
                setTotalItems(res.totalItems);
                setPosts(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getList();
    }, [currentPage, pageSize, workSomeThing]);

    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);

    //load dữ liệu của selectAPi từ Cinema và Movie
    useEffect(() => {
        const selectMovie = async () => {
            const [movie, cinema] = await Promise.all([movieApi.getAll(), cinemaApi.get()]);
            console.log('movie', movie);
            console.log('cinema', cinema);
            setSelectMovie(movie.data);
            setSelectCinema(cinema.data.data );
        };

        selectMovie();
    }, []);

   // xử lý tìm kiếm
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
                   placeholder={`Nhập để tìm`}
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
                       làm mới
                   </Button>
                   <Button
                       type="link"
                       size="small"
                       onClick={() => {
                           close();
                       }}
                   >
                       thoát
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
            onFilter: (value, record) => record.status.toString().indexOf(value) === 0,// Assuming 'value' is a string like 'true' or 'false'
            filters: [
                { text: 'Hoạt động', value: 1 },
                { text: 'Kết thúc', value: 0 },
            ],
            filterMultiple: false,
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

        form.setFieldsValue({
            'range-time-picker': [],
        });
    };

    const handleDelete = async (record) => {
        try {
            const res = await showtimeApi.delete(record.id);
            console.log(res);
            if (res.status === 200) {
                funcUtils.notify(res.data, 'success');
            }
        } catch (error) {
            console.log(error);
            // if (error.response.status === 409) {
            //     funcUtils.notify(error.response.data, 'error');
            // }
        }

        setWorkSomeThing(!workSomeThing);
    };

    const handleEditData = (record) => {
        const formattedStartTime = dayjs(record.startTime, 'YYYY-MM-DD HH:mm:ss');
        const formattedEndTime = dayjs(record.endTime, 'YYYY-MM-DD HH:mm:ss');

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

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            console.log(values.movie);
            values = {
                ...values,
                startTime: new Date(dataStartTime),
                endTime: new Date(dataEndTime),
                status: statusValue,
            };
            console.log(values);
            if (editData) {
                const resp = await showtimeApi.put(editData.id, values, values.movie, values.cinema);
                console.log(resp);
                funcUtils.notify("Cập nhật thành công", 'success');
                //  message.success('Cập nhật thành công');
            }
            if (!editData) {
                try {
                    console.log(values);
                    const resp = await showtimeApi.post(values, values.movie, values.cinema);
                    if(resp.status === 200) {
                       funcUtils.notify("Thêm thành công", 'success');
                    }
                } catch (error) {
                    console.log(error);
                      funcUtils.notify(error.response.data, 'error');
                }
            }
            setOpen(false);
            form.resetFields();
            setLoading(false);
            setWorkSomeThing([!workSomeThing]);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
            setLoading(false);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };

    //validate chọn ngày đến ngày
    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Please select time!',
            },
        ],
    };


    //phân trang
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };
    //lưu dữ liệu khi người dùng chọn
    const onChangeDate = (dates) => {
        if (dates && dates.length === 2) {
            setDataStartTime(dates[0]);
            setDataEndTime(dates[1]);
        }
    };

    return (
        <div>
            <Row>
                <Col span={22}>
                    <h1 className={cx('title')}>Bảng dữ liệu</h1>
                </Col>
                <Col span={2}>
                    <Button type="primary" className={cx('button-title')} icon={<PlusOutlined />} onClick={showModal}>
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
                            <Button
                                key="reset"
                                onClick={() => {
                                    form.resetFields();
                                }}
                            >
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
                                unCheckedChildren={'Kết Thúc'}
                                defaultChecked
                            />
                        </Form.Item>
                        <Form.Item name="range-time-picker" label="Ngày giờ" {...rangeConfig}>
                            <RangePicker
                                showTime
                                format="DD-MM-YYYY HH:mm:ss"
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
                pagination={false}
                columns={columns}
                onClick={() => {
                    handleDelete();
                }}
                dataSource={posts.map((post) => ({
                    ...post,
                    key: post.id,
                }))}
            />
            <div className={cx('wrapp-pagination')}>
                <Pagination
                    style={{float: 'right', marginTop: '10px'}}
                    showSizeChanger={false}
                    current={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AdminShowtime;
