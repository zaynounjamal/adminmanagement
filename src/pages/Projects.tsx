import React, { useState } from 'react';
import { Card, Button, Table, Space, Tag, Typography, Progress, Timeline, Avatar, Tooltip, Select, DatePicker, Input, Modal, Form } from 'antd';
import { 
  TeamOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

interface Project {
  id: string;
  name: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  manager: string;
  team: string[];
  budget: number;
  spent: number;
  description: string;
}

interface Task {
  id: string;
  projectId: string;
  name: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  startDate: string;
  endDate: string;
  assignee: string;
  dependencies: string[];
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      status: 'in-progress',
      progress: 65,
      startDate: '2024-04-01',
      endDate: '2024-06-30',
      manager: 'John Doe',
      team: ['Jane Smith', 'Mike Johnson', 'Sarah Wilson'],
      budget: 50000,
      spent: 32500,
      description: 'Complete redesign of company website with modern UI/UX',
    },
    {
      id: '2',
      name: 'Mobile App Development',
      status: 'planning',
      progress: 20,
      startDate: '2024-05-01',
      endDate: '2024-08-31',
      manager: 'Jane Smith',
      team: ['John Doe', 'Mike Johnson'],
      budget: 75000,
      spent: 15000,
      description: 'Development of cross-platform mobile application',
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      projectId: '1',
      name: 'UI Design',
      status: 'done',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      assignee: 'Sarah Wilson',
      dependencies: [],
    },
    {
      id: '2',
      projectId: '1',
      name: 'Frontend Development',
      status: 'in-progress',
      startDate: '2024-04-16',
      endDate: '2024-05-15',
      assignee: 'Mike Johnson',
      dependencies: ['1'],
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'blue';
      case 'in-progress':
        return 'orange';
      case 'review':
        return 'purple';
      case 'completed':
        return 'green';
      default:
        return 'default';
    }
  };

  const handleAddProject = () => {
    setIsModalVisible(true);
    setSelectedProject(null);
    form.resetFields();
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalVisible(true);
    form.setFieldsValue(project);
  };

  const handleDeleteProject = (projectId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this project?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setProjects(projects.filter(p => p.id !== projectId));
        setTasks(tasks.filter(t => t.projectId !== projectId));
      },
    });
  };

  const columns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Project) => (
        <Space>
          <FileTextOutlined />
          <div>
            <div>{text}</div>
            <Text type="secondary">{record.description}</Text>
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
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: 'Timeline',
      key: 'timeline',
      render: (_: any, record: Project) => (
        <Space>
          <CalendarOutlined />
          <Text>{record.startDate} - {record.endDate}</Text>
        </Space>
      ),
    },
    {
      title: 'Team',
      key: 'team',
      render: (_: any, record: Project) => (
        <Avatar.Group>
          <Tooltip title={record.manager}>
            <Avatar style={{ backgroundColor: '#1890ff' }}>{record.manager[0]}</Avatar>
          </Tooltip>
          {record.team.map(member => (
            <Tooltip key={member} title={member}>
              <Avatar>{member[0]}</Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: 'Budget',
      key: 'budget',
      render: (_: any, record: Project) => (
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
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Project) => (
        <Space>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditProject(record)}
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteProject(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2}>Project Management</Title>
          <Text type="secondary">
            Track and manage your projects and resources
          </Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProject}>
          Add Project
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={projects}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ margin: 0 }}>
                <Title level={4}>Project Timeline</Title>
                <Timeline>
                  {tasks
                    .filter(task => task.projectId === record.id)
                    .map(task => (
                      <Timeline.Item
                        key={task.id}
                        color={
                          task.status === 'done' ? 'green' :
                          task.status === 'in-progress' ? 'blue' :
                          task.status === 'review' ? 'orange' : 'gray'
                        }
                      >
                        <Space direction="vertical" size="small">
                          <Text strong>{task.name}</Text>
                          <Space>
                            <UserOutlined />
                            <Text>{task.assignee}</Text>
                            <ClockCircleOutlined />
                            <Text>{task.startDate} - {task.endDate}</Text>
                          </Space>
                        </Space>
                      </Timeline.Item>
                    ))}
                </Timeline>
              </div>
            ),
          }}
        />
      </Card>

      <Modal
        title={selectedProject ? 'Edit Project' : 'Add New Project'}
        open={isModalVisible}
        onOk={() => {
          form.validateFields().then(values => {
            if (selectedProject) {
              setProjects(projects.map(p =>
                p.id === selectedProject.id ? { ...p, ...values } : p
              ));
            } else {
              const newProject: Project = {
                id: Date.now().toString(),
                ...values,
                progress: 0,
                spent: 0,
              };
              setProjects([...projects, newProject]);
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
            label="Project Name"
            rules={[{ required: true, message: 'Please enter project name' }]}
          >
            <Input placeholder="Enter project name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter project description' }]}
          >
            <TextArea rows={4} placeholder="Enter project description" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="planning">Planning</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="review">Review</Option>
              <Option value="completed">Completed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="manager"
            label="Project Manager"
            rules={[{ required: true, message: 'Please select project manager' }]}
          >
            <Select>
              <Option value="John Doe">John Doe</Option>
              <Option value="Jane Smith">Jane Smith</Option>
              <Option value="Mike Johnson">Mike Johnson</Option>
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
            name="budget"
            label="Budget"
            rules={[{ required: true, message: 'Please enter budget' }]}
          >
            <Input type="number" prefix="$" placeholder="Enter budget" />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="endDate"
            label="End Date"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Projects; 