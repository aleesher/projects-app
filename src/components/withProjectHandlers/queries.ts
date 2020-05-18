import gql from "graphql-tag";

import { PER_PAGE } from "./constants";

export const FETCH_PROJECT_LIST = gql`
  query fetchProjectList(
    $skip: Int = 0,
    $perPage: Int = ${PER_PAGE},
    $where: ProjectWhereInput
  ) {
    projects(
      where: $where
      skip: $skip
      first: $perPage
    ) {
      id
      location
      percentageDone
      percentageDoneDate
      projectNumber
      complexName
      contractValue
      description
      employeeCode
      city
      mainProject
      isMainProject
      subProjects {
        id
        percentageDone
        percentageDoneDate
        projectNumber
        complexName
        contractValue
        description
        employeeCode
        city
        reports {
          id
          title
          projectNumber
          reportType
        }
      }
      reports {
        id
        title
        projectNumber
        reportType
      }
      qualityMeasurementDocumentNo
      progressReportDocumentNo
      deliveryReportDocumentNo
      visitReportDocumentNo
      incidentReportDocumentNo
      deviationFormDocumentNo
      qualityMeasurementDocumentUrl
      progressReportDocumentUrl
      deliveryReportDocumentUrl
      visitReportDocumentUrl
      incidentReportDocumentUrl
      deviationFormDocumentUrl
    }
    projectsConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const FETCH_PROJECT = gql`
  query fetchProject($projectNumber: String!) {
    project(where: {projectNumber: $projectNumber}) {
      id
      projectNumber
      location
      employeeCode
      employeeName
      description
      mainProject
      contractValue
      additionalTotalAmount
      percentageDone
      percentageDoneDate
      percentageDoneMinValue
      address
      city
      complexExists
      complexPhotoNo
      complexPhotoUrl
      complexCode
      complex {
        code
        subComplexes {
          facePhotoDocument
          facePhotoDocumentNo
          roofSurfaceDocument
          roofSurfaceDocumentNo
        }
      }
      complexName
      amountSpent
      spentVsBudgetted
      amountOnReceipt
      receiptIsNecessary
      invoiced
      qualityMeasurementIsNecessary
      progressReportIsNecessary
      deliveryReportIsNecessary
      qualityMeasurementIsComplete
      progressReportIsComplete
      deliveryReportIsComplete
      additionalWorkDescription1
      additionalWorkAmount1
      additionalWorkDescription2
      additionalWorkAmount2
      additionalWorkDescription3
      additionalWorkAmount3
      additionalWorkDescription4
      additionalWorkAmount4
      additionalWorkDescription5
      additionalWorkAmount5
      additionalWorkDescription6
      additionalWorkAmount6
      qualityMeasurementDocumentNo
      progressReportDocumentNo
      deliveryReportDocumentNo
      visitReportDocumentNo
      incidentReportDocumentNo
      deviationFormDocumentNo
      qualityMeasurementDocumentUrl
      progressReportDocumentUrl
      deliveryReportDocumentUrl
      visitReportDocumentUrl
      incidentReportDocumentUrl
      deviationFormDocumentUrl
      expectedStartDate
      expectedEndDate
      budgetHours
      numberOfDays
      numberOfHourlyWorkBudget
      subcontractorName
      projectMemo
      complexPhotoNo
      complexPhotoUrl
      isMainProject
      reports {
        title
        projectNumber
        reportType
        cards {
          title
          sections {
            title
            questions {
              type
              text
              value
              subQuestions {
                type
                text
                value
              }
            }
          }
        }
        updatedAt
        createdAt
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation updateProjectStatus($projectNumber: String!, $percentageDone: Int) {
    updateProjectPercentageDone(projectNumber: $projectNumber, percentageDone: $percentageDone) {
      id
      projectNumber
      location
      employeeCode
      employeeName
      description
      mainProject
      contractValue
      additionalTotalAmount
      percentageDone
      percentageDoneDate
      percentageDoneMinValue
      address
      city
      complexExists
      complexPhotoNo
      complexPhotoUrl
      complexCode
      complex {
        code
        subComplexes {
          facePhotoDocument
          facePhotoDocumentNo
          roofSurfaceDocument
          roofSurfaceDocumentNo
        }
      }
      complexName
      amountSpent
      spentVsBudgetted
      amountOnReceipt
      receiptIsNecessary
      invoiced
      qualityMeasurementIsNecessary
      progressReportIsNecessary
      deliveryReportIsNecessary
      qualityMeasurementIsComplete
      progressReportIsComplete
      deliveryReportIsComplete
      additionalWorkDescription1
      additionalWorkAmount1
      additionalWorkDescription2
      additionalWorkAmount2
      additionalWorkDescription3
      additionalWorkAmount3
      additionalWorkDescription4
      additionalWorkAmount4
      additionalWorkDescription5
      additionalWorkAmount5
      additionalWorkDescription6
      additionalWorkAmount6
      qualityMeasurementDocumentNo
      progressReportDocumentNo
      deliveryReportDocumentNo
      visitReportDocumentNo
      incidentReportDocumentNo
      deviationFormDocumentNo
      qualityMeasurementDocumentUrl
      progressReportDocumentUrl
      deliveryReportDocumentUrl
      visitReportDocumentUrl
      incidentReportDocumentUrl
      deviationFormDocumentUrl
      expectedStartDate
      expectedEndDate
      budgetHours
      numberOfDays
      numberOfHourlyWorkBudget
      subcontractorName
      projectMemo
      complexPhotoNo
      complexPhotoUrl
      isMainProject
      subProjects {
        id
        percentageDone
        percentageDoneDate
        projectNumber
        complexName
        contractValue
        description
        employeeCode
        city
      }
      reports {
        title
        projectNumber
        reportType
        cards {
          title
          sections {
            title
            questions {
              type
              text
              value
              subQuestions {
                type
                text
                value
              }
            }
          }
        }
        updatedAt
        createdAt
      }
    }
  }
`;

export const REFETCH_PROJECT = gql`
  query refetchProject($costCenterCode: String!) {
    refetchProjects(costCenterCode: $costCenterCode) {
      id
    }
  }
`;

export const ASSIGN_DOCUMENT_TO_PROJECT = gql`
  mutation updateProject($data: ProjectUpdateInput!, $where: ProjectWhereUniqueInput!) {
    updateProject(data: $data, where: $where) {
      id
      projectNumber
      location
      employeeCode
      employeeName
      description
      mainProject
      contractValue
      additionalTotalAmount
      percentageDone
      percentageDoneDate
      percentageDoneMinValue
      address
      city
      complexExists
      complexCode
      complex {
        code
        subComplexes {
          facePhotoDocument
          facePhotoDocumentNo
          roofSurfaceDocument
          roofSurfaceDocumentNo
        }
      }
      complexName
      amountSpent
      spentVsBudgetted
      amountOnReceipt
      receiptIsNecessary
      invoiced
      qualityMeasurementIsNecessary
      progressReportIsNecessary
      deliveryReportIsNecessary
      qualityMeasurementIsComplete
      progressReportIsComplete
      deliveryReportIsComplete
      additionalWorkDescription1
      additionalWorkAmount1
      additionalWorkDescription2
      additionalWorkAmount2
      additionalWorkDescription3
      additionalWorkAmount3
      additionalWorkDescription4
      additionalWorkAmount4
      additionalWorkDescription5
      additionalWorkAmount5
      additionalWorkDescription6
      additionalWorkAmount6
      qualityMeasurementDocumentNo
      progressReportDocumentNo
      deliveryReportDocumentNo
      visitReportDocumentNo
      incidentReportDocumentNo
      deviationFormDocumentNo
      qualityMeasurementDocumentUrl
      progressReportDocumentUrl
      deliveryReportDocumentUrl
      visitReportDocumentUrl
      incidentReportDocumentUrl
      deviationFormDocumentUrl
      expectedStartDate
      expectedEndDate
      budgetHours
      numberOfDays
      numberOfHourlyWorkBudget
      subcontractorName
      projectMemo
      complexPhotoNo
      complexPhotoUrl
      isMainProject
      subProjects {
        id
        percentageDone
        percentageDoneDate
        projectNumber
        complexName
        contractValue
        description
        employeeCode
        city
      }
      reports {
        title
        projectNumber
        reportType
        cards {
          title
          sections {
            title
            questions {
              type
              text
              value
              subQuestions {
                type
                text
                value
              }
            }
          }
        }
      }
    }
  }
`;

export const FETCH_CURRENT_USER = gql`
  query fetchCurrentUser {
    currentUser {
      employee {
        code
        costCenterCode
      }
    }
  }
`;