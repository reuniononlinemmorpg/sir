// Animations JavaScript for RED SKULL Guild Website

document.addEventListener('DOMContentLoaded', function() {
    // Flame animations for elements with flame-effect class
    const flameElements = document.querySelectorAll('.flame-effect');
    
    flameElements.forEach(element => {
        setInterval(() => {
            const intensity = Math.random() * 10 + 5;
            element.style.filter = `drop-shadow(0 0 ${intensity}px var(--color-red-primary))`;
        }, 150);
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrollPosition * speed);
            element.style.backgroundPosition = `center ${yPos}px`;
        });
    });

    // Blood drip animation
    const bloodDripElements = document.querySelectorAll('.blood-drip');
    
    bloodDripElements.forEach(element => {
        setInterval(() => {
            const drip = document.createElement('div');
            drip.classList.add('blood-drop');
            
            // Random position
            const posX = Math.random() * element.offsetWidth;
            drip.style.left = `${posX}px`;
            
            // Random size
            const size = Math.random() * 5 + 3;
            drip.style.width = `${size}px`;
            drip.style.height = `${size * 2}px`;
            
            // Random speed
            const duration = Math.random() * 3 + 2;
            drip.style.animationDuration = `${duration}s`;
            
            element.appendChild(drip);
            
            // Remove after animation completes
            setTimeout(() => {
                drip.remove();
            }, duration * 1000);
        }, 2000);
    });

    // Smoke effect animation
    const smokeElements = document.querySelectorAll('.smoke-effect');
    
    smokeElements.forEach(element => {
        setInterval(() => {
            const smoke = document.createElement('div');
            smoke.classList.add('smoke-particle');
            
            // Random position
            const posX = Math.random() * element.offsetWidth;
            smoke.style.left = `${posX}px`;
            
            // Random size
            const size = Math.random() * 30 + 20;
            smoke.style.width = `${size}px`;
            smoke.style.height = `${size}px`;
            
            // Random opacity
            const opacity = Math.random() * 0.3 + 0.1;
            smoke.style.opacity = opacity;
            
            // Random speed
            const duration = Math.random() * 4 + 3;
            smoke.style.animationDuration = `${duration}s`;
            
            element.appendChild(smoke);
            
            // Remove after animation completes
            setTimeout(() => {
                smoke.remove();
            }, duration * 1000);
        }, 1000);
    });

    // Sword slash effect for buttons
    const slashButtons = document.querySelectorAll('.cta-button, .view-more-button, .discord-button, .donate-button, .event-join');
    
    slashButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('sword-slash');
            
            // Remove class after animation completes
            setTimeout(() => {
                this.classList.remove('sword-slash');
            }, 2000);
        });
    });

    // Glitch text effect
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        const originalText = element.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        element.addEventListener('mouseenter', function() {
            let iterations = 0;
            
            const interval = setInterval(() => {
                element.textContent = element.textContent
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    element.textContent = originalText;
                }
                
                iterations += 1 / 3;
            }, 30);
        });
    });

    // Floating animation for specific elements
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach(element => {
        // Random starting position
        const startDelay = Math.random() * 2;
        element.style.animationDelay = `${startDelay}s`;
    });

    // Fire particles effect
    const fireElements = document.querySelectorAll('.fire-effect');
    
    fireElements.forEach(element => {
        // Create fire container
        const fireContainer = document.createElement('div');
        fireContainer.classList.add('fire-container');
        element.appendChild(fireContainer);
        
        // Generate particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('fire-particle');
            
            // Random properties
            const size = Math.random() * 15 + 5;
            const posX = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 2 + 1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            fireContainer.appendChild(particle);
        }
    });

    // Heartbeat effect for important elements
    const heartbeatElements = document.querySelectorAll('.heartbeat');
    
    heartbeatElements.forEach(element => {
        // Random starting position
        const startDelay = Math.random() * 1.5;
        element.style.animationDelay = `${startDelay}s`;
    });

    // Shake effect on click for specific elements
    const shakeElements = document.querySelectorAll('.shake-on-click');
    
    shakeElements.forEach(element => {
        element.addEventListener('click', function() {
            this.classList.add('shake');
            
            // Remove class after animation completes
            setTimeout(() => {
                this.classList.remove('shake');
            }, 500);
        });
    });

    // Initialize scroll reveal animations
    initScrollReveal();

    // Scroll reveal function
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        function checkReveal() {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', checkReveal);
        window.addEventListener('load', checkReveal);
        
        // Initial check
        checkReveal();
    }

    // War mode transition effects
    const warModeToggle = document.getElementById('toggle-war-mode');
    
    if (warModeToggle) {
        warModeToggle.addEventListener('click', function() {
            // Add transition overlay
            const overlay = document.createElement('div');
            overlay.classList.add('war-mode-transition');
            document.body.appendChild(overlay);
            
            // Remove overlay after transition
            setTimeout(() => {
                overlay.remove();
            }, 1000);
        });
    }

    // Ember particles for fire elements
    createEmbers();

    function createEmbers() {
        const emberContainers = document.querySelectorAll('.ember-container');
        
        emberContainers.forEach(container => {
            for (let i = 0; i < 20; i++) {
                const ember = document.createElement('div');
                ember.classList.add('ember');
                
                // Random properties
                const size = Math.random() * 6 + 2;
                const posX = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = Math.random() * 3 + 2;
                
                ember.style.width = `${size}px`;
                ember.style.height = `${size}px`;
                ember.style.left = `${posX}%`;
                ember.style.animationDelay = `${delay}s`;
                ember.style.animationDuration = `${duration}s`;
                
                container.appendChild(ember);
            }
        });
    }

    // Add typing animation to specific elements
    const typingElements = document.querySelectorAll('.typing');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    });

    // Add 3D tilt effect to cards
    const tiltCards = document.querySelectorAll('.tilt-effect');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = this.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;
            
            const rotateX = (mouseY / (cardRect.height / 2)) * -10;
            const rotateY = (mouseX / (cardRect.width / 2)) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});
