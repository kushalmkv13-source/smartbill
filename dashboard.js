// ============================
// PARTICLE ANIMATION
// ============================

class ParticleAnimation {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        
        this.resize();
        this.init();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 1.5 + 0.5,
                vx: Math.random() * 0.5 - 0.25,
                vy: Math.random() * 0.5 - 0.25,
                opacity: Math.random() * 0.5 + 0.1,
                maxOpacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Pulsing opacity
            particle.opacity += (Math.random() - 0.5) * 0.02;
            particle.opacity = Math.max(0.1, Math.min(particle.maxOpacity, particle.opacity));
            
            this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Connect nearby particles
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ============================
// MOUSE SPOTLIGHT
// ============================

function initMouseSpotlight() {
    const spotlight = document.querySelector('.mouse-spotlight');
    if (!spotlight) return;

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX - 150;
        const y = e.clientY - 150;
        spotlight.style.left = x + 'px';
        spotlight.style.top = y + 'px';
        spotlight.style.display = 'block';
    });

    document.addEventListener('mouseleave', () => {
        spotlight.style.display = 'none';
    });
}

// ============================
// COUNTER ANIMATION
// ============================

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                entry.target.animated = true;
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 2000;
    const start = Date.now();
    const initialValue = 0;

    const timer = setInterval(() => {
        const elapsed = Date.now() - start;
        const progress = elapsed / duration;
        
        if (progress >= 1) {
            element.textContent = target.toLocaleString('en-IN');
            clearInterval(timer);
        } else {
            const current = Math.floor(initialValue + (target - initialValue) * easeOutQuad(progress));
            element.textContent = current.toLocaleString('en-IN');
        }
    }, 16);
}

function easeOutQuad(t) {
    return t * (2 - t);
}

// ============================
// CHART INITIALIZATION
// ============================

function initCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Revenue',
                    data: [42000, 51000, 45000, 62000, 58000, 71000, 48950],
                    borderColor: '#00D4FF',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00D4FF',
                    pointBorderColor: '#12C2E9',
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBorderWidth: 2,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 20, 40, 0.95)',
                        borderColor: '#00D4FF',
                        borderWidth: 1,
                        titleColor: '#00D4FF',
                        bodyColor: '#FFFFFF',
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return '₹' + context.parsed.y.toLocaleString('en-IN');
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                            color: 'rgba(0, 212, 255, 0.1)'
                        },
                        ticks: {
                            color: '#94A3B8',
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 212, 255, 0.08)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#94A3B8',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            callback: function(value) {
                                return '₹' + (value / 1000).toFixed(0) + 'k';
                            }
                        }
                    }
                }
            }
        });
    }

    // Invoice Status Chart
    const invoiceCtx = document.getElementById('invoiceChart');
    if (invoiceCtx) {
        new Chart(invoiceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Paid', 'Pending', 'Draft', 'Cancelled'],
                datasets: [{
                    data: [120, 80, 45, 15],
                    backgroundColor: [
                        '#22C55E',
                        '#FACC15',
                        '#94A3B8',
                        '#EF4444'
                    ],
                    borderColor: 'rgba(6, 19, 38, 0.95)',
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94A3B8',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 20, 40, 0.95)',
                        borderColor: '#00D4FF',
                        borderWidth: 1,
                        titleColor: '#00D4FF',
                        bodyColor: '#FFFFFF',
                        padding: 12
                    }
                }
            }
        });
    }

    // Payment Methods Chart
    const paymentCtx = document.getElementById('paymentChart');
    if (paymentCtx) {
        new Chart(paymentCtx, {
            type: 'doughnut',
            data: {
                labels: ['UPI', 'Bank Transfer', 'Card', 'Cash'],
                datasets: [{
                    data: [45, 30, 18, 7],
                    backgroundColor: [
                        '#00D4FF',
                        '#12C2E9',
                        '#FF6B6B',
                        '#FFA500'
                    ],
                    borderColor: 'rgba(6, 19, 38, 0.95)',
                    borderWidth: 2,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#94A3B8',
                            font: {
                                size: 12,
                                weight: '500'
                            },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(10, 20, 40, 0.95)',
                        borderColor: '#12C2E9',
                        borderWidth: 1,
                        titleColor: '#12C2E9',
                        bodyColor: '#FFFFFF',
                        padding: 12
                    }
                }
            }
        });
    }
}

// ============================
// SIDEBAR MENU INTERACTION
// ============================

function initSidebarMenu() {

    const menuItems = document.querySelectorAll(".menu-item");

    menuItems.forEach(item => {

        item.addEventListener("click", function(e) {

            const href = this.getAttribute("href");

            // Allow navigation to HTML pages
            if (href && href !== "#") {
                return;
            }

            e.preventDefault();

            menuItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active");

        });

    });

}

// ============================
// NOTIFICATION PANEL
// ============================

function initNotificationPanel() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationPanel = document.querySelector('.notification-panel');
    const closeBtn = document.querySelector('.close-notification');

    if (notificationBtn && notificationPanel) {
        notificationBtn.addEventListener('click', () => {
            notificationPanel.classList.toggle('open');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notificationPanel.classList.remove('open');
            });
        }

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationPanel.contains(e.target) && e.target !== notificationBtn) {
                notificationPanel.classList.remove('open');
            }
        });
    }
}

// ============================
// DARK MODE TOGGLE
// ============================

function initDarkModeToggle() {
    const darkModeBtn = document.querySelector('.dark-mode-toggle');
    
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });

        // Restore dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
}

// ============================
// RESPONSIVE SIDEBAR
// ============================

function initResponsiveSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close sidebar when menu item is clicked on mobile
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    sidebar.classList.remove('open');
                }
            });
        });
    }
}

// ============================
// BUTTON INTERACTIONS
// ============================

function initButtonInteractions() {
    const actionButtons = document.querySelectorAll('.btn-action, .btn-new-invoice, .action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // New Invoice button click
    const newInvoiceBtn = document.querySelector('.btn-new-invoice');
    if (newInvoiceBtn) {
        newInvoiceBtn.addEventListener('click', () => {
            showNotification('Invoice creation feature coming soon!', 'info');
        });
    }

    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                showNotification('Logged out successfully', 'success');
            }
        });
    }
}

// ============================
// NOTIFICATION SYSTEM
// ============================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 24px;
        background: rgba(10, 20, 40, 0.95);
        border: 1px solid var(--border-color);
        color: #FFFFFF;
        padding: 16px 20px;
        border-radius: 12px;
        font-size: 14px;
        z-index: 2000;
        animation: slideUp 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================
// CHART PERIOD FILTER
// ============================

function initChartFilters() {
    const chartPeriods = document.querySelectorAll('.chart-period');
    
    chartPeriods.forEach(period => {
        period.addEventListener('click', (e) => {
            const container = e.target.closest('.chart-header');
            const allPeriods = container.querySelectorAll('.chart-period');
            
            allPeriods.forEach(p => p.classList.remove('active'));
            e.target.classList.add('active');
            
            showNotification(`Chart updated for ${e.target.textContent}`, 'info');
        });
    });
}

// ============================
// REFRESH BUTTON
// ============================

function initRefreshButton() {
    const refreshBtn = document.querySelector('.refresh-btn');
    
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.style.animation = 'none';
            setTimeout(() => {
                refreshBtn.style.animation = 'refresh 1s ease-in-out';
            }, 10);
            
            showNotification('Insights refreshed!', 'success');
        });
    }
}

// ============================
// TABLE INTERACTIONS
// ============================

function initTableInteractions() {
    const actionBtns = document.querySelectorAll('.action-btn');
    
    actionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const menu = btn.closest('.action-menu');
            menu.classList.toggle('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.action-menu')) {
            document.querySelectorAll('.action-menu.active').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });

    // Hover effect on rows
    const invoiceRows = document.querySelectorAll('.invoice-table tbody tr');
    invoiceRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.background = 'rgba(0, 212, 255, 0.08)';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.background = '';
        });
    });
}

// ============================
// SMOOTH SCROLL
// ============================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================
// PAGE LOAD ANIMATIONS
// ============================

function initPageLoadAnimations() {
    // Fade in dashboard on load
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer) {
        dashboardContainer.style.animation = 'fadeIn 0.6s ease-out';
    }

    // Stagger animate stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideUp 0.5s ease-out ${index * 0.1}s forwards`;
    });
}

// ============================
// SEARCH FUNCTIONALITY
// ============================

function initSearch() {
    const searchInput = document.querySelector('.search-container input');
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm.length > 0) {
                showNotification(`Searching for "${searchTerm}"...`, 'info');
            }
        });
    }
}

// ============================
// RESPONSIVE ADJUSTMENTS
// ============================

function handleResponsive() {
    const mql = window.matchMedia('(max-width: 768px)');
    
    function handleMediaChange(e) {
        if (e.matches) {
            // Mobile view
            document.body.classList.add('mobile-view');
        } else {
            // Desktop view
            document.body.classList.remove('mobile-view');
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.remove('open');
            }
        }
    }

    mql.addListener(handleMediaChange);
    handleMediaChange(mql);
}

// ============================
// KEYBOARD SHORTCUTS
// ============================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Cmd/Ctrl + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-container input');
            if (searchInput) {
                searchInput.focus();
            }
        }

        // Escape key to close panels
        if (e.key === 'Escape') {
            const notificationPanel = document.querySelector('.notification-panel');
            if (notificationPanel) {
                notificationPanel.classList.remove('open');
            }
        }
    });
}

// ============================
// INITIALIZE ALL
// ============================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle animation
    new ParticleAnimation('particleCanvas');

    // Initialize mouse spotlight
    initMouseSpotlight();

    // Initialize counters
    animateCounters();

    // Initialize charts
    setTimeout(() => {
        initCharts();
    }, 100);

    // Initialize sidebar menu
    initSidebarMenu();

    // Initialize notification panel
    initNotificationPanel();

    // Initialize dark mode
    initDarkModeToggle();

    // Initialize responsive sidebar
    initResponsiveSidebar();

    // Initialize button interactions
    initButtonInteractions();

    // Initialize chart filters
    initChartFilters();

    // Initialize refresh button
    initRefreshButton();

    // Initialize table interactions
    initTableInteractions();

    // Initialize smooth scroll
    initSmoothScroll();

    // Initialize page load animations
    initPageLoadAnimations();

    // Initialize search
    initSearch();

    // Handle responsive
    handleResponsive();

    // Initialize keyboard shortcuts
    initKeyboardShortcuts();

    console.log('✨ InvoiceHub Dashboard initialized successfully!');
});

// ============================
// UTILITY FUNCTIONS
// ============================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Get time-based greeting
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
}

// Animation helper
function addAnimation(element, animationName, duration = 0.5) {
    element.style.animation = `${animationName} ${duration}s ease-out`;
    element.addEventListener('animationend', () => {
        element.style.animation = '';
    });
}

// Additional CSS animations for JS
const style = document.createElement('style');
style.textContent = `
    @keyframes refresh {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
        }
    }

    .stat-card {
        animation-fill-mode: both;
    }
`;
document.head.appendChild(style);

// Log initialization
console.log('📊 InvoiceHub - Premium Dashboard Ready');
function logout(){

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");

    window.location.href="login.html";

}