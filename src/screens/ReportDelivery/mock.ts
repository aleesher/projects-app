import { IReport, ICard, QuestionEnum } from "components/Form/models";

const GENERAL_CARD: ICard = {
  title: "Algemeen",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.DROPDOWN, text: "Projectnummer", value: `{ "value": "", "options": [] }`, queryResultField: "projects", dependentField: "complexCode", field: "projectNumber", isPrefilled: true },
        { type: QuestionEnum.DROPDOWN, text: "Complexnummer", value: `{ "value": "", "options": [] }`, queryResultField: "complexes", field: "complexCode", isPrefilled: true },
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
        { type: QuestionEnum.PHOTO_REPORT, text: "Omschrijving", value: `{ "hasAddMore": true, "reports": [{ "id": 1, "image": "", "text": "" }], "limit": 12 }` },
      ]
    }
  ]
};

const RESULT_CARD: ICard = {
  title: "",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.INFO, text: "Bevindingen", value: "" }
      ]
    }
  ]
};

const DELIVERY_POINTS_CARD: ICard = {
  title: "Opleverpunten",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": true, "values": [{ "text": "", "id": "${Math.random()}" }] }` },
      ]
    }
  ]
};

const ACTIVITIES_OVERVIEW_CARD: ICard = {
  title: "",
  sections: [
    {
      title: "",
      questions: [
        {
          type: QuestionEnum.PRICE,
          text: "Omschrijving",
          value: `{ "hasAddIcon": true, "hasTotalColumn": true, "hasDescriptionField": true, "values": [{ "id": 0, "price": 0, "description": "" }] }`
        }
      ]
    }
  ]
};

const SIGNATURE_CARD: ICard = {
  title: "Ondertekening projectleider",
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

const CUSTOMER_SIGNATURE_CARD: ICard = {
  title: "Ondertekening klant",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.INFO, text: "Naam klaant", value: "", isNameField: true },
        { type: QuestionEnum.SIGNATURE, text: "Handtekening klaant", value: "" }
      ]
    }
  ]
};

export const DELIVERY_REPORT: IReport = {
  title: "Opleveringsrapport",
  cards: [
    GENERAL_CARD,
    PHOTO_CARD,
    RESULT_CARD,
    DELIVERY_POINTS_CARD,
    ACTIVITIES_OVERVIEW_CARD,
    SIGNATURE_CARD,
    CUSTOMER_SIGNATURE_CARD
  ]
};
