import { Row, Col } from 'antd';
import ListMovie from './ListMovie/index';

function MovieSearch1() {
    return (
        <Row className="">
            <Col span={24} className="tw-bg-red-200 flex tw-items-center tw-justify-center tw-w-[100%] tw-h-[420px]">1</Col>
            <Col span={24} className="tw-bg-red-400 flex tw-items-center tw-justify-center tw-w-[100%] tw-h-[555px]">2</Col>
            <Col span={24} className="tw-bg-red-600 flex tw-items-center tw-justify-center tw-w-[100%] tw-h-[555px]">3</Col>
            <Col span={24} className="tw-bg-[#FAFAFA] tw-flex tw-items-start tw-justify-center tw-w-[100%] tw-min-h-[500px] tw-py-[35px]">
                <ListMovie />
            </Col>
        </Row>
    );
}

export default MovieSearch1;
