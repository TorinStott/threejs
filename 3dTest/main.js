import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextureLoader } from "three";
// scene
const scene = new THREE.Scene();
// camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// renderer
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);
// create and add components to scene
const pointLight = new THREE.PointLight(0xffffff);
scene.add(pointLight);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);
const controls = new OrbitControls(camera, renderer.domElement);
// create stars
function addPurpleStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x8080ff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}
function addBlueStar() {
  const geometry = new THREE.SphereGeometry(0.5, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0x0099ff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}
for (let i = 0; i < 5; i++) {
  Array(500).fill().forEach(addPurpleStar);
  Array(500).fill().forEach(addBlueStar);
}
// create space background
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;
// space background on sphere
const geo = new THREE.SphereBufferGeometry(500, 128, 128);
const myTexture = new THREE.TextureLoader().load("space2.jpg");
const mat = new THREE.MeshStandardMaterial({
  map: myTexture,
  overdraw: 1,
});
const sphere = new THREE.Mesh(geo, mat);
// make material visible on inside
sphere.material.side = THREE.DoubleSide;
scene.add(sphere);
// game loop for scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
