class venomFlower extends livingCreatures {
    constructor(x, y) {
        super(x, y);
    }

    

    poison() {
        var grassEaterCells = this.chooseCell(2);
        var newCell = random(grassEaterCells);
        if (newCell) {
            var x = newCell[0];
            var y = newCell[1];
            matrix[y][x] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            for (var i = 0; i < grassEater.length; i++) {
                if (this.x == grassEater[i].x && this.y == grassEater[i].y) {
                    grassEater.splice(i, 1);
                    break;
                }
            }
        }
    }
}
