const registerForm = document.querySelector('.js-register');
const regErr = document.querySelector('.js-reg-err');
const regAnswer = document.querySelector('.js-reg-answer');

const loginForm = document.querySelector('.js-login');
const loginErr = document.querySelector('.js-login-err');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // console.log('editor!!', registerForm);
  // console.log(e.target);
  const inputName = e.target.inputName.value;
  const inputMail = e.target.inputMail.value;
  const inputPass = e.target.inputPass.value;

  const bodyObj = {
    inputName, inputMail, inputPass,
  };

  if (inputName && inputMail && inputPass) {
    const response = await fetch('/register', {
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
      regAnswer.innerHTML = 'Succes! Now you can login';
      await registerForm.reset();
    } else { // если ошибка выводим ошибку
      regErr.style.display = 'initial';
      regErr.innerHTML = result.message;
    }
  } else {
    regErr.style.display = 'initial';
    regErr.innerHTML = 'Fill in all fields';
  }
});

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  // console.log('editor!!', registerForm);
  // console.log(e.target);
  const inputMail = e.target.inputMail.value;
  const inputPass = e.target.inputPass.value;

  const bodyObj = {
    inputMail, inputPass,
  };

  if (inputMail && inputPass) {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyObj),
    });
    // console.log('response!!', response);

    const result = await response.json();

    if (result.success) { // скажем что все ок если получили статус ok
      loginErr.style.display = 'none';
      window.location.assign('/deals');
    } else { // если ошибка выводим ошибку
      loginErr.style.display = 'initial';
      loginErr.innerHTML = result.message;
    }
  } else {
    loginErr.style.display = 'initial';
    loginErr.innerHTML = 'Fill in all fields';
  }
});
