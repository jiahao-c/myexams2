import { Outlet } from 'react-router-dom';
import { Layout } from '@arco-design/web-react';

const Sider = Layout.Sider;
const Content = Layout.Content;

export function HomeBodyLayout() {
  return (
    <Layout>
      <Sider>Sider</Sider>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
}