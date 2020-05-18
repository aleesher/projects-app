import React from "react";
import _isEmpty from "lodash/isEmpty";

import { Column, Row } from "dakota-2-portal/src/styles/global";

import { CardText } from "components/Card";
import { IQuestion, QuestionType } from "components/Form/models";
import { VoiceInput, AddMore, ValidationError } from "components/.";
interface IProps extends IQuestion {
  type: QuestionType;
  onChange: (value: any) => void;
  onBlur: () => void;
  hasError: object;
}

const getNewText = () => ({ text: "", id: `${Math.random()}` });

const Text = ({ text, value, onChange, onBlur, hasError }: IProps) => {
  const { hasAddMore, values: info, limit=6 } = JSON.parse(value);

  const handleChange = (values) => {
    onChange(JSON.stringify({ hasAddMore, values }));
  };

  const handleTextChange = (id, value) => {
    const updatedInfo = info.map(item => item.id === id ? { ...item, text: value } : item);

    handleChange(updatedInfo);
  };

  const addInfo = () => {
    const updatedInfo = [...info, getNewText()];

    handleChange(updatedInfo);
  };

  return (
    <Column flex={1}>
      {info.map(({ id, text: infoValue }) => {
        return (
          <Column flex={1} key={id}>
            <Row
              flexAlign="flex-start"
              hasError={hasError[id]}
              flex={1}
              marginBottom={26}
            >
              <Column flex={0.2} paddingTop={5}>
                <CardText>{text}</CardText>
                <CardText
                  size="small"
                  color="echoBlue"
                >
                  Max 250 tekens
                </CardText>
              </Column>
              <Column flex={0.8}>
                <VoiceInput onBlur={onBlur} onChangeText={value => handleTextChange(id, value)} value={infoValue} />
              </Column>
            </Row>
            <ValidationError hasError={hasError[id]} field={text}/>
          </Column>
      )})}
      <Row>
      {hasAddMore && info.length < limit && (
        <AddMore
          marginTop={10}
          onClick={addInfo}
          hasAddIcon
          text="Voeg meer toe" />
      )}
      </Row>
    </Column>
  );
};

export default Text;