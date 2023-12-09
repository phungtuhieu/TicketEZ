import React, { useEffect, useState } from 'react';
import { Row, Col, Avatar, Typography, Modal, Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import reviewApi from '~/api/user/review/reviewApi';
import funcUtils from './../../../../utils/funcUtils';
import uploadApi from '~/api/service/uploadApi';
import moment from 'moment-timezone';

const ReviewCard = () => {
  const [loading, setLoading] = useState(false);
  const [listMovieAndListReviewObjResp, setListMovieAndListReviewObjResp] = useState([]);
  const [initLoading, setInitLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenModal = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      try {
        const res = await reviewApi.getMovieOrReview(1, 10);

        setListMovieAndListReviewObjResp(res.data.listMovieAndListReviewObjResp);
        setInitLoading(false);
        setLoading(false);
      } catch (error) {
        if (error.hasOwnProperty('response')) {
          funcUtils.notify(error.response.data, 'error');
        } else {
          console.log(error);
        }
      }
    };
    getList();
  }, []);

  return (
    <Row>
      <Col span={24} className="tw-leading-normal tw-mb-[13px]">
        <Col span={24}>
          <h1 className='tw-flex tw-items-center tw-justify-center tw-text-[#176b87] tw-text-center'>REVIEW PHIM TẠI TICKETEZ CINEMA</h1>
        </Col>
        <Row gutter={[16, 16]}>
          {listMovieAndListReviewObjResp.map((Item, index) => (
            <Col key={index} span={8}>
              <div className="tw-border tw-p-2 tw-pl-4 tw-relative">
                <div className="tw-relative tw-group">
                  <img
                    src={uploadApi.get(Item.movie.banner)}
                    alt=""
                    className="tw-w-auto tw-h-[200px] tw-rounded-lg tw-relative tw-transition-transform tw-duration-300 tw-transform group-hover:tw-scale-110"
                  />
                  <div className="tw-absolute tw-top-1/2 tw-left-[150px] tw-transform tw--translate-x-1/2 tw--translate-y-1/2 tw-opacity-0 group-hover:tw-opacity-100">
                    {/* Icon nút play */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="tw-w-16 tw-h-16 tw-text-black tw-rounded-full tw-border-2 tw-border-black cursor-pointer"
                      onClick={() => handleOpenModal(Item.movie)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 10l-7 5V5l7 5zm1 0l-1.77 1.27v-2.54L15 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="tw-absolute tw-bottom-0 tw-left-0 tw-pl-[20px] tw-pb-2 tw-text-white">
                    <h1 className="tw-text-2xl tw-mb-1 tw-font-bold">{Item.movie.title}</h1>
                    <div className="tw-flex tw-items-center tw-text-white">
                      <Typography.Text className="tw-mr-2 tw-text-white"><StarFilled />{Item.movie.rating}</Typography.Text>
                    </div>
                  </div>
                </div>

                {Item.review.slice(0, 2).map((reviewItem, reviewIndex) => (
                  <Row key={reviewIndex} className='tw-w-[355px]  tw-h-[200px]tw-items-center tw-bg-gray-200 tw-rounded-b-lg tw-border tw-mt-0'>
                    <Col span={5}>
                      <Avatar size={40} src={uploadApi.get(reviewItem.account.image)} />
                    </Col>
                    <Col span={12}>
                      <div><h4>{reviewItem.account.fullname}</h4></div>
                      <div> {moment(reviewItem.createDate).format("MM-DD-YYYY")}
                       </div>
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
                ))}
              </div>
            </Col>
          ))}
        </Row>
      </Col>

      {/* Modal gọi ở đây */}
      <Modal
        title={selectedMovie?.title}
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={[
          <Button key="bookTicket" type="primary">
            Đặt vé
          </Button>,
          <Button key="close" onClick={handleCloseModal}>
            Đóng
          </Button>,
        ]}
      >
        <iframe
          title={selectedMovie?.title}
          width="100%"
          height="315"
          src={selectedMovie?.videoTrailer}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; 
          picture-in-picture; web-share"
          frameborder="0"
        ></iframe>
        {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/17ywQS6XO-M?si=zXa1Mz3DFEpACBni" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
        <Row gutter={[16, 16]} className="tw-mt-2">
  <Col span={24} style={{ display: 'flex' }}>
    <div style={{ marginRight: '16px' }}>
      <img src={uploadApi.get(selectedMovie?.poster)} alt="" width={155} />
    </div>
    <Col span={8}>
      <div>
        <p>Thời lượng: {selectedMovie?.duration}</p>
        <p>Quốc gia: {selectedMovie?.country}</p>
      </div>
    </Col>
  </Col>
</Row>

      </Modal>
    </Row>
  );
};

export default ReviewCard;
