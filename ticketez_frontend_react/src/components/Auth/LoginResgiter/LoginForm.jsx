import React, { useState } from 'react';
import { getRolesFromLocalStorage } from '~/utils/authUtils';

import { Button, Checkbox, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './loginForm.module.scss';
import classNames from 'classnames/bind';
import authApi from '~/api/user/Security/authApi';
import funcUtils from '~/utils/funcUtils';

const cx = classNames.bind(styles);

const LoginForm = () => {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await authApi.getLogin({
                id: values.id,
                password: values.password,
            });
            console.log(response);
            const roles = getRolesFromLocalStorage();

            if (roles.includes('SUPER_ADMIN')) {
                funcUtils.notify('Đăng nhập thành công!', 'success');
                navigate('/admin/index');
            } else {
                funcUtils.notify('Đăng nhập thành công!', 'success');
                navigate('/');
            }
        } catch (error) {
            funcUtils.notify('Sai mật khẩu hoặc tài khoản', 'error');
        }
    }


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

        </Form>

    );
};

export default LoginForm;
