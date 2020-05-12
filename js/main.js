var myGamePiece;
var lineImg;
var logoImg;
var winnerImg;
let losserImg;

function startGame() {
    myGamePiece = new component(30, 30, "red", 225, 225);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
      
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {

    this.type = type;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.angle = 0;
    this.moveAngle = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.strokeStyle='white';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(100,100);
        ctx.lineTo(100,700);
        ctx.moveTo(100,700)
        ctx.lineTo(1100,700);
        ctx.moveTo(1100,700);
        ctx.lineTo(1100,100);
        ctx.moveTo(1100,100);
        ctx.lineTo(100,100);
        ctx.moveTo(250,250);
        ctx.lineTo(250,550);
        ctx.moveTo(250,550);
        ctx.lineTo(950,550);
        ctx.moveTo(950,550);
        ctx.lineTo(950,250)
        ctx.moveTo(950,250);
        ctx.lineTo(250,250);
        var lineImg = new Image();
        lineImg.src = "./img/line.png";
        lineImg.onload = function(){
        ctx.drawImage(lineImg, 100, 325, 150,50)
        }
        var logoImg = new Image();
        logoImg.src = "./img/logo.png";
        logoImg.onload = function(){
        ctx.drawImage(logoImg, 520, 350, 150,50)
        }
        ctx.closePath();
        ctx.stroke();
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        var image = document.getElementById('source');
        ctx.drawImage(image, this.width / -2, this.height / -2, this.width, this.height);
        ctx.restore();
       
        
    }
    this.newPos = function() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -7; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 7; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speed= 7; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speed= -7; }
    myGamePiece.newPos();
    myGamePiece.update();
}