/* --------------------------------------------------------------
   1. DATA LOADING
   -------------------------------------------------------------- */
let destinations = [];
let accommodations = [];
let additionalPassengers = [];

// Fake user database for complete user data
const fakeUsers = [
    {
        id: 1,
        name: "zineddine mohamed amine",
        firstName: "mohamed-amine",
        lastName: "zineddine",
        email: "amin@gmail.com",
        phone: "+212 7 71 04 00 04",
        password: 'amin',
        joinDate: "2023-01-15",
        membership: "Premium"
    },
    {
        id: 2,
        name: "Sophie Martin",
        firstName: "Sophie",
        lastName: "Martin",
        email: "sophie.martin@email.com",
        phone: "+33 1 34 56 78 90",
        password: 'amin',
        joinDate: "2023-02-20",
        membership: "Standard"
    },
    {
        id: 3,
        name: "Thomas Leroy",
        firstName: "Thomas",
        lastName: "Leroy",
        email: "thomas.leroy@email.com",
        phone: "+33 1 45 67 89 01",
        password: 'amin',
        joinDate: "2023-03-10",
        membership: "Premium"
    },
    {
        id: 4,
        name: "Marie Lambert",
        firstName: "Marie",
        lastName: "Lambert",
        email: "marie.lambert@email.com",
        phone: "+33 1 56 78 90 12",
        password: 'amin',
        joinDate: "2023-04-05",
        membership: "Standard"
    },
    {
        id: 5,
        name: "Jean Moreau",
        firstName: "Jean",
        lastName: "Moreau",
        email: "jean.moreau@email.com",
        phone: "+33 1 67 89 01 23",
        password: 'amin',
        joinDate: "2023-05-12",
        membership: "VIP"
    }
];

async function loadData() {
    try {
        const [destRes, accRes] = await Promise.all([
            fetch('data/destinations.json').then(r => r.json()),
            fetch('data/accommodations.json').then(r => r.json())
        ]);
        destinations = destRes.destinations || [];
        accommodations = accRes.accommodations || [];
        populateDestinations();
        renderAccommodations(); // initial render (no destination selected)
        updatePriceCalculation(); // Initialize price calculation
    } catch (e) {
        console.error('Failed to load JSON data', e);
        // Fallback to mock data if files not found
        if (destinations.length === 0 || accommodations.length === 0) {
            console.log('Using fallback data');
            await loadFallbackData();
        }
    }
}

// Fallback data in case JSON files are not available
async function loadFallbackData() {
    destinations = [
        {
            "id": "moon",
            "name": "The Moon",
            "price": 25000,
            "travelDuration": "3 days",
            "accommodations": ["standard", "luxury", "zero-g"]
        },
        {
            "id": "mars", 
            "name": "Mars",
            "price": 150000,
            "travelDuration": "7-9 months",
            "accommodations": ["standard", "luxury", "zero-g"]
        }
    ];
    
    accommodations = [
        {
            "id": "standard",
            "name": "Standard Cabin",
            "shortDescription": "Comfortable private quarters with basic amenities",
            "pricePerDay": 500,
            "category": "economy"
        },
        {
            "id": "luxury",
            "name": "Luxury Suite", 
            "shortDescription": "Spacious suite with premium amenities and viewports",
            "pricePerDay": 1200,
            "category": "premium"
        },
        {
            "id": "zero-g",
            "name": "Zero-G Pod",
            "shortDescription": "Advanced accommodation with zero-gravity experience",
            "pricePerDay": 2000,
            "category": "premium"
        }
    ];
    
    populateDestinations();
    renderAccommodations();
    updatePriceCalculation();
}

/* --------------------------------------------------------------
   2. POPULATE DESTINATION SELECT
   -------------------------------------------------------------- */
function populateDestinations() {
    const select = document.getElementById('destination-select');
    select.innerHTML = '<option value="">Select your destination</option>';

    destinations.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.dataset.price = d.price;
        opt.dataset.duration = d.travelDuration;
        opt.textContent = `${d.name} - $${d.price.toLocaleString()}`;
        select.appendChild(opt);
    });
}

/* --------------------------------------------------------------
   3. RENDER ACCOMMODATION CARDS (filtered by destination)
   -------------------------------------------------------------- */
function renderAccommodations(selectedDestId = null) {
    const container = document.getElementById('accommodation-options');
    container.innerHTML = ''; // clear previous cards

    // If a destination is selected → filter accommodations
    let available = accommodations;
    if (selectedDestId) {
        const dest = destinations.find(d => d.id === selectedDestId);
        if (dest && dest.accommodations) {
            const allowedIds = dest.accommodations;
            available = accommodations.filter(a => allowedIds.includes(a.id));
        }
    }

    // Build a card for every available accommodation
    available.forEach(acc => {
        const card = document.createElement('div');
        card.className = 'accommodation-option p-4';
        card.dataset.accommodation = acc.id;
        card.dataset.pricePerDay = acc.pricePerDay;

        // ---- Icon (choose a sensible FontAwesome icon) ----
        let iconClass = 'fa-bed';
        if (acc.id === 'luxury') iconClass = 'fa-crown';
        if (acc.id === 'zero-g') iconClass = 'fa-weightless';
        if (acc.id === 'family') iconClass = 'fa-users';
        if (acc.id === 'research') iconClass = 'fa-flask';
        if (acc.id === 'honeymoon') iconClass = 'fa-heart';

        // ---- Gradient colour for the icon circle ----
        let grad = 'from-gray-400 to-gray-600';
        if (acc.category === 'premium' || acc.category === 'luxury') grad = 'from-yellow-400 to-orange-500';
        if (acc.id === 'zero-g') grad = 'from-cyan-400 to-blue-500';

        card.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-gradient-to-r ${grad} mb-3 flex items-center justify-center mx-auto">
                <i class="fas ${iconClass} text-white"></i>
            </div>
            <h3 class="font-orbitron text-lg mb-2 text-center">${acc.name}</h3>
            <p class="text-gray-300 text-sm text-center">${acc.shortDescription}</p>
            <p class="text-neon-blue text-center mt-2 font-bold">$${acc.pricePerDay.toLocaleString()}/day</p>
        `;

        container.appendChild(card);
    });

    // Re-attach click handlers (they are removed when we clear innerHTML)
    attachAccommodationHandlers();
}

/* --------------------------------------------------------------
   4. ADDITIONAL PASSENGERS MANAGEMENT
   -------------------------------------------------------------- */
function addAdditionalPassenger() {
    const passengerCount = getTotalPassengerCount();
    const maxPassengers = 6; // Maximum number of passengers allowed
    
    if (passengerCount >= maxPassengers) {
        alert(`Maximum ${maxPassengers} passengers allowed per booking.`);
        return;
    }

    const passengerNumber = additionalPassengers.length + 2; // +2 because we already have main passenger
    const passengerId = `passenger-${passengerNumber}`;
    
    const passengerForm = document.createElement('div');
    passengerForm.className = 'passenger-form';
    passengerForm.id = passengerId;
    
    passengerForm.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <h3 class="font-orbitron text-lg text-neon-blue">Passenger ${passengerNumber}</h3>
            <button type="button" class="remove-passenger px-3 py-1 rounded-lg text-sm transition-colors" data-passenger-id="${passengerId}">
                <i class="fas fa-times mr-1"></i>Remove
            </button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-gray-300 mb-2">First Name</label>
                <input type="text" name="passenger-first-name" placeholder="Enter first name" class="form-input w-full px-4 py-3" required>
            </div>
            <div>
                <label class="block text-gray-300 mb-2">Last Name</label>
                <input type="text" name="passenger-last-name" placeholder="Enter last name" class="form-input w-full px-4 py-3" required>
            </div>
            <div>
                <label class="block text-gray-300 mb-2">Email Address</label>
                <input type="email" name="passenger-email" placeholder="Enter email" class="form-input w-full px-4 py-3" required>
            </div>
            <div>
                <label class="block text-gray-300 mb-2">Phone Number</label>
                <input type="tel" name="passenger-phone" placeholder="Enter phone number" class="form-input w-full px-4 py-3" required>
            </div>
        </div>
    `;
    
    document.getElementById('additional-passengers').appendChild(passengerForm);
    additionalPassengers.push(passengerId);
    
    // Update passenger selection
    updatePassengerSelection();
    updatePriceCalculation();
    
    // Attach remove event listener
    const removeButton = passengerForm.querySelector('.remove-passenger');
    removeButton.addEventListener('click', function() {
        removeAdditionalPassenger(this.dataset.passengerId);
    });
}

function removeAdditionalPassenger(passengerId) {
    const passengerElement = document.getElementById(passengerId);
    if (passengerElement) {
        passengerElement.remove();
        additionalPassengers = additionalPassengers.filter(id => id !== passengerId);
        updatePassengerSelection();
        updatePriceCalculation();
    }
}

function getTotalPassengerCount() {
    return 1 + additionalPassengers.length; // Main passenger + additional passengers
}

function updatePassengerSelection() {
    const totalPassengers = getTotalPassengerCount();
    const passengerOptions = document.querySelectorAll('.passenger-option');
    
    passengerOptions.forEach(option => {
        const optionPassengers = parseInt(option.dataset.passengers);
        option.classList.remove('selected');
        option.querySelector('div > div').classList.add('hidden');
        
        // Auto-select the option that matches the current passenger count
        if (optionPassengers === totalPassengers || 
            (optionPassengers === 4 && totalPassengers >= 3 && totalPassengers <= 6)) {
            option.classList.add('selected');
            option.querySelector('div > div').classList.remove('hidden');
        }
    });
}

/* --------------------------------------------------------------
   5. PRICE CALCULATION
   -------------------------------------------------------------- */
function updatePriceCalculation() {
    const calculationElement = document.getElementById('price-calculation');
    const destinationSelect = document.getElementById('destination-select');
    const accommodationOption = document.querySelector('.accommodation-option.selected');
    
    const destination = destinationSelect.value;
    const destinationObj = destinations.find(d => d.id === destination);
    const totalPassengers = getTotalPassengerCount();
    
    if (destination && accommodationOption) {
        // Show calculation
        calculationElement.classList.remove('hidden');
        
        const destinationPrice = destinationObj ? destinationObj.price : 0;
        const accommodationPricePerDay = parseInt(accommodationOption.dataset.pricePerDay) || 0;
        
        // Estimate accommodation cost based on travel duration
        let accommodationDays = 7; // Default to one week
        if (destinationObj && destinationObj.travelDuration) {
            // Parse duration string to get days
            const durationMatch = destinationObj.travelDuration.match(/(\d+)/);
            if (durationMatch) {
                accommodationDays = parseInt(durationMatch[1]);
            }
        }
        
        const accommodationCostPerPassenger = accommodationPricePerDay * accommodationDays;
        const totalAccommodationCost = accommodationCostPerPassenger * totalPassengers;
        const totalPrice = destinationPrice + totalAccommodationCost;
        
        // Update calculation display
        document.getElementById('calc-destination').textContent = `$${destinationPrice.toLocaleString()}`;
        document.getElementById('calc-accommodation').textContent = `$${accommodationCostPerPassenger.toLocaleString()}`;
        document.getElementById('calc-passengers').textContent = totalPassengers;
        document.getElementById('calc-total').textContent = `$${totalPrice.toLocaleString()}`;
    } else {
        // Hide calculation if not all required fields are filled
        calculationElement.classList.add('hidden');
    }
}

/* --------------------------------------------------------------
   6. EVENT LISTENERS
   -------------------------------------------------------------- */
function attachAccommodationHandlers() {
    document.querySelectorAll('.accommodation-option').forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.accommodation-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            updatePriceCalculation();
        });
    });
}

/* --------------------------------------------------------------
   7. DESTINATION CHANGE → FILTER ACCOMMODATIONS
   -------------------------------------------------------------- */
document.getElementById('destination-select').addEventListener('change', function(e) {
    const destId = e.target.value;
    renderAccommodations(destId);
    updatePriceCalculation();
});

/* --------------------------------------------------------------
   8. ORIGINAL STARFIELD
   -------------------------------------------------------------- */
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(star);
    }
}

/* --------------------------------------------------------------
   9. FORM INTERACTIONS
   -------------------------------------------------------------- */
function setupFormInteractions() {
    // ---- Passenger selection ----
    document.querySelectorAll('.passenger-option').forEach(opt => {
        opt.addEventListener('click', function() {
            const selectedPassengers = parseInt(this.dataset.passengers);
            const currentPassengers = getTotalPassengerCount();
            
            // Only allow selection if it matches current passenger count
            if (selectedPassengers === currentPassengers || 
                (selectedPassengers === 4 && currentPassengers >= 3 && currentPassengers <= 6)) {
                document.querySelectorAll('.passenger-option').forEach(o => {
                    o.classList.remove('selected');
                    o.querySelector('div > div').classList.add('hidden');
                });
                this.classList.add('selected');
                this.querySelector('div > div').classList.remove('hidden');
            } else {
                // Show message about adding/removing passengers
                if (selectedPassengers > currentPassengers) {
                    alert(`Please add ${selectedPassengers - currentPassengers} more passenger(s) to select this option.`);
                } else {
                    alert(`Please remove ${currentPassengers - selectedPassengers} passenger(s) to select this option.`);
                }
            }
        });
    });

    // ---- Add passenger button ----
    document.getElementById('add-passenger').addEventListener('click', addAdditionalPassenger);

    // ---- Form field changes ----
    document.getElementById('departure-date').addEventListener('change', updatePriceCalculation);

    // ---- Form submit ----
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const termsChecked = document.getElementById('terms').checked;
        if (!termsChecked) {
            alert('Please agree to the Terms of Service and Space Travel Agreement.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (!user) {
            if (confirm('You need to be logged in to complete your booking. Would you like to login first?')) {
                window.location.href = 'login.html';
            }
            return;
        }

        // Validate additional passengers
        const additionalPassengerForms = document.querySelectorAll('#additional-passengers .passenger-form');
        let allPassengersValid = true;
        
        additionalPassengerForms.forEach(form => {
            const inputs = form.querySelectorAll('input[required]');
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allPassengersValid = false;
                    input.classList.add('border-red-500');
                } else {
                    input.classList.remove('border-red-500');
                }
            });
        });

        if (!allPassengersValid) {
            alert('Please fill in all required passenger information.');
            return;
        }

        const selectedDest = document.getElementById('destination-select').value;
        const destInfo = destinations.find(d => d.id === selectedDest) || {};
        const accInfo = accommodations.find(a => a.id === document.querySelector('.accommodation-option.selected')?.dataset.accommodation) || {};

        // Collect additional passenger data
        const additionalPassengerData = [];
        additionalPassengerForms.forEach((form, index) => {
            additionalPassengerData.push({
                firstName: form.querySelector('input[name="passenger-first-name"]').value,
                lastName: form.querySelector('input[name="passenger-last-name"]').value,
                email: form.querySelector('input[name="passenger-email"]').value,
                phone: form.querySelector('input[name="passenger-phone"]').value
            });
        });

        const bookingData = {
            id: 'BK' + Date.now(),
            userId: user.id,
            destination: selectedDest,
            destinationName: destInfo.name || '',
            destinationPrice: destInfo.price || 0,
            departureDate: document.getElementById('departure-date').value,
            passengerCount: getTotalPassengerCount(),
            accommodation: accInfo.id || 'standard',
            accommodationName: accInfo.name || '',
            accommodationPricePerDay: accInfo.pricePerDay || 0,
            mainPassenger: {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value
            },
            additionalPassengers: additionalPassengerData,
            specialRequirements: document.getElementById('special-requirements').value,
            totalPrice: calculateTotalPrice(),
            status: 'confirmed',
            createdAt: new Date().toISOString()
        };

        saveBooking(bookingData);
        alert('Booking confirmed successfully!');
        window.location.href = 'my-bookings.html';
    });
}

function calculateTotalPrice() {
    const destinationSelect = document.getElementById('destination-select');
    const accommodationOption = document.querySelector('.accommodation-option.selected');
    const destinationObj = destinations.find(d => d.id === destinationSelect.value);
    
    if (!destinationObj || !accommodationOption) return 0;
    
    const destinationPrice = destinationObj.price || 0;
    const accommodationPricePerDay = parseInt(accommodationOption.dataset.pricePerDay) || 0;
    const totalPassengers = getTotalPassengerCount();
    
    let accommodationDays = 7;
    if (destinationObj.travelDuration) {
        const durationMatch = destinationObj.travelDuration.match(/(\d+)/);
        if (durationMatch) {
            accommodationDays = parseInt(durationMatch[1]);
        }
    }
    
    return destinationPrice + (accommodationPricePerDay * accommodationDays * totalPassengers);
}

function saveBooking(booking) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

/* --------------------------------------------------------------
   10. PAGE INITIALISATION - VERSION CORRIGÉE
   -------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async() => {
    createStars();
    await loadData();
    setupFormInteractions();
    
    // Pre-fill logged-in user data and make fields read-only
    prefillUserData();
});

// NOUVELLE FONCTION pour pré-remplir les données utilisateur
function prefillUserData() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        console.log('User found in localStorage:', user);
        
        // Récupérer les données complètes depuis fakeUsers
        const completeUserData = fakeUsers.find(u => u.id === user.id) || user;
        console.log('Complete user data:', completeUserData);
        
        // Remplir les champs avec les données utilisateur
        const firstNameField = document.getElementById('first-name');
        const lastNameField = document.getElementById('last-name');
        const emailField = document.getElementById('email');
        const phoneField = document.getElementById('phone');
        
        if (firstNameField) {
            // CORRECTION: Utiliser firstName d'abord, puis name si firstName n'existe pas
            firstNameField.value = completeUserData.firstName || completeUserData.name || '';
            firstNameField.disabled = true;
            console.log('First name set to:', firstNameField.value);
        }
        
        if (lastNameField) {
            lastNameField.value = completeUserData.lastName || '';
            lastNameField.disabled = true;
            console.log('Last name set to:', lastNameField.value);
        }
        
        if (emailField) {
            emailField.value = completeUserData.email || '';
            emailField.disabled = true;
            console.log('Email set to:', emailField.value);
        }
        
        if (phoneField) {
            // CORRECTION: S'assurer que le numéro de téléphone est bien rempli
            phoneField.value = completeUserData.phone || '';
            phoneField.disabled = true;
            console.log('Phone set to:', phoneField.value);
        }
        
        // Vérifier que les champs sont bien remplis
        console.log('Fields filled:', {
            firstName: firstNameField?.value,
            lastName: lastNameField?.value,
            email: emailField?.value,
            phone: phoneField?.value
        });
    } else {
        console.log('No user logged in');
    }
}