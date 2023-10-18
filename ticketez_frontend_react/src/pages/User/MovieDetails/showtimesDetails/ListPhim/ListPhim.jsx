import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Collapse } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Avatar, List, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import style from './ListPhim.module.scss';

const cx = classNames.bind(style);
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function ListPhim() {
    const [ngay, setNgay] = useState(1);

    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
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
                    marginTop: 17,
                    marginBottom: 20,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore} className={cx('btn-load')}>
                    Xem thêm
                </Button>
            </div>
        ) : null;

  
    const newList = list.map((item, index) => {
        return {
            ...item,
            key: index,
            children: <p>{text}</p>,
            label: (
                <>
                    <Row className={cx('wrapper-a')}>
                        <Col span={2} style={{}}>
                            <div className={cx('border-img')}>
                                <img
                                    className={cx('img')}
                                    src="https://homepage.momocdn.net/blogscontents/momo-upload-api-210604170617-637584231772974269.png"
                                    alt=""
                                />
                            </div>
                        </Col>
                        <Col span={22}>
                            <Row>
                                <Col span={24} className={cx('ten-rap')} onClick={() => console.log('item', item)}>
                                    {/* Lịch chiếu phim Lotte Phú Thọ */}
                                    {item.email}
                                </Col>
                                <Col span={24} className={cx('container-info')}>
                                    <div className={cx('chi-tiet-dia-chi')}>
                                        Tầng 4 Lotte Mart Phú Thọ, Số 968 đường Ba Tháng Hai, P.15, Quận 11
                                    </div>
                                    <div className={cx('ban-do')}>[Bản đồ]</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            ),
        };
    });

    console.log('newwlisst', newList);
    return (
        <>
            <List
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={newList}
                renderItem={(item) => (
                    <List.Item className={cx('list-item')}>
                        <Skeleton avatar title={false} paragraph={{ rows: 1 }} loading={item.loading} active>
                            <Collapse key={item.key} bordered={false} classNames={cx('coll')} accordion items={[item]}>
                                {/* <FontAwesomeIcon className={cx('icon')} icon={faAngleRight} /> */}
                            </Collapse>
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    );
}

export default ListPhim;
