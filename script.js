const prevDisplay = document.getElementById("prevDisplay");
const curDisplay = document.getElementById("curDisplay");
prevDisplay.style.display = "none";

function addSymbolToInput(btnValue) {
  if (
    (curDisplay.value === "" || curDisplay.value === "-") &&
    btnValue === "."
  ) {
    curDisplay.value += "0.";
    return;
  }

  if (curDisplay.value.split("").includes(".") && btnValue === ".") {
    return;
  }

  if (curDisplay.value === "0" && (btnValue === "0" || btnValue === "00")) {
    return;
  }

  if (curDisplay.value === "" && btnValue === "00") {
    curDisplay.value += "0";
    return;
  }

  checkSymbolCapacity();

  if (curDisplay.value.length <= 25) {
    curDisplay.value += btnValue;
  }
}

function checkSymbolCapacity() {
  if (curDisplay.value.length >= 15) {
    curDisplay.style.fontSize = "20px";
    return;
  }
  curDisplay.style.fontSize = "40px";
}

function addOperator(btnValue) {
  const lastChar = prevDisplay.value.at(-1);
  const conditionLastChar =
    lastChar === "*" ||
    lastChar === "/" ||
    lastChar === "-" ||
    lastChar === "+";

  if (
    curDisplay.value === "" &&
    btnValue === "-" &&
    (prevDisplay.value === "" || conditionLastChar)
  ) {
    addSymbolToInput(btnValue);
    return;
  }

  if (curDisplay.value === "-") {
    return;
  }

  if (curDisplay.value === "" && prevDisplay.value === "") {
    return;
  }

  if (curDisplay.value === "" && conditionLastChar) {
    prevDisplay.value = prevDisplay.value.slice(0, -1) + btnValue;
    return;
  }

  if (curDisplay.value === "" && prevDisplay.value !== "") {
    prevDisplay.value = prevDisplay.value + btnValue;
    return;
  }

  if (curDisplay.value !== "" && conditionLastChar) {
    equalInput();
    addOperator(btnValue);
    return;
  }

  prevDisplay.value = curDisplay.value + btnValue;
  curDisplay.value = "";
  prevDisplay.style.display = "block";
}

function clearInput() {
  curDisplay.value = "";
  prevDisplay.value = "";
  hidePrevDisplay();
  checkSymbolCapacity();
}

function deleteLastSymbol() {
  if (curDisplay.value === "" && prevDisplay.value !== "") {
    prevDisplay.value = prevDisplay.value.slice(0, -1);
    hidePrevDisplay();
    return;
  }
  curDisplay.value = curDisplay.value.slice(0, -1);
  checkSymbolCapacity();
}

function equalInput() {
  const lastChar = prevDisplay.value.at(-1);
  const firstOperand = parseFloat(prevDisplay.value.slice(0, -1));
  const secondOperand = parseFloat(curDisplay.value);
  let result;

  if (curDisplay.value === "") {
    return;
  }

  switch (lastChar) {
    case "+":
      result = firstOperand + secondOperand;
      curDisplay.value = "";
      break;
    case "-":
      result = firstOperand - secondOperand;
      curDisplay.value = "";
      break;
    case "*":
      result = firstOperand * secondOperand;
      curDisplay.value = "";
      break;
    case "/":
      result = firstOperand / secondOperand;
      curDisplay.value = "";
      break;
    default:
      break;
  }

  if (isNaN(result)) {
    prevDisplay.value = "Result is undefind";
    return;
  }

  prevDisplay.value = result;
}

function hidePrevDisplay() {
  if (prevDisplay.value === "") {
    prevDisplay.style.display = "none";
  }
}

document.addEventListener("keydown", (event) => {
  event.target.blur();

  if (isFinite(event.key)) {
    addSymbolToInput(event.key);
    return;
  }

  switch (event.key) {
    case "Enter":
      equalInput();
      break;

    case "Backspace":
      deleteLastSymbol();
      break;

    case "+":
    case "-":
    case "/":
    case "*":
      addOperator(event.key);
      break;

    default:
      break;
  }
});
