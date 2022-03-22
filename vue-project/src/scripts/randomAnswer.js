function checkExistedVars(answer) {
  let varArray = [];
  for (let i = 0; i < answer.length; i++) {
    if (
      answer.charAt(i) !== "∧" &&
      answer.charAt(i) !== "∨" &&
      answer.charAt(i) !== "→" &&
      answer.charAt(i) !== "↔" &&
      answer.charAt(i) !== "(" &&
      answer.charAt(i) !== ")" &&
      answer.charAt(i) !== "¬"
    ) {
      if (varArray.includes(answer.charAt(i)) === false) {
        varArray[varArray.length] = answer.charAt(i);
      }
    }
  }
  return varArray;
}

function createNewStringRandomAnswer(myString, i, replaceItem) {
  let temp = "";
  for (let j = 0; j < myString.length; j++) {
    if (j === i) {
      temp += replaceItem;
    } else {
      temp += myString.charAt(j);
    }
  }
  return temp;
}

function getRandomAnswer(originalAnswer) {
  let existedVars = checkExistedVars(originalAnswer);
  let randomNum = Math.floor(Math.random() * 2);
  if (originalAnswer.length === 1 || originalAnswer.length === 2) {
    if (originalAnswer.includes("¬")) {
      originalAnswer = originalAnswer.replace("¬", "");
    } else {
      originalAnswer = "¬" + originalAnswer;
    }
    return originalAnswer;
  }
  let answer = originalAnswer;
  randomNum = Math.floor(Math.random() * 2);
  if (randomNum === 0 && answer.includes("¬")) {
    answer = answer.replace("¬", "");
  } else {
    randomNum = Math.floor(Math.random() * 2);
    if (randomNum === 0) {
      for (let i = 0; i < answer.length; i++) {
        if (
          answer.charAt(i) !== "∧" &&
          answer.charAt(i) !== "∨" &&
          answer.charAt(i) !== "→" &&
          answer.charAt(i) !== "↔" &&
          answer.charAt(i) !== "(" &&
          answer.charAt(i) !== ")" &&
          answer.charAt(i) !== "¬"
        ) {
          randomNum = Math.floor(Math.random() * existedVars.length);
          answer = createNewStringRandomAnswer(
            answer,
            i,
            existedVars[randomNum]
          );
        }
      }
    } else {
      for (let i = 0; i < answer.length; i++) {
        if (
          answer.charAt(i) === "∧" ||
          answer.charAt(i) === "∨" ||
          answer.charAt(i) === "→" ||
          answer.charAt(i) === "↔"
        ) {
          randomNum = Math.floor(Math.random() * 4);
          if (randomNum === 0) {
            answer = createNewStringRandomAnswer(answer, i, "∧");
          } else if (randomNum === 1) {
            answer = createNewStringRandomAnswer(answer, i, "∨");
          } else if (randomNum === 2) {
            answer = createNewStringRandomAnswer(answer, i, "→");
          } else {
            answer = createNewStringRandomAnswer(answer, i, "↔");
          }
        }
      }
    }
  }
  return answer;
}

//This function returns an array of "amount" number of answers which are different
//from each other and are different from the original answer

export default function returnRandomAnswer(answer, amount) {
  let randomAnswers = [];
  let newAnswer = "";
  let pass;
  const maxCount = 50;
  let count = 0;
  for (let times = 0; times < amount; times++) {
    pass = false;
    while (!pass) {
      count += 1;
      pass = true;
      newAnswer = getRandomAnswer(answer);
      for (let i = 0; i < randomAnswers.length; i++) {
        if (
          count <= maxCount &&
          (randomAnswers[i] === newAnswer || answer === newAnswer)
        ) {
          pass = false;
          break;
        }
      }
    }
    count = 0;
    randomAnswers.push(newAnswer);
  }
  return randomAnswers;
}

//console.log( returnRandomAnswer('b', 10))
