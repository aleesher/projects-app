import React from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

import { Dropdown } from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";

import { CardText } from "components/Card";
import ValidationError from "components/ValidationError";
import { IQuestion, QuestionType } from "components/Form/models";

interface IProps extends IQuestion {
  type: QuestionType;
  onChange: (value: any) => void;
  hasError: boolean;
  onBlur: () => void;
}

const DROPDOWN = ({ text, value, onChange, hasError, onBlur, isPrefilled=false }: IProps) => {
  const { value: defaultValue, options } = JSON.parse(value);

  const handleChange = ({ value }) => {
    const newValue = JSON.stringify({ value, options });
    onChange(newValue);
  };

  return (
    <Column flex={1}>
      <Row flex={1}
        marginBottom={26}
        hasError={hasError}>
        <Column flex={0.4}>
          <CardText>{text}</CardText>
        </Column>
        <Column flex={0.6}>
          <Dropdown
            options={options}
            defaultValue={defaultValue}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={isPrefilled}
          />
        </Column>
      </Row>
      <ValidationError hasError={hasError} field={text}/>
    </Column>
  );
};

export default DROPDOWN;
