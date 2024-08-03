// Character class
class Character {
    constructor(name, charClass, health, attack, defense, magic) {
        this.name = name;
        this.charClass = charClass;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.magic = magic;
        this.isDefending = false;
        this.experience = 0;
        this.level = 1;
    }

    displayStats() {
        return `${this.name} the ${this.charClass} - Level: ${this.level}, Health: ${this.health}, Attack: ${this.attack}, Defense: ${this.defense}, Magic: ${this.magic}, XP: ${this.experience}`;
    }

    useFirebolt() {
        const fireboltDamage = this.magic * 2;
        return fireboltDamage;
    }

    defend() {
        this.isDefending = true;
    }

    resetDefense() {
        this.isDefending = false;
    }

    gainExperience(xp) {
        this.experience += xp;
        if (this.experience >= 100) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level += 1;
        this.experience -= 100;
        this.health += 10;
        this.attack += 2;
        this.defense += 2;
        this.magic += 2;
        logMessage(`${this.name} has leveled up to Level ${this.level}!`);
    }
}

// Enemy class
class Enemy {
    constructor(name, health, attack, defense, xpValue) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.xpValue = xpValue;
    }

    displayStats() {
        return `${this.name} - Health: ${this.health}, Attack: ${this.attack}, Defense: ${this.defense}`;
    }
}

// Initialize character
let player;

// Random enemy generator
const enemies = [
    new Enemy('Goblin', 30, 5, 2, 20),
    new Enemy('Orc', 50, 7, 3, 30),
    new Enemy('Troll', 70, 10, 5, 50)
];

let currentEnemy = getRandomEnemy();
let logArchive = [];

function getRandomEnemy() {
    const randomIndex = Math.floor(Math.random() * enemies.length);
    return enemies[randomIndex];
}

function updateStats() {
    document.getElementById('character-stats').innerText = player.displayStats();
    document.getElementById('enemy-stats').innerText = currentEnemy.displayStats();
}

function logMessage(message) {
    const gameLog = document.getElementById('game-log');
    gameLog.innerText += message + '\n';
}

function clearLog() {
    const gameLog = document.getElementById('game-log');
    gameLog.innerText = '';
    document.getElementById('clear-log-button').style.display = 'none';
}

function archiveLog() {
    logArchive.push(document.getElementById('game-log').innerText);
    clearLog();
}

function attackEnemy() {
    player.resetDefense();
    const damageToEnemy = player.attack - currentEnemy.defense;
    currentEnemy.health -= damageToEnemy;
    logMessage(`You attacked the ${currentEnemy.name} for ${damageToEnemy} damage.`);

    if (currentEnemy.health <= 0) {
        logMessage(`You defeated the ${currentEnemy.name}! You gained ${currentEnemy.xpValue} XP.`);
        player.gainExperience(currentEnemy.xpValue);
        currentEnemy = getRandomEnemy();
        logMessage(`A wild ${currentEnemy.name} appears!`);
        updateStats();
        document.getElementById('clear-log-button').style.display = 'block';
    } else {
        enemyAttack();
    }

    updateStats();
}

function useFirebolt() {
    player.resetDefense();
    const fireboltDamage = player.useFirebolt() - currentEnemy.defense;
    currentEnemy.health -= fireboltDamage;
    logMessage(`You cast Firebolt on the ${currentEnemy.name} for ${fireboltDamage} damage.`);

    if (currentEnemy.health <= 0) {
        logMessage(`You defeated the ${currentEnemy.name}! You gained ${currentEnemy.xpValue} XP.`);
        player.gainExperience(currentEnemy.xpValue);
        currentEnemy = getRandomEnemy();
        logMessage(`A wild ${currentEnemy.name} appears!`);
        updateStats();
        document.getElementById('clear-log-button').style.display = 'block';
    } else {
        enemyAttack();
    }

    updateStats();
}

function defend() {
    player.defend();
    logMessage(`${player.name} is defending and will nullify the next attack.`);
    updateStats();
}

function enemyAttack() {
    if (player.isDefending) {
        logMessage(`The ${currentEnemy.name} attacked but ${player.name} nullified the damage.`);
    } else {
        const damageToPlayer = currentEnemy.attack - player.defense;
        player.health -= damageToPlayer;
        logMessage(`The ${currentEnemy.name} attacked you for ${damageToPlayer} damage.`);
    }

    if (player.health <= 0) {
        logMessage(`You have been defeated by the ${currentEnemy.name}. Game over!`);
        document.getElementById('attack-button').disabled = true;
        document.getElementById('skills-button').disabled = true;
        document.getElementById('defend-button').disabled = true;
    }

    updateStats();
}

function displayBackstory() {
    logMessage("You awaken with a start. The last thing you remember is finishing work, driving home, and then... everything went blank.");
    logMessage("As you open your eyes, you find yourself in an unfamiliar place. A soft, omniscient voice echoes around you:");
    logMessage("\"Welcome to the world of Zarpathia, brave adventurer. Your journey begins here, in a land filled with wonder and danger. Prepare yourself for the adventures that await. Choose your path wisely, for your actions will shape your destiny.\"");
    document.getElementById('clear-log-button').style.display = 'block';
}

function showSkillsMenu() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('skills-menu').style.display = 'block';
}

function hideSkillsMenu() {
    document.getElementById('skills-menu').style.display = 'none';
    document.getElementById('game').style.display = 'block';
}

function showLogArchive() {
    const logArchiveContent = document.getElementById('log-archive-content');
    logArchiveContent.innerHTML = '';
    logArchive.forEach((log, index) => {
        const logSection = document.createElement('div');
        logSection.classList.add('scrollable-text');
        logSection.innerHTML = `<h3>Log ${index + 1}</h3><pre>${log}</pre>`;
        logArchiveContent.appendChild(logSection);
    });
    document.getElementById('game').style.display = 'none';
    document.getElementById('log-archive').style.display = 'block';
}

function hideLogArchive() {
    document.getElementById('log-archive').style.display = 'none';
    document.getElementById('game').style.display = 'block';
}

function createCharacter(name, charClass) {
    const baseStats = {
        Mage: { health: 80, attack: 5, defense: 3, magic: 20 },
        Monk: { health: 90, attack: 7, defense: 7, magic: 5 },
        Ranger: { health: 85, attack: 8, defense: 5, magic: 10 },
        Warrior: { health: 100, attack: 10, defense: 8, magic: 2 },
    };
    const stats = baseStats[charClass];
    return new Character(name, charClass, stats.health, stats.attack, stats.defense, stats.magic);
}

document.getElementById('next-button').addEventListener('click', () => {
    const characterName = document.getElementById('character-name').value.trim();
    if (characterName) {
        document.getElementById('character-name-input').style.display = 'none';
        document.getElementById('class-selection').style.display = 'block';
    } else {
        alert("Please enter a name for your character.");
    }
});

document.querySelectorAll('.class-button').forEach(button => {
    button.addEventListener('click', (event) => {
        const charClass = event.target.getAttribute('data-class');
        const characterName = document.getElementById('character-name').value.trim();
        player = createCharacter(characterName, charClass);
        document.getElementById('class-selection').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        updateStats();
        displayBackstory();
        logMessage(`A wild ${currentEnemy.name} appears!`);
        updateStats();
    });
});

document.getElementById('attack-button').addEventListener('click', attackEnemy);
document.getElementById('firebolt-skill').addEventListener('click', () => {
    hideSkillsMenu();
    useFirebolt();
});
document.getElementById('skills-button').addEventListener('click', showSkillsMenu);
document.getElementById('defend-button').addEventListener('click', defend);
document.getElementById('back-button').addEventListener('click', hideSkillsMenu);
document.getElementById('clear-log-button').addEventListener('click', clearLog);
document.getElementById('archive-log-button').addEventListener('click', () => {
    archiveLog();
    showLogArchive();
});
document.getElementById('back-to-game-button').addEventListener('click', hideLogArchive);

// Initial display of stats for clarity
updateStats();
