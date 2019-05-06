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
路由守卫
作为动态路由的关键
由于动态创建的路由会因为 浏览器刷新而重置
包括store 也会被重置
故 需要在路由守卫里 重新渲染 路由

本框架的 动态路由方式为
  ·以角色为KEY请求路由
  ·角色存储在localStorage里
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

#文件结构
|-mock
  |-index
  |-user

index为mock主文件
user为对应模块数据源
```

> vue-cookie
``` bash
#备注 未接入 占定为cookie技术

#VueCookie
封装好的cookie插件 更方便cookie的使用
```

> echarts
``` bash
#echarts-v3

#echarts-wordCloud

#echarts-liquidfill

#echarts-lg
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
