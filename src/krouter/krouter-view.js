export default {
  render(h, { $router }) {
    // 可以传入一个组件直接渲染
    // 根据url的hash部分动态匹配这个要渲染的组件

    // 标记当前router-view深度 1.router-view depth
    this.$vnode.data.routerView = true;
    let depth = 0;
    let parent = this.$parent;
    while (parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          // 说明当前parent是一个router-view
          // 循环找出当前router-view的层级
          depth++;
        }
      }
      parent = this.$parent;
    }
    console.log(depth);

    console.log($router.$options.routes);
    console.log($router.current);
    let component = null;
    const route = $router.$options.routes.find(
      (r) => r.path === $router.current
    );
    if (route) {
      component = route.component;
    }

    return h(component);
  },

  // render(h) {
  //   // 可以传入一个组件直接渲染
  //   // 根据url的hash部分动态匹配这个要渲染的组件
  //   console.log(this.$router.$options.routes);
  //   console.log(this.$router.current);
  //   let component = null;
  //   const route = this.$router.$options.routes.find(
  //     (r) => r.path === this.$router.current
  //   );
  //   if (route) {
  //     component = route.component;
  //   }

  //   return h(component);
  // },
};
