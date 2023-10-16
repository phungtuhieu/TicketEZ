import { Col, Row, Card } from 'antd';
import './showtime.scss';
import LoaiRap from './LoaiRap/LoaiRap';
import ViTri from './ViTri/ViTri';
import CumRap from './ListCumRap/CumRap';

function ShowTimes() {
    return (
        <div className="wrapper">
            <Card bordered={false} style={{ width: 1088, marginTop: 30 }}>
                <Row >
                    <Col span={24}className='bo' style={{ height: 140, backgroundColor: '#ffffff' }}>
                        <Row className='bo'>
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
                            <Col span={24} style={{ height: 92.8, display: 'flex', alignItems: 'center' }}>
                                <LoaiRap />
                            </Col>
                        </Row>
                    </Col>
                    <Col  span={24} style={{ maxHeight: 550, borderTop: '1px solid #e5e5e5'  }}>
                        <Row className='bo'>
                            <Col span={8} style={{    }}>
                                <CumRap/>
                            </Col>
                            <Col span={16} style={{  backgroundColor: 'brown' }}>
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
