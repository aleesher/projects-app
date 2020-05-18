import _get from "lodash/get";
import _set from "lodash/set";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import _reduce from "lodash/reduce";
import AsyncStorage from "@react-native-community/async-storage";

import { IDropdownOptionType } from "dakota-2-portal/src/components";

import { IReport, ICard, ISection, IQuestion, ISubQuestion } from "components/Form/models";
import { formatSelectOptions } from "helpers/common";
import { REPORT_DATA } from "./constants";

export const convertSelectToString = (options: IDropdownOptionType[]=[], value: string=""): string =>
   JSON.stringify({ "value": value, "options": options });

export const getInitialValue = (value: string): string => {
  const { options } = JSON.parse(value || "{}");
  return convertSelectToString(options, _get(options, "[0].value"));
}

export const setQuestionValue = (report: IReport, queryResultField: string, value: string, queryResult): IReport => {
  const cards = report.cards.map((card: ICard, cardIdx: number) => {
    return {
      ...card,
      sections: card.sections.map((section: ISection, sIdx: number) => {
        return {
          ...section,
          questions: section.questions.map((question: IQuestion) => {
            if(question.queryResultField === queryResultField) {
              let valueToFill = value;
              if(question.isPrefilled) {
                valueToFill = getInitialValue(value);
              }
              _set(question, "value", valueToFill);
            }
            return question;
          })
        }
      })
    }
  });

  _set(report, "cards", cards);
  return report;
}

export const mapReportDataValues = (data: object = {}, report: IReport) => {
  _set(data, "complexes", _get(data, "projects", []));

  const formattedData = _map(data, (value: any=[], key: string) => ({
    key,
    value: convertSelectToString(formatSelectOptions(REPORT_DATA[key].label,
    value,
    REPORT_DATA[key].value))
  }));

  return _reduce(formattedData, (acc, item: any) =>
    ({ ...acc, ...setQuestionValue(report, item.key, item.value, data) }), {});

}

export const getDependentFieldValue = (
  queryResult: object = {},
  section: ISection,
  question: IQuestion
) => {
  const data = _get(queryResult, question.queryResultField, []);
  const { value } = JSON.parse(question.value || "{}");
  const item = data.find((item: object = {}) => item[question.field || ""] === value);

  const qIdx = section.questions.findIndex(
    (q: IQuestion) => q.field === question.dependentField
  );

  const questionToChange = section.questions[qIdx];

  const newValue = {
    "value": item[_get(questionToChange, "field", "")],
    "options": [
      {
        value: item[_get(questionToChange, "field", "")],
        label: item[_get(questionToChange, "field", "")]
      }
    ]
  }

  return {
    value: JSON.stringify(newValue),
    index: qIdx
  };
}

export const changeReportQuestion = (
  report: IReport,
  queryResult: object,
  cIdx: number,
  sIdx: number,
  qIdx: number
) => {
  const section: ISection = _get(report, `cards[${cIdx}].sections[${sIdx}]`, null);
  const question: IQuestion = _get(section, `questions[${qIdx}]`, null);
  if(!!question && !!question.dependentField) {
    const { index, value } = getDependentFieldValue(queryResult, section, question);
    _set(
      report,
      `cards[${cIdx}].sections[${sIdx}].questions[${index}].value`,
      value
    );
  }

  return report;
}

export const setReportToStorage = async (storageKey: string, report: IReport) => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(report));
  } catch(err) {
    console.warn(JSON.stringify(err));
  }
}

export const getReportFromStorage = async (storageKey: string) => {
  try {
    const report = await AsyncStorage.getItem(storageKey);
    return JSON.parse(report || "{}");
  } catch(err) {
    console.warn(JSON.stringify(err));
  }
}

export const removeReportFromStorage = async (storageKey: string) => {
  try {
    await AsyncStorage.removeItem(storageKey);
  } catch(err) {
    console.warn(JSON.stringify(err, null, 2));
  }
}

export const showSubQuestion = (subQuestion: ISubQuestion, value: string, type: string) => {
  const { isSubQuestionDependent } = subQuestion;
  const hasDependentField = isSubQuestionDependent && !!value.length;
  return !isSubQuestionDependent
          ? true
          : type === "RADIO"
            ? hasDependentField && value === "yes"
            : hasDependentField;
}