import { Divider, Layout, Menu, Space } from '@arco-design/web-react';
import { Link, Outlet } from 'react-router-dom';

const Header = Layout.Header;
const MenuItem = Menu.Item;
export default function Navbar() {
  return (
    <Layout
      className='w-full z-50'
    >
      <Header
        className=''
      >
        <Menu
          className=''
          defaultSelectedKeys={['home']}
          mode="horizontal">
          <Space
          >
            <img
              alt="logo"
              className='w-8 -mb-4 -mt-3'
              src="https://github.com/Deerhound579/my-exams/blob/master/public/logo192.png?raw=true"
            />
            <div
              className='text-transparent text-2xl bg-gradient-to-br from-orange-300 via-lime-200 to-cyan-400 bg-clip-text '
            >myExams</div>
          </Space>
          <Space
            className='-mt-12'
          >
            <Link to="/">
              <MenuItem key="home">
                Home
              </MenuItem>
            </Link>
            {/* <MenuItem key="about">
            About
          </MenuItem> */}
            <Link to="/admin">
              <MenuItem key="admin">
                Admin
              </MenuItem>
            </Link>
          </Space>

        </Menu>
        <Divider />
      </Header>
      <Outlet />
    </Layout >
  );
}