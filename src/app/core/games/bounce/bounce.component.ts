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
  acceleration = 0.66;
  keys = { left: false, right: false, up: false, down: false };
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
    this.velocity = 1;
    if (['ArrowLeft', 'Left'].includes(e.key)) { this.keys.left = false }
    if (['ArrowRight', 'Right'].includes(e.key)) { this.keys.right = false }
    if (['ArrowUp', 'Up'].includes(e.key)) { this.keys.up = false }
    if (['ArrowDown', 'Down'].includes(e.key)) { this.keys.down = false }
  }
  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    if (this.keys.up && this.keys.right) {
      this.y -= this.velocity;
      this.x += this.velocity;
    } else if (this.keys.right) {
      this.x += this.velocity;
    } else if (this.keys.left) {
      this.x -= this.velocity;
    } else if (this.keys.up) {
      this.y -= this.velocity;
    } else if(this.y + 20 + this.velocity < this.height) {
      this.velocity += this.acceleration;
      this.y += this.velocity;
    } else {
      this.velocity = 1;
    }
    this.drawBall();
    requestAnimationFrame(this.draw.bind(this));
  }
  drawBall() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, 20, 20);
    this.ctx.fillStyle = '#197867';
    this.ctx.fill();
    this.ctx.closePath();
  }
}
