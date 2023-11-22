// HTML elemek lekérése
const canvas = document.getElementById('map');
const ctx = canvas.getContext('2d');

const minimapCanvas = document.getElementById('minimap');
const minimapCtx = minimapCanvas.getContext('2d');

const playerMarker = document.getElementById('player-marker');;

/* NO GAME SOUND ATM
const backgroundMusic = new Audio('hangok/Soundtrack.wav');
backgroundMusic.loop = true; // Loop beállítása true-ra
document.addEventListener('click', function() {
    backgroundMusic.play();
});
*/

//----------------------------------------------------------GAME-------------------------------------------------------
// Minden eleterő csík kirajzolása
function drawHealthBar(x, y, currentHealth, maxHealth) {
    const barWidth = 100; // A csík szélessége
    const barHeight = 10; // A csík magassága
    const barPadding = 5; // A csík és a hajó közötti tér
    const fillColor = 'green'; // A zöld szín
    const borderColor = 'black'; // A fekete keret színe

    // A csík kitöltése
    const filledWidth = (currentHealth / maxHealth) * barWidth;

    // Csík pozíciója középre igazítva a középpontokhoz képest
    const barX = x - barWidth / 2;
    const barY = y - barHeight / 2 - barPadding - 40; // Itt is módosíthatod a magasságot

    ctx.fillStyle = fillColor;
    ctx.fillRect(barX, barY, filledWidth, barHeight);

    // A csík körvonalának kirajzolása
    ctx.strokeStyle = borderColor;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
}
//----------------------------------------------------------currentShip-------------------------------------------------------
// Alapértelmezett hajó kiválasztása (Phoenix)
let currentShip = ships.Phoenix;
console.log(currentShip);

// A Selected ship eleterőjének inicializálása
let selectedShipMaxHealth = currentShip.currentHealth;
let selectedShipCurrentHealth = currentShip.currentHealth;

// Selected ship eletero csíkja
function drawShipHealthBar() {
    drawHealthBar(playerShip.x, playerShip.y, selectedShipCurrentHealth, selectedShipMaxHealth);
}

// Player
const playerShip = {
    angle: 0,
    x: canvas.width / 2, //elhelyezkedese
    y: canvas.height / 2,
    currentImageIndex: 16,
    movement: { forward: false, backward: false, left: false, right: false },
    images: [], // Hajó képek tárolására
    bullets: [], // Lövések tárolására
};

// Hajó képek forrásainak összeállítása
let imageSources = [];
for (let i = 1; i <= 32; i++) {
    imageSources.push(`ships/${currentShip.name}/${i}.png`);
}

// Hajó képek betöltése a playerShip.images tömbbe
function loadImages(start = true) {
    let loadedImages = 0;

    for (const src of imageSources) {
        const img = new Image();
        img.src = src;
        img.onload = function() {
            loadedImages++;
            if (loadedImages === imageSources.length && start) {
                startAnimation();
            }
        };
        playerShip.images.push(img);
    }

}

let ammoCount = {
    x1: 500,
    x2: 100,
    x3: 100,
    x4: 900
};

let currentShipBulletDamage = {
    x1: currentShip.bulletDamage.x1,
    x2: currentShip.bulletDamage.x2,
    x3: currentShip.bulletDamage.x3,
    x4: currentShip.bulletDamage.x4,
};

function setBulletDamage(ship) {
    currentShipBulletDamage.x1 = ship.bulletDamage.x1;
    currentShipBulletDamage.x2 = ship.bulletDamage.x2;
    currentShipBulletDamage.x3 = ship.bulletDamage.x3;
    currentShipBulletDamage.x4 = ship.bulletDamage.x4;
}

let bullets = {
    x1: {
        damage: currentShipBulletDamage.x1,
        imageSource: 'lezerek/x1.png' 
    },
    x2: {
        damage: currentShipBulletDamage.x2,
        imageSource: 'lezerek/x2.png' 
    },
    x3: {
        damage: currentShipBulletDamage.x3,
        imageSource: 'lezerek/x3.png' 
    },
    x4: {
        damage: currentShipBulletDamage.x4, 
        imageSource: 'lezerek/x4.png' 
    }
    
};

// Lövés létrehozása
function createBullet(x, y, angle, speed, type) {
    return {
        x,
        y,
        angle,
        speed,
        type
    };
}

// Hajó lövedékeinek tömbje
playerShip.bullets = [];
/*
// damage text 
function displayDamageText(x, y, damage) {
    const damageText = document.createElement('div');
    damageText.className = 'damage-text';
    damageText.textContent = `-${damage}`;
    damageText.style.left = x/2 + 'px';
    damageText.style.top = y/2 + 'px';
    
    document.body.appendChild(damageText);
    
    // Az üzenet idővel eltűnik
    setTimeout(() => {
        damageText.remove();
    }, 2000); // Az üzenet 1 másodpercig marad meg, majd eltűnik
}
*/
function displayDamageText(x, y, damage, canvasContext) {
    const context = canvasContext;

    // Rajzolás a megadott canvas kontextusban
    context.fillStyle = 'red';
    context.font = '24px Arial';

    // A szöveget középre igazítva rajzoljuk a megadott koordinátákon
    const text = `-${damage}`;
    const textWidth = context.measureText(text).width;
    context.fillText(text, x - textWidth / 2, y);
}

//kill count 
let ufoKillCount = 0;
let kredit = 0;
let uridium = 0;
let xp = 0;
//----------------------------------------------------------UFO-------------------------------------------------------
// Az UFO eleterőjének inicializálása
const ufoMaxHealth = 50000; // Az UFO maximális életereje
let ufoCurrentHealth = ufoMaxHealth; // Az UFO jelenlegi életereje

// UFO eleterő csíkja
function drawUFOHealthBar() {
    const offsetX = 55; // Módosíthatod az eltolás mértékét
    drawHealthBar(UFO.x + offsetX, UFO.y, ufoCurrentHealth, ufoMaxHealth);
}
// UFO objektum létrehozása
const UFO = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: Math.random() * 2 + 1,
    isMoving: true,
    images: [],
    direction: Math.random() * Math.PI * 2, // Inicializáld az UFO irányát egy véletlen szöggel
};

// UFO képek forrásainak összeállítása
const ufoimageSources = [];
for (let i = 1; i <= 8; i++) {
    ufoimageSources.push(`images/ufo/u${i}.png`);
}

// UFO képek betöltése a UFO.images tömbbe
function loadUFOImages() {
    let loadedImages = 0;

    for (const src of ufoimageSources) {
        const img = new Image();
        img.src = src;
        img.onload = function() {
            loadedImages++;
            if (loadedImages === ufoimageSources.length) {
                // Az összes UFO kép betöltése után indítsd el az animációt
                startAnimation();
            }
        };
        UFO.images.push(img);
    }
}

// UFO képek betöltése
loadUFOImages();
//----------------------------------------------------------KORDINATA-------------------------------------------------------
// Koordináták megjelenítése
function displayCoordinates(x, y) {
    const roundedX = Math.round(x);
    const roundedY = Math.round(y);
    document.getElementById("x-coordinate").textContent = roundedX;
    document.getElementById("y-coordinate").textContent = roundedY;

    const canvas = document.getElementById('map'); // Canvas elem lekérése az id alapján
    const ctx = canvas.getContext('2d'); // 2D rajzolási kontextus lekérése
}
//----------------------------------------------------------HOTBAR+SOUND-------------------------------------------------------
const hotbar = document.getElementById('inventory-hotbar');
const items = hotbar.getElementsByTagName('li');
let selectedSlot = 0; // Az aktuálisan kijelölt slot

function selectItem(slot) {
    // Töröld az összes elemről a kijelölést
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('selected');
    }
    
    // Kijelölés hozzáadása az aktuális slot-hoz
    items[slot].classList.add('selected');
    selectedSlot = slot;
}

// Alapértelmezett elem kijelölése (pl. az első)
selectItem(selectedSlot);


document.addEventListener('keydown', (event) => {
    if (event.key === ' ' && canShoot) {
        // Csak akkor indítsd a lövést, ha a szóköz gombot nyomtad meg, és nincs már folyamatban egy lövés
        items[selectedSlot].click();
        canShoot = false; // Lövés indítása után a lehetőség letiltása
    }

    if (event.key >= '1' && event.key <= '4') {
        const slot = parseInt(event.key) - 1;
        if (slot >= 0 && slot < items.length) {
            // Kattints rá az adott slotra
            selectItem(slot); // Kijelölés

            // Hang lejátszása
            const selectSound = new Audio('hangok/select.wav');
            selectSound.play();

            canShoot = false; // Ne indíts lövést az "1" és "4" gombok lenyomásakor
        }
    }
});

// Újra engedélyezze a lövést a gombok felengedésekor
document.addEventListener('keyup', (event) => {
    if (event.key === ' ' || (event.key >= '1' && event.key <= '4')) {
        canShoot = true;
    }
});

// Példa: elem kattintásra való kijelölése
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', () => {
        selectItem(i);
        const types = ['x1', 'x2', 'x3', 'x4'];
        shoot(types[i]);
    });
}

// Példa: elem kattintásra való kijelölése
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('click', () => {
        selectItem(i);
    });
}
//----------------------------------------------------------KEYBOARD INPUT-------------------------------------------------------
// Objektum létrehozása a lenyomott billentyűk nyomon követésére
const keys = {};

// Az állapotok inicializálása
let canShoot = true; // Hozzáadott változó, ami nyomon követi, lehet-e lőni

document.addEventListener('keydown', function(event) {
    keys[event.key] = true; // Billentyű hozzáadása az objektumhoz

    if (keys[' '] && canShoot) { // Szóköz billentyű és lehet lőni
        shoot();
        canShoot = false; // Lövés után a lehetőség letiltása
    }
});

// Billentyűzet felengedés eseménykezelője
document.addEventListener('keyup', function(event) {
    keys[event.key] = false; // Billentyű eltávolítása az objektumból

    if (event.key === ' ') {
        canShoot = true; // Szóköz felengedésekor a lövés lehetőségének engedélyezése
    }
});

// Időzített függvény létrehozása
const updateInterval = 90; // Időzítési időköz (100 ms = 0,1 másodperc)
setInterval(update, updateInterval);

// Függvény a játék állapotának frissítésére
function update() {
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        // Balra fordulás
        playerShip.angle -= 11.25; // Balra fordulás 11.25 fokkal
        playerShip.currentImageIndex -= 1; // Előző képre váltás
        if (playerShip.currentImageIndex < 0) {
            playerShip.currentImageIndex = playerShip.images.length - 1; // Vissza az utolsó képre, ha túllépték a képek számát
        }
    }
    
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        // Jobbra fordulás
        playerShip.angle += 11.25; // Jobbra fordulás 11.25 fokkal
        playerShip.currentImageIndex += 1; // Következő képre váltás
        if (playerShip.currentImageIndex >= playerShip.images.length) {
            playerShip.currentImageIndex = 0; // Vissza az első képre, ha túllépték a képek számát
        }
    }

    if (keys['ArrowUp'] || keys['w'] || keys['W']) {
        playerShip.movement.forward = true; // Mozgás előre
    } else {
        playerShip.movement.forward = false; // Ha nem nyomod a gombot, állítsd le az előremenetet
    }
        
}

// Lövés funkció
function shoot(type) {
    const bulletType = bullets[type];

    if (bulletType && ammoCount[type] > 0) {
        const bulletSpeed = 10; // Példa sebesség
        const bulletAngle = playerShip.angle; // A hajó aktuális szöge

        // Lövedék létrehozása a hajó pozíciójánál, az aktuális szögével, sebességével és típusával
        const bullet = createBullet(playerShip.x, playerShip.y, bulletAngle, bulletSpeed, type);

        // Lövedék hozzáadása a hajó lövedékeinek tömbjéhez
        playerShip.bullets.push(bullet);

        // Lövedék számának csökkentése
        ammoCount[type]--;

        // Frissítsd az UI-t, hogy megjelenítse az aktuális lövedék mennyiséget
        document.getElementById(`ammo-${type}`).textContent = ammoCount[type];

        const shootSound = new Audio('hangok/shoot.wav');
        shootSound.play();
    }
}
//----------------------------------------------------------ANIMATION-------------------------------------------------------
// Animációs ciklus indítása
function startAnimation() {
    const backgroundImageWidth = canvas.width;                              // Háttérkép méretei
    const backgroundImageHeight = canvas.height;
    
    shipImage = playerShip.images[playerShip.currentImageIndex];      // Hajó méretei    a window az golobalis
    shipWidth = shipImage.width;
    shipHeight = shipImage.height;

    // Ütközés ellenőrzése
    function checkCollision() {
        // Hajó méretei
        const shipImage = playerShip.images[playerShip.currentImageIndex];
        const shipWidth = shipImage.width;
        const shipHeight = shipImage.height;

        // Bal vagy jobb széleken való kilépés ellenőrzése
        if (playerShip.x - shipWidth / 2 < 0) {
        playerShip.x = shipWidth / 2;
        } else if (playerShip.x + shipWidth / 2 > backgroundImageWidth) {
            playerShip.x = backgroundImageWidth - shipWidth / 2;
        }

        // Felső vagy alsó széleken való kilépés ellenőrzése
        if (playerShip.y - shipHeight / 2 < 0) {
            playerShip.y = shipHeight / 2;
        } else if (playerShip.y + shipHeight / 2 > backgroundImageHeight) {
            playerShip.y = backgroundImageHeight - shipHeight / 2;
        }
    }

    // Minimap kirajzolása
    function drawMinimap() {
        // Minimap canvas méretei
        const minimapWidth = minimapCanvas.width;
        const minimapHeight = minimapCanvas.height;

        // Játékos pozíciójának arányai a térkép méretéhez képest
        const playerXRatio = playerShip.x / backgroundImageWidth;
        const playerYRatio = playerShip.y / backgroundImageHeight;

        // Térkép kirajzolása a minimap-re
        minimapCtx.clearRect(0, 0, minimapWidth, minimapHeight);
        minimapCtx.drawImage(canvas, 0, 0, backgroundImageWidth, backgroundImageHeight, 0, 0, minimapWidth, minimapHeight);

        // Játékos pozíciójának kirajzolása a minimap-en
        const playerX = playerXRatio * minimapWidth;
        const playerY = playerYRatio * minimapHeight;
        playerMarker.style.transform = `translate(${playerX}px, ${playerY}px)`;
    }

    // Lövések kirajzolása képpel
    function drawBullets() {
        for (const bullet of playerShip.bullets) {
            ctx.save(); // Az aktuális rajzolási állapot elmentése
        
            // Lövedék pozíciójának és elforgatásának beállítása az aktuális szög függvényében
            ctx.translate(bullet.x, bullet.y);
            ctx.rotate((bullet.angle * Math.PI) / 180); // Szöget radiánba konvertáljuk
        
            const bulletType = bullets[bullet.type]; // A megfelelő lövedék típus lekérése
            if (bulletType) {
                const bulletImage = new Image();
                bulletImage.src = bulletType.imageSource;
        
                const bulletX = -bulletImage.width / 2; // Lövedék középpontja miatt
                const bulletY = -bulletImage.height / 2; // Lövedék középpontja miatt
        
                ctx.drawImage(bulletImage, bulletX, bulletY, bulletImage.width, bulletImage.height);
            }
        
            ctx.restore(); // Az eredeti rajzolási állapot visszaállítása
        }
    }

    // Az updateBullets függvényben csak hívd meg a drawBullets függvényt
    function updateBullets() {
    const bulletsToRemove = [];

    for (const bullet of playerShip.bullets) {
        const angleInRadians = (bullet.angle * Math.PI) / 180;
        bullet.x += Math.cos(angleInRadians) * bullet.speed;
        bullet.y += Math.sin(angleInRadians) * bullet.speed;

        // Ellenőrizd, hogy a lövés kilépett-e a képernyőről
        if (
            bullet.x < 0 ||
            bullet.x > backgroundImageWidth ||
            bullet.y < 0 ||
            bullet.y > backgroundImageHeight
        ) {
            bulletsToRemove.push(bullet);
        }
    }

    // Töröld azokat a lövéseket, amelyek kiléptek a képernyőről
    for (const bullet of bulletsToRemove) {
        const index = playerShip.bullets.indexOf(bullet);
        if (index !== -1) {
            playerShip.bullets.splice(index, 1);
            }
        }
    }


    // Animációs ciklus
    function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const shipImage = playerShip.images[playerShip.currentImageIndex];

    if (playerShip.movement.forward) {
        const angleInRadians = (playerShip.angle * Math.PI) / 180;
        const speed = currentShip.speed; // Mozgás sebessége
        playerShip.x += Math.cos(angleInRadians) * speed;
        playerShip.y += Math.sin(angleInRadians) * speed;

        // Ütközés ellenőrzése a pályahatárokkal
        checkCollision();
        
    }

    // UFO kirajzolása és pozíciójának frissítése
    if (UFO.isMoving) {
        const ufoImages = UFO.images;
        const ufoImageIndex = Math.floor(Date.now() / 100) % ufoImages.length;
        const ufoImage = ufoImages[ufoImageIndex];

        // Aktuális UFO pozíció elmentése
        const prevX = UFO.x;
        const prevY = UFO.y;

        // UFO pozíciójának frissítése
        UFO.x += Math.cos(UFO.direction) * UFO.speed;
        UFO.y += Math.sin(UFO.direction) * UFO.speed;

        // UFO pozíciójának ellenőrzése a térképen belül
        UFO.x = Math.min(canvas.width - ufoImage.width, Math.max(0, UFO.x));
        UFO.y = Math.min(canvas.height - ufoImage.height, Math.max(0, UFO.y));

        // Ellenőrizzük, hogy az UFO elérte-e a térkép szélét
        if (UFO.x === 0 || UFO.x === canvas.width - ufoImage.width || UFO.y === 0 || UFO.y === canvas.height - ufoImage.height) {
            // Ha igen, akkor választhatunk egy új irányt
            UFO.direction = Math.random() * Math.PI * 2; // Véletlenszerű irány kiválasztása
        }

        // UFO kirajzolása az új pozícióval
        ctx.drawImage(ufoImage, UFO.x, UFO.y, ufoImage.width, ufoImage.height);

    }

    // Az UFO és lövedékek ütközésének ellenőrzése
    function checkUFOCollision() {
    const ufoImage = UFO.images[0]; // Az UFO képe
    const ufoWidth = ufoImage.width;
    const ufoHeight = ufoImage.height;

    for (const bullet of playerShip.bullets) {
        if (
            bullet.x >= UFO.x &&
            bullet.x <= UFO.x + ufoWidth &&
            bullet.y >= UFO.y &&
            bullet.y <= UFO.y + ufoHeight
        ) {
            const bulletType = bullets[bullet.type];
            if (bulletType) {
                // Találat esetén csökkentjük az UFO életerejét a lövedék típusának megfelelően
                ufoCurrentHealth -= bulletType.damage;

                displayDamageText(UFO.x , UFO.y - 60 , bulletType.damage, ctx);
            }

            // Töröljük a lövedéket
            const index = playerShip.bullets.indexOf(bullet);
            if (index !== -1) {
                playerShip.bullets.splice(index, 1);
            }

            // Ha az UFO életereje 0 vagy annál kisebb, akkor lelőttük az UFO-t
            if (ufoCurrentHealth <= 0) {
                // Növeljük az eltalált UFO-k számát
                ufoKillCount++;
                kredit = kredit + 200000;
                uridium = uridium + 20;
                xp = xp + 250;
                // Majd újra inicializálhatod az UFO-t
                ufoCurrentHealth = ufoMaxHealth;
                UFO.x = Math.random() * canvas.width;
                UFO.y = Math.random() * canvas.height;
            }
        }
    }
}
//----------------------------------------------------------INFOBAR------------------------------------------------------
document.getElementById("health").textContent = selectedShipMaxHealth;      //HP

document.getElementById("ufokillcount").textContent = ufoKillCount;         //ufokillcount
document.getElementById("kredit").textContent = kredit;
document.getElementById("uridium").textContent = uridium;
document.getElementById("xp").textContent = xp;


document.getElementById("speed").textContent = currentShip.speed*75;        //az adott sebesseget megszorzom 75 el hogy ne legyen egyhanguak a szamok

// Az UFO és lövedékek ütközésének ellenőrzése minden frissítéskor
checkUFOCollision();
drawUFOHealthBar();

drawBullets(); // Hívd meg a drawBullets függvényt 
updateBullets();
// Hajó pozíciójának frissítése a képernyőn
displayCoordinates(playerShip.x, playerShip.y);
// Hajó kirajzolása x es y kirajzolasa
ctx.drawImage(shipImage, playerShip.x - shipWidth / 2, playerShip.y - shipHeight / 2);  
drawShipHealthBar();


// Minimap frissítése
drawMinimap();

// Következő animáció képkocka kérése
requestAnimationFrame(animate);
}

// Animáció indítása
animate();
}

// Képek betöltése
loadImages();

