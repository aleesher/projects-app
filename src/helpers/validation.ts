import _isEmpty from "lodash/isEmpty";
import _isArray from "lodash/isArray";
import _isString from "lodash/isString";
import moment from "moment";

import {
  IReport,
  ICard,
  ISection,
  IQuestion,
  QuestionEnum,
  QuestionType
} from "components/Form/models";

const hasError = (val: string, isTouched: boolean, isMandatory: boolean) =>
    (_isEmpty(val) || !val.length) && isTouched && isMandatory;

export const indicateError = (val: any, isTouched: boolean, isMandatory: boolean=false) =>
  !_isArray(val)
    ? hasError(val, isTouched, isMandatory)
    : val.reduce((acc, { text, id, image, price }) =>
        hasError(
          _isString(image) ? image : price ? price : text,
          isTouched,
          isMandatory
        ) ? {...acc, [id]: true } : acc, {});

export const parseValue = (value: any, type: QuestionType) => {
  switch (type) {
    case QuestionEnum.DROPDOWN:
    case QuestionEnum.RADIO: {
      const { value: parsedValue } = JSON.parse(value);
      return parsedValue;
    }
    case QuestionEnum.TEXT:
    case QuestionEnum.PRICE: {
      const { values } = JSON.parse(value);
      return values;
    }
    case QuestionEnum.PHOTO_REPORT: {
      const { reports } = JSON.parse(value);
      return reports;
    }
    default: {
      return value;
    }
  }
};

export const validateBeforeSubmit = (report: IReport): { errors: boolean[], report: IReport } => {
  const errors: boolean[] = [];
  const cards = report.cards.map((card: ICard) => {
    const sections = card.sections.map((section: ISection) => {
      const questions = section.questions.map((question: IQuestion) => {
        const { value, type, isMandatory=false } = question;

        if(type === QuestionEnum.DATE && !!value) {
          return { ...question, value: moment().format("DD-MM-YYYY") }
        }

        const error = indicateError(parseValue(value, type), true, isMandatory);

        if(!_isEmpty(error) || error === true) {
          errors.push(error);
        }

        return question;
      })
      return { ...section, questions }
    })
    return { ...card, sections }
  });

  return { errors, report: { ...report, cards } };
}