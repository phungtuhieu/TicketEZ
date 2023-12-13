import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const Unauthorized = () => (
    <Result
        status="403"
        title={<h2>Opps...</h2>}
        subTitle={
            <>
            <h3>Xin lỗi bạn không có quyền truy cập trang này.</h3>
            <h3>Vui lòng quay lại sau!.</h3>
          </>
        }
        extra={
            <Link to={'/admin/index'} type="">
                <Button>Về trang chủ</Button>
            </Link>
        }
    />
);
export default Unauthorized;
