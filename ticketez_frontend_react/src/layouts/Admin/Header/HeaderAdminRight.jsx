function HeaderAdminRight() {
    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Profile</Menu.Item>
                <Menu.Item key="3">Settings</Menu.Item>
            </Menu>
            <div>
                <Button type="primary" style={{ marginRight: '10px' }}>
                    Sign in
                </Button>
                <Button>Sign up</Button>
            </div>
        </Header>
    );
}

export default HeaderAdminRight;
