/* ==========================================================================
   EDIE LIP KITS — AVANT-GARDE DATA ARCHITECTURE
   ========================================================================== */

const lipKits = [
  {
    id: 1,
    name: "The classic Lip",
    liner: "Brown lip liner",
    gloss: "Pink gloss",
    hex: "#C07A70",
    price: 29,
    modelImg: "The Classic lip - 1.png",
    productImg: "classic 2.jpeg"
  },
  {
    id: 2,
    name: "Berry great lips",
    liner: "Dark plum liner",
    gloss: "Light plum gloss",
    hex: "#8A3B58",
    price: 29,
    modelImg: "berry.png",
    productImg: "berry 2.jpeg"
  },
  {
    id: 3,
    name: "Date night",
    liner: "Black liner",
    gloss: "Red gloss",
    hex: "#8B1225",
    price: 29,
    modelImg: "date.png",
    productImg: "date 2.jpeg"
  },
  {
    id: 4,
    name: "Créme Bruele",
    liner: "Honey Brown liner",
    gloss: "Cream gloss",
    hex: "#C48A69",
    price: 29,
    modelImg: "creme.png",
    productImg: "creme vrule 2.jpeg"
  },
  {
    id: 5,
    name: "Making things clear",
    liner: "Chocolate brown liner",
    gloss: "Clear gloss",
    hex: "#5C3328",
    price: 29,
    modelImg: "clear.png",
    productImg: "clear 2.jpeg"
  },
  {
    id: 6,
    name: "let's get a drink: Grape Soda",
    liner: "Dark purple liner",
    gloss: "Lavender gloss",
    hex: "#6B3A70",
    price: 29,
    modelImg: "grape.png",
    productImg: "grape soda 2.jpeg"
  },
  {
    id: 7,
    name: "lets get a snack: Chocolate",
    liner: "Dark brown lip liner",
    gloss: "Brown gloss",
    hex: "#4E2B22",
    price: 29,
    modelImg: "chocolate.png",
    productImg: "chocolate 2.jpeg"
  },
  {
    id: 8,
    name: "BLAKKPINCK",
    liner: "Black lip liner",
    gloss: "Pink gloss",
    hex: "#D94B72",
    price: 29,
    modelImg: "blackpink.png",
    productImg: "blackp2.jpeg"
  },
  {
    id: 9,
    name: "Scandalous: nude",
    liner: "Brown nude liner",
    gloss: "Pink nude liner",
    hex: "#B87870",
    price: 29,
    modelImg: "nude.png",
    productImg: "nude 2.jpeg"
  }
];

let currentShadeIndex = 0;
let currentPerspective = 'model';
let currentQuantity = 1;
let cart = [];

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  renderSwatches();
  renderDropdownOptions();
  updateStageDisplay();
});

function renderSwatches() {
  const container = document.getElementById('swatchesGrid');
  if (!container) return;
  container.innerHTML = '';

  lipKits.forEach((kit, index) => {
    const btn = document.createElement('button');
    btn.className = `geo-swatch ${index === currentShadeIndex ? 'active' : ''}`;
    btn.onclick = () => selectShadeByIndex(index);
    
    const fill = document.createElement('span');
    fill.className = 'swatch-fill';
    fill.style.backgroundColor = kit.hex;
    
    btn.appendChild(fill);
    container.appendChild(btn);
  });
}

function renderDropdownOptions() {
  const select = document.getElementById('shadeSelector');
  if (!select) return;
  select.innerHTML = '';

  lipKits.forEach((kit, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.textContent = `N° 0${index + 1} — ${kit.name}`;
    select.appendChild(opt);
  });
}

/* ==========================================================================
   INTERACTIVE LOGIC
   ========================================================================== */
function selectShadeByIndex(index) {
  currentShadeIndex = parseInt(index);
  
  const swatches = document.querySelectorAll('.geo-swatch');
  swatches.forEach((swatch, i) => {
    swatch.classList.toggle('active', i === currentShadeIndex);
  });

  const select = document.getElementById('shadeSelector');
  if (select) select.value = currentShadeIndex;
  
  updateStageDisplay();
}

function switchPerspective(mode) {
  currentPerspective = mode;
  
  const perspModel = document.getElementById('perspModel');
  const perspProduct = document.getElementById('perspProduct');
  
  if (perspModel) perspModel.classList.toggle('active', mode === 'model');
  if (perspProduct) perspProduct.classList.toggle('active', mode === 'product');
  
  const kit = lipKits[currentShadeIndex];
  const mainImage = document.getElementById('mainImage');
  if (mainImage) mainImage.src = mode === 'model' ? kit.modelImg : kit.productImg;
}

function updateStageDisplay() {
  const kit = lipKits[currentShadeIndex];

  const shadeTitle = document.getElementById('shadeTitle');
  const shadeSubtitle = document.getElementById('shadeSubtitle');
  const linerDetail = document.getElementById('linerDetail');
  const glossDetail = document.getElementById('glossDetail');
  const btnPrice = document.getElementById('btnPrice');
  const thumbModelImg = document.getElementById('thumbModelImg');
  const thumbProductImg = document.getElementById('thumbProductImg');
  const mainImage = document.getElementById('mainImage');

  if (shadeTitle) shadeTitle.textContent = kit.name;
  if (shadeSubtitle) shadeSubtitle.textContent = kit.name;
  if (linerDetail) linerDetail.textContent = kit.liner;
  if (glossDetail) glossDetail.textContent = kit.gloss;
  if (btnPrice) btnPrice.textContent = kit.price * currentQuantity;

  if (thumbModelImg) thumbModelImg.src = kit.modelImg;
  if (thumbProductImg) thumbProductImg.src = kit.productImg;
  if (mainImage) mainImage.src = currentPerspective === 'model' ? kit.modelImg : kit.productImg;
}

function adjustQty(change) {
  if (currentQuantity + change >= 1) {
    currentQuantity += change;
    const qtyVal = document.getElementById('qtyVal');
    const btnPrice = document.getElementById('btnPrice');
    if (qtyVal) qtyVal.textContent = currentQuantity;
    if (btnPrice) btnPrice.textContent = lipKits[currentShadeIndex].price * currentQuantity;
  }
}

/* ==========================================================================
   CART SYSTEM
   ========================================================================== */
function addToCart() {
  const kit = lipKits[currentShadeIndex];
  cart.push({ ...kit, quantity: currentQuantity });
  updateCartDrawer();
  toggleCart(true);
}

function toggleCart(open) {
  const overlay = document.getElementById('drawerOverlay');
  const drawer = document.getElementById('cartDrawer');
  if (overlay && drawer) {
    if (open) {
      overlay.classList.add('open');
      drawer.classList.add('open');
    } else {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
    }
  }
}

function updateCartDrawer() {
  const container = document.getElementById('cartItemsList');
  const badge = document.getElementById('cartBadge');
  const headerCount = document.getElementById('cartCountHeader');
  const subtotalEl = document.getElementById('cartSubtotal');

  if (badge) badge.textContent = cart.length;
  if (headerCount) headerCount.textContent = cart.length;

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<div class="empty-msg">YOUR SELECTION IS EMPTY</div>';
    if (subtotalEl) subtotalEl.textContent = '$0';
    return;
  }

  let html = '';
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    html += `
      <div class="cart-item-row">
        <img src="${item.modelImg}" alt="${item.name}">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-shade">${item.liner} + ${item.gloss}</div>
          <div class="cart-item-price">Qty: ${item.quantity} × $${item.price}</div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (subtotalEl) subtotalEl.textContent = `$${total}`;
}

const cartTrigger = document.getElementById('cartTrigger');
if (cartTrigger) {
  cartTrigger.addEventListener('click', () => toggleCart(true));
} 