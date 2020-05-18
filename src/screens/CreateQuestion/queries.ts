import gql from "graphql-tag";

export const CREATE_FAQ = gql`
  mutation createKimInformation(
    $header: String
    $answer: String
    $question: String
    $projectNumber: String!
  ) {
    createFaq(
      data: {
        question: $question,
        answer: $answer,
        header: $header,
        projectNumber: $projectNumber
      }
    ) {
      id
    }
  }
`;

export const FETCH_FAQS = gql`
  query fetchFAQs($projectNumber: String!) {
    faqs(where: { projectNumber: $projectNumber }) {
      id
      question
      answer
      header
      projectNumber
    }
  }
`;

export const DELETE_FAQ = gql`
  mutation deleteFAQ($id: ID!) {
    deleteFaq(where:{ id: $id}) {
      id
    }
  }
`;