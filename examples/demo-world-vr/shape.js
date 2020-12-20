/*
 * File: shape.js
 * Author: Mitch Allen
 * Reference:
 *  https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry
 */

export class ShapeFactory {

  // Define a static create method to return new shapes
  static createMesh( spec = {} ) {

    const { 
      color = '#0000FF', 
      radius = 1, 
      detail = 0,   // > 1, it's effectively a sphere. 
      wireframe = true
    } = spec;
  
    // Use ThreeJS to define a 3D shape
    var geometry = new THREE.IcosahedronGeometry(radius, detail);
    var material = new THREE.MeshBasicMaterial({ 
      color,
      wireframe 
    });

    return {
      geometry,
      material
    }
  }

  // Define a static create method to return new icosahedrons
  static create( spec = {} ) {

    const {
      name = "shape",
      x = 0.0,
      y = 0.0,
      z = 0.0,
      mesh = ShapeFactory.createMesh( spec )
    } = spec; 

    // Use ThreeJS to define a 3D shape
    let { geometry, material } = mesh;

    var shape = new THREE.Mesh(geometry, material);

    // Use the name property to specify a type
    shape.name = name;

    // Using ThreeJS methods on the shape, move it to a specific offset
    shape.translateX(x);
    shape.translateY(y);
    shape.translateZ(z);

    // Return the new shape
    return shape;
  }
}