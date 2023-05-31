import { defineConfig } from 'dumi';
import { IThemeConfig } from 'dumi/dist/client/theme-api/types';
import path from 'node:path';
import { repository } from './package.json';

const themeConfig: IThemeConfig = {
  name: 'AntdBiz',
  logo: 'https://raw.githubusercontent.com/binghuis/assets/main/imgs/icons8-brick-100.png',
  socialLinks: {
    github: repository.url,
  } as IThemeConfig['socialLinks'],
  nav: [],
  footer: 'Made with ❤️ by Binghuis',
  nprogress: false,
  prefersColor: { default: 'auto', switch: true },
};

export default defineConfig({
  resolve: {
    atomDirs: [{ type: 'component', dir: 'components' }],
  },
  define: {},
  alias: {
    'antd-biz': path.join(__dirname, 'components'),
  },
  outputPath: 'docs-dist',
  mfsu: false,
  favicons: ['https://raw.githubusercontent.com/binghuis/assets/main/imgs/icons8-brick-32.png'],
  themeConfig,
});
