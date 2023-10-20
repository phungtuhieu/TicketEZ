import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Collapse } from 'antd';
import { List, Skeleton } from 'antd';
import classNames from 'classnames/bind';
import style from './ListPhim.module.scss';

const cx = classNames.bind(style);

function ListPhim() {
    const [ngay, setNgay] = useState(1);

    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    const [activeKey, setActiveKey] = useState(null);
    const handleCollapseChange = (key) => {
        setActiveKey(key);
    };

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
            children: (
                <Row className={cx('col2-movie')}>
                    
                    <Col span={24} className={cx('container-suat-chieu')}>
                        <div className={cx('title')}>2D Phụ đề</div>
                        <div className={cx('suat-chieu')}>
                            <Button className={cx('btn-suat-chieu')} danger>
                                <span className={cx('gio-bat-dau')}>20:45</span>
                                <span className={cx('gio-ket-thuc')}>21:45</span>
                            </Button>
                            <Button className={cx('btn-suat-chieu')} danger>
                                <span className={cx('gio-bat-dau')}>20:45</span>
                                <span className={cx('gio-ket-thuc')}>21:45</span>
                            </Button>
                            <Button className={cx('btn-suat-chieu')} danger>
                                <span className={cx('gio-bat-dau')}>20:45</span>
                                <span className={cx('gio-ket-thuc')}>21:45</span>
                            </Button>
                            <Button className={cx('btn-suat-chieu')} danger>
                                <span className={cx('gio-bat-dau')}>20:45</span>
                                <span className={cx('gio-ket-thuc')}>21:45</span>
                            </Button>
                            <Button className={cx('btn-suat-chieu')} danger>
                                <span className={cx('gio-bat-dau')}>20:45</span>
                                <span className={cx('gio-ket-thuc')}>21:45</span>
                            </Button>
                        </div>
                    </Col>

                    <Col span={24} className={cx('container-suat-chieu')}>
                        <div className={cx('title')}>2D Phụ đề</div>
                        <div className={cx('suat-chieu')}>
                            <Button className={cx('btn-suat-chieu')} danger>
                                <span className={cx('gio-bat-dau')}>20:45</span>
                                <span className={cx('gio-ket-thuc')}>21:45</span>
                            </Button>
                        </div>
                    </Col>
                </Row>
            ),
            label: (
              
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
                        <Col span={22} style={{ width:'100%'}}>
                            <Row style={{ width:'100%'}}>
                                <Col  ol span={24} className={cx('ten-rap')} onClick={() => console.log('item', item)}>
                                    {item.email}
                                </Col>
                                <Col span={24} className={cx('container-info')}>
                                    <div className={cx('chi-tiet-dia-chi')}>
                                        Tầng 4 Lotte Mart Phú Thọ, Số 968 đường Ba Tháng Hai, P.15, Quận 11 Tháng Hai, P.15, Quận 11 Tháng Hai, P.15, Quận 11
                                    </div>
                                    <div className={cx('ban-do')}>[Bản đồ]</div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
              
            ),
        };
    });

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
                )}
            />
        </>
    );
}

export default ListPhim;
