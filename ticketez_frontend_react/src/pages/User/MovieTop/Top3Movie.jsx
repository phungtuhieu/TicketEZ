import { Col, Row } from 'antd';
import React from 'react';
import img from '~/assets/img';

const Top3Movie = () => {
    return (
        <div>
            <Row gutter={15} className="tw-mt-20 tw-cursor-pointer ">
                <Col lg={8}>
                    <div className=" tw-relative   tw-overflow-hidden tw-rounded-lg  tw-poster-square tw-aspect-[4/3] hover:tw-opacity-[0.7]">
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-1">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-z-[4] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.anhReview}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-z-[3] tw-ml-[50px] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-ml-[100px]  tw-z-[2] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.anhReview}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-ml-[150px] tw-z-[1] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-ml-[195px] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                    </div>
                    <div className="tw-text-left tw-mt-2 tw-leading-relaxed">
                        <h2 className="tw-mt-4 tw-text-[var(--primary--text-color)] tw-no-underline  hover:tw-underline">
                            Top phim siêu anh hùng năm 2023 đáng được mong đợi
                        </h2>
                        <span className=" tw-line-clamp-2 tw-text-gray-400 tw-mt-1">
                            Bạn đã sẵn sàng để khám phá vũ trụ điện ảnh đầy huyền thoại của siêu anh hùng? Trên màn ảnh
                            rực rỡ, chúng ta được chứng kiến những câu chuyện phi thường và những nhân vật có siêu năng
                            lực bậc nhất. Phim siêu anh hùng đã trở thành một thể loại phổ biến không chỉ trong lòng
                            người hâm mộ, mà còn trên toàn thế giới.
                        </span>
                        <span className=" tw-line-clamp-2 tw-text-gray-400 tw-mt-1">28/12/2023</span>
                    </div>
                </Col>
                <Col lg={8}>
                    <div className=" tw-relative   tw-overflow-hidden tw-rounded-lg  tw-poster-square tw-aspect-[4/3]">
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-1">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-z-[4] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.anhReview}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-z-[3] tw-ml-[50px] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-ml-[100px]  tw-z-[2] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.anhReview}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-ml-[150px] tw-z-[1] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-ml-[195px] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                    </div>
                    <div className="tw-text-left tw-mt-2 tw-leading-relaxed">
                        <h2 className="tw-mt-4 tw-text-[var(--primary--text-color)] tw-no-underline  hover:tw-underline">
                            Top phim siêu anh hùng năm 2023 đáng được mong đợi
                        </h2>
                        <span className=" tw-line-clamp-2 tw-text-gray-400 tw-mt-1">
                            Bạn đã sẵn sàng để khám phá vũ trụ điện ảnh đầy huyền thoại của siêu anh hùng? Trên màn ảnh
                            rực rỡ, chúng ta được chứng kiến những câu chuyện phi thường và những nhân vật có siêu năng
                            lực bậc nhất. Phim siêu anh hùng đã trở thành một thể loại phổ biến không chỉ trong lòng
                            người hâm mộ, mà còn trên toàn thế giới.
                        </span>
                        <span className=" tw-line-clamp-2 tw-text-gray-400 tw-mt-1">28/12/2023</span>
                    </div>
                </Col>
                <Col lg={8}>
                    <div className=" tw-relative   tw-overflow-hidden tw-rounded-lg  tw-poster-square tw-aspect-[4/3]">
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-1">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-z-[4] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.anhReview}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-z-[3] tw-ml-[50px] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-ml-[100px]  tw-z-[2] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.anhReview}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-ml-[150px] tw-z-[1] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                        <div className="tw-absolute tw-top-0 tw-aspect-[2/3] tw-h-full tw-drop-shadow tw-poster-2">
                            <img
                                src={img.datrungphuongnam}
                                alt=""
                                width={170}
                                height={255}
                                className="tw-absolute tw-inset-0 tw-h-full tw-w-full tw-rounded-lg tw-object-cover tw-ml-[195px] tw-border-solid tw-border-[2px] tw-border-white"
                            />
                        </div>
                    </div>
                    <div className="tw-text-left tw-mt-2 tw-leading-relaxed">
                        <h2 className="tw-mt-4 tw-text-[var(--primary--text-color)] tw-no-underline  hover:tw-underline">
                            Top phim siêu anh hùng năm 2023 đáng được mong đợi
                        </h2>
                        <span className=" tw-line-clamp-2 tw-text-gray-400 tw-mt-1">
                            Bạn đã sẵn sàng để khám phá vũ trụ điện ảnh đầy huyền thoại của siêu anh hùng? Trên màn ảnh
                            rực rỡ, chúng ta được chứng kiến những câu chuyện phi thường và những nhân vật có siêu năng
                            lực bậc nhất. Phim siêu anh hùng đã trở thành một thể loại phổ biến không chỉ trong lòng
                            người hâm mộ, mà còn trên toàn thế giới.
                        </span>
                        <span className=" tw-line-clamp-2 tw-text-gray-400 tw-mt-1">28/12/2023</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Top3Movie;
