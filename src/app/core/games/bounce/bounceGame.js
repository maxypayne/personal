import img from './images/platform.jpg';

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
  constructor({x, y}) {
    this.position = { x, y };
    this.width = 200;
    this.height = 40;
  }
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

console.log(img)
const player = new Player();
// const platform = new Platform();
const platforms = [new Platform({ x: 200, y: 100 }), new Platform({ x: 500, y: 200 })];

let scrollOffset = 0;
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, canvasWidth, canvasHeight);
  player.update();
  platforms.forEach(platform => {
    platform.draw();
  })
  if (keys.right.pressed && player.position.x <= 400) {
    player.velocity.x = 5;
  } else if (keys.left.pressed && player.position.x >= 100) {
    player.velocity.x = -5;
  } else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset -= 5;
      platforms.forEach(platform => {
        platform.position.x -= 5;
      })
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach(platform => {
        platform.position.x += 5;
      })
    }
  }
  platforms.forEach(platform => {
    const before = player.position.y + player.height <= platform.position.y;
    const after = player.position.y + player.height + player.velocity.y >= platform.position.y;
    const chek = player.position.x >= platform.position.x && player.position.x <= platform.position.x + platform.width;
    if (before && after && chek) {
      player.velocity.y = 0;
    }
  })
  if (scrollOffset > 200) {
    console.log('you win');
  }
}

animate();

addEventListener('keydown', ({ keyCode }) => {
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
// const drawImage = () => {
//   const image = new Image();
//   image.src = 'platform.jpg';
//   console.log(image)
//   image.onload = () => {
//     ctx.drawImage(image, 100,100, 200, 40)
//   }
// }
// drawImage();
