<template>
  <div>
    <div class="header"></div>
    <div class="navbar">
      <app-navbar></app-navbar>
    </div>
    <div class="main">
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
// 会导入./AppHeader下面的index.vue组件
import { ArrowLeft } from "@element-plus/icons-vue";
import { RouterView } from "vue-router";
import AppHeader from "./components/NavMenu.vue";
import AppNavbar from "./components/SideNav.vue";
import AppMain from "./components/NavMenu.vue";

// 导入子组件，缩写格式 AppHeader: AppHeader
export default {
  components: { AppHeader, AppNavbar, AppMain }, // 有s
};
</script>

<style scoped>
/* 头部样式 */
.header {
  position: absolute;
  line-height: 50px;
  top: 0px;
  left: 270px;
  right: 0px;
  background-color: #be2a2a;
}

/* 左侧样式 */
.navbar {
  position: absolute;
  width: 240px;
  top: 0px; /* 距离上面50像素 */
  left: 0px;
  bottom: 0px;
  overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
  background-color: #ffffff;
}

/* 主区域 */
.main {
  position: absolute;
  top: 20px;
  left: 270px;
  bottom: 20px;
  right: 20px; /* 距离右边0像素 */
  padding: 10px;
  overflow-y: auto; /* 当内容过多时y轴出现滚动条 */
  background-color: #ffffff;
}


</style>
