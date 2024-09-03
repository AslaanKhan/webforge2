import { EditorBtns } from "@/lib/constants";
import { TextCursorIcon } from "lucide-react";
import React, { useState } from "react";

type Props = {
  onTextChange?: (text: string) => void;
};

const InputPlaceholder: React.FC<Props> = () => {

  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, 'input');
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <TextCursorIcon size={40} className="text-muted-foreground" />
    </div>
  );
};

export default InputPlaceholder;
