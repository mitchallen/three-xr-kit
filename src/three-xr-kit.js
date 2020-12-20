/*
 * For XRBUTTON copied from VRButton:
 * See: https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content
 * Copied from:
 *     https://raw.githubusercontent.com/mrdoob/three.js/master/examples/jsm/webxr/VRButton.js
 */

export class XRBUTTON {
	static createButton( renderer ) {
    console.log('XRBUTTON.createButton');
    const button = document.createElement( 'button' );
    
		function showEnterVR( /*device*/ ) {
			let currentSession = null;
			function onSessionStarted( session ) {
				session.addEventListener( 'end', onSessionEnded );
				renderer.xr.setSession( session );
				button.textContent = 'EXIT VR';
				currentSession = session;
			}

			function onSessionEnded( /*event*/ ) {
				currentSession.removeEventListener( 'end', onSessionEnded );
				button.textContent = 'ENTER VR';
				currentSession = null;
			}

			button.style.display = '';
			button.style.cursor = 'pointer';
			button.style.left = 'calc(50% - 50px)';
			button.style.width = '100px';
      button.textContent = 'ENTER VR';
      
			button.onmouseenter = function () {
				button.style.opacity = '1.0';
			};

			button.onmouseleave = function () {
				button.style.opacity = '0.5';
			};

			button.onclick = function () {
				if ( currentSession === null ) {
					// WebXR's requestReferenceSpace only works if the corresponding feature
					// was requested at session creation time. For simplicity, just ask for
					// the interesting ones as optional features, but be aware that the
					// requestReferenceSpace call will fail if it turns out to be unavailable.
					// ('local' is always available for immersive sessions and doesn't need to
					// be requested separately.)
					const sessionInit = { optionalFeatures: [ 'local-floor', 'bounded-floor', 'hand-tracking' ] };
					navigator.xr.requestSession( 'immersive-vr', sessionInit ).then( onSessionStarted );
				} else {
					currentSession.end();
				}
			};
		}

		function disableButton() {
			button.style.display = '';
			button.style.cursor = 'auto';
			button.style.left = 'calc(50% - 75px)';
			button.style.width = '150px';
			button.onmouseenter = null;
			button.onmouseleave = null;
			button.onclick = null;
		}

		function showWebXRNotFound() {
			disableButton();
			button.textContent = 'VR NOT SUPPORTED';

		}

		function stylizeElement( element ) {
			element.style.position = 'absolute';
			element.style.bottom = '20px';
			element.style.padding = '12px 6px';
			element.style.border = '1px solid #fff';
			element.style.borderRadius = '4px';
			element.style.background = 'rgba(0,0,0,0.1)';
			element.style.color = '#fff';
			element.style.font = 'normal 13px sans-serif';
			element.style.textAlign = 'center';
			element.style.opacity = '0.5';
			element.style.outline = 'none';
			element.style.zIndex = '999';
		}

		if ( 'xr' in navigator ) {
			button.id = 'VRButton';
			button.style.display = 'none';
			stylizeElement( button );
			navigator.xr.isSessionSupported( 'immersive-vr' ).then( function ( supported ) {
				supported ? showEnterVR() : showWebXRNotFound();
			} );
			return button;

		} else {

			const message = document.createElement( 'a' );
			if ( window.isSecureContext === false ) {
				message.href = document.location.href.replace( /^http:/, 'https:' );
				message.innerHTML = 'WEBXR NEEDS HTTPS'; // TODO Improve message
			} else {
				message.href = 'https://immersiveweb.dev/';
				message.innerHTML = 'WEBXR NOT AVAILABLE';
			}
			message.style.left = 'calc(50% - 90px)';
			message.style.width = '180px';
			message.style.textDecoration = 'none';
			stylizeElement( message );
			return message;
		}
	}
}

/*-- --*/

export class XRKIT {

  static createRenderer( ctx = {} ) {
    console.log('XRKIT.createRenderer');
    let { clear = "#000000" } = ctx;
    // Setup a ThreeJS renderer to render the scene
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(clear);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // [VR] Enable WebXR support
    renderer.xr.enabled = true;
    return renderer;
  }

  static createCamera( ctx = {} ) {
    let {
      fov = 75, // Camera frustum vertical field of view
      // Camera frustum aspect ratio
      aspectRatio = window.innerWidth / window.innerHeight,
      near = 0.1, // Camera frustum near plane
      far = 1000, // Camera frustum far plane.
    } = ctx;
    // Create a ThreeJS camera
    var camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);
    return camera;
  }

  static create(ctx = {}) {
    var renderer = XRKIT.createRenderer(ctx);
    document.body.appendChild(renderer.domElement);
    // [VR] Append VR Button to scene
    document.body.appendChild(XRBUTTON.createButton(renderer));
    var camera = XRKIT.createCamera(ctx);
    return {
      renderer,
      camera,
    }
  }

  static render(ctx = {}) {
    // set defaults so it won't crash
    var scene = ctx.scene || new THREE.Scene();
    var renderer = ctx.renderer || XRKIT.createRenderer(ctx);
    var camera = ctx.camera || XRKIT.createCamera(ctx);
    renderer.render(scene, camera);
  }

  static resize(ctx = {}) {
    // set default so it won't crash
    var renderer = ctx.renderer || XRKIT.createRenderer(ctx);
    var camera = ctx.camera || XRKIT.createCamera(ctx);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

};