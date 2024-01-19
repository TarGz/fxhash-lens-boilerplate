class Cell {
	// The Cell class represents a cell in the grid.
	// Each cell has properties to store its state, position, and possible solutions.
	// It also has methods to get its neighbours and calculate its entropy.

	// Value 	list of tile ID 1,2,3,4,...
	constructor(x, y) {
		// The constructor initializes the cell with the given x and y coordinates.
		// It also sets the initial state of the cell to uncollapsed and not empty.
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
		this.number=0;
	}


	getNeighboursCell(x, y) {
		// This method returns the neighbouring cell at the given x and y coordinates.
		// If the coordinates are out of bounds, it returns an empty cell.
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


	calculateEntropy(tiles) {
		// This method calculates the entropy of the cell.
		// It checks the possible tiles that can be placed in the cell based on the connectors of the neighbouring cells.
		// It then stores the possible solutions in the respective direction arrays (north, est, south, west).
		// Finally, it selects a tile from the possible solutions based on the number of connectors and collapses the cell.
		// This method calculates the entropy of the cell.
		// redraw();
		// debugger;


		if (this.y % 2 != 0) {
			this.decal = true;
		}


		var logx = 10;
		var logy = 20;
		// Check if the cell is not collapsed
		if (!this.collapsed) {
			// Iterate over all tiles
			for (var i = 0; i < tiles.length; i++) {
				var T = tiles[i];

				// Check between options of the north cell and the tile database

				// NORTH
				var north_neighbours_cell;
				// If the cell is decal, get the north neighbour cell at x+1, y-1
				if (this.decal) {
					north_neighbours_cell = this.getNeighboursCell(this.x + 1, this.y - 1);
				} else {
					// Else get the north neighbour cell at x, y-1
					north_neighbours_cell = this.getNeighboursCell(this.x, this.y - 1);
				}

				// If the north neighbour cell is collapsed and has a tile
				if (north_neighbours_cell.collapsed && north_neighbours_cell.tile) {
					// If the connector of the north neighbour cell matches with the tile connector
					if (north_neighbours_cell.tile.connector[2] == T.connector[0]) {
						// Push the tile id to the north array and set n to true
						this.north.push(T.id);
						this.n = true;
					}
				}

				// EST

				var est_neighbours_cell;
				// If the cell is decal, get the est neighbour cell at x+1, y+1
				if (this.decal) {
					est_neighbours_cell = this.getNeighboursCell(this.x + 1, this.y + 1);
				} else {
					// Else get the est neighbour cell at x, y+1
					est_neighbours_cell = this.getNeighboursCell(this.x, this.y + 1);
				}

				// If the est neighbour cell is collapsed and has a tile
				if (est_neighbours_cell.collapsed && est_neighbours_cell.tile) {
					// If the connector of the est neighbour cell matches with the tile connector
					if (est_neighbours_cell.tile.connector[3] == T.connector[1]) {
						// Push the tile id to the est array and set e to true
						this.est.push(T.id);
						this.e = true;
					}
				}

				// SOUTH
				var souht_neighbours_cell;
				// If the cell is decal, get the south neighbour cell at x, y+1
				if (this.decal) {
					souht_neighbours_cell = this.getNeighboursCell(this.x, this.y + 1);
				} else {
					// Else get the south neighbour cell at x-1, y+1
					souht_neighbours_cell = this.getNeighboursCell(this.x - 1, this.y + 1);
				}

				// If the south neighbour cell is collapsed and has a tile
				if (souht_neighbours_cell.collapsed && souht_neighbours_cell.tile) {
					// If the connector of the south neighbour cell matches with the tile connector
					if (souht_neighbours_cell.tile.connector[0] == T.connector[2]) {
						// Push the tile id to the south array and set s to true
						this.south.push(T.id);
						this.s = true;
					}
				}

				// WEST
				var west_neighbours_cell;
				// If the cell is decal, get the west neighbour cell at x, y-1
				if (this.decal) {
					west_neighbours_cell = this.getNeighboursCell(this.x, this.y - 1);
				} else {
					// Else get the west neighbour cell at x-1, y-1
					west_neighbours_cell = this.getNeighboursCell(this.x - 1, this.y - 1);
				}

				// If the west neighbour cell is collapsed and has a tile
				if (west_neighbours_cell.collapsed && west_neighbours_cell.tile) {
					// If the connector of the west neighbour cell matches with the tile connector
					if (west_neighbours_cell.tile.connector[1] == T.connector[3]) {
						// Push the tile id to the west array and set w to true
						this.west.push(T.id);
						this.w = true;
					}
				}

			}
		}

		// If n, e, s, w are true, push the respective arrays to the tempsolutions array
		if (this.n) this.tempsolutions.push(this.north);
		if (this.e) this.tempsolutions.push(this.est);
		if (this.s) this.tempsolutions.push(this.south);
		if (this.w) this.tempsolutions.push(this.west);

		// Get the count of directions
		var directionCount = this.tempsolutions.length;

		// If there are no directions, return
		if (directionCount == 0) {
			return;
		}
		// If there is only one direction, get the solution by reducing the tempsolutions array and collapsing the cell
		if (directionCount == 1) {
			var sol = this.tempsolutions.reduce((acc, curVal) => acc.concat(curVal), []);
			this.tile = tiles_database[getRandomSolutionByConnectorCount(sol, connector_count_favor)];
			this.collapsed = true;
		}

		// If there are two directions, get the solution by filtering the tempsolutions array and collapsing the cell
		if (directionCount == 2) {
			var sol = this.tempsolutions[0].filter((element) => {
				return this.tempsolutions[1].includes(element);
			});
			this.tile = tiles_database[getRandomSolutionByConnectorCount(sol, connector_count_favor)];
			this.collapsed = true;
		}

		// If there are three directions, get the solution by filtering the tempsolutions array twice and collapsing the cell
		if (directionCount == 3) {
			var sol1 = this.tempsolutions[0].filter((element) => {
				return this.tempsolutions[1].includes(element);
			});
			var sol = this.tempsolutions[2].filter((element) => {
				return sol1.includes(element);
			});
			this.tile = tiles_database[getRandomSolutionByConnectorCount(sol, connector_count_favor)];
			this.collapsed = true;
		}

		// If there are four directions, get the solution by filtering the tempsolutions array three times and collapsing the cell
		if (directionCount == 4) {
			var sol1 = this.tempsolutions[0].filter((element) => {
				return this.tempsolutions[1].includes(element);
			});
			var sol2 = this.tempsolutions[2].filter((element) => {
				return this.tempsolutions[3].includes(element);
			});
			var sol = sol1.filter((element) => {
				return sol2.includes(element);
			});
			this.tile = tiles_database[getRandomSolutionByConnectorCount(sol, connector_count_favor)];
			this.collapsed = true;
		}
	}

}
