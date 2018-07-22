# multiple-page

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run e2e tests
npm run e2e

# run all tests
npm test
```
# vue-multiple vue多页面构建

.
├── README.md
├── build // webpack config
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js    
├── package.json
├── postcss.config.js
├── server.js
└── src
    ├── assets //公共静态资源
    │   ├── css
    │   │   └── common.css
    │   └── img
    │       └── logo.png
    ├── components //公共组件
    │   └── Header.vue
    └── pages
        ├── index
        │   ├── router //私有路由
        │   │   ├── index.js
        │   │   └── router.js
        │   ├── components //私有组件
        │   │
        │   ├── views //视图
        │   │
        │   ├── App.vue // 视图入口
        │   │
        │   ├── index.html //网页入口
        │   │
        │   ├── index.js //入口文件
        │   │
        │   └── assets //私有静态资源
        │       ├── css
        │       └── img
        └── about
            ├── router //私有路由
            │   ├── index.js
            │   └── router.js
            ├── components //私有组件
            │
            ├── views //视图
            │
            ├── App.vue // 视图入口
            │
            ├── about.html //网页入口
            │
            ├── about.js //入口文件
            │
            └── assets //私有静态资源
                ├── css
                └── img
