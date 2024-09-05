import { EditorBtns } from '@/lib/constants';
import { Calendar, CircleUserRound, Icon, MousePointerClickIcon } from 'lucide-react';
import React from 'react';

type Props = {};

const DatePickerPlaceholder: React.FC<Props> = () => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData('componentType', type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, 'date');
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Calendar size={40} className="text-muted-foreground" />
    </div>
  );
};

export default DatePickerPlaceholder;
