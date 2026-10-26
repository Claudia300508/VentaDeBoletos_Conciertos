
(function () {
  'use strict';

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ---------- Utilidades ---------- */
  function errorBox(input) {
    return document.getElementById(input.id + '-error');
  }

  function setError(input, message) {
    var box = errorBox(input);
    if (box) { box.textContent = message; }
    input.setAttribute('aria-invalid', 'true');
  }

  function clearError(input) {
    var box = errorBox(input);
    if (box) { box.textContent = ''; }
    input.removeAttribute('aria-invalid');
  }

  function setStatus(form, message, type) {
    var s = form.querySelector('.status');
    s.textContent = message;
    s.className = 'status' + (type ? ' ' + type : '');
  }

  function setLoading(form, loading, text) {
    var btn = form.querySelector('button[type="submit"]');
    if (loading) {
      btn.dataset.label = btn.textContent;
      btn.textContent = text;
      btn.disabled = true;
    } else {
      btn.textContent = btn.dataset.label || btn.textContent;
      btn.disabled = false;
    }
  }

  // Simula una petición al servidor
  function fakeRequest(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  /*  Validaciones  */
  function checkEmail(input) {
    var value = input.value.trim();
    if (!value) { setError(input, 'Escribe tu correo electrónico.'); return false; }
    if (!EMAIL_RE.test(value)) { setError(input, 'Revisa el formato, por ejemplo nombre@correo.com.'); return false; }
    clearError(input);
    return true;
  }

  function checkRequired(input, message) {
    if (!input.value) { setError(input, message); return false; }
    clearError(input);
    return true;
  }

  function firstInvalid(form) {
    return form.querySelector('[aria-invalid="true"]');
  }

  /* Limpiar el error al escribir  */
  document.querySelectorAll('input').forEach(function (input) {
    input.addEventListener('input', function () { clearError(input); });
  });

  /*Botón Mostrar / Ocultar contraseña  */
  document.querySelectorAll('.toggle-pass').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var input = document.getElementById(btn.dataset.target);
      var show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.textContent = show ? 'Ocultar' : 'Mostrar';
      btn.setAttribute('aria-label', show ? 'Ocultar contraseña' : 'Mostrar contraseña');
      btn.setAttribute('aria-pressed', String(show));
    });
  });

  /* Enlaces a otras pantallas */
  var linkRegistro = document.getElementById('link-registro');
  linkRegistro.addEventListener('click', function (e) {
    e.preventDefault();
    location.href = 'registro.html';
  });

  var linkRecuperar = document.getElementById('link-recuperar');
  linkRecuperar.addEventListener('click', function (e) {
    e.preventDefault();
    // AQUÍ IRÍA la redirección a la pantalla de recuperar contraseña:
    // location.href = 'recuperar.html';
  });

  /*Inicio de sesión  */
  var formLogin = document.getElementById('form-login');
  formLogin.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.getElementById('login-email');
    var pass = document.getElementById('login-pass');

    var okEmail = checkEmail(email);
    var okPass = checkRequired(pass, 'Escribe tu contraseña.');
    if (!okEmail || !okPass) { firstInvalid(formLogin).focus(); return; }

    setStatus(formLogin, '');
    setLoading(formLogin, true, 'Iniciando sesión…');
    fakeRequest(900).then(function () {
      setLoading(formLogin, false);
      // AQUÍ IRÍA la validación real con el servidor y la redirección a "Eventos".
      setStatus(formLogin, 'Inicio de sesión correcto. Aquí se abriría la pantalla de eventos.', 'ok');
    });
  });
})();