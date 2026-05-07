// ==================== SHARED UTILITIES ====================

// API Base URL
const API_URL = 'http://localhost:5000/api';

// Get user from localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
}

// Check if user is authenticated
function isAuthenticated() {
    return getCurrentUser() !== null;
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
    }).format(amount);
}

// Make API call
async function apiCall(endpoint, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, finalOptions);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Logout user
function logoutUser() {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

// Check role
function checkRole(allowedRoles) {
    const user = getCurrentUser();
    if (!user || !allowedRoles.includes(user.role)) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

// Add animation style
const style = document.createElement('style');
style.textContent = `
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

    .notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Clear form
function clearForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.reset();
    }
}

// Get URL parameters
function getUrlParameter(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
}

// Export functions for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getCurrentUser,
        isAuthenticated,
        formatDate,
        formatCurrency,
        apiCall,
        logoutUser,
        checkRole,
        showNotification,
        validateEmail,
        validatePhone,
        clearForm,
        getUrlParameter
    };
}
