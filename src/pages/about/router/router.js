import publicRouter from '@/router'

const home = {
  path: '/',
  name: 'About',
  component: () => import('../views/About')
}

export const routes = [ home ].concat(publicRouter)
