<template>
  <el-button type="warning" @click="$router.push({ name: 'newQuestion' })">
    New Question
  </el-button>
  <el-button
    type="warning"
    @click="localStorage.setItem('questions', JSON.stringify([]))"
  >
    New Question
  </el-button>
  <h1>question list</h1>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="i in questions" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);
const load = () => {
  count.value += 2;
};
</script>

<script>
export default {
  name: "QuestionList",
  data() {
    return {
      questions: [],
    };
  },
  mounted() {
    console.log("mounting...");
    if (localStorage.getItem("questions")) {
      this.questions = JSON.parse(localStorage.getItem("questions"));
    }
    console.log(this.questions);
  },
};
</script>

<style>
.infinite-list {
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
