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
  Dropdown,
  Menu
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
  SmileOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  lastActive: string;
  unreadCount: number;
  lastMessage?: {
    content: string;
    timestamp: string;
  };
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'file' | 'link';
  attachments?: {
    name: string;
    url: string;
    size?: string;
  }[];
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

const Messages: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAttachmentModalVisible, setIsAttachmentModalVisible] = useState(false);
  const [attachmentType, setAttachmentType] = useState<'file' | 'image' | 'link'>('file');

  // Sample data
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'JD',
      status: 'online',
      lastActive: 'Just now',
      unreadCount: 2,
      lastMessage: {
        content: 'Can we schedule a meeting tomorrow?',
        timestamp: '10:30 AM'
      }
    },
    {
      id: '2',
      name: 'Jane Smith',
      avatar: 'JS',
      status: 'busy',
      lastActive: '5 min ago',
      unreadCount: 0,
      lastMessage: {
        content: 'The report is ready for review',
        timestamp: 'Yesterday'
      }
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'John Doe',
      content: 'Hi, how are you?',
      timestamp: '10:20 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      sender: 'You',
      content: 'I\'m good, thanks!',
      timestamp: '10:25 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      sender: 'John Doe',
      content: 'Can we schedule a meeting tomorrow?',
      timestamp: '10:30 AM',
      status: 'delivered',
      type: 'text'
    }
  ];

  const handleSendMessage = () => {
    if (!selectedContact || !newMessage.trim()) return;
    message.success('Message sent successfully');
    setNewMessage('');
  };

  const handleAttachment = (type: 'file' | 'image' | 'link') => {
    setAttachmentType(type);
    setIsAttachmentModalVisible(true);
  };

  const getStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sent': return <ClockCircleOutlined />;
      case 'delivered': return <CheckCircleOutlined />;
      case 'read': return <CheckCircleOutlined style={{ color: '#1890ff' }} />;
      default: return null;
    }
  };

  const attachmentMenu = (
    <Menu>
      <Menu.Item key="file" icon={<FileOutlined />} onClick={() => handleAttachment('file')}>
        File
      </Menu.Item>
      <Menu.Item key="image" icon={<PictureOutlined />} onClick={() => handleAttachment('image')}>
        Image
      </Menu.Item>
      <Menu.Item key="link" icon={<LinkOutlined />} onClick={() => handleAttachment('link')}>
        Link
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Messages</Title>
        <Space>
          <Button icon={<SettingOutlined />}>Settings</Button>
        </Space>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left sidebar */}
        <div className="col-span-3">
          <Card className="mb-6">
            <Input
              placeholder="Search messages"
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Card>

          <Card>
            <List
              dataSource={contacts}
              renderItem={contact => (
                <List.Item
                  className={`cursor-pointer hover:bg-gray-50 p-2 rounded ${
                    selectedContact?.id === contact.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge dot color={contact.status === 'online' ? 'green' : 'gray'}>
                        <Avatar>{contact.avatar}</Avatar>
                      </Badge>
                    }
                    title={
                      <Space>
                        <Text strong>{contact.name}</Text>
                        {contact.unreadCount > 0 && (
                          <Badge count={contact.unreadCount} />
                        )}
                      </Space>
                    }
                    description={
                      contact.lastMessage && (
                        <Space direction="vertical" size="small">
                          <Text type="secondary" ellipsis>
                            {contact.lastMessage.content}
                          </Text>
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            {contact.lastMessage.timestamp}
                          </Text>
                        </Space>
                      )
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>

        {/* Main content */}
        <div className="col-span-9">
          {selectedContact ? (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <Space>
                  <Badge dot color={selectedContact.status === 'online' ? 'green' : 'gray'}>
                    <Avatar>{selectedContact.avatar}</Avatar>
                  </Badge>
                  <div>
                    <Text strong>{selectedContact.name}</Text>
                    <div>
                      <Text type="secondary">
                        {selectedContact.status === 'online' ? 'Online' : `Last active: ${selectedContact.lastActive}`}
                      </Text>
                    </div>
                  </div>
                </Space>
                <Space>
                  <Dropdown overlay={attachmentMenu} trigger={['click']}>
                    <Button icon={<MoreOutlined />} />
                  </Dropdown>
                </Space>
              </div>

              <Divider />

              <div className="h-[500px] overflow-y-auto mb-4">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`mb-4 ${
                      msg.sender === 'You' ? 'text-right' : 'text-left'
                    }`}
                  >
                    <div
                      className={`inline-block max-w-[70%] p-3 rounded-lg ${
                        msg.sender === 'You'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <div>{msg.content}</div>
                      <div className="text-xs mt-1">
                        <Space>
                          {msg.timestamp}
                          {msg.sender === 'You' && getStatusIcon(msg.status)}
                        </Space>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <Space.Compact style={{ width: '100%' }}>
                  <Button icon={<SmileOutlined />} />
                  <Dropdown overlay={attachmentMenu} trigger={['click']}>
                    <Button icon={<PaperClipOutlined />} />
                  </Dropdown>
                  <TextArea
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    autoSize={{ minRows: 1, maxRows: 4 }}
                    onPressEnter={e => {
                      if (!e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} />
                </Space.Compact>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <div className="text-center">
                <MessageOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                <Text type="secondary" style={{ display: 'block', marginTop: '16px' }}>
                  Select a contact to start messaging
                </Text>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Attachment Modal */}
      <Modal
        title={`Add ${attachmentType}`}
        open={isAttachmentModalVisible}
        onCancel={() => setIsAttachmentModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsAttachmentModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsAttachmentModalVisible(false)}>
            Add
          </Button>,
        ]}
      >
        <Form layout="vertical">
          {attachmentType === 'file' && (
            <Form.Item label="Upload File">
              <Input type="file" />
            </Form.Item>
          )}
          {attachmentType === 'image' && (
            <Form.Item label="Upload Image">
              <Input type="file" accept="image/*" />
            </Form.Item>
          )}
          {attachmentType === 'link' && (
            <Form.Item label="Link URL">
              <Input placeholder="Enter URL" />
            </Form.Item>
          )}
          <Form.Item label="Description">
            <Input placeholder="Add a description (optional)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Messages; 