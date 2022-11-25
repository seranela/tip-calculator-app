(() => {
  // Inputs
  const inputBillAmount = document.getElementById('bill-amount');
  const inputTotalPeople = document.getElementById('bill-total-people');
  // Tip
  const radioGroup = document.querySelectorAll('input[type=radio]');
  const inputCustomTip = document.getElementById('tip-amount-custom');
  // Results
  const textTipPerPerson = document.getElementById('tip-per-person');
  const textTotalPerPerson = document.getElementById('total-per-person');
  // Reset Button
  const buttonReset = document.getElementById('button-reset');

  const invalidZero = document.getElementById('people-zero');

  let tipAmount = 0;

  // Calculate the dollar amounts
  function calculateAmounts() {
    if (inputBillAmount.value === '' && inputTotalPeople.value === '' && tipAmount === 0) {
      buttonReset.disabled = true;
    } else {
      buttonReset.disabled = false;
    }

    let billDollars = parseFloat(inputBillAmount.value) || 0;
    let totalPeople = parseInt(inputTotalPeople.value) || 1;

    //console.log(billDollars, tipAmount, totalPeople);

    let tipDollars = billDollars * (tipAmount / 100);
    let totalDollars = billDollars + tipDollars;
    let tipDollarsPerPerson = tipDollars / totalPeople;
    let totalDollarsPerPerson = totalDollars / totalPeople;

    textTipPerPerson.innerHTML = '$' + tipDollarsPerPerson.toFixed(2);
    textTotalPerPerson.innerHTML = '$' + totalDollarsPerPerson.toFixed(2);
  }

  // If a predefined tip is chosen, clear the custom tip input
  function processRadioGroup(e) {
    inputCustomTip.value = '';
    tipAmount = parseInt(e.target.value);
    calculateAmounts();
  }

  // If a custom tip is entered, clear the predefined tip buttons
  function processCustomTip(e) {
    for (let i = 0; i < radioGroup.length; i++)
      radioGroup[i].checked = false;
    tipAmount = parseInt(e.target.value) || 0;
    calculateAmounts();
  }

  function processTotalPeople() {
    if (parseInt(inputTotalPeople.value) === 0)
      invalidZero.classList.remove('hidden')
    else
      invalidZero.classList.add('hidden')
    calculateAmounts();
  }

  // Let reset button clear form and then reset values to $0
  function doReset() {
    textTipPerPerson.innerHTML = '$0.00';
    textTotalPerPerson.innerHTML = '$0.00';
    buttonReset.disabled = true;
  }

  inputBillAmount.addEventListener('input', calculateAmounts, false);
  inputTotalPeople.addEventListener('input', processTotalPeople, false);
  for (let i = 0; i < radioGroup.length; i++)
    radioGroup[i].addEventListener('change', processRadioGroup, false);
  inputCustomTip.addEventListener('input', processCustomTip, false);
  buttonReset.addEventListener('click', doReset, false);
})();