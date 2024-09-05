import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EditorElement, useEditor } from '@/providers/editor/editor-provider';
import clsx from 'clsx';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';

type Props = {
  element: EditorElement;
  field?: any;
};

const InputComponent: React.FC<Props> = (props : Props) => {
  const { dispatch, state } = useEditor();
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleDeleteElement = () => {
    dispatch({
      type: 'DELETE_ELEMENT',
      payload: { elementDetails: props.element },
    });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch({
      type: 'CHANGE_CLICKED_ELEMENT',
      payload: {
        elementDetails: props.element,
      },
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setOffset({
      x: e.clientX - (props.element.coordinates?.x || 0),
      y: e.clientY - (props.element.coordinates?.y || 0),
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newCoordinates = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      };

      // Dispatch the updated coordinates
      dispatch({
        type: 'SET_COORDINATES',
        payload: {
          elementId: props.element.id,
          coordinates: newCoordinates,
        },
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const styles = props.element.styles;


  return (
    <div
      style={{
        ...styles,  
        position: 'absolute', // Ensure absolute positioning
        left: props.element.coordinates?.x,
        top: props.element.coordinates?.y,}}
      className={clsx(
        'p-[2px] w-full m-[5px] relative text-[16px] transition-all',
        {
          '!border-blue-500':
            state.editor.selectedElement.id === props.element.id,

          '!border-solid': state.editor.selectedElement.id === props.element.id,
          'border-dashed border-[1px] border-slate-300': !state.editor.liveMode,
        }
      )}
      onMouseDown={handleMouseDown}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <Label className={`w-full ${!Array.isArray(props.element.content) && props.element.content.labelClass}`} htmlFor={`${!Array.isArray(props.element.content) && props.element.content.id}`}>{!Array.isArray(props.element.content) && props.element.content.label}</Label>
      <Input {...props.field}
        id={`${!Array.isArray(props.element.content) && props.element.content.id}`}
        className=''
        // style={styles}
        defaultValue={`${!Array.isArray(props.element.content) && props.element.content.innerText}`}
        onBlur={(e) => {
          const inputElement = e.target as HTMLInputElement
          dispatch({
            type: 'UPDATE_ELEMENT',
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  ...props.element.content,
                  innerText: inputElement.innerText,
                  type: 'input',
                },
              },
            },
          })
        }}
      >       
      </Input>
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default InputComponent;
