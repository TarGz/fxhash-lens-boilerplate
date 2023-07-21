
// ┌─────────────────────────────────────────────────────┐
// │ ___    _   _  _ ___   ___  __  __ _  _ ___ ___ ___  │
// │| _ \  /_\ | \| |   \ / _ \|  \/  | \| | __/ __/ __| │
// │|   / / _ \| .` | |) | (_) | |\/| | .` | _|\__ \__ \ │
// │|_|_\/_/ \_\_|\_|___/ \___/|_|  |_|_|\_|___|___/___/ │
// └─────────────────────────────────────────────────────┘


// SIZE PARAMS, the first call taht define the grid size and the lines 

function getLinePerTile(random,min,max){
  return 33;
  // var sp = size_params.length;
  var lines = Math.floor(map(random,0,1,min,max));

  console.log("getLinePerTile()",random,min,"->",max,"::",lines);
  return lines;
}


// TILES 
function getRandomLayerColor(value){
  var cl = colors_array.length-1;


  var color_id = 0;

  if(color_theme==1) color_id = Math.round(map(value,0,1,0,cl));

  var color = colors_array[color_id];
  
  colors_array.splice(color_id,1);
  
  return color;
}
// function getRandomLayerColor(value){
//   var cl = colors_array.length-1;
//   var color_id = Math.round(map(value,0,1,0,cl));
//   // console.log("color_id",color_id);
//   // console.log("cl",cl);
//   // console.log("value",value);
//   var color = colors_array[color_id];
//   // console.log("@@@@@@@@@@@@colors_array");
//   // console.log(colors_array);
//   colors_array.splice(color_id,1);
//   // console.log(colors_array);
//   return color;
// }

function getRandomLayerBrushAngle(value){
  console.log("--------------------getRandomLayerBrushAngle",value);
  // return brush_angle_array[3];

  // console.log(brush_angle_array);
  var cl = brush_angle_array.length-1;
  var brush_id = Math.round(map(value,0,1,0,cl));
  
  var brush_angle = brush_angle_array[brush_id];
  // console.log("brush_id",brush_id);
  // console.log("cl",cl);
  // console.log("value",value);
  // brush_angle_array.splice(brush_id,1);
  // console.log(brush_angle_array);
  return brush_angle;
}

function getLayerRotation(i){
  

  // IF FLIP

    // console.log("getLayerRotation layers_flip_count",i,"-",$fx.getRawParam("layers_flip_count"));
    var flips = layers_rotation.splice(0,1);
    // console.log("getLayerRotation",flips);
    return flips;


    // if(i<$fx.getRawParam("layers_flip_count")){
    //   var flips = layers_rotation.splice(0,1);
    //   console.log("getLayerRotation",flips);
    //   return flips;
    // }else{
    //   return [[false,false]];
    // }
    
  
}


function getLayerCount(value){
  var v = Math.trunc(value*100)/100;
  console.log("fxrand",v);

  // return 3;

  if (value < 0.20) return 2;
  else if (value < 0.95) return 3;
  else if (value < 1.0) return 4;
  // else if (value <= 1.0) return 5;
  // // (in_min, in_max, out_min, out_max)
  
  // return Math.ceil(value.map(0,1,2,4));
}



function getEmptyTilesCount(value){
  return 1;
  return 1+Math.floor(value*10);
}

// getDotTilesCount(fxrand());
function getDotTilesCount(value){
  return 0;
  if(value<0.5){
    return 0;
  }else{
    return Math.floor(value*2);
  }
}


function getMainTilesCount(value,proba,mult){
  // console.log("getMainTilesCount(",value,proba,mult);
  // return 0;
  var output;
  if(value  < proba){
    output= Math.floor(value*mult);
    
  }else{
    output= 1;
  }

  if(output==0 | !output) output=1;
  return output;
}

function randomPenAngle(value){
  // return 135;
  var angle;
  if(value < 0.25){
    angle=45;
  }else if(value < 0.5){
    angle=90;
  }else if(value < 0.75){
    angle=135;
  }else{
    angle=0;
  }

  return (angle);
}

function V_flip(value){
  // return false;
  if(value  < 0.3){
    return false;
    
  }else{
    return true;
  }
  return true;
}
function H_flip(value){
  // return true;
  if(value  < 0.5){
    return false;
  }else{
    return true;
  }
  return true;
}


function flipOrNot(value,proba){
  // return false;
  if(value  < proba){
    return false;
    
  }else{
    return true;
  }
  return true;
}


////
function getRotation(value) {
  return 0;
  if (value < 0.25) return radians(0);
  else if (value < 0.50) return radians(90);
  else if (value < 0.75) return radians(180);
  else if (value < 1.0) return radians(270);
}
// function getTile(value) {
//   if (value < 0.333) return "C";
//   else if (value <= 0.6666) return "CxC";
//   else if (value <= 1.0) return "L";
// }
function getCenterSeedTileID(value) {
  return 3;
  if (value < 0.33) return 2;
  else if (value <= 0.66) return 3;
  else if (value <= 1.0) return 4;
}





function getTileID(value) {
  // return tile_CxL;
  // if (value < 0.25) return tile_C;
  if (value < 0.25) return 1;
  else if (value <= 0.5) return 1;
  else if (value <= 0.75) return 2;
  // else if (value <= 0.6) return tile_1CE;
  // else if (value <= 0.8) return tile_2CE;
  // else if (value <= 0.8) return tile_CxC;
  else if (value <= 1.0) return 3;
  console.log();
}

function getResolution(value) {
  // var resolution;
  return 3;
  // return Math.ceil(map(0.1, 0, 1, 0, 4));
  if (value < 0.5) resolution = 0;
  else if (value <= 0.7) resolution = 1;
  else if (value <= 0.9) resolution = 2;
  else if (value <= 1.0) resolution = 3;

  resolution = 1;
  window.$fxhashFeatures.resolution = canvas_size_storage[resolution][0];
  return resolution;
}

function getRandomCell() {
  // lines
  var lines = cells_grid[0].length;
  var rnd_line = Math.floor(map_range(fxrand(), 0, 1, 0, lines))
  // row 
  var rows = cells_grid.length;
  var rnd_row = Math.floor(map_range(fxrand(), 0, 1, 0, rows))
  // debug
  // console.log("lines count : ",lines  ,"rnd_line : ",rnd_line);
  // console.log("rows",rows,"rnd_rows : ",rnd_row);
  // console.log("randome cell = ", rnd_row,":",rnd_line );
  return cells_grid[rnd_row][rnd_line];
}

function getRandomTile(sol, rnd) {
  var tileID = 0;
  var solcount = sol.length;
  var tileID = (map_range(rnd, 0, 1, 0, solcount));
  var tileID_shriked = Math.floor(tileID);
  return sol[tileID_shriked];
}
// function getMostConnectedSolutionOLD(arr){
//   // ARR est une list d'ID solution 
//   console.log("####getRandomSolution",arr.length);
//   var sol_with_most_connector = undefined;
//   var sol_with_most_connector_count = 0;
//   // console.log("solution", arr);
//   // Iterate trough the solution 
//   for (var i = arr.length - 1; i >= 0; i--) {
//     // check how mani connector have each solution 
//     var data = tiles_database[arr[i]].connector;
//     const sum = data.reduce((accumulator, value) => {
//       return accumulator + value;
//     }, 0);

//     console.log("sum:",sum)

//     if(sum >= sol_with_most_connector_count){
//       sol_with_most_connector_count = sum;
//       sol_with_most_connector = arr[i];
//       // console.log("sol_with_most_connector_count",sol_with_most_connector_count);
//       // console.log("sol_with_most_connector",sol_with_most_connector);
//     }

//   }
//   return sol_with_most_connector;
// }

function getMostConnectedSolution(arr) {
  // ARR est une list d'ID solution 
  // console.log("####getRandomSolution",arr.length);
  var sol_with_most_connector = undefined;
  var sol_with_most_connector_count = 0;
  // console.log("solution", arr);
  // Iterate trough the solution 
  for (var i = arr.length - 1; i >= 0; i--) {
    // check how mani connector have each solution 
    var data = tiles_database[arr[i]].connector;
    const sum = data.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    // console.log("sum:",sum);

    if (sum >= sol_with_most_connector_count) {
      sol_with_most_connector_count = sum;
      sol_with_most_connector = arr[i];
      // console.log("sol_with_most_connector_count",sol_with_most_connector_count);
      // console.log("sol_with_most_connector",sol_with_most_connector);
    }

  }
  return sol_with_most_connector;
}


function getRandomSolutionByConnectorCount(arr, count) {

  // console.log("tiles_database",tiles_database);
  // ARR est une list d'ID solution 
  // console.log("####getRandomSolutionByConnectorCount",arr.length, "count",count);
  // console.log("arr:",arr);
  var reduced_sol = [];
  // Iterate trough the solution 
  for (var i = arr.length - 1; i >= 0; i--) {
    // console.log("tiles_database[arr["+i+"]].connector",tiles_database[arr[i]].connector);
    // console.log("tiles_database[arr["+i+"]].connector");
    // check how mani connector have each solution 
    var data = tiles_database[arr[i]].connector;
    var connector_count = data.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    // console.log("connector_count:",connector_count);
    if (connector_count == count) {
      reduced_sol.push(arr[i]);
    }


  }

  if (reduced_sol.length > 0) {
    // console.log("FOUND reduced_sol:",reduced_sol);
    return getRandomTile(reduced_sol, fxrand());
  } else {
    // console.log("NON reduced_sol:",reduced_sol);
    return getRandomTile(arr, fxrand());
  }

}








