import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormDisabledDemo = () => {
    const [componentDisabled, setComponentDisabled] = useState(false);
    return (
        <>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                    maxWidth: 600,
                }}
            >
                <Form.Item label="ID">
                    <Input />
                </Form.Item>
                <Form.Item label="Name">
                    <Input />
                </Form.Item>

                <Form.Item label="Trạng thái">
                    <Select>
                        <Select.Option value="Có người đặt">Có người đặt</Select.Option>
                        <Select.Option value="Có còn trống">Còn trống</Select.Option>
                        <Select.Option value="Có Có người đặt">Đang sửa chữa</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="ID rạp">
                    <Input />
                </Form.Item>
                <Form.Item label="Loại ghế">
                    <Select>
                        <Select.Option value="Có người đặt">Ghế vip</Select.Option>
                        <Select.Option value="Có còn trống">Ghế thường</Select.Option>
                        <Select.Option value="Có Có người đặt">Ghế đôi</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </>
    );
};
export default FormDisabledDemo;
