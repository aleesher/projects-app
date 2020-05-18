import { IReport, ICard, QuestionEnum } from "components/Form/models";
import { GENERALCARD_OPTIONS, INCIDENT_REPORT_OPTIONS, CALLED_112_CHECKMARKS } from "components/Form/constants";

const GENERAL_CARD: ICard = {
  title: "Algemeen",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.DROPDOWN, text: "Projectnummer", value: `{ "value": "", "options": [] }`, queryResultField: "projects", dependentField: "complexCode", field: "projectNumber", isMandatory: true, isPrefilled: true },
        { type: QuestionEnum.DROPDOWN, text: "Complexnummer", value: `{ "value": "", "options": [] }`, queryResultField: "complexes", field: "complexCode", isPrefilled: true },
      ]
    }
  ]
};

const INCIDENT_CARD: ICard = {
  title: "Incident",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.DATE, text: "Datum incident", value: "" },
        { type: QuestionEnum.INFO, text: "Omschrijving", value: "" , queryResultField: "projects", field: "description", isPrefilled: true, isMandatory: true },
        { type: QuestionEnum.DROPDOWN, text: "Type incident", value: `{ "value": "", "options": ${JSON.stringify(INCIDENT_REPORT_OPTIONS)} }`, isMandatory: true },
        {
          type: QuestionEnum.RADIO,
          text: "Persoonlijk letsel?",
          value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.RADIO, text: "Persoonlijk letsel met ziekenhuis bezoek?", value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }`, isSubQuestionDependent: true, isMandatory: true }
          ],
          isMandatory: true
        },
        {
          type: QuestionEnum.RADIO,
          text: "112 Gebeld?",
          value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.CHECKBOX, text: "", value: `{ "value": [], "options": ${JSON.stringify(CALLED_112_CHECKMARKS)} }`, isSubQuestionDependent: true, isMandatory: true }
          ],
          isMandatory: true
        },
        { type: QuestionEnum.RADIO, text: "Opdrachtgever is geinformeerd", value: `{ "value": "", "options": ${JSON.stringify([...GENERALCARD_OPTIONS, { title: "onbekend", value: "unknown" }])} }`, isMandatory: true},
      ]
    }
  ]
}

const MEASURE_DESCRIPTION_CARD: ICard = {
  title: "Omschrijving incident",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` },
        { type: QuestionEnum.PHOTO_REPORT, text: "Foto's", value: `{ "hasAddMore": true, "reports": [{ "id": 1, "image": "", "text": "" }] }` },
      ]
    }
  ]
}

const INCIDENT_DESCRIPTION_CARD: ICard = {
  title: "Omschrijving genomen maatregelen",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`, isMandatory: true },
      ]
    }
  ]
};

const FOLLOW_ACTIONS_DESCRIPTION_CARD: ICard = {
  title: "Omschrijving van de vereiste vervolgactie",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.TEXT, text: "Omschrijving:", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`, isMandatory: true },
        { type: QuestionEnum.INFO, text: "Actie door", value: "", isMandatory: true, isNameField: true },
        { type: QuestionEnum.RADIO, text: "Spoed?", value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }`, isMandatory: true }
      ]
    }
  ]
}

export const INCIDENT_REPORT: IReport = {
  title: "Incidenten rapport",
  cards: [
    GENERAL_CARD,
    INCIDENT_CARD,
    MEASURE_DESCRIPTION_CARD,
    INCIDENT_DESCRIPTION_CARD,
    FOLLOW_ACTIONS_DESCRIPTION_CARD
  ]
};
