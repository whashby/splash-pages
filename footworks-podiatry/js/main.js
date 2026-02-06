// ---------------------------------------------------------
// Extract redirect URL from Linksys Cloud Manager
// ---------------------------------------------------------
function getRedirectURL() {
  const params = new URLSearchParams(window.location.search);

  const keys = ["redirect", "redir", "login_url", "continue"];

  for (const key of keys) {
    if (params.has(key)) {
      return params.get(key);
    }
  }

  return "http://neverssl.com";
}


// ---------------------------------------------------------
// Extract login_url and client_mac
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
// Build final redirect URL WITHOUT breaking Linksys flow
// ---------------------------------------------------------
function buildFinalRedirectURL() {
  const base = getRedirectURL();
  const mac = controllerInfo.client_mac;

  // If no MAC, return untouched
  if (!mac) return base;

  // If redirect URL already has parameters, append safely
  if (base.includes("?")) {
    const url = new URL(base);
    url.searchParams.set("client_mac", mac);
    return url.toString();
  }

  // If redirect URL has NO parameters, DO NOT append anything
  // (Linksys will reject modified URLs and loop the splash)
  return base;
}


// ---------------------------------------------------------
// Auto-close Facebook section
// ---------------------------------------------------------
const fbSection = document.getElementById('fbSection');
if (fbSection) {
  fbSection.addEventListener('click', () => {
    fbSection.classList.add('closed');
  });
}


// ---------------------------------------------------------
// Terms acceptance
// ---------------------------------------------------------
const checkbox = document.getElementById('acceptTerms');
const btn = document.getElementById('continueBtn');

checkbox.addEventListener('change', () => {
  btn.disabled = !checkbox.checked;
});


// ---------------------------------------------------------
// Continue button logic
// ---------------------------------------------------------
btn.addEventListener('click', () => {
  //const finalURL = buildFinalRedirectURL();
  const finalURL = "https://www.facebook.com/FootworksPodiatry1/";
  window.location.href = finalURL;
});
