<template>
  <el-progress
    type="dashboard"
    :percentage="Math.floor((100 * correct) / total)"
    :status="Math.floor((100 * correct) / total) > 60 ? 'success' : 'exception'"
  >
    <template #default="{ percentage }">
      <span class="percentage-value">{{ correct }}/{{ total }} </span>
      <span class="percentage-label">Progressing</span>
    </template>
  </el-progress>
</template>

<script>
export default {
  name: "resultProgressBar",
  props: {
    correct: Number,
    total: Number,
  },
};
</script>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
