import gql from "graphql-tag";

export const GET_REPORTS = gql`
  query reports($projectNumber: String) {
    reports(where: { projectNumber: $projectNumber }) {
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
          }
        }
      }
    }
  }
`;
