import React from "react";

import { TextedRadio, CheckboxContainer } from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";

import { CardText } from "components/Card";
import { IQuestion, QuestionType } from "components/Form/models";

import { RadioWrapper } from "./styles";

interface IProps extends IQuestion {
  type: QuestionType;
  onChange: (value: any) => void;
}

const Checkbox = ({ text, value, onChange, isSubQuestion=false }: IProps) => {
  const { value: selectedValue, options, info } = JSON.parse(value);

  const handleChange = (newValue) => {
    onChange(JSON.stringify({ options, value: newValue }));
  };

  const params = !isSubQuestion ? {
    flexRatio: 0.4,
    flexJustify: "flex-start"
  } : {
    flexRatio: 0.6,
    flexJustify: "flex-end"
  };

  return (
    <RadioWrapper
      marginBottom={10}
      flex={1}
      isSubQuestion={isSubQuestion}>
      <CheckboxContainer
        onChange={handleChange}
        label={text}
        options={options}
        defaultValue={selectedValue}
        flexRatio={params.flexRatio}
        flexJustify={params.flexJustify}
      />
    </RadioWrapper>
  );
}

export default Checkbox;
