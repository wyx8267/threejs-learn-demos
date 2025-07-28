import { useEffect, useRef, useState } from "react";
import "./App.css";
import { init } from "./3d-init";
import gsap from "gsap";

function App() {
  const cameraRef = useRef();

  useEffect(() => {
    const dom = document.getElementById("content");
    const { scene, camera } = init(dom);
    cameraRef.current = camera;

    return () => {
      dom.innerHTML = "";
    };
  }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const camera = cameraRef.current;
    const ele = document.querySelector(".app");

    const handler = () => {
      setOpen(true);
      // camera.position.set(500, 100, 0);

      gsap.to(camera.position, {
        x: 500,
        y: 100,
        z: 0,
        duration: 1,
      });
    };
    ele.addEventListener("dblclick", handler);

    const handler2 = () => {
      setOpen(false);
      camera.position.set(1200, 500, 0);
    };
    document.addEventListener("click", handler2);
    return () => {
      ele.removeEventListener("dblclick", handler);
      document.removeEventListener("click", handler2);
    };
  }, []);

  return (
    <div id="main">
      <div id="content"></div>
      <div id="desktop" style={{ display: "none" }}>
        <img className="bg" src="./bg.png" />
        <div className="app" onDoubleClick={() => setOpen(true)}>
          <div className="logo"></div>
          <div className="name">浏览器</div>
        </div>
        <iframe className="browser" src="https://sogou.com/" style={{ display: open ? "block" : "none" }} />
      </div>
    </div>
  );
}

export default App;
