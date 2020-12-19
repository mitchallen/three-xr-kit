!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).threeXrKit={})}(this,function(e){var n=function(){function e(){}return e.createButton=function(e){console.log("XRBUTTON.createButton");var n=document.createElement("button");function t(e){e.style.position="absolute",e.style.bottom="20px",e.style.padding="12px 6px",e.style.border="1px solid #fff",e.style.borderRadius="4px",e.style.background="rgba(0,0,0,0.1)",e.style.color="#fff",e.style.font="normal 13px sans-serif",e.style.textAlign="center",e.style.opacity="0.5",e.style.outline="none",e.style.zIndex="999"}if("xr"in navigator)return n.id="VRButton",n.style.display="none",t(n),navigator.xr.isSessionSupported("immersive-vr").then(function(t){t?function(){var t=null;function r(r){r.addEventListener("end",o),e.xr.setSession(r),n.textContent="EXIT VR",t=r}function o(){t.removeEventListener("end",o),n.textContent="ENTER VR",t=null}n.style.display="",n.style.cursor="pointer",n.style.left="calc(50% - 50px)",n.style.width="100px",n.textContent="ENTER VR",n.onmouseenter=function(){n.style.opacity="1.0"},n.onmouseleave=function(){n.style.opacity="0.5"},n.onclick=function(){null===t?navigator.xr.requestSession("immersive-vr",{optionalFeatures:["local-floor","bounded-floor","hand-tracking"]}).then(r):t.end()}}():(n.style.display="",n.style.cursor="auto",n.style.left="calc(50% - 75px)",n.style.width="150px",n.onmouseenter=null,n.onmouseleave=null,n.onclick=null,n.textContent="VR NOT SUPPORTED")}),n;var r=document.createElement("a");return!1===window.isSecureContext?(r.href=document.location.href.replace(/^http:/,"https:"),r.innerHTML="WEBXR NEEDS HTTPS"):(r.href="https://immersiveweb.dev/",r.innerHTML="WEBXR NOT AVAILABLE"),r.style.left="calc(50% - 90px)",r.style.width="180px",r.style.textDecoration="none",t(r),r},e}(),t=function(){function e(){}return e.createRenderer=function(e){console.log("XRKIT.createRenderer");var n=(e=e||{}).clear||"#000000",t=new THREE.WebGLRenderer({antialias:!0});return t.setClearColor(n),t.setSize(window.innerWidth,window.innerHeight),t.xr.enabled=!0,t},e.createCamera=function(e){var n=(e=e||{}).aspectRatio||window.innerWidth/window.innerHeight;return new THREE.PerspectiveCamera(e.fov||75,n,e.near||.1,e.far||1e3)},e.create=function(t){var r=e.createRenderer(t=t||{});return document.body.appendChild(r.domElement),document.body.appendChild(n.createButton(r)),{renderer:r,camera:e.createCamera(t)}},e.render=function(n){var t=(n=n||{}).scene||new THREE.Scene,r=n.renderer||e.createRenderer(n),o=n.camera||e.createCamera(n);r.render(t,o)},e.resize=function(n){var t=(n=n||{}).renderer||e.createRenderer(n),r=n.camera||e.createCamera(n);r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),t.setSize(window.innerWidth,window.innerHeight)},e}();e.XRBUTTON=n,e.XRKIT=t});
//# sourceMappingURL=three-xr-kit.umd.js.map
