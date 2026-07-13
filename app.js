/* AoM Retold Major God Creator - static GitHub Pages draft
   This is intentionally backend-free. All files are generated locally in the browser. */

const AGES = ["ClassicalAge", "HeroicAge", "MythicAge"];
const MAX_BONUS_CHOICES = 4;
const EXCLUDED_MINOR_GOD_NAMES = new Set(["malinalxochitldummy"]);

const PANTHEON_KEYS = {
  Greek: "G",
  Egyptian: "E",
  Norse: "N",
  Atlantean: "A",
  Chinese: "C",
  Japanese: "J",
  Aztec: "Z",
};


const UNIQUE_TECH_GROUPS = [
  { id: "OlympianParentage", techs: ["OlympianParentage"], pantheon: "All", label: "Olympian Parentage" },
  { id: "VaultsOfErebus", techs: ["VaultsOfErebus"], pantheon: "All", label: "Vaults Of Erebus" },
  { id: "LordOfHorses", techs: ["LordOfHorses"], pantheon: "All", label: "Lord Of Horses" },
  { id: "DivineLabor", techs: ["DivineLabor"], pantheon: "All", label: "Divine Labor" },
  { id: "SkinOfTheRhino", techs: ["SkinOfTheRhino"], pantheon: "All", label: "Skin Of The Rhino" },
  { id: "FloodOfTheNile", techs: ["FloodOfTheNile"], pantheon: "All", label: "Flood Of The Nile" },
  { id: "Clairvoyance", techs: ["Clairvoyance"], pantheon: "All", label: "Clairvoyance", requiresGodPower: "Vision" },
  { id: "HammerOfThunder", techs: ["HammerOfThunder"], pantheon: "Norse", label: "Hammer Of Thunder" },
  { id: "Hamask", techs: ["Hamask"], pantheon: "Norse", label: "Hamask" },
  { id: "EyesInTheForest", techs: ["EyesInTheForest"], pantheon: "All", label: "Eyes In The Forest" },
  { id: "FreyrsGift", techs: ["FreyrsGift"], pantheon: "All", label: "Freyr's Gift", extraArchaicEffect: "FreyrTechCostBonus" },
  { id: "TemporalChaos", techs: ["TemporalChaos"], pantheon: "All", label: "Temporal Chaos", autoBonusLabel: "Can Time-Shift buildings. Most are free, except Towers and Fortress-type buildings costing half their price." },
  { id: "EmpyreanSpeed", techs: ["EmpyreanSpeed"], pantheon: "All", label: "Empyrean Speed" },
  { id: "Channels", techs: ["Channels"], pantheon: "All", label: "Channels", autoBonusLabel: "Economic buildings grow Lush that heals friendly units and buildings." },
  { id: "CelestialWeapons", techs: ["CelestialWeapons"], pantheon: "All", label: "Celestial Weapons" },
  { id: "TaiChi", techs: ["TaiChi"], pantheon: "All", label: "TaiChi" },
  { id: "MountainousMight", techs: ["MountainousMight"], pantheon: "Chinese", label: "Mountainous Might" },
  { id: "KuafuChieftain", techs: ["KuafuChieftain"], pantheon: "All", label: "Kuafu Chieftain" },
  { id: "PeachOfImmortality", techs: ["PeachOfImmortality"], pantheon: "All", label: "Peach Of Immortality" },
  { id: "HerbalMedicine", techs: ["HerbalMedicine"], pantheon: "Chinese", label: "Herbal Medicine" },
  { id: "Kagura", techs: ["Kagura"], pantheon: "Japanese", label: "Kagura" },
  { id: "Tenshu", techs: ["Tenshu"], pantheon: "All", label: "Tenshu" },
  { id: "CrushingWaves", techs: ["CrushingWaves"], pantheon: "All", label: "Crushing Waves" },
  { id: "WingsOfTheSouth", techs: ["WingsOfTheSouth"], pantheon: "Aztec", label: "Wings Of The South" },
  { id: "TepeyollotlsReach", techs: ["TepeyollotlsReach"], pantheon: "Aztec", label: "TepeyollotlsReach" },
  { id: "FeastOfTlaxochimaco", techs: ["FeastOfTlaxochimaco"], pantheon: "All", label: "Feast Of Tlaxochimaco" },
];

const UNIQUE_TECH_SOURCE_PANTHEON = {
  OlympianParentage: "Greek",
  VaultsOfErebus: "Greek",
  LordOfHorses: "Greek",
  DivineLabor: "Greek",
  SkinOfTheRhino: "Egyptian",
  FloodOfTheNile: "Egyptian",
  Clairvoyance: "Egyptian",
  HammerOfThunder: "Norse",
  Hamask: "Norse",
  EyesInTheForest: "Norse",
  FreyrsGift: "Norse",
  TemporalChaos: "Atlantean",
  EmpyreanSpeed: "Atlantean",
  Channels: "Atlantean",
  CelestialWeapons: "Chinese",
  TaiChi: "Chinese",
  MountainousMight: "Chinese",
  KuafuChieftain: "Chinese",
  PeachOfImmortality: "Chinese",
  HerbalMedicine: "Chinese",
  Kagura: "Japanese",
  Tenshu: "Japanese",
  CrushingWaves: "Japanese",
  WingsOfTheSouth: "Aztec",
  TepeyollotlsReach: "Aztec",
  FeastOfTlaxochimaco: "Aztec",
};

const UNIQUE_TECH_PANTHEON_ORDER = ["Greek", "Egyptian", "Norse", "Atlantean", "Chinese", "Japanese", "Aztec"];

const UNIQUE_TECH_CUSTOM_ROLLOVERS = {
  OlympianParentage: "The blood of CustomGod increases the hitpoints of heroes and causes them to regenerate hitpoints.",
  VaultsOfErebus: "CustomGod's vaults provides a steady, endless income of Gold.",
  LordOfHorses: "CustomGod improves the line of sight of cavalry and scouts, and causes them to regenerate hitpoints.",
  DivineLabor: "CustomGod blessing increases Villager Farm and Herdable gathering rates and heals them when dropping Resources.",
  SkinOfTheRhino: "CustomGod improves the armor of Villagers, making them more resistant to attacks.",
  FloodOfTheNile: "CustomGod ensures the continued fertility of your lands, granting a steady trickle of Food.",
  Clairvoyance: "CustomGod makes additional charges of the Vision God Power be cast with no Favor cost and be granted more quickly.",
  HammerOfThunder: "CustomGod causes your Hersirs to inflict additional damage and generate favor faster.",
  Hamask: "CustomGod inspires Berserks to move faster and deal additional damage to myth units.",
  EyesInTheForest: "CustomGod causes units of Mother Nature, such as trees and animals, to temporarily grant you vision when nearby one of your units, and increase the speed of your heroes.",
  FreyrsGift: "CustomGod increases the hitpoints of all units. This upgrade's Favor cost decreases with each technology researched.",
  TemporalChaos: "CustomGod increases the number of buildings that can be simultaneously time-shifted, and reduces the cost and shifting time of time-shifting defensive buildings.",
  EmpyreanSpeed: "CustomGod increases the speed of infantry units.",
  Channels: "CustomGod increases the speed of units traversing their lush.",
  CelestialWeapons: "CustomGod grants heroes celestial weapons, causing them to inflict extra divine damage.",
  TaiChi: "CustomGod's philosophy causes heroes to train faster, and improves their hack and pierce armor.",
  MountainousMight: "CustomGod imbues Kuafus with the power of the mountains, making them much stronger.",
  KuafuChieftain: "CustomGod creates a Kuafu chieftain, a powerful hero Kuafu who respawns when lost.",
  PeachOfImmortality: "CustomGod ripens the Peach of Immortality, which grants heroes and myth units more hitpoints.",
  HerbalMedicine: "CustomGod teaches Sages to heal faster and restore the hitpoints of multiple friendly units at once.",
  Kagura: "CustomGod summons a new Miko, and allows your Mikos to train and heal faster.",
  Tenshu: "CustomGod improves the damage and line of sight of your Towers and Castles.",
  CrushingWaves: "CustomGod increases the movement speed of myth units and causes their attacks to deal additional divine damage.",
  WingsOfTheSouth: "CustomGod increases the movement speed and training rate of all War Hut units.",
  TepeyollotlsReach: "CustomGod increases the damage and jump distance of Ocelotl Warriors and Jaguar Riders.",
  FeastOfTlaxochimaco: "CustomGod enables livestock to be devoted at the Temple to temporarily increase the gather rate of all villagers.",
};


function uniqueTechSourcePantheon(group) {
  return group?.sourcePantheon || UNIQUE_TECH_SOURCE_PANTHEON[group?.id] || group?.pantheon || "Other";
}



const TECH_DISPLAY_NAME_OVERRIDES = {
  FreyrsGift: "Freyr's Gift",
  SkinOfTheRhino: "Skin Of The Rhino",
  TaiChi: "Tai Chi",
  TepeyollotlsReach: "Tepeyollotl's Reach",
};

function displayTechName(internalName) {
  if (!internalName) return "";
  if (TECH_DISPLAY_NAME_OVERRIDES[internalName]) return TECH_DISPLAY_NAME_OVERRIDES[internalName];
  return String(internalName)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .trim();
}

const DEFAULT_TEMPLATE_MAJOR_BY_CULTURE = {
  Greek: "Zeus",
  Egyptian: "Ra",
  Norse: "Odin",
  Atlantean: "Kronos",
  Chinese: "Fuxi",
  Japanese: "Amaterasu",
  Aztec: "Huitzilopochtli",
};


const GREEK_HERO_POOLS = {
  archaic: ["Jason", "Ajax", "Theseus", "Orpheus"],
  classical: ["Heracles", "Achilles", "Atalanta", "Iolaus"],
  heroic: ["Odysseus", "Chiron", "Hippolyta", "Icarus"],
  mythic: ["Bellerophon", "Perseus", "Polyphemus", "Midas"],
};

const GREEK_UNIQUE_UNITS = {
  Zeus: "Myrmidon",
  Hades: "Gastraphetoros",
  Poseidon: "Hetairos",
  Demeter: "AmazonArcher",
};

const GREEK_UNIQUE_UNIT_DISPLAY_NAMES = {
  Myrmidon: "Myrmidon",
  Gastraphetoros: "Gastraphetoros",
  Hetairos: "Hetairos",
  AmazonArcher: "Amazon Archer",
};

function greekUniqueUnitDisplayName(unit) {
  return GREEK_UNIQUE_UNIT_DISPLAY_NAMES[unit] || unit;
}

const CHINESE_MYTHIC_HEROES = {
  Fuxi: "YangJian",
  Nüwa: "LiJing",
  Shennong: "WenZhong",
};

const CHINESE_MYTHIC_HERO_DISPLAY_NAMES = {
  YangJian: "Yang Jian",
  LiJing: "Li Jing",
  WenZhong: "Wen Zhong",
};

function chineseMythicHeroDisplayName(hero) {
  return CHINESE_MYTHIC_HERO_DISPLAY_NAMES[hero] || hero;
}

const AZTEC_CLASSICAL_FORMS = {
  Quetzalcoatl: { tech: "WarriorPriestToTeixiptlaQuetz", unit: "TeixiptlaQuetz" },
  Huitzilopochtli: { tech: "WarriorPriestToTeixiptlaHuitz", unit: "TeixiptlaHuitz" },
  Tezcatlipoca: { tech: "WarriorPriestToTeixiptlaTezca", unit: "TeixiptlaTezca" },
};

const AZTEC_MYTHIC_ARRIVALS = {
  Quetzalcoatl: "GreatTempleArrivalOfTheGodsQuetzalcoatl",
  Huitzilopochtli: "GreatTempleArrivalOfTheGodsHuitzilopochtli",
  Tezcatlipoca: "GreatTempleArrivalOfTheGodsTezcatlipoca",
};

const STARTING_GOD_POWER_BY_MAJOR = {
  // Greek
  Zeus: "Bolt",
  Poseidon: "Lure",
  Hades: "Sentinel",
  Demeter: "Wither",

  // Egyptian
  Ra: "Rain",
  Isis: "Prosperity",
  Set: "Vision",

  // Norse
  Thor: "DwarvenMine",
  Odin: "GreatHunt",
  Loki: "Spy",
  Freyr: "Gullinbursti",

  // Atlantean
  Kronos: "Deconstruction",
  Oranos: "Shockwave",
  Gaia: "GaiaForest",

  // Chinese
  Fuxi: "ThePeachBlossomSpring",
  Nuwa: "Creation",
  Shennong: "ProsperousSeeds",

  // Japanese
  Amaterasu: "SolarShield",
  Susanoo: "Kusanagi",
  Tsukuyomi: "NewMoon",

  // Aztec
  Huitzilopochtli: "BloodPact",
  Quetzalcoatl: "Tailwind",
  Tezcatlipoca: "ObsidianMirror",
};

function archaicGodPowerOptions() {
  const seen = new Set();
  const options = [];
  for (const major of window.AOM_DATA.majors) {
    const power = STARTING_GOD_POWER_BY_MAJOR[major.name] || "";
    if (!power) continue;
    const key = `${major.culture}|${power}`;
    if (seen.has(key)) continue;
    seen.add(key);
    options.push({ culture: major.culture, power });
  }
  return options.sort((a, b) => a.culture.localeCompare(b.culture) || a.power.localeCompare(b.power));
}

const $ = (id) => document.getElementById(id);

const els = {
  displayName: $("displayName"),
  majorTitle: $("majorTitle"),
  majorFocus: $("majorFocus"),
  baseMajor: $("baseMajor"),
  greekOptions: $("greekOptions"),
  greekHeroArchaic: $("greekHeroArchaic"),
  greekHeroClassical: $("greekHeroClassical"),
  greekHeroHeroic: $("greekHeroHeroic"),
  greekHeroMythic: $("greekHeroMythic"),
  greekUniqueUnit: $("greekUniqueUnit"),
  chineseOptions: $("chineseOptions"),
  chineseMythicHero: $("chineseMythicHero"),
  aztecOptions: $("aztecOptions"),
  aztecClassicalForm: $("aztecClassicalForm"),
  aztecMythicArrival: $("aztecMythicArrival"),
  godPower: $("godPower"),
  uniqueTech1: $("uniqueTech1"),
  uniqueTech2: $("uniqueTech2"),
  bonusPickers: $("bonusPickers"),
  bonus1: $("bonus1"),
  bonus2: $("bonus2"),
  bonus3: $("bonus3"),
  bonus4: $("bonus4"),
  iconFile: $("iconFile"),
  sameCultureOnly: $("sameCultureOnly"),
  minorPickers: $("minorPickers"),
  downloadZip: $("downloadZip"),
  savePreset: $("savePreset"),
  loadPreset: $("loadPreset"),
  exportPreset: $("exportPreset"),
  messages: $("messages"),
  layoutPreview: $("layoutPreview"),
  configPreview: $("configPreview"),
};

function sanitizeId(value, fallback = "CustomMajorGod") {
  const cleaned = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]/g, "");
  return cleaned || fallback;
}

function sanitizeFolder(value) {
  return sanitizeId(value).replace(/^\d+/, "") || "CustomMajorGod";
}

function escapeXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function pascal(value) {
  return sanitizeId(value).replace(/^./, (c) => c.toUpperCase());
}

function lower(value) {
  return String(value || "").toLowerCase();
}

function selectedPantheon() {
  return els.baseMajor.value || window.AOM_DATA.majors[0]?.culture || "Greek";
}

function selectedBaseMajor() {
  // Kept only for legacy helpers that still need a culture-bearing object.
  // Major-god XML generation no longer clones this vanilla major god.
  const culture = selectedPantheon();
  const preferred = DEFAULT_TEMPLATE_MAJOR_BY_CULTURE[culture];
  return window.AOM_DATA.majors.find((m) => m.culture === culture && m.name === preferred)
    || window.AOM_DATA.majors.find((m) => m.culture === culture)
    || window.AOM_DATA.majors[0];
}

function pantheonTemplateXml(culture) {
  const templates = window.AOM_MAJOR_GOD_TEMPLATES || {};
  return templates[culture] || templates.Greek || "";
}

function displayGodName(name) {
  return String(name || "")
    .trim()
    .split(/([\s_-]+)/)
    .map((part) => {
      if (!part || /^[\s_-]+$/.test(part)) return part;
      if (part === part.toLowerCase() || part === part.toUpperCase()) {
        return part.slice(0, 1).toUpperCase() + part.slice(1).toLowerCase();
      }
      return part.slice(0, 1).toUpperCase() + part.slice(1);
    })
    .join("");
}

function minorLabel(god) {
  return `${displayGodName(god.name)} (${god.culture})`;
}

function isExcludedMinorGod(god) {
  if (!god) return false;
  const name = String(god.name || "").toLowerCase();
  const tech = String(god.tech || "").toLowerCase();
  return EXCLUDED_MINOR_GOD_NAMES.has(name) || [...EXCLUDED_MINOR_GOD_NAMES].some((blocked) => tech.includes(blocked));
}

function canonicalMinorTech(godOrTech, ageHint = "") {
  if (!godOrTech) return "";
  if (typeof godOrTech === "object") return `${godOrTech.age}${pascal(godOrTech.name)}`;
  const raw = String(godOrTech);
  const found = window.AOM_DATA.minors.find((g) => !isExcludedMinorGod(g) && (g.tech === raw || `${g.age}${pascal(g.name)}` === raw));
  if (found) return `${found.age}${pascal(found.name)}`;
  const m = raw.match(/^(ClassicalAge|HeroicAge|MythicAge)(.+)$/i);
  if (m) {
    const properAge = AGES.find((a) => a.toLowerCase() === m[1].toLowerCase()) || ageHint || m[1];
    return `${properAge}${pascal(m[2])}`;
  }
  return sanitizeId(raw);
}

function setMessage(text, isError = false) {
  els.messages.textContent = text;
  els.messages.classList.toggle("error", Boolean(isError));
}

function initMajorSelect() {
  const cultures = Array.from(new Set(window.AOM_DATA.majors.map((m) => m.culture))).sort();
  els.baseMajor.innerHTML = "";
  for (const culture of cultures) {
    const majorCount = window.AOM_DATA.majors.filter((m) => m.culture === culture).length;
    const opt = document.createElement("option");
    opt.value = culture;
    opt.textContent = `${culture} pantheon (${majorCount} major gods)`;
    els.baseMajor.appendChild(opt);
  }
  if (cultures.includes("Greek")) els.baseMajor.value = "Greek";
}


function fillGreekHeroSelect(select, ageKey, keep = true) {
  if (!select) return;
  const pool = GREEK_HERO_POOLS[ageKey] || [];
  const previous = keep ? select.value : "";
  select.innerHTML = "";
  for (const hero of pool) {
    const opt = document.createElement("option");
    opt.value = hero;
    opt.textContent = hero;
    select.appendChild(opt);
  }
  select.value = previous && pool.includes(previous) ? previous : pool[0] || "";
}

function initGreekSpecificSelects(keep = true) {
  if (!els.greekOptions || !els.greekHeroArchaic || !els.greekHeroClassical || !els.greekHeroHeroic || !els.greekHeroMythic || !els.greekUniqueUnit) return;
  const isGreek = selectedPantheon() === "Greek";
  els.greekOptions.hidden = !isGreek;

  fillGreekHeroSelect(els.greekHeroArchaic, "archaic", keep);
  fillGreekHeroSelect(els.greekHeroClassical, "classical", keep);
  fillGreekHeroSelect(els.greekHeroHeroic, "heroic", keep);
  fillGreekHeroSelect(els.greekHeroMythic, "mythic", keep);

  const previousUnique = keep ? els.greekUniqueUnit.value : "";
  els.greekUniqueUnit.innerHTML = "";
  for (const unit of Object.values(GREEK_UNIQUE_UNITS)) {
    const opt = document.createElement("option");
    opt.value = unit;
    opt.textContent = greekUniqueUnitDisplayName(unit);
    els.greekUniqueUnit.appendChild(opt);
  }
  els.greekUniqueUnit.value = previousUnique && Object.values(GREEK_UNIQUE_UNITS).includes(previousUnique) ? previousUnique : GREEK_UNIQUE_UNITS.Zeus;
}

function initChineseSpecificSelects(keep = true) {
  if (!els.chineseOptions || !els.chineseMythicHero) return;
  const isChinese = selectedPantheon() === "Chinese";
  els.chineseOptions.hidden = !isChinese;

  const previous = keep ? els.chineseMythicHero.value : "";
  els.chineseMythicHero.innerHTML = "";
  for (const [major, hero] of Object.entries(CHINESE_MYTHIC_HEROES)) {
    const opt = document.createElement("option");
    opt.value = hero;
    opt.textContent = chineseMythicHeroDisplayName(hero);
    els.chineseMythicHero.appendChild(opt);
  }
  els.chineseMythicHero.value = previous && Object.values(CHINESE_MYTHIC_HEROES).includes(previous) ? previous : CHINESE_MYTHIC_HEROES.Fuxi;
}


function initAztecSpecificSelects(keep = true) {
  if (!els.aztecOptions || !els.aztecClassicalForm || !els.aztecMythicArrival) return;
  const isAztec = selectedPantheon() === "Aztec";
  els.aztecOptions.hidden = !isAztec;

  const previousForm = keep ? els.aztecClassicalForm.value : "";
  els.aztecClassicalForm.innerHTML = "";
  for (const [major, data] of Object.entries(AZTEC_CLASSICAL_FORMS)) {
    const opt = document.createElement("option");
    opt.value = data.tech;
    opt.textContent = major;
    els.aztecClassicalForm.appendChild(opt);
  }
  const formValues = Object.values(AZTEC_CLASSICAL_FORMS).map((entry) => entry.tech);
  els.aztecClassicalForm.value = previousForm && formValues.includes(previousForm) ? previousForm : AZTEC_CLASSICAL_FORMS.Quetzalcoatl.tech;

  const previousArrival = keep ? els.aztecMythicArrival.value : "";
  els.aztecMythicArrival.innerHTML = "";
  for (const [major, tech] of Object.entries(AZTEC_MYTHIC_ARRIVALS)) {
    const opt = document.createElement("option");
    opt.value = tech;
    opt.textContent = major;
    els.aztecMythicArrival.appendChild(opt);
  }
  const arrivalValues = Object.values(AZTEC_MYTHIC_ARRIVALS);
  els.aztecMythicArrival.value = previousArrival && arrivalValues.includes(previousArrival) ? previousArrival : AZTEC_MYTHIC_ARRIVALS.Quetzalcoatl;
}

function initGodPowerSelect(keep = true) {
  const previous = keep ? els.godPower.value : "";
  const options = archaicGodPowerOptions();
  els.godPower.innerHTML = "";

  for (const culture of Array.from(new Set(options.map((entry) => entry.culture)))) {
    const group = document.createElement("optgroup");
    group.label = culture;
    for (const entry of options.filter((item) => item.culture === culture)) {
      const opt = document.createElement("option");
      opt.value = entry.power;
      opt.dataset.pantheon = entry.culture;
      opt.textContent = entry.power;
      group.appendChild(opt);
    }
    els.godPower.appendChild(group);
  }

  if (previous && options.some((entry) => entry.power === previous)) {
    els.godPower.value = previous;
  } else {
    const matchingPantheonPower = options.find((entry) => entry.culture === selectedPantheon());
    els.godPower.value = matchingPantheonPower?.power || options[0]?.power || "";
  }
}

function rawSelectedBonusEntries() {
  return selectedBonusIds().map(getBonusById).filter(Boolean);
}

function rawSelectedHasBonusLabel(label) {
  return rawSelectedBonusEntries().some((entry) => entry.label === label);
}

function availableUniqueTechGroups() {
  const pantheon = selectedPantheon();
  const godPower = els.godPower.value;
  const currentUniqueIds = [els.uniqueTech1?.value || ""];
  return UNIQUE_TECH_GROUPS.filter((group) => {
    if (group.pantheon !== "All" && group.pantheon !== pantheon) return false;
    if (group.requiresGodPower && group.requiresGodPower !== godPower) return false;
    return true;
  });
}

function selectedUniqueTechGroups() {
  return [els.uniqueTech1?.value || ""].filter(Boolean);
}

function getUniqueTechGroup(id) {
  return UNIQUE_TECH_GROUPS.find((group) => group.id === id);
}

function uniqueTechEntries(configOrIds) {
  const ids = Array.isArray(configOrIds) ? configOrIds : (configOrIds.uniqueTechs || []);
  return ids.map(getUniqueTechGroup).filter(Boolean);
}

function skinOfTheRhinoCustomTechName(config) {
  return `SkinOfTheRhino${sanitizeId(config.internalName)}`;
}

function temporalChaosCustomTechName(config) {
  return `TemporalChaos${sanitizeId(config.internalName)}`;
}

function techStringKey(techId) {
  return sanitizeId(techId)
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toUpperCase();
}

function uniqueTechOriginalTechId(group) {
  return group?.id || group?.techs?.[0] || "";
}

function uniqueTechDisplayNameStringId(group) {
  return `STR_TECH_${techStringKey(uniqueTechOriginalTechId(group))}_NAME`;
}

function uniqueTechCustomRolloverStringId(group, config) {
  return `STR_TECH_${techStringKey(uniqueTechOriginalTechId(group))}_${sanitizeId(config.internalName).toUpperCase()}_LR`;
}

function uniqueTechCustomDescription(group, config) {
  const source = UNIQUE_TECH_CUSTOM_ROLLOVERS[uniqueTechOriginalTechId(group)] || "CustomGod improves this technology.";
  return source.replaceAll("CustomGod", config.displayName || config.internalName);
}

function currentCustomGodDisplayNameForUi() {
  return (els.displayName?.value || "Custom God").trim() || "Custom God";
}

function uniqueTechUiDescription(group) {
  const source = UNIQUE_TECH_CUSTOM_ROLLOVERS[uniqueTechOriginalTechId(group)] || "CustomGod improves this technology.";
  return source.replaceAll("CustomGod", currentCustomGodDisplayNameForUi());
}

function uniqueTechSetNameEffects(config) {
  return uniqueTechEntries(config).map((group) => {
    const actualTech = uniqueTechNames([group.id])[0];
    const techName = group.id === "SkinOfTheRhino"
      ? skinOfTheRhinoCustomTechName(config)
      : group.id === "TemporalChaos"
        ? temporalChaosCustomTechName(config)
        : actualTech;
    return `<effect type="SetName" tech="${escapeXml(techName)}" newname="${escapeXml(uniqueTechDisplayNameStringId(group))}" newRollover="${escapeXml(uniqueTechCustomRolloverStringId(group, config))}" ></effect>`;
  }).join("\n");
}

function uniqueTechCustomStringMods(config) {
  return uniqueTechEntries(config).map((group) => {
    return `ID = "${uniqueTechCustomRolloverStringId(group, config)}"   ;   Str = "${escapeStringMod(uniqueTechCustomDescription(group, config))}"`;
  }).join("\n");
}


function uniqueTechNames(configOrIds) {
  const seen = new Set();
  const names = [];
  const hasConfig = !Array.isArray(configOrIds) && configOrIds && configOrIds.internalName;
  for (const group of uniqueTechEntries(configOrIds)) {
    const techs = group.id === "SkinOfTheRhino" && hasConfig
      ? [skinOfTheRhinoCustomTechName(configOrIds)]
      : group.id === "TemporalChaos" && hasConfig
        ? [temporalChaosCustomTechName(configOrIds)]
        : group.techs;
    for (const tech of techs) {
      if (!seen.has(tech)) {
        seen.add(tech);
        names.push(tech);
      }
    }
  }
  return names;
}

const UNIQUE_TECH_UI_BUILDINGS_BY_TECH = {
  CelestialWeapons: { Greek: ["Armory"], Egyptian: ["Armory"], Norse: ["Armory"], Atlantean: ["Armory"], Chinese: ["Armory"], Japanese: ["Armory"], Aztec: ["Armory"] },
  Channels: { Greek: ["TownCenter", "VillageCenter", "Temple", "CitadelCenter"], Egyptian: ["TownCenter", "VillageCenter", "Temple", "CitadelCenter"], Norse: ["TownCenter", "VillageCenter", "Temple", "CitadelCenter"], Atlantean: ["TownCenter", "VillageCenter", "Temple", "CitadelCenter"], Chinese: ["TownCenter", "VillageCenter", "Temple", "CitadelCenter"], Japanese: ["TownCenter", "VillageCenter", "Temple", "CitadelCenter"], Aztec: ["TownCenter", "VillageCenter", "Temple", "CitadelCenter"] },
  Clairvoyance: { Greek: ["Temple"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: ["Temple"], Japanese: ["Temple"], Aztec: ["Temple"] },
  CrushingWaves: { Greek: ["Temple"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: ["Temple"], Japanese: ["Temple"], Aztec: ["Temple"] },
  DivineLabor: { Greek: ["Granary"], Egyptian: ["Granary"], Norse: ["OxCart"], Atlantean: ["EconomicGuild"], Chinese: ["Silo"], Japanese: ["WaterMill"], Aztec: ["Calpulli", "CalpulliLivestockPen", "CalpulliLumberOutpost", "CalpulliCraftWorkshop"] },
  EmpyreanSpeed: { Greek: ["Temple"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: ["Temple"], Japanese: ["Temple"], Aztec: ["Temple"] },
  EyesInTheForest: { Greek: ["Temple"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: ["Temple"], Japanese: ["Temple"], Aztec: ["Temple"] },
  FeastOfTlaxochimaco: { Greek: ["Temple"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: ["Temple"], Japanese: ["Temple"], Aztec: ["Temple"] },
  FloodOfTheNile: { Greek: ["Granary"], Egyptian: ["Granary"], Norse: ["OxCart"], Atlantean: ["EconomicGuild"], Chinese: ["Silo"], Japanese: ["WaterMill"], Aztec: ["Calpulli", "CalpulliLivestockPen", "CalpulliLumberOutpost", "CalpulliCraftWorkshop"] },
  FreyrsGift: { Greek: ["TownCenter", "VillageCenter", "CitadelCenter"], Egyptian: ["TownCenter", "VillageCenter", "CitadelCenter"], Norse: ["TownCenter", "VillageCenter", "CitadelCenter"], Atlantean: ["TownCenter", "VillageCenter", "CitadelCenter"], Chinese: ["TownCenter", "VillageCenter", "CitadelCenter"], Japanese: ["TownCenter", "VillageCenter", "CitadelCenter"], Aztec: ["TownCenter", "VillageCenter", "CitadelCenter"] },
  HammerOfThunder: { Norse: ["Armory"] },
  KuafuChieftain: { Chinese: ["TownCenter", "VillageCenter", "CitadelCenter"] },
  LordOfHorses: { Greek: ["Stable"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: ["Temple"], Japanese: ["StableJapanese"], Aztec: ["Temple"] },
  OlympianParentage: { Greek: ["Temple"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: ["Temple"], Japanese: ["Temple"], Aztec: ["Temple"] },
  PeachOfImmortality: { Greek: ["Temple"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: [], Japanese: ["Temple"], Aztec: ["Temple"] },
  SkinOfTheRhino: { Greek: ["TownCenter", "VillageCenter", "CitadelCenter"], Egyptian: ["TownCenter", "VillageCenter", "CitadelCenter"], Norse: ["TownCenter", "VillageCenter", "CitadelCenter"], Atlantean: ["TownCenter", "VillageCenter", "CitadelCenter"], Chinese: ["TownCenter", "VillageCenter", "CitadelCenter"], Japanese: ["TownCenter", "VillageCenter", "CitadelCenter"], Aztec: ["TownCenter", "VillageCenter", "CitadelCenter"] },
  TaiChi: { Greek: ["Temple"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: [], Japanese: ["Temple"], Aztec: ["Temple"] },
  TemporalChaos: { Greek: ["Temple"], Egyptian: ["Temple"], Norse: ["Temple"], Atlantean: ["Temple"], Chinese: ["Temple"], Japanese: ["Temple"], Aztec: ["Temple"] },
  Tenshu: { Greek: ["SentryTower"], Egyptian: ["SentryTower"], Norse: ["SentryTower"], Atlantean: ["SentryTower"], Chinese: ["SentryTower"], Japanese: ["SentryTower"], Aztec: ["SentryTower"] },
  VaultsOfErebus: { Greek: ["Storehouse"], Egyptian: ["MiningCamp"], Norse: ["OxCart"], Atlantean: ["EconomicGuild"], Chinese: ["Silo"], Japanese: ["MiningCampJapanese"], Aztec: ["Calpulli", "CalpulliLivestockPen", "CalpulliLumberOutpost", "CalpulliCraftWorkshop"] },
};

function uniqueTechActualTechName(group, config) {
  if (!group) return "";
  if (group.id === "SkinOfTheRhino") return skinOfTheRhinoCustomTechName(config);
  if (group.id === "TemporalChaos") return temporalChaosCustomTechName(config);
  return uniqueTechNames([group.id])[0] || group.techs?.[0] || group.id;
}

function uniqueTechUiBuildingPosition(building, pantheon) {
  if (building === "Temple") {
    if (pantheon === "Atlantean") return { row: 1, column: 0 };
    if (pantheon === "Norse") return { row: 2, column: 0 };
    return { row: 1, column: 5 };
  }
  if (["TownCenter", "VillageCenter", "CitadelCenter"].includes(building)) {
    return pantheon === "Egyptian" ? { row: 1, column: 0 } : { row: 1, column: 3 };
  }
  if (building === "SentryTower") return { row: 1, column: 5 };
  if (["Armory", "DwarvenArmory"].includes(building)) return { row: 1, column: 5 };
  if (["Granary", "Storehouse", "MiningCamp", "OxCart", "EconomicGuild", "Silo", "MiningCampJapanese", "WaterMill", "Calpulli", "CalpulliLivestockPen", "CalpulliLumberOutpost", "CalpulliCraftWorkshop"].includes(building)) {
    return { row: 0, column: 5 };
  }
  if (["Stable", "StableJapanese"].includes(building)) return { row: 1, column: 5 };
  return null;
}

function uniqueTechCommandTargetBuilding(building) {
  return ["Armory", "DwarvenArmory"].includes(building) ? "AbstractArmory" : building;
}

function uniqueTechCommandEffectsForBuilding(techName, building, pantheon) {
  const position = uniqueTechUiBuildingPosition(building, pantheon);
  if (!position) return "";
  const targetBuilding = uniqueTechCommandTargetBuilding(building);
  return `<effect type="Data" amount="1.00" subtype="CommandRemove" tech="${escapeXml(techName)}" relativity="Assign">
	<target type="ProtoUnit">${escapeXml(targetBuilding)}</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" tech="${escapeXml(techName)}" row="${position.row}" column="${position.column}" relativity="Assign">
	<target type="ProtoUnit">${escapeXml(targetBuilding)}</target>
</effect>`;
}

function uniqueTechUiPlacementEffects(config) {
  const pantheon = config.baseCulture;
  const effects = [];
  for (const group of uniqueTechEntries(config)) {
    const techName = uniqueTechActualTechName(group, config);
    const buildings = UNIQUE_TECH_UI_BUILDINGS_BY_TECH[group.id]?.[pantheon] || [];
    for (const building of buildings) {
      const xml = uniqueTechCommandEffectsForBuilding(techName, building, pantheon);
      if (xml) effects.push(xml);
    }
  }
  return effects.join("\n");
}

function uniqueTechAegirTempleRepositionEffects(config) {
  if (config.baseCulture !== "Norse") return "";
  if (!(config.minorGods?.HeroicAge || []).includes("HeroicAgeAegir")) return "";
  const effects = [];
  for (const group of uniqueTechEntries(config)) {
    const techName = uniqueTechActualTechName(group, config);
    const buildings = UNIQUE_TECH_UI_BUILDINGS_BY_TECH[group.id]?.Norse || [];
    if (!buildings.includes("Temple")) continue;
    effects.push(`<effect type="Data" amount="1.00" subtype="CommandRemove" tech="${escapeXml(techName)}" relativity="Assign">
	<target type="ProtoUnit">Temple</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" tech="${escapeXml(techName)}" row="1" column="4" relativity="Assign">
	<target type="ProtoUnit">Temple</target>
</effect>`);
  }
  return effects.join("\n");
}

function uniqueTechAegirTempleRepositionTechs(config) {
  const effects = uniqueTechAegirTempleRepositionEffects(config);
  if (!effects) return "";
  return `<tech name="HeroicAgeAegir">
	<effects>
${indentTabBlock(effects, 2)}
	</effects>
</tech>`;
}


function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function searchMatchesText(haystack, query) {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const text = normalizeSearchText(haystack);
  return terms.every((term) => text.includes(term));
}


function ensureSelectFilterInput(select, kind, placeholder) {
  if (!select) return null;
  if (select.dataset.inlineSearchReady === "true") {
    return document.getElementById(select.dataset.filterInputId) || select;
  }
  select.dataset.inlineSearchReady = "true";
  select.dataset.searchQuery = "";

  const wrapper = document.createElement("div");
  wrapper.className = "search-combo-wrap";

  const input = document.createElement("input");
  input.type = "text";
  input.className = "combo-select-input";
  input.placeholder = placeholder || "Type to search...";
  input.autocomplete = "off";
  input.spellcheck = false;
  input.title = "Type to search, then choose a suggestion. Clear the field to select None.";

  const panel = document.createElement("div");
  panel.className = "combo-suggestion-panel";

  const baseId = select.id || `${kind}-select-${Math.random().toString(36).slice(2)}`;
  wrapper.appendChild(input);
  wrapper.appendChild(panel);
  select.parentNode.insertBefore(wrapper, select);
  select.classList.add("native-select-hidden");
  select.tabIndex = -1;
  select.setAttribute("aria-hidden", "true");

  input.id = `${baseId}-search-input`;
  panel.id = `${baseId}-suggestions-panel`;
  select.dataset.filterInputId = input.id;
  select.dataset.panelId = panel.id;
  select.dataset.comboMap = "{}";
  select.dataset.comboSuggestions = "[]";

  const refresh = () => {
    if (kind === "unique") initUniqueTechSelects(true);
    else if (kind === "bonus") initBonusSelects(true);
    updatePreview();
  };

  const closePanel = () => panel.classList.remove("open");
  const openPanel = () => {
    if (!input.disabled) panel.classList.add("open");
  };

  const chooseExactMatch = () => {
    const raw = input.value || "";
    if (!raw.trim()) {
      select.value = "";
      select.dataset.searchQuery = "";
      return true;
    }
    const map = JSON.parse(select.dataset.comboMap || "{}");
    const value = map[raw] || map[normalizeSearchText(raw)];
    if (value !== undefined) {
      select.value = value;
      select.dataset.searchQuery = "";
      return true;
    }
    select.value = "";
    select.dataset.searchQuery = raw;
    return false;
  };

  const chooseValue = (value, label) => {
    select.value = value || "";
    input.value = label || "";
    select.dataset.searchQuery = "";
    closePanel();
    refresh();
  };

  input.addEventListener("input", () => {
    chooseExactMatch();
    refresh();
    openPanel();
  });

  input.addEventListener("focus", () => {
    if (!select.value) select.dataset.searchQuery = input.value || "";
    renderComboSuggestions(select);
    openPanel();
  });

  input.addEventListener("keydown", (event) => {
    const items = Array.from(panel.querySelectorAll(".combo-suggestion-option:not(.disabled)"));
    const currentIndex = items.findIndex((item) => item.classList.contains("active"));
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openPanel();
      const next = items[Math.min(items.length - 1, currentIndex + 1)] || items[0];
      items.forEach((item) => item.classList.remove("active"));
      if (next) { next.classList.add("active"); next.scrollIntoView({ block: "nearest" }); }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openPanel();
      const next = items[Math.max(0, currentIndex - 1)] || items[items.length - 1];
      items.forEach((item) => item.classList.remove("active"));
      if (next) { next.classList.add("active"); next.scrollIntoView({ block: "nearest" }); }
    } else if (event.key === "Enter") {
      const active = items[currentIndex];
      if (active) {
        event.preventDefault();
        chooseValue(active.dataset.value, active.dataset.label);
      }
    } else if (event.key === "Escape") {
      closePanel();
      input.value = select.value ? (select.dataset.displayLabel || input.value) : "";
      select.dataset.searchQuery = "";
      refresh();
    }
  });

  input.addEventListener("blur", () => {
    setTimeout(() => {
      if (!wrapper.contains(document.activeElement)) {
        if (!select.value && input.value.trim()) input.value = "";
        select.dataset.searchQuery = "";
        closePanel();
        refresh();
      }
    }, 140);
  });

  select.addEventListener("change", () => {
    select.dataset.searchQuery = "";
    const selectedOption = select.selectedOptions && select.selectedOptions[0];
    input.value = selectedOption && select.value ? (select.dataset.displayLabel || selectedOption.textContent || "") : "";
    refresh();
  });

  return input;
}

function selectFilterQuery(select) {
  const input = select?.dataset?.filterInputId ? document.getElementById(select.dataset.filterInputId) : null;
  if (!input) return select?.dataset?.searchQuery || "";
  if (document.activeElement === input && !select.value) return input.value || "";
  return select?.dataset?.searchQuery || "";
}

function comboPanel(select) {
  return select?.dataset?.panelId ? document.getElementById(select.dataset.panelId) : null;
}

function renderComboSuggestions(select) {
  const panel = comboPanel(select);
  if (!panel) return;
  const suggestions = JSON.parse(select.dataset.comboSuggestions || "[]");
  const selectedValue = select.value || "";
  panel.innerHTML = "";

  const none = document.createElement("div");
  none.className = "combo-suggestion-option";
  none.textContent = "None";
  none.dataset.value = "";
  none.dataset.label = "";
  if (!selectedValue) none.classList.add("active");
  none.addEventListener("mousedown", (event) => {
    event.preventDefault();
    const input = document.getElementById(select.dataset.filterInputId);
    select.value = "";
    if (input) input.value = "";
    select.dataset.searchQuery = "";
    panel.classList.remove("open");
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
  panel.appendChild(none);

  if (!suggestions.length) {
    const empty = document.createElement("div");
    empty.className = "combo-suggestion-empty";
    empty.textContent = "No matches";
    panel.appendChild(empty);
    return;
  }

  for (const suggestion of suggestions) {
    const item = document.createElement("div");
    item.className = "combo-suggestion-option";
    if (suggestion.description) {
      const titleLine = document.createElement("div");
      titleLine.className = "combo-suggestion-title";
      titleLine.textContent = suggestion.label;
      const descLine = document.createElement("div");
      descLine.className = "combo-suggestion-description";
      descLine.textContent = suggestion.description;
      item.appendChild(titleLine);
      item.appendChild(descLine);
    } else {
      item.textContent = suggestion.label;
    }
    item.title = suggestion.disabled
      ? (suggestion.disabledReason || "Already selected")
      : (suggestion.title || suggestion.label);
    item.dataset.value = suggestion.value;
    item.dataset.label = suggestion.label;
    if (suggestion.disabled) {
      item.classList.add("disabled");
      item.setAttribute("aria-disabled", "true");
    }
    if (!suggestion.disabled && suggestion.value === selectedValue) item.classList.add("active");
    item.addEventListener("mousedown", (event) => {
      event.preventDefault();
      if (suggestion.disabled) return;
      const input = document.getElementById(select.dataset.filterInputId);
      select.value = suggestion.value;
      select.dataset.searchQuery = "";
      select.dataset.displayLabel = suggestion.label;
      if (input) input.value = suggestion.label;
      panel.classList.remove("open");
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    panel.appendChild(item);
  }
}

function setComboSuggestions(select, suggestions) {
  const map = { "None": "", "none": "" };
  for (const suggestion of suggestions || []) {
    map[suggestion.label] = suggestion.value;
    map[normalizeSearchText(suggestion.label)] = suggestion.value;
  }
  select.dataset.comboMap = JSON.stringify(map);
  select.dataset.comboSuggestions = JSON.stringify(suggestions || []);
  renderComboSuggestions(select);
}

function setComboDisplay(select, label) {
  const input = select?.dataset?.filterInputId ? document.getElementById(select.dataset.filterInputId) : null;
  if (!input) return;
  select.dataset.displayLabel = label || "";
  if (!(document.activeElement === input && !select.value)) {
    input.value = label || "";
  }
  input.disabled = Boolean(select.disabled);
  input.title = select.title || input.title || "Type to search, then choose a suggestion.";
}

function uniqueTechSearchText(group) {
  const sourcePantheon = uniqueTechSourcePantheon(group);
  const allowedText = group.pantheon === "All" ? "All pantheons" : `${group.pantheon} only`;
  return [
    group.id,
    group.label,
    sourcePantheon,
    allowedText,
    ...(group.techs || []).map(displayTechName),
    ...(group.techs || []),
    uniqueTechUiDescription(group),
    group.requiresGodPower ? `requires ${group.requiresGodPower}` : "",
  ].join(" ");
}

function bonusSearchText(entry, pantheon = selectedPantheon()) {
  return [
    entry.id,
    entry.sourcePantheon,
    entry.sourceMajor,
    entry.label,
    dynamicBonusLabel(entry, pantheon),
    ...(entry.allowedPantheons || []),
    entry.files || "",
  ].join(" ");
}

function includeCurrentOption(options, current, getById) {
  if (!current || options.some((entry) => entry.id === current)) return options;
  const selected = getById(current);
  return selected ? [selected, ...options] : options;
}

function uniqueTechComboLabel(group) {
  const sourcePantheon = uniqueTechSourcePantheon(group);
  let label = `${sourcePantheon} — ${displayTechName(group.label || group.id)}`;
  if (group.requiresGodPower) label += ` (requires ${group.requiresGodPower})`;
  return label;
}

function initUniqueTechSelects(keep = true) {
  const previous = keep ? selectedUniqueTechGroups() : [];
  const allOptions = availableUniqueTechGroups();
  for (const [index, select] of [els.uniqueTech1].entries()) {
    if (!select) continue;
    const filterInput = ensureSelectFilterInput(select, "unique", "Type to search unique technologies...");
    const rawQuery = selectFilterQuery(select);
    const query = rawQuery;
    const current = previous[index] || "";
    let options = allOptions.filter((group) => searchMatchesText(uniqueTechSearchText(group), query));
    options = includeCurrentOption(options, current, getUniqueTechGroup);

    select.innerHTML = "";
    const none = document.createElement("option");
    none.value = "";
    none.textContent = "None";
    select.appendChild(none);

    const groupedOptions = new Map();
    for (const group of options) {
      const sourcePantheon = uniqueTechSourcePantheon(group);
      if (!groupedOptions.has(sourcePantheon)) groupedOptions.set(sourcePantheon, []);
      groupedOptions.get(sourcePantheon).push(group);
    }

    const orderedSourcePantheons = [
      ...UNIQUE_TECH_PANTHEON_ORDER.filter((pantheonName) => groupedOptions.has(pantheonName)),
      ...Array.from(groupedOptions.keys()).filter((pantheonName) => !UNIQUE_TECH_PANTHEON_ORDER.includes(pantheonName)).sort(),
    ];

    const suggestions = [];
    for (const sourcePantheon of orderedSourcePantheons) {
      const optGroup = document.createElement("optgroup");
      optGroup.label = sourcePantheon;
      for (const group of groupedOptions.get(sourcePantheon).sort((a, b) => displayTechName(a.label || a.id).localeCompare(displayTechName(b.label || b.id)))) {
        const opt = document.createElement("option");
        opt.value = group.id;
        opt.textContent = displayTechName(group.label || group.id);
        const allowedText = group.pantheon === "All" ? "All pantheons" : `${group.pantheon} only`;
        opt.title = `Source: ${sourcePantheon} | Allowed: ${allowedText} | Grants: ${group.techs.map(displayTechName).join(", ")}`;
        if (group.requiresGodPower) opt.textContent += ` (requires ${group.requiresGodPower})`;
        if (current && group.id === current && query && !searchMatchesText(uniqueTechSearchText(group), query)) {
          opt.textContent += " (selected; outside filter)";
        }
        optGroup.appendChild(opt);
        const otherUniqueSelected = previous.some((selectedId, selectedIndex) => selectedIndex !== index && selectedId === group.id);
        suggestions.push({
          value: group.id,
          label: uniqueTechComboLabel(group),
          description: uniqueTechUiDescription(group),
          title: `${opt.title} | ${uniqueTechUiDescription(group)}`,
          disabled: otherUniqueSelected,
          disabledReason: otherUniqueSelected ? "Already selected in another unique technology slot" : "",
        });
      }
      if (optGroup.children.length) select.appendChild(optGroup);
    }

    setComboSuggestions(select, suggestions);
    if (current && options.some((group) => group.id === current)) select.value = current;
    else select.value = "";
    const selectedGroup = select.value ? getUniqueTechGroup(select.value) : null;
    setComboDisplay(select, selectedGroup ? uniqueTechComboLabel(selectedGroup) : (document.activeElement === filterInput ? rawQuery : ""));
  }
  enforceUniqueTechDifference();
}
function enforceUniqueTechDifference(changedSelect) {
  if (!els.uniqueTech1) return;
  setComboDisplay(els.uniqueTech1, els.uniqueTech1.value ? uniqueTechComboLabel(getUniqueTechGroup(els.uniqueTech1.value)) : "");
}

function bonusSelects() {
  return [els.bonus1, els.bonus2, els.bonus3, els.bonus4].filter(Boolean);
}

function bonusAllowedForPantheon(entry, pantheon) {
  const allowed = entry.allowedPantheons || [];
  return allowed.includes("All") || allowed.includes(pantheon);
}

function availableBonuses() {
  const pantheon = selectedPantheon();
  return (window.AOM_BONUS_DATA || [])
    .filter((entry) => bonusAllowedForPantheon(entry, pantheon))
    .sort((a, b) => a.sourcePantheon.localeCompare(b.sourcePantheon) || a.sourceMajor.localeCompare(b.sourceMajor) || a.label.localeCompare(b.label));
}

function selectedBonusIds() {
  return bonusSelects().map((select) => select.value).filter(Boolean);
}

function getBonusById(id) {
  return (window.AOM_BONUS_DATA || []).find((entry) => entry.id === id);
}

function bonusByLabel(label) {
  return (window.AOM_BONUS_DATA || []).find((entry) => entry.label === label);
}

function selectedAutoBonusLocks() {
  return selectedUniqueTechGroups()
    .map(getUniqueTechGroup)
    .filter((group) => group && group.autoBonusLabel)
    .map((group) => ({ group, bonus: bonusByLabel(group.autoBonusLabel) }))
    .filter((entry) => entry.bonus);
}

function requiredAutoBonusIssues(configOrIds) {
  const groups = Array.isArray(configOrIds)
    ? configOrIds.map(getUniqueTechGroup).filter(Boolean)
    : uniqueTechEntries(configOrIds);
  const bonusIds = new Set(Array.isArray(configOrIds) ? selectedBonusIds() : (configOrIds.bonuses || []));
  const issues = [];
  for (const group of groups) {
    if (!group.autoBonusLabel) continue;
    const bonus = bonusByLabel(group.autoBonusLabel);
    if (bonus && !bonusIds.has(bonus.id)) {
      issues.push({ group, bonus });
    }
  }
  return issues;
}

function formatRequiredAutoBonusIssue(issue) {
  return `${issue.group.label} requires the god bonus "${issue.bonus.label}". Free a bonus slot or choose that bonus before export.`;
}

function enforceChannelsGaiaLushBonusLock() {
  const locks = selectedAutoBonusLocks();
  const selects = bonusSelects();

  for (const select of selects) {
    select.disabled = false;
    select.title = "";
    delete select.dataset.lockedByUniqueTech;
    const entry = select.value ? getBonusById(select.value) : null;
    setComboDisplay(select, entry ? bonusComboLabel(entry) : "");
  }

  const lockedSelects = [];
  for (const { group, bonus } of locks) {
    let targetSelect = selects.find((select) => select.value === bonus.id);
    if (!targetSelect) {
      targetSelect = selects.find((select) => !select.value && !lockedSelects.includes(select));
      if (targetSelect) targetSelect.value = bonus.id;
    }
    if (targetSelect && targetSelect.value === bonus.id) {
      lockedSelects.push(targetSelect);
      targetSelect.dataset.lockedByUniqueTech = group.id;
    }
  }

  enforceBonusDifference();

  for (const select of lockedSelects) {
    const group = getUniqueTechGroup(select.dataset.lockedByUniqueTech);
    select.disabled = true;
    select.title = `Locked while ${group?.label || "the linked unique technology"} is selected as a unique technology.`;
    const entry = select.value ? getBonusById(select.value) : null;
    setComboDisplay(select, entry ? bonusComboLabel(entry) : "");
  }

  const issues = requiredAutoBonusIssues(selectedUniqueTechGroups());
  if (issues.length) {
    setMessage(issues.map(formatRequiredAutoBonusIssue).join(" "), true);
  }
}

function effectiveBonusIds(configOrIds) {
  return Array.isArray(configOrIds) ? [...configOrIds] : [...(configOrIds.bonuses || [])];
}

function selectedBonusEntries(configOrIds) {
  return effectiveBonusIds(configOrIds).map(getBonusById).filter(Boolean);
}

function bonusComboLabel(entry, pantheon = selectedPantheon()) {
  return `${entry.sourcePantheon} — ${entry.sourceMajor}: ${dynamicBonusLabel(entry, pantheon)}`;
}

function initBonusSelects(keep = true) {
  const previous = keep ? selectedBonusIds() : [];
  const pantheon = selectedPantheon();
  const allOptions = availableBonuses();
  for (const [index, select] of bonusSelects().entries()) {
    const filterInput = ensureSelectFilterInput(select, "bonus", "Type to search bonuses...");
    const rawQuery = selectFilterQuery(select);
    const query = rawQuery;
    const current = previous[index] || "";
    let options = allOptions.filter((entry) => searchMatchesText(bonusSearchText(entry, pantheon), query));
    options = includeCurrentOption(options, current, getBonusById);

    select.innerHTML = "";
    const none = document.createElement("option");
    none.value = "";
    none.textContent = "None";
    select.appendChild(none);

    const suggestions = [];
    for (const sourcePantheon of Array.from(new Set(options.map((entry) => entry.sourcePantheon)))) {
      const group = document.createElement("optgroup");
      group.label = sourcePantheon;
      for (const entry of options.filter((item) => item.sourcePantheon === sourcePantheon)) {
        const opt = document.createElement("option");
        opt.value = entry.id;
        opt.textContent = `${entry.sourceMajor}: ${dynamicBonusLabel(entry, pantheon)}`;
        if (current && entry.id === current && query && !searchMatchesText(bonusSearchText(entry, pantheon), query)) {
          opt.textContent += " (selected; outside filter)";
        }
        opt.title = `Allowed: ${(entry.allowedPantheons || []).join(", ")} | Files: ${entry.files}`;
        group.appendChild(opt);
        const otherBonusSelected = previous.some((selectedId, selectedIndex) => selectedIndex !== index && selectedId === entry.id);
        suggestions.push({
          value: entry.id,
          label: bonusComboLabel(entry, pantheon),
          title: opt.title,
          disabled: otherBonusSelected,
          disabledReason: otherBonusSelected ? "Already selected in another bonus slot" : "",
        });
      }
      if (group.children.length) select.appendChild(group);
    }

    setComboSuggestions(select, suggestions);
    if (current && options.some((entry) => entry.id === current)) select.value = current;
    else select.value = "";
    const selectedEntry = select.value ? getBonusById(select.value) : null;
    setComboDisplay(select, selectedEntry ? bonusComboLabel(selectedEntry, pantheon) : (document.activeElement === filterInput ? rawQuery : ""));
  }
  enforceBonusDifference();
  enforceChannelsGaiaLushBonusLock();
}
function enforceBonusDifference(changedSelect) {
  const selected = selectedBonusIds();
  if (changedSelect && changedSelect.value && selected.filter((id) => id === changedSelect.value).length > 1) {
    changedSelect.value = "";
  }
  const active = new Set(selectedBonusIds());
  for (const select of bonusSelects()) {
    for (const opt of select.options) {
      opt.disabled = Boolean(opt.value && active.has(opt.value) && opt.value !== select.value);
    }
    const entry = select.value ? getBonusById(select.value) : null;
    setComboDisplay(select, entry ? bonusComboLabel(entry) : "");
  }
}

const GAIA_ECON_GUILD_BONUS_LABEL = "Economic Guild and upgrades are cheaper and available earlier.";
const KRONOS_EXTRA_MYTH_UNITS_BONUS_LABEL = "Receives 2 free Temple myth units instead of 1 on age-up.";
const KRONOS_TIMESHIFT_BONUS_LABEL = "Can Time-Shift buildings. Most are free, except Towers and Fortress-type buildings costing half their price.";
const KRONOS_TEMPORAL_SCAFFOLDING_BONUS_LABEL = "Buildings construct faster near Manors.";

const ORANOS_SKY_PASSAGE_BONUS_LABEL = "Villagers/Infantry(Norse)/Priest(Egyptian) can build a new Sky Passage each age, enabling instant travel between them.";
const LOKI_SPAWN_MYTH_UNITS_BONUS_LABEL = "Damaging enemies can spawn myth units.";
const LOKI_MILITARY_BUILD_BONUS_LABEL = "Military-built buildings are constructed faster";
const LOKI_COUNTER_DAMAGE_BONUS_LABEL = "Human soldiers and heroes get bonus counter damage.";
const POSEIDON_SPEED_BY_AGE_BONUS_LABEL = "Cavalry, Caravans, and myth units gain speed by age.";
const POSEIDON_STABLE_MARKET_DISCOUNT_BONUS_LABEL = "Stables and Markets are 30% cheaper.";
const POSEIDON_MILITIA_BONUS_LABEL = "Militia spawn from razed buildings.";
const HUITZ_TONALLI_RESOURCES_BONUS_LABEL = "Collecting Tonalli grants resources in addition to favor.";
const HUITZ_CONSTRUCTION_REFUND_BONUS_LABEL = "Temples, Fortress-type building, Village Centers, and Town Centers refund part of their wood/gold cost on completion.";
const ZEUS_STARTING_FAVOR_BONUS_LABEL = "Starts with 10 favor.";
const ZEUS_COUNTER_CAV_INFANTRY_SPEED_BONUS_LABEL = "Hoplite and other counter-cavalry infantry move 15% faster.";
const HUITZ_SHORN_TONALLI_BONUS_LABEL = "Shorn Ones have more hit points and generate extra Tonalli in combat.";
const QUETZ_DROPSITE_DISCOUNT_BONUS_LABEL = "Dropsite and their additions cost 33% less.";
const QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL = "Eagle Warriors gain +1 range and +1 line of sight in the Heroic and Mythic Ages.";
const TEZCAT_DEVOTE_FAVOR_BONUS_LABEL = "Devoting Settlers gives higher immediate favor by age.";
const TEZCAT_JAGUAR_RIDER_BONUS_LABEL = "Jaguar Riders are available from the Heroic Age.";
const TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL = "Every 2 lost trainable myth units can create an Obsidian Shard that may summons a free myth unit.";
const FUXI_NEZHA_BONUS_LABEL = "Gains access to Nezha in the Classical Age.";
const NUWA_CREATORS_AUSPICE_BONUS_LABEL = "Creator’s Auspice improves as favor is earned, reducing standard Villager cost and increasing building hit points.";
const NUWA_FAVORED_LAND_FARTHER_BONUS_LABEL = "Buildings spread Favored Land farther.";
const SHENNONG_MYTH_REGEN_FAVORED_LAND_BONUS_LABEL = "Myth units regenerate hit points on Favored Land. Regeneration scales by age.";
const SHENNONG_GIFT_OF_BEASTS_BONUS_LABEL = "Gift of Beasts summons myth units from the next age as favor is earned.";
const SHENNONG_FARM_LINE_UPGRADES_BONUS_LABEL = "Farm Line Upgrades are researched for free and instantly in their respective ages.";
const SET_ANIMALS_BONUS_LABEL = "Starts with a Baboon of Set and gets Animals of Set on age-up.Pharaohs can summon Animals of Set and Priests can convert wild animals.";
const DEMETER_HERDABLES_TEMPLE_FAVOR_BONUS_LABEL = "Herdables near Temples improve favor-gathering.";
const DEMETER_HERDABLES_FATTEN_BONUS_LABEL = "Herdables fatten faster and hold more food.";
const DEMETER_HERDABLES_SPAWN_ON_AGE_UP_BONUS_LABEL = "Town Centers and Village Centers spawn herdables on age-up.";
const DEMETER_TRAIN_FASTER_BY_AGE_BONUS_LABEL = "Human soldiers and myth units train faster by age.";
const HADES_MYTH_HP_BY_AGE_BONUS_LABEL = "Myth units gain bonus hit points by age.";
const HADES_RANGED_TECH_DISCOUNT_BONUS_LABEL = "Ranged-soldier technologies are cheaper.";
const FREYR_FORTRESS_DAMAGE_BONUS_LABEL = "Fortress-type building units deal +10% damage.";
const RA_FORTRESS_HP_BONUS_LABEL = "Fortress-type building units get +15% hit points.";
const SET_MILITARY_BUILDING_DISCOUNT_BONUS_LABEL = "Military production buildings including Fortress-type cost 25% less resources excluding favor.";

function dynamicBonusLabel(entry, pantheonOrConfig) {
  if (!entry) return "";
  const pantheon = typeof pantheonOrConfig === "string"
    ? pantheonOrConfig
    : (pantheonOrConfig?.baseCulture || selectedPantheon());
  if (entry.id === "bonus_45" || entry.label === LOKI_MILITARY_BUILD_BONUS_LABEL) {
    return pantheon === "Norse"
      ? "Infantry units construct buildings faster."
      : "Villagers construct buildings faster.";
  }
  if (entry.id === "bonus_56" || entry.label === ORANOS_SKY_PASSAGE_BONUS_LABEL) {
    if (pantheon === "Norse") return "Infantry units can build a new Sky Passage each age, enabling instant travel between them.";
    if (pantheon === "Egyptian") return "Priests can build a new Sky Passage each age, enabling instant travel between them.";
    return "Villagers can build a new Sky Passage each age, enabling instant travel between them.";
  }
  if (entry.id === "bonus_50") {
    return pantheon === "Norse"
      ? "Building repair is free. Gatherers and Dwarves can repair."
      : "Building repair is free.";
  }
  if (entry.id === "bonus_53") {
    return pantheon === "Atlantean"
      ? "Buildings construct faster near Manors."
      : "Buildings construct slighlty faster near Houses.";
  }
  if (entry.id === "bonus_62") {
    return pantheon === "Atlantean"
      ? "Economic Guild and upgrades are cheaper and available earlier."
      : "Standard economic upgrades are cheaper and available earlier.";
  }
  if (entry.id === "bonus_66" || entry.label === FUXI_NEZHA_BONUS_LABEL) {
    return "Gains access to Nezha in the Classical Age.";
  }
  if (entry.id === "bonus_73") {
    return pantheon === "Chinese"
      ? "Farms are available in the Archaic Age and auto-build on Favored Land."
      : "Farms are available in the Archaic Age.";
  }
  if (entry.id === "bonus_91") {
    return pantheon === "Aztec"
      ? "Sentry Towers, Spike Traps, and Smoke Traps build faster and deal more damage."
      : "Sentry Towers build faster and deal more damage.";
  }
  return entry.label;
}

const SET_ANIMALS_ARCHAIC_EFFECTS = `<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">BaboonOfSet</target>
</effect>
<effect type="Data" action="Convert" amount="1.00" subtype="ActionEnable" relativity="Absolute">
	<target type="ProtoUnit">Priest</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="BaboonOfSet" row="1" column="1" relativity="Assign">
	<target type="ProtoUnit">Pharaoh</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="GazelleOfSet" row="1" column="2" relativity="Assign">
	<target type="ProtoUnit">Pharaoh</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="GiraffeOfSet" row="1" column="3" relativity="Assign">
	<target type="ProtoUnit">Pharaoh</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="HippopotamusOfSet" row="1" column="4" relativity="Assign">
	<target type="ProtoUnit">Pharaoh</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="HyenaOfSet" row="2" column="1" relativity="Assign">
	<target type="ProtoUnit">Pharaoh</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="CrocodileOfSet" row="2" column="2" relativity="Assign">
	<target type="ProtoUnit">Pharaoh</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="RhinocerosOfSet" row="2" column="3" relativity="Assign">
	<target type="ProtoUnit">Pharaoh</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="ElephantOfSet" row="2" column="4" relativity="Assign">
	<target type="ProtoUnit">Pharaoh</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="BaboonOfSet" row="1" column="1" relativity="Assign">
	<target type="ProtoUnit">PharaohNewKingdom</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="GazelleOfSet" row="1" column="2" relativity="Assign">
	<target type="ProtoUnit">PharaohNewKingdom</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="GiraffeOfSet" row="1" column="3" relativity="Assign">
	<target type="ProtoUnit">PharaohNewKingdom</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="HippopotamusOfSet" row="1" column="4" relativity="Assign">
	<target type="ProtoUnit">PharaohNewKingdom</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="HyenaOfSet" row="2" column="1" relativity="Assign">
	<target type="ProtoUnit">PharaohNewKingdom</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="CrocodileOfSet" row="2" column="2" relativity="Assign">
	<target type="ProtoUnit">PharaohNewKingdom</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="RhinocerosOfSet" row="2" column="3" relativity="Assign">
	<target type="ProtoUnit">PharaohNewKingdom</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="ElephantOfSet" row="2" column="4" relativity="Assign">
	<target type="ProtoUnit">PharaohNewKingdom</target>
</effect>`;

const SET_ANIMALS_CLASSICAL_EFFECTS = `<effect type="CreateUnit" unit="HyenaOfSet" generator="AbstractTemple">
	<pattern type="Scatter" speed="0.00" radius="0.00" quantity="1.00" minradius="0.00">
		<offset x="0.00" y="0.00" z="0.00"></offset>
	</pattern>
</effect>
<effect type="CreateUnit" unit="GazelleOfSet" generator="AbstractTemple">
	<pattern type="Scatter" speed="0.00" radius="0.00" quantity="2.00" minradius="0.00">
		<offset x="0.00" y="0.00" z="0.00"></offset>
	</pattern>
</effect>
<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">HyenaOfSet</target>
</effect>
<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">GazelleOfSet</target>
</effect>`;

const SET_ANIMALS_HEROIC_EFFECTS = `<effect type="CreateUnit" unit="CrocodileOfSet" generator="AbstractTemple">
	<pattern type="Scatter" speed="0.00" radius="0.00" quantity="1.00" minradius="0.00">
		<offset x="0.00" y="0.00" z="0.00"></offset>
	</pattern>
</effect>
<effect type="CreateUnit" unit="GiraffeOfSet" generator="AbstractTemple">
	<pattern type="Scatter" speed="0.00" radius="0.00" quantity="2.00" minradius="0.00">
		<offset x="0.00" y="0.00" z="0.00"></offset>
	</pattern>
</effect>
<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">CrocodileOfSet</target>
</effect>
<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">GiraffeOfSet</target>
</effect>`;

const SET_ANIMALS_MYTHIC_EFFECTS = `<effect type="CreateUnit" unit="RhinocerosOfSet" generator="AbstractTemple">
	<pattern type="Scatter" speed="0.00" radius="0.00" quantity="1.00" minradius="0.00">
		<offset x="0.00" y="0.00" z="0.00"></offset>
	</pattern>
</effect>
<effect type="CreateUnit" unit="HippopotamusOfSet" generator="AbstractTemple">
	<pattern type="Scatter" speed="0.00" radius="0.00" quantity="2.00" minradius="0.00">
		<offset x="0.00" y="0.00" z="0.00"></offset>
	</pattern>
</effect>
<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">RhinocerosOfSet</target>
</effect>
<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">HippopotamusOfSet</target>
</effect>
<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">ElephantOfSet</target>
</effect>`;

const ORANOS_SKY_PASSAGE_ARCHAIC_EFFECTS = `<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">SkyPassage</target>
</effect>`;

const ORANOS_SKY_PASSAGE_BUILDERS_BY_PANTHEON = {
  Greek: ["VillagerGreek", "LykaonVillager"],
  Egyptian: ["Priest"],
  Norse: ["Berserk", "Hirdman", "ThrowingAxeman", "Huskarl", "Hersir", "Godi"],
  Chinese: ["VillagerChinese", "VillagerChineseClay", "Kuafu"],
  Japanese: ["VillagerJapanese"],
  Aztec: ["VillagerAztec"],
};

function oranosSkyPassageArchaicEffects(config) {
  const effects = [ORANOS_SKY_PASSAGE_ARCHAIC_EFFECTS];
  const builders = ORANOS_SKY_PASSAGE_BUILDERS_BY_PANTHEON[config.baseCulture] || [];
  for (const builder of builders) {
    const row = builder === "Priest" ? "0" : "2";
    effects.push(`<effect type="Data" amount="1.00" subtype="CommandAdd" proto="SkyPassage" row="${row}" column="4" relativity="Assign">
	<target type="ProtoUnit">${builder}</target>
</effect>`);
  }
  if (config.baseCulture === "Egyptian") {
    effects.push(`<effect type="Data" amount="0.00" subtype="cost" resource="Wood" relativity="Override">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>
<effect type="Data" amount="25.00" subtype="cost" resource="Gold" relativity="Override">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`);
  }
  return effects.join("\n");
}

const ORANOS_SKY_PASSAGE_AGE_EFFECTS = `<effect type="Data" amount="1.00" subtype="BuildLimit" relativity="Absolute">
	<target type="ProtoUnit">SkyPassage</target>
</effect>`;

const POSEIDON_SPEED_BY_AGE_EFFECTS = `<effect type="Data" amount="0.10" subtype="MaximumVelocity" relativity="Absolute">
	<target type="ProtoUnit">MythUnit</target>
</effect>
<effect type="Data" amount="0.10" subtype="MaximumVelocity" relativity="Absolute">
	<target type="ProtoUnit">AbstractCavalry</target>
</effect>
<effect type="Data" amount="0.10" subtype="MaximumVelocity" relativity="Absolute">
	<target type="ProtoUnit">TradeUnit</target>
</effect>`;

function poseidonStableMarketDiscountEffects(config) {
  const stableUnit = config.baseCulture === "Japanese" ? "StableJapanese" : "Stable";
  return `<effect type="Data" amount="0.70" subtype="cost" resource="Wood" relativity="Percent">
	<target type="ProtoUnit">Market</target>
</effect>
<effect type="Data" amount="0.70" subtype="cost" resource="Wood" relativity="Percent">
	<target type="ProtoUnit">${stableUnit}</target>
</effect>`;
}


function freyrFortressDamageEffects(config) {
  const unitsByPantheon = {
    Greek: ["Petrobolos", "Helepolis", config.greekUniqueUnit || "Myrmidon"],
    Egyptian: ["CamelRider", "ChariotArcher", "WarElephant"],
    Norse: ["Huskarl", "AbstractSiegeWeapon"],
    Atlantean: ["Destroyer", "Fanatic", "FireSiphon"],
    Chinese: ["WhiteHorseCavalry", "TigerCavalry"],
    Japanese: ["Oyumi", "Onmyoji"],
    Aztec: ["Otontin", "ShornOne", "JaguarRider", "Quinametzin"],
  };
  const seen = new Set();
  const unitTargets = (unitsByPantheon[config.baseCulture] || unitsByPantheon.Norse).filter((unit) => {
    if (!unit || seen.has(unit)) return false;
    seen.add(unit);
    return true;
  });
  const effects = unitTargets.map((unit) => `<effect type="Data" allactions="1" amount="1.10" subtype="Damage" relativity="BasePercent">\n\t<target type="ProtoUnit">${unit}</target>\n</effect>`);
  effects.push(`<effect type="Data" allactions="1" amount="1.10" subtype="Damage" relativity="BasePercent">\n\t<target type="ProtoUnit">AbstractFortress</target>\n</effect>`);
  return effects.join("\n");
}

function fortressTypeBuildingUnitsForCulture(config) {
  const unitsByPantheon = {
    Greek: ["Petrobolos", "Helepolis", config.greekUniqueUnit || "Myrmidon"],
    Egyptian: ["CamelRider", "ChariotArcher", "WarElephant"],
    Norse: ["Huskarl", "AbstractSiegeWeapon"],
    Atlantean: ["Destroyer", "Fanatic", "FireSiphon"],
    Chinese: ["WhiteHorseCavalry", "TigerCavalry"],
    Japanese: ["Oyumi", "Onmyoji"],
    Aztec: ["Otontin", "ShornOne", "JaguarRider", "Quinametzin"],
  };
  const seen = new Set();
  return (unitsByPantheon[config.baseCulture] || unitsByPantheon.Norse).filter((unit) => {
    if (!unit || seen.has(unit)) return false;
    seen.add(unit);
    return true;
  });
}

function raFortressHitpointsEffects(config) {
  return fortressTypeBuildingUnitsForCulture(config)
    .map((unit) => `<effect type="Data" amount="1.15" subtype="Hitpoints" relativity="BasePercent">\n\t<target type="ProtoUnit">${unit}</target>\n</effect>`)
    .join("\n");
}

function zeusCounterCavalryInfantrySpeedEffects(config) {
  const targetByPantheon = {
    Greek: "Hoplite",
    Egyptian: "Spearman",
    Norse: "Hirdman",
    Atlantean: "Katapeltes",
    Chinese: "GeHalberdier",
    Japanese: "YariSpearman",
    Aztec: "TlamanihSpearman",
  };
  const target = targetByPantheon[config.baseCulture] || "Hoplite";
  return `<effect type="Data" amount="1.15" subtype="MaximumVelocity" relativity="BasePercent">
	<target type="ProtoUnit">${target}</target>
</effect>`;
}

const QUETZ_EAGLE_RANGE_LOS_AGE_EFFECTS = `<effect type="Data" action="RangedAttack" amount="1.0" subtype="MaximumRange" relativity="Absolute">
	<target type="ProtoUnit">EagleWarrior</target>
</effect>
<effect type="Data" amount="1.00" subtype="LOS" relativity="Absolute">
	<target type="ProtoUnit">EagleWarrior</target>
</effect>`;

const TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS = `<effect type="Data" action="DevoteMinor" amount="1.10" subtype="WorkRate" unittype="Favor" relativity="BasePercent">
	<target type="ProtoUnit">VillagerAztec</target>
</effect>`;

const TEZCAT_JAGUAR_RIDER_HEROIC_EFFECTS = `<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">JaguarRider</target>
</effect>`;

const OBSIDIAN_SHARD_MYTH_UNITS_BY_PANTHEON = {
  Greek: {
    Classical: ["Minotaur", "Centaur", "Cyclops", "LykaonVillager"],
    Heroic: ["Manticore", "Hydra", "NemeanLion", "Hamadryad"],
    Mythic: ["Medusa", "Chimera", "Colossus", "Siren"],
  },
  Egyptian: {
    Classical: ["Sphinx", "Wadjet", "Anubite"],
    Heroic: ["Petsuchos", "ScorpionMan", "Scarab"],
    Mythic: ["Mummy", "Phoenix", "Avenger"],
  },
  Norse: {
    Classical: ["Valkyrie", "Troll", "Einheri", "Draugr"],
    Heroic: ["BattleBoar", "MountainGiant", "FrostGiant", "RockGiant"],
    Mythic: ["FireGiant", "FenrisWolfBrood", "Fafnir"],
  },
  Atlantean: {
    Classical: ["Promethean", "Automaton", "Caladria"],
    Heroic: ["Satyr", "Behemoth", "StymphalianBird"],
    Mythic: ["Lampades", "Argus", "Centimanus"],
  },
  Chinese: {
    Classical: ["YaZi", "QiongQi", "QiLin"],
    Heroic: ["TaoWu", "TaoTie", "BaiHu"],
    Mythic: ["QingLong", "HunDun", "ZhuQue"],
  },
  Japanese: {
    Classical: ["Jorogumo", "Kamaitachi", "Wanyudo"],
    Heroic: ["Tengu", "Raiju", "Oni"],
    Mythic: ["Asura", "Shinigami", "Onmoraki"],
  },
  Aztec: {
    Classical: ["Chaneque", "CentzonTotochtin", "Maquizcoatl"],
    Heroic: ["ObsidianButterfly", "Ayotochtli", "Tzitzimitl"],
    Mythic: ["Tunkuluchu", "Ahuizotl", "SoulGuide"],
  },
};

function obsidianShardProtoName(config) {
  return `ObsidianShard${config.baseCulture || "Aztec"}`;
}

function tezcatObsidianShardAgeTargetEffect(config, action, amount = "1.00", relativity = "Absolute") {
  return `<effect type="Data" action="${action}" amount="${amount}" subtype="ActionEnable" relativity="${relativity}">
	<target type="ProtoUnit">${escapeXml(obsidianShardProtoName(config))}</target>
</effect>`;
}

function tezcatObsidianShardClassicalEffects(config) {
  return tezcatObsidianShardAgeTargetEffect(config, "MaintainTrainClassical");
}

function tezcatObsidianShardHeroicEffects(config) {
  return `${tezcatObsidianShardAgeTargetEffect(config, "MaintainTrainHeroic")}
${tezcatObsidianShardAgeTargetEffect(config, "MaintainTrainClassical", "0.00", "Assign")}`;
}

function tezcatObsidianShardMythicEffects(config) {
  return `${tezcatObsidianShardAgeTargetEffect(config, "MaintainTrainMythic")}
${tezcatObsidianShardAgeTargetEffect(config, "MaintainTrainHeroic", "0.00", "Assign")}`;
}

function obsidianShardProtoAction(age, units) {
  const rates = (units || []).map((unit) => `			<rate type="${escapeXml(unit)}">1.000000</rate>`).join("\n");
  return `		<protoaction>
			<name>MaintainTrain${age}</name>
${rates}
			<minrate type="Unit">1.000000</minrate>
			<maintaintrainpoints>40.0000</maintaintrainpoints>
			<killontrain>1</killontrain>
			<pausable>0</pausable>
			<randomtrainunit>1</randomtrainunit>
		</protoaction>`;
}

function tezcatObsidianShardProtoXml(config) {
  if (!selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) return "";
  const units = OBSIDIAN_SHARD_MYTH_UNITS_BY_PANTHEON[config.baseCulture] || OBSIDIAN_SHARD_MYTH_UNITS_BY_PANTHEON.Aztec;
  return `	<unit name="${escapeXml(obsidianShardProtoName(config))}">
		<displaynameid>STR_BLD_OBSIDIAN_SHARD_NAME</displaynameid>
		<rollovertextid>STR_BLD_OBSIDIAN_SHARD_LR</rollovertextid>
		<shortrollovertextid>STR_BLD_OBSIDIAN_SHARD_SR</shortrollovertextid>
		<icon>resources\\aztec\\static_color\\buildings\\obsidian_shard_icon.png</icon>
		<animfile>aztec\\buildings\\props\\obsidian_shard\\obsidian_shard.xml</animfile>
		<soundsetfile>aztec\\sfx\\buildings\\obsidianshard.xml</soundsetfile>
		<obstructionradiusx>1.0000</obstructionradiusx>
		<obstructionradiusz>1.0000</obstructionradiusz>
		<movementtype>land</movementtype>
		<initialhitpoints>500.0000</initialhitpoints>
		<maxhitpoints>500.0000</maxhitpoints>
		<los>5.0000</los>
		<armor type="Hack" value="0.2500"></armor>
		<armor type="Pierce" value="0.6000"></armor>
		<armor type="Crush" value="0.1000"></armor>
		<unittype>LogicalTypeBuildingsNotWalls</unittype>
		<unittype>LogicalTypeVillagersAttack</unittype>
		<unittype>LogicalTypeHandUnitsAttack</unittype>
		<unittype>LogicalTypeHandUnitsAutoAttack</unittype>
		<unittype>LogicalTypeRangedUnitsAttack</unittype>
		<unittype>LogicalTypeRangedUnitsAutoAttack</unittype>
		<unittype>Building</unittype>
		<unittype>BuildingClass</unittype>
		<unittype>LogicalTypeEarthquakeAttack</unittype>
		<unittype>LogicalTypeAffectedByRestoration</unittype>
		<unittype>CountsTowardMilitaryScore</unittype>
		<unittype>LogicalTypeValidMeteorTarget</unittype>
		<unittype>LogicalTypeValidTornadoAttack</unittype>
		<unittype>LogicalTypeTartarianGateValidOverlapPlacement</unittype>
		<unittype>LogicalTypeBuildingNotWonderOrTitan</unittype>
		<flag>CollidesWithProjectiles</flag>
		<flag>NonAutoFormedUnit</flag>
		<flag>ObscuresUnits</flag>
		<flag>Immoveable</flag>
		<flag>SelectWithObstruction</flag>
		<flag>Doppled</flag>
		<flag>PlaceAnywhere</flag>
		<flag>NoIdleActions</flag>
		<flag>NotDeathTracked</flag>
		<flag>NonSolid</flag>
		<flag>ForceNormalDeathAnim</flag>
		<flag>NotRepairable</flag>
		<tactics>maintain_train.tactics</tactics>
${obsidianShardProtoAction("Classical", units.Classical)}
${obsidianShardProtoAction("Heroic", units.Heroic)}
${obsidianShardProtoAction("Mythic", units.Mythic)}
	</unit>`;
}

const FUXI_NEZHA_CLASSICAL_EFFECTS = `<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">NezhaChild</target>
</effect>`;

const FUXI_NEZHA_HEROIC_EFFECTS = `<effect type="Data" amount="0.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">NezhaChild</target>
</effect>
<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">NezhaYouth</target>
</effect>
<effect type="TransformUnit" toprotoid="NezhaYouth" fromprotoid="NezhaChild" includequeued="true"></effect>`;

const FUXI_NEZHA_MYTHIC_EFFECTS = `<effect type="Data" amount="0.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">NezhaYouth</target>
</effect>
<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">Nezha</target>
</effect>
<effect type="TransformUnit" toprotoid="Nezha" fromprotoid="NezhaYouth" includequeued="true"></effect>`;

function fuxiNezhaTempleCommandEffects(config) {
  if (config.baseCulture === "Chinese") return "";
  const row = config.baseCulture === "Norse" ? "1" : "0";
  return ["NezhaChild", "NezhaYouth", "Nezha"].map((proto) => `<effect type="Data" amount="1.00" subtype="CommandAdd" proto="${proto}" row="${row}" column="5" relativity="Assign">
	<target type="ProtoUnit">Temple</target>
</effect>`).join("\n");
}

const SHENNONG_MYTH_REGEN_FAVORED_LAND_AGE_EFFECTS = `<effect type="Data" subtype="BuildingChainEffect" unittype="LogicalTypeMythUnitNotTitan" effecttype="InRange" modifytype="HealRate" amount="1.5" relativity="Absolute">
	<target type="Player"></target>
</effect>`;

const SHENNONG_GIFT_OF_BEASTS_CLASSICAL_EFFECTS = `<effect type="Data" subtype="BuffIconOverride" pathstrid="STR_CIV_SHENNONG_GIFT_ICON_AGE_HEROIC" amount="1.0" relativity="Assign">
	<target type="Player"></target>
</effect>`;

const SHENNONG_GIFT_OF_BEASTS_HEROIC_EFFECTS = `<effect type="Data" subtype="BuffIconOverride" pathstrid="STR_CIV_SHENNONG_GIFT_ICON_AGE_MYTHIC" amount="1.0" relativity="Assign">
	<target type="Player"></target>
</effect>`;

const SHENNONG_FARM_LINE_CLASSICAL_EFFECTS = `<effect type="TechStatus" status="active">Plow</effect>`;

function shennongFarmLineHeroicEffects(config) {
  return config.baseCulture === "Aztec"
    ? `<effect type="TechStatus" status="active">Chinampas</effect>`
    : `<effect type="TechStatus" status="active">Irrigation</effect>`;
}

function shennongFarmLineMythicEffects(config) {
  return config.baseCulture === "Aztec"
    ? ""
    : `<effect type="TechStatus" status="active">FloodControl</effect>`;
}

const GAIA_ECON_GUILD_COST_EFFECTS = `<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="ProtoUnit">EconomicGuild</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="ProtoUnit">EconomicGuild</target>
</effect>`;

const GAIA_ECON_GUILD_ARCHAIC_EFFECTS = `<effect type="TechStatus" status="obtainable">Plow</effect>
<effect type="TechStatus" status="obtainable">HuntingEquipment</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Husbandry</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">Husbandry</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Plow</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">Plow</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">HuntingEquipment</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">HuntingEquipment</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Irrigation</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">Irrigation</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">FloodControl</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">FloodControl</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">HandAxe</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">HandAxe</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">BowSaw</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">BowSaw</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">Carpenters</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">Carpenters</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">Pickaxe</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Pickaxe</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">ShaftMine</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">ShaftMine</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">Quarry</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Quarry</target>
</effect>`;

const GAIA_ECON_GUILD_ARCHAIC_AZTEC_EFFECTS = `<effect type="TechStatus" status="obtainable">Plow</effect>
<effect type="TechStatus" status="obtainable">HuntingEquipment</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Husbandry</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">Husbandry</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Plow</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">Plow</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">HuntingEquipment</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">HuntingEquipment</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Chinampas</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">Chinampas</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">HandAxe</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">HandAxe</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">BowSaw</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">BowSaw</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">Carpenters</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="Tech">Carpenters</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">Pickaxe</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Pickaxe</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">ShaftMine</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">ShaftMine</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Food" relativity="Percent">
	<target type="Tech">Quarry</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="Tech">Quarry</target>
</effect>`;

function gaiaEconGuildArchaicEffects(config) {
  const baseEffects = config.baseCulture === "Aztec" ? GAIA_ECON_GUILD_ARCHAIC_AZTEC_EFFECTS : GAIA_ECON_GUILD_ARCHAIC_EFFECTS;
  return config.baseCulture === "Atlantean" ? `${GAIA_ECON_GUILD_COST_EFFECTS}
${baseEffects}` : baseEffects;
}

const GAIA_ECON_GUILD_CLASSICAL_EFFECTS = `<effect type="TechStatus" status="obtainable">BowSaw</effect>
<effect type="TechStatus" status="obtainable">ShaftMine</effect>
<effect type="TechStatus" status="obtainable">Irrigation</effect>`;

const GAIA_ECON_GUILD_CLASSICAL_AZTEC_EFFECTS = `<effect type="TechStatus" status="obtainable">BowSaw</effect>
<effect type="TechStatus" status="obtainable">ShaftMine</effect>
<effect type="TechStatus" status="obtainable">Chinampas</effect>`;

function gaiaEconGuildClassicalEffects(config) {
  return config.baseCulture === "Aztec" ? GAIA_ECON_GUILD_CLASSICAL_AZTEC_EFFECTS : GAIA_ECON_GUILD_CLASSICAL_EFFECTS;
}

const GAIA_ECON_GUILD_HEROIC_EFFECTS = `<effect type="TechStatus" status="obtainable">Carpenters</effect>
<effect type="TechStatus" status="obtainable">Quarry</effect>
<effect type="TechStatus" status="obtainable">FloodControl</effect>`;

const GAIA_ECON_GUILD_HEROIC_AZTEC_EFFECTS = `<effect type="TechStatus" status="obtainable">Carpenters</effect>
<effect type="TechStatus" status="obtainable">Quarry</effect>`;

function gaiaEconGuildHeroicEffects(config) {
  return config.baseCulture === "Aztec" ? GAIA_ECON_GUILD_HEROIC_AZTEC_EFFECTS : GAIA_ECON_GUILD_HEROIC_EFFECTS;
}

const DEMETER_HERDABLES_TEMPLE_FAVOR_ARCHAIC_EFFECTS = `<effect type="Data" protoaction="TempleFavorBonus" amount="1.00" subtype="ProtoActionAdd" unittype="DemeterBonusContainer" relativity="Assign">
	<target type="ProtoUnit">Herdable</target>
</effect>
<effect type="Data" amount="1.00" subtype="SetUnitType" unittype="HerdableMagnet" relativity="Absolute">
	<target type="ProtoUnit">AbstractTemple</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" command="MoveNearbyLiveStockToUnit" row="3" column="4" relativity="Assign">
	<target type="ProtoUnit">AbstractTemple</target>
</effect>`;

const DEMETER_HERDABLES_FATTEN_ARCHAIC_EFFECTS = `<effect type="Data" action="AutoGatherFood" amount="1.40" subtype="WorkRate" unittype="Food" relativity="BasePercent">
	<target type="ProtoUnit">Herdable</target>
</effect>
<effect type="Data" amount="1.20" subtype="CarryCapacity" resource="Food" relativity="BasePercent">
	<target type="ProtoUnit">Herdable</target>
</effect>`;

function demeterSpawnHerdableEffects(unit) {
  return `<effect type="CreateUnit" unit="${unit}" generator="TownCenter" allgenerators="true" ignorerally="">
	<pattern type="Leaving" speed="0.00" radius="0.00" quantity="3.00" minradius="0.00">
		<offset x="-5.00" y="0.00" z="0.00"></offset>
	</pattern>
</effect>
<effect type="CreateUnit" unit="${unit}" generator="VillageCenter" allgenerators="true" ignorerally="">
	<pattern type="Leaving" speed="0.00" radius="0.00" quantity="1.00" minradius="0.00">
		<offset x="-5.00" y="0.00" z="0.00"></offset>
	</pattern>
</effect>
<effect type="CreateUnit" unit="${unit}" generator="CitadelCenter" allgenerators="true" ignorerally="">
	<pattern type="Leaving" speed="0.00" radius="0.00" quantity="1.00" minradius="0.00">
		<offset x="-5.00" y="0.00" z="0.00"></offset>
	</pattern>
</effect>`;
}

const DEMETER_HERDABLES_SPAWN_CLASSICAL_EFFECTS = demeterSpawnHerdableEffects("Goat");
const DEMETER_HERDABLES_SPAWN_HEROIC_EFFECTS = demeterSpawnHerdableEffects("Pig");
const DEMETER_HERDABLES_SPAWN_MYTHIC_EFFECTS = demeterSpawnHerdableEffects("Cow");

const DEMETER_TRAIN_FASTER_BY_AGE_EFFECTS = `<effect type="Data" amount="0.90" subtype="TrainPoints" relativity="Percent">
	<target type="ProtoUnit">HumanSoldier</target>
</effect>
<effect type="Data" amount="0.90" subtype="TrainPoints" relativity="Percent">
	<target type="ProtoUnit">MythUnit</target>
</effect>`;

const HADES_MYTH_HP_BY_AGE_EFFECTS = `<effect type="Data" amount="1.04" subtype="Hitpoints" relativity="BasePercent">
	<target type="ProtoUnit">MythUnit</target>
</effect>`;


function kronosTemporalScaffoldingTarget(config) {
  return config.baseCulture === "Atlantean" ? "Manor" : "House";
}

function kronosTemporalScaffoldingEffects(config) {
  const target = kronosTemporalScaffoldingTarget(config);
  return `<effect type="Data" action="TemporalScaffoldingSmall" amount="1.00" subtype="ActionEnable" relativity="Absolute">
	<target type="ProtoUnit">${target}</target>
</effect>
<effect type="Data" action="TemporalScaffoldingLarge" amount="1.00" subtype="ActionEnable" relativity="Absolute">
	<target type="ProtoUnit">${target}</target>
</effect>
<effect type="Data" amount="1.00" subtype="ProtoUnitFlag" flag="DisplayRange" relativity="Absolute">
	<target type="ProtoUnit">${target}</target>
</effect>`;
}

function hasKronosTemporalScaffoldingBonus(config) {
  return selectedHasBonusLabel(config, KRONOS_TEMPORAL_SCAFFOLDING_BONUS_LABEL);
}

function oranosEgyptianPriestSkyPassageProtoXml(config) {
  if (!selectedHasBonusLabel(config, ORANOS_SKY_PASSAGE_BONUS_LABEL) || config.baseCulture !== "Egyptian") return "";
  return `	<unit name="Priest">
		<protoaction>
			<name>Build</name>
			<rate type="SkyPassage">1.000000</rate>
		</protoaction>
	</unit>`;
}

function kronosHouseTemporalProtoXml(config) {
  if (!hasKronosTemporalScaffoldingBonus(config) || config.baseCulture === "Atlantean") return "";
  return `	<unit name="House">
		<tactics>default.tactics</tactics>
		<protoaction>
			<name>TemporalScaffoldingSmall</name>
			<type>AutoRangedModify</type>
			<active>0</active>
			<modifyabstracttype>LogicalTypeBuildingSmall</modifyabstracttype>
			<maxrange>20</maxrange>
			<persistent>1</persistent>
			<modifytype>BuildRate</modifytype>
			<modifymultiplier>1.125</modifymultiplier>
			<targetunbuilt>1</targetunbuilt>
			<modelattachment>vfx\\glow\\temporal_scaffolding_small.xml</modelattachment>
			<modelattachmentbone>bonethatdoesntexist</modelattachmentbone>
		</protoaction>
		<protoaction>
			<name>TemporalScaffoldingLarge</name>
			<type>AutoRangedModify</type>
			<active>0</active>
			<modifyabstracttype>LogicalTypeBuildingLarge</modifyabstracttype>
			<maxrange>20</maxrange>
			<persistent>1</persistent>
			<modifytype>BuildRate</modifytype>
			<modifymultiplier>1.125</modifymultiplier>
			<targetunbuilt>1</targetunbuilt>
			<modelattachment>vfx\\glow\\temporal_scaffolding_large.xml</modelattachment>
			<modelattachmentbone>bonethatdoesntexist</modelattachmentbone>
		</protoaction>
	</unit>`;
}

const HADES_RANGED_TECH_DISCOUNT_RULES = [
  { pantheons: ["All"], tech: "Ballistics", resources: ["Wood", "Gold"] },
  { pantheons: ["All"], tech: "BurningPitch", resources: ["Wood", "Gold"] },
  { pantheons: ["Greek", "Atlantean", "Chinese"], tech: "MediumArchers", resources: ["Wood", "Gold"] },
  { pantheons: ["Greek", "Atlantean", "Chinese"], tech: "HeavyArchers", resources: ["Wood", "Gold"] },
  { pantheons: ["Greek", "Atlantean", "Chinese"], tech: "ChampionArchers", resources: ["Wood", "Gold"] },
  { pantheons: ["Greek"], tech: "EnyosBowOfHorror", resources: ["Wood", "Favor"] },
  { pantheons: ["Greek"], tech: "SunRay", resources: ["Food", "Favor"] },
  { pantheons: ["Greek"], tech: "ShaftsOfPlague", resources: ["Gold", "Favor"] },
  { pantheons: ["Greek"], tech: "FatedArrows", resources: ["Food", "Favor"] },
  { pantheons: ["Norse"], tech: "HuntressAxe", resources: ["Gold", "Favor"] },
  { pantheons: ["Egyptian"], tech: "MediumSlingers", resources: ["Wood", "Gold"] },
  { pantheons: ["Egyptian"], tech: "HeavySlingers", resources: ["Wood", "Gold"] },
  { pantheons: ["Egyptian"], tech: "ChampionSlingers", resources: ["Wood", "Gold"] },
  { pantheons: ["Egyptian"], tech: "HeavyChariotArchers", resources: ["Wood", "Gold"] },
  { pantheons: ["Egyptian"], tech: "ChampionChariotArchers", resources: ["Wood", "Gold"] },
  { pantheons: ["Egyptian"], tech: "ElectrumBullets", resources: ["Gold", "Favor"] },
  { pantheons: ["Egyptian"], tech: "BoneBow", resources: ["Wood", "Favor"] },
  { pantheons: ["Egyptian"], tech: "SlingsOfTheSun", resources: ["Gold", "Favor"] },
  { pantheons: ["Atlantean"], tech: "HaloOfTheSun", resources: ["Gold", "Favor"] },
  { pantheons: ["Chinese"], tech: "SouthernFire", resources: ["Food", "Wood", "Favor"] },
  { pantheons: ["Japanese"], tech: "HuntersStrength", resources: ["Wood", "Favor"] },
  { pantheons: ["Chinese"], tech: "ScorchingFeathers", resources: ["Wood", "Favor"] },
  { pantheons: ["Japanese"], tech: "Kumiki", resources: ["Wood", "Gold", "Favor"] },
  { pantheons: ["Japanese"], tech: "GoldenKite", resources: ["Wood", "Favor"] },
  { pantheons: ["Japanese"], tech: "AsymmetricalBows", resources: ["Wood", "Favor"] },
  { pantheons: ["Aztec"], tech: "PreciousBones", resources: ["Gold", "Favor"] },
];

function hadesRangedTechDiscountEffects(config) {
  const culture = config.baseCulture;
  return HADES_RANGED_TECH_DISCOUNT_RULES
    .filter((rule) => rule.pantheons.includes("All") || rule.pantheons.includes(culture))
    .flatMap((rule) => rule.resources.map((resource) => `<effect type="Data" amount="0.666" subtype="Cost" resource="${resource}" relativity="Percent">\n\t<target type="Tech">${rule.tech}</target>\n</effect>`))
    .join("\n");
}


const QUETZ_DROPSITE_DISCOUNT_TARGETS = {
  Greek: ["Granary", "Storehouse"],
  Chinese: ["Silo"],
  Japanese: ["Watermill", "MiningCampJapanese"],
};

function quetzDropsiteDiscountEffects(config) {
  if (config.baseCulture === "Aztec") {
    return `<effect type="Data" amount="-25.0" subtype="Cost" resource="Wood" relativity="Absolute">
	<target type="ProtoUnit">AbstractCalpulli</target>
</effect>
<effect type="Data" amount="-50.0" subtype="Cost" resource="Wood" relativity="Absolute">
	<target type="TechType">SocketTechnology</target>
</effect>`;
  }
  const targets = QUETZ_DROPSITE_DISCOUNT_TARGETS[config.baseCulture] || [];
  return targets.map((target) => `<effect type="Data" amount="0.666" subtype="Cost" resource="wood" relativity="Percent">
	<target type="ProtoUnit">${target}</target>
</effect>`).join("\n");
}

const HUITZ_FORTRESS_REFUND_TARGETS = {
  Greek: "Fortress",
  Egyptian: "MigdolStronghold",
  Norse: "HillFort",
  Atlantean: "Palace",
  Chinese: "Baolei",
  Japanese: "Castle",
  Aztec: "GreatTemple",
};

function resourceRefundEffectsForProto(proto) {
  return `<effect type="Data" amount="0.25" subtype="ResourceReturnRate" resource="Wood" relativity="Absolute">
	<target type="ProtoUnit">${proto}</target>
</effect>
<effect type="Data" amount="0.25" subtype="ResourceReturnRate" resource="Gold" relativity="Absolute">
	<target type="ProtoUnit">${proto}</target>
</effect>
<effect type="Data" amount="1.0" subtype="Flag" flag="ReturnResourcesOnConstruction" relativity="Absolute">
	<target type="ProtoUnit">${proto}</target>
</effect>`;
}

function huitzConstructionRefundEffects(config) {
  const fortressTarget = HUITZ_FORTRESS_REFUND_TARGETS[config.baseCulture] || "GreatTemple";
  return ["AbstractTownCenter", fortressTarget, "Temple"]
    .map(resourceRefundEffectsForProto)
    .join("\n");
}


const SET_MILITARY_BUILDING_DISCOUNT_TARGETS = {
  Egyptian: {
    goldOnly: ["MigdolStronghold", "Barracks", "SiegeWorks"],
    woodOnly: [],
    woodGold: [],
  },
  Greek: {
    woodOnly: ["MilitaryAcademy", "Stable", "ArcheryRange"],
    woodGold: ["Fortress"],
  },
  Norse: {
    woodOnly: ["GreatHall", "Longhouse"],
    woodGold: ["HillFort"],
  },
  Atlantean: {
    woodOnly: ["MilitaryBarracks", "CounterBarracks"],
    woodGold: ["Palace"],
  },
  Chinese: {
    woodOnly: ["MachineWorkshop", "MilitaryCamp", "ImperialAcademy"],
    woodGold: ["Baolei"],
  },
  Japanese: {
    woodOnly: ["Guardhouse", "Dojo", "StableJapanese"],
    woodGold: ["Castle"],
  },
  Aztec: {
    woodOnly: ["WarHut", "NoblesHut"],
    woodGold: ["GreatTemple"],
  },
};

function setBuildingCostEffect(proto, resource) {
  return `<effect type="Data" amount="0.75" subtype="Cost" resource="${resource}" relativity="Percent">\n\t<target type="ProtoUnit">${proto}</target>\n</effect>`;
}

function setMilitaryBuildingDiscountEffects(config) {
  const targets = SET_MILITARY_BUILDING_DISCOUNT_TARGETS[config.baseCulture] || SET_MILITARY_BUILDING_DISCOUNT_TARGETS.Egyptian;
  const effects = [];
  for (const proto of targets.goldOnly || []) effects.push(setBuildingCostEffect(proto, "gold"));
  for (const proto of targets.woodOnly || []) effects.push(setBuildingCostEffect(proto, "Wood"));
  for (const proto of targets.woodGold || []) {
    effects.push(setBuildingCostEffect(proto, "Wood"));
    effects.push(setBuildingCostEffect(proto, "Gold"));
  }
  return effects.join("\n");
}


const LOKI_COUNTER_DAMAGE_RULES_BY_PANTHEON = {
  "Greek": [
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "Toxotes",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "Hypaspist",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "Hippeus",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "Peltast",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "Hetairos",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "Hoplite",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "Prodromos",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "Militia",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "Building",
      "targetType": "ProtoUnit",
      "target": "Gastraphetoros",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "MythUnit",
      "targetType": "ProtoUnit",
      "target": "Hero",
      "actions": [
        "HandAttack",
        "RangedAttack",
        "RangedAttackFlying",
        "JumpAttack",
        "Gore"
      ]
    }
  ],
  "Egyptian": [
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "Axeman",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "ChariotArcher",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "Slinger",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "MercenaryCavalry",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "CamelRider",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "WarElephant",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "Mercenary",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "Spearman",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "CamelRider",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "Building",
      "targetType": "ProtoUnit",
      "target": "WarElephant",
      "actions": [
        "HandAttack"
      ]
    }
  ],
  "Norse": [
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "ThrowingAxeman",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "RaidingCavalry",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "Huskarl",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "Hirdman",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "MythUnit",
      "targetType": "ProtoUnit",
      "target": "Hero",
      "actions": [
        "HandAttack",
        "RangedAttack",
        "RangedAttackFlying"
      ]
    }
  ],
  "Atlantean": [
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "Arcus",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "ArcusHero",
      "actions": [
        "RangedAttack",
        "RangedAttackFlying"
      ]
    },
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "Fanatic",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "FanaticHero",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "Turma",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "TurmaHero",
      "actions": [
        "RangedAttack",
        "RangedAttackFlying"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "Contarius",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "ContariusHero",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "Katapeltes",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "KatapeltesHero",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "Fanatic",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "FanaticHero",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "Building",
      "targetType": "ProtoUnit",
      "target": "Destroyer",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "Building",
      "targetType": "ProtoUnit",
      "target": "DestroyerHero",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "MythUnit",
      "targetType": "ProtoUnit",
      "target": "Hero",
      "actions": [
        "HandAttack",
        "RangedAttack",
        "RangedAttackFlying"
      ]
    }
  ],
  "Chinese": [
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "FireArcher",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "WuzuJavelineer",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "WhiteHorseCavalry",
      "actions": [
        "HandAttack",
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "TigerCavalry",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "GeHalberdier",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "TigerCavalry",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "TigerCavalryDismounted",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "Building",
      "targetType": "ProtoUnit",
      "target": "FireArcher",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "MythUnit",
      "targetType": "ProtoUnit",
      "target": "Hero",
      "actions": [
        "HandAttack",
        "RangedAttack",
        "RangedAttackFlying"
      ]
    }
  ],
  "Japanese": [
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "YumiArcher",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "Samurai",
      "actions": [
        "HandAttack",
        "ChargedHandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "NaginataRider",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "Shinobi",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "YariSpearman",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "MythUnit",
      "targetType": "ProtoUnit",
      "target": "Hero",
      "actions": [
        "HandAttack",
        "ChargedHandAttack",
        "RangedAttack",
        "RangedAttackFlying"
      ]
    }
  ],
  "Aztec": [
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "TequihuaArcher",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractInfantry",
      "targetType": "ProtoUnit",
      "target": "ShornOne",
      "actions": [
        "HandAttack",
        "ChargedHandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "CoyoteWarrior",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "EagleWarrior",
      "actions": [
        "RangedAttack"
      ]
    },
    {
      "counteredType": "AbstractArcher",
      "targetType": "ProtoUnit",
      "target": "JaguarRider",
      "actions": [
        "HandAttack",
        "JumpAttackStealth",
        "JumpAttack"
      ]
    },
    {
      "counteredType": "AbstractCavalry",
      "targetType": "ProtoUnit",
      "target": "TlamanihSpearman",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "Building",
      "targetType": "ProtoUnit",
      "target": "Otontin",
      "actions": [
        "HandAttack"
      ]
    },
    {
      "counteredType": "MythUnit",
      "targetType": "ProtoUnit",
      "target": "Hero",
      "actions": [
        "HandAttack",
        "RangedAttack"
      ]
    }
  ]
};

function lokiCounterDamageEffects(config) {
  const records = LOKI_COUNTER_DAMAGE_RULES_BY_PANTHEON[config.baseCulture] || LOKI_COUNTER_DAMAGE_RULES_BY_PANTHEON.Norse || [];
  const effects = [];
  const seen = new Set();
  for (const record of records) {
    for (const action of record.actions || []) {
      const key = `${record.counteredType}::${record.targetType || "ProtoUnit"}::${record.target}::${action}`;
      if (seen.has(key)) continue;
      seen.add(key);
      effects.push(`<effect type="Data" action="${action}" amount="1.10" subtype="Damagebonus" unittype="${record.counteredType}" relativity="BasePercent">
	<target type="${record.targetType || "ProtoUnit"}">${record.target}</target>
</effect>`);
    }
  }
  return effects.join("\n");
}

function lokiMilitaryBuildEffects(config) {
  const target = config.baseCulture === "Norse" ? "AbstractInfantry" : "AbstractVillager";
  const effects = [
    `<effect type="Data" action="Build" amount="1.1" subtype="WorkRate" unittype="Building" relativity="BasePercent">\n\t<target type="ProtoUnit">${target}</target>\n</effect>`
  ];
  if (config.baseCulture === "Norse") {
    effects.push(`<effect type="Data" action="Build" amount="1.1" subtype="WorkRate" unittype="Building" relativity="BasePercent">\n\t<target type="ProtoUnit">Godi</target>\n</effect>`);
  }
  return effects.join("\n");
}


const NUWA_AUSPICE_VILLAGER_BY_PANTHEON = {
  Greek: "VillagerGreek",
  Egyptian: "VillagerEgyptian",
  Norse: "VillagerNorse",
  Atlantean: "VillagerAtlantean",
  Chinese: "VillagerChinese",
  Japanese: "VillagerJapanese",
  Aztec: "VillagerAztec",
};

function nuwaAuspicePowerName(config) {
  return `ShieldBlessing${config.baseCulture}`;
}

function nuwaAuspiceNotificationStringId(config) {
  return `STR_ABILITY_SHIELD_BLESSING_${sanitizeId(config.internalName).toUpperCase()}_NOTIFICATION`;
}

function nuwaAuspiceVillager(config) {
  return NUWA_AUSPICE_VILLAGER_BY_PANTHEON[config.baseCulture] || "Villager";
}

function nuwaCreatorsAuspiceCreatePowerEffect(config) {
  return `<effect type="CreatePower" protopower="${escapeXml(nuwaAuspicePowerName(config))}" />`;
}

function nuwaCreatorsAuspicePowerXml(config) {
  if (!selectedHasBonusLabel(config, NUWA_CREATORS_AUSPICE_BONUS_LABEL) && !selectedBonusEntries(config).some((entry) => entry.id === "bonus_67")) return "";
  const powerName = escapeXml(nuwaAuspicePowerName(config));
  const villager = escapeXml(nuwaAuspiceVillager(config));
  const notificationId = escapeXml(nuwaAuspiceNotificationStringId(config));
  return `	<power name="${powerName}" type="SwitchingEffects">
		<placement>Skip</placement>
		<minimapeventtime sendalertto="None">0.0</minimapeventtime>
		<activetime>-1</activetime>
		<timerrolloverid>STR_ABILITY_SHIELD_BLESSING_PROG</timerrolloverid>
		<powerplayerrelation>Player</powerplayerrelation>
		<hideonactivegplist></hideonactivegplist>
		<tiertype>TotalResources</tiertype>
		<progresstype>SpawnReward</progresstype>
		<effects>
			<effect type="Cost" amount="1.00" resource="Food" relativity="BasePercent">
				<target type="ProtoUnit">${villager}</target>
			</effect>
			<effect type="HitPoints" amount="1.00" relativity="BasePercent">
				<target type="ProtoUnit">Building</target>
			</effect>
			<icon>chinese\\static_color\\technologies\\shield_blessing.png</icon>
			<displaynameid>STR_ABILITY_SHIELD_BLESSING_1</displaynameid>
		</effects>
		<effects>
			<effect type="Cost" amount="0.75" resource="Food" relativity="BasePercent">
				<target type="ProtoUnit">${villager}</target>
			</effect>
			<effect type="HitPoints" amount="1.10" relativity="BasePercent">
				<target type="ProtoUnit">Building</target>
			</effect>
			<resourcetierreq type="Favor">75.00</resourcetierreq>
			<icon>chinese\\static_color\\technologies\\shield_blessing.png</icon>
			<displaynameid>STR_ABILITY_SHIELD_BLESSING_2</displaynameid>
			<notificationsound>GodBlessingCircleComplete</notificationsound>
			<notificationmessageid>${notificationId}</notificationmessageid>
		</effects>
		<effects>
			<effect type="Cost" amount="0.5" resource="Food" relativity="BasePercent">
				<target type="ProtoUnit">${villager}</target>
			</effect>
			<effect type="HitPoints" amount="1.20" relativity="BasePercent">
				<target type="ProtoUnit">Building</target>
			</effect>
			<resourcetierreq type="Favor">250.00</resourcetierreq>
			<icon>chinese\\static_color\\technologies\\shield_blessing.png</icon>
			<displaynameid>STR_ABILITY_SHIELD_BLESSING_3</displaynameid>
			<notificationsound>GodBlessingCircleComplete</notificationsound>
			<notificationmessageid>${notificationId}</notificationmessageid>
		</effects>
		<effects>
			<effect type="Cost" amount="0.25" resource="Food" relativity="BasePercent">
				<target type="ProtoUnit">${villager}</target>
			</effect>
			<effect type="HitPoints" amount="1.30" relativity="BasePercent">
				<target type="ProtoUnit">Building</target>
			</effect>
			<resourcetierreq type="Favor">750.00</resourcetierreq>
			<icon>chinese\\static_color\\technologies\\shield_blessing.png</icon>
			<displaynameid>STR_ABILITY_SHIELD_BLESSING_4</displaynameid>
			<notificationsound>GodBlessingCircleComplete</notificationsound>
			<notificationmessageid>${notificationId}</notificationmessageid>
		</effects>
	</power>`;
}

function generatePowersMods(config) {
  const powers = [nuwaCreatorsAuspicePowerXml(config)].filter(Boolean);
  if (!powers.length) {
    return `<powersmod>\n\t<!-- Empty in this draft. -->\n</powersmod>\n`;
  }
  return `<powersmod>\n${powers.join("\n")}\n</powersmod>\n`;
}

function selectedHasBonusLabel(config, label) {
  return selectedBonusEntries(config).some((entry) => entry.label === label);
}

function bonusTechEffects(config) {
  return selectedBonusEntries(config)
    .map((entry) => {
      if (entry.label === GAIA_ECON_GUILD_BONUS_LABEL) return gaiaEconGuildArchaicEffects(config);
      if (entry.label === ZEUS_COUNTER_CAV_INFANTRY_SPEED_BONUS_LABEL) return zeusCounterCavalryInfantrySpeedEffects(config);
      if (entry.label === DEMETER_HERDABLES_TEMPLE_FAVOR_BONUS_LABEL) return DEMETER_HERDABLES_TEMPLE_FAVOR_ARCHAIC_EFFECTS;
      if (entry.label === DEMETER_HERDABLES_FATTEN_BONUS_LABEL) return DEMETER_HERDABLES_FATTEN_ARCHAIC_EFFECTS;
      if (entry.label === DEMETER_HERDABLES_SPAWN_ON_AGE_UP_BONUS_LABEL) return "";
      if (entry.label === DEMETER_TRAIN_FASTER_BY_AGE_BONUS_LABEL) return DEMETER_TRAIN_FASTER_BY_AGE_EFFECTS;
      if (entry.label === HADES_MYTH_HP_BY_AGE_BONUS_LABEL) return HADES_MYTH_HP_BY_AGE_EFFECTS;
      if (entry.label === HADES_RANGED_TECH_DISCOUNT_BONUS_LABEL) return hadesRangedTechDiscountEffects(config);
      if (entry.label === LOKI_COUNTER_DAMAGE_BONUS_LABEL || entry.id === "bonus_44") return lokiCounterDamageEffects(config);
      if (entry.label === LOKI_MILITARY_BUILD_BONUS_LABEL || entry.id === "bonus_45") return lokiMilitaryBuildEffects(config);
      if (entry.label === KRONOS_TEMPORAL_SCAFFOLDING_BONUS_LABEL || entry.id === "bonus_53") return kronosTemporalScaffoldingEffects(config);
      if (entry.label === HUITZ_CONSTRUCTION_REFUND_BONUS_LABEL || entry.id === "bonus_87") return huitzConstructionRefundEffects(config);
      if (entry.label === QUETZ_DROPSITE_DISCOUNT_BONUS_LABEL || entry.id === "bonus_95") return quetzDropsiteDiscountEffects(config);
      if (entry.label === SET_MILITARY_BUILDING_DISCOUNT_BONUS_LABEL || entry.id === "bonus_33") return setMilitaryBuildingDiscountEffects(config);
      if (entry.label === FREYR_FORTRESS_DAMAGE_BONUS_LABEL) return freyrFortressDamageEffects(config);
      if (entry.label === RA_FORTRESS_HP_BONUS_LABEL) return raFortressHitpointsEffects(config);
      if (entry.label === POSEIDON_SPEED_BY_AGE_BONUS_LABEL) return POSEIDON_SPEED_BY_AGE_EFFECTS;
      if (entry.label === POSEIDON_STABLE_MARKET_DISCOUNT_BONUS_LABEL) return poseidonStableMarketDiscountEffects(config);
      if (entry.label === ORANOS_SKY_PASSAGE_BONUS_LABEL) return oranosSkyPassageArchaicEffects(config);
      if (entry.label === TEZCAT_DEVOTE_FAVOR_BONUS_LABEL) return TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS;
      if (entry.label === KRONOS_EXTRA_MYTH_UNITS_BONUS_LABEL) return "";
      if (entry.label === QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL) return "";
      if (entry.label === TEZCAT_JAGUAR_RIDER_BONUS_LABEL) return "";
      if (entry.label === TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL) return "";
      if (entry.label === FUXI_NEZHA_BONUS_LABEL) return fuxiNezhaTempleCommandEffects(config);
      if (entry.label === NUWA_CREATORS_AUSPICE_BONUS_LABEL || entry.id === "bonus_67") return nuwaCreatorsAuspiceCreatePowerEffect(config);
      if (entry.label === SHENNONG_GIFT_OF_BEASTS_BONUS_LABEL) return "";
      if (entry.label === SHENNONG_FARM_LINE_UPGRADES_BONUS_LABEL) return "";
      if (entry.label === SET_ANIMALS_BONUS_LABEL) return SET_ANIMALS_ARCHAIC_EFFECTS;
      if (entry.label === SHENNONG_MYTH_REGEN_FAVORED_LAND_BONUS_LABEL) return SHENNONG_MYTH_REGEN_FAVORED_LAND_AGE_EFFECTS;
      if (entry.label === SUSANOO_BUSHIDO_MYTH_XP_BONUS_LABEL) return SUSANOO_BUSHIDO_MYTH_XP_ARCHAIC_EFFECTS;
      if (entry.label === TSUKUYOMI_FREE_KITSUNE_BONUS_LABEL) return TSUKUYOMI_FREE_KITSUNE_EFFECT;
      if (entry.label === THOR_ARMORY_TECH_DISCOUNT_BONUS_LABEL || entry.id === "bonus_38") return thorArmoryTechDiscountEffects(config);
      if (entry.label === THOR_DWARVEN_ARMORY_BONUS_LABEL) return thorDwarvenArmoryArchaicEffects(config);
      if (entry.label === THOR_DWARF_SPAWN_BONUS_LABEL) return thorDwarfSpawnArchaicEffects(config);
      if (entry.id === "bonus_50" || entry.label === "Building repair is free. Gatherers and Dwarves can repair.") {
        return config.baseCulture === "Norse" ? sanitizeBonusTechEffects(entry.techEffects || "") : "";
      }
      return sanitizeBonusTechEffects(entry.techEffects || "");
    })
    .filter(Boolean)
    .join("\n");
}

function bonusClassicalTechEffects(config) {
  const effects = [];
  if (selectedHasBonusLabel(config, GAIA_ECON_GUILD_BONUS_LABEL)) effects.push(gaiaEconGuildClassicalEffects(config));
  if (selectedHasBonusLabel(config, ORANOS_SKY_PASSAGE_BONUS_LABEL)) effects.push(ORANOS_SKY_PASSAGE_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, POSEIDON_SPEED_BY_AGE_BONUS_LABEL)) effects.push(POSEIDON_SPEED_BY_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_DEVOTE_FAVOR_BONUS_LABEL)) effects.push(TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) effects.push(tezcatObsidianShardClassicalEffects(config));
  if (selectedHasBonusLabel(config, FUXI_NEZHA_BONUS_LABEL)) effects.push(FUXI_NEZHA_CLASSICAL_EFFECTS);
  if (selectedHasBonusLabel(config, SHENNONG_GIFT_OF_BEASTS_BONUS_LABEL)) effects.push(SHENNONG_GIFT_OF_BEASTS_CLASSICAL_EFFECTS);
  if (selectedHasBonusLabel(config, SHENNONG_FARM_LINE_UPGRADES_BONUS_LABEL)) effects.push(SHENNONG_FARM_LINE_CLASSICAL_EFFECTS);
  if (selectedHasBonusLabel(config, SHENNONG_MYTH_REGEN_FAVORED_LAND_BONUS_LABEL)) effects.push(SHENNONG_MYTH_REGEN_FAVORED_LAND_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, SET_ANIMALS_BONUS_LABEL)) effects.push(SET_ANIMALS_CLASSICAL_EFFECTS);
  if (selectedHasBonusLabel(config, DEMETER_HERDABLES_SPAWN_ON_AGE_UP_BONUS_LABEL)) effects.push(DEMETER_HERDABLES_SPAWN_CLASSICAL_EFFECTS);
  if (selectedHasBonusLabel(config, DEMETER_TRAIN_FASTER_BY_AGE_BONUS_LABEL)) effects.push(DEMETER_TRAIN_FASTER_BY_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, HADES_MYTH_HP_BY_AGE_BONUS_LABEL)) effects.push(HADES_MYTH_HP_BY_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TSUKUYOMI_FREE_KITSUNE_BONUS_LABEL)) effects.push(TSUKUYOMI_FREE_KITSUNE_EFFECT);
  if (selectedHasBonusLabel(config, ODIN_RAVEN_SCOUTS_BONUS_LABEL)) effects.push(ODIN_RAVEN_LOS_AGE_EFFECT);
  if (selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL)) effects.push(THOR_DWARVEN_ARMORY_CLASSICAL_RESEARCH_RATE_EFFECT);
  return effects.filter(Boolean).join("\n");
}
function bonusHeroicTechEffects(config) {
  const effects = [];
  if (selectedHasBonusLabel(config, GAIA_ECON_GUILD_BONUS_LABEL)) effects.push(gaiaEconGuildHeroicEffects(config));
  if (selectedHasBonusLabel(config, ORANOS_SKY_PASSAGE_BONUS_LABEL)) effects.push(ORANOS_SKY_PASSAGE_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, POSEIDON_SPEED_BY_AGE_BONUS_LABEL)) effects.push(POSEIDON_SPEED_BY_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL)) effects.push(QUETZ_EAGLE_RANGE_LOS_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_DEVOTE_FAVOR_BONUS_LABEL)) effects.push(TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_JAGUAR_RIDER_BONUS_LABEL)) effects.push(TEZCAT_JAGUAR_RIDER_HEROIC_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) effects.push(tezcatObsidianShardHeroicEffects(config));
  if (selectedHasBonusLabel(config, FUXI_NEZHA_BONUS_LABEL)) effects.push(FUXI_NEZHA_HEROIC_EFFECTS);
  if (selectedHasBonusLabel(config, SHENNONG_GIFT_OF_BEASTS_BONUS_LABEL)) effects.push(SHENNONG_GIFT_OF_BEASTS_HEROIC_EFFECTS);
  if (selectedHasBonusLabel(config, SHENNONG_FARM_LINE_UPGRADES_BONUS_LABEL)) effects.push(shennongFarmLineHeroicEffects(config));
  if (selectedHasBonusLabel(config, SHENNONG_MYTH_REGEN_FAVORED_LAND_BONUS_LABEL)) effects.push(SHENNONG_MYTH_REGEN_FAVORED_LAND_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, SET_ANIMALS_BONUS_LABEL)) effects.push(SET_ANIMALS_HEROIC_EFFECTS);
  if (selectedHasBonusLabel(config, DEMETER_HERDABLES_SPAWN_ON_AGE_UP_BONUS_LABEL)) effects.push(DEMETER_HERDABLES_SPAWN_HEROIC_EFFECTS);
  if (selectedHasBonusLabel(config, DEMETER_TRAIN_FASTER_BY_AGE_BONUS_LABEL)) effects.push(DEMETER_TRAIN_FASTER_BY_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, HADES_MYTH_HP_BY_AGE_BONUS_LABEL)) effects.push(HADES_MYTH_HP_BY_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TSUKUYOMI_FREE_KITSUNE_BONUS_LABEL)) effects.push(TSUKUYOMI_FREE_KITSUNE_EFFECT);
  if (selectedHasBonusLabel(config, ODIN_RAVEN_SCOUTS_BONUS_LABEL)) effects.push(ODIN_RAVEN_LOS_AGE_EFFECT);
  if (selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL)) effects.push(THOR_DWARVEN_ARMORY_LATER_RESEARCH_RATE_EFFECT);
  return effects.filter(Boolean).join("\n");
}
function bonusMythicTechEffects(config) {
  const effects = [];
  if (selectedHasBonusLabel(config, ORANOS_SKY_PASSAGE_BONUS_LABEL)) effects.push(ORANOS_SKY_PASSAGE_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, POSEIDON_SPEED_BY_AGE_BONUS_LABEL)) effects.push(POSEIDON_SPEED_BY_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL)) effects.push(QUETZ_EAGLE_RANGE_LOS_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_DEVOTE_FAVOR_BONUS_LABEL)) effects.push(TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) effects.push(tezcatObsidianShardMythicEffects(config));
  if (selectedHasBonusLabel(config, FUXI_NEZHA_BONUS_LABEL)) effects.push(FUXI_NEZHA_MYTHIC_EFFECTS);
  if (selectedHasBonusLabel(config, SHENNONG_FARM_LINE_UPGRADES_BONUS_LABEL)) effects.push(shennongFarmLineMythicEffects(config));
  if (selectedHasBonusLabel(config, SHENNONG_MYTH_REGEN_FAVORED_LAND_BONUS_LABEL)) effects.push(SHENNONG_MYTH_REGEN_FAVORED_LAND_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, SET_ANIMALS_BONUS_LABEL)) effects.push(SET_ANIMALS_MYTHIC_EFFECTS);
  if (selectedHasBonusLabel(config, DEMETER_HERDABLES_SPAWN_ON_AGE_UP_BONUS_LABEL)) effects.push(DEMETER_HERDABLES_SPAWN_MYTHIC_EFFECTS);
  if (selectedHasBonusLabel(config, DEMETER_TRAIN_FASTER_BY_AGE_BONUS_LABEL)) effects.push(DEMETER_TRAIN_FASTER_BY_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, HADES_MYTH_HP_BY_AGE_BONUS_LABEL)) effects.push(HADES_MYTH_HP_BY_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TSUKUYOMI_FREE_KITSUNE_BONUS_LABEL)) effects.push(TSUKUYOMI_FREE_KITSUNE_EFFECT);
  if (selectedHasBonusLabel(config, ODIN_RAVEN_SCOUTS_BONUS_LABEL)) effects.push(ODIN_RAVEN_LOS_AGE_EFFECT);
  if (selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL)) effects.push(THOR_DWARVEN_ARMORY_LATER_RESEARCH_RATE_EFFECT);
  return effects.filter(Boolean).join("\n");
}
function hasKronosExtraMythUnitBonus(config) {
  return selectedHasBonusLabel(config, KRONOS_EXTRA_MYTH_UNITS_BONUS_LABEL);
}

function kronosExtraMythUnitPlans(config) {
  if (!hasKronosExtraMythUnitBonus(config)) return [];
  const agePairs = [
    { ownerAge: "ArchaicAge", nextMinorAge: "ClassicalAge" },
    { ownerAge: "ClassicalAge", nextMinorAge: "HeroicAge" },
    { ownerAge: "HeroicAge", nextMinorAge: "MythicAge" },
  ];
  const db = window.AOM_MINOR_GOD_MYTH_UNITS || {};
  const usedNames = new Set();
  const plans = [];
  for (const pair of agePairs) {
    const selectedMinorGods = config.minorGods[pair.nextMinorAge] || [];
    for (const rawMinorTech of selectedMinorGods) {
      const minorTech = canonicalMinorTech(rawMinorTech);
      const mythUnit = db[minorTech] || db[minorTech.toLowerCase()] || "";
      if (!mythUnit) {
        console.warn(`No temple myth-unit mapping found for ${minorTech}; skipping Kronos extra myth-unit tech.`);
        continue;
      }
      let techName = `${config.internalName}Extra${mythUnit}`;
      if (usedNames.has(techName)) techName = `${techName}For${minorTech}`;
      usedNames.add(techName);
      plans.push({ ownerAge: pair.ownerAge, minorTech, mythUnit, techName });
    }
  }
  return plans;
}

function kronosExtraMythUnitStatusEffects(config, ownerAge) {
  const techs = kronosExtraMythUnitPlans(config)
    .filter((plan) => plan.ownerAge === ownerAge)
    .map((plan) => plan.techName);
  return techStatusEffects(techs, "obtainable");
}

function kronosExtraMythUnitTechs(config) {
  return kronosExtraMythUnitPlans(config).map((plan) => `<tech name="${escapeXml(plan.techName)}">
		<researchpoints>0.0000</researchpoints>
		<delay>0.1000</delay>
		<status>UNOBTAINABLE</status>
		<flag>AgeTech</flag>
		<flag>HideAllNotifications</flag>
		<prereqs>
			<techstatus status="Active">${escapeXml(plan.minorTech)}</techstatus>
		</prereqs>
		<effects>
			<effect type="CreateUnit" unit="${escapeXml(plan.mythUnit)}" generator="AbstractTemple">
				<pattern type="Leaving" speed="0.00" radius="0.00" quantity="1.00" minradius="0.00">
					<offset x="-5.00" y="0.00" z="0.00"></offset>
				</pattern>
			</effect>
		</effects>
	</tech>`).join("\n\n\t");
}

function sanitizeBonusTechEffects(xml) {
  if (!xml || !xml.trim()) return "";
  // Bonus snippets are copied from vanilla major gods. Some vanilla snippets include
  // their original minor-god age unlocks, for example HeroicAgeTheia / HeroicAgeRheia / HeroicAgeGaia.
  // Those are not part of the bonus itself and must not be injected into the custom ArchaicAge tech.
  // Minor-god unlocks are generated only from the user's selected minor-god dropdowns.
  return String(xml)
    .replace(/\s*<effect\b(?=[^>]*\btype=["']TechStatus["'])(?=[^>]*\bstatus=["'](?:obtainable|active)["'])[^>]*>\s*(?:ArchaicAge|ClassicalAge|HeroicAge|MythicAge)[A-Za-z0-9_]+\s*<\/effect>/gi, "")
    .trim();
}

function bonusMajorXml(config) {
  return selectedBonusEntries(config)
    .filter((entry) => ![ZEUS_STARTING_FAVOR_BONUS_LABEL, KRONOS_TIMESHIFT_BONUS_LABEL, HUITZ_TONALLI_RESOURCES_BONUS_LABEL, HUITZ_SHORN_TONALLI_BONUS_LABEL, NUWA_FAVORED_LAND_FARTHER_BONUS_LABEL, SET_ANIMALS_BONUS_LABEL, SUSANOO_POWER_COST_FACTOR_BONUS_LABEL, SUSANOO_BUSHIDO_MYTH_XP_BONUS_LABEL, TSUKUYOMI_RESEARCH_BUSHIDO_XP_BONUS_LABEL, ODIN_GREAT_HALL_FAVOR_BONUS_LABEL].includes(entry.label))
    .map((entry) => entry.majorXml || "")
    .filter(Boolean)
    .join("\n");
}

function makeMinorPicker(age, slot) {
  const label = document.createElement("label");
  label.textContent = `${age.replace("Age", " Age")} choice ${slot}`;
  const select = document.createElement("select");
  select.id = `${age}_${slot}`;
  select.dataset.age = age;
  select.dataset.slot = String(slot);
  label.appendChild(select);
  return label;
}

function initMinorPickers() {
  els.minorPickers.innerHTML = "";
  for (const age of AGES) {
    const card = document.createElement("div");
    card.className = "age-card";
    const h = document.createElement("h3");
    h.textContent = age.replace("Age", " Age");
    card.appendChild(h);
    card.appendChild(makeMinorPicker(age, 1));
    card.appendChild(makeMinorPicker(age, 2));
    els.minorPickers.appendChild(card);
  }
  refreshMinorOptions();
}

function refreshMinorOptions(keep = true) {
  const base = selectedBaseMajor();
  const current = keep ? collectMinorSelectionLoose() : {};
  for (const age of AGES) {
    const options = window.AOM_DATA.minors.filter((g) => {
      if (isExcludedMinorGod(g)) return false;
      if (g.age !== age) return false;
      return !els.sameCultureOnly.checked || g.culture === base.culture;
    });
    for (const slot of [1, 2]) {
      const select = $(`${age}_${slot}`);
      select.innerHTML = "";
      for (const god of options) {
        const opt = document.createElement("option");
        opt.value = canonicalMinorTech(god);
        opt.textContent = minorLabel(god);
        select.appendChild(opt);
      }
      const previous = current[age]?.[slot - 1];
      if (previous && options.some((g) => canonicalMinorTech(g) === canonicalMinorTech(previous))) select.value = canonicalMinorTech(previous);
      else if (options[slot - 1]) select.value = canonicalMinorTech(options[slot - 1]);
      else if (options[0]) select.value = canonicalMinorTech(options[0]);
    }
  }
  enforceMinorDifference();
  updatePreview();
}

function setMinorOptionsDisabled(age) {
  const first = $(`${age}_1`);
  const second = $(`${age}_2`);
  if (!first || !second) return;
  for (const opt of first.options) opt.disabled = opt.value === second.value;
  for (const opt of second.options) opt.disabled = opt.value === first.value;
}

function pickFirstAvailable(select, blockedValue) {
  const option = Array.from(select.options).find((opt) => opt.value !== blockedValue && !opt.disabled);
  if (option) select.value = option.value;
}

function enforceMinorDifference(changedSelect) {
  const ages = changedSelect?.dataset?.age ? [changedSelect.dataset.age] : AGES;
  for (const age of ages) {
    const first = $(`${age}_1`);
    const second = $(`${age}_2`);
    if (!first || !second) continue;
    if (first.value && first.value === second.value) {
      if (changedSelect === first) pickFirstAvailable(second, first.value);
      else pickFirstAvailable(first, second.value);
    }
    setMinorOptionsDisabled(age);
  }
}

function collectMinorSelectionLoose() {
  const result = {};
  for (const age of AGES) {
    result[age] = [];
    for (const slot of [1, 2]) {
      const select = $(`${age}_${slot}`);
      if (select) result[age].push(select.value);
    }
  }
  return result;
}

function getMinorByTech(tech) {
  const canonical = canonicalMinorTech(tech);
  return window.AOM_DATA.minors.find((g) => !isExcludedMinorGod(g) && (g.tech === tech || canonicalMinorTech(g) === canonical));
}

function selectedGreekHeroes() {
  const pick = (select, ageKey) => {
    const value = select?.value || "";
    const pool = GREEK_HERO_POOLS[ageKey] || [];
    return pool.includes(value) ? value : (pool[0] || "");
  };
  return {
    archaic: pick(els.greekHeroArchaic, "archaic"),
    classical: pick(els.greekHeroClassical, "classical"),
    heroic: pick(els.greekHeroHeroic, "heroic"),
    mythic: pick(els.greekHeroMythic, "mythic"),
  };
}

function selectedGreekUniqueUnit() {
  const unit = els.greekUniqueUnit?.value || GREEK_UNIQUE_UNITS.Zeus;
  return Object.values(GREEK_UNIQUE_UNITS).includes(unit) ? unit : GREEK_UNIQUE_UNITS.Zeus;
}

function selectedChineseMythicHero() {
  const hero = els.chineseMythicHero?.value || CHINESE_MYTHIC_HEROES.Fuxi;
  return Object.values(CHINESE_MYTHIC_HEROES).includes(hero) ? hero : CHINESE_MYTHIC_HEROES.Fuxi;
}


function selectedAztecClassicalForm() {
  const tech = els.aztecClassicalForm?.value || AZTEC_CLASSICAL_FORMS.Quetzalcoatl.tech;
  const valid = Object.values(AZTEC_CLASSICAL_FORMS).map((entry) => entry.tech);
  return valid.includes(tech) ? tech : AZTEC_CLASSICAL_FORMS.Quetzalcoatl.tech;
}

function selectedAztecMythicArrival() {
  const tech = els.aztecMythicArrival?.value || AZTEC_MYTHIC_ARRIVALS.Quetzalcoatl;
  return Object.values(AZTEC_MYTHIC_ARRIVALS).includes(tech) ? tech : AZTEC_MYTHIC_ARRIVALS.Quetzalcoatl;
}

function getConfig() {
  const base = selectedBaseMajor();
  const internal = sanitizeFolder(els.displayName.value);
  const minorGods = collectMinorSelectionLoose();
  const uniqueTechs = selectedUniqueTechGroups();
  const bonuses = selectedBonusIds();
  return {
    displayName: els.displayName.value.trim() || "Custom Major God",
    majorTitle: els.majorTitle.value.trim() || `${els.displayName.value.trim() || "Custom Major God"} followers`,
    majorFocus: els.majorFocus?.value.trim() || "",
    internalName: internal,
    lowerName: lower(internal),
    templateSource: `${selectedPantheon()}Template`,
    uiTemplateMajor: base.name,
    baseCulture: selectedPantheon(),
    baseMajor: base,
    greekHeroes: selectedGreekHeroes(),
    greekUniqueUnit: selectedGreekUniqueUnit(),
    chineseMythicHero: selectedChineseMythicHero(),
    aztecClassicalForm: selectedAztecClassicalForm(),
    aztecMythicArrival: selectedAztecMythicArrival(),
    godPower: els.godPower.value,
    godPowerPantheon: els.godPower.selectedOptions[0]?.dataset.pantheon || "",
    uniqueTechs,
    bonuses,
    minorGods,
    stringPrefix: `STR_CIV_${internal.toUpperCase()}`,
    ageTechs: {
      archaic: `ArchaicAge${internal}`,
      classical: `ClassicalAge${internal}`,
      heroic: `HeroicAge${internal}`,
      mythic: `MythicAge${internal}`,
    },
  };
}

function validateConfig(config) {
  const errors = [];
  if (!config.displayName) errors.push("Major god display name is required.");
  if (!/^[A-Za-z][A-Za-z0-9]*$/.test(config.internalName)) errors.push("Display name must contain at least one letter so a valid internal name can be generated.");
  if (!config.godPower) errors.push("Choose a starting god power.");
  const validStartingPowers = archaicGodPowerOptions().map((entry) => entry.power);
  if (config.godPower && !validStartingPowers.includes(config.godPower)) {
    errors.push("Starting god power must be one of the existing Archaic Age god powers.");
  }
  if (config.baseCulture === "Greek") {
    const heroes = config.greekHeroes || {};
    for (const [ageKey, pool] of Object.entries(GREEK_HERO_POOLS)) {
      if (!pool.includes(heroes[ageKey])) errors.push(`Choose a valid Greek ${ageKey} hero.`);
    }
    if (!Object.values(GREEK_UNIQUE_UNITS).includes(config.greekUniqueUnit)) errors.push("Choose a valid Greek unique unit.");
  }
  if (config.baseCulture === "Chinese") {
    if (!Object.values(CHINESE_MYTHIC_HEROES).includes(config.chineseMythicHero)) errors.push("Choose a valid Chinese Mythic special hero.");
  }
  if (config.baseCulture === "Aztec") {
    if (!Object.values(AZTEC_CLASSICAL_FORMS).map((entry) => entry.tech).includes(config.aztecClassicalForm)) errors.push("Choose a valid Aztec Classical Teixiptla Form.");
    if (!Object.values(AZTEC_MYTHIC_ARRIVALS).includes(config.aztecMythicArrival)) errors.push("Choose a valid Aztec Mythic Incarnate choice.");
  }
  const availableUniqueIds = new Set(availableUniqueTechGroups().map((group) => group.id));
  const uniquePicks = config.uniqueTechs || [];
  if (uniquePicks.length > 1) errors.push("Choose no more than one unique technology.");
  for (const id of uniquePicks) {
    if (!availableUniqueIds.has(id)) errors.push(`Unique technology ${id} is not available for this pantheon/god-power choice.`);
  }
  const availableBonusIds = new Set(availableBonuses().map((entry) => entry.id));
  const bonusPicks = config.bonuses || [];
  if (bonusPicks.length > MAX_BONUS_CHOICES) errors.push(`Choose no more than ${MAX_BONUS_CHOICES} god bonuses.`);
  if (new Set(bonusPicks).size !== bonusPicks.length) errors.push("God bonus choices must be different.");
  for (const id of bonusPicks) {
    if (!availableBonusIds.has(id)) errors.push(`God bonus ${id} is not available for this pantheon.`);
  }
  for (const issue of requiredAutoBonusIssues(config)) {
    errors.push(formatRequiredAutoBonusIssue(issue));
  }
  for (const age of AGES) {
    const picks = config.minorGods[age] || [];
    if (picks.length !== 2 || !picks[0] || !picks[1]) errors.push(`${age}: choose two minor gods.`);
    if (picks[0] === picks[1]) errors.push(`${age}: the two minor gods must be different.`);
  }
  const icon = els.iconFile.files[0];
  if (icon) {
    const allowedIconExts = new Set(["png", "jpg", "jpeg", "tga", "dds"]);
    const ext = icon.name.split(".").pop().toLowerCase();
    if (!allowedIconExts.has(ext)) errors.push("Icon must be PNG, JPEG, TGA, or DDS.");
    if (icon.size > 5 * 1024 * 1024) errors.push("Icon must be 5 MB or smaller.");
  }
  return errors;
}

function generateMajorGodXmlFromPantheonTemplate(config, iconPath) {
  const templateXml = pantheonTemplateXml(config.baseCulture);
  if (!templateXml) throw new Error(`Missing clean major_gods template for ${config.baseCulture}.`);

  const parser = new DOMParser();
  const doc = parser.parseFromString(templateXml, "application/xml");
  const parseError = doc.querySelector("parsererror");
  if (parseError) throw new Error(`Could not parse ${config.baseCulture} major_gods template.`);
  const civ = doc.documentElement;

  setText(doc, civ, "name", config.internalName);
  setText(doc, civ, "key", PANTHEON_KEYS[config.baseCulture] || config.baseCulture.slice(0, 1).toUpperCase());
  setText(doc, civ, "culture", config.baseCulture);
  setText(doc, civ, "displaynameid", config.stringPrefix);
  setText(doc, civ, "rollovernameid", `${config.stringPrefix}_LR`);
  setText(doc, civ, "titleid", `${config.stringPrefix}_T`);
  if (iconPath) {
    setText(doc, civ, "icon", iconPath);
    setText(doc, civ, "portrait", iconPath);
    setText(doc, civ, "breakoutportrait", iconPath);
  }
  const ageTech = civ.querySelector("agetech[age='ArchaicAge'] tech") || civ.querySelector("agetech tech");
  if (ageTech) ageTech.textContent = config.ageTechs.archaic;

  applyMajorGodBonusFragments(doc, civ, bonusMajorXml(config));
  applyMajorGodSpecialBonusPatches(doc, civ, config);

  const xml = serializeMajorGodElement(civ, 1);
  return `<civmods>\n${xml}\n</civmods>\n`;
}


function hasSelectedBonus(config, sourceMajor, label) {
  return selectedBonusEntries(config).some((entry) => entry.sourceMajor === sourceMajor && entry.label === label);
}

function patchLokiSpawnContributorsForPantheon(doc, civ, config) {
  if (config.baseCulture === "Norse") return;
  const damageGoal = Array.from(civ.querySelectorAll("bonusunitspawning damagegoal"))
    .find((node) => node.getAttribute("name") === "LokiSpawn");
  if (!damageGoal) return;

  const contributors = Array.from(damageGoal.querySelectorAll("contributor"));
  let insertionPoint = null;
  for (const contributor of contributors) {
    const unit = contributor.getAttribute("unit");
    if (unit === "Hersir" || unit === "Godi") {
      if (!insertionPoint) insertionPoint = contributor;
      contributor.parentNode.removeChild(contributor);
    }
  }

  const alreadyHasHero = Array.from(damageGoal.querySelectorAll("contributor"))
    .some((node) => node.getAttribute("type") === "Hero" && (node.textContent || "").trim() === "0.15");
  if (alreadyHasHero) return;

  const heroContributor = doc.createElement("contributor");
  heroContributor.setAttribute("type", "Hero");
  heroContributor.textContent = "0.15";

  const humanSoldierContributor = Array.from(damageGoal.querySelectorAll("contributor"))
    .find((node) => node.getAttribute("type") === "HumanSoldier");
  if (humanSoldierContributor) {
    damageGoal.insertBefore(heroContributor, humanSoldierContributor);
  } else if (insertionPoint && insertionPoint.parentNode === damageGoal) {
    damageGoal.insertBefore(heroContributor, insertionPoint);
  } else {
    damageGoal.appendChild(heroContributor);
  }
}

function applyMajorGodSpecialBonusPatches(doc, civ, config) {
  if (hasSelectedBonus(config, "Zeus", ZEUS_STARTING_FAVOR_BONUS_LABEL)) {
    addZeusStartingFavor(doc, civ);
  }
  if (hasSelectedBonus(config, "Gaia", "Starts with 2 Hero Citizens.")) {
    replaceAtlanteanStartingCitizensWithHeroes(civ);
  }
  if (selectedHasBonusLabel(config, NUWA_FAVORED_LAND_FARTHER_BONUS_LABEL)) {
    replaceBuildingChainFromSelectedBonus(doc, civ, config, NUWA_FAVORED_LAND_FARTHER_BONUS_LABEL);
  }
  if (hasSelectedBonus(config, "Huitzilopochtli", HUITZ_TONALLI_RESOURCES_BONUS_LABEL)) {
    insertIntoBountyResourceEarning(doc, civ, HUITZ_TONALLI_RESOURCE_REWARDS);
  }
  if (hasSelectedBonus(config, "Huitzilopochtli", HUITZ_SHORN_TONALLI_BONUS_LABEL)) {
    insertIntoBountyResourceEarning(doc, civ, HUITZ_SHORN_TONALLI_MULTIPLIER);
  }
  if (hasSelectedBonus(config, "Set", SET_ANIMALS_BONUS_LABEL)) {
    addSetBaboonToStartingUnits(doc, civ);
  }
  if (hasSelectedBonus(config, "Susanoo", SUSANOO_POWER_COST_FACTOR_BONUS_LABEL)) {
    setOnCastPowerCostFactor(doc, civ, "0.80");
  }
  if (hasSelectedBonus(config, "Susanoo", SUSANOO_BUSHIDO_MYTH_XP_BONUS_LABEL)) {
    insertIntoBountyResourceEarning(doc, civ, SUSANOO_BUSHIDO_MYTH_XP_BOUNTY);
  }
  if (hasSelectedBonus(config, "Tsukuyomi", TSUKUYOMI_RESEARCH_BUSHIDO_XP_BONUS_LABEL)) {
    insertIntoBountyResourceEarning(doc, civ, TSUKUYOMI_RESEARCH_BUSHIDO_XP_BOUNTY);
  }
  if (hasSelectedBonus(config, "Odin", ODIN_GREAT_HALL_FAVOR_BONUS_LABEL)) {
    insertIntoBountyResourceEarning(doc, civ, ODIN_GREAT_HALL_FAVOR_BOUNTY);
  }
  if (selectedHasBonusLabel(config, LOKI_SPAWN_MYTH_UNITS_BONUS_LABEL)) {
    patchLokiSpawnContributorsForPantheon(doc, civ, config);
  }
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) {
    replaceObsidianShardReward(civ, obsidianShardProtoName(config));
  }
  if (selectedHasBonusLabel(config, KRONOS_TIMESHIFT_BONUS_LABEL)) {
    replaceTimeShiftingBlock(doc, civ, config);
  }
}


const KRONOS_TIMESHIFT_FREE_BUILDINGS = {
  shared: ["Farm", "FarmShennong", "Dock", "Temple", "Armory", "Market"],
  Greek: ["Storehouse", "Granary", "MilitaryAcademy", "Stable", "ArcheryRange"],
  Egyptian: ["LumberCamp", "MiningCamp", "Granary", "Barracks", "SiegeWorks", "Lighthouse", "MonumentToVillagers", "MonumentToSoldiers", "MonumentToPriests", "MonumentToPharaohs", "MonumentToGods"],
  Norse: ["Longhouse", "GreatHall", "DwarvenArmory"],
  Atlantean: ["Manor", "EconomicGuild", "MilitaryBarracks", "CounterBarracks", "SkyPassage"],
  Chinese: ["Silo", "MachineWorkshop", "MachineWorkshopTrainingYard", "MilitaryCamp", "MilitaryCampTrainingYard", "ImperialAcademy"],
  Japanese: ["Watermill", "MiningCampJapanese", "ShrineJapanese", "Guardhouse", "Dojo", "StableJapanese"],
  Aztec: ["Calpulli", "CalpulliLivestockPen", "CalpulliCraftWorkshop", "WarHut", "NoblesHut"],
};

const KRONOS_TIMESHIFT_PAID_BUILDINGS = {
  shared: ["SentryTower"],
  Greek: ["Fortress"],
  Egyptian: ["MigdolStronghold"],
  Norse: ["HillFort", "AsgardianHillFort"],
  Atlantean: ["Palace", "MirrorTower"],
  Chinese: ["MachineWorkshopTower", "MilitaryCampTower", "Baolei"],
  Japanese: ["Castle"],
  Aztec: ["CalpulliLumberOutpost", "GreatTemple"],
};

function kronosTimeshiftEntries(config) {
  const free = [
    ...KRONOS_TIMESHIFT_FREE_BUILDINGS.shared,
    ...(config.baseCulture === "Atlantean" ? [] : ["House"]),
    ...(KRONOS_TIMESHIFT_FREE_BUILDINGS[config.baseCulture] || []),
  ];
  const paid = [
    ...KRONOS_TIMESHIFT_PAID_BUILDINGS.shared,
    ...(KRONOS_TIMESHIFT_PAID_BUILDINGS[config.baseCulture] || []),
  ];
  return [
    ...Array.from(new Set(free)).map((unit) => ({ unit, costratio: "0.0" })),
    ...Array.from(new Set(paid)).map((unit) => ({ unit, costratio: "0.50" })),
  ];
}

function replaceTimeShiftingBlock(doc, civ, config) {
  const existing = civ.querySelector("timeshifting");
  if (existing) existing.remove();
  const block = doc.createElement("timeshifting");
  block.setAttribute("maxconcurrenttimeshifts", "2");
  for (const entry of kronosTimeshiftEntries(config)) {
    const node = doc.createElement("protounit");
    node.setAttribute("costratio", entry.costratio);
    node.setAttribute("timeratio", "1.0");
    node.textContent = entry.unit;
    block.appendChild(node);
  }
  civ.appendChild(block);
}

function replaceObsidianShardReward(civ, rewardName) {
  for (const reward of Array.from(civ.querySelectorAll("bonusunitspawning reward"))) {
    if ((reward.textContent || "").trim() === "ObsidianShard") {
      reward.textContent = rewardName;
    }
  }
}


function addZeusStartingFavor(doc, civ) {
  const normal = Array.from(civ.querySelectorAll("startingresources"))
    .find((node) => !node.hasAttribute("mode"));
  if (normal) setOrAppendResource(doc, normal, "favor", "10");
  else console.warn("Zeus starting favor bonus needs a normal <startingresources> block, but this pantheon template does not have one.");

  const deathmatch = Array.from(civ.querySelectorAll("startingresources"))
    .find((node) => node.getAttribute("mode") === "deathmatch");
  if (deathmatch) setOrAppendResource(doc, deathmatch, "favor", "110");
  else console.warn("Zeus starting favor bonus needs a deathmatch <startingresources mode=\"deathmatch\"> block, but this pantheon template does not have one.");
}

function setOrAppendResource(doc, resourcesNode, tag, value) {
  let node = resourcesNode.querySelector(tag);
  if (!node) {
    node = doc.createElement(tag);
    resourcesNode.appendChild(node);
  }
  node.textContent = value;
}

function setOnCastPowerCostFactor(doc, civ, value) {
  let node = civ.querySelector("oncastpowercostfactor");
  if (!node) {
    node = doc.createElement("oncastpowercostfactor");
    civ.appendChild(node);
  }
  node.textContent = value;
}

const SUSANOO_POWER_COST_FACTOR_BONUS_LABEL = "Invoking a god power makes other god powers cheaper to reinvoke.";
const SUSANOO_BUSHIDO_MYTH_XP_BONUS_LABEL = "Myth units generate Bushidō XP passively and in combat.";
const SUSANOO_BUSHIDO_MYTH_XP_BOUNTY = `<bountyreward unittype="MythUnit" condition="Damage" combatxp="">2.0</bountyreward>`;

const TSUKUYOMI_FREE_KITSUNE_BONUS_LABEL = "A free Kitsune appears at the Temple on each age-up except Wonder Age.";
const TSUKUYOMI_RESEARCH_BUSHIDO_XP_BONUS_LABEL = "Researching technologies grants Bushidō XP.";
const TSUKUYOMI_RESEARCH_BUSHIDO_XP_BOUNTY = `<researchreward techtype="all" combatxp="">1.0</researchreward>
<researchcostmultiplier techtype="all" resourcetype="Food">1.0</researchcostmultiplier>
<researchcostmultiplier techtype="all" resourcetype="Wood">1.0</researchcostmultiplier>
<researchcostmultiplier techtype="all" resourcetype="Gold">1.0</researchcostmultiplier>
<researchcostmultiplier techtype="all" resourcetype="Favor">10.0</researchcostmultiplier>
<excludedtechflag>AgeUpgrade</excludedtechflag>
<excludedtechflag>DynamicCost</excludedtechflag>`;
const ODIN_GREAT_HALL_FAVOR_BONUS_LABEL = "Great Hall units generate +25% favor in battle.";
const ODIN_GREAT_HALL_FAVOR_BOUNTY = `<bountyreward protounit="Hersir" condition="Damage" resourcetype="Favor">1.25</bountyreward>
<bountyreward protounit="Jarl" condition="Damage" resourcetype="Favor">1.25</bountyreward>
<bountyreward protounit="Godi" condition="Damage" resourcetype="Favor">1.25</bountyreward>
<bountyreward protounit="RaidingCavalry" condition="Damage" resourcetype="Favor">1.25</bountyreward>`;
const ODIN_RAVEN_SCOUTS_BONUS_LABEL = "Two Raven scouts spawn after the first Temple and respawn when killed.";
const ODIN_RAVEN_LOS_AGE_EFFECT = `<effect type="Data" amount="2" subtype="LOS" relativity="Absolute">
	<target type="ProtoUnit">Raven</target>
</effect>`;

const THOR_DWARVEN_ARMORY_BONUS_LABEL = "Dwarven Armory can be built and researched in any age, adding extra upgrades.";

const THOR_DWARVEN_ARMORY_CLASSICAL_RESEARCH_RATE_EFFECT = `<effect type="Data" amount="0.67" subtype="ResearchRate" relativity="Absolute">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`;
const THOR_DWARVEN_ARMORY_LATER_RESEARCH_RATE_EFFECT = `<effect type="Data" amount="0.5" subtype="ResearchRate" relativity="Absolute">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`;

const THOR_ARMORY_TECH_DISCOUNT_BONUS_LABEL = "Technologies researched at Armory are cheaper.";

function thorArmoryTechDiscountEffects(config) {
  const target = selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL) ? "DwarvenArmory" : "Armory";
  return ["Food", "Wood", "Gold", "Favor"].map((resource) => `<effect type="Data" amount="0.90" subtype="CostBuildingTechs" resource="${resource}" relativity="BasePercent">
	<target type="ProtoUnit">${target}</target>
</effect>`).join("\n");
}


function thorDwarvenArmoryEgyptianCostEffects(config) {
  if (config.baseCulture !== "Egyptian") return "";
  return `<effect type="Data" amount="0.00" subtype="cost" resource="Wood" relativity="Override">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`;
}

function thorDwarvenArmoryPoseidonMilitiaEffects(config) {
  if (config.baseCulture !== "Greek") return "";
  if (!selectedHasBonusLabel(config, POSEIDON_MILITIA_BONUS_LABEL)) return "";
  return `<effect type="Data" amount="4" subtype="PartisanUnit" unitType="Militia" relativity="Absolute">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`;
}

function thorDwarvenArmoryForgeOfOlympusTech(config) {
  if (!selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL)) return "";
  if (config.baseCulture !== "Greek") return "";
  const selectedMinorGods = Object.values(config.minorGods || {}).flat().filter(Boolean);
  if (!selectedMinorGods.includes("MythicAgeHephaestus")) return "";
  return `	<tech name="ForgeOfOlympus">
		<effects mergemode="replace">
			<effect type="Data" amount="0.25" subtype="CostBuildingTechs" resource="Food" relativity="Percent">
				<target type="ProtoUnit">Armory</target>
			</effect>
			<effect type="Data" amount="0.25" subtype="CostBuildingTechs" resource="Wood" relativity="Percent">
				<target type="ProtoUnit">Armory</target>
			</effect>
			<effect type="Data" amount="0.25" subtype="CostBuildingTechs" resource="Gold" relativity="Percent">
				<target type="ProtoUnit">Armory</target>
			</effect>
			<effect type="Data" amount="1.5" subtype="ResearchRate" relativity="BasePercent">
				<target type="ProtoUnit">Armory</target>
			</effect>
			<effect type="Data" amount="4.0" subtype="CostBuildingTechs" resource="Food" relativity="Percent" hidetooltip="">
				<target type="ProtoUnit">Armory</target>
			</effect>
			<effect type="Data" amount="4.0" subtype="CostBuildingTechs" resource="Wood" relativity="Percent" hidetooltip="">
				<target type="ProtoUnit">Armory</target>
			</effect>
			<effect type="Data" amount="4.0" subtype="CostBuildingTechs" resource="Gold" relativity="Percent" hidetooltip="">
				<target type="ProtoUnit">Armory</target>
			</effect>
			<effect type="Data" amount="0.25" subtype="CostBuildingTechs" resource="Food" relativity="Percent">
				<target type="ProtoUnit">DwarvenArmory</target>
			</effect>
			<effect type="Data" amount="0.25" subtype="CostBuildingTechs" resource="Wood" relativity="Percent">
				<target type="ProtoUnit">DwarvenArmory</target>
			</effect>
			<effect type="Data" amount="0.25" subtype="CostBuildingTechs" resource="Gold" relativity="Percent">
				<target type="ProtoUnit">DwarvenArmory</target>
			</effect>
			<effect type="Data" amount="1.5" subtype="ResearchRate" relativity="BasePercent">
				<target type="ProtoUnit">DwarvenArmory</target>
			</effect>
		</effects>
	</tech>`;
}

function thorDwarvenArmoryCoatepecShrinesTech(config) {
  if (!selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL)) return "";
  if (config.baseCulture !== "Aztec") return "";
  const selectedMinorGods = Object.values(config.minorGods || {}).flat().filter(Boolean);
  if (!selectedMinorGods.includes("HeroicAgeCoatlicue")) return "";
  return `	<tech name="CoatepecShrines" orderhint="8">
		<effects mergemode="replace">
			<effect type="Data" amount="2.5" subtype="UnitRegenRate" relativity="Absolute">
				<target type="ProtoUnit">Building</target>
			</effect>
			<effect type="Data" amount="0.00" subtype="RepairCostFactor" relativity="BasePercent" tooltipid="STR_TECH_COATEPEC_SHRINES_OVERRIDE">
				<target type="Player"></target>
			</effect>
			<effect type="Data" amount="0.00" subtype="ProtoUnitFlag" flag="DynamicUpdate" relativity="Absolute">
				<target type="ProtoUnit">House</target>
			</effect>
			<effect type="Data" amount="0.00" subtype="ProtoUnitFlag" flag="DynamicUpdate" relativity="Absolute">
				<target type="ProtoUnit">Market</target>
			</effect>
			<effect type="Data" amount="0.00" subtype="ProtoUnitFlag" flag="DynamicUpdate" relativity="Absolute">
				<target type="ProtoUnit">AbstractArmory</target>
			</effect>
			<effect type="Data" amount="0.00" subtype="ProtoUnitFlag" flag="DynamicUpdate" relativity="Absolute">
				<target type="ProtoUnit">WarHut</target>
			</effect>
			<effect type="Data" amount="0.00" subtype="ProtoUnitFlag" flag="DynamicUpdate" relativity="Absolute">
				<target type="ProtoUnit">NoblesHut</target>
			</effect>
			<effect type="Data" amount="0.00" subtype="ProtoUnitFlag" flag="DynamicUpdate" relativity="Absolute">
				<target type="ProtoUnit">AbstractFarm</target>
			</effect>
		</effects>
	</tech>`;
}


function relicNineCauldronsAllPantheonsTech() {
  const units = [
    "Myrmidon",
    "Gastraphetoros",
    "Hetairos",
    "ChariotArcher",
    "CamelRider",
    "WarElephant",
    "Huskarl",
    "Destroyer",
    "DestroyerHero",
    "Fanatic",
    "FanaticHero",
    "WhiteHorseCavalry",
    "TigerCavalry",
    "TigerCavalryDismounted",
    "Otontin",
    "ShornOne",
    "JaguarRider",
    "AmazonArcher",
    "Onmyoji",
  ];
  const armorEffects = units.flatMap((unit) => ["Hack", "Pierce"].map((armorType) => `			<effect type="Data" amount="-0.05" subtype="ArmorVulnerability" armortype="${armorType}" relativity="Percent">
				<target type="ProtoUnit">${unit}</target>
			</effect>`)).join("\n");
  return `	<tech name="RelicNineCauldrons" type="Normal" orderhint="0">
		<effects mergemode="replace">
${armorEffects}
			<effect type="Data" amount="0.01" subtype="ResourceTrickleRate" resource="Favor" relativity="Absolute">
				<target type="Player"></target>
			</effect>
			<effect type="TextOutput">STR_RLC_TECH_NINE_CAULDRONS_SELF</effect>
			<effect all="true" type="TextOutput">STR_RLC_TECH_NINE_CAULDRONS_OTHER</effect>
		</effects>
	</tech>`;
}

function thorDwarvenArmoryBuilderTarget(config) {
  return config.baseCulture === "Norse" ? "AbstractInfantry" : "AbstractVillager";
}

function thorDwarvenArmoryVillagerCommandEffects(config) {
  const target = thorDwarvenArmoryBuilderTarget(config);
  return `<effect type="Data" amount="1.00" subtype="CommandRemove" proto="Armory" relativity="Assign">
	<target type="ProtoUnit">${escapeXml(target)}</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="DwarvenArmory" row="1" column="5" relativity="Assign">
	<target type="ProtoUnit">${escapeXml(target)}</target>
</effect>`;
}

function thorDwarvenArmoryArchaicEffects(config) {
  const effects = [];
  const commandEffects = thorDwarvenArmoryVillagerCommandEffects(config);
  if (commandEffects) effects.push(commandEffects);
  effects.push(`<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`);
  const egyptianCostEffects = thorDwarvenArmoryEgyptianCostEffects(config);
  if (egyptianCostEffects) effects.push(egyptianCostEffects);
  const poseidonMilitiaEffects = thorDwarvenArmoryPoseidonMilitiaEffects(config);
  if (poseidonMilitiaEffects) effects.push(poseidonMilitiaEffects);
  effects.push(`<effect type="TechStatus" status="obtainable">CopperWeapons</effect>
<effect type="TechStatus" status="obtainable">CopperArmor</effect>
<effect type="TechStatus" status="obtainable">CopperShields</effect>
<effect type="TechStatus" status="obtainable">BronzeWeapons</effect>
<effect type="TechStatus" status="obtainable">BronzeArmor</effect>
<effect type="TechStatus" status="obtainable">BronzeShields</effect>
<effect type="TechStatus" status="obtainable">IronWeapons</effect>
<effect type="TechStatus" status="obtainable">IronArmor</effect>
<effect type="TechStatus" status="obtainable">IronShields</effect>
<effect type="TechStatus" status="obtainable">Ballistics</effect>
<effect type="TechStatus" status="obtainable">BurningPitch</effect>
<effect type="TechStatus" status="obtainable">DwarvenWeapons</effect>
<effect type="TechStatus" status="obtainable">MeteoricIronArmor</effect>
<effect type="TechStatus" status="obtainable">DragonscaleShields</effect>`);
  const armoryTechCommandEffects = thorDwarvenArmoryCommandAddArchaicEffects(config);
  if (armoryTechCommandEffects) effects.push(armoryTechCommandEffects);
  return effects.join("\n");
}

function thorDwarvenArmoryMinorGodPrereqTechs(config) {
  if (!selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL)) return "";
  const heroicMinorTechs = (config.minorGods.HeroicAge || []).filter(Boolean);
  return Array.from(new Set(heroicMinorTechs)).map((techName) => {
    const aegirEffects = techName === "HeroicAgeAegir" ? uniqueTechAegirTempleRepositionEffects(config) : "";
    const effectsBlock = aegirEffects ? `
		<effects>
${indentTabBlock(aegirEffects, 3)}
		</effects>` : "";
    return `	<tech name="${escapeXml(techName)}">
		<prereqs>
			<typecount unit="DwarvenArmory" count="1.00" state="aliveState" operator="gte"></typecount>
		</prereqs>${effectsBlock}
	</tech>`;
  }).join("\n\n");
}


const THOR_DWARVEN_ARMORY_COMMANDADD_RULES = {
  Atlantean: [
    { enabledBy: "ClassicalAgeOceanus", row: 1, column: 0, tech: "WeightlessMace" },
    { enabledBy: "ClassicalAgeLeto", row: 1, column: 0, tech: "VolcanicForge" },
    { enabledBy: "ClassicalAgeOceanus", row: 1, column: 1, tech: "BiteOfTheShark" },
    { enabledBy: "HeroicAgeRheia", row: 2, column: 1, tech: "OrichalcumMail" },
  ],
  Aztec: [
    { enabledBy: "HeroicAgeCoatlicue", row: 1, column: 0, tech: "StringOfHearts" },
    { enabledBy: "ClassicalAgeAztec", row: 0, column: 0, tech: "FlintWeapons" },
    { enabledBy: "HeroicAgeAztec", row: 0, column: 0, tech: "JadeWeapons" },
    { enabledBy: "MythicAgeAztec", row: 0, column: 0, tech: "ObsidianWeapons" },
    { enabledBy: "ClassicalAgeAztec", row: 0, column: 1, tech: "FeatheredArmor" },
    { enabledBy: "HeroicAgeAztec", row: 0, column: 1, tech: "CeremonialArmor" },
    { enabledBy: "MythicAgeAztec", row: 0, column: 1, tech: "SacredArmor" },
    { enabledBy: "ClassicalAgeAztec", row: 0, column: 2, tech: "FeatheredShields" },
    { enabledBy: "HeroicAgeAztec", row: 0, column: 2, tech: "CeremonialShields" },
    { enabledBy: "MythicAgeAztec", row: 0, column: 2, tech: "SacredShields" },
  ],
  Chinese: [
    { enabledBy: "ClassicalAgeChiyou", row: 1, column: 0, tech: "MasterOfWeaponry" },
    { enabledBy: "HeroicAgeNuba", row: 1, column: 1, tech: "ScorchingFeathers" },
    { enabledBy: "HeroicAgeRushou", row: 1, column: 1, tech: "DivineJudgement" },
    { enabledBy: "HeroicAgeRushou", row: 1, column: 2, tech: "GildedShields" },
    { enabledBy: "MythicAgeHuangdi", row: 1, column: 3, tech: "LeizusSilk" },
  ],
  Egyptian: [
    { enabledBy: "ClassicalAgePtah", row: 1, column: 0, tech: "ScallopedAxe" },
    { enabledBy: "ClassicalAgePtah", row: 1, column: 1, tech: "ElectrumBullets" },
    { enabledBy: "ClassicalAgePtah", row: 1, column: 2, tech: "LeatherFrameShield" },
    { enabledBy: "HeroicAgeSekhmet", row: 2, column: 0, tech: "BoneBow" },
    { enabledBy: "HeroicAgeSekhmet", row: 2, column: 1, tech: "SlingsOfTheSun" },
  ],
  Greek: [
    { enabledBy: "ClassicalAgeAres", row: 1, column: 0, tech: "PhobosSpearOfPanic" },
    { enabledBy: "ClassicalAgeAthena", row: 1, column: 0, tech: "Sarissa" },
    { enabledBy: "ClassicalAgeAres", row: 1, column: 1, tech: "DeimosSwordOfDread" },
    { enabledBy: "ClassicalAgeAthena", row: 1, column: 1, tech: "AegisShield" },
    { enabledBy: "ClassicalAgeAres", row: 1, column: 2, tech: "EnyosBowOfHorror" },
    { enabledBy: "HeroicAgeApollo", row: 2, column: 0, tech: "SunRay" },
    { enabledBy: "MythicAgePersephone", row: 2, column: 0, tech: "HarvestOfSouls" },
    { enabledBy: "MythicAgeArtemis", row: 2, column: 1, tech: "ShaftsOfPlague" },
    { enabledBy: "MythicAgeHephaestus", row: 2, column: 1, tech: "OlympianWeapons" },
    { enabledBy: "MythicAgeHephaestus", row: 2, column: 2, tech: "ForgeOfOlympus" },
  ],
  Japanese: [
    { enabledBy: "ClassicalAgeMinakatatomi", row: 1, column: 0, tech: "HuntersStrength" },
    { enabledBy: "HeroicAgeHachiman", row: 2, column: 0, tech: "GoldenKite" },
  ],
};

function thorDwarvenArmoryCommandAddArchaicEffects(config) {
  const rules = THOR_DWARVEN_ARMORY_COMMANDADD_RULES[config.baseCulture] || [];
  return rules.map((rule) => `<effect type="Data" amount="1.00" subtype="CommandAdd" tech="${escapeXml(rule.tech)}" row="${rule.row}" column="${rule.column}" relativity="Assign">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`).join("\n");
}

const THOR_DWARF_SPAWN_BONUS_LABEL = "Each Dwarven Armory upgrade grants a free Dwarf.";

function thorDwarfSpawnTechName(config) {
  return `${config.internalName}DwarfSpawn`;
}

function thorDwarfSpawnArchaicEffects(config) {
  const effects = [`<effect type="SetOnTechResearchedTech" amount="1.00" techtype="ArmoryTechnology">${escapeXml(thorDwarfSpawnTechName(config))}</effect>`];
  if (config.baseCulture === "Atlantean") {
    effects.push(`<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">OxCartBuilding</target>
</effect>`);
  }
  return effects.join("\n");
}

function thorDwarfSpawnExtraTech(config) {
  if (!selectedHasBonusLabel(config, THOR_DWARF_SPAWN_BONUS_LABEL)) return "";
  return `	<tech name="${escapeXml(thorDwarfSpawnTechName(config))}">
		<status>UNOBTAINABLE</status>
		<flag>InfiniteTech</flag>
		<flag>IgnoreIfAutoActivated</flag>
		<effects>
			<effect type="CreateUnit" unit="VillagerDwarf" generator="AbstractArmory">
				<pattern type="Leaving" speed="0.00" radius="0.00" quantity="1.00" minradius="0.00">
					<offset x="-5.00" y="0.00" z="0.00"></offset>
				</pattern>
			</effect>
		</effects>
	</tech>`;
}
const TSUKUYOMI_FREE_KITSUNE_EFFECT = `<effect type="CreateUnit" unit="Kitsune" generator="Temple">
	<pattern type="Leaving" speed="0.00" radius="0.00" quantity="1.00" minradius="0.00">
		<offset x="0.00" y="0.00" z="0.00" />
	</pattern>
</effect>`;

const HUITZ_TONALLI_RESOURCE_REWARDS = `<bountyreward unittype="MilitaryUnit" resourcetype="Favor" condition="Destroy" asspawnedunit="Tonalli">0.75</bountyreward>
<bountyreward unittype="MilitaryUnit" resourcetype="Food" multiplybyunitcost="true" condition="Destroy" asspawnedunit="Tonalli">0.05</bountyreward>
<bountyreward unittype="MilitaryUnit" resourcetype="Wood" multiplybyunitcost="true" condition="Destroy" asspawnedunit="Tonalli">0.05</bountyreward>
<bountyreward unittype="MilitaryUnit" resourcetype="Gold" multiplybyunitcost="true" condition="Destroy" asspawnedunit="Tonalli">0.05</bountyreward>`;

const HUITZ_SHORN_TONALLI_MULTIPLIER = `<bountytargetmultiplier relativity="basepercent" unittype="MilitaryUnit" attackertype="ShornOne" condition="Destroy" resourcetype="Favor">1.0</bountytargetmultiplier>`;

const SUSANOO_BUSHIDO_MYTH_XP_ARCHAIC_EFFECTS = `<effect type="Data" action="Autogather" amount="1.00" subtype="ActionEnable" relativity="Absolute">
	<target type="ProtoUnit">MythUnit</target>
</effect>
<effect type="Data" action="Autogather" amount="1.00" subtype="ActionEnable" relativity="Absolute">
	<target type="ProtoUnit">LogicalTypeDependentMyth</target>
</effect>
<effect type="Data" action="Autogather" amount="0.75" subtype="WorkRate" unittype="CombatXP" relativity="Absolute">
	<target type="ProtoUnit">LogicalTypeArchaicMythUnit</target>
</effect>
<effect type="Data" action="Autogather" amount="-0.25" subtype="WorkRate" unittype="CombatXP" relativity="Absolute">
	<target type="ProtoUnit">Kitsune</target>
</effect>
<effect type="Data" action="Autogather" amount="1.5" subtype="WorkRate" unittype="CombatXP" relativity="Absolute">
	<target type="ProtoUnit">LogicalTypeClassicalMythUnit</target>
</effect>
<effect type="Data" action="Autogather" amount="2.25" subtype="WorkRate" unittype="CombatXP" relativity="Absolute">
	<target type="ProtoUnit">LogicalTypeHeroicMythUnit</target>
</effect>
<effect type="Data" action="Autogather" amount="3.0" subtype="WorkRate" unittype="CombatXP" relativity="Absolute">
	<target type="ProtoUnit">LogicalTypeMythicMythUnit</target>
</effect>`;


function addSetBaboonToStartingUnits(doc, civ) {
  const normal = Array.from(civ.querySelectorAll("startingunits"))
    .find((node) => !node.hasAttribute("mode"));
  const deathmatch = Array.from(civ.querySelectorAll("startingunits"))
    .find((node) => node.getAttribute("mode") === "deathmatch");
  addSetBaboonToStartingUnitsBlock(doc, normal, "normal");
  addSetBaboonToStartingUnitsBlock(doc, deathmatch, "deathmatch");
}

function addSetBaboonToStartingUnitsBlock(doc, startingUnitsNode, label) {
  if (!startingUnitsNode) {
    console.warn(`Set animals bonus needs a <startingunits> ${label} block, but this pantheon template does not have one.`);
    return;
  }
  const alreadyExists = Array.from(startingUnitsNode.querySelectorAll("unit"))
    .some((unit) => (unit.textContent || "").trim() === "BaboonOfSet");
  if (alreadyExists) return;
  const unit = doc.createElement("unit");
  unit.setAttribute("count", "1");
  unit.setAttribute("delay", "6.00");
  unit.setAttribute("x", "-11.00");
  unit.setAttribute("y", "0.00");
  unit.setAttribute("z", "-4.00");
  unit.textContent = "BaboonOfSet";
  startingUnitsNode.appendChild(unit);
}

function replaceBuildingChainFromSelectedBonus(doc, civ, config, label) {
  const entry = selectedBonusEntries(config).find((bonus) => bonus.label === label);
  const fragmentXml = entry?.majorXml || "";
  if (!fragmentXml.trim()) return;

  const parser = new DOMParser();
  const fragmentDoc = parser.parseFromString(`<root>${fragmentXml}</root>`, "application/xml");
  if (fragmentDoc.querySelector("parsererror")) {
    console.warn("Skipping unparsable buildingchain fragment", fragmentXml);
    return;
  }
  const newBuildingChain = fragmentDoc.querySelector("buildingchain");
  if (!newBuildingChain) {
    console.warn("Selected bonus did not contain a <buildingchain> block.");
    return;
  }

  const existing = civ.querySelector("buildingchain");
  const imported = doc.importNode(newBuildingChain, true);
  if (existing) {
    existing.parentNode.replaceChild(imported, existing);
  } else {
    civ.appendChild(imported);
  }
}

function insertIntoBountyResourceEarning(doc, civ, fragmentXml) {
  const bounty = civ.querySelector("bountyresourceearning");
  if (!bounty) {
    console.warn("Selected bonus needs an existing <bountyresourceearning> block, but this pantheon template does not have one. Skipping bounty insertion.");
    return;
  }
  const parser = new DOMParser();
  const fragmentDoc = parser.parseFromString(`<root>${fragmentXml}</root>`, "application/xml");
  if (fragmentDoc.querySelector("parsererror")) {
    console.warn("Skipping unparsable bounty fragment", fragmentXml);
    return;
  }
  const existingKeys = new Set(Array.from(bounty.children).map(nodeSignature));
  for (const node of Array.from(fragmentDoc.documentElement.children)) {
    const imported = doc.importNode(node, true);
    const key = nodeSignature(imported);
    if (!existingKeys.has(key)) {
      bounty.appendChild(imported);
      existingKeys.add(key);
    }
  }
}

function mergeBonusUnitSpawning(doc, civ, sourceBonusUnitSpawning) {
  let target = civ.querySelector("bonusunitspawning");
  if (!target) {
    target = doc.createElement("bonusunitspawning");
    civ.appendChild(target);
  }
  const existingKeys = new Set(Array.from(target.children).map(nodeSignature));
  for (const child of Array.from(sourceBonusUnitSpawning.children || [])) {
    const imported = doc.importNode(child, true);
    const key = nodeSignature(imported);
    if (!existingKeys.has(key)) {
      target.appendChild(imported);
      existingKeys.add(key);
    }
  }
}

function nodeSignature(node) {
  const attrs = Array.from(node.attributes || []).map((a) => `${a.name}=${a.value}`).sort().join("|");
  return `${node.tagName}|${attrs}|${(node.textContent || "").trim()}`;
}

function replaceAtlanteanStartingCitizensWithHeroes(civ) {
  for (const startingUnits of Array.from(civ.querySelectorAll("startingunits"))) {
    for (const unit of Array.from(startingUnits.querySelectorAll("unit"))) {
      const value = (unit.textContent || "").trim();
      if (value === "VillagerAtlantean") {
        unit.textContent = "VillagerAtlanteanHero";
      }
    }
  }
}

function setText(doc, root, tag, text) {
  let node = root.querySelector(tag);
  if (!node) {
    node = doc.createElement(tag);
    root.appendChild(node);
  }
  node.textContent = text;
}

function applyMajorGodBonusFragments(doc, civ, fragmentXml) {
  if (!fragmentXml || !fragmentXml.trim()) return;
  const parser = new DOMParser();
  const wrapped = `<root>${fragmentXml}</root>`;
  const fragmentDoc = parser.parseFromString(wrapped, "application/xml");
  if (fragmentDoc.querySelector("parsererror")) {
    console.warn("Skipping unparsable major_gods bonus fragment", fragmentXml);
    return;
  }
  for (const node of Array.from(fragmentDoc.documentElement.children)) {
    const tag = node.tagName.toLowerCase();
    const imported = doc.importNode(node, true);
    if (tag === "startingresources" || tag === "startingunits") {
      civ.querySelector(tag)?.remove();
      civ.appendChild(imported);
    } else if (tag === "bonusunitspawning") {
      mergeBonusUnitSpawning(doc, civ, node);
    } else if (tag === "unit") {
      let startingUnits = civ.querySelector("startingunits");
      if (!startingUnits) {
        startingUnits = doc.createElement("startingunits");
        civ.appendChild(startingUnits);
      }
      startingUnits.appendChild(imported);
    } else {
      civ.appendChild(imported);
    }
  }
}

function serializeMajorGodElement(node, level = 0) {
  const pad = "\t".repeat(level);
  const attrs = Array.from(node.attributes || [])
    .map((attr) => ` ${attr.name}="${escapeXmlAttribute(attr.value)}"`)
    .join("");
  const childElements = Array.from(node.childNodes || []).filter((child) => child.nodeType === Node.ELEMENT_NODE);
  const text = Array.from(node.childNodes || [])
    .filter((child) => child.nodeType === Node.TEXT_NODE)
    .map((child) => child.nodeValue || "")
    .join("")
    .trim();

  if (!childElements.length) {
    if (text) return `${pad}<${node.tagName}${attrs}>${escapeXml(text)}</${node.tagName}>`;
    return `${pad}<${node.tagName}${attrs}></${node.tagName}>`;
  }

  const lines = [`${pad}<${node.tagName}${attrs}>`];
  for (const child of childElements) {
    lines.push(serializeMajorGodElement(child, level + 1));
  }
  lines.push(`${pad}</${node.tagName}>`);
  return lines.join("\n");
}

function escapeXmlAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function indent(xml, level = 1) {
  const pad = "\t".repeat(level);
  return xml.split("\n").map((line) => pad + line).join("\n");
}

function techStatusEffects(techs, status = "obtainable") {
  return techs.map((tech) => `\t\t\t<effect type="TechStatus" status="${status}">${escapeXml(tech)}</effect>`).join("\n");
}

function cultureAgeTech(age, culture) {
  return `${age}${culture}`;
}


function enableProtoUnitEffect(unit) {
  return `<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">${escapeXml(unit)}</target>
</effect>`;
}

function greekHeroes(config) {
  if (!config || config.baseCulture !== "Greek") return null;
  const heroes = config.greekHeroes || {};
  return {
    archaic: GREEK_HERO_POOLS.archaic.includes(heroes.archaic) ? heroes.archaic : GREEK_HERO_POOLS.archaic[0],
    classical: GREEK_HERO_POOLS.classical.includes(heroes.classical) ? heroes.classical : GREEK_HERO_POOLS.classical[0],
    heroic: GREEK_HERO_POOLS.heroic.includes(heroes.heroic) ? heroes.heroic : GREEK_HERO_POOLS.heroic[0],
    mythic: GREEK_HERO_POOLS.mythic.includes(heroes.mythic) ? heroes.mythic : GREEK_HERO_POOLS.mythic[0],
  };
}

function greekArchaicExtraEffects(config) {
  const heroes = greekHeroes(config);
  if (!heroes) return "";
  return enableProtoUnitEffect(heroes.archaic);
}

function greekClassicalExtraEffects(config) {
  const heroes = greekHeroes(config);
  if (!heroes) return "";
  return enableProtoUnitEffect(heroes.classical);
}

function greekHeroicExtraEffects(config) {
  const heroes = greekHeroes(config);
  if (!heroes) return "";
  return enableProtoUnitEffect(heroes.heroic);
}

function greekMythicExtraEffects(config) {
  const heroes = greekHeroes(config);
  if (!heroes) return "";
  const effects = [enableProtoUnitEffect(heroes.mythic)];
  if (config.greekUniqueUnit) effects.push(enableProtoUnitEffect(config.greekUniqueUnit));
  return effects.join("\n");
}

function chineseMythicExtraEffects(config) {
  if (!config || config.baseCulture !== "Chinese") return "";
  const hero = Object.values(CHINESE_MYTHIC_HEROES).includes(config.chineseMythicHero) ? config.chineseMythicHero : CHINESE_MYTHIC_HEROES.Fuxi;
  return enableProtoUnitEffect(hero);
}


function aztecClassicalExtraEffects(config) {
  if (!config || config.baseCulture !== "Aztec") return "";
  const selectedTech = Object.values(AZTEC_CLASSICAL_FORMS).map((entry) => entry.tech).includes(config.aztecClassicalForm) ? config.aztecClassicalForm : AZTEC_CLASSICAL_FORMS.Quetzalcoatl.tech;
  const form = Object.values(AZTEC_CLASSICAL_FORMS).find((entry) => entry.tech === selectedTech) || AZTEC_CLASSICAL_FORMS.Quetzalcoatl;
  return `<effect type="ModifyProtoUnit" proto="WarriorPriest" resetquickactioncommandindex="true">WarriorPriest</effect>
<effect type="TechStatus" status="active">${escapeXml(form.tech)}</effect>
${enableProtoUnitEffect(form.unit)}`;
}

function aztecMythicExtraEffects(config) {
  if (!config || config.baseCulture !== "Aztec") return "";
  const tech = Object.values(AZTEC_MYTHIC_ARRIVALS).includes(config.aztecMythicArrival) ? config.aztecMythicArrival : AZTEC_MYTHIC_ARRIVALS.Quetzalcoatl;
  return `<effect type="TechStatus" status="obtainable">${escapeXml(tech)}</effect>`;
}

function norseClassicalExtraEffects(config) {
  if (!config || config.baseCulture !== "Norse") return "";
  return `			<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
				<target type="ProtoUnit">Armory</target>
			</effect>
			<effect type="TechStatus" status="obtainable">CopperWeapons</effect>
			<effect type="TechStatus" status="obtainable">CopperArmor</effect>
			<effect type="TechStatus" status="obtainable">CopperShields</effect>
			<effect type="TechStatus" status="obtainable">Ballistics</effect>`;
}

function norseHeroicExtraEffects(config) {
  if (!config || config.baseCulture !== "Norse") return "";
  return `			<effect type="TechStatus" status="obtainable">BronzeWeapons</effect>
			<effect type="TechStatus" status="obtainable">BronzeArmor</effect>
			<effect type="TechStatus" status="obtainable">BronzeShields</effect>`;
}

function norseMythicExtraEffects(config) {
  if (!config || config.baseCulture !== "Norse") return "";
  return `			<effect type="TechStatus" status="obtainable">IronWeapons</effect>
			<effect type="TechStatus" status="obtainable">IronArmor</effect>
			<effect type="TechStatus" status="obtainable">IronShields</effect>
			<effect type="TechStatus" status="obtainable">BurningPitch</effect>`;
}

function godPowerEffect(power) {
  return `			<effect type="Data" subtype="GodPower" power="${escapeXml(power)}" amount="1.0" cooldown="60.0" relativity="Absolute">
				<target type="Player"></target>
			</effect>`;
}

function indentTabBlock(block, level = 0) {
  if (!block || !block.trim()) return "";
  const pad = "	".repeat(level);
  return String(block).split("\n").map((line) => line.trim() ? pad + line : line).join("\n");
}


function selectedHasUniqueTechId(config, id) {
  return (config.uniqueTechs || []).includes(id);
}

function skinOfTheRhinoSharedTech(config) {
  if (!selectedHasUniqueTechId(config, "SkinOfTheRhino")) return "";
  return `<tech name="${escapeXml(skinOfTheRhinoCustomTechName(config))}">
		<displaynameid>STR_TECH_SKIN_OF_THE_RHINO_NAME</displaynameid>
		<rollovertextid>STR_TECH_SKIN_OF_THE_RHINO_LR</rollovertextid>
		<cost resourcetype="Food">50.0000</cost>
		<cost resourcetype="Favor">5.0000</cost>
		<researchpoints>15.0000</researchpoints>
		<status>UNOBTAINABLE</status>
		<icon>resources\\egyptian\\static_color\\technologies\\skin_of_the_rhino_icon.png</icon>
		<flag>CountsTowardMilitaryScore</flag>
		<flag>MythTech</flag>
		<effects>
			<effect type="Data" amount="-0.25" subtype="ArmorVulnerability" armortype="Hack" relativity="Percent">
				<target type="ProtoUnit">AbstractVillager</target>
			</effect>
			<effect type="Data" amount="-0.25" subtype="ArmorVulnerability" armortype="Pierce" relativity="Percent">
				<target type="ProtoUnit">AbstractVillager</target>
			</effect>
		</effects>
	</tech>`;
}




function hasGreekHermesAndHestiaMinorGods(config) {
  if (!config || config.baseCulture !== "Greek") return false;
  const selectedMinorGods = Object.values(config.minorGods || {}).flat();
  return selectedMinorGods.includes("ClassicalAgeHermes") && selectedMinorGods.includes("HeroicAgeHestia");
}

function fatedArrowsHestiaCentaurTech(config) {
  if (!hasGreekHermesAndHestiaMinorGods(config)) return "";
  return `\t<tech name="FatedArrows">
\t\t<effects mergemode="replace">
\t\t\t<effect type="Data" amount="2.00" subtype="NumberBounces" action="RangedAttack" relativity="Absolute">
\t\t\t\t<target type="ProtoUnit">AbstractArcher</target>
\t\t\t</effect>
\t\t\t<effect type="Data" amount="2.00" subtype="NumberBounces" action="RangedAttack" relativity="Absolute">
\t\t\t\t<target type="ProtoUnit">Medusa</target>
\t\t\t</effect>
\t\t\t<effect type="Data" amount="2.00" subtype="NumberBounces" action="RangedAttack" relativity="Absolute">
\t\t\t\t<target type="ProtoUnit">Centaur</target>
\t\t\t</effect>
\t\t</effects>
\t</tech>`;
}

function fatedArrowsCentaurProtoXml(config) {
  if (!hasGreekHermesAndHestiaMinorGods(config)) return "";
  return `\t<unit name="Centaur">
\t\t<protoaction>
\t\t\t<name>RangedAttack</name>
\t\t\t<projectilechainbounce>1</projectilechainbounce>
\t\t\t<projectilechainbouncereduction>0.800</projectilechainbouncereduction>
\t\t\t<projectilechainbouncerange>5</projectilechainbouncerange>
\t\t</protoaction>
\t</unit>`;
}


function olympianWeaponsAmazonArcherTech(config) {
  if (!config || config.baseCulture !== "Greek" || config.greekUniqueUnit !== "AmazonArcher") return "";
  return `	<tech name="OlympianWeapons">
		<effects mergemode="replace">
			<effect type="Data" amount="1.20" subtype="Damage" action="HandAttack" relativity="BasePercent">
				<target type="ProtoUnit">Hetairos</target>
			</effect>
			<effect type="Data" amount="1.20" subtype="Damage" action="HandAttack" relativity="BasePercent">
				<target type="ProtoUnit">Myrmidon</target>
			</effect>
			<effect type="Data" amount="1.20" subtype="Damage" action="RangedAttack" relativity="BasePercent">
				<target type="ProtoUnit">Gastraphetoros</target>
			</effect>
			<effect type="Data" action="HandAttack" amount="1.0" subtype="DamageBonus" unittype="MythUnit" relativity="Absolute">
				<target type="ProtoUnit">Hetairos</target>
			</effect>
			<effect type="Data" action="HandAttack" amount="1.0" subtype="DamageBonus" unittype="MythUnit" relativity="Absolute">
				<target type="ProtoUnit">Myrmidon</target>
			</effect>
			<effect type="Data" action="RangedAttack" amount="1.0" subtype="DamageBonus" unittype="MythUnit" relativity="Absolute">
				<target type="ProtoUnit">Gastraphetoros</target>
			</effect>
			<effect type="Data" amount="1.20" subtype="Damage" action="RangedAttack" relativity="BasePercent">
				<target type="ProtoUnit">AmazonArcher</target>
			</effect>
			<effect type="Data" action="RangedAttack" amount="1.0" subtype="DamageBonus" unittype="MythUnit" relativity="Absolute">
				<target type="ProtoUnit">AmazonArcher</target>
			</effect>
		</effects>
	</tech>`;
}

function argivePatronageCustomTechName(config) {
  return `ArgivePatronage${config.internalName}`;
}

function argivePatronageCustomRolloverStringId(config) {
  return `STR_TECH_ARGIVE_PATRONAGE_${sanitizeId(config.internalName).toUpperCase()}_LR`;
}

function argivePatronageCustomOverrideStringId(config) {
  return `STR_TECH_ARGIVE_PATRONAGE_${sanitizeId(config.internalName).toUpperCase()}_OVERRIDE`;
}

function hasGreekHeraMinorGod(config) {
  if (!config || config.baseCulture !== "Greek") return false;
  return (config.minorGods?.MythicAge || []).includes("MythicAgeHera");
}

function argivePatronageUniqueUnit(config) {
  return config.greekUniqueUnit || GREEK_UNIQUE_UNITS.Zeus;
}

function argivePatronageUniqueUnitDisplayName(config) {
  return displayTechName(argivePatronageUniqueUnit(config));
}

function argivePatronageMythicAgeHeraTech(config) {
  if (!hasGreekHeraMinorGod(config)) return "";
  const techName = argivePatronageCustomTechName(config);
  return `	<tech name="MythicAgeHera">
		<effects>
			<effect type="TechStatus" status="obtainable" uishowifmajorgod="${escapeXml(config.internalName)}">${escapeXml(techName)}</effect>
			<effect type="Data" amount="1.00" subtype="CommandAdd" tech="${escapeXml(techName)}" row="2" column="3" relativity="Assign">
				<target type="ProtoUnit">Fortress</target>
			</effect>
		</effects>
	</tech>`;
}

function argivePatronageCustomTech(config) {
  if (!hasGreekHeraMinorGod(config)) return "";
  const techName = argivePatronageCustomTechName(config);
  const actionName = techName;
  return `<tech name="${escapeXml(techName)}">
		<displaynameid>STR_TECH_ARGIVE_PATRONAGE_NAME</displaynameid>
		<rollovertextid>${escapeXml(argivePatronageCustomRolloverStringId(config))}</rollovertextid>
		<cost resourcetype="Food">200.0000</cost>
		<cost resourcetype="Gold">300.0000</cost>
		<cost resourcetype="Favor">30.0000</cost>
		<researchpoints>40.0000</researchpoints>
		<status>UNOBTAINABLE</status>
		<icon>resources\\greek\\static_color\\technologies\\argive_patronage_icon.png</icon>
		<flag>CountsTowardMilitaryScore</flag>
		<flag>HideAdvancedRollover</flag>
		<flag>MythTech</flag>
		<prereqs>
			<techstatus status="Active">${escapeXml(config.ageTechs.mythic)}</techstatus>
		</prereqs>
		<effects>
			<effect type="Data" action="${escapeXml(actionName)}" amount="1.00" subtype="ActionEnable" relativity="Absolute" tooltipid="${escapeXml(argivePatronageCustomOverrideStringId(config))}">
				<target type="ProtoUnit">Fortress</target>
			</effect>
		</effects>
	</tech>`;
}

function argivePatronageStringMods(config) {
  if (!hasGreekHeraMinorGod(config)) return "";
  const unit = argivePatronageUniqueUnitDisplayName(config);
  return `ID = "${argivePatronageCustomRolloverStringId(config)}"   ;   Str = "Hera’s favor causes your Fortresses to periodically spawn ${escapeStringMod(unit)} for free."
ID = "${argivePatronageCustomOverrideStringId(config)}"   ;   Str = "Fortress: Summon a ${escapeStringMod(unit)} every 60 seconds"`;
}

function argivePatronageFortressProtoXml(config) {
  if (!hasGreekHeraMinorGod(config)) return "";
  const actionName = argivePatronageCustomTechName(config);
  const unit = argivePatronageUniqueUnit(config);
  return `	<unit name="Fortress">
		<protoaction>
			<name>${escapeXml(actionName)}</name>
			<type>Maintain</type>
			<rate type="${escapeXml(unit)}">1.0</rate>
			<active>0</active>
			<persistent>1</persistent>
			<maintaintrainpoints>60.0</maintaintrainpoints>
		</protoaction>
	</unit>`;
}

function temporalChaosCustomTech(config) {
  if (!selectedHasUniqueTechId(config, "TemporalChaos")) return "";
  const techName = temporalChaosCustomTechName(config);
  const entries = kronosTimeshiftEntries(config);
  const costEffects = entries
    .filter((entry) => Number.parseFloat(entry.costratio) > 0)
    .map((entry) => `			<effect type="Data" subtype="TimeShiftingCost" amount="0.50" unittype="${escapeXml(entry.unit)}" relativity="BasePercent">
				<target type="Player"></target>
			</effect>`);
  const timeEffects = entries
    .map((entry) => `			<effect type="Data" subtype="TimeShiftingTimeRatio" amount="0.5" unittype="${escapeXml(entry.unit)}" relativity="Percent">
				<target type="Player"></target>
			</effect>`);
  const effects = [
    `			<effect type="Data" subtype="TimeShiftingConcurrentShifts" amount="1" relativity="Absolute">
				<target type="Player"></target>
			</effect>`,
    ...costEffects,
    ...timeEffects,
  ].join("\n");
  return `<tech name="${escapeXml(techName)}">
		<displaynameid>STR_TECH_TEMPORAL_CHAOS_NAME</displaynameid>
		<rollovertextid>STR_TECH_TEMPORAL_CHAOS_LR</rollovertextid>
		<cost resourcetype="Wood">100.0000</cost>
		<cost resourcetype="Gold">50.0000</cost>
		<cost resourcetype="Favor">10.0000</cost>
		<researchpoints>20.0000</researchpoints>
		<status>UNOBTAINABLE</status>
		<icon>resources\\atlantean\\static_color\\technologies\\temporal_chaos_icon.png</icon>
		<flag>CountsTowardMilitaryScore</flag>
		<flag>MythTech</flag>
		<effects>
${effects}
		</effects>
	</tech>`;
}

function extraGeneratedTechs(config) {
  const extras = [];
  const kronosTechs = kronosExtraMythUnitTechs(config);
  if (kronosTechs) extras.push(kronosTechs);
  const thorArmoryPrereqs = thorDwarvenArmoryMinorGodPrereqTechs(config);
  if (thorArmoryPrereqs) extras.push(thorArmoryPrereqs);
  const thorDwarfTech = thorDwarfSpawnExtraTech(config);
  if (thorDwarfTech) extras.push(thorDwarfTech);
  const thorForgeOlympusTech = thorDwarvenArmoryForgeOfOlympusTech(config);
  if (thorForgeOlympusTech) extras.push(thorForgeOlympusTech);
  const thorCoatepecShrinesTech = thorDwarvenArmoryCoatepecShrinesTech(config);
  if (thorCoatepecShrinesTech) extras.push(thorCoatepecShrinesTech);
  extras.push(relicNineCauldronsAllPantheonsTech());
  const skinRhinoTech = skinOfTheRhinoSharedTech(config);
  if (skinRhinoTech) extras.push(skinRhinoTech);
  const temporalChaosTech = temporalChaosCustomTech(config);
  if (temporalChaosTech) extras.push(temporalChaosTech);
  const argiveHeraTech = argivePatronageMythicAgeHeraTech(config);
  if (argiveHeraTech) extras.push(argiveHeraTech);
  const argiveTech = argivePatronageCustomTech(config);
  if (argiveTech) extras.push(argiveTech);
  const olympianWeaponsAmazonTech = olympianWeaponsAmazonArcherTech(config);
  if (olympianWeaponsAmazonTech) extras.push(olympianWeaponsAmazonTech);
  const fatedArrowsHestiaTech = fatedArrowsHestiaCentaurTech(config);
  if (fatedArrowsHestiaTech) extras.push(fatedArrowsHestiaTech);
  if (!selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL)) {
    const aegirUniqueTechPatch = uniqueTechAegirTempleRepositionTechs(config);
    if (aegirUniqueTechPatch) extras.push(aegirUniqueTechPatch);
  }
  return indentTabBlock(extras.join("\n\n"), 1);
}

function generateTechTreeMods(config) {
  const c = config.ageTechs;
  const classical = config.minorGods.ClassicalAge;
  const heroic = config.minorGods.HeroicAge;
  const mythic = config.minorGods.MythicAge;
  const culture = config.baseCulture;
  return `<techtreemods>
	<tech name="${escapeXml(c.archaic)}">
		<status>UNOBTAINABLE</status>
		<flag>HideAllNotifications</flag>
		<flag>AgeTech</flag>
		<effects>
			<effect type="TechStatus" status="active">${escapeXml(cultureAgeTech("ArchaicAge", culture))}</effect>
${techStatusEffects([...classical, c.classical])}
${indentTabBlock(greekArchaicExtraEffects(config), 3)}
${kronosExtraMythUnitStatusEffects(config, "ArchaicAge")}
${techStatusEffects(uniqueTechNames(config), "obtainable")}
${indentTabBlock(uniqueTechSetNameEffects(config), 3)}
${indentTabBlock(uniqueTechUiPlacementEffects(config), 3)}
${indentTabBlock(bonusTechEffects(config), 3)}
			<effect type="TechStatus" status="active">ArchaicAgeWeakenUnits</effect>
${uniqueTechEntries(config).some((group) => group.extraArchaicEffect === "FreyrTechCostBonus") ? `			<effect type="SetOnTechResearchedTech" amount="1.00">FreyrTechCostBonus</effect>
` : ""}${godPowerEffect(config.godPower)}
		</effects>
	</tech>

	<tech name="${escapeXml(c.classical)}">
		<status>UNOBTAINABLE</status>
		<flag>HideAllNotifications</flag>
		<flag>Volatile</flag>
		<flag>AgeTech</flag>
		<prereqs>
			<specificage>ClassicalAge</specificage>
		</prereqs>
		<effects>
			<effect type="TechStatus" status="active">ClassicalAgeGeneral</effect>
			<effect type="TechStatus" status="active">${escapeXml(cultureAgeTech("ClassicalAge", culture))}</effect>
${norseClassicalExtraEffects(config)}
${indentTabBlock(greekClassicalExtraEffects(config), 3)}
${indentTabBlock(aztecClassicalExtraEffects(config), 3)}
${techStatusEffects([...heroic, c.heroic])}
${kronosExtraMythUnitStatusEffects(config, "ClassicalAge")}
${indentTabBlock(bonusClassicalTechEffects(config), 3)}
		</effects>
	</tech>

	<tech name="${escapeXml(c.heroic)}">
		<status>UNOBTAINABLE</status>
		<flag>HideAllNotifications</flag>
		<flag>Volatile</flag>
		<flag>AgeTech</flag>
		<prereqs>
			<specificage>HeroicAge</specificage>
		</prereqs>
		<effects>
			<effect type="TechStatus" status="active">HeroicAgeGeneral</effect>
			<effect type="TechStatus" status="active">${escapeXml(cultureAgeTech("HeroicAge", culture))}</effect>
${techStatusEffects([...mythic, c.mythic])}
${norseHeroicExtraEffects(config)}
${indentTabBlock(greekHeroicExtraEffects(config), 3)}
${kronosExtraMythUnitStatusEffects(config, "HeroicAge")}
${indentTabBlock(bonusHeroicTechEffects(config), 3)}
		</effects>
	</tech>

	<tech name="${escapeXml(c.mythic)}">
		<status>UNOBTAINABLE</status>
		<flag>HideAllNotifications</flag>
		<flag>Volatile</flag>
		<flag>AgeTech</flag>
		<prereqs>
			<specificage>MythicAge</specificage>
		</prereqs>
		<effects>
			<effect type="TechStatus" status="active">MythicAgeGeneral</effect>
			<effect type="TechStatus" status="active">${escapeXml(cultureAgeTech("MythicAge", culture))}</effect>
${norseMythicExtraEffects(config)}
${indentTabBlock(greekMythicExtraEffects(config), 3)}
${indentTabBlock(chineseMythicExtraEffects(config), 3)}
${indentTabBlock(aztecMythicExtraEffects(config), 3)}
${indentTabBlock(bonusMythicTechEffects(config), 3)}
		</effects>
	</tech>
${extraGeneratedTechs(config) ? `

${extraGeneratedTechs(config)}` : ""}
</techtreemods>\n`;
}

function generateProtoMods(config) {
  const entries = [tezcatObsidianShardProtoXml(config), kronosHouseTemporalProtoXml(config), oranosEgyptianPriestSkyPassageProtoXml(config), argivePatronageFortressProtoXml(config), fatedArrowsCentaurProtoXml(config)].filter(Boolean);
  if (!entries.length) {
    return `<protomods>
	<!-- Empty in this draft. -->
</protomods>
`;
  }
  return `<protomods>
${entries.join("\n")}
</protomods>
`;
}
function generateMinorGodsMods() {
  return `<minorgodsmods>\n\t<!-- Existing vanilla minor gods are referenced directly, so no new minor god definitions are required for this draft. -->\n</minorgodsmods>\n`;
}

function techStringBase(techName) {
  return `STR_TECH_${sanitizeId(techName).toUpperCase()}`;
}

function generateGodRolloverString(config) {
  const lines = [];
  if (config.majorFocus) {
    lines.push(`Focus: ${config.majorFocus}`);
  }
  for (const entry of selectedBonusEntries(config)) {
    lines.push(`• ${dynamicBonusLabel(entry, config)}`);
  }
  return lines.join("\n");
}

function generateStringMods(config) {
  const rollover = generateGodRolloverString(config);
  return `Language = "English"

// GENERATED BY AOM RETOLD MAJOR GOD CREATOR DRAFT
// General strings used by major_gods_mods.xml.
// Rollover includes the optional custom focus and selected bonus summary.
// Existing minor-god and age-tech strings remain vanilla.

// GENERAL

ID = "${config.stringPrefix}"   ;   Str = "${escapeStringMod(config.displayName)}"
ID = "${config.stringPrefix}_LR"   ;   Str = "${escapeStringMod(rollover)}"
ID = "${config.stringPrefix}_T"   ;   Str = "${escapeStringMod(config.majorTitle)}"${selectedHasBonusLabel(config, NUWA_CREATORS_AUSPICE_BONUS_LABEL) || selectedBonusEntries(config).some((entry) => entry.id === "bonus_67") ? `
ID = "${nuwaAuspiceNotificationStringId(config)}"   ;   Str = "${escapeStringMod(config.displayName)} has enhanced their blessing!"` : ""}${uniqueTechCustomStringMods(config) ? `

// UNIQUE TECHNOLOGY ROLLOVERS

${uniqueTechCustomStringMods(config)}` : ""}${argivePatronageStringMods(config) ? `

// HERA ARGIVE PATRONAGE

${argivePatronageStringMods(config)}` : ""}
`;
}

function escapeStringMod(value) {
  return String(value ?? "").replaceAll('"', "'");
}

function generateGodPickerXaml(config) {
  const className = `GodPicker_${config.baseCulture}_${config.internalName}`;
  const archaicBlock = godPickerArchaicPowerBlock(config.godPower, uniqueTechNames(config));
  return `﻿<local:GodPickerPageBase
    x:Class="athenswpf.Content.Pregame.GodPicker.${escapeXml(className)}"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:local="clr-namespace:athenswpf.Content.Pregame.GodPicker"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    xmlns:techTree="clr-namespace:athenswpf.Content.Pregame.TechTree"
    Style="{StaticResource GodPickerPageStyle}"
    mc:Ignorable="d">

    <local:GodPickerPageBase.Ages>
${indentBlock(archaicBlock, 2)}
${AGES.map((age) => generateGodPickerAge(age, config.minorGods[age])).join("\n")}
    </local:GodPickerPageBase.Ages>
</local:GodPickerPageBase>
`;
}

function godPickerArchaicPowerBlock(power, uniqueTechs = []) {
  const techNodes = uniqueTechs.map((tech) => `        <techTree:TechTreeNode Tech="${escapeXml(tech)}" />`).join("\n");
  return `<techTree:TechTreeAge AgeName="ArchaicAge">
    <techTree:TechTreeAge.Technologies>
        <techTree:TechTreeNode Power="${escapeXml(power)}" />${techNodes ? "\n" + techNodes : ""}
    </techTree:TechTreeAge.Technologies>
</techTree:TechTreeAge>`;
}

function lookupTemplateBlock(map, key) {
  if (!map || !key) return "";
  if (map[key]) return map[key];
  const lowerKey = String(key).toLowerCase();
  const foundKey = Object.keys(map).find((candidate) => candidate.toLowerCase() === lowerKey);
  return foundKey ? map[foundKey] : "";
}

function godPickerBonusTrack(tech) {
  const templates = window.AOM_GODPICKER || {};
  const canonical = canonicalMinorTech(tech);
  const block = lookupTemplateBlock(templates.bonusTrackByGod, canonical);
  if (block) return block;
  return `<techTree:TechTreeBonusTrack God="${escapeXml(canonical)}">
    <techTree:TechTreeBonusTrack.Technologies>
    </techTree:TechTreeBonusTrack.Technologies>
</techTree:TechTreeBonusTrack>`;
}

function indentBlock(block, level = 0) {
  const pad = "    ".repeat(level);
  return String(block || "")
    .split("\n")
    .map((line) => line.trim() ? pad + line : line)
    .join("\n");
}

function generateGodPickerAge(age, techs) {
  return `        <techTree:TechTreeAge AgeName="${age}">
            <techTree:TechTreeAge.Bonuses>
${techs.map((tech) => indentBlock(godPickerBonusTrack(tech), 4)).join("\n\n")}
            </techTree:TechTreeAge.Bonuses>
        </techTree:TechTreeAge>`;
}

function generateTechTreeXaml(config) {
  const className = `TechTree_${config.baseCulture}_${config.internalName}`;
  const defaultColor = techTreeDefaultColor(config.uiTemplateMajor);
  const defaultColorAttr = defaultColor ? `\n      DefaultPlayerColor="${escapeXml(defaultColor)}"` : "";
  return `﻿<local:TechTreePageBase x:Class="athenswpf.Content.Pregame.TechTree.${escapeXml(className)}"
      xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
      xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
      xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" 
      xmlns:d="http://schemas.microsoft.com/expression/blend/2008" 
      xmlns:local="clr-namespace:athenswpf.Content.Pregame.TechTree"
      mc:Ignorable="d" 
      Style="{StaticResource TechTreePageStyle}"${defaultColorAttr}>

    <local:TechTreePageBase.Ages>
${indentBlock(techTreeArchaicPowerBlock(config.godPower, uniqueTechNames(config)), 2)}
${AGES.map((age) => generateTechTreeAge(age, config)).join("\n")}
        <local:TechTreeAge AgeName="TitanAge">
        </local:TechTreeAge>
    </local:TechTreePageBase.Ages>
</local:TechTreePageBase>
`;
}

function techTreeDefaultColor(sourceMajor) {
  return window.AOM_TECHTREE?.defaultPlayerColorByMajor?.[sourceMajor] || "";
}

function techTreeArchaicPowerBlock(power, uniqueTechs = []) {
  const techNodes = uniqueTechs.map((tech) => `        <local:TechTreeNode Tech="${escapeXml(tech)}" />`).join("\n");
  return `<local:TechTreeAge AgeName="ArchaicAge">
    <local:TechTreeAge.Technologies>
        <local:TechTreeNode Power="${escapeXml(power)}" />${techNodes ? "\n" + techNodes : ""}
    </local:TechTreeAge.Technologies>
</local:TechTreeAge>`;
}

function techTreeAgeTechnologiesBlock(sourceMajor, age) {
  const templates = window.AOM_TECHTREE || {};
  return templates.ageTechnologiesByMajorAge?.[`${sourceMajor}|${age}`] || "";
}

function techTreeBonusTrack(tech) {
  const templates = window.AOM_TECHTREE || {};
  const canonical = canonicalMinorTech(tech);
  const block = lookupTemplateBlock(templates.bonusTrackByGod, canonical);
  if (block) return block;
  return `<local:TechTreeBonusTrack God="${escapeXml(canonical)}">
    <local:TechTreeBonusTrack.Technologies>
    </local:TechTreeBonusTrack.Technologies>
</local:TechTreeBonusTrack>`;
}

function generateTechTreeAge(age, config) {
  const techs = config.minorGods[age] || [];
  const sourceMajor = config.uiTemplateMajor;
  const technologies = techTreeAgeTechnologiesBlock(sourceMajor, age);
  return `        <local:TechTreeAge AgeName="${age}">

            <local:TechTreeAge.Bonuses>
${techs.map((tech) => indentBlock(techTreeBonusTrack(tech), 4)).join("\n\n")}
            </local:TechTreeAge.Bonuses>
${technologies ? "\n" + indentBlock(technologies, 3) + "\n" : ""}
        </local:TechTreeAge>`;
}

function generateReadme(config) {
  return `AoM Retold Major God Creator draft export

Major god: ${config.displayName}
Internal name: ${config.internalName}
Pantheon: ${config.baseCulture}
major_gods pantheon template: ${config.templateSource}
Starting god power: ${config.godPower}${config.godPowerPantheon ? ` (${config.godPowerPantheon})` : ""}
Unique technologies: ${uniqueTechNames(config).map(displayTechName).join(", ") || "None"}
God bonuses: ${selectedBonusEntries(config).map((entry) => `${entry.sourceMajor}: ${dynamicBonusLabel(entry, config)}`).join("; ") || "None"}
GodPicker Archaic block generated from the selected god power and unique technology.
TechTree Archaic block generated from the selected god power and unique technology.
TechTree age technology layout fallback: ${config.uiTemplateMajor} pregame layout

Generated files follow this mod shape:
${config.internalName}/game/data/gameplay/major_gods_mods.xml
${config.internalName}/game/data/gameplay/minor_gods_mods.xml
${config.internalName}/game/data/gameplay/techtree_mods.xml
${config.internalName}/game/data/strings/English/stringmods.txt
${config.internalName}/game/ui_myth/content/pregame/godpicker/GodPicker_${config.baseCulture}_${config.internalName}.xaml
${config.internalName}/game/ui_myth/content/pregame/techtree/TechTree_${config.baseCulture}_${config.internalName}.xaml

Install by extracting the folder into your AoM Retold local mods folder.

Known draft limitation:
major_gods_mods.xml is generated from the clean pantheon template file, not from a vanilla major god clone. GodPicker and TechTree XAML use compact generated ArchaicAge blocks for the selected god power and unique technology, plus full vanilla bonus tracks for the selected minor gods. stringmods.txt intentionally contains only the mandatory General strings referenced by major_gods_mods.xml. The remaining likely test points are age-tech effects and whether any selected minor god requires additional gameplay files.
`;
}

async function generateFiles(config) {
  const icon = els.iconFile.files[0];
  let iconPath = null;
  let iconBytes = null;
  let iconName = "";
  if (icon) {
    const ext = icon.name.split(".").pop().toLowerCase();
    iconName = `${config.internalName}_icon.${ext}`;
    iconPath = `resources\\${config.lowerName}\\${iconName}`;
    iconBytes = await icon.arrayBuffer();
  }

  const root = `${config.internalName}/`;
  const files = [];
  files.push(textFile(`${root}README_INSTALL.txt`, generateReadme(config)));
  files.push(textFile(`${root}game/data/gameplay/major_gods_mods.xml`, generateMajorGodXmlFromPantheonTemplate(config, iconPath)));
  files.push(textFile(`${root}game/data/gameplay/minor_gods_mods.xml`, generateMinorGodsMods(config)));
  files.push(textFile(`${root}game/data/gameplay/techtree_mods.xml`, generateTechTreeMods(config)));
  files.push(textFile(`${root}game/data/gameplay/proto_mods.xml`, generateProtoMods(config)));
  files.push(textFile(`${root}game/data/gameplay/powers_mods.xml`, generatePowersMods(config)));
  files.push(textFile(`${root}game/data/strings/English/stringmods.txt`, generateStringMods(config)));
  files.push(textFile(`${root}game/ui_myth/content/pregame/godpicker/GodPicker_${config.baseCulture}_${config.internalName}.xaml`, generateGodPickerXaml(config)));
  files.push(textFile(`${root}game/ui_myth/content/pregame/techtree/TechTree_${config.baseCulture}_${config.internalName}.xaml`, generateTechTreeXaml(config)));
  if (iconBytes) files.push(binaryFile(`${root}game/ui_myth/resources/${config.lowerName}/${iconName}`, iconBytes));
  return files;
}

function textFile(path, text) {
  return { path, data: new TextEncoder().encode(text) };
}
function binaryFile(path, arrayBuffer) {
  return { path, data: new Uint8Array(arrayBuffer) };
}

// Tiny ZIP writer using STORE method. No CDN or server needed.
function crc32(bytes) {
  let c = ~0;
  for (let i = 0; i < bytes.length; i++) {
    c ^= bytes[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function u16(n) { return [n & 255, (n >>> 8) & 255]; }
function u32(n) { return [n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]; }
function dosTimeDate(date = new Date()) {
  const time = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((date.getFullYear() - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time, date: dosDate };
}
function concatChunks(chunks) {
  const total = chunks.reduce((sum, c) => sum + c.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) { out.set(c, offset); offset += c.length; }
  return out;
}
function makeZip(files) {
  const encoder = new TextEncoder();
  const localChunks = [];
  const centralChunks = [];
  let offset = 0;
  const dt = dosTimeDate();
  for (const file of files) {
    const nameBytes = encoder.encode(file.path.replaceAll("\\", "/"));
    const data = file.data instanceof Uint8Array ? file.data : new Uint8Array(file.data);
    const crc = crc32(data);
    const local = new Uint8Array([
      ...u32(0x04034b50), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(dt.time), ...u16(dt.date),
      ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(nameBytes.length), ...u16(0),
      ...nameBytes, ...data,
    ]);
    localChunks.push(local);
    const central = new Uint8Array([
      ...u32(0x02014b50), ...u16(20), ...u16(20), ...u16(0x0800), ...u16(0), ...u16(dt.time), ...u16(dt.date),
      ...u32(crc), ...u32(data.length), ...u32(data.length), ...u16(nameBytes.length), ...u16(0), ...u16(0),
      ...u16(0), ...u16(0), ...u32(0), ...u32(offset), ...nameBytes,
    ]);
    centralChunks.push(central);
    offset += local.length;
  }
  const centralOffset = offset;
  const central = concatChunks(centralChunks);
  const end = new Uint8Array([
    ...u32(0x06054b50), ...u16(0), ...u16(0), ...u16(files.length), ...u16(files.length),
    ...u32(central.length), ...u32(centralOffset), ...u16(0),
  ]);
  return new Blob([concatChunks(localChunks), central, end], { type: "application/zip" });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function handleDownload() {
  const config = getConfig();
  const errors = validateConfig(config);
  if (errors.length) return setMessage(errors.join(" "), true);
  try {
    const files = await generateFiles(config);
    const zip = makeZip(files);
    downloadBlob(zip, `${config.internalName}.zip`);
    setMessage(`Generated ${files.length} files in ${config.internalName}.zip`);
  } catch (err) {
    console.error(err);
    setMessage(`Export failed: ${err.message}`, true);
  }
}

function presetFromForm() {
  const config = getConfig();
  return {
    displayName: config.displayName,
    majorTitle: config.majorTitle,
    majorFocus: config.majorFocus,
    baseCulture: config.baseCulture,
    godPower: config.godPower,
    greekHeroes: config.greekHeroes,
    greekUniqueUnit: config.greekUniqueUnit,
    chineseMythicHero: config.chineseMythicHero,
    aztecClassicalForm: config.aztecClassicalForm,
    aztecMythicArrival: config.aztecMythicArrival,
    godPowerPantheon: config.godPowerPantheon,
    uniqueTechs: config.uniqueTechs,
    bonuses: config.bonuses,
    sameCultureOnly: els.sameCultureOnly.checked,
    minorGods: config.minorGods,
  };
}
function applyPreset(preset) {
  if (!preset) return;
  els.displayName.value = preset.displayName || "My Custom Major God";
  els.majorTitle.value = preset.majorTitle || `${els.displayName.value} followers`;
  if (els.majorFocus) els.majorFocus.value = preset.majorFocus || "";
  if (preset.baseCulture) els.baseMajor.value = preset.baseCulture;
  else if (preset.baseMajorName) {
    const oldMajor = window.AOM_DATA.majors.find((m) => m.name === preset.baseMajorName);
    if (oldMajor) els.baseMajor.value = oldMajor.culture;
  }
  initGreekSpecificSelects(false);
  initChineseSpecificSelects(false);
  initAztecSpecificSelects(false);
  if (preset.greekHeroes) {
    const pairs = [
      [els.greekHeroArchaic, "archaic"],
      [els.greekHeroClassical, "classical"],
      [els.greekHeroHeroic, "heroic"],
      [els.greekHeroMythic, "mythic"],
    ];
    for (const [select, ageKey] of pairs) {
      const value = preset.greekHeroes[ageKey];
      if (select && GREEK_HERO_POOLS[ageKey]?.includes(value)) select.value = value;
    }
  }
  if (preset.greekHeroLine) {
    // Backward compatibility with presets saved before Greek heroes became per-age choices.
    const legacyLines = {
      Zeus: { archaic: "Jason", classical: "Heracles", heroic: "Odysseus", mythic: "Bellerophon" },
      Hades: { archaic: "Ajax", classical: "Achilles", heroic: "Chiron", mythic: "Perseus" },
      Poseidon: { archaic: "Theseus", classical: "Atalanta", heroic: "Hippolyta", mythic: "Polyphemus" },
      Demeter: { archaic: "Orpheus", classical: "Iolaus", heroic: "Icarus", mythic: "Midas" },
    };
    const legacy = legacyLines[preset.greekHeroLine];
    if (legacy) {
      if (els.greekHeroArchaic) els.greekHeroArchaic.value = legacy.archaic;
      if (els.greekHeroClassical) els.greekHeroClassical.value = legacy.classical;
      if (els.greekHeroHeroic) els.greekHeroHeroic.value = legacy.heroic;
      if (els.greekHeroMythic) els.greekHeroMythic.value = legacy.mythic;
    }
  }
  if (preset.greekUniqueUnit && els.greekUniqueUnit && Object.values(GREEK_UNIQUE_UNITS).includes(preset.greekUniqueUnit)) els.greekUniqueUnit.value = preset.greekUniqueUnit;
  if (preset.chineseMythicHero && els.chineseMythicHero && Object.values(CHINESE_MYTHIC_HEROES).includes(preset.chineseMythicHero)) els.chineseMythicHero.value = preset.chineseMythicHero;
  if (preset.aztecClassicalForm && els.aztecClassicalForm && Object.values(AZTEC_CLASSICAL_FORMS).map((entry) => entry.tech).includes(preset.aztecClassicalForm)) els.aztecClassicalForm.value = preset.aztecClassicalForm;
  if (preset.aztecMythicArrival && els.aztecMythicArrival && Object.values(AZTEC_MYTHIC_ARRIVALS).includes(preset.aztecMythicArrival)) els.aztecMythicArrival.value = preset.aztecMythicArrival;
  initGodPowerSelect(false);
  if (preset.godPower && Array.from(els.godPower.options).some((o) => o.value === preset.godPower)) els.godPower.value = preset.godPower;
  initUniqueTechSelects(false);
  if (preset.uniqueTechs) {
    const selects = [els.uniqueTech1];
    for (const [index, value] of preset.uniqueTechs.entries()) {
      const select = selects[index];
      if (select && value && Array.from(select.options).some((o) => o.value === value)) select.value = value;
    }
    enforceUniqueTechDifference();
  }
  initBonusSelects(false);
  if (preset.bonuses) {
    const selects = bonusSelects();
    for (const [index, value] of preset.bonuses.entries()) {
      const select = selects[index];
      if (select && value && Array.from(select.options).some((o) => o.value === value)) select.value = value;
    }
    enforceBonusDifference();
  }
  els.sameCultureOnly.checked = preset.sameCultureOnly !== false;
  refreshMinorOptions(false);
  if (preset.minorGods) {
    for (const age of AGES) {
      for (const slot of [1, 2]) {
        const select = $(`${age}_${slot}`);
        const value = preset.minorGods[age]?.[slot - 1];
        if (value && Array.from(select.options).some((o) => o.value === canonicalMinorTech(value))) select.value = canonicalMinorTech(value);
      }
    }
  }
  enforceMinorDifference();
  updatePreview();
}

function updatePreview() {
  const config = getConfig();
  els.layoutPreview.textContent = `${config.internalName}/
  README_INSTALL.txt
  game/
    data/
      gameplay/
        major_gods_mods.xml
        minor_gods_mods.xml
        techtree_mods.xml
        proto_mods.xml
        powers_mods.xml
      strings/
        English/
          stringmods.txt
    ui_myth/
      content/pregame/godpicker/
        GodPicker_${config.baseCulture}_${config.internalName}.xaml
      content/pregame/techtree/
        TechTree_${config.baseCulture}_${config.internalName}.xaml
      resources/${config.lowerName}/
        ${els.iconFile.files[0] ? "<uploaded icon>" : "(none; pantheon template icon path reused)"}`;
  const friendly = {
    displayName: config.displayName,
    majorTitle: config.majorTitle,
    majorFocus: config.majorFocus || undefined,
    pantheon: config.baseCulture,
    majorGodTemplate: config.templateSource,
    pregameUiLayoutFallback: config.uiTemplateMajor,
    startingGodPower: config.godPower,
    godPowerPantheon: config.godPowerPantheon,
    greekChoices: config.baseCulture === "Greek" ? { heroes: config.greekHeroes, mythicUniqueUnit: config.greekUniqueUnit } : undefined,
    chineseChoices: config.baseCulture === "Chinese" ? { mythicSpecialHero: config.chineseMythicHero } : undefined,
    aztecChoices: config.baseCulture === "Aztec" ? { classicalFormTech: config.aztecClassicalForm, mythicArrivalTech: config.aztecMythicArrival } : undefined,
    uniqueTechs: uniqueTechEntries(config).map((group) => ({ choice: displayTechName(group.label || group.id), grants: group.techs.map(displayTechName), internal: group.techs })),
    godBonuses: selectedBonusEntries(config).map((entry) => ({ source: `${entry.sourcePantheon} / ${entry.sourceMajor}`, bonus: dynamicBonusLabel(entry, config), internalBonusLabel: entry.label, files: entry.files })),
    requiredBonusWarnings: requiredAutoBonusIssues(config).map(formatRequiredAutoBonusIssue),
    minorGods: Object.fromEntries(AGES.map((age) => [age, config.minorGods[age].map((t) => {
      const g = getMinorByTech(t);
      return g ? `${canonicalMinorTech(g)} — ${displayGodName(g.name)} (${g.culture})` : canonicalMinorTech(t);
    })])),
  };
  els.configPreview.textContent = JSON.stringify(friendly, null, 2);
}

function wireEvents() {
  els.baseMajor.addEventListener("change", () => { initGreekSpecificSelects(true); initChineseSpecificSelects(true); initAztecSpecificSelects(true); initGodPowerSelect(true); initUniqueTechSelects(true); initBonusSelects(true); refreshMinorOptions(true); });
  els.sameCultureOnly.addEventListener("change", () => refreshMinorOptions(true));
  els.displayName.addEventListener("input", updatePreview);
  els.iconFile.addEventListener("change", updatePreview);
  els.godPower.addEventListener("change", () => { initUniqueTechSelects(true); updatePreview(); });
  for (const select of [els.greekHeroArchaic, els.greekHeroClassical, els.greekHeroHeroic, els.greekHeroMythic, els.greekUniqueUnit, els.chineseMythicHero, els.aztecClassicalForm, els.aztecMythicArrival]) {
    if (select) select.addEventListener("change", updatePreview);
  }
  els.uniqueTech1.addEventListener("change", (event) => { enforceUniqueTechDifference(event.target); enforceChannelsGaiaLushBonusLock(); updatePreview(); });
  if (els.bonusPickers) els.bonusPickers.addEventListener("change", (event) => { enforceBonusDifference(event.target); enforceChannelsGaiaLushBonusLock(); updatePreview(); });
  els.minorPickers.addEventListener("change", (event) => { enforceMinorDifference(event.target); updatePreview(); });
  els.downloadZip.addEventListener("click", handleDownload);
  els.savePreset.addEventListener("click", () => { localStorage.setItem("aomCivCreatorPreset", JSON.stringify(presetFromForm())); setMessage("Preset saved in this browser."); });
  els.loadPreset.addEventListener("click", () => { const raw = localStorage.getItem("aomCivCreatorPreset"); if (!raw) return setMessage("No local preset found.", true); applyPreset(JSON.parse(raw)); setMessage("Preset loaded."); });
  els.exportPreset.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(presetFromForm(), null, 2)], { type: "application/json" });
    downloadBlob(blob, `${getConfig().internalName}-preset.json`);
  });
}

initMajorSelect();
initGreekSpecificSelects(false);
initChineseSpecificSelects(false);
initAztecSpecificSelects(false);
initGodPowerSelect(false);
initUniqueTechSelects(false);
initBonusSelects(false);
initMinorPickers();
wireEvents();
updatePreview();
