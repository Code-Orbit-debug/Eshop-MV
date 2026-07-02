const products = [
  {
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation.",
    category: "Electronics",
    tags: "headphones",

    originalPrice: 5000,
    discountPrice: 4200,
    stock: 25,

    images: [
      {
        public_id: "headphone_1",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
      }
    ],

    ratings: 4.5,

    shopId: "shop001",

    shop: {
      _id: "shop001",
      name: "Tech Store",
      avatar: {
        public_id: "shop_avatar_1",
        url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
    },

    sold_out: 12
  },

  {
    name: "Smart Watch",
    description: "Fitness smartwatch with health tracking.",
    category: "Electronics",
    tags: "watch",

    originalPrice: 8000,
    discountPrice: 6500,
    stock: 18,

    images: [
      {
        public_id: "watch_1",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
      }
    ],

    ratings: 4.7,

    shopId: "shop001",

    shop: {
      _id: "shop001",
      name: "Tech Store",
      avatar: {
        public_id: "shop_avatar_1",
        url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
    },

    sold_out: 8
  },

  {
    name: "Gaming Mouse",
    description: "RGB gaming mouse with high precision.",
    category: "Accessories",
    tags: "mouse",

    originalPrice: 3000,
    discountPrice: 2500,
    stock: 30,

    images: [
      {
        public_id: "mouse_1",
        url: "https://images.unsplash.com/photo-1527814050087-3793815479db"
      }
    ],

    ratings: 4.3,

    shopId: "shop002",

    shop: {
      _id: "shop002",
      name: "Gaming Hub",
      avatar: {
        public_id: "shop_avatar_2",
        url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
    },

    sold_out: 20
  }
];

module.exports = products;