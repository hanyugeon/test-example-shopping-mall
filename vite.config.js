import path from 'path';

import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ exclude: ['/virtual:/**', 'node_modules/**'] })],
  test: {
    // global: true 설정 시 별다른 import 없이 vitest API 사용가능
    globals: true,
    // jsDOM 환경에서 구동되도록 설정
    environment: 'jsdom',
    // 테스트 실행을 위한 설정들을 setupTest.js 파일을 보고 동작하도록 설정
    setupFiles: './src/utils/test/setupTests.js',
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
