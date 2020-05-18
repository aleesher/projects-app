import React from "react";
import { NavigationScreenProps } from "react-navigation";
import _debounce from "lodash/debounce";
import { compose } from "recompose";
import _set from "lodash/set";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import Picker from "react-native-picker";

import { AppLayout, Pagination, Button } from "dakota-2-portal/src/components";
import authHelpers from "dakota-2-portal/src/helpers/authHelpers";

import { ProjectCard, Search, withProjectHandlers, NestedProject, withPortraitView } from "components/.";
import { menu } from "./constants";
import { TProjectQueryType, EProjectQueryVariant } from "components/withProjectHandlers/models";
import { PER_PAGE, COST_CENTER_CODE } from "components/withProjectHandlers/constants";
import { IProjectCard } from "components/ProjectCard/models";

import * as Styles from "./styles";

// @ts-ignore
import avatar from "../../../assets/images/builder.png";

interface IProps extends NavigationScreenProps {
  totalItems: number;
  onGetProjectList: (type: TProjectQueryType, searchText?: string, page?: number) => void;
  projectList: IProjectCard[];
  onUpdateProject: (projectNumber: string, percentageDone: number) => void;
  onRefreshUpdate: (projectList: IProjectCard[]) => void;
  projectIsUpdated: boolean;
  onRefetchProject: (costCenterCode: string) => void;
  isPortrait?: boolean;
}

interface IState {
  searchText: string;
  projectList: IProjectCard[];
  projectListType: TProjectQueryType;
  page: number;
  isPortrait?: boolean;
}

class Home extends React.Component<IProps, IState> {
  static getDerivedStateFromProps(props, state) {
    const { projectList, totalItems, isPortrait } = props;

    if(isPortrait !== state.isPortrait) {
      Picker.hide();
    }

    if(projectList !== state.projectList) {
      return { projectList, totalItems };
    }

    return state;
  }

  state = {
    searchText: "",
    projectList: [],
    projectListType: EProjectQueryVariant.MY_PROJECTS,
    page: 1,
    totalItems: 1,
    isPortrait: false
  }

  handleApplySearch;
  scrollListReftop;

  async componentDidMount() {
    const { isPortrait } = this.props;
    await this.handleGetProjectList();
    this.handleApplySearch = _debounce(this.handleGetProjectList, 1000);
    this.setState({ isPortrait })
  }

  onSearchTextChange = (searchText: string) =>
    this.setState({ searchText, page: 1 }, async () => {
      this.handleApplySearch();
    });

  handleListTypeChange = (option) => {
    const { value: projectListType } = option;
    this.setState({ projectListType, page: 1 }, async () => {
      this.handleGetProjectList();
    });
  }

  handleGetProjectList = async () => {
    const { onGetProjectList } = this.props;
    const { projectListType, searchText, page } = this.state;
    try {
      await onGetProjectList(projectListType, searchText, page);
      this.scrollListReftop.scrollTo({x: 0, y: 0, animated: false});
    } catch(err) {
      console.warn(JSON.stringify(err, null, 2));
    }
  }

  handlePageChange = (page) =>
    this.setState({ page }, this.handleGetProjectList);

  handleProjectProgressChange = async (projectNumber: string, progress: number) => {
    const { onUpdateProject } = this.props;
    await onUpdateProject(projectNumber, progress);
  }

  handleUpdateProjectList = (project: IProjectCard) => {
    const { onRefreshUpdate } = this.props;
    const { projectList } = this.state;

    // check whether the project in case it is subProject
    const field = !project.isMainProject ? "mainProject" : "projectNumber";
    const pIdx = projectList.findIndex((p: IProjectCard) => p.projectNumber === project[field]);

    if(pIdx > -1) {
      let updatedProject: IProjectCard = project;

      // change the project on frontend in case it is subProject
      if(!project.isMainProject) {
        const subProjects = _get(projectList[pIdx], `subProjects`, []);
        const sIdx = subProjects.findIndex((subProject: IProjectCard) =>
                      project.projectNumber === subProject.projectNumber);
        updatedProject = {
          ..._get(projectList, `[${pIdx}]`, {}),
          subProjects: [
            ...subProjects.slice(0, sIdx),
            project,
            ...subProjects.slice(sIdx+1, subProjects.length)
          ]
        }
      }

      const list: IProjectCard[] = [
        ...projectList.slice(0, pIdx),
        updatedProject,
        ...projectList.slice(pIdx+1, projectList.length)
      ];

      onRefreshUpdate(list);
    }
  }

  handleRefetchProjects = () => {
    const { onRefetchProject } = this.props;

    this.setState({ page: 1 }, async () => {
      await onRefetchProject(COST_CENTER_CODE)
      this.handleGetProjectList();
    });
  }

  render() {
    const { navigation } = this.props;
    const { searchText, projectList, page, totalItems } = this.state;
    return (
      <AppLayout
        style={{flex: 1}}
        avatar={avatar}
        menu={menu}
        settingsMenu={[
          {
            title: "Afmelden",
            onPress: async () => {
              await authHelpers.signout();
              navigation.navigate("Login");
            }
          }
        ]}
        hideSidebar={true}
      >
        <Styles.Container
          ref={(ref) => { this.scrollListReftop = ref; }}
        >
          <Search
            value={searchText}
            onTypeChange={this.handleListTypeChange}
            onSearch={this.onSearchTextChange}
            placeholder="Zoek project"
            hideSidebar={true}
          />
          <Styles.ProjectsContainer>
            <Styles.TitleWrapper>
              <Styles.Title>
                Projecten
              </Styles.Title>
              <Button
                onPress={this.handleRefetchProjects}
                kind={"dark"}
                size="small"
                containerStyles={{width: 190}}
                textStyles={{fontSize: 12}}
                icon="loop"
              >
                { "Projecten vernieuwen" }
              </Button>
            </Styles.TitleWrapper>
            {projectList.map((project: IProjectCard) => (
              !_get(project, "subProjects", []).length ? (
                <Styles.Project key={project.id}>
                  <ProjectCard
                    {...project}
                    onProjectProgressChange={this.handleProjectProgressChange}
                    onUpdateProjects={this.handleUpdateProjectList}
                  />
                </Styles.Project>
              ) : (
                <NestedProject
                  key={project.id}
                  {...project}
                  onProjectProgressChange={this.handleProjectProgressChange}
                  onUpdateProjects={this.handleUpdateProjectList}
                  onRefetchProjectList={this.handleGetProjectList}
                />
              )
            ))}
          </Styles.ProjectsContainer>
          <Pagination
            onPageChange={this.handlePageChange}
            totalItems={totalItems}
            perPage={PER_PAGE}
            activePage={page}
          />
        </Styles.Container>
      </AppLayout>
    )
  }
}

export default compose(
  withProjectHandlers,
  withPortraitView
)(Home);
