// Load translations and initialize page
document.addEventListener('DOMContentLoaded', () => {
    fetch('assets/json/translations.json')
        .then(response => response.json())
        .then(translations => {
            window.translations = translations;
            setLanguage('de'); // Default language
            initSlider();
            loadFeaturedProducts();
            loadProducts();
            initContactForm();
        })
        .catch(error => console.error('Error loading translations:', error));

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Language selector
    const langDropdown = document.querySelector('.language-dropdown');
    langDropdown.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        langDropdown.classList.toggle('active'); // Toggle dropdown visibility
        if (li) {
            const lang = li.dataset.lang;
            setLanguage(lang);
            const flagSrc = li.querySelector('img').src;
            document.querySelector('.current-lang img').src = flagSrc;
            document.querySelector('.current-lang img').dataset.lang = lang;
            langDropdown.classList.remove('active'); // Close dropdown after selection
        }
    });

    // Update current year in footer
    const currentYearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });
});

// Set language and update content
function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
    window.currentLang = lang; // Store current language globally

    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.dataset.key;
        element.textContent = window.translations[lang][key] || element.textContent; // Fallback to current text if key missing
    });

    // Reload products to reflect language change
    loadFeaturedProducts();
    loadProducts();
}

// Hero slider functionality
function initSlider() {
    const slides = document.querySelectorAll('.slider img');
    if (!slides.length) {
        console.log('No slider images found');
        return; // Skip if not on homepage or images missing
    }
    let current = 0;

    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0'; // Ensure fade-out
        });
        slides[index].classList.add('active');
        slides[index].style.opacity = '1'; // Ensure fade-in
        console.log(`Showing slide ${index}`); // Debug log
    }

    // Ensure buttons are found within the slider
    const prevButton = document.querySelector('.slider .prev');
    const nextButton = document.querySelector('.slider .next');

    if (prevButton && nextButton) {
        console.log('Prev and Next buttons detected'); // Debug log
        prevButton.addEventListener('click', () => {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
        });

        nextButton.addEventListener('click', () => {
            current = (current + 1) % slides.length;
            showSlide(current);
        });
    } else {
        console.log('Prev or Next button not found'); // Debug log
    }

    // Autoplay with image load check
    const startAutoplay = () => {
        setInterval(() => {
            current = (current + 1) % slides.length;
            showSlide(current);
        }, 5000);
    };
    const allLoaded = Array.from(slides).every(slide => slide.complete);
    if (allLoaded) {
        console.log('All slides loaded, starting autoplay'); // Debug log
        showSlide(current); // Initial display
        startAutoplay();
    } else {
        slides.forEach(slide => {
            slide.addEventListener('load', () => {
                console.log('Slide loaded, checking all'); // Debug log
                if (Array.from(slides).every(s => s.complete)) {
                    console.log('All slides loaded after event, starting autoplay'); // Debug log
                    showSlide(current); // Initial display
                    startAutoplay();
                }
            });
            slide.addEventListener('error', () => {
                console.error(`Failed to load slide image: ${slide.src}`); // Debug log
            });
        });
    }
}

// Load featured products (Homepage)
function loadFeaturedProducts() {
    const grid = document.getElementById('featured-products');
    if (!grid) return; // Skip if not on homepage

    fetch('assets/json/products.json')
        .then(response => response.json())
        .then(products => {
            const lang = document.documentElement.lang;

            // Filter only products marked as "featured: true"
            const featuredProducts = products.filter(p => p.featured);

            grid.innerHTML = featuredProducts.map(product => `
                <div class="product">
                    <img src="assets/img/${product.image}" alt="${product[`name_${lang}`]}">
                    <h3>${product[`name_${lang}`]}</h3>
                    <p>${product[`description_${lang}`]}</p>
                    <!-- PRICE REMOVED: Price is now hidden as customers will see it on the Wolt website -->
                    <!-- <p>${product.price} €</p> -->
                    <div class="button-container">
                        <!-- "Have a question?" button -->
                        <a href="contact.html" class="button">${window.translations[lang].have_a_question}</a>
                        <!-- "Order with Wolt" button -->
                        <a href="https://wolt.com/de/deu/hamburg/venue/alawis-bltenzauber" target="_blank" class="wolt-button">
                            <span>${window.translations[lang].order_with_wolt}</span>
                            <img src="assets/img/wolt-logo.png" alt="Wolt">
                        </a>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error loading products:', error));
}

// Load all products (Products Page)
function loadProducts() {
    const grid = document.getElementById('products-list');
    if (!grid) return; // Skip if not on products page

    fetch('assets/json/products.json')
        .then(response => response.json())
        .then(products => {
            const lang = document.documentElement.lang;
            grid.innerHTML = products.map(product => `
                <div class="product">
                    <img src="assets/img/${product.image}" alt="${product[`name_${lang}`]}">
                    <h3>${product[`name_${lang}`]}</h3>
                    <p>${product[`description_${lang}`]}</p>
                    <!-- PRICE REMOVED: Price is now hidden as customers will see it on the Wolt website -->
                    <!-- <p>${product.price} €</p> -->
                    <div class="button-container">
                        <!-- "Have a question?" button -->
                        <a href="contact.html" class="button">${window.translations[lang].have_a_question}</a>
                        <!-- "Order with Wolt" button -->
                        <a href="https://wolt.com/de/deu/hamburg/venue/alawis-bltenzauber" target="_blank" class="wolt-button">
                            <span>${window.translations[lang].order_with_wolt}</span>
                            <img src="assets/img/wolt-logo.png" alt="Wolt">
                        </a>
                    </div>
                </div>
            `).join('');
        })
        .catch(error => console.error('Error loading products:', error));
}

// Contact Form Validation
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return; // Skip if not on contact page

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const humanCheck = document.getElementById('human-check').value;
        const lang = window.currentLang || 'de'; // Use current language

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !message) {
            alert(window.translations[lang].alert_missing_fields);
            return;
        }

        if (!emailRegex.test(email)) {
            alert(window.translations[lang].alert_invalid_email);
            return;
        }

        if (humanCheck !== '4') {
            alert(window.translations[lang].alert_incorrect_human_check);
            return;
        }

        // Open user's email client
        const subject = encodeURIComponent(`Message from ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
        window.location.href = `mailto:alawibluetenzauber@gmail.com?subject=${subject}&body=${body}`;
    });
}
