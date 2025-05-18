// Fixed mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add menu overlay to body
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
    
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', function() {
        body.classList.remove('menu-open');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            body.classList.remove('menu-open');
        });
    });
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Detect swipe direction
    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, false);
    
    document.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const isMenuOpen = body.classList.contains('menu-open');
        const swipeThreshold = 100; // Minimum distance for swipe
        
        // Swipe right to close menu
        if (isMenuOpen && touchEndX - touchStartX > swipeThreshold) {
            body.classList.remove('menu-open');
        }
        
        // Swipe left to open menu
        if (!isMenuOpen && touchStartX - touchEndX > swipeThreshold) {
            body.classList.add('menu-open');
        }
    }
    
    // Ensure menu is closed when page loads
    body.classList.remove('menu-open');
});
