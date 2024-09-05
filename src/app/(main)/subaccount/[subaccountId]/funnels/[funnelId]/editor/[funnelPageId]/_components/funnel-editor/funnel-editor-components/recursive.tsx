import { EditorElement } from '@/providers/editor/editor-provider'
import React from 'react'
import TextComponent from './text'
import Container from './container'
import VideoComponent from './video'
import LinkComponent from './link-component'
import ContactFormComponent from './contact-form-component'
import Checkout from './checkout'
import ButtonComponent from './button'
import InputComponent from './input'
import AvatarComponent from './avatar'
import DatePickerComponent from './date-picker'
import CheckBoxComponent from './checkbox'
import FormContainer from './form-container'
import OTPInputComponent from './Otp'

type Props = {
  element: EditorElement
}

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case 'text':
      return <TextComponent element={element} />
    case 'input':
      return <InputComponent element={element} />
    case 'avatar':
      return <AvatarComponent element={element} />
    case 'date':
      return <DatePickerComponent element={element} />
    case 'otp':
      return <OTPInputComponent element={element} />
    case 'checkbox':
      return <CheckBoxComponent element={element} />
    case 'button':
      return <ButtonComponent element={element} />
    case 'formContainer':
        return <FormContainer element={element} />;
    case 'container':
      return <Container element={element} />
    case 'video':
      return <VideoComponent element={element} />
    case 'contactForm':
      return <ContactFormComponent element={element} />
    case 'paymentForm':
      return <Checkout element={element} />
    case '2Col':
      return <Container element={element} />
    case '__body':
      return <Container element={element} />
    case 'link':
      return <LinkComponent element={element} />
    default:
      return null
  }
}

export default Recursive
