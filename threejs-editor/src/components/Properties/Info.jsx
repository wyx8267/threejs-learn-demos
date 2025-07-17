import { useForm } from "antd/es/form/Form";
import { useThreeStore } from "../../store";
import { ColorPicker, Form, Input } from "antd";
import { useEffect } from "react";

function Info() {
  const { selectedObj, updateMaterial } = useThreeStore();

  function handleValuesChange(changeValues) {
    const colorStr = changeValues.color.toHexString();
    updateMaterial(selectedObj.name, { color: colorStr });
  }

  const [form] = useForm();

  useEffect(() => {
    if(selectedObj?.isMesh) {
        form.setFieldValue('color', selectedObj.material.color.getHexString());
    }
  }, [selectedObj])

  return (
    <div className="Info">
      {selectedObj?.isMesh ? (
        <Form
        form={form}
          initialValues={{
            color: selectedObj.material.color.getHexString(),
          }}
          onValuesChange={handleValuesChange}
        >
          <Form.Item label="材质颜色" name="color">
            <ColorPicker />
          </Form.Item>
        </Form>
      ) : // <div>
      //   <div>几何体：{selectedObj.geometry.type}</div>
      //   <div>材质：{selectedObj.material.type}</div>
      // </div>
      null}
    </div>
  );
}
export default Info;
