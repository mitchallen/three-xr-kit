# @mitchallen/three-xr-kit
ThreeJS XR Kit
--

* * * 

<p align="left">
  <a href="https://npmjs.com/package/@mitchallen/three-xr-kit">
    <img src="http://img.shields.io/npm/dt/@mitchallen/three-xr-kit.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/@mitchallen/three-xr-kit">
    <img src="http://img.shields.io/npm/v/@mitchallen/three-xr-kit.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/@mitchallen/three-xr-kit">
    <img src="https://img.shields.io/npm/l/@mitchallen/three-xr-kit.svg?style=flat-square" alt="License">
  </a>
  <a href="https://www.jsdelivr.com/package/npm/@mitchallen/three-xr-kit">
    <img src="https://data.jsdelivr.com/v1/package/npm/@mitchallen/three-xr-kit/badge" alt="jsdelivr">
  </a>
</p>

# Usage

## Get from npm via jsdelivr 

```js
import {
  XRKIT,
} from 'https://cdn.jsdelivr.net/npm/@mitchallen/three-xr-kit@1.0.12/dist/three-xr-kit.modern.js'
```

* * *

# Example code

See the repo examples folder.

# Live demos

To see live demos using this package, browse to:

* https://vrmitch.com

If you browse to this site in your VR headset you can click the **Enter VR** button.

This code has been tested on:

* Oculus Go
* Oculus Quest 2

* * *

# Publishing

To publish your version of the package you must first setup an account and project in NPM.

This will boost the version number, push and publish:

```sh
git add .
git commit -m "updated code"
npm run pub:patch
```

As an alternative:

```sh
git add .
git commit -m "updated code"
npm version patch -m "Upgrade to %s for reasons"
```

* * * 

# References

* https://www.jsdelivr.com/

