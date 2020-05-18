import _get from "lodash/get";

import { IProjectCard } from "components/ProjectCard/models";

export type CalcType = "totalWorkAmount" | "spentVsBudgetted";

export const calcTotalWorkAmount = (project: IProjectCard | {}) =>
  parseFloat(_get(project, "additionalTotalAmount", 0) + _get(project, "contractValue", 0));

export const calcSpentVsBudgetted = (project: IProjectCard | {}) =>
  parseFloat(_get(project, "invoiced", 0)) - parseFloat(_get(project, "amountSpent", 0));

export const calcFieldValue = (project: IProjectCard | {}, type: CalcType) =>
  type === "spentVsBudgetted" ? calcSpentVsBudgetted(project) : calcTotalWorkAmount(project);