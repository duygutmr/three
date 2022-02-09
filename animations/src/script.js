import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //resizing screen

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//dblclick for full screen

window.addEventListener("dblclick", () => {
  //windows
  if(!document.fullscreenElement) {
     canvas.requestFullscreen()
  } else {
      document.exitFullscreen()
  }

//   //safari
//   const fullscreenElement =
//     document.fullscreenElement || document.webkitFullScreenElement;
//   if (!fullscreenElement) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     } else if (canvas.webkitRequestFullscreen) {
//       canvas.webkitRequestFullscreen();
//     }
//   } else {
//       if(document.exitFullscreen) {
//           document.exitFullscreen();

//       } else if( document.webkitExitFullscreen) {
//         document.webkitExitFullscreen()
//       }
//   }
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

//controls

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 1

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// let time = Date.now()

const clock = new THREE.Clock();

// gsap.to(mesh.position, { duration:1, delay:1, x: 2 })
// gsap.to(mesh.position, { duration:1, delay:2, x: 0 })

const tick = () => {
  // console.log("tick");
  //60 tick per second. 60 fps

  //time
  // const currentTime = Date.now()
  // const deltaTime = currentTime - time
  // time = currentTime

  // console.log(deltaTime);

  // const elapsedTime = clock.getElapsedTime()
  // mesh.rotation.y = elapsedTime

  // mesh.position.y = Math.sin(elapsedTime)
  // mesh.position.x = Math.cos(elapsedTime)

  //if we want one total rotation in 1 second
  // mesh.rotation.x = elapsedTime * Math.PI * 2
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  //   camera.position.y = cursor.y  * 5;
  //   camera.lookAt(mesh.position);
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
