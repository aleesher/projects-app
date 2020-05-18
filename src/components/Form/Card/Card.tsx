import React from "react";
import _get from "lodash/get";

import {
  CardTitle,
  CardContainer,
  CardSubtitle,
  CardLine
} from "components/Card";
import CardItem from "components/Form/CardItem";
import { ICard } from "components/Form/models";
import { Row } from "dakota-2-portal/src/styles/global";

interface IProps {
  onChange: any;
  card?: ICard;
}

interface IState {
  card: ICard;
}

class GeneralCard extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(props, state) {
    const { card } = props;
    const prevCard = _get(state, "card");

    if (card !== prevCard) {
      return { card };
    }
  }

  componentDidMount() {
    const { card } = this.props;

    if (card) {
      this.setState({ card });
    }
  }

  handleQuestionChange = (sectionIndex, questionIndex) => (newQuestion) => {
    const { card } = this.state;

    const updatedCard = {
      ...card,
      sections: card.sections.map((section, i) => sectionIndex !== i
        ? section
        : { ...section, questions: section.questions.map((question, i) => questionIndex === i
            ? newQuestion
            : question
          )}
      )
    };

    this.props.onChange({
      card: updatedCard,
      sectionIndex,
      questionIndex
    });
  }

  render() {
    const { title, sections } = _get(this.state, "card", { title: "", sections: [] } as ICard);

    return (
      <CardContainer>
        {!!title && (
          <>
            <CardTitle>{title}</CardTitle>
            <CardLine singleLine />
          </>
        )}
        {sections.map(({ id, title, questions }, index) => {
          return (
            <React.Fragment key={id}>
              {!!title && (
                <Row marginBottom="15" marginTop={9}>
                  <CardSubtitle>
                    {title}
                  </CardSubtitle>
                  <CardLine />
                </Row>
              )}
              {questions.map((question, i) => (
                <CardItem
                  key={question.id}
                  {...question}
                  onChange={this.handleQuestionChange(index, i)}
                />
              ))}
            </React.Fragment>
          )
        })}
      </CardContainer>
    )
  }
}

export default GeneralCard;
