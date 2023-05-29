import { defineConfig } from 'dumi';
import { IThemeConfig } from 'dumi/dist/client/theme-api/types';
import { homepage, name } from './package.json';
const themeConfig: IThemeConfig = {
  name,
  logo: 'https://raw.githubusercontent.com/binghuis/assets/main/imgs/icons8-brick-100.png',
  socialLinks: {
    github: homepage,
  } as IThemeConfig['socialLinks'],
  nav: [],
  footer: 'Made with ❤️ by Binghuis',
  nprogress: false,
  prefersColor: { default: 'auto', switch: true },
};

export default defineConfig({
  themeConfig,
  outputPath: 'docs-dist',
  mfsu: false,
  favicons: ['https://raw.githubusercontent.com/binghuis/assets/main/imgs/icons8-brick-32.png'],
});
