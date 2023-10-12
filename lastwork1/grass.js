class Grass extends livingCreatures {
    constructor(x, y) {
        super(x, y);
        this.index = 1; // You may need to specify the index
    }

    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 2 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1]);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

