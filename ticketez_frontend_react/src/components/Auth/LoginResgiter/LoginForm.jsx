import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './loginForm.module.scss';
import classNames from 'classnames/bind';
import authApi from '~/api/user/Security/authApi';

const cx = classNames.bind(styles);

const LoginForm = () => {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            authApi.getLogin({
                id: values.id,
                password: values.password,
            });

            console.log(authApi.getToken());
            console.log(authApi.getUser());



            notification.success({ message: 'Đăng nhập thành công!' });

            navigate('/');


        } catch (error) {
            setLoginError(error.message);
            notification.error({ message: 'Đăng nhập thất bại', description: error.message });
        }
    };

    const handleLogout = async () => {
        try {
             authApi.logout();
            localStorage.clear();
            notification.success({ message: 'Đã đăng xuất!' });
        } catch (error) {
            notification.error({ message: 'Đăng xuất thất bại', description: error.message });
        }
    };

    return (
        <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className={cx('login-form')}
        >
            <h1 className={cx('login-title')}>Đăng nhập</h1>

            {loginError && <p className={cx('login-error')}>{loginError}</p>}

            <Form.Item
                label="Tài khoản"
                name="id"
                rules={[{ required: true, message: 'Vui lòng nhập tài khoản của bạn!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu của bạn!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8 }}>
                <Checkbox>Nhớ tôi</Checkbox>
            </Form.Item>

            <Form.Item
                wrapperCol={{ offset: 8, span: 16 }}
            >
                <Button type="primary" htmlType="submit" block>
                    Đăng nhập
                </Button>
            </Form.Item>
            <div className=''>
                <Button type="default" onClick={handleLogout} block>
                    Đăng xuất
                </Button>
            </div>
            <div className=''>

            </div>
        </Form>

    );
};

export default LoginForm;
