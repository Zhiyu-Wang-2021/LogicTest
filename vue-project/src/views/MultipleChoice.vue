<template>
  <div class="container">
    <div v-if="!this.completed && this.questions.length > 0">
      <QuestionCard
        :num="this.questionIndex + 1"
        :content="this.currQuestionContent"
      />
      <h2>Answer:</h2>
      <ul>
        <li v-for="(answer, index) in this.answers" :key="answer">
          <el-button @click="feedback(index)">{{ answer }}</el-button>
        </li>
      </ul>
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
import returnRandomAnswer from "../scripts/randomAnswer";

export default {
  data() {
    return {
      questions: [],
      correctCount: 0,
      questionIndex: 0,
      currQuestionContent: "",
      answers: [],
      correctIndex: 0,
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
    this.renderValues();
  },
  methods: {
    renderValues() {
      const amount = 4;
      if (this.questions.length > 0) {
        this.currQuestionContent = this.questions[this.questionIndex].content;
        this.correctIndex = Math.floor(Math.random() * amount);
        this.answers = returnRandomAnswer(
          this.questions[this.questionIndex].answer,
          amount
        );
        this.answers[this.correctIndex] =
          this.questions[this.questionIndex].answer;
      }
    },
    feedback(yourAns) {
      if (yourAns === this.correctIndex) {
        this.corrFeedback();
      } else {
        this.errFeedback();
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
        this.renderValues();
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
          type:
            this.correctCount / this.questionIndex > 0.7
              ? "success"
              : "error",
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
        this.renderValues();
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
