import { Dimensions } from "react-native";
import _get from "lodash/get";
import _set from "lodash/set";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _reduce from "lodash/reduce";
import _pickBy from "lodash/pickBy";
import _identity from "lodash/identity";

import { IDropdownOptionType } from "dakota-2-portal/src/components";
import authHelper from "dakota-2-portal/src/helpers/authHelpers";

export const formatPrice = (price: number) =>
  Number(price).toLocaleString("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

export const isPortraitView = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
}

export const toString = (value: any) => JSON.stringify(value);

export const parseString = (value: string) => JSON.parse(value);

export const formatSelectOptions = (labels: string[], arr: any[]=[], value: any = "id"): IDropdownOptionType[] => {
  return arr.map((item) => {
    return {
      "label": labels.reduce((acc: string, label: string ) => `${acc} ${item[label]}`, ""),
      "value": item[value]
    }
  })
}

export const fieldIsInvalid = (touched: any, errors: any, field: string) => {
  return !!(_get(touched, field) && _get(errors, field)) ? _get(errors, field) : undefined;
}

export const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}

export const parseFieldValue = (val: string) => {
  if(!val) {
    return val;
  }
  const parsed = val.includes("{") ? JSON.parse(val || "{}") : null;
  return _isEmpty(parsed) ? val : _get(parsed, "value", "");
}

export const getAuthHeaders = async () => {
  const token = await authHelper.getToken();
  return {"Authorization": token };
};

export const omitEmptyFields = (value: object) =>
  _pickBy(value, _identity);
