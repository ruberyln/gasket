"use strict";
var gl;

var positions=[];

var numPositions=1000000;





window.onload =function init () 
 {
    //getting the gl-canvas from html code
    var canvas = document.getElementById ("gl-canvas");
    gl = canvas.getContext ('webgl2');
    //if gl is not accepted by browser this will throw an error code 
if(!gl) alert("Browser does not support webgl");


// we need to initialize the corner of the gasket
var vertices = [
vec2(-1, -1),
vec2(0, 1),
vec2(1,-1)
];

var u = add(vertices[0], vertices[1]);
var v = add(vertices[0], vertices[2]);
var p = mult(0.25, add( u, v ));


positions.push(p);



for (var i = 0; positions.length < numPositions; ++i){
    //Math.random generates random numbers between 0 and 2 
    var j = Math.floor(3*Math.random());
    p = add(positions[i], vertices[j]);
    p = mult(0.5,p);
    positions.push(p);
}

//viewport consist of where the gasket will be viewed (x,y,w,h)

gl.viewport(0, 0,canvas.width, canvas.height);
// color of the background canvas  using RGBA

// this is white with full opacity
gl.clearColor(1.0,0.0,0.5,1.0);

//load the shaders from Init shaders into a program object 
var program = initShaders( gl, "vertex-shader", "fragment-shader");
gl.useProgram (program);
//create buffer 
var bufferId = gl.createBuffer();
//bind buffer
gl.bindBuffer (gl.ARRAY_BUFFER, bufferId);
//load data in buffer
gl.bufferData (gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

//get attribute location of vertex shader
var positionLoc = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    //enable vertex shader
    gl.enableVertexAttribArray(positionLoc);

render();
 };

//calling the render function to draw the triangles
function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays (gl.POINTS, 0, positions.length)
}

