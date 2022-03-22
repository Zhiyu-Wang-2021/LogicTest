<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <h3><span :key="num">Question {{ num }}</span></h3>
      </div>
    </template>
    <div class="text item" align="center"><font size="5" color="grey">{{ content }}</font></div>
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
  margin-top: 18px;
}

.box-card {
  width: 480px;
  margin: 100px;
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
