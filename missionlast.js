let missions = [
    
  {
    "id": 1,
    "name": "Artemis II",
    "agency": "NASA",
    "description": "Four astronauts will venture around the Moon on Artemis II, the first crewed mission on NASA's path to establishing a long-term presence at the Moon for science and exploration.",
    "date": "2026-02-05",
    "image": "./images/ArtemisII.png"
  },
  {
    "id": 2,
    "name": "Commercial Crew",
    "agency": "NASA",
    "description": "NASA’s Commercial Crew Program is delivering on its goal of safe, reliable, and cost-effective human transportation to and from the International Space Station.",
    "date": "2020-11-16",
    "image": "./images/Commercial-Crew.png"
  },
  {
    "id": 3,
    "name": "Hubble Space Telescope",
    "agency": "NASA",
    "description": "Since its 1990 launch, the Hubble Space Telescope has changed our fundamental understanding of the universe.",
    "date": "1990-04-24",
    "image": "./images/Hubble-Space-Telescope.png"
  },
  {
    "id": 4,
    "name": "James Webb Space Telescope",
    "agency": "NASA",
    "description": "Webb is the premier observatory of the next decade, serving thousands of astronomers worldwide. It studies every phase in the history of our Universe.",
    "date": "2021-12-25",
    "image": "./images/James-Webb-Space-Telescope.png"
  },
  {
    "id": 5,
    "name": "Juno: Mission At Jupiter",
    "agency": "NASA",
    "description": "Probing beneath Jupiter's dense clouds to answer questions about the origin and evolution of Jupiter, our solar system, and giant planets across the cosmos.",
    "date": "2011-08-05",
    "image": "./images/Juno-Mission-At-Jupiter.png"
  },
  {
    "id": 6,
    "name": "International Space Station",
    "agency": "NASA",
    "description": "The International Space Station Program brings together international flight crews, multiple launch vehicles, the international scientific research community and much more.",
    "date": "1998-11-20",
    "image": "./images/International-Space-Station.png"
  },
  {
    "id": 7,
    "name": "Perseverance Mars Rover",
    "agency": "NASA",
    "description": "This rover and its aerial sidekick were assigned to study the geology of Mars and much more.",
    "date": "2020-07-30",
    "image": "./images/Perseverance-rover.png"
  },
  {
    "id": 8,
    "name": "Parker Solar Probe",
    "agency": "NASA",
    "description": "On a mission to “touch the Sun,” NASA's Parker Solar Probe became the first spacecraft to fly through the corona – the Sun’s upper atmosphere.",
    "date": "2018-08-12",
    "image": "./images/Parker-Solar-Probe.png"
  },
  {
    "id": 9,
    "name": "Quesst",
    "agency": "NASA",
    "description": "NASA's mission to demonstrate how the X-59 can fly supersonic without generating loud sonic booms.",
    "date": "2020-11-16",
    "image": "./images/Quesst.png"
  },
  {
    "id": 10,
    "name": "JUICE",
    "agency": "ESA",
    "description": "JUICE launched on April 14, 2023, to study Jupiter’s icy moons—Ganymede, Callisto, and Europa—for potential signs of oceans and life.",
    "date": "2023-04-14",
    "image": "./images/juice.png"
  }
];


let favorites = JSON.parse(localStorage.getItem('all-fav')) || [];
let myMissions = JSON.parse(localStorage.getItem('myMissions')) || [];
let currentTab = 'kolchi';
let currentEditId = null;


// document.addEventListener('DOMContentLoaded', function () {
window.addEventListener('load', function () {
    Filtrage();
    AfficherMissions();
    populateYearFilter();
});


function Filtrage() {

    document.getElementById('missionSearch').addEventListener('input', filterMissions);
    document.getElementById('agencyFilter').addEventListener('change', filterMissions);
    document.getElementById('yearFilter').addEventListener('change', filterMissions);

    
    document.querySelectorAll('.tab')[0].addEventListener('click', () => switchTab('kolchi'));
    document.querySelectorAll('.tab')[1].addEventListener('click', () => switchTab('fav'));
    document.querySelectorAll('.tab')[2].addEventListener('click', () => switchTab('notreMission'));

    
    document.getElementById('ajout').addEventListener('click', openAddModal);

   
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelBtn').addEventListener('click', closeModal);
    document.getElementById('missionForm').addEventListener('submit', saveMission);

    
}

function AfficherMissions(MissionFiltrer = null) {
// function AfficherMissions(MissionFiltrer = null) {
    const missionGrid = document.getElementById('missionGrid');
    const Missions_vide = document.getElementById('Missions_vide');

    let missionsToAficher = MissionFiltrer || getCurrentMissions();

    if (missionsToAficher.length === 0) {
        missionGrid.style.display = 'none';
        Missions_vide.style.display = 'block';
        return;
    }

    missionGrid.style.display = 'grid';
    Missions_vide.style.display = 'none';

    missionGrid.innerHTML = '';

    missionsToAficher.forEach(mission => {
        const missionCard = createMissionCard(mission);
        missionGrid.appendChild(missionCard);
    });
}

// Création d'une carte de mission
function createMissionCard(mission) {
    const card = document.createElement('div');
    card.className = 'mission-card';
    card.dataset.id = mission.id;

    const isFavorite = favorites.includes(mission.id);
    const isMyMission = myMissions.some(m => m.id === mission.id);

    const launchDate = new Date(mission.launchDate);
    const formattedDate = launchDate.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    card.innerHTML = `
                <img class="mission-card-image" src="${mission.image}" alt="${mission.name}">
                <div class="mission-card-content">
                    <div class="mission-card-agency">${mission.agency}</div>
                    <h3 class="mission-card-title">${mission.name}</h3>
                    <p class="mission-card-objective">${mission.objective}</p>
                    <p class="mission-card-date">Lancé le ${formattedDate}</p>
                    <div class="mission-card-actions">
                        <a class="mission-card-link" href="#">En savoir plus</a>
                        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${mission.id}">
                            ${isFavorite ? '❤️' : '🤍'}
                        </button>
                    </div>
                    ${isMyMission ? `
                        <div class="mission-card-actions" style="margin-top: 1rem;">
                            <button class="btn btn-secondary edit-mission" data-id="${mission.id}">Modifier</button>
                            <button class="btn btn-danger delete-mission" data-id="${mission.id}">Supprimer</button>
                        </div>
                    ` : ''}
                </div>
            `;

    // Ajouter les écouteurs d'événements
    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', toggleFavorite);

    if (isMyMission) {
        const editBtn = card.querySelector('.edit-mission');
        const deleteBtn = card.querySelector('.delete-mission');

        editBtn.addEventListener('click', function () {
            openEditModal(mission.id);
        });

        deleteBtn.addEventListener('click', function () {
            deleteMission(mission.id);
        });
    }

    return card;
}

// Obtenir les missions actuelles selon l'onglet actif
function getCurrentMissions() {
    switch (currentTab) {
        case 'fav':
            return missions.filter(mission => favorites.includes(mission.id));
        case 'notreMission':
            return myMissions;
        default:
            return missions;
    }
}


function switchTab(tabName) {
    currentTab = tabName;
    
    // Mettre à jour l'interface
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    if (tabName === 'kolchi') document.querySelectorAll('.tab')[0].classList.add('active');
    if (tabName === 'fav') document.querySelectorAll('.tab')[1].classList.add('active');
    if (tabName === 'notreMission') document.querySelectorAll('.tab')[2].classList.add('active');
    
    AfficherMissions();
}

// Filtrer les missions
function filterMissions() {
    const barRecherche = document.getElementById('missionSearch').value.toLowerCase();
    const agencyFilter = document.getElementById('agencyFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;

    let MissionFiltrer = getCurrentMissions();

    // Filtrer par recherche
    if (barRecherche) {
        MissionFiltrer = MissionFiltrer.filter(mission =>
            mission.name.toLowerCase().includes(barRecherche) ||
            mission.agency.toLowerCase().includes(barRecherche) ||
            mission.objective.toLowerCase().includes(barRecherche)
        );
    }

    // Filtrer par agence
    if (agencyFilter) {
        MissionFiltrer = MissionFiltrer.filter(mission =>
            mission.agency.includes(agencyFilter)
        );
    }

    // Filtrer par année
    if (yearFilter) {
        MissionFiltrer = MissionFiltrer.filter(mission => {
            const missionYear = new Date(mission.launchDate).getFullYear().toString();
            return missionYear === yearFilter;
        });
    }

    AfficherMissions(MissionFiltrer);
}

// Basculer le statut favori
function toggleFavorite(e) {
    const missionId = parseInt(e.target.dataset.id);
    const index = favorites.indexOf(missionId);

    if (index === -1) {
        favorites.push(missionId);
        e.target.classList.add('active');
        e.target.innerHTML = '❤️';
    } else {
        favorites.splice(index, 1);
        e.target.classList.remove('active');
        e.target.innerHTML = '🤍';
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem('all-fav', JSON.stringify(favorites));

    // Si on est dans l'onglet favoris, re-rendre
    if (currentTab === 'fav') {
        AfficherMissions();
    }
}

// Ouvrir le modal d'ajout
function openAddModal() {
    document.getElementById('modalTitle').textContent = 'Ajouter une mission';
    document.getElementById('missionForm').reset();
    document.getElementById('missionId').value = '';
    // currentEditId = null;

    // Réinitialiser les erreurs
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
    });

    document.getElementById('missionModal').style.display = 'flex';
}

// Ouvrir le modal d'édition
function openEditModal(missionId) {
    const mission = myMissions.find(m => m.id === missionId);
    if (!mission) return;

    document.getElementById('modalTitle').textContent = 'Modifier la mission';
    document.getElementById('missionId').value = mission.id;
    document.getElementById('missionName').value = mission.name;
    document.getElementById('missionAgency').value = mission.agency;
    document.getElementById('missionObjective').value = mission.objective;
    document.getElementById('missionDate').value = mission.launchDate;
    document.getElementById('missionImage').value = mission.image;

    currentEditId = missionId;

    // Réinitialiser les erreurs
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
    });

    document.getElementById('missionModal').style.display = 'flex';
}

// Fermer le modal
function closeModal() {
    document.getElementById('missionModal').style.display = 'none';
}

// Sauvegarder une mission
function saveMission(e) {
    e.preventDefault();

    // Validation
    const name = document.getElementById('missionName').value.trim();
    const agency = document.getElementById('missionAgency').value;
    const objective = document.getElementById('missionObjective').value.trim();
    const date = document.getElementById('missionDate').value;
    const image = document.getElementById('missionImage').value.trim();

    let isValid = true;

    // Valider le nom
    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        document.getElementById('missionName').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
        document.getElementById('missionName').classList.remove('error');
    }

    // Valider l'agence
    if (!agency) {
        document.getElementById('agencyError').style.display = 'block';
        document.getElementById('missionAgency').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('agencyError').style.display = 'none';
        document.getElementById('missionAgency').classList.remove('error');
    }

    // Valider l'objectif
    if (!objective) {
        document.getElementById('objectiveError').style.display = 'block';
        document.getElementById('missionObjective').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('objectiveError').style.display = 'none';
        document.getElementById('missionObjective').classList.remove('error');
    }

    // Valider la date
    if (!date) {
        document.getElementById('dateError').style.display = 'block';
        document.getElementById('missionDate').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('dateError').style.display = 'none';
        document.getElementById('missionDate').classList.remove('error');
    }

    // Valider l'image
    if (!image) {
        document.getElementById('imageError').style.display = 'block';
        document.getElementById('missionImage').classList.add('error');
        isValid = false;
    } else {
        document.getElementById('imageError').style.display = 'none';
        document.getElementById('missionImage').classList.remove('error');
    }

    if (!isValid) return;

    // Créer l'objet mission
    const mission = {
        id: currentEditId || Date.now(),
        name,
        agency,
        objective,
        launchDate: date,
        image: image || getPlaceholderImage(name)
    };

    // Ajouter ou mettre à jour
    if (currentEditId) {
        // Mettre à jour
        const index = myMissions.findIndex(m => m.id === currentEditId);
        if (index !== -1) {
            myMissions[index] = mission;
        }
    } else {
        // Ajouter
        myMissions.push(mission);
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem('myMissions', JSON.stringify(myMissions));

    // Fermer le modal et re-rendre
    closeModal();

    // Si on est dans l'onglet "Mes missions", re-rendre
    if (currentTab === 'notreMission') {
        AfficherMissions();
    }
}

// Supprimer une mission
function deleteMission(missionId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
        return;
    }

    // Retirer des favoris si présent
    const favIndex = favorites.indexOf(missionId);
    if (favIndex !== -1) {
        favorites.splice(favIndex, 1);
        localStorage.setItem('all-fav', JSON.stringify(favorites));
    }

    // Retirer de mes missions
    myMissions = myMissions.filter(m => m.id !== missionId);
    localStorage.setItem('myMissions', JSON.stringify(myMissions));

    // Re-rendre
    if (currentTab === 'notreMission') {
        AfficherMissions();
    }
}

// Remplir le filtre d'années
function populateYearFilter() {
    const yearFilter = document.getElementById('yearFilter');

    // Obtenir toutes les années uniques des missions
    const allYears = [...missions, ...myMissions]
        .map(mission => new Date(mission.launchDate).getFullYear())
        .filter((year, index, self) => self.indexOf(year) === index)
        .sort((a, b) => b - a);

    // Ajouter les options
    allYears.forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

