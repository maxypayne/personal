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
    if (['ArrowLeft', 'Left'].includes(e.key)) { this.keys.left = true }
    if (['ArrowRight', 'Right'].includes(e.key)) { this.keys.right = true }
    if (['ArrowUp', 'Up'].includes(e.key)) { this.keys.up = true }
    if (['ArrowDown', 'Down'].includes(e.key)) { this.keys.down = true }
  }
  @HostListener('document:keyup', ['$event'])
  keyUp(e) {
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
    if (keyPressed) {
      this.velocity = 5;
      if (this.keys.right) { this.x += this.velocity }
      if (this.keys.left) { this.x -= this.velocity }
      if (this.keys.up) { this.y -= 20 }
      if (this.keys.down) { this.x += this.velocity }
    } else {
      this.velocity = !this.hasColition ? this.velocity += this.acceleration : 0;
      this.y += this.velocity;
    }
    this.detectColition();
    this.drawBall();
    this.drawObstacles();
    if (state) {
      // setInterval(this.draw.bind(this), 100);
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
    const bottom = this.y + this.player.height + this.velocity >= this.height;
    const state = this.obstacles.some(obstacle => {
      return this.y + this.player.height <= obstacle.y && this.y + this.player.height + this.velocity >= obstacle.y && this.x >= obstacle.x && this.x <= obstacle.x + obstacle.width;
    });
    this.hasColition = bottom || state;
  }
}
