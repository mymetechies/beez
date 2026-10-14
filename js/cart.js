/**
 * BeeZ Premium Blends - Shared Shopping Cart Module
 * Manages localStorage cart persistence, quantity tracking, badge counts, and toast notifications.
 */

const CART_STORAGE_KEY = 'beez_cart';

/**
 * Retrieve current cart array from localStorage
 */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
    return [];
  }
}

/**
 * Save cart array to localStorage & update all page badges
 */
function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
}

/**
 * Compute total item count (sum of all quantities)
 */
function getCartTotalCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

/**
 * Compute total cart numeric price subtotal
 */
function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.numericPrice * item.quantity), 0);
}

/**
 * Helper to parse numeric value from price strings like "₹299/-", "₹1,300/-", "DEMO $42.00"
 */
function parseNumericPrice(priceStr) {
  if (!priceStr) return 0;
  // Remove non-digit characters except decimals
  const cleaned = priceStr.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Format numeric price back to BeeZ standard currency string
 */
function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}/-`;
}

/**
 * Add a product (with selected size variant) to cart
 */
function addToCart(productId, size = null, quantity = 1) {
  if (typeof PRODUCTS_DATA === 'undefined') return;

  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  
  // Determine variant price and size label
  let selectedSize = size;
  let priceStr = product.price;

  if (product.variants && product.variants.length > 0) {
    const variant = size ? product.variants.find(v => v.size === size) : product.variants[0];
    if (variant) {
      selectedSize = variant.size;
      priceStr = variant.price;
    } else {
      selectedSize = product.variants[0].size;
      priceStr = product.variants[0].price;
    }
  } else if (!selectedSize) {
    selectedSize = product.size;
  }

  const numericPrice = parseNumericPrice(priceStr);
  const itemKey = `${product.id}_${selectedSize || 'default'}`;

  // Check if item already exists in cart
  const existingIndex = cart.findIndex(item => item.itemKey === itemKey);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({
      itemKey: itemKey,
      productId: product.id,
      name: product.name,
      shortName: product.shortName || product.name,
      category: product.category,
      size: selectedSize,
      priceStr: priceStr,
      numericPrice: numericPrice,
      quantity: quantity,
      image: product.images[0],
      accent: product.accent || '#3F4724',
      accentBg: product.accentBg || 'rgba(63, 71, 36, 0.08)',
      accentBorder: product.accentBorder || 'rgba(63, 71, 36, 0.25)'
    });
  }

  saveCart(cart);
  showCartToast(product.name, selectedSize);
}

/**
 * Update quantity for a specific cart item key
 */
function updateCartItemQuantity(itemKey, delta) {
  let cart = getCart();
  const index = cart.findIndex(item => item.itemKey === itemKey);

  if (index > -1) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
  }
}

/**
 * Remove an item completely from cart
 */
function removeCartItem(itemKey) {
  let cart = getCart();
  cart = cart.filter(item => item.itemKey !== itemKey);
  saveCart(cart);
}

/**
 * Clear entire cart
 */
function clearCart() {
  saveCart([]);
}

/**
 * Update all cart badge counts on the page
 */
function updateCartBadges() {
  const count = getCartTotalCount();
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = count;
    if (count > 0) {
      badge.classList.add('has-items');
    } else {
      badge.classList.remove('has-items');
    }
  });
}

/**
 * Display a non-blocking toast notification when adding to cart
 */
function showCartToast(productName, size) {
  let container = document.getElementById('cart-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'cart-toast-container';
    document.body.appendChild(container);
  }

  const sizeText = size ? ` (${size})` : '';
  const toast = document.createElement('div');
  toast.className = 'cart-toast';
  toast.innerHTML = `
    <div class="cart-toast-content">
      <span class="cart-toast-icon">&check;</span>
      <div class="cart-toast-text">
        <strong>${productName}${sizeText}</strong> added to cart
      </div>
    </div>
    <a href="cart.html" class="cart-toast-action">View Cart &rarr;</a>
  `;

  container.appendChild(toast);

  // Trigger smooth enter animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto disappear after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3500);
}

// Auto update badges on DOM load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();
});
