class GrassEater {
    constructor(x,y) {
    this.x = x;
    this.y = y;
    this.energy = 8;
    this.directions = [];
    }
    getNewCoordinates(){
    this.directions  = [
        [this.x - 1, this.y - 1],
        [this.x , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y ],
        [this.x + 1, this.y ],
        [this.x - 1, this.y + 1],
        [this.x , this.y + 1],
        [this.x + 1, this.y + 1]
        ];
    }
  
    chooseCell(character) {
    this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length){

        if (matrix[y][x] == character) {

        found.push(this.directions[i]);
        }
        }
    }
        return found; 
    }
    mul () {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
 
        if(newCell){
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = 2;
 
            var newGrass = new GrassEater(x, y);
            grassEater.push(newGrass);
            this.energy = 8;
        }
    }

    move() {
        this.energy--
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if(newCell && this.energy >= 0) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = x
            this.y = y
        } else {
            this.die()
        }
    }

    eat() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if(newCell) {
            this.energy++
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
            this.x = x
            this.y = y
            if(this.energy > 15) {
                this.mul()
            }
            for (var i in grassArr) {
                if (x== grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            
        } else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEater) {
            if (this.x == grassEater[i].x && this.y == grassEater[i].y) {
                grassEater.splice(i, 1);
                break;
            }
        }
    }
}
    