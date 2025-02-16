import { Input } from "@/components/ui/input";
import { useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import { ONE_SEAT_DESK_SETTINGS } from "../../utils";

export default function TextNodeInput({
  id,
  text,
}: {
  id: string;
  text: string;
}) {
  const [value, setValue] = useState(text);

  const { setNodes } = useReactFlow();

  function handleSave() {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          node.data.text = value;
        }
        return node;
      })
    );
  }

  useEffect(() => {
    const delaydeBounce = setTimeout(() => {
      handleSave();
    }, 1000);
    return () => clearTimeout(delaydeBounce);
  }, [value]);

  return (
    <Input
      style={{
        width: `${
          value.length > 0 ? value.length * 15 : ONE_SEAT_DESK_SETTINGS.width
        }px`,
      }}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="text-center text-lg md:text-lg border-none shadow-none"
    />
  );
}
