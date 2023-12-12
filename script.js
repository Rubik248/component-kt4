// Создание компонента для калькулятора расходов
class ExpenseCalculator extends HTMLElement {
  constructor() {
    super();

    // Создание Shadow DOM
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        /* Стили для компонента */
        /* ... */
      </style>
      <div id="app">
        <div class="expenses">
          <input type="text" id="expenseTitle" placeholder="Название расхода">
          <input type="number" id="expenseAmount" placeholder="Сумма">
          <button id="addExpense">Добавить</button>
        </div>
      
        <ul id="expensesList"></ul>
      
        <div class="total">
          <h3>Общая сумма расходов:</h3>
          <p id="totalAmount">0</p>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    // Получение элементов из Shadow DOM
    const expenseTitle = this.shadowRoot.getElementById('expenseTitle');
    const expenseAmount = this.shadowRoot.getElementById('expenseAmount');
    const addExpenseButton = this.shadowRoot.getElementById('addExpense');
    const expensesList = this.shadowRoot.getElementById('expensesList');
    const totalAmount = this.shadowRoot.getElementById('totalAmount');

    let expenses = [];
    let total = 0;

    const updateTotal = () => {
      total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
      totalAmount.textContent = total;
    };

    const updateExpenses = () => {
      expensesList.innerHTML = '';
      expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${expense.title} - ${expense.amount}</span>
          <button class="delete">Удалить</button>
        `;
        li.querySelector('button').addEventListener('click', () => removeExpense(index));
        expensesList.appendChild(li);
      });
      updateTotal();
    };

    const addExpense = () => {
      const title = expenseTitle.value.trim();
      const amount = parseFloat(expenseAmount.value.trim());

      if (title && !isNaN(amount) && amount > 0) {
        const newExpense = { title, amount };
        expenses.push(newExpense);
        expenseTitle.value = '';
        expenseAmount.value = '';
        updateExpenses();
      } else {
        alert('Введите корректные данные');
      }
    };

    const removeExpense = (index) => {
      expenses.splice(index, 1);
      updateExpenses();
    };

    addExpenseButton.addEventListener('click', addExpense);
  }
}

// Регистрация компонента
customElements.define('expense-calculator', ExpenseCalculator);