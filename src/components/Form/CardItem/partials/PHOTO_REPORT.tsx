import React from "react";
import _get from "lodash/get";

import { Column, Row } from "dakota-2-portal/src/styles/global";
import fileHelper, { MEDIA_URL } from "dakota-2-portal/src/helpers/fileHelpers";
import { LoaderContext } from "dakota-2-portal/src/components/Loader";

import { IQuestion, QuestionType } from "components/Form/models";
import { PictureReport, AddMore, ValidationError } from "components/.";

import * as Styles from "./styles";

interface IProps extends IQuestion {
  type: QuestionType;
  onChange: (value: any) => void;
  hasError: object
  onBlur: () => void;
}

const getNewReport = () => ({ image: "", text: "", id: `${Math.random()}` });

class PhotoReport extends React.PureComponent<IProps, any> {
  state = {
    error: {}
  }

  addReport = () => {
    const { reports } = JSON.parse(this.props.value);

    const report = getNewReport();
    const updatedReports = [...reports, report];

    this.setReports(updatedReports);
  }

  removeReport = (id) => {
    const { reports } = JSON.parse(this.props.value);

    const updatedReports = reports.filter(report => report.id !== id);

    this.setReports(updatedReports);
  }

  handleImageSelected = report => async (file) => {
    const { startLoading, stopLoading } = this.context;
    try {
      startLoading();
      const res = await fileHelper.uploadFile({file, info: {entityName: "Report", fieldName: "photo" } }, );
      const { error } = this.state;
      if(!res.error) {
        const image = `${MEDIA_URL}/${res.key}`
        this.handleChangeReportImage(report, image);
        if(error[report.id]) {
          this.handleInitError(report.id, "");
        }
      } else {
        this.handleInitError(report.id, res.error);
      }

      stopLoading();
    } catch(err) {
      stopLoading();
      console.warn(err);
    }
  }

  handleRemoveImage = report => async (key: string) => {
    const { startLoading, stopLoading } = this.context;
    try {
      startLoading();
      const formattedKey = key.includes(MEDIA_URL) ? key.substring(MEDIA_URL.length, key.length) : key;
      const res = await fileHelper.deleteFile(formattedKey);
      const { error } = this.state;
      if(!_get(res, "error")) {
        if(error[report.id]) {
          this.handleInitError(report.id, "");
        }
        this.handleChangeReportImage(report, "");
      } else {
        this.handleInitError(report.id, _get(res, "error"));
      }
      stopLoading();
    } catch(err) {
      stopLoading();
      console.warn(err);
    }
  }

  handleChangeReportImage = (report, image) => {
    const { value } = this.props;
    const { reports } = JSON.parse(value);
    const updatedReports = reports.map((rep) => rep.id === report.id
          ? { ...rep, image }
          : rep
      );

    this.setReports(updatedReports);
  }

  handleInitError = (reportId, error) => {
    this.setState({ error: { [reportId]: error }})
  }

  handleTextChanged = report => (text: string) => {
    const { reports } = JSON.parse(this.props.value);

    const updatedReports = reports.map((rep) => rep.id === report.id
      ? { ...rep, text }
      : rep
    );

    this.setReports(updatedReports);
  }

  setReports = (reports) => {
    const { hasAddMore = false } = JSON.parse(this.props.value);
    const { onChange } = this.props;

    onChange(JSON.stringify({ hasAddMore, reports }));
  }

  render() {
    const { error } = this.state;
    const { text, value, hasError={}, onBlur } = this.props;
    const { hasAddMore = false, reports, limit=4 } = JSON.parse(value);
    console.log(error);
    return (
      <Column flex={1}>
        {!!text && <Styles.Title>{text}</Styles.Title>}
        {reports.map((report, i) => (
          <Styles.PictureReportWrapper key={report.id}>
            <Row
              flex={1}
              hasError={hasError[report.id]}>
              <PictureReport
                {...report}
                value={report.text}
                image={report.image}
                onChange={this.handleTextChanged(report)}
                onImageSelected={this.handleImageSelected(report)}
                onBlur={onBlur}
                onRemoveImage={this.handleRemoveImage(report)}
                errorText={error[report.id]}
              />
              {i !== 0 && (
                <Styles.RemoveReport onPress={() => this.removeReport(report.id)}>
                  <Styles.RemoveIcon />
                </Styles.RemoveReport>
              )}
            </Row>
            <ValidationError hasError={hasError[report.id]} />
          </Styles.PictureReportWrapper>
        ))}
        {hasAddMore && reports.length < limit &&
        <Row flex={1}>
          <AddMore
            marginTop={10}
            onClick={this.addReport}
            hasAddIcon
            hasPhotoIcon
            text="Foto toevoegen"
          />
        </Row>
        }
      </Column>
    )
  }
}

PhotoReport.contextType = LoaderContext;

export default PhotoReport;
