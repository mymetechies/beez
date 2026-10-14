/**
 * BeeZ Premium Blends - Cart Page Logic
 * Handles rendering cart items, quantity adjustments, item removals, summary calculations, and WhatsApp checkout enquiry generation.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle logic for cart.html
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');

  if (mobileToggle && mobileNavDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileNavDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileDrawerClose && mobileNavDrawer) {
    mobileDrawerClose.addEventListener('click', () => {
      mobileNavDrawer.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Sticky Navbar Scroll Effect for cart.html
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  renderCartPage();
});

/**
 * Main render function for Cart Page
 */
function renderCartPage() {
  const cart = typeof getCart === 'function' ? getCart() : [];
  const emptyView = document.getElementById('cart-empty-view');
  const gridView = document.getElementById('cart-grid-view');
  const itemsContainer = document.getElementById('cart-items-container');
  const summaryContainer = document.getElementById('cart-summary-container');

  if (!itemsContainer || !emptyView || !gridView) return;

  if (cart.length === 0) {
    gridView.style.display = 'none';
    emptyView.style.display = 'block';
    return;
  }

  emptyView.style.display = 'none';
  gridView.style.display = 'grid';

  // Render Items List
  itemsContainer.innerHTML = cart.map(item => {
    const itemSubtotal = item.numericPrice * item.quantity;
    const variantDisplay = item.size ? `<span class="cart-item-variant">Size: ${item.size}</span>` : '';

    return `
      <div class="cart-item-card" data-item-key="${item.itemKey}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        
        <div class="cart-item-details">
          <h3 class="cart-item-title">${item.name}</h3>
          ${variantDisplay}
          <div class="cart-item-price-row">
            <span class="cart-item-price">${item.priceStr}</span>
          </div>

          <div class="cart-item-qty-row">
            <span class="qty-label">Quantity:</span>
            <div class="qty-control-group">
              <button class="qty-btn" onclick="handleCartQtyChange('${item.itemKey}', -1)" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-count">${item.quantity}</span>
              <button class="qty-btn" onclick="handleCartQtyChange('${item.itemKey}', 1)" aria-label="Increase quantity">&plus;</button>
            </div>
          </div>
        </div>

        <div class="cart-item-right">
          <div class="cart-item-subtotal-block">
            <span class="subtotal-label">Subtotal</span>
            <span class="cart-item-subtotal">${formatCurrency(itemSubtotal)}</span>
          </div>

          <button class="btn-remove-item" onclick="handleCartItemRemove('${item.itemKey}')" aria-label="Remove item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            <span>Remove</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  // Render Order Summary
  const totalCount = getCartTotalCount();
  const subtotal = getCartSubtotal();

  summaryContainer.innerHTML = `
    <h3 class="cart-summary-title">Order Summary</h3>
    
    <div class="cart-summary-row">
      <span>Total Items</span>
      <strong>${totalCount}</strong>
    </div>

    <div class="cart-summary-row">
      <span>Subtotal</span>
      <strong>${formatCurrency(subtotal)}</strong>
    </div>

    <div class="cart-summary-row total-row">
      <span>Estimated Total</span>
      <strong>${formatCurrency(subtotal)}</strong>
    </div>

    <button class="btn btn-whatsapp btn-cart-whatsapp" onclick="handleWhatsAppCartCheckout()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 2C6.477 2 2 6.477 2 12c0 2.152.68 4.144 1.835 5.776L2.5 21.5l3.864-1.306C7.94 21.31 9.896 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.87 0-3.61-.51-5.11-1.402l-.367-.217-2.29.774.786-2.233-.238-.378C3.847 15.02 3.3 13.57 3.3 12c0-4.797 3.903-8.7 8.7-8.7s8.7 3.903 8.7 8.7-3.903 8.7-8.7 8.7z"/>
      </svg>
      <span>Enquire on WhatsApp</span>
    </button>
  `;
}

/**
 * Handle quantity adjustment
 */
function handleCartQtyChange(itemKey, delta) {
  if (typeof updateCartItemQuantity === 'function') {
    updateCartItemQuantity(itemKey, delta);
    renderCartPage();
  }
}

/**
 * Handle item removal
 */
function handleCartItemRemove(itemKey) {
  if (typeof removeCartItem === 'function') {
    removeCartItem(itemKey);
    renderCartPage();
  }
}

/**
 * Generate formatted WhatsApp enquiry message with cart items breakdown
 */
function handleWhatsAppCartCheckout() {
  const cart = typeof getCart === 'function' ? getCart() : [];
  if (cart.length === 0) return;

  if (typeof openEnquiryModal === 'function') {
    openEnquiryModal({
      type: 'cart',
      items: cart
    });
  }
}
