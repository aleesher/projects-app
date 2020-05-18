import React from "react";

import { TextedRadio } from "dakota-2-portal/src/components";
import { Column, Row } from "dakota-2-portal/src/styles/global";

import { CardText } from "components/Card";
import { ValidationError } from "components/.";
import { IQuestion, QuestionType } from "components/Form/models";

import { RadioWrapper } from "./styles";
interface IProps extends IQuestion {
  type: QuestionType;
  onChange: (value: any) => void;
  hasError: boolean;
}

const Radio = ({ text, value, onChange, hasError, isSubQuestion=false }: IProps) => {
  const { value: selectedValue, options, info } = JSON.parse(value);

  const handleChange = (newSelectedValue) => {
    const newValue = JSON.stringify({ options, value: newSelectedValue });
    onChange(newValue);
  };

  const params = !isSubQuestion ? {
    flexRatio: 0.4, flexJustify: "flex-start", marginType: "margin-right",
  } : {
    flexRatio: 0.6, flexJustify: "flex-end", marginType: "margin-left",
  };

  return (
    <RadioWrapper
      flex={1}
      isSubQuestion={isSubQuestion}>
      <Row flex={1} marginBottom={10} hasError={hasError}>
        <Column flex={params.flexRatio}>
          <CardText>{text}</CardText>
        </Column>
        <Column flex={1 - params.flexRatio}>
          <TextedRadio
            text=""
            options={options}
            active={selectedValue}
            onPress={handleChange}
            flexRatio={0.6}
            flexJustify={params.flexJustify}
            marginType={params.marginType}
          />
        </Column>
      </Row>
      { info &&
        <Row>
          <CardText color="gray">
            Indien je deze vraag met 'ja' beantwoord, vul dan ook het incidenten rapport in
          </CardText>
        </Row>
      }
      <ValidationError hasError={hasError} field={text}/>
    </RadioWrapper>
  );
}

export default Radio;
