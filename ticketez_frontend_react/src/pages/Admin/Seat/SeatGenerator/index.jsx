import React from 'react';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import SeatChart from '~/pages/Admin/Seat/SeatChart';
import { Card, Breadcrumb, Select, Col, Row, Button, Modal, InputNumber, Input } from 'antd';
import { SearchOutlined, PlusOutlined, HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import BaseApi from '~/api/global/baseApi';
import axiosClient from '~/api/global/axiosClient';
import style from '../Seat.module.scss';
import funcUtils from '~/utils/funcUtils';
import FirstSeat from '../FirstSeat';

const cx = classNames.bind(style);

export default function SeatGenerator() {
    // Dữ liệu cụm rạp
    const [cinemaComplexDaTa, setCinemaComplexDaTa] = useState([]);
    // Dữ liệu rạp
    const [cinemaDaTa, setCinemaDaTa] = useState([]);
    // Lưu id rạp
    const [idCinema, setIdCinema] = useState();
    // Lưu id seatChart
    const [idSeatChart, setIdSeatChart] = useState();
    const [inputValue, setInputValue] = useState('');
    const [showInfo, setShowInfo] = useState('');

    const [row, setRow] = useState(5);
    const [col, setCol] = useState(5);

    // ẩn hiện chọn rạp là phải check lúc bấm vào cụm rạp
    const [selectedCinemaComplex, setSelectedCinemaComplex] = useState(false);
    // Ẩn hiện sơ đồ là phải check lúc bấm vào rập
    const [selectedOptionCinema, setSelectedOptionCinema] = useState(false);

    // Sử dụng một biến state để theo dõi sự thay đổi của row và col
    const [firstChartDataChanged, setFirstChartDataChanged] = useState(false);

    // Lấy cụm rạp
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
    // Lấy rạp
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

    const createSeatArray = () => {
        let seatRows = row; // Số hàng
        let seatColumns = col; // Số cột
        // Tạo mảng chú thích hàng ở bên trái dựa vào số hàng
        const rowLabels = Array.from({ length: seatRows }, (_, index) => String.fromCharCode(65 + index));
        const seatState = {
            seat: [],
            seatAvailable: [],
            seatReserved: [],
            vipSeat: [],
            normalSeat: [],
            seatUnavailable: [],
        };
        // Tạo mảng chỗ ngồi
        const rowHeader = rowLabels.map((label) => label + ' ');

        for (let i = 0; i < seatRows; i++) {
            const row = [];
            const rowAvailable = [];
            const rowLabel = rowLabels[i];
            for (let j = 1; j <= seatColumns; j++) {
                const seatNumber = `${rowLabel}${j}`;
                row.push(seatNumber);
                if (!seatState.seatUnavailable.includes(seatNumber)) {
                    rowAvailable.push(seatNumber);
                }
            }

            seatState.seat.push(row);
        }

        console.log(seatState.seat);

        // Thêm cột chú thích hàng ở bên trái
        seatState.seatHeader = rowHeader;

        return seatState;
    };
    const [seatState, setSeatState] = useState(createSeatArray());

    // Create Seat
    const createSeatDB = async (idChart) => {
        try {
            const dataArray = seatState.seatHeader.map((header, rowIndex) =>
                seatState.seat[rowIndex].map((seat_no) => ({
                    name: seat_no,
                    status: 1,
                    description: 'ghế thông thường',
                    seatType: {
                        id: 1,
                    },
                    seatChart: {
                        id: idChart,
                    },
                })),
            );
            const flattenedArray = [].concat(...dataArray);

            const resp = await axiosClient.post(`seat`, flattenedArray);
        } catch (error) {
            console.error(error);
        }
    };

    // Thêm sơ đồ mới

    const postDataSeatChart = async () => {
        try {
            const data = {
                name: inputValue,
                rows: row,
                columns: col,
                status: true,
                cinema: {
                    id: idCinema,
                },
            };

            console.log(data);

            const resp = await axiosClient.post(`seatchart`, data);
            setIdSeatChart(resp.data.id);
            createSeatDB(resp.data.id);
            setShowInfo('success');
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (showInfo === 'success') {
            funcUtils.notify('Thêm thành công sơ đồ', 'success');
        }
        if (showInfo === 'error') {
            funcUtils.notify('Thêm không thành công', 'error');
        }
    }, [showInfo]);

    useEffect(() => {
        fetchDataCinemaComplex();
    }, []);

    useEffect(() => {
        setSeatState(createSeatArray());
        // createSeatArray();
        setFirstChartDataChanged(!firstChartDataChanged);
    }, [row, col, idSeatChart]);

    const options = cinemaComplexDaTa.map((cinema) => ({
        value: cinema.id,
        label: cinema.name,
    }));

    const onChangeCinemaComplex = (value) => {
        fetchDataCinema(value);
        setSelectedCinemaComplex(false);
        setSelectedOptionCinema(false);
        console.log(`selected ${value}`);
    };
    const onSearchCinemaComplex = (value) => {
        console.log('search:', value);
    };

    // Cinema

    const optionsCinema = cinemaDaTa.map((cinema) => ({
        value: cinema.id,
        label: cinema.name,
    }));

    const onChangeCinema = (value) => {
        setSelectedOptionCinema(true);
        setIdCinema(value);
        console.log(`selected ${value}`);
    };
    const onSearchCinema = (value) => {
        console.log('search:', value);
    };

    // input rows
    const onChangeRow = (value) => {
        setRow(value);
        console.log('changed', value);
    };
    // Input cols

    const onChangeCol = (value) => {
        setCol(value);
        console.log('changed', value);
    };

    // Input name sơ đồ
    const onChange = (e) => {
        setInputValue(e.target.value);
        console.log('Change:', e.target.value);
    };
    // Thêm sơ đồ

    const handelCreate = () => {
        postDataSeatChart();
    };

    return (
        <>
            <Row className={cx('container')} style={{ width: '100%' }}>
                <Col style={{ backgroundColor: 'transparent' }} className={cx('col-first')} span={8}>
                    <Card className={cx('card')} title="chỗ nhập liệu" bordered={true} style={{ width: 300 }}>
                        <p>Chọn cụm rạp:</p>
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
                                <p>Chọn rạp:</p>
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
                                <div className={cx('select')}>
                                    <p>Nhập số hàng ghế:</p>
                                    <InputNumber min={1} max={20} defaultValue={5} onChange={onChangeRow} />
                                </div>
                            </>
                        )}
                        {selectedOptionCinema && (
                            <>
                                <div className={cx('select')}>
                                    <p>Nhập số cột ghế:</p>
                                    <InputNumber min={1} max={20} defaultValue={5} onChange={onChangeCol} />
                                </div>
                            </>
                        )}

                        {selectedOptionCinema && (
                            <>
                                <div className={cx('select')} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <p>Nhập tên sơ đồ :</p>
                                    <Input showCount maxLength={20} onChange={onChange} />
                                </div>
                            </>
                        )}

                        {selectedOptionCinema && (
                            <>
                                <div className={cx('select')} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button type="primary" onClick={handelCreate}>
                                        Thêm ghế
                                    </Button>
                                </div>
                            </>
                        )}
                    </Card>
                </Col>
                <Col span={16}>
                    <Card>
                        <FirstSeat rows={row} columns={col} key={firstChartDataChanged} idSeatChart={idSeatChart} />
                    </Card>
                </Col>
            </Row>
        </>
    );
}
