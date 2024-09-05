"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { format, parse } from "date-fns";
import { CalendarIcon, Trash } from "lucide-react";
import React, { useEffect } from "react";

type Props = {
  element: EditorElement;
};

const DatePickerComponent: React.FC<Props> = (props: Props) => {
  const { dispatch, state } = useEditor();
  const initialDate = !Array.isArray(props.element.content)  && props.element.content?.innerText
    ? parse(props.element.content.innerText, "P", new Date())
    : undefined;
  const [date, setDate] = React.useState<Date | undefined>(initialDate);



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

  useEffect(() => {
    dispatch({
      type: 'UPDATE_ELEMENT',
      payload: {
        elementDetails: {
          ...props.element,
          content: {
            ...props.element.content,
            innerText: date?.toLocaleDateString(),
            type: 'date',
          },
        },
      },
    })
  }, [date])

  const styles = props.element.styles;

  return (
    <div
      style={styles}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500":
            state.editor.selectedElement.id === props.element.id,

          "!border-solid": state.editor.selectedElement.id === props.element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "min-w-[180px] justify-start text-left w-full font-normal",
              !date && "text-muted-foreground"
            )}
            contentEditable={!state.editor.liveMode}           
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

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

export default DatePickerComponent;
