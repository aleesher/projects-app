import { ICard } from ".";

export default interface IReport {
  title: string;
  projectNumber?: string;
  reportType?: number;
  cards: ICard[];
}
