import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Collapse, Modal } from 'antd';
import { List, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import style from './ListPhim.module.scss';
import { cinemaComplexUserApi } from '~/api/user/showtime';
import moment from 'moment-timezone';
import NotFountShowtime from '~/pages/User/Home/showtimes/NotFountShowtime/NotFountShowtime';
import uploadApi from '~/api/service/uploadApi';

import { useParams } from 'react-router-dom';
import Mapbox from '~/components/Mapbox';

const cx = classNames.bind(style);

function ListPhim({ propsValue }) {
    const [list, setList] = useState([]);
    const [showtime, setShowtime] = useState(null);

    const [activeKey, setActiveKey] = useState(null);
    const handleCollapseChange = (key) => {
        setActiveKey(key);
    };

    // const location = useLocation();
    // const path = location.pathname;
    // const parts = path.split('/');
    // const movieId = parts[parts.indexOf('movie-details') + 1];

    const {movieId} = useParams();
    console.log(movieId);

    useEffect(() => {
        const get = async () => {
            const res = await cinemaComplexUserApi.getCcxFormatShowtimeByMovie(
                movieId,
                propsValue.provinces.id,
                propsValue.cinemaChainName,
                propsValue.chooseDay,
            );
            setList(res);
        };
        get();
    }, [movieId, propsValue]);

    const handShowtime = (value) => {
        setShowtime(value);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    const newList = list?.cinemaComplexObjResps?.map((item, index) => {
        return {
            ...item,
            key: index,
            label: (
                <Row className={cx('wrapper-a')}>
                    <Col span={2} style={{}}>
                        <div className={cx('border-img')}>
                            <img
                                className={cx('img')}
                                src={uploadApi.get(item.cinemaComplex.cinemaChain.image)}
                                alt=""
                            />
                        </div>
                    </Col>
                    <Col span={22} style={{ width: '100%' }}>
                        <Row style={{ width: '100%' }}>
                            <Col ol span={24} className={cx('ten-rap')} onClick={() => console.log('item', item)}>
                                {item.cinemaComplex.name}
                            </Col>
                            <Col span={24} className={cx('container-info')}>
                                <div className={cx('chi-tiet-dia-chi')}>{item.cinemaComplex.address}</div>
                                <div className={cx('ban-do')} onClick={showModal}>
                                    [Bản đồ]
                                </div>
                                <Modal
                                    title="Bản đồ"
                                    open={isModalOpen}
                                    onCancel={handleCancelModal}
                                    className="modal-map-lg"
                                    footer={
                                        <Button className={cx('modal-footer-btn-close')} onClick={handleCancelModal}>
                                            ĐÓNG
                                        </Button>
                                    }
                                >
                                    <div className="map-lg-content">
                                        <Mapbox
                                            latitude={10.76317169124285}
                                            longitude={106.65670151096185}
                                            address={'Tầng 4 Lotte Mart Phú Thọ, Số 96819203120948120984012'}
                                        />
                                    </div>
                                </Modal>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ),
            children: (
                <Row className={cx('col2-movie')}>
                    {item.listFormatAndShowtimes.map((valueFormat, index) => {
                        if (valueFormat.name ?? valueFormat.showtimes.length > 0) {
                            return (
                                <Col key={index} span={24} className={cx('container-suat-chieu')}>
                                    <div className={cx('title')}>{valueFormat.format.name}</div>
                                    <div className={cx('suat-chieu')}>
                                        {valueFormat.showtimes.map((valueShowtime, index) => (
                                            <Button
                                                key={index}
                                                className={cx('btn-suat-chieu')}
                                                danger
                                                onClick={() => handShowtime(valueShowtime)}
                                            >
                                                <span className={cx('gio-bat-dau')}>
                                                    {moment(valueShowtime.startTime).format('HH:mm')}
                                                </span>
                                                <span className={cx('gio-ket-thuc')}>
                                                    {moment(valueShowtime.endTime).format('HH:mm')}
                                                </span>
                                            </Button>
                                        ))}
                                    </div>
                                </Col>
                            );
                        }
                        return null;
                    })}

                    {/* <Col span={24} className={cx('container-suat-chieu')}>
                        <div className={cx('title')}>2D Phụ đề</div>
                        <div className={cx('suat-chieu')}>
                            <Button className={cx('btn-suat-chieu')} danger>
                                <span className={cx('gio-bat-dau')}>20:45</span>
                                <span className={cx('gio-ket-thuc')}>21:45</span>
                            </Button>
                        </div>
                    </Col> */}
                </Row>
            ),
        };
    });
    // console.log(newList);
    return (
        <>
            {list.length !== 0 && (
                <List
                    dataSource={newList}
                    renderItem={(item) => {
                        return (
                            <List.Item className={cx('list-item')}>
                                <Skeleton avatar title={false} paragraph={{ rows: 1 }} loading={item.loading} active>
                                    <Collapse
                                        activeKey={activeKey}
                                        accordion
                                        onChange={handleCollapseChange}
                                        key={item.key}
                                        bordered={false}
                                        items={[item]}
                                    />
                                </Skeleton>
                            </List.Item>
                        );
                    }}
                />
            )}
            {newList === undefined && <NotFountShowtime />}
        </>
    );
}

export default ListPhim;
