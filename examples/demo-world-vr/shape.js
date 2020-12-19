/*
 * File: shape.js
 * Author: Mitch Allen
 * Reference:
 *  https://threejs.org/docs/#api/en/geometries/IcosahedronGeometry
 */

export class ShapeFactory {

  // Define a static create method to return new shapes
  static createMesh(spec) {

    // Setup default values or use arguments
    spec = spec || {};
    var color = spec.color || "#FF00FF";
    var radius = spec.radius || 1;
    // detail: Setting this to a value greater than 0 adds more vertices 
    // making it no longer an icosahedron. 
    // When detail is greater than 1, it's effectively a sphere.
    var detail = spec.detail || 0;
    var wireframe = spec.wireframe == undefined ? true : spec.wireframe;

    // Use ThreeJS to define a 3D icosahedron
    var geometry = new THREE.IcosahedronGeometry(radius, detail);
    var material = new THREE.MeshBasicMaterial({ 
      color: color,
      wireframe: wireframe 
    });

    return {
      geometry,
      material
    }
  }

  // Define a static create method to return new icosahedrons
  static create(spec) {

    // Setup default values or use arguments
    spec = spec || {};
    var name = spec.name = "shape";  
    var tX = spec.x || 0.0;
    var tY = spec.y || 0.0;
    var tZ = spec.z|| 0.0;

    // Pass additional spec properties to createMesh
    let mesh = spec.mesh || ShapeFactory.createMesh( spec ); 

    // Use ThreeJS to define a 3D shape
    var geometry = mesh.geometry;
    var material = mesh.material;

    var shape = new THREE.Mesh(geometry, material);

    // Use the name property to specify a type
    shape.name = name;

    // Using ThreeJS methods on the shape, move it to a specific offset
    shape.translateX(tX);
    shape.translateY(tY);
    shape.translateZ(tZ);

    // Return the new shape
    return shape;
  }
}