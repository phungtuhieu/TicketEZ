import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, Radio, Button, Card, Avatar, DatePicker, Row, Col, Upload } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Profile.module.scss';
import authApi from '~/api/user/Security/authApi';
import moment from 'moment';
import uploadApi from '~/api/service/uploadApi';
import profileApi from '~/api/user/profile/profile';
import funcUtils from '~/utils/funcUtils';
import dayjs from 'dayjs';

const EditableProfile = () => {
  const [userData, setUserData] = useState();
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState();
  const [birthday, setBirthday] = useState(null);
  const [fileList, setFileList] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authApi.getUser();
        setUserData(user);
        form.setFieldsValue({
          ...user,
          birthday: user.birthday ? dayjs(user.birthday) : null,
          gender: user.gender,
          image: user.image


        });
        const newUploadFile = {
          name: user.image,
          url: `http://localhost:8081/api/upload/${user.image}`,
        };
        console.log(newUploadFile);
        setFileList([newUploadFile]);
        setBirthday(dayjs(user.birthday));
        // funcUtils.notify("Cập nhật thành công", 'success');
      } catch (error) {
        // funcUtils.notify("Cập nhật Thất bại", 'error');
      }
    };

    fetchData();
  }, [form]);

  const onSave = async (values) => {
    try {
      let updatedValues = {
        ...values,

      };
      if (values.image.fileList) {
        const file = values.image.fileList[0].originFileObj;
        // console.log(file);
        const image = await uploadApi.put(userData.image, file);
        updatedValues = {
          ...updatedValues,
          image: image,
        };
      }
      console.log(updatedValues, "sssssssssssss");

      const response = await profileApi.update(userData.id, updatedValues);
      setUserData(response);
      setEditing(false);
      localStorage.removeItem('user');
      localStorage.setItem('user', JSON.stringify(response.data));
      funcUtils.notify("Cập nhật thành công", 'success');
      window.location.reload();
    } catch (error) {
      funcUtils.notify("Cập nhật Thất bại", 'error');
    }
  };


  const onEdit = (values) => {
    // const newUploadFile = {
    //   name: values.image,
    //   url: `http://localhost:8081/api/upload/${values.image}`,
    // };
    // setFileList([newUploadFile]);
    setEditData(values);
    setEditing(true);
  };

  const onCancel = () => {
    setEditing(false);
  };


  const onChangePassword = () => {
    console.log('Change password clicked');
  };

  const onChangeUpload = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.values;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };


  return (
    <div className={styles.profileFormContainer}>
      <Card className={styles.profileFormCard} title="THÔNG TIN TÀI KHOẢN" bordered={false}>
        {!editing ? (
          <div className={styles.profileDisplay}>
            <div>
              {userData?.image && (
                <Avatar
                  size={64}
                  src={`http://localhost:8081/api/upload/${userData.image}`}
                />
              )}
              {!userData?.image && <Avatar size={64} icon={<UserOutlined />} />}
              <h3>{userData?.fullname}</h3>
            </div>
            <p>Chọn vào để sửa</p>
            <Button onClick={() => onEdit(userData)} type="primary">
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

                <Form.Item
                  // {...formItemLayout}
                  label="Ảnh đại diện"
                  name="image"
                  rules={[{ required: true, message: 'Vui lòng chọn ảnh đại diện' }]}
                >
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    accept=".png, .jpg"
                    listType="picture-card"
                    onChange={onChangeUpload}
                    onPreview={onPreview}
                    fileList={fileList}
                    name="image"
                    maxCount={1}
                  >
                    {fileList.length < 2 && '+ Upload'}
                  </Upload>
                </Form.Item>
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
                <Form.Item name="gender" label="Giới tính">
                  <Radio.Group>
                    <Radio value={true}>Nam</Radio>
                    <Radio value={false}>Nữ</Radio>
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
                <Form.Item
                  name="birthday"
                  label="Ngày sinh"
                  rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
                >
                  <DatePicker
                    value={birthday}
                    onChange={(date) => setBirthday(date)}
                    format="DD-MM-YYYY"
                    style={{ width: '100%' }}
                  />

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
