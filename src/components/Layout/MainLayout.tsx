import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  CalendarOutlined,
  BarChartOutlined,
  MessageOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  CustomerServiceOutlined,
  BellOutlined,
  TeamOutlined,
  BookOutlined,
  CheckSquareOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'management',
      icon: <SettingOutlined />,
      label: 'Management',
      children: [
        {
          key: '/users',
          icon: <UserOutlined />,
          label: 'Users',
        },
        {
          key: '/products',
          icon: <ShoppingOutlined />,
          label: 'Products',
        },
        {
          key: '/orders',
          icon: <ShoppingCartOutlined />,
          label: 'Orders',
        },
        {
          key: '/inventory',
          icon: <DatabaseOutlined />,
          label: 'Inventory',
        },
        {
          key: '/tasks',
          icon: <CheckSquareOutlined />,
          label: 'Tasks',
        },
        {
          key: '/team',
          icon: <TeamOutlined />,
          label: 'Team',
        },
      ],
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
      children: [
        {
          key: '/analytics',
          icon: <BarChartOutlined />,
          label: 'Overview',
        },
        {
          key: '/reports',
          icon: <FileTextOutlined />,
          label: 'Reports',
        },
        {
          key: '/marketing',
          icon: <MailOutlined />,
          label: 'Marketing',
        },
      ],
    },
    {
      key: 'calendar',
      icon: <CalendarOutlined />,
      label: 'Calendar',
    },
    {
      key: 'communication',
      icon: <MessageOutlined />,
      label: 'Communication',
      children: [
        {
          key: '/messages',
          icon: <MessageOutlined />,
          label: 'Messages',
        },
        {
          key: '/notifications',
          icon: <BellOutlined />,
          label: 'Notifications',
        },
        {
          key: '/support',
          icon: <CustomerServiceOutlined />,
          label: 'Customer Support',
        },
      ],
    },
    {
      key: 'resources',
      icon: <BookOutlined />,
      label: 'Resources',
      children: [
        {
          key: '/knowledge-base',
          icon: <BookOutlined />,
          label: 'Knowledge Base',
        },
      ],
    },
    {
      key: 'account',
      icon: <ProfileOutlined />,
      label: 'Account',
      children: [
        {
          key: '/profile',
          icon: <ProfileOutlined />,
          label: 'Profile',
        },
        {
          key: '/settings',
          icon: <SettingOutlined />,
          label: 'Settings',
        },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
            style: {
              padding: '0 24px',
              fontSize: '18px',
              lineHeight: '64px',
              cursor: 'pointer',
            },
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 