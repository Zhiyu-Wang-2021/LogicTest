<template>

  <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"

  >
    <el-menu-item index="1" @click="$router.push({ name: 'home' })">Home</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Practice</template>
      <el-menu-item index="2-1" @click="$router.push({ name: 'judgementQuestion' })">
        Judgement Question
      </el-menu-item>
      <el-menu-item index="2-2" @click="$router.push({ name: 'multipleChoice' })">
        Multiple Choice
      </el-menu-item>
<!--      <el-menu-item index="2-3" @click="$router.push({ name: 'completion' })">-->
<!--        Completion Question-->
<!--      </el-menu-item>-->
    </el-sub-menu>
    <el-menu-item index="3" @click="$router.push({ name: 'questionList' })">
      Question Database
    </el-menu-item>
    <el-menu-item index="4" @click="$router.push({ name: 'settings' })">
      Settings
    </el-menu-item>
    <el-menu-item index="5" @click="$router.push({ name: 'help' })">
      Help
    </el-menu-item>
  </el-menu>


</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { RouterLink } from "vue-router";

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
p{font-family:"Times New Roman", Times, serif;}
</style>