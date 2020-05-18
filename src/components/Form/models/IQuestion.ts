import { ISubQuestion } from "./";

export enum QuestionEnum {
  SIGNATURE="SIGNATURE",
  INFO="INFO",
  RADIO="RADIO",
  PHOTO_REPORT="PHOTO_REPORT",
  TEXT="TEXT",
  DROPDOWN="DROPDOWN",
  PRICE="PRICE",
  DATE="DATE",
  CHECKBOX="CHECKBOX"
}

export type QuestionType =
  QuestionEnum.SIGNATURE |
  QuestionEnum.INFO |
  QuestionEnum.RADIO |
  QuestionEnum.PHOTO_REPORT |
  QuestionEnum.TEXT |
  QuestionEnum.DROPDOWN |
  QuestionEnum.PRICE |
  QuestionEnum.DATE |
  QuestionEnum.CHECKBOX;

export default interface IQuestion {
  type: QuestionType;
  text: string;
  value: string;
  subQuestions?: ISubQuestion[];
  queryResultField?: string;
  dependentField?: string;
  field?: string;
  isMandatory?: boolean;
  isNameField?: boolean;
  isPrefilled?: boolean;
  isSubQuestion?: boolean;
  hasSubQuestions?: boolean;
}
