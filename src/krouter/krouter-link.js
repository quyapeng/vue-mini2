export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  render(h) {
    // h就是createElement()
    // 作用：返回一个虚拟dom
    // 获取插槽内容  this.$slots.default
    return h(
      "a",
      {
        attrs: {
          href: `#${this.to}`,
        },
      },
      this.$slots.default
    );
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
