import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, Input } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { List, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import style from './CumRap.module.scss';
import ListPhim from '../ListPhim/ListPhim';
import funcUtils from '~/utils/funcUtils';
import { cinemaComplexUserApi, cinemaUserApi } from '~/api/user/showtime';

const cx = classNames.bind(style);

const CumRap = ({ NameAndProvince }) => {
    const [initLoading, setInitLoading] = useState(true);
    const [search, setSearch] = useState('');
    const so = 100;
    const [list, setList] = useState([]);

    const [cinemaComplex, setCinemaComplex] = useState(null);
    const [cinema, setCinema] = useState([0]);

    useEffect(() => {
        if (list.length > 0) {
            setCinemaComplex(list[0]);
        }
    }, [list]);

    useEffect(() => {
        const getCinemaComplexByNameAndProvince = async () => {
            try {
                const res = await cinemaComplexUserApi.getByResultsProvinceIdAndCinemaChainNameAndSearchName(
                    so,
                    NameAndProvince.province.id,
                    NameAndProvince.cinemaChainName,
                    search,
                );
                setInitLoading(false);
                setList(res.data);
            } catch (error) {
                funcUtils.notify(error.response.data, 'error');
            }
        };

        getCinemaComplexByNameAndProvince();
    }, [NameAndProvince, search]);

    useEffect(() => {
        try {
            if (cinemaComplex ?? cinemaComplex) {
                const getCinemaByCinemaComplex = async () => {
                    const resCinema = await cinemaUserApi.getCinemaByCinemaComplex(cinemaComplex);
                    setCinema(resCinema);
                    // console.log('cinema,', resCinema);
                };
                getCinemaByCinemaComplex();
            }
        } catch (error) {
            console.log(error);
        }
    }, [cinemaComplex]);

    const handleCinemaComplex = (data) => {
        setCinemaComplex(data);
    };
  


    return (
        <>
            <Col
                span={8}
                style={{
                    minHeight: 550,
                    maxHeight: 550,
                    borderTop: '1px solid #e5e5e5',
                    borderRight: '1px solid #e5e5e5',
                }}
            >
                <div className={cx('khung')}>
                    <Row>
                        <Col span={24} style={{ padding: 10 }}>
                            <Input
                                className={cx('cum-rap-inputSearch')}
                                suffix={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                                placeholder="Tìm theo tên rạp ..."
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Col>
                        <Col span={24}>
                            {' '}
                            <List
                                loading={initLoading}
                                itemLayout="horizontal"
                                // loadMore={loadMore}
                                dataSource={list}
                                renderItem={(item, index) => (
                                    <List.Item
                                        className={cx('list-item', {
                                            active: cinemaComplex === null ? index === 0 : cinemaComplex.id === item.id,
                                        })}
                                        defaultValue={[1]}
                                        onClick={() => handleCinemaComplex(item)}
                                    >
                                        <Skeleton
                                            avatar
                                            title={false}
                                            paragraph={{ rows: 1 }}
                                            loading={item.loading}
                                            active
                                        >
                                            <div className={cx('sau-list')}>
                                                <div className={cx('border-img')}>
                                                    <img
                                                        className={cx('img')}
                                                        src={
                                                            'http://localhost:8081/api/upload/' + item.cinemaChain.image
                                                        }
                                                        alt="lỗi"
                                                    />
                                                </div>
                                                <span className={cx('title')}>{item.name}</span>
                                            </div>
                                            <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} />
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
            </Col>
            <Col
                span={16}
                style={{
                    width: '100%',
                    minHeight: 550,
                    maxHeight: 550,
                    borderTop: '1px solid #e5e5e5',
                }}
            >
                <ListPhim cinemaComplex={cinemaComplex} cinema={cinema[0]} />
            </Col>
        </>
    );
};
export default CumRap;
