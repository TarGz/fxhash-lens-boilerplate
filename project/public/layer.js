class Layer {
    /**
     * Represents a Layer.
     * @constructor
     * @param {number} id - The id of the layer.
     * @param {Array} col - The color of the layer.
     * @param {number} angle - The angle of the layer.
     * @param {boolean} h_flip - The horizontal flip status of the layer.
     * @param {boolean} v_flip - The vertical flip status of the layer.
     */
    constructor(id,col,angle,h_flip,v_flip) {
        console.log("Layer constructor params:", id, col, angle, h_flip, v_flip);
        this.id = id;
        this.brush_angle=angle;
        this.fliped_brush_angle=angle;
        this.fixed_brush_angle=angle;
        this.needupdate = false;
        this.horizontal_flip = h_flip; 
        this.vertical_flip = v_flip; 
        this.color = col[1];
        this.color_name = col[0];
        this.vector_canvas;

        if(h_flip && !v_flip){
            this.flip_brush_angle();
        }else if(v_flip &! h_flip){
            this.flip_brush_angle();
        }
        this.fix_angle();
    }

    /**
     * Flips the brush angle of the layer.
     */
    flip_brush_angle(){
        this.fliped_brush_angle = (this.brush_angle == 45) ? 135 : 45;
    }

    /**
     * Fixes the brush angle of the layer.
     */
    fix_angle(){
        switch(this.fliped_brush_angle) {
            case 0:
                this.fixed_brush_angle = 45;
                break;
            case 45:
                this.fixed_brush_angle = 0;
                break;
            case 90:
                this.fixed_brush_angle = 135;
                break;
            case 135:
                this.fixed_brush_angle = 90;
                break;
        }
    }

    /**
     * Updates the color of the layer.
     * @param {Array} color - The new color of the layer.
     */
    update_color(color) {
        this.color = color;
    }

    /**
     * Sets the vector canvas of the layer.
     * @param {Object} canvas - The new vector canvas of the layer.
     */
    set_vector_canvas(canvas){
        this.vector_canvas = canvas;
    }

    /**
     * Gets the vector canvas of the layer.
     * @return {Object} The vector canvas of the layer.
     */
    get_vector_canvas(){
        return this.vector_canvas;
    }
}
