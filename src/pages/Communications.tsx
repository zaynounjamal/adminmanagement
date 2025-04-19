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
  Divider
} from 'antd';
import { 
  VideoCameraOutlined, 
  PhoneOutlined, 
  UserOutlined, 
  MessageOutlined,
  TeamOutlined,
  FileTextOutlined,
  SearchOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  StarOutlined,
  SendOutlined,
  PaperClipOutlined,
  SettingOutlined,
  BellOutlined,
  LockOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'online' | 'offline' | 'busy' | 'away';
  lastActive: string;
}

interface Channel {
  id: string;
  name: string;
  type: 'public' | 'private' | 'direct';
  members: TeamMember[];
  unreadCount: number;
  lastMessage?: {
    content: string;
    sender: string;
    timestamp: string;
  };
}

interface Message {
  id: string;
  sender: TeamMember;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'file' | 'image' | 'link';
    name: string;
    url: string;
  }[];
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
}

const Communications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isVideoCallModalVisible, setIsVideoCallModalVisible] = useState(false);
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Doe',
      role: 'Project Manager',
      avatar: 'JD',
      status: 'online',
      lastActive: 'Just now'
    },
    {
      id: '2',
      name: 'Jane Smith',
      role: 'Developer',
      avatar: 'JS',
      status: 'busy',
      lastActive: '5 min ago'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      role: 'Designer',
      avatar: 'MJ',
      status: 'away',
      lastActive: '1 hour ago'
    }
  ];

  const channels: Channel[] = [
    {
      id: '1',
      name: 'general',
      type: 'public',
      members: teamMembers,
      unreadCount: 2,
      lastMessage: {
        content: 'Meeting at 2 PM tomorrow',
        sender: 'John Doe',
        timestamp: '10:30 AM'
      }
    },
    {
      id: '2',
      name: 'development',
      type: 'private',
      members: [teamMembers[1], teamMembers[2]],
      unreadCount: 0,
      lastMessage: {
        content: 'PR #123 is ready for review',
        sender: 'Jane Smith',
        timestamp: 'Yesterday'
      }
    }
  ];

  const handleSendMessage = () => {
    if (!selectedChannel || !newMessage.trim()) return;
    message.success('Message sent successfully');
    setNewMessage('');
  };

  const handleStartVideoCall = () => {
    setIsVideoCallModalVisible(true);
  };

  const handleSettings = () => {
    setIsSettingsModalVisible(true);
  };

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'online': return 'green';
      case 'busy': return 'red';
      case 'away': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Communications</Title>
        <Space>
          <Button icon={<VideoCameraOutlined />} onClick={handleStartVideoCall}>
            Start Video Call
          </Button>
          <Button icon={<SettingOutlined />} onClick={handleSettings}>
            Settings
          </Button>
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
            <Tabs defaultActiveKey="1" onChange={setActiveTab}>
              <TabPane tab={<span><MessageOutlined /> Messages</span>} key="1">
                <List
                  dataSource={channels}
                  renderItem={channel => (
                    <List.Item
                      className={`cursor-pointer hover:bg-gray-50 p-2 rounded ${
                        selectedChannel?.id === channel.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedChannel(channel)}
                    >
                      <List.Item.Meta
                        avatar={
                          <Badge count={channel.unreadCount}>
                            <Avatar>{channel.name[0].toUpperCase()}</Avatar>
                          </Badge>
                        }
                        title={
                          <Space>
                            <Text strong>{channel.name}</Text>
                            {channel.type === 'private' && <LockOutlined />}
                          </Space>
                        }
                        description={
                          channel.lastMessage && (
                            <Space direction="vertical" size="small">
                              <Text type="secondary" ellipsis>
                                {channel.lastMessage.content}
                              </Text>
                              <Text type="secondary" style={{ fontSize: '12px' }}>
                                {channel.lastMessage.timestamp}
                              </Text>
                            </Space>
                          )
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab={<span><TeamOutlined /> Team</span>} key="2">
                <List
                  dataSource={teamMembers}
                  renderItem={member => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Badge dot color={getStatusColor(member.status)}>
                            <Avatar>{member.avatar}</Avatar>
                          </Badge>
                        }
                        title={
                          <Space>
                            <Text strong>{member.name}</Text>
                            <Tag color="blue">{member.role}</Tag>
                          </Space>
                        }
                        description={
                          <Text type="secondary">
                            {member.status === 'online' ? 'Online' : `Last active: ${member.lastActive}`}
                          </Text>
                        }
                      />
                    </List.Item>
                  )}
                />
              </TabPane>
            </Tabs>
          </Card>
        </div>

        {/* Main content */}
        <div className="col-span-9">
          {selectedChannel ? (
            <Card>
              <div className="flex justify-between items-center mb-4">
                <Space>
                  <Avatar>{selectedChannel.name[0].toUpperCase()}</Avatar>
                  <div>
                    <Text strong>{selectedChannel.name}</Text>
                    <div>
                      <Text type="secondary">
                        {selectedChannel.members.length} members
                      </Text>
                    </div>
                  </div>
                </Space>
                <Space>
                  <Button icon={<PhoneOutlined />}>Call</Button>
                  <Button icon={<VideoCameraOutlined />}>Video</Button>
                </Space>
              </div>

              <Divider />

              <div className="h-[500px] overflow-y-auto mb-4">
                {/* Messages will be rendered here */}
                <div className="text-center text-gray-400">
                  No messages yet. Start the conversation!
                </div>
              </div>

              <div className="border-t pt-4">
                <Space.Compact style={{ width: '100%' }}>
                  <Button icon={<PaperClipOutlined />} />
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
                  Select a channel to start messaging
                </Text>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Video Call Modal */}
      <Modal
        title="Start Video Call"
        open={isVideoCallModalVisible}
        onCancel={() => setIsVideoCallModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsVideoCallModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="start" type="primary" onClick={() => setIsVideoCallModalVisible(false)}>
            Start Call
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Select Participants">
            <Select mode="multiple" placeholder="Select team members">
              {teamMembers.map(member => (
                <Option key={member.id} value={member.id}>
                  {member.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Meeting Topic">
            <Input placeholder="Enter meeting topic" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Settings Modal */}
      <Modal
        title="Communication Settings"
        open={isSettingsModalVisible}
        onCancel={() => setIsSettingsModalVisible(false)}
        footer={null}
      >
        <Tabs>
          <TabPane tab="Notifications" key="1">
            <Form layout="vertical">
              <Form.Item label="Message Notifications">
                <Select defaultValue="all">
                  <Option value="all">All Messages</Option>
                  <Option value="mentions">Only Mentions</Option>
                  <Option value="none">None</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Sound">
                <Select defaultValue="default">
                  <Option value="default">Default</Option>
                  <Option value="custom">Custom</Option>
                  <Option value="none">None</Option>
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Privacy" key="2">
            <Form layout="vertical">
              <Form.Item label="Online Status">
                <Select defaultValue="all">
                  <Option value="all">Show to Everyone</Option>
                  <Option value="team">Show to Team Only</Option>
                  <Option value="none">Hide</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Read Receipts">
                <Select defaultValue="all">
                  <Option value="all">Send to Everyone</Option>
                  <Option value="contacts">Send to Contacts Only</Option>
                  <Option value="none">Don't Send</Option>
                </Select>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
};

export default Communications; 