// console.log(fxhash);
// console.log(fxrand());

const sp = new URLSearchParams(window.location.search)
//  console.log(sp);

// this is how to define parameters
$fx.params([
  {
    id: "number_id",
    name: "A number/float64",
    type: "number",
    //default: Math.PI,
    update: "sync",
    options: {
      min: 1,
      max: 10,
      step: 0.0001,
    },
  },

  {
    id: "bigint_id",
    name: "A bigint",
    type: "bigint",
    //default: BigInt(Number.MAX_SAFE_INTEGER * 2),
    options: {
      min: Number.MIN_SAFE_INTEGER * 4,
      max: Number.MAX_SAFE_INTEGER * 4,
      step: 1,
    },
  },
  {
    id: "string_id_long",
    name: "A string long",
    type: "string",
    //default: "hello",
    options: {
      minLength: 1,
      maxLength: 512,
    },
  },
  {
    id: "select_id",
    name: "A selection",
    type: "select",
    //default: "pear",
    options: {
      options: ["apple", "orange", "pear"],
    },
  },
  {
    id: "color_id",
    name: "A color",
    type: "color",
    update: "sync",
    //default: "ff0000",
  },
  {
    id: "boolean_id",
    name: "A boolean",
    type: "boolean",
    //default: true,
  },
  {
    id: "string_id",
    name: "A string",
    type: "string",
    //default: "hello",
    options: {
      minLength: 1,
      maxLength: 512,
    },
  },
])

// this is how features can be defined
$fx.features({
  "A random feature": Math.floor($fx.rand() * 10),
  "A random boolean": $fx.rand() > 0.5,
  "A random string": ["A", "B", "C", "D"].at(Math.floor($fx.rand() * 4)),
  "Feature from params, its a number": $fx.getParam("number_id"),
})

// function main() {
//   // log the parameters, for debugging purposes, artists won't have to do that
//   // console.log("Current param values:");
//   // // Raw deserialize param values
//   // console.log($fx.getRawParams());
//   // // Added addtional transformation to the parameter for easier usage
//   // // e.g. color.hex.rgba, color.obj.rgba.r, color.arr.rgb[0]
//   // console.log($fx.getParams());

//   // // how to read a single raw parameter
//   // console.log("Single raw value:");
//   // console.log($fx.getRawParam("color_id"));
//   // // how to read a single transformed parameter
//   // console.log("Single transformed value:");
//   // console.log($fx.getParam("color_id"));

//   const getContrastTextColor = (backgroundColor) =>
//     ((parseInt(backgroundColor, 16) >> 16) & 0xff) > 0xaa
//       ? "#000000"
//       : "#ffffff"

//   const bgcolor = $fx.getParam("color_id").hex.rgba
//   const textcolor = getContrastTextColor(bgcolor.replace("#", ""))



 

//   // update the document based on the parameters
//   document.body.style.background = bgcolor
//   document.body.innerHTML = `
//   <div style="color: ${textcolor};">
//     <p>
//     hash: ${$fx.hash}
//     </p>
//     <p>
//     minter: ${$fx.minter}
//     </p>
//     <p>
//     inputBytes: ${$fx.inputBytes}
//     </p>
//     <p>
//     context: ${$fx.context}
//     </p>
//     <p>
//     params:
//     </p>
//     <pre>
//     ${$fx.stringifyParams($fx.getRawParams())}
//     </pre>
//   <div>
//   `
// }

// main()

// $fx.on(
//   "params:update",
//   (newRawValues) => {
//     // opt-out default behaviour
//     if (newRawValues.number_id === 5) return false
//     // opt-in default behaviour
//     return true
//   },
//   (optInDefault, newValues) => main()
// )








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

// ┌───────────────────────────────────────────────────────────────────────────────────┐
// │    _  _  _              _            _           _  _  _                          │
// │ _ (_)(_)(_) _          (_)          (_)         (_)(_)(_)                         │
// │(_)         (_)         (_)          (_)            (_)                            │
// │(_)    _  _  _          (_)          (_)            (_)                            │
// │(_)   (_)(_)(_)         (_)          (_)            (_)                            │
// │(_)         (_)  _  _   (_)          (_)  _  _      (_)                            │
// │(_) _  _  _ (_) (_)(_)  (_)_  _  _  _(_) (_)(_)   _ (_) _                          │
// │   (_)(_)(_)(_) (_)(_)    (_)(_)(_)(_)   (_)(_)  (_)(_)(_)                         │
// └───────────────────────────────────────────────────────────────────────────────────┘



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



var tileArrayCount = 0;
function addTilesToArray(name, connector, rotCount) {
	tiles_database.push(new Tile(name, tileArrayCount, connector, rotCount));
	tileArrayCount++;
}
















let sketch = function(p) {


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
const theme_style_3colors = "THEME_STYLE_3COLORS";

var debug_mode_activated = false; 		  ///////
var debug_mode_pattern_activated = false; ///////

var default_size_id = 3;    			/////// 1
var default_pen_id = 3; 				/////// 4

var blank_rnd_cell_needed = 0;  	/////// 0
var connector_count_favor = 4;  	/////// 4
// 5x13 | i
let horizontal_tiles = 4;  				/////// 4  
let vertical_tiles = 10;			 	/////// 10
let lines_per_tiles = 14;   			/////// 14

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

  let x = 100;
  let y = 100;



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


	p.setup_canvas_size = function() {
		// resolution_data = canvas_size_storage[2];
		// var resolution_data = canvas_size_storage[getResolution(fxrand())];
		canvas_Width = resolution_data[1] * cm_ratio;
		canvas_Height = resolution_data[2] * cm_ratio;
		calculate_tiles_count();
		setDimensions();
		resizeCanvas(scaled_width, scaled_height, false);

		if (isCentered) { centerCanvas(); }

	}

  p.set_colors_array = function(){
	// https://www.royaltalens.com/en/products/ecoline/bottles/?productCode=1125P
		colors_array = [
			["Lemon-Yellow-205" , p.color('#ffff07')],
			["Chartreuse-233" , p.color('#e6b319')],
			["Light-Orange-236" , p.color('#f2670d')],
			["Pastel-Blue-580" , p.color('#8cffff')],
			["Sky-Blue-578" , p.color('#33bfda')],
			["Pastel-Roser-390" , p.color('#f281e6')],
			["Magenta-337" , p.color('#ff00ff')],
			["Turquoise-Green-661" , p.color('#44a6a6')],
			["Pastel-Green-666" , p.color('#a6f273')],
			["Carmine-318" , p.color('#9c1e32')],
		];

		brush_agnle_array=[
			0,45,90,135
		];
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

  p.setup = function() {

	params=[];
	params.push("fxhash:"+$fx.hash);
	
    p.createCanvas(700, 410);
    console.log("setup",$fx.hash);
	p.set_colors_array();
	p.setup_canvas_size


  };



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



  p.draw = function() {
    p.background(0);
    p.fill(255);
    p.rect(x, y, 50, 50);
  };
};

let myp5 = new p5(sketch);
// set_colors_array();