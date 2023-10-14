import React from 'react';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
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
            name="basic"
            {...formItem}
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
            <h1>Đăng kí</h1>
          
            <Form.Item
                label="Username"
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
                label="Password"
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
            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 16,
                    span: 10,
                }}
            >
                <Button type="primary" htmlType="submit" block></Button>
            </Form.Item>
        </Form>
    </>
);
export default App;
