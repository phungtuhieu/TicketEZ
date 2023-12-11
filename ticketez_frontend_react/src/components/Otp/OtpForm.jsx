import React, { useEffect, useState } from 'react';
import { Layout, Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import styles from './OtpForm.module.scss';
import authApi from '~/api/user/Security/authApi';
import funcUtils from '~/utils/funcUtils';


const { Header, Content } = Layout;


const OtpForm = () => {
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [emailForOtp, setEmailForOtp] = useState('');
    const [isOtpButtonDisabled, setOtpButtonDisabled] = useState(false);
    const [otpExpired, setOtpExpired] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let intervalId;

        if (isOtpButtonDisabled && countdown > 0) {
            intervalId = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
        } else if (countdown === 0) {
            setOtpButtonDisabled(false);
            setOtpExpired(true);
        }

        return () => clearInterval(intervalId);
    }, [isOtpButtonDisabled, countdown]);


    const onFinish = async (values) => {
        if (otpExpired) {
            funcUtils.notify('Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.', 'error');
            return;
        }
        setLoading(true);
        try {
            const response = await authApi.getVerifyAccount({
                id: values.id,
                otp: values.otp

            });
            funcUtils.notify('Xác Minh thành công !', 'success');
            navigate('/login');
        } catch (error) {
            funcUtils.notify('Kiểm tra tài khoản và Mã OTP đúng chưa', 'error');
        } finally {
            setLoading(false);
        }
    };


    const handleResendOtp = async () => {
        if (!emailForOtp) {
            funcUtils.notify('Vui lòng nhập email để nhận mã OTP.', 'error');
            return;
        }
        setOtpExpired(false);
        setOtpButtonDisabled(true);
        setCountdown(60);
        try {
            const response = await authApi.regenerateOtp(emailForOtp);
            funcUtils.notify('Mã OTP đã được gửi. Vui lòng xác minh tài khoản trong vòng 1 phút!', 'success');
            console.log(response);
        } catch (error) {
            funcUtils.notify('Có lỗi xảy ra khi gửi mã OTP. Vui lòng thử lại.', 'error');
        }

        setTimeout(() => {
            setOtpButtonDisabled(true);
        }, 60000);
    };

    return (
        <Layout className="layout">

            <Content className={styles.content}>
                <div className={styles.wrapper}>
                    <div className={styles.loginContainer}>
                        <Form
                            name="basic"
                            className={styles.loginForm}
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <div className='formLabel'>
                                <p className={styles.formLabel}><h3>Xác thực tài khoản:</h3></p>
                            </div>
                            <Form.Item
                                // label="Tên tài khoản"
                                name="id"
                                rules={[{ required: true, message: 'Không được bỏ trống tài khoản !' }]}
                                className={styles.formItem}
                            >
                                <Input placeholder="Tên Tài khoản" className={styles.input} />
                            </Form.Item>
                            <Form.Item
                                name="otp"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập mã OTP!' },
                                    { len: 6, message: 'Mã OTP phải gồm 6 chữ số!' }
                                ]}
                                className={styles.formItem}
                            >
                                <Input
                                    placeholder="Nhập mã OTP"
                                    maxLength={6}
                                    className={styles.input}
                                />
                            </Form.Item>

                            <Form.Item className={styles.formItem}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Input
                                        style={{ flex: 1, marginRight: '8px' }}
                                        placeholder="Email để nhận mã OTP"
                                        name='email'
                                        value={emailForOtp}
                                        onChange={(e) => setEmailForOtp(e.target.value)}
                                        className={styles.input}
                                    />
                                    <Button
                                        onClick={handleResendOtp}
                                        disabled={isOtpButtonDisabled}
                                        className={styles.input}
                                    >
                                        {isOtpButtonDisabled ? `Gửi lại sau (${countdown}s)` : 'Gửi mã'}
                                    </Button>

                                </div>
                            </Form.Item>

                            <Form.Item className={styles.formItem}>
                                <Button type="primary" htmlType="submit" block className={styles.loginButton} loading={loading}>
                                    Xác nhận
                                </Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </Content>

        </Layout>
    );
};

export default OtpForm;