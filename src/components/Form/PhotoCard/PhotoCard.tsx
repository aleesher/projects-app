import React from "react";

import { PictureReport, AddMore, withPortraitView } from "components/.";

import * as Styles from "./styles";

export interface IReport {
  text: string;
  image: string;
  id: string;
}

interface IProps {
  title: string;
  reports?: IReport[];
  onChange: (reports: IReport[]) => void;
  isPortrait?: boolean;
}

interface IState {
  reports: IReport[];
  containerWidth: number | string;
}

const getNewReport = () => ({ image: "", text: "", id: `${Math.random()}` });

class PhotoCard extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      reports: props.reports || [getNewReport()],
      containerWidth: 0
    }
  }

  setReports = (reports) => {
    this.setState({ reports });
    this.props.onChange(reports);
  }

  addReport = () => {
    const report = getNewReport();
    const updatedReports = [...this.state.reports, report];

    this.setReports(updatedReports);
  }

  removeReport = (id) => {
    const updatedReports = this.state.reports.filter(report => report.id !== id);

    this.setReports(updatedReports);
  }

  handleImageSelected = report => (image: string) => {
    const { reports } = this.state;

    const updatedReports = reports.map((rep) => rep.id === report.id
        ? { ...rep, image }
        : rep
    );

    this.setReports(updatedReports);
  }

  handleTextChanged = report => (text: string) => {
    const { reports } = this.state;

    const updatedReports = reports.map((rep) => rep.id === report.id
      ? { ...rep, text }
      : rep
    );

    this.setReports(updatedReports);
  }

  measureView = (event) => {
    const { isPortrait } = this.props;
    if(!isPortrait) {
      this.setContainerWidth(0);
      return;
    }
    const elementWidth = event.nativeEvent.layout.width;
    const { containerWidth } = this.state;
    if(containerWidth === 0) {
      this.setContainerWidth(elementWidth)
    }
  }

  setContainerWidth = (containerWidth: number) => {
    this.setState({
      containerWidth
    })
  }

  render() {
    const { title, isPortrait } = this.props;
    const { reports, containerWidth } = this.state;

    return (
      <Styles.Container
        containerWidth={containerWidth}
        onLayout={(event) => this.measureView(event)}
        isPortrait={isPortrait}>
        <Styles.Content>
          <Styles.Title>{title}</Styles.Title>

          {reports.map((report, i) => (
            <Styles.PictureReportWrapper key={report.id}>
              <PictureReport
                {...report}
                value={report.text}
                image={report.image}
                onChange={this.handleTextChanged(report)}
                onImageSelected={this.handleImageSelected(report)}
              />
              {i !== 0 && (
                <Styles.RemoveReport onPress={() => this.removeReport(report.id)}>
                  <Styles.RemoveIcon />
                </Styles.RemoveReport>
              )}
            </Styles.PictureReportWrapper>
          ))}
          {
            reports.length < 8 &&
            <AddMore
              onClick={this.addReport}
              hasAddIcon
              hasPhotoIcon
              text="Foto toevoegen"
            />
          }
        </Styles.Content>
      </Styles.Container>
    );
  }
}

export default withPortraitView(PhotoCard);
