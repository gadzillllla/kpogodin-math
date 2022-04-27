import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import { readdirSync, statSync } from 'fs';
// @ts-ignore
const path = require('path');
// @ts-ignore
const projectRootDir = path.resolve(__dirname);
const srcFiles = readdirSync(path.join(projectRootDir, 'src'));
const srcFolders = srcFiles.filter((fileName) => {
  const fileStat = statSync(path.join(projectRootDir, 'src', fileName));
  return fileStat.isDirectory();
});

const alias = srcFolders.reduce((acc, folderName) => {
  acc[folderName] = path.join(projectRootDir, 'src', folderName);
  return acc;
}, {});


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias,
  },
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'dashesOnly',
      generateScopedName: (name: string, filePath: string, css: string): string => {
        const [, fileName] = filePath.split('/').reverse();
        return `${fileName}_${name}`
      },
    },
  },
});
