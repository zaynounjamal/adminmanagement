import React, { useState } from 'react';
import { Card, Button, Table, Space, Tag, Typography, Avatar, Tooltip, Select, Input, Modal, Form, List, Badge, Tabs, Statistic, Row, Col, Progress, DatePicker, Radio, message } from 'antd';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined, 
  MailOutlined, 
  MessageOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  EyeOutlined,
  LikeOutlined,
  CommentOutlined,
  DollarOutlined,
  CalendarOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'social' | 'ad' | 'content';
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  targetAudience: string;
  metrics: {
    reach: number;
    engagement: number;
    conversions: number;
    revenue: number;
  };
  channels: string[];
  team: string[];
}

const Marketing: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Summer Sale 2024',
      type: 'email',
      status: 'active',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      budget: 50000,
      spent: 25000,
      targetAudience: 'Existing Customers',
      metrics: {
        reach: 15000,
        engagement: 4500,
        conversions: 750,
        revenue: 150000,
      },
      channels: ['Email', 'Social Media'],
      team: ['John Doe', 'Jane Smith'],
    },
    {
      id: '2',
      name: 'Product Launch',
      type: 'social',
      status: 'scheduled',
      startDate: '2024-07-15',
      endDate: '2024-08-15',
      budget: 75000,
      spent: 0,
      targetAudience: 'Tech Enthusiasts',
      metrics: {
        reach: 0,
        engagement: 0,
        conversions: 0,
        revenue: 0,
      },
      channels: ['Facebook', 'Instagram', 'LinkedIn'],
      team: ['Mike Johnson', 'Sarah Wilson'],
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'scheduled':
        return 'blue';
      case 'active':
        return 'green';
      case 'completed':
        return 'purple';
      case 'paused':
        return 'orange';
      default:
        return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <MailOutlined />;
      case 'social':
        return <MessageOutlined />;
      case 'ad':
        return <BarChartOutlined />;
      case 'content':
        return <PieChartOutlined />;
      default:
        return null;
    }
  };

  const handleAddCampaign = () => {
    setIsModalVisible(true);
    setSelectedCampaign(null);
    form.resetFields();
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsModalVisible(true);
    form.setFieldsValue(campaign);
  };

  const handleDeleteCampaign = (campaignId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this campaign?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setCampaigns(campaigns.filter(c => c.id !== campaignId));
      },
    });
  };

  const columns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Campaign) => (
        <Space>
          {getTypeIcon(record.type)}
          <div>
            <div>{text}</div>
            <Text type="secondary">{record.targetAudience}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Timeline',
      key: 'timeline',
      render: (_: any, record: Campaign) => (
        <Space>
          <CalendarOutlined />
          <Text>{record.startDate} - {record.endDate}</Text>
        </Space>
      ),
    },
    {
      title: 'Budget',
      key: 'budget',
      render: (_: any, record: Campaign) => (
        <Space direction="vertical" size="small">
          <Progress
            percent={Math.round((record.spent / record.budget) * 100)}
            size="small"
            status={record.spent > record.budget ? 'exception' : 'normal'}
          />
          <Text type="secondary">
            ${record.spent.toLocaleString()} / ${record.budget.toLocaleString()}
          </Text>
        </Space>
      ),
    },
    {
      title: 'Metrics',
      key: 'metrics',
      render: (_: any, record: Campaign) => (
        <Space direction="vertical" size="small">
          <Space>
            <EyeOutlined />
            <Text>{record.metrics.reach.toLocaleString()}</Text>
          </Space>
          <Space>
            <LikeOutlined />
            <Text>{record.metrics.engagement.toLocaleString()}</Text>
          </Space>
          <Space>
            <DollarOutlined />
            <Text>${record.metrics.revenue.toLocaleString()}</Text>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Team',
      key: 'team',
      render: (_: any, record: Campaign) => (
        <Avatar.Group>
          {record.team.map(member => (
            <Tooltip key={member} title={member}>
              <Avatar>{member[0]}</Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Campaign) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditCampaign(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteCampaign(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2}>Marketing Campaigns</Title>
          <Text type="secondary">
            Manage and track your marketing campaigns
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCampaign}>
          New Campaign
        </Button>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Campaigns"
              value={campaigns.filter(c => c.status === 'active').length}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Budget"
              value={campaigns.reduce((sum, c) => sum + c.budget, 0)}
              prefix={<DollarOutlined />}
              formatter={value => `$${Number(value).toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Reach"
              value={campaigns.reduce((sum, c) => sum + c.metrics.reach, 0)}
              prefix={<EyeOutlined />}
              formatter={value => Number(value).toLocaleString()}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={campaigns.reduce((sum, c) => sum + c.metrics.revenue, 0)}
              prefix={<DollarOutlined />}
              formatter={value => `$${Number(value).toLocaleString()}`}
            />
          </Card>
        </Col>
      </Row>

      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><BarChartOutlined /> All Campaigns</span>} key="1">
            <Table
              columns={columns}
              dataSource={campaigns}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab={<span><LineChartOutlined /> Analytics</span>} key="2">
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <Title level={4}>Campaign Performance</Title>
              <Text type="secondary">Analytics dashboard coming soon</Text>
            </div>
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={selectedCampaign ? 'Edit Campaign' : 'New Marketing Campaign'}
        open={isModalVisible}
        onOk={() => {
          form.validateFields().then(values => {
            if (selectedCampaign) {
              setCampaigns(campaigns.map(c =>
                c.id === selectedCampaign.id ? { ...c, ...values } : c
              ));
            } else {
              const newCampaign: Campaign = {
                id: Date.now().toString(),
                ...values,
                spent: 0,
                metrics: {
                  reach: 0,
                  engagement: 0,
                  conversions: 0,
                  revenue: 0,
                },
              };
              setCampaigns([...campaigns, newCampaign]);
            }
            setIsModalVisible(false);
          });
        }}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Campaign Name"
            rules={[{ required: true, message: 'Please enter campaign name' }]}
          >
            <Input placeholder="Enter campaign name" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Campaign Type"
            rules={[{ required: true, message: 'Please select campaign type' }]}
          >
            <Radio.Group>
              <Radio.Button value="email">Email</Radio.Button>
              <Radio.Button value="social">Social Media</Radio.Button>
              <Radio.Button value="ad">Advertising</Radio.Button>
              <Radio.Button value="content">Content</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="scheduled">Scheduled</Option>
              <Option value="active">Active</Option>
              <Option value="completed">Completed</Option>
              <Option value="paused">Paused</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="targetAudience"
            label="Target Audience"
            rules={[{ required: true, message: 'Please enter target audience' }]}
          >
            <Input placeholder="Enter target audience" />
          </Form.Item>
          <Form.Item
            name="budget"
            label="Budget"
            rules={[{ required: true, message: 'Please enter budget' }]}
          >
            <Input type="number" prefix="$" placeholder="Enter budget" />
          </Form.Item>
          <Form.Item
            name="channels"
            label="Channels"
            rules={[{ required: true, message: 'Please select channels' }]}
          >
            <Select mode="multiple">
              <Option value="Email">Email</Option>
              <Option value="Facebook">Facebook</Option>
              <Option value="Instagram">Instagram</Option>
              <Option value="LinkedIn">LinkedIn</Option>
              <Option value="Twitter">Twitter</Option>
              <Option value="Google Ads">Google Ads</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="team"
            label="Team Members"
            rules={[{ required: true, message: 'Please select team members' }]}
          >
            <Select mode="multiple">
              <Option value="John Doe">John Doe</Option>
              <Option value="Jane Smith">Jane Smith</Option>
              <Option value="Mike Johnson">Mike Johnson</Option>
              <Option value="Sarah Wilson">Sarah Wilson</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dateRange"
            label="Campaign Period"
            rules={[{ required: true, message: 'Please select campaign period' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Marketing; 