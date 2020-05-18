export enum EProjectQueryVariant {
  ALL_PROJECTS = "ALL_PROJECTS",
  MY_PROJECTS ="MY_PROJECTS"
}

export type TProjectQueryType = EProjectQueryVariant.ALL_PROJECTS | EProjectQueryVariant.MY_PROJECTS;