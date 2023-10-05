class venomFlower {
    constructor(x,y) {
    this.x = x;
    this.y = y;
//    this.energy = 8
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
    
    poison(){
        var grassEaterCells = this.chooseCell(2);
        var newCell = random(grassEaterCells);
        if(newCell){
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0;
           
            this.x = x
            this.y = y
            for (var i in grassEater) {
                if (this.x == grassEater[i].x && this.y == grassEater[i].y) {
                    grassEater.splice(i, 1);
                    break;

        }
    }
    
}

}

    
    }