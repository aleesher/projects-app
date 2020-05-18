import React from "react";
import { TextInputProps } from "react-native";

import {
  TextAreaWrapper,
  Textarea,
  ButtonWrapper,
  TextAreaButton
} from "../Textarea";

 interface IVoiceInputProps extends TextInputProps {
   defaultValue?: string;
   value?: string;
   onChange?: (value: any) => void;
   height?: number;
   onBlur?: () => void;
 }

export default ({
  onChange,
  defaultValue,
  value,
  height=186,
  onBlur,
  ...props
}: IVoiceInputProps) => (
  <TextAreaWrapper height={height}>
    <Textarea
      onChangeText={onChange}
      height={height}
      onBlur={onBlur}
      {...props}
    >
      { defaultValue || value }
    </Textarea>
  </TextAreaWrapper>
);