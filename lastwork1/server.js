var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get("/", function (req, res) {
   res.redirect("index.html");
});

server.listen(3000, function () {
   console.log("App is running on port 3000");

});


matrix = [];
grassArr = [];
grassEater = [];
predatorArr = [];
venomFlowerArr = [];
flowerEaterArr = [];

let random = require("./random");
let Grass = require("./grass");
let GrassEater = require("./grassEater");
let Predator = require("./predator");
let venomFlower = require("./venomFlower");
let flowerEater = require("./flowerEater");


function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, venomFlowerCount, flowerEaterCount) {
   for (let i = 0; i < matrixSize; i++) {
      matrix[i] = []
      for (let o = 0; o < matrixSize; o++) {
         matrix[i][o] = 0;
      }
   }
   for (let i = 0; i < grassCount; i++) {
      let x = Math.floor(random(matrixSize));
      let y = Math.floor(random(matrixSize));
      matrix[y][x] = 1;
   }
   for (let i = 0; i < grassEaterCount; i++) {
      let x = Math.floor(random(matrixSize));
      let y = Math.floor(random(matrixSize));
      matrix[y][x] = 2;
   }
   for (let i = 0; i < predatorCount; i++) {
      let x = Math.floor(random(matrixSize));
      let y = Math.floor(random(matrixSize));
      matrix[y][x] = 3;
   }
   for (let i = 0; i < venomFlowerCount; i++) {
      let x = Math.floor(random(matrixSize));
      let y = Math.floor(random(matrixSize));
      matrix[y][x] = 4;
   }
   for (let i = 0; i < flowerEaterCount; i++) {
      let x = Math.floor(random(matrixSize));
      let y = Math.floor(random(matrixSize));
      matrix[y][x] = 5;
   }
}
matrixGenerator(20, 250, 50, 30, 50, 50)

function setupGame() {
   for (var y = 0; y < matrix.length; ++y) {
      for (var x = 0; x < matrix[y].length; ++x) {
         if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
         }
         else if (matrix[y][x] == 2) {
            var gre = new GrassEater(x, y, 2);
            grassEater.push(gre);
         }
         else if (matrix[y][x] == 3) {
            var pre = new Predator(x, y, 3);
            predatorArr.push(pre);
         }
         else if (matrix[y][x] == 4) {
            var vnf = new venomFlower(x, y, 4);
            venomFlowerArr.push(vnf);
         }
         else if (matrix[y][x] == 5) {
            var flwe = new flowerEater(x, y, 5);
            flowerEaterArr.push(flwe);
         }
         else if (matrix[y][x] == 8) {
         }
      }
   }
}

function playGame() {
   for (var i in grassArr) {

      grassArr[i].mul();
   }
   for (var i in grassEater) {

      grassEater[i].eat();
   }
   for (var i in predatorArr) {

      predatorArr[i].eat();
   }
   for (var i in venomFlowerArr) {

      venomFlowerArr[i].poison();

   }
   for (var i in flowerEaterArr) {

      flowerEaterArr[i].eat();
   }
   io.emit('update matrix', matrix);
}


io.on('connection', function (socket) {
   socket.emit('update matrix', matrix)
   setupGame()
   startPlaying()
})

let intervalID;

function startPlaying() {
   clearInterval(intervalID)
   intervalID = setInterval(() => {
      playGame()
   }, 1000);

}