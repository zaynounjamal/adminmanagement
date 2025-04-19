import React, { useState } from 'react';
import { Table, Button, Space, Tag, Modal, Form, Input, Select, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

interface Order {
  id: number;
  customer: string;
  products: string[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 1,
      customer: 'John Doe',
      products: ['Laptop', 'Mouse'],
      total: 1099.99,
      status: 'pending',
      date: '2024-03-15',
    },
    {
      id: 2,
      customer: 'Jane Smith',
      products: ['Smartphone'],
      total: 599.99,
      status: 'processing',
      date: '2024-03-14',
    },
    {
      id: 3,
      customer: 'Bob Johnson',
      products: ['Headphones', 'Keyboard'],
      total: 199.99,
      status: 'shipped',
      date: '2024-03-13',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [form] = Form.useForm();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'orange';
      case 'processing':
        return 'blue';
      case 'shipped':
        return 'purple';
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Products',
      dataIndex: 'products',
      key: 'products',
      render: (products: string[]) => products.join(', '),
    },
    {
      title: 'Total ($)',
      dataIndex: 'total',
      key: 'total',
      render: (total: number) => total.toFixed(2),
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
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Order) => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingOrder(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    form.setFieldsValue(order);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this order?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setOrders(orders.filter(order => order.id !== id));
        message.success('Order deleted successfully');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingOrder) {
        setOrders(orders.map(order =>
          order.id === editingOrder.id ? { ...values, id: editingOrder.id } : order
        ));
        message.success('Order updated successfully');
      } else {
        const newOrder = {
          ...values,
          id: Math.max(...orders.map(o => o.id), 0) + 1,
        };
        setOrders([...orders, newOrder]);
        message.success('Order added successfully');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div className="orders-management">
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Order
        </Button>
      </div>
      <Table columns={columns} dataSource={orders} rowKey="id" />

      <Modal
        title={editingOrder ? 'Edit Order' : 'Add Order'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="customer"
            label="Customer"
            rules={[{ required: true, message: 'Please input the customer name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="products"
            label="Products"
            rules={[{ required: true, message: 'Please select products!' }]}
          >
            <Select mode="multiple" placeholder="Select products">
              <Option value="Laptop">Laptop</Option>
              <Option value="Smartphone">Smartphone</Option>
              <Option value="Headphones">Headphones</Option>
              <Option value="Mouse">Mouse</Option>
              <Option value="Keyboard">Keyboard</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="total"
            label="Total ($)"
            rules={[{ required: true, message: 'Please input the total amount!' }]}
          >
            <Input type="number" step="0.01" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the order status!' }]}
          >
            <Select>
              <Option value="pending">Pending</Option>
              <Option value="processing">Processing</Option>
              <Option value="shipped">Shipped</Option>
              <Option value="delivered">Delivered</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please input the order date!' }]}
          >
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders; 