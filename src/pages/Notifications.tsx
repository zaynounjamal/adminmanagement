import React, { useState } from 'react';
import { 
  Card, 
  Button, 
  List, 
  Typography, 
  Badge, 
  Tabs, 
  Space, 
  Tag, 
  Avatar, 
  Switch,
  Divider,
  Dropdown,
  Menu,
  Tooltip
} from 'antd';
import { 
  BellOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  WarningOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
  DeleteOutlined,
  CheckOutlined,
  MoreOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface Notification {
  id: string;
  type: 'system' | 'team' | 'task' | 'message';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  action?: {
    type: 'link' | 'button';
    label: string;
    onClick: () => void;
  };
}

const Notifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'system',
      title: 'System Update Available',
      description: 'A new version of the application is available. Click to update.',
      timestamp: '10 minutes ago',
      read: false,
      priority: 'high',
      action: {
        type: 'button',
        label: 'Update Now',
        onClick: () => console.log('Update clicked')
      }
    },
    {
      id: '2',
      type: 'team',
      title: 'New Team Member',
      description: 'John Doe has joined the Development team.',
      timestamp: '1 hour ago',
      read: false,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'task',
      title: 'Task Assigned',
      description: 'You have been assigned to review PR #123',
      timestamp: '2 hours ago',
      read: true,
      priority: 'high',
      action: {
        type: 'link',
        label: 'View PR',
        onClick: () => console.log('View PR clicked')
      }
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message',
      description: 'You have 3 unread messages from Jane Smith',
      timestamp: 'Yesterday',
      read: true,
      priority: 'low'
    }
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'system': return <SettingOutlined />;
      case 'team': return <TeamOutlined />;
      case 'task': return <FileTextOutlined />;
      case 'message': return <UserOutlined />;
      default: return <BellOutlined />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'default';
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const moreMenu = (
    <Menu>
      <Menu.Item key="markAll" icon={<CheckOutlined />} onClick={handleMarkAllAsRead}>
        Mark all as read
      </Menu.Item>
      <Menu.Item key="clearAll" icon={<DeleteOutlined />} onClick={handleClearAll}>
        Clear all
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Notifications</Title>
        <Space>
          <Dropdown overlay={moreMenu} trigger={['click']}>
            <Button icon={<MoreOutlined />}>More</Button>
          </Dropdown>
        </Space>
      </div>

      <Card>
        <Tabs defaultActiveKey="1" onChange={setActiveTab}>
          <TabPane tab="All" key="1">
            <List
              dataSource={notifications}
              renderItem={notification => (
                <List.Item
                  className={`p-4 hover:bg-gray-50 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  actions={[
                    <Tooltip title="Mark as read">
                      <Button
                        type="text"
                        icon={<CheckCircleOutlined />}
                        onClick={() => handleMarkAsRead(notification.id)}
                      />
                    </Tooltip>,
                    <Tooltip title="Delete">
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(notification.id)}
                      />
                    </Tooltip>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge dot={!notification.read}>
                        <Avatar icon={getNotificationIcon(notification.type)} />
                      </Badge>
                    }
                    title={
                      <Space>
                        <Text strong>{notification.title}</Text>
                        <Tag color={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size="small">
                        <Text type="secondary">{notification.description}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {notification.timestamp}
                        </Text>
                        {notification.action && (
                          <Button
                            type="link"
                            onClick={notification.action.onClick}
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
          <TabPane tab="Unread" key="2">
            <List
              dataSource={notifications.filter(n => !n.read)}
              renderItem={notification => (
                <List.Item
                  className="p-4 hover:bg-gray-50 bg-blue-50"
                  actions={[
                    <Button
                      type="text"
                      icon={<CheckCircleOutlined />}
                      onClick={() => handleMarkAsRead(notification.id)}
                    />,
                    <Button
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(notification.id)}
                    />
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge dot>
                        <Avatar icon={getNotificationIcon(notification.type)} />
                      </Badge>
                    }
                    title={
                      <Space>
                        <Text strong>{notification.title}</Text>
                        <Tag color={getPriorityColor(notification.priority)}>
                          {notification.priority}
                        </Tag>
                      </Space>
                    }
                    description={
                      <Space direction="vertical" size="small">
                        <Text type="secondary">{notification.description}</Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {notification.timestamp}
                        </Text>
                        {notification.action && (
                          <Button
                            type="link"
                            onClick={notification.action.onClick}
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Notifications; 