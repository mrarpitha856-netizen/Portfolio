// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Typing Effect
    const texts = [
        "Data Science Student",
        "Aspiring Software Developer",
        "Technology Enthusiast",
        "Lifelong Learner"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;

    function type() {
        if(!typingElement) return;

        const currentText = texts[textIndex];
        
        if(isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? erasingDelay : typingDelay;

        if(!isDeleting && charIndex === currentText.length) {
            typeSpeed = newTextDelay;
            isDeleting = true;
        } else if(isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    setTimeout(type, newTextDelay);

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling & Active Nav Link
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if(item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });

        // Back to top button visibility
        const backToTop = document.getElementById('backToTop');
        if(backToTop) {
            if(window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    // Back to top click
    const backToTop = document.getElementById('backToTop');
    if(backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Set Current Year
    const yearElement = document.getElementById('year');
    if(yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Form Submission (Dummy logic)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate (basic)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const msg = document.getElementById('message').value;

            if(name && email && msg) {
                formStatus.textContent = "Thank you! Your message has been sent successfully. (Mock functionality)";
                formStatus.className = 'form-status success';
                contactForm.reset();
            } else {
                formStatus.textContent = "Please fill in all required fields.";
                formStatus.className = 'form-status error';
            }
        });
    }

    // Chat Bot (Dummy logic)
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    function addMessage(text, sender) {
        if(!chatMessages) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    if(sendBtn && chatInput) {
        sendBtn.addEventListener('click', () => {
            const text = chatInput.value.trim();
            if(text) {
                addMessage(text, 'user');
                chatInput.value = '';
                
                // Simulate bot response
                setTimeout(() => {
                    addMessage("Thanks for your message! This is a mock AI assistant. Please use the contact form to reach me directly.", 'bot');
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if(e.key === 'Enter') {
                sendBtn.click();
            }
        });
    }

    // Filtering logic (Placeholder for Certifications)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const certCards = document.querySelectorAll('.cert-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            certCards.forEach(card => {
                if(filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});
