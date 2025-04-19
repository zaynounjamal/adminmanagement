import React from 'react';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, BarChartOutlined } from '@ant-design/icons';


interface AdminStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  activeUsers: number;
}

const AdminInfo: React.FC = () => {
  const stats: AdminStats = {
    totalUsers: 1250,
    totalOrders: 850,
    totalRevenue: 125000,
    activeUsers: 450
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={stats.totalOrders}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
              suffix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={stats.activeUsers}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        <Col span={24}>
          <Card title="Quick Actions">
            <Button type="primary" icon={<UserOutlined />} style={{ marginRight: '10px' }}>
              Manage Users
            </Button>
            <Button type="primary" icon={<ShoppingCartOutlined />} style={{ marginRight: '10px' }}>
              View Orders
            </Button>
            <Button type="primary" icon={<DollarOutlined />}>
              View Reports
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminInfo;
