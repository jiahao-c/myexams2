import { Menu, Space } from '@arco-design/web-react';
import { Link, Outlet } from 'react-router-dom';
import { Layout } from '@arco-design/web-react';
import layoutStyles from '@/style/layout.module.less';
import componentStyles from '@/style/components.module.less';

const Header = Layout.Header;
const MenuItem = Menu.Item;
export default function HeaderLayout() {
  return (
    <Layout>
      <Header
        className={layoutStyles['layout-navbar']}
      >
        <Menu
          defaultSelectedKeys={['home']}
          mode="horizontal">
          <Space

          >
            <img
              className={componentStyles['navbar-logo']}
              src="https://github.com/Deerhound579/my-exams/blob/master/public/logo192.png?raw=true"
            />
            <span
              className={componentStyles['navbar-title']}
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