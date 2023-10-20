import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames/bind';
import style from './LoaiRap.module.scss';
import CumRap from '../ListCumRap/CumRap';
import cinemaChainApi from '~/api/admin/managementCinema/cinemaChainApi';

const cx = classNames.bind(style);

function LoaiRap({ province }) {
    const [cinemaChainName, setCinemaChainName] = useState('tất cả');
    const [dataCinemaChainName, setDataCinemaChainName] = useState([]);

    const NameAndProvince    = {
        province,
        cinemaChainName,
    };

    useEffect(() => {
        const getCinemaChain = async () => {
            const res = await cinemaChainApi.get();
            // console.log('res', res);
            setDataCinemaChainName(res.data);
        };
        getCinemaChain();
    }, []);

    // console.log(dataCinemaChainName);

    return (
        <Row style={{ height: '100%' }}>
            <Col span={24} className={cx('Loai-rap-col')}>
                <div className={cx('wrapper')}>
                    <div
                        className={cx('container', { active: cinemaChainName === 'tất cả' })}
                        onClick={() => setCinemaChainName('tất cả')}
                    >
                        <div className={cx('border')}>
                            <img
                                className={cx('img')}
                                src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/dexuat-icon.svg"
                                alt=""
                            />
                        </div>
                        <div className={cx('title')}>Tất cả</div>
                    </div>
                    {dataCinemaChainName.map((name) => (
                        <div
                            className={cx('container', { active: cinemaChainName === name.name })}
                            onClick={() => setCinemaChainName(name.name)}
                        >
                            <div className={cx('border')}>
                                <img
                                    className={cx('img')}
                                    src={'http://localhost:8081/api/upload/' + name.image}
                                    alt=""
                                />
                            </div>
                            <div className={cx('title')}>{name.name} </div>
                        </div>
                    ))}
                </div>
            </Col>
            <CumRap NameAndProvince={NameAndProvince} />
        </Row>
    );
}

export default LoaiRap;
