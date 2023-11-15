/* eslint-disable jsx-a11y/alt-text */
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'antd';
import React from 'react';
import uploadApi from '~/api/service/uploadApi';
import { Link } from 'react-router-dom';

const HomeCard = ({ item: { movie, actors, genres } }) => {
    const style = {
        background:
            'linear-gradient(to right, black 0%, black 10%, transparent 20%, transparent 80%, black 90%, black 100%)',
    };

    return (
        <>
            <Row>
                <Col style={{ backgroundColor: 'red' }}>
                    <div className="coverImage">
                        <img src={uploadApi.get(movie.poster)} alt="" />
                    </div>
                </Col>
                <Col>
                    <Row>
                        <Col span={14} className="col-title">
                            <div className="movie-title">{movie.title}</div>
                            <div className="rating ">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half"></i>
                                <label>{movie.rating}(Đánh giá)</label>
                                <span className="border">GP</span>
                                <label>{movie.duration}</label>
                            </div>
                            <p className="description">{movie.description}</p>
                            <div className="cast">
                                <p className="tw-flex tw-items-center">
                                    <span className="tw-mr-2">Diễn viên: </span>

                                    {actors.map((actor, index) => (
                                        <React.Fragment key={actor.id}>
                                            <li>{actor.fullname}</li>
                                            {index < genres.length - 1 && <span className="tw-mx-2">,</span>}
                                        </React.Fragment>
                                    ))}
                                </p>
                                <p className="tw-flex tw-items-center">
                                    <span className="tw-mr-2">Thể loại: </span>
                                    <div className="tw-mt-1 tw-font-bold tw-text-white tw-text-opacity-90 tw-flex">
                                        {genres.map((genre, index) => (
                                            <React.Fragment key={genre.id}>
                                                <li>{genre.name}</li>
                                                {index < genres.length - 1 && <span className="tw-mx-2">,</span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </p>
                            </div>
                            <button className="tw-mt-8 border tw-bg-[var(--pink-color)] tw-shadow-pink-900">
                                <FontAwesomeIcon icon={faPlay} /> Xem ngay
                            </button>
                        </Col>
                        <Col span={10}>
                            <div className="palyButton ">
                                <Link to={`/singlepage/${movie.id}`}>
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
