const music = document.getElementById('background-music');
const music2 = document.getElementById('background-music-2');
const playButtonBackground = document.getElementById('play-background-music');
const playButton2 = document.getElementById('play-music-2');

playButtonBackground.addEventListener('click', function() {
    if (music.paused) {
        music.play();
        playButtonBackground.textContent = 'Pause Background Music'; 
    } else {
        music.pause();
        playButtonBackground.textContent = 'Play Background Music'; 
    }
});

playButton2.addEventListener('click', function() {
    if (music2.paused) {
        music2.play();
        playButton2.textContent = 'Pause Second Music'; 
    } else {
        music2.pause();
        playButton2.textContent = '😄 Play Second Music'; 
    }
});

const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');
const expenseDateInput = document.getElementById('expense-date');
const newCategoryInput = document.getElementById('new-category');
const addCategoryButton = document.getElementById('add-category-button');
const outputDiv = document.getElementById('output');
const totalExpenseButton = document.getElementById('total-expense-button');
const detailExpenseButton = document.getElementById('detail-expense-button');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let categories = JSON.parse(localStorage.getItem('categories')) || ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health'];

function populateCategories() {
    expenseCategoryInput.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        expenseCategoryInput.appendChild(option);
    });
}

populateCategories();

addCategoryButton.addEventListener('click', function() {
    const newCategory = newCategoryInput.value.trim();
    if (newCategory && !categories.includes(newCategory)) {
        categories.push(newCategory);
        localStorage.setItem('categories', JSON.stringify(categories));
        populateCategories();
        newCategoryInput.value = '';
        alert("Category added!");
    } else {
        alert("Category already exists or is empty!");
    }
});

expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const category = expenseCategoryInput.value;
    const date = expenseDateInput.value;

    if (name && amount > 0 && category && date) {
        expenses.push({ name, amount, category, date });
        localStorage.setItem('expenses', JSON.stringify(expenses));
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        expenseCategoryInput.value = '';
        expenseDateInput.value = '';
        alert("Expense added!");
    }
});

function renderExpenses() {
    if (expenses.length === 0) {
        outputDiv.innerHTML = '<h2>No expenses recorded.</h2>';
        return;
    }

    const details = expenses.map((expense, index) => `
        <p>
            ${expense.name} (Category: ${expense.category}, Date: ${expense.date}): $${expense.amount.toFixed(2)} 
            <button onclick="editExpense(${index})">Edit</button> 
            <button onclick="deleteExpense(${index})">Delete</button>
        </p>
    `).join('');
    outputDiv.innerHTML = `<h2>Detailed Expenses:</h2>${details}`;
}

totalExpenseButton.addEventListener('click', function() {
    const overallTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    outputDiv.innerHTML = `<h2>Total Expense: $${overallTotal.toFixed(2)}</h2>`;
});

detailExpenseButton.addEventListener('click', renderExpenses);

window.editExpense = function(index) {
    const expense = expenses[index];
    expenseNameInput.value = expense.name;
    expenseAmountInput.value = expense.amount;
    expenseCategoryInput.value = expense.category;
    expenseDateInput.value = expense.date;
    
    deleteExpense(index);
};

window.deleteExpense = function(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
};
