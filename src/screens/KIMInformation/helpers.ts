import moment from "moment";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isArray from "lodash/isArray";
import _reduce from "lodash/reduce";
import _pick from "lodash/pick";
import _omit from "lodash/omit";
import _isString from "lodash/isString";

import { MEDIA_URL } from "dakota-2-portal/src/helpers/fileHelpers";

import {
  parseString,
  omitEmptyFields,
  toString
} from "helpers/common";
import { NON_PARSED_FIELDS } from "./constants";

export const getDefaultValues = () => {
  const date = moment().week();
  return {
    id: null,
    projectLeader: {},
    foreman: {},
    email: "",
    phone: "",
    startDate: date,
    schedule: "",
    deliveryDate: date,
    noiseAndDrilling: { date, value: "yes" },
    noiseAndGravel: { date, value: "yes" },
    noiseAndDemolition: { date, value: "yes" },
    vibrationDemolition: { date, value: "yes" },
    dustAndWipe: { date, value: "yes" },
    dustAndDemolish: { date, value: "yes" },
    smellAndBitumen: { date, value: "yes" },
    smellAndCoatings: { date, value: "yes" },
    crane: { date, value: "yes" },
    container: { date, value: "yes" },
    constructionSite: { date, value: "yes" },
    photo: [],
    imgError: {},
    foremanPhoto: "",
    projectLeaderPhoto: ""
  }
}

export const getImageList = (values: object, field: string) => {
  const images = !_get(values, field) ? [] : _get(values, field);
  const list = _isEmpty(images) ? [] : _isArray(images) ? images : [images];
  return list.map((image: string) => `${MEDIA_URL}/${image}`);
}

export const initValues = (data: any) => {
  const omitted = omitEmptyFields(_omit(data, NON_PARSED_FIELDS));
  const picked = _reduce(_pick(data, NON_PARSED_FIELDS), (acc, value, key) => ({ ...acc, [key]: !!value ? value : "" }), {});
  const parsedValues = _reduce(omitted, (acc, value, key) =>({...acc, [key]: parseString(value) }), {});
  return { ...data, ...picked, ...parsedValues };
}

export const generateMutationVariables = (values: object, navigation) => {
  const projectNumber = _get(navigation, "state.params.projectNumber", {});
  const variables = _reduce(values, (acc, value, field) => ({
    ...acc, [field]: field !=="id" && !_isString(value) ? toString(value) : value
  }), { projectNumber });
  return omitEmptyFields(variables);
}