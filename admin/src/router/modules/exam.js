/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const examRouter = {
  path: '/exam',
  component: Layout,
  redirect: '/exam/list',
  name: '考试成绩',
  meta: {
    title: '考试成绩',
    icon: 'user',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/exam/list'),
      name: '考试成绩管理',
      meta: { title: '考试成绩管理', noCache: true },
    },
    {
      path: 'create',
      component: () => import('@/views/exam/create'),
      name: '创建考试成绩',
      breadcrumb: false,
      meta: { title: '创建考试成绩', noCache: true },
    },
    {
      path: 'update',
      component: () => import('@/views/exam/update'),
      hidden: true,
      name: '更新考试成绩',
      breadcrumb: false,
      meta: { title: '更新考试成绩', noCache: true },
    },
  ],
}
export default examRouter
