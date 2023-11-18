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


// import React, { useState } from 'react';
// import { Button, Checkbox, Form, Input, notification } from 'antd';
// import authApi from '~/api/admin/Security/authApi'; // Đảm bảo rằng đường dẫn này đúng
// import styles from './loginForm.module.scss';
// import classNames from 'classnames/bind';

// const cx = classNames.bind(styles);

// const RegisterForm = () => {
//     const [signupError, setSignupError] = useState('');

//     const onFinish = async (values) => {
//         try {
//             // Sử dụng API đăng ký mà bạn đã thiết lập
//             const response = await authApi.signup({
//                 id: values.id,
//                 password: values.password,
//                 email: values.email,
//             });
//             notification.success({ message: 'Đăng ký thành công!' });
//             // Thực hiện các bước tiếp theo như chuyển hướng hoặc đăng nhập tự động
//         } catch (error) {
//             console.error('Signup Error:', error);
//             setSignupError(error.message);
//             notification.error({ message: 'Đăng ký thất bại', description: error.message });
//         }
//     };

//     const onFinishFailed = (errorInfo) => {
//         console.log('Signup failed:', errorInfo);
//         setSignupError('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
//     };

//     return (
//         <div className={cx('signup-container')}>
//             <Form
//                 name="signup"
//                 initialValues={{ remember: true }}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//                 autoComplete="off"
//                 className={cx('signup-form')}
//             >
//                 <h1 className={cx('signup-title')}>Đăng ký</h1>

//                 {signupError && <p className={cx('signup-error')}>{signupError}</p>}

//                 <Form.Item
//                     label="ID"
//                     name="id"
//                     rules={[{ required: true, message: 'Vui lòng nhập ID!' }]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     label="Email"
//                     name="email"
//                     rules={[
//                         {
//                             type: 'email',
//                             message: 'Email không hợp lệ!',
//                         },
//                         {
//                             required: true,
//                             message: 'Vui lòng nhập email!',
//                         }
//                     ]}
//                 >
//                     <Input />
//                 </Form.Item>

//                 <Form.Item
//                     label="Mật khẩu"
//                     name="password"
//                     rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
//                     hasFeedback
//                 >
//                     <Input.Password />
//                 </Form.Item>

//                 <Form.Item
//                     label="Xác nhận mật khẩu"
//                     name="confirm"
//                     dependencies={['password']}
//                     hasFeedback
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Vui lòng xác nhận mật khẩu của bạn!',
//                         },
//                         ({ getFieldValue }) => ({
//                             validator(_, value) {
//                                 if (!value || getFieldValue('password') === value) {
//                                     return Promise.resolve();
//                                 }
//                                 return Promise.reject(new Error('Hai mật khẩu bạn nhập không khớp!'));
//                             },
//                         }),
//                     ]}
//                 >
//                     <Input.Password />
//                 </Form.Item>

//                 <Form.Item
//                     name="agreement"
//                     valuePropName="checked"
//                     rules={[
//                         {
//                             validator: (_, value) =>
//                                 value ? Promise.resolve() : Promise.reject(new Error('Bạn phải đồng ý với các điều khoản sử dụng')),
//                         },
//                     ]}
//                     wrapperCol={{ span: 24 }}
//                 >
//                     <Checkbox>
//                         Tôi đã đọc và đồng ý với <a href="">điều khoản sử dụng</a>.
//                     </Checkbox>
//                 </Form.Item>

//                 <Form.Item
//                     wrapperCol={{ span: 24 }}
//                 >
//                     <Button type="primary" htmlType="submit" block>
//                         Đăng ký
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     );
// };

// export default RegisterForm;
