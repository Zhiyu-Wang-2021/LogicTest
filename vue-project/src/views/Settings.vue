<template>
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
  <el-button @click="loadSampleQuestions">Load sample questions</el-button>
  <el-button @click="clearQuestionDB">Clear question database</el-button>
</template>

<script>
import sampleQuestions from "../assets/sampleQuestions.json";
export default {
  data() {
    return {
      questionPerPractice: 10,
    };
  },
  methods: {
    setQuestionsPerPractice(){
      localStorage.setItem("qPerPractice", this.questionPerPractice)
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
.slider-demo-block {
  display: flex;
  align-items: center;
}
.slider-demo-block .el-slider {
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
.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>
