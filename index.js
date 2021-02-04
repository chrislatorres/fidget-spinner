import * as THREE from 'three';
import {scene, renderer, camera, runtime, world, physics, ui, app, appManager} from 'app';

(async () => {
  const u = './fidgetspinner.glb';
  const fileUrl = app.files[u];
  const res = await fetch(fileUrl);
  const file = await res.blob();
  file.name = u;
  let mesh = await runtime.loadFile(file, {
    optimize: false,
  });
  app.object.add(mesh);
})();


let lastTimestamp = performance.now();
renderer.setAnimationLoop((timestamp, frame) => {
  timestamp = timestamp || performance.now();
  const timeDiff = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
  lastTimestamp = timestamp;

  const transforms = physics.getRigTransforms();
  const {position} = transforms[0];

  const direction = position
    .normalize()
    .multiplyScalar(10 * timeDiff);

  physics.offset.add(direction);
});
