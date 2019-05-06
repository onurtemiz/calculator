const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");

let onlyOne = ["+", "*", "/", "-", ","];

numbers.forEach(function(number) {
  number.addEventListener("mouseup", function() {
    const result = document.querySelector("#result");
    if (result.textContent == 0) {
      result.textContent = number.textContent;
    } else {
      result.textContent += number.textContent;
    }
  });
});

operators.forEach(function(operator) {
  operator.addEventListener("mouseup", function() {
    const result = document.querySelector("#result");
    if (
      result.textContent == 0 ||
      onlyOne.includes(result.textContent[result.textContent.length - 1])
    ) {
      return;
    } else {
      result.textContent += operator.textContent;
    }
  });
});

clearButton.addEventListener("mouseup", function() {
  const result = document.querySelector("#result");
  result.textContent = 0;
});

equalButton.addEventListener("mouseup", function() {
  const result = document.querySelector("#result");
  let toParse = result.textContent;

  let arr = [];
  let numArr = [];
  for (let i = 0; i < toParse.length; i++) {
    if (!isNaN(toParse[i])) {
      numArr.push(toParse[i]);
    } else {
      if (numArr.length > 1) {
        let numMulti = "";
        for (let j = 0; j < numArr.length; j++) {
          numMulti += numArr[j];
        }
        arr.push(numMulti);
      } else {
        arr.push(numArr);
      }
      numArr = [];
      arr.push([toParse[i]]);
    }
  }
  if (numArr.length > 0) {
    arr.push(numArr);
  }

  let dominantOperatorIndexes = [];
  let normalOperatorIndexes = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "/" || arr[i] == "*") {
      dominantOperatorIndexes.push(arr.indexOf(arr[i]));
    } else if (arr[i] == "+" || arr[i] == "-") {
      normalOperatorIndexes.push(arr.indexOf(arr[i]));
    }
  }

  for (let i = 0; i < dominantOperatorIndexes.length; i++) {
    let num1 = arr[dominantOperatorIndexes[i] - 1];
    let num2 = arr[dominantOperatorIndexes[i] + 1];
    let ope = arr[dominantOperatorIndexes[i]];
    console.log(num1);
    console.log(num2);
    console.log(ope);
    let opeResult = operator(num1, num2, ope);
    console.log(opeResult);
  }
});

function operator(num1, num2, ope) {
  if (ope == "+") {
    return num1 + num2;
  }
  if (ope == "-") {
    return num1 - num2;
  }
  if (ope == "*") {
    return num1 * num2;
  }
  if (ope == "/") {
    return num1 / num2;
  }
}
