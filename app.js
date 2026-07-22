/* ==========================================================================
   APP STATE & INITIALIZATION
   ========================================================================== */
const SUPABASE_URL = 'https://pioeppwgetbxgiuzcfjs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_LZ48twcMeVYZ94wil5JGjg_12gkvl9U';
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
const DEFAULT_MENU_ITEMS = [
    {
        id: "item_1",
        name: {
            ar: "فطير مشلتت سادة",
            en: "Plain Feteer Meshaltet"
        },
        description: {
            ar: "فطير مشلتت فلاحي مورق بالسمن البلدي الصافي، يخبز في فرن حجري تقليدي على طريقة أجدادنا.",
            en: "Traditional rural Egyptian flaky pastry made with pure local ghee, baked in a stone oven."
        },
        price: 85,
        category: "Meals",
        image: "assets/feteer_plain.jpg",
        status: "in-stock"
    },
    {
        id: "item_2",
        name: {
            ar: "فطير مشلتت بالعسل والقشطة",
            en: "Feteer with Honey & Cream"
        },
        description: {
            ar: "فطيرة مشلتت ساخنة مغطاة بطبقة من القشطة الفلاحي الطازجة والعسل الأبيض أو العسل الأسود حسب اختيارك.",
            en: "Hot feteer meshaltet served with fresh rural clotted cream (qashta), white honey, and black molasses."
        },
        price: 110,
        category: "Desserts",
        image: "assets/feteer_honey.jpg",
        status: "in-stock"
    },
    {
        id: "item_3",
        name: {
            ar: "حواوشي بلدي عم شلتت",
            en: "Om Shaltet Baladi Hawawshi"
        },
        description: {
            ar: "خبز بلدي طازج محشو باللحم البلدي المفروم والمتبل بخلطة بهارات عم شلتت السرية، يخبز حتى القرمشة.",
            en: "Fresh local bread stuffed with minced beef seasoned with Om Shaltet's secret spices, baked until crispy."
        },
        price: 65,
        category: "Sandwiches",
        image: "assets/hawawshi.jpg",
        status: "in-stock"
    },
    {
        id: "item_4",
        name: {
            ar: "سندوتش فلافل بالخلطة الفلاحي",
            en: "Falahi Falafel Sandwich"
        },
        description: {
            ar: "فلافل ساخنة ومقرمشة مع طماطم، خيار، طحينة، وخلطة فلاحي خاصة داخل خبز بلدي ساخن.",
            en: "Crispy hot falafels with tomato, cucumber, sesame tahini, and rural dressing inside fresh flatbread."
        },
        price: 15,
        category: "Sandwiches",
        image: "https://images.unsplash.com/photo-1547058886-af77818bc7a8?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_5",
        name: {
            ar: "طاجن أم علي بالمكسرات الفاخرة",
            en: "Premium Om Ali Tagen"
        },
        description: {
            ar: "حلوى أم علي التقليدية بالرقاق والحليب الطازج والقشطة البلدي، مزينة بالفسدق، اللوز، وجوز الهند.",
            en: "Traditional dessert made of baked pastry layers, hot milk, fresh cream, topped with nuts and coconut."
        },
        price: 55,
        category: "Desserts",
        image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_6",
        name: {
            ar: "كوب شاي بالنعناع البلدي",
            en: "Baladi Mint Tea Glass"
        },
        description: {
            ar: "شاي أحمر كشري مخمر بعناية مع أوراق النعناع البلدي الطازج والمنعش.",
            en: "Rich red tea brewed with fresh green local mint leaves."
        },
        price: 12,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_7",
        name: {
            ar: "عصير ليمون بالنعناع فريش",
            en: "Fresh Lemon Mint Juice"
        },
        description: {
            ar: "عصير ليمون طازج ومثلج ممزوج بقطع النعناع الأخضر المنعش، مثالي لأيام الصيف.",
            en: "Iced freshly squeezed lemonade blended with green mint leaves, ideal for hot days."
        },
        price: 25,
        category: "Drinks",
        image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_8",
        name: {
            ar: "طبق بطاطس فلاحي محمرة",
            en: "Falahi French Fries Plate"
        },
        description: {
            ar: "بطاطس ذهبية مقرمشة ومتبلة بملح وكمون، تقدم ساخنة مع الكاتشب.",
            en: "Crispy golden rustic fries seasoned with salt and cumin, served hot with ketchup."
        },
        price: 20,
        category: "Extras",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80",
        status: "in-stock"
    },
    {
        id: "item_9",
        name: {
            ar: "عسل أسود بالطحينة وجبنة قديمة",
            en: "Black Molasses, Tahini & Mesh Old Cheese"
        },
        description: {
            ar: "طبق مشكل فلاحي يضم جبنة قديمة بالطماطم وزيت الزيتون، وعسل أسود ممزوج بالطحينة السمسم.",
            en: "A rural platter containing old mesh cheese with tomatoes and olive oil, and black molasses with sesame tahini."
        },
        price: 35,
        category: "Extras",
        image: "assets/honey_cheese.jpg",
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
    currentTheme: "light-mode",
    language: "ar",
    deliveryType: "delivery", // 'delivery' or 'pickup'
    activeOrder: null,
    adminSubView: "menu", // 'menu' or 'orders'
    adminOrdersFilter: "all",
    adminOrdersSearch: ""
};

// Seed & Init Database
async function initDatabase() {
    // Database migration/upgrade to support bilingual keys and new assets
    const dbVer = localStorage.getItem("om_shaltet_db_ver");
    if (dbVer !== "5.0") {
        localStorage.removeItem("om_shaltet_menu");
        localStorage.setItem("om_shaltet_db_ver", "5.0");
    }

    try {
        if (!supabase) throw new Error("Supabase client is not initialized.");
        // Fetch Menu from Supabase
        const { data: menuData, error: menuError } = await supabase.from('menu_items').select('*');
        if (menuError) throw menuError;

        if (menuData && menuData.length > 0) {
            // Parse JSON fields (if any) or map them back to state format
            state.menuItems = menuData.map(item => ({
                id: item.id,
                name: { ar: item.name_ar, en: item.name_en },
                description: { ar: item.desc_ar, en: item.desc_en },
                price: parseFloat(item.price),
                oldPrice: item.old_price ? parseFloat(item.old_price) : undefined,
                isOffer: item.is_offer,
                category: item.category,
                image: item.image,
                status: item.status
            }));
        } else {
            // If Supabase is empty, insert default menu items
            const defaultRows = DEFAULT_MENU_ITEMS.map(item => ({
                id: item.id,
                name_ar: item.name.ar,
                name_en: item.name.en,
                desc_ar: item.description.ar,
                desc_en: item.description.en,
                price: item.price,
                old_price: item.oldPrice || null,
                is_offer: item.isOffer || false,
                category: item.category,
                image: item.image,
                status: item.status
            }));
            const { error: insertError } = await supabase.from('menu_items').insert(defaultRows);
            if (!insertError) {
                state.menuItems = DEFAULT_MENU_ITEMS;
            } else {
                console.error("Failed to seed Supabase menu", insertError);
                state.menuItems = DEFAULT_MENU_ITEMS; // fallback
            }
        }
    } catch (err) {
        console.error("Supabase Error:", err);
        state.menuItems = DEFAULT_MENU_ITEMS; // fallback
    }

    // Load saved language
    state.language = localStorage.getItem("om_shaltet_lang") || "ar";
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
    langToggle: document.getElementById("lang-toggle"),
    langText: document.getElementById("lang-text"),
    trackOrderBtn: document.getElementById("track-order-btn"),
    
    // View containers
    authView: document.getElementById("auth-view"),
    customerView: document.getElementById("customer-view"),
    adminView: document.getElementById("admin-view"),
    trackOrderView: document.getElementById("track-order-view"),
    
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
    statRevenue: document.getElementById("stat-revenue"),
    
    // Cart View
    cartView: document.getElementById("cart-view"),
    cartItemsContainer: document.getElementById("cart-items-container"),
    cartSubtotal: document.getElementById("cart-subtotal"),
    cartTotal: document.getElementById("cart-total"),
    cartCheckoutBtn: document.getElementById("cart-checkout-btn"),
    
    // Floating Cart
    floatingCartFab: document.getElementById("floating-cart-fab"),
    floatingFabBadge: document.getElementById("floating-fab-badge"),
    
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
    DOM.trackOrderView.classList.add("hidden");
    DOM.trackOrderView.classList.remove("active");
    if(DOM.cartView) {
        DOM.cartView.classList.add("hidden");
        DOM.cartView.classList.remove("active");
    }

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
        DOM.trackOrderBtn.classList.add("hidden");
        DOM.langToggle.classList.remove("hidden"); // Show for auth
    } else if (viewName === "customer") {
        DOM.customerView.classList.remove("hidden");
        void DOM.customerView.offsetWidth;
        DOM.customerView.classList.add("active");
        
        // Show profile items
        DOM.userBadge.classList.remove("hidden");
        DOM.logoutBtn.classList.remove("hidden");
        DOM.cartToggle.classList.remove("hidden");
        DOM.trackOrderBtn.classList.remove("hidden");
        DOM.langToggle.classList.add("hidden"); // Hide language toggle
        
        DOM.userRoleLabel.textContent = state.language === 'en' ? "Customer" : "زبون";
        DOM.userRoleLabel.style.backgroundColor = "var(--primary-brown)";
        DOM.userEmailDisplay.textContent = state.currentUser ? state.currentUser.email : (state.language === 'en' ? "Guest" : "زائر");
        
        renderCustomerMenu();
    } else if (viewName === "admin") {
        DOM.adminView.classList.remove("hidden");
        void DOM.adminView.offsetWidth;
        DOM.adminView.classList.add("active");
        
        // Show profile items, hide cart
        DOM.userBadge.classList.remove("hidden");
        DOM.logoutBtn.classList.remove("hidden");
        DOM.cartToggle.classList.add("hidden");
        DOM.trackOrderBtn.classList.add("hidden");
        DOM.langToggle.classList.add("hidden"); // Hide language toggle
        
        DOM.userRoleLabel.textContent = state.language === 'en' ? "Admin" : "مشرف النظام";
        DOM.userRoleLabel.style.backgroundColor = "var(--success-color)";
        DOM.userEmailDisplay.textContent = state.currentUser ? state.currentUser.email : (state.language === 'en' ? "Admin" : "مدير");
        
        renderAdminDashboard();
    } else if (viewName === "track-order") {
        DOM.trackOrderView.classList.remove("hidden");
        void DOM.trackOrderView.offsetWidth;
        DOM.trackOrderView.classList.add("active");
        
        DOM.userBadge.classList.remove("hidden");
        DOM.logoutBtn.classList.remove("hidden");
        DOM.cartToggle.classList.add("hidden");
        DOM.trackOrderBtn.classList.add("hidden");
        DOM.langToggle.classList.add("hidden"); // Hide language toggle
        
        renderTrackOrder();
    } else if (viewName === "cart") {
        if(DOM.cartView) {
            DOM.cartView.classList.remove("hidden");
            void DOM.cartView.offsetWidth;
            DOM.cartView.classList.add("active");
        }
        
        DOM.userBadge.classList.remove("hidden");
        DOM.logoutBtn.classList.remove("hidden");
        DOM.cartToggle.classList.add("hidden");
        DOM.trackOrderBtn.classList.remove("hidden");
        DOM.langToggle.classList.add("hidden");
        
        updateCartUI();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Authentication Check on startup
function checkSession() {
    const session = sessionStorage.getItem("om_shaltet_session");
    
    // Inject "فطيرة العربي" offer if it doesn't exist
    const hasOffer = state.menuItems.some(i => i.id === "item_offer_1");
    if (!hasOffer) {
        state.menuItems.unshift({
            id: "item_offer_1",
            name: {
                ar: "فطيرة العربي",
                en: "Al-Arabi Feteer"
            },
            description: {
                ar: "فطيرة العربي الأصلية الغنية بالمكونات الطازجة وحشوة مميزة جداً.",
                en: "The original Al-Arabi Feteer rich in fresh ingredients and special stuffing."
            },
            price: 120,
            oldPrice: 150,
            isOffer: true,
            category: "Meals",
            image: "assets/feteer_honey.jpg",
            status: "in-stock"
        });
        localStorage.setItem("om_shaltet_menu", JSON.stringify(state.menuItems));
    }
    
    if (session) {
        try {
            state.currentUser = JSON.parse(session);
            if (state.currentUser.role === "admin") {
                navigateTo("admin");
            } else {
                navigateTo("customer");
            }
        } catch (e) {
            console.error("Failed to parse session:", e);
            sessionStorage.removeItem("om_shaltet_session");
            navigateTo("auth");
        }
    } else {
        navigateTo("auth");
    }
}

/* ==========================================================================
   AUTHENTICATION LOGIC (LOGIN / SIGNUP)
   ========================================================================== */
async function handleLogin(email, password) {
    try {
        if (!supabase) throw new Error("Supabase client is not initialized.");
        
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .or(`email.ilike."${email}",phone.eq."${email}"`)
            .eq('password', password)
            .single();
            
        if (error || !data) {
            showToast("البريد الإلكتروني أو كلمة المرور غير صحيحة!", "error");
            return;
        }
        
        state.currentUser = { email: data.email, phone: data.phone, role: data.role, name: data.name };
        
        // Save session
        if (document.getElementById("remember-me").checked) {
            localStorage.setItem("om_shaltet_remember", JSON.stringify(state.currentUser));
        }
        sessionStorage.setItem("om_shaltet_session", JSON.stringify(state.currentUser));
        
        showToast("تم تسجيل الدخول بنجاح! أهلاً بك.", "success");
        
        // Route appropriately
        setTimeout(() => {
            if (data.role === "admin") {
                navigateTo("admin");
            } else {
                navigateTo("customer");
            }
        }, 600);
    } catch (err) {
        console.error(err);
        showToast("حدث خطأ أثناء تسجيل الدخول!", "error");
    }
}

async function handleSignup(email, password, role, mobile, address, dob) {
    try {
        if (!supabase) throw new Error("Supabase client is not initialized.");
        
        // Check if email or phone already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .or(`email.ilike."${email}",phone.eq."${mobile}"`)
            .maybeSingle();
            
        if (existingUser) {
            showToast("هذا البريد الإلكتروني أو رقم الهاتف مسجل بالفعل!", "error");
            return;
        }
        
        const { data, error } = await supabase
            .from('users')
            .insert([{
                email: email,
                password: password,
                role: role,
                phone: mobile,
                name: email.split('@')[0]
            }])
            .select()
            .single();
            
        if (error) throw error;
        
        // Login directly
        state.currentUser = { email: data.email, phone: data.phone, role: data.role, name: data.name };
        sessionStorage.setItem("om_shaltet_session", JSON.stringify(state.currentUser));
        
        showToast("تم إنشاء الحساب بنجاح! أهلاً بك.", "success");
        
        setTimeout(() => {
            if (data.role === "admin") {
                navigateTo("admin");
            } else {
                navigateTo("customer");
            }
        }, 600);
    } catch (err) {
        console.error(err);
        showToast("حدث خطأ أثناء إنشاء الحساب!", "error");
    }
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
            (item.name[state.language] || "").toLowerCase().includes(query) || 
            (item.description[state.language] || "").toLowerCase().includes(query)
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
        filtered.sort((a, b) => (a.name[state.language] || "").localeCompare(b.name[state.language] || "", state.language));
    }

    // Split into offers and regular items
    const offers = filtered.filter(item => item.isOffer);
    const regularItems = filtered.filter(item => !item.isOffer);
    
    // Helper to create card HTML
    const createCard = (item, isOfferItem) => {
        const card = document.createElement("div");
        card.className = "food-card fade-in";
        if (isOfferItem) card.classList.add("offer-card");
        
        const isOutOfStock = item.status === "out-of-stock";
        const badgeHTML = isOutOfStock 
            ? `<span class="status-badge out-of-stock">غير متوفر</span>` 
            : `<span class="status-badge">متوفر</span>`;
        
        const catArabic = translateCategory(item.category);
        
        const priceHTML = (isOfferItem && item.oldPrice) 
            ? `<span class="old-price">${item.oldPrice} ج.م</span> <span class="food-card-price offer-price">${item.price} ج.م</span>`
            : `<span class="food-card-price">${item.price} ج.م</span>`;

        card.innerHTML = `
            ${isOfferItem ? '<div class="offer-badge">عرض خاص 🔥</div>' : ''}
            <div class="food-card-img-wrapper">
                <img src="${item.image}" alt="${item.name[state.language]}" class="food-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'">
                <span class="category-tag">${catArabic}</span>
                ${badgeHTML}
            </div>
            <div class="food-card-info">
                <div class="food-card-title-row">
                    <h3 class="food-card-title">${item.name[state.language]}</h3>
                    <div class="price-container">${priceHTML}</div>
                </div>
                <p class="food-card-desc">${item.description[state.language]}</p>
                <div class="food-card-actions">
                    <button class="btn btn-primary btn-block btn-animate add-to-cart-btn" data-id="${item.id}" ${isOutOfStock ? 'disabled' : ''}>
                        <i class="fa-solid fa-cart-plus"></i>
                        <span>${isOutOfStock ? (state.language === 'en' ? 'Out of Stock' : 'غير متوفر حالياً') : (state.language === 'en' ? 'Add to Cart' : 'أضف إلى السلة')}</span>
                    </button>
                </div>
            </div>
        `;
        return card;
    };

    // Combine offers first, then regular items
    const allItems = [...offers, ...regularItems];

    // Render Items
    DOM.customerMenuGrid.innerHTML = "";
    if (allItems.length === 0) {
        DOM.customerNoResults.classList.remove("hidden");
    } else {
        DOM.customerNoResults.classList.add("hidden");
        allItems.forEach(item => {
            DOM.customerMenuGrid.appendChild(createCard(item, item.isOffer));
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
            (item.name[state.language] || "").toLowerCase().includes(query) || 
            (item.description[state.language] || "").toLowerCase().includes(query)
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
    
    // Revenue calculation
    let orders = [];
    try {
        orders = JSON.parse(localStorage.getItem("om_shaltet_orders")) || [];
    } catch (e) {
        console.error("Failed to parse local orders:", e);
    }
    let revenue = 0;
    orders.forEach(order => {
        if (order.status === 'completed') {
            order.items.forEach(entry => {
                revenue += (entry.item.price * entry.quantity);
            });
        }
    });
    
    DOM.statTotalItems.textContent = totalItems;
    DOM.statOutOfStock.textContent = outOfStock;
    DOM.statCategories.textContent = categoriesSet.size;
    if (DOM.statRevenue) DOM.statRevenue.textContent = revenue.toFixed(2) + " ج.م";

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
                    <img src="${item.image}" alt="${item.name[state.language]}" class="food-card-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'">
                    <span class="category-tag">${catArabic}</span>
                    ${badgeHTML}
                </div>
                <div class="food-card-info">
                    <div class="food-card-title-row">
                        <h3 class="food-card-title">${item.name[state.language]}</h3>
                        <span class="food-card-price">${item.price} ج.م</span>
                    </div>
                    <p class="food-card-desc">${item.description[state.language]}</p>
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
        DOM.modalItemName.value = item.name.ar || item.name; // Use AR temporarily for edit
        DOM.modalItemPrice.value = item.price;
        DOM.modalItemCategory.value = item.category;
        DOM.modalItemStatus.value = item.status;
        DOM.modalItemDesc.value = item.description.ar || item.description;
        
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
    const nameText = DOM.modalItemName.value.trim();
    const price = parseFloat(DOM.modalItemPrice.value);
    const category = DOM.modalItemCategory.value;
    const status = DOM.modalItemStatus.value;
    const descriptionText = DOM.modalItemDesc.value.trim();
    
    let image = DOM.modalItemImageSelect.value;
    if (image === "custom") {
        image = DOM.modalItemImageCustom.value.trim() || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
    }
    
    // Convert back to bilingual object
    const name = { ar: nameText, en: nameText };
    const description = { ar: descriptionText, en: descriptionText };
    
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

function addToCart(itemId) {
    const item = state.menuItems.find(i => i.id === itemId);
    if (!item || item.status === "out-of-stock") return;
    
    const existingIndex = state.cart.findIndex(entry => entry.item.id === itemId);
    if (existingIndex !== -1) {
        state.cart[existingIndex].quantity += 1;
    } else {
        state.cart.push({ item, quantity: 1 });
    }
    
    state.lastAddedItemId = itemId;
    
    updateCartUI();
    const itemName = (item.name && item.name[state.language]) || item.name.ar || item.name;
    showToast(`تمت إضافة "${itemName}" إلى السلة!`, "success");
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
            
            const itemName = (entry.item.name && entry.item.name[state.language]) || entry.item.name.ar || entry.item.name;
            const cartItemDiv = document.createElement("div");
            cartItemDiv.className = "cart-item fade-in";
            cartItemDiv.innerHTML = `
                <img src="${entry.item.image}" alt="${itemName}" class="cart-item-img" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'">
                <div class="cart-item-details">
                    <div class="cart-item-name">${itemName}</div>
                    <div class="cart-item-price">${itemCost} ج.م</div>
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
    
    updateFloatingCart(totalQty);
}

function updateFloatingCart(totalQty) {
    if (!DOM.floatingCartFab) return;
    
    if (totalQty === 0) {
        DOM.floatingCartFab.classList.remove("visible");
        return;
    }
    
    DOM.floatingFabBadge.textContent = totalQty;
    DOM.floatingCartFab.classList.add("visible");
}

async function handleCheckout() {
    if (state.cart.length === 0) return;
    
    const isDelivery = document.querySelector('input[name="delivery-type"][value="delivery"]').checked;
    const location = isDelivery ? document.getElementById("cart-delivery-address").value.trim() : document.getElementById("cart-pickup-branch").value;
    
    if (isDelivery && !location) {
        showToast("برجاء إدخال عنوان التوصيل!", "error");
        return;
    }
    
    // Show success modal
    const randomOrderId = "#" + Math.floor(1000 + Math.random() * 9000);
    DOM.orderIdNum.textContent = randomOrderId;
    
    const newOrder = {
        id: randomOrderId,
        user_phone: state.currentUser ? state.currentUser.phone : 'زائر',
        items: state.cart,
        total: state.cart.reduce((sum, entry) => sum + (entry.item.price * entry.quantity), 0),
        status: 'pending',
        delivery_type: isDelivery ? 'delivery' : 'pickup',
        address: location
    };
    
    try {
        if (!supabase) throw new Error("Supabase client is not initialized.");
        
        const { error } = await supabase.from('orders').insert([newOrder]);
        if (error) throw error;
        
        state.activeOrder = newOrder;
        DOM.successModal.classList.add("open");
        
        // Clear cart
        state.cart = [];
        updateCartUI();
    } catch (err) {
        console.error(err);
        showToast("حدث خطأ أثناء إتمام الطلب!", "error");
    }
}

/* ==========================================================================
   TRACK ORDER & ADMIN ORDERS
   ========================================================================== */
async function renderTrackOrder() {
    try {
        let activeOrder = state.activeOrder;
        
        // If no active order in memory, try fetching latest order for current user
        if (!activeOrder && state.currentUser) {
            if (supabase) {
                const { data, error } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('user_phone', state.currentUser.phone)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .maybeSingle();
                    
                if (data) {
                    activeOrder = data;
                    state.activeOrder = activeOrder;
                }
            }
        }
        
        if (!activeOrder) {
            document.getElementById("active-order-tracking").classList.add("hidden");
            document.getElementById("no-active-order").classList.remove("hidden");
            return;
        }
        
        // Fetch up-to-date status
        if (supabase) {
            const { data: upToDateOrder } = await supabase
                .from('orders')
                .select('*')
                .eq('id', activeOrder.id)
                .single();
                
            if (upToDateOrder) {
                state.activeOrder = upToDateOrder;
                activeOrder = upToDateOrder;
            }
        }

        document.getElementById("active-order-tracking").classList.remove("hidden");
        document.getElementById("no-active-order").classList.add("hidden");
        
        document.getElementById("track-order-number").textContent = activeOrder.id;
        document.getElementById("track-order-type").textContent = activeOrder.delivery_type === 'delivery' ? (state.language === 'en' ? 'Delivery' : 'توصيل') : (state.language === 'en' ? 'Branch Pickup' : 'استلام من الفرع');
        document.getElementById("track-order-time").textContent = new Date(activeOrder.created_at || new Date()).toLocaleTimeString();
        document.getElementById("track-location-text").textContent = activeOrder.address || activeOrder.delivery_type;
        
        const stepPrep = document.getElementById("step-preparing");
        const stepTransit = document.getElementById("step-transit");
        const stepCompleted = document.getElementById("step-completed");
        const fill = document.getElementById("track-progress-fill");
        
        stepPrep.classList.remove("active");
        stepTransit.classList.remove("active");
        stepCompleted.classList.remove("active");
        
        if (activeOrder.status === 'pending' || activeOrder.status === 'preparing') {
            stepPrep.classList.add("active");
            fill.style.width = '33%';
            document.getElementById("track-countdown").textContent = "20:00";
        } else if (activeOrder.status === 'ready') {
            stepPrep.classList.add("active");
            stepTransit.classList.add("active");
            fill.style.width = '66%';
            document.getElementById("track-countdown").textContent = "10:00";
        } else {
            stepPrep.classList.add("active");
            stepTransit.classList.add("active");
            stepCompleted.classList.add("active");
            fill.style.width = '100%';
            document.getElementById("track-countdown").textContent = "00:00";
        }
        
        const list = document.getElementById("track-items-list");
        list.innerHTML = "";
        let total = 0;
        const items = Array.isArray(activeOrder.items) ? activeOrder.items : JSON.parse(activeOrder.items || "[]");
        items.forEach(entry => {
            total += entry.item.price * entry.quantity;
            const itemName = (entry.item.name && entry.item.name[state.language]) || entry.item.name.ar || entry.item.name;
            list.innerHTML += `<div>${entry.quantity}x ${itemName} - ${entry.item.price} ج.م</div>`;
        });
        document.getElementById("track-total-price").textContent = total.toFixed(2) + " ج.م";
    } catch (err) {
        console.error(err);
    }
}

async function renderAdminOrders() {
    try {
        if (!supabase) throw new Error("Supabase client is not initialized.");
        
        let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
        
        if (state.adminOrdersFilter !== "all") {
            query = query.eq('status', state.adminOrdersFilter);
        }
        
        if (state.adminOrdersSearch.trim() !== "") {
            const searchTerm = `%${state.adminOrdersSearch.trim()}%`;
            query = query.or(`id.ilike.${searchTerm},user_phone.ilike.${searchTerm}`);
        }
        
        const { data: orders, error } = await query;
        if (error) throw error;
        
        const { count: pendingCount, error: countError } = await supabase
            .from('orders')
            .select('*', { count: 'exact', head: true })
            .neq('status', 'completed');
            
        const badge = document.getElementById("admin-orders-badge");
        if (!countError && pendingCount > 0) {
            badge.textContent = pendingCount;
            badge.classList.remove("hidden");
        } else {
            badge.classList.add("hidden");
        }
        
        const grid = document.getElementById("admin-orders-list-grid");
        const noResults = document.getElementById("admin-orders-no-results");
        
        grid.innerHTML = "";
        if (!orders || orders.length === 0) {
            noResults.classList.remove("hidden");
        } else {
            noResults.classList.add("hidden");
            
            orders.forEach(order => {
                const card = document.createElement("div");
                card.className = "food-card fade-in";
                card.style.display = "flex";
                card.style.flexDirection = "column";
                card.style.padding = "16px";
                card.style.gap = "12px";
                
                const items = Array.isArray(order.items) ? order.items : JSON.parse(order.items || "[]");
                const total = items.reduce((sum, entry) => sum + (entry.item.price * entry.quantity), 0);
                
                card.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--primary-border); padding-bottom: 8px;">
                        <h3 style="margin: 0;">${order.id}</h3>
                        <span class="status-badge" style="background-color: ${order.status === 'completed' ? 'var(--success-color)' : 'var(--primary-color)'}; color: white;">${order.status}</span>
                    </div>
                    <div style="font-size: 0.9rem;">
                        <strong>${state.language === 'en' ? 'Customer:' : 'الزبون:'}</strong> ${order.user_phone}<br>
                        <strong>${state.language === 'en' ? 'Type:' : 'النوع:'}</strong> ${order.delivery_type === 'delivery' ? 'توصيل' : 'استلام'}<br>
                        <strong>${state.language === 'en' ? 'Location:' : 'العنوان:'}</strong> ${order.address || order.delivery_type}
                    </div>
                    <div style="font-size: 0.85rem; max-height: 80px; overflow-y: auto;">
                        ${items.map(entry => {
                            const itemName = (entry.item.name && entry.item.name[state.language]) || entry.item.name.ar || entry.item.name;
                            return `${entry.quantity}x ${itemName}`;
                        }).join('<br>')}
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 600; margin-top: auto;">
                        <span>${total.toFixed(2)} ج.م</span>
                        <select class="admin-order-status-select" data-id="${order.id}" style="padding: 4px; border-radius: 4px; border: 1px solid var(--primary-border);">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>${state.language === 'en' ? 'Pending' : 'قيد الانتظار'}</option>
                            <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>${state.language === 'en' ? 'Preparing' : 'قيد التحضير'}</option>
                            <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>${state.language === 'en' ? 'Ready' : 'جاهز'}</option>
                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>${state.language === 'en' ? 'Completed' : 'تم التسليم'}</option>
                        </select>
                    </div>
                `;
                grid.appendChild(card);
            });
        }
    } catch (err) {
        console.error(err);
    }
}

// Auto-refresh tracker/orders if they are visible
setInterval(() => {
    if (DOM.trackOrderView && DOM.trackOrderView.classList.contains("active")) {
        renderTrackOrder();
    }
    if (DOM.adminView && DOM.adminView.classList.contains("active") && state.adminSubView === 'orders') {
        renderAdminOrders();
    }
}, 5000);

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
   LANGUAGE TOGGLER
   ========================================================================== */
function initLanguage() {
    const savedLang = localStorage.getItem("om_shaltet_lang") || "ar";
    setLanguage(savedLang);
}

function setLanguage(lang) {
    state.language = lang;
    localStorage.setItem("om_shaltet_lang", lang);
    
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    
    if (lang === 'en') {
        DOM.langText.textContent = 'AR';
        document.title = "Om Shaltet - Authentic Rural Food";
    } else {
        DOM.langText.textContent = 'EN';
        document.title = "مطعم عم شلتت - الفطير والأكل الفلاحي الأصيل";
    }
    
    if (DOM.customerView.classList.contains("active")) renderCustomerMenu();
    if (DOM.adminView.classList.contains("active")) renderAdminDashboard();
    updateCartUI();
}

function toggleLanguage() {
    if (state.language === 'ar') {
        setLanguage('en');
    } else {
        setLanguage('ar');
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
    // Main Logo click
    const mainLogo = document.getElementById("main-logo");
    if (mainLogo) {
        mainLogo.addEventListener("click", () => {
            checkSession(); 
        });
    }

    // Cart View Navigation
    DOM.cartToggle.addEventListener("click", () => navigateTo("cart"));

    // Floating Cart Buttons
    if (DOM.floatingCartFab) {
        DOM.floatingCartFab.addEventListener("click", () => {
            navigateTo("cart");
        });
    }

    // Theme Toggle
    DOM.themeToggle.addEventListener("click", toggleTheme);
    
    // Language Toggle
    DOM.langToggle.addEventListener("click", toggleLanguage);
    
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
        const mobile = document.getElementById("signup-mobile").value.trim();
        const address = document.getElementById("signup-address").value.trim();
        const dob = document.getElementById("signup-dob").value;
        
        if (password !== confirmPass) {
            showToast("كلمتا المرور غير متطابقتين!", "error");
            return;
        }
        
        const role = isAdmin ? "admin" : "user";
        handleSignup(email, password, role, mobile, address, dob);
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
    
    // Cart Drawer Toggle Actions (Removed for Full Page Cart)
    
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
        navigateTo("track-order");
    });
    document.querySelector("#success-modal .modal-overlay").addEventListener("click", () => {
        DOM.successModal.classList.remove("open");
        navigateTo("track-order");
    });
    
    // Delivery Type switch
    const homeBtn = document.getElementById("delivery-type-home");
    const branchBtn = document.getElementById("delivery-type-branch");
    if (homeBtn && branchBtn) {
        homeBtn.addEventListener("click", () => {
            document.getElementById("delivery-address-group").classList.remove("hidden");
            document.getElementById("delivery-branch-group").classList.add("hidden");
            homeBtn.classList.add("active");
            branchBtn.classList.remove("active");
            homeBtn.querySelector('input').checked = true;
        });
        branchBtn.addEventListener("click", () => {
            document.getElementById("delivery-address-group").classList.add("hidden");
            document.getElementById("delivery-branch-group").classList.remove("hidden");
            homeBtn.classList.remove("active");
            branchBtn.classList.add("active");
            branchBtn.querySelector('input').checked = true;
        });
    }
    
    if (DOM.trackOrderBtn) DOM.trackOrderBtn.addEventListener("click", () => navigateTo("track-order"));
    const goBackBtn = document.getElementById("go-back-to-menu-btn");
    if (goBackBtn) goBackBtn.addEventListener("click", () => navigateTo("customer"));
    
    // Admin Subviews Tabs
    const tabMenu = document.getElementById("admin-tab-menu");
    const tabOrders = document.getElementById("admin-tab-orders");
    const mgrMenu = document.getElementById("admin-menu-manager");
    const mgrOrders = document.getElementById("admin-orders-manager");
    
    if (tabMenu && tabOrders) {
        tabMenu.addEventListener("click", () => {
            tabMenu.classList.add("active");
            tabOrders.classList.remove("active");
            mgrMenu.classList.remove("hidden");
            mgrOrders.classList.add("hidden");
            state.adminSubView = 'menu';
        });
        tabOrders.addEventListener("click", () => {
            tabOrders.classList.add("active");
            tabMenu.classList.remove("active");
            mgrOrders.classList.remove("hidden");
            mgrMenu.classList.add("hidden");
            state.adminSubView = 'orders';
            renderAdminOrders();
        });
    }
    
    // Admin Orders filters & search
    const adminOrdersSearch = document.getElementById("admin-orders-search-input");
    if (adminOrdersSearch) {
        adminOrdersSearch.addEventListener("input", (e) => {
            state.adminOrdersSearch = e.target.value;
            renderAdminOrders();
        });
    }
    
    const adminOrdersFilters = document.getElementById("admin-orders-filters");
    if (adminOrdersFilters) {
        adminOrdersFilters.addEventListener("click", (e) => {
            if (e.target.classList.contains("filter-btn")) {
                adminOrdersFilters.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
                e.target.classList.add("active");
                state.adminOrdersFilter = e.target.getAttribute("data-order-status");
                renderAdminOrders();
            }
        });
    }
    
    // Admin Order Status Update
    const adminOrdersGrid = document.getElementById("admin-orders-list-grid");
    if (adminOrdersGrid) {
        adminOrdersGrid.addEventListener("change", async (e) => {
            if (e.target.classList.contains("admin-order-status-select")) {
                const id = e.target.getAttribute("data-id");
                const status = e.target.value;
                
                try {
                    if (!supabase) throw new Error("Supabase client is not initialized.");
                    
                    const { error } = await supabase
                        .from('orders')
                        .update({ status: status })
                        .eq('id', id);
                        
                    if (error) throw error;
                    
                    showToast("تم تحديث حالة الطلب!", "success");
                    renderAdminOrders();
                } catch (err) {
                    console.error(err);
                    showToast("حدث خطأ أثناء تحديث حالة الطلب!", "error");
                }
            }
        });
    }
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
async function initApp() {
    // Initialize UI elements and event listeners immediately
    initTheme();
    initLanguage();
    setupEventListeners();
    
    // Load database and check session in the background
    try {
        await initDatabase();
        checkSession();
    } catch (err) {
        console.error("App initialization failed:", err);
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
