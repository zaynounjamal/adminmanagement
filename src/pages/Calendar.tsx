import React, { useState } from 'react';
import { Calendar, Modal, Form, Input, Select, Button, List, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  type: 'meeting' | 'task' | 'reminder';
  status: 'pending' | 'completed' | 'cancelled';
}

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Team Meeting',
      description: 'Weekly team sync',
      date: '2024-03-20',
      type: 'meeting',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Project Deadline',
      description: 'Submit final report',
      date: '2024-03-25',
      type: 'task',
      status: 'pending',
    },
    {
      id: 3,
      title: 'Client Call',
      description: 'Discuss project requirements',
      date: '2024-03-22',
      type: 'meeting',
      status: 'pending',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [form] = Form.useForm();

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting':
        return 'blue';
      case 'task':
        return 'green';
      case 'reminder':
        return 'orange';
      default:
        return 'default';
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'completed':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const handleAdd = () => {
    setEditingEvent(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    form.setFieldsValue(event);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this event?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setEvents(events.filter(event => event.id !== id));
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingEvent) {
        setEvents(events.map(event =>
          event.id === editingEvent.id ? { ...values, id: editingEvent.id } : event
        ));
      } else {
        const newEvent = {
          ...values,
          id: Math.max(...events.map(e => e.id), 0) + 1,
        };
        setEvents([...events, newEvent]);
      }
      setIsModalVisible(false);
    });
  };

  const dateCellRender = (date: dayjs.Dayjs) => {
    const formattedDate = date.format('YYYY-MM-DD');
    const dayEvents = events.filter(event => event.date === formattedDate);

    return (
      <div>
        {dayEvents.map(event => (
          <div key={event.id} style={{ marginBottom: 4 }}>
            <Tag color={getEventTypeColor(event.type)}>{event.title}</Tag>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-page">
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Event
        </Button>
      </div>

      <Calendar dateCellRender={dateCellRender} />

      <div style={{ marginTop: 24 }}>
        <h2>Upcoming Events</h2>
        <List
          dataSource={events}
          renderItem={event => (
            <List.Item
              actions={[
                <Button
                  type="text"
                  icon={<EditOutlined />}
                  onClick={() => handleEdit(event)}
                />,
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(event.id)}
                />,
              ]}
            >
              <List.Item.Meta
                title={
                  <div>
                    {event.title}
                    <Tag color={getEventTypeColor(event.type)} style={{ marginLeft: 8 }}>
                      {event.type}
                    </Tag>
                    <Tag color={getEventStatusColor(event.status)}>
                      {event.status}
                    </Tag>
                  </div>
                }
                description={
                  <div>
                    <div>{event.description}</div>
                    <div>{dayjs(event.date).format('MMMM D, YYYY')}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>

      <Modal
        title={editingEvent ? 'Edit Event' : 'Add Event'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the event title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the event description!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the event date!' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select the event type!' }]}
          >
            <Select>
              <Option value="meeting">Meeting</Option>
              <Option value="task">Task</Option>
              <Option value="reminder">Reminder</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the event status!' }]}
          >
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarPage; 