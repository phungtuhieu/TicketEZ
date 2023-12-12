import React, { useState } from 'react';
import { Layout, Form, Input, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './ResetPasswordFrom.module.scss';
import authApi from '~/api/user/Security/authApi';
import funcUtils from '~/utils/funcUtils';

const { Content } = Layout;

const ResetPasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const navigate = useNavigate();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const hideModal = () => {
        setIsModalVisible(false);
    };

    const onEmailSubmit = async (values) => {
        setLoading(true);
        try {
            await authApi.sendOtpEmailNew({
                email: values.email
            });
            showModal();
            funcUtils.notify('Mã OTP đã được gửi đến email của bạn.', 'success');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra!';
            funcUtils.notify(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };


    const onResetPasswordSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await authApi.ResetPasswordNew({
                code: values.code,
                newPassword: values.newPassword
            });
            funcUtils.notify('Đổi mật khẩu thành công!', 'success');
            navigate('/login');
        }
        catch (error) {
            funcUtils.notify('Kiểm tra mã Otp!', 'error');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <Layout className="layout">
            <Content className={styles.content}>
                {/* Email Form */}
                <Form onFinish={onEmailSubmit}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Gửi mã OTP
                        </Button>
                    </Form.Item>
                </Form>

                {/* OTP and New Password Modal */}
                <Modal
                    title="Đặt lại mật khẩu"
                    visible={isModalVisible}
                    onCancel={hideModal}
                    footer={null}
                >
                    <Form onFinish={onResetPasswordSubmit}>
                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: 'Vui lòng nhập mã OTP!' }]}
                        >
                            <Input placeholder="Mã OTP" />
                        </Form.Item>
                        <Form.Item
                            name="newPassword"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu mới!' }]}
                        >
                            <Input.Password placeholder="Mật khẩu mới" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Đặt lại mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Content>
        </Layout>
    );
};

export default ResetPasswordForm;
