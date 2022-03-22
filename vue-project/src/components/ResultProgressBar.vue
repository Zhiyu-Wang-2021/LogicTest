<template>
  <el-progress
    type="dashboard"
    :percentage="Math.floor((100 * correct) / total)"
    :status="Math.floor((100 * correct) / total) > 60 ? 'success' : 'exception'"
    :stroke-width="40"
    :width="500"
  >
    <template #default="{ percentage }">
      <span class="percentage-value">{{ correct }}/{{ total }} </span>
      <span class="percentage-label">Result</span>
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
  font-size: 120px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 50px;
}
</style>
