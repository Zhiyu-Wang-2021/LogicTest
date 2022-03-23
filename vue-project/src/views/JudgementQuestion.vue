<template>
  <div class="container">
    <div v-if="!this.completed && this.questions.length > 0" align="center">
      <QuestionCard
        :num="this.questionIndex + 1"
        :content="this.currQuestionContent"
      />
      <div class="answerArea">
        <h2>Equivalence:</h2>
        <h2>{{ this.answer }}</h2>
      </div>
      <div class="buttons">
        <el-button type="success" @click="feedback(true)">True</el-button>
        <el-button type="danger" @click="feedback(false)">False</el-button>
      </div>
    </div>
    <div v-else-if="this.questions.length > 0" style="padding-top: 130px">
      <ResultProgressBar
        :correct="this.correctCount"
        :total="this.questionIndex"
      />
      <el-button type="primary" @click="finish" style="width: 100%"
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
      answer: "",
      isCorrect: false,
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
      if (this.questions.length > 0) {
        this.currQuestionContent = this.questions[this.questionIndex].content;
        this.isCorrect = Math.random() < 0.5;
        if (this.isCorrect) {
          this.answer = this.questions[this.questionIndex].answer;
        } else {
          this.answer = returnRandomAnswer(
            this.questions[this.questionIndex].answer,
            1
          )[0];
        }
      }
    },
    feedback(yourAns) {
      if (yourAns === this.isCorrect) {
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
        ElMessage.error(
          `Wrong. Correct answer: ${
            this.questions[this.questionIndex].answer
          } (${this.correctCount}/${this.questionIndex + 1})`
        );
        ElNotification({
          title: this.questions[this.questionIndex].content,
          message: `The correct answer is ${
            this.questions[this.questionIndex].answer
          }`,
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

.answerArea {
  margin: 0 auto;
  background-color: #17dcff;
}

.buttons {
  display: flex;
  width: 300px;
  position: absolute;
  justify-content: space-around;
  left: 50%;
  transform: translate(-50%, 100%);
  background-color: #ffffff;
}

ResultProgressBar {
  top: 200px;
}
button {
  width: 100px;
  height: 70px;
}

</style>
