/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const homeRouter = {
  path: '/home',
  component: Layout,
  redirect: '/user/list',
  name: 'Home',
  meta: {
    title: 'home',
    icon: 'component',
  },
  children: [
    {
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: { title: 'dashboard', affix: true },
    },
  ],
}
export default homeRouter
