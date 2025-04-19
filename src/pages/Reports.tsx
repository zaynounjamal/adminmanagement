import React, { useState } from 'react';
import { Card, Button, Table, Space, Tag, Typography, Select, DatePicker, message } from 'antd';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DownloadOutlined, FileExcelOutlined, FilePdfOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

interface ReportData {
  id: string;
  date: string;
  category: string;
  amount: number;
  status: string;
}

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState<[string, string]>(['', '']);
  const [reportType, setReportType] = useState<string>('sales');

  // Sample data
  const salesData = [
    { date: '2024-01', sales: 4000, expenses: 2400, profit: 1600 },
    { date: '2024-02', sales: 3000, expenses: 1398, profit: 1602 },
    { date: '2024-03', sales: 2000, expenses: 9800, profit: -7800 },
    { date: '2024-04', sales: 2780, expenses: 3908, profit: -1128 },
    { date: '2024-05', sales: 1890, expenses: 4800, profit: -2910 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Food', value: 200 },
    { name: 'Books', value: 100 },
  ];

  const reportData: ReportData[] = [
    {
      id: '1',
      date: '2024-01-01',
      category: 'Electronics',
      amount: 1000,
      status: 'completed',
    },
    {
      id: '2',
      date: '2024-01-02',
      category: 'Clothing',
      amount: 500,
      status: 'pending',
    },
  ];

  const handleExport = (format: 'excel' | 'pdf') => {
    message.success(`Report exported as ${format.toUpperCase()}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Title level={2}>Reports</Title>
        <Space>
          <RangePicker onChange={(dates) => setDateRange(dates?.map(date => date?.format('YYYY-MM-DD') || '') as [string, string])} />
          <Select
            value={reportType}
            onChange={setReportType}
            style={{ width: 200 }}
          >
            <Option value="sales">Sales Report</Option>
            <Option value="inventory">Inventory Report</Option>
            <Option value="customer">Customer Report</Option>
          </Select>
          <Button type="primary" icon={<FileExcelOutlined />} onClick={() => handleExport('excel')}>
            Export Excel
          </Button>
          <Button icon={<FilePdfOutlined />} onClick={() => handleExport('pdf')}>
            Export PDF
          </Button>
        </Space>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <Title level={4}>Total Sales</Title>
          <Text className="text-2xl font-bold">$12,345</Text>
          <Text type="secondary">+12% from last month</Text>
        </Card>
        <Card>
          <Title level={4}>Total Orders</Title>
          <Text className="text-2xl font-bold">1,234</Text>
          <Text type="secondary">+8% from last month</Text>
        </Card>
        <Card>
          <Title level={4}>Average Order Value</Title>
          <Text className="text-2xl font-bold">$45.67</Text>
          <Text type="secondary">+5% from last month</Text>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card title="Sales Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" />
              <Line type="monotone" dataKey="profit" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Category Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card title="Detailed Report">
        <Table
          dataSource={reportData}
          columns={[
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Category',
              dataIndex: 'category',
              key: 'category',
            },
            {
              title: 'Amount',
              dataIndex: 'amount',
              key: 'amount',
              render: (amount) => `$${amount}`,
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (status) => (
                <Tag color={status === 'completed' ? 'green' : 'orange'}>
                  {status}
                </Tag>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default Reports; 