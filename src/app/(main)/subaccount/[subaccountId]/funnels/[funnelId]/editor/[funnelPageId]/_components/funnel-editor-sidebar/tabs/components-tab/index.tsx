import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/lib/constants";
import React from "react";
import TextPlaceholder from "./text-placeholder";
import ContainerPlaceholder from "./container-placeholder";
import VideoPlaceholder from "./video-placeholder";
import TwoColumnsPlaceholder from "./two-columns-placeholder";
import LinkPlaceholder from "./link-placeholder";
import ContactFormComponentPlaceholder from "./contact-form-placeholder";
import CheckoutPlaceholder from "./checkout-placeholder";
import InputPlaceholder from "./input-placeholder";
import ButtonPlaceholder from "./button-placeholder";
import AvatarPlaceholder from "./avatar-placeholder";
import DatePickerPlaceholder from "./date-picker-placeholder";
import CheckBoxPlaceholder from "./checkbox-placeholder";
import FormContainerPlaceholder from "./form-container-placeholder";
import OTPPlaceholder from "./Otp-placeholder";
import PdfPlaceholder from "./pdf-placeholder";

type Props = {};

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode;
    label: string;
    id: EditorBtns;
    group: "layout" | "elements";
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: "Text",
      id: "text",
      group: "elements",
    },
    {
      Component: <InputPlaceholder />,
      label: "Input",
      id: "input",
      group: "elements",
    },
    {
      Component: <AvatarPlaceholder />,
      label: "Avatar",
      id: "avatar",
      group: "elements",
    },
    {
      Component: <CheckBoxPlaceholder />,
      label: "CheckBox",
      id: "checkbox",
      group: "elements",
    },
    {
      Component: <DatePickerPlaceholder />,
      label: "Date",
      id: "date",
      group: "elements",
    },
    {
      Component: <OTPPlaceholder />,
      label: "OTP",
      id: "otp",
      group: "elements",
    },
    {
      Component: <PdfPlaceholder />,
      label: "PDF-Container",
      id: "pdf",
      group: "elements",
    },
    {
      Component: <ContainerPlaceholder />,
      label: "Container",
      id: "container",
      group: "layout",
    },
    {
      Component: <FormContainerPlaceholder />,
      label: "Form",
      id: "formContainer",
      group: "layout",
    },
    {
      Component: <TwoColumnsPlaceholder />,
      label: "2 Columns",
      id: "2Col",
      group: "layout",
    },
    {
      Component: <VideoPlaceholder />,
      label: "Media",
      id: "video",
      group: "elements",
    },
    {
      Component: <ContactFormComponentPlaceholder />,
      label: "Contact",
      id: "contactForm",
      group: "elements",
    },
    {
      Component: <ButtonPlaceholder />, // Add the new placeholder here
      label: "Button",
      id: "button",
      group: "elements",
    },
    // {
    //   Component: <CheckoutPlaceholder />,
    //   label: 'Checkout',
    //   id: 'paymentForm',
    //   group: 'elements',
    // },
    {
      Component: <LinkPlaceholder />,
      label: "Link",
      id: "link",
      group: "elements",
    },
  ];

  const renderElements = (group: 'layout' | 'elements') => {
    return elements
      .filter((element) => element.group === group)
      .map((element) => (
        <div
          key={element.id}
          className="flex-col items-center justify-center flex"
        >
          {element.Component}
          <span className="text-muted-foreground hover:text-blue-600 transition">
            {element.label}
          </span>
        </div>
      ))
  }
  

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["Layout", "Elements"]}
    >
      {/* <AccordionItem
        value="Layout"
        className="px-6 py-0 border-y-[1px]"
      >
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'layout')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground hover:text-blue-600 transition">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem
        value="Elements"
        className="px-6 py-0 "
      >
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === 'elements')
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground hover:text-blue-600 transition">
                  {element.label}
                </span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem> */}
      <AccordionItem value="Layout" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {renderElements("layout")}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {renderElements("elements")}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};



export default ComponentsTab;
