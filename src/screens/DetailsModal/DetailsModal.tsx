import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import _get from "lodash/get";
import { compose } from "recompose";
import { withNavigation, NavigationScreenProps } from "react-navigation";;

import _isEmpty from "lodash/isEmpty";
import _isEqual from "lodash/isEqual";

import { SliderLayout, Button } from "dakota-2-portal/src/components";
import { RowSpaced, Column } from "dakota-2-portal/src/styles/global";

import ReportsCard from "./partials/ReportsCard";
import DetailsSection from "./partials/DetailsSection";
import StatusCard from "./partials/StatusCard";
import ModalSubtitle from "./partials/ModalSubtitle";
import FinanceCard from "./partials/FinanceCard";
import TimeActualInfo from "./partials/TimeActualInfo";

import { ModalTitle, withPortraitView, withProjectHandlers } from "components/.";
import { getReports, getReport } from "helpers/report";
import {
  TIME_ACTUAL_INFO_DATA
} from "./constants";
import { IProjectCard } from "components/ProjectCard/models";

import detailsStyles from "./styles";

interface IProps extends NavigationScreenProps {
  project: IProjectCard | {};
  onGetProject: (projectNumber: string) => void;
  isPortrait: boolean;
  reports: any[];
  onUpdateProject: (projectNumber: string, percentageDone: number) => void;
  onAssignDocumentToProject: (reportType: number, key: string, projectNumber) => void;
}
interface IState {
  project: IProjectCard | {};
  needRefetch: boolean;
}

class DetailsModal extends React.PureComponent<IProps, IState> {
  static getDerivedStateFromProps(props: IProps, state: IState) {
    const { project, navigation } = props;
    let result = state;
    if(!_isEqual(project, state.project)) {
      const onUpdateProjects = navigation.getParam("onUpdateProjects");
      onUpdateProjects(project)
      result = { ...result, project };
    }

    return result;
  }

  constructor(props) {
    super(props);
    this.state = {
      project: {},
      needRefetch: false
    }
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const projectNumber = _get(navigation, "state.params.project.projectNumber", {});
    this.handleFetchProject(projectNumber);
  }

  handleFetchProject = async (projectNumber: string) => {
    const { onGetProject } = this.props;
    await onGetProject(projectNumber);
  }

  renderReports = (styles: any, project: IProjectCard | {}) => {
    const { navigation, onAssignDocumentToProject } = this.props;
    const reports = _get(project, "reports", []);
    const projectNumber = _get(project, "projectNumber");
    const { formReports, existingReports } = getReports(project);

    return formReports.map((card) => (
      <ReportsCard
        styles={styles}
        key={card.id}
        data={{...card}}
        navigation={navigation}
        report={getReport(card.reportType, reports, existingReports)}
        onUpdateReportStatus={this.handleUpdateReportStatus}
        onAssignDocumentToProject={onAssignDocumentToProject}
        project={project}
      />
    ));
  }

  renderTitle = (project: IProjectCard | {}) =>
    !_isEmpty(project) ? (
      <ModalTitle
        title={_get(project, "description", "")}
        projectNumber={_get(project, "projectNumber", "")}
      />
    ) : "";

  handleProjectProgressChange = async (projectNumber: string, progress: number) => {
    const { onUpdateProject } = this.props;
    await onUpdateProject(projectNumber, progress);
  }

  handleUpdateReportStatus = async () => {
    const { project } = this.state;
    await this.handleFetchProject(_get(project, "projectNumber"));
    this.setState({ needRefetch: true });
  }

  handleGoBack = () => {
    const { navigation } = this.props;
    const { needRefetch } = this.state;
    const onRefetchProjectList = navigation.getParam("onRefetchProjectList");
    if(needRefetch && onRefetchProjectList) {
      onRefetchProjectList();
    }
  }

  getProjectReports = (project: IProjectCard | {}) => {
    const { formReports, existingReports } = getReports(project);
    const reports = _get(project, "reports", []);
    return formReports.reduce((acc, r) => {
      const report = getReport(r.reportType, reports, existingReports)
      return !!report ? [...acc, report] : acc;
    }, []);
  }

  render() {
    const { isPortrait, navigation, onAssignDocumentToProject } = this.props;
    const { project } = this.state;
    const styles = detailsStyles(isPortrait);
    const reports = this.getProjectReports(project);
    const documentParams = { reports, project, onAssignDocumentToProject };
    const projectHasFilledReports = !!reports.length;
    return (
      <SliderLayout
        title={this.renderTitle(project)}
        containerStyle={{}}
        hideCloseButton={true}
        onGoBack={this.handleGoBack}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containerLeft}>
              <DetailsSection
                styles={styles}
                project={project}/>
              <ModalSubtitle styles={styles} title="Rapporten"/>
              {this.renderReports(styles, project)}
            </View>
            <View style={styles.containerRight}>
              <StatusCard
                styles={styles}
                onProgressChange={this.handleProjectProgressChange}
                project={project}/>
              <FinanceCard isPortrait={isPortrait} project={project}/>
              <TimeActualInfo styles={styles} data={TIME_ACTUAL_INFO_DATA}/>
              <RowSpaced flex={1} flexAlign="flex-start">
                {projectHasFilledReports &&
                  <Column flex={0.48}>
                    <Button
                      kind="dark"
                      size="small"
                      onPress={() => navigation.navigate({ routeName: "Documents", params: documentParams })}
                      containerStyles={styles.documentenButton}
                    >Documenten</Button>
                  </Column>
                }
                <Column flex={projectHasFilledReports ? 0.48 : 1}>
                  <Button
                    kind="dark"
                    size="small"
                    onPress={() => navigation.navigate({routeName: "QuestionsAnswers", params: { projectNumber: _get(project, "projectNumber", "") }})}
                    containerStyles={styles.documentenButton}
                  >Vraag en antwoord</Button>
                </Column>
              </RowSpaced>
            </View>
          </View>
        </ScrollView>
      </SliderLayout>
    );
  }
}

export default compose(
  withPortraitView,
  withProjectHandlers,
  withNavigation
)(DetailsModal);
