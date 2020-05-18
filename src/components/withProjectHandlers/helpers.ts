import _set from "lodash/set";
import _get from "lodash/get";

import { EProjectQueryVariant, TProjectQueryType } from "./models";
import { FETCH_PROJECT_LIST, FETCH_PROJECT, UPDATE_PROJECT, REFETCH_PROJECT, ASSIGN_DOCUMENT_TO_PROJECT  } from "./queries";
import { PER_PAGE } from "./constants";
import { REPORT_FORMS } from "screens/Home/mock";

export const getFetchProjectListQuery = (
  employeeCode: string,
  location: string,
  type: TProjectQueryType,
  searchText?: string,
  page: number = 1,
) => {
  const skip = (page-1) * PER_PAGE;
  const perPage = PER_PAGE;
  const isAllProjectsQuery = type === EProjectQueryVariant.ALL_PROJECTS;
  const variables = { where: { location }, skip, perPage};
  const query = FETCH_PROJECT_LIST;

  if(!isAllProjectsQuery) {
    _set(variables, "where.employeeCode", employeeCode);
  }

  if(!!searchText) {
    const filters = [
      { projectNumber_contains: searchText },
      { address_contains: searchText },
      { city_contains: searchText }
    ];
    _set(variables, "where.OR", filters);
  }

  _set(variables, "where.isMainProject", true);

  return { query, variables }
}

export const getProjectQuery = (projectNumber: string) => ({
  query: FETCH_PROJECT, variables: { projectNumber }
})

export const getProjectUpdateMutation = (projectNumber: string, percentageDone: number) => ({
  mutation: UPDATE_PROJECT,
  variables: { projectNumber, percentageDone }
});

export const getRefetchProjectQuery = (costCenterCode: string) => ({
  query: REFETCH_PROJECT,
  variables: { costCenterCode }
});

export const getAssignProjectDocumentMutation = (reportType: number, key: string, projectNumber: string) => {
  const report = REPORT_FORMS.find(report => report.reportType === reportType);
  const data = { [_get(report, "field")]: key }
  const where = { projectNumber };
  return {
    mutation: ASSIGN_DOCUMENT_TO_PROJECT,
    variables: { data, where }
  }
};