// Sticky Header Functionality
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const headerHeight = header.offsetHeight;
    
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Pular para o conteúdo principal';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID to first section after header
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.id = 'main-content';
    }
    
    // Add tagline to logo
    const logoContainer = document.querySelector('.logo-container');
    if (logoContainer) {
        const logoLink = logoContainer.querySelector('.logo');
        const taglineContainer = document.createElement('div');
        taglineContainer.className = 'tagline-container';
        
        // Move the logo into the tagline container
        logoContainer.innerHTML = '';
        taglineContainer.appendChild(logoLink);
        
        // Create and add the tagline
        const logoTagline = document.createElement('div');
        logoTagline.className = 'logo-tagline';
        logoTagline.innerHTML = '<span class="tagline-primary">A elite do Grind Hero</span><span class="tagline-secondary">Dominação, Estratégia, Glória</span>';
        taglineContainer.appendChild(logoTagline);
        
        logoContainer.appendChild(taglineContainer);
    }
    
    // Group navigation items
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        // Create first group (main navigation)
        const mainNavGroup = document.createElement('div');
        mainNavGroup.className = 'nav-group';
        
        // Create second group (utility navigation)
        const utilityNavGroup = document.createElement('div');
        utilityNavGroup.className = 'nav-group';
        
        // Get all navigation items except the login button
        const mainNavItems = Array.from(navLinks.querySelectorAll('li:not(.login-btn)'));
        const loginBtn = navLinks.querySelector('.login-btn');
        
        // Clear the navigation
        navLinks.innerHTML = '';
        
        // Add main navigation items to first group
        mainNavItems.forEach(item => {
            mainNavGroup.appendChild(item);
        });
        
        // Add divider
        const navDivider = document.createElement('div');
        navDivider.className = 'nav-divider';
        
        // Add login button to second group
        if (loginBtn) {
            utilityNavGroup.appendChild(loginBtn);
        }
        
        // Add groups to navigation
        navLinks.appendChild(mainNavGroup);
        navLinks.appendChild(navDivider);
        navLinks.appendChild(utilityNavGroup);
    }
    
    // Enhance CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.classList.add('cta-primary');
    });
    
    // Enhance view more buttons
    const viewMoreButtons = document.querySelectorAll('.view-more-button');
    viewMoreButtons.forEach(button => {
        button.classList.add('btn', 'btn-secondary');
    });
    
    // Enhance cards
    const highlightCards = document.querySelectorAll('.highlight-card');
    highlightCards.forEach(card => {
        card.classList.add('card', 'hover-scale');
    });
    
    const leaderCards = document.querySelectorAll('.leader-card');
    leaderCards.forEach(card => {
        card.classList.add('card', 'hover-scale');
    });
    
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.classList.add('card', 'hover-glow');
    });
    
    // Add alt text to images that don't have it
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
        const parentElement = img.parentElement;
        const nearestHeading = parentElement.querySelector('h1, h2, h3, h4, h5, h6');
        if (nearestHeading) {
            img.alt = nearestHeading.textContent;
        } else {
            img.alt = 'Imagem da guilda RED SKULL';
        }
    });
    
    // Add lazy loading to images
    const contentImages = document.querySelectorAll('img:not(.logo img):not(.skull-loader img)');
    contentImages.forEach(img => {
        img.loading = 'lazy';
    });
    
    // Enhance fury meter with animation
    const furyFill = document.querySelector('.fury-fill');
    if (furyFill) {
        furyFill.classList.add('animated-progress');
    }
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Add micro-interactions to buttons
    const allButtons = document.querySelectorAll('button, .btn, .cta-button, .view-more-button');
    allButtons.forEach(button => {
        // Add pressed state
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Highlight important text
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        const text = p.innerHTML;
        if (text.includes('RED SKULL')) {
            p.innerHTML = text.replace(/RED SKULL/g, '<span class="text-highlight">RED SKULL</span>');
        }
        if (text.includes('guerra, sangue e glória')) {
            p.innerHTML = text.replace(/guerra, sangue e glória/g, '<span class="text-highlight">guerra, sangue e glória</span>');
        }
    });
});
