window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  // get inputs
  let loanAmount = document.getElementById('loan-amount');
  let loanYears = document.getElementById('loan-years');
  let loanRate = document.getElementById('loan-rate');

  // add default values:
  loanAmount.value = '50000';
  loanYears.value = '10';
  loanRate.value = '1.2';

  // display default values
  loanAmount.innerText = '50000';
  loanYears.innerText = '10';
  loanRate.innerText = '1.2';

  // call function to calculate current monthly payment
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  // get inputs
  const inputs = getCurrentUIValues();

  // Calculate montly payment and update UI
  updateMonthly(calculateMonthlyPayment(inputs));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const loanAmount = Number(values.amount);
  const loanYears = Number(values.years);
  const loanRate = Number(values.rate);

  if (!loanAmount || !loanYears || !loanRate) throw new Error('Invalid input: only use numbers');

  const monthlyPayment = (loanAmount * loanRate/12) / (1 - Math.pow(1 + loanRate/12, -loanYears));

  return String(monthlyPayment.toFixed(2));
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const monthlyPayment = document.getElementById('monthly-payment');
  monthlyPayment.innerText = monthly;
}
