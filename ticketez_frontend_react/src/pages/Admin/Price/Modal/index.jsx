import React, { useState, useEffect } from 'react';
import { Card, Breadcrumb, Select, Col, Row, Button, Modal, DatePicker, Space } from 'antd';
import axiosClient from '~/api/global/axiosClient';

import dayjs from 'dayjs';
const ModalPrice = (props) => {
    const { isEdit, record } = props;
    const [cinemaComplexDaTa, setCinemaComplexDaTa] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const [cinemaComplexChoose, setCinemaComplexChoose] = useState(record ? record.price.cinemaComplex.id : null);
    const [movieChoose, setMovieChoose] = useState(record ? record.price.movie.id : null);
    const [startDateChoose, setStartDateChoose] = useState(record ? record.price.startDate : null);
    const [endDateChoose, setEndDateChoose] = useState(record ? record.price.endDate : null);

    const fetchDataCinemaComplex = async () => {
        try {
            const resp = await axiosClient.get(`cinemaComplex/get/all`);
            const dataCinemaComplex = resp.data;
            setCinemaComplexDaTa(dataCinemaComplex);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataMovie = async () => {
        try {
            const resp = await axiosClient.get(`movie/get/all`);
            const dataMovie = resp.data;
            setMovieData(dataMovie);
        } catch (error) {
            console.error(error);
        }
    };

    const options = cinemaComplexDaTa.map((cinema) => ({
        value: cinema.id,
        label: cinema.name,
    }));

    const optionsMovieSelect = movieData.map((movie) => ({
        value: movie.id,
        label: movie.title,
    }));

    useEffect(() => {
        fetchDataCinemaComplex();
        fetchDataMovie();
    });
    const onSearchCinemaComplex = (value) => {
        console.log('search:', value);
    };

    const onChangeCinemaComplex = (value) => {
        setCinemaComplexChoose(value);
        console.log(value);
    };
    const onSearchMovie = (value) => {
        console.log('search:', value);
    };

    const onChangeMovie = (value) => {
        setMovieChoose(value);
        console.log(value);
    };
    const onChangeStartDate = (date, dateString) => {
        console.log(date, dateString);
        setStartDateChoose(date);
    };
    const onChangeEndDate = (date, dateString) => {
        setEndDateChoose(date);
        console.log(date, dateString);
    };

    const handelCreateAndUpdate = () => {
        if (isEdit === null) {
            console.log('Thêm');
        } else {
            console.log('Sửa');
        }
        const dataPrice = {
            startDate: startDateChoose,
            endDate: endDateChoose,
            status: true,
            movie: {
                id: movieChoose,
            },
            cinemaComplex: {
                id: cinemaComplexChoose,
            },
        };
    };

    return (
        <>
            <Row>
                <Col span={24}>
                    <p className="tw-font-medium tw-mb-2">Chọn cụm rạp :</p>
                    <Select
                        className="tw-width-100"
                        showSearch
                        placeholder="Chọn cụm rạp"
                        optionFilterProp="children"
                        onChange={onChangeCinemaComplex}
                        onSearch={onSearchCinemaComplex}
                        filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        options={options}
                        defaultValue={record ? record.price.cinemaComplex.id : null}
                    />
                </Col>
                <Col span={24}>
                    <p className="tw-font-medium tw-mb-2">Chọn phim :</p>
                    <Select
                        className="tw-width-100"
                        showSearch
                        placeholder="Chọn cụm rạp"
                        optionFilterProp="children"
                        onChange={onChangeMovie}
                        onSearch={onSearchMovie}
                        filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        options={optionsMovieSelect}
                        defaultValue={record ? record.price.movie.id : null}
                    />
                </Col>
                <Col span={24}>
                    <Row>
                        <Col span={12}>
                            <p className="tw-font-medium tw-mb-2">Ngày bắt đầu :</p>
                            <DatePicker
                                value={record ? dayjs(record.price.startDate) : dayjs()}
                                onChange={onChangeStartDate}
                                locale="vi"
                            />
                        </Col>
                        <Col span={12}>
                            <p className="tw-font-medium tw-mb-2">Ngày kết thúc :</p>
                            <DatePicker
                                value={record ? dayjs(record.price.endDate) : dayjs()}
                                onChange={onChangeEndDate}
                                locale="vi"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <Button onClick={handelCreateAndUpdate} className="tw-mt-5" type="primary">
                        {isEdit ? 'Cập nhât' : 'Thêm'}
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default ModalPrice;
