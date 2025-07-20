# Alawi`s Blütenzauber Flower Shop Website

A multilingual, responsive flower shop website built with HTML, CSS, and vanilla JavaScript.

## Installation & Setup
1. Clone or download this repository.
2. Place the project folder on a web server (e.g., XAMPP, Node.js `http-server`, or any static file server).
3. Open `index.html` in a modern browser (Chrome, Firefox, Edge, etc.).
4. Ensure all files in the `assets/` folder are accessible.

## Project Structure
- `index.html`: Homepage
- `products.html`: Products page
- `contact.html`: Contact page
- `assets/css/styles.css`: Core styles
- `assets/js/main.js`: Core JavaScript (language switching, slider, form validation, product loading, etc.)
- `assets/json/translations.json`: Translations for all languages
- `assets/json/products.json`: Product data
- `assets/img/`: Images for products, hero slider, WhatsApp button, Wolt logo, site logo, and flags
  - `assets/img/flags/`: Flag images (`de.png`, `gb.png`, `sa.png`, `es.png`)
  - `assets/img/logo.webp`: Logo image for Alawi`s Blütenzauber
  - `assets/img/wolt-logo.png`: Wolt logo for ordering

alawis-blutenzauber/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── img/
│   │   ├── flags/
│   │   │   ├── de.png
│   │   │   ├── gb.png
│   │   │   ├── sa.png
│   │   │   └── es.png
│   │   ├── hero1.jpg
│   │   ├── hero2.jpg
│   │   ├── logo.webp
│   │   ├── rose_bouquet.jpg
│   │   ├── tulips.jpg
│   │   ├── whatsapp.png
│   │   └── wolt-logo.png  (New Wolt logo)
│   ├── js/
│   │   └── main.js
│   └── json/
│       ├── products.json
│       └── translations.json
├── index.html
├── products.html
├── contact.html
└── README.md

## Key Features
- **Multilingual Support**: Switch between German (default), English, Arabic (RTL), and Spanish dynamically without page reload. All text, including form labels, buttons, alerts, and product names, updates to the selected language. Language selector uses flag images.
- **Responsive Design**: Optimized for 4K TVs (3840x2160), wide monitors, tablets, and small-screen phones (e.g., 400x240px). Includes a hamburger menu for mobile navigation.
- **Product Actions**: Each product has a "Have a question?" button linking to the Contact Page and an "Order it with Wolt" button linking to Wolt's ordering page in a new tab.
- **Hero Slider**: Autoplaying image slider with a "coverRightToLeft" transition on the Homepage, where the previous slide remains visible until fully covered.
- **Contact Form**: Validated form with required fields (Name, Email, Message) and a human check question ("What is 2 + 2?"). Displays alerts in the selected language.
- **Store Info**: Includes a Google Maps iframe, address, opening hours, and contact details on the Contact Page.
- **WhatsApp Chat**: Fixed button linking to a WhatsApp chat in a new tab, resized to 100px.
- **Dynamic Footer**: Displays the current year automatically, with a styled link to the developer's website.

## Customization Guide
- **Add Products**: Edit `assets/json/products.json` with new product details (ID, names, descriptions, prices, images).
- **Change Languages**: Modify `assets/json/translations.json` to update or add translations for all pages, including form labels, alerts, and button text (e.g., `have_a_question`, `order_with_wolt`).
- **Style Adjustments**: Update `assets/css/styles.css` for colors, fonts, or layout changes (e.g., adjust `.product-grid` or `.wolt-button` styles).
- **Form Validation Messages**: Edit alert messages in `translations.json` under keys like `alert_missing_fields`.
- **Logo Adjustments**: Modify the `.logo img` width in `styles.css` to resize the logo if needed.
- **Slider Animation**: The slider uses a "coverRightToLeft" transition. To change it, modify the `@keyframes` in `styles.css` (options: Fade In, Slide Up, Zoom In).

## Language Switching
- Click the flag in the top-right corner to open the language dropdown, which appears over the slider.
- The current language is shown as a flag, and the dropdown lists flags with language names.
- Translations are loaded from `assets/json/translations.json` and applied dynamically to all elements with `data-key` attributes.
- Arabic uses RTL layout (`dir="rtl"`), automatically applied when selected.

## Page Details
- **Homepage (`index.html`)**: Features a hero slider, shop introduction, and featured products with action buttons. The title "Alawi`s Blütenzauber" is wrapped in an `<h1>` tag for SEO.
- **Products Page (`products.html`)**: Displays all floral arrangements from `products.json` with action buttons linking to the Contact Page and Wolt.
- **Contact Page (`contact.html`)**: Includes a validated form, Google Maps iframe, and store info, all translated based on the selected language.

## Contact Page Details
- **Form**: Includes fields for Name, Email, Message, and a human validation question. All labels, buttons, and alerts are translated.
- **Google Maps**: Embeds a static iframe for "Ecke, Poßmoorweg 69, Barmbeker Str. 73-78, 22301 Hamburg". Note: Map labels (e.g., street names) remain in English due to static iframe limitations. For full translation, integrate the Google Maps JavaScript API with dynamic language parameters.
- **Store Info**: Displays address, opening hours, and contact details, all translated via `translations.json`.

## Responsive Design
- Uses CSS Grid and media queries for a flexible layout.
- Tested across screen sizes, from 400x240px (small phones) to 3840x2160px (4K TVs).
- Navigation collapses into a hamburger menu below 768px, appearing over the slider when toggled.
- Product buttons stack vertically on mobile for better usability.

## Notes
- **Browser Compatibility**: Designed for modern browsers (no support for outdated versions like IE).
- **Images**: Ensure product images (e.g., `rose_bouquet.jpg`), hero images (e.g., `hero1.jpg`), `whatsapp.png`, `logo.png`, `wolt-logo.png`, and flag images (`de.png`, `gb.png`, `sa.png`, `es.png`) are in `assets/img/` and `assets/img/flags/`, respectively.
- **RTL Support**: Fully implemented for Arabic, with text direction and layout adjustments.