import publicRouter from '@/router'

const home = {
  path: '/',
  name: 'index',
  component: () => import('../views/Index')
}

export const routers = [ home ].concat(publicRouter)
