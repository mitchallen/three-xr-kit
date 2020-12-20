/*
 * File: demo-scene.js
 * Author: Mitch Allen
 */

import {
  XRKIT,
} from 'https://cdn.jsdelivr.net/npm/@mitchallen/three-xr-kit@1.0.13/dist/three-xr-kit.modern.js';
// } from '../../dist/three-xr-kit.modern.js'

import { ShapeFactory } from './shape.js';

export class DemoSceneFactory {

  // Define a static create method to return new scenes filled with shapes
  static create() {

    var speed = 1;

    var xrApp = XRKIT.create();

    // Create a demo world group node
    const demoWorld = new THREE.Group();
    demoWorld.name = "demo";

    let mesh = ShapeFactory.createMesh({ color: "#00FF00", wireframe: false });
    let wire = ShapeFactory.createMesh({ color: "#000000", wireframe: true  });

    let orbiter = ShapeFactory.createMesh({ 
      color: "#FF0000", 
      wireframe: false,
      radius: 0.5, 
    });

    let orbiterWire = ShapeFactory.createMesh({ 
      color: "#0000FF", 
      wireframe: true,
      radius: 0.75, 
    });

    const options = [
      { mesh,               x: 0.0, y: -2.0, z:  0.0 },
      { mesh: wire,         x: 0.0, y: -2.0, z:  0.0 },
      { mesh,               x: 0.0, y:  0.0, z:  0.0 },
      { mesh: wire,         x: 0.0, y:  0.0, z:  0.0 },
      { mesh,               x: 0.0, y:  2.0, z:  0.0 },
      { mesh: wire,         x: 0.0, y:  2.0, z:  0.0 },
      { mesh: orbiter,      x: 0.0, y:  0.0, z: -2.0 },
      { mesh: orbiterWire,  x: 0.0, y:  0.0, z: -2.0 },
    ]

    // Add shapes to the demo world group node 
    options.forEach( op => demoWorld.add(ShapeFactory.create( op )));

    // In VR headset / camera is locked at 0,0,0
    // So you have to move the world and not the camera

    // position the demo world
    demoWorld.translateY(1)
    demoWorld.translateZ(-5);

    // Create a new ThreeJS scene
    var scene = new THREE.Scene();

    // Add demo world to scene
    scene.add(demoWorld);

    // Define a scene with methods to return
    var demoScene = {

      // Define a method on the scene to handle browser window resizing
      resize: function () {
        XRKIT.resize(xrApp);
      },

      // Define a method to be called when the scene is rendered
      step: function () {
        scene.traverse(function (node) {
          if (node.name === "shape") {
            node.rotation.x += 0.005;
            node.rotation.y += 0.01 * speed;
          }
          if (node.name === "demo") {
            node.rotation.y += 0.005;
          }
        });

        XRKIT.render({
          scene,
          ...xrApp
        });
      },

      animate: function () {
        xrApp.renderer.setAnimationLoop(this.step);
      }
    };

    return demoScene;
  }
}