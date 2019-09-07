class WebGLRender {
    
    constructor(canvas, gl) {
        this.canvas = canvas;
        this.gl = gl;
    }

    init(){
    // Only continue if WebGL is available and working
    if (this.gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
      }
    
      // Set clear color to black, fully opaque
      this.gl.clearColor(0.0, 1.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      this.gl.clear(gl.COLOR_BUFFER_BIT);
    }
}

//export default WebGLRender;