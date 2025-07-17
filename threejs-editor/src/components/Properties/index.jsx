import { useEffect, useState } from "react";
import { useThreeStore } from "../../store";
import { Segmented, Tree } from "antd";
import Info from "./Info";
import MocanoEditor from '@monaco-editor/react'

function Properties() {
  const { data, selectedObj, scene, setSelectedObjName } = useThreeStore();
  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    if (scene) {
      setTreeData([
        {
          title: "Scene",
          key: "root",
          children: scene,
        },
      ]);
    }
  }, [scene]);

  function handleSelect(selectKeys, info) {
    const name = info.node.name;
    setSelectedObjName(name);
  }

  const [key, setKey] = useState("属性");

  return (
    <div className="Properties">
      <Segmented value={key} onChange={setKey} block options={["属性", "json"]} />
      {key === "属性" ? (
        <div>
          <Tree treeData={treeData} expandedKeys={["root"]} onSelect={handleSelect} />
          <Info />
        </div>
      ) : null}
      {key === "json" ? (
        <MocanoEditor height={'90%'} path='code.json' language='json' value={JSON.stringify(data, null, 2)}/>
      ) : null}

      {/* <div>selectedObj: {selectedObj?.name}</div> */}
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}

export default Properties;
