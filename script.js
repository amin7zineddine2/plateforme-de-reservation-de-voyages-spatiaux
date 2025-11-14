// Gestion de l'authentification
function checkAuth() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Gestion des réservations
function getBookings() {
    return JSON.parse(localStorage.getItem('bookings')) || [];
}

function saveBooking(booking) {
    const bookings = getBookings();
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Ajouter ce script dans toutes les pages pour gérer l'affichage utilisateur
// function updateNavigationAuth() {
//     const user = JSON.parse(localStorage.getItem('currentUser'));
//     const loginLink = document.querySelector('a[href="login.html"]');
    
//     if (user && user.isLoggedIn) {
//         // Replace login link with user menu
//         if (loginLink) {
//             loginLink.outerHTML = `
//                 <div class="flex items-center space-x-4">
//                     <span class="text-gray-300 hidden md:block">Welcome, ${user.name}</span>
//                     <button onclick="logout()" class="border border-red-500 text-red-500 px-3 py-1 rounded-lg hover:bg-red-500/10 transition-colors text-sm">
//                         Logout
//                     </button>
//                 </div>
//             `;
//         }
//     }
// }

// Fonction pour obtenir les données utilisateur complètes
function getUserData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        // Assurez-vous que l'utilisateur a toutes les propriétés nécessaires
        return {
            id: user.id || Date.now(),
            name: user.name || '',
            firstName: user.firstName || user.name?.split(' ')[0] || '',
            lastName: user.lastName || user.name?.split(' ')[1] || '',
            email: user.email || '',
            phone: user.phone || '',
        };
    }
    return null;
}

// Appeler cette fonction au chargement de chaque page
document.addEventListener('DOMContentLoaded', function() {
    updateNavigationAuth();
});