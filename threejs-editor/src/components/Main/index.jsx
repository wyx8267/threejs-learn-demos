import { useEffect, useRef } from "react";
import { init } from "./init";
import { MeshTypes, useThreeStore } from "../../store";
import * as THREE from "three";

function Main() {
  const { data, addMesh } = useThreeStore();

  const sceneRef = useRef();

  useEffect(() => {
    const dom = document.getElementById("threejs-container");
    const { scene } = init(dom, data);

    sceneRef.current = scene;

    return () => {
      dom.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    data.meshArr.forEach((item) => {
      if (item.type === MeshTypes.Box) {
        const {
          width,
          height,
          depth,
          material: { color },
        } = item.props;
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshPhongMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = item.name;
        scene.add(mesh);
      } else if (item.type === MeshTypes.Cylinder) {
        const {
          radiusTop,
          radiusBottom,
          height,
          material: { color },
          position,
        } = item.props;
        const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height);
        const material = new THREE.MeshPhongMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = item.name;
        mesh.position.copy(position);
        scene.add(mesh);
      }
    });
  }, [data]);

  return (
    <div className="Main" id="threejs-container"></div>
  );
}

export default Main;
