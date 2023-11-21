

import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './loginForm.module.scss';
import classNames from 'classnames/bind';
import authApi from '~/api/user/Security/authApi';

const cx = classNames.bind(styles);

const RegisterForm = () => {
    const [signupError, setSignupError] = useState('');
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            authApi.signup({
                id: values.id,
                email: values.email,
                password: values.password,
            });


            console.log('Đăng ký thành công:');
            notification.success({ message: 'Đăng ký thành công!' });
            navigate('/login');
        } catch (error) {
            console.error('Đăng ký không thành công:', error);
            setSignupError('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('lỗi', errorInfo);
        setSignupError('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
    };


    return (
        <div className={cx('signup-container')}>
            <Form
                name="signup"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className={cx('signup-form')}
            >
                <h1 className={cx('signup-title')}>Đăng ký</h1>

                {signupError && <p className={cx('signup-error')}>{signupError}</p>}

                <Form.Item
                    label="Tài Khoản"
                    name="id"
                    rules={[{ required: true, message: 'Vui lòng nhập Tài Khoản!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email không hợp lệ!',
                        },
                        {
                            required: true,
                            message: 'Vui lòng nhập email!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Xác nhận mật khẩu"
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng xác nhận mật khẩu của bạn!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Hai mật khẩu bạn nhập không khớp!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với các điều khoản sử dụng')),
                        },
                    ]}
                    wrapperCol={{ span: 24 }}
                >
                    <Checkbox>
                        Tôi đã đọc và đồng ý với <a href="">điều khoản sử dụng</a>.
                    </Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ span: 24 }}
                >
                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterForm;
