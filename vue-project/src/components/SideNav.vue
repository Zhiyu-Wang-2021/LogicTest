<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-aside width =1200>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
      <h2 class="mb-2" style="text-align:center" >Logic Test</h2>
      <el-menu-item index="1" @click="$router.push({ name: 'home' })">Home</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Practice</template>
            <el-menu-item index="2-1" @click="$router.push({ name: 'judgementQuestion' })">
              Judgement Question
            </el-menu-item>
            <el-menu-item index="2-2" @click="$router.push({ name: 'multipleChoice' })">
              Multiple Choice
            </el-menu-item>
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
        <el-menu-item index="6" @click="$router.push({ name: 'about' })">
          About
        </el-menu-item>
      </el-menu>
      </el-aside>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
  height: 96vh;
}
.mb-2{
  color: #36343b;
  font-family: Arial Black;
}
</style>
