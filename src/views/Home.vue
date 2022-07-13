<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button @click="click">test</button>
    <p>{{ $store.state.counter }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {};
  },
  methods: {
    click() {
      // 点击
      this.$store.commit("add");
    },
  },
};
</script>
