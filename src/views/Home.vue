<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <!-- <iframe
      @load="docLoad"
      :id="id"
      width="100%"
      height="500px"
      :src="
        'https://view.officeapps.live.com/op/view.aspx?src=' +
          'https://hxt-content.oss-cn-shanghai.aliyuncs.com/public/temp/001.pptx'
      "
      sandbox="allow-forms allow-popups allow-scripts allow-same-origin allow-top-navigation allow-modals"
      frameborder="0"
      scrolling="auto"
    ></iframe> -->
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
};
</script>
