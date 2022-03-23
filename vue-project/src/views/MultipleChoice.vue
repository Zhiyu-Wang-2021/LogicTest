<template>
  <div class="container">
    <div v-if="!this.completed && this.questions.length > 0">
      <QuestionCard
        :num="this.questionIndex + 1"
        :content="this.currQuestionContent"
      />
      <div class="options">
        <div v-for="(answer, index) in this.answers" :key="answer">
          <div class="button">
            <el-button
              size="large"
              @click="feedback(index)"
              type="primary"
              plain
              >{{ answer }}</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="this.questions.length > 0" style="padding-top: 130px">
      <ResultProgressBar
        :correct="this.correctCount"
        :total="this.questionIndex"
      />
      <el-button type="primary" plain @click="finish" style="width: 100%" 
        >Finish</el-button
      >
    </div>
    <div v-else align="center">
      <el-card class="box-card">
        <div  class="text item">There are no question in the question database.</div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import QuestionCard from "../components/QuestionCard.vue";
import ResultProgressBar from "../components/ResultProgressBar.vue";
</script>
<script>
import { ElMessageBox, ElMessage, ElNotification } from "element-plus";
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
      qPerPractice: 10,
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
    if (!localStorage.getItem("qPerPractice"))
      localStorage.setItem("qPerPractice", 10);
    this.qPerPractice = Math.min(
      localStorage.getItem("qPerPractice"),
      this.questions.length
    );
    this.randomizeQuestions();
    console.log(this.questions);
    this.renderValues();
  },
  methods: {
    randomizeQuestions() {
      let newQuestions = [];
      let count = 0;
      const maxCount = 50;
      while (newQuestions.length < this.qPerPractice) {
        let newQuestion =
          this.questions[Math.floor(Math.random() * this.questions.length)];
        let pass = false;
        while (!pass) {
          count += 1;
          pass = true;
          newQuestion =
            this.questions[Math.floor(Math.random() * this.questions.length)];
          for (let i = 0; i < newQuestions.length; i++) {
            if (
              count < maxCount &&
              newQuestions[i].content === newQuestion.content
            ) {
              pass = false;
              break;
            }
          }
        }
        count = 0;
        newQuestions.push(newQuestion);
      }
      this.questions = newQuestions;
    },
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
    feedback(yourAnsIndex) {
      if (yourAnsIndex === this.correctIndex) {
        this.corrFeedback();
      } else {
        this.errFeedback(yourAnsIndex);
      }
    },
    corrFeedback() {
      if (this.questionIndex < this.qPerPractice) {
        this.correctCount += 1;
        ElMessage({
          message: `Correct! (${this.correctCount}/${this.questionIndex + 1})`,
          type: "success",
        });
        this.nextQuestion();
      }
    },
    errFeedback(yourAnsIndex) {
      if (this.questionIndex < this.qPerPractice) {
        ElMessage.error(
          `Wrong. Correct answer: ${
            this.questions[this.questionIndex].answer
          } (${this.correctCount}/${this.questionIndex + 1})`
        );
        ElNotification({
          title: this.questions[this.questionIndex].content,
          message: `The correct answer is ${
            this.questions[this.questionIndex].answer
          } but your answer is ${this.answers[yourAnsIndex]}`,
          duration: 17000,
          type: "message",
        });
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
          type:
            this.correctCount / this.questionIndex > 0.6 ? "success" : "error",
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
      if (this.questionIndex < this.qPerPractice) {
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
  display: flex;
  flex-direction: row;
  justify-content: center;

  max-width: 400px;
  margin: auto;
}
.options {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 80%;
  height: 200px;
  background-color: #ffffff;
}
.button {
  width: 100%;
  background-color: #ffffff;
}
</style>
