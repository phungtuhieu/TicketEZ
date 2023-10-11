import React, { useState } from 'react';
import { Radio, Tag } from 'antd';

const radioStyle = {
    display: 'block',
    marginBottom: '10px',
    lineHeight: '1.5', // Chiều cao của Radio.Button
};

const radioStyl = {
  display: 'flex',
  flexDirection: 'column', // Hiển thị các tùy chọn theo chiều dọc
  alignItems: 'flex-start', // Đẩy các tùy chọn về phía trái
};
const App = () => {
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    return (
        <Radio.Group style={radioStyl}  onChange={onChange} value={value}>
            <Radio style={radioStyle} value={1}>
                <Tag color="#404040">Đã đặt</Tag>
            </Radio>
            <Radio style={radioStyle} value={2}>
                <Tag color="#208135">ghế bạn chọn</Tag>
            </Radio>
            <Radio style={radioStyle} value={3}>
                <Tag color="#b7232b">Ghế vip</Tag>
            </Radio>
            <Radio style={radioStyle} value={4}>
                <Tag color="#5b2b9f">Ghế thường</Tag>
            </Radio>
        </Radio.Group>
    );
};

export default App;
