async function handleLogin() {
  const password = document.getElementById('password-input').value.trim();
  const errorEl = document.getElementById('login-error');

  if (!password) {
    errorEl.textContent = 'Senha obrigatória.';
    errorEl.classList.remove('hidden');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });

    const result = await response.json();

    if (result.success) {
      // Armazena o estado de autenticação no localStorage
      // localStorage.setItem('session', 'authenticated');
      window.location.href = 'insights.html';
    } else {
      errorEl.textContent = 'Senha incorreta.';
      errorEl.classList.remove('hidden');
    }
  } catch (err) {
    errorEl.textContent = 'Erro na autenticação.';
    errorEl.classList.remove('hidden');
  }
}

document.getElementById('login-button').addEventListener('click', handleLogin);
