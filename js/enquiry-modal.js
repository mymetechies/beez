/**
 * BeeZ Premium Blends - WhatsApp Enquiry Address Flow Module
 * Reusable modal component capturing customer delivery details before opening WhatsApp.
 * Supports:
 * - General Enquiry (Navbar, Hero, Footer, Final CTA, Mobile Drawer)
 * - Product Context (Product Details Modal with currently selected variant size & price)
 * - Cart Context (Cart page with all cart items breakdown)
 * 
 * Strict data rule: Address data is ONLY held in-memory temporarily while constructing
 * the WhatsApp message and is NEVER permanently stored.
 */

(function() {
  'use strict';

  // Active context state: { type: 'general' | 'product' | 'cart', name, size, price, items }
  let activeEnquiryContext = { type: 'general' };

  /**
   * Inject the Modal HTML into document.body if not already in DOM
   */
  function ensureModalInDOM() {
    if (document.getElementById('whatsapp-enquiry-modal')) return;

    const modalHTML = `
      <div class="whatsapp-enquiry-modal" id="whatsapp-enquiry-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title">
        <div class="enquiry-modal-container" id="enquiry-modal-container">
          
          <button type="button" class="enquiry-modal-close" id="enquiry-modal-close" aria-label="Close Enquiry Modal" onclick="closeEnquiryModal()">&times;</button>

          <div class="enquiry-modal-header">
            <span class="enquiry-eyebrow">WHATSAPP ENQUIRY</span>
            <h3 class="enquiry-modal-title" id="enquiry-modal-title">Delivery & Contact Details</h3>
            <p class="enquiry-modal-subtext">Please share your delivery details to connect with BeeZ on WhatsApp.</p>
            <div class="enquiry-context-badge" id="enquiry-context-badge" style="display: none;"></div>
          </div>

          <div class="enquiry-modal-body">
            <form id="whatsapp-enquiry-form" novalidate onsubmit="return false;">
              <div class="enquiry-form-grid">
                
                <div class="enquiry-field-group full-width">
                  <label for="enquiry-fullname" class="enquiry-label">Full Name <span class="enquiry-required-star">*</span></label>
                  <input type="text" id="enquiry-fullname" class="enquiry-input" placeholder="e.g. Priyanshu Sharma" autocomplete="name" />
                  <span class="enquiry-error-msg" id="error-enquiry-fullname"></span>
                </div>

                <div class="enquiry-field-group full-width">
                  <label for="enquiry-phone" class="enquiry-label">Phone Number <span class="enquiry-required-star">*</span></label>
                  <input type="tel" id="enquiry-phone" class="enquiry-input" placeholder="10-digit Indian mobile number" maxlength="14" autocomplete="tel" />
                  <span class="enquiry-error-msg" id="error-enquiry-phone"></span>
                </div>

                <div class="enquiry-field-group">
                  <label for="enquiry-house" class="enquiry-label">House / Door No. <span class="enquiry-required-star">*</span></label>
                  <input type="text" id="enquiry-house" class="enquiry-input" placeholder="e.g. Flat 402, Lotus Apt" autocomplete="address-line1" />
                  <span class="enquiry-error-msg" id="error-enquiry-house"></span>
                </div>

                <div class="enquiry-field-group">
                  <label for="enquiry-street" class="enquiry-label">Street / Area <span class="enquiry-required-star">*</span></label>
                  <input type="text" id="enquiry-street" class="enquiry-input" placeholder="e.g. MG Road, Indiranagar" autocomplete="address-line2" />
                  <span class="enquiry-error-msg" id="error-enquiry-street"></span>
                </div>

                <div class="enquiry-field-group">
                  <label for="enquiry-city" class="enquiry-label">City <span class="enquiry-required-star">*</span></label>
                  <input type="text" id="enquiry-city" class="enquiry-input" placeholder="e.g. Bengaluru" autocomplete="address-level2" />
                  <span class="enquiry-error-msg" id="error-enquiry-city"></span>
                </div>

                <div class="enquiry-field-group">
                  <label for="enquiry-state" class="enquiry-label">State <span class="enquiry-required-star">*</span></label>
                  <input type="text" id="enquiry-state" class="enquiry-input" placeholder="e.g. Karnataka" autocomplete="address-level1" />
                  <span class="enquiry-error-msg" id="error-enquiry-state"></span>
                </div>

                <div class="enquiry-field-group full-width">
                  <label for="enquiry-pincode" class="enquiry-label">Pincode <span class="enquiry-required-star">*</span></label>
                  <input type="text" id="enquiry-pincode" class="enquiry-input" placeholder="6-digit Indian pincode" maxlength="6" inputmode="numeric" autocomplete="postal-code" />
                  <span class="enquiry-error-msg" id="error-enquiry-pincode"></span>
                </div>

                <div class="enquiry-field-group full-width">
                  <label for="enquiry-message" class="enquiry-label">Optional Message</label>
                  <textarea id="enquiry-message" class="enquiry-textarea" rows="2" placeholder="Any specific instructions or questions..."></textarea>
                </div>

              </div>
            </form>
          </div>

          <div class="enquiry-modal-footer">
            <button type="button" class="btn-enquiry-cancel" id="enquiry-btn-cancel" onclick="closeEnquiryModal()">Cancel</button>
            <button type="button" class="btn-enquiry-submit" id="enquiry-btn-submit" onclick="submitEnquiryModal()">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 2C6.477 2 2 6.477 2 12c0 2.152.68 4.144 1.835 5.776L2.5 21.5l3.864-1.306C7.94 21.31 9.896 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.87 0-3.61-.51-5.11-1.402l-.367-.217-2.29.774.786-2.233-.238-.378C3.847 15.02 3.3 13.57 3.3 12c0-4.797 3.903-8.7 8.7-8.7s8.7 3.903 8.7 8.7-3.903 8.7-8.7 8.7z"/>
              </svg>
              <span>Continue to WhatsApp</span>
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    attachModalEvents();
  }

  /**
   * Attach real-time validation and backdrop events
   */
  function attachModalEvents() {
    const modal = document.getElementById('whatsapp-enquiry-modal');
    if (!modal) return;

    // Backdrop click dismisses
    modal.onclick = function(e) {
      if (e.target === modal) {
        closeEnquiryModal();
      }
    };

    // Real-time error clearance on input
    const inputs = modal.querySelectorAll('.enquiry-input, .enquiry-textarea');
    inputs.forEach(input => {
      input.addEventListener('input', function() {
        if (input.classList.contains('has-error')) {
          const err = validateSingleField(input.id);
          if (!err) {
            clearFieldError(input.id);
          }
        }
      });
    });

    // Pincode numbers only
    const pincodeInput = document.getElementById('enquiry-pincode');
    if (pincodeInput) {
      pincodeInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '').slice(0, 6);
      });
    }

    // Phone cleanup formatting
    const phoneInput = document.getElementById('enquiry-phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9+\s\-()]/g, '');
      });
    }
  }

  /**
   * Set field error inline
   */
  function setFieldError(fieldId, errorMsg) {
    const field = document.getElementById(fieldId);
    const errSpan = document.getElementById('error-' + fieldId);
    if (field) field.classList.add('has-error');
    if (errSpan) {
      errSpan.textContent = errorMsg;
      errSpan.classList.add('visible');
    }
  }

  /**
   * Clear field error inline
   */
  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errSpan = document.getElementById('error-' + fieldId);
    if (field) field.classList.remove('has-error');
    if (errSpan) {
      errSpan.textContent = '';
      errSpan.classList.remove('visible');
    }
  }

  /**
   * Validate a single input field
   */
  function validateSingleField(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return '';
    const val = field.value.trim();

    switch (fieldId) {
      case 'enquiry-fullname':
        if (!val) return 'Please enter your full name.';
        break;

      case 'enquiry-phone': {
        const cleaned = val.replace(/[\s\-\(\)]/g, '').replace(/^(\+91|0)/, '');
        if (!val) return 'Please enter your phone number.';
        if (!/^[6-9]\d{9}$/.test(cleaned)) {
          return 'Please enter a valid 10-digit Indian mobile number.';
        }
        break;
      }

      case 'enquiry-house':
        if (!val) return 'Please enter house / door number.';
        break;

      case 'enquiry-street':
        if (!val) return 'Please enter street / area.';
        break;

      case 'enquiry-city':
        if (!val) return 'Please enter city.';
        break;

      case 'enquiry-state':
        if (!val) return 'Please enter state.';
        break;

      case 'enquiry-pincode':
        if (!val) return 'Please enter 6-digit pincode.';
        if (!/^[1-9][0-9]{5}$/.test(val)) {
          return 'Please enter a valid 6-digit Indian pincode.';
        }
        break;

      default:
        break;
    }
    return '';
  }

  /**
   * Validate all form fields
   */
  function validateEnquiryForm() {
    const requiredFieldIds = [
      'enquiry-fullname',
      'enquiry-phone',
      'enquiry-house',
      'enquiry-street',
      'enquiry-city',
      'enquiry-state',
      'enquiry-pincode'
    ];

    let isValid = true;
    let firstInvalidId = null;

    requiredFieldIds.forEach(id => {
      const err = validateSingleField(id);
      if (err) {
        setFieldError(id, err);
        isValid = false;
        if (!firstInvalidId) firstInvalidId = id;
      } else {
        clearFieldError(id);
      }
    });

    return { isValid, firstInvalidId };
  }

  /**
   * Open the Enquiry Address Modal
   * @param {Object} context - Optional context: { type: 'general' | 'product' | 'cart', name, size, price, items }
   */
  window.openEnquiryModal = function(context = { type: 'general' }) {
    ensureModalInDOM();

    // Close mobile navigation drawer if open
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer && drawer.classList.contains('active')) {
      drawer.classList.remove('active');
    }

    activeEnquiryContext = context || { type: 'general' };

    const modal = document.getElementById('whatsapp-enquiry-modal');
    if (!modal) return;

    // Reset all form fields and validation errors
    const form = document.getElementById('whatsapp-enquiry-form');
    if (form) form.reset();

    const errorSpans = modal.querySelectorAll('.enquiry-error-msg');
    errorSpans.forEach(span => {
      span.textContent = '';
      span.classList.remove('visible');
    });

    const inputs = modal.querySelectorAll('.enquiry-input, .enquiry-textarea');
    inputs.forEach(input => input.classList.remove('has-error'));

    // Update Context Badge
    const badge = document.getElementById('enquiry-context-badge');
    if (badge) {
      if (context.type === 'product' && context.name) {
        badge.style.display = 'block';
        badge.innerHTML = `
          <div class="enquiry-context-pill">
            <span class="context-tag">Product</span>
            <span class="context-title">${escapeHTML(context.name)}</span>
            ${context.size ? `<span class="context-sep">&bull;</span><span class="context-detail">${escapeHTML(context.size)}</span>` : ''}
            ${context.price ? `<span class="context-sep">&bull;</span><span class="context-price">${escapeHTML(context.price)}</span>` : ''}
          </div>
        `;
      } else if (context.type === 'cart' && Array.isArray(context.items) && context.items.length > 0) {
        const totalCount = context.items.reduce((acc, it) => acc + (it.quantity || 1), 0);
        const subtotal = typeof getCartSubtotal === 'function' ? formatCurrency(getCartSubtotal()) : '';
        badge.style.display = 'block';
        badge.innerHTML = `
          <div class="enquiry-context-pill">
            <span class="context-tag">Cart Enquiry</span>
            <span class="context-title">${totalCount} item${totalCount === 1 ? '' : 's'}</span>
            ${subtotal ? `<span class="context-sep">&bull;</span><span class="context-price">Total: ${escapeHTML(subtotal)}</span>` : ''}
          </div>
        `;
      } else {
        badge.style.display = 'none';
        badge.innerHTML = '';
      }
    }

    // Show Modal
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Auto-focus first field
    setTimeout(() => {
      const firstInput = document.getElementById('enquiry-fullname');
      if (firstInput) firstInput.focus();
    }, 150);
  };

  /**
   * Close the Enquiry Address Modal
   */
  window.closeEnquiryModal = function() {
    const modal = document.getElementById('whatsapp-enquiry-modal');
    if (!modal) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');

    // Reset form inputs immediately (security / privacy)
    const form = document.getElementById('whatsapp-enquiry-form');
    if (form) form.reset();

    const inputs = modal.querySelectorAll('.enquiry-input, .enquiry-textarea');
    inputs.forEach(input => input.classList.remove('has-error'));

    const errorSpans = modal.querySelectorAll('.enquiry-error-msg');
    errorSpans.forEach(span => {
      span.textContent = '';
      span.classList.remove('visible');
    });

    // Reset context
    activeEnquiryContext = { type: 'general' };

    // Restore scroll only if product modal is not currently open behind
    const productModal = document.getElementById('product-detail-modal');
    if (!productModal || !productModal.classList.contains('active')) {
      document.body.style.overflow = '';
    }
  };

  /**
   * Validate and Submit Enquiry Form -> Construct message and open WhatsApp
   */
  window.submitEnquiryModal = function() {
    const validation = validateEnquiryForm();
    if (!validation.isValid) {
      if (validation.firstInvalidId) {
        const el = document.getElementById(validation.firstInvalidId);
        if (el) el.focus();
      }
      return;
    }

    // Read form values
    const name = (document.getElementById('enquiry-fullname')?.value || '').trim();
    const rawPhone = (document.getElementById('enquiry-phone')?.value || '').trim();
    const cleanPhone = rawPhone.replace(/[\s\-\(\)]/g, '').replace(/^(\+91|0)/, '');
    const house = (document.getElementById('enquiry-house')?.value || '').trim();
    const street = (document.getElementById('enquiry-street')?.value || '').trim();
    const city = (document.getElementById('enquiry-city')?.value || '').trim();
    const state = (document.getElementById('enquiry-state')?.value || '').trim();
    const pincode = (document.getElementById('enquiry-pincode')?.value || '').trim();
    const optionalMsg = (document.getElementById('enquiry-message')?.value || '').trim();

    // Construct WhatsApp message lines
    const msgLines = [
      "Hello BeeZ Premium Blends,",
      "",
      "I would like to make an enquiry/order.",
      ""
    ];

    // Include context (Product / Cart)
    if (activeEnquiryContext.type === 'product' && activeEnquiryContext.name) {
      msgLines.push("Product:");
      msgLines.push(activeEnquiryContext.name);
      if (activeEnquiryContext.size) {
        msgLines.push(`Size: ${activeEnquiryContext.size}`);
      }
      if (activeEnquiryContext.price) {
        msgLines.push(`Price: ${activeEnquiryContext.price}`);
      }
      msgLines.push("");
    } else if (activeEnquiryContext.type === 'cart' && Array.isArray(activeEnquiryContext.items) && activeEnquiryContext.items.length > 0) {
      msgLines.push("Cart Items:");
      msgLines.push("");

      activeEnquiryContext.items.forEach((item, index) => {
        msgLines.push(`${index + 1}. ${item.name}`);
        if (item.size) {
          msgLines.push(`   Size: ${item.size}`);
        }
        msgLines.push(`   Quantity: ${item.quantity}`);
        const cleanPrice = (item.price || (typeof formatCurrency === 'function' ? formatCurrency(item.numericPrice) : `₹${item.numericPrice}`)).replace(/\/-\s*$/, '');
        if (item.quantity > 1) {
          msgLines.push(`   Price: ${cleanPrice} each`);
        } else {
          msgLines.push(`   Price: ${cleanPrice}`);
        }
        msgLines.push("");
      });
    }

    // Include Customer Details
    msgLines.push("Customer Details:");
    msgLines.push(`Name: ${name}`);
    msgLines.push(`Phone: ${cleanPhone}`);
    msgLines.push("");

    // Include Delivery Address
    msgLines.push("Delivery Address:");
    msgLines.push(`House / Door No.: ${house}`);
    msgLines.push(`Street / Area: ${street}`);
    msgLines.push(`City: ${city}`);
    msgLines.push(`State: ${state}`);
    msgLines.push(`Pincode: ${pincode}`);

    // Include Optional Message if provided
    if (optionalMsg) {
      msgLines.push("");
      msgLines.push("Message:");
      msgLines.push(optionalMsg);
    }

    msgLines.push("");
    msgLines.push("Thank you.");

    const finalMessage = msgLines.join("\n");

    // Open WhatsApp
    const rawNumber = typeof WHATSAPP_NUMBER !== 'undefined' ? WHATSAPP_NUMBER : "+91 87922 85105";
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(finalMessage)}`;

    window.open(url, '_blank', 'noopener,noreferrer');

    // Close modal & reset memory
    closeEnquiryModal();
  };

  /**
   * Escape key dismisses enquiry modal
   */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('whatsapp-enquiry-modal');
      if (modal && modal.classList.contains('active')) {
        e.stopPropagation();
        closeEnquiryModal();
      }
    }
  });

  /**
   * Small HTML escape helper for XSS prevention in context pills
   */
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Ensure DOM is ready on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      ensureModalInDOM();
      attachModalEvents();
    });
  } else {
    ensureModalInDOM();
    attachModalEvents();
  }

})();
