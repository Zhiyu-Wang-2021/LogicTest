<template>
  <div class="container">
    <div class="table">
    <el-table :data="questions" style="width: 100%" max-height="800px">
      <el-table-column fixed prop="content" label="Question" width="400" />
      <el-table-column fixed prop="answer" label="Answer" width="400" />
      <el-table-column fixed="right" label="" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="deleteQuestion(scope.$index)"
          >
            Remove
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <el-button
      type="primary"
      class="mt-4"
      style="width: 100%"
      @click="$router.push({ name: 'newQuestion' })"
      >Add Question</el-button
    >
  </div>
</template>

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
    deleteQuestion(questionIndex) {
      console.log(questionIndex);
      try {
        let prevQuestions = [];
        if (localStorage.getItem("questions")) {
          prevQuestions = JSON.parse(localStorage.getItem("questions"));
        }
        console.log("prevQuestions");
        console.log(prevQuestions);
        console.log("deleting...");
        const currQuestions = prevQuestions.filter(
          (q, i) => i !== questionIndex
        );
        localStorage.setItem("questions", JSON.stringify(currQuestions));
        console.log("deleted");
        this.questions = currQuestions;
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 920px;
  margin: auto;
}
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
.table{
  margin-bottom: 30px;
}
</style>
