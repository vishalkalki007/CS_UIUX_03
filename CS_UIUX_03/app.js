// Mock Restaurant Database Dataset Array (Categorized & Useful Requirements)
const MENU_DATA = [
    {
        id: 1,
        title: "Pear & Orange",
        category: "breakfast",
        price: 25.00,
        time: 20,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=300&q=80",
        desc: "As a rule, pancakes are served for breakfast with various sweet sauces, chocolate, berries, maple syrup. Pancakes were a very popular breakfast only in the USA and Canada, but now pancakes enjoy breakfast all over the world."
    },
    {
        id: 2,
        title: "Meat & Mushrooms",
        category: "lunch",
        price: 37.00,
        time: 30,
        rating: 5.0,
        image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=300&q=80",
        desc: "Slices of premium seared tenderloin served over an artisan bed of wild forest mushrooms and garlic reduction butter cream toast."
    },
    {
        id: 3,
        title: "Egg & Bread",
        category: "breakfast",
        price: 25.00,
        time: 10,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=300&q=80",
        desc: "Perfect morning sunny-side up eggs arranged elegantly on freshly baked brioche sourdough slices topped with local garden greens."
    },
    {
        id: 4,
        title: "Sweet pancake",
        category: "dessert",
        price: 13.00,
        time: 10,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=300&q=80",
        desc: "Fluffy light golden griddle cakes drizzled in wild organic honey compounds and fresh organic butter spreads."
    },
    {
        id: 5,
        title: "Artisan Pasta Sliders",
        category: "lunch",
        price: 29.50,
        time: 15,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80",
        desc: "Homemade durum wheat flat ribbon pasta tossed in zesty extra virgin olive oils, shaved parmesan, and freshly cracked pepper kernels."
    }
];

// App Session Memory State
let currentCartCount = 0;
let currentViewingProductId = null;

// Initialize Workspace on Startup
document.addEventListener("DOMContentLoaded", () => {
    renderGridItems(MENU_DATA);
    populateRecentlyViewed();
});

// Render Product Cards dynamically (Visually Appealing)
function renderGridItems(items) {
    const container = document.getElementById("menuGridContainer");
    container.innerHTML = ""; // Clear existing grid context

    if(items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#6a7c80; padding:20px; font-size:13px;">No food matches found.</p>`;
        return;
    }

    items.forEach(dish => {
        const card = document.createElement("div");
        card.className = "menu-card";
        card.onclick = () => showProductDetails(dish.id);
        
        card.innerHTML = `
            <div class="card-img-frame">
                <img src="${dish.image}" alt="${dish.title}">
            </div>
            <h3 class="card-title">${dish.title}</h3>
            <div class="card-meta">
                <span class="time"><i class="fa-regular fa-clock"></i> ${dish.time} min</span>
                <span class="rating"><i class="fa-solid fa-star"></i> ${dish.rating}</span>
            </div>
            <div class="card-price">${dish.price.toFixed(2)}$</div>
        `;
        container.appendChild(card);
    });
}

// Category Filtering Engine (Easy to use & Categorized)
function filterCategory(categoryName, element) {
    // Manage Selected Class states inside navigation elements
    document.querySelectorAll(".category-pill").forEach(pill => pill.classList.remove("active"));
    element.classList.add("active");

    // Filter array dataset
    if (categoryName === "all") {
        renderGridItems(MENU_DATA);
    } else {
        const filtered = MENU_DATA.filter(dish => dish.category === categoryName);
        renderGridItems(filtered);
    }
}

// Full Text Live Search Matching Controller
function handleSearch() {
    const query = document.getElementById("menuSearch").value.toLowerCase().trim();
    const matches = MENU_DATA.filter(dish => dish.title.toLowerCase().includes(query));
    renderGridItems(matches);
}

// Open Dynamic Details Panel Layer
function showProductDetails(productId) {
    const targetDish = MENU_DATA.find(d => d.id === productId);
    if (!targetDish) return;

    currentViewingProductId = productId;

    // Direct text property bindings to detail template views
    document.getElementById("detailImg").src = targetDish.image;
    document.getElementById("detailTitle").innerText = targetDish.title;
    document.getElementById("detailTime").innerText = targetDish.time;
    document.getElementById("detailRating").innerText = targetDish.rating.toFixed(1);
    document.getElementById("detailPrice").innerText = `${targetDish.price.toFixed(2)}$`;
    document.getElementById("detailDesc").innerText = targetDish.desc;

    // Handle view switches smoothly
    document.getElementById("menuDashboard").classList.add("hidden");
    document.getElementById("productDetailsScreen").classList.remove("hidden");
}

// Close Drawer View Interface Layer safely
function closeDetails() {
    document.getElementById("productDetailsScreen").classList.add("hidden");
    document.getElementById("menuDashboard").classList.remove("hidden");
    currentViewingProductId = null;
}

// Increment Basket Items counter metrics
function addItemToCart() {
    currentCartCount++;
    document.getElementById("cartCount").innerText = currentCartCount;
    
    // Quick success animation notification alert
    alert("Item added successfully to your selection basket order list!");
    closeDetails();
}

// Generate Static miniatures matching the cross-sell recommendation framework
function populateRecentlyViewed() {
    const container = document.getElementById("recentContainer");
    container.innerHTML = "";
    
    // Grab three elements to serve as recommendations
    MENU_DATA.slice(2, 5).forEach(item => {
        const thumbnail = document.createElement("img");
        thumbnail.src = item.image;
        thumbnail.className = "recent-mini-thumb";
        thumbnail.alt = "Thumb food lookup element";
        thumbnail.onclick = () => showProductDetails(item.id);
        container.appendChild(thumbnail);
    });
}

function openCartHint() {
    alert(`Your current order checkout tray holds: ${currentCartCount} items.`);
}