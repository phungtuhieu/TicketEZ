import React, { useState } from 'react';
import { Layout, Form, Input, Button, Checkbox, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.scss';
import img from '~/assets/img';
import authApi from '~/api/user/Security/authApi';
import funcUtils from '~/utils/funcUtils';
import backgroundImage from '~/assets/img/texure.jpg';
import { validateEmail, validateId, validatePassword, validatePhone ,validateFullname} from '../Custom';

const { Header, Content } = Layout;


const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await authApi.signup({
                id: values.id,
                fullname: values.fullname,
                email: values.email,
                password: values.password,
                phone: values.phone,
                gender: values.gender === true,
            });

            funcUtils.notify('Đăng ký thành công!', 'success');
            navigate('/otp');
        } catch (error) {
            // Phân tích cú pháp lỗi từ phản hồi của API
            const errorMessage = error.response?.data?.message;
            funcUtils.notify(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
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
                                rules={[
                                    { validator: validateId }, 
                                  ]}
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
                                rules={[
                                    { validator: validateFullname }, 
                                  ]}
                                className={styles.formItem}
                            >
                                <Input placeholder="Họ và tên" className={styles.input} />
                            </Form.Item>
                            <div className='formLabel'>
                                <p className={styles.formLabelPhone}><h4>Số điện thoại:</h4></p>
                            </div>
                            <Form.Item
                                name="phone"
                                rules={[
                                    { validator: validatePhone }, 
                                  ]}
                                className={styles.formItem}
                            >
                                <Input placeholder="Số điện thoại" className={styles.input} />
                            </Form.Item>

                            <div className='formLabel'>
                                <p className={styles.formLabeEmail}><h4>Email:</h4></p>
                            </div>
                            <Form.Item
                                name="email"
                                rules={[
                                    { validator: validateEmail }, 
                                  ]}
                                className={styles.formItem}
                            >
                                <Input placeholder="Email" className={styles.input} />
                            </Form.Item>
                            <Form.Item
                                name="gender"
                                label="Giới tính"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                            >
                                <Radio.Group>
                                    <Radio value="male">Nam</Radio>
                                    <Radio value="female">Nữ</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <div className='formLabel'>
                                <p className={styles.formLabelPassword}><h4>Mật khẩu:</h4></p>
                            </div>
                            <Form.Item
                                // label="Mật khẩu"
                                name="password"
                                rules={[
                                    { validator: validatePassword }, 
                                  ]}
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

                            <Form.Item className={styles.formItem}>
                                <Button type="primary" htmlType="submit" block className={styles.loginButton} loading={loading}>
                                    Đăng ký
                                </Button>
                                <p className={styles.signup}>
                                    Đăng nhập tại <a href="http://localhost:3000/Login">Đăng Nhập</a>
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