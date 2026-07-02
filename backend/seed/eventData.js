const events = [
  {
    name: "Summer Sale Headphones",
    description: "Limited-time wireless headphones sale.",
    category: "Electronics",

    start_Date: new Date(),
    Finish_Date: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),

    status: "Running",

    tags: "headphones",

    originalPrice: 5000,
    discountPrice: 3500,
    stock: 20,

    images: [
      {
        public_id: "event_headphone",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
      }
    ],

    shopId: "shop001",

    shop: {
      _id: "shop001",
      name: "Tech Store",
      avatar: {
        public_id: "shop_avatar_1",
        url: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      }
    },

    sold_out: 6
  },

  {
    name: "Smart Watch Flash Deal",
    description: "Special smartwatch discount event.",
    category: "Electronics",

    start_Date: new Date(),
    Finish_Date: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ),

    status: "Running",

    tags: "watch",

    originalPrice: 7000,
    discountPrice: 5200,
    stock: 15,

    images: [
      {
        public_id: "event_watch",
        url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
      }
    ],

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
  }
];

module.exports = events;