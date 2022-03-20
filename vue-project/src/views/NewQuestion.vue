<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="Question Type">
      <el-select v-model="form.type" placeholder="please select question type">
        <el-option label="Judgement Question" value="judgement" />
        <el-option label="Multiple Choice Question" value="multi" />
      </el-select>
    </el-form-item>
    <el-form-item label="Your Question">
      <el-input v-model="form.content" type="textarea" data="newQuestion" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="$router.back()">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from "vue";
import router from "../router";

// do not use same name with ref
const form = reactive({
  type: "",
  content: "",
});

const onSubmit = () => {
  const question = {
    type: form.type,
    content: form.content,
  };
  console.log(question);
  const prevQuestions = JSON.parse(localStorage.getItem("questions"));
  localStorage.setItem(
    "questions",
    JSON.stringify([question].concat(prevQuestions))
  );
  router.back();
};
</script>

<script>
export default {
  name: "NewQuestion",
};
</script>
