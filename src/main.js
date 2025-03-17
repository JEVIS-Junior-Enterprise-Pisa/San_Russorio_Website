import './style.css'

const router = () => {
  const path = window.location.hash.slice(1) || '/';
  
  const routes = {
    '/': '/src/pages/home.html',
    '/about': '/src/pages/about.html',
    '/contact': '/src/pages/contact.html',
  };
  
  const contentDiv = document.getElementById('content');
  
  if (routes[path]) {
    fetch(routes[path])
      .then(response => response.text())
      .then(html => {
        contentDiv.innerHTML = html;
      })
      .catch(error => {
        console.error('Error loading page:', error);
        contentDiv.innerHTML = '<p>Pagina non trovata</p>';
      });
  } else {
    contentDiv.innerHTML = '<p>Pagina non trovata</p>';
  }
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

