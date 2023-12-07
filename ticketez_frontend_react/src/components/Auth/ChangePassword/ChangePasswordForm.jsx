import React, { useState } from 'react';
import { Layout, Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePasswordForm.module.scss';
import authApi from '~/api/user/Security/authApi';
import funcUtils from '~/utils/funcUtils';

const { Content } = Layout;

const PasswordChangeForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        if (values.newPassword !== values.confirmNewPassword) {
            funcUtils.notify('Mật khẩu mới và xác nhận mật khẩu không khớp!', 'error');
            return;
        }
        if (!values.oldPassword) {
            funcUtils.notify('Vui lòng nhập mật khẩu cũ!', 'error');
            return;
        }
        setLoading(true);
        try {
            const response = await authApi.changePasswordNew({
                id: values.id,
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
                confirmNewPassword: values.confirmNewPassword

            });
            console.log(response);
            console.log(values.confirmNewPassword);
            funcUtils.notify('Đổi mật khẩu thành công!', 'success');
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message;
            funcUtils.notify(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout className="layout">
            <Content className={styles.content}>
                <div className={styles.wrapper}>
                    <div className={styles.loginContainer}>
                        <Form
                            name="passwordChange"
                            className={styles.loginForm}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <div className='formLabel'>
                                <p className={styles.formLabel}><h3>Đổi Mật Khẩu:</h3></p>
                            </div>
                            <Form.Item
                                name="id"
                                rules={[{ required: true, message: 'Không được bỏ trống tài khoản!' }]}
                                className={styles.formItem}
                            >
                                <Input placeholder="Tên Tài khoản" className={styles.input} />
                            </Form.Item>
                            <Form.Item
                                name="oldPassword"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu cũ!' },
                                ]}
                                className={styles.formItem}
                            >
                                <Input.Password placeholder="Mật khẩu cũ" className={styles.input} />
                            </Form.Item>
                            <Form.Item
                                name="newPassword"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                                ]}
                                className={styles.formItem}
                            >
                                <Input.Password placeholder="Mật khẩu mới" className={styles.input} />
                            </Form.Item>
                            <Form.Item
                                name="confirmNewPassword"
                                rules={[
                                    { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                                ]}
                                className={styles.formItem}
                            >
                                <Input.Password placeholder="Xác nhận mật khẩu mới" className={styles.input} />
                            </Form.Item>
                            <Form.Item className={styles.formItem}>
                                <Button type="primary" htmlType="submit" block className={styles.loginButton} loading={loading}>
                                    Đổi mật khẩu
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content>
        </Layout>
    );
};

export default PasswordChangeForm;
