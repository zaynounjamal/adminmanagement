import React, { useState } from 'react';
import { Card, Avatar, Button, Modal, Form, Input, Select, Tag, Space, Tabs, Typography, Divider, Table, Tooltip, Badge, Rate, message } from 'antd';
import { 
  UserAddOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  TeamOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  GlobalOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  CrownOutlined,
  TrophyOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  skills: string[];
  projects: number;
  performance: number;
  avatar: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface Department {
  name: string;
  members: TeamMember[];
  head: TeamMember;
}

const Team: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [form] = Form.useForm();

  const departments: Department[] = [
    {
      name: 'Engineering',
      head: {
        id: '1',
        name: 'John Doe',
        role: 'Engineering Manager',
        department: 'Engineering',
        email: 'john@example.com',
        phone: '+1 234 567 8901',
        location: 'San Francisco, CA',
        joinDate: '2020-01-15',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        projects: 12,
        performance: 4.8,
        avatar: 'JD',
        social: {
          github: 'johndoe',
          linkedin: 'johndoe',
          twitter: 'johndoe',
        },
      },
      members: [
        {
          id: '2',
          name: 'Jane Smith',
          role: 'Senior Frontend Developer',
          department: 'Engineering',
          email: 'jane@example.com',
          phone: '+1 234 567 8902',
          location: 'New York, NY',
          joinDate: '2021-03-20',
          skills: ['React', 'TypeScript', 'CSS', 'UI/UX'],
          projects: 8,
          performance: 4.5,
          avatar: 'JS',
          social: {
            github: 'janesmith',
            linkedin: 'janesmith',
          },
        },
      ],
    },
    {
      name: 'Design',
      head: {
        id: '3',
        name: 'Mike Johnson',
        role: 'Design Lead',
        department: 'Design',
        email: 'mike@example.com',
        phone: '+1 234 567 8903',
        location: 'Austin, TX',
        joinDate: '2019-11-05',
        skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
        projects: 15,
        performance: 4.7,
        avatar: 'MJ',
        social: {
          linkedin: 'mikejohnson',
          twitter: 'mikejohnson',
        },
      },
      members: [],
    },
  ];

  const handleAddMember = () => {
    setIsModalVisible(true);
    setEditingMember(null);
    form.resetFields();
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setIsModalVisible(true);
    form.setFieldsValue(member);
  };

  const handleDeleteMember = (memberId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to remove this team member?',
      content: 'This action cannot be undone.',
      onOk: () => {
        // Handle member deletion
        message.success('Team member removed successfully');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      // Handle member creation/update
      setIsModalVisible(false);
      message.success(editingMember ? 'Team member updated successfully' : 'Team member added successfully');
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: TeamMember) => (
        <Space>
          <Avatar>{record.avatar}</Avatar>
          <div>
            <div>{text}</div>
            <Text type="secondary">{record.role}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Skills',
      dataIndex: 'skills',
      key: 'skills',
      render: (skills: string[]) => (
        <Space wrap>
          {skills.map(skill => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: (rating: number) => (
        <Space>
          <Rate disabled defaultValue={rating} />
          <Text>{rating.toFixed(1)}</Text>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: TeamMember) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditMember(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteMember(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2}>Team Management</Title>
          <Text type="secondary">
            Manage your team members and departments
          </Text>
        </div>
        <Button type="primary" icon={<UserAddOutlined />} onClick={handleAddMember}>
          Add Team Member
        </Button>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab={<span><TeamOutlined /> Organization</span>} key="1">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
            {departments.map(dept => (
              <Card
                key={dept.name}
                title={
                  <Space>
                    <TeamOutlined />
                    {dept.name}
                  </Space>
                }
                style={{ width: 'calc(50% - 24px)' }}
                extra={
                  <Badge
                    count={dept.members.length + 1}
                    showZero
                    style={{ backgroundColor: '#52c41a' }}
                  />
                }
              >
                <Card
                  type="inner"
                  title={
                    <Space>
                      <CrownOutlined />
                      Department Head
                    </Space>
                  }
                  style={{ marginBottom: '16px' }}
                >
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Avatar size={64}>{dept.head.avatar}</Avatar>
                    <div>
                      <Title level={4} style={{ margin: 0 }}>{dept.head.name}</Title>
                      <Text type="secondary">{dept.head.role}</Text>
                      <div style={{ marginTop: '8px' }}>
                        <Space>
                          <Tooltip title={dept.head.email}>
                            <MailOutlined />
                          </Tooltip>
                          <Tooltip title={dept.head.phone}>
                            <PhoneOutlined />
                          </Tooltip>
                          <Tooltip title={dept.head.location}>
                            <EnvironmentOutlined />
                          </Tooltip>
                          <Tooltip title={`Joined: ${dept.head.joinDate}`}>
                            <CalendarOutlined />
                          </Tooltip>
                        </Space>
                      </div>
                    </div>
                  </div>
                </Card>

                {dept.members.length > 0 && (
                  <>
                    <Divider orientation="left">Team Members</Divider>
                    <Table
                      columns={columns}
                      dataSource={dept.members}
                      pagination={false}
                      size="small"
                    />
                  </>
                )}
              </Card>
            ))}
          </div>
        </TabPane>

        <TabPane tab={<span><StarOutlined /> Performance</span>} key="2">
          <Card>
            <Table
              columns={columns}
              dataSource={departments.flatMap(dept => [dept.head, ...dept.members])}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title={editingMember ? 'Edit Team Member' : 'Add Team Member'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter full name' }]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: 'Please enter role' }]}
          >
            <Input placeholder="Enter role" />
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select department' }]}
          >
            <Select placeholder="Select department">
              {departments.map(dept => (
                <Option key={dept.name} value={dept.name}>{dept.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Enter email" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: 'Please enter location' }]}
          >
            <Input placeholder="Enter location" />
          </Form.Item>
          <Form.Item
            name="skills"
            label="Skills"
            rules={[{ required: true, message: 'Please select at least one skill' }]}
          >
            <Select
              mode="multiple"
              placeholder="Select skills"
              style={{ width: '100%' }}
            >
              <Option value="React">React</Option>
              <Option value="Node.js">Node.js</Option>
              <Option value="TypeScript">TypeScript</Option>
              <Option value="AWS">AWS</Option>
              <Option value="UI/UX">UI/UX</Option>
              <Option value="Figma">Figma</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Team; 