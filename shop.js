// Eseménykezelő hozzáadása a shop modal megjelenítéséhez
document.getElementById("shop-button").addEventListener("click", function() {
    document.getElementById("shop-modal").style.display = "block";
});

// Eseménykezelő hozzáadása a bezárás gombhoz
document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("shop-modal").style.display = "none";
});

// Eseménykezelő hozzáadása az "Ammo" gombhoz
document.getElementById("open-ammo-button").addEventListener("click", function() {
    document.getElementById("ammo-info").style.display = "block"; // Láthatóvá teszi az "ammo-info" divet
    document.getElementById("ship-info").style.display = "none"; // Elrejti a "ship-info" divet
});

// Eseménykezelő hozzáadása a "Ships" gombhoz
document.getElementById("open-ships-button").addEventListener("click", function() {
    document.getElementById("ammo-info").style.display = "none"; // Elrejti az "ammo-info" divet
    document.getElementById("ship-info").style.display = "block"; // Láthatóvá teszi a "ship-info" divet
});

// Kattintáskezelő hozzáadása minden hajóképhez
const shipImages = document.querySelectorAll(".ship-image");

shipImages.forEach(function(shipImage) {
    shipImage.addEventListener("click", function() {
        // Távolítsd el az összes hajó képéről a "clicked" osztályt
        shipImages.forEach(function(image) {
            image.classList.remove("clicked");
        });

        // Adjuk hozzá a "clicked" osztályt csak a kattintott hajó képéhez
        this.classList.add("clicked");

        // Itt a többi kód a kattintáskezelődbe mehet (pl. információ megjelenítése)
        const shipKey = this.getAttribute("data-ship");
        const ship = ships[shipKey];
        displayShipInfo(ship);
    });
});

// Eseménykezelő hozzáadása a "Buy" gombhoz ----------------------------------------------------------------------------------------------------
document.getElementById("buy-ship-button").addEventListener("click", function() {
    // Ellenőrizd, hogy van-e kiválasztott hajó
    const selectedShipImage = document.querySelector(".ship-image.clicked");

    if (selectedShipImage) {
        const shipKey = selectedShipImage.getAttribute("data-ship");

        const newShip = ships[shipKey]; // Az új hajó, amit a játékos vásárol
        currentShip = newShip;

        console.log(currentShip);

        selectedShipMaxHealth = currentShip.currentHealth;
        selectedShipCurrentHealth = currentShip.currentHealth;
        speed = currentShip.speed;
        bullets.x1.damage = currentShip.bulletDamage.x1;
        bullets.x2.damage = currentShip.bulletDamage.x2;
        bullets.x3.damage = currentShip.bulletDamage.x3;
        bullets.x4.damage = currentShip.bulletDamage.x4;

        updateShipImages(currentShip.name);
        
        shipImage = playerShip.images[playerShip.currentImageIndex];      // Hajó méretei
        shipWidth = shipImage.width;
        shipHeight = shipImage.height;

        // Vegyük le az összes zöld keretet
        const allShipImages = document.querySelectorAll('.ship-image');
        allShipImages.forEach(function (shipImage) {
            shipImage.style.border = '2px solid black';
        });

        // Állítsuk be a zöld keretet a currentShip hajóra
        document.querySelector(`.ship-image[data-ship="${currentShip.name}"]`).style.border = '2px solid green';

        console.log(`Megvetted a(z) ${currentShip.name} hajót!`);

    }
});

// Frissíti a hajó képeinek forrásait az új hajónév alapján
function updateShipImages(newShipName) {
    imageSources = [];
    for (let i = 1; i <= 32; i++) {
        imageSources.push(`ships/${newShipName}/${i}.png`);
    }

    // Törlés minden korábban betöltött hajóképből
    playerShip.images = [];

    // Hajó képek betöltése az új források alapján
    loadImages(false);
}

//shopon beluli dokumentaciok
function displayShipInfo(ship) {
    document.getElementById("ship-name").textContent = ship.name;
    document.getElementById("ship-health").textContent = ship.maxHealth;
    document.getElementById("ship-shield").textContent = ship.maxShield;
    document.getElementById("ship-speed").textContent = ship.speed*75;
    document.getElementById("ship-damage-x1").textContent = ship.bulletDamage.x1;

    // A shop ablak megjelenítése
    document.getElementById("shop-modal").style.display = "block";
}

// SHOP IMAGE ROTATE *FIXED HALOZAT*

const shipImageElements = document.querySelectorAll(".ship-image"); // Adjuk hozzá újra ezt a sort
const numImagesPerRotation = 32;
const animationInterval = 100;

for (const shipKey in ships) {
    const ship = ships[shipKey];
    shipImages[ship.name] = []; 
    for (let i = 1; i <= 32; i++) {
        const img = new Image();
        img.src = `ships/${ship.name}/${i}.png`;
        shipImages[ship.name].push(img);
    }
}

// Az aktuális kép indexének kezelése
let rotationIndex = 0;

function animateShipRotation() {
    rotationIndex = (rotationIndex + 1) % 32;

    shipImageElements.forEach(function (imageElement) {
        const shipKey = imageElement.getAttribute("data-ship");
        const ship = ships[shipKey];
        rotateShopShipImage(ship, imageElement);
    });
}

function rotateShopShipImage(ship, imageElement) {
    const shipName = ship.name;
    imageElement.src = shipImages[shipName][rotationIndex].src;
}

// Az animációs időzítő indítása
setInterval(animateShipRotation, animationInterval);




