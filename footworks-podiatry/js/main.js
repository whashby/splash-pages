// Enable button only when terms are accepted
const checkbox = document.getElementById('acceptTerms');
const btn = document.getElementById('continueBtn');

checkbox.addEventListener('change', () => {
  btn.disabled = !checkbox.checked;
});

// On click, send user onward
btn.addEventListener('click', () => {
  // Many controllers append a ?redir= or similar parameter.
  const params = new URLSearchParams(window.location.search);
  const redir = params.get('redir') || params.get('url') || 'https://www.google.com';

  window.location.href = redir;
});
