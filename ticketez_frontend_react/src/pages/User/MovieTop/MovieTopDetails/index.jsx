import {  Col, Divider, Row, Tag } from 'antd';
import React from 'react';
import img from '~/assets/img';
import MovieDetailsListMovieRight from '../../MovieDetails/ListPhimDangChieu';

const MovieTopDetails = () => {
    return (
        <div className="tw-min-h-[1000px]">
            <Row>
                <Col
                    lg={18}
                    className="tw-container tw-mx-auto tw-px-[150px] tw-leading-none tw-text-black tw-text-left"
                >
                    <h1 className="tw-text-black tw-font-semibold">
                        Danh sách phim hành động 2023 được khán giả đánh giá cao
                    </h1>
                    <span className=" tw-line-clamp-2 tw-text-gray-600  tw-mt-4 tw-mb-4">28/12/2023</span>
                    <span className="tw-text-gray-600 tw-font-normal tw-text-2xl tw-mb-4">
                        Năm 2023 đã chứng kiến sự ra mắt của một số bộ phim hành động đỉnh cao, khiến khán giả trên toàn
                        thế giới không thể rời mắt khỏi màn ảnh. Những tác phẩm này đem đến những cảm xúc mãnh liệt, hấp
                        dẫn và điều hòa hoàn hảo giữa hành động, phiêu lưu, và câu chuyện lôi cuốn.
                    </span>
                </Col>
                <Col lg={6}></Col>
            </Row>
            {/* <div className=" tw-inset-0 tw-left-0 tw-top-[-180px]  tw-grid tw-grid-cols-3 tw-items-center tw-overflow-hidden sm:tw-flex sm:tw-flex-nowrap">
                <img alt="" className="tw-aspect-[2/3] tw-w-[450px] tw-h-[400px] " src={img.datrungphuongnam} />
                <img alt="" className="tw-aspect-[2/3] tw-w-[450px] tw-h-[400px] " src={img.datrungphuongnam} />
                <img alt="" className="tw-aspect-[2/3] tw-w-[450px] tw-h-[400px] " src={img.datrungphuongnam} />
                <img alt="" className="tw-aspect-[2/3] tw-w-[450px] tw-h-[400px] " src={img.datrungphuongnam} />
                <img alt="" className="tw-aspect-[2/3] tw-w-[450px] tw-h-[400px] " src={img.datrungphuongnam} />
            </div> */}
            <div className="tw-container tw-mx-auto tw-px-[150px] tw-leading-none tw-text-black tw-text-left">
                <Row gutter={15}>
                    <Col lg={16}>
                        <Tag
                            color="#E0E0E0"
                            className="tw-w-[100px] tw-h-[7px] tw-ml-[350px] tw-mt-5  tw-mb-[20px]"
                        ></Tag>
                        <Row gutter={35}>
                            <Col lg={5}>
                                <div className="tw-relative">
                                    <img
                                        alt=""
                                        className="tw-aspect-[2/3] tw-w-[158px] tw-h-[237px]  tw-rounded-lg tw-absolute"
                                        src={img.datrungphuongnam}
                                    />
                                    <svg
                                        className="tw-absolute tw-w-[50px] tw-h-[50px] tw-fill-white tw-top-[90px] tw-left-[55px]"
                                        viewBox="-51.2 -51.2 614.40 614.40"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        stroke="#ffffff"
                                        strokeWidth="0.00512"
                                    >
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g
                                            id="SVGRepo_tracerCarrier"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            stroke="#CCCCCC"
                                            strokeWidth="1.024"
                                        ></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g>
                                                <g>
                                                    <path d="M256,0C114.608,0,0,114.608,0,256s114.608,256,256,256s256-114.608,256-256S397.392,0,256,0z M256,496C123.664,496,16,388.336,16,256S123.664,16,256,16s240,107.664,240,240S388.336,496,256,496z"></path>
                                                </g>
                                            </g>
                                            <g>
                                                <g>
                                                    <polygon points="189.776,141.328 189.776,370.992 388.672,256.16"></polygon>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                            </Col>
                            <Col lg={17}>
                                <div className="tw-text-left  tw-leading-loose">
                                    <h1 className="tw-mt-[-12px]">Sisu: Già Gân Báo Thù</h1>
                                    <div className="tw-mt-[-20px]">
                                        <span className="tw-font-bold"> Thể loại: </span> <span>chiến tranh, kịch</span>
                                    </div>
                                    <div>
                                        <span className="tw-font-bold"> năm: </span> <span>2023</span>
                                    </div>
                                    <div>
                                        <span className="tw-font-bold"> Thời gian: </span> <span>2023</span>
                                    </div>
                                    <div>
                                        <span className="tw-font-bold"> Nội dung phim: </span>
                                        <span>
                                            Khi một cựu quân nhân phát hiện ra vàng ở vùng hoang dã Lapland cố gắng mang
                                            chiến lợi phẩm vào thành phố, những người lính Đức Quốc xã do một sĩ quan SS
                                            tàn bạo chỉ huy đã chiến đấu với anh ta.
                                        </span>
                                    </div>
                                    <div>
                                        <span className="tw-font-bold"> Quốc gia: </span>
                                        <span>Mỹ</span>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={2}>
                                <Tag color="#176b87" className="tw-w-[40px] tw-h-[40px] tw-text-center ">
                                    <h1 className="tw-mt-[12px]">1</h1>
                                </Tag>
                            </Col>
                            <Divider className=" tw-mb-[30px] tw-mt-[20px]" />
                        </Row>
                    </Col>
                    <Col lg={8}>
                        <h3 className="tw-text-black tw-text-left tw-ml-[20px] tw-mt-[36px] tw-mb-[46px]">
                            Phim đang chiếu
                        </h3>
                        <MovieDetailsListMovieRight />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MovieTopDetails;
