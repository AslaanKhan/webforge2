import { EditorBtns } from '@/lib/constants';
import { CheckCheckIcon, CircleUserRound, Icon, MousePointerClickIcon } from 'lucide-react';
import React from 'react';

type Props = {};

const CheckBoxPlaceholder: React.FC<Props> = () => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData('componentType', type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, 'checkbox');
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <CheckCheckIcon size={40} className="text-muted-foreground" />
    </div>
  );
};

export default CheckBoxPlaceholder;
