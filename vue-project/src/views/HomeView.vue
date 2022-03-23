<script setup></script>
<template>
  <div class="container">
    <div>
    <h1><strong>Welcome to Logic Test</strong></h1>
    <p>
      This website helps 1st year undergraduate students to practice and
      understand propositional logic.
    </p>
    <p>
      There are existing questions ready to be loaded from the Question
      Database. And you can add questions as well.
    </p>
    <p>
      For more information on how to use this website, please refer to the Help
      page.
    </p>
    </div>
    <div class="welcomePic">
    <img src="..\assets\hello2.svg" /> 
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-55%);
}
.welcomePic{
  padding-top: 70px;
}

h1 {
  font-size: 90px;
}
</style>
