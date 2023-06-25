class Cell {
	// Value 	list of tile ID 1,2,3,4,...
	constructor(x, y) {
		// console.log("Cell(value,x,y)",x);
		this.collapsed = false;
		this.empty = false;
		this.tile = undefined;
		this.x = x;
		this.y = y;
		this.north = [];
		this.est = [];
		this.south = [];
		this.west = [];
		this.solutions = [];
		this.tempsolutions = [];
		this.decal = false;
		this.n = false;
		this.e = false;
		this.s = false;
		this.w = false;
	}


	getNeighboursCell(x, y) {
		var emptyCell = new Cell(x, y);
		emptyCell.tile = empty_tile;
		emptyCell.collapsed = true;
		emptyCell.empty = true;



		if (x < 0) {
			return emptyCell;
		} else if (x > horizontal_tiles - 1) {
			return emptyCell;
		} else if (y < 0) {
			return emptyCell;
		} else if (y > vertical_tiles) {
			return emptyCell;
		} else {
			return cells_grid[x][y];
		}
	}


	// logCondition(cx,cy,text){
	// 	if(this.x==cx && this.y == cy){
	// 		console.log("lc",x,y,text);
	// 	}
	// }	

	calculateEntropy(tiles) {
		if (this.y % 2 != 0) {
			this.decal = true;
		}


		var logx = 10;
		var logy = 20;
		if (!this.collapsed) {
			for (var i = 0; i < tiles.length; i++) {
				var T = tiles[i];

				// CHECK BETWEEN OPTIONS OF THE NORTH CELL AND THE TILE DATABASE

				// NORTH
				var north_neighbours_cell;
				if (this.decal) {
					north_neighbours_cell = this.getNeighboursCell(this.x + 1, this.y - 1);
				} else {
					north_neighbours_cell = this.getNeighboursCell(this.x, this.y - 1);
				}


				if (north_neighbours_cell.collapsed && north_neighbours_cell.tile) {
					if (north_neighbours_cell.tile.connector[2] == T.connector[0]) {
						this.north.push(T.id);
						this.n = true;
						// if(this.x == logx && this.y == logy ) console.log("tile connectors",T.connector[0]);
						// if(this.x == logx && this.y == logy ) console.log("neighbours north connectors",north_neighbours_cell.tile.connector[2]);
						// if(this.x == logx && this.y == logy ) console.log("NNC",this.x,":",this.y-1,"T.id->",T.id);
					}
				}

				// EST

				var est_neighbours_cell;
				if (this.decal) {
					est_neighbours_cell = this.getNeighboursCell(this.x + 1, this.y + 1);
				} else {
					est_neighbours_cell = this.getNeighboursCell(this.x, this.y + 1);
				}

				if (est_neighbours_cell.collapsed && est_neighbours_cell.tile) {
					if (est_neighbours_cell.tile.connector[3] == T.connector[1]) {
						this.est.push(T.id);
						this.e = true;
						if (this.x == 0 && this.y == logy) ("EEE", this.x - 1, "-", this.y, "->", T.id);
					}
				}

				// SOUTH
				var souht_neighbours_cell;
				if (this.decal) {
					souht_neighbours_cell = this.getNeighboursCell(this.x, this.y + 1);
				} else {
					souht_neighbours_cell = this.getNeighboursCell(this.x - 1, this.y + 1);
				}


				// console.log("souht_neighbours_cell",souht_neighbours_cell);
				if (souht_neighbours_cell.collapsed && souht_neighbours_cell.tile) {
					if (souht_neighbours_cell.tile.connector[0] == T.connector[2]) {
						this.south.push(T.id);
						this.s = true;
						if (this.x == 0 && this.y == 0) ("SSS", this.x, "-", this.y + 1, "->", T.id);
					}
				}

				// WEST
				var west_neighbours_cell;
				if (this.decal) {
					west_neighbours_cell = this.getNeighboursCell(this.x, this.y - 1);
				} else {
					west_neighbours_cell = this.getNeighboursCell(this.x - 1, this.y - 1);
				}

				if (west_neighbours_cell.collapsed && west_neighbours_cell.tile) {
					if (west_neighbours_cell.tile.connector[1] == T.connector[3]) {
						this.west.push(T.id);
						this.w = true;
						if (this.x == 0 && this.y == 0) ("WWW", this.x + 1, "-", this.y, "->", T.id);
					}
				}

				if (this.x == logx && this.y == logy) {
					if (this.x == logx && this.y == logy) console.log("current cell", this);
					// console.log("this.decal",this.decal);
					// console.log("north_neighbours_cell",north_neighbours_cell);
					// console.log("est_neighbours_cell",est_neighbours_cell);
					// console.log("souht_neighbours_cell",souht_neighbours_cell);
					// console.log("west_neighbours_cell",west_neighbours_cell);
				}

			}
		}


		if (this.n) this.tempsolutions.push(this.north);
		if (this.e) this.tempsolutions.push(this.est);
		if (this.s) this.tempsolutions.push(this.south);
		if (this.w) this.tempsolutions.push(this.west);

		// console.log("TEMP SOLUTION",this.x,this.y,this.tempsolutions);
		// this.solutions = this.tempsolutions.reduce((acc, curVal) => acc.concat(curVal), []);
		// console.log("SOLUTION",this.solutions);
		// var set = new Set(this.solutions);
		// console.log("commonElements",commonElements);


		var directionCount = this.tempsolutions.length;

		// console.log(">",this.x,"-",this.y, " directionCount",directionCount);
		if (directionCount == 0) {
			// console.log("no solution, skip");
			return;
		}
		if (directionCount == 1) {
			// debugger;
			var sol = this.tempsolutions.reduce((acc, curVal) => acc.concat(curVal), []);
			// console.log("1 direction sol ->"+sol);
			this.tile = tiles_database[getRandomTile(sol, fxrand())];
			// this.tile = tiles_database[getMostConnectedSolution(sol)];
			this.tile = tiles_database[getRandomSolutionByConnectorCount(sol, connector_count_favor)];
			this.collapsed = true;
		}


		if (directionCount == 2) {
			var sol = this.tempsolutions[0].filter((element) => {
				return this.tempsolutions[1].includes(element);
			});
			// console.log("2 direction sol ->",sol);


			// this.tile = tiles_database[random(sol)];
			// this.tile = tiles_database[getRandomTile(sol, fxrand())];
			// this.tile = tiles_database[getMostConnectedSolution(sol)];
			this.tile = tiles_database[getRandomSolutionByConnectorCount(sol, connector_count_favor)];
			this.collapsed = true;
			// return;
		}


		if (directionCount == 3) {
			var sol1 = this.tempsolutions[0].filter((element) => {
				return this.tempsolutions[1].includes(element);
			});
			var sol = this.tempsolutions[2].filter((element) => {
				return sol1.includes(element);
			});
			// console.log("3 direction sol ->",sol);

			// getMostConnectedSolution(sol);
			// this.tile = tiles_database[random(sol)];
			// this.tile = tiles_database[getRandomTile(sol, fxrand())];
			// this.tile = tiles_database[getMostConnectedSolution(sol)];
			this.tile = tiles_database[getRandomSolutionByConnectorCount(sol, connector_count_favor)];

			this.collapsed = true;
			// return;
		}


		if (directionCount == 4) {
			// console.log("4 direction sol ->",sol);
			// return;
			var sol1 = this.tempsolutions[0].filter((element) => {
				return this.tempsolutions[1].includes(element);
			});
			var sol2 = this.tempsolutions[2].filter((element) => {
				return this.tempsolutions[3].includes(element);
			});
			var sol = sol1.filter((element) => {
				return sol2.includes(element);
			});

			// console.log("4 direction sol ->",sol);

			// this.tile = tiles_database[random(sol)];
			// this.tile = tiles_database[getRandomTile(sol, fxrand())];
			// this.tile = tiles_database[getMostConnectedSolution(sol)];
			this.tile = tiles_database[getRandomSolutionByConnectorCount(sol, connector_count_favor)];
			this.collapsed = true;
			// return;
		}
		// debugger;

	}

}
