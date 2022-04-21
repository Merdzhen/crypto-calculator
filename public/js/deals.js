const dealForm = document.querySelector('.js-form-deal');
const regErr = document.querySelector('.js-reg-err');
const regAnswer = document.querySelector('.js-reg-answer');
const dealsTable = document.querySelector('.js-deals-table-body');

dealForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  console.log('form');
  // console.log('editor!!', registerForm);
  // console.log(e.target);
  const coin = e.target.coinDeal.value;
  const currency = e.target.currencyDeal.value;
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

    if (result.success) { // скажем что все ок если получили статус ok
      regErr.style.display = 'none';
      regAnswer.style.display = 'initial';
      regAnswer.innerHTML = 'New deal added';
      await dealForm.reset();
      const newDeal = document.createElement('tr');
      if (result.profit > 0) {
        newDeal.innerHTML = `
        <tr>
          <td>${purchase_date}</td>
          <td>${coin}</td>
          <td>${currency}</td>
          <td>${quantity}</td>
          <td>${result.purchacePrice} ${currency}</td>
          <td>${result.purchaceCost} ${currency}</td>
          <td>${result.currentPrice} ${currency}</td>
          <td>${result.currentCost} ${currency}</td>
          <td>${result.currentProfit} ${currency}</td>
        </tr>`;
        newDeal.classList.add('table-success');
        dealsTable.prepend(newDeal);
      } else {
        newDeal.innerHTML = `
        <tr>
          <td>${purchase_date}</td>
          <td>${coin}</td>
          <td>${currency}</td>
          <td>${quantity}</td>
          <td>${result.purchacePrice} ${currency}</td>
          <td>${result.purchaceCost} ${currency}</td>
          <td>${result.currentPrice} ${currency}</td>
          <td>${result.currentCost} ${currency}</td>
          <td>${result.currentProfit} ${currency}</td>
        </tr>`;
        newDeal.classList.add('table-danger');
        dealsTable.prepend(newDeal);
      }
    } else { // если ошибка выводим ошибку
      regErr.style.display = 'initial';
      regErr.innerHTML = result.message;
    }
  } else {
    regErr.style.display = 'initial';
    regErr.innerHTML = 'Fill in all fields';
  }
});
