class Layer {
	// Value 	list of tile ID 1,2,3,4,...
	constructor(id,col,angle,h_flip,v_flip) {
                
                // console.log("layer N°",id);
                // console.log(color);
                // var new_angle;
                // if(h_flip) new_angle = 180-angle;
                // if(v_flip) new_angle = 180-angle;
                // if(!v_flip&&!h_flip) new_angle = angle;


                this.id = id;
                this.brush_angle=angle;
                this.fliped_brush_angle=angle;
                this.fixed_brush_angle=angle;
                this.needupdate = false;
                this.horizontal_flip = h_flip; 
                this.vertical_flip = v_flip; 
                this.color = col[1];
                this.color_name = col[0];
                // console.log("color_name",this.color_name);
                // console.log("color",this.color);
                this.vector_canvas;

                console.log("LayerObj:constructor:"+this.id,"-",this.color_name,"h_flip:"+h_flip,"v_flip:"+v_flip); 
                console.log("LayerObj:request angle->",this.brush_angle);
                if(h_flip && !v_flip){
                        this.flip_brush_angle();
                }else if(v_flip &! h_flip){
                        this.flip_brush_angle();
                }
                this.fix_angle();

	}
        flip_brush_angle(){
                console.log("LayerObj:FLIP()");
                // this.horizontal_flip = true;
                if(this.brush_angle == 45 ) this.fliped_brush_angle = 135;
                if(this.brush_angle == 135 ) this.fliped_brush_angle = 45;
                console.log("LayerObj:flip_brush_angle->",this.fliped_brush_angle);
        }

        fix_angle(){
                // Comme o ntoune de 45° elms tiles on dois faire "tourner els angles de 45°"
                // console.log("LayerObj:fix_angle()");
                // console.log("LayerObj:color_name->",this.color_name);
                console.log("LayerObj:fliped_brush_angle->",this.fliped_brush_angle);
                if(this.fliped_brush_angle == 0 ) this.fixed_brush_angle = 45;
                if(this.fliped_brush_angle == 45 ) this.fixed_brush_angle = 0;
                if(this.fliped_brush_angle ==90 ) this.fixed_brush_angle = 135;
                if(this.fliped_brush_angle ==135 ) this.fixed_brush_angle = 90;
                console.log("LayerObj:fixed brush_angle->",this.fixed_brush_angle);
  
                
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
