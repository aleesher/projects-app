import React from "react";
import moment from "moment";

import { Column, Row } from "dakota-2-portal/src/styles/global";
import { CardText } from "components/Card";

import { IQuestion, QuestionType } from "components/Form/models";
import { Datepicker, ValidationError } from "components/.";

interface IProps extends IQuestion {
  type: QuestionType;
  onChange: (value: any) => void;
  hasError: boolean;
  onBlur: () => void;
}

const Date = ({ text, value, onChange, onBlur, hasError }: IProps) => {
  const formatDate = (date: string) =>
    !!date ? date : moment().format("DD-MM-YYYY");

  return (
    <Column flex={1}>
      <Row flex={1} marginBottom={10} hasError={hasError}>
        <Column flex={0.4}>
          <CardText>{text}</CardText>
        </Column>
        <Column flex={0.6}>
          <Datepicker onBlur={onBlur} value={formatDate(value)} onChange={onChange} />
        </Column>
      </Row>
      <ValidationError hasError={hasError} field={text}/>
    </Column>
  );
}

export default Date;
