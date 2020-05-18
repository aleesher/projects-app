import * as yup from "yup";

export const FAQSchema = yup.object({
  header: yup.string().required(),
  question: yup.string().required(),
  answer: yup.string().required(),
});

export interface IFAQ {
  id?: string;
  question: string;
  answer: string;
  header: string;
  tempId?: string;
  projectNumber: string;
}
