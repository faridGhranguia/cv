const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = { x: canvas.width / 2, y: canvas.height - 50, width: 50, height: 20 };
let bullets = [];
let targets = [];

function spawnTarget() {
    let text = "BOOM";
    let x = Math.random() * (canvas.width - 50);
    targets.push({ x, y: 0, text });
}

function shoot() {
    bullets.push({ x: player.x + player.width / 2, y: player.y });
}
setInterval(shoot, 500);
setInterval(spawnTarget, 2000);

canvas.addEventListener("mousemove", (e) => {
    player.x = e.clientX - player.width / 2;
});

canvas.addEventListener("touchmove", (e) => {
    player.x = e.touches[0].clientX - player.width / 2;
});

function update() {
    bullets.forEach((bullet, index) => {
        bullet.y -= 5;
        if (bullet.y < 0) bullets.splice(index, 1);
    });

    targets.forEach((target, tIndex) => {
        target.y += 2;
        bullets.forEach((bullet, bIndex) => {
            if (bullet.x > target.x && bullet.x < target.x + 50 && bullet.y < target.y + 20) {
                targets.splice(tIndex, 1);
                bullets.splice(bIndex, 1);
            }
        });
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e8e8e8";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    ctx.fillStyle = "#e8e8e8";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });
    
    ctx.fillStyle = "#e8e8e8";
    ctx.font = "20px Arial";
    targets.forEach(target => {
        ctx.fillText(target.text, target.x, target.y);
    });
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
