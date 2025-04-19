import React, { useState } from 'react';
import { Card, Input, Button, Tree, Tag, Space, List, Typography, Divider, Avatar, Rate, Tooltip } from 'antd';
import { SearchOutlined, BookOutlined, StarOutlined, EyeOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Title, Text, Paragraph } = Typography;

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  rating: number;
}

interface Category {
  title: string;
  key: string;
  children?: Category[];
}

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: Category[] = [
    {
      title: 'Getting Started',
      key: 'getting-started',
      children: [
        { title: 'Installation', key: 'installation' },
        { title: 'Configuration', key: 'configuration' },
        { title: 'First Steps', key: 'first-steps' },
      ],
    },
    {
      title: 'Features',
      key: 'features',
      children: [
        { title: 'User Management', key: 'user-management' },
        { title: 'Data Analytics', key: 'data-analytics' },
        { title: 'Integration', key: 'integration' },
      ],
    },
    {
      title: 'Troubleshooting',
      key: 'troubleshooting',
      children: [
        { title: 'Common Issues', key: 'common-issues' },
        { title: 'Error Messages', key: 'error-messages' },
        { title: 'Performance', key: 'performance' },
      ],
    },
  ];

  const articles: Article[] = [
    {
      id: '1',
      title: 'Getting Started with Our Platform',
      content: 'Learn how to set up and configure your account for the first time...',
      category: 'getting-started',
      tags: ['beginner', 'setup', 'configuration'],
      author: 'John Doe',
      createdAt: '2024-04-19',
      views: 1250,
      likes: 45,
      comments: 12,
      rating: 4.5,
    },
    {
      id: '2',
      title: 'Advanced User Management Features',
      content: 'Discover how to manage users, roles, and permissions effectively...',
      category: 'features',
      tags: ['users', 'security', 'management'],
      author: 'Jane Smith',
      createdAt: '2024-04-18',
      views: 980,
      likes: 32,
      comments: 8,
      rating: 4.2,
    },
    {
      id: '3',
      title: 'Troubleshooting Common Issues',
      content: 'Find solutions to the most common problems users encounter...',
      category: 'troubleshooting',
      tags: ['help', 'support', 'issues'],
      author: 'Mike Johnson',
      createdAt: '2024-04-17',
      views: 2100,
      likes: 78,
      comments: 25,
      rating: 4.8,
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Knowledge Base</Title>
        <Text type="secondary">
          Find answers to common questions and learn how to use our platform effectively
        </Text>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ width: '300px' }}>
          <Card title="Categories" style={{ marginBottom: '16px' }}>
            <Tree
              treeData={categories}
              defaultExpandAll
              onSelect={(selectedKeys) => {
                setSelectedCategory(selectedKeys[0] as string || 'all');
              }}
            />
          </Card>
          <Card title="Popular Tags">
            <Space wrap>
              {Array.from(new Set(articles.flatMap(article => article.tags))).map(tag => (
                <Tag key={tag} color="blue" style={{ cursor: 'pointer' }}>
                  {tag}
                </Tag>
              ))}
            </Space>
          </Card>
        </div>

        <div style={{ flex: 1 }}>
          <Search
            placeholder="Search articles..."
            allowClear
            enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
            size="large"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ marginBottom: '24px' }}
          />

          <List
            itemLayout="vertical"
            size="large"
            dataSource={filteredArticles}
            renderItem={article => (
              <List.Item
                key={article.id}
                actions={[
                  <Space key="views">
                    <EyeOutlined />
                    <Text>{article.views}</Text>
                  </Space>,
                  <Space key="likes">
                    <LikeOutlined />
                    <Text>{article.likes}</Text>
                  </Space>,
                  <Space key="comments">
                    <CommentOutlined />
                    <Text>{article.comments}</Text>
                  </Space>,
                  <Space key="rating">
                    <Rate disabled defaultValue={article.rating} />
                  </Space>,
                ]}
                extra={
                  <Card
                    style={{ width: 200 }}
                    cover={
                      <div style={{ height: 100, background: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BookOutlined style={{ fontSize: 40, color: '#1890ff' }} />
                      </div>
                    }
                  >
                    <Card.Meta
                      avatar={<Avatar>{article.author[0]}</Avatar>}
                      title={article.author}
                      description={article.createdAt}
                    />
                  </Card>
                }
              >
                <List.Item.Meta
                  title={
                    <Title level={4} style={{ margin: 0 }}>
                      {article.title}
                    </Title>
                  }
                  description={
                    <Space>
                      {article.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </Space>
                  }
                />
                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
                  {article.content}
                </Paragraph>
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase; 