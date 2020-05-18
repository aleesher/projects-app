import React from "react";

import {
  Question,
  Answer,
  QuestionContainer,
  ExpandIcon,
  RemoveIcon,
  EditIcon,
  IconWrapper
} from "../styles";

import { IFAQ } from "screens/CreateQuestion/constants";

interface IProps  {
  faq: IFAQ;
  idField: string;
  onToggleQuestion: (value: string) => void;
  questionId: string | null;
  goToFAQ: (faq: IFAQ) => void;
  deleteFAQ: (faq: IFAQ) => void;
}

const FAQ = ({
  faq,
  idField,
  onToggleQuestion,
  questionId,
  goToFAQ,
  deleteFAQ
}: IProps) => {

    return (
      <QuestionContainer
        key={faq[idField]}
        onPress={() => onToggleQuestion(faq[idField])}>
        <Question>Hoofd: {faq.header}</Question>
        <ExpandIcon expanded={faq[idField] === questionId}/>
        { faq.tempId &&
          <IconWrapper right={96} onPress={() => goToFAQ(faq)}>
            <EditIcon />
          </IconWrapper>
        }
        <IconWrapper onPress={() => deleteFAQ(faq)}>
          <RemoveIcon />
        </IconWrapper>
        { faq[idField] === questionId &&
        <>
          <Answer>
            Vraag: { faq.question }
          </Answer>
          <Answer>
            Antwoord: { faq.answer }
          </Answer>
        </>
        }
      </QuestionContainer>
  );
}

export default FAQ;