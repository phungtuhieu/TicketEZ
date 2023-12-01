import { Col, Row, Tag } from 'antd';
import React from 'react';
import MovieDetailsListMovieRight from '../MovieDetails/ListPhimDangChieu';
import ListMovie from './ListMovie';
import Top3Movie from './Top3Movie';

const MovieTop = () => {
    return (
        <div>
            <div className=" tw-container tw-mx-auto tw-px-[150px] tw-leading-none ">
                <div className="tw-text-center tw-leading-none tw-mt-24 ">
                    <h1 className="tw-text-black tw-font-semibold">
                        Danh sách phim hay trên <span className="tw-text-[var(--primary--text-color)]">TicketEZ</span>
                    </h1>
                    <h3 className="tw-text-gray-700 tw-font-medium tw-line-clamp-2 md:tw-line-clamp-none  ">
                        Danh sách phim hay được ưa chuộng trên Danh sách phim hay trên
                        <span className="tw-text-[var(--primary--text-color)] tw-font-medium"> TicketEZ</span> được cập
                        nhật liên tục với đa dạng các thể loại, quốc gia.
                    </h3>

                    <Top3Movie />
                </div>
            </div>
            <Tag color="#E0E0E0" className="tw-w-[100px] tw-h-[7px]"></Tag>
            <Row gutter={15} className="tw-container tw-mx-auto tw-px-[150px]">
                <Col lg={16}>
                    <ListMovie />
                </Col>
                <Col lg={8}>
                    <h3 className="tw-text-black tw-text-left tw-ml-[20px] tw-mt-[-46px]">Phim đang chiếu</h3>
                    <MovieDetailsListMovieRight />
                </Col>
            </Row>
        </div>
    );
};

export default MovieTop;
