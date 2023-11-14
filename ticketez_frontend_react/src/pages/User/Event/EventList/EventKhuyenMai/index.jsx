/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { Button, Col, List, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img from '~/assets/img';

const EventListKhuyenMai = () => {
    const count = 1;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
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
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button
                    onClick={onLoadMore}
                    className="tw-rounded-full tw-border tw-w-[140px] tw-h-[33px] tw-border-pink-600 tw-py-1 tw-pl-4 tw-pr-6 tw-mb-[30px] tw-font-semibold tw-text-pink-500 tw-transition-all hover:tw-bg-pink-50 hover:tw-text-pink-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="tw-mr-2 tw-inline-block tw-h-5 tw-w-[10px] tw-animate-bounce tw-fill-pink-500 hover:tw-fill-pink-800"
                        height="1em"
                        viewBox="0 0 384 512"
                    >
                        <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                    </svg>
                    Xem Thêm
                </Button>
            </div>
        ) : null;
    return (
        <>
            <div className=" tw-text-pink-500 tw-text-left tw-text-5xl tw-mt-[13px] tw-mb-[10px] tw-font-[var(--font-family)]">
                Khuyến mãi
            </div>
            <Link to={'/su-kien/khuyen-mai/1'}>
                <img src={img.event} width="100%" height={344} className="tw-rounded-md " />
            </Link>
            <div className=" tw-text-gray-500 tw-text-left tw-text-xl tw-mt-[-40px]  tw-mb-[25px] tw-font-[var(--font-family)]">
                08/11/2023 · 9.1K lượt xem
            </div>
            <h1 className="tw-font-[var(--font-family)]  tw-text-left tw-text-4xl tw-mt-[-20px] ">
                Ngày vàng nạp dế nhân đôi điểm tích lũy, nhận quà tẹt ga
            </h1>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                    <>
                        <Row gutter={24} className="tw-mb-[25px]">
                            <Col lg={12} xs={24}>
                                <Link to={'/event/1'}>
                                    <img
                                        src={img.event}
                                        width={380}
                                        height={184}
                                        className=" tw-mt-2 tw-mr-[20px] tw-rounded-lg tw-opacity-100  hover:tw-opacity-50 "
                                    />
                                    <div className="tw-font-[var(--font-family)] tw-text-gray-400  tw-text-left tw-text-xl tw-mb-[25px]">
                                        08/11/2023 · 9.1K lượt xem
                                    </div>
                                    <div className="tw-font-[var(--font-family)]  tw-text-left tw-text-2xl tw-mt-[-20px] hover:tw-underline ">
                                        <span className="tw-text-gray-800">
                                            MoMo khao quà chất - Lưu ngay Mini App Highlands Coffee thành dịch vụ yêu
                                            thích!
                                        </span>
                                    </div>
                                </Link>
                            </Col>
                            <Col lg={12} xs={24}>
                                <img
                                    src={img.event}
                                    width={380}
                                    height={184}
                                    className=" tw-mt-2 tw-mr-[20px] tw-rounded-lg tw-opacity-100  hover:tw-opacity-50 "
                                />
                                <div className="tw-font-[var(--font-family)] tw-text-gray-400  tw-text-left tw-text-xl tw-mb-[25px]">
                                    08/11/2023 · 9.1K lượt xem
                                </div>
                                <div className="tw-font-[var(--font-family)]  tw-text-left tw-text-2xl tw-mt-[-20px] hover:tw-underline">
                                    MoMo khao quà chất - Lưu ngay Mini App Highlands Coffee thành dịch vụ yêu thích!
                                </div>
                            </Col>
                        </Row>
                    </>
                )}
            />
        </>
    );
};

export default EventListKhuyenMai;
