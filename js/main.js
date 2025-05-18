// Main JavaScript for RED SKULL Guild Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove preload class to allow animations
    setTimeout(function() {
        document.body.classList.remove('preload');
    }, 500);

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(function() {
                preloader.style.display = 'none';
            }, 1000);
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.body.classList.toggle('menu-open');
            playSound('click-sound');
        });
    }

    // Audio Control
    const audioControl = document.getElementById('toggle-audio');
    const backgroundMusic = document.getElementById('background-music');
    let audioEnabled = false;

    if (audioControl && backgroundMusic) {
        audioControl.addEventListener('click', function() {
            if (audioEnabled) {
                backgroundMusic.pause();
                audioControl.querySelector('.audio-icon').classList.remove('audio-on');
                audioControl.querySelector('.audio-icon').classList.add('audio-off');
            } else {
                backgroundMusic.play();
                audioControl.querySelector('.audio-icon').classList.remove('audio-off');
                audioControl.querySelector('.audio-icon').classList.add('audio-on');
            }
            audioEnabled = !audioEnabled;
        });
    }

    // War Mode Toggle
    const warModeToggle = document.getElementById('toggle-war-mode');
    if (warModeToggle) {
        warModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('war-mode');
            playSound('click-sound');
        });
    }

    // Play Sound Function
    function playSound(soundId) {
        if (audioEnabled) {
            const sound = document.getElementById(soundId);
            if (sound) {
                sound.currentTime = 0;
                sound.play();
            }
        }
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const staggerElements = document.querySelectorAll('.stagger-reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });

        staggerElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);

    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonials-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevSlide = document.querySelector('.prev-slide');
    const nextSlide = document.querySelector('.next-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (testimonialSlider && testimonialCards.length > 0) {
        // Hide all slides except the first one
        for (let i = 1; i < testimonialCards.length; i++) {
            testimonialCards[i].style.display = 'none';
        }

        // Previous slide button
        if (prevSlide) {
            prevSlide.addEventListener('click', function() {
                showSlide(currentSlide - 1);
                playSound('click-sound');
            });
        }

        // Next slide button
        if (nextSlide) {
            nextSlide.addEventListener('click', function() {
                showSlide(currentSlide + 1);
                playSound('click-sound');
            });
        }

        // Dot navigation
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showSlide(index);
                    playSound('click-sound');
                });
            });
        }

        // Show slide function
        function showSlide(n) {
            // Hide current slide
            testimonialCards[currentSlide].style.display = 'none';
            dots[currentSlide].classList.remove('active');

            // Calculate new slide index
            currentSlide = (n + testimonialCards.length) % testimonialCards.length;

            // Show new slide
            testimonialCards[currentSlide].style.display = 'block';
            dots[currentSlide].classList.add('active');
        }

        // Auto slide change
        setInterval(function() {
            showSlide(currentSlide + 1);
        }, 8000);
    }

    // Easter Egg (3 clicks on skull logo)
    const logo = document.querySelector('.logo img');
    const easterEgg = document.getElementById('easter-egg');
    const closeEasterEgg = document.getElementById('close-easter-egg');
    let clickCount = 0;

    if (logo && easterEgg) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            clickCount++;
            
            if (clickCount === 3) {
                easterEgg.classList.add('visible');
                playSound('click-sound');
                clickCount = 0;
            }
        });

        if (closeEasterEgg) {
            closeEasterEgg.addEventListener('click', function() {
                easterEgg.classList.remove('visible');
                playSound('click-sound');
            });
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                    playSound('click-sound');
                }
            }
        });
    });

    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const scrollPosition = window.pageYOffset;
            const speed = element.dataset.speed || 0.5;
            element.style.backgroundPositionY = `${scrollPosition * speed}px`;
        });
    }

    window.addEventListener('scroll', updateParallax);

    // Progress bar animation
    const progressFill = document.querySelector('.progress-fill');
    const furyFill = document.querySelector('.fury-fill');
    
    if (progressFill) {
        // Animate progress bar on page load
        setTimeout(function() {
            progressFill.style.width = '25%'; // Set to initial value (1 of 4 steps)
        }, 1000);
    }
    
    if (furyFill) {
        // Animate fury meter on page load
        setTimeout(function() {
            furyFill.style.width = '78%'; // Set to initial value
        }, 1000);
    }

    // Event join buttons
    const eventJoinButtons = document.querySelectorAll('.event-join');
    
    if (eventJoinButtons.length > 0) {
        eventJoinButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.textContent = 'Confirmado!';
                this.classList.add('confirmed');
                this.disabled = true;
                playSound('click-sound');
            });
        });
    }

    // Add flame effect to navigation on hover
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.classList.add('flame-effect');
            });
            
            link.addEventListener('mouseleave', function() {
                this.classList.remove('flame-effect');
            });
        });
    }

    // Scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('#initiation');
            if (nextSection) {
                nextSection.scrollIntoView({
                    behavior: 'smooth'
                });
                playSound('click-sound');
            }
        });
        
        // Hide scroll indicator when scrolled
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }

    // Header scroll effect
    const header = document.getElementById('main-header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Initialize mission progress
    initMissionProgress();

    // Check for completed mission steps
    function initMissionProgress() {
        const missionSteps = document.querySelectorAll('.mission-steps li');
        const progressSteps = document.querySelectorAll('.progress-steps .step');
        
        // Check if user has visited the site before
        if (localStorage.getItem('visited') === 'true') {
            // Mark first step as completed
            if (missionSteps.length > 0 && progressSteps.length > 0) {
                missionSteps[0].classList.add('completed');
                progressSteps[0].classList.add('completed');
            }
        }
        
        // Set visited flag
        localStorage.setItem('visited', 'true');
    }
});
