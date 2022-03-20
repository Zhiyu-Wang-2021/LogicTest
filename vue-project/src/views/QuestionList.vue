<template>

  <el-button type="warning" @click="$router.push({ name: 'newQuestion' })">
    New Question
  </el-button>
  <h1>question list</h1>
</template>

<script>
export default {
  name: "QuestionList",
};
</script>

<style scoped></style>
