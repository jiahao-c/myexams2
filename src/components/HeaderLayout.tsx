import { Menu, Space } from '@arco-design/web-react';
import { Link, Outlet, Route } from 'react-router-dom';
import { Layout } from '@arco-design/web-react';

const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;

const MenuItem = Menu.Item;
export default function HeaderLayout() {
  return (
    <Layout>
      <Header>
        <Menu
          style={{
            boxSizing: 'border-box',
            overflowY: 'auto',
          }}
          defaultSelectedKeys={['home']}
          mode="horizontal">
          <Space

          >
            <img
              style={{ width: '2em', marginBottom: -10 }}
              src="https://github.com/Deerhound579/my-exams/blob/master/public/logo192.png?raw=true"
            />
            <span
              style={{
                fontSize: '1.5em',
                // marginLeft: '0.5em',
                // marginBottom: '1em',
                background: "linear-gradient(135deg, orange, orange 40%, cyan)",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
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