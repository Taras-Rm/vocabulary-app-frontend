import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

export const languages = [
  {
    code: "en",
    description: "English",
    flag: <ReactCountryFlag countryCode="GB"/>
  },
  {
    code: "uk",
    description: "Ukrainian",
    flag: <ReactCountryFlag countryCode="UA"/>
  }
];

export const languageCodeToCountryCode = (langCode) => {
    if(langCode == "uk") {
        return "ua"
    }
    if(langCode == "en") {
        return "gb"
    }
    if(langCode == "de") {
        return "de"
    }

    return ""
}

const partsOfSpeechOptions = [
  {
    value: "adjective",
    label: "Adjective",
    color: "green"
  },
  {
    value: "verb",
    label: "Verb",
    color: "cyan"
  },
  {
    value: "pronoun",
    label: "Pronoun",
    color: "red"
  },
  {
    value: "adverb",
    label: "Adverb",
    color: "red"
  },
  {
    value: "noune",
    label: "Noune",
    color: "green"
  }
]

export function getPartsOfSpeechOptionsTrans(t) {
  return partsOfSpeechOptions.map(o => {
    let label = t("partsOfSpeechOptions."+o.value)
    return {
      ...o,
      label: label
    }
  })
}