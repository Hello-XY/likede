import Layout from '@/layout'

export default {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  meta: { title: '人员管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'index',
      component: () => import('@/views/user/index'),
      meta: { title: '人员列表' }
    },
    {
      path: 'user-task-stats',
      component: () => import('@/views/user/user-task-stats'),
      meta: { title: '人效统计' }
    },
    {
      path: 'user-work',
      component: () => import('@/views/user/user-work'),
      meta: { title: '工作量列表' }
    }
  ]
}
