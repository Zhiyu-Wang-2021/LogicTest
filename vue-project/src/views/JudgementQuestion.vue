<template>
  <div class="container">
    <div v-if="!this.completed && this.questions.length > 0">
      <QuestionCard
        :num="this.questionIndex + 1"
        :content="this.currQuestionContent"
      />
      <h2>Answer: </h2>
      <h2>{{ this.answer }}</h2>
      <el-button type="success" @click="corrFeedback">True</el-button>
      <el-button type="danger" @click="errFeedback">False</el-button>
    </div>
    <div v-else-if="this.questions.length > 0">
      <el-button type="success" @click="finish">Finish</el-button>
    </div>
    <div v-else>
      <p>There are no question in the question database.</p>
    </div>
  </div>
</template>

<script setup>
import QuestionCard from "../components/QuestionCard.vue";
</script>
<script>
import { ElMessageBox, ElMessage } from "element-plus";
import router from "../router";
export default {
  data() {
    return {
      questions: [],
      correctCount: 0,
      questionIndex: 0,
      currQuestionContent: "",
      answer: "",
      completed: false,
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
    this.setCardValues();
  },
  methods: {
    setCardValues(){
      if (this.questions.length > 0) {
        this.currQuestionContent = this.questions[this.questionIndex].content;
        this.answer = this.questions[this.questionIndex].answer;
      }
    },
    corrFeedback() {
      if (this.questionIndex < this.questions.length) {
        this.correctCount += 1;
        ElMessage({
          message: `Correct! (${this.correctCount}/${this.questionIndex + 1})`,
          type: "success",
        });
        this.nextQuestion();
      }
    },
    errFeedback() {
      if (this.questionIndex < this.questions.length) {
        ElMessage.error(`Wrong. (${this.correctCount}/${this.questionIndex})`);
        this.setCardValues();
        this.nextQuestion();
      }
    },
    finish() {
      ElMessageBox.confirm(
        `result: ${this.correctCount}/${this.questionIndex}`,
        "Completed!",
        {
          confirmButtonText: "Back to home",
          cancelButtonText: "Cancel",
          type: "success",
        }
      )
        .then(() => {
          router.push({ name: "home" });
        })
        .catch(() => {
          console.log("stay");
        });
    },
    nextQuestion() {
      this.questionIndex += 1;
      if (this.questionIndex < this.questions.length) {
        this.setCardValues();
      } else {
        this.completed = true;
        this.finish();
      }
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
