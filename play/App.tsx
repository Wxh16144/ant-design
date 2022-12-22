import React, { useState } from 'react';
import { Button, Typography, version, ConfigProvider, theme, App as AntdApp } from 'antd';

const { useToken, defaultAlgorithm } = theme;
// const { useApp } = AntdApp

function App() {
  const [count, setCount] = useState(0);
  const {
    token: { colorBgLayout },
  } = useToken();

  React.useEffect(() => {
    window.console.log('App mounted', AntdApp);
  }, []);

  return (
    <ConfigProvider
      theme={{
        algorithm: [defaultAlgorithm],
      }}
    >
      <div style={{ backgroundColor: colorBgLayout, height: '100vh' }}>
        {/* <AntdApp> */}
        <Typography.Title>Ant Design {version}</Typography.Title>
        <Button onClick={() => setCount((prev) => prev + 1)}>count is {count}</Button>
        {/* <Button onClick={() => message.info(Math.random().toString())}>Message</Button> */}
        {/* </AntdApp> */}
      </div>
    </ConfigProvider>
  );
}

export default App;
