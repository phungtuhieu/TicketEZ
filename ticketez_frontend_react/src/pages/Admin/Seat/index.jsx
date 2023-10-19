import MySelect from '~/components/Admin/SelectSeach';
import classNames from 'classnames/bind';
import style from './Seat.module.scss';
import { useState, useEffect } from 'react';
import SeatChart from '~/pages/Admin/Seat/SeatChart';
import { Card, Breadcrumb, Select, Col, Row, Button } from 'antd';
import { SearchOutlined, PlusOutlined, HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import BaseApi from '~/api/global/baseApi';
import axiosClient from '~/api/global/axiosClient';

const cx = classNames.bind(style);

function AdminSeat() {
    // Dữ liệu cụm rạp
    const [cinemaComplexDaTa, setCinemaComplexDaTa] = useState([]);
    // Dữ liệu rạp
    const [cinemaDaTa, setCinemaDaTa] = useState([]);
    // Dữ liệu bảng đồ
    const [seatChartDaTa, setSeatChartDaTa] = useState([]);
    // Dữ liệu xuất chiếu
    const [seatChildrenSeatChartDaTa, setSeatChildrenSeatChartDaTa] = useState([]);
    // Dữ liệu booking
    const [bookingData, setBookingData] = useState([]);
    // Dữ liệu seatBooking
    const [seatBookingData, setSeatBookingData] = useState([]);
    const [row, setRow] = useState();
    const [col, setCol] = useState();
    const [idSeatChart, setIdSeatChart] = useState();

    // Dữ liệu tên ghế đã đặt
    const [nameSeat, setNameSeat] = useState([]);
    // ẩn hiện chọn rạp là phải check lúc bấm vào cụm rạp
    const [selectedCinemaComplex, setSelectedCinemaComplex] = useState(false);
    // Ẩn hiện sơ đồ là phải check lúc bấm vào rập
    const [selectedOptionCinema, setSelectedOptionCinema] = useState(false);

    // Ẩn hiên xuất chiếu là phải check lúc chọn vào biểu đồ
    const [selectedOption, setSelectedOption] = useState(false);
    // ẩn hiện ghế là phải chọn xuất chiếu
    const [selectedOptionShowTime, setSelectedOptionShowTime] = useState(false);

    // Sử dụng một biến state để theo dõi sự thay đổi của row và col
    const [seatChartDataChanged, setSeatChartDataChanged] = useState(false);

    const fetchDataCinemaComplex = async () => {
        const cinemaComplexApi = new BaseApi('cinemaComplex');

        try {
            const resp = await cinemaComplexApi.getAll();
            // Lấy giá trị hàng và cột từ dữ liệu trả về từ API
            const dataCinemaComplex = resp.data;
            setCinemaComplexDaTa(dataCinemaComplex);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataCinema = async (idCInemacomplex) => {
        try {
            const resp = await axiosClient.get(`cinema/by-cinema-complex/${idCInemacomplex}`);
            // Lấy giá trị hàng và cột từ dữ liệu trả về từ API
            const dataCinema = resp.data;
            console.log(dataCinema);
            setCinemaDaTa(dataCinema);
            setSelectedCinemaComplex(true);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataSeatChart = async (idCInema) => {
        try {
            const resp = await axiosClient.get(`seatchart/by-cinema/${idCInema}`);
            // Lấy giá trị hàng và cột từ dữ liệu trả về từ API
            const dataSeatChart = resp.data;
            console.log(dataSeatChart);
            setSeatChartDaTa(dataSeatChart);
            setSelectedOptionCinema(true);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataChildSeatChart = async (value) => {
        try {
            const resp = await axiosClient.get(`child-seat-chart/${value}`);
            // Lấy giá trị hàng và cột từ dữ liệu trả về từ API
            const dataChildSeatChart = resp.data;
            setSeatChildrenSeatChartDaTa(dataChildSeatChart);

            setSelectedOption(true);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataBooking = async (value) => {
        setSeatBookingData([]);
        console.log(value);
        try {
            const resp = await axiosClient.get(`booking/by-show-time/${value}`);
            // Lấy giá trị hàng và cột từ dữ liệu trả về từ API
            const data = resp.data;
            data.forEach((element) => {
                console.log(element.id);
                fetchDataSeatBooking(element.id);
            });

            setBookingData(data);
            setSelectedOption(true);

            console.log(seatBookingData);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataSeatBooking = async (value) => {
        try {
            const resp = await axiosClient.get(`seatBooking/name-seat/${value}`);
            const data = resp.data;
            console.log(data);
            data.forEach((newItem) => {
                // Kiểm tra xem newItem đã tồn tại trong mảng hay chưa
                if (!seatBookingData.includes(newItem)) {
                    // Nếu chưa tồn tại, thì thêm vào mảng
                    setSeatBookingData((prev) => [...prev, newItem]);
                }
            });

            setSelectedOption(true);
            console.log('----------------------------------------------------------------');
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataSeat = async (value) => {
        try {
            const resp = await axiosClient.get(`seatchart/${value}`);
            // Lấy giá trị hàng và cột từ dữ liệu trả về từ API
            const rowData = resp.data.rows;
            const colData = resp.data.columns;
            setIdSeatChart(resp.data.id);
            setRow(rowData);
            setCol(colData);
            setSelectedOptionShowTime(false);
            setSelectedOptionShowTime(true);

            console.log(`Rows: ${rowData}, Columns: ${colData}`);
        } catch (error) {
            console.error(error);
        }
    };
    // Gọi lại ghế khi có thay đổi để cập nhật lại ghế
    useEffect(() => {
        setSeatChartDataChanged(!seatChartDataChanged);
    }, [row, col, seatBookingData]);

    // Cụm rạp----------------------------------------------------------

    useEffect(() => {
        fetchDataCinemaComplex();
    }, []);

    const options = cinemaComplexDaTa.map((cinema) => ({
        value: cinema.id,
        label: cinema.name,
    }));

    const onChangeCinemaComplex = (value) => {
        fetchDataCinema(value);
        setSelectedCinemaComplex(false);
        setSelectedOptionCinema(false);
        setSelectedOption(false);
        setSelectedOptionShowTime(false);

        console.log(`selected ${value}`);
    };
    const onSearchCinemaComplex = (value) => {
        console.log('search:', value);
    };

    // Rạp-----------------------------------------------------

    useEffect(() => {}, [cinemaDaTa]);

    const optionsCinema = cinemaDaTa.map((cinema) => ({
        value: cinema.id,
        label: cinema.name,
    }));

    const onChangeCinema = (value) => {
        fetchDataSeatChart(value);
        setSelectedOptionCinema(false);
        setSelectedOption(false);
        setSelectedOptionShowTime(false);
        console.log(`selected ${value}`);
    };
    const onSearchCinema = (value) => {
        console.log('search:', value);
    };

    // Xuất chiếu-------------------------------------------

    const optionsChildShowTime = seatChildrenSeatChartDaTa.map((showTime) => ({
        value: showTime.showTimeId,
        label: showTime.startTime + showTime.endTime,
    }));
    // Booking---------------------------------------------------

    // hành động khi chọn xuất chiếu
    const onChangeShowTime = (value) => {
        console.log(`selected ${value}`);
        fetchDataBooking(value);
        // fetchDataSeat(value);
    };
    // sơ đồ rạp-----------------------------------------------------------------------

    const optionsSeatchart = seatChartDaTa.map((seatChart) => ({
        value: seatChart.id,
        label: seatChart.name,
    }));

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // useEffect(() => {
    //     if (row !== undefined && col !== undefined && selectedOption) {
    //         setSelectedOption('2222');
    //         console.log("----------------------------------------------------------------");
    //     }
    // }, [row, col, selectedOption]);

    // hành động khi chọn sơ đồ
    const onChange = (value) => {
        fetchDataSeat(value);
        fetchDataChildSeatChart(value);

        setSelectedOption(false);

        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const check = () => {
        console.log(seatBookingData);
    };

    return (
        <>
            <Row className={cx('container')} style={{ width: '100%' }}>
                <Col style={{ backgroundColor: 'transparent' }} className={cx('col-first')} span={8}>
                    <Card className={cx('card')} title="Ghế" bordered={true} style={{ width: 300 }}>
                        <h3>Chọn cụm rạp</h3>
                        <Select
                            className={cx('select')}
                            showSearch
                            placeholder="Chọn cụm rạp"
                            optionFilterProp="children"
                            onChange={onChangeCinemaComplex}
                            onSearch={onSearchCinemaComplex}
                            filterOption={(input, option) =>
                                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            options={options}
                        />
                        {selectedCinemaComplex && (
                            <>
                                <h3>Chọn rạp</h3>
                                <Select
                                    className={cx('select')}
                                    showSearch
                                    placeholder="Chọn cụm rạp"
                                    optionFilterProp="children"
                                    onChange={onChangeCinema}
                                    onSearch={onSearchCinema}
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    options={optionsCinema}
                                />
                            </>
                        )}
                        {selectedOptionCinema && (
                            <>
                                <h3>Chọn sơ đồ</h3>
                                <Select
                                    className={cx('select')}
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    filterOption={filterOption}
                                    options={optionsSeatchart}
                                />
                            </>
                        )}

                        {selectedOption && (
                            <>
                                <h3>Chọn xuất chiếu</h3>
                                <Select
                                    className={cx('select')}
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    onChange={onChangeShowTime}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    options={optionsChildShowTime}
                                />
                            </>
                        )}
                        <button onClick={check}>checl</button>
                    </Card>
                </Col>
                <Col span={16}>
                    {selectedOptionShowTime && (
                        <SeatChart
                            rows={row}
                            columns={col}
                            nameSeat={seatBookingData}
                            idSeatChart={idSeatChart}
                            key={seatChartDataChanged}
                        />
                    )}
                </Col>
            </Row>
        </>
    );
}

export default AdminSeat;
