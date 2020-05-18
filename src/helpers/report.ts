import _get from "lodash/get";

import {
  REPORT_FORMS,
  REPORT_STAGE_TYPES
} from "screens/Home/mock";
import { IProjectCard } from "components/ProjectCard/models";

export const getReports = (
  project: IProjectCard | {}
) => {
  const price = _get(project, "contractValue", 0);
  const progress = _get(project, "percentageDone", 0);
  const reports = _get(project, "reports", []);
  const projectNumber = _get(project, "projectNumber");
  const existingReports = getExistingsReports(project);

  const formReports = REPORT_FORMS.reduce((acc, form) => {
    if(price >= form.minPrice &&
      progress >= form.minProgress) {
      let report;
      report = existingReports.find(report => _get(report, "reportType") === _get(form, "reportType"));
      if(!report) {
        report = reports.find(report => _get(report, "reportType") === _get(form, "reportType"));
      }
      const status = report ? "finished" : form.minProgress+5 <= progress ? "critical" : "problematic";
      return [...acc, {...form, type: REPORT_STAGE_TYPES[1], status, projectNumber}];
    }
    return acc;
  }, [] as any);

  return {
    formReports,
    existingReports,
  }
}

export const getExistingsReports = (project: IProjectCard | {}) => {
  const projectNumber = _get(project, "projectNumber", "");
  const description = _get(project, "description", "");
  return REPORT_FORMS.reduce((acc, report) =>
    !!_get(project, report.field) ?
      [...acc, { ...report, projectNumber, description, documentNumber: _get(project, report.field)}] :
      acc, [] as any)
}

export const getReport = (reportType: number, reports: any[], existingsReports: any[]) => {
  let report;
  if(!!existingsReports.length) {
    report = existingsReports.find(r => _get(r, "reportType") === reportType);
  }

  if(!report) {
    report = reports.find(r => _get(r, "reportType") === reportType);
  }

  return report;
}