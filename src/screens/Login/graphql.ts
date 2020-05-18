import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        email
        username
        token
        termsOfUse {
          id
          text
          version
        }
        agreedTermsOfUse
      }
    }
  }
`;
