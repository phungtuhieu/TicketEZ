import React, { useState } from 'react';
import './home.scss';
import { homeData } from '~/dummyData';
import Home from './carousel/Home';

import { Col, Row } from 'antd';
import ShowTimes from './showtimes';
import MovieShowing from './MovieShowing';
import MovieUpcoming from './MovieUpcoming';
import MovieType from './MovieType';

const Homes = () => {
    const [items, setItems] = useState(homeData);

    return (
        <>
            <Row className="home">
                <Col span={24}>
                    <Home items={items} />
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
                    <ShowTimes />
                </Col>
            </Row>
        </>
    );
};

export default Homes;
