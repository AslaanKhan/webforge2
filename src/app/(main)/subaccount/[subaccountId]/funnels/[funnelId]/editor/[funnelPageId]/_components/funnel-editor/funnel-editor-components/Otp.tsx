import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React from "react";

type Props = {
  element: EditorElement;
  field?: any;
  provided?: any;
};

const OTPInputComponent: React.FC<Props> = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [value, setValue] = React.useState("");

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
      ref={props.provided?.innerRef}
      {...props.provided?.draggableProps}
      {...props.provided?.dragHandleProps}
      // style={styles}
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
      <Label
        className={`${
          !Array.isArray(props.element.content) &&
          props.element.content.labelClass
        }`}
        htmlFor={`${
          !Array.isArray(props.element.content) && props.element.content.id
        }`}
      >
        {!Array.isArray(props.element.content) && props.element.content.label}
      </Label>
      <InputOTP
        value={value}
        onChange={(value) => setValue(value)}
        maxLength={6}
        {...props.field}
        id={`${
          !Array.isArray(props.element.content) && props.element.content.id
        }`}
        defaultValue={`${
          !Array.isArray(props.element.content) &&
          props.element.content.innerText
        }`}
        onBlur={(e) => {
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  ...props.element.content,
                  innerText: value,
                  type: "otp",
                },
              },
            },
          });
        }}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        {value === "" ? (
          <>Enter your one-time password.</>
        ) : (
          <>You entered: {value}</>
        )}
      </div>

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

export default OTPInputComponent;
