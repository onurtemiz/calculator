const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");

let onlyOne = ["+", "*", "/", "-", "."];

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
    if (!isNaN(toParse[i]) || toParse[i] == ".") {
      numArr.push(toParse[i]);
      if (i == toParse.length - 1) {
        let numMulti = "";
        for (let j = 0; j < numArr.length; j++) {
          numMulti += numArr[j];
        }
        arr.push([numMulti]);
      }
    } else {
      if (numArr.length > 1) {
        let numMulti = "";
        for (let j = 0; j < numArr.length; j++) {
          numMulti += numArr[j];
        }
        arr.push([numMulti]);
      } else {
        arr.push(numArr);
      }
      numArr = [];
      arr.push([toParse[i]]);
    }
  }

  let dominantOperatorIndexes = findOperations(arr)[0];
  let normalOperatorIndexes = findOperations(arr)[1];

  //console.log(arr);

  while (dominantOperatorIndexes.length > 0) {
    let num1 = arr[dominantOperatorIndexes[0] - 1];
    let num2 = arr[dominantOperatorIndexes[0] + 1];
    let ope = arr[dominantOperatorIndexes[0]];
    let opeResult = operator(num1, num2, ope);
    let newArr = [];
    for (let j = 0; j < dominantOperatorIndexes[0] - 1; j++) {
      newArr.push(arr[j]);
    }
    newArr.push(opeResult);
    for (let j = dominantOperatorIndexes[0] + 2; j < arr.length; j++) {
      newArr.push(arr[j]);
    }
    arr = newArr;
    dominantOperatorIndexes = findOperations(arr)[0];
    normalOperatorIndexes = findOperations(arr)[1];
  }
  while (normalOperatorIndexes.length > 0) {
    let num1 = arr[normalOperatorIndexes[0] - 1];
    let num2 = arr[normalOperatorIndexes[0] + 1];
    let ope = arr[normalOperatorIndexes[0]];
    let opeResult = operator(num1, num2, ope);
    let newArr = [];
    for (let j = 0; j < normalOperatorIndexes[0] - 1; j++) {
      newArr.push(arr[j]);
    }
    newArr.push(opeResult);
    for (let j = normalOperatorIndexes[0] + 2; j < arr.length; j++) {
      newArr.push(arr[j]);
    }
    arr = newArr;
    dominantOperatorIndexes = findOperations(arr)[0];
    normalOperatorIndexes = findOperations(arr)[1];
  }
  const operations = document.querySelector("#operations");
  operations.textContent = result.textContent;
  result.textContent = arr[0];
});

function operator(num1, num2, ope) {
  if (ope == "+") {
    return Number(num1) + Number(num2);
  }
  if (ope == "-") {
    return Number(num1) - Number(num2);
  }
  if (ope == "*") {
    return Number(num1) * Number(num2);
  }
  if (ope == "/") {
    return Number(num1) / Number(num2);
  }
}

function findOperations(arr) {
  let dominant = [];
  let normal = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "/" || arr[i] == "*") {
      dominant.push(arr.indexOf(arr[i]));
    } else if (arr[i] == "+" || arr[i] == "-") {
      normal.push(arr.indexOf(arr[i]));
    }
  }
  return [dominant, normal];
}
