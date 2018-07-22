const page404 = {
  path: '/*',
  name: 'error-404',
  meta: { title: '404-页面不存在' },
  component: () => import('@/components/errer-page/404')
}

export default [ page404 ]
