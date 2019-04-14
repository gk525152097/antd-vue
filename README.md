# antd-vue

> Antd framework based on Vue

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
```

## 使用内容
> Vuex
``` bash
# 文件结构
store
|-modules
  |-modulesItem
|-getter
|-index

# 全局数据原
```

> permisstion文件
``` bash
路由控制
```

> NProgress
``` bash
页面切换进度

# 引入
import NProgress from 'nprogress'

# 配置
NProgress.configure({ showSpinner: false })

# 使用
NProgress.start() // 开始
NProgress.done() // 结束
```

> MOCK
``` bash
模拟数据

文件结构
|-mock
  |-index
  |-user

index为mock主文件
user为对应模块数据源
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
