import { Row, Col } from 'antd';
import React from 'react';
import { style } from '~/pages/Admin/Seat/SeatChart/SearChart.module.scss';
import ProductSlider from '../MovieDetails/Comment/Carousel/ShowActor';


function Contact() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Row style={{ width: 1088 }}>
                <Col span={24} style={{ height: '50px', backgroundColor: 'red' }}>
                    1
                </Col>
                <Col span={24} style={{ height: '50px', backgroundColor: 'blue' }}>
                    2
                </Col>
                <Col span={24}  style={{ width: '1080px', backgroundColor: 'white' }}>3
                {/* <Binhluan/> */}
                <ProductSlider/>
                </Col>
            </Row>
        </div>
    );
}

export default Contact;