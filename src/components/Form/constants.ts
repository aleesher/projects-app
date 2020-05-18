export const RADIO_OPTIONS = [
  {
    title: "ja",
    value: "yes"
  },
  {
    title: "nee",
    value: "no"
  },
  {
    title: "n.v.t",
    value: "N/A"
  }
];

export const GENERAL_DATA = {
  id: "GENERAL_DATA",
  title: "Algemeen",
  info: [
    {
      subtitle: "Instructie",
      fields: [
        {
          text: "Is met de ploeg een kick off georganiseerd bij aanvang van het werk? Is de werkbrief doorgesproken?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Is het V&G plan doorgenomen met alle betrokkenen en is dit vastgelegd met handtekeningen?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Zijn de dakdetails gecontroleerd op brandrisico's en is de werkwijze bij de brandgevaarlijke details met het team besproken?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Zijn de bijzondere gevaren in kaart gebracht en met de medewerkers doorgenomen (straling, gas, ontploffing, asbest)?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Is de voorman voorgesteld aan de opdrachtgever?",
          RADIO_OPTIONS
        },
        {
          text: "Zijn de bewoners geïnformeerd over onze werkzaamheden?",
          RADIO_OPTIONS
        }
      ]
    },
    {
      subtitle: "Omgeving",
      fields: [
        {
          text: "Zijn de werkplek en bouwplaats geordend en opgeruimd?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Is de directe omgeving rondom het dak vrij van dakafval?",
          RADIO_OPTIONS
        },
        {
          text: "Is de toegang naar het dak beschermd (vloer/trap/lift e.d.)?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Is op het werk een schaft- en/of toiletvoorziening aanwezig?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Wordt het dakafval gescheiden en op een juiste wijze afgevoerd?",
          RADIO_OPTIONS,
          hasTextField: true
        }
      ]
    }
  ]
};

export const SAFETY_DATA = {
  id: "SAFETY_DATA",
  title: "Veiligheid",
  info: [
    {
      subtitle: "Algemene veiligheid",
      fields: [
        {
          text: "Gebruiken alle medewerkers de voorgeschreven werkkleding, PBM's, incl veiligheidsvoorzieningen op een juiste wijze?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Wordt bij het vegen, zagen, slijpen en boren inademen van kwartsstof voorkomen?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Worden tilwerkzaamheden zwaarder dan 25kg voorkomen?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Is een EHBO-trommel aanwezig?",
          RADIO_OPTIONS
        },
        {
          text: "Zijn de elektrische en handgereedschappen deugdelijk en zo nodig goedgekeurd?",
          RADIO_OPTIONS
        },
        {
          text: "Zijn gevaarlijke stoffen aanwezig (asbest/teermastiek/oplosmiddelen) en wordt hier juist mee omgegaan?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Is bij het werken met een mobiele kraan de openbare weg voldoende afgezet?",
          RADIO_OPTIONS
        },
        {
          text: "Zijn de containers en bigbags gecertificeerd voor hijswerkzaamheden. Is het hijsgereedschap in goede staat en goedgekeurd? Zijn bij het hijsen de lasten voldoende gezekerd?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Is de ladderlift correct en veilig opgesteld?",
          RADIO_OPTIONS,
          hasTextField: true
        }
      ]
    },
    {
      subtitle: "Brand veiligheid",
      fields: [
        {
          text: "Worden de details brandveilig (koud verkleefd of met een föhn) ingewerkt?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        },
        {
          text: "Is het voorgeschreven aantal brandblussers op het dak aanwezig (2 x ABC poederblusser à 12 kg per werkplek)? Zijn de brandblussers goedgekeurd en op druk?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        },
        {
          text: "Is er één blusdeken per werkplek op het dak aanwezig?",
          RADIO_OPTIONS
        },
        {
          text: "Zijn de gasflessen voorzien van de juiste drukregelaar? Zijn de gasslangen in goede staat en maximaal 2 jaar oud?",
          RADIO_OPTIONS
        },
        {
          text: "Zijn alle materialen op minimaal 5 meter vanaf open vuur, opgaandwerk, dakrand en obstakels opgeslagen?",
          RADIO_OPTIONS
        },
        {
          text: "Is een deugdelijke lekbak met voldoende opvangcapaciteit onder de ketel geplaatst?",
          RADIO_OPTIONS
        },
        {
          text: "Heeft de ketel een goed sluitend deksel en werkt de thermostaat in de ketel goed?",
          RADIO_OPTIONS
        },
        {
          text: "Zijn 2 x ABC poederblusser à 12 kg bij de ketel geplaatst?",
          RADIO_OPTIONS
        },
        {
          text: "Bedraagt de afstand van de ketel tot de gasfles minimaal 5 meter?",
          RADIO_OPTIONS
        }
      ]
    },
    {
      subtitle: "Valbeveiliging",
      fields: [
        {
          text: "Is de ladder functioneel en goedgekeurd? En is de ladder deugdelijk opgesteld en vastgezet?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Is het steigerwerk functioneel en goedgekeurd?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        },
        {
          text: "Zijn de hekwerken correct opgesteld en met elkaar verbonden?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        },
        {
          text: "Zijn sparingen en zwakke lichtopeningen juist beveiligd?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        }
      ]
    }
  ]
};

export const TECHNIC_DATA = {
  id: "TECHNIC_DATA",
  title: "Techniek",
  info: [
    {
      subtitle: "Technische kwaliteit",
      fields: [
        {
          text: "Is het ballastgrind minimaal 40 mm dik aangebracht?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Worden de tapes van de dakbedekking verwijderd?",
          RADIO_OPTIONS
        },
        {
          text: "Worden de hoekjes van de onderliggende baan weggesneden?",
          RADIO_OPTIONS
        },
        {
          text: "Wordt bij het aanbrengen van de toplaag een harde kern gebruikt?",
          RADIO_OPTIONS
        },
        {
          text: "Worden de dakbanen in verband aangebracht?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Wordt aan het einde van de dag een waterdichte aansluiting gemaakt?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Is de temperatuur goed voor het aanbrengen van zelfklevende dakbanen en/of rand- en opstandstroken?",
          RADIO_OPTIONS,
          hasTextField: true
        },
        {
          text: "Worden conform windbelastingsberekening per zone de juiste hoeveelheid bevestigers toegepast?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        },
        {
          text: "Is de verkleving van de onderlaag of toplaag voldoende (rol terugtrekken of insnijding)?",
          RADIO_OPTIONS,
          hasTextField: true,
          hasPicturePicker: true
        },
        {
          text: "Is de breedte van het volledig verkleefde deel van de langsoverlap minimaal 70 mm (insnijding)?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Is de breedte van het volledig verkleefde deel van de kopse overlap minimaal 150 mm (insnijding)?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Worden de overlappen aangedrukt met een wals?",
          RADIO_OPTIONS
        },
        {
          text: "Worden trim, afvoer en doorvoer vooraf ontvet?",
          RADIO_OPTIONS
        },
        {
          text: "Worden de afvoeren verdiept en de doorvoeren verhoogd ingewerkt?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        },
        {
          text: "Wordt de ruimte tussen isolatieplaat en doorvoer of afvoer volgeschuimd met PUR isolatie?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        },
        {
          text: "Zijn de rozetten minimaal 300 mm breder dan de plakplaat van de afvoer en doorvoer?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Worden de randstroken van de 1ste laag en de toplaag respectievelijk minimaal 100 mm en 70 mm op het dakvlak aangebracht (effectieve hechtbreedte)?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Wordt kimfixatie toegepast?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Bedraagt de hechting van de overlap voorbij de drukverdeelplaat minimaal 70 mm bij mechanische kimfixatie?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Wordt de dampremmende laag op de juiste wijze aangebracht?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        },
        {
          text: "Worden de isolatieplaten in verband gelegd?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Is de verkleving van de isolatieplaten voldoende?",
          RADIO_OPTIONS
        },
        {
          text: "Worden de isolatieplaten vastgezet met de juiste hoeveelheid werkparkers?",
          RADIO_OPTIONS
        },
        {
          text: "Worden bij een isolatie van MWR tule-bevestigers toegepast?",
          RADIO_OPTIONS
        },
        {
          text: "Is de relatie isolatiedikte/bovendalbreedte staalplaat correct? Worden de isolatieplaten haaks op de canelurerichting aangebracht?",
          RADIO_OPTIONS
        },
        {
          text: "Is de ondergrond vlak, gaaf, droog en schoon?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: true
        },
        {
          text: "Is de ondergrond voorzien van een hechtprimer?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Worden de isolatieplaten vastgezet met de juiste hoeveelheid werkparkers of is de verkleving van de platen voldoende?",
          RADIO_OPTIONS
        },
        {
          text: "Is de breedte van het volledig verkleefde deel van de langsoverlap minimaal 70 mm en van de kopse overlap minimaal 150 mm (insnijding)?",
          RADIO_OPTIONS,
          hasPicturePicker: true,
          hasTextField: false
        },
        {
          text: "Worden afvoer en doorvoer aanvullend mechanisch bevestigd?",
          RADIO_OPTIONS
        },
        {
          text: "Worden de tegels met minimaal 15 mm spoelruimte gelegd?",
          RADIO_OPTIONS
        }
      ]
    }
  ]
};

export const CHECKBOX_OPTIONS = [
  {
    label: "Politie",
    value: "Politie"
  },
  {
    label: "Ambulance",
    value: "Ambulance"
  },
  {
    label: "Brandweer",
    value: "Brandweer"
  }
];

export const DROPDOWN_OPTIONS = [
  {
    label: "Arjan Reurink",
    value: "Arjan Reurink"
  }
];

export const GENERALCARD_OPTIONS = [
  {
    title: "ja",
    value: "yes"
  },
  {
    title: "nee",
    value: "no"
  }
]

export const GENERAL_CARD_RADIOS = [
  {
    name: "foreman-present",
    text: "Voorman aanwezig?",
    options: GENERALCARD_OPTIONS
  },
  {
    name: "client-present",
    text: "Opdrachtgever aanwezig?",
    options: GENERALCARD_OPTIONS
  }
];

export const GENERAL_CARD2_RADIOS = [
  {
    text: "Brandgevaarlijke situaties gecontroleerd",
    options: GENERALCARD_OPTIONS
  },
  {
    text: "Valgevaarlijke situaties gecontroleerd",
    options: GENERALCARD_OPTIONS
  },
  {
    text: "Technische kwaliteit gecontroleerd",
    options: GENERALCARD_OPTIONS
  },
  {
    text: "Bouwplaats gecontroleerd",
    options: GENERALCARD_OPTIONS
  },
  {
    text: "Afwijkingen aangetroffen",
    options: GENERALCARD_OPTIONS
  }
];

export const DEVIATION_FORM_RADIO_OPTIONS = {
  text: "Melding",
  options: [
    {
      title: "intern",
      value: "intern"
    },
    {
      title: "extern",
      value: "extern"
    }
  ]
}

export const INCIDENT_REPORT_OPTIONS = [
  {
    label: "Brand",
    value: "Fire"
  },
  {
    label: "Ongeval",
    value: "Accident"
  },
  {
    label: "Bijna ongeval",
    value: "near-accident"
  },
  {
    label: "Onveilige situatie",
    value: "Unsafe situation"
  },
  {
    label: "Schade",
    value: "Damage"
  },
  {
    label: "Klacht",
    value: "Complaint"
  },
  {
    label: "Uitvoeringskwaliteit",
    value: "Performance quality"
  },
  {
    label: "Interne processen",
    value: "Intern processes"
  }
];

export const CALLED_112_CHECKMARKS = [
  {
    label: "politie",
    value: "law enforcement",
  },
  {
    label: "ambulance",
    value: "ambulance",
  },
  {
    label: "brandweer",
    value: "fire brigade",
  }
];