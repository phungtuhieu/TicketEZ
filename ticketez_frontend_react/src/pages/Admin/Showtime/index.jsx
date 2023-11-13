/* eslint-disable no-const-assign */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
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
    Space,
    TimePicker,
    Image,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import BaseModal from '~/components/Admin/BaseModal/BaseModal';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
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
import seatChartApi from '~/api/admin/managementSeat/seatChart';

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
    const [valueSelectCinemaComplex, setValueSelectCinemaComplex] = useState(null);
    const [valueFormat, setValueFormat] = useState(null);
    const [valueSelectProvince, setValueSelectProvince] = useState(null);
    const [valueSelectDate, setValueSelectDate] = useState(null);
    const [valueSeatChartByCinema, setValueSeatChartByCinema] = useState(null);
    const [valueShowtimeByEndtime, setvalueShowtimeByEndtime] = useState(null);
    const [valueCinema, setValueCinema] = useState(null);
    const [dataCinemaToComplex, setDataCinemaToComplex] = useState(null);
    const [dataFormatMovieByFormatAndMovie, setDataFormatMovieByFormatAndMovie] = useState(null);
    const [valueTimeMovie, setValueTimeMovie] = useState(null);
    const [valueEndtimeByTimeMovieAndStartime, setValueEndtimeByTimeMovieAndStartime] = useState(null);
    const [dataTimeMovie, setDataTimeMovie] = useState(null);
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
    const [selectedOption6, setSelectedOption6] = useState(null);
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
                const [movie, province] = await Promise.all([
                    formatMovieApi.getDistinctMovieIds(),
                    provinceApi.getTotalCinemaComplexToPrivince(),
                ]);
                setSelectMovie(movie.data);
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
        //lấy showtime theo enditme
        if (valueSelectDate) {
            const getShowtimeByEndtime = async () => {
                try {
                    if (
                        valueSelectDate != null &&
                        valueCinema != null &&
                        valueTimeMovie != null &&
                        valueFormat != null
                    ) {
                        const res = await showtimeApi.getShowtimesByCCXAndMovieAndFormatAndEndtime(
                            valueCinema,
                            valueTimeMovie,
                            valueFormat,
                            valueSelectDate,
                        );
                        setvalueShowtimeByEndtime(res.data);
                    }
                } catch (error) {
                    funcUtils.notify(error.response.data, 'error');
                } finally {
                    setLoading(false);
                }
            };

            getShowtimeByEndtime();
        } else {
            setLoading(false);
        }

        //lấy giờ của movie
        if (valueTimeMovie) {
            const getMovie = async () => {
                try {
                    if (valueTimeMovie != null) {
                        const res = await movieApi.getById(valueTimeMovie);
                        const durationInSeconds = res.data.movie.duration;

                        const timeParts = durationInSeconds.split(':'); // Tách chuỗi theo dấu :

                        // Lưu giờ, phút và giây
                        if (timeParts.length === 3) {
                            const hours = parseInt(timeParts[0]);
                            const minutes = parseInt(timeParts[1]);
                            const seconds = parseInt(timeParts[2]);

                            const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
                                2,
                                '0',
                            )}:${String(seconds).padStart(2, '0')}`;
                            let formatTime = moment(formattedDuration, 'HH:mm:ss');
                            setDataTimeMovie(formatTime);
                        } else {
                            console.log('Invalid duration value:', durationInSeconds);
                        }
                    }
                } catch (error) {
                    funcUtils.notify(error.response.data, 'error');
                } finally {
                    setLoading(false);
                }
            };
            //lấy format theo movie
            const getDistinctFormarIds = async () => {
                try {
                    const res = await formatMovieApi.getDistinctFormarIds(valueTimeMovie);
                    setSelectFormat(res.data);
                } catch (error) {
                    funcUtils.notify(error.response.data, 'error');
                } finally {
                    setLoading(false);
                }
            };

            // Lấy id của format movie theo movie và format
            const getIdFormatMovieByFormatAndMovie = async () => {
                try {
                    if (valueTimeMovie != null && valueFormat != null) {
                        const res = await formatMovieApi.getIdFormatMovieByFormatAndMovie(valueTimeMovie, valueFormat);
                        setDataFormatMovieByFormatAndMovie(res.data[0].id);
                    }
                } catch (error) {
                    funcUtils.notify(error.response.data, 'error');
                } finally {
                    setLoading(false);
                }
            };

            getMovie();
            getDistinctFormarIds();
            getIdFormatMovieByFormatAndMovie();
        } else {
            setLoading(false);
        }
    }, [valueSelectCinemaComplex, valueSelectProvince, valueTimeMovie, valueFormat, valueCinema, valueSelectDate]);

    const handleReset = () => {
        form.setFieldsValue({
            province: null,
            cinemaComplex: null,
            cinema: null,
            movie: null,
            format: null,
            seatChart: null,
            time: null,
            date: null,
        });
        setSelectedOption1(null);
        setSelectedOption2(null);
        setSelectedOption3(null);
        setSelectedOption4(null);
        setSelectedOption5(null);
        setSelectedOption6(null);
        setValueSelectProvince(null);
        setValueCinema(null);
        setValueFormat(null);
        setvalueShowtimeByEndtime(null);
        setValueSelectCinemaComplex(null);
        setValueSelectDate(null);
        setValueTimeMovie(null);
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
            dataIndex: 'formatMovie',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Image
                        width={105}
                        height={80}
                        style={{ objectFit: 'contain' }}
                        alt="ảnh rỗng"
                        src={`http://localhost:8081/api/upload/${record.formatMovie.movie.poster}`}
                    />
                </Space>
            ),
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
                        okText="Có"
                        cancelText="Không"
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
        form.resetFields();
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
        handleReset();
        let time = moment(record.endTime).format('HH:mm');
        onChangSelectProvince(record.cinema.cinemaComplex.province.id);
        onChangSelectCinemaConplex(record.cinema.cinemaComplex.id);
        onChangSelectCinema(record.cinema.id);
        onChangSelectFormatMovie(record.formatMovie.movie.id);
        onChangSelectFormat(record.formatMovie.format.id);
        onChangSelectDate(dayjs(record.startTime, { format: 'YYYY-MM-DD' }));
        form.setFieldsValue({
            ...record,
            province: record.cinema.cinemaComplex.province.id,
            cinemaComplex: record.cinema.cinemaComplex.id,
            cinema: record.cinema.id,
            movie: record.formatMovie.movie.id,
            format: record.formatMovie.format.id,
            seatChart: record.seatChart.id,
            date: dayjs(record.startTime, { format: 'YYYY-MM-DD' }),
            time: dayjs(record.startTime, { format: 'HH:mm:ss' }),
        });
        setDataTimeMovie(record.formatMovie.movie.duration);
        setValueEndtimeByTimeMovieAndStartime(time);
        setSelectedOption1(record.cinema.cinemaComplex.province ? record.cinema.cinemaComplex.province.id : null);
        setSelectedOption2(record.cinema.cinemaComplex ? record.cinema.cinemaComplex.id : null);
        setSelectedOption3(record.cinema ? record.cinema.id : null);
        setSelectedOption4(record.formatMovie.movie ? record.formatMovie.movie.id : null);
        setSelectedOption5(record.startTime ? record.startTime : null);
        setValueSeatChartByCinema(record.seatChart.id);
        setEditData(record);
        setOpen(true);
        setResetForm(false);
    };

    const handleOk = async () => {
        setLoading(true);
        try {
            let values = await form.validateFields();
            //lấy ngày và giờ từ form
            let date = values.date.format('YYYY-MM-DD');
            let time = values.time.format('HH:mm:ss');

            const currentTime = new Date(); // Lấy ngày hiện tại
            const startTime = new Date(Date.parse(date + ' ' + time));
            const endTime = new Date(Date.parse(date + ' ' + valueEndtimeByTimeMovieAndStartime));
            const newCurrentDateADd = new Date(endTime);
            // Cộng thêm 10 ngày vào newCurrentDateADd
            newCurrentDateADd.setDate(currentTime.getDate() + 10);

            //tạo mảng lưu endtime HH:mm của xuất chiếu
            const endtimeFormatHHmm = [];
            for (const showtime of valueShowtimeByEndtime) {
                endtimeFormatHHmm.push(moment(showtime.endTime).format('HH:mm'));
            }

            //lấy ra giờ cuối cùng
            const lastArrayEndtime = endtimeFormatHHmm[endtimeFormatHHmm.length - 1];

            //lấy ra giờ cuối cùng cộng thêm 15 phút
            const lastEndTimeWithExtra15Minutes = moment(lastArrayEndtime, 'HH:mm').add(15, 'minutes').format('HH:mm');
            if (time < lastArrayEndtime && editData == null) {
                funcUtils.notify(`Thời gian phải hơn thời gian cuối cùng trong ngày là : ${lastArrayEndtime}`, 'error');
                setOpen(true);
                setLoading(false);
            } else {
                if (lastArrayEndtime == null) {
                    if (currentTime.toDateString() === startTime.toDateString()) {
                        values = {
                            ...values,
                            startTime: startTime,
                            endTime: endTime,
                            status: 2, // Công chiếu
                        };
                    } else if (startTime > currentTime && startTime <= newCurrentDateADd) {
                        values = {
                            ...values,
                            startTime: startTime,
                            endTime: endTime,
                            status: 1, // sắp chiếu
                        };
                    } else if (currentTime > startTime) {
                        values = {
                            ...values,
                            startTime: startTime,
                            endTime: endTime,
                            status: 3, //Kết thúc chiếu
                        };
                    } else {
                        values = {
                            ...values,
                            startTime: startTime,
                            endTime: endTime,
                            status: 0, //chưa công chiếu
                        };
                    }
                    if (editData) {
                        let putData = {
                            id: editData.id,
                            ...values,
                            startTime: startTime,
                            endTime: endTime,
                            status: editData.status,
                        };
                        try {
                            const resPut = await showtimeApi.put(
                                putData.id,
                                putData,
                                putData.cinema,
                                dataFormatMovieByFormatAndMovie,
                                valueSeatChartByCinema,
                            );
                            if (resPut.status === 200) {
                                funcUtils.notify('Cập nhật xuất chiếu thành công', 'success');
                                setOpen(false);
                                form.resetFields();
                                setLoading(false);
                                setWorkSomeThing([!workSomeThing]);
                            }
                        } catch (error) {
                            if (error.status === 500) {
                                funcUtils.notify('Lỗi máy chủ nội bộ, vui lòng thử lại sau!', 'error');
                                setLoading(false);
                            }
                            console.log(error);
                        }
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
                                setOpen(false);
                                form.resetFields();
                                setLoading(false);
                                setWorkSomeThing([!workSomeThing]);
                            }
                        } catch (error) {
                            console.log(error);
                            funcUtils.notify(error.response.data, 'error');
                        }
                    }
                } else {
                    if (time < lastEndTimeWithExtra15Minutes && editData == null) {
                        funcUtils.notify(`Vui lòng tăng 15 phút để dọn dẹp sau ${lastArrayEndtime}`, 'error');
                        setOpen(true);
                        setLoading(false);
                    } else {
                        if (currentTime.toDateString() === startTime.toDateString()) {
                            values = {
                                ...values,
                                startTime: startTime,
                                endTime: endTime,
                                status: 2, // Công chiếu
                            };
                        } else if (startTime > currentTime && startTime <= newCurrentDateADd) {
                            values = {
                                ...values,
                                startTime: startTime,
                                endTime: endTime,
                                status: 1, // sắp chiếu
                            };
                        } else if (currentTime > startTime) {
                            values = {
                                ...values,
                                startTime: startTime,
                                endTime: endTime,
                                status: 3, //Kết thúc chiếu
                            };
                        } else {
                            values = {
                                ...values,
                                startTime: startTime,
                                endTime: endTime,
                                status: 0, //chưa công chiếu
                            };
                        }

                         if (editData) {
                             let putData = {
                                 id: editData.id,
                                 ...values,
                                 startTime: startTime,
                                 endTime: endTime,
                                 status: editData.status,
                             };
                             try {
                                 const resPut = await showtimeApi.put(
                                     putData.id,
                                     putData,
                                     putData.cinema,
                                     dataFormatMovieByFormatAndMovie,
                                     valueSeatChartByCinema,
                                 );
                                 if (resPut.status === 200) {
                                     funcUtils.notify('Cập nhật xuất chiếu thành công', 'success');
                                     setOpen(false);
                                     form.resetFields();
                                     setLoading(false);
                                     setWorkSomeThing([!workSomeThing]);
                                 }
                             } catch (error) {
                                 if (error.status === 500) {
                                     funcUtils.notify('Lỗi máy chủ nội bộ, vui lòng thử lại sau!', 'error');
                                     setLoading(false);
                                 }
                                 console.log(error);
                             }
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
                                     setOpen(false);
                                     form.resetFields();
                                     setLoading(false);
                                     setWorkSomeThing([!workSomeThing]);
                                 }
                             } catch (error) {
                                 console.log(error);
                                 funcUtils.notify(error.response.data, 'error');
                             }
                         }
                    }
                }
            }
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
        setSelectedOption4(null);
        setSelectedOption5(null);
        setSelectedOption6(null);
        setDataTimeMovie(null);
        form.setFieldsValue({
            cinema: null,
            movie: null,
            format: null,
            seatChart: null,
            time: null,
            date: null,
        });
    };

    const onChangSelectFormatMovie = (value) => {
        setSelectedOption4(value);
        setValueTimeMovie(value);
        setvalueShowtimeByEndtime(null);
    };

    const onChangSelectFormat = (value) => {
        setSelectedOption5(value);
        setValueFormat(value);
        form.setFieldsValue({
            time: null,
            date: null,
        });
        setvalueShowtimeByEndtime(null);
    };

    const onChangSelectDate = (date) => {
        setSelectedOption6(date);
        if (date != null) {
            setValueSelectDate(date.format('YYYY-MM-DD'));
        }
    };

    const onChangSelectTime = (value) => {
        if (value != null) {
            const gio1 = value.format('HH:mm');
            const gio2 = dataTimeMovie;

            const moment1 = moment(gio1, 'HH:mm:ss');
            const moment2 = moment(gio2, 'HH:mm:ss');

            const gio1Gio = moment1.hours();
            const gio1Phut = moment1.minutes();
            const gio1Giay = moment1.seconds();
            const gio2Gio = moment2.hours();
            const gio2Phut = moment2.minutes();
            const gio2Giay = moment2.seconds();

            let tongGio = gio1Gio + gio2Gio;
            let tongPhut = gio1Phut + gio2Phut;
            let tongGiay = gio1Giay + gio2Giay;
            if (tongGiay >= 60) {
                tongPhut += Math.floor(tongGiay / 60);
                tongGiay %= 60;
            }
            if (tongPhut >= 60) {
                tongGio += Math.floor(tongPhut / 60);
                tongPhut %= 60;
            }
            const resultEndtime = moment().hours(tongGio).minutes(tongPhut).seconds(tongGiay).format('HH:mm:ss');
            setValueEndtimeByTimeMovieAndStartime(resultEndtime);
        }
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
        setvalueShowtimeByEndtime(null);
        setDataTimeMovie(null);
        form.setFieldsValue({
            cinemaComplex: null,
            cinema: null,
            movie: null,
            format: null,
            seatChart: null,
            time: null,
            date: null,
        });
    };
    //validate chọn ngày đến ngày
    const configDate = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Vui lòng chọn ngày ',
            },
        ],
    };

    const configTime = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Vui lòng chọn giờ',
            },
        ],
    };

    const customFormat = (value) => {
        return ` ${value.format('HH:mm')} ~ ${valueEndtimeByTimeMovieAndStartime}`;
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
                                                          <img
                                                              className={cx('img-Movie')}
                                                              src={`http://localhost:8081/api/upload/${formatMovie.poster}`}

                                                              //   src={`http://localhost:8081/api/upload/${formatMovie.movie.poster}`}
                                                          />
                                                          {/* <img className={cx('img-Movie')} src={img.datrungphuongnam} /> */}
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
                        <Form.Item>
                            <Row style={{ width: '890px' }}>
                                <Col xs={24} sm={24} lg={9}>
                                    <Form.Item name="date" label="Chọn ngày chiếu" {...configDate}>
                                        <DatePicker
                                            placeholder="Chọn ngày"
                                            style={{ width: 170 }}
                                            format={'DD-MM-YYYY'}
                                            value={selectedOption6}
                                            onChange={(value) => onChangSelectDate(value)}
                                            disabled={!selectedOption5}
                                        />
                                    </Form.Item>
                                    <Form.Item name="time" label="Chọn giờ bắt đầu" {...configTime}>
                                        <TimePicker
                                            format={customFormat}
                                            onChange={(value) => onChangSelectTime(value)}
                                            style={{ width: 170 }}
                                            placeholder="Chọn giờ bắt đầu"
                                            disabled={!selectedOption6}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={24} lg={15} style={{ marginTop: '-25px' }}>
                                    {valueShowtimeByEndtime && valueShowtimeByEndtime.length > 0 ? (
                                        <>
                                            <span style={{ color: 'gray' }}>
                                                Những xuất chiếu đã tồn tại trong ngày :{' '}
                                            </span>
                                            <br />
                                            {valueShowtimeByEndtime.map((valueShowtime) => (
                                                <Button
                                                    key={valueShowtime.id}
                                                    className={cx('btn-suat-chieu')}
                                                    style={{ marginBottom: '25px', marginRight: '5px' }}
                                                >
                                                    <span className={cx('gio-bat-dau')}>
                                                        {moment(valueShowtime.startTime).format('HH:mm')}
                                                    </span>
                                                    <span className={cx('gio-ket-thuc')}>
                                                        {moment(valueShowtime.endTime).format('HH:mm')}
                                                    </span>
                                                </Button>
                                            ))}
                                        </>
                                    ) : null}
                                </Col>
                            </Row>
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
