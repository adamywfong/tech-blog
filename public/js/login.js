const loginForm = document.querySelector('#login-form');
const switcher = document.querySelector('#login-toggle');

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const name = document.querySelector('#name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  if (name && password) {
    if (loginForm.dataset.login == 'true'){
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // If successful, redirect the browser to the homepage
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    } else {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        // If successful, redirect the browser to the homepage
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    };
  }
};

const logOrSign = (event) => {
  event.preventDefault();
  if (loginForm.dataset.login == 'true') {
    loginForm.dataset.login = false;
    document.querySelector('#login-header').textContent = 'Sign Up';
    document.querySelector('#loginButton').textContent = 'Sign Up';
    switcher.textContent = 'Login instead';
  }  else {
    loginForm.dataset.login = true;
    document.querySelector('#login-header').textContent = 'Login';
    document.querySelector('#loginButton').textContent = 'Login';
    switcher.textContent = 'Sign up instead';
  }
}

loginForm.addEventListener('submit', loginFormHandler);
switcher.addEventListener('click', logOrSign);