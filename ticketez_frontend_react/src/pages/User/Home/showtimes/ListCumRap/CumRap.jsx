import React, { useState, useEffect, useRef } from 'react';
import { Button, Row, Col, Input } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { List, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import style from './CumRap.module.scss';
import ListPhim from '../ListPhim/ListPhim';
import cinemaComplexUserApi from '~/api/user/cinemaComplex/cinemaComplexAPI';

const cx = classNames.bind(style);

const CumRap = ({ NameAndProvince }) => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [totalItems, setTotalItems] = useState(1);
    const [search, setSearch] = useState('');
    const so = 100;
    const [count, setCount] = useState(so);
    const [list, setList] = useState([]);

    const [cinemaComplex, setCinemaComplex] = useState(null);

    // let newCount = count;
    // let duLieuTraVe = so;
    // const newCountRef = useRef(count);
    // const newDuLieuTraVe = useRef(so);

    useEffect(() => {
        if (list.length > 0 && cinemaComplex === null) {
            setCinemaComplex(list[0].id);
        }
    }, [list]);

    useEffect(() => {
        const geist = async () => {
            const res = await cinemaComplexUserApi.getByResultsProvinceIdAndCinemaChainNameAndSearchName(
                so,
                NameAndProvince.province.id,
                NameAndProvince.cinemaChainName,
                search,
            );

            setInitLoading(false);
            setData(res.data);
            setList(res.data);
            setTotalItems(res.totalItems);
        };

        geist();
    }, [NameAndProvince, search]);

    // if (list.length > totalItems) {
    //     newCountRef.current = totalItems;
    //     newDuLieuTraVe.current = totalItems % so;
    //     console.log("ádas", totalItems % so);
    //     // if (newDuLieuTraVe.current === 0) {
    //     //     newDuLieuTraVe.current = so;
    //     // }
    // }

    // console.log(totalItems);
    // console.log(list.length);

    // console.log("list",list);
    // console.log("data",data);
    // console.log('duLieuTraVe', newDuLieuTraVe);
    // console.log('newCount', newCountRef);
    // useEffect(() => {
    //     //  newCount = count;
    //     //  duLieuTraVe = so;
    //     newDuLieuTraVe.current = so;
    //     newCountRef.current = count;
    //     alert();
    // }, [NameAndProvince.cinemaChainName]);

    // useEffect(() => {
    //     if (loading) {
    //         setTimeout(() => {
    //             const abc = async () => {
    //                 const res = await cinemaComplexUserApi.getByResultsProvinceIdAndCinemaChainNameAndSearchName(
    //                     newCountRef.current,
    //                     NameAndProvince.province.id,
    //                     NameAndProvince.cinemaChainName,
    //                     '',
    //                 );
    //                 const newData = data.concat(res.data.slice(-newDuLieuTraVe.current));
    //                 setData(newData);
    //                 setList(newData);
    //                 setLoading(false);
    //                 window.dispatchEvent(new Event('resize'));
    //             };
    //             abc();
    //         }, 500);
    //     }
    // }, [loading, search, NameAndProvince]);

    // const onLoadMore = () => {
    //     setLoading(true);
    //     setCount(count + so);
    //     newCountRef.current = count + so;

    //     setList(
    //         data.concat(
    //             [...new Array(count)].map(() => ({
    //                 loading: true,
    //                 cinemaChain: {
    //                     image: '',
    //                 },
    //             })),
    //         ),
    //     );
    // };
    // const loadMore = list.length < totalItems && (
    //     <div
    //         style={{
    //             textAlign: 'center',
    //             marginTop: 12,
    //             height: 32,
    //             lineHeight: '32px',
    //         }}
    //     >
    //         <Button onClick={onLoadMore} className={cx('btn-load')}>
    //             Xem thêm
    //         </Button>
    //     </div>
    // );

    const handleCinemaComplex = (data) => {
        setCinemaComplex(data.id);
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
                                            active: cinemaComplex === null ? index === 0 : cinemaComplex === item.id,
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
                <ListPhim cinemaComplex={cinemaComplex} />
            </Col>
        </>
    );
};
export default CumRap;
