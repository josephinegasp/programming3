var matrix= [];
    
    var side = 30;
    var grassArr = [];
    var grassEater = [];
    var predatorArr = [];
    var venomFlowerArr = [];
    var flowerEaterArr = [];
    function setup() {
    
        function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount,venomFlowerCount,flowerEaterCount) {
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
            matrixGenerator(20, 250, 50, 30,50,50)
    frameRate(5);
    
    createCanvas(matrix[0].length * side, matrix.length * side);
    
    background('#acacac');

    var gr = new Grass(1,2,1);

   var emptyCells = gr.chooseCell(0);

console.log(emptyCells);


for(var y = 0; y < matrix.length; ++y){

    for(var x = 0; x < matrix[y].length; ++x){
    
    if(matrix[y][x] == 1){
    
    var gr = new Grass(x,y,1);
    
    grassArr.push(gr);
    
    }
    
    else if(matrix[y][x] == 2){
    var gre = new GrassEater(x,y,2);
    grassEater.push(gre);
    }
    else if(matrix[y][x] == 3){
        var pre = new Predator (x,y,3);
        predatorArr.push(pre);
        }
        else if(matrix[y][x] == 4){
            var vnf = new venomFlower (x,y,4);
            venomFlowerArr.push(vnf);
            }
            else if(matrix[y][x] == 5){
                var flwe = new flowerEater (x,y,5);
                flowerEaterArr.push(flwe);
                }

    
    else if(matrix[y][x] == 8){
    
    }
    
    }
    
    }
    }


    function draw() {

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
        }
        
        }
        for(var i in grassArr){

            grassArr[i].mul();
            
            
            }

            for(var i in grassEater){

                grassEater[i].eat();
                
                
                }
                for(var i in predatorArr){

                    predatorArr[i].eat();
                    
                    
                    }
                    for(var i in venomFlowerArr){

                        venomFlowerArr[i].poison();
                        
                        
                        }
                        for(var i in flowerEaterArr){

                            flowerEaterArr[i].eat();
                            
                            
                            }


                        console.log(grassArr);
    }