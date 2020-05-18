import urls from "helpers/urls";
import { CalcType } from "./helpers";

export const REPORTS_CARDS_INFO = [
  {
    id: 1,
    type: {
      id: 0,
      name: "rapport voltooid"
    },
    status: {
      id: 0,
      name: "Kwaliteitsmeting",
      url: urls.QUALITY_MEASUREMENT,
      statusType: "finished"
    }
  },
  {
    id: 2,
    type: {
      id: 0,
      name: "rapport voltooid"
    },
    status: {
      id: 0,
      name: "Bezoek rapport",
      url: urls.VISIT_REPORT,
      statusType: "finished"
    }
  },
  {
    id: 3,
    type: {
      id: 0,
      name: "rapport voltooid"
    },
    status: {
      id: 0,
      name: "Incidenten rapport",
      url: urls.INCIDENT_REPORT,
      statusType: "finished"
    }
  },
  {
    id: 4,
    type: {
      id: 0,
      name: "rapport voltooid"
    },
    status: {
      id: 0,
      name: "KIM Information",
      url: urls.KIM_INFORMATION,
      statusType: "finished"
    }
  },
  {
    id: 5,
    type: {
      id: 1,
      name: "rapportage gereed om in te vuilen"
    },
    status: {
      id: 1,
      name: "Voortgangsverslag",
      url: urls.PROGRESS_REPORT,
      statusType: "critical"
    }
  },
  {
    id: 6,
    type: {
      id: 1,
      name: "rapportage gereed om in te vuilen"
    },
    status: {
      id: 2,
      name: "Opleveringsrapport",
      url: urls.DELIVERY_REPORT,
      statusType: "problematic"
    }
  },
  {
    id: 7,
    type: {
      id: 1,
      name: "rapportage gereed om in te vuilen"
    },
    status: {
      id: 2,
      name: "Afwijkingsrapport",
      url: urls.DEVIATION_FORM,
      statusType: "problematic"
    }
  }
];

export const BUILDING_IMAGE_PATH = "../../../../assets/images/building.jpeg";

export interface IFinanceField {
  title: string;
  key: string;
  affected?: boolean;
  operation?: CalcType;
}

export const FINANCE_FIELDS: IFinanceField[] = [
  {
    title: "Aanneemsom",
    key: "contractValue"
  },
  {
    title: "Aanvullend werk",
    key: "additionalTotalAmount",
    affected: true
  },
  {
    title: "Totaal",
    key: "",
    operation: "totalWorkAmount"
  },
  {
    title: "Besteed",
    key: "amountSpent"
  },
  {
    title: "Gefactureerd",
    key: "invoiced"
  },
  {
    title: "Gefactureerd vs besteed",
    key: "spentVsBudgetted",
    affected: true,
    operation: "spentVsBudgetted"
  },
];

export const TIME_ACTUAL_INFO_DATA = [
  {
    field: "Naam",
    value: "Arjan Reurink"
  },
  {
    field: "Functie van de dakdekker",
    value: "-"
  },
  {
    field: "Type serviceorder",
    value: "-"
  },
  {
    field: "Informant van klacht",
    value: "-"
  },
  {
    field: "Adres en huisnummer van de informant",
    value: "-"
  }
]