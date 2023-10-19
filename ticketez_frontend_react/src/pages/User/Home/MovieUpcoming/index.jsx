import React from 'react';
import classNames from 'classnames/bind';
import style from './movieUpcoming.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from './ProductCard';
import img from '~/assets/img';
import { Button, Typography } from 'antd';

const { Title } = Typography;


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

const MovieUpcoming = () => {
   const slides = [];

   for (let i = 1; i <= 20; i++) {
       slides.push({
           id: i,
           img: img.datrungphuongnam,
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
            <Title level={1}>
                Phim sắp chiếu
            </Title>

            <Slider {...settings} className={cx('slider')}>
                {slides.map((slide, index) => (
                    <div key={index} className={cx('slider')}>
                        <ProductCard imgSrc={slide.img} idSrc={slide.id} />
                    </div>
                ))}
            </Slider>
            <Button type='primary' classNames={cx('button-movie-upcoming')}>Tìm phim chiếu rạp</Button>
        </div>
    );
};

export default MovieUpcoming;
