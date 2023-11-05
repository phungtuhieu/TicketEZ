/* eslint-disable no-const-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState, useEffect } from 'react';
import {
    Button,
    Col,
    Row,
    Form,
    Popconfirm,
    DatePicker,
    Tag,
    Select,
    Pagination,
    Typography,
    Space,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
// import Highlighter from 'react-highlight-words';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import style from './Showtime.module.scss';
import moment from 'moment';
import { showtimeApi, movieApi, cinemaComplexApi, provinceApi } from '~/api/admin';
import funcUtils from '~/utils/funcUtils';
import { cinemaUserApi } from '~/api/user/showtime';
import formatMovieApi from '~/api/admin/managementMovie/formatMovieApi';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import seatChartApi from '~/api/admin/managementSeat/seatChart';
import img from '~/assets/img';

dayjs.extend(utc);

const { RangePicker } = DatePicker;

const cx = classNames.bind(style);
const { Option } = Select;
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

const AdminShowtime = () => {
    // const [searchText, setSearchText] = useState('');
    // const [searchedColumn, setSearchedColumn] = useState('');
    // const searchInput = useRef(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [checkNick] = useState(false);
    const [resetForm, setResetForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [posts, setPosts] = useState([]);

    //lưu dữ liệu Movie, Cinema
    const [selectCinemaComplex, setSelectCinemaComplex] = useState();
    const [selectMovie, setSelectMovie] = useState();
    const [selectFormat, setSelectFormat] = useState();
    const [selectProvice, setSelectProvice] = useState();
    //set dữ liệu khi người dùng chọn
    const [dataStartTime, setDataStartTime] = useState();
    const [dataEndTime, setDataEndTime] = useState();
    const [valueSelectCinemaComplex, setValueSelectCinemaComplex] = useState(null);
    const [valueFormat, setValueFormat] = useState(null);
    const [valueSelectProvince, setValueSelectProvince] = useState(null);
    const [valueSeatChartByCinema, setValueSeatChartByCinema] = useState(null);
    const [valueCinema, setValueCinema] = useState(null);
    const [dataCinemaToComplex, setDataCinemaToComplex] = useState(null);
    const [dataFormatMovieByFormatAndMovie, setDataFormatMovieByFormatAndMovie] = useState(null);
    const [valueTimeMovie, setValueTimeMovie] = useState(null);
    const [dataTimeMovie, setDataTimeMovie] = useState(null);
    const [vaLidationTime, setVaLidationTime] = useState(null);
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

    useEffect(() => {
        setLoading(true);

        //đổ dữ liệu
        const fetchCinemaData = async () => {
            try {
                const [ format, movie, province] = await Promise.all([
                    formatMovieApi.getDistinctFormarIds(),
                    formatMovieApi.getDistinctMovieIds(),
                    provinceApi.getTotalCinemaComplexToPrivince(),
                ]);
                setSelectMovie(movie.data);
                setSelectFormat(format.data);
                setSelectProvice(province.data);
            } catch (error) {
                funcUtils.notify(error.response.data, 'error');
            }
        };
        fetchCinemaData();

        //hiển thị dữ liệu của cinema theo cinemacomplex
        if (valueSelectCinemaComplex) {
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
        }
        if (valueSelectProvince) {
            const getComplexByProvince = async () => {
                try {
                    const res = await cinemaComplexApi.getComplexByProvince(valueSelectProvince);
                    setSelectCinemaComplex(res.data);
                } catch (error) {
                    funcUtils.notify(error.response.data, 'error');
                } finally {
                    setLoading(false);
                }
            };

            getComplexByProvince();
        } else {
            setLoading(false);
        }

        // lấy dữ liệu seatchart theo cinema
        if (valueCinema) {
            const getSeatChartByCinema = async () => {
                try {
                    const res = await seatChartApi.getSeatChartByCinema(valueCinema);
                    setValueSeatChartByCinema(res.data[0].id);
                } catch (error) {
                    funcUtils.notify(error.response.data, 'error');
                } finally {
                    setLoading(false);
                }
            };

            getSeatChartByCinema();
        } else {
            setLoading(false);
        }
        //lấy giờ của movie
        if (valueTimeMovie) {
            const getMovie = async () => {
                try {
                    const res = await movieApi.getById(valueTimeMovie);
                    const durationInSeconds = res.data.duration;

                    const timeParts = durationInSeconds.split(':'); // Tách chuỗi theo dấu :

                    //lưu  giờ và phút
                    if (timeParts.length === 3) {
                        const hours = parseInt(timeParts[0]);
                        const minutes = parseInt(timeParts[1]);

                        const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
                            2,
                            '0',
                        )}`;
                        setDataTimeMovie(formattedDuration);
                    } else {
                        console.log('Invalid duration value:', durationInSeconds);
                    }
                } catch (error) {
                    funcUtils.notify(error.response.data, 'error');
                } finally {
                    setLoading(false);
                }
            };

            getMovie();
            //lấy id của formatmovie theo movie vầ format
            const getIdFormatMovieByFormatAndMovie = async () => {
                try {
                    const res = await formatMovieApi.getIdFormatMovieByFormatAndMovie(valueTimeMovie, valueFormat);
                    setDataFormatMovieByFormatAndMovie(res.data[0].id);
                } catch (error) {
                    funcUtils.notify(error.response.data, 'error');
                } finally {
                    setLoading(false);
                }
            };

            getIdFormatMovieByFormatAndMovie();
        } else {
            setLoading(false);
        }
    }, [valueSelectCinemaComplex, valueSelectProvince, valueTimeMovie, valueFormat, valueCinema]);

    const handleReset = () => {
        form.resetFields();
        setSelectedOption1(null);
        setSelectedOption2(null);
        setSelectedOption3(null);
        setSelectedOption4(null);
        setSelectedOption5(null);
        setDataTimeMovie(null);
        setValueSelectProvince(null);
    };

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
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => {
                let statusText, tagColor;
                switch (record.status) {
                    case 0:
                        statusText = 'Chưa công chiếu';
                        tagColor = 'gold';
                        break;
                    case 1:
                        statusText = 'Sắp chiếu';
                        tagColor = 'blue';
                        break;
                    case 2:
                        statusText = 'Công chiếu';
                        tagColor = 'green';
                        break;
                    case 3:
                        statusText = 'Đã kết thúc chiếu';
                        tagColor = 'red';
                        break;
                    default:
                        statusText = 'Không xác định';
                        tagColor = 'gray';
                        break;
                }

                return <Tag color={tagColor}>{statusText}</Tag>;
            },
            filters: [
                { text: 'Chưa công chiếu', value: 0 },
                { text: 'Sắp chiếu', value: 1 },
                { text: 'Công chiếu', value: 2 },
                { text: 'Đã kết thúc chiếu', value: 3 },
            ],
            onFilter: (value, record) => record.status === value,
            filterMultiple: false,
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
        handleReset();
        setEditData(null);
        setOpen(true);
        form.setFieldsValue({
            'range-time-picker': [],
        });
    };

    const handleDelete = async (record) => {
        try {
            const res = await showtimeApi.delete(record.id);
            if (res.status === 200) {
                funcUtils.notify(res.data, 'success');
            }
        } catch (error) {
            console.log(error);
        }

        setWorkSomeThing(!workSomeThing);
    };

    const handleEditData = (record) => {
        console.log(record);
        dayjs.locale('vi');
        const formattedStartTime = dayjs(record.startTime);
        const formattedEndTime = dayjs(record.endTime);
        onChangSelectCinemaConplex(record.cinema.cinemaComplex.id);
        onChangSelectProvince(record.cinema.cinemaComplex.province.id);
        form.setFieldsValue({
            ...record,
            province: record.cinema.cinemaComplex.province.id,
            cinemaComplex: record.cinema.cinemaComplex.id,
            cinema: record.cinema.id,
            movie: record.formatMovie.movie.id,
            format: record.formatMovie.format.id,
            seatChart: record.seatChart.id,
            'range-time-picker': [formattedStartTime, formattedEndTime],
        });
        setDataTimeMovie(record.formatMovie.movie.duration);
        setSelectedOption1(record.cinema.cinemaComplex.province ? record.cinema.cinemaComplex.province.id : null);
        setSelectedOption2(record.cinema.cinemaComplex ? record.cinema.cinemaComplex.id : null);
        setSelectedOption3(record.cinema ? record.cinema.id : null);
        setSelectedOption4(record.formatMovie.movie ? record.formatMovie.movie.id : null);
        setSelectedOption5(record.startTime ? record.startTime : null);
        setDataStartTime(formattedStartTime);
        setDataEndTime(formattedEndTime);
        setOpen(true);
        setResetForm(false);
        setEditData(record);
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            // getIdFormatMovieByFormatAndMovie(values.movie, values.format);
            const currentTime = new Date(); // Lấy ngày hiện tại
            const startTime = new Date(dataStartTime);
            const endTime = new Date(dataEndTime);

            const tenDaysBeforeDataStartTime = new Date(dataStartTime - 10 * 24 * 60 * 60 * 1000);
            if (currentTime >= startTime && currentTime <= endTime) {
                values = {
                    ...values,
                    startTime: startTime,
                    endTime: endTime,
                    status: 2, // Công chiếu
                };
            } else if (currentTime >= tenDaysBeforeDataStartTime && currentTime <= dataStartTime) {
                // Trừ đi 10 ngày (10 * 24 giờ * 60 phút * 60 giây * 1000 mili giây)
                values = {
                    ...values,
                    startTime: startTime,
                    endTime: endTime,
                    status: 1, // sắp chiếu
                };
            } else if (currentTime > endTime) {
                values = {
                    ...values,
                    startTime: startTime,
                    endTime: endTime,
                    status: 3, //Kết thúc chiếu
                };
            } else {
                // Trường hợp khác
                values = {
                    ...values,
                    startTime: startTime,
                    endTime: endTime,
                    status: 0, //chưa công chiếu
                };
            }

            if (editData) {
                const resp = await showtimeApi.put(
                    editData.id,
                    values,
                    values.cinema,
                    values.formatMovie,
                    values.seatChart,
                );
                funcUtils.notify('Cập nhật thành công', 'success');
            } else {
                try {
                    const resp = await showtimeApi.post(
                        values,
                        values.cinema,
                        dataFormatMovieByFormatAndMovie,
                        valueSeatChartByCinema,
                    );
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

    //phân trang
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    const onChangSelectCinemaConplex = (value) => {
        setValueSelectCinemaComplex(value);
        setSelectedOption2(value);
        setSelectedOption3(null);
        setDataTimeMovie(null);
        form.setFieldsValue({
            cinema: null,
            movie: null,
            formatMovie: null,
            seatChart: null,
            'range-time-picker': [],
        });
    };

    const onChangSelectFormatMovie = (value) => {
        setSelectedOption4(value);
        setValueTimeMovie(value);
    };

    const onChangSelectFormat = (value) => {
        setSelectedOption5(value);
        setValueFormat(value);
    };

    const onChangSelectCinema = (value) => {
        setSelectedOption3(value);
        setValueCinema(value);
    };

    const onChangSelectProvince = (value) => {
        setValueSelectProvince(value);
        setSelectedOption1(value);
        setSelectedOption2(null);
        setSelectedOption3(null);
        setSelectedOption4(null);
        setSelectedOption5(null);
        setDataTimeMovie(null);
        form.setFieldsValue({
            cinemaComplex: null,
            cinema: null,
            movie: null,
            formatMovie: null,
            seatChart: null,
            'range-time-picker': [],
        });
    };

    const onChangeDate = (dates) => {
        if (dates && dates.length === 2) {
            setDataStartTime(dates[0]);
            setDataEndTime(dates[1]);

            const startTime = new Date(dates[0]);
            const endTime = new Date(dates[1]);

            // Lấy giờ và phút của startTime và endTime
            const startHours = startTime.getHours();
            const startMinutes = startTime.getMinutes();
            const endHours = endTime.getHours();
            const endMinutes = endTime.getMinutes();

            // Tính sự khác biệt giờ và phút
            let hourDiff = endHours - startHours;
            let minuteDiff = endMinutes - startMinutes;

            // Đảm bảo rằng giá trị âm của phút và giây không làm sai kết quả
            if (minuteDiff < 0) {
                minuteDiff += 60;
                hourDiff -= 1;
            }

            // Định dạng giờ, phút thành chuỗi với số 0 đứng trước nếu cần
            const formattedHour = hourDiff.toString().padStart(2, '0');
            const formattedMinute = minuteDiff.toString().padStart(2, '0');
            const diff = `${formattedHour}:${formattedMinute}`;
            setVaLidationTime(diff);
        }
    };

    //validate chọn ngày đến ngày
    const rangeConfig = {
        rules: [
            {
                type: 'array',
                required: true,
                message: 'Vui lòng chọn ngày và giờ',
            },
            {
                validator: (_, value) => {
                    if (vaLidationTime != dataTimeMovie) {
                        return Promise.reject('Tổng giờ phải bằng giờ của phim');
                    }
                    return Promise.resolve();
                },
            },
        ],
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
                        <Form.Item
                            name="province"
                            label="Chọn tỉnh"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn tỉnh' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                placeholder="Tìm kiếm hoặc chọn tỉnh"
                                optionFilterProp="children"
                                optionLabelProp="label"
                                value={selectedOption1}
                                onChange={(value) => onChangSelectProvince(value)}
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {selectProvice && selectProvice.length > 0
                                    ? selectProvice.map((province) => (
                                          <Option key={province.id} value={province.id} label={province.name}>
                                              <Space style={{ justifyContent: 'flex-start', display: 'flex' }}>
                                                  <span>{province.name}</span>
                                              </Space>
                                              {province.totalCinemaComplex > 0 && (
                                                  <span
                                                      style={{
                                                          justifyContent: 'flex-end',
                                                          display: 'flex',
                                                          marginTop: '-20px',
                                                      }}
                                                      className={cx('text-end')}
                                                  >
                                                      {province.totalCinemaComplex}
                                                  </span>
                                              )}
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        </Form.Item>
                        {/* Select Cụm rạp */}
                        <Form.Item
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
                                value={selectedOption2}
                                disabled={!selectedOption1}
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
                                              <Space style={{ justifyContent: 'flex-start', display: 'flex' }}>
                                                  <div>
                                                      <span role="img" aria-label="China" className={cx('border-img')}>
                                                          <img
                                                              className={cx('img')}
                                                              src={`http://localhost:8081/api/upload/${cinemaComplex.cinemaChain.image}`}
                                                          />
                                                      </span>
                                                  </div>
                                                  <span>{cinemaComplex.name}</span>
                                              </Space>
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="cinema"
                            label="Chọn rạp"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn rạp' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                showSearch
                                value={selectedOption3}
                                onChange={(value) => onChangSelectCinema(value)}
                                disabled={!selectedOption2}
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
                            name="movie"
                            label="Chọn phim"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn phân loại phim' }]}
                        >
                            <Select
                                style={{ width: '100%' }}
                                value={selectedOption4}
                                onChange={(value) => onChangSelectFormatMovie(value)}
                                disabled={!selectedOption3}
                                showSearch
                                placeholder="Tìm kiếm hoặc chọn phân loại phim"
                                optionFilterProp="children"
                                optionLabelProp="label"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {selectMovie && selectMovie.length > 0
                                    ? selectMovie.map((formatMovie) => (
                                          <Option key={formatMovie.id} value={formatMovie.id} label={formatMovie.title}>
                                              <Space style={{ justifyContent: 'flex-start', display: 'flex' }}>
                                                  <div>
                                                      <span role="img" aria-label="China">
                                                          {/* <img
                                                              className={cx('img-Movie')}
                                                              src={`http://localhost:8081/api/upload/${formatMovie.movie.id}`}
                                                          /> */}
                                                          <img className={cx('img-Movie')} src={img.datrungphuongnam} />
                                                      </span>
                                                  </div>
                                                  <span>{formatMovie.title}</span>
                                              </Space>
                                          </Option>
                                      ))
                                    : null}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="format"
                            label="Chọn phụ đề"
                            rules={[{ required: true, message: 'Vui lòng tìm kiếm hoặc chọn phụ đề' }]}
                        >
                            <Select
                                value={selectedOption5}
                                onChange={(value) => onChangSelectFormat(value)}
                                disabled={!selectedOption4}
                                showSearch
                                placeholder="Tìm kiếm hoặc chọn phụ đề"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }
                            >
                                {selectFormat && selectFormat.length > 0
                                    ? selectFormat.map((movie) => (
                                          <Option key={movie.id} value={movie.id}>
                                              {movie.name}
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
                        <Typography style={{ marginLeft: '145px', marginTop: '-20px' }}>
                            {dataTimeMovie != null ? 'Giờ của phim là: ' + dataTimeMovie : null}
                        </Typography>
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
