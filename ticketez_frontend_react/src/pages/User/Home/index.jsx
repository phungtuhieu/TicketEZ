import React, { useState, useEffect } from 'react';
import './home.scss';
import { homeData } from '~/dummyData';
import Home from './carousel/Home';
import axiosClient from '~/api/global/axiosClient';

import { Col, Row } from 'antd';
import ShowTimes from './showtimes';
import MovieShowing from './MovieShowing';
import MovieUpcoming from './MovieUpcoming';
import MovieType from './MovieType';

const Homes = () => {
    const [items, setItems] = useState(null);
    const fetchDataMovie = async () => {
        try {
            const resp = await axiosClient.get(`movie/get/fivemovie`);
            const data = resp.data;
            console.log(data);
            setItems(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchDataMovie();
    }, []);

    return (
        <>
            <Row className="home">
                <Col span={24}>
                {items && (
                    <Col span={24}>
                        <Home items={items} />
                    </Col>
                )}
                </Col>
                <Col span={24}>
                    <MovieShowing />
                </Col>
                <Col span={24}>
                    <MovieUpcoming />
                </Col>
                {/* <Col span={24}>
                    <MovieType />
                </Col> */}
                <Col
                    span={24}
                    style={{
                        backgroundColor: '#ffffff',
                        height: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ShowTimes  />
                </Col>
            </Row>
        </>
    );
};

export default Homes;
