# Smart Deals Client

A modern React-based marketplace application for buying and selling used products. Built with React, React Router, Firebase Authentication, and Tailwind CSS.

## 🚀 Features

- **User Authentication** - Secure login/register with Firebase
- **Product Marketplace** - Browse and search products
- **Bidding System** - Place bids on products
- **User Dashboard** - Manage your products and bids
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Real-time Updates** - Dynamic product listings
- **Protected Routes** - Secure user-specific pages

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nozibuddowla/smart-deals-client
   cd smart-deals-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

   # API Configuration (Development)
   VITE_API_URL=http://localhost:5000
   ```

4. **Create `.env.production` for deployment**
   ```env
   # Firebase Configuration (same as .env)
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

   # API Configuration (Production)
   VITE_API_URL=https://your-backend-api.onrender.com
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Lint Code
```bash
npm run lint
```

## 📁 Project Structure

```
smart-deals-client/
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images, logos
│   ├── components/           # React components
│   │   ├── AllProducts/     # All products page
│   │   ├── CreateProduct/   # Create product form
│   │   ├── Footer/          # Footer component
│   │   ├── Hero/            # Hero section
│   │   ├── Home/            # Home page
│   │   ├── Login/           # Login page
│   │   ├── MyBids/          # User bids dashboard
│   │   ├── MyProducts/      # User products dashboard
│   │   ├── Navbar/          # Navigation bar
│   │   ├── ProductCard/     # Product card component
│   │   ├── ProductDetails/  # Product detail page
│   │   ├── RecentProducts/  # Recent products section
│   │   ├── Register/        # Registration page
│   │   └── SkeletonLoader/  # Loading skeleton
│   ├── context/             # React Context
│   │   ├── AuthContext.jsx # Auth context
│   │   └── AuthProvider.jsx # Auth provider
│   ├── firebase/            # Firebase config
│   │   └── firebase.config.js
│   ├── layouts/             # Layout components
│   │   └── RootLayout.jsx  # Main layout
│   ├── Routes/              # Routing configuration
│   │   ├── PrivateRoute.jsx # Protected routes
│   │   └── Router.jsx      # Route definitions
│   ├── App.css             # App styles
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── .env                     # Environment variables (dev)
├── .env.production         # Environment variables (prod)
├── .gitignore              # Git ignore file
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies
├── postcss.config.js       # PostCSS config
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🎨 Tech Stack

### Core
- **React 19** - UI library
- **React Router 7** - Client-side routing
- **Vite 7** - Build tool and dev server

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **DaisyUI 5** - Tailwind component library
- **Framer Motion 12** - Animation library

### Authentication
- **Firebase 12** - Authentication and user management

### UI Components
- **React Icons 5** - Icon library
- **React Spinners** - Loading indicators
- **React Toastify** - Toast notifications
- **SweetAlert2** - Beautiful alerts/modals

## 🔐 Authentication

The app uses Firebase Authentication with:
- Email/Password authentication
- Google Sign-In
- Protected routes with `PrivateRoute` component
- Persistent authentication state

## 📱 Pages & Routes

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/` | Home | No | Landing page with recent products |
| `/all-products` | AllProducts | No | Browse all products |
| `/productDetails/:id` | ProductDetails | Yes | View product details and place bids |
| `/myProducts` | MyProducts | Yes | Manage your products |
| `/myBids` | MyBids | Yes | View and manage your bids |
| `/createProduct` | CreateProduct | Yes | Create new product listing |
| `/login` | Login | No | Login page |
| `/register` | Register | No | Registration page |

```

## 📦 Build Output

After running `npm run build`, the optimized production files will be in the `dist/` directory:

```
dist/
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [images]
└── index.html
```

## 🐛 Troubleshooting

### Issue: "Failed to fetch" errors
**Solution:** Make sure your backend server is running and `VITE_API_URL` is correct.

### Issue: Firebase authentication not working
**Solution:** 
1. Check Firebase credentials in `.env`
2. Verify authorized domains in Firebase Console
3. Ensure Firebase Authentication is enabled

### Issue: Build fails
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Issue: Hot reload not working
**Solution:** Restart the dev server: `npm run dev`

## 🔄 API Integration

The app communicates with the backend API for:
- Product CRUD operations
- Bid management
- User authentication
- Data fetching with loaders

All API calls include error handling and loading states.

## 🎉 Acknowledgments

- React team for amazing library
- Tailwind CSS for utility-first styling
- Firebase for authentication
- Vite for blazing fast builds
- DaisyUI for beautiful components

---

**Live Demo:** [https://smart-deals-nozib.netlify.app/](https://smart-deals-nozib.netlify.app/)
**Live Demo:** [https://smart-deals-d7718.web.app/](https://smart-deals-d7718.web.app/)

**Backend Repository:** [https://github.com/nozibuddowla/smart-deals-server](https://github.com/nozibuddowla/smart-deals-server)