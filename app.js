const kalkulator = {
  displayNumber: '0',
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false
}

function updateDisplay() {
  document.querySelector('#displaynumber').innerHTML = kalkulator.displayNumber;
}

function clearCalculator() {
  kalkulator.displayNumber = '0';
  kalkulator.operator = null;
  kalkulator.firstNumber = null;
  kalkulator.waitingForSecondNumber = false;
}

function inputDigit(n) {
  if (kalkulator.displayNumber === '0') kalkulator.displayNumber = n; else kalkulator.displayNumber += n;
}

function inversNumber() {
  if (kalkulator.displayNumber === '0') return;

  kalkulator.displayNumber = kalkulator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!kalkulator.waitingForSecondNumber) {
    kalkulator.operator = operator;
    kalkulator.waitingForSecondNumber = true;
    kalkulator.firstNumber = kalkulator.displayNumber;

    kalkulator.displayNumber = '0';
  }
}

function perfomCalculation() {

  if (kalkulator.firstNumber == null || kalkulator.operator == null) {
    alert('anda belum menetapkan operator');
    return;
  }

  let result = 0;

  if (kalkulator.operator == "+") {
    result = parseInt(kalkulator.firstNumber) + parseInt(kalkulator.displayNumber);
  } else {
    result = parseInt(kalkulator.firstNumber) - parseInt(kalkulator.displayNumber);
  }


  const history = {
    firstNumber: kalkulator.firstNumber,
    secondNumber: kalkulator.displayNumber,
    operator: kalkulator.operator,
    result: result,
  }
  putHistory(history);
  kalkulator.displayNumber = result;
  renderHistory();

}




const buttons = document.querySelectorAll('.button');

for (let button of buttons) {
  button.addEventListener('click', function (e) {
    const target = e.target;


    if (target.classList.contains('clear')) {
      clearCalculator();
      updateDisplay();
      return;
    }

    if (target.classList.contains('negative')) {
      inversNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains('equals')) {
      perfomCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains('operator')) {
      handleOperator(target.innerText);
      updateDisplay();
      return;
    }


    inputDigit(target.innerText);
    updateDisplay();
  });
}