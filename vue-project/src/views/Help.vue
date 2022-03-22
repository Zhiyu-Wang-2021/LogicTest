<template>
  <div class="container">
    <h1>Help</h1>
    <h3>How to do practice:</h3>
    <p>
      There are two kinds of questions: Judgement Questions and Multiple-Choice.
    </p>
    <p>Users can choose the kind of question they want to answer.</p>
    <ul>
      <li>
        Judgement Question: Users need to judge whether the displayed answer is
        correct and click on the “True” or “False” button.
      </li>
      <li>
        Multiple-Choice: Users click on the button to give their answer. The
        correct rate will be displayed in the end when five questions are
        answered.
      </li>
    </ul>
    <h3>How to use Question Database:</h3>
    <p>
      Questions can be added to or removed from the question database. When
      adding a new question, type in both the question and the answer in the
      form of propositional logic formulas.
    </p>
    <p>Eg: a\/b/\C, a-&gt;!(b&lt;-&gt;c)</p>
    <ul class="ba">
      <li>-&gt; means → ; &lt;-&gt; means ↔</li>
      <li>\/ means ∨ ; /\ means ∧</li>
      <li>! means ¬</li>
    </ul>
  </div>
</template>

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

ul.ba {
  list-style-type: none;
  font-size: 20px;
}
</style>
