<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span :key="num">{{ num }}</span>
      </div>
    </template>
    <div class="text item">{{ content }}</div>
  </el-card>
</template>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>

<script>
export default {
  name: "QuestionCard",
  props: {
    num: Number,
    content: String,
  },
};
</script>
