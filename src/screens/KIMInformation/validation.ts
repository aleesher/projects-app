import * as yup from "yup";

export const kimInformationSchema = yup.object({
  projectLeader: yup.object({ name: yup.string().required()}),
  foreman: yup.object({ name: yup.string().required()}),
  email: yup.string().email().required(),
  phone: yup.string().required(),
  startDate: yup.string().required(),
  schedule: yup.string().required(),
  deliveryDate: yup.string().required(),
  noiseAndDrilling: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  noiseAndGravel: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  noiseAndDemolition: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  vibrationDemolition: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  dustAndWipe: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  dustAndDemolish: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  smellAndBitumen: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  smellAndCoatings: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  crane: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  container: yup.object({ value: yup.string().required(), date: yup.string().required()}),
  constructionSite: yup.object({ value: yup.string().required(), date: yup.string().required()})
});
