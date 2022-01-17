import { Button, Divider, Layout, Menu, Space } from '@arco-design/web-react';
import { IconGithub } from '@arco-design/web-react/icon';
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
            <Link to="/admin">
              <MenuItem key="admin">
                Admin
              </MenuItem>
            </Link>
            <Button 
            className=''
            type='primary' icon={<IconGithub />}>Star</Button>
          </Space>
        </Menu>
        <Divider
          className="-mt-0.5"
        />
      </Header>
   
      <Outlet />
    </Layout >
  );
}