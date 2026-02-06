// Terms acceptance
const checkbox = document.getElementById('acceptTerms');
const btn = document.getElementById('continueBtn');
const fbSection = document.getElementById('fbSection');

checkbox.addEventListener('change', () => {
  btn.disabled = !checkbox.checked;
});

// Auto-close Facebook section after interaction
fbSection.addEventListener('click', () => {
  fbSection.classList.add('closed');
});

// Extract redirect URL from Linksys Cloud Manager
function getRedirectURL() {
  const params = new URLSearchParams(window.location.search);

  // Linksys Cloud Manager commonly uses these
  const keys = ["redirect", "redir", "url", "continue"];

  for (const key of keys) {
    if (params.has(key)) {
      return params.get(key);
    }
  }

  // Fallback if controller didn't pass anything
  return "http://neverssl.com";
}

// Continue button logic
btn.addEventListener('click', () => {
  const redirectURL = getRedirectURL();
  window.location.href = redirectURL;
});
