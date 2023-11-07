import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton, Row, Col, Rate, Space, Input, Typography } from 'antd';
import { StarFilled, CommentOutlined, LikeOutlined } from '@ant-design/icons'
import classNames from 'classnames/bind';
import style from './binhluan.module.scss';
import reviewApi from './../../../../api/user/review/reviewApi';
import funcUtils from './../../../../utils/funcUtils';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;


const cx = classNames.bind(style);
const Binhluan = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [review, setReview] = useState([]);
    const [workSomeThing, setWorkSomeThing] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [isCommentVisible, setCommentVisible] = useState(false); // xử lý mở comment
    // useEffect(() => {
    //     fetch(fakeDataUrl)
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setInitLoading(false);
    //             setData(res.results);
    //             setList(res.results);
    //         });
    // }, []);

      useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await reviewApi.getAll();
                setReview(res.results);
                setInitLoading(false);
                setData(res.results);
                setList(res.results);
                setLoading(false);
                console.log(res);
            } catch (error) {
                if (error.hasOwnProperty('response')) {
                    funcUtils.notify(error.response.data, 'error');
                } else {
                    console.log(error);
                }
            }
        };
        getList();
    }, [workSomeThing]);
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
                <Button onClick={onLoadMore} className={cx('btn-load')}>
                    Xem thêm
                </Button>
            </div>
        ) : null;
   

    // Hàm xử lý sự kiện khi bấm vào biểu tượng bình luận
    const handleCommentClick = () => {
        setCommentVisible(!isCommentVisible);
    };
    return (
        <div>
            <Row style={{ width: '1080px' }}>
                <Col span={24} style={{ color: 'black', height: '70px', textAlign: 'left' }}>
                    <h1>Bình luận của người xem</h1>
                </Col>
                <Col span={24} style={{ color: 'black', height: '120px', textAlign: 'left' }}>
                    <h2> <StarFilled style={{ color: 'yellow' }} /> 8.5/10 <span>3.0k lượt đánh giá</span></h2>
                </Col>
                <Col span={16}>
                    <Avatar size={50}
                        src={imageUrl || 'https://i.imgur.com/CjpMFXE.jpg'}
                        style={{ margin: '10px' }}
                    >
                    </Avatar>
                    <Space.Compact
                        style={{
                            width: '80%',
                        }}
                    >
                        <Input.TextArea
                            placeholder="Bình luận tại đây"
                            autoSize={{ minRows: 1, maxRows: 3 }}
                        />
                        <Button type="primary" danger style={{
                            display: 'block',
                        }}>
                            Send
                        </Button>
                    </Space.Compact>
                </Col>
                <Col span={16}>
                    {/* <span style={{color: 'black'}}> Đánh giá</span> <br /> */}
                    <Typography>Đánh giá của bạn tại đây!</Typography>
                    <Rate allowHalf defaultValue={2.5} style={{ fontSize: '36px', width: '250px' }} />
                </Col>
                <Col span={16}>
                    <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
                        <List

                            className="demo-loadmore-list"
                            loading={initLoading}
                            itemLayout="horizontal"
                            // loadMore={loadMore}
                            dataSource={list}
                            renderItem={(item) => (
                                // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}

                                <List.Item>
                                    {/* <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                                avatar={<Avatar src={item.picture.large} />}
                                title={<a href="https://ant.design">{item.name?.last}</a>}
                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                            <div>content</div>
                        </Skeleton> */}
                                    <Skeleton loading={item.loading}>  
                                    <List.Item.Meta>
                                                  
                                    <Row>
                                        <Col span={24} style={{ textAlign: 'left', width: '1080px' }}>
                                            <Row>
                                                <Col span={2}>
                                                    <Avatar size={40}
                                                        src={item.account.image}
                                                    >
                                                    </Avatar>
                                                </Col>
                                                <Col span={22}>
                                                    <div className={cx('info-container')}>
                                                        <h4>Anh Phùng</h4>
                                                        <img
                                                            src="https://i.imgur.com/CjpMFXE.jpg"
                                                            width={'20px'}
                                                            className={('icon')}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                    <div>2 ngày trước</div>

                                                </Col>

                                            </Row>
                                        </Col>
                                        <Col span={24} style={{ textAlign: 'left' }}>
                                            <h4><StarFilled style={{ color: 'yellow', fontSize: '20px' }} /> 7/10 | Tuyệt vời</h4>
                                            <p>
                                                Hình ảnh, màu phim, cảnh phim rất đẹp và đầu tư.
                                                Sau khi xem xong k đọng lại một thông điệp gì ý nghĩa, đang xem tự nhiên hết phim, hụt hẫng. K có cảnh cao trào,
                                                diễn xuất của An và Út ổn nhưng theo ykr mình thấy bé An vẫn k nổi bật dù là nv9. Các nv khác xuất hiện chớp nhoáng,
                                                k có đất diễn và k để lại ấn tượng gì. Diễn biến tâm lý nv k đặc sắc nên xem thấy nhàm.Thu gọn

                                            </p>
                                        </Col>
                                        <Col span={24} style={{ textAlign: 'left' }}>
                                            <Space>
                                                <CommentOutlined className={cx('col-icon')} onClick={handleCommentClick} /><span>50 Bình luận</span>
                                                <LikeOutlined className={cx('col-icon')} /><span>250 Thấy hữu ích</span>
                                            </Space>
                                        </Col>
                                        {isCommentVisible && (
                                            <Col span={24} style={{ textAlign: 'left' }}>
                                                {/* Hiển thị giao diện bình luận ở đây */}
                                                {/* Ví dụ: */}
                                                <div className={cx('comment-container')}>
                                                    <Row>
                                                        <Col span={2}>
                                                            <Avatar size={40}
                                                                src={imageUrl || 'https://i.imgur.com/nHg881t.jpg'}
                                                            >
                                                            </Avatar>
                                                        </Col>
                                                        <Col span={22}>
                                                            <div><h4>Nhã Nè</h4></div>
                                                            <div>1 ngày trước</div>
                                                            {/* <div class="absolute" style={{ textAlign: 'right' }}>
                                            <img src="https://homepage.momocdn.net/img/momo-upload-api-230629163313-638236531936463134.png" width={'30px'} class="w-5" loading="lazy"></img>
                                            </div> */}
                                                        </Col>


                                                        <p>
                                                            Đồng quan điểm . Phim hay, cảnh quay đẹp, giải trí ok, miễn coi cảm thấy vui là được. </p>
                                                        <Col span={24} style={{ textAlign: 'left' }}>
                                                            <Space>
                                                                <CommentOutlined className={cx('col-icon')} /><span>Phản hồi</span>
                                                                <LikeOutlined className={cx('col-icon')} /><span>Thích</span>
                                                            </Space>
                                                        </Col>
                                                    </Row>
                                                    <hr />
                                                    <Row>
                                                        <Col span={2}>
                                                            <Avatar size={40}
                                                                src={imageUrl || 'https://i.imgur.com/Lfimatm.jpg'}
                                                            >
                                                            </Avatar>
                                                        </Col>
                                                        <Col span={22}>
                                                            <div><h4>KakaShi</h4></div>
                                                            <div>1 ngày trước</div>
                                                            {/* <div class="absolute" style={{ textAlign: 'right' }}>
                                            <img src="https://homepage.momocdn.net/img/momo-upload-api-230629163313-638236531936463134.png" width={'30px'} class="w-5" loading="lazy"></img>
                                            </div> */}
                                                        </Col>
                                                        <p>
                                                            Điểm cộng là bối cảnh, nhạc phim mãn nhãn. Cảm giác bồi hồi thật sự khi ngắm nhìn khung cảnh sông nước làng quê xứ Tây Nam Bộ. Diễn xuất của dàn diễn viên nhí ổn áp, vai Út Lục Lâm cũng tạo ra nhiều tiếng cười sảng khoái. </p>
                                                        <Col span={24} style={{ textAlign: 'left' }}>
                                                            <Space>
                                                                <CommentOutlined className={cx('col-icon')} /><span>Phản hồi</span>
                                                                <LikeOutlined className={cx('col-icon')} /><span>Thích</span>
                                                            </Space>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Col>
                                        )}
                                    </Row>
                                    </List.Item.Meta> 
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </div>

                </Col>
            </Row>


        </div>

    );
};
export default Binhluan;