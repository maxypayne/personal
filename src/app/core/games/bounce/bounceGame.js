const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gravity = 0.5;
const canvasWidth = 900;
const canvasHeight = 600;
const keys = {
  left: {
    pressed: false
  },
  right: {
    pressed: false
  }
}
class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 200,
    }
    this.velocity = {
      x: 0,
      y: 1,
    }
    this.width = 30;
    this.height = 30;
  }
  draw() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.draw();
    console.log('s')
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.velocity.y + this.height <= canvasHeight) {
      this.velocity.y += gravity;
    } else {
      this.velocity.y = 0;
    }
  }
}
class Platform {
  constructor() {
    this.position = {
      x: 200,
      y: 200,
    }
    this.width = 200;
    this.height = 20;
  }
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
const player = new Player();
const platform = new Platform();

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, canvasWidth, canvasHeight);
  player.update();
  platform.draw();
  if (keys.right.pressed) {
    player.velocity.x = 10;
  } else if (keys.left.pressed) {
    player.velocity.x = -10;
  } else {
    player.velocity.x = 0;
  }
  const before = player.position.y + player.height <= platform.position.y;
  const after = player.position.y + player.height + player.velocity.y >= platform.position.y;
  const chek = player.position.x >= platform.position.x && player.position.x <= platform.position.x + platform.width;
  if (before && after && chek) {
    console.log(player.position.y)
    player.velocity.y = 0;
  }
}

animate();

addEventListener('keydown', ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 37:
      console.log('left');
      keys.left.pressed = true;
      break
    case 38:
      console.log('up');
      player.velocity.y -= 20;
      break
    case 39:
      console.log('right');
      keys.right.pressed = true;
      break
    case 40:
      console.log('down');
      break
  }
})

addEventListener('keyup', ({ keyCode }) => {
  console.log(keyCode);
  switch (keyCode) {
    case 37:
      console.log('left');
      keys.left.pressed = false;
      break
    case 38:
      console.log('up');
      break
    case 39:
      console.log('rightup');
      keys.right.pressed = false;
      break
    case 40:
      console.log('down');
      break
  }
})
