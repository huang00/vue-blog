import publicRouter from '@/router'

const home = {
  path: '/',
  name: 'live',
  component: () => import('../views/Live')
}

export const routers = [ home ].concat(publicRouter)
