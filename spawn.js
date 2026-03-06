let rnd = (l,u) => Math.random() * (u-l) + l;

let scene, camera, portal;


window.addEventListener("DOMContentLoaded", function () {

  scene = document.querySelector("a-scene");
  
  // Wait for A-Frame to load
  if (scene) {
    scene.addEventListener("loaded", function() {
      camera = document.querySelector("a-camera");
      portal = document.querySelector("#portalModel");
      
      console.log("A-Frame loaded. Camera:", !!camera, "Portal:", !!portal);
      
      setInterval(checkPortalDistance, 200);
      setTimeout(loop, 100);
    });
  }
});


function checkPortalDistance(){

  if(!camera || !portal) {
    console.log("Portal or camera not found", {camera: !!camera, portal: !!portal});
    return;
  }
  
  const camPos = new THREE.Vector3();
  const portalPos = new THREE.Vector3();

  camera.object3D.getWorldPosition(camPos);
  portal.object3D.getWorldPosition(portalPos);

  const dist = camPos.distanceTo(portalPos);

  console.log("distance:", dist, "camera pos:", camPos, "portal pos:", portalPos);

  if(dist <= 50){
    console.log("within portal, redirecting");
    window.location.href = "index.html";
  }

}


function loop(){

  window.requestAnimationFrame(loop);
}


function distance(obj1,obj2){

  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;

  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(
    Math.pow(x1-x2,2) +
    Math.pow(y1-y2,2) +
    Math.pow(z1-z2,2)
  );

  return d;
}