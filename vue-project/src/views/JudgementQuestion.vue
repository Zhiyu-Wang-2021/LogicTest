<template>
  <div class="container">
    <QuestionCard />

    <el-button type="success" @click="corrFeedback">True</el-button>
    <el-button type="danger" @click="errFeedback">False</el-button>
  </div>
</template>

<script setup>
import QuestionCard from "../components/QuestionCard.vue";
</script>
<script>
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      questions: [],
      correctCount: 0,
      questionIndex: 0,
    };
  },
  mounted() {
    console.log("mounting...");
    try {
      if (localStorage.getItem("questions")) {
        this.questions = JSON.parse(localStorage.getItem("questions"));
      }
    } catch (e) {
      console.log(e.message);
    }
    console.log(this.questions);
  },
  methods: {
    corrFeedback() {
      this.questionIndex += 1;
      this.correctCount += 1;
      ElMessage({
        message: `Correct! (${this.correctCount}/${this.questionIndex})`,
        type: "success",
      });
    },
    errFeedback() {
      this.questionIndex += 1;
      ElMessage.error(`Wrong. (${this.correctCount}/${this.questionIndex})`);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
}
</style>
