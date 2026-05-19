// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = this.querySelector('input[placeholder="Your Name"]').value;
        const email = this.querySelector('input[placeholder="Your Email"]').value;
        const message = this.querySelector('textarea').value;

        // Simple validation
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        // Here you would typically send this to a backend service
        // For now, we'll just show a success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');

        // Reset form
        this.reset();
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles to notification if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 5px;
                color: white;
                font-weight: 500;
                animation: slideIn 0.3s ease-out;
                z-index: 10000;
            }

            .notification.success {
                background-color: #10b981;
            }

            .notification.error {
                background-color: #ef4444;
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    left: 10px;
                    right: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and skill categories
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Add active link styling to CSS dynamically if not present
if (!document.getElementById('active-link-styles')) {
    const style = document.createElement('style');
    style.id = 'active-link-styles';
    style.innerHTML = `
        .nav-link.active {
            color: var(--accent);
        }

        .nav-link.active::after {
            width: 100%;
            background-color: var(--accent);
        }
    `;
    document.head.appendChild(style);
}

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            entry.target.dataset.animated = 'true';
            const targetValue = parseInt(entry.target.textContent);
            animateCounter(entry.target, targetValue, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card h3').forEach(statCard => {
    statsObserver.observe(statCard);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNavLink();
});

// Add hover effect for project links
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// Dashboard Modal Functionality
const modal = document.getElementById('dashboardModal');
const closeModalBtn = document.querySelector('.close-modal');

// Close modal when clicking the X button
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// View dashboard functionality
document.querySelectorAll('.view-dashboard').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = link.closest('.project-card').getAttribute('data-project');
        showDashboard(projectId);
    });
});

function showDashboard(projectId) {
    const dashboardContainer = document.getElementById('dashboardContainer');
    const modalTitle = document.getElementById('modalTitle');
    
    let dashboard = '';
    
    switch(projectId) {
        case 'churn':
            modalTitle.textContent = 'Customer Churn Prediction - Model Performance';
            dashboard = generateChurnDashboard();
            break;
        case 'sales':
            modalTitle.textContent = 'Sales Analytics Dashboard';
            dashboard = generateSalesDashboard();
            break;
        case 'nlp':
            modalTitle.textContent = 'NLP Text Classification - Results';
            dashboard = generateNLPDashboard();
            break;
        case 'timeseries':
            modalTitle.textContent = 'Time Series Forecasting - Predictions';
            dashboard = generateTimeSeriesDashboard();
            break;
        case 'recommendation':
            modalTitle.textContent = 'Recommendation Engine - Performance Metrics';
            dashboard = generateRecommendationDashboard();
            break;
        case 'anomaly':
            modalTitle.textContent = 'Anomaly Detection System - Results';
            dashboard = generateAnomalyDashboard();
            break;
    }
    
    dashboardContainer.innerHTML = dashboard;
    modal.classList.add('show');
}

// Dashboard Generation Functions
function generateChurnDashboard() {
    return `
        <div class="dashboard">
            <div class="dashboard-title">
                <i class="fas fa-chart-line"></i> Model Performance Metrics
            </div>
            <div class="dashboard-grid">
                <div class="kpi-card">
                    <p>Accuracy</p>
                    <h3>87%</h3>
                    <p style="font-size: 0.8rem;">✓ Above Target</p>
                </div>
                <div class="kpi-card">
                    <p>Precision</p>
                    <h3>85%</h3>
                    <p style="font-size: 0.8rem;">✓ Strong</p>
                </div>
                <div class="kpi-card">
                    <p>Recall</p>
                    <h3>84%</h3>
                    <p style="font-size: 0.8rem;">✓ Reliable</p>
                </div>
                <div class="kpi-card">
                    <p>AUC-ROC</p>
                    <h3>0.91</h3>
                    <p style="font-size: 0.8rem;">✓ Excellent</p>
                </div>
            </div>
            <div class="chart-container">
                <h3>📊 Feature Importance</h3>
                <svg viewBox="0 0 500 300" class="bar-chart">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <!-- Y axis -->
                    <line x1="50" y1="30" x2="50" y2="250" stroke="#ccc" stroke-width="2"/>
                    <!-- X axis -->
                    <line x1="50" y1="250" x2="490" y2="250" stroke="#ccc" stroke-width="2"/>
                    
                    <!-- Bars -->
                    <rect x="70" y="100" width="40" height="150" fill="url(#grad1)"/>
                    <text x="90" y="270" text-anchor="middle" font-size="12">Contract</text>
                    <text x="90" y="85" text-anchor="middle" font-size="12" font-weight="bold">0.32</text>
                    
                    <rect x="130" y="120" width="40" height="130" fill="url(#grad1)"/>
                    <text x="150" y="270" text-anchor="middle" font-size="12">Tenure</text>
                    <text x="150" y="105" text-anchor="middle" font-size="12" font-weight="bold">0.26</text>
                    
                    <rect x="190" y="140" width="40" height="110" fill="url(#grad1)"/>
                    <text x="210" y="270" text-anchor="middle" font-size="12">Monthly Bill</text>
                    <text x="210" y="125" text-anchor="middle" font-size="12" font-weight="bold">0.22</text>
                    
                    <rect x="250" y="160" width="40" height="90" fill="url(#grad1)"/>
                    <text x="270" y="270" text-anchor="middle" font-size="12">Support</text>
                    <text x="270" y="145" text-anchor="middle" font-size="12" font-weight="bold">0.18</text>
                    
                    <rect x="310" y="180" width="40" height="70" fill="url(#grad1)"/>
                    <text x="330" y="270" text-anchor="middle" font-size="12">Internet</text>
                    <text x="330" y="165" text-anchor="middle" font-size="12" font-weight="bold">0.14</text>
                </svg>
            </div>
            <div class="chart-container">
                <h3>📈 Confusion Matrix</h3>
                <svg viewBox="0 0 400 300" class="bar-chart">
                    <rect x="50" y="50" width="80" height="80" fill="#10b981" opacity="0.8"/>
                    <text x="90" y="100" text-anchor="middle" font-size="16" font-weight="bold" fill="white">True Neg</text>
                    <text x="90" y="120" text-anchor="middle" font-size="14" fill="white">8432</text>
                    
                    <rect x="180" y="50" width="80" height="80" fill="#ef4444" opacity="0.8"/>
                    <text x="220" y="100" text-anchor="middle" font-size="16" font-weight="bold" fill="white">False Pos</text>
                    <text x="220" y="120" text-anchor="middle" font-size="14" fill="white">1245</text>
                    
                    <rect x="50" y="180" width="80" height="80" fill="#ef4444" opacity="0.8"/>
                    <text x="90" y="230" text-anchor="middle" font-size="16" font-weight="bold" fill="white">False Neg</text>
                    <text x="90" y="250" text-anchor="middle" font-size="14" fill="white">892</text>
                    
                    <rect x="180" y="180" width="80" height="80" fill="#10b981" opacity="0.8"/>
                    <text x="220" y="230" text-anchor="middle" font-size="16" font-weight="bold" fill="white">True Pos</text>
                    <text x="220" y="250" text-anchor="middle" font-size="14" fill="white">5621</text>
                </svg>
            </div>
        </div>
    `;
}

function generateSalesDashboard() {
    return `
        <div class="dashboard">
            <div class="dashboard-title">
                <i class="fas fa-chart-pie"></i> Sales Performance Overview
            </div>
            <div class="dashboard-grid">
                <div class="kpi-card">
                    <p>Total Sales</p>
                    <h3>$2.5M</h3>
                    <p style="font-size: 0.8rem;">↑ 23% YoY</p>
                </div>
                <div class="kpi-card">
                    <p>Avg Order Value</p>
                    <h3>$4,250</h3>
                    <p style="font-size: 0.8rem;">↑ 12% MoM</p>
                </div>
                <div class="kpi-card">
                    <p>Conversion Rate</p>
                    <h3>3.2%</h3>
                    <p style="font-size: 0.8rem;">↑ 0.4% trend</p>
                </div>
                <div class="kpi-card">
                    <p>Customer LTV</p>
                    <h3>$18,500</h3>
                    <p style="font-size: 0.8rem;">↑ 18% improvement</p>
                </div>
            </div>
            <div class="chart-container">
                <h3>📊 Monthly Sales Trend</h3>
                <svg viewBox="0 0 500 300" class="line-chart">
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:0.3" />
                            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:0" />
                        </linearGradient>
                    </defs>
                    <!-- Grid -->
                    <line x1="50" y1="30" x2="50" y2="250" stroke="#ccc" stroke-width="2"/>
                    <line x1="50" y1="250" x2="490" y2="250" stroke="#ccc" stroke-width="2"/>
                    
                    <!-- Area -->
                    <path d="M 70 200 L 110 160 L 150 120 L 190 140 L 230 100 L 270 80 L 310 90 L 350 70 L 390 60 L 430 50 L 470 40 L 470 250 L 70 250 Z" fill="url(#grad2)"/>
                    
                    <!-- Line -->
                    <polyline points="70,200 110,160 150,120 190,140 230,100 270,80 310,90 350,70 390,60 430,50 470,40" stroke="#06b6d4" stroke-width="2" fill="none"/>
                    
                    <!-- Points -->
                    <circle cx="70" cy="200" r="4" fill="#06b6d4"/>
                    <circle cx="110" cy="160" r="4" fill="#06b6d4"/>
                    <circle cx="150" cy="120" r="4" fill="#06b6d4"/>
                    <circle cx="190" cy="140" r="4" fill="#06b6d4"/>
                    <circle cx="230" cy="100" r="4" fill="#06b6d4"/>
                    <circle cx="270" cy="80" r="4" fill="#06b6d4"/>
                    <circle cx="310" cy="90" r="4" fill="#06b6d4"/>
                    <circle cx="350" cy="70" r="4" fill="#06b6d4"/>
                    <circle cx="390" cy="60" r="4" fill="#06b6d4"/>
                    <circle cx="430" cy="50" r="4" fill="#06b6d4"/>
                    <circle cx="470" cy="40" r="4" fill="#06b6d4"/>
                    
                    <!-- Labels -->
                    <text x="70" y="270" text-anchor="middle" font-size="10">Jan</text>
                    <text x="150" y="270" text-anchor="middle" font-size="10">Mar</text>
                    <text x="230" y="270" text-anchor="middle" font-size="10">May</text>
                    <text x="310" y="270" text-anchor="middle" font-size="10">Jul</text>
                    <text x="390" y="270" text-anchor="middle" font-size="10">Sep</text>
                    <text x="470" y="270" text-anchor="middle" font-size="10">Nov</text>
                </svg>
            </div>
            <div class="chart-container">
                <h3>🎯 Sales by Region</h3>
                <svg viewBox="0 0 400 250" class="pie-chart">
                    <circle cx="100" cy="100" r="60" fill="#06b6d4" opacity="0.8"/>
                    <text x="100" y="105" text-anchor="middle" font-size="14" font-weight="bold" fill="white">North</text>
                    <text x="100" y="122" text-anchor="middle" font-size="12" fill="white">32%</text>
                    
                    <circle cx="220" cy="100" r="60" fill="#4f46e5" opacity="0.8"/>
                    <text x="220" y="105" text-anchor="middle" font-size="14" font-weight="bold" fill="white">South</text>
                    <text x="220" y="122" text-anchor="middle" font-size="12" fill="white">28%</text>
                    
                    <circle cx="160" cy="200" r="50" fill="#10b981" opacity="0.8"/>
                    <text x="160" y="203" text-anchor="middle" font-size="13" font-weight="bold" fill="white">East</text>
                    <text x="160" y="218" text-anchor="middle" font-size="11" fill="white">40%</text>
                </svg>
            </div>
        </div>
    `;
}

function generateNLPDashboard() {
    return `
        <div class="dashboard">
            <div class="dashboard-title">
                <i class="fas fa-brain"></i> NLP Classification Results
            </div>
            <div class="dashboard-grid">
                <div class="kpi-card">
                    <p>Overall Accuracy</p>
                    <h3>92%</h3>
                    <p style="font-size: 0.8rem;">✓ Excellent Performance</p>
                </div>
                <div class="kpi-card">
                    <p>Positive Sentiment</p>
                    <h3>54.2%</h3>
                    <p style="font-size: 0.8rem;">Strong user engagement</p>
                </div>
                <div class="kpi-card">
                    <p>Negative Sentiment</p>
                    <h3>18.6%</h3>
                    <p style="font-size: 0.8rem;">Low churn risk</p>
                </div>
                <div class="kpi-card">
                    <p>Neutral Sentiment</p>
                    <h3>27.2%</h3>
                    <p style="font-size: 0.8rem;">Balanced distribution</p>
                </div>
            </div>
            <div class="chart-container">
                <h3>📊 Sentiment Distribution</h3>
                <svg viewBox="0 0 500 280" class="bar-chart">
                    <defs>
                        <linearGradient id="grad3" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="grad4" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#fca5a5;stop-opacity:1" />
                        </linearGradient>
                        <linearGradient id="grad5" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#fcd34d;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <!-- Axes -->
                    <line x1="50" y1="30" x2="50" y2="220" stroke="#ccc" stroke-width="2"/>
                    <line x1="50" y1="220" x2="490" y2="220" stroke="#ccc" stroke-width="2"/>
                    
                    <!-- Bars -->
                    <rect x="120" y="60" width="60" height="160" fill="url(#grad3)"/>
                    <text x="150" y="235" text-anchor="middle" font-size="12">Positive</text>
                    <text x="150" y="50" text-anchor="middle" font-size="13" font-weight="bold">54.2%</text>
                    
                    <rect x="260" y="160" width="60" height="60" fill="url(#grad4)"/>
                    <text x="290" y="235" text-anchor="middle" font-size="12">Negative</text>
                    <text x="290" y="150" text-anchor="middle" font-size="13" font-weight="bold">18.6%</text>
                    
                    <rect x="400" y="120" width="60" height="100" fill="url(#grad5)"/>
                    <text x="430" y="235" text-anchor="middle" font-size="12">Neutral</text>
                    <text x="430" y="110" text-anchor="middle" font-size="13" font-weight="bold">27.2%</text>
                </svg>
            </div>
            <div class="chart-container">
                <h3>🎯 Model Metrics by Class</h3>
                <svg viewBox="0 0 500 200" class="bar-chart">
                    <line x1="50" y1="20" x2="50" y2="160" stroke="#ccc" stroke-width="2"/>
                    <line x1="50" y1="160" x2="490" y2="160" stroke="#ccc" stroke-width="2"/>
                    
                    <!-- Positive Class -->
                    <rect x="80" y="50" width="35" height="110" fill="#10b981"/>
                    <text x="97" y="175" text-anchor="middle" font-size="10">Pos-Pre</text>
                    <text x="97" y="42" text-anchor="middle" font-size="11" font-weight="bold">93%</text>
                    
                    <!-- Negative Class -->
                    <rect x="130" y="65" width="35" height="95" fill="#10b981"/>
                    <text x="147" y="175" text-anchor="middle" font-size="10">Neg-Pre</text>
                    <text x="147" y="57" text-anchor="middle" font-size="11" font-weight="bold">89%</text>
                    
                    <!-- Neutral Class -->
                    <rect x="180" y="72" width="35" height="88" fill="#10b981"/>
                    <text x="197" y="175" text-anchor="middle" font-size="10">Neu-Pre</text>
                    <text x="197" y="64" text-anchor="middle" font-size="11" font-weight="bold">86%</text>
                    
                    <!-- F1 Scores -->
                    <rect x="280" y="48" width="35" height="112" fill="#06b6d4"/>
                    <text x="297" y="175" text-anchor="middle" font-size="10">Pos-F1</text>
                    <text x="297" y="40" text-anchor="middle" font-size="11" font-weight="bold">92%</text>
                    
                    <rect x="330" y="62" width="35" height="98" fill="#06b6d4"/>
                    <text x="347" y="175" text-anchor="middle" font-size="10">Neg-F1</text>
                    <text x="347" y="54" text-anchor="middle" font-size="11" font-weight="bold">88%</text>
                    
                    <rect x="380" y="70" width="35" height="90" fill="#06b6d4"/>
                    <text x="397" y="175" text-anchor="middle" font-size="10">Neu-F1</text>
                    <text x="397" y="62" text-anchor="middle" font-size="11" font-weight="bold">85%</text>
                </svg>
            </div>
        </div>
    `;
}

function generateTimeSeriesDashboard() {
    return `
        <div class="dashboard">
            <div class="dashboard-title">
                <i class="fas fa-chart-line"></i> Demand Forecasting Results
            </div>
            <div class="dashboard-grid">
                <div class="kpi-card">
                    <p>MAPE (Mean Absolute)</p>
                    <h3>4.2%</h3>
                    <p style="font-size: 0.8rem;">✓ Excellent accuracy</p>
                </div>
                <div class="kpi-card">
                    <p>RMSE</p>
                    <h3>234</h3>
                    <p style="font-size: 0.8rem;">Low error margin</p>
                </div>
                <div class="kpi-card">
                    <p>Inventory Accuracy</p>
                    <h3>23%</h3>
                    <p style="font-size: 0.8rem;">Improvement achieved</p>
                </div>
                <div class="kpi-card">
                    <p>Forecast Horizon</p>
                    <h3>90 days</h3>
                    <p style="font-size: 0.8rem;">Predictive range</p>
                </div>
            </div>
            <div class="chart-container">
                <h3>📊 Actual vs Predicted Demand</h3>
                <svg viewBox="0 0 500 300" class="line-chart">
                    <!-- Grid lines -->
                    <line x1="50" y1="30" x2="50" y2="250" stroke="#e2e8f0" stroke-width="2"/>
                    <line x1="50" y1="250" x2="490" y2="250" stroke="#e2e8f0" stroke-width="2"/>
                    
                    <!-- Actual data line -->
                    <polyline points="70,180 110,160 150,140 190,150 230,130 270,120 310,135 350,125 390,110 430,115 470,100" stroke="#06b6d4" stroke-width="2.5" fill="none"/>
                    
                    <!-- Predicted data line -->
                    <polyline points="70,185 110,165 150,145 190,155 230,135 270,125 310,140 350,130 390,115 430,120 470,105" stroke="#10b981" stroke-width="2.5" fill="none" stroke-dasharray="5,5"/>
                    
                    <!-- Points -->
                    <circle cx="70" cy="180" r="3" fill="#06b6d4"/>
                    <circle cx="70" cy="185" r="3" fill="#10b981"/>
                    <circle cx="230" cy="130" r="3" fill="#06b6d4"/>
                    <circle cx="230" cy="135" r="3" fill="#10b981"/>
                    <circle cx="470" cy="100" r="3" fill="#06b6d4"/>
                    <circle cx="470" cy="105" r="3" fill="#10b981"/>
                    
                    <!-- Legend -->
                    <line x1="350" y1="40" x2="380" y2="40" stroke="#06b6d4" stroke-width="2"/>
                    <text x="390" y="45" font-size="12">Actual</text>
                    
                    <line x1="350" y1="60" x2="380" y2="60" stroke="#10b981" stroke-width="2" stroke-dasharray="5,5"/>
                    <text x="390" y="65" font-size="12">Predicted</text>
                </svg>
            </div>
            <div class="chart-container">
                <h3>📈 30-Day Forecast</h3>
                <svg viewBox="0 0 500 250" class="bar-chart">
                    <line x1="50" y1="20" x2="50" y2="200" stroke="#ccc" stroke-width="2"/>
                    <line x1="50" y1="200" x2="490" y2="200" stroke="#ccc" stroke-width="2"/>
                    
                    <rect x="70" y="120" width="18" height="80" fill="#06b6d4" opacity="0.7"/>
                    <rect x="92" y="110" width="18" height="90" fill="#06b6d4" opacity="0.7"/>
                    <rect x="114" y="100" width="18" height="100" fill="#06b6d4" opacity="0.7"/>
                    <rect x="136" y="95" width="18" height="105" fill="#06b6d4" opacity="0.7"/>
                    <rect x="158" y="105" width="18" height="95" fill="#06b6d4" opacity="0.7"/>
                    <rect x="180" y="115" width="18" height="85" fill="#06b6d4" opacity="0.7"/>
                    <rect x="202" y="125" width="18" height="75" fill="#06b6d4" opacity="0.7"/>
                    <rect x="224" y="135" width="18" height="65" fill="#06b6d4" opacity="0.7"/>
                    <rect x="246" y="130" width="18" height="70" fill="#06b6d4" opacity="0.7"/>
                    <rect x="268" y="120" width="18" height="80" fill="#06b6d4" opacity="0.7"/>
                    
                    <text x="145" y="220" text-anchor="middle" font-size="11">Day 1-10</text>
                    <text x="290" y="220" text-anchor="middle" font-size="11">Day 11-30</text>
                </svg>
            </div>
        </div>
    `;
}

function generateRecommendationDashboard() {
    return `
        <div class="dashboard">
            <div class="dashboard-title">
                <i class="fas fa-cogs"></i> Recommendation Engine Performance
            </div>
            <div class="dashboard-grid">
                <div class="kpi-card">
                    <p>User Engagement</p>
                    <h3>+35%</h3>
                    <p style="font-size: 0.8rem;">Uplift achieved</p>
                </div>
                <div class="kpi-card">
                    <p>Cross-sell Revenue</p>
                    <h3>+28%</h3>
                    <p style="font-size: 0.8rem;">Increase generated</p>
                </div>
                <div class="kpi-card">
                    <p>Click-through Rate</p>
                    <h3>4.8%</h3>
                    <p style="font-size: 0.8rem;">Industry avg: 2.1%</p>
                </div>
                <div class="kpi-card">
                    <p>Conversion Rate</p>
                    <h3>6.2%</h3>
                    <p style="font-size: 0.8rem;">From recommendations</p>
                </div>
            </div>
            <div class="chart-container">
                <h3>📊 Revenue Impact by Segment</h3>
                <svg viewBox="0 0 500 300" class="bar-chart">
                    <defs>
                        <linearGradient id="grad6" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#0891b2;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <line x1="50" y1="30" x2="50" y2="250" stroke="#ccc" stroke-width="2"/>
                    <line x1="50" y1="250" x2="490" y2="250" stroke="#ccc" stroke-width="2"/>
                    
                    <rect x="70" y="80" width="50" height="170" fill="url(#grad6)"/>
                    <text x="95" y="270" text-anchor="middle" font-size="11">New Users</text>
                    <text x="95" y="70" text-anchor="middle" font-size="12" font-weight="bold">$342K</text>
                    
                    <rect x="140" y="120" width="50" height="130" fill="url(#grad6)"/>
                    <text x="165" y="270" text-anchor="middle" font-size="11">Existing</text>
                    <text x="165" y="110" text-anchor="middle" font-size="12" font-weight="bold">$268K</text>
                    
                    <rect x="210" y="100" width="50" height="150" fill="url(#grad6)"/>
                    <text x="235" y="270" text-anchor="middle" font-size="11">Premium</text>
                    <text x="235" y="90" text-anchor="middle" font-size="12" font-weight="bold">$312K</text>
                    
                    <rect x="280" y="140" width="50" height="110" fill="url(#grad6)"/>
                    <text x="305" y="270" text-anchor="middle" font-size="11">Regular</text>
                    <text x="305" y="130" text-anchor="middle" font-size="12" font-weight="bold">$228K</text>
                </svg>
            </div>
            <div class="chart-container">
                <h3>🎯 Recommendation Types Distribution</h3>
                <svg viewBox="0 0 400 250" class="pie-chart">
                    <circle cx="80" cy="80" r="50" fill="#06b6d4" opacity="0.8"/>
                    <text x="80" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="white">Collab</text>
                    <text x="80" y="100" text-anchor="middle" font-size="11" fill="white">35%</text>
                    
                    <circle cx="220" cy="80" r="50" fill="#4f46e5" opacity="0.8"/>
                    <text x="220" y="85" text-anchor="middle" font-size="12" font-weight="bold" fill="white">Content</text>
                    <text x="220" y="100" text-anchor="middle" font-size="11" fill="white">38%</text>
                    
                    <circle cx="150" cy="180" r="45" fill="#10b981" opacity="0.8"/>
                    <text x="150" y="183" text-anchor="middle" font-size="12" font-weight="bold" fill="white">Hybrid</text>
                    <text x="150" y="198" text-anchor="middle" font-size="11" fill="white">27%</text>
                </svg>
            </div>
        </div>
    `;
}

function generateAnomalyDashboard() {
    return `
        <div class="dashboard">
            <div class="dashboard-title">
                <i class="fas fa-network-wired"></i> Anomaly Detection System
            </div>
            <div class="dashboard-grid">
                <div class="kpi-card">
                    <p>Detection Rate</p>
                    <h3>96.3%</h3>
                    <p style="font-size: 0.8rem;">True positives</p>
                </div>
                <div class="kpi-card">
                    <p>False Positive Rate</p>
                    <h3>2.1%</h3>
                    <p style="font-size: 0.8rem;">40% reduction</p>
                </div>
                <div class="kpi-card">
                    <p>Anomalies Detected</p>
                    <h3>1,847</h3>
                    <p style="font-size: 0.8rem;">Last 30 days</p>
                </div>
                <div class="kpi-card">
                    <p>Response Time</p>
                    <h3>0.8s</h3>
                    <p style="font-size: 0.8rem;">Real-time detection</p>
                </div>
            </div>
            <div class="chart-container">
                <h3>📊 Anomaly Types Detection</h3>
                <svg viewBox="0 0 500 300" class="bar-chart">
                    <line x1="50" y1="30" x2="50" y2="250" stroke="#ccc" stroke-width="2"/>
                    <line x1="50" y1="250" x2="490" y2="250" stroke="#ccc" stroke-width="2"/>
                    
                    <rect x="70" y="80" width="45" height="170" fill="#ef4444" opacity="0.8"/>
                    <text x="92" y="270" text-anchor="middle" font-size="11">DDoS Attack</text>
                    <text x="92" y="70" text-anchor="middle" font-size="12" font-weight="bold">847</text>
                    
                    <rect x="140" y="120" width="45" height="130" fill="#f59e0b" opacity="0.8"/>
                    <text x="162" y="270" text-anchor="middle" font-size="11">Port Scan</text>
                    <text x="162" y="110" text-anchor="middle" font-size="12" font-weight="bold">514</text>
                    
                    <rect x="210" y="140" width="45" height="110" fill="#06b6d4" opacity="0.8"/>
                    <text x="232" y="270" text-anchor="middle" font-size="11">Brute Force</text>
                    <text x="232" y="130" text-anchor="middle" font-size="12" font-weight="bold">286</text>
                    
                    <rect x="280" y="160" width="45" height="90" fill="#10b981" opacity="0.8"/>
                    <text x="302" y="270" text-anchor="middle" font-size="11">Other</text>
                    <text x="302" y="150" text-anchor="middle" font-size="12" font-weight="bold">200</text>
                </svg>
            </div>
            <div class="chart-container">
                <h3>📈 System Health - Last 7 Days</h3>
                <svg viewBox="0 0 500 250" class="line-chart">
                    <line x1="50" y1="30" x2="50" y2="200" stroke="#ccc" stroke-width="2"/>
                    <line x1="50" y1="200" x2="490" y2="200" stroke="#ccc" stroke-width="2"/>
                    
                    <polyline points="70,80 130,75 190,70 250,65 310,68 370,72 430,78 470,80" stroke="#10b981" stroke-width="2.5" fill="none"/>
                    <circle cx="70" cy="80" r="3" fill="#10b981"/>
                    <circle cx="130" cy="75" r="3" fill="#10b981"/>
                    <circle cx="190" cy="70" r="3" fill="#10b981"/>
                    <circle cx="250" cy="65" r="3" fill="#10b981"/>
                    <circle cx="310" cy="68" r="3" fill="#10b981"/>
                    <circle cx="370" cy="72" r="3" fill="#10b981"/>
                    <circle cx="430" cy="78" r="3" fill="#10b981"/>
                    <circle cx="470" cy="80" r="3" fill="#10b981"/>
                    
                    <text x="70" y="220" text-anchor="middle" font-size="10">Mon</text>
                    <text x="190" y="220" text-anchor="middle" font-size="10">Wed</text>
                    <text x="310" y="220" text-anchor="middle" font-size="10">Fri</text>
                    <text x="430" y="220" text-anchor="middle" font-size="10">Sun</text>
                    
                    <text x="20" y="50" font-size="11" font-weight="bold">Health Score (%)</text>
                    <text x="370" y="160" font-size="11">Current: 98.5%</text>
                    <text x="370" y="175" font-size="11">Avg: 97.8%</text>
                </svg>
            </div>
        </div>
    `;
}

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-in';
});

// Add fade-in animation
if (!document.getElementById('fade-in-styles')) {
    const style = document.createElement('style');
    style.id = 'fade-in-styles';
    style.innerHTML = `
        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}
