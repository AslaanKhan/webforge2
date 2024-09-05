import React from "react";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Recursive from "./recursive";
import { v4 } from "uuid";
import { defaultStyles } from "@/lib/constants";
import { LucideCircleGauge, Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormElement from "./formElements";
import { Badge } from "@/components/ui/badge";

type Props = {
  element: EditorElement;
};

const FormContainer = ({ element }: Props) => {
  const { id, content, name, styles, type } = element;
  const { dispatch, state } = useEditor();
  const form = useForm();
  const handleOnDrop = (e: React.DragEvent, type: string) => {
    e.stopPropagation();
    const componentType = e.dataTransfer.getData("componentType");

    // Handle the drop event for input fields and buttons
    let newElement: EditorElement;
    switch (componentType) {
      case "input":
        newElement = {
          id: v4(),
          name: "Input Field",
          type: "input",
          styles: { color: "", ...defaultStyles },
          content: { innerText: "Input Field" },
        };
        break;
      case "text":
        newElement = {
          id: v4(),
          name: "Text Element",
          type: "text",
          styles: { color: "", ...defaultStyles },
          content: { innerText: "Text Element" },
        };
        break;
      case "button":
        newElement = {
          id: v4(),
          name: "Button",
          type: "button",
          styles: { color: "", ...defaultStyles },
          content: { innerText: "Button" },
        };
        break;
      default:
        return;
    }

    dispatch({
      type: "ADD_ELEMENT",
      payload: {
        containerId: id,
        elementDetails: newElement,
      },
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    dispatch({
      type: "REORDER_CHILD_ELEMENTS",
      payload: {
        containerId: id,
        startIndex: source.index,
        endIndex: destination.index,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={id} type="formElement">
        {(provided) => (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((val) => console.log(val))}
              style={styles}
              className={clsx("relative p-4 transition-all group", {
                "max-w-full w-full": type === "container" || type === "2Col",
                "h-fit": type === "container",
                "h-full": type === "__body",
                "overflow-scroll ": type === "__body",
                "flex flex-col md:!flex-row": type === "2Col",
                "!border-blue-500":
                  state.editor.selectedElement.id === id &&
                  !state.editor.liveMode &&
                  state.editor.selectedElement.type !== "__body",
                "!border-yellow-400 !border-4":
                  state.editor.selectedElement.id === id &&
                  !state.editor.liveMode &&
                  state.editor.selectedElement.type === "__body",
                "!border-solid":
                  state.editor.selectedElement.id === id &&
                  !state.editor.liveMode,
                "border-dashed border-[1px] border-slate-300":
                  !state.editor.liveMode,
              })}
              onDrop={(e) => handleOnDrop(e, id)}
              onDragOver={handleDragOver}
              draggable={type !== "__body"}
              onClick={handleOnClickBody}
              onDragStart={(e) => handleDragStart(e, "container")}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Badge
                className={clsx(
                  "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
                  {
                    block:
                      state.editor.selectedElement.id === element.id &&
                      !state.editor.liveMode,
                  }
                )}
              >
                {element.name}
              </Badge>
              {Array.isArray(content) &&
                content.map((childElement, index) => (
                  <Draggable
                    isDragDisabled={state.editor.liveMode}
                    key={childElement.id}
                    draggableId={childElement.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className={`${
                          childElement.styles.width
                            ? `w-${childElement.styles.width}`
                            : "w-full"
                        }`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <FormElement element={childElement} />
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
              {state.editor.selectedElement.id === element.id &&
                !state.editor.liveMode &&
                state.editor.selectedElement.type !== "__body" && (
                  <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold  -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
                    <Trash size={16} onClick={handleDeleteElement} />
                  </div>
                )}
            </form>
          </Form>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FormContainer;
