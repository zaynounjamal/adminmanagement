import React, { useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, InputNumber, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Laptop', price: 999.99, stock: 50, category: 'Electronics' },
    { id: 2, name: 'Smartphone', price: 599.99, stock: 100, category: 'Electronics' },
    { id: 3, name: 'Headphones', price: 99.99, stock: 200, category: 'Accessories' },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price ($)',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => price.toFixed(2),
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
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
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      content: 'This action cannot be undone.',
      onOk: () => {
        setProducts(products.filter(product => product.id !== id));
        message.success('Product deleted successfully');
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingProduct) {
        setProducts(products.map(product =>
          product.id === editingProduct.id ? { ...values, id: editingProduct.id } : product
        ));
        message.success('Product updated successfully');
      } else {
        const newProduct = {
          ...values,
          id: Math.max(...products.map(p => p.id), 0) + 1,
        };
        setProducts([...products, newProduct]);
        message.success('Product added successfully');
      }
      setIsModalVisible(false);
    });
  };

  return (
    <div className="products-management">
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} rowKey="id" />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price ($)"
            rules={[{ required: true, message: 'Please input the product price!' }]}
          >
            <InputNumber min={0} precision={2} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please input the stock amount!' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please input the product category!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products; 