import React from "react";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _set from "lodash/set";

import { LoaderContext } from "dakota-2-portal/src/components/Loader";
import ApolloHelper from "dakota-2-portal/src/helpers/apollo";

import { TProjectQueryType } from "./models";
import { getFetchProjectListQuery, getProjectQuery, getProjectUpdateMutation, getRefetchProjectQuery, getAssignProjectDocumentMutation } from "./helpers";
import { IProjectCard } from "../ProjectCard/models";
import { FETCH_CURRENT_USER } from "./queries";
import { EMPLOYEE_CODE, COST_CENTER_CODE } from "./constants";

interface IState {
  projectList: object[];
  totalItems: number;
  project: IProjectCard | {};
  currentUser: object;
}

export default function withMaintenanceHandlers(HocComponent) {
  class WrappedClass extends React.PureComponent<any, IState> {

    state = {
      projectList: [],
      totalItems: 1,
      project: {},
      currentUser: {}
    }

    handleGetCurrentUser = async (client) => {
      try {
        const { currentUser: user } = this.state;

        if(!_isEmpty(user)) {
          return user;
        }

        const { data } = await client.query({ query: FETCH_CURRENT_USER });
        const currentUser = _get(data, "currentUser");

        if(!_isEmpty(currentUser)) {
          this.setState({ currentUser })
        }

        return currentUser || {};
      } catch(err) {
        console.warn(JSON.stringify(err));
      }
    }

    handleGetProjectList = async (
      type: TProjectQueryType,
      searchText?: string,
      page: number = 1,
    ) => {
      try {
        this.context.startLoading();
        const client = await ApolloHelper.getClient();
        const currentUser = await this.handleGetCurrentUser(client);
        const employeeCode = _get(currentUser, "employee.code", EMPLOYEE_CODE);

        const location = _get(currentUser, "employee.costCenterCode", COST_CENTER_CODE);
        const projectListQuery = getFetchProjectListQuery(employeeCode, location, type, searchText, page);
        const { data } = await client.query({...projectListQuery, fetchPolicy: "no-cache"});
        const projectList = data.projects ? data.projects : [];
        const totalItems = _get(data, "projectsConnection.aggregate.count", 1);

        this.setState({ projectList, totalItems });
        this.context.stopLoading();
      } catch(err) {
        this.context.stopLoading();
        console.warn(JSON.stringify(err, null, 2));
      }
    }

    handleGetProject = async (projectNumber: string) => {
      try {
        this.context.startLoading();
        const client = await ApolloHelper.getClient();
        const projectQuery = getProjectQuery(projectNumber);
        const { data } = await client.query({...projectQuery, fetchPolicy: "no-cache"});
        const project = data.project ? data.project : {};
        this.setState({ project })
        this.context.stopLoading();
      } catch(err) {
        this.context.stopLoading();
        console.warn(JSON.stringify(err, null, 2));
      }
    }

    handleUpdateProject = async (projectNumber: string, percentageDone: number) => {
     try {
      this.context.startLoading();
      const client = await ApolloHelper.getClient();
      const updateMutation = getProjectUpdateMutation(projectNumber, percentageDone);
      const { data } = await client.mutate(updateMutation);
      const project = _get(data, "updateProjectPercentageDone", {});

      this.setState({ project })
      this.context.stopLoading();
     } catch(err) {
      this.context.stopLoading();
      console.log(err);
      console.warn(JSON.stringify(err, null, 2));
     }
    }

    handleAssignDocumentToProject = async (reportType: number, key: string, projectNumber) => {
      try {
        this.context.startLoading();
        const client = await ApolloHelper.getClient();
        const mutation = getAssignProjectDocumentMutation(reportType, key, projectNumber);
        const { data } = await client.mutate(mutation);
        const project = _get(data, "updateProject", {});
        this.setState({ project });
        this.context.stopLoading();
      } catch(err) {
        this.context.stopLoading();
        console.log(err);
        console.warn(JSON.stringify(err, null, 2));
      }
    }

    handleRefetchProject = async (costCenterCode: string) => {
      try {
        this.context.startLoading();
        const client = await ApolloHelper.getClient();
        const refetchQuery = getRefetchProjectQuery(costCenterCode);
        await client.query({...refetchQuery, fetchPolicy: "no-cache"});
        this.context.stopLoading();
      } catch(err) {
        this.context.stopLoading();
        console.log(err);
        console.warn(JSON.stringify(err, null, 2));
      }
    }

    handleRefreshUpdate = (projectList: IProjectCard[]) => {
      this.setState({ projectList });
    }

    render() {

      const { projectList, project, totalItems } = this.state;
      const props = {
        ...this.props,
        onGetProjectList: this.handleGetProjectList,
        onGetProject: this.handleGetProject,
        onUpdateProject: this.handleUpdateProject,
        onRefreshUpdate: this.handleRefreshUpdate,
        onRefetchProject: this.handleRefetchProject,
        onAssignDocumentToProject: this.handleAssignDocumentToProject,
        projectList,
        project,
        totalItems
      };

      return <HocComponent {...props} />;
    }
  }

  WrappedClass.contextType = LoaderContext;

  return WrappedClass;
}
