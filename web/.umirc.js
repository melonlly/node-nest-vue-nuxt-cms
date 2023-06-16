import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', redirect: '/home'  },
    { path: '/login', component: 'Login'  },
    { path: '/home', component: 'Home'  },
  ],
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:3000/',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api' : '' },
    },
  },
});
