export type ProductTone = "sky" | "violet" | "emerald" | "amber" | "rose" | "slate"

export interface Product {
  id: string
  name: string
  category: string
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  description: string
  features: string[]
  emoji: string
  tone: ProductTone
  stock: number
  isNew?: boolean
  isBestSeller?: boolean
}

export const CATEGORIES: string[] = [
  "Electronics",
  "Audio",
  "Wearables",
  "Accessories",
  "Gaming",
  "Home Office"
]

export const PRODUCTS: Product[] = [
  {
    id: "aurora-headphones",
    name: "Aurora Wireless Headphones",
    category: "Audio",
    price: 129,
    compareAtPrice: 159,
    rating: 4.8,
    reviewCount: 1284,
    description: "Over-ear wireless headphones with active noise cancellation, 40-hour battery life, and studio-grade sound.",
    features: ["Active noise cancellation", "40-hour battery", "Bluetooth 5.3", "Multipoint pairing"],
    emoji: "🎧",
    tone: "sky",
    stock: 24,
    isBestSeller: true
  },
  {
    id: "pulse-smartwatch",
    name: "Pulse Smartwatch",
    category: "Wearables",
    price: 199,
    compareAtPrice: 249,
    rating: 4.6,
    reviewCount: 932,
    description: "A sleek smartwatch with heart-rate tracking, GPS, and a week-long battery.",
    features: ["Heart-rate monitor", "Built-in GPS", "7-day battery", "5 ATM water resistance"],
    emoji: "⌚",
    tone: "violet",
    stock: 18,
    isBestSeller: true
  },
  {
    id: "lumen-4k-camera",
    name: "Lumen 4K Camera",
    category: "Electronics",
    price: 349,
    rating: 4.7,
    reviewCount: 458,
    description: "Compact mirrorless camera that shoots stunning 4K video and 24MP stills.",
    features: ["4K/60fps video", "24MP sensor", "Image stabilization", "Flip touchscreen"],
    emoji: "📷",
    tone: "emerald",
    stock: 9,
    isNew: true
  },
  {
    id: "vertex-keyboard",
    name: "Vertex Mechanical Keyboard",
    category: "Accessories",
    price: 89,
    compareAtPrice: 109,
    rating: 4.5,
    reviewCount: 2107,
    description: "Hot-swappable mechanical keyboard with tactile switches and per-key RGB.",
    features: ["Hot-swappable switches", "Per-key RGB", "Aluminum frame", "USB-C"],
    emoji: "⌨️",
    tone: "amber",
    stock: 42
  },
  {
    id: "orbit-gaming-mouse",
    name: "Orbit Gaming Mouse",
    category: "Gaming",
    price: 59,
    rating: 4.4,
    reviewCount: 1745,
    description: "Ultra-light gaming mouse with a 26K DPI sensor and low-latency wireless.",
    features: ["26K DPI sensor", "59g weight", "90-hour battery", "6 programmable buttons"],
    emoji: "🖱️",
    tone: "rose",
    stock: 37,
    isBestSeller: true
  },
  {
    id: "nimbus-speaker",
    name: "Nimbus Bluetooth Speaker",
    category: "Audio",
    price: 79,
    compareAtPrice: 99,
    rating: 4.3,
    reviewCount: 861,
    description: "Portable speaker with 360° sound and 24 hours of playtime.",
    features: ["360° sound", "24-hour playtime", "IPX7 waterproof", "Pair two for stereo"],
    emoji: "🔊",
    tone: "slate",
    stock: 31
  },
  {
    id: "echo-earbuds-pro",
    name: "Echo Earbuds Pro",
    category: "Audio",
    price: 99,
    rating: 4.6,
    reviewCount: 2204,
    description: "True wireless earbuds with adaptive ANC and a pocketable charging case.",
    features: ["Adaptive ANC", "32-hour total battery", "Wireless charging", "IPX5"],
    emoji: "🎵",
    tone: "sky",
    stock: 55,
    isNew: true
  },
  {
    id: "titanium-laptop-stand",
    name: "Titanium Laptop Stand",
    category: "Home Office",
    price: 45,
    rating: 4.2,
    reviewCount: 512,
    description: "Adjustable aluminum stand that lifts your laptop to a comfortable viewing angle.",
    features: ["Adjustable height", "Aluminum build", "Folds flat", "Supports up to 17\""],
    emoji: "💻",
    tone: "violet",
    stock: 60
  },
  {
    id: "nova-desk-lamp",
    name: "Nova Desk Lamp",
    category: "Home Office",
    price: 39,
    compareAtPrice: 49,
    rating: 4.1,
    reviewCount: 389,
    description: "Eye-care LED desk lamp with adjustable color temperature and brightness.",
    features: ["5 color temperatures", "Touch dimming", "USB charging port", "Memory function"],
    emoji: "💡",
    tone: "emerald",
    stock: 26
  },
  {
    id: "aero-drone-mini",
    name: "Aero Drone Mini",
    category: "Electronics",
    price: 249,
    rating: 4.5,
    reviewCount: 623,
    description: "Foldable mini drone with 4K camera and 30-minute flight time.",
    features: ["4K camera", "30-minute flight", "GPS return-to-home", "Under 250g"],
    emoji: "🛸",
    tone: "amber",
    stock: 12,
    isNew: true
  },
  {
    id: "flux-thermostat",
    name: "Flux Smart Thermostat",
    category: "Electronics",
    price: 129,
    compareAtPrice: 149,
    rating: 4.4,
    reviewCount: 704,
    description: "Smart thermostat that learns your schedule and saves energy automatically.",
    features: ["Self-learning", "Remote control", "Energy reports", "Voice assistant support"],
    emoji: "🌡️",
    tone: "rose",
    stock: 21
  },
  {
    id: "pixel-portable-monitor",
    name: "Pixel Portable Monitor",
    category: "Electronics",
    price: 219,
    rating: 4.3,
    reviewCount: 298,
    description: "15.6-inch portable monitor with a bright IPS panel and single-cable USB-C.",
    features: ["1080p IPS panel", "USB-C single cable", "Built-in speakers", "Smart cover stand"],
    emoji: "🖥️",
    tone: "slate",
    stock: 15,
    isNew: true
  },
  {
    id: "ridge-phone-case",
    name: "Ridge Phone Case",
    category: "Accessories",
    price: 29,
    rating: 4.0,
    reviewCount: 1543,
    description: "Slim protective case with raised edges and a grippy textured finish.",
    features: ["Military-grade drop protection", "Slim profile", "Textured grip", "Wireless-charging compatible"],
    emoji: "📱",
    tone: "sky",
    stock: 80
  },
  {
    id: "summit-backpack",
    name: "Summit Backpack",
    category: "Accessories",
    price: 119,
    compareAtPrice: 139,
    rating: 4.7,
    reviewCount: 967,
    description: "Weather-resistant commuter backpack with a dedicated laptop compartment.",
    features: ["Weather-resistant", "16\" laptop compartment", "Anti-theft pocket", "USB pass-through"],
    emoji: "🎒",
    tone: "violet",
    stock: 33,
    isBestSeller: true
  },
  {
    id: "quest-vr-headset",
    name: "Quest VR Headset",
    category: "Gaming",
    price: 399,
    rating: 4.6,
    reviewCount: 1118,
    description: "Standalone VR headset with inside-out tracking and a rich game library.",
    features: ["Standalone VR", "6DoF tracking", "128GB storage", "Touch controllers"],
    emoji: "🥽",
    tone: "emerald",
    stock: 14
  },
  {
    id: "bolt-charging-dock",
    name: "Bolt Charging Dock",
    category: "Accessories",
    price: 49,
    compareAtPrice: 59,
    rating: 4.2,
    reviewCount: 689,
    description: "3-in-1 charging dock for phone, watch, and earbuds with fast charging.",
    features: ["3-in-1 charging", "18W fast charge", "Anti-slip base", "Compact design"],
    emoji: "🔌",
    tone: "amber",
    stock: 47
  }
]
