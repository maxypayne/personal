import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { TimeInterval } from "rxjs";

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['pong.component.scss'],
})
export class PongComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  dx = 2;
  dy = -2;
  width: number;
  height: number;
  ballRadius = 10;
  interval: any;
  paddleWidth = 100;
  paddleHeight = 10;
  paddleX: number;
  leftPressed: boolean;
  rightPressed: boolean;
  brickWidth = 75;
  brickHeight = 20;
  brickPadding = 10;
  brickPaddingX = 20;
  bricks: any = [];
  score = 0;
  lives = 3;
  time = 3;
  timeOut: any;
  showTime: boolean;
  isPaused: boolean;
  win: boolean;
  lost: boolean;
  @HostListener('document:keydown', ['$event'])
  keyDown(e) {
    if (['ArrowLeft', 'Left'].includes(e.key)) { this.leftPressed = true }
    if (['ArrowRight', 'Right'].includes(e.key)) { this.rightPressed = true }
  }
  @HostListener('document:keyup', ['$event'])
  keyUp(e) {
    if (['ArrowLeft', 'Left'].includes(e.key)) { this.leftPressed = false }
    if (['ArrowRight', 'Right'].includes(e.key)) { this.rightPressed = false }
  }
  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.setInit();
    this.draw();
  }
  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#197867';
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddleX, this.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawScore() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "green";
    this.ctx.fillText("Score: " + this.score, 8, 20);
  }
  drawLives() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "green";
    this.ctx.fillText("Lives: " + this.lives, this.width - 65, 20);
  }
  drawBricks() {
    const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
      '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
      '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
      '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
      '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
      '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
      '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        let brickX = (j * (this.brickWidth + this.brickPadding)) + 30;
        let brickY = (i * (this.brickHeight + this.brickPadding)) + 30;
        this.bricks[i][j].x = brickX;
        this.bricks[i][j].y = brickY;
        if (this.bricks[i][j].status === 1) {
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY , 75, 20);
          this.ctx.fillStyle = colors[(i + 1) * (j + 1)];
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }
  drawTimeOut() {
    if (this.showTime) {
      this.ctx.font = "24px Arial";
      this.ctx.fillStyle = "green";
      this.ctx.fillText(''+this.time, this.width / 2, this.width / 2);
    }
  }
  detectColision() {
    for (let i = 0; i < this.bricks.length; i++) {
      for (let j = 0; j < this.bricks[i].length; j++) {
        const b = this.bricks[i][j];
        if(b.status === 1 && this.x > b.x && this.x < b.x + this.brickWidth && this.y > b.y && this.y < b.y + this.brickHeight) {
          this.dy = -this.dy;
          b.status = 0;
          this.score += 1;
          if(this.score === this.bricks.reduce((a, b) => a + b.length, 0)) {
            this.win = true;
            this.isPaused = true;
            // document.location.reload();
            // show win message
          }
        }
      }
    }
  }
  draw() {
    if (!this.isPaused) {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.drawBall();
      this.drawPaddle();
      this.detectColision();
      this.drawBricks();
      this.drawScore();
      this.drawLives();
      this.drawTimeOut();
      if (this.rightPressed && this.paddleX + this.paddleWidth < this.width) {
        this.paddleX += 7;
      }
      if (this.leftPressed && this.paddleX > 0) {
        this.paddleX -= 7;
      }
      if (this.x < this.ballRadius || this.x + this.ballRadius > this.width) {
        this.dx = -this.dx;
      }
      if (this.y < this.ballRadius) {
        this.dy = -this.dy;
      } else if (this.y + this.dy + this.ballRadius > this.height) {
        if(this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
          this.dy = -this.dy;
        } else {
          this.lives -= 1;
          if (!this.lives) {
            this.isPaused = true;
            this.lost = true;
          } else {
            this.x = this.width / 2;
            this.y = this.height - (this.paddleHeight + this.ballRadius);
            this.dx = 0;
            this.dy = 0;
            this.paddleX = (this.width - this.paddleWidth) / 2;
            this.showTime = true;
            this.interval = setInterval(() => {
              this.time -= 1;
              if (!this.time) {
                clearInterval(this.interval);
                clearTimeout(this.timeOut);
                this.time = 3;
                this.showTime = false;
              }
            }, 1000);
            this.timeOut = setTimeout(() => {
              this.dx = 3;
              this.dy = -3;
            }, 3000);

          }
        }
      }
      this.x += this.dx;
      this.y += this.dy;
      requestAnimationFrame(this.draw.bind(this))
    }
  }
  setInit() {
    this.lives = 3;
    this.score = 0;
    this.x = this.width / 2;
    this.y = this.height - this.ballRadius - this.paddleHeight;
    this.dx = 2;
    this.dy = -2;
    this.paddleX = (this.width / 2) - (this.paddleWidth / 2);
    for (let c = 0; c < 3; c++) {
      this.bricks.push([]);
      for(let r = 0; r < 5; r++) {
        this.bricks[c][r] = {x: 0, y: 0, status: 1};
      }
    }
  }
  play() {
    this.isPaused = false;
    if (this.win || this.lost) {
      this.setInit();
      this.lost = false;
      this.win = false;
    }
    this.draw()
  }
}
