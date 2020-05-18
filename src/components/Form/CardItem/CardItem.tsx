import React from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isArray from "lodash/isArray";
import _isString from "lodash/isString";

import { Column } from "dakota-2-portal/src/styles/global";

import { IQuestion, ISubQuestion } from "components/Form/models";
import { parseFieldValue } from "helpers/common";
import { showSubQuestion } from "components/withReportQueries/helpers";
import { FormContext } from "components/."
import { indicateError, parseValue } from "helpers/validation";

import * as ItemTypes from "./partials";
interface IProps extends IQuestion {
  onChange: (value: any) => void;
}

const CardItem = (props: IProps) => {
  const [isTouched, onTouch] = React.useState(false);
  const {
    type,
    subQuestions = [],
    onChange,
    isMandatory=false,
    value,
  } = props;

  const handleQuestionChange = (value) => {
    handleOnTouch();
    onChange({ ...props, subQuestions, value });
  };

  const handleSubQuestionChange = (value, i) => {
    handleOnTouch();
    const updatedSubQuestions = subQuestions.map((subQuestion, index) => index === i
      ? { ...subQuestion, value }
      : subQuestion
    );

    onChange({ ...props, subQuestions: updatedSubQuestions });
  };

  const handleOnTouch = () => {
    onTouch(true);
  }

  const Component = ItemTypes[type];

  if (Component) {
    const error = indicateError(parseValue(value, type), isTouched, isMandatory);

    return (
      <FormContext.Consumer>
      { ( { isFormSubmitted } ) => {

        if(isFormSubmitted) {
          handleOnTouch();
        }

        return (
          <Column flex={1}>
            <Component {...{ ...props,
              onChange: handleQuestionChange,
              onBlur: handleOnTouch,
              hasError: error,
              isTouched
            }}/>
            {!!subQuestions.length && subQuestions.map((subQuestion: ISubQuestion, i) => {
              const SubQuestion = ItemTypes[subQuestion.type];
              const value = parseFieldValue(props.value);
              const params = {
                ...subQuestion,
                onChange: value => handleSubQuestionChange(value, i),
                isSubQuestion: true,
                onBlur: handleOnTouch,
                hasError: indicateError(value, isTouched, subQuestion.isMandatory),
                isTouched
              };
              return (
                showSubQuestion(subQuestion, value, type) ?
                  <SubQuestion
                    key={i}
                    {...params}
                  /> : <></>
              );
              })}
          </Column>
      )}}
      </FormContext.Consumer>
    );
  }

  return null;
};

export default CardItem;
