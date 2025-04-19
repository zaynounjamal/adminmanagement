import React, { useState, useEffect } from 'react';
import { Card, Form, Input, Switch, Select, Button, message, Tabs, Divider, Space, Typography, Upload, Avatar, InputNumber, Radio, Tooltip } from 'antd';
import { 
  SaveOutlined, 
  NotificationOutlined, 
  SecurityScanOutlined, 
  GlobalOutlined, 
  UserOutlined, 
  UploadOutlined,
  BellOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  CloudUploadOutlined,
  ApiOutlined,
  AppstoreOutlined,
  TeamOutlined,
  FileTextOutlined,
  CloudOutlined,
  SyncOutlined
} from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  orderUpdates: boolean;
  systemAlerts: boolean;
  weeklyDigest: boolean;
  mentionNotifications: boolean;
  customNotificationSound: boolean;
  notificationFrequency: 'realtime' | 'hourly' | 'daily';
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  passwordExpiry: number;
  sessionTimeout: number;
  loginAttempts: number;
  passwordHistory: number;
  ipWhitelist: string[];
  deviceManagement: boolean;
  securityQuestions: {
    question1: string;
    answer1: string;
    question2: string;
    answer2: string;
  };
}

interface GeneralSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  theme: 'light' | 'dark' | 'system';
  currency: string;
  numberFormat: string;
  timeFormat: '12h' | '24h';
  firstDayOfWeek: 'sunday' | 'monday';
}

interface ProfileSettings {
  avatar: string;
  displayName: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
  };
}

interface IntegrationSettings {
  apiKey: string;
  webhookUrl: string;
  connectedApps: string[];
  dataExport: {
    format: 'csv' | 'json' | 'excel';
    frequency: 'daily' | 'weekly' | 'monthly';
    lastExport: string;
  };
}

interface StorageSettings {
  maxStorage: number;
  usedStorage: number;
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  cloudSync: boolean;
  syncFolders: string[];
}

const Settings: React.FC = () => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    orderUpdates: true,
    systemAlerts: true,
    weeklyDigest: true,
    mentionNotifications: true,
    customNotificationSound: false,
    notificationFrequency: 'realtime',
  });

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorAuth: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
    loginAttempts: 5,
    passwordHistory: 5,
    ipWhitelist: [],
    deviceManagement: true,
    securityQuestions: {
      question1: '',
      answer1: '',
      question2: '',
      answer2: '',
    },
  });

  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    theme: 'light',
    currency: 'USD',
    numberFormat: '1,234.56',
    timeFormat: '12h',
    firstDayOfWeek: 'sunday',
  });

  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    avatar: '',
    displayName: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    website: '',
    socialLinks: {
      twitter: '',
      linkedin: '',
      github: '',
    },
  });

  const [integrationSettings, setIntegrationSettings] = useState<IntegrationSettings>({
    apiKey: '',
    webhookUrl: '',
    connectedApps: [],
    dataExport: {
      format: 'json',
      frequency: 'weekly',
      lastExport: '',
    },
  });

  const [storageSettings, setStorageSettings] = useState<StorageSettings>({
    maxStorage: 1000,
    usedStorage: 250,
    autoBackup: true,
    backupFrequency: 'weekly',
    cloudSync: false,
    syncFolders: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load settings from localStorage or API
    const loadSettings = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Load from localStorage
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings);
          setNotificationSettings(parsedSettings.notificationSettings || notificationSettings);
          setSecuritySettings(parsedSettings.securitySettings || securitySettings);
          setGeneralSettings(parsedSettings.generalSettings || generalSettings);
          setProfileSettings(parsedSettings.profileSettings || profileSettings);
          setIntegrationSettings(parsedSettings.integrationSettings || integrationSettings);
          setStorageSettings(parsedSettings.storageSettings || storageSettings);
        }
      } catch (error) {
        message.error('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async (settingsType: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage
      const settingsToSave = {
        notificationSettings,
        securitySettings,
        generalSettings,
        profileSettings,
        integrationSettings,
        storageSettings,
      };
      
      localStorage.setItem('userSettings', JSON.stringify(settingsToSave));
      message.success(`${settingsType} settings saved successfully!`);
    } catch (error) {
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setProfileSettings({
        ...profileSettings,
        avatar: info.file.response.url,
      });
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleReset = (settingsType: string) => {
    // Reset to default values
    switch (settingsType) {
      case 'notification':
        setNotificationSettings({
          emailNotifications: true,
          pushNotifications: true,
          marketingEmails: false,
          orderUpdates: true,
          systemAlerts: true,
          weeklyDigest: true,
          mentionNotifications: true,
          customNotificationSound: false,
          notificationFrequency: 'realtime',
        });
        break;
      case 'security':
        setSecuritySettings({
          twoFactorAuth: false,
          passwordExpiry: 90,
          sessionTimeout: 30,
          loginAttempts: 5,
          passwordHistory: 5,
          ipWhitelist: [],
          deviceManagement: true,
          securityQuestions: {
            question1: '',
            answer1: '',
            question2: '',
            answer2: '',
          },
        });
        break;
      case 'general':
        setGeneralSettings({
          language: 'en',
          timezone: 'UTC',
          dateFormat: 'MM/DD/YYYY',
          theme: 'light',
          currency: 'USD',
          numberFormat: '1,234.56',
          timeFormat: '12h',
          firstDayOfWeek: 'sunday',
        });
        break;
    }
    message.success(`${settingsType} settings reset to default values`);
  };

  return (
    <div className="settings-page" style={{ padding: '24px' }}>
      <Title level={2}>Settings</Title>
      <Tabs defaultActiveKey="1" size="large">
        <TabPane
          tab={
            <span>
              <UserOutlined />
              Profile
            </span>
          }
          key="1"
        >
          <Card title="Profile Settings" loading={loading}>
            <Form layout="vertical">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ textAlign: 'center' }}>
                  <Avatar size={100} src={profileSettings.avatar} icon={<UserOutlined />} />
                  <Upload
                    name="avatar"
                    action="/api/upload"
                    onChange={handleAvatarUpload}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>
                      Change Avatar
                    </Button>
                  </Upload>
                </div>
                <Form.Item label="Display Name">
                  <Input
                    value={profileSettings.displayName}
                    onChange={(e) => setProfileSettings({ ...profileSettings, displayName: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Phone">
                  <Input
                    value={profileSettings.phone}
                    onChange={(e) => setProfileSettings({ ...profileSettings, phone: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Bio">
                  <Input.TextArea
                    value={profileSettings.bio}
                    onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Location">
                  <Input
                    value={profileSettings.location}
                    onChange={(e) => setProfileSettings({ ...profileSettings, location: e.target.value })}
                  />
                </Form.Item>
                <Form.Item label="Website">
                  <Input
                    value={profileSettings.website}
                    onChange={(e) => setProfileSettings({ ...profileSettings, website: e.target.value })}
                  />
                </Form.Item>
                <Title level={4}>Social Links</Title>
                <Form.Item label="Twitter">
                  <Input
                    value={profileSettings.socialLinks.twitter}
                    onChange={(e) => setProfileSettings({
                      ...profileSettings,
                      socialLinks: { ...profileSettings.socialLinks, twitter: e.target.value }
                    })}
                  />
                </Form.Item>
                <Form.Item label="LinkedIn">
                  <Input
                    value={profileSettings.socialLinks.linkedin}
                    onChange={(e) => setProfileSettings({
                      ...profileSettings,
                      socialLinks: { ...profileSettings.socialLinks, linkedin: e.target.value }
                    })}
                  />
                </Form.Item>
                <Form.Item label="GitHub">
                  <Input
                    value={profileSettings.socialLinks.github}
                    onChange={(e) => setProfileSettings({
                      ...profileSettings,
                      socialLinks: { ...profileSettings.socialLinks, github: e.target.value }
                    })}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('Profile')}
                  loading={loading}
                >
                  Save Changes
                </Button>
              </Space>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <NotificationOutlined />
              Notifications
            </span>
          }
          key="2"
        >
          <Card title="Notification Settings" loading={loading}>
            <Form layout="vertical">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Form.Item label="Email Notifications">
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Push Notifications">
                  <Switch
                    checked={notificationSettings.pushNotifications}
                    onChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, pushNotifications: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Marketing Emails">
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, marketingEmails: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Order Updates">
                  <Switch
                    checked={notificationSettings.orderUpdates}
                    onChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, orderUpdates: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="System Alerts">
                  <Switch
                    checked={notificationSettings.systemAlerts}
                    onChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, systemAlerts: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Weekly Digest">
                  <Switch
                    checked={notificationSettings.weeklyDigest}
                    onChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, weeklyDigest: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Mention Notifications">
                  <Switch
                    checked={notificationSettings.mentionNotifications}
                    onChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, mentionNotifications: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Custom Notification Sound">
                  <Switch
                    checked={notificationSettings.customNotificationSound}
                    onChange={(checked) =>
                      setNotificationSettings({ ...notificationSettings, customNotificationSound: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Notification Frequency">
                  <Select
                    value={notificationSettings.notificationFrequency}
                    onChange={(value) =>
                      setNotificationSettings({ ...notificationSettings, notificationFrequency: value })
                    }
                  >
                    <Option value="realtime">Real-time</Option>
                    <Option value="hourly">Hourly</Option>
                    <Option value="daily">Daily</Option>
                  </Select>
                </Form.Item>
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => handleSave('Notification')}
                    loading={loading}
                  >
                    Save Changes
                  </Button>
                  <Button
                    icon={<SyncOutlined />}
                    onClick={() => handleReset('notification')}
                  >
                    Reset to Default
                  </Button>
                </Space>
              </Space>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <SecurityScanOutlined />
              Security
            </span>
          }
          key="3"
        >
          <Card title="Security Settings" loading={loading}>
            <Form layout="vertical">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Form.Item label="Two-Factor Authentication">
                  <Switch
                    checked={securitySettings.twoFactorAuth}
                    onChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Password Expiry (days)">
                  <Select
                    value={securitySettings.passwordExpiry}
                    onChange={(value) =>
                      setSecuritySettings({ ...securitySettings, passwordExpiry: value })
                    }
                  >
                    <Option value={30}>30 days</Option>
                    <Option value={60}>60 days</Option>
                    <Option value={90}>90 days</Option>
                    <Option value={180}>180 days</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Session Timeout (minutes)">
                  <Select
                    value={securitySettings.sessionTimeout}
                    onChange={(value) =>
                      setSecuritySettings({ ...securitySettings, sessionTimeout: value })
                    }
                  >
                    <Option value={15}>15 minutes</Option>
                    <Option value={30}>30 minutes</Option>
                    <Option value={60}>60 minutes</Option>
                    <Option value={120}>120 minutes</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Login Attempts">
                  <InputNumber
                    min={1}
                    max={10}
                    value={securitySettings.loginAttempts}
                    onChange={(value) =>
                      setSecuritySettings({ ...securitySettings, loginAttempts: value || 5 })
                    }
                  />
                </Form.Item>
                <Form.Item label="Password History">
                  <InputNumber
                    min={1}
                    max={10}
                    value={securitySettings.passwordHistory}
                    onChange={(value) =>
                      setSecuritySettings({ ...securitySettings, passwordHistory: value || 5 })
                    }
                  />
                </Form.Item>
                <Form.Item label="IP Whitelist">
                  <Select
                    mode="tags"
                    value={securitySettings.ipWhitelist}
                    onChange={(value) =>
                      setSecuritySettings({ ...securitySettings, ipWhitelist: value })
                    }
                    placeholder="Add IP addresses"
                  />
                </Form.Item>
                <Form.Item label="Device Management">
                  <Switch
                    checked={securitySettings.deviceManagement}
                    onChange={(checked) =>
                      setSecuritySettings({ ...securitySettings, deviceManagement: checked })
                    }
                  />
                </Form.Item>
                <Title level={4}>Security Questions</Title>
                <Form.Item label="Question 1">
                  <Input
                    value={securitySettings.securityQuestions.question1}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        securityQuestions: {
                          ...securitySettings.securityQuestions,
                          question1: e.target.value,
                        },
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Answer 1">
                  <Input.Password
                    value={securitySettings.securityQuestions.answer1}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        securityQuestions: {
                          ...securitySettings.securityQuestions,
                          answer1: e.target.value,
                        },
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Question 2">
                  <Input
                    value={securitySettings.securityQuestions.question2}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        securityQuestions: {
                          ...securitySettings.securityQuestions,
                          question2: e.target.value,
                        },
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Answer 2">
                  <Input.Password
                    value={securitySettings.securityQuestions.answer2}
                    onChange={(e) =>
                      setSecuritySettings({
                        ...securitySettings,
                        securityQuestions: {
                          ...securitySettings.securityQuestions,
                          answer2: e.target.value,
                        },
                      })
                    }
                  />
                </Form.Item>
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => handleSave('Security')}
                    loading={loading}
                  >
                    Save Changes
                  </Button>
                  <Button
                    icon={<SyncOutlined />}
                    onClick={() => handleReset('security')}
                  >
                    Reset to Default
                  </Button>
                </Space>
              </Space>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <GlobalOutlined />
              General
            </span>
          }
          key="4"
        >
          <Card title="General Settings" loading={loading}>
            <Form layout="vertical">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Form.Item label="Language">
                  <Select
                    value={generalSettings.language}
                    onChange={(value) =>
                      setGeneralSettings({ ...generalSettings, language: value })
                    }
                  >
                    <Option value="en">English</Option>
                    <Option value="es">Spanish</Option>
                    <Option value="fr">French</Option>
                    <Option value="de">German</Option>
                    <Option value="zh">Chinese</Option>
                    <Option value="ja">Japanese</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Timezone">
                  <Select
                    value={generalSettings.timezone}
                    onChange={(value) =>
                      setGeneralSettings({ ...generalSettings, timezone: value })
                    }
                  >
                    <Option value="UTC">UTC</Option>
                    <Option value="EST">Eastern Time</Option>
                    <Option value="PST">Pacific Time</Option>
                    <Option value="GMT">Greenwich Mean Time</Option>
                    <Option value="CET">Central European Time</Option>
                    <Option value="IST">Indian Standard Time</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Date Format">
                  <Select
                    value={generalSettings.dateFormat}
                    onChange={(value) =>
                      setGeneralSettings({ ...generalSettings, dateFormat: value })
                    }
                  >
                    <Option value="MM/DD/YYYY">MM/DD/YYYY</Option>
                    <Option value="DD/MM/YYYY">DD/MM/YYYY</Option>
                    <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Theme">
                  <Radio.Group
                    value={generalSettings.theme}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, theme: e.target.value })
                    }
                  >
                    <Radio.Button value="light">Light</Radio.Button>
                    <Radio.Button value="dark">Dark</Radio.Button>
                    <Radio.Button value="system">System</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Currency">
                  <Select
                    value={generalSettings.currency}
                    onChange={(value) =>
                      setGeneralSettings({ ...generalSettings, currency: value })
                    }
                  >
                    <Option value="USD">USD ($)</Option>
                    <Option value="EUR">EUR (€)</Option>
                    <Option value="GBP">GBP (£)</Option>
                    <Option value="JPY">JPY (¥)</Option>
                    <Option value="INR">INR (₹)</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Number Format">
                  <Select
                    value={generalSettings.numberFormat}
                    onChange={(value) =>
                      setGeneralSettings({ ...generalSettings, numberFormat: value })
                    }
                  >
                    <Option value="1,234.56">1,234.56</Option>
                    <Option value="1.234,56">1.234,56</Option>
                    <Option value="1 234,56">1 234,56</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Time Format">
                  <Radio.Group
                    value={generalSettings.timeFormat}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, timeFormat: e.target.value })
                    }
                  >
                    <Radio.Button value="12h">12-hour</Radio.Button>
                    <Radio.Button value="24h">24-hour</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="First Day of Week">
                  <Radio.Group
                    value={generalSettings.firstDayOfWeek}
                    onChange={(e) =>
                      setGeneralSettings({ ...generalSettings, firstDayOfWeek: e.target.value })
                    }
                  >
                    <Radio.Button value="sunday">Sunday</Radio.Button>
                    <Radio.Button value="monday">Monday</Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Space>
                  <Button
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={() => handleSave('General')}
                    loading={loading}
                  >
                    Save Changes
                  </Button>
                  <Button
                    icon={<SyncOutlined />}
                    onClick={() => handleReset('general')}
                  >
                    Reset to Default
                  </Button>
                </Space>
              </Space>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <ApiOutlined />
              Integrations
            </span>
          }
          key="5"
        >
          <Card title="Integration Settings" loading={loading}>
            <Form layout="vertical">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Form.Item label="API Key">
                  <Input.Password
                    value={integrationSettings.apiKey}
                    onChange={(e) =>
                      setIntegrationSettings({ ...integrationSettings, apiKey: e.target.value })
                    }
                    addonAfter={
                      <Tooltip title="Generate new API key">
                        <Button type="link" icon={<SyncOutlined />} />
                      </Tooltip>
                    }
                  />
                </Form.Item>
                <Form.Item label="Webhook URL">
                  <Input
                    value={integrationSettings.webhookUrl}
                    onChange={(e) =>
                      setIntegrationSettings({ ...integrationSettings, webhookUrl: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Connected Apps">
                  <Select
                    mode="multiple"
                    value={integrationSettings.connectedApps}
                    onChange={(value) =>
                      setIntegrationSettings({ ...integrationSettings, connectedApps: value })
                    }
                    placeholder="Select apps to connect"
                  >
                    <Option value="slack">Slack</Option>
                    <Option value="github">GitHub</Option>
                    <Option value="google">Google</Option>
                    <Option value="microsoft">Microsoft</Option>
                    <Option value="dropbox">Dropbox</Option>
                  </Select>
                </Form.Item>
                <Title level={4}>Data Export</Title>
                <Form.Item label="Export Format">
                  <Select
                    value={integrationSettings.dataExport.format}
                    onChange={(value) =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        dataExport: { ...integrationSettings.dataExport, format: value },
                      })
                    }
                  >
                    <Option value="csv">CSV</Option>
                    <Option value="json">JSON</Option>
                    <Option value="excel">Excel</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Export Frequency">
                  <Select
                    value={integrationSettings.dataExport.frequency}
                    onChange={(value) =>
                      setIntegrationSettings({
                        ...integrationSettings,
                        dataExport: { ...integrationSettings.dataExport, frequency: value },
                      })
                    }
                  >
                    <Option value="daily">Daily</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                  </Select>
                </Form.Item>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('Integration')}
                  loading={loading}
                >
                  Save Changes
                </Button>
              </Space>
            </Form>
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <CloudOutlined />
              Storage
            </span>
          }
          key="6"
        >
          <Card title="Storage Settings" loading={loading}>
            <Form layout="vertical">
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Form.Item label="Storage Usage">
                  <div style={{ marginBottom: 8 }}>
                    <Text>
                      {storageSettings.usedStorage} MB / {storageSettings.maxStorage} MB used
                    </Text>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#f5f5f5', borderRadius: 4 }}>
                    <div
                      style={{
                        width: `${(storageSettings.usedStorage / storageSettings.maxStorage) * 100}%`,
                        height: 8,
                        backgroundColor: '#1890ff',
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </Form.Item>
                <Form.Item label="Auto Backup">
                  <Switch
                    checked={storageSettings.autoBackup}
                    onChange={(checked) =>
                      setStorageSettings({ ...storageSettings, autoBackup: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Backup Frequency">
                  <Select
                    value={storageSettings.backupFrequency}
                    onChange={(value) =>
                      setStorageSettings({ ...storageSettings, backupFrequency: value })
                    }
                  >
                    <Option value="daily">Daily</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Cloud Sync">
                  <Switch
                    checked={storageSettings.cloudSync}
                    onChange={(checked) =>
                      setStorageSettings({ ...storageSettings, cloudSync: checked })
                    }
                  />
                </Form.Item>
                <Form.Item label="Sync Folders">
                  <Select
                    mode="multiple"
                    value={storageSettings.syncFolders}
                    onChange={(value) =>
                      setStorageSettings({ ...storageSettings, syncFolders: value })
                    }
                    placeholder="Select folders to sync"
                  >
                    <Option value="documents">Documents</Option>
                    <Option value="pictures">Pictures</Option>
                    <Option value="music">Music</Option>
                    <Option value="videos">Videos</Option>
                    <Option value="downloads">Downloads</Option>
                  </Select>
                </Form.Item>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => handleSave('Storage')}
                  loading={loading}
                >
                  Save Changes
                </Button>
              </Space>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Settings; 