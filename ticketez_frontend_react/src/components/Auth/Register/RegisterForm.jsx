import React, { useState } from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.scss';
import img from '~/assets/img';
import authApi from '~/api/user/Security/authApi';
import { getRolesFromLocalStorage } from '~/utils/authUtils';
import funcUtils from '~/utils/funcUtils';
import backgroundImage from '~/assets/img/texure.jpg';
import { validateEmail, validateId, validatePassword } from '../Custom';

const { Header, Content } = Layout;


const RegisterForm = () => {

    const [signupError, setSignupError] = useState('');
    const navigate = useNavigate();

    const onFinish = async (values) => {
        if (!validateId(values.id)) return;
        if (!validateEmail(values.email)) return;
        if (!validatePassword(values.password)) return;
        try {
            await authApi.signup({
                id: values.id,
                fullname: values.fullname,
                email: values.email,
                password: values.password,
            });

            funcUtils.notify('Đăng ký thành công!', 'success');
            navigate('/login');
        } catch (error) {
            // Phân tích cú pháp lỗi từ phản hồi của API
            const errorMessage = error.response?.data?.message;
            funcUtils.notify(errorMessage, 'error');
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Lỗi:', errorInfo);
        setSignupError('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
    };


    return (
        <Layout className="layout" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <Content className={styles.content}>
                <div className={styles.wrapper}>
                    <div className={styles.loginContainer}>
                        <h1 className={styles.title}>Đăng Ký</h1>
                        {/* <p className={styles.welcomeText}>Chào mừng bạn đến giao diện người dùng TicketEZ Vui lòng nhập thông tin của bạn dưới đây để đăng nhập.</p> */}
                        <Form
                            name="basic"
                            className={styles.loginForm}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <div className='formLabel'>
                                <p className={styles.formLabel}><h4>Tên Tài khoản:</h4></p>
                            </div>
                            <Form.Item
                                // label="Tên tài khoản"
                                name="id"
                                rules={[{ required: true, message: 'Không được bỏ trống tài khoản !' }]}
                                className={styles.formItem}
                            >
                                <Input placeholder="Tên Tài khoản" className={styles.input} />
                            </Form.Item>

                            <div className='formLabel'>
                                <p className={styles.formLabeFilename}><h4>Họ và tên:</h4></p>
                            </div>
                            <Form.Item
                                // label="Tên tài khoản"
                                name="fullname"
                                rules={[{ required: true, message: 'Không được bỏ trống Họ và tên !' }]}
                                className={styles.formItem}
                            >
                                <Input placeholder="Họ và tên" className={styles.input} />
                            </Form.Item>
                            <div className='formLabel'>
                                <p className={styles.formLabeEmail}><h4>Email:</h4></p>
                            </div>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: 'Không được bỏ trống Email !' },
                                    // Thêm quy tắc kiểm tra định dạng email của bạn ở đây nếu cần
                                ]}
                                className={styles.formItem}
                            >
                                <Input placeholder="Email" className={styles.input} />
                            </Form.Item>

                            <div className='formLabel'>
                                <p className={styles.formLabelPassword}><h4>Mật khẩu:</h4></p>
                            </div>
                            <Form.Item
                                // label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Không được bỏ trống mật khẩu !' }]}
                                className={styles.formItem}
                            >
                                <Input.Password type="password" placeholder="Mật khẩu" className={styles.input} />

                            </Form.Item>

                            <div className='formLabel'>
                                <p className={styles.confirm}><h4>Xác nhận mật khẩu:</h4></p>
                            </div>
                            <Form.Item

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
                                            return Promise.reject(new Error('Hai mật khẩu bạn nhập không khớp !'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password type="password" placeholder="Xác nhận mật khẩu" className={styles.input} />
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

                            {/* <Form.Item className={styles.formItem}>
                                <Checkbox className={styles.checkbox}>Nhớ tài khoản</Checkbox>
                                <a className={styles.forgot} href="">
                                    Quên mât khẩu
                                </a>

                            </Form.Item> */}
                            <Form.Item className={styles.formItem}>
                                <Button type="primary" htmlType="submit" block className={styles.loginButton}>
                                    Đăng ký
                                </Button>
                                <p className={styles.signup}>
                                    Bạn chưa có tài khoản <a href="http://localhost:3000/Login">Đăng Nhập</a>
                                </p>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </Content>

        </Layout>
    );
};

export default RegisterForm;































































// import React, { useState } from 'react';
// import { Button, Checkbox, Form, Input, notification } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import styles from './RegisterForm.module.scss';
// import classNames from 'classnames/bind';
// import authApi from '~/api/user/Security/authApi';

// const cx = classNames.bind(styles);

// const RegisterForm = () => {
//     const [signupError, setSignupError] = useState('');
//     const navigate = useNavigate();

//     const onFinish = async (values) => {
//         try {
//             authApi.signup({
//                 id: values.id,
//                 email: values.email,
//                 password: values.password,
//             });


//             console.log('Đăng ký thành công:');
//             notification.success({ message: 'Đăng ký thành công!' });
//             navigate('/login');
//         } catch (error) {
//             console.error('Đăng ký không thành công:', error);
//             setSignupError('Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
//         }
//     };

//     const onFinishFailed = (errorInfo) => {
//         console.log('lỗi', errorInfo);
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
//                     label="Tài Khoản"
//                     name="id"
//                     rules={[{ required: true, message: 'Vui lòng nhập Tài Khoản!' }]}
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
