// ---------------------------------------------------------
// Extract redirect URL from Linksys Cloud Manager
// ---------------------------------------------------------
function getRedirectURL() {
  const params = new URLSearchParams(window.location.search);

  // Common Linksys redirect keys
  const keys = ["redirect", "redir", "url", "continue"];

  for (const key of keys) {
    if (params.has(key)) {
      return params.get(key);
    }
  }

  // Fallback if controller didn't pass anything
  return "http://neverssl.com";
}


// ---------------------------------------------------------
// Extract login_url and client_mac (if provided)
// ---------------------------------------------------------
function getControllerInfo() {
  const params = new URLSearchParams(window.location.search);

  return {
    login_url: params.get("login_url") || null,
    client_mac: params.get("client_mac") || null
  };
}

const controllerInfo = getControllerInfo();


// ---------------------------------------------------------
// Build final redirect URL with client_mac appended
// ---------------------------------------------------------
function buildFinalRedirectURL() {
  const baseRedirect = getRedirectURL();
  const mac = controllerInfo.client_mac;

  // If no MAC is provided, return the base redirect untouched
  if (!mac) {
    return baseRedirect;
  }

  // Append client_mac safely, preserving existing parameters
  const url = new URL(baseRedirect, window.location.origin);
  url.searchParams.set("client_mac", mac);

  return url.toString();
}


// ---------------------------------------------------------
// Auto-close Facebook section after interaction
// ---------------------------------------------------------
const fbSection = document.getElementById('fbSection');

if (fbSection) {
  fbSection.addEventListener('click', () => {
    fbSection.classList.add('closed');
  });
}


// ---------------------------------------------------------
// Terms acceptance logic
// ---------------------------------------------------------
const checkbox = document.getElementById('acceptTerms');
const btn = document.getElementById('continueBtn');

checkbox.addEventListener('change', () => {
  btn.disabled = !checkbox.checked;
});


// ---------------------------------------------------------
// Continue button logic (returns control to Linksys)
// ---------------------------------------------------------
btn.addEventListener('click', () => {
  const finalURL = buildFinalRedirectURL();
  window.location.href = finalURL;
});
