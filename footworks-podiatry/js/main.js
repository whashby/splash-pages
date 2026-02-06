// ---------------------------------------------------------
// Extract redirect URL from Linksys Cloud Manager
// ---------------------------------------------------------
function getRedirectURL() {
  const params = new URLSearchParams(window.location.search);

  const keys = ["redirect", "redir", "url", "continue"];

  for (const key of keys) {
    if (params.has(key)) {
      return params.get(key);
    }
  }

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
// Build final redirect URL for Linksys authentication
// ---------------------------------------------------------
function buildControllerRedirectURL() {
  const base = getRedirectURL();
  const mac = controllerInfo.client_mac;

  // If no MAC, return untouched
  if (!mac) return base;

  // Append MAC only if redirect URL already has parameters
  if (base.includes("?")) {
    const url = new URL(base);
    url.searchParams.set("client_mac", mac);
    return url.toString();
  }

  // If no query string, do NOT append anything
  return base;
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
// Continue button logic
// Step 1: Return control to Linksys (authentication)
// Step 2: After login, user lands on Facebook page
// ---------------------------------------------------------
btn.addEventListener('click', () => {
  const controllerURL = buildControllerRedirectURL();

  // Step 1: Send user back to Linksys controller
  window.location.href = controllerURL;

  // Step 2: After successful login, Linksys will redirect user
  // to the URL below (configured in the controller)
  // You must set this in Linksys Cloud Manager:
  //
  // Post-login redirect URL:
  // https://www.facebook.com/FootworksPodiatry1/
});
