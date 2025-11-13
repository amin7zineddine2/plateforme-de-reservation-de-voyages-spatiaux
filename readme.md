User Stories : 
Epic: User Authentication & Session Management


User Story 1: Fake User Login

Description : En tant qu'utilisateur, je veux me connecter en utilisant un simple formulaire d'email et de mot de passe afin d'accéder aux fonctionnalités personnalisées, même si l'authentification est simulée sur le front-end.
Critères d'Acceptation :
* Un formulaire de login est disponible sur la page Account/Login.
* Le formulaire accepte un email et un password (aucune validation backend requise).
* Lors de la submission, les user credentials sont sauvegardés dans le localStorage pour simuler une connexion réussie.
* Un session state (ex: isLoggedIn: true, username) est stocké dans le localStorage.
* L'utilisateur est redirigé vers la home page ou son dashboard après s'être "logged in".


User Story 2: Session State & Logout

Description : En tant qu'utilisateur connecté, je veux que ma session soit mémorisée lors des page refreshes et que je puise me déconnecter afin que mon compte semble sécurisé.
Critères d'Acceptation :
* L'application vérifie le localStorage au page load pour déterminer si un user est logged in.
* Le header du site affiche le name/email de l'utilisateur quand il est logged in.
* Un bouton "Logout" est visible dans le header quand l'utilisateur est logged in.
* Cliquer sur "Logout" efface la session du localStorage et met à jour l'UI.
Epic: Booking Creation & Management


User Story 3: Dynamic Booking Form

Description : En tant qu'utilisateur, je veux un smart booking form qui s'adapte en fonction de ma destination et de mon package choisis afin de ne voir que les options pertinentes.
Critères d'Acceptation :
* Le formulaire est peuplé avec les destinations et packages d'un fichier data.json local.
* La sélection d'une destination met à jour les packages disponibles.
* Les form fields sont show/hide dynamiquement (ex: un field "Suit Size" n'apparaît que pour les packages incluant un moonwalk).
* Une section existe pour ajouter les details de multiple passengers, avec un bouton pour ajouter dynamiquement plus de passenger input sets.


User Story 4: Live Price Calculation & Extras

Description : En tant qu'utilisateur, je veux voir le total price se mettre à jour en real-time lors de mes selections et ajouts d'extras afin de comprendre immédiatement les implications financières.
Critères d'Acceptation :
* Le base price change quand l'utilisateur sélectionne une destination ou un package différent.
* Les optional extras (insurance, photo pack, etc.) ont leurs prices clairement listées.
* Le total price est recalculé instantanément à chaque modification de la destination, du package, du number of passengers ou des extras.
* Le final price est clairement displayé avant la submission.


User Story 5: Client-Side Form Validation

Description : En tant qu'utilisateur, je veux des validation messages clairs et inline lorsque je remplis incorrectement le booking form afin de pouvoir corriger mes erreurs avant de submit.
Critères d'Acceptation :
* Les required fields sont validés (ex: name, email).
* Le email format est validé en utilisant un regex pattern.
* Le phone number format est validé en utilisant un regex pattern.
* La date selection est restreinte aux future dates et within un booking window de 30 jours.
* Les inline error messages apparaissent à côté des invalid fields.
* Le formulaire ne peut être submitted que lorsque tous les validation errors sont résolus.


User Story 6: Booking Persistence (Create)

Description : En tant qu'utilisateur, je veux que ma booking complétée soit saved afin de pouvoir la view ou manage plus tard.
Critères d'Acceptation :
* Après une successful form validation, les booking data sont saved dans le localStorage.
* Chaque booking se voit attribuer un unique ID.
* Si l'user n'est pas logged in, il est prompted à se login ou à continuer en tant que "guest", et la booking est tout de même saved.
* Après le saving, l'user reçoit une success confirmation et est redirecté vers sa page "My Bookings" ou la ticket page.


Epic: Booking CRUD Interface


User Story 7: View My Bookings

Description : En tant qu'utilisateur, je veux voir une liste de toutes mes reservations passées et à venir sur une page "My Bookings".
Critères d'Acceptation :
* La page "My Bookings" fetch et display toutes les bookings liées au current user (ou guest session) depuis le localStorage.
* Chaque booking dans la liste show les key information: Destination, Date et Total Price.
* La liste est visuellement clear et responsive.


User Story 8: Edit an Existing Booking

Description : En tant qu'utilisateur, je veux edit les détails d'une booking existante à partir de ma liste.
Critères d'Acceptation :
* Chaque booking dans la liste "My Bookings" a un bouton "Edit".
* Cliquer sur "Edit" navigate vers le booking form avec tous les fields pre-filled avec les existing data.
* Le formulaire est updated avec le live pricing et la validation, fonctionnant de la même manière que lors de la creation.
* La submission du edited form save la booking updated (sous le même unique ID) dans le localStorage.


User Story 9: Cancel a Booking

Description : En tant qu'utilisateur, je veux cancel une booking, avec une confirmation step pour éviter une accidental deletion.
Critères d'Acceptation :
* Chaque booking dans la liste "My Bookings" a un bouton "Cancel" ou "Delete".
* Cliquer sur le bouton trigger une confirmation dialog (ex: window.confirm ou une custom modal).
* Si confirmé, la booking est removed du localStorage.
* La liste "My Bookings" update immédiatement pour refléter la cancellation.


Epic: Ticket Generation


User Story 10: Generate a Printable Ticket

Description : En tant qu'utilisateur, après avoir fait ou view une booking, je veux voir un well-formatted, printable ticket.
Critères d'Acceptation :
* Un bouton "View Ticket" est disponible depuis la booking confirmation page et la liste "My Bookings".
* Cliquer dessus lead à une dedicated printable ticket page ou ouvre une printable modal.
* Le ticket display tous les relevant booking details dans un clean, easy-to-read layout.
* La page include un bouton "Print" qui trigger le browser's print dialog en utilisant window.print().
* Un print stylesheet est applied pour garantir que le ticket print correctly sur du A4/Letter paper, en cachant la navigation et les autres non-essential UI elements.


Epic: Enhanced Discovery & Usability


User Story 11: Search & Filter on Destinations Page

Description : En tant qu'utilisateur, je veux search et filter la liste des destinations pour trouver facilement un trip qui match mes interests et mon budget.
Critères d'Acceptation :
* Les données des destinations sont chargées dynamiquement depuis un fichier JSON
* Une search bar permet de filter les destinations par name, type ou description.
* Des filter controls (dropdowns, sliders) permettent de filter par : type (planet, moon), price range, duration range et distance range.
* La liste update dynamiquement pendant que l'user type ou adjust les filters.


User Story 12: Pagination on Destinations Page

Description : En tant qu'utilisateur, je veux browse les destinations par manageable chunks afin que la page ne soit pas overwhelming.
Critères d'Acceptation :
* Les données sont fetched depuis un fichier JSON externe
* Un maximum de 4 destinations cards sont displayed par page.
* Des boutons Previous/Next et/ou des page number links sont présents pour la navigation.
* La Pagination fonctionne conjointement avec la search et les filters, ne paginant qu'à travers les filtered results.


User Story 13: Accessible and Performant Experience

Description : En tant qu'utilisateur, y compris ceux avec des disabilities ou sur mobile devices, je veux que le website soit fast, easy à naviguer et accessible.
Critères d'Acceptation :
* Tous les interactive elements sont navigables en utilisant un keyboard.
* Toutes les images ont des descriptive alt tags.
* Les semantic HTML tags (<header>, <main>, <section>, <nav>) sont utilisées appropriately.
* Le site utilise une mobile-first CSS approach avec des rem/em units pour la scalability.
* Les images sont optimized (compressed, modern formats) pour garantir un fast loading.


Epic: Bonus Features


User Story B1: QR Code on Ticket

Description : En tant qu'utilisateur, je veux que mon printable ticket inclue un QR code contenant le booking ID pour un easy check-in.
Critères d'Acceptation :
* Le printable ticket include un generated QR code.
* Le QR code encode un unique identifier pour la booking (ex: le booking ID ou une URL).


User Story B2: Export Booking as PDF

Description : En tant qu'utilisateur, je veux download mon ticket en tant que PDF file pour un offline storage.
Critères d'Acceptation :
* Un bouton "Download PDF" est disponible sur la ticket page.
* Cliquer sur le bouton generate et download un PDF file du ticket en utilisant une client-side library.