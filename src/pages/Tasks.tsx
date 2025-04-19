import React, { useState } from 'react';
import { Card, Button, Input, Select, Tag, Space, Modal, Form, DatePicker, message, Avatar, Badge, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import type { DatePickerProps } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  dueDate: string;
  createdAt: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Implement user authentication',
      description: 'Add JWT authentication and user roles',
      status: 'in-progress',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2024-04-25',
      createdAt: '2024-04-19',
    },
    {
      id: '2',
      title: 'Design new dashboard',
      description: 'Create wireframes and mockups for the dashboard',
      status: 'todo',
      priority: 'medium',
      assignee: 'Jane Smith',
      dueDate: '2024-04-30',
      createdAt: '2024-04-19',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'default';
      case 'in-progress':
        return 'processing';
      case 'review':
        return 'warning';
      case 'done':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleAddTask = () => {
    setIsModalVisible(true);
    setEditingTask(null);
    form.resetFields();
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalVisible(true);
    form.setFieldsValue(task);
  };

  const handleDeleteTask = (taskId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setTasks(tasks.filter(task => task.id !== taskId));
        message.success('Task deleted successfully');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingTask) {
        setTasks(tasks.map(task =>
          task.id === editingTask.id ? { ...task, ...values } : task
        ));
        message.success('Task updated successfully');
      } else {
        const newTask: Task = {
          id: Date.now().toString(),
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
        };
        setTasks([...tasks, newTask]);
        message.success('Task created successfully');
      }
      setIsModalVisible(false);
    });
  };

  const columns = [
    { title: 'To Do', status: 'todo' },
    { title: 'In Progress', status: 'in-progress' },
    { title: 'Review', status: 'review' },
    { title: 'Done', status: 'done' },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Task Management</h1>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTask}>
          Add Task
        </Button>
      </div>

      <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
        {columns.map(column => (
          <Card
            key={column.status}
            title={column.title}
            style={{ minWidth: '300px', flex: 1 }}
          >
            {tasks
              .filter(task => task.status === column.status)
              .map(task => (
                <Card
                  key={task.id}
                  style={{ marginBottom: '16px' }}
                  actions={[
                    <EditOutlined key="edit" onClick={() => handleEditTask(task)} />,
                    <DeleteOutlined key="delete" onClick={() => handleDeleteTask(task.id)} />,
                  ]}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3>{task.title}</h3>
                      <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
                    </div>
                    <p>{task.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Space>
                        <Tooltip title={task.assignee}>
                          <Avatar icon={<UserOutlined />} />
                        </Tooltip>
                        <Tooltip title={`Due: ${task.dueDate}`}>
                          <ClockCircleOutlined />
                        </Tooltip>
                      </Space>
                      <Badge status={getStatusColor(task.status)} />
                    </div>
                  </div>
                </Card>
              ))}
          </Card>
        ))}
      </div>

      <Modal
        title={editingTask ? 'Edit Task' : 'Add New Task'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'todo',
            priority: 'medium',
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter task title' }]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter task description' }]}
          >
            <TextArea rows={4} placeholder="Enter task description" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select>
              <Option value="todo">To Do</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="review">Review</Option>
              <Option value="done">Done</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: 'Please select priority' }]}
          >
            <Select>
              <Option value="low">Low</Option>
              <Option value="medium">Medium</Option>
              <Option value="high">High</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="assignee"
            label="Assignee"
            rules={[{ required: true, message: 'Please select assignee' }]}
          >
            <Select>
              <Option value="John Doe">John Doe</Option>
              <Option value="Jane Smith">Jane Smith</Option>
              <Option value="Mike Johnson">Mike Johnson</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select due date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tasks; 