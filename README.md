# Task 5 Apex Planet Internship — NOVA Storefront

A responsive demo e-commerce storefront built for ApexPlanet's Task 5: Final Project and Optimization.

## Features
- Responsive layout for desktop, tablet, and mobile screens
- Product search, category filters, and sorting
- Add-to-bag controls, quantity updates, subtotal calculation, and cart persistence with `localStorage`
- Newsletter form validation with a demo-only confirmation
- Lazy-loaded product images and asynchronous image decoding
- Accessible labels, keyboard focus styles, Escape-to-close cart, and reduced-motion support
- Image fallback if an external product image cannot load
- No framework or build step required

## Run locally
1. Open `index.html` in a modern browser, or open the folder in Visual Studio Code.
2. For a local server, use the VS Code Live Server extension if it is installed.
3. Test the search, category chips, sort menu, cart, quantity buttons, refresh persistence, and newsletter form.

## Performance and compatibility notes
- CSS and JavaScript are separate files and the JavaScript uses `defer`.
- Product images use `loading="lazy"` and `decoding="async"`.
- Fonts and product photography are loaded from external services, so an internet connection is needed for those assets.
- Test on current Chrome, Firefox, Safari (if available), and mobile-sized viewports. Browser availability depends on your device.

## Demo limitations
This is a front-end portfolio project, not a real store. It does not process payments, submit newsletter emails, or connect to a backend. Prices are sample INR values.

## Suggested test checklist
- [ ] Search by product name and category
- [ ] Filter by Audio, Workspace, and Wearables
- [ ] Sort low-to-high, high-to-low, and A–Z
- [ ] Add products, change quantities, remove an item, and verify subtotal
- [ ] Refresh the page and confirm the bag persists
- [ ] Submit an invalid and valid newsletter email
- [ ] Check the layout at 375px, 768px, and desktop width
- [ ] Run Lighthouse in Chrome DevTools and review any opportunities
