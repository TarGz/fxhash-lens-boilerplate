class Layer {
	// Value 	list of tile ID 1,2,3,4,...
	constructor(id,col,angle,h_flip,v_flip) {

                // console.log("layer N°",id);
                // console.log(color);
                var new_angle;
                if(h_flip) new_angle = 180-angle;
                if(v_flip) new_angle = 180-angle;
                if(!v_flip&&!h_flip) new_angle = angle;


                this.id = id;
                this.brush_angle=new_angle;
                this.needupdate = false;
                this.horizontal_flip = h_flip; 
                this.vertical_flip = v_flip; 
                this.color = col[1];
                this.color_name = col[0];
                // console.log("color_name",this.color_name);
                // console.log("color",this.color);
                this.vector_canvas;


	}


	update_color(color) {
                this.color = color;
	}

        set_vector_canvas(canvas){
                this.vector_canvas = canvas;
        }
        get_vector_canvas(){
                return this.vector_canvas;
        }

}
