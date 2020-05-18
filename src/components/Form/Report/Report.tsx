import React from "react";
import _get from "lodash/get";

import { Card } from "components/Form";
import { IReport } from "components/Form/models";
import { withPortraitView } from "components/."
import {
  MainTitle,
  MainContainer,
} from "components/Card";

interface IProps {
  report: IReport;
  onChange: (data: IReport) => void;
  isPortrait: boolean;
}

class Report extends React.PureComponent<IProps> {
  handleChange = cardIndex => data => {
    const { report, onChange } = this.props;

    const updatedReport = {
      ...report,
      cards: report.cards.map((card, i) => i === cardIndex ? data.card : card)
    };

    onChange({
      ...data,
      report: updatedReport,
      cardIndex,
    });
  }

  render() {
    const { report, isPortrait } = this.props;

    return (
      <>
        <MainContainer isPortrait={isPortrait}>
          {!!report.title && <MainTitle>{report.title}</MainTitle>}

          {report.cards.map((card, i) => <Card key={i} card={card} onChange={this.handleChange(i)} />)}
        </MainContainer>
      </>
    );
  }
}

export default withPortraitView(Report);
