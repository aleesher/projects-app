import { IReport, ICard, QuestionEnum } from "components/Form/models";
import { GENERALCARD_OPTIONS } from "components/Form/constants";

const GENERAL_CARD: ICard = {
  title: "Algemeen",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.DROPDOWN, text: "Projectnummer", value: `{ "value": "", "options": [] }`, queryResultField: "projects", dependentField: "complexCode", field: "projectNumber", isMandatory: true, isPrefilled: true },
        { type: QuestionEnum.DROPDOWN, text: "Complexnummer", value: `{ "value": "", "options": [] }`, queryResultField: "complexes", field: "complexCode", isPrefilled: true },
        { type: QuestionEnum.RADIO, text: "Voorman aanwezig?", value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }`, isMandatory: true },
        { type: QuestionEnum.RADIO, text: "Opdrachtgever aanwezig?", value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }`, isMandatory: true },
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
        { type: QuestionEnum.PHOTO_REPORT, text: "Omschrijving", value: `{ "hasAddMore": true, "reports": [{ "id": 1, "image": "", "text": "" }] }` }
      ]
    }
  ]
};

const GENERAL_CARD2: ICard = {
  title: "Algemeen",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.RADIO, text: "Brandgevaarlijke situaties gecontroleerd", value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }` },
        { type: QuestionEnum.RADIO, text: "Valgevaarlijke situaties gecontroleerd", value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }` },
        { type: QuestionEnum.RADIO, text: "Technische kwaliteit gecontroleerd", value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }` },
        { type: QuestionEnum.RADIO, text: "Bouwplaats gecontroleerd", value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)} }` },
        { type: QuestionEnum.RADIO, text: "Afwijkingen aangetroffen", value: `{ "value": "", "options": ${JSON.stringify(GENERALCARD_OPTIONS)}, "info": "Indien je deze vraag met 'ja' beantwoord, vul dan ook het incidenten rapport in" }` },
        { type: QuestionEnum.TEXT, text: "Omschrijf de aangetroffen afwijkingen", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
      ]
    }
  ]
};

const SIGNATURE_CARD: ICard = {
  title: "Bezoek rapport",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.DATE, text: "Datum", value: "" },
        { type: QuestionEnum.DROPDOWN, text: "Naam projectleider", value: `{ "value": "", "options": [] }`, queryResultField: "employees", field: "id" },
        { type: QuestionEnum.SIGNATURE, text: "Handtekening projectleider", value: "" }
      ]
    }
  ]
};

export const VISIT_REPORT: IReport = {
  title: "Bezoek rapport",
  cards: [
    GENERAL_CARD,
    PHOTO_CARD,
    GENERAL_CARD2,
    SIGNATURE_CARD
  ]
};
