import gql from "graphql-tag";

export const UPDATE_KIMINFORMATION = gql`
  mutation updateKimInformation(
    $id: ID!
    $projectLeader: String
    $foreman: String
    $email: String
    $phone: String
    $startDate: String
    $schedule: String
    $deliveryDate: String
    $noiseAndDrilling: String
    $noiseAndGravel: String
    $noiseAndDemolition: String
    $vibrationDemolition: String
    $dustAndWipe: String
    $dustAndDemolish: String
    $smellAndBitumen: String
    $smellAndCoatings: String
    $crane: String
    $container: String
    $constructionSite: String
    $photo: String
    $projectLeaderPhoto: String
    $foremanPhoto: String
  ) {
    updateKimInformation(
      data: {
        projectLeader: $projectLeader
        foreman: $foreman
        email: $email
        phone: $phone
        startDate: $startDate
        schedule: $schedule
        deliveryDate: $deliveryDate
        noiseAndDrilling: $noiseAndDrilling
        noiseAndGravel: $noiseAndGravel
        noiseAndDemolition: $noiseAndDemolition
        vibrationDemolition: $vibrationDemolition
        dustAndWipe: $dustAndWipe
        dustAndDemolish: $dustAndDemolish
        smellAndBitumen: $smellAndBitumen
        smellAndCoatings: $smellAndCoatings
        crane: $crane
        container: $container
        constructionSite: $constructionSite
        photo: $photo
        projectLeaderPhoto: $projectLeaderPhoto
        foremanPhoto: $foremanPhoto
      }
      where: { id: $id }
    ) {
      id
      projectNumber
      projectLeader
      projectLeaderPhoto
      foreman
      foremanPhoto
      email
      phone
      startDate
      schedule
      deliveryDate
      noiseAndDrilling
      noiseAndGravel
      noiseAndDemolition
      vibrationDemolition
      dustAndWipe
      dustAndDemolish
      smellAndBitumen
      smellAndCoatings
      crane
      container
      constructionSite
      photo
    }
  }
`;

export const CREATE_KIMINFORMATION = gql`
  mutation createKimInformation(
    $projectNumber: String!
    $projectLeader: String
    $foreman: String
    $email: String
    $phone: String
    $startDate: String
    $schedule: String
    $deliveryDate: String
    $noiseAndDrilling: String
    $noiseAndGravel: String
    $noiseAndDemolition: String
    $vibrationDemolition: String
    $dustAndWipe: String
    $dustAndDemolish: String
    $smellAndBitumen: String
    $smellAndCoatings: String
    $crane: String
    $container: String
    $constructionSite: String
    $photo: String
    $projectLeaderPhoto: String
    $foremanPhoto: String
  ) {
    createKimInformation(
      data: {
        projectNumber: $projectNumber
        projectLeader: $projectLeader
        foreman: $foreman
        email: $email
        phone: $phone
        startDate: $startDate
        schedule: $schedule
        deliveryDate: $deliveryDate
        noiseAndDrilling: $noiseAndDrilling
        noiseAndGravel: $noiseAndGravel
        noiseAndDemolition: $noiseAndDemolition
        vibrationDemolition: $vibrationDemolition
        dustAndWipe: $dustAndWipe
        dustAndDemolish: $dustAndDemolish
        smellAndBitumen: $smellAndBitumen
        smellAndCoatings: $smellAndCoatings
        crane: $crane
        container: $container
        constructionSite: $constructionSite
        photo: $photo
        projectLeaderPhoto: $projectLeaderPhoto
        foremanPhoto: $foremanPhoto
      }
    ) {
      id
      projectNumber
      projectLeader
      projectLeaderPhoto
      foreman
      foremanPhoto
      email
      phone
      startDate
      schedule
      deliveryDate
      noiseAndDrilling
      noiseAndGravel
      noiseAndDemolition
      vibrationDemolition
      dustAndWipe
      dustAndDemolish
      smellAndBitumen
      smellAndCoatings
      crane
      container
      constructionSite
      photo
    }
  }
`;

export const FETCH_KIMINFORMATION = gql`
  query kimInformation($projectNumber: String!, $costCenterCode: String) {
    kimInformation(where: { projectNumber: $projectNumber }) {
      id
      projectNumber
      projectLeader
      projectLeaderPhoto
      foreman
      foremanPhoto
      email
      phone
      startDate
      schedule
      deliveryDate
      noiseAndDrilling
      noiseAndGravel
      noiseAndDemolition
      vibrationDemolition
      dustAndWipe
      dustAndDemolish
      smellAndBitumen
      smellAndCoatings
      crane
      container
      constructionSite
      photo
    }
    employees(where:{costCenterCode: $costCenterCode, isServiceEngineer: false}) {
      id
      nameFormal
    }
  }
`;