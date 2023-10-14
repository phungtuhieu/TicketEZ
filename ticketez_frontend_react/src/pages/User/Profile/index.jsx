import React, { useState } from 'react';
import { Card, Row, Col, Button, Input, Progress, Form, DatePicker, Radio, Select, InputNumber, Switch, Image, Upload } from 'antd';
// import 'antd/dist/antd.css';
import './Profile.module.scss';
import { FacebookFilled, GoogleCircleFilled, UploadOutlined } from '@ant-design/icons';

const ProfilePage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleImageChange = (info) => {
    if (info.file.status === 'done') {
      // Ảnh đã được tải lên thành công
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };
  return (
    <div className="container">
      <div className="main-body">
        <Row>
          <Col lg={8}>
            <Card>
              <div className="card-body">
                <div className="d-flex flex-column align-items-left text-left">
                  <Image width={200} 
                  src={imageUrl || 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/358561081_1293432168233582_652710667370024877_n.jpg?stp=dst-jpg_s320x320&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_mhoYnzSwMAAX-9-CO8&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfCnpSIHUEW7K5yPJeT3roUHGSihg3KS5Op_1FrvdVzFcg&oe=652EBC00'}  
                  alt="Admin" className="rounded-circle p-1 bg-primary"/>
                  <div className="mt-5">
                    <h4>Tên tài khoản: Phùng Tự Hiếu</h4>
                    <h4>Chức vụ: Người dùng</h4>           
                    <Upload 
                     name="image"
                     showUploadList={false}
                     action="URL_for_image_upload"
                     onChange={handleImageChange}
                    >
                    <Button icon={<UploadOutlined />} type="primary">Cập nhật ảnh</Button>
                  </Upload>
 
                    <Button>Message</Button>
                  </div>
                </div>
                <hr className="my-4" />
                <ul className="list-group list-group-flush">
              
                   <span style={{ fontWeight: 'bold', marginLeft: '8px' }}>  <FacebookFilled/> https://www.facebook.com/PTH.Looper</span>
              <br />
                      <span style={{ fontWeight: 'bold', marginLeft: '8px' }}> <GoogleCircleFilled/> https://www.facebook.com/PTH.Looper</span>
                </ul>
              </div>
            </Card>
          </Col>
          <Col lg={12}>
            <Card>
              <div className="card-body">
                <h1>Hồ Sơ Cá Nhân</h1>
                <hr className="my-4" />
                <Form
                 labelCol={{
                  span: 12,
                }}
                wrapperCol={{
                  span: 16,
                }}
                  name="basic"
                  style={{
                    maxWidth: 800,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Họ và tên"
                        name="fullname"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your full name!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Số điện thoại"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your phone!',
                          },
                        ]}
                      >
                        <InputNumber style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your email!',
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Ngày sinh"
                        name="birthday"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your birthday!',
                          },
                        ]}
                      >
                        <DatePicker style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                    <Form.Item
                        label="Số điểm"
                        name="points"
                        readOnly 
                        rules={[
                          {
                            required: true,
                            message: 'Please input your points!',
                          },
                        ]}
                      >
                        <InputNumber style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                    <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your gender!',
                      },
                    ]}
                  >
                    <Switch />
                  </Form.Item>
                    </Col>
                 
                  </Row>         
                  <Form.Item
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                  </Form.Item>
                </Form>


              </div>
            </Card>
            {/* <Row gutter={20}>
              <Col span={20}>
                <Card>
                  <div className="card-body">
                    <h5 className="d-flex align-items-center mb-3">Project Status</h5>
                    <p>Web Design</p>
                    <Progress percent={80} status="active" />
                    <p>Website Markup</p>
                    <Progress percent={72} status="active" />
                    <p>One Page</p>
                    <Progress percent={89} status="active" />
                    <p>Mobile Template</p>
                    <Progress percent={55} status="active" />
                    <p>Backend API</p>
                    <Progress percent={66} status="active" />
                  </div>
                </Card>
              </Col>
            </Row> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProfilePage;
