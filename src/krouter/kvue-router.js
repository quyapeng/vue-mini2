let Vue;
// import Home from "../views/Home";

// vue插件编写
// 实现一个install方法
class VueRouter {
  constructor(options) {
    console.log(Vue);
    this.$options = options;
    // 保存当前hash到current
    // 当前current应该是响应式的
    // 给指定对象响应式属性
    // 给this上添加一个current属性，将来所有跟current有依赖关系的方法都会重新执行，比如render
    Vue.util.defineReactive(
      this,
      "current",
      window.location.hash.slice(1) || "/"
    );
    // this.current = "/";
    // 监控hashchange
    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1);
    });
  }
}

// 形参1是vue构造函数--> 目的是便于扩展
// install.call(VueRouter, Vue)
//
VueRouter.install = function(_Vue) {
  Vue = _Vue;
  // 1.将$router注册一下
  // 下面的代码延迟到未来的某个时刻：根实例创建时 ： mixin 全局混入
  Vue.mixin({
    beforeCreate() {
      // 每一个组件beforecreate的时候都会执行
      // 只需要根实例时执行一次
      // 每一个组件都会有$options,里面是组件所有的配置选项信息
      if (this.$options.router) {
        // 将来任何组件都可以通过$router访问路由器实例，比如this.$router.push()...
        Vue.prototype.$router = this.$options.router;
      }
    },
  });
  // 2.注册两个全局组件 router-link  router-view
  // 运行时版本，template不支持。只能使用render
  Vue.component("router-link", {
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
  });
  Vue.component("router-view", {
    render(h) {
      // 可以传入一个组件直接渲染
      // 根据url的hash部分动态匹配这个要渲染的组件
      console.log(this.$router.$options.routes);
      console.log(this.$router.current);
      let component = null;
      const route = this.$router.$options.routes.find(
        (r) => r.path === this.$router.current
      );
      if (route) {
        component = route.component;
      }

      return h(component);
    },
  });
};

export default VueRouter;
