import { QuestionType } from "./IQuestion";

export default interface ISubQuestion {
  type: QuestionType;
  text: string;
  value: string;
  isSubQuestionDependent?: boolean;
  isMandatory?: boolean;
}
