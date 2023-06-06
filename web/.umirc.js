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
  // fastRefresh: {},
});
