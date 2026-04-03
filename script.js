// Data for Must-Try Dishes
const mustTryDishes = [
    {
        name: "Mysore Masala Dosa",
        price: "₹100",
        quote: "Loved the tomato chutney paste",
        imageSrc: "images/hero_dosa.png"
    },
    {
        name: "Kizhi Mushroom Biriyani",
        price: "₹200",
        quote: "Steamed in banana leaf, perfect spice",
        imageSrc: "images/kizhi_biriyani.png"
    },
    {
        name: "Paneer Kizhi Biriyani",
        price: "₹200",
        quote: "Rich paneer in aromatic banana leaf parcel",
        imageSrc: "images/paneer_kizhi.png"
    },
    {
        name: "Ghee Roast Dosa",
        price: "₹90",
        quote: "Crispy perfection with pure ghee",
        imageSrc: "images/ghee_roast.png"
    },
    {
        name: "Kerala Sadya",
        price: "₹150",
        quote: "Authentic traditional meal on banana leaf",
        imageSrc: "images/kerala_sadya.png"
    },
    {
        name: "Chilli Gobi",
        price: "₹140",
        quote: "Perfect crispy Indo-Chinese starter",
        imageSrc: "images/chilli_gobi.png"
    }
];

// Data for Menu
const menuCategories = [
    {
        title: "🥞 Breakfast (7:30 AM – 11 AM)",
        items: [
            { name: "Idly (3 pcs)", price: "₹50" },
            { name: "Vada", price: "₹50" },
            { name: "Poori Bhaji", price: "₹80" },
            { name: "Puttu + Kadala", price: "Recommended" }
        ]
    },
    {
        title: "🥘 Signature Dosas",
        items: [
            { name: "Plain Roast", price: "₹60" },
            { name: "Masala Dosa", price: "₹60" },
            { name: "Mysore Masala Dosa", price: "₹100" },
            { name: "Ghee Roast", price: "₹80" },
            { name: "Ghee Masala Dosa", price: "₹90" },
            { name: "Mushroom Masala Dosa", price: "₹150" },
            { name: "Paneer Masala Dosa", price: "₹150" }
        ]
    },
    {
        title: "🍛 Kerala Specials & Biriyani",
        items: [
            { name: "Veg Meals (unlimited)", price: "₹120" },
            { name: "Veg Biriyani", price: "₹150" },
            { name: "Mushroom Biriyani", price: "₹200" },
            { name: "Kizhi Biriyani (Mushroom/Paneer)", price: "₹200" },
            { name: "Kizhi Paratha", price: "₹160" }
        ]
    },
    {
        title: "🍜 Indo-Chinese",
        items: [
            { name: "Chilli Gobi / Chilli Paneer", price: "₹140 / ₹180" },
            { name: "Dragon Paneer / Mushroom", price: "₹170" },
            { name: "Veg / Paneer Fried Rice", price: "₹150 / ₹180" },
            { name: "Hakka Noodles", price: "₹150" }
        ]
    },
    {
        title: "🥘 Indian Curries & Breads",
        items: [
            { name: "Kerala Paratha", price: "₹15" },
            { name: "Chapathi / Wheat Paratha", price: "₹15 / ₹17" },
            { name: "Paneer Butter Masala", price: "₹180" },
            { name: "Mushroom Chettinadu", price: "₹180" },
            { name: "Kadai Veg", price: "₹150" }
        ]
    },
    {
        title: "🥤 Beverages",
        items: [
            { name: "Fresh Lime Soda", price: "₹35" },
            { name: "Mint Lime", price: "₹35" },
            { name: "Masala Tea", price: "₹40" },
            { name: "Coffee / Tea", price: "₹15" }
        ]
    }
];

// Data for Reviews
const reviews = [
    {
        text: "\"Mysore masala dosa was delicious — loved the tomato paste. Best veg food on the highway.\"",
        author: "Romy George"
    },
    {
        text: "\"The Kizhi Mushroom Biriyani is a must-try. Perfect blend of spice and aroma, steamed in banana leaf.\"",
        author: "Local Guide"
    },
    {
        text: "\"Clean, hygienic, well-ventilated, wooden décor. Staff prepared food without onion/garlic on request.\"",
        author: "Happy Customer"
    },
    {
        text: "\"After a long time, a vegetarian restaurant worth ₹170 for biriyani. Highly recommend.\"",
        author: "sree rag"
    }
];

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
        });
    });

    // 2. Render Must-Try Grid
    const dishGrid = document.getElementById('dish-grid');
    mustTryDishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.innerHTML = `
            <div class="dish-img-placeholder" style="background-image: url('${dish.imageSrc}'); background-size: cover; background-position: center;">
            </div>
            <div class="dish-content">
                <div class="dish-header">
                    <h3 class="dish-title">${dish.name}</h3>
                    <span class="dish-price">${dish.price}</span>
                </div>
                <p class="dish-quote">"${dish.quote}"</p>
                <a href="https://wa.me/917902204415?text=${encodeURIComponent('Hey, I want to pre order "' + dish.name + '"')}" target="_blank" class="btn btn-primary">Order via WhatsApp</a>
            </div>
        `;
        dishGrid.appendChild(card);
    });

    // Auto-swipe functionality for Dish Grid (Mobile)
    let autoScrollInterval;
    const startAutoScroll = () => {
        if (autoScrollInterval) clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(() => {
            if (!dishGrid || dishGrid.scrollWidth <= dishGrid.clientWidth) return;
            
            const cards = Array.from(dishGrid.querySelectorAll('.dish-card'));
            if (cards.length === 0) return;
            
            // Find which card is currently centered
            let currentIndex = 0;
            let minDistance = Infinity;
            const gridCenter = dishGrid.scrollLeft + (dishGrid.clientWidth / 2);
            
            cards.forEach((card, index) => {
                const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
                const distance = Math.abs(cardCenter - gridCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    currentIndex = index;
                }
            });
            
            let nextIndex = currentIndex + 1;
            
            // Rewind if we're at the very end
            if (nextIndex >= cards.length || Math.ceil(dishGrid.scrollLeft + dishGrid.clientWidth) >= dishGrid.scrollWidth - 5) {
                nextIndex = 0;
            }
            
            const targetCard = cards[nextIndex];
            // Compute the exact horizontal scroll offset needed to center the card without touching the vertical page scroll
            const targetLeft = targetCard.offsetLeft - (dishGrid.clientWidth / 2) + (targetCard.offsetWidth / 2);
            
            dishGrid.scrollTo({ left: targetLeft, behavior: 'smooth' });
            
        }, 2300);
    };

    startAutoScroll();

    // Pause auto-scroll on interaction for better UX
    dishGrid.addEventListener('touchstart', () => clearInterval(autoScrollInterval), {passive: true});
    dishGrid.addEventListener('touchend', startAutoScroll, {passive: true});
    dishGrid.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
    dishGrid.addEventListener('mouseleave', startAutoScroll);

    // 3. Render Menu Accordion
    const menuAccordion = document.getElementById('menu-accordion');
    menuCategories.forEach((cat, index) => {
        const item = document.createElement('div');
        item.className = 'accordion-item';
        // Make the first one active by default
        if (index === 0) item.classList.add('active');

        let itemsHtml = cat.items.map(menuItem => `
            <div class="menu-item">
                <span class="menu-item-name">${menuItem.name}</span>
                <span class="menu-item-price">${menuItem.price}</span>
            </div>
        `).join('');

        item.innerHTML = `
            <div class="accordion-header">
                <span class="accordion-title">${cat.title}</span>
                <span class="accordion-icon">+</span>
            </div>
            <div class="accordion-content">
                <div class="menu-list">
                    ${itemsHtml}
                </div>
            </div>
        `;
        menuAccordion.appendChild(item);
    });

    // Accordion interaction logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            
            // Toggle active class on the clicked item
            currentItem.classList.toggle('active');
            
            // Update icon
            const icon = this.querySelector('.accordion-icon');
            if (currentItem.classList.contains('active')) {
                icon.textContent = '+'; 
                // Using transform in CSS for rotation + to x
            } else {
                icon.textContent = '+';
            }
        });
    });

    // 4. Render Reviews
    const reviewsTrack = document.getElementById('reviews-track');
    reviews.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="review-stars">★★★★★</div>
            <p class="review-text">${review.text}</p>
            <span class="review-author">— ${review.author}</span>
        `;
        reviewsTrack.appendChild(card);
    });

    // Header Background on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // 5. Modal Logic
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const trustModal = document.getElementById('trust-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    learnMoreBtn.addEventListener('click', () => {
        trustModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
    });

    modalCloseBtn.addEventListener('click', () => {
        trustModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close on overlay click
    trustModal.addEventListener('click', (e) => {
        if (e.target === trustModal) {
            trustModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Pause CSS animation on hover (already handled by CSS, but you can add JS logic if needed)
});
