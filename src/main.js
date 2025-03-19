import './style.css';

// Simple router for the SPA using History API
const router = () => {
  // Define routes - adjust paths based on build vs development environment
  const isProduction = import.meta.env.PROD;
  
  const routes = {
    '/': isProduction ? '/pages/home.html' : '/src/pages/home.html',
    '/rooms': isProduction ? '/pages/rooms.html' : '/src/pages/rooms.html',
    '/contact': isProduction ? '/pages/contact.html' : '/src/pages/contact.html',
    // Add more routes as needed
  };

  // Get current path or default to home
  let path = window.location.pathname;
  
  // If path doesn't exist in routes, default to home
  if (!routes[path]) {
    path = '/';
    history.replaceState(null, null, path);
  }

  // Clear previous content and show loading spinner
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  `;

  // Load the content
  fetch(routes[path])
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${routes[path]}`);
      }
      return response.text();
    })
    .then(html => {
      // Fix image paths for production
      if (isProduction) {
        // Replace all src="/src/assets/ with src="/assets/
        html = html.replace(/src="\/src\/assets\//g, 'src="/assets/');
        // Also fix background images in inline styles if any
        html = html.replace(/url\(\/src\/assets\//g, 'url(/assets/');
      }
      app.innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading page:', error);
      app.innerHTML = '<div class="text-center p-10"><h2 class="text-2xl text-red-500">Pagina non trovata</h2></div>';
    });
};

// Initial load
window.addEventListener('DOMContentLoaded', router);

// Handle navigation without page reload
document.addEventListener('click', (e) => {
  // Find closest anchor tag
  const anchor = e.target.closest('a');
  
  // If it's an internal link (starts with /)
  if (anchor && anchor.getAttribute('href') && anchor.getAttribute('href').startsWith('/')) {
    e.preventDefault();
    const href = anchor.getAttribute('href');
    history.pushState(null, null, href);
    router();
  }
});

// Handle back/forward browser buttons
window.addEventListener('popstate', router);

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuButton = document.querySelector('button.md\\:hidden');
  if (mobileMenuButton) {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
      }
    });
  }
});
