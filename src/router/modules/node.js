import Layout from '@/layout'

export default {
  path: '/node',
  component: Layout,
  redirect: '/node/region',
  meta: { title: '点位管理', icon: 'el-icon-s-help' },
  children: [
    {
      path: 'region',
      component: () => import('@/views/node/region'),
      meta: { title: '区域管理' }
    },
    {
      path: 'node',
      component: () => import('@/views/node/node'),
      meta: { title: '点位管理' }
    },
    {
      path: 'partner',
      component: () => import('@/views/node/partner'),
      meta: { title: '合作商管理' }
    }
  ]
}
