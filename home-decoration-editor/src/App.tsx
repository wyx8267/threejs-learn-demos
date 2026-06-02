import "./App.scss";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Main, { getGLTFLoader } from "./components/Main";
import Properties from "./components/Properties";
import { useEffect, useState } from "react";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const gltfLoader = getGLTFLoader();

export const modelMap: Record<string, Promise<GLTF>> = {
  "./bed.glb": gltfLoader.loadAsync("./bed.glb"),
  "./dining-table.glb": gltfLoader.loadAsync("./dining-table.glb"),
  "./door.glb": gltfLoader.loadAsync("./door.glb"),
  "./window.glb": gltfLoader.loadAsync("./window.glb"),
};

function App() {
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    Promise.all(Object.values(modelMap)).then(() => {
      setModelLoaded(true);
    });
  }, []);

  return (
    <div>
      {modelLoaded ? (
        <div className="wrap">
          <Header />
          <div className="editor">
            <Menu />
            <Main />
            <Properties />
          </div>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default App;
