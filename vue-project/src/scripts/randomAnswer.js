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
  let answer = originalAnswer;
  let randomNum = Math.floor(Math.random() * 2);
  if (randomNum === 0 && answer.includes("¬")) {
    answer = answer.replace("¬", "");
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
  return answer;
}

//This function returns an array of three answer which are different
//from each other and are different from the original answer
export default function returnRandomAnswer(answer, amount) {
  let randomAnswers = [];
  let newAnswer;
  let pass;
  for (let times = 0; times < amount; times++) {
    newAnswer = getRandomAnswer(answer);
    pass = false;
    while (!pass) {
      pass = true;
      if (randomAnswers.length > 0)
        pass = randomAnswers.reduce((a, b) => a === newAnswer || b);
      newAnswer = getRandomAnswer(answer);
    }
    randomAnswers.push(newAnswer);
  }
  return randomAnswers;
}

// console.log(returnRandomAnswer("a∧b∧c→d", 4));
