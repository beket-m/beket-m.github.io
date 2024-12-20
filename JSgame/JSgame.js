const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

let score = 0;
let level = 1;
let isGameOver = false;
let enemyTargetX, enemyTargetY;
let isCollisionEnabled = false; // Disable collision at the start so you don't automatically loose

// Player movement
document.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    
    const step = 10;
    const playerRect = player.getBoundingClientRect();
    const gameAreaRect = gameArea.getBoundingClientRect();

    switch (e.key) {
        case 'ArrowUp':
            if (playerRect.top > gameAreaRect.top) player.style.top = `${player.offsetTop - step}px`;
            break;
        case 'ArrowDown':
            if (playerRect.bottom < gameAreaRect.bottom) player.style.top = `${player.offsetTop + step}px`;
            break;
        case 'ArrowLeft':
            if (playerRect.left > gameAreaRect.left) player.style.left = `${player.offsetLeft - step}px`;
            break;
        case 'ArrowRight':
            if (playerRect.right < gameAreaRect.right) player.style.left = `${player.offsetLeft + step}px`;
            break;
    }

    checkCollectibleCollision(); // Check for collectible collision on movement
});

// Set a random target position for the enemy within the game area
function setEnemyTarget() {
    enemyTargetX = Math.random() * (gameArea.clientWidth - enemy.clientWidth);
    enemyTargetY = Math.random() * (gameArea.clientHeight - enemy.clientHeight);
}

// Move the enemy toward its target position
function moveEnemy() {
    if (isGameOver) return;

    const speed = 1 + level * 0.5; // Increase speed slightly with each level
    const dx = enemyTargetX - enemy.offsetLeft;
    const dy = enemyTargetY - enemy.offsetTop;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If close enough to the target, set a new target
    if (distance < 5) { // Adjusted threshold to avoid "freezing"
        setEnemyTarget();
    } else {
        // Move enemy a small step toward the target
        enemy.style.left = `${enemy.offsetLeft + (dx / distance) * speed}px`;
        enemy.style.top = `${enemy.offsetTop + (dy / distance) * speed}px`;
    }

    // Check collision only if collision is enabled
    if (isCollisionEnabled) {
        checkEnemyCollision();
    }

    requestAnimationFrame(moveEnemy);
}

// Check for collision between player and enemy
function checkEnemyCollision() {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
        playerRect.left < enemyRect.right &&
        playerRect.right > enemyRect.left &&
        playerRect.top < enemyRect.bottom &&
        playerRect.bottom > enemyRect.top
    ) {
        endGame(false);
    }
}

// Generate collectible items randomly
function generateCollectible() {
    const collectible = document.createElement('div');
    collectible.classList.add('collectible');
    collectible.style.width = '15px';
    collectible.style.height = '15px';
    collectible.style.position = 'absolute';
    collectible.style.backgroundColor = 'gold';
    collectible.style.borderRadius = '50%';
    collectible.style.top = `${Math.random() * (gameArea.clientHeight - 15)}px`;
    collectible.style.left = `${Math.random() * (gameArea.clientWidth - 15)}px`;

    gameArea.appendChild(collectible);
}

// Check for collision between player and collectible
function checkCollectibleCollision() {
    const collectibles = document.querySelectorAll('.collectible');
    const playerRect = player.getBoundingClientRect();

    collectibles.forEach((collectible) => {
        const collectibleRect = collectible.getBoundingClientRect();

        if (
            playerRect.left < collectibleRect.right &&
            playerRect.right > collectibleRect.left &&
            playerRect.top < collectibleRect.bottom &&
            playerRect.bottom > collectibleRect.top
        ) {
            score++;
            scoreDisplay.innerText = score;
            collectible.remove();
            checkLevelUp();
        }
    });
}

// Check if score is enough to level up
function checkLevelUp() {
    if (score >= level * 5) { // Increase level after every 5 points
        level++;
        if (level > 3) {
            endGame(true);
        } else {
            messageDisplay.innerText = 'Next Level!';
            setTimeout(() => messageDisplay.innerText = '', 2000);
        }
    }
}

// End the game
function endGame(won) {
    isGameOver = true;
    messageDisplay.innerText = won ? 'You Won!' : 'You Lost!';
    clearInterval(collectibleInterval);
    document.querySelectorAll('.collectible').forEach(c => c.remove());
}

// Game initialization
function startGame() {
    player.style.top = '0px';
    player.style.left = '0px';
    score = 0;
    level = 1;
    isGameOver = false;
    scoreDisplay.innerText = score;
    messageDisplay.innerText = '';
    isCollisionEnabled = false;

    setEnemyTarget(); // Set initial target for the enemy
    requestAnimationFrame(moveEnemy); // Start enemy movement
    collectibleInterval = setInterval(generateCollectible, 2000);

    // Enable collision detection after a 2-second grace period
    setTimeout(() => {
        isCollisionEnabled = true;
    }, 2000);
}

startGame();

