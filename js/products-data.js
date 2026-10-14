/**
 * BeeZ Premium Blends - Product Catalog Data Architecture
 * Easily customizable catalog with 4-image carousels and visual ingredient orbit mapping.
 */

const WHATSAPP_NUMBER = "+91 87922 85105";
const WHATSAPP_CATALOGUE_URL = "https://wa.me/c/918792285105";
const INSTAGRAM_HANDLE = "@beez_premium_blends";
const INSTAGRAM_URL = "https://www.instagram.com/beez_premium_blends";
const FACEBOOK_URL = "#";
const YOUTUBE_URL = "#";
const MEESHO_PRODUCT_URL = "https://www.meesho.com/beez-premium-infused-hair-oil/p/g3t7wu?_ms=1.3";

// Reusable Botanical SVG Visual Badges
const BOTANICAL_VISUALS = {
  amla: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23E8F5E9'/><circle cx='50' cy='50' r='30' fill='%232E7D6B'/><path d='M50 25 Q65 40 50 75 Q35 40 50 25' fill='%23A5D6A7'/><circle cx='50' cy='50' r='6' fill='%23FFF'/></svg>",
  rosemary: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23E8EAF6'/><path d='M50 80 Q45 50 50 20 Q55 50 50 80' stroke='%231E3A8A' stroke-width='6' fill='none'/><path d='M50 35 C30 25 25 40 50 45 C75 40 70 25 50 35' fill='%233F51B5'/><path d='M50 55 C30 45 25 60 50 65 C75 60 70 45 50 55' fill='%233F51B5'/></svg>",
  coconut: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FFFDE7'/><circle cx='50' cy='50' r='32' fill='%23795548'/><circle cx='50' cy='50' r='22' fill='%23FFF'/><circle cx='40' cy='45' r='4' fill='%235D4037'/><circle cx='60' cy='45' r='4' fill='%235D4037'/><circle cx='50' cy='58' r='4' fill='%235D4037'/></svg>",
  brahmi: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23F1F8E9'/><path d='M50 25 C30 35 30 65 50 75 C70 65 70 35 50 25' fill='%234CAF50'/><circle cx='50' cy='50' r='8' fill='%23C8E6C9'/></svg>",
  teatree: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23E0F2F1'/><path d='M50 15 L35 75 L65 75 Z' fill='%232E7D6B'/><path d='M50 25 L40 65 L60 65 Z' fill='%2380CBC4'/></svg>",
  peppermint: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23E0F7FA'/><path d='M50 20 C20 40 40 80 50 80 C60 80 80 40 50 20' fill='%2300897B'/><path d='M50 20 L50 80' stroke='%23B2DFDB' stroke-width='4'/></svg>",
  jojoba: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FFF8E1'/><ellipse cx='50' cy='50' rx='24' ry='32' fill='%23FFB300'/><ellipse cx='45' cy='42' rx='8' ry='14' fill='%23FFE082'/></svg>",
  eucalyptus: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23E8F5E9'/><ellipse cx='40' cy='45' rx='16' ry='28' fill='%2366BB6A' transform='rotate(-20 40 45)'/><ellipse cx='60' cy='55' rx='16' ry='28' fill='%2381C784' transform='rotate(20 60 55)'/></svg>",
  lavender: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23F3E5F5'/><circle cx='50' cy='30' r='10' fill='%237B5FA7'/><circle cx='40' cy='45' r='9' fill='%239C27B0'/><circle cx='60' cy='45' r='9' fill='%239C27B0'/><circle cx='50' cy='60' r='8' fill='%23BA68C8'/><path d='M50 65 L50 85' stroke='%234A148C' stroke-width='4'/></svg>",
  chamomile: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FFFDE7'/><circle cx='50' cy='50' r='16' fill='%23FBC02D'/><circle cx='50' cy='25' r='8' fill='%23FFF'/><circle cx='75' cy='50' r='8' fill='%23FFF'/><circle cx='50' cy='75' r='8' fill='%23FFF'/><circle cx='25' cy='50' r='8' fill='%23FFF'/></svg>",
  rosehip: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FBE9E7'/><ellipse cx='50' cy='52' rx='22' ry='28' fill='%23FF5722'/><path d='M50 24 L44 14 L56 14 Z' fill='%23388E3C'/></svg>",
  squalane: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23E1F5FE'/><path d='M50 20 Q75 55 50 80 Q25 55 50 20 Z' fill='%230288D1'/><circle cx='42' cy='45' r='6' fill='%23B3E5FC'/></svg>",
  seabuckthorn: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FBE9E7'/><circle cx='40' cy='45' r='14' fill='%23FF6F00'/><circle cx='60' cy='55' r='14' fill='%23FF8F00'/><circle cx='55' cy='38' r='10' fill='%23FFA000'/></svg>",
  marula: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FFF8E1'/><circle cx='50' cy='50' r='26' fill='%23FFC107'/><path d='M42 35 C42 25 58 25 58 35' stroke='%238D6E63' stroke-width='4' fill='none'/></svg>",
  apricot: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FBE9E7'/><circle cx='50' cy='52' r='28' fill='%23FF7043'/><path d='M50 24 L50 40' stroke='%23BF360C' stroke-width='3'/></svg>",
  almond: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FFF8E1'/><path d='M50 20 Q80 50 50 80 Q20 50 50 20' fill='%23D4A017'/><path d='M50 30 Q70 50 50 70' stroke='%238D6E63' stroke-width='3' fill='none'/></svg>",
  argan: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FFFDE7'/><ellipse cx='50' cy='50' rx='20' ry='30' fill='%23FBC02D'/><path d='M40 30 L60 70' stroke='%23F57F17' stroke-width='3'/></svg>",
  vitamine: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FFF8E1'/><circle cx='50' cy='50' r='28' fill='%23FFD54F'/><text x='50' y='58' font-size='22' font-weight='bold' text-anchor='middle' fill='%236D4C41'>E</text></svg>",
  vanilla: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FFFDE7'/><path d='M30 75 Q50 30 70 75' stroke='%235D4037' stroke-width='8' fill='none'/><circle cx='50' cy='35' r='10' fill='%23FFF'/></svg>",
  rose: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FCE4EC'/><circle cx='50' cy='50' r='26' fill='%23E91E63'/><path d='M35 45 C40 30 60 30 65 45 C60 60 40 60 35 45' fill='%23F48FB1'/></svg>",
  hibiscus: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FCE4EC'/><path d='M50 15 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z' fill='%23D81B60'/><circle cx='50' cy='48' r='8' fill='%23FFD54F'/></svg>",
  camellia: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23FCE4EC'/><circle cx='50' cy='50' r='28' fill='%23F48FB1'/><circle cx='50' cy='50' r='14' fill='%23C2185B'/></svg>",
  plum: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='46' fill='%23F3E5F5'/><circle cx='50' cy='52' r='28' fill='%238E24AA'/><path d='M45 24 L55 24' stroke='%234A148C' stroke-width='4'/></svg>"
};

const PRODUCTS_DATA = [
  {
    id: 1,
    name: "BeeZ Premium Infused Hair Oil",
    shortName: "Infused Hair Oil",
    category: "Hair Care / Hair Oil",
    accent: "#3F4724",
    accentBg: "rgba(63, 71, 36, 0.08)",
    accentBorder: "rgba(63, 71, 36, 0.25)",
    tagline: "100% Organic • Handcrafted Scalp & Root Nourishment",
    price: "₹299/-",
    size: "100 ml",
    variants: [
      { size: "100 ml", price: "₹299/-" },
      { size: "200 ml", price: "₹599/-" },
      { size: "500 ml", price: "₹1,300/-" }
    ],
    claim: "100% Organic",
    description: "BeeZ Premium Infused Hair Oil is carefully handcrafted using the infusion method to retain the natural benefits of each ingredient. The oil nourishes the scalp, strengthens roots, and promotes hair growth.",
    ingredients: [
      "Coconut Oil",
      "Sesame Oil",
      "Castor Oil",
      "Almond Oil",
      "Curry Leaves",
      "Fenugreek",
      "Amla",
      "Hibiscus",
      "Bhringraj",
      "Vetiver"
    ],
    ingredientClaims: {
      "Coconut Oil": "Nourishes and strengthens hair.",
      "Sesame Oil": "Protects from heat and promotes growth.",
      "Castor Oil": "Thickens hair and boosts growth.",
      "Almond Oil": "Moisturizes and prevents breakage.",
      "Curry Leaves": "Reduces hair fall and boosts melanin.",
      "Fenugreek": "Strengthens hair and helps prevent dandruff.",
      "Amla": "Boosts collagen and reduces hair greying.",
      "Hibiscus": "Thickens hair and helps prevent dryness.",
      "Bhringraj": "Enhances hair growth.",
      "Vetiver": "Reduces dandruff and improves hair texture."
    },
    howToUse: [
      "Warm a small amount and apply to scalp and hair.",
      "Massage gently and leave for at least 1 hour or overnight.",
      "Wash with a mild shampoo.",
      "Use 2–3 times a week for best results."
    ],
    benefits: [
      "100% Organic — Handcrafted using traditional botanical infusion",
      "Nourishes scalp, strengthens roots & promotes hair growth",
      "How to Use: Warm small amount, apply to scalp & hair, massage gently, leave 1 hr or overnight, wash with mild shampoo (2–3x/week)",
      "Precaution: For external use only. Patch test recommended | Shelf Life: 6 months",
      "Storage: Store in a cool, dry place away from direct sunlight"
    ],
    precaution: "For external use only. Patch test recommended.",
    shelfLife: "6 months",
    storage: "Store in a cool, dry place away from direct sunlight.",
    contact: {
      whatsapp: "+91 87922 85105",
      email: "bhavajazzventures@gmail.com",
      instagram: "@beez_premium_blends",
      meeshoUrl: "https://www.meesho.com/beez-premium-infused-hair-oil"
    },
    pills: ["COCONUT OIL", "CURRY LEAVES", "AMLA", "BHRINGRAJ"],
    ingredientOrbit: [
      { name: "Coconut Oil", descriptor: "Nourishes & strengthens", img: BOTANICAL_VISUALS.coconut, pos: { top: "10%", left: "8%" } },
      { name: "Curry Leaves", descriptor: "Reduces hair fall", img: BOTANICAL_VISUALS.amla, pos: { top: "10%", right: "8%" } },
      { name: "Amla", descriptor: "Boosts collagen", img: BOTANICAL_VISUALS.amla, pos: { bottom: "14%", left: "8%" } },
      { name: "Bhringraj", descriptor: "Enhances growth", img: BOTANICAL_VISUALS.brahmi, pos: { bottom: "14%", right: "8%" } }
    ],
    images: [
      "assets/products/herbal_hair_1.png",
      "assets/products/herbal_hair_2.png",
      "assets/products/herbal_hair_3.png",
      "assets/products/herbal_hair_4.png"
    ]
  },
  {
    id: 2,
    name: "BeeZ Brightening Face Oil",
    category: "Face Care / Face Oil",
    accent: "#D5A33A",
    accentBg: "rgba(213, 163, 58, 0.08)",
    accentBorder: "rgba(213, 163, 58, 0.25)",
    tagline: "A Radiant Blend of Almonds and Carrots",
    price: "₹349/-",
    size: "30 ml",
    claims: ["100% Natural", "Hand Crafted", "Lightweight", "Non-sticky", "Deeply Nourishing"],
    description: "BeeZ Brightening Face Oil is made with 90% pure almond oil blended with infused oils and premium essential oils for soft, healthy-looking, radiant skin.",
    ingredients: [
      "Almond Oil",
      "Coconut Oil",
      "Carrot",
      "Essential Oils"
    ],
    howToUse: [
      "Apply 2–3 drops on a clean face.",
      "Massage gently."
    ],
    suitableFor: "All skin types",
    precaution: "For external use only. Patch test recommended.",
    shelfLife: "6 months",
    benefits: [
      "100% Natural • Hand Crafted • Lightweight • Non-sticky • Deeply Nourishing",
      "Made with 90% pure almond oil for soft, healthy-looking radiant skin",
      "Suitable For: All skin types",
      "How to Use: Apply 2–3 drops on a clean face and massage gently",
      "Precaution: For external use only. Patch test recommended | Shelf Life: 6 months"
    ],
    pills: ["ALMOND OIL", "COCONUT OIL", "CARROT", "ESSENTIAL OILS"],
    ingredientOrbit: [
      { name: "Almond Oil", descriptor: "90% Pure Almond", img: BOTANICAL_VISUALS.almond, pos: { top: "10%", left: "8%" } },
      { name: "Coconut Oil", descriptor: "Deep Nourishment", img: BOTANICAL_VISUALS.coconut, pos: { top: "10%", right: "8%" } },
      { name: "Carrot", descriptor: "Radiance Infusion", img: BOTANICAL_VISUALS.apricot, pos: { bottom: "14%", left: "8%" } },
      { name: "Essential Oils", descriptor: "Pure Essential Blend", img: BOTANICAL_VISUALS.vitamine, pos: { bottom: "14%", right: "8%" } }
    ],
    images: [
      "assets/products/tea_tree_1.png",
      "assets/products/tea_tree_2.png",
      "assets/products/tea_tree_3.png",
      "assets/products/tea_tree_4.png"
    ]
  },
  {
    id: 3,
    name: "Lavender Face Oil",
    category: "Restorative Facial Serum",
    accent: "#789C91",
    accentBg: "rgba(120, 156, 145, 0.1)",
    accentBorder: "rgba(120, 156, 145, 0.28)",
    tagline: "Soothing nighttime elixir for velvet-soft, replenished skin.",
    price: "DEMO $42.00",
    size: "30ml / 1.0 fl. oz.",
    description: "A comforting blend of French Lavender, Chamomile, and Evening Primrose oils crafted for evening application. Deeply hydrates overnight to leave facial skin supple, smooth, and radiantly calm by morning.",
    ingredients: ["French Lavender", "Wild Chamomile", "Evening Primrose", "Rosehip Seed", "Squalane", "Lavender Flower"],
    benefits: [
      "Deeply locks in moisture during overnight repair",
      "Soothes redness and calms sensitive skin",
      "Improves skin elasticity & velvety texture",
      "Aromatherapeutic scent for relaxing sleep"
    ],
    pills: ["LAVENDER", "CHAMOMILE", "ROSEHIP", "SQUALANE"],
    ingredientOrbit: [
      { name: "Lavender", descriptor: "Soothing Calming", img: BOTANICAL_VISUALS.lavender, pos: { top: "10%", left: "8%" } },
      { name: "Chamomile", descriptor: "Redness Relief", img: BOTANICAL_VISUALS.chamomile, pos: { top: "10%", right: "8%" } },
      { name: "Rosehip", descriptor: "Elasticity Boost", img: BOTANICAL_VISUALS.rosehip, pos: { bottom: "14%", left: "8%" } },
      { name: "Squalane", descriptor: "Moisture Lock", img: BOTANICAL_VISUALS.squalane, pos: { bottom: "14%", right: "8%" } }
    ],
    images: [
      "assets/products/lavender_face_1.png",
      "assets/products/lavender_face_2.png",
      "assets/products/lavender_face_3.png",
      "assets/products/lavender_face_4.png"
    ]
  },
  {
    id: 4,
    name: "Glow Face Oil",
    category: "Radiance & Elasticity",
    accent: "#B86F4A",
    accentBg: "rgba(184, 111, 74, 0.1)",
    accentBorder: "rgba(184, 111, 74, 0.28)",
    tagline: "Infuse your skin with vitamin-rich oils for an effortless dew.",
    price: "DEMO $46.00",
    size: "30ml / 1.0 fl. oz.",
    description: "A golden elixir packed with Rosehip, Sea Buckthorn, and Marula oils. Brightens dull complexions, enhances skin luminosity, and delivers antioxidant defense for a youthful, sun-kissed glow.",
    ingredients: ["Sea Buckthorn", "Rosehip Oil", "Marula Kernel", "Pomegranate Seed", "Apricot Kernel", "Golden Jojoba"],
    benefits: [
      "Delivers an instant healthy, luminous radiance",
      "Packed with Vitamin C & essential fatty acids",
      "Protects skin barrier against oxidative stress",
      "Silky finish that primes beautifully under makeup"
    ],
    pills: ["SEA BUCKTHORN", "ROSEHIP", "MARULA", "APRICOT"],
    ingredientOrbit: [
      { name: "Sea Buckthorn", descriptor: "Vitamin C Radiance", img: BOTANICAL_VISUALS.seabuckthorn, pos: { top: "10%", left: "8%" } },
      { name: "Rosehip", descriptor: "Cell Renewal", img: BOTANICAL_VISUALS.rosehip, pos: { top: "10%", right: "8%" } },
      { name: "Marula", descriptor: "Antioxidant Shield", img: BOTANICAL_VISUALS.marula, pos: { bottom: "14%", left: "8%" } },
      { name: "Apricot", descriptor: "Dewy Silk Finish", img: BOTANICAL_VISUALS.apricot, pos: { bottom: "14%", right: "8%" } }
    ],
    images: [
      "assets/products/herbal_hair_5.png",
      "assets/products/herbal_hair_6.png",
      "assets/products/herbal_hair_7.png",
      "assets/products/herbal_hair_8.png"
    ]
  },
  {
    id: 5,
    name: "Almond Nourishing Oil",
    category: "Multi-Purpose Moisture",
    accent: "#8C789F",
    accentBg: "rgba(140, 120, 159, 0.1)",
    accentBorder: "rgba(140, 120, 159, 0.28)",
    tagline: "Pure golden nourishment for skin, scalp, and cuticles.",
    price: "DEMO $36.00",
    size: "100ml / 3.4 fl. oz.",
    description: "Cold-pressed Sweet Almond oil enriched with Argan and Vitamin E. This rich, multi-use elixir restores softness to dry skin patches, smooths hair ends, and locks in moisture for all-day protection.",
    ingredients: ["Sweet Almond", "Moroccan Argan", "Golden Jojoba", "Sun-Ripened Sunflower", "Tocopherol (Vit E)", "Vanilla Botanical"],
    benefits: [
      "Versatile moisture for hair, face, and body",
      "Softens rough texture & protects dry skin",
      "Rich in natural Vitamin E and Omega-9",
      "Subtle, warm natural nut aroma"
    ],
    pills: ["ALMOND", "ARGAN", "VITAMIN E", "VANILLA"],
    ingredientOrbit: [
      { name: "Sweet Almond", descriptor: "Texture Softening", img: BOTANICAL_VISUALS.almond, pos: { top: "10%", left: "8%" } },
      { name: "Argan Oil", descriptor: "Omega Repair", img: BOTANICAL_VISUALS.argan, pos: { top: "10%", right: "8%" } },
      { name: "Vitamin E", descriptor: "Barrier Shield", img: BOTANICAL_VISUALS.vitamine, pos: { bottom: "14%", left: "8%" } },
      { name: "Vanilla", descriptor: "Warm Aroma", img: BOTANICAL_VISUALS.vanilla, pos: { bottom: "14%", right: "8%" } }
    ],
    images: [
      "assets/products/tea_tree_5.png",
      "assets/products/tea_tree_6.png",
      "assets/products/tea_tree_7.png",
      "assets/products/tea_tree_8.png"
    ]
  },
  {
    id: 6,
    name: "Rose Elixir",
    category: "Luxury Anti-Aging Serum",
    accent: "#B58D72",
    accentBg: "rgba(181, 141, 114, 0.1)",
    accentBorder: "rgba(181, 141, 114, 0.28)",
    tagline: "A delicate floral infusion for timeless, petal-soft skin.",
    price: "DEMO $52.00",
    size: "30ml / 1.0 fl. oz.",
    description: "Distilled from rare Damask Roses, Hibiscus, and Camellia seed oils. Rejuvenates tired skin cells, diminishes fine dehydration lines, and envelopes the senses in a luxurious botanical bouquet.",
    ingredients: ["Damask Rose Petal", "Hibiscus Seed", "Camellia Oleifera", "Squalane", "Plum Kernel", "Rose Quartz Infusion"],
    benefits: [
      "Plumps skin and minimizes fine dryness lines",
      "Rich in botanical antioxidants & polyphenols",
      "Enhances cell renewal for a youthful texture",
      "Sensual natural rose petal aroma"
    ],
    pills: ["DAMASK ROSE", "HIBISCUS", "CAMELLIA", "PLUM KERNEL"],
    ingredientOrbit: [
      { name: "Damask Rose", descriptor: "Petal Softness", img: BOTANICAL_VISUALS.rose, pos: { top: "10%", left: "8%" } },
      { name: "Hibiscus", descriptor: "Natural Plumping", img: BOTANICAL_VISUALS.hibiscus, pos: { top: "10%", right: "8%" } },
      { name: "Camellia", descriptor: "Youthful Glow", img: BOTANICAL_VISUALS.camellia, pos: { bottom: "14%", left: "8%" } },
      { name: "Plum Kernel", descriptor: "Rich Polyphenols", img: BOTANICAL_VISUALS.plum, pos: { bottom: "14%", right: "8%" } }
    ],
    images: [
      "assets/products/lavender_face_1.png",
      "assets/products/lavender_face_2.png",
      "assets/products/lavender_face_3.png",
      "assets/products/lavender_face_4.png"
    ]
  }
];

const DEMO_REVIEWS = [
  {
    id: 1,
    name: "Sophia M.",
    role: "Verified Demo Reviewer",
    product: "BeeZ Premium Infused Hair Oil",
    rating: 5,
    quote: "The Infused Hair Oil completely transformed my scalp ritual. Lightweight, delightfully aromatic, and leaves hair feeling strong and deeply nourished."
  },
  {
    id: 2,
    name: "Elena R.",
    role: "Verified Demo Reviewer",
    product: "Lavender Face Oil",
    rating: 5,
    quote: "Waking up with calm, hydrated skin has become my favorite part of the morning. The lavender aroma feels like a high-end spa treatment."
  },
  {
    id: 3,
    name: "Marcus K.",
    role: "Verified Demo Reviewer",
    product: "Tea Tree Scalp Oil",
    rating: 5,
    quote: "Incredible soothing effect after shampooing. My scalp feels instantly refreshed, balanced, and free from irritation."
  },
  {
    id: 4,
    name: "Aria T.",
    role: "Verified Demo Reviewer",
    product: "Glow Face Oil",
    rating: 5,
    quote: "A few drops give my face an instant luminous dew under makeup. It absorbs so fast and feels impossibly silky."
  }
];

const BOTANICAL_INGREDIENTS_MAP = [
  {
    id: "amla",
    name: "Amla Fruit",
    accent: "#3F4724",
    role: "Hair Strengthening",
    description: "Rich in Vitamin C and phytonutrients to fortify roots and reduce scalp stress."
  },
  {
    id: "rosemary",
    name: "Rosemary Leaf",
    accent: "#5F6330",
    role: "Scalp Circulation",
    description: "Stimulates hair follicles, purifies scalp pores, and boosts natural shine."
  },
  {
    id: "coconut",
    name: "Virgin Coconut",
    accent: "#D5A33A",
    role: "Deep Moisture",
    description: "Contains lauric acid that binds to hair protein, protecting strands from moisture loss."
  },
  {
    id: "hibiscus",
    name: "Hibiscus Flower",
    accent: "#8A8650",
    role: "Rejuvenation",
    description: "Packed with natural amino acids and mucilage to condition and soften texture."
  },
  {
    id: "lavender",
    name: "French Lavender",
    accent: "#E8C77A",
    role: "Calming Elixir",
    description: "Soothes skin inflammation while providing a peaceful aromatherapy experience."
  }
];
