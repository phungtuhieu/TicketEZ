import { Col, Row, Card } from 'antd';
import './showtime.scss';
import LoaiRap from './LoaiRap/LoaiRap';
import ViTri from './ViTri/ViTri';

function ShowTimes() {
    return (
        <div className='wrapper'>
            <Card bordered={false} style={{ width: 1088, marginTop: 30, paddingLeft: '1rem', paddingRight: '1rem' }}>
                <Row>
                    <Col span={24} style={{ height: 140, backgroundColor: '#ffffff' }}>
                        <Row>
                            <Col
                                span={24}
                                style={{
                                    height: 48,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <ViTri />
                            </Col>
                            <Col span={24} style={{ height: 92.8, backgroundColor: 'yellowgreen', display: 'flex' }}>
                                <LoaiRap />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} style={{ height: 550, backgroundColor: 'blue' }}>
                        <Row>
                            <Col span={8} style={{ height: 550, backgroundColor: 'yellow' }}>
                                3
                            </Col>
                            <Col span={16} style={{ height: 550, backgroundColor: 'brown' }}>
                                4
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}

export default ShowTimes;
