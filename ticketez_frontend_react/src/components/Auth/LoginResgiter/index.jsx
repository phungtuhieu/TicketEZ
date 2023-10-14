import React, { useState, useEffect } from 'react';
import img from '~/assets/img';
import { Col, Radio, Row } from 'antd';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import styles from './loginForm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const LoginSignin = () => {
    const [selectedOption, setSelectedOption] = useState('Đăng nhập');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    useEffect(() => {
        // Set the default selected option to 'Đăng nhập' when component mounts
        setSelectedOption('Đăng nhập');
    }, []); // Empty dependency array to run this effect only once when component mounts

    return (
        <>
            <Row gutter={24} className={cx('body')}>
                <Col lg={12} className={cx('loginForm')}>
                    <div className={cx('body')}>
                        <Radio.Group
                            options={['Đăng nhập', 'Đăng kí']}
                            onChange={handleOptionChange}
                            value={selectedOption}
                            optionType="button"
                            buttonStyle="solid"
                        />
                        {selectedOption === 'Đăng nhập' ? <LoginForm /> : <RegisterForm />}
                    </div>
                </Col>
                <Col lg={12}>
                    <img src={img.logoLogin} alt="" />
                </Col>
            </Row>
        </>
    );
};

export default LoginSignin;
