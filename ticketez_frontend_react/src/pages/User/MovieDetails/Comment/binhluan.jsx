import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Row, Col, Rate, Space, Input, Typography, Dropdown, Menu, Modal } from 'antd';
import { StarFilled, CommentOutlined, LikeOutlined, DashOutlined } from '@ant-design/icons'
import classNames from 'classnames/bind';
import style from './binhluan.module.scss';
import reviewApi from '~/api/user/review/reviewApi';
import funcUtils from './../../../../utils/funcUtils';
import { accountApi, movieApi } from '~/api/admin';
import { useParams } from 'react-router-dom';
import uploadApi from '~/api/service/uploadApi';

import moment from 'moment-timezone';

import authApi from './../../../../api/user/Security/authApi';

const cx = classNames.bind(style);
const Binhluan = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const [review, setReview] = useState([]);
    const [account, setAccount] = useState([]);
    const [workSomeThing, setWorkSomeThing] = useState();
    const [imageUrl, setImageUrl] = useState(null);
    const [isCommentVisible, setCommentVisible] = useState(false); // xử lý mở comment
    const [isClicked, setIsClicked] = useState(false);
    const { movieId, reviewId } = useParams();
    const [comment, setComment] = useState('');
    const [moviedata, setMoviedata] = useState();
    const [rating, setRating] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editedComment, setEditedComment] = useState('');
    const [indexId, setIndexId] = useState();
    const [editData, setEditData] = useState();
    const [deleteItem, setDeleteItem] = useState(null);
    const [commentError, setCommentError] = useState(false);
    const [ratingError, setRatingError] = useState(false);
    const [isPaid, setIsPaid] = useState(false);
    const user = authApi.getUser();

    useEffect(() => {
        const getList = async () => {
            setLoading(true);
            try {
                const res = await reviewApi.getMovieId(movieId);

                setReview(res.data);
                setInitLoading(false);
                // setData(res.data);
                // setList(res.data);
                setLoading(false);
                // console.log(res.data);
            } catch (error) {
                if (error.hasOwnProperty('response')) {
                    funcUtils.notify(error.response.data, 'error');
                } else {
                    console.log(error);
                }
            }
        };
        getList();
    }, [workSomeThing, movieId]);

    useEffect(() => {
        const getMovie = async () => {
            const movie = await movieApi.getById(movieId);
            setMoviedata(movie.data.movie);
            console.log(movie.data.movie);
        }
        getMovie();
    }, [movieId])

    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const user = authApi.getUser();
                const isPaid = await reviewApi.getcheckAccountBooking(user.id, movieId);
                setIsPaid(isPaid);
                console.log('isPaid', isPaid);
            } catch (error) {
                console.error('Lỗi khi kiểm tra thanh toán:', error);
            
            }
        };

        checkPaymentStatus();
    }, [user.id, movieId]);

    const handleAdd = async () => {

        if (!comment.trim()) {
            setCommentError(true);
            return;
        } else {
            setCommentError(false);
        }
        if (rating === 0) {
            setRatingError(true);
            return;
        } else {
            setRatingError(false);
        }
        setLoading(true);
        try {
            const user = authApi.getUser();
            const isPaid = await reviewApi.getcheckAccountBooking(user.id, movieId);
            setIsPaid(isPaid);
            
            const datareview = {
                comment,
                rating,
                createDate: new Date(),
                editData: null
            }
            reviewApi.post(datareview, user.id, movieId);
            setComment("");
            console.log(datareview);
            funcUtils.notify('Bình luận thành công.', 'success');
            setWorkSomeThing(!workSomeThing);
        } catch (error) {
            console.error('Failed:', error);
            if (error.response && error.response.data) {
                funcUtils.notify(error.response.data.message, 'error');
            } else {
                funcUtils.notify('Đã xảy ra lỗi', 'error');
            }

            setLoading(false);
        }
    };
    useEffect(() => {
        setRating(rating);
    }, [rating])

    // Hàm xử lý sự kiện khi bấm vào biểu tượng bình luận
    const handleCommentClick = () => {
        setCommentVisible(!isCommentVisible);
    };
    const handleEdit = (item, index) => {
        setIsEditing(true);
        setEditedComment(item.comment);
        setIndexId(index);
        setEditData(item);

    };
    useEffect(() => {
        console.log({ ...editData, comment: editedComment, editDate: new Date() });

    }, [editedComment])

    const handleSaveEdit = async (item) => {
        try {
            
            const dulieu = { ...editData, comment: editedComment, rating: rating, editDate: new Date() }
            await reviewApi.put(dulieu);
            funcUtils.notify('Chỉnh sửa bình luận thành công', 'success');
            setWorkSomeThing(!workSomeThing);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed:', error);
            funcUtils.notify('Đã xảy ra lỗi khi lưu chỉnh sửa bình luận', 'error');
        }
    };

    const handleDelete = (item) => {
        setDeleteItem(item);
        // Hiển thị modal xác nhận xóa
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: `Bạn có chắc chắn muốn xóa bình luận của ${item.account.fullname}?`,
            onOk: () => confirmDelete(item),
            onCancel: () => setDeleteItem(null),
            okButtonProps: { style: { background: '#053b50', color: 'white' } },
        });
    };

    const confirmDelete = async (item) => {
        try {
            const res = await reviewApi.delete(item.id);
            console.log(res);
            if (res.status === 200) {
                funcUtils.notify(res.data, 'success');
            }
        } catch (error) {
            console.log(error);
            if (error.res.status === 409) {
                funcUtils.notify('đã xóa', 'error');
            }
        }
        setDeleteItem(null);
        setWorkSomeThing(!workSomeThing);
    };


    const handleRatingChange = (value) => {
        const roundedValue = (value * 2);
        setRating(roundedValue);

    };
    console.log(rating);

    const handleCancel = () => {
        setIsEditing(false);
        setEditedComment('');
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
                    <Typography>Xin chào bạn: {user.fullname} bình luận của bạn tại đây! </Typography>
                    {/* <Avatar
                        size={50}
                        src={uploadApi.get(user.image)}
                        style={{ margin: '10px' }}
                    >
                    </Avatar> */}
                    {isPaid ? ( // Nếu đã thanh toán, hiển thị nút bình luận và input
                      <Space.Compact
                      className="tw-flex tw-flex-col tw-items-start tw-justify-start"
                      style={{
                          width: '90%',
                      }}
                  >
                      <Input.TextArea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Bình luận tại đây"
                          autoSize={{ minRows: 3, maxRows: 3 }}
                          className='tw-w-full'
                      />
                     
                      <Button
                          onClick={handleAdd}
                          className='tw-bg-[var(--primary-background-color)] tw-text-white tw-mt-2' // Thêm margin-top để tạo khoảng cách giữa Input.TextArea và Button
                
                      >
                          Send
                      </Button>
                     
                      {commentError && <span style={{ color: 'red' }}>Vui lòng nhập bình luận</span>}
                  </Space.Compact>
                  
                   
                    ) : (
                        // Nếu chưa thanh toán, hiển thị thông báo và ẩn input và nút bình luận
                        <div>
                            <p>Vui lòng thanh toán để có thể bình luận.</p>
                        </div>
                    )}
                </Col>
                {isPaid && ( // chỉ hiển thị rating khi isPaid là true
                    <Col span={16}>
                        <Typography>Đánh giá của bạn tại đây!</Typography>
                        <Rate
                            name="rating"
                            allowHalf
                            defaultValue={rating}
                            style={{ fontSize: '36px', width: '250px' }}
                            onChange={handleRatingChange}
                            tooltips={1}
                            className='tw-bg-gray-300'
                        />
                        {ratingError && <span style={{ color: 'red' }}>Vui lòng chọn đánh giá</span>}
                    </Col>
                )}
                <Col span={16}>
                    {/* <div className="tw-overflow-hidden tw-scrollbar-hidden tw-max-h-[1000px]"> */}
                    <div style={{ overflowY: 'scroll', maxHeight: '500px', WebkitOverflowScrolling: 'touch' }}>
                        <List

                            className="demo-loadmore-list"
                            loading={initLoading}
                            itemLayout="horizontal"
                            // loadMore={loadMore}
                            dataSource={review}
                            renderItem={(item, index) => (

                                <List.Item>

                                    <Row>
                                        <Col span={24} style={{ textAlign: 'left', width: '1080px' }}>
                                            <Row>
                                                <Col span={2}>
                                                    <Avatar size={40}

                                                        src={uploadApi.get(item.account.image)}
                                                    >
                                                    </Avatar>
                                                </Col>
                                                <Col span={22}>
                                                    <div className={cx('info-container')}>
                                                        <h4>{item.account.fullname}</h4>
                                                        <img
                                                            src="https://homepage.momocdn.net/img/momo-upload-api-230629163313-638236531936463134.png"
                                                            width={'20px'}
                                                            className={('icon')}
                                                            alt=''

                                                        />
                                                    </div>
                                                    <div>

                                                        {moment(item.createDate).format("MM-DD-YYYY")}</div>

                                                </Col>

                                            </Row>
                                        </Col>
                                        <Col span={24} style={{ textAlign: 'left' }}>
                                            <h4><StarFilled style={{ color: 'yellow', fontSize: '20px' }} /> {item.rating}/10 | Tuyệt vời</h4>
                                            {isEditing && index === indexId ? (
                                                <div>
                                                    <Rate
                                                        // value={rating}
                                                        name="rating"
                                                        allowHalf
                                                        defaultValue={rating}

                                                        style={{ fontSize: '16px', width: '120px' }}
                                                        onChange={handleRatingChange}
                                                        tooltips={1}
                                                    />
                                                    <Input.TextArea
                                                        name='comment'
                                                        value={editedComment}
                                                        onChange={(e) => setEditedComment(e.target.value)}
                                                        className='tw-h-[100px]'
                                                    />
                                                    <Button onClick={() => handleSaveEdit(item)} className='tw-btn tw-bg-[var(--primary-background-color)] tw-text-white'>Lưu</Button>
                                                    <Button onClick={() => handleCancel()} type="default">Hủy bỏ</Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p
                                                        name='comment'
                                                        readOnly
                                                    >{item.comment} </p>

                                                    <Space>
                                                        <CommentOutlined className={cx('col-icon')} onClick={handleCommentClick} /><span>50 Bình luận</span>
                                                        <LikeOutlined className={cx('col-icon')} /><span>250 Thấy hữu ích</span>

                                                        {item.account.id === user.id && (
                                                            <Dropdown
                                                                overlay={(
                                                                    <Menu>
                                                                        <Menu.Item key="edit" onClick={() => handleEdit(item, index)}>Sửa</Menu.Item>
                                                                        <Menu.Item key="delete" onClick={() => handleDelete(item)}>Xóa</Menu.Item>
                                                                    </Menu>
                                                                )}
                                                                trigger={['click']}
                                                            >
                                                                <Button
                                                                    type="text"
                                                                    icon={<DashOutlined
                                                                        className={cx('col-icon', {
                                                                            'text-blue-500': isClicked,
                                                                        })}
                                                                    />}
                                                                />
                                                            </Dropdown>
                                                        )}
                                                    </Space>
                                                </div>
                                            )}
                                        </Col>

                                        {isCommentVisible && (
                                            <Col span={24} style={{ textAlign: 'left' }} key="comment">
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
