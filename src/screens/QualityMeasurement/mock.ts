import { IReport, ICard, QuestionEnum } from "components/Form/models";
import { RADIO_OPTIONS } from "components/Form/constants";

const GENERAL_CARD: ICard = {
  title: "Algemeen",
  sections: [
    {
      title: "Instructie",
      questions: [
        {
          type: QuestionEnum.RADIO,
          text: "Is met de ploeg een kick off georganiseerd bij aanvang van het werk? Is de werkbrief doorgesproken?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is het V&G plan doorgenomen met alle betrokkenen en is dit vastgelegd met handtekeningen?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn de dakdetails gecontroleerd op brandrisico's en is de werkwijze bij de brandgevaarlijke details met het team besproken?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn de bijzondere gevaren in kaart gebracht en met de medewerkers doorgenomen (straling, gas, ontploffing, asbest)?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de voorman voorgesteld aan de opdrachtgever en zijn de bewoners geïnformeerd over onze werkzaamheden?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        { type: QuestionEnum.RADIO, text: "Zijn de bewoners geïnformeerd over onze werkzaamheden?", value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }` }
      ]
    },
    {
      title: "Omgeving",
      questions: [
        {
          type: QuestionEnum.RADIO,
          text: "Zijn de werkplek en bouwplaats geordend en opgeruimd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de directe omgeving rondom het dak vrij van dakafval?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }` },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de toegang naar het dak beschermd (vloer/trap/lift)?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is op het werk een schaft- en/of toiletvoorziening aanwezig?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Wordt het dakafval gescheiden en op een juiste wijze afgevoerd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
      ]
    }
  ]
};

const SAFETY_CARD: ICard = {
  title: "Veiligheid",
  sections: [
    {
      title: "Algemene veiligheid",
      questions: [
        {
          type: QuestionEnum.RADIO,
          text: "Dragen alle medewerkers de voorgeschreven werkkleding en PBM's?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Wordt bij het vegen, zagen, slijpen en boren inademen van kwartsstof voorkomen?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden tilwerkzaamheden zwaarder dan 25kg voorkomen?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is een EHBO-trommel aanwezig?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn de elektrische en handgereedschappen deugdelijk en zo nodig goedgekeurd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn gevaarlijke stoffen aanwezig (asbest/teermastiek/oplosmiddelen) en wordt hier juist mee omgegaan?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is bij het werken met een mobiele kraan de openbare weg voldoende afgezet?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn de containers en bigbags gecertificeerd voor hijswerkzaamheden. Is het hijsgereedschap in goede staat en goedgekeurd? Zijn bij het hijsen de lasten voldoende gezekerd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de ladderlift correct en veilig opgesteld?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        }
      ]
    },
    {
      title: "Brand veiligheid",
      questions: [
        {
          type: QuestionEnum.RADIO,
          text: "Worden de details brandveilig (koud verkleefd of met een föhn) ingewerkt?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is het voorgeschreven aantal brandblussers op het dak aanwezig (2 x ABC poederblusser à 12 kg per werkplek)? Zijn de brandblussers goedgekeurd en op druk?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is er één blusdeken per werkplek aanwezig?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn de gasflessen voorzien van de juiste drukregelaar? Zijn de gasslangen in goede staat en maximaal 2 jaar oud?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn alle materialen op minimaal 5 meter vanaf open vuur, opgaandwerk, dakrand en obstakels opgeslagen?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is een deugdelijke lekbak met voldoende opvangcapaciteit onder de ketel geplaatst?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Heeft de ketel een goed sluitend deksel en werkt de thermostaat in de ketel goed?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn 2 x ABC poederblusser à 12 kg bij de ketel geplaatst?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Bedraagt de afstand van de ketel tot de gasfles minimaal 5 meter?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        }
      ]
    },
    {
      title: "Valbeveiliging",
      questions: [
        {
          type: QuestionEnum.RADIO,
          text: "Is de ladder functioneel en goedgekeurd? Is de ladder deugdelijk opgesteld en vastgezet?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is het steigerwerk functioneel en goedgekeurd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn de hekwerken correct opgesteld en met elkaar verbonden?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }` },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn sparingen en zwakke lichtopeningen juist beveiligd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        }
      ]
    }
  ]
};

const TECHINC_CARD: ICard = {
  title: "Techniek",
  sections: [
    {
      title: "Technische kwaliteit",
      questions: [
        {
          type: QuestionEnum.RADIO,
          text: "Is de ondergrond vlak, gaaf, droog en schoon?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de ondergrond voorzien van een hechtprimer?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Wordt de dampremmende laag op de juiste wijze aangebracht?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de relatie isolatiedikte/bovendalbreedte staalplaat correct? Worden de isolatieplaten haaks op de canelurerichting aangebracht?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden de isolatieplaten in verband gelegd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden bij een isolatie van MWR tule-bevestigers toegepast?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden de isolatieplaten vastgezet met de juiste hoeveelheid werkparkers of is de verkleving van de platen voldoende?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden de tapes van de dakbedekking verwijderd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Wordt bij het aanbrengen van de toplaag een harde kern gebruikt?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden de hoekjes van de onderliggende baan weggesneden?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden de dakbanen in verband aangebracht?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Wordt aan het einde van de dag een waterdichte aansluiting gemaakt?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de temperatuur goed voor het aanbrengen van zelfklevende dakbanen en/of rand- en opstandstroken?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            {
              type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }`
            }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de verkleving van de onderlaag of toplaag voldoende (rol terugtrekken of insnijding)?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de breedte van het volledig verkleefde deel van de langsoverlap minimaal 70 mm en van de kopse overlap minimaal 150 mm (insnijding)?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden de overlappen aangedrukt met een wals?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden trim, afvoer en doorvoer vooraf ontvet?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden afvoer en doorvoer aanvullend mechanisch bevestigd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden de afvoeren verdiept en de doorvoeren verhoogd ingewerkt?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Wordt de ruimte tussen isolatieplaat en doorvoer of afvoer volgeschuimd met PUR isolatie?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }`, isMandatory: true },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Zijn de rozetten minimaal 300 mm breder dan de plakplaat van de afvoer en doorvoer?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden de randstroken van de 1ste laag en de toplaag respectievelijk minimaal 100 mm en 70 mm op het dakvlak aangebracht (effectieve hechtbreedte)?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Wordt kimfixatie toegepast?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Bedraagt de hechting van de overlap voorbij de drukverdeelplaat minimaal 70 mm bij mechanische kimfixatie?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden de tegels met minimaal 15 mm spoelruimte gelegd?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is het ballastgrind minimaal 40 mm dik aangebracht?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.TEXT, text: "Omschrijving", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Worden conform windbelastingsberekening per zone de juiste hoeveelheid bevestigers toegepast?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }` },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de breedte van het volledig verkleefde deel van de langsoverlap minimaal 70 mm (insnijding)?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }` },
          ]
        },
        {
          type: QuestionEnum.RADIO,
          text: "Is de breedte van het volledig verkleefde deel van de kopse overlap minimaal 150 mm (insnijding)?",
          value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }`,
          subQuestions: [
            { type: QuestionEnum.PHOTO_REPORT, text: "", value: `{ "reports": [{ "id": 1, "image": "", "text": "" }] }` },
          ]
        },
        { type: QuestionEnum.RADIO, text: "Is de verkleving van de isolatieplaten voldoende?", value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }` },
        { type: QuestionEnum.RADIO, text: "Worden de isolatieplaten vastgezet met de juiste hoeveelheid werkparkers?", value: `{ "value": "", "options": ${JSON.stringify(RADIO_OPTIONS)} }` },
      ]
    }
  ]
};

const REPORT_CARD: ICard = {
  title: "Verslag",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.TEXT, text: "Voer hier je bevindingen in:", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` },
        { type: QuestionEnum.TEXT, text: "Doorgevoerde veranderingen", value: `{ "hasAddMore": false, "values": [{ "text": "", "id": "${Math.random()}" }] }` }
      ]
    }
  ]
};

const SIGNATURE_CARD: ICard = {
  title: "Ondertekening",
  sections: [
    {
      title: "",
      questions: [
        { type: QuestionEnum.DATE, text: "Datum", value: "23-08-2019" },
        { type: QuestionEnum.DROPDOWN, text: "Naam", value: `{ "value": "", "options": [] }`, queryResultField: "employees", field: "id" },
        { type: QuestionEnum.SIGNATURE, text: "Handtekening ter controle van dit opleveringsrapport *", value: "" }
      ]
    }
  ]
};

export const DELIVERY_REPORT: IReport = {
  title: "Kwaliteitsmeting",
  cards: [
    GENERAL_CARD,
    SAFETY_CARD,
    TECHINC_CARD,
    REPORT_CARD,
    SIGNATURE_CARD
  ]
};
