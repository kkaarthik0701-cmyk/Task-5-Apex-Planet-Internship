const products = [
  {id:1,name:"Studio Headphones",category:"Audio",price:5499,tag:"BESTSELLER",description:"Immersive sound for focused days.",icon:"◖",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=75"},
  {id:2,name:"Arc Wireless Speaker",category:"Audio",price:3299,tag:"COMPACT",description:"Room-filling sound, clean silhouette.",icon:"▤",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=700&q=75"},
  {id:3,name:"Pulse Smartwatch",category:"Wearables",price:6999,tag:"NEW ARRIVAL",description:"A little clarity at a glance.",icon:"◉",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=75"},
  {id:4,name:"Mechanical Keyboard",category:"Workspace",price:4599,tag:"DESK FAVOURITE",description:"Tactile keys for your best ideas.",icon:"⌨",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=75"},
  {id:5,name:"Everyday Backpack",category:"Workspace",price:2799,tag:"EVERYDAY",description:"Carry your setup without the fuss.",icon:"▱",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=75"},
  {id:6,name:"Desk Lamp Mini",category:"Workspace",price:1899,tag:"WARM LIGHT",description:"Soft light for late ideas.",icon:"♧",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=75"},
  {id:7,name:"Wireless Earbuds",category:"Audio",price:2499,tag:"ON THE GO",description:"Small case. Big everyday energy.",icon:"◌",image:"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=75"},
  {id:8,name:"Minimal Desk Clock",category:"Workspace",price:1499,tag:"QUIET DESIGN",description:"A calmer way to keep your time.",icon:"◷",image:"https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=700&q=75"},
  {id:9,name:"Fitness Band",category:"Wearables",price:2199,tag:"LIGHTWEIGHT",description:"Everyday movement, simply tracked.",icon:"⌁",image:"https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=700&q=75"},
  {id:10,name:"Laptop Stand",category:"Workspace",price:1299,tag:"ERGONOMIC",description:"Lift your screen. Reset your posture.",icon:"⌑",image:"https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=700&q=75"},
  {id:11,name:"Portable Power Bank",category:"Workspace",price:1699,tag:"TRAVEL READY",description:"A little extra power, wherever you go.",icon:"▰",image:"https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=700&q=75"},
  {id:12,name:"Over-Ear Pro",category:"Audio",price:7999,tag:"PREMIUM PICK",description:"Comfort that keeps up with your day.",icon:"◖",image:"https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=700&q=75"}
];

const $ = (selector) => document.querySelector(selector);
const productGrid = $("#product-grid");
const searchInput = $("#search-input");
const sortSelect = $("#sort-select");
const emptyState = $("#empty-state");
let activeCategory = "All";
let cart = loadCart();
let toastTimer;

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem("nova-cart") || "[]");
    return Array.isArray(saved) ? saved.filter(item => products.some(p => p.id === item.id) && Number.isInteger(item.qty) && item.qty > 0) : [];
  } catch {
    return [];
  }
}
function saveCart() {
  try { localStorage.setItem("nova-cart", JSON.stringify(cart)); }
  catch { showToast("Cart works for this session, but storage is unavailable."); }
}
function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {style:"currency", currency:"INR", maximumFractionDigits:0}).format(price);
}
function filteredProducts() {
  const term = searchInput.value.trim().toLowerCase();
  let result = products.filter(p => (activeCategory === "All" || p.category === activeCategory) &&
    `${p.name} ${p.category} ${p.description} ${p.tag}`.toLowerCase().includes(term));
  switch (sortSelect.value) {
    case "price-low": result.sort((a,b) => a.price-b.price); break;
    case "price-high": result.sort((a,b) => b.price-a.price); break;
    case "name": result.sort((a,b) => a.name.localeCompare(b.name)); break;
  }
  return result;
}
function renderProducts() {
  const visible = filteredProducts();
  $("#results-count").textContent = `${visible.length} ${visible.length === 1 ? "item" : "items"}`;
  emptyState.hidden = visible.length !== 0;
  productGrid.hidden = visible.length === 0;
  productGrid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" decoding="async"
          onerror="this.hidden=true;this.nextElementSibling.hidden=false">
        <div class="product-image-fallback" hidden aria-hidden="true">${p.icon}</div>
        <span class="product-tag">${p.tag}</span>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <p class="product-description">${p.description}</p>
        <div class="product-bottom"><strong class="product-price">${formatPrice(p.price)}</strong>
          <button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to bag">＋ Add to bag</button></div>
      </div>
    </article>`).join("");
}
function renderCart() {
  const count = cart.reduce((sum,item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum,item) => sum + products.find(p => p.id === item.id).price * item.qty, 0);
  $("#cart-count").textContent = count;
  $("#drawer-count").textContent = `(${count})`;
  $("#cart-subtotal").textContent = formatPrice(subtotal);
  $("#cart-empty").hidden = cart.length > 0;
  $("#cart-items").hidden = cart.length === 0;
  $("#cart-items").innerHTML = cart.map(item => {
    const p = products.find(product => product.id === item.id);
    return `<div class="cart-line"><div class="cart-thumb" aria-hidden="true">${p.icon}</div>
      <div><h3>${p.name}</h3><p>${formatPrice(p.price)} each</p>
      <div class="quantity-controls"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease ${p.name} quantity">−</button><span>${item.qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Increase ${p.name} quantity">＋</button></div></div>
      <strong class="cart-line-price">${formatPrice(p.price * item.qty)}</strong></div>`;
  }).join("");
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
function addToCart(id) {
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty += 1;
  else cart.push({id,qty:1});
  saveCart(); renderCart(); showToast(`${products.find(p => p.id === id).name} added to your bag.`);
}
function updateQuantity(id, change) {
  const item = cart.find(entry => entry.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty <= 0) cart = cart.filter(entry => entry.id !== id);
  saveCart(); renderCart();
}
function setCartOpen(open) {
  $("#cart-overlay").hidden = !open;
  $("#cart-drawer").hidden = !open;
  document.body.classList.toggle("cart-open", open);
  if (open) $("#close-cart").focus();
  else $("#open-cart").focus();
}

document.addEventListener("click", event => {
  const addButton = event.target.closest("[data-add]");
  const quantityButton = event.target.closest("[data-qty]");
  const filterButton = event.target.closest("[data-category]");
  if (addButton) addToCart(Number(addButton.dataset.add));
  if (quantityButton) updateQuantity(Number(quantityButton.dataset.qty), Number(quantityButton.dataset.change));
  if (filterButton) {
    activeCategory = filterButton.dataset.category;
    document.querySelectorAll(".filter-chip").forEach(button => button.classList.toggle("active", button === filterButton));
    renderProducts();
  }
});
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);
$("#clear-filters").addEventListener("click", () => {
  activeCategory = "All"; searchInput.value = ""; sortSelect.value = "featured";
  document.querySelectorAll(".filter-chip").forEach(button => button.classList.toggle("active", button.dataset.category === "All"));
  renderProducts();
});
$("#open-cart").addEventListener("click", () => setCartOpen(true));
$("#close-cart").addEventListener("click", () => setCartOpen(false));
$("#cart-overlay").addEventListener("click", () => setCartOpen(false));
document.addEventListener("keydown", event => { if (event.key === "Escape" && !$("#cart-drawer").hidden) setCartOpen(false); });
$("#checkout-button").addEventListener("click", () => showToast(cart.length ? "Demo checkout only — no payment was processed." : "Your bag is empty. Add an item first."));
$("#newsletter-form").addEventListener("submit", event => {
  event.preventDefault();
  $("#newsletter-message").textContent = "Thanks! This demo form does not send or store your email.";
  $("#newsletter-email").value = "";
});
$("#year").textContent = new Date().getFullYear();
renderProducts();
renderCart();
