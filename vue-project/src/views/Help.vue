<template>
  <h1>Help</h1>
  <p>
    There are two kinds of questions: judgement questions and multiple choice. Users can choose the kind of question they want to answer.
    For the judgement question, users need to judge whether the displayed answer is correct and click on the “True” or “False” button. For the multiple-choice, users click on the button to give their answer. The correct rate will be displayed in the end when five questions are answered.

    Questions can be added to or removed from the question database. When adding a new question, type in both the question and the answer in the form of propositional logic formulas. Eg: a\/b/\C, a-&gt;!(b&lt;-&gt;c)
    -&gt; means →
    &lt;-&gt; means ↔
    \/ means ∨
    /\ means ∧
    ! means ¬
  </p>
</template>

<script>
export default {
  name: "Help"
}
</script>

<style scoped>

</style>