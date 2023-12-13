import { SearchOutlined } from '@ant-design/icons';
import { faBell, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Input, Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import style from './AdminHeader.module.scss';
import classNames from 'classnames/bind';
import { Menu } from 'antd';
import authApi from '~/api/user/Security/authApi';
import funcUtils from '~/utils/funcUtils';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);



function HeaderAdminRight() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const user = await authApi.getUser();
                setUserData(user);
                console.log(user);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [loading]);

    const handleLogout = async () => {
        try {
            authApi.logout();
            localStorage.clear();
            funcUtils.notify('Đăng Xuất thành công!', 'success');
            navigate('/');
        } catch (error) {
            funcUtils.notify('Đăng Xuất Thất Bại!', 'error');
        }
    };

    const itemsBell = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            ),
        },
    ];

    const itemSetting = [
        {
            key: '1',
            label: (
                <a target="_self" onClick={handleLogout} rel="noopener noreferrer">
                    Đăng xuất
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    cài đặt 2
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    cài đặt 3
                </a>
            ),
        },
    ];

    const menuItemsBell = (
        <Menu>
            {itemsBell.map((item) => (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
        </Menu>
    );
    const menuItemsSetting = (
        <Menu>
            {itemSetting.map((item) => (
                <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
        </Menu>
    );

    return (
        <>
            <Row style={{ width: '100%' }} className="background">
                <Col lg={15} xs={24} style={{ display: 'flex', alignItems: 'center', width: '100px' }}>
                    {/* <div>
                        <span className={cx('title-left')}>Home /</span>
                        <span className={cx('name-left')}> Dashboard</span>
                    </div> */}
                    <span className="name-short">
                        Xin chào,{' '}
                        {userData?.fullname == null || userData?.fullname == undefined
                            ? ''
                            : userData.fullname.split(' ').pop()}
                    </span>
                </Col>
                <Col lg={9} xs={24} className={cx('item-hearder-right')} flex={1}>
                    <Input
                        className={cx('search-item-hearder-right')}
                        placeholder="Enter your username"
                        type="search"
                        prefix={<SearchOutlined className="site-form-item-icon" />}
                    />
                    <span className={cx('icon-item-hearder-right')}>
                        <FontAwesomeIcon icon={faUser} />
                    </span>
                    <Dropdown
                        overlay={menuItemsBell}
                        placement="bottomRight"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <FontAwesomeIcon icon={faBell} className={cx('icon-item-hearder-right')} />
                    </Dropdown>

                    <Dropdown
                        overlay={menuItemsSetting}
                        placement="bottomRight"
                        arrow={{
                            pointAtCenter: true,
                        }}
                    >
                        <FontAwesomeIcon icon={faGear} className={cx('icon-item-hearder-right')} />
                    </Dropdown>
                </Col>
            </Row>
        </>
    );
}

export default HeaderAdminRight;
