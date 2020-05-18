import React from "react";
import { withNavigation } from "react-navigation";
import { compose } from "recompose";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

import { SliderLayout } from "dakota-2-portal/src/components";
import { RowSpaced } from "dakota-2-portal/src/styles/global";
import AlertService from "dakota-2-portal/src/helpers/AlertService";

import { withPortraitView, IDocument, Document } from "components/."
import { MainContainer, MainTitle } from "components/Card";
import { IReport } from "components/Form/models";

import Pdf from "helpers/pdf";
import { generateDocumentList } from "./helpers";
import { REPORT_FORMS } from "../Home/mock";
import { IProjectCard } from "components/ProjectCard/models";

const Documents = ({
  isPortrait,
  navigation
}) => {
  const reports: IReport[] = navigation.getParam("reports");
  const project: IProjectCard | {} = navigation.getParam("projectNumber");
  const onAssignDocumentToProject = navigation.getParam("onAssignDocumentToProject");
  const projectNumber = _get(project, "projectNumber");
  const documents:IDocument[] = generateDocumentList(reports, REPORT_FORMS, projectNumber);

  const handleDownloadDocument = async (reportType: number) => {
    const report = reports.find((report: IReport) => report.reportType === reportType);
    if(report && !_isEmpty(project)) {
      const pdfHelpers = new Pdf(report, project);
      const key = await pdfHelpers.generate();
      if(key) {
        await onAssignDocumentToProject(_get(report, "reportType"), key, projectNumber);
        await pdfHelpers._downloadDocument(key);
      }
      AlertService.show("success", "Rapport succesvol geüpload");
      setTimeout(AlertService.close, 3000);
    }

  }

  return (
    <SliderLayout
      title="Documenten"
      containerStyle={{height: "100%"}}
      hideCloseButton={true}
      >
      <MainContainer isPortrait={isPortrait}>
        <MainTitle>Documenten</MainTitle>
        <RowSpaced>
        {
          documents.map((document: IDocument) => (
            <Document
              key={document.id}
              document={document}
              onDownloadDocument={handleDownloadDocument}
            />
        ))}
        </RowSpaced>
      </MainContainer>
    </SliderLayout>
  )
}

export default compose(
  withPortraitView,
  withNavigation
)
(Documents);