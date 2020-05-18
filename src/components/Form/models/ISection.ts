import { IQuestion } from ".";

export default interface ISection {
  title: string;
  questions: IQuestion[];
}
