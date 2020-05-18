import { IReport, ICard, QuestionEnum } from "components/Form/models";
import { DEVIATION_FORM_RADIO_OPTIONS } from "components/Form/constants";

const GENERAL_CARD: ICard = {
  title: "Algemeen",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.DATE, text: "Datum", value: "", isMandatory: true },
        { type: QuestionEnum.DROPDOWN, text: "Gemeld door", value: `{ "value": "", "options": [] }`, queryResultField: "employees", field: "id" },
        { type: QuestionEnum.RADIO, text: DEVIATION_FORM_RADIO_OPTIONS.text, value: `{ "value": "", "options": ${JSON.stringify(DEVIATION_FORM_RADIO_OPTIONS.options)} }`},
      ]
    }
  ]
};

const APPOINTMENTS_MEASURES_CARD: ICard = {
  title: "Afspraken / Maatregelen",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.TEXT, text: "Voer hier je afspraken / bevindingen in:", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` },
        { type: QuestionEnum.PRICE, text: "Geschatte kosten in euro’s", value: `{ "hasAddIcon": false, "hasTotalColumn": false, "hasDescriptionField": false, "values": [{ "id": 0, "price": 0, "description": "" }] }`, isMandatory: true },
        { type: QuestionEnum.PRICE, text: "Geschatte kosten in euro’s", value: `{ "hasAddIcon": false, "hasTotalColumn": false, "hasDescriptionField": false, "values": [{ "id": 0, "price": 0, "description": "" }] }`, isMandatory: true },
        { type: QuestionEnum.DROPDOWN, text: "Naam", value: `{ "value": "", "options": [] }`, queryResultField: "employees", field: "id" },
      ]
    }
  ]
}

const SIGNATURE_CARD: ICard = {
  title: "Handtekening projectleider",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.DATE, text: "Datum", value: "" },
        { type: QuestionEnum.DROPDOWN, text: "Naam", value: `{ "value": "", "options": [] }`, queryResultField: "employees", field: "id" },
        { type: QuestionEnum.SIGNATURE, text: "Handtekening ter controle van dit Afwijkingsrapport *", value: "" }
      ]
    }
  ]
};

const PHOTO_CARD: ICard = {
  title: "Foto's",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.PHOTO_REPORT, text: "Omschrijving", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }` },
      ]
    }
  ]
};

export const DEVIATION_REPORT: IReport = {
  title: "Afwijkingsrapport",
  cards: [
    GENERAL_CARD,
    APPOINTMENTS_MEASURES_CARD,
    SIGNATURE_CARD,
    PHOTO_CARD
  ]
};
