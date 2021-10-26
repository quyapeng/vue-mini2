// 实现插件：
//  1 声明一个store类，维护响应式state，暴露commit,dispatch
//  2. install： 注册$store

class Store {
  constructor(options) {
    // 保存选项
    this.$options = options;
    
    this._mutations = options.mutations;
    this._actions = options.actions;
    // api: state
    // 用户传入的state选项应该是响应式， 可以参考router中-->defineReactive
    this._vm = new Vue({
      data(){
        return {
          // 不希望$$state被代理，所以加两个$
          $$state: options.state
        }
      }
    })

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

  }

  // 存取器
  get state(){
    return this._vm._data.$$state;
  }

  set state(){
    // 不允许直接修改state
    console.warn('请使用replaceState()去修改状态');
  }

  // 固定修改state

  commit(type, payload){
    // 匹配type对应的mutation
    const entry = this._mutations[type];
    if(!entry){
      console.error('error');
      return
    }
    entry(this.state, payload);
  }

  dispatch(type, payload){
    // 匹配type对应的mutation
    const entry = this._actions[type];
    if(!entry){
      console.error('error');
      return
    }
    // 此处的上下文？  { commit,dispatch}
    return entry(this, payload);
  }
}

let Vue;
function install(_Vue) {
  //保存传过来的vue
  Vue = _Vue;

  // 注册$store
  Vue.mixin({
    BeforeCreate() {
      //只执行一次
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

// 到处对象是vuex
export default {
  Store,
  install,
};
