var side = 30;
const sideX = 30;
const sideY = 30;
const socket = io();
let frameCount = 0;

let isWinter = false;
let isLightningVisible = false;
let lightningX;
let lightningY;
let matrix;
var initialMatrix = []

var data = {};


var p = document.createElement('p')
document.body.appendChild(p)

// function countAllChar(initialMatrix) {
//     var allGrassCount = 0;
//     var allGrassEaterCount = 0;
    

//     for (var y = 0; y < initialMatrix.length; y++) {
//         for (var x = 0; x < initialMatrix[y].length; x++) {
//             if (initialMatrix[y][x] == 1) {
//                 allGrassCount++;
//                 data.allGrass = allGrassCount
//             }
//             if (initialMatrix[y][x] == 2) {
//                 allGrassEaterCount++;
//                 data.allGrassEater = allGrassEaterCount
//             }
//         }
//     }

//     return data
// }
function countAllChar(matrixData) {
    const data = {
        allGrass: 0,
        allGrassEater: 0,
        
    };

    matrixData.forEach((row) => {
        row.forEach((cell) => {
            if (cell === 1) {
                data.allGrass++;
            } else if (cell === 2) {
                data.allGrassEater++;
            }
           
        });
    });

    return data;
}

function setup() {
    createCanvas(side * sideX, side * sideY);
    background('#acacac');

    const lightningButton = document.getElementById("lightningButton");
    const seasonButton = document.getElementById("seasonButton");

    lightningButton.addEventListener("click", summonLightning);
    seasonButton.addEventListener("click", toggleSeason)

        

    socket.on("update matrix", drawful)

}


function drawful(matrixData) {

    matrix = matrixData;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(isWinter ? "white" : "green");
                rect(x * side, y * side, side, side);
                // grassSpawned++;
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
    fill("orange");
    textSize(24);
    text(isWinter ? "Winter" : "Summer", 10, 30);

    socket.emit('Total statistics', countAllChar(matrix))
    socket.on('display statistics', (data) => {
        statistics = data

        var updatedText = '';
        for (var key in statistics) {
            updatedText += '\n' + key + ' ' + statistics[key];
        }
        p.innerText = updatedText;
    })

}




function toggleSeason() {
    isWinter = !isWinter;


    if (isWinter) {
        frameRate(10);
    } else {
        frameRate(60);
    }


    drawful(matrix);
}


function summonLightning() {
    console.log(isLightningVisible)
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


