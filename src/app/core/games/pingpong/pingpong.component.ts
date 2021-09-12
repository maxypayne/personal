import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { TimeInterval } from "rxjs";

@Component({
  selector: 'app-pingpong',
  templateUrl: './pingpong.component.html',
  styleUrls: ['pingpong.component.scss']
})
export class PingpongComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  x: any;
  y: any;
  dx = 2;
  dy = -2;
  width: number;
  height: number;
  ballRadius = 10;
  paddleHeight = 10;
  paddleWidth = 75;
  paddleX: any;
  rightPressed: boolean;
  leftPressed: boolean;
  interval: any;
  brickRowCount = 3;
  brickColumnCount = 5;
  brickWidth = 75;
  brickHeight = 20;
  brickPadding = 10;
  brickOffsetTop = 30;
  brickOffsetLeft = 30;
  bricks = [];
  score = 0;
  lives = 3;
  @HostListener('document:keydown', ['$event'])
  keyDown(e) {
    if (e.key == "Right" || e.key == "ArrowRight") { this.rightPressed = true }
    if (e.key == "Left" || e.key == "ArrowLeft") { this.leftPressed = true }
  }
  @HostListener('document:keyup', ['$event'])
  keyUp(e) {
    if (e.key == "Right" || e.key == "ArrowRight") { this.rightPressed = false }
    if (e.key == "Left" || e.key == "ArrowLeft") { this.leftPressed = false }
  }
  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.width = this.canvas.nativeElement.width;
    this.height = this.canvas.nativeElement.height;
    this.x = this.width / 2;
    this.y = this.height - 30;
    this.paddleX = (this.width - this.paddleWidth) / 2;
    for(let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for(let r=0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    // console.log(this.bricks)
    this.interval = setInterval(this.draw.bind(this), 10)
    this.draw();
  }
  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddleX, this.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fill();
    this.ctx.closePath();
  }
  drawBricks() {
    for(let c = 0; c < this.brickColumnCount; c++) {
      for(let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status === 1) {
          let brickX = (c*(this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          let brickY = (r*(this.brickHeight+ this.brickPadding)) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fillStyle = "#0095DD";
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }
  drawScore() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Score: " + this.score, 8, 20);
  }
  drawLives() {
    this.ctx.font = "16px Arial";
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fillText("Lives: "+ this.lives, this.width - 65, 20);
  }
  collisionDetection() {
    for(let c = 0; c < this.brickColumnCount; c++) {
      for(let r = 0; r < this.brickRowCount; r++) {
        let b = this.bricks[c][r];
        if(b.status == 1) {
          if(this.x > b.x && this.x < b.x + this.brickWidth && this.y > b.y && this.y < b.y + this.brickHeight) {
            this.dy = -this.dy;
            b.status = 0;
            this.score += 1;
            if(this.score == this.brickRowCount * this.brickColumnCount) {
              alert("C'est gagné, Bravo!");
              document.location.reload();
              // clearInterval(this.interval); // Needed for Chrome to end game
            }
          }
        }
      }
    }
  }
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.collisionDetection();
    this.drawScore();
    this.drawLives();
    if (this.rightPressed) {
      this.paddleX += 7;
      if (this.paddleX + this.paddleWidth > this.width){
        this.paddleX = this.width - this.paddleWidth;
      }
    }
    if (this.leftPressed) {
      this.paddleX = this.paddleX > 0 ? this.paddleX - 7 : 0;
    }
    if(this.x + this.dx > this.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx;
    }
    if(this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    } else if(this.y + this.dy > this.height - this.ballRadius) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy = - this.dy;
      } else {
        // this.dy = - this.dy; // to delete
        this.lives -= 1;
        console.log(this.lives)
        if (!this.lives) {
          alert("GAME OVER");
          document.location.reload();
          // clearInterval(this.interval);
        } else {
          this.x = this.width / 2;
          this.y = this.height-30;
          this.dx = 3;
          this.dy = -3;
          this.paddleX = (this.width - this.paddleWidth) / 2;
        }
      }
    }
    this.x += this.dx;
    this.y += this.dy;
    // requestAnimationFrame(this.draw.bind(this));
  }
}
