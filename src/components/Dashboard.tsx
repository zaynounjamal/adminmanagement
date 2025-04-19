import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import AdminInfo from './AdminInfo';
import UserList from './UserList';

const { Header, Sider, Content } = Layout;

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Users',
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: 'Orders',
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
  ];

  const renderContent = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <AdminInfo />;
      case 'users':
        return <UserList />;
      case 'orders':
        return <div>Orders Content</div>;
      case 'analytics':
        return <div>Analytics Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return <AdminInfo />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          defaultSelectedKeys={['dashboard']}
          mode="inline"
          items={menuItems}
          onClick={({ key }) => setSelectedMenu(key)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px', padding: 24, background: colorBgContainer }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard; 