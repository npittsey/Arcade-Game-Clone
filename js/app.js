// Enemies our player must avoid
var Enemy = function(enemyX, enemyY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = enemyX;
    this.y = enemyY;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  //Gets the speed for the x-axis for the bugs
  this.x = this.x + this.speed * dt;

  //Once bug goes off screen it resets on off the left side of the canvas
  if (this.x > 500) {
      this.x = -50;
      this.bugSpeed();
  }
  //Sets up the borders of the bug
  var bugXLeft = this.x - 50;
  var bugXRight = this.x + 50;
  var bugYTop = this.y - 50;
  var bugYBottom = this.y + 50;

  //Detects if the player runs into a bug
  if (player.x >= bugXLeft && player.x <= bugXRight && player.y >= bugYTop && player.y <= bugYBottom) {
      player.resetPlayer();
  }

};

// determines a random speed for each bug.
Enemy.prototype.bugSpeed = function() {
    var randomSpeed = Math.floor(Math.random() * 6 + 1);
    this.speed = 50 * randomSpeed;
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player starting area.
var playerStartX = 200,
    playerStartY = 400;


// player class
var Player = function(){

  this.x = playerStartX;
  this.y = playerStartY;

  // tells the game where the walls are in the starting location
  this.WallCheck = {
      leftWall: false,
      rightWall: false,
      bottomWall: true
  };

  this.sprite = 'images/char-boy.png';

}

Player.prototype.update = function(dt){
}

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// resets player to the original starting position
Player.prototype.resetPlayer = function() {
    this.x = playerStartX;
    this.y = playerStartY;
    this.resetCheckPosition();
}
// This class requires an update(), render() and
// a handleInput() method.

Player.prototype.handleInput = function(keyStroke) {
    // tells how far to move the chracter on the x and y axis
    var moveXaxis = 100;
    var moveYaxis = 90;
    this.checkPosition();

    // large if else statement to check for walls,
    // if there is a wall it won't let the player move past it
    if (keyStroke === 'left') {
        if (this.WallCheck.leftWall) {
            return null;
        }
        this.x -= moveXaxis;
    } else if (keyStroke === 'right') {
        if (this.WallCheck.rightWall) {
            return null;
        }
        this.x += moveXaxis;
    } else if (keyStroke === 'up') {
        if (this.y === 40) {
            this.resetPlayer();
            return null;
        }
        this.y -= moveYaxis;
    } else if (keyStroke === 'down') {
        if (this.WallCheck.bottomWall) {
            return null;
        }
        this.y += moveYaxis;
    } else {
        return null;
    }
}
// Now instantiate your objects.

// Checks the position of the player
Player.prototype.checkPosition = function() {
    if (this.x === 0) {
        this.setXaxis(true, false);
    } else if (this.x === 400) {
        this.setXaxis(false, true);
    } else {
        this.setXaxis(false, false);
    }
    if (this.y === 400) {
        this.WallCheck.bottomWall = true;
    } else {
        this.WallCheck.bottomWall = false;
    }
}

// resets the checker to the starting position
Player.prototype.resetCheckPosition = function() {
    this.setXaxis(false, false);
    this.WallCheck.bottomWall = true;
}

Player.prototype.setXaxis = function(leftWallState, rightWallState) {
    this.WallCheck.leftWall = leftWallState;
    this.WallCheck.rightWall = rightWallState;
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// pushes enemies with a starting speed
for (var i = 0; i < 3; i++) {
    var startSpeed = Math.floor(Math.random() * 6 + 1) * 75;
    allEnemies.push(new Enemy(-60, 50 + 100 * i, startSpeed));
}
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    var keyStroke = allowedKeys[e.keyCode];
    player.handleInput(keyStroke);
});
