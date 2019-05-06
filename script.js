const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equal");
const operations = document.querySelector("#operations");
const result = document.querySelector("#result");
const backspace = document.querySelector("#backspace");

let onlyOne = ["+", "*", "/", "-", "."];
let start = 0;

document.onkeypress = function(e) {
  e = e || window.event;
  console.log(e.keyCode);
  switch (e.keyCode) {
    case 48:
      keyboardNum("0");
      break;
    case 49:
      keyboardNum("1");
      break;
    case 50:
      keyboardNum("2");
      break;
    case 51:
      keyboardNum("3");
      break;
    case 52:
      keyboardNum("4");
      break;
    case 53:
      keyboardNum("5");
      break;
    case 54:
      keyboardNum("6");
      break;
    case 55:
      keyboardNum("7");
      break;
    case 56:
      keyboardNum("8");
      break;
    case 57:
      keyboardNum("9");
      break;
    case 43:
      keyboardOpe("+");
      break;
    case 45:
      keyboardOpe("-");
      break;
    case 42:
      keyboardOpe("*");
      break;
    case 47:
      keyboardOpe("/");
      break;
    case 46:
      keyboardOpe(".");
      break;
    case 99:
      result.textContent = 0;
      operations.textContent = "-";
      break;
    case 61:
      operate();
      break;
    case 13:
      operate();
      break;
    case 8:
      removeLast(result);
      break;
  }
};

function keyboardNum(n) {
  if (result.textContent == 0 || start == 1) {
    result.textContent = n;
    start = 0;
  } else {
    result.textContent += n;
  }
}

numbers.forEach(function(number) {
  number.addEventListener("mouseup", function() {
    if (result.textContent == 0 || start == 1) {
      result.textContent = number.textContent;
      start = 0;
    } else {
      result.textContent += number.textContent;
    }
  });
});

function keyboardOpe(ope) {
  if (
    result.textContent == 0 ||
    onlyOne.includes(result.textContent[result.textContent.length - 1])
  ) {
    return;
  } else {
    result.textContent += ope;
  }
}

operators.forEach(function(operator) {
  operator.addEventListener("mouseup", function() {
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
  result.textContent = 0;
  operations.textContent = "-";
});

equalButton.addEventListener("mouseup", function() {
  operate();
});

backspace.addEventListener("mouseup", function() {
  result.textContent = removeLast(result.textContent);
});

function removeLast(result) {
  let text = result;
  if (text.length > 2) {
    return text.slice(0, text.length - 2);
  } else {
    return 0;
  }
}

function operate() {
  let toParse = result.textContent;
  let arr = [];
  let numArr = [];
  if (onlyOne.includes(toParse[toParse.length - 1])) {
    toParse = toParse.slice(0, toParse.length - 1);
  }
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
  operations.textContent = toParse;

  result.textContent = Math.round(arr[0] * 100) / 100;
  start = 1;
}

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
