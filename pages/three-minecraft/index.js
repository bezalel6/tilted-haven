import { useEffect } from "react";
import styles from "@styles/Minecraft.module.css";
import * as THREE from "three";
import { PointerLockControls } from "./lib/PointerLockControls";
import Stats from "./stats.module.js";
import { BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader } from "three";

const initScene = () => {
  //   const stats = new Stats();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  let stats;
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 30;

  const controls = new PointerLockControls(camera, renderer.domElement);
  //   controls.lookSpeed = 0.8;
  //   controls.movementSpeed = 5;
  scene.add(controls.getObject());
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  var groundMaterial = new THREE.MeshBasicMaterial({
    opacity: 0,
    transparent: true,
  });

  var mesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(100, 100),
    groundMaterial
  );

  mesh.renderOrder = -1;
  mesh.position.y = -10;
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add(mesh);

  const raycaster = new THREE.Raycaster();
  let intersections = {};
  function onPointerMove(event) {
    raycaster.setFromCamera(new THREE.Vector2(), camera);
    let intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      intersects = intersects.filter(
        (intersect) =>
          intersect.object && intersect.object.constructor.name == "Cube"
      );
      // sort intersections by lowest distance first
      intersects.sort((a, b) => a.distance - b.distance);
      if (intersects.length > 0) {
        intersects = [intersects[0]];
      }
    }
    intersections.forward = intersects;
    raycaster.setFromCamera(new THREE.Vector2(0, -1), camera);

    intersects = raycaster.intersectObjects(scene.children);
    intersects.sort((a, b) => a.distance - b.distance);
    intersections.bottom = intersects[0];
  }

  var cubeGeometry = new THREE.CircleGeometry(1, 100);
  var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0x0,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8,
    depthTest: false,
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  camera.add(cube);
  cube.position.set(0, 0, -55);

  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
  }

  // Array(200).fill().forEach(addStar);

  const speed = 0.5;
  const clicked = {};
  stats = new Stats();
  document.body.appendChild(stats.dom);

  const anim = () => {
    requestAnimationFrame(anim);
    stats.begin();
    scene.children.forEach((child) => {
      if (child.material) child.material.wireframe = false;
    });

    for (
      let i = 0;
      intersections.forward && i < intersections.forward.length;
      i++
    ) {
      intersections.forward[i].object.material.wireframe = true;
    }
    if (controls.goDown) {
      controls.moveUp(-1);
    }
    Object.keys(clicked).forEach((key) => {
      if (!clicked[key]) return;
      if (key === "w") {
        controls.moveForward(speed);
      } else if (key === "s") {
        controls.moveForward(-speed);
      } else if (key === "a") {
        controls.moveRight(-speed);
      } else if (key === "d") {
        controls.moveRight(speed);
      } else if (key == " ") {
        controls.moveUp(1);
        // controls.canJump = !controls.canJump;
      }
    });
    renderer.render(scene, camera);

    stats.end();
  };
  //listen for mouse right click
  document.addEventListener("mousedown", (event) => {
    // if left click
    if (event.button === 0) {
      if (intersections.forward && intersections.forward.length)
        scene.remove(intersections.forward[0].object);
    }

    if (event.button !== 2) {
      return;
    }
    event.preventDefault();

    //check if there is a cube object in front of the camera

    intersections.forward &&
      intersections.forward.forEach((intersect) => {
        if (intersect.object.constructor.name === "Cube") {
          // add a new cube in the position of the old one
          let { x, y, z } = intersect.object.position;
          if (intersect.face.normal.x === 1) {
            x += Cube.size;
          }
          if (intersect.face.normal.x === -1) {
            x -= Cube.size;
          }
          if (intersect.face.normal.y === 1) {
            y += Cube.size;
          }
          if (intersect.face.normal.y === -1) {
            y -= Cube.size;
          }
          if (intersect.face.normal.z === 1) {
            z += Cube.size;
          }
          if (intersect.face.normal.z === -1) {
            z -= Cube.size;
          }
          const cube = new Cube(x, y, z);
          scene.add(cube);
        }
      });
    return false;
  });
  document.addEventListener("pointermove", onPointerMove, false);

  //   mouse click
  document.addEventListener("click", (e) => {
    controls.lock();
  });
  document.addEventListener("keydown", (e) => {
    clicked[e.key] = true;
    if (e.shiftKey) {
      controls.goDown = true;
    }
  });
  document.addEventListener("keyup", (e) => {
    clicked[e.key] = false;
    if (e.key == "Shift") {
      console.log("turning off");
      controls.goDown = false;
    }
  });
  // listen to pointer lock
  document.addEventListener("pointerlockchange", (e) => {
    handleInstructions();
  });
  const handleInstructions = () => {
    const element = document.querySelector(".instructions");
    element.setAttribute("hide", !!document.pointerLockElement);
  };
  class Cube extends THREE.Mesh {
    static texture = new THREE.TextureLoader().load(
      "/minecraft/grass/block2.png"
    );
    static size = 3;
    constructor(x, y, z) {
      // const mesh = new THREE.Mesh(
      // new THREE.BoxGeometry(3, 3, 3),
      // new THREE.MeshBasicMaterial({ map: Cube.texture })
      // );
      const geometry = new THREE.BoxGeometry(Cube.size, Cube.size, Cube.size);
      // const material = new THREE.MeshBasicMaterial({
      //   map: Cube.texture,
      //   wireframe: false,
      // });

      const loader = new THREE.TextureLoader();
      const materialArr = [
        new THREE.MeshBasicMaterial({
          map: loader.load("/minecraft/grass/side.jpg"),
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load("/minecraft/grass/side.jpg"),
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load("/minecraft/grass/top.jpg"),
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load("/minecraft/grass/bottom.jpg"),
        }),
        new THREE.MeshBasicMaterial({
          map: loader.load("/minecraft/grass/side.jpg"),
        }),

        new THREE.MeshBasicMaterial({
          map: loader.load("/minecraft/grass/side.jpg"),
        }),
      ];

      super(geometry, materialArr);
      this.castShadow = true;
      this.receiveShadow = true;
      this.position.set(x, y, z);
    }
  }

  const ROWS = 10,
    COLS = 10;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      scene.add(new Cube(i * Cube.size, -10, j * Cube.size));
    }
  }

  scene.background = new TextureLoader().load("/minecraft/space.jpg");
  anim();
};

export default function ThreeMinecraft() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initScene();
    }
  }, []);
  return (
    <>
      <div className="instructions">
        <h1>Minecraft</h1>
        my very inefficient and stupid implementation of Minecraft using threejs
        <h6 className="clicky">click to start</h6>
        <p>wasd to move</p>
        <p>space to ascend</p>
        <p>shift to descend</p>
        <p>left click to break</p>
        <p>right click to build</p>
      </div>
      <canvas className={styles.bg} id="bg"></canvas>
    </>
  );
}
