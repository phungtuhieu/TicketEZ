import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Radio, Button, Card, Avatar, DatePicker, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Profile.module.scss';
import authApi from '~/api/user/Security/authApi';
import moment from 'moment';
import uploadApi from '~/api/service/uploadApi';
import profileApi from '~/api/user/profile/profile';
import funcUtils from '~/utils/funcUtils';

const EditableProfile = () => {
  const [userData, setUserData] = useState();
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();
  const [fileList, setFileList] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authApi.getUser();
        setUserData(user);
        console.log(user);
        form.setFieldsValue({
          ...user,
          birthday: user.birthday ? moment(user.birthday) : null,

        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const onSave = async (values) => {
    try {

      const response = await profileApi.putUser(userData.id, values);
      setUserData(response);
      setEditing(false);
      console.log(response);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(response.data));
      window.location.reload();
      funcUtils.notify("Cập nhật thành công", 'success');
    } catch (error) {
      funcUtils.notify("Cập nhật Thất bại", 'error');

    }
  };




  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const onEditAvatar = () => {
    fileInputRef.current.click();
  };

  const onEdit = () => {
    setEditing(true);
  };

  const onCancel = () => {
    setEditing(false);
  };


  const onChangePassword = () => {
    console.log('Change password clicked');
  };

  return (
    <div className={styles.profileFormContainer}>
      <Card className={styles.profileFormCard} title="THÔNG TIN TÀI KHOẢN" bordered={false}>
        {/* <div className="clsss"> <span>Xin chào, {userData.fullname}</span></div> */}
        <div className={styles.avatarContainer} onClick={editing ? onEditAvatar : undefined}>
          {selectedImage ? (
            <img src={selectedImage} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          ) : (
            userData?.image ? (
              <Avatar size={100} src={uploadApi.get(userData.image)} alt={`${userData?.id}'s avatar`} />
            ) : (
              <Avatar size={100} icon={<UserOutlined />} />
            )
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </div>


        {!editing ? (
          <div className={styles.profileDisplay}>
            <p>Chọn vào để sửa</p>
            <Button onClick={onEdit} type="primary">
              Sửa thông tin cá nhân
            </Button>
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={onSave}

          >
            <Row gutter={16}>
              <Col span={12}>
                {/* Left Column */}
                <Form.Item
                  name="id"
                  label="Tên Tài khoản"
                  rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                >
                  <Input
                    placeholder="Tên tài khoản"
                    value={userData?.id} s
                    disabled
                    readOnly
                  />
                </Form.Item>


                <Form.Item
                  name="fullname"
                  initialValue={userData.fullname}
                  label="Họ & Tên"
                  rules={[{ required: true, message: 'Vui lòng nhập họ và' }]} >
                  <Input />
                </Form.Item>
                <Form.Item initialValue={userData.gender} name="gender" label="Giới tính">

                  <Radio.Group>

                    <Radio value="1">Nam</Radio>
                    <Radio value="0">Nữ</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="address" label="Địa chỉii" rules={[{ required: true }]} initialValue={userData.address}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                {/* Right Column */}
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true }]} initialValue={userData.phone}>
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Emailiii" rules={[{ required: true }]} initialValue={userData.email}>
                  <Input />
                </Form.Item>
                <Form.Item name="birthday" label="Ngày sinh" rules={[{ required: true }]}>
                  <DatePicker format="DD-MM-YYYY" />
                </Form.Item>

                <Form.Item name="" label="Đổi mật khẩu" >
                  <Button onClick={onChangePassword} icon={<LockOutlined />} type="default">
                    Đổi mật khẩu
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Button onClick={onCancel}>
                Hủy sửa thông tin
              </Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: '8px' }}>
                Lưu thông tin
              </Button>
            </Form.Item>

          </Form>
        )}
      </Card>
    </div>
  );
};

export default EditableProfile;
