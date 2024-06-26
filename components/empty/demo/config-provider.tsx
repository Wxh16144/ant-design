import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import {
  Cascader,
  ConfigProvider,
  Divider,
  List,
  Mentions,
  Select,
  Space,
  Switch,
  Table,
  Transfer,
  TreeSelect,
} from 'antd';
import type { ConfigProviderProps } from 'antd';

const customizeRenderEmpty: ConfigProviderProps['renderEmpty'] = (componentName) => (
  <div style={{ textAlign: 'center' }}>
    <SmileOutlined style={{ fontSize: 20 }} />
    <p>Data Not Found</p>
    <i style={{ fontSize: 12 }}>source name: {componentName ?? 'Unknown'}</i>
  </div>
);

const style: React.CSSProperties = { width: 200 };

const App: React.FC = () => {
  const [customize, setCustomize] = useState(true);
  return (
    <>
      <Switch
        unCheckedChildren="default"
        checkedChildren="customize"
        checked={customize}
        onChange={setCustomize}
      />
      <Divider />
      <ConfigProvider renderEmpty={customize ? customizeRenderEmpty : undefined}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <h4>Select</h4>
          <Select style={style} />
          <h4>TreeSelect</h4>
          <TreeSelect style={style} treeData={[]} />
          <h4>Cascader</h4>
          <Cascader style={style} options={[]} showSearch />
          <h4>Transfer</h4>
          <Transfer />
          <h4>Table</h4>
          <Table
            style={{ marginTop: 8 }}
            dataSource={[]}
            columns={[
              { title: 'Name', key: 'name' },
              { title: 'Age', key: 'age', filters: [] },
            ]}
          />
          <h4>List</h4>
          <List />
          <h4>Mentions</h4>
          <Mentions open />
        </Space>
      </ConfigProvider>
    </>
  );
};

export default App;
