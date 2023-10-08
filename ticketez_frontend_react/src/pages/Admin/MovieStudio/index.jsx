import { useEffect, useState } from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import BaseTable from '~/components/Admin/BaseTable/BaseTable';
import { LayoutPageDefault } from '~/layouts';
import style from './MovieStudio.module.scss';
import classNames from 'classnames/bind';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosClient from '~/api/global/axiosClient';

const cx = classNames.bind(style);
function AdminMovieStudio() {
    const [list, setList] = useState([]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
    ];
    const handleGetList = async () => {
        try {
            const resp = await axiosClient.get('movie-studio');
            console.log(resp.data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        handleGetList();
    }, []);
    return (
        <LayoutPageDefault
            itemsBreadcrumb={[
                {
                    href: '/admin/index',
                    title: <HomeOutlined />,
                },
                {
                    title: (
                        <>
                            <span>Hãng phim</span>
                        </>
                    ),
                },
            ]}
        >
            <Row>
                <Col span={22}>
                    {/* <Title level={2} className={cx('title')}>
                        Hãng phim
                    </Title> */}
                    <h1>Hãng phim</h1>
                </Col>
                <Col span={2} className={cx('wrap-act-top-right')}>
                    <Button type="primary" size={'large'} icon={<FontAwesomeIcon icon={solidIcons.faPlus} />}>
                        Thêm
                    </Button>
                </Col>
            </Row>
            <BaseTable dataSource={list} columns={columns} />
        </LayoutPageDefault>
    );
}

export default AdminMovieStudio;
