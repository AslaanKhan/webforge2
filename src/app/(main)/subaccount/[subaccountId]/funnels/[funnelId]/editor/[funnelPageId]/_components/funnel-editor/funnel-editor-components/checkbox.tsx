import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
};

const CheckBoxComponent: React.FC<Props> = (props: Props) => {
  const { dispatch, state } = useEditor();

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const styles = props.element.styles;

  return (
    <div
      style={styles}
      className={clsx("p-[2px] m-[5px] relative text-[16px] transition-all", {
        "!border-blue-500":
          state.editor.selectedElement.id === props.element.id,

        "!border-solid": state.editor.selectedElement.id === props.element.id,
        "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
      })}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <div className="flex items-center space-x-2">
        <Checkbox
          // className="w-full"
          contentEditable={!state.editor.liveMode}
          id={`${
            !Array.isArray(props.element.content) && props.element.content.id
          }`}
          onClick={(e) => {
            const buttonElement = e.target as HTMLButtonElement;
            const isChecked = buttonElement.getAttribute('data-state') === 'checked';
            console.log(isChecked)
            dispatch({
              type: "UPDATE_ELEMENT",
              payload: {
                elementDetails: {
                  ...props.element,
                  content: {
                    ...props.element.content,
                    innerText: isChecked?.toString(), // Store the checkbox state as a string
                    type: "checkbox",
                  },
                },
              },
            });
          }}
        />
        <label
          htmlFor={`${
            !Array.isArray(props.element.content) && props.element.content.id
          }`}
          className={`text-${
            !Array.isArray(props.element.content) &&
            props.element.content.labelClass
          } font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
        >
          {!Array.isArray(props.element.content) && props.element.content.label}
        </label>
      </div>
      {/* <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div> */}
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

export default CheckBoxComponent;
