# mark

核心步骤：

1. 使用 vue-router 插件，router.js

```
import Router from 'vue-router';
Vue.use(Router)
```

2. 创建 Router 实例，在 router.js 中

```
export default new Router({})
```

3. 在跟组件上添加实例，mian.js

```
import router from './router';
new Vue({
    router,
}).$mount('#app')
```

4. 添加路由视图。App.vue

```
<router-view></router-view>
```

## vuex 核心概念 统一状态管理

    - state状态，数据
    - mutations 更改状态的函数
    - actions异步操作
    - store包含以上概念的容器

vuex 集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以可预测的方式发生变化。
单向数据流，单一状态树，用一个对象包含了全部的应用层级状态，作为一个 唯一数据源 而存在。这意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接定位任意特定的状态片段，在调试的过程中也能轻易的取得整个当前应用状态的快照。
单状态数和模块化并不冲突。

- state
  全局状态

- mutations
  修改 state 只能通过 mutation

```
mutations:{
    setState(state){
        state.name = '123'
    }
}
```

- action
  action 类似于 mutation 不同于：
  1.action 提交的是 mutation,而不是直接变更状态。
  2.action 可以包含任意异步操作
