import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  Input, 
  Avatar, 
  List, 
  Typography, 
  Badge, 
  Tabs, 
  Space, 
  Tag, 
  Select, 
  message,
  Modal,
  Form,
  Tooltip,
  Popover,
  Divider,
  Table,
  Rate,
  Timeline,
  Statistic
} from 'antd';
import { 
  UserOutlined, 
  MessageOutlined,
  SearchOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  SendOutlined,
  PaperClipOutlined,
  SettingOutlined,
  BellOutlined,
  LockOutlined,
  EditOutlined,
  DeleteOutlined,
  FileOutlined,
  PictureOutlined,
  LinkOutlined,
  SmileOutlined,
  CustomerServiceOutlined,
  SolutionOutlined,
  TeamOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

interface SupportTicket {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  category: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
}

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
  attachments?: {
    name: string;
    url: string;
    size?: string;
  }[];
}

const Support: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isNewTicketModalVisible, setIsNewTicketModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const tickets: SupportTicket[] = [
    {
      id: '1',
      customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1 234 567 890'
      },
      subject: 'Login Issues',
      description: 'Unable to log in to my account',
      status: 'open',
      priority: 'high',
      category: 'Account',
      assignedTo: 'Support Team',
      createdAt: '2024-01-01 10:00',
      updatedAt: '2024-01-01 10:30'
    },
    {
      id: '2',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+1 234 567 891'
      },
      subject: 'Payment Problem',
      description: 'Payment not processing',
      status: 'in-progress',
      priority: 'medium',
      category: 'Billing',
      assignedTo: 'Billing Team',
      createdAt: '2024-01-02 11:00',
      updatedAt: '2024-01-02 12:00',
      rating: 4
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      sender: 'John Doe',
      content: 'Hello, I need help with my account',
      timestamp: '10:00 AM',
      type: 'text'
    },
    {
      id: '2',
      sender: 'Support Agent',
      content: 'How can I help you today?',
      timestamp: '10:05 AM',
      type: 'text'
    }
  ];

  const handleSendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;
    message.success('Message sent successfully');
    setNewMessage('');
  };

  const handleCreateTicket = () => {
    setIsNewTicketModalVisible(true);
  };

  const getStatusColor = (status: SupportTicket['status']) => {
    switch (status) {
      case 'open': return 'blue';
      case 'in-progress': return 'orange';
      case 'resolved': return 'green';
      case 'closed': return 'gray';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer: SupportTicket['customer']) => (
        <Space>
          <Avatar>{customer.name[0]}</Avatar>
          <div>
            <Text strong>{customer.name}</Text>
            <div>
              <Text type="secondary">{customer.email}</Text>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: SupportTicket['status']) => (
        <Tag color={getStatusColor(status)}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: SupportTicket['priority']) => (
        <Tag color={getPriorityColor(priority)}>
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: SupportTicket) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => setSelectedTicket(record)}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Customer Support</Title>
        <Space>
          <Button type="primary" icon={<SolutionOutlined />} onClick={handleCreateTicket}>
            New Ticket
          </Button>
        </Space>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <Statistic
            title="Open Tickets"
            value={tickets.filter(t => t.status === 'open').length}
            prefix={<ClockCircleOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="In Progress"
            value={tickets.filter(t => t.status === 'in-progress').length}
            prefix={<CustomerServiceOutlined />}
          />
        </Card>
        <Card>
          <Statistic
            title="Resolved Today"
            value={tickets.filter(t => t.status === 'resolved').length}
            prefix={<CheckCircleOutlined />}
          />
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar */}
        <div className="col-span-8">
          <Card>
            <Tabs defaultActiveKey="1" onChange={setActiveTab}>
              <TabPane tab="All Tickets" key="1">
                <Table
                  dataSource={tickets}
                  columns={columns}
                  rowKey="id"
                  onRow={(record) => ({
                    onClick: () => setSelectedTicket(record),
                  })}
                />
              </TabPane>
              <TabPane tab="Open" key="2">
                <Table
                  dataSource={tickets.filter(t => t.status === 'open')}
                  columns={columns}
                  rowKey="id"
                />
              </TabPane>
              <TabPane tab="In Progress" key="3">
                <Table
                  dataSource={tickets.filter(t => t.status === 'in-progress')}
                  columns={columns}
                  rowKey="id"
                />
              </TabPane>
            </Tabs>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="col-span-4">
          {selectedTicket ? (
            <Card>
              <div className="mb-4">
                <Space direction="vertical" size="small">
                  <Text strong>{selectedTicket.subject}</Text>
                  <Space>
                    <Tag color={getStatusColor(selectedTicket.status)}>
                      {selectedTicket.status.toUpperCase()}
                    </Tag>
                    <Tag color={getPriorityColor(selectedTicket.priority)}>
                      {selectedTicket.priority.toUpperCase()}
                    </Tag>
                  </Space>
                </Space>
              </div>

              <Divider />

              <div className="mb-4">
                <Text type="secondary">Customer Details</Text>
                <div className="mt-2">
                  <Text strong>{selectedTicket.customer.name}</Text>
                  <div>
                    <Text type="secondary">{selectedTicket.customer.email}</Text>
                  </div>
                  <div>
                    <Text type="secondary">{selectedTicket.customer.phone}</Text>
                  </div>
                </div>
              </div>

              <Divider />

              <div className="mb-4">
                <Text type="secondary">Ticket History</Text>
                <Timeline className="mt-2">
                  <Timeline.Item>Ticket created at {selectedTicket.createdAt}</Timeline.Item>
                  <Timeline.Item>Assigned to {selectedTicket.assignedTo}</Timeline.Item>
                  <Timeline.Item>Last updated at {selectedTicket.updatedAt}</Timeline.Item>
                </Timeline>
              </div>

              {selectedTicket.rating && (
                <>
                  <Divider />
                  <div className="mb-4">
                    <Text type="secondary">Customer Rating</Text>
                    <div className="mt-2">
                      <Rate disabled defaultValue={selectedTicket.rating} />
                    </div>
                  </div>
                </>
              )}
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center">
                <CustomerServiceOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                <Text type="secondary" style={{ display: 'block', marginTop: '16px' }}>
                  Select a ticket to view details
                </Text>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      <Modal
        title="Create New Ticket"
        open={isNewTicketModalVisible}
        onCancel={() => setIsNewTicketModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsNewTicketModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsNewTicketModalVisible(false)}>
            Create
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Customer Name" required>
            <Input placeholder="Enter customer name" />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item label="Phone">
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item label="Subject" required>
            <Input placeholder="Enter subject" />
          </Form.Item>
          <Form.Item label="Description" required>
            <TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
          <Form.Item label="Category" required>
            <Select placeholder="Select category">
              <Option value="account">Account</Option>
              <Option value="billing">Billing</Option>
              <Option value="technical">Technical</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Priority" required>
            <Select placeholder="Select priority">
              <Option value="high">High</Option>
              <Option value="medium">Medium</Option>
              <Option value="low">Low</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Support; 