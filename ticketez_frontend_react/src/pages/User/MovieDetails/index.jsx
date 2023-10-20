import { Col, Row, Card } from 'antd';
import ViTri from './showtimesDetails/ViTri/ViTri';

function MovieDetails() {
    return (
        <>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col span={24} style={{ background: 'blue', height: 480 }}>
                    {' '}
                    chi tiet
                </Col>
                <Col
                    span={24}
                    style={{ display: 'flex', justifyContent: 'center', background: '#ffffff', minHeight: 2000 }}
                >
                    <Row style={{ width: 1088, height: 1000 }}>
                        <Col span={16}>
                            <Row>
                                <Col span={24} style={{}}>
                                    <ViTri />
                                </Col>
                                <Col span={24} style={{ backgroundColor: 'gray',display: 'flex',  marginTop: 50, minHeight: 600 }}>
                                    minhkhoi
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} style={{ background: 'blue' }}></Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
}

export default MovieDetails;
