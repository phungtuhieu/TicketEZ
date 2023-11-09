import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './movieShowing.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard';
import { MovieShowingUserAPI } from '~/api/user/carousel';
import funcUtils from '~/utils/funcUtils';

const cx = classNames.bind(style);

const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className={cx('control-btn')} onClick={onClick}>
            <button className={cx('next')}>
                <i class="fa fa-chevron-right"></i>
            </button>
        </div>
    );
};
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className={cx('control-btn')} onClick={onClick}>
            <button className={cx('prev')}>
                <i class="fa fa-chevron-left"></i>
            </button>
        </div>
    );
};

const MovieShowing = () => {

    const[getMovieByShowtimeShowing, setGetMovieByShowtimeShowing] = useState(null);
    console.log(getMovieByShowtimeShowing);
    useEffect(() => {
        //đổ dữ liệu
        const getMovieByShowtimeShowing = async () => {
            try {
                const [movie] = await Promise.all([MovieShowingUserAPI.getMovieShowing()]);
                
                setGetMovieByShowtimeShowing(movie.listMovieObjResp);
            } catch (error) {
                funcUtils.notify(error.response.data, 'error');
            }
        };
        getMovieByShowtimeShowing();
    },[]);


    const slides = [];


    for (let i = 1; i <= 9; i++) {
        slides.push({
            id: i,
            // img: img,
        });
    }

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    initialSlide: 5,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <div className={cx('body')}>
            <p className={cx('name-card')}>
                <span className={cx('title-name-card')}>Phim đang chiếu</span>
            </p>

            <Slider {...settings} className={cx('slider')}>
                {slides.map((slide, index) => (
                    <div key={index} className={cx('slider')}>
                        <ProductCard data={slide}  index={index}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default MovieShowing;
