/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const recruitRouter = {
  path: '/recruit',
  component: Layout,
  redirect: '/recruit/list',
  name: '招生计划',
  meta: {
    title: '招生计划',
    icon: 'user',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/recruit/list'),
      name: '招生计划管理',
      meta: { title: '招生计划管理', noCache: true },
    },
    {
      path: 'create',
      component: () => import('@/views/recruit/create'),
      name: '创建招生计划',
      breadcrumb: false,
      meta: { title: '创建招生计划', noCache: true },
    },
    {
      path: 'update',
      component: () => import('@/views/recruit/update'),
      hidden: true,
      name: '更新招生计划',
      breadcrumb: false,
      meta: { title: '更新招生计划', noCache: true },
    },
  ],
}
export default recruitRouter
