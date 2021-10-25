<template>
  <div id="app">
    <div id="nav">
      <!-- 路由跳转连接 -->
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <p>{{ $store.state.counter }}</p>
    <!-- <Counter /> -->
    <!-- 路由出口 -->
    <!-- 利用vue响应式：current -->
    <p>状态{{ $store.state.islogin }}</p>
    <button @click="changeState">test</button>
    <router-view />
  </div>
</template>
<script>
import store from "./store";
// const Counter = {
//   render() {
//     return <div>w</div>;
//   },
//   computed: {
//     name() {
//       return "1";
//     },
//   },
// };
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    changeState() {
      console.log("changeState", store.state.islogin);
      // this.$store.commit("login");
      this.$store
        .dispatch("login", "111")
        .then(
          (res) => {
            console.log("111", res);
          },
          (res) => {
            console.log("222", res);
          }
        )
        .catch(() => {
          alert("错了不");
        });
    },
  },
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
