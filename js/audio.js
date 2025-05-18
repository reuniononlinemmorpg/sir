// Audio JavaScript for RED SKULL Guild Website

document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const backgroundMusic = document.getElementById('background-music');
    const clickSound = document.getElementById('click-sound');
    
    // Audio control button
    const audioControl = document.getElementById('toggle-audio');
    
    // Audio state
    let audioEnabled = false;
    
    // Initialize audio settings
    function initAudio() {
        // Check for user preference in localStorage
        const savedAudioState = localStorage.getItem('audioEnabled');
        
        if (savedAudioState === 'true') {
            enableAudio();
        } else {
            disableAudio();
        }
        
        // Add event listener to audio control button
        if (audioControl) {
            audioControl.addEventListener('click', toggleAudio);
        }
        
        // Add click sound to interactive elements
        addClickSounds();
    }
    
    // Enable audio function
    function enableAudio() {
        audioEnabled = true;
        
        if (backgroundMusic) {
            // Set volume
            backgroundMusic.volume = 0.4;
            
            // Play background music
            const playPromise = backgroundMusic.play();
            
            // Handle autoplay restrictions
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    // Auto-play was prevented
                    // Show UI to let the user manually start playback
                    createPlayButton();
                });
            }
        }
        
        // Update audio control button
        if (audioControl) {
            const audioIcon = audioControl.querySelector('.audio-icon');
            if (audioIcon) {
                audioIcon.classList.remove('audio-off');
                audioIcon.classList.add('audio-on');
            }
        }
        
        // Save preference
        localStorage.setItem('audioEnabled', 'true');
    }
    
    // Disable audio function
    function disableAudio() {
        audioEnabled = false;
        
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
        
        // Update audio control button
        if (audioControl) {
            const audioIcon = audioControl.querySelector('.audio-icon');
            if (audioIcon) {
                audioIcon.classList.remove('audio-on');
                audioIcon.classList.add('audio-off');
            }
        }
        
        // Save preference
        localStorage.setItem('audioEnabled', 'false');
    }
    
    // Toggle audio function
    function toggleAudio() {
        if (audioEnabled) {
            disableAudio();
        } else {
            enableAudio();
        }
    }
    
    // Create play button for browsers with autoplay restrictions
    function createPlayButton() {
        // Only create if it doesn't exist yet
        if (document.getElementById('manual-play-button')) return;
        
        const playButton = document.createElement('div');
        playButton.id = 'manual-play-button';
        playButton.innerHTML = `
            <div class="play-button-inner">
                <h3>Ativar Áudio</h3>
                <p>Clique para ativar a trilha sonora épica</p>
                <button id="start-audio">Iniciar Áudio</button>
            </div>
        `;
        
        // Style the button
        playButton.style.position = 'fixed';
        playButton.style.top = '50%';
        playButton.style.left = '50%';
        playButton.style.transform = 'translate(-50%, -50%)';
        playButton.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
        playButton.style.padding = '2rem';
        playButton.style.borderRadius = '5px';
        playButton.style.border = '2px solid var(--color-red-primary)';
        playButton.style.zIndex = '9999';
        playButton.style.textAlign = 'center';
        playButton.style.boxShadow = '0 0 20px rgba(196, 18, 18, 0.5)';
        
        // Add to body
        document.body.appendChild(playButton);
        
        // Add event listener
        document.getElementById('start-audio').addEventListener('click', function() {
            enableAudio();
            playButton.remove();
        });
    }
    
    // Add click sounds to interactive elements
    function addClickSounds() {
        const interactiveElements = document.querySelectorAll('a, button, .nav-links li, .social-link, .event-join');
        
        interactiveElements.forEach(element => {
            element.addEventListener('click', function() {
                playSound('click');
            });
        });
    }
    
    // Play sound function
    function playSound(type) {
        if (!audioEnabled) return;
        
        switch(type) {
            case 'click':
                if (clickSound) {
                    clickSound.currentTime = 0;
                    clickSound.volume = 0.3;
                    clickSound.play();
                }
                break;
                
            // Add more sound types as needed
            case 'hover':
                // Hover sound implementation
                break;
                
            case 'success':
                // Success sound implementation
                break;
                
            case 'error':
                // Error sound implementation
                break;
        }
    }
    
    // Add drum sound on page load
        function playDrumSound() {
        const drumSound = new Audio('audio/war-drums.mp3');
        drumSound.volume = 0.5;
        
        // Play the sound
        const playPromise = drumSound.play();
        
        // Handle autoplay restrictions
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Auto-play was prevented, we'll rely on user interaction
                console.log('Autoplay prevented for drum sound');
            });
        }
        
        // Fade out after 3 seconds
        setTimeout(() => {
            let volume = 0.5;
            const fadeInterval = setInterval(() => {
                if (volume > 0.1) {
                    volume -= 0.1;
                    drumSound.volume = volume;
                } else {
                    clearInterval(fadeInterval);
                    drumSound.pause();
                }
            }, 200);
        }, 3000);
    }
    
    // Add hover sound effect
    function addHoverSounds() {
        const hoverElements = document.querySelectorAll('.nav-links a, .footer-links a, .social-link');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                playSound('hover');
            });
        });
    }
    
    // Initialize audio on page load
    initAudio();
    
    // Expose functions to global scope for use in other scripts
    window.audioFunctions = {
        playSound: playSound,
        enableAudio: enableAudio,
        disableAudio: disableAudio,
        toggleAudio: toggleAudio
    };
});
