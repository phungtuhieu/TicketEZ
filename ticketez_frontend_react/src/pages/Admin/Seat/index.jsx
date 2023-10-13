import MySelect from '~/components/Admin/SelectSeach';
import classNames from 'classnames/bind';
import style from './Seat.module.scss';
import { useState, useEffect } from 'react';
import SeatChart from './SeatChart';
import { Card, Breadcrumb, Select, Col, Row, Button } from 'antd';
import { SearchOutlined, PlusOutlined, HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import axiosClient from '~/api/global/axiosClient';

const cx = classNames.bind(style);

function AdminSeat() {
    // Dữ liệu cụm rạp
    const [cinemaComplexDaTa, setCinemaComplexDaTa] = useState([]);
    // Dữ liệu rạp
    const [cinemaDaTa, setCinemaDaTa] = useState([]);
    // Dữ liệu bảng đồ
    const [seatChartDaTa, setSeatChartDaTa] = useState([]);
    const [row, setRow] = useState();
    const [col, setCol] = useState();
    const [idSeatChart, setIdSeatChart] = useState();

    // ẩn hiện chọn rạp là phải check lúc bấm vào cụm rạp
    const [selectedCinemaComplex, setSelectedCinemaComplex] = useState(false);
    // Ẩn hiện sơ đồ là phải check lúc bấm vào rập
    const [selectedOptionCinema, setSelectedOptionCinema] = useState(false);
    // Ẩn hiên ghé là phải check lúc chọn vào biểu đồ
    const [selectedOption, setSelectedOption] = useState(false);

    const fetchDataCinemaComplex = async () => {
        try {
            const resp = await axiosClient.get(`cinemaComplex`);
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

    const fetchDataSeat = async (value) => {
        try {
            const resp = await axiosClient.get(`seatchart/${value}`);
            // Lấy giá trị hàng và cột từ dữ liệu trả về từ API
            const rowData = resp.data.rows;
            const colData = resp.data.columns;
            setIdSeatChart(resp.data.id);
            setRow(rowData);
            setCol(colData);
            setSelectedOption(true);
            console.log(`Rows: ${rowData}, Columns: ${colData}`);
        } catch (error) {
            console.error(error);
        }
    };

    // Cụm rạp

    useEffect(() => {
        fetchDataCinemaComplex();
    }, []);

    const options = cinemaComplexDaTa.map((cinema) => ({
        value: cinema.id,
        label: cinema.name,
    }));

    const onChangeCinemaComplex = (value) => {
        fetchDataCinema(value);

        console.log(`selected ${value}`);
    };
    const onSearchCinemaComplex = (value) => {
        console.log('search:', value);
    };

    // Rạp

    useEffect(() => {}, [cinemaDaTa]);

    const optionsCinema = cinemaDaTa.map((cinema) => ({
        value: cinema.id,
        label: cinema.name,
    }));

    const onChangeCinema = (value) => {
        fetchDataSeatChart(value);
        console.log(`selected ${value}`);
    };
    const onSearchCinema = (value) => {
        console.log('search:', value);
    };

    // sơ đồ rạp

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
        setSelectedOption(false);
        console.log(`selected ${value}`);
        fetchDataSeat(value);
    };

    const onSearch = (value) => {
        console.log('search:', value);
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

                       
                    </Card>
                </Col>
                <Col span={16}>
                    {selectedOption && <SeatChart rows={row} columns={col} idSeatChart={idSeatChart} />}
                </Col>  
            </Row>
        </>
    );
}

export default AdminSeat;
