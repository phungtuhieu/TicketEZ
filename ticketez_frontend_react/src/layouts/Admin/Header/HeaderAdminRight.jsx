
import { SearchOutlined } from "@ant-design/icons";
import { faBell, faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, Input, Dropdown } from "antd";
import React, { } from "react";
import style from './AdminHeader.module.scss';
import classNames from 'classnames/bind';
import { Menu } from 'antd';

const cx = classNames.bind(style);

function HeaderAdminRight() {

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
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    cài đặt 1
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
            {/* Đặt nội dung header phụ ở đây */}
            <Row style={{ width: '100%' }}>
                <Col
                    lg={15}
                    xs={24}
                    style={{ display: 'flex', alignItems: 'center', width: '100px' }}
                >
                    <div>
                        <span className={cx('title-left')}>Home /</span>
                        <span className={cx('name-left')}> Dashboard</span>
                    </div>
                </Col>
                <Col lg={9} xs={24} className={cx('item-hearder-right')} flex={1}>
                    <Input
                        className={cx('search-item-hearder-right')}
                        placeholder="Enter your username"
                        type="search"
                        prefix={<SearchOutlined className="site-form-item-icon" />}
                    />
                    <span className={cx('icon-item-hearder-right')}>
                        <FontAwesomeIcon icon={faUser} /> Đăng nhập
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
