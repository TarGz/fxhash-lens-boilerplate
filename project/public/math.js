

function isEvenAndEven(i){
    // console.log("lines_per_tiles",lines_per_tiles,lines_per_tiles%2==0);
    // console.log(i,"(i%2==0)",(i%2==0));
    if(lines_per_tiles%2==0){
        return (i%2==0);
    }else{
        return (i%2!=0);
    }

    return false;
}


function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

/**
 * https://newdevzone.com/posts/how-to-calculate-intersection-point-of-a-line-on-a-circle-using-p5js
 * @param {Vector} p1 An object describing the first point.
 * @param {Vector} p2 An object describing the first point.
 * @param {float} cpt The y coordinate of the circle.
 * @param {float} r The radius of the circle.
 */


	// function intersectLineCircle(p1, p2, centerCircle, r) {
 //  // let centerCircle = createVector(cx, cy)
 //  // let p1 = createVector(x1, y1)
 //  // let p2 = createVector(x2, y2);
  
 //  let p1ToCenter = p5.Vector.sub(centerCircle, p1);
 //  let centerToP2 = p5.Vector.sub(p2, centerCircle);
 //  let line = p5.Vector.sub(p2, p1);
  
 //  let collision
 //  if(centerToP2.mag() > r) collision = true;
 //  else collision = false;
  
 //  // if(collision){
 //  	console.log("collision");
 //    // A -> Center
 //    // B -> p1 of line
 //    // C -> Collision Point
    
 //    let angB = abs(line.angleBetween(p1ToCenter))
 //    let angC = abs(asin((p1ToCenter.mag() * sin(angB))/r));
 //    let angA = PI - angC - angB
    
 //    let dBtoC = (sin(angA) * r)/sin(angB)
    
 //    let collision1 = p1.copy().add(p1ToCenter.copy().rotate(angB).setMag(dBtoC))
 //    let collision2 = p1.copy().add(p1ToCenter.copy().rotate(-angB).setMag(dBtoC))
 //    // stroke(255, 0, 0);
 //    // strokeWeight(8);
 //    // point(collision1.x, collision1.y)
 //    // point(collision2.x, collision2.y)
    
 //    // noStroke()
 //    // fill(0);
 //    // textSize(14);
 //    // text("A: "+round(degrees(angA)), cx,cy)
 //    // text("B: "+round(degrees(angB)), x1, y1)
 //    // text("C: "+round(degrees(angC)), x2, y2)
 //    return collision1;
 //  }
// }
function intersectLineCircle(p1, p2, cpt, r) {

    let sign = function(x) { return x < 0.0 ? -1 : 1; };

    let x1 = p1.copy().sub(cpt);
    let x2 = p2.copy().sub(cpt);

    let dv = x2.copy().sub(x1)
    let dr = dv.mag();
    let D = x1.x*x2.y - x2.x*x1.y;

    // evaluate if there is an intersection
    let di = r*r*dr*dr - D*D;
    if (di < 0.0)
        return [];
   
    let t = sqrt(di);

    ip = [];
    ip.push( new createVector(D*dv.y + sign(dv.y)*dv.x * t, -D*dv.x + abs(dv.y) * t).div(dr*dr).add(cpt) );
    if (di > 0.0) {
        ip.push( new createVector(D*dv.y - sign(dv.y)*dv.x * t, -D*dv.x - abs(dv.y) * t).div(dr*dr).add(cpt) ); 
    }
    return ip;
}


/**
 * https://stackoverflow.com/questions/12219802/a-javascript-function-that-returns-the-x-y-points-of-intersection-between-two-ci
 * @description Get information about the intersection points of a circle.
 * Adapted from: https://stackoverflow.com/a/12221389/5553768.
 * @param {Object} c1 An object describing the first circle.
 * @param {float} c1.x The x coordinate of the circle.
 * @param {float} c1.y The y coordinate of the circle.
 * @param {float} c1.r The radius of the circle.
 * @param {Object} c2 An object describing the second circle.
 * @param {float} c2.x The x coordinate of the circle.
 * @param {float} c2.y The y coordinate of the circle.
 * @param {float} c2.r The radius of the circle.
 * @returns {Object} Data about the intersections of the circles.
 */
function intersectCircleCircle(c1, c2) {
    // Start constructing the response object.
    const result = {
        intersect_count: 0,
        intersect_occurs: true,
        one_is_in_other: false,
        are_equal: false,
        point_1: { x: null, y: null },
        point_2: { x: null, y: null },
    };

    // Get vertical and horizontal distances between circles.
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;

    // Calculate the distance between the circle centers as a straight line.
    const dist = Math.hypot(dy, dx);

    // Check if circles intersect.
    if (dist > c1.r + c2.r) {
        result.intersect_occurs = false;
    }

    // Check one circle isn't inside the other.
    if (dist < Math.abs(c1.r - c2.r)) {
        result.intersect_occurs = false;
        result.one_is_in_other = true;
    }

    // Check if circles are the same.
    if (c1.x === c2.x && c1.y === c2.y && c1.r === c2.r) {
        result.are_equal = true;
        result.are_equal = true;
    }

    // Find the intersection points
    if (result.intersect_occurs) {
        // Centroid is the pt where two lines cross. A line between the circle centers
        // and a line between the intersection points.
        const centroid = (c1.r * c1.r - c2.r * c2.r + dist * dist) / (2.0 * dist);

        // Get the coordinates of centroid.
        const x2 = c1.x + (dx * centroid) / dist;
        const y2 = c1.y + (dy * centroid) / dist;

        // Get the distance from centroid to the intersection points.
        const h = Math.sqrt(c1.r * c1.r - centroid * centroid);

        // Get the x and y dist of the intersection points from centroid.
        const rx = -dy * (h / dist);
        const ry = dx * (h / dist);

        // Get the intersection points.
        result.point_1.x = Number((x2 + rx).toFixed(15));
        result.point_1.y = Number((y2 + ry).toFixed(15));

        result.point_2.x = Number((x2 - rx).toFixed(15));
        result.point_2.y = Number((y2 - ry).toFixed(15));

        // Add intersection count to results
        if (result.are_equal) {
            result.intersect_count = null;
        } else if (result.point_1.x === result.point_2.x && result.point_1.y === result.point_2.y) {
            result.intersect_count = 1;
        } else {
            result.intersect_count = 2;
        }
    }
    return result;
}
