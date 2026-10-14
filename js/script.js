/**
 * BeeZ Premium Blends - Main UI Controller
 * Mobile-First Interactive Engine, Touch Carousel Swipe, Modal View,
 * Continuous Organic Editorial Product Cards, Restored Botanical Showcase Section,
 * Native Mobile Scroll-Snap Carousels with Active Dot Tracking, and WhatsApp Conversion Handler.
 */

document.addEventListener('DOMContentLoaded', () => {

  // Global State
  let currentActiveProduct = null;
  let currentCarouselIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Organic 4-Corner Positions for Text-Only Ingredient Name Pills
  const ORGANIC_PILL_POSITIONS = [
    { top: "10%", left: "8%" },     // Pill 1: Top-Left
    { top: "12%", right: "8%" },    // Pill 2: Top-Right
    { bottom: "14%", left: "8%" },  // Pill 3: Bottom-Left
    { bottom: "16%", right: "8%" }  // Pill 4: Bottom-Right
  ];

  // 1. RENDER 6 PRODUCT SHOWCASE CARDS WITH CONTINUOUS ORGANIC EDITORIAL PANELS
  function renderProductsGrid() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = PRODUCTS_DATA.map(product => {
      // Limit to maximum 4 ingredients per card as requested
      const pillsList = (product.pills || []).slice(0, 4);

      const pillsHtml = pillsList.map((name, i) => {
        const pos = ORGANIC_PILL_POSITIONS[i] || { top: "10%", left: "10%" };
        const posStyles = [];
        if (pos.top) posStyles.push(`top: ${pos.top}`);
        if (pos.bottom) posStyles.push(`bottom: ${pos.bottom}`);
        if (pos.left) posStyles.push(`left: ${pos.left}`);
        if (pos.right) posStyles.push(`right: ${pos.right}`);
        const posAttr = posStyles.join('; ');

        return `<span class="ingredient-pill-badge" style="${posAttr}">${name}</span>`;
      }).join('');

      return `
        <article class="product-card" 
                 style="--product-accent: ${product.accent}; --product-accent-bg: ${product.accentBg}; --product-accent-border: ${product.accentBorder};"
                 data-product-id="${product.id}">
          
          <div>
            <span class="product-category-tag">${product.category}</span>
            
            <!-- Continuous Organic Visual Canvas (55-65% Bottle Sizing, Seamless Radial Aura, No Inner Card Box) -->
            <div class="product-organic-canvas">
              
              <button class="product-canvas-trigger" 
                      onclick="toggleCardOrbit(event, ${product.id})"
                      aria-label="View ingredients for ${product.name}"
                      aria-expanded="false">
                <img src="${product.images[0]}" alt="${product.name}" class="product-stage-img" loading="lazy" />
              </button>

              <!-- Max 4 Text-Only Ingredient Name Pills (Zero Instruction Text) -->
              ${pillsHtml}

            </div>
            
            <div class="product-info-block">
              <h3 class="product-title">${product.name}</h3>
              <p class="product-description">${product.description}</p>
            </div>
          </div>

          <div class="product-card-actions">
            <button class="btn-add-to-cart-card" onclick="handleAddToCartClick(event, ${product.id})">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Add to Cart</span>
            </button>
            <button class="btn-view-product" onclick="handleViewProductClick(event, ${product.id})">
              View Product <span>&rarr;</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    initProductsCarouselDots();
  }

  // Mobile Touch Tap Toggle Function (Desktop uses pure CSS :hover)
  window.toggleCardOrbit = function(event, productId) {
    if (event) event.stopPropagation();

    const card = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (!card) return;

    const isOrbiting = card.classList.contains('orbit-active');
    
    // Toggle active state for touch devices
    card.classList.toggle('orbit-active');

    // Update accessibility state
    const triggerBtn = card.querySelector('.product-canvas-trigger');
    if (triggerBtn) {
      triggerBtn.setAttribute('aria-expanded', !isOrbiting ? 'true' : 'false');
    }
  };

  // Add to Cart Card Handler with stopPropagation
  window.handleAddToCartClick = function(event, productId) {
    if (event) event.stopPropagation();
    const product = typeof PRODUCTS_DATA !== 'undefined' ? PRODUCTS_DATA.find(p => p.id === productId) : null;
    const defaultSize = (product && product.variants && product.variants.length > 0) ? product.variants[0].size : (product ? product.size : null);
    if (typeof addToCart === 'function') {
      addToCart(productId, defaultSize, 1);
    }
  };

  // View Product Handler with stopPropagation
  window.handleViewProductClick = function(event, productId) {
    if (event) event.stopPropagation();
    openProductModal(productId);
  };

  // 2. PRODUCT DETAIL MODAL & CAROUSEL ENGINE
  window.openProductModal = function(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    currentActiveProduct = product;
    currentCarouselIndex = 0;

    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    // Apply Accent Theme Variables
    modal.style.setProperty('--detail-accent', product.accent);
    modal.style.setProperty('--detail-accent-bg', product.accentBg);
    modal.style.setProperty('--detail-accent-border', product.accentBorder);

    // Populate Product Metadata
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-tagline').textContent = product.tagline;
    document.getElementById('modal-description').textContent = product.description;

    // Render Key Benefits List
    const benefitsList = document.getElementById('modal-benefits-list');
    if (benefitsList) {
      benefitsList.innerHTML = product.benefits.map(b => `
        <div class="benefit-item">
          <span class="benefit-item-icon">&check;</span>
          <span>${b}</span>
        </div>
      `).join('');
    }

    // Render Ingredient Chips
    const ingredientsFlex = document.getElementById('modal-ingredients-chips');
    if (ingredientsFlex) {
      ingredientsFlex.innerHTML = product.ingredients.map(ing => `
        <span class="ingredient-chip">${ing}</span>
      `).join('');
    }

    // Render Size Selector / Variants
    const sizeSelector = document.getElementById('modal-size-selector');
    if (sizeSelector) {
      if (product.variants && product.variants.length > 0) {
        product.selectedSize = product.variants[0].size;
        document.getElementById('modal-price').textContent = product.variants[0].price;
        
        sizeSelector.innerHTML = product.variants.map(v => `
          <button class="variant-pill ${v.size === product.selectedSize ? 'active' : ''}" 
                  data-size="${v.size}"
                  onclick="selectProductVariant(${product.id}, '${v.size}')"
                  aria-label="Select ${v.size} for ${v.price}">
            ${v.size}
          </button>
        `).join('');
      } else {
        document.getElementById('modal-price').textContent = product.price;
        sizeSelector.innerHTML = `<span class="detail-size" id="modal-size">${product.size}</span>`;
      }
    }

    // Wire CTA buttons for Order on Meesho, Enquire on WhatsApp, and Add to Cart
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart');
    if (modalAddToCartBtn) {
      modalAddToCartBtn.onclick = () => {
        const activeSize = (currentActiveProduct && currentActiveProduct.selectedSize) ? currentActiveProduct.selectedSize : product.size;
        if (typeof addToCart === 'function') {
          addToCart(product.id, activeSize, 1);
        }
      };
    }

    const meeshoBtn = document.getElementById('modal-order-meesho');
    if (meeshoBtn) {
      meeshoBtn.onclick = (e) => openMeesho(e);
    }

    const whatsappBtn = document.getElementById('modal-enquire-whatsapp');
    if (whatsappBtn) {
      whatsappBtn.onclick = () => {
        const activeSize = (currentActiveProduct && currentActiveProduct.selectedSize) ? currentActiveProduct.selectedSize : product.size;
        let activePrice = product.price;
        if (product.variants && product.variants.length > 0) {
          const v = product.variants.find(item => item.size === activeSize) || product.variants[0];
          activePrice = v ? v.price : product.price;
        }
        openWhatsApp(product.name, activeSize, activePrice);
      };
    }

    // Update 4-Image Carousel State
    updateCarousel();

    // Show Modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.selectProductVariant = function(productId, size) {
    if (!currentActiveProduct || currentActiveProduct.id !== productId) return;
    if (!currentActiveProduct.variants) return;

    const variant = currentActiveProduct.variants.find(v => v.size === size);
    if (!variant) return;

    currentActiveProduct.selectedSize = size;

    // Update Price Display
    const priceEl = document.getElementById('modal-price');
    if (priceEl) priceEl.textContent = variant.price;

    // Update Pill Active Classes
    const pills = document.querySelectorAll('.variant-pill');
    pills.forEach(pill => {
      if (pill.getAttribute('data-size') === size) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // Update WhatsApp Button Handler
    const whatsappBtn = document.getElementById('modal-enquire-whatsapp');
    if (whatsappBtn) {
      whatsappBtn.onclick = () => openWhatsApp(currentActiveProduct.name, size, variant.price);
    }
  };

  window.closeProductModal = function() {
    const modal = document.getElementById('product-detail-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  function updateCarousel() {
    if (!currentActiveProduct) return;

    const images = currentActiveProduct.images;
    const mainImg = document.getElementById('carousel-main-img');
    const thumbsContainer = document.getElementById('carousel-thumbnails');

    // Fade Transition for Main Image
    mainImg.style.opacity = '0.3';
    setTimeout(() => {
      mainImg.src = images[currentCarouselIndex];
      mainImg.alt = `${currentActiveProduct.name} - View ${currentCarouselIndex + 1}`;
      mainImg.style.opacity = '1';
    }, 100);

    // Render Thumbnail Indicators
    thumbsContainer.innerHTML = images.map((imgSrc, i) => `
      <button class="thumb-btn ${i === currentCarouselIndex ? 'active' : ''}" 
              onclick="setCarouselIndex(${i})"
              aria-label="View product image ${i + 1}">
        <img src="${imgSrc}" alt="Thumbnail ${i + 1}" />
      </button>
    `).join('');
  }

  window.setCarouselIndex = function(index) {
    if (!currentActiveProduct) return;
    currentCarouselIndex = index;
    updateCarousel();
  };

  window.prevCarouselSlide = function() {
    if (!currentActiveProduct) return;
    const total = currentActiveProduct.images.length;
    currentCarouselIndex = (currentCarouselIndex - 1 + total) % total;
    updateCarousel();
  };

  window.nextCarouselSlide = function() {
    if (!currentActiveProduct) return;
    const total = currentActiveProduct.images.length;
    currentCarouselIndex = (currentCarouselIndex + 1) % total;
    updateCarousel();
  };

  // Mobile Touch Swipe Gesture Support for Carousel
  const carouselDisplay = document.getElementById('carousel-main-display');
  if (carouselDisplay) {
    carouselDisplay.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carouselDisplay.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const swipeThreshold = 40;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextCarouselSlide();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevCarouselSlide();
    }
  }

  // Keyboard controls for modal and carousel
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('product-detail-modal');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closeProductModal();
    } else if (e.key === 'ArrowLeft') {
      prevCarouselSlide();
    } else if (e.key === 'ArrowRight') {
      nextCarouselSlide();
    }
  });

  // 3. WHATSAPP & MEESHO DYNAMIC CONVERSION LINK BUILDER
  window.openWhatsApp = function(productName = null, productSize = null, productPrice = null) {
    if (productName && typeof productName !== 'object') {
      if (!productPrice) {
        if (typeof currentActiveProduct !== 'undefined' && currentActiveProduct && currentActiveProduct.name === productName) {
          if (currentActiveProduct.variants && currentActiveProduct.variants.length > 0) {
            const v = currentActiveProduct.variants.find(item => item.size === productSize) || currentActiveProduct.variants[0];
            productPrice = v ? v.price : currentActiveProduct.price;
          } else {
            productPrice = currentActiveProduct.price;
          }
        } else if (typeof PRODUCTS_DATA !== 'undefined' && PRODUCTS_DATA) {
          const p = PRODUCTS_DATA.find(item => item.name === productName);
          if (p) {
            if (p.variants && p.variants.length > 0) {
              const v = p.variants.find(item => item.size === productSize) || p.variants[0];
              productPrice = v ? v.price : p.price;
            } else {
              productPrice = p.price;
            }
          }
        }
      }
      if (typeof openEnquiryModal === 'function') {
        openEnquiryModal({
          type: 'product',
          name: productName,
          size: productSize,
          price: productPrice
        });
      }
    } else {
      if (typeof openEnquiryModal === 'function') {
        openEnquiryModal({ type: 'general' });
      }
    }
  };

  window.openWhatsAppCatalogue = function(event) {
    if (event && event.preventDefault) event.preventDefault();
    const catalogueUrl = typeof WHATSAPP_CATALOGUE_URL !== 'undefined' ? WHATSAPP_CATALOGUE_URL : 'https://wa.me/c/918792285105';
    window.open(catalogueUrl, '_blank', 'noopener,noreferrer');
  };

  window.openNavbarWhatsApp = function(event) {
    if (event && event.preventDefault) event.preventDefault();
    const drawer = document.getElementById('mobile-nav-drawer');
    if (drawer && drawer.classList.contains('active')) {
      drawer.classList.remove('active');
    }
    if (typeof openEnquiryModal === 'function') {
      openEnquiryModal({ type: 'general' });
    }
  };

  window.openMeesho = function(event) {
    if (event && event.preventDefault) event.preventDefault();
    const meeshoUrl = typeof MEESHO_PRODUCT_URL !== 'undefined' ? MEESHO_PRODUCT_URL : 'https://www.meesho.com/beez-premium-infused-hair-oil';
    window.open(meeshoUrl, '_blank', 'noopener,noreferrer');
  };

  window.openInstagram = function(event) {
    if (event && event.preventDefault) event.preventDefault();
    const instaUrl = typeof INSTAGRAM_URL !== 'undefined' ? INSTAGRAM_URL : 'https://www.instagram.com/beez_premium_blends';
    window.open(instaUrl, '_blank', 'noopener,noreferrer');
  };

  window.openFacebook = function(event) {
    if (event && event.preventDefault) event.preventDefault();
    const fbUrl = typeof FACEBOOK_URL !== 'undefined' ? FACEBOOK_URL : '#';
    if (fbUrl && fbUrl !== '#') {
      window.open(fbUrl, '_blank', 'noopener,noreferrer');
    }
  };

  window.openYouTube = function(event) {
    if (event && event.preventDefault) event.preventDefault();
    const ytUrl = typeof YOUTUBE_URL !== 'undefined' ? YOUTUBE_URL : '#';
    if (ytUrl && ytUrl !== '#') {
      window.open(ytUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // 4. DEMO CUSTOMER REVIEWS RENDERER
  function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if (!grid) return;

    grid.innerHTML = DEMO_REVIEWS.map(rev => `
      <div class="review-card">
        <div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
        <p class="review-quote">"${rev.quote}"</p>
        <div>
          <div class="review-author">${rev.name}</div>
          <div class="review-product-tag">${rev.product}</div>
        </div>
      </div>
    `).join('');

    initReviewsCarouselDots();
  }

  // 5. MOBILE CAROUSEL DOTS ENGINE (PRODUCTS & REVIEWS)
  function initProductsCarouselDots() {
    const grid = document.getElementById('products-grid');
    const dotsContainer = document.getElementById('products-carousel-dots');
    if (!grid || !dotsContainer) return;

    const cards = grid.querySelectorAll('.product-card');
    if (!cards.length) return;

    dotsContainer.innerHTML = Array.from(cards).map((card, i) => {
      const product = PRODUCTS_DATA[i] || {};
      const accent = product.accent || 'var(--color-ocean-blue)';
      return `<button class="carousel-dot-btn ${i === 0 ? 'active' : ''}" 
                      style="--dot-accent: ${accent};"
                      onclick="scrollToCarouselCard('products-grid', ${i})"
                      aria-label="Go to product ${i + 1} of ${cards.length}"></button>`;
    }).join('');

    // Scroll listener for active dot synchronization
    let isTicking = false;
    grid.addEventListener('scroll', () => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          updateActiveDot('products-grid', 'products-carousel-dots');
          isTicking = false;
        });
        isTicking = true;
      }
    }, { passive: true });
  }

  function initReviewsCarouselDots() {
    const grid = document.getElementById('reviews-grid');
    const dotsContainer = document.getElementById('reviews-carousel-dots');
    if (!grid || !dotsContainer) return;

    const cards = grid.querySelectorAll('.review-card');
    if (!cards.length) return;

    dotsContainer.innerHTML = Array.from(cards).map((_, i) => {
      return `<button class="carousel-dot-btn ${i === 0 ? 'active' : ''}" 
                      onclick="scrollToCarouselCard('reviews-grid', ${i})"
                      aria-label="Go to review ${i + 1} of ${cards.length}"></button>`;
    }).join('');

    let isTicking = false;
    grid.addEventListener('scroll', () => {
      if (!isTicking) {
        requestAnimationFrame(() => {
          updateActiveDot('reviews-grid', 'reviews-carousel-dots');
          isTicking = false;
        });
        isTicking = true;
      }
    }, { passive: true });
  }

  window.scrollToCarouselCard = function(gridId, index) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const cards = grid.children;
    if (cards[index]) {
      cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  function updateActiveDot(gridId, dotsId) {
    const grid = document.getElementById(gridId);
    const dotsContainer = document.getElementById(dotsId);
    if (!grid || !dotsContainer) return;

    const cards = Array.from(grid.children);
    if (!cards.length) return;

    const gridCenter = grid.scrollLeft + (grid.clientWidth / 2);
    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
      const distance = Math.abs(gridCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = i;
      }
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot-btn');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === closestIndex);
    });
  }

  // 6. NAVBAR & MOBILE DRAWER LOGIC
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const mobileClose = document.getElementById('mobile-drawer-close');

    // Scroll Navbar Class
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });

    // Open Drawer
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    }

    // Close Drawer
    if (mobileClose && mobileDrawer) {
      mobileClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close Drawer when clicking any link
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 7. SYNCHRONIZED DUAL-LAYER STACKED CROSSFADE ENGINE & DYNAMIC INGREDIENT SHOWCASE
  function initSynchronizedProductRotation() {
    if (typeof PRODUCTS_DATA === 'undefined' || !PRODUCTS_DATA.length) return;

    const heroBase = document.getElementById('hero-img-base');
    const heroOverlay = document.getElementById('hero-img-overlay');
    const botanicalBase = document.getElementById('botanical-img-base');
    const botanicalOverlay = document.getElementById('botanical-img-overlay');
    const pillsWrapper = document.getElementById('botanical-pills-wrapper');

    if (!heroBase && !botanicalBase) return;

    // Single source of truth product catalog list from PRODUCTS_DATA
    const rotationProducts = PRODUCTS_DATA.map(p => ({
      id: p.id,
      name: p.name,
      firstImage: (p.images && p.images.length > 0) ? p.images[0] : '',
      pills: (p.pills && p.pills.length > 0) ? p.pills : (p.ingredients || []),
      ingredientClaims: p.ingredientClaims || {},
      ingredientOrbit: p.ingredientOrbit || []
    })).filter(p => p.firstImage !== '');

    if (rotationProducts.length === 0) return;

    // Cache/Preload all 6 images using Image() constructor
    const preloadedImages = {};
    rotationProducts.forEach(prod => {
      const img = new Image();
      img.src = prod.firstImage;
      preloadedImages[prod.firstImage] = img;
    });

    const DISPLAY_TIME = 5000;    // 5 seconds visible display per product
    const CROSSFADE_TIME = 1350;  // 1.35 seconds smooth dual-layer crossfade
    let activeIndex = 0;

    // Helper to retrieve concise authentic benefit for each ingredient
    function getIngredientBenefit(product, ingName) {
      if (!product || !ingName) return "Nourishes and protects naturally.";

      // 1. Check ingredientClaims object
      if (product.ingredientClaims) {
        const keys = Object.keys(product.ingredientClaims);
        const matchKey = keys.find(k => k.toLowerCase() === ingName.toLowerCase() || ingName.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(ingName.toLowerCase()));
        if (matchKey && product.ingredientClaims[matchKey]) {
          return product.ingredientClaims[matchKey];
        }
      }

      // 2. Check ingredientOrbit array
      if (product.ingredientOrbit && Array.isArray(product.ingredientOrbit)) {
        const orbitItem = product.ingredientOrbit.find(o => o.name.toLowerCase() === ingName.toLowerCase() || ingName.toLowerCase().includes(o.name.toLowerCase()) || o.name.toLowerCase().includes(ingName.toLowerCase()));
        if (orbitItem && orbitItem.descriptor) {
          return orbitItem.descriptor;
        }
      }

      // 3. Fallbacks based on common botanical ingredients
      const defaultBenefitMap = {
        "coconut oil": "Nourishes and strengthens hair.",
        "curry leaves": "Reduces hair fall and boosts melanin.",
        "amla": "Boosts collagen and reduces hair greying.",
        "bhringraj": "Enhances hair growth.",
        "hibiscus": "Thickens hair and prevents dryness.",
        "almond oil": "90% Pure almond for soft radiant skin.",
        "carrot": "Radiance infusion and dewy glow.",
        "essential oils": "Pure essential botanical blend.",
        "lavender": "Soothing calming aroma and skin relief.",
        "chamomile": "Redness relief and sensitive skin care.",
        "rosehip": "Cell renewal and elasticity boost.",
        "squalane": "Moisture lock and deep hydration.",
        "sea buckthorn": "Vitamin C radiance and antioxidant defense.",
        "marula": "Antioxidant shield and barrier protection.",
        "apricot": "Dewy silk finish.",
        "argan": "Omega repair and all-day protection.",
        "vitamin e": "Environmental barrier shield.",
        "vanilla": "Warm aroma and soothing touch.",
        "damask rose": "Timeless floral renewal and cell plumping.",
        "camellia": "Rejuvenates tired skin cells.",
        "plum kernel": "Diminishes fine dehydration lines."
      };

      const lowerName = ingName.toLowerCase();
      for (let key in defaultBenefitMap) {
        if (lowerName.includes(key)) {
          return defaultBenefitMap[key];
        }
      }

      return "Nourishes and protects naturally.";
    }

    // Helper to render active product botanical ingredient pills (4 vs 5 positioning)
    function updateIngredientsPills(prodIndex, isCrossfading = false) {
      if (!pillsWrapper) return;
      const product = rotationProducts[prodIndex];
      const items = product.pills.slice(0, 5);
      const count = items.length;

      // Determine positioning classes based on count (4 vs 5)
      let positions = [];
      if (count === 4) {
        // 4 ingredients: 2 left (left-top, left-bottom), 2 right (right-top, right-bottom)
        positions = [
          'pos-left-top',
          'pos-left-bottom',
          'pos-right-top',
          'pos-right-bottom'
        ];
      } else {
        // 5 ingredients: 1 top-center, 2 left, 2 right
        positions = [
          'pos-top-center',
          'pos-left-top',
          'pos-left-bottom',
          'pos-right-top',
          'pos-right-bottom'
        ];
      }

      const itemHtml = items.map((ingName, idx) => {
        const benefit = getIngredientBenefit(product, ingName);
        const posClass = positions[idx] || '';
        return `
          <div class="floating-botanical-item ${posClass} ${isCrossfading ? 'pill-crossfade-out' : ''}" data-idx="${idx}">
            <button class="floating-botanical-pill" type="button" aria-expanded="false">
              ${ingName}
            </button>
            <div class="pill-benefit-tooltip">${benefit}</div>
          </div>
        `;
      }).join('');

      if (isCrossfading) {
        const existingItems = pillsWrapper.querySelectorAll('.floating-botanical-item');
        existingItems.forEach(item => item.classList.add('pill-crossfade-out'));

        setTimeout(() => {
          pillsWrapper.innerHTML = itemHtml;
          attachPillInteractions();
          requestAnimationFrame(() => {
            pillsWrapper.querySelectorAll('.floating-botanical-item').forEach(p => p.classList.remove('pill-crossfade-out'));
          });
        }, CROSSFADE_TIME * 0.4);
      } else {
        pillsWrapper.innerHTML = itemHtml;
        attachPillInteractions();
      }
    }

    // Attach hover/tap interactions for pills & floating benefit tooltips
    function attachPillInteractions() {
      if (!pillsWrapper) return;
      const items = pillsWrapper.querySelectorAll('.floating-botanical-item');
      items.forEach(item => {
        const pillBtn = item.querySelector('.floating-botanical-pill');
        if (!pillBtn) return;

        pillBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const isActive = item.classList.contains('active');
          
          // Close all active items so only ONE benefit is open at a time
          items.forEach(it => {
            it.classList.remove('active');
            const btn = it.querySelector('.floating-botanical-pill');
            if (btn) btn.setAttribute('aria-expanded', 'false');
          });

          // Toggle current item if it wasn't active
          if (!isActive) {
            item.classList.add('active');
            pillBtn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }

    // Close mobile expanded pills when tapping outside
    document.addEventListener('click', (e) => {
      if (pillsWrapper && !pillsWrapper.contains(e.target)) {
        pillsWrapper.querySelectorAll('.floating-botanical-item').forEach(item => {
          item.classList.remove('active');
          const btn = item.querySelector('.floating-botanical-pill');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Set initial product pills
    updateIngredientsPills(0, false);

    // Continuous Loop with Preloading Validation
    setInterval(() => {
      const nextIndex = (activeIndex + 1) % rotationProducts.length;
      const nextProd = rotationProducts[nextIndex];

      // Preload next image & start crossfade only after load confirmation
      const imgPreloader = new Image();
      imgPreloader.src = nextProd.firstImage;

      if (imgPreloader.complete) {
        executeCrossfade();
      } else {
        imgPreloader.onload = executeCrossfade;
      }

      function executeCrossfade() {
        // Step 1: Set Overlay layers (top image) to next product image
        if (heroOverlay) {
          heroOverlay.src = nextProd.firstImage;
          heroOverlay.alt = nextProd.name;
        }
        if (botanicalOverlay) {
          botanicalOverlay.src = nextProd.firstImage;
          botanicalOverlay.alt = nextProd.name;
        }

        // Step 2: Trigger smooth dual-layer crossfade (Overlay fades 0 -> 1 over Base)
        requestAnimationFrame(() => {
          if (heroOverlay) heroOverlay.classList.add('crossfade-active');
          if (botanicalOverlay) botanicalOverlay.classList.add('crossfade-active');
          updateIngredientsPills(nextIndex, true);
        });

        // Step 3: At completion of crossfade (1.35s), update Base layers and reset Overlay without flash
        setTimeout(() => {
          if (heroBase) {
            heroBase.src = nextProd.firstImage;
            heroBase.alt = nextProd.name;
          }
          if (botanicalBase) {
            botanicalBase.src = nextProd.firstImage;
            botanicalBase.alt = nextProd.name;
          }

          // Reset Overlay instantly without animation
          if (heroOverlay) {
            heroOverlay.style.transition = 'none';
            heroOverlay.classList.remove('crossfade-active');
            heroOverlay.offsetHeight; // Force reflow
            heroOverlay.style.transition = '';
          }
          if (botanicalOverlay) {
            botanicalOverlay.style.transition = 'none';
            botanicalOverlay.classList.remove('crossfade-active');
            botanicalOverlay.offsetHeight; // Force reflow
            botanicalOverlay.style.transition = '';
          }

          activeIndex = nextIndex;
        }, CROSSFADE_TIME);
      }

    }, DISPLAY_TIME + CROSSFADE_TIME);
  }

  // INITIALIZE ALL MODULES
  renderProductsGrid();
  renderReviews();
  initNavbar();
  initSynchronizedProductRotation();

});
