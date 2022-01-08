import { Menu, Space } from '@arco-design/web-react';
import { Link, Outlet } from 'react-router-dom';
import { Layout } from '@arco-design/web-react';
import styles from '@/style/layout.module.less';

const Header = Layout.Header;
const MenuItem = Menu.Item;
export default function HeaderLayout() {
  return (
    <Layout>
      <Header
        className={styles['layout-navbar']}
      >
        <Menu
          defaultSelectedKeys={['home']}
          mode="horizontal">
          <Space

          >
            <img
              className={styles['navbar-logo']}
              src="https://github.com/Deerhound579/my-exams/blob/master/public/logo192.png?raw=true"
            />
            <span
              className={styles['navbar-title']}
            >myExams</span>
          </Space>
          <Link to="/">
            <MenuItem key="home">
              Home
            </MenuItem>
          </Link>
          <MenuItem key="about">
            About
          </MenuItem>
          <Link to="/admin">
            <MenuItem key="admin">
              Admin
            </MenuItem>
          </Link>
        </Menu>
      </Header>
      <Outlet />
    </Layout >
  );
}