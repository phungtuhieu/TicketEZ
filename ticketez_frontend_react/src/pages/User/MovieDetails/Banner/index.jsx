import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import uploadApi from '~/api/service/uploadApi';
import '../Banner/banner.css';
import axiosClient from '~/api/global/axiosClient';

const BannerDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState();
    const [background, setBackground] = useState();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const fetchDataMovie = async () => {
        try {
            const resp = await axiosClient.get(`movie/${id}`);
            const data = resp.data;
            setMovie(data);
            setIsDataLoaded(true); // Đặt isDataLoaded thành true khi dữ liệu đã được tải
            console.log(data);
            console.log(movie);
            if (Object.keys(movie).length === 0) {
                setIsDataLoaded(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDataMovie();
    }, [isDataLoaded]);

    return (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500">
            {movie?.poster}
            {isDataLoaded ===false && <img src={uploadApi.get(movie?.poster)} alt="lỗi" />}
            <img src={uploadApi.get('46fb7b1f-31fc-4b24-a980-b898fe3bae2f_khanh.JPG')} alt="lỗi" width={100} />
        </div>
    );
};

export default BannerDetail;
