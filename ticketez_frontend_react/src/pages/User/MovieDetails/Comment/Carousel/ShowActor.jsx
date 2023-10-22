import React from "react";
import Slider from "react-slick";
import ProductCard from "./card";
import classNames from 'classnames/bind';
import style from './ShowActor.module.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cx = classNames.bind(style);
const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className={cx('control-btn')} onClick={onClick}>
            <button className={cx('next')}>
                <i className="fa fa-chevron-right"></i>
            </button>
        </div>
    );
};
const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className={cx('control-btn')} onClick={onClick}>
            <button className={cx('prev')}>
                <i className="fa fa-chevron-left"></i>
            </button>
        </div>
    );
};

const ActorSlider  = () => {
    const slides = Array.from({ length: 12 }, (_, index) => ({
        img: ``
      }));

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        initialSlide: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    initialSlide: 6
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        
        <div className={cx('body')} style={{ overflowX: 'auto' }}>         
                <h3   className={cx('title')}>Diễn viên & Đoàn làm phim </h3>
            <Slider {...settings}>
                {slides.map((slide, index) => {
                    return (
                        <div key={index}>
                            <ProductCard imgSrc={slide.img} />
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default ActorSlider;
