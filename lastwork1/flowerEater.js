let livingCreatures = require('./livingCreatures')
let random = require("./random");

module.exports = class flowerEater extends livingCreatures {
    constructor(x, y) {
        super(x, y);
        this.energy = 20;
    }

    

    mul() {
        let found = this.chooseCell(0);
        let exact = random(found);

        if (exact && this.energy > 8) {
            let x = exact[0];
            let y = exact[1];

            let flwe = new flowerEater(x, y);
            matrix[y][x] = 3;
            flowerEaterArr.push(flwe);

            this.energy = 20;
        }
    }

    eat() {
        let found1 = this.chooseCell(1);
        let found2 = this.chooseCell(4);
        let found = [found1, found2];
        let randomfound = random(found);
        let exact = random(randomfound);
        if (exact) {
            this.energy += 5;
            let x = exact[0];
            let y = exact[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1);
                } else {
                    for (let i = 0; i < venomFlowerArr.length; i++) {
                        if (venomFlowerArr[i].x == x && venomFlowerArr[i].y == y) {
                            venomFlowerArr.splice(i, 1);
                        }
                    }
                }
            }

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            if (this.energy > 30) {
                this.mul();
            }
        } else {
            this.move();
        }
    }

    move() {
        let found = this.chooseCell(0);
        let exact = random(found);

        if (exact) {
            let x = exact[0];
            let y = exact[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            this.energy--;

            if (this.energy < 0) {
                this.die();
            }
        } else {
            this.energy--;
            if (this.energy < 0) {
                this.die();
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < flowerEaterArr.length; i++) {
            if (this.x == flowerEaterArr[i].x && this.y == flowerEaterArr[i].y) {
                flowerEaterArr.splice(i, 1);
                break;
            }
        }
    }
}
