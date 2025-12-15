# Savory Delights - Restaurant 

A modern, responsive restaurant website built with HTML5, CSS3, and JavaScript.

## Features

- 🏠 **Home Page** - Hero section, about, features, and testimonials
- 📋 **Menu Page** - Complete menu with categories (Appetizers, Main Courses, Desserts, Beverages)
- 🎯 **Services Page** - Restaurant services with elegant animations
- 📞 **Contact & Booking** - Contact form and table booking system

## Technologies Used

- HTML5
- CSS3 (with animations and responsive design)
- JavaScript (form validation and interactivity)
- Google Fonts (Playfair Display & Poppins)

## Deployment

This project is deployed on Vercel.

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd restaurent
   vercel
   ```

   Or deploy to production:
   ```bash
   vercel --prod
   ```

### Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub, GitLab, or Bitbucket
3. Click "New Project"
4. Import your repository
5. Set the root directory to `restaurent` (if needed)
6. Click "Deploy"

## Project Structure

```
restaurent/
├── index.html          # Home page
├── menu.html           # Menu page
├── services.html       # Services page
├── contact.html        # Contact & Booking page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## Local Development

Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2024 Savory Delights. All rights reserved.
