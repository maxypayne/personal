import platform from '../images/platform.jpg';
import lava from '../images/lava.jpg';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gravity = 0.5;
const canvasWidth = 900;
const canvasHeight = 600;
console.log('rere')
const keys = {
  left: {
    pressed: false
  },
  right: {
    pressed: false
  }
}
class Hill {
  constructor({x, y, width, height}) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
  }
  draw() {
    // ctx.fillStyle = 'green';
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.beginPath();
    ctx.arc(this.position.x + this.width / 2, this.position.y, this.width / 2, 0, Math.PI, true); // Outer circle
    ctx.fillStyle = '#2e7a3d';
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(this.position.x + this.width, this.position.y);
    ctx.lineTo(this.position.x + this.width, this.position.y + this.height);
    ctx.lineTo(this.position.x, this.position.y +  this.height);
    ctx.fillStyle = '#1b5b27';
    ctx.fill();
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
  constructor({x, y, width, height, image}) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
const createImage = src => {
  const image = new Image();
  image.src = src;
  return image;
}
class GenericObject {
  constructor({x, y, width, height, image}) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.image = image;
  }
  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
const genericObject = new GenericObject({
  x: 0,
  y: 0,
  image: createImage(platform),
})
// console.log(img)
const player = new Player();
const platforms = [
  new Platform({ x: 200, y: 100, width: 200, height: 40, image: createImage(platform) }),
  new Platform({ x: 500, y: 200, width: 200, height: 40, image:  createImage(platform) }),
  new Platform({ x: 0, y: 560, width: 200, height: 40, image:  createImage(platform) }),
  new Platform({ x: 200, y: 560, width: 200, height: 40, image:  createImage(platform) }),
  new Platform({ x: 400, y: 560, width: 200, height: 40, image:  createImage(platform) }),
  new Platform({ x: 650, y: 560, width: 200, height: 40, image:  createImage(platform) }),
];
const hills = [
  new Hill({ x: 100, y: 300, width: 150, height: 300 }),
  new Hill({ x: 200, y: 300, width: 150, height: 300 }),
]

let scrollOffset = 0;
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, canvasWidth, canvasHeight);
  hills.forEach(hill => {
    hill.draw();
  })
  platforms.forEach(platform => {
    platform.draw();
  })

  player.update();
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
      hills.forEach(hill => {
        hill.position.x -= 3;
      })
    } else if (keys.left.pressed) {
      scrollOffset -= 5;
      platforms.forEach(platform => {
        platform.position.x += 5;
      })
      hills.forEach(hill => {
        hill.position.x += 3;
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
