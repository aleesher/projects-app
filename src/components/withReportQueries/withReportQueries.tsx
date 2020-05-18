import React from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _debounce from "lodash/debounce";

import { LoaderContext } from "dakota-2-portal/src/components/Loader";
import AlertService from "dakota-2-portal/src/helpers/AlertService";
import ApolloHelper from "dakota-2-portal/src/helpers/apollo";

import { getCreateReportMutation as query, GET_REPORT_BY_ID, GET_REPORT_DATA } from "./queries";
import { IReport } from "components/Form/models";
import {
  mapReportDataValues,
  changeReportQuestion,
  setReportToStorage,
  getReportFromStorage,
  removeReportFromStorage
} from "./helpers";
import { COST_CENTER_CODE } from "../withProjectHandlers/constants";

export default function withReportQueries(HocComponent) {
  class WrappedClass extends React.PureComponent<any, any> {
    state = {
      report: null,
      queryResult: {}
    }

    constructor(props) {
      super(props);

      this.handleReportChange = _debounce(this.handleReportChange, 800);
    }

    submitReport = async ({navigation, report}) => {
      const { reportType, projectNumber, onGoBack, onUpdateReportStatus } = navigation.state.params;
      const { startLoading, stopLoading } = this.context;
      const apolloClient = await ApolloHelper.getClient();

      try {
        startLoading();

        const filledReport = { ...report, reportType, projectNumber };
        const { data } = await apolloClient.mutate({ mutation: query(filledReport) });

        const { data: reportData } = await apolloClient.query({ query: GET_REPORT_BY_ID, variables: { id: data.createReport.id } });

        await removeReportFromStorage(`${projectNumber}_${reportType}`);

        stopLoading();
        AlertService.show("success", "Rapport succesvol opgeslagen");
        setTimeout(AlertService.close, 3000);
        onUpdateReportStatus();
        onGoBack(reportData.report);
      } catch(err) {
        stopLoading();
        AlertService.show("error", "Fout opslaan");
        setTimeout(AlertService.close, 3000);
        console.log(JSON.stringify(err, null, 2));
        console.log(err);
      }
    };

    saveReport = async ({navigation, report}) => {
      const { reportType, projectNumber } = navigation.state.params;
      const { startLoading, stopLoading } = this.context;
      try {
        startLoading();
        await setReportToStorage(`${projectNumber}_${reportType}`, report);
        stopLoading();
        AlertService.show("success", "Rapport succesvol opgeslagen");
        setTimeout(AlertService.close, 3000);
      } catch(err) {
        stopLoading();
        AlertService.show("error", "Fout opslaan");
        setTimeout(AlertService.close, 3000);
        console.log(JSON.stringify(err, null, 2));
      }
    }

    getReportData = async (report: IReport, navigation) => {
      const { startLoading, stopLoading } = this.context;
      const apolloClient = await ApolloHelper.getClient();
      const { reportType, projectNumber } = navigation.state.params;
      try {
        startLoading();

        const { data = {} } = await apolloClient.query({
          query: GET_REPORT_DATA,
          variables: { projectNumber, costCenterCode: COST_CENTER_CODE }
        });

        const storageKey = `${projectNumber}_${reportType}`;

        const storageReport = await getReportFromStorage(storageKey);

        const formattedReport = !_isEmpty(storageReport) ? storageReport : mapReportDataValues(data, report);

        if(!_isEmpty(storageReport)) {
          await setReportToStorage(storageKey, formattedReport);
        }

        this.setState({ report: formattedReport, queryResult: data });

        stopLoading();
      } catch(err) {
        stopLoading();
        setTimeout(AlertService.close, 3000);
        console.log(JSON.stringify(err, null, 2));
        console.log(err);
      }
    }

    handleReportChange = (
      report: IReport,
      cardIdx: number,
      sectionIdx: number,
      questionIdx: number,
      navigation
    ) => {
      const { queryResult } = this.state;
      const affectedReport = changeReportQuestion(
        report,
        queryResult,
        cardIdx,
        sectionIdx,
        questionIdx
      );

      this.setState({ report: affectedReport });
    }

    render() {
      const { report } = this.state;
      const props = {
        ...this.props,
        submitReport: this.submitReport,
        saveReport: this.saveReport,
        getReportData: this.getReportData,
        onReportChange: this.handleReportChange,
        report
      };
      return <HocComponent { ...props } />
    }
  }

  WrappedClass.contextType = LoaderContext;

  return WrappedClass;
}