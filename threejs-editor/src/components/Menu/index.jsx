import { useThreeStore } from "../../store";
import "./index.scss";
import { Menu as AntdMenu } from "antd";

const items = [
  {
    label: "Add",
    key: "add",
    children: [
      {
        type: "group",
        label: "Mesh",
        children: [
          { label: "立方体", key: "Box" },
          { label: "圆柱", key: "Cylinder" },
        ],
      },
      {
        type: "group",
        label: "Light",
        children: [
          { label: "点光源", key: "PointLight" },
          { label: "平行光", key: "DirectionalLight" },
        ],
      },
    ],
  },
];

function Menu() {
  const { addMesh } = useThreeStore();
  function handleClick(e) {
    addMesh(e.key);
  }
  return (
    <div className="Menu">
      <AntdMenu items={items} onClick={handleClick} mode="horizontal" style={{ height: 60 }} />
    </div>
  );
}

export default Menu;
