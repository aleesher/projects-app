import { NavigationScreenProps } from "react-navigation";
import IReport from "components/Form/models/IReport";

export enum EReportIsNecessary {
  NietNodig = "NietNodig",
  WilIkHebben = "WilIkHebben",
  LooptAchter = "LooptAchter"
}

export type ReportIsNecessary = typeof EReportIsNecessary;

interface ISubComplex {
  id: string;
  code: string;
  name: string;
  facePhotoDocumentNo: string;
  faceSurfaceDocumentNo: string;
}

interface IComplex {
  id: string;
  code: string;
  name: string;
  subComplexes: ISubComplex[];
}

export interface IProjectCard extends NavigationScreenProps {
  id: string;
  onChange: (value: any) => void;
  updatedDate: Date;
  projectNumber: string;
  location: string;
  employeeCode: string;
  employeeName: string;
  mainProject: string;
  description: string;
  contractValue: number;
  additionalTotalAmount: number;
  percentageDone: number;
  percentageDoneDate: string;
  percentageDoneMinValue: number;
  address: string;
  city: string;
  complexExists: boolean;
  complexPhotoNo: string;
  complexPhotoUrl: string;
  complexCode: string;
  complexName: string;
  amountSpent: number;
  spentVsBudgetted: number;
  amountOnReceipt: number;
  receiptIsNecessary: boolean;
  invoiced: number;
  qualityMeasurementIsNecessary: ReportIsNecessary
  progressReportIsNecessary: ReportIsNecessary
  deliveryReportIsNecessary: ReportIsNecessary
  qualityMeasurementIsComplete: boolean;
  progressReportIsComplete: boolean;
  deliveryReportIsComplete: boolean;
  additionalWorkDescription1: string;
  additionalWorkAmount1: number;
  additionalWorkDescription2: string;
  additionalWorkAmount2: number;
  additionalWorkDescription3: string;
  additionalWorkAmount3: number;
  additionalWorkDescription4: string;
  additionalWorkAmount4: number;
  additionalWorkDescription5: string;
  additionalWorkAmount5: number;
  additionalWorkDescription6: string;
  additionalWorkAmount6: number;
  qualityMeasurementDocumentNo: string;
  progressReportDocumentNo: string;
  deliveryReportDocumentNo: string;
  visitReportDocumentNo: string;
  incidentReportDocumentNo: string;
  deviationFormDocumentNo: string;
  qualityMeasurementDocumentUrl: string;
  progressReportDocumentUrl: string;
  deliveryReportDocumentUrl: string;
  visitReportDocumentUrl: string;
  incidentReportDocumentUrl: string;
  deviationFormDocumentUrl: string;
  subProjects: IProjectCard[];
  isMainProject: boolean;
  reports: IReport[];
  expectedStartDate: string;
  expectedEndDate: string;
  budgetHours: number;
  numberOfDays: number;
  numberOfHourlyWorkBudget: number;
  subcontractorName: string;
  projectMemo: string;
  complex: IComplex;
}