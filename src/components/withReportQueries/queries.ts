import gql from "graphql-tag";
import { IReport } from "components/Form/models";

const getSignatureValue = (value) => {
  const val = JSON.parse(value || `{"paths": "", "base64": ""}`);
  return JSON.stringify(val.base64);
}

const getValueForQuestion = (type, value) => {
  const v = type === "SIGNATURE" ? getSignatureValue(value) : value;
  return v.replace(/"/g, "'");
}

export const getCreateReportMutation = (report: IReport) => {
  const { title, projectNumber, reportType, cards } = report;
  return gql`
    mutation {
      createReport (
        data: {
          title: "${title}"
          projectNumber: "${projectNumber}"
          reportType: ${reportType}
          cards: {
            create: [
              ${cards.map(card => `
              {
                title: "${card.title}"
                sections: {
                  create: [
                  ${card.sections.map(section => `
                    {
                      title: "${section.title}"
                      questions: {
                        create: [
                          ${section.questions.map(question => `
                            {
                              type: ${question.type}
                              text: "${question.text}"
                              value: "${getValueForQuestion(question.type, question.value)}"
                            ${question.subQuestions && question.subQuestions.length
                              ? `
                                subQuestions: {
                                  create: [
                                    ${question.subQuestions.map(subQuestion => `
                                      {
                                        type: ${subQuestion.type}
                                        text: "${subQuestion.text}"
                                        value: "${getValueForQuestion(subQuestion.type, subQuestion.value)}"
                                      }
                                    `).join("")}
                                  ]
                                }
                              `
                              : ""
                            }
                            }
                          `).join("")}
                        ]
                      }
                    }
                  `).join("")}
                  ]
                }
              }
              `).join("")}
            ]
          }
        }
      ) {
        id
      }
    }
  `;
};

export const GET_REPORT_BY_ID = gql`
  query GetReport($id: ID!) {
    report(where: { id: $id }) {
      id
      projectNumber
      reportType
      title
      cards {
        id
        title
        sections {
          id
          title
          questions {
            id
            type
            text
            value
            subQuestions {
              id
              type
              text
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_REPORT_DATA = gql`
  query fetchReportData($projectNumber: String!, $costCenterCode: String) {
    projects(where: { projectNumber: $projectNumber}) {
      id
      projectNumber
      description
      complexCode
    }
    employees(where:{costCenterCode: $costCenterCode, isServiceEngineer: false}) {
      id
      nameFormal
    }
  }
`;