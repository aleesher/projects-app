import React from "react";
import _isEmpty from "lodash/isEmpty";

import _get from "lodash/get";

import { TextInput } from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";

import { CardText } from "components/Card";
import { IQuestion, QuestionType } from "components/Form/models";
import { parseFieldValue } from "helpers/common";
import { ValidationError } from "components/.";

interface IProps extends IQuestion {
  type: QuestionType;
  onChange: (value: any) => void;
  hasError: boolean;
  onBlur: () => void;
}

const Info = ({ text, value, onChange, isNameField, hasError, onBlur }: IProps) => {
  const formatValue = (input: string) => {
    const formattedValue = parseFieldValue(input);
    if(isNameField) {
      const letters = /[^A-Za-z]/g;
      return formattedValue.replace(letters, "");
    }

    return formattedValue;
  }

  const handleChange = (input: string) => {
    if(value !== input) {
      onChange(input);
    }
  }

  return (
    <Column flex={1}>
      <Row flex={1} marginBottom={10} hasError={hasError}>
        <Column flex={0.4}>
          <CardText>{text}</CardText>
        </Column>
        <Column flex={0.6}>
          <TextInput style={{ flex: 1 }} value={formatValue(value)} onChangeText={handleChange} onBlur={onBlur}/>
        </Column>
      </Row>
      <ValidationError hasError={hasError} field={text}/>
    </Column>
  );
}

export default Info;
