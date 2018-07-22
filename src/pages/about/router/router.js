import publicRouter from '@/router'

const home = {
  path: '/',
  name: 'HelloWorld',
  component: () => import('../components/HelloWorld')
}

export const routes = [ home ].concat(publicRouter)
