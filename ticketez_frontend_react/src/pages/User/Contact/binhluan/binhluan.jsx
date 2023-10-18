import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Row, Col, Rate, Space, Input } from 'antd';
import { StarFilled, UserOutlined } from '@ant-design/icons'
import { style } from '~/pages/Admin/Seat/SeatChart/SearChart.module.scss';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;


const Binhluan = () => {
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
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
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
                <Button onClick={onLoadMore}>loading more</Button>
            </div>
        ) : null;
    return (
        <div>
            <Row style={{ width: '1080px' }}>
                <Col span={24} style={{ color: 'black',height: '70px', textAlign: 'left' }}>
                    <h1>Bình luận của người xem</h1>
                </Col>
                <Col span={24} style={{ color: 'black', height: '120px', textAlign: 'left' }}>

                    <h2> <StarFilled style={{ color: 'yellow' }} /> 4.5/5 <span>3.0k lượt đánh giá</span></h2>
                </Col>
                <Col span={24}>
               
                    <Space.Compact
                        style={{
                            width: '100%',
                        }}

                    >
                        <Input.TextArea
                            placeholder="Bình luận tại đây"
                            autoSize={{ minRows: 1, maxRows: 3 }} // Cấu hình kích thước của textarea
                        />
                        <Button type="primary">Submit</Button>
                    </Space.Compact>
                </Col>
                <Col span={24} style={{ height: '200px' }}>
                    {/* <span style={{color: 'black'}}> Đánh giá</span> <br /> */}
                    <Rate allowHalf defaultValue={2.5} style={{ fontSize: '36px', width: '250px' }} />
                </Col>
                <Col span={24}> 
                <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                    // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                    <List.Item  >
                        {/* <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture.large} />}
                                title={<a href="https://ant.design">{item.name?.last}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <div>content</div>
                        </Skeleton> */}

                        <Row>
                            <Col span={24} style={{ textAlign: 'left', width: '1080px' }}>
                                <Row>
                                    <Col span={2}>
                                        <Avatar size={30}>
                                            <img src='https://file3.qdnd.vn/data/images/0/2022/11/23/vuhuyen/cris.jpeg?dpi=150&quality=100&w=870' alt="Mô tả hình ảnh" />
                                        </Avatar>
                                       
                                    </Col>
                                    <Col span={22}>
                                    <div>Nguyễn Văn A</div>
                                        <div>2 ngày trước</div>
                                    </Col>

                                </Row>               
                            </Col>
                            <Col span={24}>
                                        <h4><StarFilled style={{ color: 'yellow' }} /> Tuyệt vời</h4>
                                        <p>
                                            Hình ảnh, màu phim, cảnh phim rất đẹp và đầu tư.
                                            Sau khi xem xong k đọng lại một thông điệp gì ý nghĩa, đang xem tự nhiên hết phim, hụt hẫng. K có cảnh cao trào,
                                            diễn xuất của An và Út ổn nhưng theo ykr mình thấy bé An vẫn k nổi bật dù là nv9. Các nv khác xuất hiện chớp nhoáng,
                                            k có đất diễn và k để lại ấn tượng gì. Diễn biến tâm lý nv k đặc sắc nên xem thấy nhàm.Thu gọn

                                        </p>
                                    </Col>

                        </Row>

                    </List.Item>
                )}
            />

                </Col>
            </Row>
           
        </div>

    );
};
export default Binhluan;