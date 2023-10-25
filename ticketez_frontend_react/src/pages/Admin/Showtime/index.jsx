/* eslint-disable jsx-a11y/alt-text */
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
import { showtimeApi, cinemaApi, movieApi, cinemaComplexApi, formatApi, seatChart } from '~/api/admin';
import funcUtils from '~/utils/funcUtils';
import { cinemaUserApi } from '~/api/user/showtime';
import formatMovieApi from '~/api/admin/managementMovie/formatMovieApi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import seatChartApi from '~/api/admin/managementSeat/seatChart';

dayjs.extend(utc);

const { RangePicker } = DatePicker;

const cx = classNames.bind(style);
const { Option } = Select;
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
    const [selectCinema, setSelectCinema] = useState();
    const [selectCinemaComplex, setSelectCinemaComplex] = useState();
    const [selectMovie, setSelectMovie] = useState();
    const [selectFormat, setSelectFormat] = useState();

    //set dữ liệu khi người dùng chọn
    const [dataStartTime, setDataStartTime] = useState();
    const [dataEndTime, setDataEndTime] = useState();
    const [valueSelectCinemaComplex, setValueSelectCinemaComplex] = useState(null);
    const [dataCinemaToComplex, setDataCinemaToComplex] = useState(null);
    const [selectSeatChart, setSelectSeatChart] = useState(null);

    //phân trang
    const [totalItems, setTotalItems] = useState(0); // Tổng số mục
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tạif
    const [pageSize, setPageSize] = useState(10); // Số mục trên mỗi trang
    const [workSomeThing, setWorkSomeThing] = useState(false);

    //set disable theo thứ tự khi thêm
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
    const [selectedOption4, setSelectedOption4] = useState(null);
    const [selectedOption5, setSelectedOption5] = useState(null);

    //load dữ liệu và phân trang
    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await showtimeApi.getShowtime(currentPage, pageSize);
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
            const [cinema, cinemaComplex, format, movie, seatChart] = await Promise.all([
                cinemaApi.get(),
                cinemaComplexApi.getAll(),
                formatMovieApi.getDistinctFormarIds(),
                formatMovieApi.getDistinctMovieIds(),
                seatChartApi.getStatusSeatChart(),
            ]);
            setSelectMovie(movie.data);
            setSelectCinema(cinema.data.data);
            setSelectCinemaComplex(cinemaComplex.data);
            setSelectMovie(movie.data);
            setSelectFormat(format.data);
            setSelectSeatChart(seatChart.data);
            console.log('1111', format.data);
        };
        selectMovie();
    }, []);

    //hiển thị dữ liệu của cinema theo cinemacomplex
    useEffect(() => {
        setLoading(true);
        const getCinemaComplexByNameAndProvince = async () => {
            try {
                const res = await cinemaUserApi.getCinemaByCinemaComplex(valueSelectCinemaComplex);
                setDataCinemaToComplex(res);
            } catch (error) {
                funcUtils.notify(error.response.data, 'error');
            } finally {
                setLoading(false);
            }
        };


        getCinemaComplexByNameAndProvince();
    }, [valueSelectCinemaComplex]);

    // xử lý tìm kiếm
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = () => {
        form.resetFields();
        setSelectedOption1(null);
        setSelectedOption2(null);
        setSelectedOption3(null);
        setSelectedOption4(null);
        setSelectedOption5(null);
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
            align: 'center',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Giờ bắt đầu',
            dataIndex: 'startTime',
            align: 'center',
            render: (startTime) => {
                return startTime ? moment(startTime).format('DD-MM-YYYY HH:mm:ss') : '';
            },
        },
        {
            title: 'Giờ kết thúc',
            dataIndex: 'endTime',
            align: 'center',
            render: (endTime) => {
                return endTime ? moment(endTime).format('DD-MM-YYYY HH:mm:ss') : '';
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => {
                const statusText =
                    record.status === 1 ? 'Công chiếu' : record.status === 0 ? 'Sắp chiếu' : 'Kết thúc chiếu';
                const tagColor = record.status === 1 ? 'green' : record.status === 0 ? 'blue' : 'red';

                return <Tag color={tagColor}>{statusText}</Tag>;
            },
            filters: [
                { text: 'Công chiếu', value: 1 },
                { text: 'Sắp chiếu', value: 0 },
                { text: 'Kết thúc chiếu', value: 2 },
            ],
            onFilter: (value, record) => record.status === value,
            filterMultiple: false,
        },

        {
            title: 'Tên rạp chiếu',
            dataIndex: 'cinema',
            align: 'center',
            render: (cinema) => (cinema ? cinema.name : ''),
        },
        {
            title: 'Định dạng phim',
            dataIndex: 'formatMovie',
            align: 'center',
            render: (formatMovie) => (formatMovie ? formatMovie.format.name : ''),
        },
        {
            title: 'Sơ đồ ghế',
            dataIndex: 'seatChart',
            align: 'center',
            render: (seatChart) => (seatChart ? seatChart.name : ''),
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
        setSelectedOption1(null);
        setSelectedOption2(null);
        setSelectedOption3(null);
        setSelectedOption4(null);
        setSelectedOption5(null);
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
        dayjs.locale('vi');

        const formattedStartTime = dayjs(record.startTime);
        const formattedEndTime = dayjs(record.endTime);

        form.setFieldsValue({
            status: record.status === 1,
            movie: record.movie?.id,
            cinema: record.cinema?.id,
            'range-time-picker': [formattedStartTime, formattedEndTime],
        });

        setSelectedOption1(record.cinemaComplex ? record.cinemaComplex.id : null);
        setSelectedOption2(record.movie ? record.movie.id : null);
        setSelectedOption3(record.formatMovie ? record.formatMovie.id : null);
        setSelectedOption4(record.cinema ? record.cinema.id : null);
        setSelectedOption5(record.seatChart ? record.seatChart.id : null);
        setDataStartTime(formattedStartTime);
        setDataEndTime(formattedEndTime)
        setOpen(true);
        setResetForm(false);
        setEditData(record);
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            console.log(values);
            values = {
                ...values,
                startTime: new Date(dataStartTime),
                endTime: new Date(dataEndTime),
                status: 1,
            };
            console.log(values);
            if (editData) {
                const resp = await showtimeApi.put(editData.id, values, values.movie, values.cinema);
                console.log(resp);
                funcUtils.notify('Cập nhật thành công', 'success');
                //  message.success('Cập nhật thành công');
            }
            if (!editData) {
                try {
                    console.log(values);
                    const resp = await showtimeApi.post(values, values.cinema, values.formatMovie, values.seatChart);
                    if (resp.status === 200) {
                        funcUtils.notify('Thêm thành công', 'success');
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
                message: 'Vui lòng chọn ngày và giờ',
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


    const onChangSelectCinemaConplex = (value) => {
        setValueSelectCinemaComplex(value);
        setSelectedOption1(value);
        setSelectedOption2(null);
        form.setFieldsValue({
            cinema: null,
        });
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
                                    handleReset();
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
                        {/* Select Cụm rạp */}
                        <Form.Item
                            {...formItemLayout}
                            name="cinemaComplex"
                            label="Chọn cụm rạp"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn cụm rạp' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Tìm kiếm hoặc chọn cụm rạp"
                                optionFilterProp="children"
                                optionLabelProp="label"
                                value={selectedOption1}
                                onChange={(value) => onChangSelectCinemaConplex(value)}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {selectCinemaComplex && selectCinemaComplex.length > 0
                                    ? selectCinemaComplex.map((cinemaComplex) => (
                                          <Option
                                              key={cinemaComplex.id}
                                              value={cinemaComplex.id}
                                              label={cinemaComplex.name}
                                          >
                                              <Space>
                                                  <span role="img" aria-label="China" className={cx('border-img')}>
                                                      <img
                                                          className={cx('img')}
                                                          src={`http://localhost:8081/api/upload/${cinemaComplex.cinemaChain.image}`}
                                                      />
                                                  </span>
                                                  {cinemaComplex.name}
                                              </Space>
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="cinema"
                            label="Chọn rạp"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn rạp' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                value={selectedOption2}
                                onChange={(value) => setSelectedOption2(value)}
                                disabled={!selectedOption1}
                                placeholder="Tìm kiếm hoặc chọn rạp"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {dataCinemaToComplex && dataCinemaToComplex.length > 0
                                    ? dataCinemaToComplex.map((cinema) => (
                                          <Option key={cinema.id} value={cinema.id}>
                                              {cinema.name}
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="movie"
                            label="Chọn phim"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn phân loại phim' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                value={selectedOption3}
                                onChange={(value) => setSelectedOption3(value)}
                                disabled={!selectedOption2}
                                showSearch
                                placeholder="Tìm kiếm hoặc chọn phân loại phim"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {selectMovie && selectMovie.length > 0
                                    ? selectMovie.map((formatMovie) => (
                                          <Option key={formatMovie.id} value={formatMovie.id}>
                                              {formatMovie.title}
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="formatMovie"
                            label="Chọn phụ đề"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn phụ đề' }]}
                        >
                            <Select
                                value={selectedOption4}
                                onChange={(value) => setSelectedOption4(value)}
                                disabled={!selectedOption3}
                                showSearch
                                placeholder="Tìm kiếm hoặc chọn phụ đề"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {' '}
                                {selectFormat && selectFormat.length > 0
                                    ? selectFormat.map((movie) => (
                                          <Option key={movie.id} value={movie.id}>
                                              {movie.name}
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            name="seatChart"
                            label="Chọn sơ đồ"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn sơ đồ' }]}
                        >
                            <Select
                                value={selectedOption5}
                                onChange={(value) => setSelectedOption5(value)}
                                disabled={!selectedOption4}
                                showSearch
                                placeholder="Tìm kiếm hoặc chọn sơ đồ"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {selectSeatChart && selectSeatChart.length > 0
                                    ? selectSeatChart.map((cinema) => (
                                          <Option key={cinema.id} value={cinema.id}>
                                              {cinema.name}
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        </Form.Item>

                        <Form.Item name="range-time-picker" label="Ngày giờ" {...rangeConfig}>
                            <RangePicker
                                disabled={!selectedOption5}
                                showTime
                                format="DD-MM-YYYY HH:mm:ss"
                                value={[dataStartTime, dataEndTime]}
                                onChange={onChangeDate}
                            />
                        </Form.Item>
                    </Form>
                </BaseModal>
            </Row>
            <BaseTable
                pagination={false}
                loading={loading}
                columns={columns}
                className={cx('table-cell-center')}
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
                    style={{ float: 'right', marginTop: '10px' }}
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
