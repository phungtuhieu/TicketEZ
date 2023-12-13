import React, { useEffect, useState } from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './loginForm.module.scss';
import img from '~/assets/img';
import authApi from '~/api/user/Security/authApi';
import { getRolesFromLocalStorage, hasSuperAdminRole } from '~/utils/authUtils';
import funcUtils from '~/utils/funcUtils';
import { validateId, validatePassword } from '../Custom';


const { Header, Content } = Layout;


const LoginForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        if (!validateId(values.id) || !validatePassword(values.password)) return;
        setLoading(true);
        try {
            const response = await authApi.getLogin({
                id: values.id,
                password: values.password,
            });
            const user = await authApi.getUser();
            console.log(user);

            if (hasSuperAdminRole()) {
                funcUtils.notify('Đăng nhập thành công!', 'success');
                navigate('/admin/index');
                window.location.reload(); //chưa làm đc chuyển trang Route nên tạm này
            } else {
                funcUtils.notify('Đăng nhập thành công!', 'success');
                navigate('/');
                window.location.reload();//chưa làm đc chuyển trang nên tạm này
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                funcUtils.notify('Tài khoản chưa được xác thực. Vui lòng xác thực email của bạn.', 'info');
                navigate('/otp');
            } else {
                funcUtils.notify('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.', 'error');
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <Layout className="layout">

            <Content className={styles.content}>
                <div className={styles.wrapper}>
                    <div className={styles.loginContainer}>
                        <h1 className={styles.title}>Đăng nhập</h1>
                        <p className={styles.welcomeText}>Chào mừng bạn đến giao diện người dùng TicketEZ Vui lòng nhập thông tin của bạn dưới đây để đăng nhập.</p>
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
                            <Form.Item className={styles.formItem}>
                                <Checkbox className={styles.checkbox}>Nhớ tài khoản</Checkbox>
                                <a className={styles.forgot} href="">
                                    Quên mât khẩu
                                </a>

                            </Form.Item>
                            <Form.Item className={styles.formItem}>
                                <Button type="primary" htmlType="submit" block className={styles.loginButton} loading={loading}>
                                    Đăng nhập
                                </Button>
                                <p className={styles.signup}>
                                    Bạn chưa có tài khoản <a href="http://localhost:3000/Register">Đăng ký</a>
                                </p>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
                <div className={styles.rightContainer}>
                    <img src={img.logoLogin1} alt="Login" className={styles.imageStyle} />
                </div>
            </Content>

        </Layout>
    );
};

export default LoginForm;