import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { UserOutlined, ShoppingOutlined, DollarOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', sales: 4000, users: 2400 },
  { name: 'Feb', sales: 3000, users: 1398 },
  { name: 'Mar', sales: 2000, users: 9800 },
  { name: 'Apr', sales: 2780, users: 3908 },
  { name: 'May', sales: 1890, users: 4800 },
  { name: 'Jun', sales: 2390, users: 3800 },
];

const Dashboard: React.FC = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={2849}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Products"
              value={1234}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={234567}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16 }}>
        <h2>Sales & Users Overview</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
            <Line type="monotone" dataKey="users" stroke="#82ca9d" name="Users" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard; 