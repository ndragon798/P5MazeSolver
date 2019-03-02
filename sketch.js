var imgsize;
var grid = [];
var cellsize;
var cells = [];
var travelers = [];
function preload() {
    var imga = new Image();
    imga.onload = function() {
            imgsize = this.width;
        };
    imga.src = 'http://localhost:8000/50x50.png';
    img = loadImage('http://localhost:8000/50x50.png');
}
function setup() {
    // frameRate(10);
    image(img, 0, 0);
    for (var i = 0; i < imgsize; i++) {
        for (var j = 0; j < imgsize; j++) {
            grid.push(get(i, j));
        }
    }
    cellsize = (Math.floor(windowHeight * 0.5) * 1 / imgsize);
    createCanvas(Math.floor(windowHeight * 0.5), Math.floor(windowHeight * 0.5));
    var c = 0;
    for (var i = 0; i < imgsize; i++) {
        for (var j = 0; j < imgsize; j++) {
            // fill(grid[i]);
            //    fill(grid[c]);
            // rect(cellsize*i,cellsize*j ,cellsize,cellsize);
            cells.push(new cell(i, j, c));
            c++;
        }
    }
    for (var i = 0; i < cells.length; i++) {
        // console.log(i, grid[cells[i].c]);

        if (_.isEqual(grid[cells[i].c], [255, 0, 0, 255])) {
            console.log("End Cell Found");
        }
        if (_.isEqual(grid[cells[i].c], [0, 255, 0, 255])) {
            console.log("Start Cell Found");
            travelers.push(new traveler(cells[i].x, cells[i].y, cells[i].x, cells[i].y, cells[i], null));
        }
        cells[i].findneighbors();
    }
}
function draw() {
    background(51);
    for (var i = 0; i < cells.length; i++) {
        cells[i].show();
    }
    var tl = travelers.length;
    for (var i = 0; i < tl; i++) {
        travelers[i].show();
    }
}
function traveler(sx, sy, x, y, cid, past) {
    this.sx = sx;
    this.sy = sy;
    this.x = x;
    this.y = y;
    this.cell = cid;
    this.used = false;
    this.past = past;
    this.show = function() {
        if (this.used == false) {
            fill("blue");
            ellipse(this.x * cellsize + cellsize / 2, this.y * cellsize + cellsize / 2, cellsize * 0.2);
            this.findnext();
        }
    };
    this.findnext = function() {
        this.used = true;
        var any = false;
        if (this.cell.up !== null && this.cell.up.traveled == false && _.isEqual(grid[this.cell.up.c], [255, 0, 0, 255])) {
            console.log("RED");
            this.cell.highlight = true;
            while (this.past != null) {
                this.past.cell.highlight = true;
                this.past = this.past.past;
            }
            console.log("DONE");
        }
        if (this.cell.left !== null && this.cell.left.traveled == false && _.isEqual(grid[this.cell.left.c], [255, 0, 0, 255])) {
            console.log("RED");
            this.cell.highlight = true;
            while (this.past != null) {
                this.past.cell.highlight = true;
                this.past = this.past.past;
            }
            console.log("DONE");
        }
        if (this.cell.down !== null && this.cell.down.traveled == false && _.isEqual(grid[this.cell.down.c], [255, 0, 0, 255])) {
            console.log("RED");
            this.cell.highlight = true;
            while (this.past != null) {
                this.past.cell.highlight = true;
                this.past = this.past.past;
            }
            console.log("DONE");
        }
        if (this.cell.right !== null && this.cell.right.traveled == false && _.isEqual(grid[this.cell.right.c], [255, 0, 0, 255])) {
            console.log("RED");
            this.cell.highlight = true;
            while (this.past != null) {
                this.past.cell.highlight = true;
                this.past = this.past.past;
            }
            console.log("DONE");
        }
        if (this.cell.up !== null && this.cell.up.traveled == false && _.isEqual(grid[this.cell.up.c], [255, 255, 255, 255])) {
            any = true;
            // console.log("UP");
            this.cell.traveled = true;
            travelers.push(new traveler(this.cell.up.x, this.cell.up.y, this.cell.up.x, this.cell.up.y, this.cell.up, this));
        }
        if (this.cell.left !== null && this.cell.left.traveled == false && _.isEqual(grid[this.cell.left.c], [255, 255, 255, 255])) {
            any = true;
            // console.log("LEFT");
            this.cell.traveled = true;
            travelers.push(new traveler(this.cell.left.x, this.cell.left.y, this.cell.left.x, this.cell.left.y, this.cell.left, this));
        }
        if (this.cell.down !== null && this.cell.down.traveled == false && _.isEqual(grid[this.cell.down.c], [255, 255, 255, 255])) {
            any = true;
            // console.log("DOWN");
            this.cell.traveled = true;
            travelers.push(new traveler(this.cell.down.x, this.cell.down.y, this.cell.down.x, this.cell.down.y, this.cell.down, this));
        }
        if (this.cell.right !== null && this.cell.right.traveled == false && _.isEqual(grid[this.cell.right.c], [255, 255, 255, 255])) {
            any = true;
            // console.log("RIGHT");
            this.cell.traveled = true;
            travelers.push(new traveler(this.cell.right.x, this.cell.right.y, this.cell.right.x, this.cell.right.y, this.cell.right, this));
        }
        if (any == false) {
            this.cell.traveled = true;
        }
    };
}
function cell(x, y, c) {
    this.x = x;
    this.y = y;
    this.c = c;
    this.up = null;
    this.down = null;
    this.left = null;
    this.right = null;
    this.highlight = false;
    this.traveled = false;
    this.show = function() {
        fill(grid[this.c]);
        if (this.highlight == true) {
            fill("yellow");
        } else if (this.traveled == true) {
            fill("blue");
        }
        noStroke();
        rect(cellsize * x, cellsize * y, cellsize, cellsize);
    };
    this.findneighbors = function() {
        for (var i = 0; i < cells.length; i++) {
            if (cells[i].x == this.x + 1 && cells[i].y == this.y) {
                this.right = cells[i];
            } else if (cells[i].x == this.x - 1 && cells[i].y == this.y) {
                this.left = cells[i];
            } else if (cells[i].x == this.x && cells[i].y == this.y + 1) {
                this.down = cells[i];
            } else if (cells[i].x == this.x && cells[i].y == this.y - 1) {
                this.up = cells[i];
            }
        }
    };
}