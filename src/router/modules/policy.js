import Layout from '@/layout'

export default {
  path: '/policy',
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/policy'),
      meta: { title: '策略管理', icon: 'dashboard' }
    }
  ]
}
