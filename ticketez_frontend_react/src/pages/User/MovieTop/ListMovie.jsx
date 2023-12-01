import { Col, Divider, Row } from 'antd';
import React from 'react';
import img from '~/assets/img';

const ListMovie = () => {
    return (
        <div>
            <Row gutter={15} className="tw-cursor-pointer">
                <Col lg={7}>
                    <div className=" tw-relative tw-overflow-hidden tw-rounded-lg  tw-poster-square tw-aspect-[4/3] hover:tw-opacity-[0.7] ">
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-1">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={100}
                                height={160}
                                className="tw-absolute tw-inset-0 tw-rounded-lg tw-object-cover tw-z-[4] tw-border-solid tw-border-[1px] tw-border-gray-300"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.anhReview}
                                alt=""
                                width={100}
                                height={160}
                                className="tw-absolute tw-inset-0 tw-rounded-lg tw-object-cover tw-z-[3] tw-ml-[30px] tw-border-solid tw-border-[1px] tw-border-gray-300"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={100}
                                height={160}
                                className="tw-absolute tw-inset-0 tw-rounded-lg tw-object-cover tw-ml-[60px]  tw-z-[2] tw-border-solid tw-border-[1px] tw-border-gray-300"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.anhReview}
                                alt=""
                                width={100}
                                height={160}
                                className="tw-absolute tw-inset-0 tw-rounded-lg tw-object-cover tw-ml-[90px] tw-z-[1] tw-border-solid tw-border-[1px] tw-border-gray-300"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={100}
                                height={160}
                                className="tw-absolute tw-inset-0 tw-rounded-lg tw-object-cover tw-ml-[120px] tw-border-solid tw-border-[1px] tw-border-gray-300"
                            />
                        </div>
                    </div>
                </Col>
                <Col lg={17} className="tw-leading-relaxed tw-text-left">
                    <h3 className="tw-text-black hover:tw-underline">
                        Danh sách phim hành động 2023 được khán giả đánh giá cao nhất đó chính là kkkk
                    </h3>
                    <span className=" tw-line-clamp-3  tw-text-gray-500 tw-mt-2">
                        Bạn đã sẵn sàng để khám phá vũ trụ điện ảnh đầy huyền thoại của siêu anh hùng? Trên màn ảnh rực
                        rỡ, chúng ta được chứng kiến những câu chuyện phi thường và những nhân vật có siêu năng lực bậc
                        nhất. Phim siêu anh hùng đã trở thành một thể loại phổ biến không chỉ trong lòng người hâm mộ,
                        mà còn trên toàn thế giới.
                    </span>
                    <span className=" tw-line-clamp-2 tw-text-gray-500 ">28/12/2023</span>
                </Col>
                <Divider className=" tw-mb-[30px] tw-mt-[20px]" />
            </Row>
        </div>
    );
}

export default ListMovie;
