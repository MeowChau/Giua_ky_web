import { Layout, Menu } from 'antd';
import {
  ReadOutlined,
  LineChartOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import StudyCategory from '@/components/StudyTracker/StudyCategory';
import StudyProgress from '@/components/StudyTracker/StudyProgress';
import StudyGoals from '@/components/StudyTracker/StudyGoals';
import { useState } from 'react';

const { Header, Content, Sider } = Layout;

const StudyTracker = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onClick={(e) => setSelectedKey(e.key)}
        >
          <Menu.Item key="1" icon={<ReadOutlined />}>
            Danh mục môn học
          </Menu.Item>
          <Menu.Item key="2" icon={<LineChartOutlined />}>
            Tiến độ học tập
          </Menu.Item>
          <Menu.Item key="3" icon={<CheckCircleOutlined />}>
            Mục tiêu học tập
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
          <h1>📚 Quản lý tiến độ học tập</h1>
        </Header>
        
        <Content style={{ margin: '16px' }}>
          {selectedKey === '1' && <StudyCategory />}
          {selectedKey === '2' && <StudyProgress />}
          {selectedKey === '3' && <StudyGoals />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default StudyTracker;
