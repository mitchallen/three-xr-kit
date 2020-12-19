/*
  In a browser must use script type="module" parameter:
  <script type="module" src="./app.js"></script>
 */

import {DemoSceneFactory} from './demo-scene.js';

var demoScene = DemoSceneFactory.create();

window.addEventListener( 
  'resize', 
  demoScene.resize, 
  false 
);

demoScene.animate();