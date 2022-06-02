const dealForm = document.querySelector('.js-form-deal');
const regErr = document.querySelector('.js-reg-err');
const regAnswer = document.querySelector('.js-reg-answer');
const dealsTable = document.querySelector('.js-deals-table-body');

dealForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // console.log('form');
  // console.log('editor!!', registerForm);
  // console.log(e.target);
  const coin = e.target.coinDeal.value.toLowerCase();
  const currency = e.target.currencyDeal.value.toLowerCase();
  const purchase_date = e.target.dateDeal.value;
  const quantity = e.target.quantityDeal.value;

  const bodyObj = {
    coin, currency, purchase_date, quantity,
  };

  if (coin && currency && purchase_date && quantity) {
    const response = await fetch('/deal/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObj),
    });
    // console.log('response!!', response);

    const result = await response.json();

    if (result.success) { // если получили статус success
      regErr.style.display = 'none';
      regAnswer.style.display = 'initial';
      regAnswer.innerHTML = 'New deal added';
      await dealForm.reset();
      const newDeal = document.createElement('tr');
      newDeal.innerHTML = `
        <tr>
          <td>${purchase_date}</td>
          <td>${coin.slice(0, 1).toUpperCase()}${coin.slice(1).toLowerCase()}</td>
          <td>${currency.toUpperCase()}</td>
          <td>${quantity}</td>
          <td>${result.purchacePrice} ${currency.toUpperCase()}</td>
          <td>${result.purchaceCost} ${currency.toUpperCase()}</td>
          <td>${result.currentPrice} ${currency.toUpperCase()}</td>
          <td>${result.currentCost} ${currency.toUpperCase()}</td>
          <td class="current-profit">${result.currentProfit} ${currency.toUpperCase()}</td>
        </tr>`;
      if (result.profit) {
        newDeal.classList.add('table-success');
        dealsTable.prepend(newDeal);
        const profitAmount = document.querySelector('.current-profit');
        profitAmount.classList.add('green-text');
      } else {
        newDeal.classList.add('table-danger');
        dealsTable.prepend(newDeal);
        const profitAmount = document.querySelector('.current-profit');
        profitAmount.classList.add('red-text');
      }
    } else { // если ошибка выводим ошибку
      regAnswer.style.display = 'none';
      regErr.style.display = 'initial';
      regErr.innerHTML = result.message;
    }
  } else {
    regAnswer.style.display = 'none';
    regErr.style.display = 'initial';
    regErr.innerHTML = 'Fill in all fields';
  }
});
