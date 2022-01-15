const gameCanvas = document.getElementById('game'),
    ctx = gameCanvas.getContext('2d'),
    hpElem = document.getElementById('hp'),
    enemyKilledElem = document.getElementById('enemyKilled'),
    keyInput = document.getElementById('KeysInput'),
    moveButton = document.getElementById("btn-move"),
    settingsButton = document.getElementById('btn-settings'),
    settings = document.getElementById('settings'),
    root = document.documentElement;

gameCanvas.width = innerWidth - innerWidth / 10;
gameCanvas.height = innerHeight - innerHeight / 10;

moveButton.classList.add('hide');
settings.classList.add('hide');


let player, enemy = [], keys = [], gameSpeed = 15, maxEnemy = 5, enemyKiled = 0;

let wu = false,
    wd = false,
    wr = false,
    wl = false,
    settingsOpened = false;

// Check if the player is in the home
let isHome = false;

let time = 0, timer = 4;
function timerf() {
    if (time != timer) {
        time++;
    }
    setTimeout(timerf, 1000);
}
class Player {
    constructor(_x, _y, w, h, s, _hp, _maxHp, def, _damage) {
        this.x = _x;
        this.y = _y;
        this.width = w;
        this.height = h;
        this.speed = s;
        this.Hp = _hp;
        this.MaxHp = _maxHp;
        this.defense = def;
        this.damage = _damage;
    }
}
class Enemy {
    constructor(_x, _y, w, h, spd, _hp, _maxHp, dmg, _dx, _dy, _iq) {
        this.x = _x;
        this.y = _y;
        this.width = w;
        this.height = h;
        this.speed = spd;
        this.Hp = _hp;
        this.MaxHp = _maxHp;
        this.damage = dmg;
        this.dx = _dx;
        this.dy = _dy;
        this.iq = _iq;
    }
}
let waH = 50;
if (gameCanvas.width <= gameCanvas.height) {
    waH = gameCanvas.width;
} else if (gameCanvas.height < gameCanvas.width) {
    waH = gameCanvas.height;
}



function init() {
    player = new Player(
        gameCanvas.width / 2 - waH / 15 / 20,
        gameCanvas.height / 2 - waH / 15 / 2,
        waH / 15, waH / 15,
        waH / 1000 * gameSpeed, 100, 100, 100,
        10, 10);



    for (let i = 1; i <= maxEnemy; i++) {
        let randomSize = (Math.floor(Math.random() * 5) + 1) / 3,
            PoN = [-1, 1],
            randomPoNX = Math.floor(Math.random() * 2),
            randomPoNY = Math.floor(Math.random() * 2);
        enemy.push(new Enemy(
            gameCanvas.width / 2 - waH / 15 / 20 + (waH * PoN[randomPoNX]) / 15 * Math.floor(Math.random() * maxEnemy * gameCanvas.width / 700 + Math.floor(Math.random() * 5)),
            gameCanvas.height / 2 - waH / 15 / 2 + (waH * PoN[randomPoNY]) / 15 * Math.floor(Math.random() * maxEnemy * gameCanvas.height / 700 + Math.floor(Math.random() * 5 * 2)),
            waH / 15 * randomSize, waH / 15 * randomSize,
            waH / 1000 * gameSpeed,
            /* HP */100, 100,
            /* DAMAGE */ Math.floor(waH / 15 * randomSize / (waH / 15 * randomSize * waH / 15 * randomSize) * 100),
            /* DISTANCE */ 1000, 1000,
            /* IQ */(Math.floor(Math.random() * 5) + 1) * 27));
    }

    console.log(player.x + " " + player.y + " " + player.width + " " + player.height + " " + player.speed);
    draw();
    setTimeout(tick, 3000);
}
function walk(KeyType) {
    if (settingsOpened == false && player.Hp > 0) {
        if (KeyType == 'ARROW_KEYS') {
            if (keys[38]) {
                player.y -= player.speed;
            }
            if (keys[40]) {
                player.y += player.speed;
            }
            if (keys[37]) {
                player.x -= player.speed;
            }
            if (keys[39]) {
                player.x += player.speed;
            }
            if (keys[32]) {
                attack();
            }
            moveButton.classList.add('hide');
        } else if (KeyType == 'REGULAR_KEYS') {
            if (keys[87]) {
                player.y -= player.speed;
            }
            if (keys[83]) {
                player.y += player.speed;
            }
            if (keys[65]) {
                player.x -= player.speed;
            }
            if (keys[68]) {
                player.x += player.speed;
            }
            if (keys[32]) {
                attack();
            }
            moveButton.classList.add('hide');
        } else {
            if (wu == true) {
                player.y -= player.speed;
            }
            if (wd == true) {
                player.y += player.speed;
            } if (wr == true) {
                player.x += player.speed;
            } if (wl == true) {
                player.x -= player.speed;
            }
            moveButton.classList.remove('hide');
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    for (let i = 0; i < enemy.length; i++) {
        // Make the player look like 3d
        // let PlyoffsetX = ((player.x - player.width / 2) - gameCanvas.width / 2) * 0.05;
        // let PlyoffsetY = (player.x - player.width / 2) * 0.02;
        // ctx.fillStyle = 'darkred';
        // ctx.fillRect(player.x + PlyoffsetX, player.y + player.width / 1.7, player.width, player.height / PlyoffsetY);
        // ctx.fillRect(player.x, player.y + player.width / PlyoffsetY, player.width, player.height);

        // Make the Enemy look like 3d
        // let offsetX = ((enemy[i].x - enemy[i].width / 2) - gameCanvas.width / 2) * 0.05;
        // let offsetY = (enemy[i].x - enemy[i].width / 2) * 0.03;
        // ctx.fillStyle = 'darkblue';
        // ctx.fillRect(enemy[i].x + offsetX, enemy[i].y, enemy[i].width, enemy[i].height + enemy[i].width / offsetY);
        // ctx.fillRect(enemy[i].x, enemy[i].y + enemy[i].width / offsetY, enemy[i].width, enemy[i].height);

        if (player.Hp > 0) {
            ctx.fillStyle = 'darkred';
            ctx.fillRect(player.x, player.y + player.width / 1.7, player.width, player.height);
        }
        ctx.fillStyle = 'darkblue';
        ctx.fillRect(enemy[i].x, enemy[i].y + enemy[i].width / 1.7, enemy[i].width, enemy[i].height);
        ctx.fillStyle = 'blue';
        ctx.fillRect(enemy[i].x, enemy[i].y, enemy[i].width, enemy[i].height);

        if (player.Hp > 0) {
            ctx.fillStyle = 'red';
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }
    }
}

document.body.addEventListener("keydown", function (e) {
    if (settingsOpened == false) {
        e.preventDefault();
        keys[e.keyCode] = true;
    }
});

document.body.addEventListener("keyup", function (e) {
    if (settingsOpened == false) {
        keys[e.keyCode] = false;
    }
});
let cursor = document.getElementById('cursor');
document.body.addEventListener("mousemove", function (e) {
    let x = e.clientX,
        y = e.clientY;
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    });

function check() {
    if (isHome == true) {
        root.style.setProperty('--gameBgColor', "rgb(130, 50, 0)");
    } else {
        root.style.setProperty('--gameBgColor', "lightgreen");
    }
    setTimeout(check);
}


// ENEMY FUNCTION

let miss = [false, true],
    random = Math.floor(Math.random() * 2),
    random2 = Math.floor(Math.random() * 10);


function enemyf() {
    if (time >= timer && settingsOpened == false && player.Hp > 0) {
        let maxD = 300 * waH / 700;
        for (let i = 0; i < enemy.length; i++) {
            let speedBySize = 10 * (enemy[i].width / (enemy[i].width * enemy[i].width))

            enemy[i].dx = Math.floor(Math.abs(player.x - enemy[i].x) / waH * 100);
            enemy[i].dy = Math.floor(Math.abs(player.y - enemy[i].y) / waH * 100);

            if (enemy[i].dx < maxD && enemy[i].dy < maxD) {
                if (enemy[i].iq >= 100) {
                    if (enemy[i].x < player.x - enemy[i].width) {
                        enemy[i].x += enemy[i].speed * speedBySize * 0.25;
                    } else if (enemy[i].x > player.x + player.width) {
                        enemy[i].x -= enemy[i].speed * speedBySize * 0.25;
                    }
                    if (enemy[i].y < player.y - enemy[i].width) {
                        enemy[i].y += enemy[i].speed * 0.25 * speedBySize;
                    } else if (enemy[i].y > player.y + player.width) {
                        enemy[i].y -= enemy[i].speed * 0.25 * speedBySize;
                    }
                } else if (enemy[i].iq >= 60 && enemy[i].iq < 100) {
                    if (enemy[i].x < player.x - enemy[i].width) {
                        enemy[i].x += enemy[i].speed * speedBySize * 0.25;
                    } else if (enemy[i].x > player.x + player.width) {
                        enemy[i].x -= enemy[i].speed * speedBySize * 0.25;
                    } else if (enemy[i].y < player.y - enemy[i].width) {
                        enemy[i].y += enemy[i].speed * 0.25 * speedBySize;
                    } else if (enemy[i].y > player.y + player.width) {
                        enemy[i].y -= enemy[i].speed * 0.25 * speedBySize;
                    }
                } else if (enemy[i].iq < 60) {
                    if (miss[random] == false && random2 != 0) {
                        if (enemy[i].x < player.x - enemy[i].width) {
                            enemy[i].x += enemy[i].speed * speedBySize * 0.25;
                        } else if (enemy[i].x > player.x + player.width) {
                            enemy[i].x -= enemy[i].speed * speedBySize * 0.25;
                        } else if (enemy[i].y < player.y - enemy[i].width) {
                            enemy[i].y += enemy[i].speed * 0.25 * speedBySize;
                        } else if (enemy[i].y > player.y + player.width) {
                            enemy[i].y -= enemy[i].speed * 0.25 * speedBySize;
                        }
                    }
                }
            }
        }
    }
    setTimeout(enemyf);
}
function enemyIq60() {
    random = Math.floor(Math.random() * 2);
    random2 = Math.floor(Math.random() * 4);
    setTimeout(enemyIq60, 10000);
}


let maxAtcDis = 50 * waH / 700;
function enemyAtc() {
    if (time >= timer && settingsOpened == false && player.Hp > 0) {
        for (let i = 0; i < enemy.length; i++) {
            if (enemy[i].dx + enemy[i].width / 2 < maxAtcDis && enemy[i].dy + enemy[i].width / 2 < maxAtcDis) {
                player.Hp -= Math.floor(enemy[i].damage / (player.defense / (Math.floor(Math.random() * 3 + 1) * 20)));
            }
        }
    }
    setTimeout(enemyAtc, 1000);
}


// ENEMY FUNCTION END

function attack() {
    if (player.Hp > 0) {
        for (let i = 0; i < enemy.length; i++) {
            if (enemy[i].Hp > 0 && enemy[i].dx + enemy[i].width / 2 < maxAtcDis && enemy[i].dy + enemy[i].width / 2 < maxAtcDis) {
                enemy[i].Hp -= player.damage;
                console.log(player.damage)
            } else if (enemy[i].Hp <= 0) {
                enemy.splice(i, 1)
            }
        }
    }
}

// REGULAR_KEYS
function enemyRespawn() {
    let randomSize = (Math.floor(Math.random() * 5) + 1) / 3,
        PoN = [-1, 1],
        randomPoNX = Math.floor(Math.random() * 2),
        randomPoNY = Math.floor(Math.random() * 2);
    if (enemy.length < maxEnemy) {
        enemy.push(new Enemy(
            gameCanvas.width / 2 - waH / 15 / 20 + (waH * PoN[randomPoNX]) / 15 * Math.floor(Math.random() * maxEnemy * gameCanvas.width / 700 + Math.floor(Math.random() * 5)),
            gameCanvas.height / 2 - waH / 15 / 2 + (waH * PoN[randomPoNY]) / 15 * Math.floor(Math.random() * maxEnemy * gameCanvas.height / 700 + Math.floor(Math.random() * 5 * 2)),
            waH / 15 * randomSize, waH / 15 * randomSize,
            waH / 1000 * gameSpeed,
            /* HP */100, 100,
            /* DAMAGE */ Math.floor(waH / 15 * randomSize / (waH / 15 * randomSize * waH / 15 * randomSize) * 100),
            /* DISTANCE */ 1000, 1000,
            /* IQ */(Math.floor(Math.random() * 5) + 1) * 27));
    }
    setTimeout(enemyRespawn, 1000);
}


function openSettings() {
    console.log(keys)
    settingsButton.classList.add('hide');
    settings.classList.remove('hide');
}
function closeSettings() {
    settingsButton.classList.remove('hide');
    settings.classList.add('hide');
}

function tick() {
    hpElem.innerHTML = player.Hp;
    walk(keyInput.value);
    draw();
    requestAnimationFrame(tick);
}


init();
enemyf();
enemyAtc();
enemyRespawn();
enemyIq60();
timerf();
check();