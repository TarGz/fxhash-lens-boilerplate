


class Tile {
	constructor(name, id, connector, quarter_rotations_count) {
		// console.log("name",name);
		this.name = name;
		this.connector = connector;
		this.id = id;
		// this.tile = eval(name);
		this.rotation = 0;
		this.quarter_rotations_count = quarter_rotations_count;
		if (quarter_rotations_count != 0) {
			this.set_rotation(quarter_rotations_count);
		}
		// this.tile = eval(name);
		// console.log(this.name+"->",this.tile);
		// this.tile.rotate(this.rotation);


		// console.log(this.name, "tile.rotation",this.rotation);
	}


	set_rotation(quarter_rotations_count) {
		// console.log("quarter_rotations_count",quarter_rotations_count);
		for (var i = 0; i < quarter_rotations_count; i++) {
			// tile_data_clone.connector.push(tile_data_clone.connector.shift());
			this.connector.unshift(this.connector.pop());
			this.rotation = 90 * quarter_rotations_count;
			// this.tile.rotate(this.rotation);
		}
	}

	clone() {
		return new Tile(this.name, this.id, structuredClone(this.connector), this.quarter_rotations_count);
	}

}

function get_fixed_rotation(r){
	var  fixed_angle = 0;
	if(r==0 || r==180 || r==360){
		// console.log("get_fixed_rotation CAS 0 360");
		fixed_angle =  45;
	}else if(r==45){
		// console.log("get_fixed_rotation CAS 45");
		fixed_angle =  45;
	}else if(r==90){
		// console.log("get_fixed_rotation CAS 90");
		fixed_angle =  0;
	}else if(r==135){
		// console.log("get_fixed_rotation CAS 135");
		fixed_angle =  45;
	}
	// console.log("get_fixed_rotation2 "+r+"->"+fixed_angle);
	return r;

}


function drawArc2(graphics, centerX, centerY, radius, startAngle, endAngle, brush_rotation, expand_start, expand_end) {
	// brush_rotation=90;
	if (expand_start) startAngle = startAngle - radians(20);
	if (expand_end) endAngle = endAngle + radians(20);
	brush_h = brush_w / 6;

	var shapeRadius = brush_h / 2;
	var arcLength = radius * Math.abs(endAngle - startAngle); // Calculate the arc length based on radius and angle span
	var shapeCount = Math.ceil(arcLength / (shapeRadius * 2)); // Calculate the number of shapes based on the desired size
	var angleIncrement = (endAngle - startAngle) / (shapeCount - 1); // Calculate the angle increment based on the arc length
	// console.log("shapeCount",shapeCount);
	for (var i = 0; i < shapeCount; i++) {

		var currentAngle = startAngle + angleIncrement * i;
		var x = centerX + radius * Math.cos(currentAngle);
		var y = centerY + radius * Math.sin(currentAngle);

		graphics.push();
		graphics.translate(x, y);
		// the -45 compensate the tile 45° rotation
		// graphics.rotate(radians(brush_rotation-45));
		// graphics.rotate(radians(90));
		graphics.rotate(radians(get_fixed_rotation(brush_rotation)));
		graphics.ellipse(0, 0, brush_w, brush_h);
		graphics.pop();

	}
}



function drawLine(graphics, x1, y1, x2, y2, brush_rotation, expand_start, expand_end) {
	// -> hack pour que les edges ce touche 
	// ça bug puisque en fonction de l'angle c'est pas la meme valeur qu'il faut editer
	if (expand_end) x1 = x1 - cells_size / 20;
	if (expand_start) x2 = x2 + cells_size / 20;
	brush_h = brush_w / 6;
	// endAngle = endAngle+radians(20);
	// <- hack
	// console.log("distance:",distance);
	const vx = x2 - x1;
	const vy = y2 - y1;
	const v = createVector(vx, vy);

	// Iterate over the magnitude of the vector
	// console.log("v.mag()",v.mag());

	for (let i = 0; i < v.mag(); i++) {
		// Calculate the x and y coordinates of the current point
		const nX = x1 + i * cos(v.heading());
		const nY = y1 + i * sin(v.heading());


		// Draw a circle at the current point
		graphics.push();
		graphics.translate(nX, nY);
		// the -45 compensate the tile 45° rotation
		// graphics.rotate(radians(brush_rotation-45));
		graphics.rotate(radians(get_fixed_rotation(brush_rotation)));
		// graphics.rotate(radians(90));
		graphics.ellipse(0, 0, brush_w, brush_h);
		graphics.pop();
	}
}




function createVectCanvas(){
	var v = createGraphics(cells_size, cells_size, SVG);
	v.noFill();
	v.strokeWeight(stroke_size);
	return v;
}

function get_tile_Empty_pix(brush_angle, paint_color) {
	tile_Empty = createGraphics(cells_size, cells_size, SVG);
	tile_Empty_Pix = createGraphics(cells_size, cells_size, SVG);
	// tile_Empty_pix = false;
	return [tile_Empty_Pix,tile_Empty];
}

// ┌───────────────────────────────────────┐
// │ _____ ___ _    ___   ___   ___ _____  │
// │|_   _|_ _| |  | __| |   \ / _ \_   _| │
// │  | |  | || |__| _|  | |) | (_) || |   │
// │  |_| |___|____|___|_|___/ \___/ |_|   │
// └───────────────────────────────────────┘

function get_tile_Dot_pix(brush_angle, paint_color) {
	// console.log("get_tile_Dot_pix()");
	// debugger;
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	// pix.colorMode(HSB, 100);
	pix.noStroke();
	pix.fill(paint_color);
	for (var i = 1; i < lines_per_tiles; i++) {
		vect.stroke(getColorLine(i, "#ff54ab"));
		// if (i % 2 == 0) tile_Dot.arc(cells_size / 2, cells_size / 2, (lines_radius / 2) * i, (lines_radius / 2) * i, 0, TWO_PI);
		if (i % 2 != 0){
			drawArc2(pix, cells_size / 2, cells_size / 2, (lines_space/2) * i, 0, TWO_PI, brush_angle, true, true);
			vect.arc(cells_size / 2, cells_size / 2, (lines_radius / 2) * i, (lines_radius / 2) * i, 0, TWO_PI);
		} 
	}
	// console.log(pix,vect);
	return [pix,vect];
}

// ┌───────────────────────────────────┐
// │ _____ ___ _    ___         _      │
// │|_   _|_ _| |  | __|  ___  | |     │
// │  | |  | || |__| _|  |___| | |__   │
// │  |_| |___|____|___|       |____|  │
// └───────────────────────────────────┘

function get_tile_L_pix(brush_angle, paint_color) {
	// console.log("get_tile_L_pix()");
	// debugger;
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	// pix.colorMode(HSB, 100);
	pix.noStroke();
	pix.fill(paint_color);
	for (var i = 1; i < lines_per_tiles; i++) {
		vect.stroke(getColorLine(i - 1, color(28, 137, 213)));
		vect.line(0, i * lines_space, cells_size, i * lines_space);
		drawLine(pix, 0, i * lines_space, cells_size, i * lines_space, brush_angle, true, true);
	}
	return [pix,vect];
}

// ┌────────────────────────────────────────────────┐
// │ _____ ___ _    ___          ___                │
// │|_   _|_ _| |  | __|  ___   / __|               │
// │  | |  | || |__| _|  |___| | (__                │
// │  |_| |___|____|___|        \___|               │
// └────────────────────────────────────────────────┘

function get_tile_C_pix(brush_angle, paint_color) {
	// console.log("get_tile_C_pix()");
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	pix.noStroke();
	pix.fill(paint_color);
	for (var i = 1; i < lines_per_tiles; i++) {
		vect.stroke(getColorLine(i - 1, color(0, 12, 255)));
		vect.arc(0, 0, lines_radius * i, lines_radius * i, 0, HALF_PI);
		drawArc2(pix, 0, 0, lines_space * i, 0, HALF_PI, brush_angle, true, true);
	}

	return [pix,vect];
}

// ┌────────────────────────────────────────────────┐
// │ _____ ___ _    ___          ___          ___   │
// │|_   _|_ _| |  | __|  ___   / __| __ __  / __|  │
// │  | |  | || |__| _|  |___| | (__  \ \ / | (__   │
// │  |_| |___|____|___|        \___| /_\_\  \___|  │
// └────────────────────────────────────────────────┘

function get_tile_CxC_pix(brush_angle, paint_color) {
	// console.log("get_tile_CxC_pix()");
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	pix.noStroke();
	pix.fill(paint_color);
	for (var i = 1; i < lines_per_tiles; i++) {
		// var sprite_count = i * 90;
		// Initial ARCS
		drawArc2(pix, 0, 0, lines_space * i, 0, HALF_PI, brush_angle, true, true);
		vect.stroke(getColorLine(i - 1, color(197, 148, 200)));
		vect.arc(0, 0, lines_radius * i, lines_radius * i, 0, HALF_PI);
		var circ1 = { x: 0, y: 0, r: (lines_radius / 2) * (lines_per_tiles - 1) };
		var circ2 = { x: cells_size, y: cells_size, r: (lines_radius / 2) * i };

		var intersect = intersectCircleCircle(circ1, circ2);


		if (intersect.intersect_occurs) { // if Intsersection
			// tile_CxC.stroke(255, 255, 0);
			// Intsersection points
			// debug.point(intersect.point_1.x,intersect.point_1.y);
			// debug.point(intersect.point_2.x,intersect.point_2.y);

			//      C  (intersection)
			// 			|\
			//			| \
			//			|  \h
			//	 op |   \   
			//			|    \  
			//			|     \ 
			//	    |______\
			//      B  adj  A

			var a = cells_size;
			var b = intersect.point_1.x;
			var c = intersect.point_1.y;
			var adj = cells_size - b;
			var op = cells_size - c;
			// var hyp = Math.sqrt( (Math.pow(adj,2) + Math.pow(op,2))) ;

			// calcul angle des poitns d'intersction
			var angle = Math.atan(op / adj);
			vect.arc(cells_size, cells_size, lines_radius * i, lines_radius * i, radians(180), radians(180) + angle);
			vect.arc(cells_size, cells_size, lines_radius * i, lines_radius * i, radians(270) - angle, radians(270));
			drawArc2(pix, cells_size, cells_size, lines_space * i, radians(180), radians(180) + angle, brush_angle, true, false);
			drawArc2(pix, cells_size, cells_size, lines_space * i, radians(270) - angle, radians(270) + angle, brush_angle, false, true);
		} else {
			drawArc2(pix, cells_size, cells_size, lines_space * i, radians(180), radians(270), brush_angle, true, true);
			vect.arc(cells_size, cells_size, lines_radius * i, lines_radius * i, radians(180), radians(270));
		}
	}

	return [pix,vect];
}



// ┌──────────────────────────────────────────────────┐
// │ _____ ___ _    ___    _        _                 │
// │|_   _|_ _| |  | __|__| |  __ _| |                │
// │  | |  | || |__| _|___| |__\ \ / |__              │
// │  |_| |___|____|___|  |____/_\_\____|             │
// └──────────────────────────────────────────────────┘

function get_tile_LxL_pix(brush_angle, paint_color) {
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	pix.noStroke();
	pix.fill(paint_color);

	

	// RIGHT
	for (var i = 1; i < lines_per_tiles; i++) {
		var p1 = createVector((i) * lines_space, cells_size-lines_space);
		var p2 = createVector((i) * lines_space, cells_size);
		vect.stroke(getColorLine(i-1, "#ff54ab"));
		vect.line(p1.x,p1.y,p2.x,p2.y);
		p2 = createVector((i) * lines_space, cells_size);
		p1 = createVector((i) * lines_space, cells_size-lines_space);
		// pix.line(p1.x, p1.y, p2.x, p2.y);
		drawLine(pix, p1.x, p1.y, p2.x, p2.y, brush_angle, false, false);
	}

	// LEFT
	for (var i = 1; i < lines_per_tiles; i++) {
		var p1 = createVector(i * lines_space, 0);
		var p2 = createVector(i * lines_space, cells_size / lines_per_tiles);
		vect.stroke(getColorLine(i-1, "#ff54ab"));
		vect.line(p1.x,p1.y,p2.x,p2.y);
		p1 = createVector((i) * lines_space, 0);
		p2 = createVector((i) * lines_space, cells_size / lines_per_tiles);
		drawLine(pix, p1.x, p1.y, p2.x, p2.y, brush_angle, false, false);
	}

	// LONG LINES
	for (var i = 1; i < lines_per_tiles; i++) {
		var p1 = createVector(0, i * lines_space);
		var p2 = createVector(cells_size, i * lines_space);
		vect.stroke(getColorLine(i-1, "#ff54ab"));
		vect.line(p1.x,p1.y,p2.x,p2.y);
		drawLine(pix, p1.x, p1.y, p2.x, p2.y, brush_angle, true, true);
	}
	return [pix,vect];
}

// ┌────────────────────────────────────────────────┐
// │ _____ ___ _    ___          ___           _    │
// │|_   _|_ _| |  | __|  ___   / __| __ __   /_\   │
// │  | |  | || |__| _|  |___| | (__  \ \ /  / _ \  │
// │  |_| |___|____|___|        \___| /_\_\ /_/ \_\ │
// └────────────────────────────────────────────────┘



// ┌───────────────────────────────────────┐
// │ _____ ___ _    ___   ___     _  ___   │
// │|_   _|_ _| |  | __| / __|_ _/ |/ __|  │
// │  | |  | || |__| _| | (__\ \ / | (__   │
// │  |_| |___|____|___|_\___/_\_\_|\___|  │
// └───────────────────────────────────────┘
function get_tile_Cx1C_pix(brush_angle, paint_color) {
	// console.log("get_tile_Cx1C_pix()");
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	pix.noStroke();
	pix.fill(paint_color);

	for (var i = 1; i < lines_per_tiles; i++) {

		vect.stroke(getColorLine(i - 1, "#8cc98f"));
		vect.arc(0, 0, lines_radius * i, lines_radius * i, 0, HALF_PI);
		drawArc2(pix, 0, 0, lines_space * i, 0, HALF_PI, brush_angle, true, true);

		// Second ARCS (CUT)
		if (isEvenAndEven(i) == true) {

			var circ1 = { x: 0, y: 0, r: (lines_radius / 2) * (lines_per_tiles - 1) };
			var small_circ_1 = { x: cells_size / 2, y: cells_size, r: (lines_radius / 4) * i };
			var largest_small_circ_1 = { x: cells_size / 2, y: cells_size, r: (lines_radius / 4) * (lines_per_tiles - 2) };
			var small_circ_2 = { x: cells_size, y: cells_size / 2, r: (lines_radius / 4) * i };

			// Intersect between the left small circle and the large circle
			var intersect_left = intersectCircleCircle(circ1, small_circ_1);
			var intersect_right = intersectCircleCircle(circ1, small_circ_2);
			var intersect_minis = intersectCircleCircle(largest_small_circ_1, small_circ_2);
			var color_shift = (lines_per_tiles % 2 == 0) ? -2 : -1;
			var lcolor = Math.floor(color_shift + lines_per_tiles / 2) - Math.floor((i - 1) / 2);
			vect.stroke(getColorLine(lcolor, "#ff724c"));

			// SMALL CIRCLE LEFT CASE
			if (intersect_left.intersect_occurs) { // if Intsersection
				// console.log(intersect);
				//      VA  
				// 			|\
				//			| \
				//			|  \
				//	 OP |   \   
				//			|    \  
				//			|     \ 
				//	   	|______\
				//    BB   ADJ  VC (intersection)

				// INTERSECTION LARGE WITH LEFT SIDE OF LEFT MINI CIRCLES
				var VA = createVector(cells_size / 2, cells_size);
				var VB = createVector(intersect_left.point_1.x, cells_size);
				var VC = createVector(intersect_left.point_1.x, intersect_left.point_1.y);
				var ADJ = VA.x - VB.x;
				var OP = VB.y - VC.y;

				// calcul angle des poitns d'intersction
				var angle1 = Math.atan(OP / ADJ);


				// INTERSECTION LARGE WITH RIGHT SIDE OF LEFT MINI CIRCLES
				VB = createVector(intersect_left.point_2.x, cells_size);
				VC = createVector(intersect_left.point_2.x, intersect_left.point_2.y);
				OP = VB.x - VA.x;
				if (VB.x < VA.x) OP = VA.x - VB.x; // Le triangle rectahgle est inversé dans ce cas la et le façon dont on dessine l'arc dois changer
				ADJ = VB.y - VC.y;
				// ADJ = VC.y;
				var angle2 = Math.atan(ADJ / OP);

				// DRAW
				// left side of the left mini circ
				vect.arc(small_circ_1.x, small_circ_1.y, small_circ_1.r*2,small_circ_1.r*2, radians(180), radians(180)+angle1);
				drawArc2(pix, small_circ_1.x, small_circ_1.y, small_circ_1.r, radians(180), radians(180) + angle1, brush_angle, false, false);
				// right side of the righ mini circ

				// 
				if (VB.x < VA.x) {
					// tile_Cx1C.stroke("#FFF0FF");
					vect.arc(small_circ_1.x, small_circ_1.y, small_circ_1.r*2,small_circ_1.r*2,  radians(180)+angle2,radians(360));
					drawArc2(pix, small_circ_1.x, small_circ_1.y, small_circ_1.r, radians(180) + angle2, radians(360), brush_angle, false, true);
				} else {
					vect.arc(small_circ_1.x, small_circ_1.y, small_circ_1.r*2,small_circ_1.r*2, radians(360)-angle2, radians(360));
					drawArc2(pix, small_circ_1.x, small_circ_1.y, small_circ_1.r, radians(360) - angle2, radians(360), brush_angle, false, true);
				}


			} else {
				// tile_Cx1C.stroke("#00FF00");
				vect.arc(small_circ_1.x, small_circ_1.y, small_circ_1.r*2,small_circ_1.r*2, radians(180), radians(360));
				drawArc2(pix, small_circ_1.x, small_circ_1.y, small_circ_1.r, radians(180), radians(360), brush_angle, true, false);
			}



		}
	}
	return [pix,vect];
}

// ┌──────────────────────────────────────────────────┐
// │ _____ ___ _    ___          ___         ___ ___  │
// │|_   _|_ _| |  | __|  ___   / __| __ __ |_  ) __| │
// │  | |  | || |__| _|  |___| | (__  \ \ /  / / (__  │
// │  |_| |___|____|___|        \___| /_\_\ /___\___| │
// └──────────────────────────────────────────────────┘


function get_tile_Cx2C_pix(brush_angle, paint_color) {
	// console.log("get_tile_Cx2C_pix");
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	pix.noStroke();
	pix.fill(paint_color);


	for (var i = 1; i < lines_per_tiles; i++) {

		vect.stroke(getColorLine(i - 1, "#8cc98f"));
		vect.arc(0, 0, lines_radius * i, lines_radius * i, 0, HALF_PI);
		drawArc2(pix, 0, 0, lines_space * i, 0, HALF_PI, brush_angle, true, true);
		// Second ARCS (CUT)


		if (isEvenAndEven(i) == true) {

			var circ1 = { x: 0, y: 0, r: (lines_radius / 2) * (lines_per_tiles - 1) };
			var small_circ_1 = { x: cells_size / 2, y: cells_size, r: (lines_radius / 4) * i };
			var largest_small_circ_1 = { x: cells_size / 2, y: cells_size, r: (lines_radius / 4) * (lines_per_tiles - 2) };
			var small_circ_2 = { x: cells_size, y: cells_size / 2, r: (lines_radius / 4) * i };

			// Intersect between the left small circle and the large circle
			var intersect_left = intersectCircleCircle(circ1, small_circ_1);
			var intersect_right = intersectCircleCircle(circ1, small_circ_2);
			var intersect_minis = intersectCircleCircle(largest_small_circ_1, small_circ_2);

			var color_shift = (lines_per_tiles % 2 == 0) ? -2 : -1;
			lcolor = Math.floor(color_shift + lines_per_tiles / 2) - Math.floor((i - 1) / 2);
			vect.stroke(getColorLine(lcolor, "#8cc98f"));
			// SMALL CIRCLE LEFT CASE
			if (intersect_left.intersect_occurs) { // if Intsersection
				// console.log(intersect);
				//      VA  
				// 			|\
				//			| \
				//			|  \
				//	 OP |   \   
				//			|    \  
				//			|     \ 
				//	   	|______\
				//    BB   ADJ  VC (intersection)

				// INTERSECTION LARGE WITH LEFT SIDE OF LEFT MINI CIRCLES
				var VA = createVector(cells_size / 2, cells_size);
				var VB = createVector(intersect_left.point_1.x, cells_size);
				var VC = createVector(intersect_left.point_1.x, intersect_left.point_1.y);
				var ADJ = VA.x - VB.x;
				var OP = VB.y - VC.y;

				// calcul angle des poitns d'intersction
				var angle1 = Math.atan(OP / ADJ);


				// INTERSECTION LARGE WITH RIGHT SIDE OF LEFT MINI CIRCLES
				VB = createVector(intersect_left.point_2.x, cells_size);
				VC = createVector(intersect_left.point_2.x, intersect_left.point_2.y);
				OP = VB.x - VA.x;
				if (VB.x < VA.x) OP = VA.x - VB.x; // Le triangle rectangle est inversé dans ce cas la et le façon dont on dessine l'arc dois changer
				ADJ = VB.y - VC.y;
				var angle2 = Math.atan(ADJ / OP);



				// DRAW
				vect.arc(small_circ_1.x, small_circ_1.y, small_circ_1.r * 2, small_circ_1.r * 2, radians(180), radians(180) + angle1);
				drawArc2(pix, small_circ_1.x, small_circ_1.y, small_circ_1.r, radians(180), radians(180) + angle1, brush_angle, true, false);
				// right side of the righ mini circ

				// 
				if (VB.x < VA.x) {
					vect.arc(small_circ_1.x, small_circ_1.y, small_circ_1.r * 2, small_circ_1.r * 2, radians(180) + angle2, radians(360));
					drawArc2(pix, small_circ_1.x, small_circ_1.y, small_circ_1.r, radians(180) + angle2, radians(360), brush_angle, false, true);
				} else {
					vect.arc(small_circ_1.x, small_circ_1.y, small_circ_1.r * 2, small_circ_1.r * 2, radians(360) - angle2, radians(360));
					drawArc2(pix, small_circ_1.x, small_circ_1.y, small_circ_1.r, radians(360) - angle2, radians(360), brush_angle, false, true);
				}


			} else {
				vect.arc(small_circ_1.x, small_circ_1.y, small_circ_1.r*2,small_circ_1.r*2, radians(180), radians(360));
				drawArc2(pix, small_circ_1.x, small_circ_1.y, small_circ_1.r, radians(180), radians(360), brush_angle, true, true);
			}




			// SMALL CIRCLE RIGHT CASE
			if (intersect_right.intersect_occurs) { // if Intsersection
				// console.log(intersect);
				//      VA  
				// 			|\
				//			| \
				//			|  \
				//	 OP |   \   
				//			|    \  
				//			|     \ 
				//	   	|______\
				//    BB   ADJ  VC (intersection)

				// INTERSECTION LARGE WITH LEFT SIDE OF RIGHT MINI CIRCLES
				var VA = createVector(cells_size, cells_size / 2);
				VB = createVector(cells_size, intersect_right.point_1.y);
				VC = createVector(intersect_right.point_1.x, intersect_right.point_1.y);
				var ADJ = VB.y - VA.y;
				var OP = VB.x - VC.x;

				// calcul angle des poitns d'intersction
				var angle1 = Math.atan(OP / ADJ);


				// INTERSECT BETWEEN THE SMALL CIRCLES
				if (intersect_minis.intersect_occurs) {
					// console.log("intersect_minis",intersect_minis);
					// if(debug_mode_activated)  tile_Cx2C.stroke("#FF00FF");
					// if(debug_mode_activated)  tile_Cx2C.point(intersect_minis.point_1.x,intersect_minis.point_1.y);
					VB = createVector(cells_size, intersect_minis.point_1.y);
					VC = createVector(intersect_minis.point_1.x, intersect_minis.point_1.y);
					OP = VB.x - VC.x;
					ADJ = VB.y - VA.y;
					var angle3 = Math.atan(OP / ADJ);

					vect.arc(small_circ_2.x, small_circ_2.y, small_circ_2.r * 2, small_circ_2.r * 2, radians(90), radians(90) + angle3);
					drawArc2(pix, small_circ_2.x, small_circ_2.y, small_circ_2.r, radians(90), radians(90) + angle3, brush_angle, true, false);

				} else {

					// vect.arc(small_circ_2.x, small_circ_2.y, small_circ_2.r*2,small_circ_2.r*2, radians(180), radians(180)+angle1);
					if (VB.y < VA.y) { // gestion cas particulier de B < A

						vect.arc(small_circ_2.x, small_circ_2.y, small_circ_2.r * 2, small_circ_2.r * 2, radians(90), radians(270) - angle2);
						drawArc2(pix, small_circ_2.x, small_circ_2.y, small_circ_2.r, radians(90), radians(270) - angle2, brush_angle, true, false);
					} else {
						vect.arc(small_circ_2.x, small_circ_2.y, small_circ_2.r * 2, small_circ_2.r * 2, radians(90), radians(90) + angle2);
						drawArc2(pix, small_circ_2.x, small_circ_2.y, small_circ_2.r, radians(90), radians(90) + angle2, brush_angle, true, false);

					}
				}


				// INTERSECTION LARGE WITH RIGHT SIDE OF RIGHT MINI CIRCLES
				VB = createVector(cells_size, intersect_right.point_2.y);
				VC = createVector(intersect_right.point_2.x, intersect_right.point_2.y);
				OP = VB.x - VC.x;
				ADJ = VA.y - VB.y;
				var angle2 = Math.atan(OP / ADJ);

				// console.log(VB.y , "-" , VC.y ,"=",VB.y - VC.y);
				// console.log("VA : ",VA);
				// console.log("VB : ",VB);
				// console.log("VC : ",VC);
				// console.log("ADJ2 : ",ADJ);
				// console.log("OP 2 : ",OP);
				// console.log("angle 2 : ",degrees(angle2));

				vect.arc(small_circ_2.x, small_circ_2.y, small_circ_2.r*2,small_circ_2.r*2, radians(270)-angle2, radians(270));
				drawArc2(pix, small_circ_2.x, small_circ_2.y, small_circ_2.r, radians(270) - angle2, radians(270), brush_angle, false, true);




			} else {
				vect.arc(small_circ_2.x, small_circ_2.y, small_circ_2.r*2,small_circ_2.r*2, radians(90), radians(270));
				drawArc2(pix, small_circ_2.x, small_circ_2.y, small_circ_2.r, radians(90), radians(270), brush_angle, false, true);
			}
		}
	}
	return [pix,vect];
}


// ┌──────────────────────────────────────────────────┐
// │ _____ ___ _    ___          ___         _        │
// │|_   _|_ _| |  | __|  ___   / __| __ __ | |       │
// │  | |  | || |__| _|  |___| | (__  \ \ / | |__     │
// │  |_| |___|____|___|        \___| /_\_\ |____|    │
// └──────────────────────────────────────────────────┘

function get_tile_CxL_pix(brush_angle, paint_color) {
	// console.log("get_tile_CxL_pix()");
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	pix.noStroke();
	pix.fill(paint_color);


	for (var i = 1; i < lines_per_tiles; i++) {

		vect.stroke(getColorLine(i - 1, color(126, 194, 146)));
		vect.arc(0, 0, lines_radius * i, lines_radius * i, 0, HALF_PI);
		drawArc2(pix, 0, 0, lines_space * i, 0, HALF_PI, brush_angle, true, true);


		// Lines
		var p1 = createVector(0, i * lines_space);
		var p2 = createVector(cells_size, i * lines_space);
		var r = ((lines_radius) * (lines_per_tiles - 1));
		var cpt = createVector(0, 0);
		// debug.circle(0,0,r);

		// tile_CxL.line(p1.x,p1.y,p2.x,p2.y);


		// console.log(p1,p2);

		var intersect = intersectLineCircle(p1, p2, cpt, r / 2)

		if (intersect[0] != undefined) {
			vect.line(intersect[0].x, intersect[0].y, p2.x, p2.y);
			drawLine(pix, intersect[0].x, intersect[0].y, p2.x, p2.y, brush_angle, true, false);
		} else {
			vect.line(p1.x, p1.y, p2.x, p2.y);
			drawLine(pix, p1.x, p1.y, p2.x, p2.y, brush_angle, true, true);
		}


	}



	return [pix,vect];
}




// ┌───────────────────────────────────────────┐
// │ _____ ___ _    ___         _    ___ ___   │
// │|_   _|_ _| |  | __|  ___  / |  / __| __|  │
// │  | |  | || |__| _|  |___| | | | (__| _|   │
// │  |_| |___|____|___|       |_|  \___|___|  │
// └───────────────────────────────────────────┘

function get_tile_1CE_pix(brush_angle, paint_color) {

	// console.log("get_tile_1CE_pix");
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	pix.noStroke();
	pix.fill(paint_color);
	// ARCS
	// for (var i = 0; i < lines_per_tiles; i++) {
	// 	// for (var i = 0; i < 2; i++) {
	// 	var lcolor;
	// 	var color_shift = (lines_per_tiles % 2 == 0) ? -2 : -1;
	// 	lcolor = Math.floor(color_shift + lines_per_tiles / 2) - Math.floor((i - 1) / 2);
	// 	var mylines_radius = lines_space * i;
	// 	if (i % 2 != 0 && lines_per_tiles % 2 != 0 || i % 2 == 0 && lines_per_tiles % 2 == 0) {
	// 		vect.stroke(getColorLine(lcolor, "#ff54ab"));
	// 		vect.arc(cells_size / 2, cells_size / 2, (lines_radius / 2) * i, (lines_radius / 2) * i, radians(-90), radians(90));

	// 		drawArc2(pix, cells_size / 2, cells_size / 2, mylines_radius / 2, radians(-90), radians(90), brush_angle, false, false);
	// 	}

	// }
	for (var i = 1; i < lines_per_tiles; i++) {
		var lcolor;
		var color_shift = (lines_per_tiles % 2 == 0) ? -2 : -1;
		lcolor = Math.floor(color_shift + lines_per_tiles / 2) - Math.floor((i - 1) / 2);
		var mylines_radius = lines_space * i;
		if (i % 2 == 0 && lines_per_tiles % 2 == 0) {
			vect.stroke(getColorLine(lcolor, "#ff54ab"));
			vect.arc(cells_size / 2, cells_size / 2, (lines_radius / 2) * i, (lines_radius / 2) * i, radians(-90), radians(90));
			drawArc2(pix, cells_size / 2, cells_size / 2, mylines_radius / 2, radians(-90), radians(90), brush_angle, false, false);
		} else if (i % 2 == 1 && lines_per_tiles % 2 == 1) {
			vect.stroke(getColorLine(lcolor, "#ff54ab"));
			vect.arc(cells_size / 2, cells_size / 2, (lines_radius / 2) * i, (lines_radius / 2) * i, radians(-90), radians(90));
			drawArc2(pix, cells_size / 2, cells_size / 2, mylines_radius / 2, radians(-90), radians(90), brush_angle, false, false);
		}
	}	
	// LINES
	for (var i = 1; i < lines_per_tiles; i++) {
		// tile_1CE.line(0,i*lines_space,cells_size/2,i*lines_space);
		vect.stroke(getColorLine(i - 1, color(255, 114, 0)));
		vect.line(0, i * lines_space, cells_size / 2, i * lines_space);
		drawLine(pix, 0, i * lines_space, cells_size / 2, i * lines_space, brush_angle, false, true);
	}

	return [pix,vect];
}

// ┌───────────────────────────────────────────┐
// │ _____ ___ _    ___         _    ___ ___   │
// │|_   _|_ _| |  | __|  ___  222  / __| __|  │
// │  | |  | || |__| _|  |___| | | | (__| _|   │
// │  |_| |___|____|___|       |_|  \___|___|  │
// └───────────────────────────────────────────┘

function get_tile_2CE_pix(brush_angle, paint_color) {

	// console.log("get_tile_1CE_pix");
	var vect = createVectCanvas();
	var pix = createGraphics(cells_size, cells_size, P2D);
	pix.noStroke();
	pix.fill(paint_color);
	// ARCS
	for (var i = 1; i < lines_per_tiles; i++) {
		var color_shift = (lines_per_tiles % 2 == 0) ? -2 : -1;
		var lcolor = Math.floor(color_shift + lines_per_tiles / 2) - Math.floor((i - 1) / 2);

		var mylines_radius = lines_space * i;
		// Si le nombre de ligne est impair on ne dessine que les i impaire et vis versa pour els paires
		if (i % 2 != 0 && lines_per_tiles % 2 != 0 || i % 2 == 0 && lines_per_tiles % 2 == 0) {
			vect.stroke(getColorLine(lcolor, color(255, 114, 0)));
			vect.arc(0, cells_size / 2, mylines_radius, mylines_radius, radians(-90), radians(90));
			drawArc2(pix, 0, cells_size / 2, mylines_radius / 2, radians(90), radians(-90), brush_angle, false, false);
			vect.arc(cells_size, cells_size / 2, mylines_radius, mylines_radius, radians(90), radians(-90));
			drawArc2(pix, cells_size, cells_size / 2, mylines_radius / 2, radians(270), radians(90), brush_angle, false, false);
		}
	}

	return [pix,vect];
}
