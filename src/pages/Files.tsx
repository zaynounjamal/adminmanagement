import React, { useState } from 'react';
import { Card, Button, Input, Table, Space, Tag, Typography, Dropdown, Menu, Modal, Upload, message, Tooltip, Badge, Avatar } from 'antd';
import { 
  FolderOutlined, 
  FileOutlined, 
  FileImageOutlined, 
  FilePdfOutlined, 
  FileWordOutlined, 
  FileExcelOutlined, 
  FileZipOutlined, 
  MoreOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  DeleteOutlined,
  StarOutlined,
  EditOutlined,
  CloudUploadOutlined,
  SearchOutlined
} from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title, Text } = Typography;
const { Search } = Input;

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  fileType?: 'image' | 'pdf' | 'word' | 'excel' | 'zip' | 'other';
  size: string;
  modified: string;
  shared: boolean;
  starred: boolean;
  owner: string;
  path: string;
}

const Files: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'Project Documents',
      type: 'folder',
      size: '-',
      modified: '2024-04-19',
      shared: true,
      starred: true,
      owner: 'John Doe',
      path: '/Project Documents',
    },
    {
      id: '2',
      name: 'Meeting Notes.docx',
      type: 'file',
      fileType: 'word',
      size: '2.5 MB',
      modified: '2024-04-18',
      shared: false,
      starred: false,
      owner: 'Jane Smith',
      path: '/Project Documents/Meeting Notes.docx',
    },
    {
      id: '3',
      name: 'Project Plan.pdf',
      type: 'file',
      fileType: 'pdf',
      size: '1.8 MB',
      modified: '2024-04-17',
      shared: true,
      starred: true,
      owner: 'John Doe',
      path: '/Project Documents/Project Plan.pdf',
    },
    {
      id: '4',
      name: 'Screenshots',
      type: 'folder',
      size: '-',
      modified: '2024-04-16',
      shared: false,
      starred: false,
      owner: 'Mike Johnson',
      path: '/Screenshots',
    },
    {
      id: '5',
      name: 'UI Design.png',
      type: 'file',
      fileType: 'image',
      size: '3.2 MB',
      modified: '2024-04-15',
      shared: true,
      starred: false,
      owner: 'Mike Johnson',
      path: '/Screenshots/UI Design.png',
    },
  ]);

  const [isUploadModalVisible, setIsUploadModalVisible] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') return <FolderOutlined style={{ color: '#1890ff' }} />;
    switch (file.fileType) {
      case 'image':
        return <FileImageOutlined style={{ color: '#52c41a' }} />;
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#f5222d' }} />;
      case 'word':
        return <FileWordOutlined style={{ color: '#1890ff' }} />;
      case 'excel':
        return <FileExcelOutlined style={{ color: '#52c41a' }} />;
      case 'zip':
        return <FileZipOutlined style={{ color: '#faad14' }} />;
      default:
        return <FileOutlined />;
    }
  };

  const handleFileAction = (action: string, file: FileItem) => {
    switch (action) {
      case 'download':
        message.success(`Downloading ${file.name}...`);
        break;
      case 'share':
        message.success(`Sharing ${file.name}...`);
        break;
      case 'delete':
        Modal.confirm({
          title: 'Are you sure you want to delete this file?',
          content: 'This action cannot be undone.',
          onOk: () => {
            setFiles(files.filter(f => f.id !== file.id));
            message.success('File deleted successfully');
          },
        });
        break;
      case 'star':
        setFiles(files.map(f =>
          f.id === file.id ? { ...f, starred: !f.starred } : f
        ));
        message.success(`File ${file.starred ? 'unstarred' : 'starred'} successfully`);
        break;
    }
  };

  const handleUpload: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setIsUploadModalVisible(false);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: FileItem) => (
        <Space>
          {getFileIcon(record)}
          <div>
            <div>{text}</div>
            <Text type="secondary">{record.path}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Modified',
      dataIndex: 'modified',
      key: 'modified',
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      render: (owner: string) => (
        <Space>
          <Avatar size="small">{owner[0]}</Avatar>
          {owner}
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_: any, record: FileItem) => (
        <Space>
          {record.shared && <Tag color="blue">Shared</Tag>}
          {record.starred && <Tag color="gold">Starred</Tag>}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: FileItem) => (
        <Space>
          <Tooltip title="Download">
            <Button
              type="text"
              icon={<DownloadOutlined />}
              onClick={() => handleFileAction('download', record)}
            />
          </Tooltip>
          <Tooltip title="Share">
            <Button
              type="text"
              icon={<ShareAltOutlined />}
              onClick={() => handleFileAction('share', record)}
            />
          </Tooltip>
          <Tooltip title={record.starred ? 'Unstar' : 'Star'}>
            <Button
              type="text"
              icon={<StarOutlined />}
              onClick={() => handleFileAction('star', record)}
            />
          </Tooltip>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="edit" icon={<EditOutlined />}>
                  Edit
                </Menu.Item>
                <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
                  Delete
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2}>File Manager</Title>
          <Text type="secondary">
            Manage and organize your files and folders
          </Text>
        </div>
        <Space>
          <Search
            placeholder="Search files..."
            allowClear
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            onClick={() => setIsUploadModalVisible(true)}
          >
            Upload
          </Button>
        </Space>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={files}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Upload Files"
        open={isUploadModalVisible}
        onCancel={() => setIsUploadModalVisible(false)}
        footer={null}
      >
        <Upload.Dragger
          name="files"
          multiple
          action="/api/upload"
          onChange={handleUpload}
          style={{ padding: '24px' }}
        >
          <p className="ant-upload-drag-icon">
            <CloudUploadOutlined style={{ fontSize: 48, color: '#1890ff' }} />
          </p>
          <p className="ant-upload-text">Click or drag files to this area to upload</p>
          <p className="ant-upload-hint">
            Support for single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Upload.Dragger>
      </Modal>
    </div>
  );
};

export default Files; 