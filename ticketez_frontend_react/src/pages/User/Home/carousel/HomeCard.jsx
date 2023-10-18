import { Row, Col } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const HomeCard = ({ item: { id, cover, name, rating, time, desc, starring, genres, tags, video } }) => {
    return (
        <>
            <Row>
                <Col style={{ backgroundColor: 'red' }}>
                    <div className="coverImage">
                        <img src={cover} alt="" />
                    </div>
                </Col>
                <Col>
                    <Row>
                        <Col span={14} className="col-title">
                            <div className="movie-title">{name}</div>
                            <div className="rating ">
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half"></i>
                                <label>{rating}(Imdb)</label>
                                <span className="border">GP</span>
                                <label>{time}</label>
                            </div>
                            <p className="description">{desc}</p>
                            <div className="cast">
                                <p>
                                    <span>Starring </span>
                                    {starring}
                                </p>
                                <p>
                                    <span>Genres </span>
                                    {genres}
                                </p>
                                <p>
                                    <span>Tags </span>
                                    {tags}
                                </p>
                            </div>
                            <button className="border">
                                <i className="fas fa-play"></i> PLAY NOW
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
                                        WATCH TRAILER
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
