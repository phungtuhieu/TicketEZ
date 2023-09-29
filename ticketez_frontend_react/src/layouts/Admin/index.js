// React
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Scss

import styles from './Admin.module.scss';
import './AdminCustomAntDesgin.scss';
import classNames from 'classnames/bind';

// Ant Design
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faHouse, faSitemap, faVideo } from '@fortawesome/free-solid-svg-icons';
import HeaderAdmin from './Header';

const { Header, Sider, Content } = Layout;
const cx = classNames.bind(styles);
const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: colorBgContainer,
                        padding: 0,
                        paddingLeft: '16px',
                    }}
                >
                    <HeaderAdmin />
                </Header>
                <Menu mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item className={cx('active-menu-item')} key="1" icon={<FontAwesomeIcon icon={faHouse} />}>
                        <Link to="/admin/index">Trang chủ</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<FontAwesomeIcon icon={faVideo} />}>
                        <Link to="/admin/movie">Phim</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FontAwesomeIcon icon={faSitemap} />}>
                        <Link to="/admin/cinema-complex">Cụm rạp</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FontAwesomeIcon icon={faFilm} />}>
                        <Link to="/admin/cinema">Cụm rạp</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;
