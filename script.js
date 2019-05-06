const numbers = document.querySelectorAll(".number");

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
