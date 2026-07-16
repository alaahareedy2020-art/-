/* ==========================================================================
   APP STATE & INITIALIZATION
   ========================================================================== */
const DEFAULT_MENU_ITEMS = [
    {
        id: "item_1",
        name: "فطير مشلتت سادة",
        description: "فطير مشلتت فلاحي مورق بالسمن البلدي الصافي، يخبز في فرن حجري تقليدي على طريقة أجدادنا.",
        price: 85,
        category: "Meals",
        image: "assets/feteer.jpg",
        status: "in-stock"
    },
    {
        id: "item_2",
        name: "فطير مشلتت بالعسل والقشطة",
        description: "فطيرة مشلتت ساخنة مغطاة بطبقة من القشطة الفلاحي الطازجة والعسل الأبيض أو العسل الأسود حسب اختيارك.",
        price: 110,
        category: "Desserts",
        image: "assets/feteer.jpg",
        status: "in-stock"
    },
    {
        id: "item_3",
        name: "حواوشي بلدي عم شلتت",
        description: "خبز بلدي طازج محشو باللحم البلدي المفروم والمتبل بخلطة بهارات عم شلتت السرية، يخبز حتى القرمشة.",
        price: 65,
        category: "Sandwiches",
        image: "assets/hawawshi.jpg",
        status: "in-stock"
    },
    {
        id: "item_4",
        name: "سندوتش فلافل بالخلطة الفلاحي",
        description: "فلافل ساخنة ومقرمشة مع طماطم، خيار، طحينة، وخلطة فلاحي خاصة داخل خبز بلدي ساخن.",
        price: 15,
        category: "Sandwiches",
        image: "https://images.unsplash.com/photo-1547058886-af77818bc7a8?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_5",
        name: "طاجن أم علي بالمكسرات الفاخرة",
        description: "حلوى أم علي التقليدية بالرقاق والحليب الطازج والقشطة البلدي، مزينة بالفسدق، اللوز، وجوز الهند.",
        price: 55,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_6",
        name: "كوب شاي بالنعناع البلدي",
        description: "شاي أحمر كشري مخمر بعناية مع أوراق النعناع البلدي الطازج والمنعش.",
        price: 12,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_7",
        name: "عصير ليمون بالنعناع فريش",
        description: "عصير ليمون طازج ومثلج ممزوج بقطع النعناع الأخضر المنعش، مثالي لأيام الصيف.",
        price: 25,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_8",
        name: "طبق بطاطس فلاحي محمرة",
        description: "بطاطس ذهبية مقرمشة ومتبلة بملح وكمون، تقدم ساخنة مع الكاتشب.",
        price: 20,
        category: "Extras",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_9",
        name: "عسل أسود بالطحينة وجبنة قديمة",
        description: "طبق مشكل فلاحي يضم جبنة قديمة بالطماطم وزيت الزيتون، وعسل أسود ممزوج بالطحينة السمسم.",
        price: 35,
        category: "Extras",
        image: "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    }
];

let state = {
    currentUser: null,
    menuItems: [],
    cart: [],
    customerFilter: "all",
    customerSearch: "",
    customerSort: "default",
    adminFilter: "all",
    adminSearch: "",
    currentTheme: "light-mode"
};

// Seed LocalStorage
function initDatabase() {
    // Menu database
    if (!localStorage.getItem("om_shaltet_menu")) {
        localStorage.setItem("om_shaltet_menu", JSON.stringify(DEFAULT_MENU_ITEMS));
    }
    state.menuItems = JSON.parse(localStorage.getItem("om_shaltet_menu"));

    // Users seed (default admin and user accounts)
    if (!localStorage.getItem("om_shaltet_users")) {
        const initialUsers = [
            { email: "admin@test.com", password: "123", role: "admin" },
            { email: "user@test.com", password: "123", role: "user" }
        ];
        localStorage.setItem("om_shaltet_users", JSON.stringify(initialUsers));
    }
}

/* ==========================================================================
   DOM ELEMENTS SELECTORS
   ========================================================================== */
const DOM = {
    body: document.body,
    toast: document.getElementById("toast"),
    
    // Header Elements
    themeToggle: document.getElementById("theme-toggle"),
    cartToggle: document.getElementById("cart-toggle"),
    cartBadge: document.getElementById("cart-badge"),
    userBadge: document.getElementById("user-badge"),
    userRoleLabel: document.getElementById("user-role-label"),
    userEmailDisplay: document.getElementById("user-email-display"),
    logoutBtn: document.getElementById("logout-btn"),
    
    // View containers
    authView: document.getElementById("auth-view"),
    customerView: document.getElementById("customer-view"),
    adminView: document.getElementById("admin-view"),
    
    // Auth Forms
    tabLogin: document.getElementById("tab-login"),
    tabSignup: document.getElementById("tab-signup"),
    loginForm: document.getElementById("login-form"),
    signupForm: document.getElementById("signup-form"),
    switchToSignup: document.getElementById("switch-to-signup"),
    switchToLogin: document.getElementById("switch-to-login"),
    
    // Customer Menu Controls
    searchInput: document.getElementById("search-input"),
    categoryFilters: document.getElementById("category-filters"),
    sortSelect: document.getElementById("sort-select"),
    customerMenuGrid: document.getElementById("customer-menu-grid"),
    customerNoResults: document.getElementById("customer-no-results"),
    
    // Admin Dashboard Controls
    adminSearchInput: document.getElementById("admin-search-input"),
    adminCategoryFilters: document.getElementById("admin-category-filters"),
    adminMenuGrid: document.getElementById("admin-menu-grid"),
    adminNoResults: document.getElementById("admin-no-results"),
    adminAddItemBtn: document.getElementById("admin-add-item-btn"),
    
    // Admin Dashboard Stats
    statTotalItems: document.getElementById("stat-total-items"),
    statCategories: document.getElementById("stat-categories"),
    statOutOfStock: document.getElementById("stat-out-of-stock"),
    
    // Cart Drawer
    cartDrawer: document.getElementById("cart-drawer"),
    cartClose: document.getElementById("cart-close"),
    cartItemsContainer: document.getElementById("cart-items-container"),
    cartSubtotal: document.getElementById("cart-subtotal"),
    cartTotal: document.getElementById("cart-total"),
    cartCheckoutBtn: document.getElementById("cart-checkout-btn"),
    
    // Modals
    itemModal: document.getElementById("item-modal"),
    modalTitle: document.getElementById("modal-title"),
    itemForm: document.getElementById("item-form"),
    modalItemId: document.getElementById("modal-item-id"),
    modalItemName: document.getElementById("modal-item-name"),
    modalItemPrice: document.getElementById("modal-item-price"),
    modalItemCategory: document.getElementById("modal-item-category"),
    modalItemStatus: document.getElementById("modal-item-status"),
    modalItemDesc: document.getElementById("modal-item-desc"),
    modalItemImageSelect: document.getElementById("modal-item-image-select"),
    customImageUrlGroup: document.getElementById("custom-image-url-group"),
    modalItemImageCustom: document.getElementById("modal-item-image-custom"),
    modalCancelBtn: document.getElementById("modal-cancel-btn"),
    modalClose: document.getElementById("modal-close"),
    
    // Success Modal
    successModal: document.getElementById("success-modal"),
    orderIdNum: document.getElementById("order-id-num"),
    successModalClose: document.getElementById("success-modal-close")
};

/* ==========================================================================
   APP ROUTING & VIEW NAVIGATION
   ========================================================================== */
function navigateTo(viewName) {
    // Hide all views first
    DOM.authView.classList.add("hidden");
    DOM.authView.classList.remove("active");
    DOM.customerView.classList.add("hidden");
    DOM.customerView.classList.remove("active");
    DOM.adminView.classList.add("hidden");
    DOM.adminView.classList.remove("active");

    // Activate the requested view
    if (viewName === "auth") {
        DOM.authView.classList.remove("hidden");
        // Force reflow for CSS transition
        void DOM.authView.offsetWidth;
        DOM.authView.classList.add("active");
        
        // Hide profile items
        DOM.userBadge.classList.add("hidden");
        DOM.logoutBtn.classList.add("hidden");
        DOM.cartToggle.classList.add("hidden");
    } else if (viewName === "customer") {
        DOM.customerView.classList.remove("hidden");
        void DOM.customerView.offsetWidth;
        DOM.customerView.classList.add("active");
        
        // Show profile items
        DOM.userBadge.classList.remove("hidden");
        DOM.logoutBtn.classList.remove("hidden");
        DOM.cartToggle.classList.remove("hidden");
        
        DOM.userRoleLabel.textContent = "زبون";
        DOM.userRoleLabel.style.backgroundColor = "var(--primary-brown)";
        DOM.userEmailDisplay.textContent = state.currentUser ? state.currentUser.email : "زائر";
        
        renderCustomerMenu();
    } else if (viewName === "admin") {
        DOM.adminView.classList.remove("hidden");
        void DOM.adminView.offsetWidth;
        DOM.adminView.classList.add("active");
        
        // Show profile items, hide cart
        DOM.userBadge.classList.remove("hidden");
        DOM.logoutBtn.classList.remove("hidden");
        DOM.cartToggle.classList.add("hidden");
        
        DOM.userRoleLabel.textContent = "مشرف النظام";
        DOM.userRoleLabel.style.backgroundColor = "var(--success-color)";
        DOM.userEmailDisplay.textContent = state.currentUser ? state.currentUser.email : "مدير";
        
        renderAdminDashboard();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Authentication Check on startup
function checkSession() {
    const session = sessionStorage.getItem("om_shaltet_session");
    if (session) {
        state.currentUser = JSON.parse(session);
        if (state.currentUser.role === "admin") {
            navigateTo("admin");
        } else {
            navigateTo("customer");
        }
    } else {
        navigateTo("auth");
    }
}

/* ==========================================================================
   AUTHENTICATION LOGIC (LOGIN / SIGNUP)
   ========================================================================== */
function handleLogin(email, password) {
    const users = JSON.parse(localStorage.getItem("om_shaltet_users")) || [];
    const matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (matchedUser) {
        state.currentUser = { email: matchedUser.email, role: matchedUser.role };
        
        // Save session
        if (document.getElementById("remember-me").checked) {
            localStorage.setItem("om_shaltet_remember", JSON.stringify(state.currentUser));
        }
        sessionStorage.setItem("om_shaltet_session", JSON.stringify(state.currentUser));
        
        showToast("تم تسجيل الدخول بنجاح! أهلاً بك.", "success");
        
        // Route appropriately
        setTimeout(() => {
            if (matchedUser.role === "admin") {
                navigateTo("admin");
            } else {
                navigateTo("customer");
            }
        }, 600);
    } else {
        showToast("البريد الإلكتروني أو كلمة المرور غير صحيحة!", "error");
    }
}

function handleSignup(email, password, role) {
    const users = JSON.parse(localStorage.getItem("om_shaltet_users")) || [];
    
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        showToast("هذا البريد الإلكتروني مسجل بالفعل!", "error");
        return;
    }
    
    const newUser = { email, password, role };
    users.push(newUser);
    localStorage.setItem("om_shaltet_users", JSON.stringify(users));
    
    // Login directly
    state.currentUser = { email, role };
    sessionStorage.setItem("om_shaltet_session", JSON.stringify(state.currentUser));
    
    showToast("تم إنشاء الحساب بنجاح! أهلاً بك.", "success");
    
    setTimeout(() => {
        if (role === "admin") {
            navigateTo("admin");
        } else {
            navigateTo("customer");
        }
    }, 600);
}

/* ==========================================================================
   CUSTOMER MENU RENDERING & FILTERING
   ========================================================================== */
function renderCustomerMenu() {
    let filtered = [...state.menuItems];

    // 1. Search Query
    if (state.customerSearch.trim() !== "") {
        const query = state.customerSearch.toLowerCase();
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
    }

    // 2. Category Filter
    if (state.customerFilter !== "all") {
        filtered = filtered.filter(item => item.category === state.customerFilter);
    }

    // 3. Sorting
    if (state.customerSort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (state.customerSort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (state.customerSort === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    }

    // Render Items
    DOM.customerMenuGrid.innerHTML = "";
    if (filtered.length === 0) {
        DOM.customerNoResults.classList.remove("hidden");
    } else {
        DOM.customerNoResults.classList.add("hidden");
        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = "food-card fade-in";
            
            const isOutOfStock = item.status === "out-of-stock";
            const badgeHTML = isOutOfStock 
                ? `<span class="status-badge out-of-stock">غير متوفر</span>` 
                : `<span class="status-badge">متوفر</span>`;
            
            const catArabic = translateCategory(item.category);
            
            card.innerHTML = `
                <div class="food-card-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="food-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'">
                    <span class="category-tag">${catArabic}</span>
                    ${badgeHTML}
                </div>
                <div class="food-card-info">
                    <div class="food-card-title-row">
                        <h3 class="food-card-title">${item.name}</h3>
                        <span class="food-card-price">${item.price} ج.م</span>
                    </div>
                    <p class="food-card-desc">${item.description}</p>
                    <div class="food-card-actions">
                        <button class="btn btn-primary btn-block btn-animate add-to-cart-btn" data-id="${item.id}" ${isOutOfStock ? 'disabled' : ''}>
                            <i class="fa-solid fa-cart-plus"></i>
                            <span>${isOutOfStock ? 'غير متوفر حالياً' : 'أضف إلى السلة'}</span>
                        </button>
                    </div>
                </div>
            `;
            DOM.customerMenuGrid.appendChild(card);
        });
    }
}

/* ==========================================================================
   ADMIN DASHBOARD RENDERING & MANAGEMENT
   ========================================================================== */
function renderAdminDashboard() {
    let filtered = [...state.menuItems];

    // 1. Search Query
    if (state.adminSearch.trim() !== "") {
        const query = state.adminSearch.toLowerCase();
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.description.toLowerCase().includes(query)
        );
    }

    // 2. Category Filter
    if (state.adminFilter !== "all") {
        filtered = filtered.filter(item => item.category === state.adminFilter);
    }

    // Stats calculations
    const totalItems = state.menuItems.length;
    const outOfStock = state.menuItems.filter(item => item.status === "out-of-stock").length;
    const categoriesSet = new Set(state.menuItems.map(item => item.category));
    
    DOM.statTotalItems.textContent = totalItems;
    DOM.statOutOfStock.textContent = outOfStock;
    DOM.statCategories.textContent = categoriesSet.size;

    // Render Admin Grid
    DOM.adminMenuGrid.innerHTML = "";
    if (filtered.length === 0) {
        DOM.adminNoResults.classList.remove("hidden");
    } else {
        DOM.adminNoResults.classList.add("hidden");
        filtered.forEach(item => {
            const card = document.createElement("div");
            card.className = "food-card fade-in";
            
            const isOutOfStock = item.status === "out-of-stock";
            const badgeHTML = isOutOfStock 
                ? `<span class="status-badge out-of-stock">غير متوفر</span>` 
                : `<span class="status-badge">متوفر بالمخزن</span>`;
            
            const catArabic = translateCategory(item.category);
            
            card.innerHTML = `
                <div class="food-card-img-wrapper">
                    <img src="${item.image}" alt="${item.name}" class="food-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'">
                    <span class="category-tag">${catArabic}</span>
                    ${badgeHTML}
                </div>
                <div class="food-card-info">
                    <div class="food-card-title-row">
                        <h3 class="food-card-title">${item.name}</h3>
                        <span class="food-card-price">${item.price} ج.م</span>
                    </div>
                    <p class="food-card-desc">${item.description}</p>
                    <div class="admin-grid-actions">
                        <button class="btn btn-secondary edit-item-btn" data-id="${item.id}">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <span>تعديل</span>
                        </button>
                        <button class="btn btn-secondary btn-danger delete-item-btn" data-id="${item.id}" style="color: var(--danger-color); border-color: rgba(201, 76, 76, 0.2)">
                            <i class="fa-solid fa-trash-can"></i>
                            <span>حذف</span>
                        </button>
                    </div>
                </div>
            `;
            DOM.adminMenuGrid.appendChild(card);
        });
    }
}

/* ==========================================================================
   ADMIN CRUD OPERATIONS & MODALS
   ========================================================================== */
function openItemModal(itemId = null) {
    DOM.itemModal.classList.add("open");
    DOM.itemForm.reset();
    DOM.customImageUrlGroup.classList.add("hidden");
    
    if (itemId) {
        // Edit Mode
        const item = state.menuItems.find(i => i.id === itemId);
        if (!item) return;
        
        DOM.modalTitle.textContent = "تعديل الوجبة";
        DOM.modalItemId.value = item.id;
        DOM.modalItemName.value = item.name;
        DOM.modalItemPrice.value = item.price;
        DOM.modalItemCategory.value = item.category;
        DOM.modalItemStatus.value = item.status;
        DOM.modalItemDesc.value = item.description;
        
        // Setup image dropdown selection
        const matchingOption = Array.from(DOM.modalItemImageSelect.options).find(opt => opt.value === item.image);
        if (matchingOption) {
            DOM.modalItemImageSelect.value = item.image;
        } else {
            DOM.modalItemImageSelect.value = "custom";
            DOM.customImageUrlGroup.classList.remove("hidden");
            DOM.modalItemImageCustom.value = item.image;
        }
    } else {
        // Add New Mode
        DOM.modalTitle.textContent = "إضافة وجبة جديدة";
        DOM.modalItemId.value = "";
    }
}

function closeItemModal() {
    DOM.itemModal.classList.remove("open");
}

function handleSaveItem(e) {
    e.preventDefault();
    
    const id = DOM.modalItemId.value;
    const name = DOM.modalItemName.value.trim();
    const price = parseFloat(DOM.modalItemPrice.value);
    const category = DOM.modalItemCategory.value;
    const status = DOM.modalItemStatus.value;
    const description = DOM.modalItemDesc.value.trim();
    
    let image = DOM.modalItemImageSelect.value;
    if (image === "custom") {
        image = DOM.modalItemImageCustom.value.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
    }
    
    if (id) {
        // Update existing item
        const index = state.menuItems.findIndex(i => i.id === id);
        if (index !== -1) {
            state.menuItems[index] = { id, name, price, category, image, status, description };
            showToast("تم تحديث وجبة الطعام بنجاح!", "success");
        }
    } else {
        // Create new item
        const newId = "item_" + Date.now();
        const newItem = { id: newId, name, price, category, image, status, description };
        state.menuItems.unshift(newItem);
        showToast("تم إضافة الوجبة الجديدة بنجاح!", "success");
    }
    
    // Save database and refresh
    localStorage.setItem("om_shaltet_menu", JSON.stringify(state.menuItems));
    closeItemModal();
    renderAdminDashboard();
}

function handleDeleteItem(itemId) {
    if (confirm("هل أنت متأكد من رغبتك في حذف هذه الوجبة نهائياً من القائمة؟")) {
        state.menuItems = state.menuItems.filter(i => i.id !== itemId);
        localStorage.setItem("om_shaltet_menu", JSON.stringify(state.menuItems));
        
        // Remove from cart if present
        state.cart = state.cart.filter(entry => entry.item.id !== itemId);
        updateCartUI();
        
        showToast("تم حذف الوجبة بنجاح.", "success");
        renderAdminDashboard();
    }
}

/* ==========================================================================
   SHOPPING CART LOGIC
   ========================================================================== */
function toggleCartDrawer(open) {
    if (open) {
        DOM.cartDrawer.classList.add("open");
        updateCartUI();
    } else {
        DOM.cartDrawer.classList.remove("open");
    }
}

function addToCart(itemId) {
    const item = state.menuItems.find(i => i.id === itemId);
    if (!item || item.status === "out-of-stock") return;
    
    const existingIndex = state.cart.findIndex(entry => entry.item.id === itemId);
    if (existingIndex !== -1) {
        state.cart[existingIndex].quantity += 1;
    } else {
        state.cart.push({ item, quantity: 1 });
    }
    
    updateCartUI();
    showToast(`تمت إضافة "${item.name}" إلى السلة!`, "success");
}

function updateCartQuantity(itemId, delta) {
    const index = state.cart.findIndex(entry => entry.item.id === itemId);
    if (index === -1) return;
    
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) {
        state.cart.splice(index, 1);
    }
    
    updateCartUI();
}

function removeFromCart(itemId) {
    state.cart = state.cart.filter(entry => entry.item.id !== itemId);
    updateCartUI();
    showToast("تم إزالة الوجبة من سلة المشتريات.", "info");
}

function updateCartUI() {
    DOM.cartItemsContainer.innerHTML = "";
    
    let totalQty = 0;
    let subtotal = 0;
    
    if (state.cart.length === 0) {
        DOM.cartItemsContainer.innerHTML = `
            <div class="no-results" style="padding: 40px 0;">
                <i class="fa-solid fa-basket-shopping" style="font-size: 2.5rem; margin-bottom: 12px;"></i>
                <p>سلة المشتريات فارغة تماماً!</p>
            </div>
        `;
        DOM.cartCheckoutBtn.disabled = true;
    } else {
        DOM.cartCheckoutBtn.disabled = false;
        
        state.cart.forEach(entry => {
            totalQty += entry.quantity;
            const itemCost = entry.item.price * entry.quantity;
            subtotal += itemCost;
            
            const cartItemDiv = document.createElement("div");
            cartItemDiv.className = "cart-item fade-in";
            cartItemDiv.innerHTML = `
                <img src="${entry.item.image}" alt="${entry.item.name}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'">
                <div class="cart-item-details">
                    <div class="cart-item-name">${entry.item.name}</div>
                    <div class="cart-item-price">${entry.item.price} ج.م</div>
                    <div class="cart-item-qty-control">
                        <button class="qty-btn dec-qty" data-id="${entry.item.id}">-</button>
                        <span class="qty-val">${entry.quantity}</span>
                        <button class="qty-btn inc-qty" data-id="${entry.item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${entry.item.id}">&times;</button>
            `;
            DOM.cartItemsContainer.appendChild(cartItemDiv);
        });
    }
    
    DOM.cartBadge.textContent = totalQty;
    DOM.cartSubtotal.textContent = `${subtotal.toFixed(2)} ج.م`;
    DOM.cartTotal.textContent = `${subtotal.toFixed(2)} ج.م`;
}

function handleCheckout() {
    if (state.cart.length === 0) return;
    
    // Show success modal
    const randomOrderId = "#" + Math.floor(1000 + Math.random() * 9000);
    DOM.orderIdNum.textContent = randomOrderId;
    
    toggleCartDrawer(false);
    DOM.successModal.classList.add("open");
    
    // Clear cart
    state.cart = [];
    updateCartUI();
}

/* ==========================================================================
   THEME TOGGLER (LIGHT / DARK MODES)
   ========================================================================== */
function initTheme() {
    const savedTheme = localStorage.getItem("om_shaltet_theme") || "light-mode";
    setTheme(savedTheme);
}

function setTheme(themeName) {
    state.currentTheme = themeName;
    localStorage.setItem("om_shaltet_theme", themeName);
    
    if (themeName === "dark-mode") {
        DOM.body.classList.remove("light-mode");
        DOM.body.classList.add("dark-mode");
        DOM.themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        DOM.body.classList.remove("dark-mode");
        DOM.body.classList.add("light-mode");
        DOM.themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

function toggleTheme() {
    if (state.currentTheme === "light-mode") {
        setTheme("dark-mode");
    } else {
        setTheme("light-mode");
    }
}

/* ==========================================================================
   HELPER UTILITY FUNCTIONS
   ========================================================================== */
function showToast(message, type = "success") {
    DOM.toast.innerHTML = `
        <i class="${type === 'success' ? 'fa-solid fa-circle-check' : 'fa-solid fa-triangle-exclamation'}"></i>
        <span>${message}</span>
    `;
    DOM.toast.className = `toast ${type} fade-in`;
    DOM.toast.classList.remove("hidden");
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        DOM.toast.classList.add("hidden");
    }, 3000);
}

function translateCategory(category) {
    const translation = {
        "Sandwiches": "سندوتشات",
        "Meals": "وجبات فلاحي",
        "Drinks": "مشروبات",
        "Desserts": "حلويات",
        "Extras": "إضافات بلدي"
    };
    return translation[category] || category;
}

/* ==========================================================================
   EVENT LISTENERS BINDING
   ========================================================================== */
function setupEventListeners() {
    // Theme Toggle
    DOM.themeToggle.addEventListener("click", toggleTheme);
    
    // Auth Tab Switching
    DOM.tabLogin.addEventListener("click", () => {
        DOM.tabLogin.classList.add("active");
        DOM.tabSignup.classList.remove("active");
        DOM.loginForm.classList.add("active");
        DOM.signupForm.classList.remove("active");
    });
    
    DOM.tabSignup.addEventListener("click", () => {
        DOM.tabSignup.classList.add("active");
        DOM.tabLogin.classList.remove("active");
        DOM.signupForm.classList.add("active");
        DOM.loginForm.classList.remove("active");
    });
    
    DOM.switchToSignup.addEventListener("click", (e) => {
        e.preventDefault();
        DOM.tabSignup.click();
    });
    
    DOM.switchToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        DOM.tabLogin.click();
    });
    
    // Auth Form Submits
    DOM.loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
        handleLogin(email, password);
    });
    
    DOM.signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;
        const confirmPass = document.getElementById("signup-confirm-password").value;
        const isAdmin = document.getElementById("signup-admin-role").checked;
        
        if (password !== confirmPass) {
            showToast("كلمتا المرور غير متطابقتين!", "error");
            return;
        }
        
        const role = isAdmin ? "admin" : "user";
        handleSignup(email, password, role);
    });
    
    // Logout
    DOM.logoutBtn.addEventListener("click", () => {
        state.currentUser = null;
        sessionStorage.removeItem("om_shaltet_session");
        showToast("تم تسجيل الخروج بنجاح. رافقتك السلامة!", "info");
        navigateTo("auth");
    });
    
    // Customer Search and Filters
    DOM.searchInput.addEventListener("input", (e) => {
        state.customerSearch = e.target.value;
        renderCustomerMenu();
    });
    
    DOM.categoryFilters.addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-btn")) {
            DOM.categoryFilters.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            state.customerFilter = e.target.getAttribute("data-category");
            renderCustomerMenu();
        }
    });
    
    DOM.sortSelect.addEventListener("change", (e) => {
        state.customerSort = e.target.value;
        renderCustomerMenu();
    });
    
    // Add to Cart from food card click
    DOM.customerMenuGrid.addEventListener("click", (e) => {
        const btn = e.target.closest(".add-to-cart-btn");
        if (btn) {
            const itemId = btn.getAttribute("data-id");
            addToCart(itemId);
        }
    });
    
    // Admin Search and Filters
    DOM.adminSearchInput.addEventListener("input", (e) => {
        state.adminSearch = e.target.value;
        renderAdminDashboard();
    });
    
    DOM.adminCategoryFilters.addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-btn")) {
            DOM.adminCategoryFilters.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            state.adminFilter = e.target.getAttribute("data-category");
            renderAdminDashboard();
        }
    });
    
    // Cart Drawer Toggle Actions
    DOM.cartToggle.addEventListener("click", () => toggleCartDrawer(true));
    DOM.cartClose.addEventListener("click", () => toggleCartDrawer(false));
    document.querySelector(".cart-drawer-overlay").addEventListener("click", () => toggleCartDrawer(false));
    
    // Cart Item Action Handling
    DOM.cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("inc-qty")) {
            const id = e.target.getAttribute("data-id");
            updateCartQuantity(id, 1);
        } else if (e.target.classList.contains("dec-qty")) {
            const id = e.target.getAttribute("data-id");
            updateCartQuantity(id, -1);
        } else if (e.target.classList.contains("cart-item-remove")) {
            const id = e.target.getAttribute("data-id");
            removeFromCart(id);
        }
    });
    
    DOM.cartCheckoutBtn.addEventListener("click", handleCheckout);
    
    // Admin Dashboard Actions (Edit, Delete, Add Item)
    DOM.adminMenuGrid.addEventListener("click", (e) => {
        const editBtn = e.target.closest(".edit-item-btn");
        const deleteBtn = e.target.closest(".delete-item-btn");
        
        if (editBtn) {
            const id = editBtn.getAttribute("data-id");
            openItemModal(id);
        } else if (deleteBtn) {
            const id = deleteBtn.getAttribute("data-id");
            handleDeleteItem(id);
        }
    });
    
    DOM.adminAddItemBtn.addEventListener("click", () => openItemModal());
    
    // Modals control
    DOM.modalClose.addEventListener("click", closeItemModal);
    DOM.modalCancelBtn.addEventListener("click", closeItemModal);
    document.querySelector(".modal-overlay").addEventListener("click", closeItemModal);
    
    DOM.modalItemImageSelect.addEventListener("change", (e) => {
        if (e.target.value === "custom") {
            DOM.customImageUrlGroup.classList.remove("hidden");
        } else {
            DOM.customImageUrlGroup.classList.add("hidden");
        }
    });
    
    DOM.itemForm.addEventListener("submit", handleSaveItem);
    
    // Success Modal Close
    DOM.successModalClose.addEventListener("click", () => {
        DOM.successModal.classList.remove("open");
    });
    document.querySelector("#success-modal .modal-overlay").addEventListener("click", () => {
        DOM.successModal.classList.remove("open");
    });
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    initDatabase();
    initTheme();
    setupEventListeners();
    checkSession();
});
