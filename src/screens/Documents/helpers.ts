import _get from "lodash/get";

import { IDocument } from "components/.";
import { IReport } from "components/Form/models";

export const generateDocumentList = (reports: IReport[], forms: object[], projectNumber: string): IDocument[] =>
  reports.map((report: IReport, idx: number) => {
    return {
      id: `document-${idx}`,
      name: report.title,
      reportType: report.reportType,
      projectNumber
    } as IDocument;
  }) as IDocument[];