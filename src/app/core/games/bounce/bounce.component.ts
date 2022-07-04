import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: 'app-games-bounce',
  templateUrl: './bounce.component.html',
  styleUrls: ['bounce.component.scss'],
})
export class BounceComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  x = 100;
  y = 100;
  velocity = 1;
  acceleration = 0.5;
  player = { width: 20, height: 20}
  hasColition: boolean;
  keys = { left: false, right: false, up: false, down: false };
  colors = ['#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399', '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680'];
  obstacles = [
    { x: 100, y: 250, width: 200, height: 20 },
    { x: 200, y: 350, width: 200, height: 20 },
    { x: 300, y: 150, width: 200, height: 20 },
    { x: 400, y: 450, width: 200, height: 20 },
    { x: 500, y: 550, width: 200, height: 20 },
  ];
  isPaused: boolean;
  constructor() {}
  @HostListener('document:keydown', ['$event'])
  keyDown(e) {
    this.velocity = 10;
    if (['ArrowLeft', 'Left'].includes(e.key)) { this.keys.left = true }
    if (['ArrowRight', 'Right'].includes(e.key)) { this.keys.right = true }
    if (['ArrowUp', 'Up'].includes(e.key)) { this.keys.up = true }
    if (['ArrowDown', 'Down'].includes(e.key)) { this.keys.down = true }
  }
  @HostListener('document:keyup', ['$event'])
  keyUp(e) {
    console.log('keyup')
    // this.velocity = 1;
    if (['ArrowLeft', 'Left'].includes(e.key)) { this.keys.left = false }
    if (['ArrowRight', 'Right'].includes(e.key)) { this.keys.right = false }
    if (['ArrowUp', 'Up'].includes(e.key)) { this.keys.up = false }
    if (['ArrowDown', 'Down'].includes(e.key)) { this.keys.down = false }
  }
  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
  }
  draw(state) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const keyPressed = Object.values(this.keys).some(Boolean);
    // console.log(this.y, this.velocity)
    console.log({actual: this.y + 20, sec: this.y + 20 + this.velocity, x: this.x})
    if (keyPressed) {
      this.velocity = 10;
      if (this.keys.right) { this.x += this.velocity }
      if (this.keys.left) { this.x -= this.velocity }
      if (this.keys.up) { this.y -= this.velocity }
      if (this.keys.down) { this.x += this.velocity }
    } else if (!this.hasColition) {
      this.y += this.velocity;
      this.velocity += this.acceleration;
    } else {
      this.velocity = 0;
    }
    this.detectColition();
    this.drawBall();
    this.drawObstacles();
    if (state) {
      requestAnimationFrame(this.draw.bind(this));
    }
  }
  drawObstacles() {
    this.obstacles.forEach(({x, y, width, height}, i) => {
      this.ctx.beginPath();
      this.ctx.rect(x, y, width, height);
      this.ctx.fillStyle = this.colors[i];
      this.ctx.fill();
      this.ctx.closePath();
    })
  }
  drawBall() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.player.width, this.player.height);
    this.ctx.fillStyle = '#197867';
    this.ctx.fill();
    this.ctx.closePath();
  }
  detectColition() {
    const padlle = { x : 100, y: 250 };
    this.hasColition = false;
    const bottom = this.y + this.player.height + this.velocity > this.height;
    const lestThan = this.y + this.player.height <= padlle.y;
    const biggerThan = this.y + this.player.height + this.velocity >= 250;
    // const checkX = this.x >= 100 && this.x <= 300;
    if (bottom) {
      console.log(this.y)
      this.hasColition = true;
    }
  }
}
