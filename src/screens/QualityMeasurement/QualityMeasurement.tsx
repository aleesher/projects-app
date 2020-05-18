import React from "react";
import { withNavigation } from "react-navigation";
import { compose } from "recompose";
import _get from "lodash/get";
import _isEqual from "lodash/isEqual";
import _isEmpty from "lodash/isEmpty";

import { SliderLayout } from "dakota-2-portal/src/components";

import { Report } from "components/Form";
import { IReport } from "components/Form/models";
import { HeaderButtons, ModalTitle, withReportQueries, FormContext } from "components/."

import { DELIVERY_REPORT } from "./mock";
import { validateBeforeSubmit } from "helpers/validation";

const QualityMeasurement = ({
  navigation,
  submitReport: submit,
  saveReport: save,
  getReportData,
  report: formattedReport,
  onReportChange
}) => {
  const [report, setReport] = React.useState<IReport>(DELIVERY_REPORT);
  const [isChanged, handleValueChanged] = React.useState<boolean>(false);
  const [isFormSubmitted, submitForm] = React.useState<boolean>(false);
  const projectNumber = navigation.getParam("projectNumber") || "";

  const submitReport = () => {
    submitForm(true);
    const { errors, report: newReport } = validateBeforeSubmit(report);
    if(_isEmpty(errors)) {
      submit({ navigation, report: newReport });
    }
  };

  const saveReport = () => {
    save({navigation, report});
  }

  React.useEffect(() => {
    getReportData(DELIVERY_REPORT, navigation);
  }, [])

  React.useEffect(() => {
    if(formattedReport && !_isEqual(report, formattedReport)) {
      setReport(formattedReport);
    }
  }, [formattedReport])

  const handleChange = (data) => {
    const { report, cardIndex, sectionIndex, questionIndex } = data;
    if(!isChanged) {
      handleValueChanged(true);
    }
    onReportChange(report, cardIndex, sectionIndex, questionIndex, navigation);
    setReport(report);
  }

  const saveOnGoBack = () => {
    if(isChanged) {
      saveReport();
    }
  }

  return (
    <SliderLayout
      title={
        <ModalTitle
          title="Kwaliteitsmeting"
          projectNumber={projectNumber}
        />
      }
      containerStyle={{}}
      headerElement={<HeaderButtons onSubmit={submitReport} onSave={saveReport} />}
      onGoBack={saveOnGoBack}
    >
      <FormContext.Provider value={{isFormSubmitted}}>
        <Report report={report} onChange={handleChange} isFormSubmitted={isFormSubmitted}/>
      </FormContext.Provider>
    </SliderLayout>
  );
};

export default compose(
  withNavigation,
  withReportQueries
)(QualityMeasurement);