let livingCreatures = require('./livingCreatures');
let random = require('./random');

class PredatorEater extends livingCreatures {
    constructor(x, y) {
        super(x, y);
        this.energy = 10; 
    }

    move() {
        var emptyCells = this.chooseCell(0); 
        var newCell = random(emptyCells);

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 6; 
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy--; 
            if (this.energy <= 0) {
                this.die(); 
            }
        }
    }

    eat() {
        var predatorCells = this.chooseCell(3); 
        var newCell = random(predatorCells);

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 6; 
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            this.energy += 5; 

            if (this.energy > 15) {
                this.mul(); 
            }
        } else {
            this.move(); 
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0); 
        var newCell = random(emptyCells);

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 7;
            var newPredatorEater = new PredatorEater(x, y);
            predatorEaterArr.push(newPredatorEater);
            this.energy = 10; 
        }
    }

    die() {
        matrix[this.y][this.x] = 0; 
        for (var i = 0; i < predatorEaterArr.length; i++) {
            if (this.x === predatorEaterArr[i].x && this.y === predatorEaterArr[i].y) {
                predatorEaterArr.splice(i, 1);
                break;
            }
        }
    }
}

module.exports = PredatorEater;