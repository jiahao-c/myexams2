import { Outlet } from 'react-router-dom';
import { Layout } from '@arco-design/web-react';

const Content = Layout.Content;

export function AdminBodyLayout() {
    return (
        <Layout>
            <Content>
                <Outlet />
            </Content>
        </Layout>
    );
}