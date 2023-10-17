import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Input } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { List, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import style from './CumRap.module.scss';
import ListPhim from '../ListPhim/ListPhim';

const cx = classNames.bind(style);

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const CumRap = ({ diaVaLoai }) => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    // console.log("diavaloairoine~:", diaVaLoai);
    useEffect(() => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
            });
    }, []);

    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(count)].map(() => ({
                    loading: true,
                    name: {},
                    picture: {},
                })),
            ),
        );
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((res) => {
                const newData = data.concat(res.results);
                setData(newData);
                setList(newData);
                setLoading(false);
                window.dispatchEvent(new Event('resize'));
            });
        console.log(count);
        console.log(list);
    };
    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore} className={cx('btn-load')}>
                    Xem thêm
                </Button>
            </div>
        ) : null;
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
                            />
                        </Col>
                        <Col span={24}>
                            {' '}
                            <List
                                loading={initLoading}
                                itemLayout="horizontal"
                                loadMore={loadMore}
                                dataSource={list}
                                renderItem={(item) => (
                                    <List.Item className={cx('list-item')}>
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
                                                        src="https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png"
                                                        alt="lỗi"
                                                    />
                                                </div>
                                                <span className={cx('title')}>Galaxy Kinh Dương Vương</span>
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
            <Col span={16} style={{ minHeight: 550, maxHeight: 550, borderTop: '1px solid #e5e5e5' }}>
                <ListPhim />
            </Col>
        </>
    );
};
export default CumRap;
