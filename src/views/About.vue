<template>
  <div class="boxs">
    <div class="maskLoading" v-if="isLoading">
      <div class="loading">
        <div :style="{ width: loadingWidth + '%' }"></div>
      </div>
      <div style="padding-left: 10px;">{{ parseInt(loadingWidth) }}%</div>
    </div>
    <div class="mask">
      <p>x : {{ defaultMap.x }} y:{{ defaultMap.y }} z :{{ defaultMap.z }}</p>
      <button @click="isAutoFun">转动车</button>
      <button @click="stop">停止</button>
      <div class="flex">
        <div
          @click="setCarColor(index)"
          v-for="(item, index) in colorAry"
          :key="index"
          :style="{ backgroundColor: item }"
        ></div>
      </div>
    </div>
  <div class="about">
    <h1>This is an about page</h1>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import {
  Color,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
//车身颜色数组
const colorAry = [
  "rgb(216, 27, 67)",
  "rgb(142, 36, 170)",
  "rgb(81, 45, 168)",
  "rgb(48, 63, 159)",
  "rgb(30, 136, 229)",
  "rgb(0, 137, 123)",
  "rgb(67, 160, 71)",
  "rgb(251, 192, 45)",
  "rgb(245, 124, 0)",
  "rgb(230, 74, 25)",
  "rgb(233, 30, 78)",
  "rgb(156, 39, 176)",
  "rgb(0, 0, 0)",
]; // 车身颜色数组
export default {
  name: "About",
  components: {},
  data() {
    return {
      colorAry,
      loader: new GLTFLoader(), //引入模型的loader实例
      defaultMap: {
        // x: 510,
        // y: 128,
        // z: 0,
        x: 1,
        y: 1,
        z: -6,
      },
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
      floor: null,
      dhelper: null,
      hHelper: null,
      directionalLight: null,
      hemisphereLight: null, // 定义所有three实例变量
      isLoading: true, //是否显示loading  这个load模型监听的进度
      loadingWidth: 0, //loading的进度,
    };
  },
  methods: {
    //创建灯光
    setLight() {
      this.directionalLight = new DirectionalLight(0xffffff, 4);
      this.directionalLight.position.set(-4, 8, 4);
      this.dhelper = new DirectionalLightHelper(
        this.directionalLight,
        5,
        0xff0000
      );
      this.hemisphereLight = new HemisphereLight(0xffffff, 0xffffff, 4);
      this.hemisphereLight.position.set(0, 8, 0);
      this.hHelper = new HemisphereLightHelper(this.hemisphereLight, 1);
      this.scene.add(this.directionalLight);
      this.scene.add(this.hemisphereLight);
    },

    // 创建场景
    setScene() {
      this.scene = new Scene();
      this.renderer = new WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      // debugger;
      document.querySelector(".boxs").appendChild(this.renderer.domElement);
    },

    // 创建相机
    setCamera() {
      const { x, y, z } = this.defaultMap;
      this.camera = new PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.camera.position.set(x, y, z);
    },

    // 设置模型控制
    setControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.maxPolarAngle = (0.9 * Math.PI) / 2;
      this.controls.enableZoom = true;
      this.controls.addEventListener("change", this.render);
    },

    //返回坐标信息
    render() {
      this.defaultMap.x = Number.parseInt(this.camera.position.x);
      this.defaultMap.y = Number.parseInt(this.camera.position.y);
      this.defaultMap.z = Number.parseInt(this.camera.position.z);
    },

    // 循环场景 、相机、 位置更新
    loop() {
      requestAnimationFrame(this.loop);
      this.renderer.render(this.scene, this.camera);
      this.controls.update();
    },

    //是否自动转动
    isAutoFun() {
      this.controls.autoRotate = true;
    },
    //停止转动
    stop() {
      this.controls.autoRotate = false;
    },

    //设置车身颜色
    setCarColor(index) {
      const currentColor = new Color(this.colorAry[index]);
      this.scene.traverse((child) => {
        if (child.isMesh) {
          // console.log(child.name);
          child.material.color.set(currentColor);
          // if (child.name.includes("door_")) {
          //   console.log(child);
          //   child.material.color.set(currentColor);
          // }
        }
      });
    },

    loadFile(url) {
      return new Promise((resolve, reject) => {
        console.log(this.loader.load);
        this.loader.load(
          url,
          (onLoad) => {
            console.log(onLoad);
            resolve(onLoad);
          },
          ({ loaded, total }) => {
            let load = Math.abs((loaded / total) * 100);
            this.loadingWidth = load;
            if (load >= 100) {
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);
            }
            console.log((loaded / total) * 100 + "% loaded");
          },
          (err) => {
            reject(err);
          }
        );
      });
    },

    // 初始化所有函数
    async init() {
      this.setScene();
      this.setCamera();
      this.setLight();
      this.setControls();
      let gltf = await this.loadFile(
        "https://c648ubq5g6h8s6r48jfg.baseapi.memfiredb.com/storage/v1/object/public/images/turbo/scene.gltf"
      );
      // console.log("gltf", gltf);
      this.scene.add(gltf.scene);
      this.loop();
    },
  },
  mounted() {
    console.log("onMounted", 123);
    this.init();
  },
};
</script>
<style>
canvas {
  width: 100%;
  height: 100%;
  margin: auto;
}

.mask {
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.flex div {
  width: 10px;
  height: 10px;
  margin: 5px;
  cursor: pointer;
}
</style>
