import React, { useState } from 'react';
import './home.scss';
import { homeData } from '~/dummyData';
import Home from './carousel/Home';

import { Col, Row, Card } from 'antd';
import ShowTimes from './showtimes';

const Homes = () => {
    const [items, setItems] = useState(homeData);

    return (
        <>
            <Row className="home">
                <Col span={24}>
                    <Home items={items} />
                </Col>
                <Col
                    span={24}
                    style={{
                        backgroundColor: 'gray',
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
