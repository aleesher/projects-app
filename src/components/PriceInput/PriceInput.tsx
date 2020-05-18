import React from "react";
import _isString from "lodash/isString";

import { Column, Row } from "dakota-2-portal/src/styles/global";

import { EuroSign, PriceTextInput } from "./styles";

interface IPriceInputProps {
  onChange?: (value: any) => void;
  value?: number | string;
  onBlur?: () => void;
}

export default ({
  value,
  onChange = () => null,
  onBlur= () => null
}: IPriceInputProps) => {
  const handleChange = (input: string) => {
    if(!isNaN(Number(input)) && value !== input) {
      onChange(input);
    }
  }
  return (
    <Row flexAlign="flex-start">
      <EuroSign>€</EuroSign>
      <Column flex={1}>
        <PriceTextInput
          onChangeText={handleChange}
          keyboardType="numeric"
          value={value || 0}
          style={{width: '100%'}}
          onBlur={onBlur}
        />
      </Column>
    </Row>
  );
}
