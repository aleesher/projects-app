import urls from "src/helpers/urls";

export interface IReportForm {
  id: string,
  title: string;
  url: string;
  minPrice: number;
  minProgress: number;
}

export const REPORT_FORMS = [
  {
    id: "report-0",
    reportType: 0,
    title: "Kwaliteitsmeting",
    url: urls.QUALITY_MEASUREMENT,
    minPrice: 20000,
    minProgress: 10,
    field: "qualityMeasurementDocumentNo"
  },
  {
    id: "report-1",
    reportType: 1,
    title: "Bezoek rapport",
    url: urls.VISIT_REPORT,
    minPrice: 0,
    minProgress: 0,
    field: "visitReportDocumentNo"
  },
  {
    id: "report-2",
    reportType: 2,
    title: "Incidenten rapport",
    url: urls.INCIDENT_REPORT,
    minPrice: 0,
    minProgress: 0,
    field: "incidentReportDocumentNo"
  },
  {
    id: "report-3",
    reportType: 3,
    title: "KIM information",
    url: urls.KIM_INFORMATION,
    minPrice: 0,
    minProgress: 0
  },
  {
    id: "report-4",
    reportType: 4,
    title: "Voortgangsverslag",
    url: urls.PROGRESS_REPORT,
    minPrice: 50000,
    minProgress: 50,
    field: "progressReportDocumentNo"
  },
  {
    id: "report-5",
    reportType: 5,
    title: "Opleveringsrapport",
    url: urls.DELIVERY_REPORT,
    minPrice: 20000,
    minProgress: 95,
    field: "deliveryReportDocumentNo"
  },
  {
    id: "report-6",
    reportType: 6,
    title: "Afwijkingsrapport",
    url: urls.DEVIATION_FORM,
    minPrice: 20000,
    minProgress: 100,
    field: "deviationFormDocumentNo"
  }
];

export interface IReportStageTypes {
  id: string,
  title: string;
}

export const REPORT_STAGE_TYPES = [
  {
    id: 0,
    title: "rapport volitooid"
  },
  {
    id: 1,
    title: "rapportage gereed om in te vuilen"
  }
];