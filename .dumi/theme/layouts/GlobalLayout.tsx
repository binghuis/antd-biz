import { App as AntdApp, ConfigProvider, theme } from 'antd';
import { useOutlet, usePrefersColor } from 'dumi';

const GlobalLayout: React.FC = () => {
  const [color] = usePrefersColor();
  const outlet = useOutlet();

  return (
    <ConfigProvider
      theme={{
        algorithm: color === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntdApp>{outlet}</AntdApp>
    </ConfigProvider>
  );
};

export default GlobalLayout;
