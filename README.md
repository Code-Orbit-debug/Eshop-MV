<div align="center">

# 🛍️ Eshop-MV

### A Multi-Vendor E-Commerce Platform built with the MERN Stack

A full-featured marketplace where independent sellers run their own shops, buyers shop across a unified storefront, and admins oversee the entire platform complete with real-time chat, Stripe payments, and seller analytics.

[![Live Demo](https://img.shields.io/badge/Live-Demo-2E5C8A?style=for-the-badge)](https://eshop-mv.vercel.app/)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-61DAFB?style=for-the-badge&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[Live Demo](https://eshop-mv.vercel.app/) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>


## 📖 Overview

**Eshop-MV** is a multi-vendor e-commerce marketplace where independent sellers can register their own shops, list products, run promotional events, and manage orders while buyers shop across a single unified storefront with cart, wishlist, checkout, and order tracking.

What sets it apart from a typical single seller store is the three-role architecture: **buyers**, **sellers**, and **admins** each get their own permissions, dashboards, and views over a shared product and order pipeline. The codebase is split into three independently deployable services a REST API, a React client, and a standalone real-time service mirroring how production e-commerce platforms are actually structured.


## ✨ Key Features

### 👥 Multi-Role User System
- **Buyer** browse, search, wishlist, cart, checkout, track orders, leave reviews
- **Seller** manage products, events, orders, coupons, and earnings from a dedicated dashboard
- **Admin** oversee all users, sellers, products, events, and withdrawal requests platform-wide

### 🛒 Shopping Experience
- Product listings with image uploads via **Cloudinary**
- Category based search and filtering
- Persistent cart and wishlist (Redux Toolkit)
- Multi-step checkout flow

### 💳 Payments
- **Stripe** integration for card payments
- Cash on Delivery fallback option
- Orders are only created after payment confirmation — no orphaned/unpaid records

### 💬 Real-Time Communication
- Live buyer ↔ seller chat powered by a standalone **Socket.IO** service
- Real-time order notifications pushed to the seller dashboard

### 🏪 Seller Dashboard
- Sales and order tracking
- Coupon and event (flash sale) management
- Withdrawal requests for earnings

### 🛡️ Admin Panel
- Full visibility into users, shops, products, orders, and payouts
- Seller and content moderation tools


## 🏗️ System Architecture

The project is split into **three independently deployable services**:

```
                         ┌─────────────────────────┐
                         │   Client (Browser)       │
                         └────────────┬─────────────┘
                    HTTPS REST        │        WebSocket
              ┌──────────────────┐    │    ┌──────────────────┐
              │ React Frontend   │◄───┴───►│ Socket Server     │
              │ (Vercel)         │         │ (Render)           │
              └────────┬─────────┘         └────────┬───────────┘
                       │ REST API calls              │
                       ▼                              │
              ┌────────────────────────────────────────┘
              │  Express Backend API (Render)
              │  controllers: product · shop · order · user
              │  payment · event · coupounCode · message
              └────────────┬─────────────────────────────
                           ▼
      ┌────────────────────┴────────────────────┐
      │  MongoDB Atlas    Cloudinary    Stripe    │
      │  (data)           (images)      (payments)│
      └────────────────────────────────────────────┘
```

**Why three services?** Serverless platforms like Vercel aren't built to hold persistent WebSocket connections, so the real-time chat/notification layer runs as its own service on a platform that supports long-lived processes, independent of the main API.


## 🧰 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (file uploads)
- Nodemailer (account activation)
- Cloudinary (image storage)
- Stripe (payments)

</td>
<td valign="top" width="50%">

**Frontend**
- React
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios

</td>
</tr>
<tr>
<td valign="top">

**Real-Time**
- Socket.IO (standalone service)

</td>
<td valign="top">

**Deployment**
- Frontend → Vercel
- Backend & Socket service → Render
- Database → MongoDB Atlas

</td>
</tr>
</table>


## 📁 Project Structure

# Project Structure

```
├── backend
│   ├── config
│   ├── controller
│   │   ├── conversation.js
│   │   ├── coupounCode.js
│   │   ├── event.js
│   │   ├── message.js
│   │   ├── order.js
│   │   ├── payment.js
│   │   ├── product.js
│   │   ├── shop.js
│   │   ├── user.js
│   │   └── withdraw.js
│   ├── db
│   │   └── Database.js
│   ├── middleware
│   │   ├── auth.js
│   │   ├── catchAsyncErrors.js
│   │   └── error.js
│   ├── model
│   │   ├── conversation.js
│   │   ├── coupounCode.js
│   │   ├── event.js
│   │   ├── messages.js
│   │   ├── order.js
│   │   ├── product.js
│   │   ├── shop.js
│   │   ├── user.js
│   │   └── withdraw.js
│   ├── seed
│   ├── uploads
│   ├── utils
│   │   ├── ErrorHandler.js
│   │   ├── jwtToken.js
│   │   ├── sendMail.js
│   │   └── shopToken.js
│   ├── app.js
│   ├── multer.js
│   ├── package-lock.json
│   ├── package.json
│   └── server.js
├── frontend
│   ├── build
│   │   ├── static
│   │   │   ├── css
│   │   │   │   ├── main.b392feb7.css
│   │   │   │   └── main.b392feb7.css.map
│   │   │   └── js
│   │   │       ├── 453.03346f77.chunk.js
│   │   │       ├── 453.03346f77.chunk.js.map
│   │   │       ├── main.5cef72e3.js
│   │   │       ├── main.5cef72e3.js.LICENSE.txt
│   │   │       └── main.5cef72e3.js.map
│   │   ├── asset-manifest.json
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── Assests
│   │   │   └── animations
│   │   │       ├── 107043-success.json
│   │   │       └── 24151-ecommerce-animation.json
│   │   ├── Assets
│   │   ├── components
│   │   │   ├── Admin
│   │   │   │   ├── Layout
│   │   │   │   │   └── AdminSideBar.jsx
│   │   │   │   ├── AdminDashboardMain.jsx
│   │   │   │   ├── AllEvents.jsx
│   │   │   │   ├── AllProducts.jsx
│   │   │   │   ├── AllSellers.jsx
│   │   │   │   ├── AllUsers.jsx
│   │   │   │   └── AllWithdraw.jsx
│   │   │   ├── Cart
│   │   │   │   └── Cart.jsx
│   │   │   ├── Checkout
│   │   │   │   ├── Checkout.jsx
│   │   │   │   └── CheckoutSteps.jsx
│   │   │   ├── Events
│   │   │   │   ├── CountDown.jsx
│   │   │   │   ├── EventCard.jsx
│   │   │   │   └── Events.jsx
│   │   │   ├── Layout
│   │   │   │   ├── AdminHeader.jsx
│   │   │   │   ├── DropDown.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Navbar.jsx
│   │   │   ├── Login
│   │   │   │   └── Login.jsx
│   │   │   ├── Payment
│   │   │   │   └── Payment.jsx
│   │   │   ├── Products
│   │   │   │   ├── ProductDetails.jsx
│   │   │   │   ├── Ratings.jsx
│   │   │   │   └── SuggestedProduct.jsx
│   │   │   ├── Profile
│   │   │   │   ├── ProfileContent.jsx
│   │   │   │   ├── ProfileSidebar.jsx
│   │   │   │   └── TrackOrder.jsx
│   │   │   ├── Route
│   │   │   │   ├── BestDeals
│   │   │   │   │   └── BestDeals.jsx
│   │   │   │   ├── Categories
│   │   │   │   │   └── Categories.jsx
│   │   │   │   ├── FeaturedProduct
│   │   │   │   │   └── FeaturedProduct.jsx
│   │   │   │   ├── Hero
│   │   │   │   │   └── Hero.jsx
│   │   │   │   ├── ProductCard
│   │   │   │   │   └── ProductCard.jsx
│   │   │   │   ├── ProductDetailsCard
│   │   │   │   │   └── ProductDetailsCard.jsx
│   │   │   │   └── Sponsored.jsx
│   │   │   ├── Shop
│   │   │   │   ├── Layout
│   │   │   │   │   ├── DashboardHeader.jsx
│   │   │   │   │   └── DashboardSideBar.jsx
│   │   │   │   ├── AllCoupons.jsx
│   │   │   │   ├── AllEvents.jsx
│   │   │   │   ├── AllOrders.jsx
│   │   │   │   ├── AllProducts.jsx
│   │   │   │   ├── AllRefundOrders.jsx
│   │   │   │   ├── CreateEvent.jsx
│   │   │   │   ├── CreateProduct.jsx
│   │   │   │   ├── DashboardHero.jsx
│   │   │   │   ├── DashboardMessages.jsx
│   │   │   │   ├── OrderDetails.jsx
│   │   │   │   ├── ShopCreate.jsx
│   │   │   │   ├── ShopInfo.jsx
│   │   │   │   ├── ShopLogin.jsx
│   │   │   │   ├── ShopProfileData.jsx
│   │   │   │   ├── ShopSettings.jsx
│   │   │   │   └── WithdrawMoney.jsx
│   │   │   ├── Signup
│   │   │   │   └── Signup.jsx
│   │   │   ├── Wishlist
│   │   │   │   └── Wishlist.jsx
│   │   │   └── UserOrderDetails.jsx
│   │   ├── pages
│   │   │   ├── Shop
│   │   │   │   ├── ShopAllCoupouns.jsx
│   │   │   │   ├── ShopAllEvents.jsx
│   │   │   │   ├── ShopAllOrders.jsx
│   │   │   │   ├── ShopAllProducts.jsx
│   │   │   │   ├── ShopAllRefunds.jsx
│   │   │   │   ├── ShopCreateEvents.jsx
│   │   │   │   ├── ShopCreateProduct.jsx
│   │   │   │   ├── ShopDashboardPage.jsx
│   │   │   │   ├── ShopHomePage.jsx
│   │   │   │   ├── ShopInboxPage.jsx
│   │   │   │   ├── ShopOrderDetails.jsx
│   │   │   │   ├── ShopPreviewPage.jsx
│   │   │   │   ├── ShopSettingsPage.jsx
│   │   │   │   └── ShopWithDrawMoneyPage.jsx
│   │   │   ├── ActivationPage.jsx
│   │   │   ├── AdminDashboardEvents.jsx
│   │   │   ├── AdminDashboardOrders.jsx
│   │   │   ├── AdminDashboardPage.jsx
│   │   │   ├── AdminDashboardProducts.jsx
│   │   │   ├── AdminDashboardSellers.jsx
│   │   │   ├── AdminDashboardUsers.jsx
│   │   │   ├── AdminDashboardWithdraw.jsx
│   │   │   ├── BestSellingPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── EventsPage.jsx
│   │   │   ├── FAQPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── OrderDetailsPage.jsx
│   │   │   ├── OrderSuccessPage.jsx
│   │   │   ├── PaymentPage.jsx
│   │   │   ├── ProductDetailsPage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── SellerActivationPage.jsx
│   │   │   ├── ShopCreate.jsx
│   │   │   ├── ShopLoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── TrackOrderPage.jsx
│   │   │   └── UserInbox.jsx
│   │   ├── redux
│   │   │   ├── actions
│   │   │   │   ├── cart.js
│   │   │   │   ├── event.js
│   │   │   │   ├── order.js
│   │   │   │   ├── product.js
│   │   │   │   ├── sellers.js
│   │   │   │   ├── user.js
│   │   │   │   └── wishlist.js
│   │   │   ├── reducers
│   │   │   │   ├── cart.js
│   │   │   │   ├── event.js
│   │   │   │   ├── order.js
│   │   │   │   ├── product.js
│   │   │   │   ├── seller.js
│   │   │   │   ├── user.js
│   │   │   │   └── wishlist.js
│   │   │   └── store.js
│   │   ├── routes
│   │   │   ├── AdminRoutes.js
│   │   │   ├── ProtectedAdminRoute.js
│   │   │   ├── ProtectedRoute.js
│   │   │   ├── Routes.js
│   │   │   ├── SellerProtectedRoute.js
│   │   │   └── ShopRoutes.js
│   │   ├── static
│   │   │   └── data.js
│   │   ├── styles
│   │   │   └── styles.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   ├── server.js
│   │   ├── setupTests.js
│   │   └── ShopRoutes.js
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── yarn.lock
└── socket
    ├── index.js
    ├── package-lock.json
    └── package.json
```


## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account (for image uploads)
- Stripe account (for payments)

### 1. Clone the repository

```bash
git clone https://github.com/codingwithriha/Eshop-MV.git
cd Eshop-MV
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
PORT=8000
DB_URL=your_mongodb_connection_string

JWT_SECRET_KEY=your_jwt_secret
JWT_EXPIRES=7d
ACTIVATION_SECRET=your_activation_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_gmail_app_password

CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

STRIPE_API_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_STRIPE_PUBLISH_KEY=your_stripe_publishable_key
```

```bash
npm start
```

### 4. Socket service setup

```bash
cd socket
npm install
node index.js
```

The app should now be running locally:
- Frontend → `http://localhost:3000`
- Backend API → `http://localhost:8000`


## 🌐 Deployment

| Service | Platform | Notes |
|---|---|---|
| Frontend | [Vercel](https://eshop-mv.vercel.app/) | Set `REACT_APP_BACKEND_URL` to your deployed backend URL |
| Backend API | [Railway](https://eshop-mv-backend.vercel.app/) | Set root directory to `backend`, add all `.env` variables |
| Socket Server | [Railway](https://eshop-mv-socket.up.railway.app) | Set root directory to `socket` |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) | Whitelist Render's IP or allow access from anywhere |

> **Note:** Environment variables do **not** carry over from local development to hosted platforms they must be added manually in each service's dashboard.


## 🗺️ Application Flow

**Buyer:** Sign up → Verify email → Browse products → Add to cart/wishlist → Checkout → Pay (Stripe/COD) → Track order → Leave review

**Seller:** Create shop → Shop activation → Add products/events → Receive order notifications in real time → Update order status → Withdraw earnings

**Admin:** Log in → Manage users, sellers, products & events → Approve withdrawal requests

---

## 🛣️ Roadmap

- [ ] CI/CD pipeline (GitHub Actions) for automated build checks
- [ ] Logging & monitoring integration (e.g. Sentry)
- [ ] Containerization with Docker for local dev parity
- [ ] Unit & integration test coverage


## 📄 License

This project is built for educational purposes, based on the Becodemy Multi-Vendor MERN E-commerce tutorial series, and extended independently for deployment and case-study documentation.

---

<div align="center">

Built with ❤️ by codingwithriha

</div>
