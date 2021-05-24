import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PointLight } from 'three';

const scene = new THREE.Scene();

var perspectiveCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
perspectiveCamera.position.setZ( 30 );

renderer.render( scene, perspectiveCamera );

const geometry = new THREE.DodecahedronGeometry( 8, 1 );
const marsTexture = new THREE.TextureLoader().load('mars.png');


const material = new THREE.MeshBasicMaterial( { map: marsTexture  } );

const dodecahedron = new THREE.Mesh( geometry, material );

scene.add( dodecahedron );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set( 20, 20, 20 );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.13);

scene.add( pointLight, ambientLight );

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(150, 10);
scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(perspectiveCamera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.5, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xE3FDFF  } );
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 150 ) );

  star.position.set( x, y, z );
  scene.add( star );
}

Array(50).fill().forEach( addStar )

const spaceTexture = new THREE.TextureLoader().load('space1.png');
scene.background = spaceTexture;

function animate(){
  requestAnimationFrame( animate );

  dodecahedron.rotation.x += 0.0005;
  dodecahedron.rotation.y += 0.001;
  dodecahedron.rotation.z += 0.0003;

  
  perspectiveCamera.aspect = window.innerWidth / window.innerHeight;  
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );

  controls.update();

  renderer.render( scene, perspectiveCamera );
}

animate()