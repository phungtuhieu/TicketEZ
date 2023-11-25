import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, Typography } from 'antd';
import { StarFilled,MessageFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import reviewApi from '~/api/user/review/reviewApi';
import funcUtils from './../../../../utils/funcUtils';
import { Title } from 'antd/es/typography/Title';
import { comment } from 'postcss';
import uploadApi from './../../../../api/service/uploadApi';

const ReviewCard = () => {
  
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState([]);
  const [initLoading, setInitLoading] = useState(true);
  const [workSomeThing, setWorkSomeThing] = useState();
  
  
  useEffect(() => {
    const getList = async () => {
        setLoading(true);
        try {
            const res = await reviewApi.get();

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
}, [workSomeThing]);
  return ( 
    
    <Row>
      <Col span={24} className="tw-leading-normal tw-mb-[13px]">
      <Col span={24}> <h1 className='tw-flex tw-items-center tw-justify-center tw-text-black tw-text-center'>Các bình luận nổi bật</h1></Col>
         
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        reviews.map((review) => (

        ))} */}
        <Row gutter={[16, 16]}>

        {review.map((reviewItem) => ( 
           <Col key={reviewItem.id} span={8}>
          <div className="tw-border tw-p-2 tw-pl-4 tw-relative">
            <div className="tw-relative tw-group">
            <img
    src="https://cinema.momocdn.net/img/24065430366242193-tiKNQUipxfKQQXuUFnBprXtL7kM.jpg"
    alt=""
    className="tw-w-auto tw-h-[200px] tw-rounded-lg tw-relative tw-transition-transform tw-duration-300 tw-transform group-hover:tw-scale-110"
  />
  <div className="tw-absolute tw-top-1/2 tw-left-[150px] tw-transform tw--translate-x-1/2 tw--translate-y-1/2 tw-opacity-0 group-hover:tw-opacity-100">
    {/* Icon nút play */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="tw-w-16 tw-h-16 tw-text-black tw-rounded-full tw-border-2 tw-border-black"
    >
      <path
        fillRule="evenodd"
        d="M14 10l-7 5V5l7 5zm1 0l-1.77 1.27v-2.54L15 10z"
        clipRule="evenodd"
      />
    </svg>
  </div>
              <div className="tw-absolute tw-bottom-0 tw-left-0 tw-pl-[20px] tw-pb-2 tw-text-white">
                <h1 className="tw-text-2xl tw-mb-1 tw-font-bold">{reviewItem.movie.title}</h1>
                <div className="tw-flex tw-items-center tw-text-white">
                  <Typography.Text className="tw-mr-2 tw-text-white"><StarFilled />7.9</Typography.Text>
                  <Typography.Text className='tw-text-white'><MessageFilled />529</Typography.Text>
                </div>
              </div>
            </div>

            {/* {data.map(item => ( 
            ))} */}
            <Row className='tw-w-[355px] tw-items-center tw-bg-white tw-rounded-b-lg tw-border tw-mt-0'>
              <Col span={5}>
                <Avatar size={50} 
                // src={'https://i.imgur.com/nHg881t.jpg'}
                src={uploadApi.get(reviewItem.account.image)}
                ></Avatar>
                
              </Col>
              <Col span={12}>
                <div><h4>{reviewItem.account.fullname}</h4></div>
                <div>1 ngày trước</div>
              </Col>
              <Col span={24} className='tw-pl-5'>
              <Typography style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
    {reviewItem.comment.length > 100 ? reviewItem.comment.slice(0, 200) + '...' : reviewItem.comment}
  </Typography>
              </Col>
              <Col span={8}>
                <Link to={`/movie-details/${reviewItem.movie.id}`}>
                 Xem thêm...
                </Link>
              </Col>

            </Row>
          </div>
          </Col>
    ))}
          </Row>
      </Col>
    </Row>
  );
};

export default ReviewCard;
