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
                        src={imageUrl || 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/358561081_1293432168233582_652710667370024877_n.jpg?stp=dst-jpg_s320x320&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_mhoYnzSwMAAX-9-CO8&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfCnpSIHUEW7K5yPJeT3roUHGSihg3KS5Op_1FrvdVzFcg&oe=652EBC00'}
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
    dataSource={list}
    renderItem={(item) => (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar size={40} src={item.account.image} />}
                title={<h4>{item.account.name}</h4>}
                description={<span>{item.createdAt}</span>}
            />
            <h4><StarFilled style={{ color: 'yellow', fontSize: '20px' }} /> {item.comment.rating}/10 | Tuyệt vời</h4>
            <p>
                {item.comment.content}
            </p>
            <Space>
                <CommentOutlined className={cx('col-icon')} onClick={handleCommentClick} /><span>50 Bình luận</span>
                <LikeOutlined className={cx('col-icon')} /><span>250 Thấy hữu ích</span>
            </Space>
            {isCommentVisible && (
                // Hiển thị giao diện bình luận ở đây
                // Sử dụng dữ liệu từ API review để hiển thị bình luận
                // Ví dụ:
                <div className={cx('comment-container')}>
                    <Row>
                        <Col span={2}>
                            <Avatar size={40} src={imageUrl || 'https://i.imgur.com/nHg881t.jpg'} />
                        </Col>
                        <Col span={22}>
                            <div><h4>Nhã Nè</h4></div>
                            <div>1 ngày trước</div>
                        </Col>
                        <p>Đồng quan điểm . Phim hay, cảnh quay đẹp, giải trí ok, miễn coi cảm thấy vui là được.</p>
                        <Col span={24}>
                            <Space>
                                <CommentOutlined className={cx('col-icon')} /><span>Phản hồi</span>
                                <LikeOutlined className={cx('col-icon')} /><span>Thích</span>
                            </Space>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col span={2}>
                            <Avatar size={40} src={imageUrl || 'https://i.imgur.com/Lfimatm.jpg'} />
                        </Col>
                        <Col span={22}>
                            <div><h4>KakaShi</h4></div>
                            <div>1 ngày trước</div>
                        </Col>
                        <p>Điểm cộng là bối cảnh, nhạc phim mãn nhãn. Cảm giác bồi hồi thật sự khi ngắm nhìn khung cảnh sông nước làng quê xứ Tây Nam Bộ. Diễn xuất của dàn diễn viên nhí ổn áp, vai Út Lục Lâm cũng tạo ra nhiều tiếng cười sảng khoái.</p>
                        <Col span={24}>
                            <Space>
                                <CommentOutlined className={cx('col-icon')} /><span>Phản hồi</span>
                                <LikeOutlined className={cx('col-icon')} /><span>Thích</span>
                            </Space>
                        </Col>
                    </Row>
                </div>
            )}
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