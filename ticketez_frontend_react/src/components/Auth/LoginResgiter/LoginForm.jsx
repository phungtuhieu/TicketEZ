import React from 'react';
import { Button, Checkbox,  Form, Input } from 'antd';
import styles from './loginForm.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const formItem = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const App = () => (
    <>
        <Form
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item wrapperCol={{ span: 24 }}>
                <div className={cx('name-login')}>
                    <h1>Đăng nhập</h1>
                    <span className={cx('des-name-login')}>
                        Vui lòng nhập tài khoản và mật khẩu để có trải nghiệm tốt hơn
                    </span>
                </div>
            </Form.Item>
            <Form.Item
                {...formItem}
                label="Tài khoản"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                {...formItem}
                label="Mật khẩu"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 4, offset: 8 }} name="remember" valuePropName="checked">
                <Checkbox>nhớ tôi ?</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
                <Button type="primary" htmlType="submit" block className={cx('buttonSubmit')}>
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    </>
);
export default App;
