<template>
  <div class="container">
    <h1>Frequently Asked Questions</h1>
    <div class="demo-collapse">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="How to do practice:" name="1">
          <p>
            There are two kinds of questions: Judgement Questions and
            Multiple-Choice.
          </p>
          <p>Users can choose the kind of question they want to answer.</p>
          <ul>
            <li>
              Judgement Question: Users need to judge whether the displayed
              answer is correct and click on the “True” or “False” button.
            </li>
            <li>
              Multiple-Choice: Users click on the button to give their answer.
              The correct rate will be displayed in the end when five questions
              are answered.
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="How to use Question Database:" name="2">
          <p>
            Questions can be added to or removed from the question database.
            When adding a new question, type in both the question and the answer
            in the form of propositional logic formulas.
          </p>
          <p>Eg: a\/b/\C, a-&gt;!(b&lt;-&gt;c)</p>
          <ul>
            <li>-&gt; means → ; &lt;-&gt; means ↔</li>
            <li>\/ means ∨ ; /\ means ∧</li>
            <li>! means ¬</li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeNames = ref(["1"]);
const handleChange = (val) => {
  console.log(val);
};
</script>

<script>
export default {
  name: "HelpView",
};
</script>

<style scoped>
.container {
  min-width: 600px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
