// these are the variables you can use as inputs to your algorithms
console.log(fxhash)   // the 64 chars hex number fed to your algorithm
console.log(fxrand()) // deterministic PRNG function, use it instead of Math.random()


console.log("$fx.rand()",$fx.rand());
'use strict';

// TODO
// [ ] regarder ces brush https://codepen.io/lbebber/pen/GJrxdR


// ┌──────────────────────────────────────────────────────────────┐
// │ _           _       _        _  _  _  _       _  _  _  _     │
// │(_)         (_)    _(_)_     (_)(_)(_)(_) _  _(_)(_)(_)(_)_   │
// │(_)         (_)  _(_) (_)_   (_)         (_)(_)          (_)  │
// │(_)_       _(_)_(_)     (_)_ (_) _  _  _ (_)(_)_  _  _  _     │
// │  (_)     (_) (_) _  _  _ (_)(_)(_)(_)(_)     (_)(_)(_)(_)_   │
// │   (_)   (_)  (_)(_)(_)(_)(_)(_)   (_) _     _           (_)  │
// │    (_)_(_)   (_)         (_)(_)      (_) _ (_)_  _  _  _(_)  │
// │      (_)     (_)         (_)(_)         (_)  (_)(_)(_)(_)    │
// └──────────────────────────────────────────────────────────────┘


$fx.params([
	{
		id: "color_theme",
		name: "color theme",
		type: "number",
		//default: Math.PI,
	  //   update: "sync",
		options: {
		  min: 1,
		  max: 7,
		  step: 1,
		},
	  },


	{
	  id: "horizontal_tiles",
	  name: "horizontal tiles count",
	  type: "number",
	  //default: Math.PI,
	//   update: "sync",
	  options: {
		min: 4,
		max: 4,
		step: 1,
	  },
	},

	{
	id: "vertical_tiles",
	name: "vertical_tiles",
	type: "number",
	//default: Math.PI,
	// update: "sync",
	options: {
		min: 10,
		max: 10,
		step: 1,
		},
	},

	{
	id: "lines_per_tiles",
	name: "number of lines",
	type: "number",
	//default: Math.PI,
	// update: "sync",
	options: {
		min: 13,
		max: 16,
		step: 1,
		},
	},

	{
	id: "layer_count",
	name: "number of layers",
	type: "number",
	//default: Math.PI,
	// update: "sync",
	options: {
		min: 2,
		max: 4,
		step: 1,
		},
	},

  ]);





var tileArrayCount = 0;
// var layer_count =  getLayerCount(fxrand());
var layer_count =  $fx.getRawParam("layer_count"); 
var params = [];

const hasMaxSize 	= true; // if true, then the canvas cannot be larger than the reference size
const isCentered 	= true; // if true the canvas will be vertically and horizontally centered
const cm_ratio 		= 2.834645791245791;
const paper_ratio 	= 1.414141414141414;

var h_cells_size;
var v_cells_size;
var v_cells_diag;

// NAME 
var filename;
var fileformat;
var piecename;

// PARALLEL_PEN
const pen_size = [
	['1.5mm', 1.5 * cm_ratio, 0.2 * cm_ratio],
	['2mm', 2 * cm_ratio, 0.2 * cm_ratio],
	['2.4mm', 2.4 * cm_ratio, 0.2 * cm_ratio],
	['3.8mm', 3.8 * cm_ratio, 0.2 * cm_ratio],
	['4mm', 4 * cm_ratio, 0.2 * cm_ratio],
	['6.0mm', 6.0 * cm_ratio, 0.2 * cm_ratio],
];


const render_style_vector = "STYLE_VECTOR";
const render_style_parallel = "STYLE_PARALLEL";
const render_style_marker = "STYLE_MARKER";

const theme_style_black = "THEME_STYLE_BLACK";
const theme_style_random = "THEME_STYLE_RND";
const theme_style_3colors = "THEME_STYLE_3COLORS";``

var debug_mode_activated = false; 		  ///////
var debug_mode_pattern_activated = false; ///////

var default_size_id = 3;    			/////// 1
var default_pen_id = 3; 				/////// 4

var blank_rnd_cell_needed = 0;  	/////// 0
var connector_count_favor = 4;  	/////// 4
// 5x13 | i
let horizontal_tiles = $fx.getRawParam("horizontal_tiles");  		/////// 4  
let vertical_tiles = $fx.getRawParam("vertical_tiles");			 	/////// 10
let lines_per_tiles = $fx.getRawParam("lines_per_tiles");;   		/////// 14
let color_theme = $fx.getRawParam("color_theme");		 			/////// 14
let color_theme_name;

var renderStyle = render_style_parallel; // render_style_parallel //render_style_vector;
var debugStyle = theme_style_random; //  theme_style_black

var background_color = 255;


// SEEDS 

var activate_center_stage = true; 		///////
var activate_forced_border = false; 	///////
var activate_random_colors = true; 		///////


var canvas_layers_for_export;
var layers_array = [];


var canvas_Width;
var canvas_Height;
var canvas_database = [];
var tiles_database = [];
var canv;

const canvas_size_storage = [
	['A0', 841, 1189],
	['A1', 594, 841],
	['A2', 420, 594],
	['A3', 297, 420],
	['A4', 210, 297],
	['A5', 148, 210],
	['A6', 105, 148],
	['C6', 114, 162],
];
var colors_array = [];
var colors_theme = [];
var brush_agnle_array = [];
var color_palette;

var stroke_color = "#000000";




resolution_data = canvas_size_storage[default_size_id];

let tile_Empty, tile_C, tile_CxC, tile_L, tile_1CE, tile_2CE, tile_CxL;


brush_w = pen_size[default_pen_id][1];
brush_h = pen_size[default_pen_id][2];
var stroke_size = brush_w;




window.$fxhashFeatures = {
}

let cells_size;
let vertical_position_offset;


var empty_tile;
// var vector_canvas;
var vector_canvas_full;
var pixel_canvas;
var pixel_canvas_temp1;
var pixel_canvas_temp2;
var pixel_canvas_temp3;

var tile_debug_view;
var save_file = false;
var html_Canvas_Size;
var windowScale;
var scaled_width;
var scaled_height;

const cell_count_ratio = [
	[2, 5],
	[3, 7],
	[4, 11],
	[5, 13],
	[6, 7],
	[7, 7],
	[8, 7],
];

let total_tiles_count;
let current_tiles_count = 0;

let lines_space;
let lines_radius;
var canvas_Wi
var canvas_Height;

// console.log("vertical_tiles:",vertical_tiles);
// console.log("horizontal_tiles:",horizontal_tiles);
// console.log("total_tiles_count:",total_tiles_count);



var gr1;
var gr2;
var gr3;
var canv;
var samples = 1000;
var myalpha = 10;

var myradius = 100;
var bg;
var color_yellow;
var color_black;
var color_cyan;
var color_magenta;
var color_red;
var color_purple;
var color_pink;
























function calculate_tiles_count() {
	// vertical_tiles = Math.floor(horizontal_tiles*2.6);
	// if(horizontal_tiles==4) vertical_tiles = 11;
	// if(horizontal_tiles==4) vertical_tiles = 11;
	total_tiles_count = horizontal_tiles * vertical_tiles;

}

function generateTheTest() {



	// CYAN
	gr1.noStroke();
	// gr1.fill(55, 100, 100,myalpha);
	gr1.fill(color_cyan);
	drawArc(gr1, 200, 200, myradius, 0, TWO_PI, samples, 0);
	drawLine(gr1, 600, 100, 650, 300, 0);

	// YELLOW
	gr2.noStroke();
	// gr2.fill(15, 100, 100,myalpha);
	gr2.fill(color_yellow);
	drawArc(gr2, 200, 200, myradius, 0, TWO_PI, samples, 45);
	drawLine(gr2, 600, 100, 650, 300, 45);


	// MAGENTA
	gr3.noStroke();
	// gr3.fill(90, 100, 100,myalpha);
	gr3.fill(color_magenta);
	drawArc(gr3, 200, 200, myradius, 0, TWO_PI, samples, 135);
	drawLine(gr3, 600, 100, 650, 300, 135);


	canv.image(gr1, 0, -50, 1200, 600);
	canv.image(gr2, 0, -50, 1200, 600);


	canv.image(gr3, 250, -50, 1200, 600);
	canv.image(gr2, 250, -50, 1200, 600);

	canv.image(gr1, 0, 200, 1200, 600);
	canv.image(gr3, 0, 200, 1200, 600);

	canv.image(gr1, 250, 200, 1200, 600);
	canv.image(gr2, 250, 200, 1200, 600);
	canv.image(gr3, 250, 200, 1200, 600);

}
// let stroke_color = color(204, 102, 0);


var cells_grid = [];


function setThemeColors() {
	// console.log("setThemeColors");
	if (debugStyle == theme_style_random) set_lines_colors_random();
	if (debugStyle == theme_style_3colors) set_lines_colors();
	if (debugStyle == theme_style_black) set_lines_colors_black();

}

function get_lines_color(i) {
	// console.log("get_lines_color->" + i);
	if (i >= color_palette.length) {
		while (i > 2) {
			i = i - color_palette.length;
			// console.log("reduxcezd->" + i);
		}
	}
	var col = color_palette[i];
	// console.log("col->" + col);
	return col;
}

function set_lines_colors() {
	color_array = [];
	var lineid = 0;

	var lines = lines_per_tiles - 1;
	var middle = lines / 2;
	for (var i = 0; i < lines_per_tiles; i++) {
		if (i != 0) {
			if (i < middle) {
				lineid++;
			} else if (i != middle) {
				lineid--;
			}
		}
		if (lineid < 0) {
			lineid = 0;
		}
		// console.log("i", i, "lineid", lineid);

		if (i < middle) {
			color_array.push(get_lines_color(i));
		} else {
			var color = color_array[lineid];
			color_array.push(color);
		}

	}
	// console.log(color_array);
}

function set_lines_colors_black() {
	// console.log("set_lines_colors_black");
	color_array = [];
	var lineid = 0;
	for (var i = 0; i < lines_per_tiles; i++) {
		color_array.push(color_black);
	}
}

function set_lines_colors_random() {
	// console.log("set_lines_colors_random");
	color_array = [];
	var lineid = 0;

	var lines = lines_per_tiles - 1;
	var middle = lines / 2;
	for (var i = 0; i < lines_per_tiles; i++) {
		// console.log("color : ",i);



		// console.log("i",i,"middle",middle);
		if (i != 0) {
			if (i < middle) {
				lineid++;
			} else if (i != middle) {
				lineid--;
			}
		}

		if (lineid < 0) {
			lineid = 0;
		}
		// console.log("i", i, "lineid", lineid);

		if (i < middle) {
			color_array.push('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
		} else {
			var color = color_array[lineid];
			color_array.push(color);
		}

	}
	// console.log(color_array);
}

function getColorLine(i, debug_color) {
	if (debug_mode_activated) {
		return debug_color;
	}
	return color_array[i];
}

function set_piece_name() {
	// console.log("set_piece_name");
	// console.log("default_pen_id",default_pen_id);
	// console.log(pen_size);
	// piecename = `BS ${(new Date().toJSON().slice(0,19))}`;
	piecename = new Date().toJSON().slice(0, 10) + "_BS-" + (new Date().getTime()).toString(36).toUpperCase() + "-" + horizontal_tiles + "x" + vertical_tiles + "-" + resolution_data[0] + "-" + (lines_per_tiles - 1) + "l-" + pen_size[default_pen_id][0];
	filename = piecename;
	// console.log(piecename);
}




function addTilesToArray(name, connector, rotCount) {
	// console.log("addTilesToArray",name,connector);
	tiles_database.push(new Tile(name, tileArrayCount, connector, rotCount));
	tileArrayCount++;
}


function setup_canvas_size() {
	// resolution_data = canvas_size_storage[2];
	// var resolution_data = canvas_size_storage[getResolution(fxrand())];
	canvas_Width = resolution_data[1] * cm_ratio;
	canvas_Height = resolution_data[2] * cm_ratio;
	calculate_tiles_count();
	setDimensions();
	resizeCanvas(scaled_width, scaled_height, false);

	if (isCentered) { centerCanvas(); }

}



function set_colors_array(){
	// https://www.royaltalens.com/en/products/ecoline/bottles/?productCode=1125P
	
	var available_colors = [
		["Lemon-Yellow-205" , color('#ffff07')], 	// 0
		["Chartreuse-233" , color('#e6b319')],   	// 1
		["Light-Orange-236" , color('#f2670d')], 	// 2
		["Pastel-Blue-580" , color('#8cffff')],  	// 3
		["Sky-Blue-578" , color('#33bfda')],     	// 4
		["Pastel-Roser-390" , color('#f281e6')], 	// 5 
		["Magenta-337" , color('#ff00ff')],		 	// 6	
		["Turquoise-Green-661" , color('#44a6a6')], // 7
		["Pastel-Green-666" , color('#a6f273')], 	// 8
		["Carmine-318" , color('#9c1e32')],			// 9
		["Red" , color('#E51714')],			// 10
		["Violet" , color('#7A128B')],			// 11
	];

	var theme_colors_list = [];
		
	if(color_theme == 1){
		color_theme_name = "Random";
		// color_theme_name = "Crimson Majesty";
		theme_colors_list = [0,1,2,3,4,5,6,7,8,9];
	}else if(color_theme == 2){
		color_theme_name = "CMJ";
		theme_colors_list = [2,4,6,2,4,6];
	}else if(color_theme == 3){
		color_theme_name = "PASTEL GREENISH";
		// theme_colors_list = [7,7,7,7,7,7];
		theme_colors_list = [8,5,6,8,5,6];
		
	}else if(color_theme == 4){
		color_theme_name = "FADED RGB";
		theme_colors_list = [5,1,7,5,1,7];

	}else if(color_theme == 5){
		color_theme_name = "THE NEW ORANGE";
		theme_colors_list = [2,3,4,2,3,4];

	}else if(color_theme == 6){
		color_theme_name = "COMPACT DISK";
		theme_colors_list = [3,5,8,3,5,8];

	}else if(color_theme == 7){
		color_theme_name = "GREEN ORCHID";
		theme_colors_list = [8,11,8,11,8,11];

	}

	// theme_colors_list = [2,1,1,1,2,2];

	for (let i = 0; i < theme_colors_list.length; i++) {
		const color = available_colors[theme_colors_list[i]];
		colors_array.push(color);
		console.log("theme_colors_list",color);
		
	}



	brush_agnle_array=[
		0,45,90,135
	];
}

function set_colors_theme(){


}



// ┌───────────────────────────────────────────────────────────────────────────────────┐
// │   _  _  _  _    _  _  _  _  _  _  _  _  _  _  _            _  _  _  _  _          │
// │ _(_)(_)(_)(_)_ (_)(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)          (_)(_)(_)(_)(_)_        │
// │(_)          (_)(_)                  (_)      (_)          (_)(_)        (_)       │
// │(_)_  _   _  _   (_) _  _             (_)      (_)          (_)(_) _  _  _(_)       │
// │  (_)(_)(_)(_)_ (_)(_)(_)            (_)      (_)          (_)(_)(_)(_)(_)         │
// │ _           (_)(_)                  (_)      (_)          (_)(_)                  │
// │(_)_  _  _  _(_)(_) _  _  _  _       (_)      (_)_  _  _  _(_)(_)                  │
// │  (_)(_)(_)(_)  (_)(_)(_)(_)(_)      (_)        (_)(_)(_)(_)  (_)                  │
// └───────────────────────────────────────────────────────────────────────────────────┘



function setup() {

	lines_per_tiles++;
	color_cyan = color('hsba(200, 100%, 100%, 1)');
	color_magenta = color('#e812e0');
	color_yellow = color('hsba(50, 100%, 100%, 1)');
	color_black = color('hsba(250, 100%, 100%, 0.5)');
	color_red = color('#e12b2b');
	color_purple = color("#ac01ff");
	color_pink = color('#f708c2');
	params=[];
	params.push("fxhash:"+fxhash);
	set_colors_array();
	color_palette = [color_cyan, color_magenta, color_yellow];
	// set_lines_colors();
	setThemeColors();
	setup_canvas_size();
	createCanvas(canvas_Width, canvas_Height, SVG);
	resizeCanvas(scaled_width, scaled_height, false);
	populate_tiles_array();
	create_layers();

	// // this is how features can be defined
	$fx.features({
		"Color theme": color_theme_name,
	
	})
}


function populate_tiles_array(){
	// TILES DATABASE
	tiles_database = [];

	// addTilesToArray("tile_Empty",[0,0,0,0],0);
	empty_tile = new Tile("tile_Empty", 9999, [0, 0, 0, 0], 0);


	var emptyCount = getEmptyTilesCount(fxrand());
	fxfeature("emptyCount",emptyCount);
	for (let i = 0; i < emptyCount; i++) {
		addTilesToArray("tile_Empty", [0, 0, 0, 0], 0);
	}
	
	var dotCount = getDotTilesCount(fxrand());
	fxfeature("dotCount",dotCount);
	for (let i = 0; i < dotCount; i++) {
		addTilesToArray("tile_Dot", [0, 0, 0, 0], 0);
	}

	var tileCount;
	
	tileCount = getMainTilesCount(fxrand(),0.5,20);
	fxfeature("tile_Cx2C",tileCount);
	for (let i = 0; i < tileCount; i++) {
		addTilesToArray("tile_Cx2C", [1, 1, 1, 1], 0);
		addTilesToArray("tile_Cx2C", [1, 1, 1, 1], 1);
		addTilesToArray("tile_Cx2C", [1, 1, 1, 1], 2);
		addTilesToArray("tile_Cx2C", [1, 1, 1, 1], 3);
	}

	tileCount = getMainTilesCount(fxrand(),0.5,20);
	fxfeature("tile_CxC",tileCount);
	for (let i = 0; i < tileCount; i++) {
		addTilesToArray("tile_CxC", [1, 1, 1, 1], 0);
		addTilesToArray("tile_CxC", [1, 1, 1, 1], 1);
		addTilesToArray("tile_CxC", [1, 1, 1, 1], 2);
		addTilesToArray("tile_CxC", [1, 1, 1, 1], 3);
	}

	tileCount = getMainTilesCount(fxrand(),0.5,10);
	fxfeature("tile_LxL",tileCount);
	for (let i = 0; i < tileCount; i++) {
		addTilesToArray("tile_LxL",[1,1,1,1],0);
		addTilesToArray("tile_LxL",[1,1,1,1],1);
		addTilesToArray("tile_LxL",[1,1,1,1],2);
		addTilesToArray("tile_LxL",[1,1,1,1],3);
	}





	// 3X4
	tileCount = getMainTilesCount(fxrand(),0.5,10);
	fxfeature("tile_Cx1C",tileCount);
	for (let i = 0; i < tileCount; i++) {
		addTilesToArray("tile_Cx1C",[1,0,1,1],0);
		addTilesToArray("tile_Cx1C",[1,0,1,1],1);
		addTilesToArray("tile_Cx1C",[1,0,1,1],2);
		addTilesToArray("tile_Cx1C",[1,0,1,1],3);
	}

	tileCount = getMainTilesCount(fxrand(),0.5,10);
	fxfeature("tile_CxL",tileCount);
	for (let i = 0; i < tileCount; i++) {
		addTilesToArray("tile_CxL", [1, 1, 0, 1], 0);
		addTilesToArray("tile_CxL", [1, 1, 0, 1], 1);
		addTilesToArray("tile_CxL", [1, 1, 0, 1], 2);
		addTilesToArray("tile_CxL", [1, 1, 0, 1], 3);
	}





	// 2X4
	tileCount = getMainTilesCount(fxrand(),0.5,10);
	fxfeature("tile_2CE",tileCount);
	for (let i = 0; i < tileCount; i++) {
		addTilesToArray("tile_2CE",[0,1,0,1],0);
		addTilesToArray("tile_2CE",[0,1,0,1],1);
		addTilesToArray("tile_2CE",[0,1,0,1],2);
		addTilesToArray("tile_2CE",[0,1,0,1],3);
	}


	tileCount = getMainTilesCount(fxrand(),0.5,10);
	fxfeature("tile_L",tileCount);
	for (let i = 0; i < tileCount; i++) {
		addTilesToArray("tile_L", [0, 1, 0, 1], 1);
		addTilesToArray("tile_L", [0, 1, 0, 1], 0);
	}


	tileCount = getMainTilesCount(fxrand(),0.5,10);
	fxfeature("tile_C",tileCount);
	for (let i = 0; i < tileCount; i++) {
		addTilesToArray("tile_C", [1, 0, 0, 1], 0);
		addTilesToArray("tile_C", [1, 0, 0, 1], 1);
		addTilesToArray("tile_C", [1, 0, 0, 1], 2);
		addTilesToArray("tile_C", [1, 0, 0, 1], 3);
	}



	// 1X4
	tileCount = getMainTilesCount(fxrand(),0.5,10);
	fxfeature("tile_1CE",tileCount);
	for (let i = 0; i < tileCount; i++) {
		addTilesToArray("tile_1CE", [0, 0, 0, 1], 0);
		addTilesToArray("tile_1CE", [0, 0, 0, 1], 1);
		addTilesToArray("tile_1CE", [0, 0, 0, 1], 2);
		addTilesToArray("tile_1CE", [0, 0, 0, 1], 3);
	}

}

// function update_rendering(){
// 	set_piece_name();
//   drawPattern();
// }

function update_rendering() {
	redraw();
}

function regenerate() {
	params=[];
	params.push("fxhash:"+fxhash);
	set_colors_array();
	setup_canvas_size();
	calculate_tiles_count();
	setDimensions();
	create_layers();
	redraw();

}


function draw_layer(layer){

	console.log("draw_layer"+layer.id,"- color",layer.color_name);
	console.log("draw_layer"+layer.id,"- brush angle",layer.brush_angle);
	
	// fxfeature("layer"+layer.id+".color_name",layer.color_name);

	var drawings = drawPattern(layer.brush_angle, layer.color);



	var pix = drawings[0];
	var vect = drawings[1];
	var drawn_canvas_height = ((vertical_tiles-1)*cells_diag/2)+cells_diag;
	var vertical_white_space_size = pixel_canvas.height-drawn_canvas_height;
	// console.log("vertical_white_space_size",vertical_white_space_size);
	var flip_or_not = flipOrNot(fxrand(),0.5);
	// console.log(layer);
	var vector_canvas = createGraphics(canvas_Width, canvas_Height,SVG);
	vector_canvas.push();
	pixel_canvas.push();



	if(layer.vertical_flip){
		// console.log("flip_brush_value",layer.id);
		//vertical_white_space_size/2
		pixel_canvas.translate(canvas_Width, 0);
		pixel_canvas.scale(-1, 1);

		vector_canvas.translate(canvas_Width, 0);
		vector_canvas.scale(-1, 1);

		// layer.brush_angle = flip_brush(layer.brush_angle);
		console.log("draw_layer"+layer.id,"- FLIP V");
	}

	if(layer.horizontal_flip){
	// if(layer.id == 1){
		// console.log("flip_brush_value",layer.id);
		pixel_canvas.translate(0,canvas_Height-vertical_white_space_size );
		pixel_canvas.scale(1, -1);

		vector_canvas.translate(0,canvas_Height-vertical_white_space_size );
		vector_canvas.scale(1, -1);

		// layer.brush_angle = flip_brush(layer.brush_angle);
		console.log("draw_layer"+layer.id,"- FLIP H");
	}

	// console.log("draw_layer"+layer.id,"before adapt"+layer.brush_angle);
	// layer.brush_angle = adapt_brush_value_to_plotter(layer.brush_angle );
	// console.log("draw_layer"+layer.id,"after adapt"+layer.brush_angle);
	pixel_canvas.image(pix, 0, 0, canvas_Width, canvas_Height);
	pixel_canvas.pop();
	vector_canvas.image(vect, 0, 0, canvas_Width, canvas_Height);
	vector_canvas.pop();


	vector_canvas_full.image(vector_canvas,0,0,canvas_Width,canvas_Height);
	canvas_layers_for_export.push(vector_canvas);

	// VECTOR
	
	// if(flip_or_not) vector_canvas.translate(canvas_Width,vertical_white_space_size/2 );
	// if(flip_or_not) vector_canvas.scale(-1, 1);

}


function create_layers(block_iterate) {
	
	canvas_layers_for_export=[];
	pixel_canvas = createGraphics(canvas_Width, canvas_Height, P2D);
	vector_canvas_full = createGraphics(canvas_Width, canvas_Height, SVG);
	
	pixel_canvas.blendMode(MULTIPLY);
	iterate();

	// var base_brush_angle = randomPenAngle(fxrand());
	
	console.log("create_layers",layer_count);
	fxfeature("layer_count",layer_count);

	for (let i = 0; i < layer_count; i++) {
		// var brush_angle=randomPenAngle(fxrand());
		var brush_angle=getRandomLayerBrushAngle(fxrand());
		console.log("BEFORE LAYER brush_angle",brush_angle);
		var l = new Layer(
				i,
				getRandomLayerColor(fxrand()),
				brush_angle,
				H_flip(fxrand()),
				V_flip(fxrand()),
				);
		draw_layer(l,i);
		// brush_angle+=45;
		layers_array.push(l);
		fxfeature("layer"+l.id+".color",l.color_name);
		fxfeature("layer"+l.id+".brush_angle",l.brush_angle);
		fxfeature("layer"+l.id+".horizontal_flip",l.horizontal_flip);
		fxfeature("layer"+l.id+".vertical_flip",l.vertical_flip);
	}

	

	


}

function iterate() {
	set_piece_name();
	generate_cells_grid();
	addSeedTiles();
	calculateEntropy();
	
}

function calculateEntropy() {
	for (var x = 0; x < horizontal_tiles; x++) {
		for (var y = 0; y <= vertical_tiles; y++) {
			// console.log("tile x:",x," y:",y);
			var c = cells_grid[x][y];

			// console.log("calculateEntropy",x,y);
			c.calculateEntropy(tiles_database);
			// draw();
			// debugger;
			// if(x==1 && y== 2){
			// 	debugger;
			// }


			// console.log("c:",c);
		}
	}
	// console.log("calculateEntropy() cells_grid");
	// console.log(cells_grid);
}



// ┌──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
// │    _  _  _     _  _  _  _  _  _           _  _  _  _  _  _  _  _  _  _           _   _  _  _  _  _  _  _  _  _  _    │
// │ _ (_)(_)(_) _ (_)(_)(_)(_)(_)(_) _       (_)(_)(_)(_)(_)(_)(_)(_)(_)(_) _      _(_)_(_)(_)(_)(_)(_)(_)(_)(_)(_)(_)   │
// │(_)         (_)(_)            (_)(_)_     (_)(_)            (_)         (_)   _(_) (_)_    (_)      (_)               │
// │(_)    _  _  _ (_) _  _       (_)  (_)_   (_)(_) _  _       (_) _  _  _ (_) _(_)     (_)_  (_)      (_) _  _          │
// │(_)   (_)(_)(_)(_)(_)(_)      (_)    (_)_ (_)(_)(_)(_)      (_)(_)(_)(_)   (_) _  _  _ (_) (_)      (_)(_)(_)         │
// │(_)         (_)(_)            (_)      (_)(_)(_)            (_)   (_) _    (_)(_)(_)(_)(_) (_)      (_)               │
// │(_) _  _  _ (_)(_) _  _  _  _ (_)         (_)(_) _  _  _  _ (_)      (_) _ (_)         (_) (_)      (_) _  _  _  _    │
// │   (_)(_)(_)(_)(_)(_)(_)(_)(_)(_)         (_)(_)(_)(_)(_)(_)(_)         (_)(_)         (_) (_)      (_)(_)(_)(_)(_)   │
// └──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘


function getCell(x, y) {
	return cells_grid[x][y];
}
function addTileToCell(x, y, tile__ID) {
	var cell = getCell(x, y);
	cell.tile = tiles_database[tile__ID];
	cell.collapsed = true;
}


function generate_cells_grid() {
	// console.log("generate_cells_grid");
	// console.log("horizontal_tiles:", horizontal_tiles);
	// console.log("vertical_tiles:", vertical_tiles);
	// console.log(tiles_database);
	// CELLS GRID 
	for (var x = 0; x < horizontal_tiles; x++) {
		cells_grid[x] = [];
		for (var y = 0; y <= vertical_tiles; y++) {
			// console.log("tile x:",x," y:",y);
			cells_grid[x].push(new Cell(x, y));
			if (y % 2 != 0 && x >= horizontal_tiles - 1 || y == 0) { // 
				cells_grid[x][y].empty = true;
				cells_grid[x][y].collapsed = true;
				cells_grid[x][y].tile = empty_tile;
			}
		}
	}
	// console.table("cells_grid");
	// console.table(cells_grid);
}




function addSeedTiles() {




	if (activate_center_stage) {
		// if(activate_center_stage && horizontal_tiles>2){
		var mh = horizontal_tiles / 2;
		var mv = vertical_tiles / 2;
		var o, n, e, s;
		// console.log("adding center stage tiles ");
		if (horizontal_tiles % 2 == 0) {
			// console.log("EVEN");
			o = [-1 + mh, mv + 1];
			n = [-1 + mh, mv];
			e = [mh, mv];
			s = [-1 + mh, mv + 1];

		} else {
			mh = mh - 0.5;
			mv = mv - 0.5;
			// console.log("ODD");
			o = [-1 + mh, 1 + mv];
			n = [mh, mv];
			e = [mh, 1 + mv];
			s = [mh, 2 + mv];
		}

	

	}


}

function generateTilesDebug() {

	tile_debug_view = createGraphics(canvas_Width, 200, SVG);

	tile_debug_view.translate(25, 70);
	tile_debug_view.background("#ffffff");
	tile_debug_view.scale(0.35);
	var tile_perLines = 17;

	// console.log("FUUCJKKKKKK",tiles_database.length);
	for (var i = 0; i < tiles_database.length; i++) {

		var posX = 100 + (25 + cells_size) * i;
		var posY = 0;
		if (i >= tile_perLines) {
			posX = 100 + (25 + cells_size) * (i - tile_perLines);
			posY = 150 + cells_size;

		}


		tile_debug_view.push();
		tile_debug_view.translate(posX, posY);

		// tile_debug_view.rotate(radians(45));
		tile_debug_view.noFill();
		tile_debug_view.stroke(0);
		tile_debug_view.strokeWeight(1);
		tile_debug_view.rect(-150, -150, cells_size, cells_size);
		tile_debug_view.imageMode(CENTER);
		tile_debug_view.fill(0);
		tile_debug_view.textSize(160);
		tile_debug_view.textAlign(CENTER);
		tile_debug_view.text(i, 0, -vertical_position_offset);
		// tile_debug_view.rotate(radians(tiles_database[i].rotation));

		tile_debug_view.image(tiles_database[i].tile, 0, 0, cells_size, cells_size);
		tile_debug_view.pop();
	}

}



function initCanvas(brush_color) {
	var vector_canvas_int = createGraphics(canvas_Width, canvas_Height , SVG);
	vector_canvas_int.stroke(brush_color);
	var local_canvas = createGraphics(canvas_Width, canvas_Height , P2D);
	local_canvas.noFill();
	local_canvas.strokeWeight(5);
	var randomColor = int(random(color_array.length));
	// console.log("initCanvas");

	local_canvas.stroke(brush_color);
	// local_canvas.rect(0,0,canvas_Width, canvas_Height);
	local_canvas.blendMode(MULTIPLY);

	return [local_canvas,vector_canvas_int];

}

function drawPattern(brush_angle, brush_color) {
	// FIX pour que l'angle de dessins soit ISO avec l'angle des stylos par rapport à la machine
	// if(brush_angle ==0 ) brush_angle = 45;
	// if(brush_angle ==45 ) brush_angle = 0;
	// if(brush_angle ==90 ) brush_angle = 135;
	// if(brush_angle ==135 ) brush_angle = 90;
	
	// brush_angle += 45;
	// JE CLEAR PAS POUR DEBUG
	var the_2_canvas = initCanvas(brush_color);
	var local_canvas = the_2_canvas[0];
	var local_vector_canvas = the_2_canvas[1];
	// local_vector_canvas.background(250);
	// local_vector_canvas.clear();
	// GRID

	// ART
	var cell_count = 0;
	for (var x = 0; x < horizontal_tiles; x++) {
		for (var y = 1; y <= Math.ceil(vertical_tiles); y++) {
			var cell = cells_grid[x][y];
			
			// THE ACTUAL TILE
			if (cell.tile != undefined) {
				cell_count++;
				local_vector_canvas.push();
				local_canvas.push();
				if (y % 2 == 0) {
					local_vector_canvas.translate(x * cells_diag + cells_diag / 2, cells_diag / 2 + (y - 1) * cells_diag / 2);
					local_canvas.translate(x * cells_diag + cells_diag / 2, cells_diag / 2 + (y - 1) * cells_diag / 2);
				} else if (x < horizontal_tiles - 1) {
					local_vector_canvas.translate(x * cells_diag + cells_diag, cells_diag / 2 + (y - 1) * cells_diag / 2);
					local_canvas.translate(x * cells_diag + cells_diag, cells_diag / 2 + (y - 1) * cells_diag / 2);
				}
				

				local_vector_canvas.rotate(radians(45));
				local_canvas.rotate(radians(45));
				
				local_vector_canvas.imageMode(CENTER);
				local_canvas.imageMode(CENTER);

				local_vector_canvas.rotate(radians(cell.tile.rotation));
				local_canvas.rotate(radians(cell.tile.rotation));


	
				var tile;

				// if (renderStyle == render_style_parallel) tile_pix = eval(cell.tile.name);
				//tile_L_pix
				// debug add a rest around the drawings
				// local_canvas.rect(-cells_size/2,-cells_size/2,cells_size,cells_size);
				// console.log("cell.tile.name",eval(cell.tile.name + "_pix" ));
				// && renderStyle == render_style_parallel
				// console.log(cell.tile.name );
				// console.log(eval(cell.tile.name + "_pix" ));
				var func_name = "get_" + cell.tile.name + "_pix";
				if (eval(func_name)) {
					var fn = window[func_name];
					var fnparams = [cell.tile.rotation + brush_angle, brush_color];
					if (typeof fn === "function") {
						var new_tiles = fn.apply(null, fnparams);
						var new_tile = new_tiles[0];
						tile = new_tiles[1];
						local_canvas.image(new_tile, 0, 0, cells_size, cells_size);
						if (y % 2 == 0) {
							local_vector_canvas.image(tile, 0, 0, cells_size, cells_size);
						} else if (x < horizontal_tiles - 1) {
							local_vector_canvas.image(tile, 0, 0, cells_size, cells_size);
						}
					}


					// local_canvas.image(get_tile_L_pix(cell.tile.rotation+90,color_cyan), 0,0, cells_size, cells_size);
				}


				local_canvas.pop();
				local_vector_canvas.pop();
			}





			if (debug_mode_activated) {
				//DEBUG
				local_vector_canvas.push();
				if (y % 2 == 0) {
					local_vector_canvas.translate(x * cells_diag + cells_diag / 2, cells_diag / 2 + (y - 1) * cells_diag / 2);
				} else {
					local_vector_canvas.translate(x * cells_diag + cells_diag, cells_diag / 2 + (y - 1) * cells_diag / 2);
				}
				local_vector_canvas.rotate(radians(45));
				local_vector_canvas.imageMode(CENTER);
				var debug_tile = createGraphics(cells_size, cells_size, SVG);
				debug_tile.fill(0);
				debug_tile.textSize(40);
				debug_tile.textAlign(CENTER);
				debug_tile.push();
				debug_tile.rotate(radians(-45));
				// debug_tile.text('x:'+x+'-y:'+y+'-c:'+cell_count, 0, cells_size/1.35);
				debug_tile.text('x:' + x + '-y:' + y, 0, cells_size / 1.35);
				debug_tile.pop();
				// debug_tile.textSize(30);
				// debug_tile.text('north:'+cell.north, cells_size/2, 30);
				// debug_tile.text('south:'+cell.south, cells_size/2, cells_size-20);

				// debug_tile.push();
				// // debug_tile.rotate(radians(90));
				// // debug_tile.text('est:'+cell.est, cells_size/2,-20);
				// debug_tile.rotate(radians(-90));
				// debug_tile.text('west:'+cell.west, -cells_size/2, 30);
				// debug_tile.text('est:'+cell.est, -cells_size/2, cells_size-20);
				// debug_tile.pop();
				debug_tile.noFill();
				debug_tile.stroke(0);
				debug_tile.strokeWeight(1);
				debug_tile.rect(0, 0, cells_size, cells_size);



				local_vector_canvas.image(debug_tile, 0, 0, cells_size, cells_size);
				local_vector_canvas.pop();


			}

			if (debug_mode_pattern_activated) local_vector_canvas.image(tile_debug_view, 0, 0, canvas_Width, canvas_Height);



		}




	}

	// Render the layers 
	// local_canvas.image(pixel_canvas_temp2, 0,0, canvas_Width, canvas_Height+vertical_position_offset);	

	return [local_canvas,local_vector_canvas];
}


// ┌────────────────────────────────────────────────────────────────┐
// │ _  _  _  _     _  _  _  _           _        _             _   │
// │(_)(_)(_)(_)   (_)(_)(_)(_) _      _(_)_     (_)           (_)  │
// │ (_)      (_)_ (_)         (_)   _(_) (_)_   (_)           (_)  │
// │ (_)        (_)(_) _  _  _ (_) _(_)     (_)_ (_)     _     (_)  │
// │ (_)        (_)(_)(_)(_)(_)   (_) _  _  _ (_)(_)   _(_)_   (_)  │
// │ (_)       _(_)(_)   (_) _    (_)(_)(_)(_)(_)(_)  (_) (_)  (_)  │
// │ (_)_  _  (_)  (_)      (_) _ (_)         (_)(_)_(_)   (_)_(_)  │
// │(_)(_)(_)(_)   (_)         (_)(_)         (_)  (_)       (_)    │
// └────────────────────────────────────────────────────────────────┘


function generateID() {
	// cells_grid
}



function drawID(text_scale, height) {
	push();
	translate(10, height - 10);
	noFill();
	stroke(0);
	strokeWeight(1);
	scale(text_scale);
	// P5.hershey.putText("TARGZ-GBS-OJD54D54DK",{
	P5.hershey.putText(piecename, {
		cmap: FONT_HERSHEY.PLAIN,
		align: "left",
		noise: 0.0,
	});
	pop();
}



function draw() {
	// 
	console.log("DRAW CALL");
	
	// Saving the SVG if needed
	if (save_file) {
		console.log("DRAW SAVE");
		console.log("SVG save_file", save_file);


		drawID(0.4, canvas_Height);


		if (fileformat == "svg"){
			// canvas_layers_for_export
			// for (let i = 0; i < canvas_layers_for_export.length; i++) {
			// 	var element = canvas_layers_for_export[i];
			// 	background(background_color);
			// 	// rect(0, 0, canvas_Width, canvas_Height);
			// 	image(element, 0, 0, canvas_Width, canvas_Height);
			// 	var layer_name = "layer_"+ layers_array[i].id +"_"+  layers_array[i].color_name + "_" + layers_array[i].brush_angle+"_"+filename;
			// 	save(layer_name + "." + fileformat);
				

			// }
			background(background_color);
			image(vector_canvas_full, 0, 0, canvas_Width, canvas_Height);
			save(filename + "." + fileformat);
			saveStrings(params, filename+'.txt');
		} 
		if (fileformat == "png" || fileformat == "jpg"){
			background(background_color);
			image(pixel_canvas, 0, 0, canvas_Width, canvas_Height);
			save(filename + "." + fileformat);
		} 

		
		save_file = false;


	} else {
		console.log("DRAW NORMAL");
		clear();
		// background(200);
		if (renderStyle == render_style_vector) {
			console.log("DRAW STYLE_VECTOR");
			// background("red");
			image(vector_canvas_full, 0, 0, scaled_width, scaled_height);
			
		} else if (renderStyle == render_style_parallel) {
			tint(255, 220);
			console.log("DRAW STYLE_PARALLEL");
			// pixel_canvas.scale(-1, 1);
			background(background_color);
			// DEBUG
			// image(vector_canvas, 0, -vertical_position_offset, scaled_width, scaled_height);
			image(pixel_canvas, 0, 0, scaled_width, scaled_height);
		}

		drawID(0.4, scaled_height);
		
		// image(canv,-60,0,1200,600);
	}
	console.table(window.$fxhashFeatures);





	noLoop();
}





// ┌───────────────────────────────────────────────────────────────────────────────────┐
// │ _  _  _  _  _  _            _  _           _     _  _  _                          │
// │(_)(_)(_)(_)(_)(_)          (_)(_) _       (_) _ (_)(_)(_) _                       │
// │(_)            (_)          (_)(_)(_)_     (_)(_)         (_)                      │
// │(_) _  _       (_)          (_)(_)  (_)_   (_)(_)                                  │
// │(_)(_)(_)      (_)          (_)(_)    (_)_ (_)(_)                                  │
// │(_)            (_)          (_)(_)      (_)(_)(_)          _                       │
// │(_)            (_)_  _  _  _(_)(_)         (_)(_) _  _  _ (_)                      │
// │(_)              (_)(_)(_)(_)  (_)         (_)   (_)(_)(_)                         │
// └───────────────────────────────────────────────────────────────────────────────────┘



function fxfeature(name,value){
	console.log("fxfeature("+name+","+value+")");
	params.push(name+":"+value);
	window.$fxhashFeatures[ name ] = value;
	$fx.features[ name ] = value;
	
}

function keyTyped() {
	console.log("keyTyped:",key);
	if (key === 's') {
		console.log("keyTyped -> s");
		save_file = true;
		fileformat = "svg";
		// trick -> the resize is trigering the draw call;
		resizeCanvas(canvas_Width, canvas_Height, false);
		resizeCanvas(scaled_width, scaled_height, false);
	} else if (key === 'i') {
		console.log("keyTyped -> i");
		save_file = true;
		fileformat = "png";
		resizeCanvas(canvas_Width, canvas_Height, false);
		resizeCanvas(scaled_width, scaled_height, false);
	} else if (key === 'j') {
		console.log("keyTyped -> j");
		save_file = true;
		fileformat = "jpg";
		resizeCanvas(canvas_Width, canvas_Height, false);
		resizeCanvas(scaled_width, scaled_height, false);
	} else if (key === 'g') {
		regenerate();
	}

}
function mouseClicked(event) {
	// console.log(event.x,event.y);
}

function setDimensions() {
	// console.log("setDimensions");

	h_cells_size = canvas_Width / horizontal_tiles;
	v_cells_diag = canvas_Height / vertical_tiles;
	h_cells_size = Math.sqrt(h_cells_size * h_cells_size / 2);
	v_cells_size = Math.sqrt(v_cells_diag * v_cells_diag / 2);
	// console.log("canvas_Width:", canvas_Width);
	// console.log("canvas_Height:", canvas_Height);
	// console.log("h_cells_size:", h_cells_size);
	// console.log("v_cells_diag:", v_cells_diag);
	// console.log("h_cells_size:", h_cells_size);
	// console.log("v_cells_size:", v_cells_size);

	cells_diag = canvas_Width / horizontal_tiles;
	// console.log("cells_diag:", cells_diag);
	cells_size = Math.sqrt(cells_diag * cells_diag / 2);

	// cells_size = v_cells_size;

	// console.log("cells_size:", cells_size);
	// cells_offset = 100;
	lines_space = cells_size / lines_per_tiles;
	lines_radius = lines_space * 2;
	html_Canvas_Size = min(windowWidth, windowHeight) ;
	// if(hasMaxSize) { html_Canvas_Size = min(canvas_Height, html_Canvas_Size); }
	var windowScale_Height = map(-10+html_Canvas_Size, 0, canvas_Height, 0, 1, hasMaxSize);
	var windowScale_Width = map(-10+html_Canvas_Size/(canvas_Height/canvas_Width), 0, canvas_Width, 0, 1, hasMaxSize);
	
	scaled_height = (canvas_Height * windowScale_Height) ;
	scaled_width = (canvas_Width * windowScale_Width);
	vertical_position_offset = cells_size / 2;
	// THE BUG IS HER
	// vertical_position_offset = 0;
	// console.log("vertical_position_offset",vertical_position_offset);

}

function windowResized() {
	// console.log("windowResized");
	setDimensions();
	if (isCentered) { centerCanvas(); }
	resizeCanvas(scaled_width, scaled_height, false);
}



function centerCanvas() {
	var s = document.body.style;
	s.display = "flex";
	s.overflow = "hidden";
	s.height = "100vh";
	s.alignItems = "center";
	s.justifyContent = "center";
}



