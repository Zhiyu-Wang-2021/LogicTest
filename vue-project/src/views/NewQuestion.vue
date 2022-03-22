<template>
  <div class="container">
    <el-form :model="form" label-width="120px">
      <!--    <el-form-item label="Question Type">-->
      <!--      <el-select v-model="form.type" placeholder="please select question type">-->
      <!--        <el-option label="Judgement Question" value="judgement" />-->
      <!--        <el-option label="Multiple Choice Question" value="multi" />-->
      <!--      </el-select>-->
      <!--    </el-form-item>-->
      <el-form-item label="Question">
        <el-input v-model="form.content" type="textarea" data="newQuestion" @change="onFormChange"/>
      </el-form-item>
      <el-form-item label="Answer">
        <el-input v-model="form.answer" type="textarea" data="newQuestion" @change="onFormChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="$router.back()">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import router from "../router";

// do not use same name with ref
const form = reactive({
  // type: "",
  content: "",
  answer: "",
});

const onFormChange = () => {
  form.answer = strToOperation(form.answer)
  form.content = strToOperation(form.content)
}

const onSubmit = () => {
  onFormChange()
  const question = {
    // type: form.type,
    content: form.content,
    answer: form.answer,
  };
  console.log(question);
  let prevQuestions = [];
  if (localStorage.getItem("questions")) {
    prevQuestions = JSON.parse(localStorage.getItem("questions"));
  }
  localStorage.setItem(
    "questions",
    JSON.stringify([question].concat(prevQuestions))
  );
  router.back();
};
</script>

<script>
import strToOperation from "../scripts/strToOperation";

export default {
  name: "NewQuestion",
};
</script>

<style>
.container {
  max-width: 920px;
  margin: auto;
}
</style>
