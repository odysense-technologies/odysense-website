/**
 * Content for the Medical Waste Segregation Challenge (client: Ministry of Public Health, Qatar).
 *
 * Every fact here comes from the two MoPH posters the client supplied:
 *  - "Healthcare waste container colour coding, labeling and signing"
 *  - "Segregation and collection of medical waste"
 * Don't add categories, colours, labels or disposal rules that aren't on those posters.
 */

export type SymbolId = "biohazard" | "biohazard-red" | "cytotoxic" | "chemical" | "radioactive";
export type CodeColor = "yellow" | "red";

/** Poster 1: colour coding, labeling and required symbol for each category. */
export type WasteCode = {
  id: string;
  name: string;
  color: CodeColor;
  label: string;
  /** The label with the category words hidden, for the "whose label is this?" question */
  masked: string;
  symbol: SymbolId;
};

export const wasteCodes: WasteCode[] = [
  { id: "anatomical", name: "Human anatomical waste", color: "yellow", label: "DANGER! ANATOMICAL WASTE, TO BE DEEPLY BURIED", masked: "DANGER! ▇▇▇▇ WASTE, TO BE DEEPLY BURIED", symbol: "biohazard" },
  { id: "pathological", name: "Pathological waste", color: "yellow", label: "DANGER! PATHOLOGICAL WASTE, TO BE INCINERATED", masked: "DANGER! ▇▇▇▇ WASTE, TO BE INCINERATED", symbol: "biohazard" },
  { id: "infectious", name: "Infectious waste", color: "yellow", label: "DANGER! HAZARDOUS INFECTIOUS WASTE", masked: "DANGER! HAZARDOUS ▇▇▇▇ WASTE", symbol: "biohazard" },
  { id: "highly", name: "Highly infectious waste", color: "red", label: "DANGER! HIGHLY INFECTIOUS, TO BE PRE-TREATED", masked: "DANGER! ▇▇▇▇, TO BE PRE-TREATED", symbol: "biohazard-red" },
  { id: "sharp", name: "Sharp waste", color: "yellow", label: "DANGER! CONTAMINATED SHARP, DON'T OPEN", masked: "DANGER! CONTAMINATED ▇▇▇▇, DON'T OPEN", symbol: "biohazard" },
  { id: "cytotoxic", name: "Cytotoxic and genotoxic waste", color: "red", label: "DANGER! HAZARDOUS CYTOTOXIC WASTE, TO BE INCINERATED", masked: "DANGER! HAZARDOUS ▇▇▇▇ WASTE, TO BE INCINERATED", symbol: "cytotoxic" },
  { id: "chemical", name: "Chemical waste", color: "yellow", label: "DANGER! CHEMICAL WASTE, TO BE DISCARDED BY AUTHORISED STAFF ONLY", masked: "DANGER! ▇▇▇▇ WASTE, TO BE DISCARDED BY AUTHORISED STAFF ONLY", symbol: "chemical" },
  { id: "pharmaceutical", name: "Pharmaceutical waste", color: "yellow", label: "DANGER! PHARMACEUTICAL WASTE, TO BE INCINERATED", masked: "DANGER! ▇▇▇▇ WASTE, TO BE INCINERATED", symbol: "biohazard" },
  { id: "radioactive", name: "Radioactive waste", color: "yellow", label: "DANGER! RADIOACTIVE WASTE, TO BE DISCARDED BY AUTHORISED STAFF ONLY", masked: "DANGER! ▇▇▇▇ WASTE, TO BE DISCARDED BY AUTHORISED STAFF ONLY", symbol: "radioactive" },
];

export const symbolNames: Record<SymbolId, string> = {
  biohazard: "Biohazard (yellow)",
  "biohazard-red": "Biohazard (red)",
  cytotoxic: "Cytotoxic",
  chemical: "Chemical hazard",
  radioactive: "Radioactive",
};

/** Poster 2: the bins used for segregation and collection. */
export type BinId = "infectious" | "highly" | "sharps" | "pharmaceutical" | "pathological" | "amalgam";

export const bins: { id: BinId; name: string; sub: string; rule: string }[] = [
  { id: "infectious", name: "Infectious", sub: "Yellow bin · yellow bag", rule: "Items soiled with a patient's body secretions go in the yellow bin, lined with a yellow bag." },
  { id: "highly", name: "Highly infectious", sub: "Red bin · red bag", rule: "Items soiled with secretions of a patient with a highly infectious disease, and cultured bacterial colonies, go in the red bin, lined with a red bag." },
  { id: "sharps", name: "Sharps", sub: "Sharps container", rule: "Anything that could cause a puncture or wound goes in the sharps container. It isn't lined; it's carried on a stand or hung on the wall." },
  { id: "pharmaceutical", name: "Pharmaceutical", sub: "Medication waste", rule: "Unused, expired, spilt and contaminated pharmaceutical products go in the returned or non-returned medication waste container." },
  { id: "pathological", name: "Pathological", sub: "Yellow container · yellow bag", rule: "Tissue and organ fragments, placenta and animal carcasses are pathological waste: yellow container, lined with a yellow bag." },
  { id: "amalgam", name: "Amalgam", sub: "Container with water", rule: "Used amalgam capsules and contact or non-contact amalgam waste go in the amalgam container, which should contain water." },
];

/** Items for Bin Rush, each matched to its bin from poster 2. */
export const items: { name: string; icon: string; bin: BinId }[] = [
  { name: "Used gloves soiled with body secretions", icon: "🧤", bin: "infectious" },
  { name: "Used face mask", icon: "😷", bin: "infectious" },
  { name: "Soiled wound dressing", icon: "🩹", bin: "infectious" },
  { name: "Blood-soaked cotton balls", icon: "🩸", bin: "infectious" },
  { name: "Cultured bacterial colonies", icon: "🧫", bin: "highly" },
  { name: "Dressing from a patient with a highly infectious disease", icon: "☣️", bin: "highly" },
  { name: "Gloves soiled by a patient with a highly infectious disease", icon: "🧤", bin: "highly" },
  { name: "Used syringe with needle", icon: "💉", bin: "sharps" },
  { name: "Scalpel blade", icon: "🔪", bin: "sharps" },
  { name: "Used lancet", icon: "📍", bin: "sharps" },
  { name: "Broken glass ampoule", icon: "🧪", bin: "sharps" },
  { name: "Expired tablets", icon: "💊", bin: "pharmaceutical" },
  { name: "Unused medicine returned by a patient", icon: "💊", bin: "pharmaceutical" },
  { name: "Spilt bottle of syrup", icon: "🧴", bin: "pharmaceutical" },
  { name: "Contaminated medication", icon: "💊", bin: "pharmaceutical" },
  { name: "Tissue sample", icon: "🔬", bin: "pathological" },
  { name: "Organ fragment", icon: "🫁", bin: "pathological" },
  { name: "Placenta", icon: "🏥", bin: "pathological" },
  { name: "Laboratory animal carcass", icon: "🐁", bin: "pathological" },
  { name: "Used amalgam capsule", icon: "🦷", bin: "amalgam" },
  { name: "Contact amalgam waste", icon: "🦷", bin: "amalgam" },
  { name: "Non-contact amalgam scrap", icon: "🫙", bin: "amalgam" },
];

/** True/false statements, each checkable against the posters. */
export const statements: { text: string; answer: boolean; why: string }[] = [
  { text: "Sharps containers are lined with a yellow bag.", answer: false, why: "Sharps containers aren't lined; they're carried on a stand or hung on the wall." },
  { text: "An amalgam waste container should contain water.", answer: true, why: "The amalgam waste container should contain water." },
  { text: "Cultured bacterial colonies go in the red bin.", answer: true, why: "Cultured colonies are highly infectious waste: red bin, red bag." },
  { text: "Expired and spilt medicines are pharmaceutical waste.", answer: true, why: "Unused, expired, spilt and contaminated products are pharmaceutical waste." },
  { text: "Placenta is disposed of as pharmaceutical waste.", answer: false, why: "Placenta is pathological waste: yellow container, yellow bag." },
  { text: "Highly infectious waste must be pre-treated.", answer: true, why: "Its label reads: \"DANGER! HIGHLY INFECTIOUS, TO BE PRE-TREATED\"." },
  { text: "Any staff member may discard chemical waste.", answer: false, why: "Chemical waste is discarded by authorised staff only." },
  { text: "Cytotoxic and genotoxic waste uses a yellow container.", answer: false, why: "Cytotoxic and genotoxic waste is colour-coded red." },
  { text: "Human anatomical waste is labelled to be deeply buried.", answer: true, why: "Its label reads: \"DANGER! ANATOMICAL WASTE, TO BE DEEPLY BURIED\"." },
  { text: "Used gloves soiled with a patient's body secretions go in the yellow bin.", answer: true, why: "That's infectious waste: yellow bin, yellow bag." },
  { text: "Radioactive waste can go in the general infectious bin.", answer: false, why: "Radioactive waste is discarded by authorised staff only, with the radioactive symbol." },
];

/** Symbol Match pairs: a clue card and its category card. */
export type Clue = { kind: "symbol"; symbol: SymbolId } | { kind: "text"; text: string; icon: string };
export const pairs: { id: string; clue: Clue; category: string }[] = [
  { id: "cyto", clue: { kind: "symbol", symbol: "cytotoxic" }, category: "Cytotoxic & genotoxic" },
  { id: "radio", clue: { kind: "symbol", symbol: "radioactive" }, category: "Radioactive" },
  { id: "chem", clue: { kind: "symbol", symbol: "chemical" }, category: "Chemical" },
  { id: "highly", clue: { kind: "symbol", symbol: "biohazard-red" }, category: "Highly infectious" },
  { id: "anat", clue: { kind: "text", text: "“To be deeply buried”", icon: "🏷️" }, category: "Human anatomical" },
  { id: "sharp", clue: { kind: "text", text: "“Contaminated sharp, don't open”", icon: "💉" }, category: "Sharp" },
  { id: "amalgam", clue: { kind: "text", text: "Container should contain water", icon: "🦷" }, category: "Amalgam" },
  { id: "pharma", clue: { kind: "text", text: "Returned / non-returned medication", icon: "💊" }, category: "Pharmaceutical" },
];

export const shuffle = <T,>(a: T[]): T[] => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
