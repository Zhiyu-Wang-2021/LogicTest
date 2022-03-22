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
      <ResultProgressBar
        :correct="this.correctCount"
        :total="this.questionIndex"
      />
      <el-button type="success" @click="finish">Finish</el-button>
    </div>
    <div v-else>
      <p>There are no question in the question database.</p>
    </div>
  </div>
</template>

<script setup>
import QuestionCard from "../components/QuestionCard.vue";
import ResultProgressBar from "../components/ResultProgressBar.vue";
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
    feedback(yourAns) {
      if (yourAns === this.correctIndex) {
        this.corrFeedback();
      } else {
        this.errFeedback();
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
    errFeedback() {
      if (this.questionIndex < this.qPerPractice) {
        ElMessage.error(`Wrong. (${this.correctCount}/${this.questionIndex + 1})`);
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
  max-width: 400px;
  margin: auto;
}
</style>
