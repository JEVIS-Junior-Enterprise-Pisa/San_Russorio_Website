import './style.css';

// Simple router for the SPA using History API instead of hash
const router = () => {
  const routes = {
    '/': '/src/pages/home.html',
    '/rooms': '/src/pages/rooms.html',
    '/contact': '/src/pages/contact.html',
    // Add more routes as needed
  };

  // Get current path or default to home
  let path = window.location.pathname;
  
  // If we're at the root with no path, default to home
  if (path === '/') {
    path = '/';
  }
  
  // If path doesn't exist in routes, default to home
  if (!routes[path]) {
    path = '/';
    history.replaceState(null, null, path);
  }

  // Load the content
  fetch(routes[path])
    .then(response => response.text())
    .then(html => {
      document.getElementById('app').innerHTML = html;
    })
    .catch(error => {
      console.error('Error loading page:', error);
      document.getElementById('app').innerHTML = '<p>Error loading page. Please try again.</p>';
    });
};

// Initial load
window.addEventListener('DOMContentLoaded', router);

// Handle navigation without page reload
document.addEventListener('click', (e) => {
  // Find closest anchor tag
  const anchor = e.target.closest('a');
  
  // If it's an internal link (starts with /)
  if (anchor && anchor.getAttribute('href').startsWith('/')) {
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
    mobileMenuButton.addEventListener('click', () => {
      // Implementation for mobile menu toggle
      alert('Mobile menu functionality will be implemented here');
    });
  }
});

console.log('San Russorio B&B website loaded');

