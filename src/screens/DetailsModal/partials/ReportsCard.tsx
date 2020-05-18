import React from "react";
import { View, TouchableOpacity } from "react-native";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import moment from "moment";

import { Text, Button, Card } from "dakota-2-portal/src/components";
import { LoaderContext } from "dakota-2-portal/src/components/Loader";
import AlertService from "dakota-2-portal/src/helpers/AlertService";

import { Status } from "components/.";
import { IReport } from "components/Form/models";
import Pdf from "helpers/pdf";
import { IProjectCard } from "components/ProjectCard/models";

interface IProps {
  data: any;
  navigation: any;
  styles: any;
  report?: IReport;
  onUpdateReportStatus: () => void;
  onAssignDocumentToProject: (reportType: number, key: string, projectNumber) => void;
  project?: IProjectCard | {};
}

interface IState {
  report?: IReport;
}

class ReportsCard extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(props, state) {
    const { report } = props;

    if (!!report && report !== state.report) {
      return { report };
    }
  }

  state = {
    report: undefined
  }

  componentDidMount() {
    const { report } = this.props;
    if (report) {
      this.setState({ report });
    }
  }

  downloadReport = async () => {
    const { report } = this.state;
    const { onAssignDocumentToProject, project } = this.props;
    const projectNumber = _get(project, "projectNumber", "");
    if(report && !_isEmpty(project)) {
      const pdfHelpers = new Pdf(report, project || {});
      const key = await pdfHelpers.generate();
      if(key) {
        await onAssignDocumentToProject(_get(report, "reportType"), key, projectNumber);
        await pdfHelpers._downloadDocument(key);
      }
      AlertService.show("success", "Rapport succesvol geüpload");
      setTimeout(AlertService.close, 3000);
    }
  }

  goToReportFilling = () => {
    const {
      onUpdateReportStatus,
      navigation,
      data: {
        url,
        reportType,
        projectNumber
      }
    } = this.props;

    navigation.navigate(
      url, {
      reportType,
      projectNumber,
      onGoBack: this.handleGoBack,
      onUpdateReportStatus
    });
  }

  handleClick = () => {
    this[this.state.report ? "downloadReport" : "goToReportFilling"]();
  }

  handleGoBack = (report) => {
    this.setState({ report });
    this.props.navigation.goBack(null);
  }

  formatDate = () => {
    const { report } = this.state;
    const date = _get(report, "updatedAt", _get(report, "createdAt", ""));
    if(!date) {
      return "";
    }

    return moment(date).format("YYYY-MM-DD");
  }

  render() {
    const {
      data,
      styles,
    } = this.props;
    const {
      type,
      title,
      status
    } = data;

    const { report } = this.state;

    const buttonProps = !!report
      ? { kind: "lavender", text: "Download" }
      : { kind: "dark", text: "Invullen" };

    const date = this.formatDate();

    return (
      <TouchableOpacity
        style={styles.reportsCardWrapper}
        onPress={this.handleClick}
      >
        <Card
          cardWrapperStyle={{paddingVertical: 0}}
          style={styles.reportsCard}>
          <View style={styles.reportsContainer}>
            <Status status={status} title={title[0]}/>
            <Text
              size="smallPlus"
              align="left"
              style={{marginLeft: 13}}>
              { title }
            </Text>
          </View>
          <View style={[styles.reportsContainer, styles.alignedRight]}>
            <View style={styles.reportsInnerContainer}>
              <View style={{marginRight: 17}}>
                <Text
                  size="small"
                  align="right"
                  color="echoBlue"
                  >
                  { type.title }
                </Text>
                <Text size="small"
                  align="right"
                  color="echoBlue">
                  { status === "finished" && !!date && `Ingevuld ${date}`}
                </Text>
              </View>
              <Button
                onPress={this.handleClick}
                kind={buttonProps.kind}
                size="small"
                containerStyles={styles.reportsButtonStyles}
                textStyles={{fontSize: 12}}>
                { buttonProps.text }
              </Button>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

ReportsCard.contextType = LoaderContext;

export default ReportsCard;