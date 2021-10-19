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
