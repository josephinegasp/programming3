var side = 30;
const sideX = 30;
const sideY = 30;
const socket = io();

let isLightningVisible = false; 
let lightningX; 
let lightningY;
let matrix;


function setup() {
    createCanvas(side * sideX, side * sideY);
    background('#acacac');

    const lightningButton = document.getElementById("lightningButton");
    lightningButton.addEventListener("click", summonLightning);

    
}


function drawful(matrixData) {
    matrix = matrixData;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }
}
socket.on('update matrix', drawful)


function summonLightning() {  console.log(isLightningVisible)
    isLightningVisible = !isLightningVisible
    if (!isLightningVisible) {
       
        lightningX = Math.floor(random(sideX));
        lightningY = Math.floor(random(sideY));
        
        
        socket.emit('update matrix value', {
            x: lightningX,
            y: lightningY,
            value: 6
        });
        
     
    }
}


