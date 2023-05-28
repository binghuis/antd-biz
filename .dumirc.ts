import { defineConfig } from 'dumi';
import { IThemeConfig } from 'dumi/dist/client/theme-api/types';

const themeConfig: IThemeConfig = {
  name: '🧱 Brick',
  // logo: '',
  socialLinks: {
    github: 'https://github.com/binghuis/brick-components',
    weibo: '',
    twitter: '',
    gitlab: '',
    facebook: '',
    zhihu: '',
    yuque: '',
    linkedin: '',
  },
  nav: [
    { title: '指南', link: '/guide' },
    { title: '组件', link: '/components' },
  ],
  footer: 'Made with ❤️ by Binghuis',
  nprogress: false,
  prefersColor: { default: 'auto', switch: true },
};

export default defineConfig({
  themeConfig,
  mfsu: false,
});
