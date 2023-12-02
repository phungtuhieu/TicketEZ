import React, { useState, useEffect } from 'react';
import { Card, Breadcrumb, Select, Col, Row, Button, Modal, DatePicker, Space } from 'antd';
import axiosClient from '~/api/global/axiosClient';
import { InputNumber } from 'antd';
import funcUtils from '~/utils/funcUtils';
import dayjs from 'dayjs';
const ModalPrice = (props) => {
    const { isEdit, record } = props;
    const [cinemaComplexDaTa, setCinemaComplexDaTa] = useState([]);
    const [movieData, setMovieData] = useState([]);
    const [seatTypeData, setSeatTypeData] = useState([]);
    const [cinemaComplexChoose, setCinemaComplexChoose] = useState(record ? record.price.cinemaComplex.id : null);
    const [movieChoose, setMovieChoose] = useState(record ? record.price.formatMovie.movie.id : null);
    const [startDateChoose, setStartDateChoose] = useState(record ? record.price.startDate : null);
    const [endDateChoose, setEndDateChoose] = useState(record ? record.price.endDate : null);
    // lưu giá khi chọn
    const [priceSeatDayNormal, setPriceSeatDayNormal] = useState();
    const [priceSeatDayVip, setPriceSeatDayVip] = useState();
    const [priceSeatDayCouple, setPriceSeatDayCouple] = useState();
    const [priceSeatDayRecliner, setPriceSeatDayRecliner] = useState();
    const [priceSeatDayKid, setPriceSeatDayKid] = useState();
    const [priceSeatDaySofa, setPriceSeatDaySofa] = useState();
    const [priceSeatWeekNormal, setPriceSeatWeekNormal] = useState();
    const [priceSeatWeekVip, setPriceSeatWeekVip] = useState();
    const [priceSeatWeekCouple, setPriceSeatWeekCouple] = useState();
    const [priceSeatWeekRecliner, setPriceSeatWeekRecliner] = useState();
    const [priceSeatWeekKid, setPriceSeatWeekKid] = useState();
    const [priceSeatWeekSofa, setPriceSeatWeekSofa] = useState();

    const onChangeDefaultPrice = (value) => {
        console.log('changed', value);
    };
    // Day
    const onChangeDayPriceNormal = (value) => {
        setPriceSeatDayNormal(value);
        console.log('changed', value);
    };
    const onChangeDayPriceVip = (value) => {
        setPriceSeatDayVip(value);
        console.log('changed', value);
    };

    const onChangeDayPriceCouple = (value) => {
        setPriceSeatDayCouple(value);
        console.log('changed', value);
    };

    const onChangeDayPriceRecliner = (value) => {
        setPriceSeatDayRecliner(value);
        console.log('changed', value);
    };
    const onChangeDayPriceKid = (value) => {
        setPriceSeatDayKid(value);
        console.log('changed', value);
    };
    const onChangeDayPriceSofa = (value) => {
        setPriceSeatDaySofa(value);
        console.log('changed', value);
    };

    // Week
    const onChangeWeekPriceNormal = (value) => {
        setPriceSeatWeekNormal(value);
        console.log('changed', value);
    };
    const onChangeWeekPriceVip = (value) => {
        setPriceSeatWeekVip(value);
        console.log('changed', value);
    };
    const onChangeWeekPriceCouple = (value) => {
        setPriceSeatWeekCouple(value);
        console.log('changed', value);
    };
    const onChangeWeekPriceRecliner = (value) => {
        setPriceSeatWeekRecliner(value);
        console.log('changed', value);
    };
    const onChangeWeekPriceKid = (value) => {
        setPriceSeatWeekKid(value);
        console.log('changed', value);
    };
    const onChangeWeekPriceSofa = (value) => {
        setPriceSeatWeekSofa(value);
        console.log('changed', value);
    };

    const fetchDataCinemaComplex = async () => {
        try {
            const resp = await axiosClient.get(`cinemaComplex/get/all`);
            const dataCinemaComplex = resp.data;
            setCinemaComplexDaTa(dataCinemaComplex);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDataSeatType = async () => {
        try {
            const resp = await axiosClient.get(`seatType/getAll`);
            const dataSeatType = resp.data;
            setSeatTypeData(dataSeatType);
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
        fetchDataSeatType();
        fetchDataMovie();
    });
    const onSearchCinemaComplex = (value) => {};

    const onChangeCinemaComplex = (value) => {
        setCinemaComplexChoose(value);
    };
    const onSearchMovie = (value) => {};

    const onChangeMovie = (value) => {
        setMovieChoose(value);
    };
    const onChangeStartDate = (date, dateString) => {
        if (date === null) {
            return;
        }
        const formattedDate = date.format('YYYY-MM-DD');

        setStartDateChoose(formattedDate);
    };
    const onChangeEndDate = (date, dateString) => {
        if (date === null) {
            return;
        }
        const formattedDate = date.format('YYYY-MM-DD');

        setEndDateChoose(formattedDate);
    };

    const disabledStartDate = (current) => {
        if (endDateChoose && current.isAfter(endDateChoose)) {
            return true;
        }
        return false;
    };

    const disabledEndDate = (current) => {
        if (startDateChoose && current.isBefore(startDateChoose)) {
            return true;
        }
        return false;
    };
    const validate = () => {
        if (priceSeatDayNormal === undefined) {
            return false;
        }
        if (priceSeatDayVip === undefined) {
            return false;
        }
        if (priceSeatDayCouple === undefined) {
            return false;
        }
        if (priceSeatWeekNormal === undefined) {
            return false;
        }
        if (priceSeatWeekVip === undefined) {
            return false;
        }
        if (priceSeatWeekCouple === undefined) {
            return false;
        }
    };
    const [showInfo, setShowInfo] = useState('');
    useEffect(() => {
        if (showInfo === 'success') {
            funcUtils.notify('Sửa thành công dữ liệu trong bảng', 'success');
            setShowInfo('es');
        }
        if (showInfo === 'error') {
            funcUtils.notify('Không được để trống dữ liệu', 'error');
            setShowInfo('es');
        }
        if (showInfo === 'successDate') {
            funcUtils.notify('Sửa thành công dữ liệu trong bảng', 'success');
        }
        if (showInfo === 'errorDateStart') {
            funcUtils.notify('Ngày bắt đầu không thể lớn hơn ngày kết thúc', 'error');
        }
        if (showInfo === 'errorDateEnd') {
            funcUtils.notify('Ngày kết thúc không thể nhỏ hơn ngày bắt đầu', 'error');
        }
    }, [showInfo]);

    const handelCreateAndUpdate = async () => {
        if (validate() === false) {
            setShowInfo('error');
            return;
        }

        const dataPrice = {
            startDate: startDateChoose,
            endDate: endDateChoose,
            status: true,
            formatMovie: {
                id: record.price.formatMovie.id,
            },
            cinemaComplex: {
                id: cinemaComplexChoose,
            },
        };

        let respPrice;

        try {
            respPrice = await axiosClient.post(`price`, dataPrice);
            console.log(respPrice);
        } catch (error) {
            console.log(error);
            return;
        }
        console.log(respPrice);

        const dataPriceSeatType = record.newPriceSeatTypeDTOs.map((item) => {
            return {
                weekdayPrice:
                    item.seatType.id === 1
                        ? priceSeatDayNormal
                        : item.seatType.id === 2
                        ? priceSeatDayVip
                        : item.seatType.id === 3
                        ? priceSeatDayCouple
                        : item.seatType.id === 4
                        ? priceSeatDayRecliner
                        : item.seatType.id === 5
                        ? priceSeatDayKid
                        : item.seatType.id === 6
                        ? priceSeatDaySofa
                        : null,
                weekendPrice:
                    item.seatType.id === 1
                        ? priceSeatWeekNormal
                        : item.seatType.id === 2
                        ? priceSeatWeekVip
                        : item.seatType.id === 3
                        ? priceSeatWeekCouple
                        : item.seatType.id === 4
                        ? priceSeatWeekRecliner
                        : item.seatType.id === 5
                        ? priceSeatWeekKid
                        : item.seatType.id === 6
                        ? priceSeatWeekSofa
                        : null,
                seatType: {
                    id: item.seatType.id,
                },
                price: {
                    id: respPrice.data.id,
                },
            };
        });
        console.log(dataPriceSeatType);

        try {
            const resp = await axiosClient.patch(`price/${record.price.id}`, { status: false });
            console.log(resp);
        } catch (error) {
            console.log(error);
            return;
        }

        try {
            const resp = await axiosClient.post(`price_seat_type`, dataPriceSeatType);
            console.log(resp);
        } catch (error) {
            console.log(error);
            return;
        }

        setShowInfo('success');
    };

    const [isFirstRowVisible, setIsFirstRowVisible] = useState(true);

    const editPrice = () => {
        setIsFirstRowVisible(!isFirstRowVisible);
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
                        defaultValue={record ? record.price.formatMovie.movie.id : null}
                    />
                </Col>
                <Col span={24} className="tw-mb-5">
                    <Row>
                        <Col span={12}>
                            <p className="tw-font-medium tw-mb-2">Ngày bắt đầu :</p>
                            <DatePicker
                                defaultValue={record ? dayjs(record.price.startDate) : dayjs()}
                                onChange={onChangeStartDate}
                                locale="vi"
                                disabledDate={disabledStartDate}
                            />
                        </Col>
                        <Col span={12}>
                            <p className="tw-font-medium tw-mb-2">Ngày kết thúc :</p>
                            <DatePicker
                                defaultValue={record ? dayjs(record.price.endDate) : dayjs()}
                                onChange={onChangeEndDate}
                                locale="vi"
                                disabledDate={disabledEndDate}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <hr />
                    <Row>
                        <Col span={18}>
                            <p className="tw-font-medium tw-mt-4">Loại ghế :</p>
                        </Col>
                        <Col span={6} className="tw-mt-8">
                            <a onClick={editPrice} className="tw-ms-16 " type="primary">
                                Sửa giá
                            </a>
                        </Col>
                    </Row>
                    {isFirstRowVisible && (
                        <Row>
                            {/*row1 */}
                            {record.newPriceSeatTypeDTOs.map((moment, index) => (
                                <Col key={index} span={24}>
                                    <Row className='tw-mb-12'>
                                        <Col span={7}>
                                            <p className="tw-font-bold tw-text-xl tw-mb-2">{moment.seatType.name}</p>
                                        </Col>
                                        <Col span={7}>
                                            <p className="tw-text-xl tw-mb-2">Giá trong tuần</p>
                                            <InputNumber
                                                min={1}
                                                max={1000000}
                                                defaultValue={moment.weekdayPrice}
                                                onChange={onChangeDefaultPrice}
                                                disabled
                                            />
                                        </Col>
                                        <Col span={7}>
                                            <p className="tw-text-xl tw-mb-2">Giá cuối tuần</p>

                                            <InputNumber
                                                min={1}
                                                max={1000000}
                                                defaultValue={moment.weekendPrice}
                                                onChange={onChangeDefaultPrice}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            ))}
                        </Row>
                    )}

                    {!isFirstRowVisible && (
                        <Row>
                            {record.newPriceSeatTypeDTOs.map((moment, index) => (
                                <Col span={7} key={index}>
                                    <p className="tw-font-bold tw-text-xl tw-mb-2">{moment.seatType.name}</p>
                                    <div className="tw-ms-8">
                                        <Row>
                                            {' '}
                                            <p className="tw-text-xl tw-mb-2">Giá trong tuần</p>
                                        </Row>
                                        <Row>
                                            {' '}
                                            <InputNumber
                                                min={1}
                                                max={1000000}
                                                value={
                                                    moment.seatType.id === 1
                                                        ? priceSeatDayNormal
                                                        : moment.seatType.id === 2
                                                        ? priceSeatDayVip
                                                        : moment.seatType.id === 3
                                                        ? priceSeatDayCouple
                                                        : moment.seatType.id === 4
                                                        ? priceSeatDayRecliner
                                                        : moment.seatType.id === 5
                                                        ? priceSeatDayKid
                                                        : moment.seatType.id === 6
                                                        ? priceSeatDaySofa
                                                        : null
                                                }
                                                onChange={
                                                    moment.seatType.id === 1
                                                        ? onChangeDayPriceNormal
                                                        : moment.seatType.id === 2
                                                        ? onChangeDayPriceVip
                                                        : moment.seatType.id === 3
                                                        ? onChangeDayPriceCouple
                                                        : moment.seatType.id === 4
                                                        ? onChangeDayPriceRecliner
                                                        : moment.seatType.id === 5
                                                        ? onChangeDayPriceKid
                                                        : moment.seatType.id === 6
                                                        ? onChangeDayPriceSofa
                                                        : null
                                                }
                                            />
                                        </Row>
                                        <Row>
                                            <div className="tw-ms-14 tw-text-5xl">↓</div>
                                        </Row>
                                        <Row>
                                            <p className="tw-text-xl tw-mb-2 tw-mt-2">Giá cuối tuần</p>
                                        </Row>
                                        <Row>
                                            <InputNumber
                                                min={1}
                                                max={1000000}
                                                value={
                                                    moment.seatType.id === 1
                                                        ? priceSeatWeekNormal
                                                        : moment.seatType.id === 2
                                                        ? priceSeatWeekVip
                                                        : moment.seatType.id === 3
                                                        ? priceSeatWeekCouple
                                                        : moment.seatType.id === 4
                                                        ? priceSeatWeekRecliner
                                                        : moment.seatType.id === 5
                                                        ? priceSeatWeekKid
                                                        : moment.seatType.id === 6
                                                        ? priceSeatWeekSofa
                                                        : null
                                                }
                                                onChange={
                                                    moment.seatType.id === 1
                                                        ? onChangeWeekPriceNormal
                                                        : moment.seatType.id === 2
                                                        ? onChangeWeekPriceVip
                                                        : moment.seatType.id === 3
                                                        ? onChangeWeekPriceCouple
                                                        : moment.seatType.id === 4
                                                        ? onChangeWeekPriceRecliner
                                                        : moment.seatType.id === 5
                                                        ? onChangeWeekPriceKid
                                                        : moment.seatType.id === 6
                                                        ? onChangeWeekPriceSofa
                                                        : null
                                                }
                                            />
                                        </Row>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Col>

                <Col span={24}>
                    <Button
                        onClick={handelCreateAndUpdate}
                        className={`tw-mt-5 ${
                            isFirstRowVisible === true ? 'tw-cursor-not-allowed tw-opacity-50' : 'tw-type-primary'
                        }`}
                        type="primary"
                    >
                        {isEdit ? 'Cập nhât' : 'Thêm'}
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default ModalPrice;
