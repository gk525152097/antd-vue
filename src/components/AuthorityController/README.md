#权限控件

```
##目的 为了限制权限 于后台实际权限一直
  通过功能权限模块 新增权限 并返回ID
  在使用时 将ID赋予组件
  从后台返回可使用功能ID
  匹配通过后 功能可使用

##关键点
  1、组件ID是必须的
  2、白名单ID

##逻辑方式
  本组件是通过 用户登录时获取 白名单ID
  并存储到localStorage authority(数组) 并在组件进行判断

  可以修改为 从外部传入白名单ID 再进行匹配
```
