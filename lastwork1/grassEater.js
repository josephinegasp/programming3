let livingCreatures = require('./livingCreatures')
let random = require("./random");

module.exports = class GrassEater extends livingCreatures {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;

            var newGrassEater = new GrassEater(x, y);
            grassEater.push(newGrassEater);
            this.energy = 8;
        }
    }

    move() {
        this.energy--;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 0) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        } else {
            this.die();
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {
            this.energy++;
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
            if (this.energy > 15) {
                this.mul();
            }

            // Remove the eaten grass from grassArr using a for loop
            for (var i = 0; i < grassArr.length; i++) {
                if (x === grassArr[i].x && y === grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        } else {
            this.move();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        
        // Remove the dead grass eater from grassEater using a for loop
        for (var i = 0; i < grassEater.length; i++) {
            if (this.x === grassEater[i].x && this.y === grassEater[i].y) {
                grassEater.splice(i, 1);
                break;
            }
        }
    }
}



