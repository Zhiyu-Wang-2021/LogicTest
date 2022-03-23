<template>
  <div class="container">
    <p>Practice settings</p>
    <div class="slider-demo-block">
      <span class="demonstration">Questions per practice</span>
      <el-slider
        v-model="this.questionPerPractice"
        :step="5"
        show-stops
        :min="5"
        :max="50"
        @change="setQuestionsPerPractice"
      />
    </div>
    <p>Database settings</p>
    <div class="btn-container">
      <el-button
        @click="loadSampleQuestions"
        type="primary"
        plain
        style="width: 300px"
        >Load sample questions</el-button
      >
      <el-button
        @click="clearQuestionDB"
        type="danger"
        plain
        style="width: 300px"
        >Clear question database</el-button
      >
    </div>
  </div>
</template>

<script>
import sampleQuestions from "../assets/sampleQuestions.json";
export default {
  name: "SettingsView",
  data() {
    return {
      questionPerPractice: localStorage.getItem("qPerPractice")
        ? parseInt(localStorage.getItem("qPerPractice"))
        : 10,
    };
  },
  methods: {
    setQuestionsPerPractice() {
      localStorage.setItem("qPerPractice", this.questionPerPractice);
    },
    clearQuestionDB() {
      if (localStorage.getItem("questions")) {
        localStorage.setItem("questions", JSON.stringify([]));
      }
    },
    loadSampleQuestions() {
      localStorage.setItem("questions", JSON.stringify(sampleQuestions));
    },
  },
};
</script>
<style scoped>
.container {
  width: 50%;
  margin: 150px auto auto;
  min-width: 800px;
}

.slider-demo-block {
  display: flex;
  align-items: center;
  padding-bottom: 50px;
}
.slider-demo-block {
  margin-top: 0;
  margin-left: 12px;
}
.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 44px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}
.slider-demo-block .demonstration {
  flex: 0 0 70%;
}
</style>

