import Vue from "vue";
import Vuex from "vuex";

// this.$store
// this.$store.state.xxx
Vue.use(Vuex);

export default new Vuex.Store({
  // namespace: true, // 设置独立命名空间，避免命名冲突
  // state是响应式对象
  state: {
    counter: 0,
    islogin: false,
  },
  mutations: {
    add(state) {
      // state从哪来？
      state.counter++;
    },
    login(state) {
      state.islogin = true;
    },
  },
  actions: {
    // 上下文从何来
    add({ commit }) {
      // 参数是什么，哪来的？
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
    login({ commit }, name) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (name == "123") {
            commit("login");
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
    },
  },
  modules: {
    // user // 访问变量为this.$store.state.user.islogin, this.$store.commit('user/login'),以此类推
  },
});
