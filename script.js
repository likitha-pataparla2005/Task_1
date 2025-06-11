const form = document.getElementById('expense-form');
const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

let expenses = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  
  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (!desc || !amount || !category) return;

  const expense = { desc, amount, category };
  expenses.push(expense);

  updateUI();
  form.reset();
});

function updateUI() {
  // Update list
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.textContent = `${exp.desc} - $${exp.amount.toFixed(2)} [${exp.category}]`;
    expenseList.appendChild(li);
    total += exp.amount;
  });

  totalDisplay.textContent = total.toFixed(2);

  updateChart();
}

// Chart.js logic
let chart;

function updateChart() {
  const categoryTotals = {};

  expenses.forEach(exp => {
    if (!categoryTotals[exp.category]) {
      categoryTotals[exp.category] = 0;
    }
    categoryTotals[exp.category] += exp.amount;
  });

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      label: 'Expenses by Category',
      data: Object.values(categoryTotals),
      backgroundColor: [
        '#007bff',
        '#28a745',
        '#ffc107',
        '#dc3545',
        '#6c757d'
      ],
    }]
  };

  if (chart) chart.destroy(); // Destroy existing chart to prevent overlap

  const ctx = document.getElementById('expense-chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'pie',
    data: data,
  });
}
