var hero = {
  hx: 700,
  hy: 500,
};
var score = 1500;
var bullets = [];
var sounds = {
  collide: "explosion.mp3",
  bullet: "shot.mp3",
};
var backgrounds = ["bg1.jpg", "bg2.jpg", "bg3.jpg"];
var map = getRandom(3);
document.getElementById(
  "container"
).style.background = `url(${backgrounds[map]})`;

var enemies = [
  { plane: `enemy${getRandom(3) + 1}`, x: 60, y: 0 },
  { plane: `enemy${getRandom(3) + 1}`, x: 140, y: -100 },
  { plane: `enemy${getRandom(3) + 1}`, x: 250, y: -40 },
  { plane: `enemy${getRandom(3) + 1}`, x: 400, y: -80 },
  { plane: `enemy${getRandom(3) + 1}`, x: 500, y: 0 },
  { plane: `enemy${getRandom(3) + 1}`, x: 600, y: -250 },
  { plane: `enemy${getRandom(3) + 1}`, x: 700, y: 10 },
  { plane: `enemy${getRandom(3) + 1}`, x: 850, y: -100 },
];

// random plane
function getRandom(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// show score
function showScore() {
  document.getElementById("score").innerHTML = score;
  if (score < 1) {
    document.getElementById("game-over").innerHTML = "GAME OVER!!";
  }
}

// explosion sound
function playSound(path) {
  document.getElementById("explosion").innerHTML =
    "<embed src='" + path + "' hidden='true' autostart='true' loop='false' />";
}

// display hero position on screen
function displayHero() {
  document.getElementById("hero").style["top"] = hero.hy + "px";
  document.getElementById("hero").style["left"] = hero.hx + "px";
}

// display enemy position on screen
function showEnemies() {
  var output = "";
  for (var i = 0; i < enemies.length; i++) {
    output += `<div class="${enemies[i].plane}" style="top: ${enemies[i].y}px; left: ${enemies[i].x}px"></div>`;
  }
  document.getElementById("enemies").innerHTML = output;
}

// display bullets 💥 on screen
function showBullets() {
  var output = "";
  for (var i = 0; i < bullets.length; i++) {
    output += `<div class="bullet" style="top: ${bullets[i].y}px; left: ${bullets[i].x}px;"></div>`;
  }
  document.getElementById("bullets").innerHTML = output;
}

//check collision for bullets x plane x hero
function hasCollide(arr, i) {
  var collide = false;
  if (
    (hero.hx == arr[i].x && hero.hy == arr[i].y) ||
    (hero.hx + 30 > arr[i].x && hero.hx - 30 < arr[i].x && hero.hy == arr[i].y)
  ) {
    collide = true;
  }
  return collide;
}

// move Enemies
function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].y < 535) {
      enemies[i].y += 1;
      if (hasCollide(enemies, i) && enemies[i].plane != "collision") {
        playSound(sounds.collide);
        score -= 500;
        enemies[i].plane = "collision";
        showEnemies();
      }
    } else {
      enemies[i].y = -150;
      enemies[i].plane = `enemy${getRandom(3) + 1}`;
    }
  }
}
// TODO: Need to refactor~
// move bullets
function moveBullets() {
  for (var i = 0; i < bullets.length; i++) {
    if (bullets[i].y > 1) {
      bullets[i].y -= 1;
      for (var j = enemies.length - 1; j >= 0; j--) {
        if (
          (bullets[i].x == enemies[j].x && bullets[i].y == enemies[j].y) ||
          (bullets[i].x + 30 > enemies[j].x && bullets[i].x - 30 < enemies[j].x)
        ) {
          if (bullets[i].y == enemies[j].y && enemies[j].plane != "collision") {
            playSound(sounds.collide);
            score += 10;
            enemies[j].plane = "collision";
            bullets[i] = bullets[bullets.length - 1];
            bullets.pop();
          }
        }
      }
    } else {
      bullets[i] = bullets[bullets.length - 1];
      bullets.pop();
    }
  }
}

function gameLoop() {
  if (score > 0) {
    displayHero();
    showEnemies();
    moveEnemies();
    showScore();
  }
}

setInterval(() => {
  moveBullets();
  showBullets();
}, 1);

setInterval(() => {
  gameLoop();
}, 15);

// move hero ✈️ and fire bullet 💥
document.onkeydown = function (e) {
  if (e.key == "ArrowLeft" && hero.hx > 15) {
    // go left
    hero.hx -= 5;
  } else if (e.key == "ArrowRight" && hero.hx < 851) {
    // go right
    hero.hx += 5;
  } else if (e.key == "ArrowUp" && hero.hy > 350) {
    // go top
    hero.hy -= 5;
  } else if (e.key == "ArrowDown" && hero.hy < 520) {
    // go down
    hero.hy += 5;
  } else if (e.key == " ") {
    // fire bullet
    playSound(sounds.bullet);
    bullets.push({ x: hero.hx + 5, y: hero.hy - 12 });
  }
};

/*
TODOS:
  (Easy) Change the background of the game --
  (Easy) Get the hero to move up and down  ++
  (Easy) Get 7 enemies to show up instead of 4 at a time ++
  (Intermediate) Get another type of enemy airplane to show up ++
  (Advanced) Collision Detection for the airplanes – when the hero collides with the enemy, have your score go down by 500. ++
  (Advanced) Collision Detection for the bullet – Have the score go up by 10 when an enemy is struck down. ++
  (Advanced) Get the enemy to explode when it is hit
  (Advanced) When the bullet hits, make a sound.

*/
