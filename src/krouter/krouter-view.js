export default {
  render(h) {
    // 获取path对应的component

    // 1.标记当前view-router深度

    const { routeMap, current } = this.$router;
    // console.log(routeMap, current);
    const component = routeMap[current].component || null;
    return h(component);
  },
};

// {
//   render(h) {
//     // 可以传入一个组件直接渲染
//     // 根据url的hash部分动态匹配这个要渲染的组件
//     console.log(this.$router.$options.routes);
//     console.log(this.$router.current);
//     let component = null;
//     const route = this.$router.$options.routes.find(
//       (r) => r.path === this.$router.current
//     );
//     if (route) {
//       component = route.component;
//     }

//     return h(component);
//   },
// }
