import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorElement } from "@/providers/editor/editor-provider";
import React from "react";
import InputComponent from "./input";
import TextComponent from "./text";
import ButtonComponent from "./button";

type FormElementProps = {
  element: EditorElement; // Assuming EditorElement is the type used in your context
};

const FormElement = ({ element }: FormElementProps) => {
  const { type, content } = element;

  switch (type) {
    case "input":
      return (
        <FormField
          name={element.id}
          render={({ field }) => (
            <FormItem>              
              <FormControl>
                    <InputComponent field={field} element={element}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      );
    case "text":
      return (
        <TextComponent element={element} />
      );
    case "button":
      return (
        <ButtonComponent element={element} />
      );

    // Add more cases for other form elements like select, textarea, etc.

    default:
      return null;
  }
};

export default FormElement;
