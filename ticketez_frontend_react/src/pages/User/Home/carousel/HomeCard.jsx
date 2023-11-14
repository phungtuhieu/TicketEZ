/* eslint-disable jsx-a11y/alt-text */
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({ item: { id, cover, name, rating, time, desc, starring, genres, tags, video } }) => {
    return (
        <>
            <Row className="tw-mt-[40px]">
                <Col>
                    <div className="coverImage  tw-h-[100%]  tw-w-[100%] ">
                        <img src={cover} alt="" />
                        <div className="tw-h-[100%]  tw-w-[100%] tw-bg-gradient-to-r tw-from-cyan-500 tw-to-blue-500"></div>
                    </div>
                </Col>
                <Col>
                    <Row className="tw-mt-[-45px]">
                        <Col span={14} className="col-title ">
                            <div className="movie-title">{name}</div>
                            <div className="rating ">
                                <i className="fa fa-star tw-text-[var(--pink-color)] "></i>
                                <i className="fa fa-star tw-text-[var(--pink-color)]"></i>
                                <i className="fa fa-star tw-text-[var(--pink-color)]"></i>
                                <i className="fa fa-star tw-text-[var(--pink-color)]"></i>
                                <i className="fa fa-star-half tw-text-[var(--pink-color)]"></i>
                                <label>{rating}(Imdb)</label>
                                <span className="border">GP</span>
                                <label>{time}</label>
                            </div>
                            <p className="description">{desc}</p>
                            <div className="cast">
                                <p>
                                    <span className="tw-text-[var(--pink-color)] ">Starring </span>
                                    {starring}
                                </p>
                                <p>
                                    <span className="tw-text-[var(--pink-color)]">Genres </span>
                                    {genres}
                                </p>
                                <p>
                                    <span className="tw-text-[var(--pink-color)]">Tags </span>
                                    {tags}
                                </p>
                            </div>
                            <button className="tw-mt-8 border tw-bg-[var(--pink-color)] tw-shadow-pink-900">
                                <FontAwesomeIcon icon={faPlay} /> Xem ngay
                            </button>
                        </Col>
                        <Col span={10}>
                            <div className="palyButton ">
                                <Link to={`/singlepage/${id}`}>
                                    <button>
                                        <div className="img">
                                            <img src="./images/play-button.png" alt="" />
                                            <img src="./images/play.png" className="change" />
                                        </div>
                                        XEM TRAILER
                                    </button>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default HomeCard;
