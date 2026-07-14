/* AoM:R Major God Builder
   This is intentionally backend-free. All files are generated locally in the browser. */

const AGES = ["ClassicalAge", "HeroicAge", "MythicAge"];
const PREVIEW_AGES = ["ArchaicAge", ...AGES];
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
  loadPreset: $("loadPreset"),
  presetFile: $("presetFile"),
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
  return displayGodName(god.name);
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
    const opt = document.createElement("option");
    opt.value = culture;
    opt.textContent = culture;
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

  for (const entry of options) {
    const opt = document.createElement("option");
    opt.value = entry.power;
    opt.dataset.pantheon = entry.culture;
    opt.textContent = `${entry.culture} - ${displayTechName(entry.power)}`;
    els.godPower.appendChild(opt);
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
    .sort((a, b) => a.sourcePantheon.localeCompare(b.sourcePantheon) || dynamicBonusLabel(a, pantheon).localeCompare(dynamicBonusLabel(b, pantheon)));
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
  if (!entry) return "None";
  return `${entry.sourcePantheon} - ${dynamicBonusLabel(entry, pantheon)}`;
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
        opt.textContent = dynamicBonusLabel(entry, pantheon);
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
      return g.culture === base.culture;
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
    const allowedIconExts = new Set(["png", "jpg", "jpeg"]);
    const ext = icon.name.split(".").pop().toLowerCase();
    if (!allowedIconExts.has(ext)) errors.push("Icon must be PNG or JPEG.");
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
  const archaicUnits = uniqueList([
    ...(config.baseCulture === "Greek" && config.greekUniqueUnit ? [config.greekUniqueUnit] : []),
    ...godPickerArchaicBonusUnits(config)
  ]);
  const archaicPowers = godPickerArchaicBonusPowers(config);
  const archaicBlock = godPickerArchaicPowerBlock(config.godPower, uniqueTechNames(config), archaicUnits, archaicPowers);
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
${AGES.map((age) => generateGodPickerAge(age, config.minorGods[age], config)).join("\n")}
    </local:GodPickerPageBase.Ages>
</local:GodPickerPageBase>
`;
}

function godPickerArchaicPowerBlock(power, uniqueTechs = [], units = [], powers = []) {
  const unitNodes = units.map((unit) => `        <techTree:TechTreeNode Unit="${escapeXml(unit)}" />`).join("\n");
  const powerNodes = powers.map((bonusPower) => `        <techTree:TechTreeNode Power="${escapeXml(bonusPower)}" />`).join("\n");
  const techNodes = uniqueTechs.map((tech) => `        <techTree:TechTreeNode Tech="${escapeXml(tech)}" />`).join("\n");
  const extraNodes = [powerNodes, unitNodes, techNodes].filter(Boolean).join("\n");
  return `<techTree:TechTreeAge AgeName="ArchaicAge">
    <techTree:TechTreeAge.Technologies>
        <techTree:TechTreeNode Power="${escapeXml(power)}" />${extraNodes ? "\n" + extraNodes : ""}
    </techTree:TechTreeAge.Technologies>
</techTree:TechTreeAge>`;
}


function uniqueList(items) {
  return Array.from(new Set((items || []).filter(Boolean)));
}

function selectedHasBonusId(config, id) {
  return selectedBonusEntries(config).some((entry) => entry.id === id);
}

function godPickerArchaicBonusUnits(config) {
  const units = [];
  if (selectedHasBonusId(config, "bonus_6")) units.push("HadesShade");
  if (selectedHasBonusId(config, "bonus_56") || selectedHasBonusLabel(config, ORANOS_SKY_PASSAGE_BONUS_LABEL)) units.push("SkyPassage");
  if (selectedHasBonusId(config, "bonus_31") || selectedHasBonusLabel(config, SET_ANIMALS_BONUS_LABEL)) units.push("BaboonOfSet");
  if (selectedHasBonusId(config, "bonus_15")) units.push("Hippocampus");
  if (selectedHasBonusId(config, "bonus_11") || selectedHasBonusLabel(config, POSEIDON_MILITIA_BONUS_LABEL)) units.push("Militia");
  if (selectedHasBonusId(config, "bonus_42") || selectedHasBonusLabel(config, ODIN_RAVEN_SCOUTS_BONUS_LABEL)) units.push("Raven");
  if (selectedHasBonusId(config, "bonus_36") || selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL)) units.push("DwarvenArmory");
  return units;
}

function godPickerArchaicBonusPowers(config) {
  const powers = [];
  if (selectedHasBonusId(config, "bonus_63")) powers.push("YinAndYangTechree");
  if (selectedHasBonusId(config, "bonus_67") || selectedHasBonusLabel(config, NUWA_CREATORS_AUSPICE_BONUS_LABEL)) powers.push("ShieldBlessingTechree");
  if (selectedHasBonusId(config, "bonus_71") || selectedHasBonusLabel(config, SHENNONG_GIFT_OF_BEASTS_BONUS_LABEL)) powers.push("SpawnRewardTechree");
  if (selectedHasBonusId(config, "bonus_75")) powers.push("BushidoAmaterasu");
  if (selectedHasBonusId(config, "bonus_83")) powers.push("BushidoSusanoo");
  if (selectedHasBonusId(config, "bonus_79")) powers.push("BushidoTsukuyomi");
  return uniqueList(powers);
}

function lookupTemplateBlock(map, key) {
  if (!map || !key) return "";
  if (map[key]) return map[key];
  const lowerKey = String(key).toLowerCase();
  const foundKey = Object.keys(map).find((candidate) => candidate.toLowerCase() === lowerKey);
  return foundKey ? map[foundKey] : "";
}

function applyCustomTechNamesToUiBlock(block, config) {
  let out = String(block || "");
  if (config && selectedHasUniqueTechId(config, "SkinOfTheRhino")) {
    out = out.replace(/SkinOfTheRhino(?:[A-Za-z0-9_]+)?/g, skinOfTheRhinoCustomTechName(config));
  }
  if (config && selectedHasUniqueTechId(config, "TemporalChaos")) {
    out = out.replace(/TemporalChaos(?:[A-Za-z0-9_]+)?/g, temporalChaosCustomTechName(config));
  }
  if (config && hasGreekHeraMinorGod(config)) {
    out = out.replace(/ArgivePatronage(?:Zeus|Poseidon|Hades|Demeter|[A-Za-z0-9_]+)/g, argivePatronageCustomTechName(config));
  }
  return out;
}

function godPickerBonusTrack(tech, config) {
  const templates = window.AOM_GODPICKER || {};
  const canonical = canonicalMinorTech(tech);
  const block = lookupTemplateBlock(templates.bonusTrackByGod, canonical);
  if (block) return applyCustomTechNamesToUiBlock(block, config);
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

function generateGodPickerAge(age, techs, config) {
  return `        <techTree:TechTreeAge AgeName="${age}">
            <techTree:TechTreeAge.Bonuses>
${techs.map((tech) => indentBlock(godPickerBonusTrack(tech, config), 4)).join("\n\n")}
            </techTree:TechTreeAge.Bonuses>
        </techTree:TechTreeAge>`;
}

function generateTechTreeXaml(config) {
  if (config?.baseCulture === "Greek") {
    config._greekTechTreeGroupStarts = buildGreekTechTreeGroupStarts(config);
  } else if (config?.baseCulture === "Egyptian") {
    config._egyptianTechTreeGroupStarts = buildEgyptianTechTreeGroupStarts(config);
  } else if (config?.baseCulture === "Norse") {
    config._norseTechTreeGroupStarts = buildNorseTechTreeGroupStarts(config);
  } else if (config?.baseCulture === "Atlantean") {
    config._atlanteanTechTreeGroupStarts = buildAtlanteanTechTreeGroupStarts(config);
  } else if (config?.baseCulture === "Chinese") {
    config._chineseTechTreeGroupStarts = buildChineseTechTreeGroupStarts(config);
  } else if (config?.baseCulture === "Japanese") {
    config._japaneseTechTreeGroupStarts = buildJapaneseTechTreeGroupStarts(config);
  } else if (config?.baseCulture === "Aztec") {
    config._aztecTechTreeGroupStarts = buildAztecTechTreeGroupStarts(config);
  }
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
${indentBlock(techTreeArchaicAgeBlock(config), 2)}
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

function techTreeArchaicBonusTrack(config) {
  const greekUniqueUnits = config.baseCulture === "Greek" && config.greekUniqueUnit ? [config.greekUniqueUnit] : [];
  const otherUnits = godPickerArchaicBonusUnits(config);
  const powerNodes = godPickerArchaicBonusPowers(config)
    .map((power) => `                        <local:TechTreeNode Power="${escapeXml(power)}" />`);
  const unitNodes = uniqueList([...greekUniqueUnits, ...otherUnits])
    .map((unit) => `                        <local:TechTreeNode Unit="${escapeXml(unit)}" />`);
  const techNodes = uniqueTechNames(config)
    .map((tech) => `                        <local:TechTreeNode Tech="${escapeXml(tech)}" />`);
  const nodes = [
    `                        <local:TechTreeNode Power="${escapeXml(config.godPower)}" />`,
    ...powerNodes,
    ...unitNodes,
    ...techNodes
  ].join("\n");
  return `<local:TechTreeAge.Bonuses>
                <local:TechTreeBonusTrack>
                    <local:TechTreeBonusTrack.Technologies>
${nodes}
                    </local:TechTreeBonusTrack.Technologies>
                </local:TechTreeBonusTrack>
            </local:TechTreeAge.Bonuses>`;
}

function replaceXmlPropertyBlock(block, propertyName, replacement) {
  const source = String(block || "");
  const pattern = new RegExp(`<local:TechTreeAge\\.${propertyName}>[\\s\\S]*?<\\/local:TechTreeAge\\.${propertyName}>`);
  if (pattern.test(source)) return source.replace(pattern, replacement);
  const closing = /\n\s*<\/local:TechTreeAge>\s*$/;
  if (closing.test(source)) {
    return source.replace(closing, `\n${replacement}\n        </local:TechTreeAge>`);
  }
  return source;
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function extractXmlPropertyBlock(block, propertyName) {
  const source = String(block || "");
  const pattern = new RegExp(`<local:TechTreeAge\\.${propertyName}>[\\s\\S]*?<\\/local:TechTreeAge\\.${propertyName}>`);
  const match = source.match(pattern);
  return match ? match[0] : "";
}

function techTreeArchaicAgeBlock(config) {
  const templates = window.AOM_TECHTREE || {};
  let block = lookupTemplateBlock(templates.archaicByMajor, config.uiTemplateMajor)
    || `<local:TechTreeAge AgeName="ArchaicAge">
${techTreeArchaicBonusTrack(config)}
${techTreeAgeTechnologiesBlock(config.uiTemplateMajor, "ArchaicAge")}
        </local:TechTreeAge>`;
  block = replaceXmlPropertyBlock(block, "Bonuses", techTreeArchaicBonusTrack(config));
  const dynamicGreekTechnologies = generateGreekDynamicTechTreeTechnologies("ArchaicAge", config);
  const dynamicEgyptianTechnologies = generateEgyptianDynamicTechTreeTechnologies("ArchaicAge", config);
  const dynamicNorseTechnologies = generateNorseDynamicTechTreeTechnologies("ArchaicAge", config);
  const dynamicAtlanteanTechnologies = generateAtlanteanDynamicTechTreeTechnologies("ArchaicAge", config);
  const dynamicChineseTechnologies = generateChineseDynamicTechTreeTechnologies("ArchaicAge", config);
  const dynamicJapaneseTechnologies = generateJapaneseDynamicTechTreeTechnologies("ArchaicAge", config);
  const dynamicAztecTechnologies = generateAztecDynamicTechTreeTechnologies("ArchaicAge", config);
  if (dynamicGreekTechnologies) {
    block = replaceXmlPropertyBlock(block, "Technologies", dynamicGreekTechnologies);
  } else if (dynamicEgyptianTechnologies) {
    block = replaceXmlPropertyBlock(block, "Technologies", dynamicEgyptianTechnologies);
  } else if (dynamicNorseTechnologies) {
    block = replaceXmlPropertyBlock(block, "Technologies", dynamicNorseTechnologies);
  } else if (dynamicAtlanteanTechnologies) {
    block = replaceXmlPropertyBlock(block, "Technologies", dynamicAtlanteanTechnologies);
  } else if (dynamicChineseTechnologies) {
    block = replaceXmlPropertyBlock(block, "Technologies", dynamicChineseTechnologies);
  } else if (dynamicJapaneseTechnologies) {
    block = replaceXmlPropertyBlock(block, "Technologies", dynamicJapaneseTechnologies);
  } else if (dynamicAztecTechnologies) {
    block = replaceXmlPropertyBlock(block, "Technologies", dynamicAztecTechnologies);
  } else {
    const technologies = extractXmlPropertyBlock(block, "Technologies");
    if (technologies) {
      block = replaceXmlPropertyBlock(block, "Technologies", applyTechTreeRightSideSelectionFixes(technologies, "ArchaicAge", config));
    }
  }
  return applyCustomTechNamesToUiBlock(block, config);
}

function techTreeAgeTechnologiesBlock(sourceMajor, age, config = null) {
  if (config?.baseCulture === "Greek") {
    const dynamicGreek = generateGreekDynamicTechTreeTechnologies(age, config);
    if (dynamicGreek) return dynamicGreek;
  }
  if (config?.baseCulture === "Egyptian") {
    const dynamicEgyptian = generateEgyptianDynamicTechTreeTechnologies(age, config);
    if (dynamicEgyptian) return dynamicEgyptian;
  }
  if (config?.baseCulture === "Norse") {
    const dynamicNorse = generateNorseDynamicTechTreeTechnologies(age, config);
    if (dynamicNorse) return dynamicNorse;
  }
  if (config?.baseCulture === "Atlantean") {
    const dynamicAtlantean = generateAtlanteanDynamicTechTreeTechnologies(age, config);
    if (dynamicAtlantean) return dynamicAtlantean;
  }
  if (config?.baseCulture === "Chinese") {
    const dynamicChinese = generateChineseDynamicTechTreeTechnologies(age, config);
    if (dynamicChinese) return dynamicChinese;
  }
  if (config?.baseCulture === "Japanese") {
    const dynamicJapanese = generateJapaneseDynamicTechTreeTechnologies(age, config);
    if (dynamicJapanese) return dynamicJapanese;
  }
  if (config?.baseCulture === "Aztec") {
    const dynamicAztec = generateAztecDynamicTechTreeTechnologies(age, config);
    if (dynamicAztec) return dynamicAztec;
  }
  const templates = window.AOM_TECHTREE || {};
  let block = templates.ageTechnologiesByMajorAge?.[`${sourceMajor}|${age}`] || "";
  if (config) block = adjustTechTreeAgeTechnologiesForSelections(block, age, config);
  return applyCustomTechNamesToUiBlock(block, config || {});
}

function majorCultureName(majorName) {
  const major = (window.AOM_DATA?.majors || []).find((entry) => entry.name === majorName);
  return major?.culture || "";
}

function techTreeMajorCandidatesForCulture(culture) {
  return (window.AOM_DATA?.majors || [])
    .filter((entry) => entry.culture === culture)
    .map((entry) => entry.name)
    .filter((name) => window.AOM_TECHTREE?.ageTechnologiesByMajorAge?.[`${name}|ClassicalAge`] || window.AOM_TECHTREE?.archaicByMajor?.[name]);
}

function techTreeAgeContainsMinor(major, age, minorTech) {
  const block = window.AOM_TECHTREE?.bonusTrackByGod?.[canonicalMinorTech(minorTech)] || "";
  const bonusUnits = Array.from(block.matchAll(/<local:TechTreeNode\s+Unit="([^"]+)"\s*\/?/g)).map((m) => m[1]);
  const bonusTechs = Array.from(block.matchAll(/<local:TechTreeNode\s+Tech="([^"]+)"\s*\/?/g)).map((m) => m[1]);
  const haystack = window.AOM_TECHTREE?.ageTechnologiesByMajorAge?.[`${major}|${age}`] || "";
  return [...bonusUnits, ...bonusTechs].some((token) => haystack.includes(`="${token}"`));
}

function bestTechTreeMajorForSelectedAge(age, config) {
  const selected = config.minorGods?.[age] || [];
  if (!selected.length) return config.uiTemplateMajor;
  const candidates = techTreeMajorCandidatesForCulture(config.baseCulture);
  const exact = candidates.find((major) => selected.every((minor) => techTreeAgeContainsMinor(major, age, minor)));
  if (exact) return exact;
  const partial = candidates
    .map((major) => ({ major, score: selected.filter((minor) => techTreeAgeContainsMinor(major, age, minor)).length }))
    .sort((a, b) => b.score - a.score)[0];
  return partial?.score ? partial.major : config.uiTemplateMajor;
}

function replaceTechTreeUnitNodeUnits(block, replacements) {
  let out = String(block || "");
  for (const [from, to] of Object.entries(replacements || {})) {
    if (!from || !to || from === to) continue;
    const re = new RegExp(`(<local:TechTreeNode\\s+Unit=")${escapeRegExp(from)}("[\\s/>])`, "g");
    out = out.replace(re, `$1${to}$2`);
  }
  return out;
}

function greekHeroReplacementMap(config) {
  if (config.baseCulture !== "Greek") return {};
  const selected = config.greekHeroes || {};
  const replacements = {};
  for (const [ageKey, pool] of Object.entries(GREEK_HERO_POOLS)) {
    const chosen = pool.includes(selected[ageKey]) ? selected[ageKey] : pool[0];
    for (const hero of pool) replacements[hero] = chosen;
  }
  return replacements;
}

const TECHTREE_STANDARD_VILLAGER_BY_CULTURE = {
  Greek: "VillagerGreek",
  Egyptian: "VillagerEgyptian",
  Norse: "VillagerNorse",
  Atlantean: "VillagerAtlantean",
  Chinese: "VillagerChinese",
  Japanese: "VillagerJapanese",
  Aztec: "VillagerAztec",
};

const TECHTREE_DROPOFF_PARENT_BY_CULTURE = {
  Greek: "Granary",
  Egyptian: "Granary",
  Norse: "OxCartBuilding",
  Atlantean: "EconomicGuild",
  Chinese: "Silo",
  Japanese: "Watermill",
  Aztec: "Calpulli",
};

const TECHTREE_VAULTS_PARENT_BY_CULTURE = {
  Greek: "Storehouse",
  Egyptian: "MiningCamp",
  Norse: "OxCartBuilding",
  Atlantean: "EconomicGuild",
  Chinese: "Silo",
  Japanese: "MiningCampJapanese",
  Aztec: "Calpulli",
};

function techTreeHasTechNode(block, techName) {
  if (!techName) return false;
  return new RegExp(`<local:TechTreeNode\\s+Tech="${escapeRegExp(techName)}"`).test(String(block || ""));
}

function techTreeInsertBeforeClosingTechnologies(block, nodeXml) {
  const marker = "</local:TechTreeAge.Technologies>";
  const source = String(block || "");
  if (!source.includes(marker)) return source;
  return source.replace(marker, `${nodeXml}\n            ${marker}`);
}

function techTreeOccupiedPositions(block) {
  const occupied = new Set();
  const re = /<local:TechTreeNode\b[^>]*\bPosition="(\d+),(\d+)"/g;
  let match;
  while ((match = re.exec(String(block || "")))) {
    occupied.add(`${match[1]},${match[2]}`);
  }
  return occupied;
}

function techTreeFindFreePosition(block, preferred, fallbackX = 18) {
  const occupied = techTreeOccupiedPositions(block);
  const candidates = (preferred || []).filter(Boolean);
  for (const pos of candidates) {
    if (!occupied.has(pos)) return pos;
  }
  for (let x = fallbackX; x < fallbackX + 12; x += 1) {
    for (const y of [0, 1]) {
      const pos = `${x},${y}`;
      if (!occupied.has(pos)) return pos;
    }
  }
  return `${fallbackX},1`;
}

function techTreeNodeExistsForTechParent(block, techName, parent) {
  if (!techName || !parent) return false;
  const source = String(block || "");
  const re = new RegExp(`<local:TechTreeNode\\s+Tech="${escapeRegExp(techName)}"[^>]*\\bParent="${escapeRegExp(parent)}"`);
  return re.test(source);
}

function techTreeUnitNodePosition(block, unitName) {
  if (!unitName) return null;
  const re = new RegExp(`<local:TechTreeNode\\s+Unit="${escapeRegExp(unitName)}"[^>]*\\bPosition="(\\d+),(\\d+)"`);
  const match = String(block || "").match(re);
  return match ? { x: Number(match[1]), y: Number(match[2]) } : null;
}

function techTreeParentPreferredPositions(block, parent, fallback) {
  const parentPos = techTreeUnitNodePosition(block, parent);
  if (!parentPos) return fallback || [];
  const x = parentPos.x;
  return [
    ...(fallback || []),
    `${x + 1},0`, `${x + 1},1`,
    `${x + 2},0`, `${x + 2},1`
  ];
}

function selectedUniqueTechGroup(config) {
  const selectedGroups = uniqueTechEntries(config);
  if (selectedGroups.length) return selectedGroups[0];

  // Fallback for legacy presets/outputs that may already contain generated custom names
  // such as SkinOfTheRhino<CustomGod> or TemporalChaos<CustomGod>.
  const ids = new Set([...(config?.uniqueTechs || []), ...uniqueTechNames(config)]);
  return UNIQUE_TECH_GROUPS.find((group) => {
    if (ids.has(group.id) || (group.techs || []).some((tech) => ids.has(tech))) return true;
    if (group.id === "SkinOfTheRhino") return [...ids].some((id) => String(id).startsWith("SkinOfTheRhino"));
    if (group.id === "TemporalChaos") return [...ids].some((id) => String(id).startsWith("TemporalChaos"));
    return false;
  }) || null;
}

function selectedUniqueTechRightSideName(config, group) {
  if (!group) return "";
  if (group.id === "SkinOfTheRhino") return skinOfTheRhinoCustomTechName(config);
  if (group.id === "TemporalChaos") return temporalChaosCustomTechName(config);
  return group.techs?.[0] || group.id;
}

function uniqueTechRightSideNodeSpecs(config, block, group) {
  if (!group) return [];
  const culture = config.baseCulture;
  const tech = selectedUniqueTechRightSideName(config, group);
  const dropoff = TECHTREE_DROPOFF_PARENT_BY_CULTURE[culture] || "TownCenter";
  const vaultsParent = TECHTREE_VAULTS_PARENT_BY_CULTURE[culture] || dropoff;
  const standardVillager = TECHTREE_STANDARD_VILLAGER_BY_CULTURE[culture] || "AbstractVillager";
  const specs = [];
  const add = (parent, preferred, fallbackX = 18) => {
    if (!parent) return;
    specs.push({ tech, parent, preferred, fallbackX });
  };

  switch (group.id) {
    case "OlympianParentage":
      if (culture === "Greek") {
        add("Temple", ["17,1"], 17);
        add("Fortress", ["45,1"], 45);
      } else {
        add("Temple", ["17,1", "18,1", "19,1"], 17);
      }
      break;
    case "VaultsOfErebus":
      add(vaultsParent, culture === "Japanese" ? ["7,1", "8,1", "6,1"] : ["6,1", "7,1", "8,1"], 6);
      break;
    case "LordOfHorses":
      if (culture === "Greek") add("Stable", ["40,0"], 40);
      else if (culture === "Japanese") add("StableJapanese", ["48,0", "48,1", "49,0"], 48);
      else add("Temple", ["18,1", "19,1", "20,1"], 18);
      break;
    case "DivineLabor":
      add(dropoff, ["9,1", "8,1", "7,1"], 8);
      break;
    case "SkinOfTheRhino":
      add(standardVillager, ["2,1", "3,1", "4,1"], 2);
      break;
    case "FloodOfTheNile":
      add(dropoff, ["10,1", "9,1", "8,1"], 9);
      break;
    case "Clairvoyance":
      add("Temple", ["22,0", "21,1", "22,1"], 21);
      break;
    case "EyesInTheForest":
      add("Temple", ["19,1", "20,1", "21,1"], 19);
      break;
    case "FreyrsGift":
      add("TownCenter", ["2,0", "2,1", "3,1"], 2);
      break;
    case "TemporalChaos":
    case "EmpyreanSpeed":
    case "Channels":
      add("Temple", ["18,1", "19,1", "20,1"], 18);
      break;
    case "CelestialWeapons":
      add("Armory", ["28,0", "28,1", "29,0"], 28);
      if (culture === "Chinese") add("ImperialAcademy", ["44,0", "44,1", "45,0"], 44);
      break;
    case "TaiChi":
      add(culture === "Chinese" ? "ImperialAcademy" : "Temple", culture === "Chinese" ? ["45,0", "45,1", "46,0"] : ["19,1", "20,1", "21,1"], culture === "Chinese" ? 45 : 19);
      break;
    case "KuafuChieftain":
      add("TownCenter", ["1,0", "2,0", "2,1"], 1);
      break;
    case "PeachOfImmortality":
      add(culture === "Chinese" ? "ImperialAcademy" : "Temple", culture === "Chinese" ? ["47,0", "47,1", "48,0"] : ["20,1", "21,1", "22,1"], culture === "Chinese" ? 47 : 20);
      break;
    case "HerbalMedicine":
      if (culture === "Chinese") add("ImperialAcademy", ["46,0", "46,1", "47,0"], 46);
      break;
    case "Tenshu":
      add("SentryTower", ["26,0", "26,1", "25,1"], 25);
      if (culture === "Japanese") add("Castle", ["52,0", "52,1", "51,0"], 52);
      break;
    case "CrushingWaves":
      add("Temple", ["20,1", "21,1", "22,1"], 20);
      break;
    case "FeastOfTlaxochimaco":
      add("Temple", ["18,1", "19,1", "20,1"], 18);
      break;
    default:
      break;
  }

  return specs.map((spec) => {
    // Greek right-side techtree is lane-packed after insertion, so keep the
    // source/preferred coordinate and let the lane packer resolve collisions.
    // This prevents villager techs such as Skin of the Rhino from jumping onto
    // row 0 just because another old template node temporarily occupies row 1.
    if (culture === "Greek" || culture === "Egyptian" || culture === "Norse" || culture === "Atlantean" || culture === "Chinese" || culture === "Japanese") {
      return { ...spec, position: spec.preferred?.[0] || `${spec.fallbackX || 18},1` };
    }
    const preferred = techTreeParentPreferredPositions(block, spec.parent, spec.preferred);
    const position = techTreeFindFreePosition(block, preferred, spec.fallbackX);
    return { ...spec, position };
  });
}

function removeTechTreeNodesForTechNames(block, techNames) {
  let out = String(block || "");
  for (const name of uniqueList(techNames || [])) {
    if (!name) continue;
    const re = new RegExp(`\n?\s*<local:TechTreeNode\s+Tech="${escapeRegExp(name)}"[^>]*\/?>`, "g");
    out = out.replace(re, "");
  }
  return out;
}

function addSelectedUniqueTechRightSideNodes(block, config) {
  const group = selectedUniqueTechGroup(config);
  if (!group) return block;
  let out = String(block || "");
  const tech = selectedUniqueTechRightSideName(config, group);
  if (!tech) return out;
  const namesToReplace = uniqueList([tech, group.id, ...(group.techs || [])]);
  out = removeTechTreeNodesForTechNames(out, namesToReplace);
  for (const spec of uniqueTechRightSideNodeSpecs(config, out, group)) {
    if (techTreeNodeExistsForTechParent(out, tech, spec.parent)) continue;
    const node = `                <local:TechTreeNode Tech="${escapeXml(tech)}" Position="${escapeXml(spec.position)}" Parent="${escapeXml(spec.parent)}"/>`;
    out = techTreeInsertBeforeClosingTechnologies(out, node);
  }
  return out;
}


const GREEK_TECHTREE_MAJOR_SOURCES = ["Zeus", "Poseidon", "Hades", "Demeter"];
const GREEK_TECHTREE_MINOR_BY_AGE = {
  ClassicalAge: ["ClassicalAgeAres", "ClassicalAgeAthena", "ClassicalAgeHermes", "ClassicalAgePan"],
  HeroicAge: ["HeroicAgeAphrodite", "HeroicAgeApollo", "HeroicAgeDionysus", "HeroicAgeHestia"],
  MythicAge: ["MythicAgeArtemis", "MythicAgeHephaestus", "MythicAgeHera", "MythicAgePersephone"],
};

function parseTechTreeNodeAttributes(attrText) {
  const attrs = {};
  String(attrText || "").replace(/([\w:.-]+)="([^"]*)"/g, (_, key, value) => {
    attrs[key] = value;
    return "";
  });
  return attrs;
}

function parseTechTreeNodesFromBlock(block) {
  const rawNodes = [];
  const source = String(block || "");
  const re = /<local:TechTreeNode\s+([^>]*?)\s*\/>/g;
  let match;
  while ((match = re.exec(source))) {
    const attrs = parseTechTreeNodeAttributes(match[1]);
    const type = attrs.Unit ? "Unit" : attrs.Tech ? "Tech" : attrs.Power ? "Power" : "";
    const name = attrs[type] || "";
    if (!type || !name) continue;
    rawNodes.push({ attrs, type, name });
  }

  // Some vanilla TechTree nodes use UniqueIdentifier / UniqueParent instead of
  // Parent, especially when the same upgrade line exists from more than one
  // building. Keep those IDs for output, but resolve UniqueParent internally so
  // the dynamic placer can still line parent/child nodes up in the same column.
  const uniqueIdToName = new Map();
  for (const node of rawNodes) {
    if (node.attrs.UniqueIdentifier) uniqueIdToName.set(node.attrs.UniqueIdentifier, node.name);
  }

  return rawNodes.map(({ attrs, type, name }) => {
    const position = attrs.Position || "";
    const [xRaw, yRaw] = position.split(",");
    const uniqueParent = attrs.UniqueParent || "";
    const resolvedParent = attrs.Parent || (uniqueParent ? uniqueIdToName.get(uniqueParent) || "" : "");
    return {
      type,
      name,
      parent: resolvedParent,
      uniqueParent,
      uniqueIdentifier: attrs.UniqueIdentifier || "",
      position,
      x: Number.isFinite(Number(xRaw)) ? Number(xRaw) : 99,
      y: Number.isFinite(Number(yRaw)) ? Number(yRaw) : 1,
      attrs,
    };
  });
}

function techTreeNodeKey(node) {
  return `${node.type}|${node.name}|${node.uniqueParent || node.parent || ""}|${node.uniqueIdentifier || ""}`;
}

function techTreeNodeParentLookupKey(node) {
  return node?.uniqueParent || node?.parent || "";
}

function techTreeNodePlacementKeys(node) {
  const keys = [];
  if (node?.name) keys.push(node.name);
  if (node?.uniqueIdentifier) keys.push(node.uniqueIdentifier);
  return keys;
}

function techTreeParentFirstOrder(sortedNodes, isGroupRootNode = null) {
  const remaining = (sortedNodes || []).slice();
  const ordered = [];
  const placedNames = new Set();
  const allNames = new Set();
  for (const node of remaining) {
    for (const key of techTreeNodePlacementKeys(node)) allNames.add(key);
  }
  let guard = 0;
  while (remaining.length && guard < 1024) {
    guard += 1;
    let moved = false;
    for (let i = 0; i < remaining.length; i += 1) {
      const node = remaining[i];
      const parent = techTreeNodeParentLookupKey(node);
      const isRoot = typeof isGroupRootNode === "function" && isGroupRootNode(node);
      if (!parent || isRoot || !allNames.has(parent) || placedNames.has(parent)) {
        ordered.push(node);
        for (const key of techTreeNodePlacementKeys(node)) placedNames.add(key);
        remaining.splice(i, 1);
        i -= 1;
        moved = true;
      }
    }
    if (!moved) {
      const node = remaining.shift();
      ordered.push(node);
      for (const key of techTreeNodePlacementKeys(node)) placedNames.add(key);
    }
  }
  return ordered.concat(remaining);
}


function techTreeParentDepthFirstOrder(sortedNodes, isGroupRootNode = null) {
  const nodes = (sortedNodes || []).slice();
  const childrenByParent = new Map();
  const roots = [];
  const allPlacementKeys = new Set();
  for (const node of nodes) {
    for (const key of techTreeNodePlacementKeys(node)) allPlacementKeys.add(key);
  }
  for (const node of nodes) {
    const parent = techTreeNodeParentLookupKey(node);
    const isRoot = typeof isGroupRootNode === "function" && isGroupRootNode(node);
    if (!parent || isRoot) {
      roots.push(node);
      continue;
    }
    if (!childrenByParent.has(parent)) childrenByParent.set(parent, []);
    childrenByParent.get(parent).push(node);
  }
  const emitted = new Set();
  const ordered = [];
  const emit = (node) => {
    const key = techTreeNodeKey(node);
    if (emitted.has(key)) return;
    emitted.add(key);
    ordered.push(node);
    for (const placementKey of techTreeNodePlacementKeys(node)) {
      const children = childrenByParent.get(placementKey) || [];
      for (const child of children) emit(child);
    }
  };
  for (const node of nodes) {
    const parent = techTreeNodeParentLookupKey(node);
    const isRoot = typeof isGroupRootNode === "function" && isGroupRootNode(node);
    if (isRoot || !parent || !allPlacementKeys.has(parent)) emit(node);
  }
  for (const node of nodes) emit(node);
  return ordered;
}

function greekPreferredNodeKey(node) {
  return techTreeNodeKey(node || {});
}

function buildTechTreeNodeXml(node, indent = "                ") {
  const typeAttr = node.type === "Unit" ? "Unit" : node.type === "Tech" ? "Tech" : "Power";
  const attrs = [`${typeAttr}="${escapeXml(node.name)}"`];
  if (node.position) attrs.push(`Position="${escapeXml(node.position)}"`);
  if (node.uniqueParent) attrs.push(`UniqueParent="${escapeXml(node.uniqueParent)}"`);
  else if (node.parent) attrs.push(`Parent="${escapeXml(node.parent)}"`);
  if (node.uniqueIdentifier) attrs.push(`UniqueIdentifier="${escapeXml(node.uniqueIdentifier)}"`);
  return `${indent}<local:TechTreeNode ${attrs.join(" ")}/>`;
}

function greekTechTreeSourceNodes(age) {
  const templates = window.AOM_TECHTREE || {};
  const byMajor = {};
  for (const major of GREEK_TECHTREE_MAJOR_SOURCES) {
    const block = age === "ArchaicAge"
      ? extractXmlPropertyBlock(lookupTemplateBlock(templates.archaicByMajor, major) || "", "Technologies")
      : templates.ageTechnologiesByMajorAge?.[`${major}|${age}`] || "";
    byMajor[major] = parseTechTreeNodesFromBlock(block);
  }
  return byMajor;
}

function greekMinorBonusTokens(minorTech) {
  const block = window.AOM_TECHTREE?.bonusTrackByGod?.[canonicalMinorTech(minorTech)] || "";
  return parseTechTreeNodesFromBlock(block).filter((node) => node.type === "Unit" || node.type === "Tech");
}

function greekAllConditionalNodeNames() {
  const names = new Set();
  Object.values(GREEK_HERO_POOLS || {}).flat().forEach((name) => names.add(name));
  ["Myrmidon", "Gastraphetoros", "Hetairos", "AmazonArcher"].forEach((name) => names.add(name));
  (UNIQUE_TECH_GROUPS || []).forEach((group) => {
    names.add(group.id);
    (group.techs || []).forEach((tech) => names.add(tech));
  });
  Object.values(GREEK_TECHTREE_MINOR_BY_AGE).flat().forEach((minor) => {
    greekMinorBonusTokens(minor).forEach((node) => names.add(node.name));
  });
  return names;
}

function chooseGreekRepresentativeNode(nodes) {
  return [...nodes].sort((a, b) => (a.x - b.x) || (a.y - b.y) || String(a.parent).localeCompare(String(b.parent)))[0];
}

function greekCommonNodesForAge(age) {
  const byMajor = greekTechTreeSourceNodes(age);
  const excluded = greekAllConditionalNodeNames();
  const keySets = Object.fromEntries(Object.entries(byMajor).map(([major, nodes]) => [major, new Set(nodes.map(techTreeNodeKey))]));
  const allKeys = [...(keySets.Zeus || new Set())];
  const commonKeys = allKeys.filter((key) => GREEK_TECHTREE_MAJOR_SOURCES.every((major) => keySets[major]?.has(key)));
  const sourceNodes = Object.values(byMajor).flat();
  const result = [];
  for (const key of commonKeys) {
    const matches = sourceNodes.filter((node) => techTreeNodeKey(node) === key);
    const rep = chooseGreekRepresentativeNode(matches);
    if (!rep || excluded.has(rep.name)) continue;
    result.push({ ...rep });
  }
  return result;
}

function greekFindRightSideNodesForToken(age, tokenNode) {
  const byMajor = greekTechTreeSourceNodes(age);
  const matches = Object.values(byMajor).flat().filter((node) => node.type === tokenNode.type && node.name === tokenNode.name);
  if (!matches.length) return [];
  const byKey = new Map();
  for (const node of matches) {
    const key = techTreeNodeKey(node);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(node);
  }
  // Some Greek minor-god techs/units intentionally appear from multiple
  // buildings (for example Pan's Pioneers can be shown from both food drop-off
  // buildings, and fortress content can have multiple valid parents). Keep one
  // representative per distinct type/name/parent key instead of collapsing the
  // tech to a single parent.
  const reps = [...byKey.values()].map((nodes) => ({
    count: nodes.length,
    node: chooseGreekRepresentativeNode(nodes),
  }));
  reps.sort((a, b) => greekNodeGroupOrder(a.node) - greekNodeGroupOrder(b.node) || (a.node.x - b.node.x) || (a.node.y - b.node.y) || String(a.node.parent).localeCompare(String(b.node.parent)) || (b.count - a.count));
  return reps.map((entry) => ({ ...entry.node }));
}

function greekSelectedMinorNodesForAge(age, config) {
  const selected = (config.minorGods?.[age] || []).map(canonicalMinorTech);
  const nodes = [];
  for (const minor of selected) {
    for (const token of greekMinorBonusTokens(minor)) {
      nodes.push(...greekFindRightSideNodesForToken(age, token));
    }
  }
  return nodes;
}

function greekSelectedHeroNodeForAge(age, config) {
  const heroes = config.greekHeroes || {};
  const defaults = {
    ArchaicAge: "Jason",
    ClassicalAge: "Heracles",
    HeroicAge: "Odysseus",
    MythicAge: "Bellerophon",
  };
  const chosen = age === "ArchaicAge" ? heroes.archaic : age === "ClassicalAge" ? heroes.classical : age === "HeroicAge" ? heroes.heroic : heroes.mythic;
  const name = chosen || defaults[age];
  if (!name) return null;
  const positions = {
    ArchaicAge: "1,1",
    ClassicalAge: "1,0",
    HeroicAge: "1,1",
    MythicAge: "1,0",
  };
  return { type: "Unit", name, parent: "TownCenter", position: positions[age] || "1,0", x: Number((positions[age] || "1,0").split(",")[0]), y: Number((positions[age] || "1,0").split(",")[1]) };
}

function greekHeroChoiceForAge(age, config) {
  const heroes = config.greekHeroes || {};
  const defaults = {
    ArchaicAge: "Jason",
    ClassicalAge: "Heracles",
    HeroicAge: "Odysseus",
    MythicAge: "Bellerophon",
  };
  return age === "ArchaicAge" ? (heroes.archaic || defaults.ArchaicAge)
    : age === "ClassicalAge" ? (heroes.classical || defaults.ClassicalAge)
    : age === "HeroicAge" ? (heroes.heroic || defaults.HeroicAge)
    : (heroes.mythic || defaults.MythicAge);
}

function greekSelectedFortressHeroNodesForAge(age, config) {
  if (config?.baseCulture !== "Greek") return [];
  const nodes = [];
  if (age === "HeroicAge") {
    const archaic = greekHeroChoiceForAge("ArchaicAge", config);
    const classical = greekHeroChoiceForAge("ClassicalAge", config);
    const heroic = greekHeroChoiceForAge("HeroicAge", config);
    if (archaic) nodes.push({ type: "Unit", name: archaic, parent: "Fortress", position: "43,0", x: 43, y: 0 });
    if (classical) nodes.push({ type: "Unit", name: classical, parent: "Fortress", position: "44,0", x: 44, y: 0 });
    if (heroic) nodes.push({ type: "Unit", name: heroic, parent: "Fortress", position: "45,0", x: 45, y: 0 });
  } else if (age === "MythicAge") {
    const mythic = greekHeroChoiceForAge("MythicAge", config);
    if (mythic) nodes.push({ type: "Unit", name: mythic, parent: "Fortress", position: "43,0", x: 43, y: 0 });
  }
  return nodes;
}

function greekSelectedUniqueUnitRightSideNode(age, config) {
  if (age !== "MythicAge" || config.baseCulture !== "Greek" || !config.greekUniqueUnit) return null;
  return { type: "Unit", name: config.greekUniqueUnit, parent: "Fortress", position: "44,0", x: 44, y: 0 };
}

const GREEK_TECHTREE_GROUP_ORDER = [
  "TownCenter", "Storehouse", "Granary", "Farm", "House", "WallConnector", "Dock", "Temple", "SkyPassage",
  "SentryTower", "Armory", "Market", "MilitaryAcademy", "ArcheryRange", "Stable", "Fortress",
];

const GREEK_TECHTREE_GROUP_BASE_X = {
  TownCenter: 0,
  Storehouse: 4,
  Granary: 6,
  Farm: 8,
  House: 9,
  WallConnector: 10,
  Dock: 11,
  Temple: 17,
  SentryTower: 21,
  Armory: 23,
  Market: 25,
  MilitaryAcademy: 29,
  ArcheryRange: 34,
  Stable: 39,
  Fortress: 44,
};

const GREEK_TECHTREE_PARENT_LANE = {
  VillagerGreek: "TownCenter",
  Masons: "TownCenter",
  Architects: "TownCenter",
  FortifiedTownCenter: "TownCenter",
  HandAxe: "Storehouse",
  BowSaw: "Storehouse",
  Pickaxe: "Storehouse",
  ShaftMine: "Storehouse",
  Plow: "Granary",
  Irrigation: "Granary",
  FloodControl: "Granary",
  HuntingEquipment: "Granary",
  Husbandry: "Granary",
  Farm: "Farm",
  House: "House",
  StoneWall: "WallConnector",
  FortifiedWall: "WallConnector",
  BronzeWall: "WallConnector",
  IronWall: "WallConnector",
  ThornedWalls: "WallConnector",
  WallConnector: "WallConnector",
  Dock: "Dock",
  FishingShipGreek: "Dock",
  FishingShip: "Dock",
  Pentekonter: "Dock",
  Trireme: "Dock",
  Juggernaut: "Dock",
  TransportShipGreek: "Dock",
  TransportShip: "Dock",
  Scylla: "Dock",
  Carcinos: "Dock",
  TheArgo: "Dock",
  HeavyWarShips: "Dock",
  PurseSeine: "Dock",
  FishBasket: "Dock",
  SaltAmphora: "Dock",
  HeroicFleet: "Dock",
  ConscriptSailors: "Dock",
  Temple: "Temple",
  SkyPassage: "SkyPassage",
  NezhaChild: "Temple",
  NezhaYouth: "Temple",
  Nezha: "Temple",
  Pegasus: "Temple",
  Manticore: "Temple",
  Minotaur: "Temple",
  Cyclops: "Temple",
  Centaur: "Temple",
  NemeanLion: "Temple",
  Hydra: "Temple",
  Hamadryad: "Temple",
  Colossus: "Temple",
  Medusa: "Temple",
  Chimera: "Temple",
  SentryTower: "SentryTower",
  WatchTower: "SentryTower",
  GuardTower: "SentryTower",
  SignalFires: "SentryTower",
  CarrierPigeons: "SentryTower",
  BoilingOil: "SentryTower",
  Armory: "Armory",
  DwarvenArmory: "Armory",
  CopperWeapons: "Armory",
  CopperArmor: "Armory",
  CopperShields: "Armory",
  BronzeWeapons: "Armory",
  BronzeArmor: "Armory",
  BronzeShields: "Armory",
  IronWeapons: "Armory",
  IronArmor: "Armory",
  IronShields: "Armory",
  DwarvenWeapons: "Armory",
  MeteoricIronArmor: "Armory",
  DragonscaleShields: "Armory",
  Market: "Market",
  TaxCollectors: "Market",
  CaravanGreek: "Market",
  MilitaryAcademy: "MilitaryAcademy",
  MediumInfantry: "MilitaryAcademy",
  HeavyInfantry: "MilitaryAcademy",
  ChampionInfantry: "MilitaryAcademy",
  LevyInfantry: "MilitaryAcademy",
  ArcheryRange: "ArcheryRange",
  MediumArchers: "ArcheryRange",
  HeavyArchers: "ArcheryRange",
  ChampionArchers: "ArcheryRange",
  LevyRangedSoldiers: "ArcheryRange",
  Stable: "Stable",
  MediumCavalry: "Stable",
  HeavyCavalry: "Stable",
  ChampionCavalry: "Stable",
  LevyCavalry: "Stable",
  Fortress: "Fortress",
  Petrobolos: "Fortress",
  Helepolis: "Fortress",
  DraftHorses: "Fortress",
  Engineers: "Fortress",
  AdvancedFortifications: "Fortress",
  Myrmidon: "Fortress",
  Gastraphetoros: "Fortress",
  Hetairos: "Fortress",
  AmazonArcher: "Fortress",
  Jason: "TownCenter",
  Ajax: "TownCenter",
  Theseus: "TownCenter",
  Orpheus: "TownCenter",
  Heracles: "TownCenter",
  Achilles: "TownCenter",
  Atalanta: "TownCenter",
  Iolaus: "TownCenter",
  Odysseus: "TownCenter",
  Chiron: "TownCenter",
  Hippolyta: "TownCenter",
  Icarus: "TownCenter",
  Bellerophon: "TownCenter",
  Perseus: "TownCenter",
  Polyphemus: "TownCenter",
  Midas: "TownCenter",
};

function greekNodeGroupRoot(node) {
  const parent = node?.parent || "";
  const name = node?.name || "";
  if (GREEK_TECHTREE_GROUP_ORDER.includes(parent)) return parent;
  if (GREEK_TECHTREE_PARENT_LANE[parent]) return GREEK_TECHTREE_PARENT_LANE[parent];
  if (!parent && GREEK_TECHTREE_GROUP_ORDER.includes(name)) return name;
  if (GREEK_TECHTREE_PARENT_LANE[name]) return GREEK_TECHTREE_PARENT_LANE[name];
  return parent || name;
}

function greekNodeGroupOrder(node) {
  const root = greekNodeGroupRoot(node);
  const idx = GREEK_TECHTREE_GROUP_ORDER.indexOf(root);
  return idx >= 0 ? idx : 99;
}

const GREEK_TECHTREE_FIXED_LOCAL_X = {
  // Town Center / villager chain
  Masons: 1,
  Architects: 1,
  Jason: 1,
  Ajax: 1,
  Theseus: 1,
  Orpheus: 1,
  Heracles: 1,
  Achilles: 1,
  Atalanta: 1,
  Iolaus: 1,
  Odysseus: 1,
  Chiron: 1,
  Hippolyta: 1,
  Icarus: 1,
  Bellerophon: 1,
  Perseus: 1,
  Polyphemus: 1,
  Midas: 1,
  VillagerGreek: 2,
  FortifiedTownCenter: 2,
  SecretsOfTheTitans: 2,
  TitanGate: 2,

  // Economic upgrade chains
  HandAxe: 1,
  BowSaw: 1,
  Carpenters: 1,
  Pickaxe: 2,
  ShaftMine: 2,
  Quarry: 2,
  Plow: 1,
  Irrigation: 1,
  FloodControl: 1,
  Husbandry: 2,

  // Walls
  // Exception: WallConnector's wall-upgrade line shares the building column.
  StoneWall: 0,
  FortifiedWall: 0,
  BronzeWall: 0,
  IronWall: 0,
  ThornedWalls: 1,

  // Dock chains
  FishingShipGreek: 1,
  FishingShip: 1,
  PurseSeine: 1,
  SaltAmphora: 1,
  Pentekonter: 2,
  Anastrophe: 2,
  Trireme: 3,
  HeavyWarShips: 3,
  ChampionWarShips: 3,
  TransportShipGreek: 4,
  TransportShip: 4,
  EnclosedDeck: 4,
  Juggernaut: 5,

  // Temple
  // Exception: Omniscience shares the Temple building column.
  Omniscience: 0,
  NezhaChild: 1,
  NezhaYouth: 1,
  Nezha: 1,

  // Towers
  WatchTower: 1,
  GuardTower: 1,
  BoilingOil: 1,
  Crenellations: 1,
  SignalFires: 2,
  CarrierPigeons: 2,

  // Armory chains
  CopperWeapons: 1,
  BronzeWeapons: 1,
  IronWeapons: 1,
  CopperArmor: 2,
  BronzeArmor: 2,
  IronArmor: 2,
  CopperShields: 3,
  BronzeShields: 3,
  IronShields: 3,
  Ballistics: 4,
  BurningPitch: 4,
  DwarvenWeapons: 1,
  MeteoricIronArmor: 2,
  DragonscaleShields: 3,

  // Market chains
  CaravanGreek: 1,
  Coinage: 1,
  TaxCollectors: 2,
  Ambassadors: 2,

  // Military upgrade chains
  MediumInfantry: 2,
  HeavyInfantry: 2,
  ChampionInfantry: 2,
  LevyInfantry: 3,
  ConscriptInfantry: 3,
  MediumArchers: 2,
  HeavyArchers: 2,
  ChampionArchers: 2,
  LevyRangedSoldiers: 3,
  ConscriptRangedSoldiers: 3,
  MediumCavalry: 2,
  HeavyCavalry: 2,
  ChampionCavalry: 2,
  LevyCavalry: 3,
  ConscriptCavalry: 3,
};

function greekFixedLocalX(node, group) {
  const name = node?.name || "";
  if (group === "TownCenter" && /^SkinOfTheRhino/.test(name)) return 3;
  if (Object.prototype.hasOwnProperty.call(GREEK_TECHTREE_FIXED_LOCAL_X, name)) return GREEK_TECHTREE_FIXED_LOCAL_X[name];
  return undefined;
}

const GREEK_TECHTREE_PROTECTED_LINE_LOCAL_X = {
  TownCenter: [1, 2, 3],
  Storehouse: [1, 2],
  Granary: [1],
  WallConnector: [0],
  Dock: [1, 2, 3, 4],
  Temple: [0, 1, 2, 3, 4],
  SentryTower: [1, 2],
  Armory: [1, 2, 3, 4],
  Market: [1, 2],
  MilitaryAcademy: [2, 3],
  ArcheryRange: [2, 3],
  Stable: [2, 3],
  Fortress: [1, 2, 3],
};

function greekProtectedLineColumns(group, groupNodes = null) {
  const candidateColumns = new Set(GREEK_TECHTREE_PROTECTED_LINE_LOCAL_X[group] || []);
  if (!Array.isArray(groupNodes)) return candidateColumns;

  // Protect only parent-line columns that are actually used by this generated
  // age/group. Previously we protected every possible line column up front
  // (for example TownCenter local column 3 for Skin of the Rhino), which made
  // normal TownCenter techs skip visibly free slots.
  const activeColumns = new Set();
  for (const node of groupNodes) {
    const fixed = greekFixedLocalX(node, group);
    if (!Number.isFinite(Number(fixed))) continue;
    const localX = Number(fixed);
    if (candidateColumns.has(localX)) activeColumns.add(localX);
  }
  return activeColumns;
}

function greekNextNonProtectedLocalX(group, minX, protectedColumns = null) {
  const columns = protectedColumns instanceof Set ? protectedColumns : greekProtectedLineColumns(group);
  for (let x = Math.max(0, Number(minX) || 0); x < 64; x += 1) {
    if (!columns.has(x)) return x;
  }
  return Math.max(0, Number(minX) || 0);
}


function greekResolveNodeGroupFromNodes(node, allNodes) {
  const byName = new Map();
  for (const candidate of allNodes || []) {
    if (!candidate?.name) continue;
    if (!byName.has(candidate.name)) byName.set(candidate.name, []);
    byName.get(candidate.name).push(candidate);
  }
  const seen = new Set();
  let current = node?.parent || node?.name || "";
  for (let i = 0; i < 16 && current && !seen.has(current); i += 1) {
    seen.add(current);
    if (GREEK_TECHTREE_GROUP_ORDER.includes(current)) return current;
    if (GREEK_TECHTREE_PARENT_LANE[current]) return GREEK_TECHTREE_PARENT_LANE[current];
    const parentNode = (byName.get(current) || [])
      .slice()
      .sort((a, b) => (Number(a.x) || 0) - (Number(b.x) || 0) || (Number(a.y) || 0) - (Number(b.y) || 0))[0];
    if (parentNode?.parent) {
      current = parentNode.parent;
      continue;
    }
    if (parentNode?.name && parentNode.name !== current) {
      current = parentNode.name;
      continue;
    }
    break;
  }
  if (GREEK_TECHTREE_PARENT_LANE[node?.name]) return GREEK_TECHTREE_PARENT_LANE[node.name];
  return greekNodeGroupRoot(node);
}

function greekCompactGroupNodes(group, groupNodes, groupStartX = 0, protectedColumnsOverride = null, age = "") {
  const nodes = (groupNodes || []).map((inputNode) => {
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    return node;
  });

  const isGroupRootNode = (node) => !node?.parent && (node?.name === group || (group === "Armory" && node?.name === "DwarvenArmory"));
  const hasRoot = nodes.some((node) => isGroupRootNode(node));
  const sourceOrder = (node) => (Number(node.x) || 0) * 10 + (Number(node.y) || 0);
  const sorted = nodes.slice().sort((a, b) => {
    const aIsRoot = isGroupRootNode(a);
    const bIsRoot = isGroupRootNode(b);
    if (aIsRoot !== bIsRoot) return aIsRoot ? -1 : 1;
    if (a.name === b.parent && b.name !== a.parent) return -1;
    if (b.name === a.parent && a.name !== b.parent) return 1;
    const af = greekFixedLocalX(a, group);
    const bf = greekFixedLocalX(b, group);
    if (Number.isFinite(Number(af)) !== Number.isFinite(Number(bf))) return Number.isFinite(Number(af)) ? -1 : 1;
    if (Number.isFinite(Number(af)) && af !== bf) return af - bf;
    return sourceOrder(a) - sourceOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name) || String(a.parent).localeCompare(String(b.parent));
  });

  const localOccupied = new Set();
  const placedLocalByName = new Map();
  const placedRowByName = new Map();
  const placed = [];
  const protectedLineColumns = protectedColumnsOverride instanceof Set ? protectedColumnsOverride : greekProtectedLineColumns(group, nodes);
  const directChildCountByName = new Map();
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    directChildCountByName.set(parentKey, (directChildCountByName.get(parentKey) || 0) + 1);
  }

  const isLaneRootParent = (parent) => parent === group || (group === "Armory" && parent === "DwarvenArmory") || (group === "TownCenter" && parent === "TownCenter");
  const canUse = (x, y, allowProtectedLineColumn = true) => {
    if (localOccupied.has(`${x},${y}`)) return false;
    if (!allowProtectedLineColumn && protectedLineColumns.has(x)) return false;
    return true;
  };
  const reserve = (node, localX, y) => {
    localOccupied.add(`${localX},${y}`);
    for (const placementKey of techTreeNodePlacementKeys(node)) {
      if (!placedLocalByName.has(placementKey) || localX < placedLocalByName.get(placementKey)) {
        placedLocalByName.set(placementKey, localX);
        placedRowByName.set(placementKey, y);
      }
    }
    const cleanNode = { ...node };
    delete cleanNode._group;
    placed.push({ ...cleanNode, x: groupStartX + localX, y, position: `${groupStartX + localX},${y}` });
  };
  const firstFree = (minX, preferredY = 0, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) if (canUse(x, y, allowProtectedLineColumn)) return { x, y };
    }
    return { x: Math.max(0, minX || 0), y: preferredY === 1 ? 1 : 0 };
  };
  const firstFreeParentColumn = (minX, allowProtectedLineColumn = true) => {
    // Units that have direct child techs/units read best as a vertical pair:
    // unit on row 0, child on row 1. Do not place the unit on row 1 of an
    // already-used column when a clean two-row column is available.
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn) && canUse(x, 1, allowProtectedLineColumn)) return { x, y: 0 };
    }
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn)) return { x, y: 0 };
    }
    return firstFree(minX, 0, allowProtectedLineColumn);
  };

  for (const node of techTreeParentFirstOrder(sorted, isGroupRootNode)) {
    const isRoot = isGroupRootNode(node);
    if (isRoot) {
      const y = 0;
      const x = 0;
      if (!canUse(x, y, true)) {
        const alt = firstFree(0, y, true);
        reserve(node, alt.x, alt.y);
      } else {
        reserve(node, x, y);
      }
      continue;
    }

    const fixed = greekFixedLocalX(node, group);
    const parentLookupKey = techTreeNodeParentLookupKey(node);
    const parentLocal = placedLocalByName.get(parentLookupKey);
    const parentRow = placedRowByName.get(parentLookupKey);
    let desiredX;
    let preferredY = Number(node.y) === 0 ? 0 : 1;

    if (Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent)) {
      desiredX = Number(parentLocal);
      // Prefer the opposite row for visible parent chains when possible.
      if (Number.isFinite(Number(parentRow))) preferredY = Number(parentRow) === 0 ? 1 : 0;
    } else if (Number.isFinite(Number(fixed))) {
      desiredX = Number(fixed);
    } else {
      desiredX = 1;
    }

    // Units are easier to read on the first row; try row 0 first unless occupied.
    if (node.type === "Unit") preferredY = 0;

    // ArchaicAge special readability rule: for non-root nodes, prefer row 1
    // if the desired column has row 1 free. If row 1 is occupied, use the
    // normal type-based rule (units row 0, techs row 1).
    if (age === "ArchaicAge" && !isRoot && !localOccupied.has(`${desiredX},1`)) {
      preferredY = 1;
    }

    if (!hasRoot && !isLaneRootParent(node.parent)) desiredX = Math.max(desiredX, 0);
    if (hasRoot || group === "TownCenter") desiredX = Math.max(desiredX, 1);

    const hasFixedLocalX = Number.isFinite(Number(fixed));
    const isChildOfPlacedChain = Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent) && Number(parentLocal) === Number(desiredX);
    const allowProtectedLineColumn = hasFixedLocalX || isChildOfPlacedChain;
    if (!allowProtectedLineColumn && protectedLineColumns.has(desiredX)) {
      desiredX = greekNextNonProtectedLocalX(group, desiredX + 1, protectedLineColumns);
    }

    let placedHere = false;
    const hasDirectChildren = (directChildCountByName.get(node.uniqueIdentifier || node.name) || 0) > 0;
    if (hasDirectChildren) {
      const cleanColumn = firstFreeParentColumn(desiredX, allowProtectedLineColumn);
      reserve(node, cleanColumn.x, cleanColumn.y);
      placedHere = true;
    }
    if (!placedHere) {
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) {
        if (canUse(desiredX, y, allowProtectedLineColumn)) {
          reserve(node, desiredX, y);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere) {
      const alt = firstFree(desiredX + 1, preferredY, allowProtectedLineColumn);
      reserve(node, alt.x, alt.y);
    }
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function greekNormalizeTechTreeNodes(age, nodes, forcedGroupStarts = null, protectedColumnsByGroup = null) {
  const unique = new Map();
  for (const inputNode of nodes) {
    if (!inputNode || !inputNode.type || !inputNode.name) continue;
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    node.position = `${node.x},${node.y}`;
    const key = techTreeNodeKey(node);
    if (!unique.has(key)) unique.set(key, node);
  }

  const allNodes = [...unique.values()];
  const grouped = new Map();
  for (const node of allNodes) {
    const group = greekResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push({ ...node, _group: group });
  }

  const orderedGroups = [...grouped.entries()].sort(([groupA], [groupB]) => {
    const ai = GREEK_TECHTREE_GROUP_ORDER.indexOf(groupA);
    const bi = GREEK_TECHTREE_GROUP_ORDER.indexOf(groupB);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || String(groupA).localeCompare(String(groupB));
  });

  const placed = [];
  let nextGroupX = 0;
  for (const [group, groupNodes] of orderedGroups) {
    const forcedX = forcedGroupStarts && Number.isFinite(Number(forcedGroupStarts[group])) ? Number(forcedGroupStarts[group]) : undefined;
    const groupStartX = Number.isFinite(Number(forcedX)) ? Number(forcedX) : nextGroupX;
    const protectedColumns = protectedColumnsByGroup && protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : null;
    const groupPlaced = greekCompactGroupNodes(group, groupNodes, groupStartX, protectedColumns, age);
    placed.push(...groupPlaced);
    const width = groupPlaced.length ? Math.max(...groupPlaced.map((node) => Number(node.x) - groupStartX)) + 1 : 0;
    nextGroupX = groupStartX + Math.max(width, 0);
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || greekNodeGroupOrder(a) - greekNodeGroupOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}



function rightSideNode(type, name, parent = "", position = "1,1") {
  const [xRaw, yRaw] = String(position || "1,1").split(",");
  const x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : 1;
  const y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : 1;
  return { type, name, parent: parent || "", position: `${x},${y}`, x, y };
}

function selectedHasGaiaEconomicEarlierBonus(config) {
  return selectedHasBonusId(config, "bonus_62") || selectedHasBonusLabel(config, "Economic Guild and upgrades are cheaper and available earlier.");
}

function selectedHasOranosSkyPassageBonus(config) {
  return selectedHasBonusId(config, "bonus_56") || selectedHasBonusLabel(config, ORANOS_SKY_PASSAGE_BONUS_LABEL);
}

function selectedHasFuxiNezhaBonus(config) {
  return selectedHasBonusId(config, "bonus_66") || selectedHasBonusLabel(config, FUXI_NEZHA_BONUS_LABEL);
}

function selectedHasShennongFarmArchaicBonus(config) {
  return selectedHasBonusId(config, "bonus_73") || selectedHasBonusLabel(config, "Farms are available in the Archaic Age and auto-build on Favored Land.");
}

const TECHTREE_ECON_UPGRADE_NAMES = new Set([
  "HandAxe", "BowSaw", "Carpenters",
  "Pickaxe", "ShaftMine", "Quarry",
  "Plow", "Irrigation", "FloodControl", "Chinampas",
]);

const TECHTREE_ECON_UPGRADES_BY_AGE = {
  ArchaicAge: ["HandAxe", "Pickaxe", "Plow"],
  ClassicalAge: ["BowSaw", "ShaftMine", "Irrigation"],
  HeroicAge: ["Carpenters", "Quarry", "FloodControl"],
  MythicAge: [],
};

const TECHTREE_ECON_FIRST_PARENT_BY_CULTURE = {
  Greek: { wood: "Storehouse", gold: "Storehouse", food: "Granary" },
  Egyptian: { wood: "LumberCamp", gold: "MiningCamp", food: "Granary" },
  Norse: { wood: "OxCartBuilding", gold: "OxCartBuilding", food: "OxCartBuilding" },
  Atlantean: { wood: "EconomicGuild", gold: "EconomicGuild", food: "EconomicGuild" },
  Chinese: { wood: "Silo", gold: "Silo", food: "Silo" },
  Japanese: { wood: "Watermill", gold: "MiningCampJapanese", food: "Watermill" },
  Aztec: { wood: "Calpulli", gold: "Calpulli", food: "Calpulli" },
};

function economicUpgradeParentForCulture(culture, techName) {
  const parents = TECHTREE_ECON_FIRST_PARENT_BY_CULTURE[culture] || TECHTREE_ECON_FIRST_PARENT_BY_CULTURE.Greek;
  const map = {
    HandAxe: parents.wood,
    BowSaw: "HandAxe",
    Carpenters: "BowSaw",
    Pickaxe: parents.gold,
    ShaftMine: "Pickaxe",
    Quarry: "ShaftMine",
    Plow: parents.food,
    Irrigation: "Plow",
    FloodControl: "Irrigation",
  };
  return map[techName] || "";
}

function economicUpgradeRightSideNodesForAge(culture, age) {
  if (culture === "Aztec") {
    const byAge = {
      ArchaicAge: ["HandAxe", "Pickaxe", "Plow"],
      ClassicalAge: ["BowSaw", "ShaftMine", "Chinampas"],
      HeroicAge: ["Carpenters", "Quarry"],
      MythicAge: [],
    };
    const parentMap = {
      HandAxe: "Calpulli", BowSaw: "HandAxe", Carpenters: "BowSaw",
      Pickaxe: "Calpulli", ShaftMine: "Pickaxe", Quarry: "ShaftMine",
      Plow: "Calpulli", Chinampas: "Plow",
    };
    return (byAge[age] || []).map((techName) => rightSideNode("Tech", techName, parentMap[techName] || "Calpulli", "1,1"));
  }
  return (TECHTREE_ECON_UPGRADES_BY_AGE[age] || []).map((techName) => rightSideNode("Tech", techName, economicUpgradeParentForCulture(culture, techName), "1,1"));
}

function applyGaiaEconomicEarlierRightSideNodes(culture, age, config, nodes) {
  if (!selectedHasGaiaEconomicEarlierBonus(config)) return nodes || [];
  const out = (nodes || []).filter((node) => !(node.type === "Tech" && TECHTREE_ECON_UPGRADE_NAMES.has(node.name)));
  out.push(...economicUpgradeRightSideNodesForAge(culture, age));
  return out;
}

function applyFarmBaselineRightSideNodes(culture, age, config, nodes) {
  // Farm visibility is a baseline building rule, not only a Shennong rule.
  // All pantheons show Farm in ClassicalAge, except Egyptian where Farm is
  // available in ArchaicAge. Shennong's farm bonus moves non-Egyptian Farm
  // from ClassicalAge to ArchaicAge. Always rebuild this node so vanilla
  // source templates cannot accidentally omit it or inherit Shennong-only
  // placement.
  const out = (nodes || []).filter((node) => !(node.type === "Unit" && node.name === "Farm"));
  const farmAge = culture === "Egyptian" || selectedHasShennongFarmArchaicBonus(config) ? "ArchaicAge" : "ClassicalAge";
  if (age === farmAge) out.push(rightSideNode("Unit", "Farm", "", "1,0"));
  return out;
}

function applyShennongFarmArchaicRightSideNodes(culture, age, config, nodes) {
  return applyFarmBaselineRightSideNodes(culture, age, config, nodes);
}

function bonusSkyPassageRightSideNodes(age, config) {
  if (!selectedHasOranosSkyPassageBonus(config) || age !== "ArchaicAge") return [];
  return [rightSideNode("Unit", "SkyPassage", "", "1,0")];
}

function bonusNezhaRightSideNodes(age, config, culture = "") {
  if (!selectedHasFuxiNezhaBonus(config)) return [];
  const firstParent = culture === "Chinese" ? "ImperialAcademy" : "Temple";
  if (age === "ClassicalAge") return [rightSideNode("Unit", "NezhaChild", firstParent, "1,0")];
  if (age === "HeroicAge") return [rightSideNode("Unit", "NezhaYouth", "NezhaChild", "1,0")];
  if (age === "MythicAge") return [rightSideNode("Unit", "Nezha", "NezhaYouth", "1,0")];
  return [];
}

const TECHTREE_THOR_ARMORY_COMPACT_NAMES = new Set([
  "Armory", "DwarvenArmory", "Ballistics", "BurningPitch",
  "CopperWeapons", "BronzeWeapons", "IronWeapons", "DwarvenWeapons",
  "CopperArmor", "BronzeArmor", "IronArmor", "MeteoricIronArmor",
  "CopperShields", "BronzeShields", "IronShields", "DragonscaleShields",
]);

function thorDwarvenArmoryCompactRightSideNodes(age, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return [];
  const armory = "DwarvenArmory";
  if (age === "ArchaicAge") {
    return [
      rightSideNode("Unit", armory, "", "1,0"),
      rightSideNode("Tech", "Ballistics", armory, "2,1"),
      rightSideNode("Tech", "CopperWeapons", armory, "3,0"),
      rightSideNode("Tech", "BronzeWeapons", "CopperWeapons", "3,1"),
      rightSideNode("Tech", "CopperArmor", armory, "4,0"),
      rightSideNode("Tech", "BronzeArmor", "CopperArmor", "4,1"),
      rightSideNode("Tech", "CopperShields", armory, "5,0"),
      rightSideNode("Tech", "BronzeShields", "CopperShields", "5,1"),
    ];
  }
  if (age === "ClassicalAge") {
    return [
      rightSideNode("Tech", "BurningPitch", armory, "2,1"),
      rightSideNode("Tech", "IronWeapons", "BronzeWeapons", "3,0"),
      rightSideNode("Tech", "DwarvenWeapons", "IronWeapons", "3,1"),
      rightSideNode("Tech", "IronArmor", "BronzeArmor", "4,0"),
      rightSideNode("Tech", "MeteoricIronArmor", "IronArmor", "4,1"),
      rightSideNode("Tech", "IronShields", "BronzeShields", "5,0"),
      rightSideNode("Tech", "DragonscaleShields", "IronShields", "5,1"),
    ];
  }
  return [];
}

function applyThorDwarvenArmoryCompactRightSideNodes(age, config, nodes) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return nodes || [];
  const out = (nodes || []).filter((node) => !(TECHTREE_THOR_ARMORY_COMPACT_NAMES.has(node.name) && (node.parent === "" || node.parent === "Armory" || node.parent === "DwarvenArmory" || TECHTREE_THOR_ARMORY_COMPACT_NAMES.has(node.parent))));
  out.push(...thorDwarvenArmoryCompactRightSideNodes(age, config));
  return out;
}

function applyGenericBonusRightSideNodes(culture, age, config, nodes, options = {}) {
  let out = (nodes || []).slice();
  out = applyGaiaEconomicEarlierRightSideNodes(culture, age, config, out);
  out = applyShennongFarmArchaicRightSideNodes(culture, age, config, out);
  if (options.applyThorCompact !== false) out = applyThorDwarvenArmoryCompactRightSideNodes(age, config, out);
  out.push(...bonusSkyPassageRightSideNodes(age, config));
  out.push(...bonusNezhaRightSideNodes(age, config, culture));
  return out;
}

function selectedHasThorDwarvenArmoryBonus(config) {
  return selectedHasBonusId(config, "bonus_36") || selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL);
}

function greekApplyThorDwarvenArmoryRightSide(nodes, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return nodes || [];
  return (nodes || []).map((inputNode) => {
    const node = { ...inputNode };
    if (node.type === "Unit" && node.name === "Armory") node.name = "DwarvenArmory";
    if (node.parent === "Armory") node.parent = "DwarvenArmory";
    return node;
  });
}

function greekThorDwarvenArmoryExtraRightSideNodes(age, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return [];
  // Greek displays the Iron armory upgrade line in MythicAge, so place Thor's
  // Dwarven Armory extras beside their Iron-upgrade parents there.
  if (age !== "MythicAge") return [];
  return [
    { type: "Tech", name: "DwarvenWeapons", parent: "IronWeapons", position: "26,1", x: 26, y: 1 },
    { type: "Tech", name: "MeteoricIronArmor", parent: "IronArmor", position: "27,1", x: 27, y: 1 },
    { type: "Tech", name: "DragonscaleShields", parent: "IronShields", position: "28,1", x: 28, y: 1 },
  ];
}

function greekRawTechTreeNodesForAge(age, config) {
  let nodes = [
    ...greekCommonNodesForAge(age),
    greekSelectedHeroNodeForAge(age, config),
    ...greekSelectedMinorNodesForAge(age, config),
    ...greekSelectedFortressHeroNodesForAge(age, config),
    greekSelectedUniqueUnitRightSideNode(age, config),
    ...greekThorDwarvenArmoryExtraRightSideNodes(age, config),
  ].filter(Boolean);
  if (age === "ArchaicAge") {
    const group = selectedUniqueTechGroup(config);
    const tech = selectedUniqueTechRightSideName(config, group);
    if (group && tech) {
      for (const spec of uniqueTechRightSideNodeSpecs(config, "", group)) {
        const [xRaw, yRaw] = String(spec.position || spec.preferred?.[0] || "18,1").split(",");
        nodes.push({
          type: "Tech",
          name: tech,
          parent: spec.parent,
          position: `${Number(xRaw) || 0},${Number(yRaw) || 1}`,
          x: Number(xRaw) || 0,
          y: Number(yRaw) || 1,
        });
      }
    }
  }
  nodes = applyGenericBonusRightSideNodes("Greek", age, config, nodes);
  return greekApplyThorDwarvenArmoryRightSide(nodes, config);
}


function greekMeasureGroupWidths(nodes, protectedColumnsByGroup = null, age = "") {
  const widths = {};
  const grouped = new Map();
  for (const node of nodes || []) {
    const group = greekResolveNodeGroupFromNodes(node, nodes || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }
  for (const [group, groupNodes] of grouped.entries()) {
    const protectedColumns = protectedColumnsByGroup && protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : null;
    const placed = greekCompactGroupNodes(group, groupNodes, 0, protectedColumns, age);
    widths[group] = placed.length ? Math.max(...placed.map((node) => Number(node.x) || 0)) + 1 : 0;
  }
  return widths;
}

function compactGreekPreferredLocal(rawByAge, preferredLocal) {
  // The current Greek right-side layout is compacted per age. We intentionally
  // avoid a single global local-X per node name because that was causing every
  // possible Town Center / Dock / Temple node from every age to reserve its own
  // column, which created huge empty gaps. Chain alignment is handled by
  // greekFixedLocalX() and same-parent placement inside greekCompactGroupNodes().
  return {};
}

function greekBuildGlobalProtectedLineColumns(rawByAge) {
  const allNodes = Object.values(rawByAge || {}).flat();
  const grouped = new Map();
  for (const node of allNodes) {
    if (!node || !node.name) continue;
    const group = greekResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }

  const out = {};
  for (const [group, groupNodes] of grouped.entries()) {
    const candidateColumns = new Set(GREEK_TECHTREE_PROTECTED_LINE_LOCAL_X[group] || []);
    const activeColumns = new Set();
    for (const node of groupNodes) {
      const fixed = greekFixedLocalX(node, group);
      if (!Number.isFinite(Number(fixed))) continue;
      const localX = Number(fixed);
      if (candidateColumns.has(localX)) activeColumns.add(localX);
    }
    if (activeColumns.size) out[group] = activeColumns;
  }
  return out;
}

function buildGreekTechTreeGroupStarts(config) {
  if (config?.baseCulture !== "Greek") return null;
  const rawByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    rawByAge[age] = greekRawTechTreeNodesForAge(age, config);
  }
  const protectedColumnsByGroup = greekBuildGlobalProtectedLineColumns(rawByAge);
  config._greekTechTreeProtectedColumns = protectedColumnsByGroup;

  const maxWidths = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    const widths = greekMeasureGroupWidths(rawByAge[age], protectedColumnsByGroup, age);
    for (const [group, width] of Object.entries(widths)) {
      maxWidths[group] = Math.max(maxWidths[group] || 0, width);
    }
  }

  const starts = {};
  let nextX = 0;
  for (const group of GREEK_TECHTREE_GROUP_ORDER) {
    starts[group] = nextX;
    nextX += Math.max(maxWidths[group] || 0, 0);
  }
  return starts;
}

function generateGreekDynamicTechTreeTechnologies(age, config) {
  if (config?.baseCulture !== "Greek") return "";
  const nodes = greekRawTechTreeNodesForAge(age, config);
  const normalized = greekNormalizeTechTreeNodes(age, nodes, config?._greekTechTreeGroupStarts || null, config?._greekTechTreeProtectedColumns || null);
  const body = normalized.map((node) => buildTechTreeNodeXml(node)).join("\n");
  const block = `<local:TechTreeAge.Technologies>
${body}
            </local:TechTreeAge.Technologies>`;
  return applyCustomTechNamesToUiBlock(block, config || {});
}


const EGYPTIAN_TECHTREE_MAJOR_SOURCES = ["Ra", "Isis", "Set"];
const EGYPTIAN_TECHTREE_MINOR_BY_AGE = {
  ClassicalAge: ["ClassicalAgeAnubis", "ClassicalAgeBast", "ClassicalAgePtah"],
  HeroicAge: ["HeroicAgeNephthys", "HeroicAgeSekhmet", "HeroicAgeSobek"],
  MythicAge: ["MythicAgeHorus", "MythicAgeOsiris", "MythicAgeThoth"],
};

const EGYPTIAN_TECHTREE_GROUP_ORDER = [
  "TownCenter", "LumberCamp", "MiningCamp", "Granary", "Farm", "House", "Obelisk", "WallConnector", "Dock", "Temple", "SkyPassage",
  "Monument", "SentryTower", "Armory", "Market", "Barracks", "MigdolStronghold", "SiegeWorks", "Lighthouse", "Wonder",
];

const EGYPTIAN_TECHTREE_PARENT_LANE = {
  VillagerEgyptian: "TownCenter",
  Mercenary: "TownCenter",
  MercenaryCavalry: "TownCenter",
  Masons: "TownCenter",
  Architects: "TownCenter",
  FortifiedTownCenter: "TownCenter",
  SecretsOfTheTitans: "TownCenter",
  TitanGate: "TownCenter",
  Pharaoh: "TownCenter",
  BaboonOfSet: "TownCenter",
  GazelleOfSet: "TownCenter",
  HyenaOfSet: "TownCenter",
  GiraffeOfSet: "TownCenter",
  CrocodileOfSet: "TownCenter",
  HippopotamusOfSet: "TownCenter",
  RhinocerosOfSet: "TownCenter",
  ElephantOfSet: "TownCenter",

  LumberCamp: "LumberCamp",
  HandAxe: "LumberCamp",
  BowSaw: "LumberCamp",
  Carpenters: "LumberCamp",
  AdzeOfWepwawet: "LumberCamp",

  MiningCamp: "MiningCamp",
  Pickaxe: "MiningCamp",
  ShaftMine: "MiningCamp",
  Quarry: "MiningCamp",

  Granary: "Granary",
  Husbandry: "Granary",
  HuntingEquipment: "Granary",
  Shaduf: "Granary",
  Plow: "Granary",
  Irrigation: "Granary",
  FloodControl: "Granary",
  SacredCats: "Granary",

  Farm: "Farm",
  House: "House",
  Obelisk: "Obelisk",

  WallConnector: "WallConnector",
  StoneWall: "WallConnector",
  FortifiedWall: "WallConnector",
  CitadelWall: "WallConnector",
  BronzeWall: "WallConnector",
  IronWall: "WallConnector",

  Dock: "Dock",
  FishingShipEgyptian: "Dock",
  FishingShip: "Dock",
  PurseSeine: "Dock",
  FishBasket: "Dock",
  SaltAmphora: "Dock",
  Kebenit: "Dock",
  SolarBarque: "Dock",
  RammingGalley: "Dock",
  WarBarge: "Dock",
  FuneralBarge: "Dock",
  TransportShipEgyptian: "Dock",
  TransportShip: "Dock",
  EnclosedDeck: "Dock",
  HeavyWarships: "Dock",
  ChampionWarships: "Dock",
  HeroicFleet: "Dock",
  ConscriptSailors: "Dock",
  Leviathan: "Dock",
  WarTurtle: "Dock",

  Temple: "Temple",
  SkyPassage: "SkyPassage",
  NezhaChild: "Temple",
  NezhaYouth: "Temple",
  Nezha: "Temple",
  Priest: "Temple",
  HandsOfThePharaoh: "Temple",
  Omniscience: "Temple",
  Wadjet: "Temple",
  Sphinx: "Temple",
  Criosphinx: "Temple",
  Hieracosphinx: "Temple",
  Anubite: "Temple",
  FeetOfTheJackal: "Temple",
  Necropolis: "Temple",
  Petsuchos: "Temple",
  Crocodilopolis: "Temple",
  Roc: "Temple",
  Scarab: "Temple",
  ScorpionMan: "Temple",
  SpiritOfMaat: "Temple",
  FuneralRites: "Temple",
  Nebty: "Temple",
  Mummy: "Temple",
  AtefCrown: "Temple",
  Phoenix: "Temple",
  Avenger: "Temple",
  NewKingdom: "Temple",

  MonumentToVillagers: "Monument",
  MonumentToSoldiers: "Monument",
  MonumentToPriests: "Monument",
  MonumentToPharaohs: "Monument",
  MonumentToGods: "Monument",

  SentryTower: "SentryTower",
  WatchTower: "SentryTower",
  GuardTower: "SentryTower",
  BallistaTower: "SentryTower",
  SignalFires: "SentryTower",
  CarrierPigeons: "SentryTower",
  Crenellations: "SentryTower",
  BoilingOil: "SentryTower",

  Armory: "Armory",
  DwarvenArmory: "Armory",
  CopperWeapons: "Armory",
  BronzeWeapons: "Armory",
  IronWeapons: "Armory",
  CopperArmor: "Armory",
  BronzeArmor: "Armory",
  IronArmor: "Armory",
  CopperShields: "Armory",
  BronzeShields: "Armory",
  IronShields: "Armory",
  Ballistics: "Armory",
  BurningPitch: "Armory",
  DwarvenWeapons: "Armory",
  MeteoricIronArmor: "Armory",
  DragonscaleShields: "Armory",
  ElectrumBullets: "Armory",
  ScallopedAxe: "Armory",
  LeatherFrameShield: "Armory",
  BoneBow: "Armory",
  SlingsOfTheSun: "Armory",

  Market: "Market",
  CaravanEgyptian: "Market",
  TaxCollectors: "Market",
  Ambassadors: "Market",
  Coinage: "Market",
  DarkWater: "Market",

  Barracks: "Barracks",
  Spearman: "Barracks",
  MediumSpearmen: "Barracks",
  HeavySpearmen: "Barracks",
  ChampionSpearmen: "Barracks",
  Axeman: "Barracks",
  MediumAxemen: "Barracks",
  HeavyAxemen: "Barracks",
  ChampionAxemen: "Barracks",
  Slinger: "Barracks",
  MediumSlingers: "Barracks",
  HeavySlingers: "Barracks",
  ChampionSlingers: "Barracks",
  LevyBarracksSoldiers: "Barracks",
  ConscriptBarracksSoldiers: "Barracks",
  SerpentSpear: "Barracks",
  SpearOfHorus: "Barracks",
  AxeOfVengeance: "Barracks",
  GreatestOfFifty: "Barracks",

  MigdolStronghold: "MigdolStronghold",
  ChariotArcher: "MigdolStronghold",
  HeavyChariotArchers: "MigdolStronghold",
  ChampionChariotArchers: "MigdolStronghold",
  CamelRider: "MigdolStronghold",
  HeavyCamelRiders: "MigdolStronghold",
  ChampionCamelRiders: "MigdolStronghold",
  WarElephant: "MigdolStronghold",
  HeavyWarElephants: "MigdolStronghold",
  ChampionWarElephants: "MigdolStronghold",
  LevyMigdolSoldiers: "MigdolStronghold",
  ConscriptMigdolSoldiers: "MigdolStronghold",
  AdvancedFortifications: "MigdolStronghold",
  DesertWind: "MigdolStronghold",
  TusksOfApedemak: "MigdolStronghold",
  ValleyOfTheKings: "MigdolStronghold",

  SiegeWorks: "SiegeWorks",
  SiegeTower: "SiegeWorks",
  Catapult: "SiegeWorks",
  DraftHorses: "SiegeWorks",
  Engineers: "SiegeWorks",
  ForceOfTheWestWind: "SiegeWorks",

  Lighthouse: "Lighthouse",
  Wonder: "Wonder",
};

function egyptianNodeGroupRoot(node) {
  const parent = node?.parent || "";
  const name = node?.name || "";
  if (EGYPTIAN_TECHTREE_GROUP_ORDER.includes(parent)) return parent;
  if (EGYPTIAN_TECHTREE_PARENT_LANE[parent]) return EGYPTIAN_TECHTREE_PARENT_LANE[parent];
  if (!parent && EGYPTIAN_TECHTREE_GROUP_ORDER.includes(name)) return name;
  if (EGYPTIAN_TECHTREE_PARENT_LANE[name]) return EGYPTIAN_TECHTREE_PARENT_LANE[name];
  return parent || name;
}

function egyptianNodeGroupOrder(node) {
  const root = egyptianNodeGroupRoot(node);
  const idx = EGYPTIAN_TECHTREE_GROUP_ORDER.indexOf(root);
  return idx >= 0 ? idx : 99;
}

const EGYPTIAN_TECHTREE_FIXED_LOCAL_X = {
  Mercenary: 1,
  VillagerEgyptian: 1,
  Priest: 2,
  Pharaoh: 3,
  Masons: 2,
  Architects: 2,
  FortifiedTownCenter: 1,
  MercenaryCavalry: 1,
  SecretsOfTheTitans: 0,
  TitanGate: 0,

  HandAxe: 1,
  BowSaw: 1,
  Carpenters: 1,
  Pickaxe: 1,
  ShaftMine: 1,
  Quarry: 1,
  Husbandry: 1,
  HuntingEquipment: 1,
  Plow: 2,
  Irrigation: 2,
  FloodControl: 2,

  StoneWall: 0,
  FortifiedWall: 0,
  CitadelWall: 0,
  BronzeWall: 0,
  IronWall: 0,

  FishingShipEgyptian: 1,
  FishingShip: 1,
  PurseSeine: 1,
  SaltAmphora: 1,
  Kebenit: 2,
  SolarBarque: 2,
  RammingGalley: 3,
  WarBarge: 4,
  FuneralBarge: 4,
  TransportShipEgyptian: 5,
  TransportShip: 5,
  EnclosedDeck: 5,
  HeavyWarships: 3,
  ChampionWarships: 3,

  Omniscience: 0,
  NezhaChild: 1,
  NezhaYouth: 1,
  Nezha: 1,
  HandsOfThePharaoh: 1,
  Criosphinx: 1,
  Hieracosphinx: 1,
  FeetOfTheJackal: 1,
  Crocodilopolis: 1,

  MonumentToVillagers: 0,
  MonumentToPharaohs: 0,
  MonumentToSoldiers: 1,
  MonumentToGods: 1,
  MonumentToPriests: 2,

  WatchTower: 1,
  GuardTower: 1,
  BallistaTower: 1,
  SignalFires: 2,
  CarrierPigeons: 2,
  Crenellations: 1,
  BoilingOil: 1,

  CopperWeapons: 1,
  BronzeWeapons: 1,
  IronWeapons: 1,
  CopperArmor: 2,
  BronzeArmor: 2,
  IronArmor: 2,
  CopperShields: 3,
  BronzeShields: 3,
  IronShields: 3,
  Ballistics: 4,
  BurningPitch: 4,
  DwarvenWeapons: 1,
  MeteoricIronArmor: 2,
  DragonscaleShields: 3,

  CaravanEgyptian: 1,
  Coinage: 1,
  TaxCollectors: 2,
  Ambassadors: 2,

  Spearman: 1,
  MediumSpearmen: 1,
  HeavySpearmen: 1,
  ChampionSpearmen: 1,
  Axeman: 2,
  MediumAxemen: 2,
  HeavyAxemen: 2,
  ChampionAxemen: 2,
  Slinger: 3,
  MediumSlingers: 3,
  HeavySlingers: 3,
  ChampionSlingers: 3,
  LevyBarracksSoldiers: 4,
  ConscriptBarracksSoldiers: 4,

  ChariotArcher: 1,
  HeavyChariotArchers: 1,
  ChampionChariotArchers: 1,
  CamelRider: 2,
  HeavyCamelRiders: 2,
  ChampionCamelRiders: 2,
  WarElephant: 3,
  HeavyWarElephants: 3,
  ChampionWarElephants: 3,
  LevyMigdolSoldiers: 4,
  ConscriptMigdolSoldiers: 4,

  SiegeTower: 1,
  Catapult: 1,
  DraftHorses: 2,
  Engineers: 2,
};

function egyptianFixedLocalX(node, group) {
  const name = node?.name || "";
  if (group === "TownCenter" && /^SkinOfTheRhino/.test(name)) return 2;
  // Parent-child alignment is handled dynamically by egyptianCompactGroupNodes.
  // Example: if Mummy exists, AtefCrown follows Mummy's actual placed column.
  if (Object.prototype.hasOwnProperty.call(EGYPTIAN_TECHTREE_FIXED_LOCAL_X, name)) return EGYPTIAN_TECHTREE_FIXED_LOCAL_X[name];
  return undefined;
}

const EGYPTIAN_TECHTREE_PROTECTED_LINE_LOCAL_X = {
  TownCenter: [1, 2, 3],
  LumberCamp: [1],
  MiningCamp: [1],
  Granary: [1, 2],
  WallConnector: [0],
  Dock: [1, 2, 3, 4, 5],
  Temple: [0, 1],
  SentryTower: [1, 2],
  Armory: [1, 2, 3, 4],
  Market: [1, 2],
  Barracks: [1, 2, 3, 4],
  MigdolStronghold: [1, 2, 3, 4],
  SiegeWorks: [1, 2],
};

function egyptianProtectedLineColumns(group, groupNodes = null) {
  const candidateColumns = new Set(EGYPTIAN_TECHTREE_PROTECTED_LINE_LOCAL_X[group] || []);
  if (!Array.isArray(groupNodes)) return candidateColumns;
  const activeColumns = new Set();
  for (const node of groupNodes) {
    const fixed = egyptianFixedLocalX(node, group);
    if (!Number.isFinite(Number(fixed))) continue;
    const localX = Number(fixed);
    if (candidateColumns.has(localX)) activeColumns.add(localX);
  }
  return activeColumns;
}

function egyptianNextNonProtectedLocalX(group, minX, protectedColumns = null) {
  const columns = protectedColumns instanceof Set ? protectedColumns : egyptianProtectedLineColumns(group);
  for (let x = Math.max(0, Number(minX) || 0); x < 64; x += 1) {
    if (!columns.has(x)) return x;
  }
  return Math.max(0, Number(minX) || 0);
}

function egyptianTechTreeSourceNodes(age) {
  const templates = window.AOM_TECHTREE || {};
  const byMajor = {};
  for (const major of EGYPTIAN_TECHTREE_MAJOR_SOURCES) {
    const block = age === "ArchaicAge"
      ? extractXmlPropertyBlock(lookupTemplateBlock(templates.archaicByMajor, major) || "", "Technologies")
      : templates.ageTechnologiesByMajorAge?.[`${major}|${age}`] || "";
    byMajor[major] = parseTechTreeNodesFromBlock(block);
  }
  return byMajor;
}

function egyptianMinorBonusTokens(minorTech) {
  const block = window.AOM_TECHTREE?.bonusTrackByGod?.[canonicalMinorTech(minorTech)] || "";
  return parseTechTreeNodesFromBlock(block).filter((node) => node.type === "Unit" || node.type === "Tech");
}

function egyptianAllConditionalNodeNames() {
  const names = new Set();
  (UNIQUE_TECH_GROUPS || []).forEach((group) => {
    names.add(group.id);
    (group.techs || []).forEach((tech) => names.add(tech));
  });
  Object.values(EGYPTIAN_TECHTREE_MINOR_BY_AGE).flat().forEach((minor) => {
    egyptianMinorBonusTokens(minor).forEach((node) => names.add(node.name));
  });
  return names;
}

function egyptianCommonNodesForAge(age) {
  const byMajor = egyptianTechTreeSourceNodes(age);
  const excluded = egyptianAllConditionalNodeNames();
  const keySets = Object.fromEntries(Object.entries(byMajor).map(([major, nodes]) => [major, new Set(nodes.map(techTreeNodeKey))]));
  const allKeys = [...(keySets.Ra || new Set())];
  const commonKeys = allKeys.filter((key) => EGYPTIAN_TECHTREE_MAJOR_SOURCES.every((major) => keySets[major]?.has(key)));
  const sourceNodes = Object.values(byMajor).flat();
  const result = [];
  for (const key of commonKeys) {
    const matches = sourceNodes.filter((node) => techTreeNodeKey(node) === key);
    const rep = chooseGreekRepresentativeNode(matches);
    if (!rep || excluded.has(rep.name)) continue;
    result.push({ ...rep });
  }
  return result;
}

function egyptianFindRightSideNodesForToken(age, tokenNode) {
  const byMajor = egyptianTechTreeSourceNodes(age);
  const matches = Object.values(byMajor).flat().filter((node) => node.type === tokenNode.type && node.name === tokenNode.name);
  if (!matches.length) return [];
  const byKey = new Map();
  for (const node of matches) {
    const key = techTreeNodeKey(node);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(node);
  }
  const reps = [...byKey.values()].map((nodes) => ({ count: nodes.length, node: chooseGreekRepresentativeNode(nodes) }));
  reps.sort((a, b) => egyptianNodeGroupOrder(a.node) - egyptianNodeGroupOrder(b.node) || (a.node.x - b.node.x) || (a.node.y - b.node.y) || String(a.node.parent).localeCompare(String(b.node.parent)) || (b.count - a.count));
  return reps.map((entry) => ({ ...entry.node }));
}

function egyptianSelectedMinorNodesForAge(age, config) {
  const selected = (config.minorGods?.[age] || []).map(canonicalMinorTech);
  const nodes = [];
  for (const minor of selected) {
    for (const token of egyptianMinorBonusTokens(minor)) {
      nodes.push(...egyptianFindRightSideNodesForToken(age, token));
    }
  }
  return nodes;
}

function egyptianResolveNodeGroupFromNodes(node, allNodes) {
  const byName = new Map();
  for (const candidate of allNodes || []) {
    if (!candidate?.name) continue;
    if (!byName.has(candidate.name)) byName.set(candidate.name, []);
    byName.get(candidate.name).push(candidate);
  }
  const seen = new Set();
  let current = node?.parent || node?.name || "";
  for (let i = 0; i < 16 && current && !seen.has(current); i += 1) {
    seen.add(current);
    if (EGYPTIAN_TECHTREE_GROUP_ORDER.includes(current)) return current;
    if (EGYPTIAN_TECHTREE_PARENT_LANE[current]) return EGYPTIAN_TECHTREE_PARENT_LANE[current];
    const parentNode = (byName.get(current) || [])
      .slice()
      .sort((a, b) => (Number(a.x) || 0) - (Number(b.x) || 0) || (Number(a.y) || 0) - (Number(b.y) || 0))[0];
    if (parentNode?.parent) {
      current = parentNode.parent;
      continue;
    }
    if (parentNode?.name && parentNode.name !== current) {
      current = parentNode.name;
      continue;
    }
    break;
  }
  if (EGYPTIAN_TECHTREE_PARENT_LANE[node?.name]) return EGYPTIAN_TECHTREE_PARENT_LANE[node.name];
  return egyptianNodeGroupRoot(node);
}

function egyptianCompactGroupNodes(group, groupNodes, groupStartX = 0, protectedColumnsOverride = null, age = "") {
  const nodes = (groupNodes || []).map((inputNode) => {
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    return node;
  });

  const isGroupRootNode = (node) => !node?.parent && (node?.name === group || (group === "Armory" && node?.name === "DwarvenArmory") || (group === "Monument" && /^MonumentTo/.test(node?.name || "")));
  const hasRoot = nodes.some((node) => isGroupRootNode(node));
  const sourceOrder = (node) => (Number(node.x) || 0) * 10 + (Number(node.y) || 0);
  const sorted = nodes.slice().sort((a, b) => {
    const aIsRoot = isGroupRootNode(a);
    const bIsRoot = isGroupRootNode(b);
    if (aIsRoot !== bIsRoot) return aIsRoot ? -1 : 1;
    if (a.name === b.parent && b.name !== a.parent) return -1;
    if (b.name === a.parent && a.name !== b.parent) return 1;
    const af = egyptianFixedLocalX(a, group);
    const bf = egyptianFixedLocalX(b, group);
    if (Number.isFinite(Number(af)) !== Number.isFinite(Number(bf))) return Number.isFinite(Number(af)) ? -1 : 1;
    if (Number.isFinite(Number(af)) && af !== bf) return af - bf;
    return sourceOrder(a) - sourceOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name) || String(a.parent).localeCompare(String(b.parent));
  });

  const localOccupied = new Set();
  const placedLocalByName = new Map();
  const placedRowByName = new Map();
  const placed = [];
  const protectedLineColumns = protectedColumnsOverride instanceof Set ? protectedColumnsOverride : egyptianProtectedLineColumns(group, nodes);
  const directChildCountByName = new Map();
  const directChildFixedLocalXByName = new Map();
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    directChildCountByName.set(parentKey, (directChildCountByName.get(parentKey) || 0) + 1);
    const childFixed = egyptianFixedLocalX(child, group);
    if (Number.isFinite(Number(childFixed))) {
      const current = directChildFixedLocalXByName.get(parentKey);
      const childFixedX = Number(childFixed);
      if (!Number.isFinite(Number(current)) || childFixedX < Number(current)) {
        directChildFixedLocalXByName.set(parentKey, childFixedX);
      }
    }
  }

  const isLaneRootParent = (parent) => parent === group || (group === "Armory" && parent === "DwarvenArmory") || (group === "TownCenter" && parent === "TownCenter");
  const canUse = (x, y, allowProtectedLineColumn = true) => {
    if (localOccupied.has(`${x},${y}`)) return false;
    if (!allowProtectedLineColumn && protectedLineColumns.has(x)) return false;
    return true;
  };
  const reserve = (node, localX, y) => {
    localOccupied.add(`${localX},${y}`);
    for (const placementKey of techTreeNodePlacementKeys(node)) {
      if (!placedLocalByName.has(placementKey) || localX < placedLocalByName.get(placementKey)) {
        placedLocalByName.set(placementKey, localX);
        placedRowByName.set(placementKey, y);
      }
    }
    const cleanNode = { ...node };
    delete cleanNode._group;
    placed.push({ ...cleanNode, x: groupStartX + localX, y, position: `${groupStartX + localX},${y}` });
  };
  const firstFree = (minX, preferredY = 0, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) if (canUse(x, y, allowProtectedLineColumn)) return { x, y };
    }
    return { x: Math.max(0, minX || 0), y: preferredY === 1 ? 1 : 0 };
  };
  const firstFreeParentColumn = (minX, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn) && canUse(x, 1, allowProtectedLineColumn)) return { x, y: 0 };
    }
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn)) return { x, y: 0 };
    }
    return firstFree(minX, 0, allowProtectedLineColumn);
  };

  for (const node of techTreeParentFirstOrder(sorted, isGroupRootNode)) {
    const isRoot = isGroupRootNode(node);
    if (isRoot) {
      const fixed = egyptianFixedLocalX(node, group);
      const x = Number.isFinite(Number(fixed)) ? Number(fixed) : 0;
      const y = 0;
      if (!canUse(x, y, true)) {
        const alt = firstFree(x, y, true);
        reserve(node, alt.x, alt.y);
      } else {
        reserve(node, x, y);
      }
      continue;
    }

    const fixed = egyptianFixedLocalX(node, group);
    const parentLookupKey = techTreeNodeParentLookupKey(node);
    const parentLocal = placedLocalByName.get(parentLookupKey);
    const parentRow = placedRowByName.get(parentLookupKey);
    const childFixedLocal = directChildFixedLocalXByName.get(node.uniqueIdentifier || node.name);
    let desiredX;
    let preferredY = Number(node.y) === 0 ? 0 : 1;

    if (Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent)) {
      // Parent-line rule: once a parent is placed, every direct child follows
      // the parent's actual column. Fixed local X values are only preferred
      // before the parent is placed; they must not break the visible line if
      // the parent had to move to a cleaner/available column.
      desiredX = Number(parentLocal);
      if (Number.isFinite(Number(parentRow))) preferredY = Number(parentRow) === 0 ? 1 : 0;
    } else if (Number.isFinite(Number(fixed))) {
      desiredX = Number(fixed);
    } else if (Number.isFinite(Number(childFixedLocal))) {
      // Generic parent-line rule: if a direct child is part of a fixed upgrade
      // line, place the parent in that same column first. Example: Anubite
      // inherits FeetOfTheJackal's column, so the pair forms a clean vertical
      // parent line instead of the child occupying the protected column alone.
      desiredX = Number(childFixedLocal);
    } else {
      desiredX = 1;
    }

    if (node.type === "Unit") preferredY = 0;
    if (age === "ArchaicAge" && !isRoot && !localOccupied.has(`${desiredX},1`)) preferredY = 1;

    if (!hasRoot && !isLaneRootParent(node.parent)) desiredX = Math.max(desiredX, 0);
    if (hasRoot || group === "TownCenter") desiredX = Math.max(desiredX, 1);

    const hasFixedLocalX = Number.isFinite(Number(fixed));
    const isChildOfPlacedChain = Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent) && Number(parentLocal) === Number(desiredX);
    const isParentOfFixedChildLine = Number.isFinite(Number(childFixedLocal)) && Number(childFixedLocal) === Number(desiredX);
    const allowProtectedLineColumn = hasFixedLocalX || isChildOfPlacedChain || isParentOfFixedChildLine;
    if (!allowProtectedLineColumn && protectedLineColumns.has(desiredX)) {
      desiredX = egyptianNextNonProtectedLocalX(group, desiredX + 1, protectedLineColumns);
    }

    let placedHere = false;
    const hasDirectChildren = (directChildCountByName.get(node.uniqueIdentifier || node.name) || 0) > 0;
    if (hasDirectChildren) {
      const cleanColumn = firstFreeParentColumn(desiredX, allowProtectedLineColumn);
      reserve(node, cleanColumn.x, cleanColumn.y);
      placedHere = true;
    }
    if (!placedHere) {
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) {
        if (canUse(desiredX, y, allowProtectedLineColumn)) {
          reserve(node, desiredX, y);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere) {
      const alt = firstFree(desiredX + 1, preferredY, allowProtectedLineColumn);
      reserve(node, alt.x, alt.y);
    }
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function egyptianNormalizeTechTreeNodes(age, nodes, forcedGroupStarts = null, protectedColumnsByGroup = null) {
  const unique = new Map();
  for (const inputNode of nodes) {
    if (!inputNode || !inputNode.type || !inputNode.name) continue;
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    node.position = `${node.x},${node.y}`;
    const key = techTreeNodeKey(node);
    if (!unique.has(key)) unique.set(key, node);
  }

  const allNodes = [...unique.values()];
  const grouped = new Map();
  for (const node of allNodes) {
    const group = egyptianResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push({ ...node, _group: group });
  }

  const orderedGroups = [...grouped.entries()].sort(([groupA], [groupB]) => {
    const ai = EGYPTIAN_TECHTREE_GROUP_ORDER.indexOf(groupA);
    const bi = EGYPTIAN_TECHTREE_GROUP_ORDER.indexOf(groupB);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || String(groupA).localeCompare(String(groupB));
  });

  const placed = [];
  let nextGroupX = 0;
  for (const [group, groupNodes] of orderedGroups) {
    const forcedX = forcedGroupStarts && Number.isFinite(Number(forcedGroupStarts[group])) ? Number(forcedGroupStarts[group]) : undefined;
    const groupStartX = Number.isFinite(Number(forcedX)) ? Number(forcedX) : nextGroupX;
    const protectedColumns = protectedColumnsByGroup && protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : null;
    const groupPlaced = egyptianCompactGroupNodes(group, groupNodes, groupStartX, protectedColumns, age);
    placed.push(...groupPlaced);
    const width = groupPlaced.length ? Math.max(...groupPlaced.map((node) => Number(node.x) - groupStartX)) + 1 : 0;
    nextGroupX = groupStartX + Math.max(width, 0);
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || egyptianNodeGroupOrder(a) - egyptianNodeGroupOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function egyptianApplyThorDwarvenArmoryRightSide(nodes, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return nodes || [];
  return (nodes || []).map((inputNode) => {
    const node = { ...inputNode };
    if (node.type === "Unit" && node.name === "Armory") node.name = "DwarvenArmory";
    if (node.parent === "Armory") node.parent = "DwarvenArmory";
    return node;
  });
}

function egyptianThorDwarvenArmoryExtraRightSideNodes(age, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return [];
  if (age !== "MythicAge") return [];
  return [
    { type: "Tech", name: "DwarvenWeapons", parent: "IronWeapons", position: "30,1", x: 30, y: 1 },
    { type: "Tech", name: "MeteoricIronArmor", parent: "IronArmor", position: "31,1", x: 31, y: 1 },
    { type: "Tech", name: "DragonscaleShields", parent: "IronShields", position: "32,1", x: 32, y: 1 },
  ];
}

function egyptianRawTechTreeNodesForAge(age, config) {
  let nodes = [
    ...egyptianCommonNodesForAge(age),
    ...egyptianSelectedMinorNodesForAge(age, config),
    ...egyptianThorDwarvenArmoryExtraRightSideNodes(age, config),
  ].filter(Boolean);
  if (age === "ArchaicAge") {
    const group = selectedUniqueTechGroup(config);
    const tech = selectedUniqueTechRightSideName(config, group);
    if (group && tech) {
      for (const spec of uniqueTechRightSideNodeSpecs(config, "", group)) {
        const [xRaw, yRaw] = String(spec.position || spec.preferred?.[0] || "18,1").split(",");
        nodes.push({
          type: "Tech",
          name: tech,
          parent: spec.parent,
          position: `${Number(xRaw) || 0},${Number(yRaw) || 1}`,
          x: Number(xRaw) || 0,
          y: Number(yRaw) || 1,
        });
      }
    }
  }
  nodes = applyGenericBonusRightSideNodes("Egyptian", age, config, nodes);
  return egyptianApplyThorDwarvenArmoryRightSide(nodes, config);
}

function egyptianMeasureGroupWidths(nodes, protectedColumnsByGroup = null, age = "") {
  const widths = {};
  const grouped = new Map();
  for (const node of nodes || []) {
    const group = egyptianResolveNodeGroupFromNodes(node, nodes || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }
  for (const [group, groupNodes] of grouped.entries()) {
    const protectedColumns = protectedColumnsByGroup && protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : null;
    const placed = egyptianCompactGroupNodes(group, groupNodes, 0, protectedColumns, age);
    widths[group] = placed.length ? Math.max(...placed.map((node) => Number(node.x) || 0)) + 1 : 0;
  }
  return widths;
}

function egyptianBuildGlobalProtectedLineColumns(rawByAge) {
  const allNodes = Object.values(rawByAge || {}).flat();
  const grouped = new Map();
  for (const node of allNodes) {
    if (!node || !node.name) continue;
    const group = egyptianResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }

  const out = {};
  for (const [group, groupNodes] of grouped.entries()) {
    const candidateColumns = new Set(EGYPTIAN_TECHTREE_PROTECTED_LINE_LOCAL_X[group] || []);
    const activeColumns = new Set();
    for (const node of groupNodes) {
      const fixed = egyptianFixedLocalX(node, group);
      if (!Number.isFinite(Number(fixed))) continue;
      const localX = Number(fixed);
      if (candidateColumns.has(localX)) activeColumns.add(localX);
    }
    if (activeColumns.size) out[group] = activeColumns;
  }
  return out;
}

function buildEgyptianTechTreeGroupStarts(config) {
  if (config?.baseCulture !== "Egyptian") return null;
  const rawByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    rawByAge[age] = egyptianRawTechTreeNodesForAge(age, config);
  }
  const protectedColumnsByGroup = egyptianBuildGlobalProtectedLineColumns(rawByAge);
  config._egyptianTechTreeProtectedColumns = protectedColumnsByGroup;

  const maxWidths = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    const widths = egyptianMeasureGroupWidths(rawByAge[age], protectedColumnsByGroup, age);
    for (const [group, width] of Object.entries(widths)) maxWidths[group] = Math.max(maxWidths[group] || 0, width);
  }

  const starts = {};
  let nextX = 0;
  for (const group of EGYPTIAN_TECHTREE_GROUP_ORDER) {
    starts[group] = nextX;
    nextX += Math.max(maxWidths[group] || 0, 0);
  }
  return starts;
}

function generateEgyptianDynamicTechTreeTechnologies(age, config) {
  if (config?.baseCulture !== "Egyptian") return "";
  const nodes = egyptianRawTechTreeNodesForAge(age, config);
  const normalized = egyptianNormalizeTechTreeNodes(age, nodes, config?._egyptianTechTreeGroupStarts || null, config?._egyptianTechTreeProtectedColumns || null);
  const body = normalized.map((node) => buildTechTreeNodeXml(node)).join("\n");
  const block = `<local:TechTreeAge.Technologies>
${body}
            </local:TechTreeAge.Technologies>`;
  return applyCustomTechNamesToUiBlock(block, config || {});
}

const NORSE_TECHTREE_MAJOR_SOURCES = ["Freyr", "Loki", "Odin", "Thor"];
const NORSE_TECHTREE_MINOR_BY_AGE = {
  ClassicalAge: ["ClassicalAgeForseti", "ClassicalAgeFreyja", "ClassicalAgeHeimdall", "ClassicalAgeUllr"],
  HeroicAge: ["HeroicAgeAegir", "HeroicAgeBragi", "HeroicAgeNjord", "HeroicAgeSkadi"],
  MythicAge: ["MythicAgeBaldr", "MythicAgeHel", "MythicAgeTyr", "MythicAgeVidar"],
};

const NORSE_TECHTREE_GROUP_ORDER = [
  "TownCenter", "OxCartBuilding", "Farm", "House", "WallConnector", "Dock", "Temple", "SkyPassage",
  "SentryTower", "Armory", "Market", "Longhouse", "GreatHall", "HillFort", "Wonder",
];

const NORSE_TECHTREE_PARENT_LANE = {
  TownCenter: "TownCenter",
  VillagerNorse: "TownCenter",
  VillagerDwarf: "TownCenter",
  Berserk: "TownCenter",
  Masons: "TownCenter",
  Architects: "TownCenter",
  FortifiedTownCenter: "TownCenter",
  SecretsOfTheTitans: "TownCenter",
  TitanGate: "TownCenter",
  RingOath: "TownCenter",
  Rigsthula: "TownCenter",

  OxCartBuilding: "OxCartBuilding",
  Husbandry: "OxCartBuilding",
  HuntingEquipment: "OxCartBuilding",
  WinterHarvest: "OxCartBuilding",
  Plow: "OxCartBuilding",
  Irrigation: "OxCartBuilding",
  FloodControl: "OxCartBuilding",
  Pickaxe: "OxCartBuilding",
  ShaftMine: "OxCartBuilding",
  Quarry: "OxCartBuilding",
  HandAxe: "OxCartBuilding",
  BowSaw: "OxCartBuilding",
  Carpenters: "OxCartBuilding",

  Farm: "Farm",
  House: "House",
  WallConnector: "WallConnector",
  StoneWall: "WallConnector",
  FortifiedWall: "WallConnector",
  BronzeWall: "WallConnector",
  IronWall: "WallConnector",

  Dock: "Dock",
  FishingShipNorse: "Dock",
  FishingShip: "Dock",
  PurseSeine: "Dock",
  FishBasket: "Dock",
  SaltAmphora: "Dock",
  Longboat: "Dock",
  LongSerpent: "Dock",
  Dreki: "Dock",
  ArcticWinds: "Dock",
  DragonShip: "Dock",
  GraspOfRan: "Dock",
  TransportShipNorse: "Dock",
  TransportShip: "Dock",
  EnclosedDeck: "Dock",
  HeavyWarShips: "Dock",
  ChampionWarShips: "Dock",
  HeroicFleet: "Dock",
  ConscriptSailors: "Dock",
  Kraken: "Dock",
  JormunElver: "Dock",
  WrathOfTheDeep: "Dock",

  Temple: "Temple",
  SkyPassage: "SkyPassage",
  NezhaChild: "Temple",
  NezhaYouth: "Temple",
  Nezha: "Temple",
  Hersir: "Temple",
  Omniscience: "Temple",
  Valkyrie: "Temple",
  Disablot: "Temple",
  Draugr: "Temple",
  Valgaldr: "Temple",
  Troll: "Temple",
  CaveTroll: "Temple",
  Einheri: "Temple",
  Gjallarhorn: "Temple",
  BattleBoar: "Temple",
  MountainGiant: "Temple",
  Jotuns: "Temple",
  FrostGiant: "Temple",
  Rime: "Temple",
  RockGiant: "Temple",
  GraniteMaw: "Temple",
  FireGiant: "Temple",
  GraniteBlood: "Temple",
  Fafnir: "Temple",
  FenrisWolfBrood: "Temple",
  Rampage: "Temple",
  FeastsOfRenown: "Temple",
  NineWaves: "Temple",
  HallOfThanes: "Temple",
  Safeguard: "Temple",
  ThurisazRune: "Temple",
  EyesInTheForest: "Temple",

  SentryTower: "SentryTower",
  WatchTower: "SentryTower",
  GuardTower: "SentryTower",
  SignalFires: "SentryTower",
  CarrierPigeons: "SentryTower",
  Crenellations: "SentryTower",
  BoilingOil: "SentryTower",

  Armory: "Armory",
  DwarvenArmory: "Armory",
  CopperWeapons: "Armory",
  BronzeWeapons: "Armory",
  IronWeapons: "Armory",
  CopperArmor: "Armory",
  BronzeArmor: "Armory",
  IronArmor: "Armory",
  CopperShields: "Armory",
  BronzeShields: "Armory",
  IronShields: "Armory",
  Ballistics: "Armory",
  BurningPitch: "Armory",
  DwarvenWeapons: "Armory",
  MeteoricIronArmor: "Armory",
  DragonscaleShields: "Armory",
  DwarvenBreastplate: "Armory",

  Market: "Market",
  CaravanNorse: "Market",
  Coinage: "Market",
  TaxCollectors: "Market",
  Ambassadors: "Market",

  Longhouse: "Longhouse",
  Hirdman: "Longhouse",
  SwineArray: "Longhouse",
  ThrowingAxeman: "Longhouse",
  HuntressAxe: "Longhouse",
  MediumInfantry: "Longhouse",
  HeavyInfantry: "Longhouse",
  ChampionInfantry: "Longhouse",
  LevyLonghouseSoldiers: "Longhouse",
  ConscriptLonghouseSoldiers: "Longhouse",
  CallOfValhalla: "Longhouse",
  Berserkergang: "Longhouse",
  FuryOfTheFallen: "Longhouse",
  ServantsOfGlory: "Longhouse",
  SilentResolve: "Longhouse",
  TwilightOfTheGods: "Longhouse",
  Hamask: "Longhouse",

  GreatHall: "GreatHall",
  Godi: "GreatHall",
  RaidingCavalry: "GreatHall",
  Jarl: "GreatHall",
  MediumCavalry: "GreatHall",
  HeavyCavalry: "GreatHall",
  ChampionCavalry: "GreatHall",
  LevyGreatHallSoldiers: "GreatHall",
  ConscriptGreatHallSoldiers: "GreatHall",
  HallOfThanes: "GreatHall",
  Sessrumnir: "GreatHall",
  ThunderingHooves: "GreatHall",
  Vikings: "GreatHall",
  RingGiver: "GreatHall",
  SonsOfSleipnir: "GreatHall",
  AvengingSpirit: "GreatHall",
  HammerOfThunder: "GreatHall",

  HillFort: "HillFort",
  Huskarl: "HillFort",
  PortableRam: "HillFort",
  Ballista: "HillFort",
  DraftHorses: "HillFort",
  Engineers: "HillFort",
  AdvancedFortifications: "HillFort",
  MediumInfantry: "HillFort",
  HeavyInfantry: "HillFort",
  ChampionInfantry: "HillFort",
  LevyHillFortSoldiers: "HillFort",
  ConscriptHillFortSoldiers: "HillFort",
  Bravery: "HillFort",
  DwarvenAuger: "HillFort",
  Ydalir: "HillFort",

  Wonder: "Wonder",
};

const NORSE_TECHTREE_AMBIGUOUS_PARENT_NAMES = new Set([
  "MediumInfantry",
  "HeavyInfantry",
  "ChampionInfantry",
]);

function norseCanUseStaticParentLane(name) {
  return !!name && !NORSE_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(name) && !!NORSE_TECHTREE_PARENT_LANE[name];
}

function norseGroupFromUniqueReference(ref) {
  const value = String(ref || "");
  if (!value) return "";
  return NORSE_TECHTREE_GROUP_ORDER.find((group) => value.startsWith(group)) || "";
}

function norseGroupFromAmbiguousParentReference(parent, node) {
  if (!parent || node?.uniqueParent || !NORSE_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(parent)) return "";
  // Norse infantry upgrades are shown from both Longhouse and Hill Fort. The
  // Longhouse branch uses UniqueParent/UniqueIdentifier in vanilla; the plain
  // Parent="MediumInfantry" / Parent="HeavyInfantry" branch belongs to Hill Fort.
  if (["MediumInfantry", "HeavyInfantry", "ChampionInfantry"].includes(parent)) return "HillFort";
  return "";
}

function norseChooseParentNodeForChain(current, node, candidates) {
  const list = (candidates || []).filter(Boolean);
  if (!list.length) return null;
  if (node?.uniqueParent) {
    const exact = list.find((candidate) => candidate?.uniqueIdentifier === node.uniqueParent);
    if (exact) return exact;
  }
  const nodeX = Number(node?.x);
  return list.slice().sort((a, b) => {
    const ax = Number(a.x) || 0;
    const bx = Number(b.x) || 0;
    const aDistance = Number.isFinite(nodeX) ? Math.abs(ax - nodeX) : ax;
    const bDistance = Number.isFinite(nodeX) ? Math.abs(bx - nodeX) : bx;
    const aAfterPenalty = Number.isFinite(nodeX) && ax > nodeX ? 1000 : 0;
    const bAfterPenalty = Number.isFinite(nodeX) && bx > nodeX ? 1000 : 0;
    return (aDistance + aAfterPenalty) - (bDistance + bAfterPenalty) || ax - bx || (Number(a.y) || 0) - (Number(b.y) || 0);
  })[0];
}

function norseNodeGroupRoot(node) {
  const parent = node?.parent || "";
  const name = node?.name || "";
  const uniqueGroup = norseGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = norseGroupFromAmbiguousParentReference(parent, node);
  if (ambiguousGroup) return ambiguousGroup;
  if (NORSE_TECHTREE_GROUP_ORDER.includes(parent)) return parent;
  if (norseCanUseStaticParentLane(parent)) return NORSE_TECHTREE_PARENT_LANE[parent];
  if (!parent && NORSE_TECHTREE_GROUP_ORDER.includes(name)) return name;
  if (norseCanUseStaticParentLane(name)) return NORSE_TECHTREE_PARENT_LANE[name];
  return parent || name;
}

function norseNodeGroupOrder(node) {
  const root = norseNodeGroupRoot(node);
  const idx = NORSE_TECHTREE_GROUP_ORDER.indexOf(root);
  return idx >= 0 ? idx : 99;
}

const NORSE_TECHTREE_FIXED_LOCAL_X = {
  // Town Center / starting unit chain
  Berserk: 1,
  VillagerNorse: 1,
  Masons: 1,
  Architects: 1,
  VillagerDwarf: 2,
  FortifiedTownCenter: 2,
  SecretsOfTheTitans: 1,
  TitanGate: 1,

  // Ox Cart economic chains
  Husbandry: 1,
  HuntingEquipment: 1,
  WinterHarvest: 1,
  Plow: 2,
  Irrigation: 2,
  FloodControl: 2,
  Pickaxe: 3,
  ShaftMine: 3,
  Quarry: 3,
  HandAxe: 4,
  BowSaw: 4,
  Carpenters: 4,

  // Walls: wall upgrade line can share the building column.
  StoneWall: 0,
  FortifiedWall: 0,
  BronzeWall: 0,
  IronWall: 0,

  // Dock chains
  FishingShipNorse: 1,
  FishingShip: 1,
  PurseSeine: 1,
  SaltAmphora: 1,
  Longboat: 2,
  LongSerpent: 2,
  Dreki: 3,
  ArcticWinds: 3,
  DragonShip: 4,
  GraspOfRan: 4,
  TransportShipNorse: 5,
  TransportShip: 5,
  EnclosedDeck: 5,
  HeavyWarShips: 6,
  ChampionWarShips: 6,
  HeroicFleet: 7,
  ConscriptSailors: 7,

  // Temple: Omniscience can share the Temple building column.
  Omniscience: 0,
  NezhaChild: 1,
  NezhaYouth: 1,
  Nezha: 1,

  // Towers
  WatchTower: 1,
  GuardTower: 1,
  BoilingOil: 1,
  Crenellations: 1,
  SignalFires: 2,
  CarrierPigeons: 2,

  // Armory chains
  CopperWeapons: 1,
  BronzeWeapons: 1,
  IronWeapons: 1,
  CopperArmor: 2,
  BronzeArmor: 2,
  IronArmor: 2,
  CopperShields: 3,
  BronzeShields: 3,
  IronShields: 3,
  Ballistics: 4,
  BurningPitch: 4,
  DwarvenWeapons: 1,
  MeteoricIronArmor: 2,
  DragonscaleShields: 3,

  // Market chains
  CaravanNorse: 1,
  Coinage: 1,
  TaxCollectors: 2,
  Ambassadors: 2,

  // Military production chains
  Hirdman: 1,
  ThrowingAxeman: 2,
  Berserk: 3,
  MediumInfantry: 4,
  HeavyInfantry: 4,
  ChampionInfantry: 4,
  LevyLonghouseSoldiers: 5,
  ConscriptLonghouseSoldiers: 5,

  Hersir: 1,
  Godi: 1,
  RaidingCavalry: 2,
  Jarl: 2,
  MediumCavalry: 4,
  HeavyCavalry: 4,
  ChampionCavalry: 4,
  LevyGreatHallSoldiers: 3,
  ConscriptGreatHallSoldiers: 3,

  Huskarl: 1,
  PortableRam: 2,
  Ballista: 2,
  LevyHillFortSoldiers: 3,
  ConscriptHillFortSoldiers: 3,

  // Minor-god parent/child lines and direct military techs
  SwineArray: 1,
  HuntressAxe: 2,
  CallOfValhalla: 3,
  Berserkergang: 3,
  Hamask: 3,
  ServantsOfGlory: 5,
  FuryOfTheFallen: 5,
  SilentResolve: 5,
  TwilightOfTheGods: 5,

  HallOfThanes: 1,
  Sessrumnir: 1,
  Vikings: 1,
  AvengingSpirit: 1,
  ThunderingHooves: 2,
  RingGiver: 2,
  SonsOfSleipnir: 2,
  HammerOfThunder: 1,

  NineWaves: 1,
  FeastsOfRenown: 1,
  Bravery: 1,
  DraftHorses: 2,
  Engineers: 2,
  AdvancedFortifications: 2,
  DwarvenAuger: 2,
  Ydalir: 2,

  Disablot: 1,
  Valgaldr: 2,
  CaveTroll: 2,
  Gjallarhorn: 2,
  Jotuns: 1,
  Rime: 2,
  GraniteMaw: 3,
  GraniteBlood: 1,
  Rampage: 2,
  GraniteMaw: 3,
  ThurisazRune: 4,
  Safeguard: 4,

  LongSerpent: 2,
  ArcticWinds: 3,
  GraspOfRan: 4,
  WrathOfTheDeep: 7,
};

function norseFixedLocalX(node, group) {
  const name = node?.name || "";
  if (group === "TownCenter" && /^SkinOfTheRhino/.test(name)) return 2;
  // Norse has several duplicate unit names across buildings. Keep the
  // TownCenter starting line compact and distinct from the Longhouse Berserk
  // line: TC uses Villager=1, Berserk=2, Dwarf=3.
  if (group === "TownCenter" && name === "Berserk") return 2;
  if (group === "TownCenter" && name === "VillagerDwarf") return 3;
  if (group === "Longhouse" && name === "Berserk") return 3;
  // Parent-child alignment is handled dynamically by norseCompactGroupNodes.
  if (Object.prototype.hasOwnProperty.call(NORSE_TECHTREE_FIXED_LOCAL_X, name)) return NORSE_TECHTREE_FIXED_LOCAL_X[name];
  return undefined;
}

const NORSE_TECHTREE_PROTECTED_LINE_LOCAL_X = {
  TownCenter: [1, 2],
  OxCartBuilding: [1, 2, 3, 4],
  WallConnector: [0],
  Dock: [1, 2, 3, 4, 5, 6, 7],
  Temple: [0, 1, 2, 3, 4],
  SentryTower: [1, 2],
  Armory: [1, 2, 3, 4],
  Market: [1, 2],
  Longhouse: [1, 2, 3, 4, 5],
  GreatHall: [1, 2, 3, 4],
  HillFort: [1, 2, 3],
};

function norseProtectedLineColumns(group, groupNodes = null) {
  const candidateColumns = new Set(NORSE_TECHTREE_PROTECTED_LINE_LOCAL_X[group] || []);
  if (!Array.isArray(groupNodes)) return candidateColumns;
  const activeColumns = new Set();
  for (const node of groupNodes) {
    const fixed = norseFixedLocalX(node, group);
    if (!Number.isFinite(Number(fixed))) continue;
    const localX = Number(fixed);
    if (candidateColumns.has(localX)) activeColumns.add(localX);
  }
  return activeColumns;
}

function norseIsLaneRootParent(group, parent) {
  return parent === group
    || (group === "Armory" && parent === "DwarvenArmory")
    || (group === "TownCenter" && parent === "TownCenter")
    || (group === "Monument" && /^MonumentTo/.test(parent || ""));
}

function norseNextNonProtectedLocalX(group, minX, protectedColumns = null) {
  const columns = protectedColumns instanceof Set ? protectedColumns : norseProtectedLineColumns(group);
  for (let x = Math.max(0, Number(minX) || 0); x < 64; x += 1) {
    if (!columns.has(x)) return x;
  }
  return Math.max(0, Number(minX) || 0);
}

function norseTechTreeSourceNodes(age) {
  const templates = window.AOM_TECHTREE || {};
  const byMajor = {};
  for (const major of NORSE_TECHTREE_MAJOR_SOURCES) {
    const block = age === "ArchaicAge"
      ? extractXmlPropertyBlock(lookupTemplateBlock(templates.archaicByMajor, major) || "", "Technologies")
      : templates.ageTechnologiesByMajorAge?.[`${major}|${age}`] || "";
    byMajor[major] = parseTechTreeNodesFromBlock(block);
  }
  return byMajor;
}

function norseMinorBonusTokens(minorTech) {
  const block = window.AOM_TECHTREE?.bonusTrackByGod?.[canonicalMinorTech(minorTech)] || "";
  return parseTechTreeNodesFromBlock(block).filter((node) => node.type === "Unit" || node.type === "Tech");
}

function norseAllConditionalNodeNames() {
  const names = new Set();
  (UNIQUE_TECH_GROUPS || []).forEach((group) => {
    names.add(group.id);
    (group.techs || []).forEach((tech) => names.add(tech));
  });
  Object.values(NORSE_TECHTREE_MINOR_BY_AGE).flat().forEach((minor) => {
    norseMinorBonusTokens(minor).forEach((node) => names.add(node.name));
  });
  return names;
}

function norseCommonNodesForAge(age) {
  const byMajor = norseTechTreeSourceNodes(age);
  const excluded = norseAllConditionalNodeNames();
  const keySets = Object.fromEntries(Object.entries(byMajor).map(([major, nodes]) => [major, new Set(nodes.map(techTreeNodeKey))]));
  const baseSource = NORSE_TECHTREE_MAJOR_SOURCES[0];
  const allKeys = [...(keySets[baseSource] || new Set())];
  const commonKeys = allKeys.filter((key) => NORSE_TECHTREE_MAJOR_SOURCES.every((major) => keySets[major]?.has(key)));
  const sourceNodes = Object.values(byMajor).flat();
  const result = [];
  for (const key of commonKeys) {
    const matches = sourceNodes.filter((node) => techTreeNodeKey(node) === key);
    const rep = chooseGreekRepresentativeNode(matches);
    if (!rep || excluded.has(rep.name)) continue;
    result.push({ ...rep });
  }
  return result;
}

function norseFindRightSideNodesForToken(age, tokenNode) {
  const byMajor = norseTechTreeSourceNodes(age);
  const matches = Object.values(byMajor).flat().filter((node) => node.type === tokenNode.type && node.name === tokenNode.name);
  if (!matches.length) return [];
  const byKey = new Map();
  for (const node of matches) {
    const key = techTreeNodeKey(node);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(node);
  }
  const reps = [...byKey.values()].map((nodes) => ({ count: nodes.length, node: chooseGreekRepresentativeNode(nodes) }));
  reps.sort((a, b) => norseNodeGroupOrder(a.node) - norseNodeGroupOrder(b.node) || (a.node.x - b.node.x) || (a.node.y - b.node.y) || String(a.node.parent).localeCompare(String(b.node.parent)) || (b.count - a.count));
  return reps.map((entry) => ({ ...entry.node }));
}

function norseMinorNodeSameBuildingKey(node, contextNodes = []) {
  if (!node?.type || !node?.name) return "";
  const group = norseResolveNodeGroupFromNodes(node, contextNodes && contextNodes.length ? contextNodes : [node]);
  return `${node.type}|${node.name}|${group}`;
}

function norsePriorSelectedMinorBuildingKeys(age, config) {
  const out = new Set();
  const order = ["ClassicalAge", "HeroicAge", "MythicAge"];
  const index = order.indexOf(age);
  if (index <= 0) return out;
  for (const priorAge of order.slice(0, index)) {
    const selected = (config.minorGods?.[priorAge] || []).map(canonicalMinorTech);
    const priorNodes = [];
    for (const minor of selected) {
      for (const token of norseMinorBonusTokens(minor)) {
        priorNodes.push(...norseFindRightSideNodesForToken(priorAge, token));
      }
    }
    for (const node of priorNodes) {
      const key = norseMinorNodeSameBuildingKey(node, priorNodes);
      if (key) out.add(key);
    }
  }
  return out;
}

function norseSelectedMinorNodesForAge(age, config) {
  const selected = (config.minorGods?.[age] || []).map(canonicalMinorTech);
  const nodes = [];
  const seenSameBuilding = norsePriorSelectedMinorBuildingKeys(age, config);
  for (const minor of selected) {
    for (const token of norseMinorBonusTokens(minor)) {
      for (const candidate of norseFindRightSideNodesForToken(age, token)) {
        const key = norseMinorNodeSameBuildingKey(candidate, [...nodes, candidate]);
        if (key && seenSameBuilding.has(key)) continue;
        nodes.push(candidate);
        if (key) seenSameBuilding.add(key);
      }
    }
  }
  return nodes;
}

function norseResolveNodeGroupFromNodes(node, allNodes) {
  const byName = new Map();
  const byUniqueIdentifier = new Map();
  for (const candidate of allNodes || []) {
    if (!candidate?.name) continue;
    if (!byName.has(candidate.name)) byName.set(candidate.name, []);
    byName.get(candidate.name).push(candidate);
    if (candidate.uniqueIdentifier) byUniqueIdentifier.set(candidate.uniqueIdentifier, candidate);
  }
  const uniqueGroup = norseGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = norseGroupFromAmbiguousParentReference(node?.parent || "", node);
  if (ambiguousGroup) return ambiguousGroup;
  const seen = new Set();
  let current = node?.uniqueParent || node?.parent || node?.name || "";
  let walkerNode = node;
  for (let i = 0; i < 16 && current && !seen.has(current); i += 1) {
    seen.add(current);
    if (NORSE_TECHTREE_GROUP_ORDER.includes(current)) return current;
    if (norseCanUseStaticParentLane(current)) return NORSE_TECHTREE_PARENT_LANE[current];
    let parentNode = byUniqueIdentifier.get(current) || null;
    if (!parentNode) parentNode = norseChooseParentNodeForChain(current, walkerNode, byName.get(current) || []);
    if (parentNode?.uniqueParent || parentNode?.parent) {
      walkerNode = parentNode;
      current = parentNode.uniqueParent || parentNode.parent;
      continue;
    }
    if (parentNode?.name && parentNode.name !== current) {
      walkerNode = parentNode;
      current = parentNode.name;
      continue;
    }
    break;
  }
  if (norseCanUseStaticParentLane(node?.name)) return NORSE_TECHTREE_PARENT_LANE[node.name];
  return norseNodeGroupRoot(node);
}

function norseCompactGroupNodes(group, groupNodes, groupStartX = 0, protectedColumnsOverride = null, age = "", lineMemberKeys = null) {
  const nodes = (groupNodes || []).map((inputNode) => {
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    return node;
  });

  const isGroupRootNode = (node) => !node?.parent && (node?.name === group || (group === "Armory" && node?.name === "DwarvenArmory") || (group === "Monument" && /^MonumentTo/.test(node?.name || "")));
  const hasRoot = nodes.some((node) => isGroupRootNode(node));
  const sourceOrder = (node) => (Number(node.x) || 0) * 10 + (Number(node.y) || 0);
  const sorted = nodes.slice().sort((a, b) => {
    const aIsRoot = isGroupRootNode(a);
    const bIsRoot = isGroupRootNode(b);
    if (aIsRoot !== bIsRoot) return aIsRoot ? -1 : 1;
    if (a.name === b.parent && b.name !== a.parent) return -1;
    if (b.name === a.parent && a.name !== b.parent) return 1;
    const af = norseFixedLocalX(a, group);
    const bf = norseFixedLocalX(b, group);
    if (Number.isFinite(Number(af)) !== Number.isFinite(Number(bf))) return Number.isFinite(Number(af)) ? -1 : 1;
    if (Number.isFinite(Number(af)) && af !== bf) return af - bf;
    return sourceOrder(a) - sourceOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name) || String(a.parent).localeCompare(String(b.parent));
  });

  const localOccupied = new Set();
  const placedLocalByName = new Map();
  const placedRowByName = new Map();
  const placed = [];
  const protectedLineColumns = protectedColumnsOverride instanceof Set ? protectedColumnsOverride : norseProtectedLineColumns(group, nodes);
  const isLineMemberNode = (node) => lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
  const directChildCountByName = new Map();
  const directChildFixedLocalXByName = new Map();
  const rootDirectChildTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildWithChildrenTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypesByLocalX = new Map();
  const isLaneRootParent = (parent) => norseIsLaneRootParent(group, parent);
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    directChildCountByName.set(parentKey, (directChildCountByName.get(parentKey) || 0) + 1);
    const childFixed = norseFixedLocalX(child, group);
    if (Number.isFinite(Number(childFixed))) {
      const current = directChildFixedLocalXByName.get(parentKey);
      const childFixedX = Number(childFixed);
      if (!Number.isFinite(Number(current)) || childFixedX < Number(current)) {
        directChildFixedLocalXByName.set(parentKey, childFixedX);
      }
    }
  }
  for (const child of nodes) {
    if (!child || !isLaneRootParent(child.parent)) continue;
    if (child.type === "Unit" || child.type === "Tech") {
      rootDirectChildTypeCounts[child.type] += 1;
      const childKey = child.uniqueIdentifier || child.name;
      if (directChildCountByName.get(childKey) || 0) {
        rootDirectChildWithChildrenTypeCounts[child.type] += 1;
      } else {
        rootDirectChildlessTypeCounts[child.type] += 1;
        const fixedLocal = norseFixedLocalX(child, group);
        const localX = Number.isFinite(Number(fixedLocal)) ? Number(fixedLocal) : undefined;
        if (Number.isFinite(localX)) {
          if (!rootDirectChildlessTypesByLocalX.has(localX)) rootDirectChildlessTypesByLocalX.set(localX, new Set());
          rootDirectChildlessTypesByLocalX.get(localX).add(child.type);
        }
      }
    }
  }

  const canUse = (x, y, allowProtectedLineColumn = true) => {
    if (localOccupied.has(`${x},${y}`)) return false;
    if (!allowProtectedLineColumn && protectedLineColumns.has(x)) return false;
    return true;
  };
  const reserve = (node, localX, y) => {
    localOccupied.add(`${localX},${y}`);
    for (const placementKey of techTreeNodePlacementKeys(node)) {
      if (!placedLocalByName.has(placementKey) || localX < placedLocalByName.get(placementKey)) {
        placedLocalByName.set(placementKey, localX);
        placedRowByName.set(placementKey, y);
      }
    }
    const cleanNode = { ...node };
    delete cleanNode._group;
    placed.push({ ...cleanNode, x: groupStartX + localX, y, position: `${groupStartX + localX},${y}` });
  };
  const firstFree = (minX, preferredY = 0, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) if (canUse(x, y, allowProtectedLineColumn)) return { x, y };
    }
    return { x: Math.max(0, minX || 0), y: preferredY === 1 ? 1 : 0 };
  };
  const firstFreeParentColumn = (minX, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn) && canUse(x, 1, allowProtectedLineColumn)) return { x, y: 0 };
    }
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn)) return { x, y: 0 };
    }
    return firstFree(minX, 0, allowProtectedLineColumn);
  };

  for (const node of techTreeParentDepthFirstOrder(sorted, isGroupRootNode)) {
    const isRoot = isGroupRootNode(node);
    if (isRoot) {
      const fixed = norseFixedLocalX(node, group);
      const x = Number.isFinite(Number(fixed)) ? Number(fixed) : 0;
      const y = 0;
      if (!canUse(x, y, true)) {
        const alt = firstFree(x, y, true);
        reserve(node, alt.x, alt.y);
      } else {
        reserve(node, x, y);
      }
      continue;
    }

    const fixed = norseFixedLocalX(node, group);
    const parentLookupKey = techTreeNodeParentLookupKey(node);
    const parentLocal = placedLocalByName.get(parentLookupKey);
    const parentRow = placedRowByName.get(parentLookupKey);
    const childFixedLocal = directChildFixedLocalXByName.get(node.uniqueIdentifier || node.name);
    let desiredX;
    let preferredY = Number(node.y) === 0 ? 0 : 1;

    if (Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent)) {
      // Parent-line rule: once a parent is placed, every direct child follows
      // the parent's actual column. Fixed local X values are only preferred
      // before the parent is placed; they must not break the visible line if
      // the parent had to move to a cleaner/available column.
      desiredX = Number(parentLocal);
      if (Number.isFinite(Number(parentRow))) preferredY = Number(parentRow) === 0 ? 1 : 0;
    } else if (Number.isFinite(Number(fixed))) {
      desiredX = Number(fixed);
    } else if (Number.isFinite(Number(childFixedLocal))) {
      // Generic parent-line rule: if a direct child is part of a fixed upgrade
      // line, place the parent in that same column first. Example: Anubite
      // inherits FeetOfTheJackal's column, so the pair forms a clean vertical
      // parent line instead of the child occupying the protected column alone.
      desiredX = Number(childFixedLocal);
    } else {
      desiredX = 1;
    }

    const hasDirectChildren = (directChildCountByName.get(node.uniqueIdentifier || node.name) || 0) > 0;
    const directFromRootBuilding = hasRoot && isLaneRootParent(node.parent);
    const rootHasChildlessUnitAndTech = rootDirectChildlessTypeCounts.Unit > 0 && rootDirectChildlessTypeCounts.Tech > 0;
    const rootChildlessTypesAtDesiredX = rootDirectChildlessTypesByLocalX.get(Number(desiredX)) || new Set();
    const rootColumnHasChildlessUnitAndTech = rootChildlessTypesAtDesiredX.has("Unit") && rootChildlessTypesAtDesiredX.has("Tech");
    const rootHasOnlyChildlessUnits = directFromRootBuilding
      && !hasDirectChildren
      && node.type === "Unit"
      && !isLineMemberNode(node)
      && rootDirectChildlessTypeCounts.Unit > 0
      && rootDirectChildlessTypeCounts.Tech === 0
      && rootDirectChildWithChildrenTypeCounts.Unit === 0
      && rootDirectChildWithChildrenTypeCounts.Tech === 0;
    if (rootHasOnlyChildlessUnits) {
      // When a building appears in the current age and only trains units from
      // its root command row, keep those units together on row 1 and pack them
      // compactly from the first available column. This avoids gaps like an
      // empty TownCenter column 1/2 while all trained units are shifted right.
      desiredX = 1;
      preferredY = 1;
    } else if (directFromRootBuilding && !hasDirectChildren) {
      // Direct children of a building that appears in this age should keep the
      // building row clean. Childless units prefer row 1 unless a childless tech
      // also wants that exact column; only then use the classic unit row 0 /
      // tech row 1 split. This keeps Longhouse units together on row 1 while
      // still handling HillFort columns that contain both a unit and a tech.
      if (node.type === "Unit") preferredY = rootColumnHasChildlessUnitAndTech ? 0 : 1;
      if (node.type === "Tech") preferredY = 1;
    } else if (node.type === "Unit") {
      preferredY = 0;
    }
    if (age === "ArchaicAge" && !isRoot && node.type === "Unit" && !hasDirectChildren && !rootHasChildlessUnitAndTech && !localOccupied.has(`${desiredX},1`)) preferredY = 1;
    if (age === "ArchaicAge" && !isRoot && node.type !== "Unit" && !localOccupied.has(`${desiredX},1`)) preferredY = 1;

    if (!hasRoot && !isLaneRootParent(node.parent)) desiredX = Math.max(desiredX, 0);
    if (hasRoot || group === "TownCenter") desiredX = Math.max(desiredX, 1);

    const hasFixedLocalX = Number.isFinite(Number(fixed));
    const isChildOfPlacedChain = Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent) && Number(parentLocal) === Number(desiredX);
    const isParentOfFixedChildLine = Number.isFinite(Number(childFixedLocal)) && Number(childFixedLocal) === Number(desiredX);
    const isGlobalLineMember = isLineMemberNode(node);
    const isFixedLineNode = hasFixedLocalX && protectedLineColumns.has(Number(fixed)) && (isGlobalLineMember || !isLaneRootParent(node.parent) || hasDirectChildren || isParentOfFixedChildLine);
    const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
      || (group === "Temple" && node.name === "Omniscience");
    const allowProtectedLineColumn = rootHasOnlyChildlessUnits || isChildOfPlacedChain || isParentOfFixedChildLine || isFixedLineNode || isSharedColumnException;
    if (!allowProtectedLineColumn && protectedLineColumns.has(desiredX)) {
      desiredX = norseNextNonProtectedLocalX(group, desiredX + 1, protectedLineColumns);
    }

    let placedHere = false;
    if (rootHasOnlyChildlessUnits) {
      for (let x = Math.max(1, Number(desiredX) || 1); x < 64; x += 1) {
        if (canUse(x, 1, true)) {
          reserve(node, x, 1);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere && hasDirectChildren) {
      // Any visible parent line, including tech upgrade chains, should reserve
      // a clean column first. This keeps chains such as CopperWeapons ->
      // BronzeWeapons and Valkyrie -> Disablot in one vertical line instead
      // of letting an unrelated node occupy the child row.
      const cleanColumn = firstFreeParentColumn(desiredX, allowProtectedLineColumn);
      reserve(node, cleanColumn.x, cleanColumn.y);
      placedHere = true;
    }
    if (!placedHere) {
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) {
        if (canUse(desiredX, y, allowProtectedLineColumn)) {
          reserve(node, desiredX, y);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere) {
      const alt = firstFree(desiredX + 1, preferredY, allowProtectedLineColumn);
      reserve(node, alt.x, alt.y);
    }
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function norseNormalizeTechTreeNodes(age, nodes, forcedGroupStarts = null, protectedColumnsByGroup = null, lineMemberKeys = null) {
  const unique = new Map();
  for (const inputNode of nodes) {
    if (!inputNode || !inputNode.type || !inputNode.name) continue;
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    node.position = `${node.x},${node.y}`;
    const key = techTreeNodeKey(node);
    if (!unique.has(key)) unique.set(key, node);
  }

  const allNodes = [...unique.values()];
  const grouped = new Map();
  for (const node of allNodes) {
    const group = norseResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push({ ...node, _group: group });
  }

  const orderedGroups = [...grouped.entries()].sort(([groupA], [groupB]) => {
    const ai = NORSE_TECHTREE_GROUP_ORDER.indexOf(groupA);
    const bi = NORSE_TECHTREE_GROUP_ORDER.indexOf(groupB);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || String(groupA).localeCompare(String(groupB));
  });

  const placed = [];
  let nextGroupX = 0;
  for (const [group, groupNodes] of orderedGroups) {
    const forcedX = forcedGroupStarts && Number.isFinite(Number(forcedGroupStarts[group])) ? Number(forcedGroupStarts[group]) : undefined;
    const groupStartX = Number.isFinite(Number(forcedX)) ? Number(forcedX) : nextGroupX;
    const protectedColumns = protectedColumnsByGroup && protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : null;
    const groupPlaced = norseCompactGroupNodes(group, groupNodes, groupStartX, protectedColumns, age, lineMemberKeys);
    placed.push(...groupPlaced);
    const width = groupPlaced.length ? Math.max(...groupPlaced.map((node) => Number(node.x) - groupStartX)) + 1 : 0;
    nextGroupX = groupStartX + Math.max(width, 0);
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || norseNodeGroupOrder(a) - norseNodeGroupOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function norseApplyThorDwarvenArmoryRightSide(nodes, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return nodes || [];
  return (nodes || []).map((inputNode) => {
    const node = { ...inputNode };
    if (node.type === "Unit" && node.name === "Armory") node.name = "DwarvenArmory";
    if (node.parent === "Armory") node.parent = "DwarvenArmory";
    return node;
  });
}


function norseBaseArmoryRightSideNodes(age, config) {
  const useDwarven = selectedHasThorDwarvenArmoryBonus(config);
  const armory = useDwarven ? "DwarvenArmory" : "Armory";
  const node = (type, name, parent, position) => {
    const [xRaw, yRaw] = String(position).split(",");
    return { type, name, parent: parent || "", position, x: Number(xRaw) || 0, y: Number(yRaw) || 0 };
  };
  if (useDwarven) {
    if (age === "ArchaicAge") {
      return [
        node("Unit", armory, "", "24,0"),
        node("Tech", "Ballistics", armory, "25,1"),
        node("Tech", "CopperWeapons", armory, "26,0"),
        node("Tech", "BronzeWeapons", "CopperWeapons", "26,1"),
        node("Tech", "CopperArmor", armory, "27,0"),
        node("Tech", "BronzeArmor", "CopperArmor", "27,1"),
        node("Tech", "CopperShields", armory, "28,0"),
        node("Tech", "BronzeShields", "CopperShields", "28,1"),
      ];
    }
    if (age === "ClassicalAge") {
      return [
        node("Tech", "BurningPitch", armory, "25,1"),
        node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
        node("Tech", "DwarvenWeapons", "IronWeapons", "26,1"),
        node("Tech", "IronArmor", "BronzeArmor", "27,0"),
        node("Tech", "MeteoricIronArmor", "IronArmor", "27,1"),
        node("Tech", "IronShields", "BronzeShields", "28,0"),
        node("Tech", "DragonscaleShields", "IronShields", "28,1"),
      ];
    }
    return [];
  }
  if (age === "ClassicalAge") {
    return [
      node("Unit", armory, "", "24,0"),
      node("Tech", "Ballistics", armory, "25,1"),
      node("Tech", "CopperWeapons", armory, "26,1"),
      node("Tech", "CopperArmor", armory, "27,1"),
      node("Tech", "CopperShields", armory, "28,1"),
    ];
  }
  if (age === "HeroicAge") {
    return [
      node("Tech", "BronzeWeapons", "CopperWeapons", "26,0"),
      node("Tech", "BronzeArmor", "CopperArmor", "27,0"),
      node("Tech", "BronzeShields", "CopperShields", "28,0"),
    ];
  }
  if (age === "MythicAge") {
    return [
      node("Tech", "BurningPitch", armory, "25,0"),
      node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
      node("Tech", "IronArmor", "BronzeArmor", "27,0"),
      node("Tech", "IronShields", "BronzeShields", "28,0"),
    ];
  }
  return [];
}

function norseThorDwarvenArmoryExtraRightSideNodes(age, config) {
  // Kept for compatibility; Norse Dwarven Armory right-side nodes are built
  // by norseBaseArmoryRightSideNodes so the Armory/DwarvenArmory lane remains
  // complete and age-appropriate.
  return [];
}

function norseRawTechTreeNodesForAge(age, config) {
  let nodes = [
    ...norseCommonNodesForAge(age),
    ...norseBaseArmoryRightSideNodes(age, config),
    ...norseSelectedMinorNodesForAge(age, config),
    ...norseThorDwarvenArmoryExtraRightSideNodes(age, config),
  ].filter(Boolean);
  if (age === "ArchaicAge") {
    const group = selectedUniqueTechGroup(config);
    const tech = selectedUniqueTechRightSideName(config, group);
    if (group && tech) {
      for (const spec of uniqueTechRightSideNodeSpecs(config, "", group)) {
        const [xRaw, yRaw] = String(spec.position || spec.preferred?.[0] || "18,1").split(",");
        nodes.push({
          type: "Tech",
          name: tech,
          parent: spec.parent,
          position: `${Number(xRaw) || 0},${Number(yRaw) || 1}`,
          x: Number(xRaw) || 0,
          y: Number(yRaw) || 1,
        });
      }
    }
  }
  nodes = applyGenericBonusRightSideNodes("Norse", age, config, nodes, { applyThorCompact: false });
  return norseApplyThorDwarvenArmoryRightSide(nodes, config);
}

function norseMeasureGroupWidths(nodes, protectedColumnsByGroup = null, age = "", lineMemberKeys = null) {
  const widths = {};
  const grouped = new Map();
  for (const node of nodes || []) {
    const group = norseResolveNodeGroupFromNodes(node, nodes || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }
  for (const [group, groupNodes] of grouped.entries()) {
    const protectedColumns = protectedColumnsByGroup && protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : null;
    const placed = norseCompactGroupNodes(group, groupNodes, 0, protectedColumns, age, lineMemberKeys);
    widths[group] = placed.length ? Math.max(...placed.map((node) => Number(node.x) || 0)) + 1 : 0;
  }
  return widths;
}


function norseBuildLineMemberKeySets(rawByAge) {
  const byAge = {};
  const global = new Set();
  const allNodes = Object.values(rawByAge || {}).flat().filter(Boolean);
  const parentRefs = new Set();
  const childKeys = new Set();

  const scopedKey = (group, key) => `${group || ""}::${key || ""}`;

  for (const node of allNodes) {
    const parentKey = techTreeNodeParentLookupKey(node);
    if (!parentKey) continue;
    const group = norseResolveNodeGroupFromNodes(node, allNodes);
    if (norseIsLaneRootParent(group, parentKey)) continue;
    // Scope parent references by resolved building lane. Otherwise duplicate
    // Norse names such as Berserk/Hersir/MediumInfantry can falsely mark an
    // unrelated building's node as part of a parent line.
    parentRefs.add(scopedKey(group, parentKey));
    childKeys.add(techTreeNodeKey(node));
  }

  for (const [age, nodes] of Object.entries(rawByAge || {})) {
    const set = new Set();
    for (const node of nodes || []) {
      const key = techTreeNodeKey(node);
      const group = norseResolveNodeGroupFromNodes(node, nodes || []);
      const placementKeys = techTreeNodePlacementKeys(node);
      const isParentInLine = placementKeys.some((placementKey) => parentRefs.has(scopedKey(group, placementKey)));
      const isChildInLine = childKeys.has(key);
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      if (isParentInLine || isChildInLine || isSharedColumnException) {
        set.add(key);
        global.add(key);
      }
    }
    byAge[age] = set;
  }
  return { byAge, global };
}

function norseBuildProtectedLineColumnsForNodes(nodesForAge, lineMemberKeys = null) {
  const grouped = new Map();
  for (const node of nodesForAge || []) {
    if (!node || !node.name) continue;
    const group = norseResolveNodeGroupFromNodes(node, nodesForAge || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }

  const out = {};
  for (const [group, groupNodes] of grouped.entries()) {
    const activeColumns = new Set();
    for (const node of groupNodes) {
      const fixed = norseFixedLocalX(node, group);
      if (!Number.isFinite(Number(fixed))) continue;
      const localX = Number(fixed);
      const isLineMember = lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      // Protect only actual active parent-line columns in this age. A column is
      // protected when a node in this age is part of a parent/child line, even
      // when the rest of that line appears in a different age. This keeps
      // multi-age lines aligned without reserving dead columns in ages where
      // the line has no node.
      if (isLineMember || isSharedColumnException) activeColumns.add(localX);
    }
    if (activeColumns.size) out[group] = activeColumns;
  }
  return out;
}

function norseBuildGlobalProtectedLineColumns(rawByAge) {
  const allNodes = Object.values(rawByAge || {}).flat();
  return norseBuildProtectedLineColumnsForNodes(allNodes, norseBuildLineMemberKeySets({ All: allNodes }).byAge.All);
}

function buildNorseTechTreeGroupStarts(config) {
  if (config?.baseCulture !== "Norse") return null;
  const rawByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    rawByAge[age] = norseRawTechTreeNodesForAge(age, config);
  }
  const lineKeySets = norseBuildLineMemberKeySets(rawByAge);
  config._norseTechTreeLineMemberKeysByAge = lineKeySets.byAge;
  config._norseTechTreeLineMemberKeys = lineKeySets.global;

  const protectedColumnsByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    protectedColumnsByAge[age] = norseBuildProtectedLineColumnsForNodes(rawByAge[age], lineKeySets.byAge[age]);
  }
  config._norseTechTreeProtectedColumnsByAge = protectedColumnsByAge;
  config._norseTechTreeProtectedColumns = protectedColumnsByAge.ArchaicAge || {};

  const maxWidths = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    const widths = norseMeasureGroupWidths(rawByAge[age], protectedColumnsByAge[age], age, lineKeySets.byAge[age]);
    for (const [group, width] of Object.entries(widths)) maxWidths[group] = Math.max(maxWidths[group] || 0, width);
  }

  const starts = {};
  let nextX = 0;
  for (const group of NORSE_TECHTREE_GROUP_ORDER) {
    starts[group] = nextX;
    nextX += Math.max(maxWidths[group] || 0, 0);
  }
  return starts;
}

function generateNorseDynamicTechTreeTechnologies(age, config) {
  if (config?.baseCulture !== "Norse") return "";
  const nodes = norseRawTechTreeNodesForAge(age, config);
  const protectedColumns = config?._norseTechTreeProtectedColumnsByAge?.[age] || config?._norseTechTreeProtectedColumns || null;
  const lineMemberKeys = config?._norseTechTreeLineMemberKeysByAge?.[age] || config?._norseTechTreeLineMemberKeys || null;
  const normalized = norseNormalizeTechTreeNodes(age, nodes, config?._norseTechTreeGroupStarts || null, protectedColumns, lineMemberKeys);
  const body = normalized.map((node) => buildTechTreeNodeXml(node)).join("\n");
  const block = `<local:TechTreeAge.Technologies>
${body}
            </local:TechTreeAge.Technologies>`;
  return applyCustomTechNamesToUiBlock(block, config || {});
}


const ATLANTEAN_TECHTREE_MAJOR_SOURCES = ["Gaia", "Kronos", "Oranos"];
const ATLANTEAN_TECHTREE_MINOR_BY_AGE = {
  ClassicalAge: ["ClassicalAgeLeto", "ClassicalAgeOceanus", "ClassicalAgePrometheus"],
  HeroicAge: ["HeroicAgeHyperion", "HeroicAgeRheia", "HeroicAgeTheia"],
  MythicAge: ["MythicAgeAtlas", "MythicAgeHekate", "MythicAgeHelios"],
};

const ATLANTEAN_TECHTREE_GROUP_ORDER = [
  "TownCenter", "EconomicGuild", "Farm", "Manor", "WallConnector", "Dock", "Temple", "SkyPassage",
  "SentryTower", "Armory", "Market", "MilitaryBarracks", "CounterBarracks", "Palace", "Wonder",
];

const ATLANTEAN_TECHTREE_PARENT_LANE = {
  TownCenter: "TownCenter",
  VillagerAtlantean: "TownCenter",
  Masons: "TownCenter",
  Architects: "TownCenter",
  FortifiedTownCenter: "TownCenter",
  SecretsOfTheTitans: "TownCenter",
  TitanGate: "TownCenter",

  EconomicGuild: "EconomicGuild",
  HuntingEquipment: "EconomicGuild",
  Husbandry: "EconomicGuild",
  TheftOfFire: "EconomicGuild",
  Plow: "EconomicGuild",
  Irrigation: "EconomicGuild",
  FloodControl: "EconomicGuild",
  HandAxe: "EconomicGuild",
  BowSaw: "EconomicGuild",
  Carpenters: "EconomicGuild",
  Pickaxe: "EconomicGuild",
  ShaftMine: "EconomicGuild",
  Quarry: "EconomicGuild",

  Farm: "Farm",
  Manor: "Manor",
  House: "Manor",
  WallConnector: "WallConnector",
  StoneWall: "WallConnector",
  BronzeWall: "WallConnector",
  IronWall: "WallConnector",
  OrichalcumWall: "WallConnector",

  Dock: "Dock",
  FishingShipAtlantean: "Dock",
  FishingShip: "Dock",
  PurseSeine: "Dock",
  FishBasket: "Dock",
  SaltAmphora: "Dock",
  Bireme: "Dock",
  Servant: "Dock",
  FireShip: "Dock",
  SiegeBireme: "Dock",
  TransportShipAtlantean: "Dock",
  TransportShip: "Dock",
  EnclosedDeck: "Dock",
  HeavyWarShips: "Dock",
  ChampionWarShips: "Dock",
  HeroicFleet: "Dock",
  ConscriptSailors: "Dock",
  Nereid: "Dock",
  DaughtersOfTheSea: "Dock",
  Daktyloi: "Dock",
  ManOWar: "Dock",
  HaloOfTheSun: "Dock",
  PioneerOfTheSkies: "Dock",

  Temple: "Temple",
  SkyPassage: "SkyPassage",
  NezhaChild: "Temple",
  NezhaYouth: "Temple",
  Nezha: "Temple",
  Oracle: "Temple",
  Caladria: "Temple",
  Automaton: "Temple",
  Promethean: "Temple",
  Behemoth: "Temple",
  StymphalianBird: "Temple",
  Satyr: "Temple",
  Lampades: "Temple",
  Argus: "Temple",
  Centimanus: "Temple",
  AlluvialClay: "Temple",
  HephaestusRevenge: "Temple",
  Perception: "Temple",
  VolcanicForge: "Temple",
  HeartOfTheTitans: "Temple",
  RheiasGift: "Temple",
  PropheticSight: "Temple",
  SonsOfTheSun: "Temple",
  Gemini: "Temple",
  MythicRejuvenation: "Temple",
  Celerity: "Temple",
  AsperBlood: "Temple",
  GuardianOfIo: "Temple",
  Titanomachy: "Temple",
  Omniscience: "Temple",
  Channels: "Temple",
  TemporalChaos: "Temple",
  EmpyreanSpeed: "Temple",

  SentryTower: "SentryTower",
  MirrorTower: "SentryTower",
  WatchTower: "SentryTower",
  GuardTower: "SentryTower",
  SignalFires: "SentryTower",
  CarrierPigeons: "SentryTower",
  Crenellations: "SentryTower",
  BoilingOil: "SentryTower",

  Armory: "Armory",
  DwarvenArmory: "Armory",
  Ballistics: "Armory",
  BurningPitch: "Armory",
  CopperWeapons: "Armory",
  BronzeWeapons: "Armory",
  IronWeapons: "Armory",
  CopperArmor: "Armory",
  BronzeArmor: "Armory",
  IronArmor: "Armory",
  CopperShields: "Armory",
  BronzeShields: "Armory",
  IronShields: "Armory",
  DwarvenWeapons: "Armory",
  MeteoricIronArmor: "Armory",
  DragonscaleShields: "Armory",
  WeightlessMace: "Armory",
  BiteOfTheShark: "Armory",
  OrichalcumMail: "Armory",

  Market: "Market",
  CaravanAtlantean: "Market",
  Coinage: "Market",
  TaxCollectors: "Market",
  Ambassadors: "Market",

  MilitaryBarracks: "MilitaryBarracks",
  Murmillo: "MilitaryBarracks",
  Contarius: "MilitaryBarracks",
  Arcus: "MilitaryBarracks",
  MediumInfantry: "MilitaryBarracks",
  HeavyInfantry: "MilitaryBarracks",
  ChampionInfantry: "MilitaryBarracks",
  MediumArchers: "MilitaryBarracks",
  HeavyArchers: "MilitaryBarracks",
  ChampionArchers: "MilitaryBarracks",
  MediumCavalry: "MilitaryBarracks",
  HeavyCavalry: "MilitaryBarracks",
  ChampionCavalry: "MilitaryBarracks",
  LevyMainlineSoldiers: "MilitaryBarracks",
  ConscriptMainlineSoldiers: "MilitaryBarracks",
  LanceOfStone: "MilitaryBarracks",
  PoseidonsSecret: "MilitaryBarracks",
  FrontlineHeroics: "MilitaryBarracks",

  CounterBarracks: "CounterBarracks",
  Katapeltes: "CounterBarracks",
  Turma: "CounterBarracks",
  Cheiroballista: "CounterBarracks",
  LevyCounterSoldiers: "CounterBarracks",
  ConscriptCounterSoldiers: "CounterBarracks",

  Palace: "Palace",
  Destroyer: "Palace",
  Fanatic: "Palace",
  FireSiphon: "Palace",
  DraftHorses: "Palace",
  Engineers: "Palace",
  AdvancedFortifications: "Palace",
  LevyPalaceSoldiers: "Palace",
  ConscriptPalaceSoldiers: "Palace",
  HornsOfConsecration: "Palace",
  TitanShield: "Palace",
  DevoteesOfAtlas: "Palace",
  Petrification: "Palace",

  Wonder: "Wonder",
};

const ATLANTEAN_TECHTREE_AMBIGUOUS_PARENT_NAMES = new Set([
  "MediumInfantry", "HeavyInfantry", "ChampionInfantry",
  "MediumArchers", "HeavyArchers", "ChampionArchers",
  "HeavyCavalry", "ChampionCavalry",
]);

function atlanteanCanUseStaticParentLane(name) {
  return !!name && !ATLANTEAN_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(name) && !!ATLANTEAN_TECHTREE_PARENT_LANE[name];
}

function atlanteanGroupFromUniqueReference(ref) {
  const value = String(ref || "");
  if (!value) return "";
  return ATLANTEAN_TECHTREE_GROUP_ORDER.find((group) => value.startsWith(group)) || "";
}

function atlanteanGroupFromAmbiguousParentReference(parent, node) {
  if (!parent || node?.uniqueParent || !ATLANTEAN_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(parent)) return "";
  if (["MediumInfantry", "HeavyInfantry", "ChampionInfantry"].includes(parent)) return "Palace";
  if (["MediumArchers", "HeavyArchers", "ChampionArchers"].includes(parent)) return "CounterBarracks";
  if (["HeavyCavalry", "ChampionCavalry"].includes(parent)) return "MilitaryBarracks";
  return "";
}

function atlanteanChooseParentNodeForChain(current, node, candidates) {
  const list = (candidates || []).filter(Boolean);
  if (!list.length) return null;
  if (node?.uniqueParent) {
    const exact = list.find((candidate) => candidate?.uniqueIdentifier === node.uniqueParent);
    if (exact) return exact;
  }
  const nodeX = Number(node?.x);
  return list.slice().sort((a, b) => {
    const ax = Number(a.x) || 0;
    const bx = Number(b.x) || 0;
    const aDistance = Number.isFinite(nodeX) ? Math.abs(ax - nodeX) : ax;
    const bDistance = Number.isFinite(nodeX) ? Math.abs(bx - nodeX) : bx;
    const aAfterPenalty = Number.isFinite(nodeX) && ax > nodeX ? 1000 : 0;
    const bAfterPenalty = Number.isFinite(nodeX) && bx > nodeX ? 1000 : 0;
    return (aDistance + aAfterPenalty) - (bDistance + bAfterPenalty) || ax - bx || (Number(a.y) || 0) - (Number(b.y) || 0);
  })[0];
}

function atlanteanNodeGroupRoot(node) {
  const parent = node?.parent || "";
  const name = node?.name || "";
  const uniqueGroup = atlanteanGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = atlanteanGroupFromAmbiguousParentReference(parent, node);
  if (ambiguousGroup) return ambiguousGroup;
  if (ATLANTEAN_TECHTREE_GROUP_ORDER.includes(parent)) return parent;
  if (atlanteanCanUseStaticParentLane(parent)) return ATLANTEAN_TECHTREE_PARENT_LANE[parent];
  if (!parent && ATLANTEAN_TECHTREE_GROUP_ORDER.includes(name)) return name;
  if (atlanteanCanUseStaticParentLane(name)) return ATLANTEAN_TECHTREE_PARENT_LANE[name];
  return parent || name;
}

function atlanteanNodeGroupOrder(node) {
  const root = atlanteanNodeGroupRoot(node);
  const idx = ATLANTEAN_TECHTREE_GROUP_ORDER.indexOf(root);
  return idx >= 0 ? idx : 99;
}

const ATLANTEAN_TECHTREE_FIXED_LOCAL_X = {
  // Town Center
  VillagerAtlantean: 1,
  Masons: 1,
  Architects: 1,
  FortifiedTownCenter: 1,
  SecretsOfTheTitans: 1,
  TitanGate: 1,

  // Economic Guild chains
  HuntingEquipment: 1,
  Husbandry: 1,
  Plow: 2,
  Irrigation: 2,
  FloodControl: 2,
  HandAxe: 3,
  BowSaw: 3,
  Carpenters: 3,
  Pickaxe: 4,
  ShaftMine: 4,
  Quarry: 4,
  TheftOfFire: 1,

  // Walls: wall-upgrade line can share the building column.
  StoneWall: 0,
  BronzeWall: 0,
  IronWall: 0,
  OrichalcumWall: 0,

  // Dock
  FishingShipAtlantean: 1,
  FishingShip: 1,
  PurseSeine: 1,
  SaltAmphora: 1,
  Bireme: 2,
  FireShip: 3,
  SiegeBireme: 4,
  PioneerOfTheSkies: 4,
  TransportShipAtlantean: 5,
  TransportShip: 5,
  EnclosedDeck: 5,
  HeavyWarShips: 6,
  ChampionWarShips: 6,
  HeroicFleet: 7,
  ConscriptSailors: 7,

  // Temple: Omniscience can share the Temple building column.
  Omniscience: 0,
  Oracle: 1,
  NezhaChild: 1,
  NezhaYouth: 1,
  Nezha: 1,

  // Towers
  WatchTower: 2,
  GuardTower: 2,
  SignalFires: 1,
  CarrierPigeons: 1,
  BoilingOil: 2,
  Crenellations: 2,

  // Armory chains
  Ballistics: 1,
  BurningPitch: 1,
  CopperWeapons: 2,
  BronzeWeapons: 2,
  IronWeapons: 2,
  DwarvenWeapons: 2,
  CopperArmor: 3,
  BronzeArmor: 3,
  IronArmor: 3,
  MeteoricIronArmor: 3,
  CopperShields: 4,
  BronzeShields: 4,
  IronShields: 4,
  DragonscaleShields: 4,
  WeightlessMace: 1,
  BiteOfTheShark: 2,
  VolcanicForge: 3,
  OrichalcumMail: 1,

  // Market
  CaravanAtlantean: 1,
  Coinage: 1,
  TaxCollectors: 2,
  Ambassadors: 2,

  // Military Barracks
  Murmillo: 1,
  MediumInfantry: 1,
  HeavyInfantry: 1,
  ChampionInfantry: 1,
  Contarius: 2,
  HeavyCavalry: 2,
  ChampionCavalry: 2,
  Arcus: 3,
  MediumArchers: 3,
  HeavyArchers: 3,
  ChampionArchers: 3,
  LevyMainlineSoldiers: 4,
  ConscriptMainlineSoldiers: 4,

  // Counter Barracks
  Katapeltes: 1,
  Turma: 2,
  Cheiroballista: 3,
  LevyCounterSoldiers: 4,
  ConscriptCounterSoldiers: 4,

  // Palace
  Destroyer: 1,
  Fanatic: 2,
  FireSiphon: 3,
  MediumInfantry: 4,
  HeavyInfantry: 4,
  ChampionInfantry: 4,
  DraftHorses: 5,
  Engineers: 5,
  AdvancedFortifications: 5,
  LevyPalaceSoldiers: 6,
  ConscriptPalaceSoldiers: 6,
};

function atlanteanFixedLocalX(node, group) {
  const name = node?.name || "";
  if (group === "TownCenter" && /^SkinOfTheRhino/.test(name)) return 2;

  // Atlantean has several valid duplicate upgrade/unit names across different
  // production buildings. Choose fixed columns by resolved building lane so a
  // Military Barracks infantry line does not inherit the Palace infantry slot,
  // and Counter Barracks archers do not inherit the Military Barracks slot.
  if (group === "MilitaryBarracks") {
    const map = {
      Murmillo: 1, MediumInfantry: 1, HeavyInfantry: 1, ChampionInfantry: 1,
      Contarius: 2, HeavyCavalry: 2, ChampionCavalry: 2,
      Arcus: 3, MediumArchers: 3, HeavyArchers: 3, ChampionArchers: 3,
      LevyMainlineSoldiers: 4, ConscriptMainlineSoldiers: 4,
      BiteOfTheShark: 1, FrontlineHeroics: 2, OrichalcumMail: 1, PoseidonsSecret: 2, LanceOfStone: 2,
      HaloOfTheSun: 1,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "CounterBarracks") {
    const map = {
      Katapeltes: 1, MediumInfantry: 1, HeavyInfantry: 1, ChampionInfantry: 1,
      Turma: 2, MediumArchers: 2, HeavyArchers: 2, ChampionArchers: 2,
      Cheiroballista: 3,
      LevyCounterSoldiers: 4, ConscriptCounterSoldiers: 4,
      WeightlessMace: 1, FrontlineHeroics: 2, OrichalcumMail: 1,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "Palace") {
    const map = {
      Destroyer: 1,
      Fanatic: 2,
      FireSiphon: 3,
      MediumInfantry: 4, HeavyInfantry: 4, ChampionInfantry: 4,
      DraftHorses: 5, Engineers: 5, AdvancedFortifications: 5,
      LevyPalaceSoldiers: 6, ConscriptPalaceSoldiers: 6,
      HornsOfConsecration: 1, HeroicRenewal: 1, FrontlineHeroics: 2, TitanShield: 2,
      DevoteesOfAtlas: 2, Petrification: 2, HaloOfTheSun: 3,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }

  // Parent-child alignment is handled dynamically by atlanteanCompactGroupNodes.
  if (Object.prototype.hasOwnProperty.call(ATLANTEAN_TECHTREE_FIXED_LOCAL_X, name)) return ATLANTEAN_TECHTREE_FIXED_LOCAL_X[name];
  return undefined;
}

const ATLANTEAN_TECHTREE_PROTECTED_LINE_LOCAL_X = {
  TownCenter: [1, 2],
  EconomicGuild: [1, 2, 3, 4],
  WallConnector: [0],
  Dock: [1, 2, 3, 4, 5, 6, 7],
  Temple: [0, 1, 2, 3, 4],
  SentryTower: [1, 2],
  Armory: [1, 2, 3, 4],
  Market: [1, 2],
  MilitaryBarracks: [1, 2, 3, 4],
  CounterBarracks: [1, 2, 3, 4],
  Palace: [1, 2, 3, 4, 5, 6],
};

function atlanteanProtectedLineColumns(group, groupNodes = null) {
  const candidateColumns = new Set(ATLANTEAN_TECHTREE_PROTECTED_LINE_LOCAL_X[group] || []);
  if (!Array.isArray(groupNodes)) return candidateColumns;
  const activeColumns = new Set();
  for (const node of groupNodes) {
    const fixed = atlanteanFixedLocalX(node, group);
    if (!Number.isFinite(Number(fixed))) continue;
    const localX = Number(fixed);
    if (candidateColumns.has(localX)) activeColumns.add(localX);
  }
  return activeColumns;
}

function atlanteanIsLaneRootParent(group, parent) {
  return parent === group
    || (group === "Armory" && parent === "DwarvenArmory")
    || (group === "TownCenter" && parent === "TownCenter")
    || (group === "Monument" && /^MonumentTo/.test(parent || ""));
}

function atlanteanNextNonProtectedLocalX(group, minX, protectedColumns = null) {
  const columns = protectedColumns instanceof Set ? protectedColumns : atlanteanProtectedLineColumns(group);
  for (let x = Math.max(0, Number(minX) || 0); x < 64; x += 1) {
    if (!columns.has(x)) return x;
  }
  return Math.max(0, Number(minX) || 0);
}

function atlanteanTechTreeSourceNodes(age) {
  const templates = window.AOM_TECHTREE || {};
  const byMajor = {};
  for (const major of ATLANTEAN_TECHTREE_MAJOR_SOURCES) {
    const block = age === "ArchaicAge"
      ? extractXmlPropertyBlock(lookupTemplateBlock(templates.archaicByMajor, major) || "", "Technologies")
      : templates.ageTechnologiesByMajorAge?.[`${major}|${age}`] || "";
    byMajor[major] = parseTechTreeNodesFromBlock(block);
  }
  return byMajor;
}

function atlanteanMinorBonusTokens(minorTech) {
  const block = window.AOM_TECHTREE?.bonusTrackByGod?.[canonicalMinorTech(minorTech)] || "";
  return parseTechTreeNodesFromBlock(block).filter((node) => node.type === "Unit" || node.type === "Tech");
}

function atlanteanAllConditionalNodeNames() {
  const names = new Set();
  (UNIQUE_TECH_GROUPS || []).forEach((group) => {
    names.add(group.id);
    (group.techs || []).forEach((tech) => names.add(tech));
  });
  Object.values(ATLANTEAN_TECHTREE_MINOR_BY_AGE).flat().forEach((minor) => {
    atlanteanMinorBonusTokens(minor).forEach((node) => names.add(node.name));
  });
  return names;
}

function atlanteanCommonNodesForAge(age) {
  const byMajor = atlanteanTechTreeSourceNodes(age);
  const excluded = atlanteanAllConditionalNodeNames();
  const keySets = Object.fromEntries(Object.entries(byMajor).map(([major, nodes]) => [major, new Set(nodes.map(techTreeNodeKey))]));
  const baseSource = ATLANTEAN_TECHTREE_MAJOR_SOURCES[0];
  const allKeys = [...(keySets[baseSource] || new Set())];
  const commonKeys = allKeys.filter((key) => ATLANTEAN_TECHTREE_MAJOR_SOURCES.every((major) => keySets[major]?.has(key)));
  const sourceNodes = Object.values(byMajor).flat();
  const result = [];
  for (const key of commonKeys) {
    const matches = sourceNodes.filter((node) => techTreeNodeKey(node) === key);
    const rep = chooseGreekRepresentativeNode(matches);
    if (!rep || excluded.has(rep.name)) continue;
    result.push({ ...rep });
  }
  return result;
}

function atlanteanFindRightSideNodesForToken(age, tokenNode) {
  const byMajor = atlanteanTechTreeSourceNodes(age);
  const matches = Object.values(byMajor).flat().filter((node) => node.type === tokenNode.type && node.name === tokenNode.name);
  if (!matches.length) return [];
  const byKey = new Map();
  for (const node of matches) {
    const key = techTreeNodeKey(node);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(node);
  }
  const reps = [...byKey.values()].map((nodes) => ({ count: nodes.length, node: chooseGreekRepresentativeNode(nodes) }));
  reps.sort((a, b) => atlanteanNodeGroupOrder(a.node) - atlanteanNodeGroupOrder(b.node) || (a.node.x - b.node.x) || (a.node.y - b.node.y) || String(a.node.parent).localeCompare(String(b.node.parent)) || (b.count - a.count));
  return reps.map((entry) => ({ ...entry.node }));
}

function atlanteanMinorNodeSameBuildingKey(node, contextNodes = []) {
  if (!node?.type || !node?.name) return "";
  const group = atlanteanResolveNodeGroupFromNodes(node, contextNodes && contextNodes.length ? contextNodes : [node]);
  return `${node.type}|${node.name}|${group}`;
}

function atlanteanPriorSelectedMinorBuildingKeys(age, config) {
  const out = new Set();
  const order = ["ClassicalAge", "HeroicAge", "MythicAge"];
  const index = order.indexOf(age);
  if (index <= 0) return out;
  for (const priorAge of order.slice(0, index)) {
    const selected = (config.minorGods?.[priorAge] || []).map(canonicalMinorTech);
    const priorNodes = [];
    for (const minor of selected) {
      for (const token of atlanteanMinorBonusTokens(minor)) {
        priorNodes.push(...atlanteanFindRightSideNodesForToken(priorAge, token));
      }
    }
    for (const node of priorNodes) {
      const key = atlanteanMinorNodeSameBuildingKey(node, priorNodes);
      if (key) out.add(key);
    }
  }
  return out;
}

function atlanteanSelectedMinorNodesForAge(age, config) {
  const selected = (config.minorGods?.[age] || []).map(canonicalMinorTech);
  const nodes = [];
  const seenSameBuilding = atlanteanPriorSelectedMinorBuildingKeys(age, config);
  for (const minor of selected) {
    for (const token of atlanteanMinorBonusTokens(minor)) {
      for (const candidate of atlanteanFindRightSideNodesForToken(age, token)) {
        const key = atlanteanMinorNodeSameBuildingKey(candidate, [...nodes, candidate]);
        if (key && seenSameBuilding.has(key)) continue;
        nodes.push(candidate);
        if (key) seenSameBuilding.add(key);
      }
    }
  }
  return nodes;
}

function atlanteanResolveNodeGroupFromNodes(node, allNodes) {
  const byName = new Map();
  const byUniqueIdentifier = new Map();
  for (const candidate of allNodes || []) {
    if (!candidate?.name) continue;
    if (!byName.has(candidate.name)) byName.set(candidate.name, []);
    byName.get(candidate.name).push(candidate);
    if (candidate.uniqueIdentifier) byUniqueIdentifier.set(candidate.uniqueIdentifier, candidate);
  }
  const uniqueGroup = atlanteanGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = atlanteanGroupFromAmbiguousParentReference(node?.parent || "", node);
  if (ambiguousGroup) return ambiguousGroup;
  const seen = new Set();
  let current = node?.uniqueParent || node?.parent || node?.name || "";
  let walkerNode = node;
  for (let i = 0; i < 16 && current && !seen.has(current); i += 1) {
    seen.add(current);
    if (ATLANTEAN_TECHTREE_GROUP_ORDER.includes(current)) return current;
    if (atlanteanCanUseStaticParentLane(current)) return ATLANTEAN_TECHTREE_PARENT_LANE[current];
    let parentNode = byUniqueIdentifier.get(current) || null;
    if (!parentNode) parentNode = atlanteanChooseParentNodeForChain(current, walkerNode, byName.get(current) || []);
    if (parentNode?.uniqueParent || parentNode?.parent) {
      walkerNode = parentNode;
      current = parentNode.uniqueParent || parentNode.parent;
      continue;
    }
    if (parentNode?.name && parentNode.name !== current) {
      walkerNode = parentNode;
      current = parentNode.name;
      continue;
    }
    break;
  }
  if (atlanteanCanUseStaticParentLane(node?.name)) return ATLANTEAN_TECHTREE_PARENT_LANE[node.name];
  return atlanteanNodeGroupRoot(node);
}

function atlanteanCompactGroupNodes(group, groupNodes, groupStartX = 0, protectedColumnsOverride = null, age = "", lineMemberKeys = null) {
  const nodes = (groupNodes || []).map((inputNode) => {
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    return node;
  });

  const isGroupRootNode = (node) => !node?.parent && (node?.name === group || (group === "Armory" && node?.name === "DwarvenArmory") || (group === "Monument" && /^MonumentTo/.test(node?.name || "")));
  const hasRoot = nodes.some((node) => isGroupRootNode(node));
  const preSortDirectChildCountByName = new Map();
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    preSortDirectChildCountByName.set(parentKey, (preSortDirectChildCountByName.get(parentKey) || 0) + 1);
  }
  const nodeHasPreSortDirectChildren = (node) => (preSortDirectChildCountByName.get(node?.uniqueIdentifier || node?.name) || 0) > 0;
  const sourceOrder = (node) => (Number(node.x) || 0) * 10 + (Number(node.y) || 0);
  const sorted = nodes.slice().sort((a, b) => {
    const aIsRoot = isGroupRootNode(a);
    const bIsRoot = isGroupRootNode(b);
    if (aIsRoot !== bIsRoot) return aIsRoot ? -1 : 1;
    if (a.name === b.parent && b.name !== a.parent) return -1;
    if (b.name === a.parent && a.name !== b.parent) return 1;
    const aRootChild = atlanteanIsLaneRootParent(group, a.parent) && !nodeHasPreSortDirectChildren(a);
    const bRootChild = atlanteanIsLaneRootParent(group, b.parent) && !nodeHasPreSortDirectChildren(b);
    if (aRootChild && bRootChild && a.type !== b.type) {
      // For direct childless nodes in a building lane, place units before
      // childless techs. This lets units claim row 0 when the parent building
      // was introduced in an earlier age, while the techs fall to row 1.
      // The actual X column still comes from fixed/parent placement rules.
      if (a.type === "Unit") return -1;
      if (b.type === "Unit") return 1;
    }
    const af = atlanteanFixedLocalX(a, group);
    const bf = atlanteanFixedLocalX(b, group);
    if (Number.isFinite(Number(af)) !== Number.isFinite(Number(bf))) return Number.isFinite(Number(af)) ? -1 : 1;
    if (Number.isFinite(Number(af)) && af !== bf) return af - bf;
    return sourceOrder(a) - sourceOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name) || String(a.parent).localeCompare(String(b.parent));
  });

  const localOccupied = new Set();
  const placedLocalByName = new Map();
  const placedRowByName = new Map();
  const placed = [];
  const protectedLineColumns = protectedColumnsOverride instanceof Set ? protectedColumnsOverride : atlanteanProtectedLineColumns(group, nodes);
  const isLineMemberNode = (node) => lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
  const directChildCountByName = new Map();
  const directChildFixedLocalXByName = new Map();
  const rootDirectChildTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildWithChildrenTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypesByLocalX = new Map();
  const isLaneRootParent = (parent) => atlanteanIsLaneRootParent(group, parent);
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    directChildCountByName.set(parentKey, (directChildCountByName.get(parentKey) || 0) + 1);
    const childFixed = atlanteanFixedLocalX(child, group);
    if (Number.isFinite(Number(childFixed))) {
      const current = directChildFixedLocalXByName.get(parentKey);
      const childFixedX = Number(childFixed);
      if (!Number.isFinite(Number(current)) || childFixedX < Number(current)) {
        directChildFixedLocalXByName.set(parentKey, childFixedX);
      }
    }
  }
  for (const child of nodes) {
    if (!child || !isLaneRootParent(child.parent)) continue;
    if (child.type === "Unit" || child.type === "Tech") {
      rootDirectChildTypeCounts[child.type] += 1;
      const childKey = child.uniqueIdentifier || child.name;
      if (directChildCountByName.get(childKey) || 0) {
        rootDirectChildWithChildrenTypeCounts[child.type] += 1;
      } else {
        rootDirectChildlessTypeCounts[child.type] += 1;
        const fixedLocal = atlanteanFixedLocalX(child, group);
        const localX = Number.isFinite(Number(fixedLocal)) ? Number(fixedLocal) : undefined;
        if (Number.isFinite(localX)) {
          if (!rootDirectChildlessTypesByLocalX.has(localX)) rootDirectChildlessTypesByLocalX.set(localX, new Set());
          rootDirectChildlessTypesByLocalX.get(localX).add(child.type);
        }
      }
    }
  }

  const canUse = (x, y, allowProtectedLineColumn = true) => {
    if (localOccupied.has(`${x},${y}`)) return false;
    if (!allowProtectedLineColumn && protectedLineColumns.has(x)) return false;
    return true;
  };
  const reserve = (node, localX, y) => {
    localOccupied.add(`${localX},${y}`);
    for (const placementKey of techTreeNodePlacementKeys(node)) {
      if (!placedLocalByName.has(placementKey) || localX < placedLocalByName.get(placementKey)) {
        placedLocalByName.set(placementKey, localX);
        placedRowByName.set(placementKey, y);
      }
    }
    const cleanNode = { ...node };
    delete cleanNode._group;
    placed.push({ ...cleanNode, x: groupStartX + localX, y, position: `${groupStartX + localX},${y}` });
  };
  const firstFree = (minX, preferredY = 0, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) if (canUse(x, y, allowProtectedLineColumn)) return { x, y };
    }
    return { x: Math.max(0, minX || 0), y: preferredY === 1 ? 1 : 0 };
  };
  const firstFreeParentColumn = (minX, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn) && canUse(x, 1, allowProtectedLineColumn)) return { x, y: 0 };
    }
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn)) return { x, y: 0 };
    }
    return firstFree(minX, 0, allowProtectedLineColumn);
  };

  for (const node of techTreeParentDepthFirstOrder(sorted, isGroupRootNode)) {
    const isRoot = isGroupRootNode(node);
    if (isRoot) {
      const fixed = atlanteanFixedLocalX(node, group);
      const x = Number.isFinite(Number(fixed)) ? Number(fixed) : 0;
      const y = 0;
      if (!canUse(x, y, true)) {
        const alt = firstFree(x, y, true);
        reserve(node, alt.x, alt.y);
      } else {
        reserve(node, x, y);
      }
      continue;
    }

    const fixed = atlanteanFixedLocalX(node, group);
    const parentLookupKey = techTreeNodeParentLookupKey(node);
    const parentLocal = placedLocalByName.get(parentLookupKey);
    const parentRow = placedRowByName.get(parentLookupKey);
    const childFixedLocal = directChildFixedLocalXByName.get(node.uniqueIdentifier || node.name);
    let desiredX;
    let preferredY = Number(node.y) === 0 ? 0 : 1;

    if (Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent)) {
      // Parent-line rule: once a parent is placed, every direct child follows
      // the parent's actual column. Fixed local X values are only preferred
      // before the parent is placed; they must not break the visible line if
      // the parent had to move to a cleaner/available column.
      desiredX = Number(parentLocal);
      if (Number.isFinite(Number(parentRow))) preferredY = Number(parentRow) === 0 ? 1 : 0;
    } else if (Number.isFinite(Number(fixed))) {
      desiredX = Number(fixed);
    } else if (Number.isFinite(Number(childFixedLocal))) {
      // Generic parent-line rule: if a direct child is part of a fixed upgrade
      // line, place the parent in that same column first. Example: Anubite
      // inherits FeetOfTheJackal's column, so the pair forms a clean vertical
      // parent line instead of the child occupying the protected column alone.
      desiredX = Number(childFixedLocal);
    } else {
      desiredX = 1;
    }

    const hasDirectChildren = (directChildCountByName.get(node.uniqueIdentifier || node.name) || 0) > 0;
    const directFromRootBuilding = hasRoot && isLaneRootParent(node.parent);
    const rootHasChildlessUnitAndTech = rootDirectChildlessTypeCounts.Unit > 0 && rootDirectChildlessTypeCounts.Tech > 0;
    const rootChildlessTypesAtDesiredX = rootDirectChildlessTypesByLocalX.get(Number(desiredX)) || new Set();
    const rootColumnHasChildlessUnitAndTech = rootChildlessTypesAtDesiredX.has("Unit") && rootChildlessTypesAtDesiredX.has("Tech");
    const rootHasOnlyChildlessUnits = directFromRootBuilding
      && !hasDirectChildren
      && node.type === "Unit"
      && !isLineMemberNode(node)
      && rootDirectChildlessTypeCounts.Unit > 0
      && rootDirectChildlessTypeCounts.Tech === 0
      && rootDirectChildWithChildrenTypeCounts.Unit === 0
      && rootDirectChildWithChildrenTypeCounts.Tech === 0;
    if (rootHasOnlyChildlessUnits) {
      // When a building appears in the current age and only trains units from
      // its root command row, keep those units together on row 1 and pack them
      // compactly from the first available column. This avoids gaps like an
      // empty TownCenter column 1/2 while all trained units are shifted right.
      desiredX = 1;
      preferredY = 1;
    } else if (directFromRootBuilding && !hasDirectChildren) {
      // Direct children of a building that appears in this age should keep the
      // building row clean. Childless units prefer row 1 unless a childless tech
      // also wants that exact column; only then use the classic unit row 0 /
      // tech row 1 split. This keeps Longhouse units together on row 1 while
      // still handling HillFort columns that contain both a unit and a tech.
      if (node.type === "Unit") preferredY = rootColumnHasChildlessUnitAndTech ? 0 : 1;
      if (node.type === "Tech") preferredY = 1;
    } else if (node.type === "Unit") {
      preferredY = 0;
    }
    if (age === "ArchaicAge" && !isRoot && node.type === "Unit" && !hasDirectChildren && !rootHasChildlessUnitAndTech && !localOccupied.has(`${desiredX},1`)) preferredY = 1;
    if (age === "ArchaicAge" && !isRoot && node.type !== "Unit" && !localOccupied.has(`${desiredX},1`)) preferredY = 1;

    if (!hasRoot && !isLaneRootParent(node.parent)) desiredX = Math.max(desiredX, 0);
    if (hasRoot || group === "TownCenter") desiredX = Math.max(desiredX, 1);

    const hasFixedLocalX = Number.isFinite(Number(fixed));
    const isChildOfPlacedChain = Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent) && Number(parentLocal) === Number(desiredX);
    const isParentOfFixedChildLine = Number.isFinite(Number(childFixedLocal)) && Number(childFixedLocal) === Number(desiredX);
    const isGlobalLineMember = isLineMemberNode(node);
    const isFixedLineNode = hasFixedLocalX && protectedLineColumns.has(Number(fixed)) && (isGlobalLineMember || !isLaneRootParent(node.parent) || hasDirectChildren || isParentOfFixedChildLine);
    const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
      || (group === "Temple" && node.name === "Omniscience");
    const allowProtectedLineColumn = rootHasOnlyChildlessUnits || isChildOfPlacedChain || isParentOfFixedChildLine || isFixedLineNode || isSharedColumnException;
    if (!allowProtectedLineColumn && protectedLineColumns.has(desiredX)) {
      desiredX = atlanteanNextNonProtectedLocalX(group, desiredX + 1, protectedLineColumns);
    }

    let placedHere = false;
    if (rootHasOnlyChildlessUnits) {
      for (let x = Math.max(1, Number(desiredX) || 1); x < 64; x += 1) {
        if (canUse(x, 1, true)) {
          reserve(node, x, 1);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere && hasDirectChildren) {
      // Any visible parent line, including tech upgrade chains, should reserve
      // a clean column first. This keeps chains such as CopperWeapons ->
      // BronzeWeapons and Valkyrie -> Disablot in one vertical line instead
      // of letting an unrelated node occupy the child row.
      const cleanColumn = firstFreeParentColumn(desiredX, allowProtectedLineColumn);
      reserve(node, cleanColumn.x, cleanColumn.y);
      placedHere = true;
    }
    if (!placedHere) {
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) {
        if (canUse(desiredX, y, allowProtectedLineColumn)) {
          reserve(node, desiredX, y);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere) {
      const alt = firstFree(desiredX + 1, preferredY, allowProtectedLineColumn);
      reserve(node, alt.x, alt.y);
    }
  }

  // Final row cleanup: if a direct childless unit and a direct childless tech
  // from the same building lane ended up in the same column, keep the unit on
  // row 0 and the tech on row 1. This preserves the compact column while
  // keeping units visually prominent.
  const childlessRootNode = (node) => isLaneRootParent(node?.parent) && !(directChildCountByName.get(node?.uniqueIdentifier || node?.name) || 0);
  const byColumn = new Map();
  for (const node of placed) {
    if (!childlessRootNode(node)) continue;
    if (!byColumn.has(node.x)) byColumn.set(node.x, []);
    byColumn.get(node.x).push(node);
  }
  for (const columnNodes of byColumn.values()) {
    const unitRow1 = columnNodes.find((node) => node.type === "Unit" && Number(node.y) === 1);
    const techRow0 = columnNodes.find((node) => node.type === "Tech" && Number(node.y) === 0);
    if (unitRow1 && techRow0) {
      unitRow1.y = 0;
      unitRow1.position = `${unitRow1.x},0`;
      techRow0.y = 1;
      techRow0.position = `${techRow0.x},1`;
    }
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function atlanteanNormalizeTechTreeNodes(age, nodes, forcedGroupStarts = null, protectedColumnsByGroup = null, lineMemberKeys = null) {
  const unique = new Map();
  for (const inputNode of nodes) {
    if (!inputNode || !inputNode.type || !inputNode.name) continue;
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    node.position = `${node.x},${node.y}`;
    const key = techTreeNodeKey(node);
    if (!unique.has(key)) unique.set(key, node);
  }

  const allNodes = [...unique.values()];
  const grouped = new Map();
  for (const node of allNodes) {
    const group = atlanteanResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push({ ...node, _group: group });
  }

  const orderedGroups = [...grouped.entries()].sort(([groupA], [groupB]) => {
    const ai = ATLANTEAN_TECHTREE_GROUP_ORDER.indexOf(groupA);
    const bi = ATLANTEAN_TECHTREE_GROUP_ORDER.indexOf(groupB);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || String(groupA).localeCompare(String(groupB));
  });

  const placed = [];
  let nextGroupX = 0;
  for (const [group, groupNodes] of orderedGroups) {
    const forcedX = forcedGroupStarts && Number.isFinite(Number(forcedGroupStarts[group])) ? Number(forcedGroupStarts[group]) : undefined;
    const groupStartX = Number.isFinite(Number(forcedX)) ? Number(forcedX) : nextGroupX;
    const protectedColumns = protectedColumnsByGroup && protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : null;
    const groupPlaced = atlanteanCompactGroupNodes(group, groupNodes, groupStartX, protectedColumns, age, lineMemberKeys);
    placed.push(...groupPlaced);
    const width = groupPlaced.length ? Math.max(...groupPlaced.map((node) => Number(node.x) - groupStartX)) + 1 : 0;
    nextGroupX = groupStartX + Math.max(width, 0);
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || atlanteanNodeGroupOrder(a) - atlanteanNodeGroupOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function atlanteanApplyThorDwarvenArmoryRightSide(nodes, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return nodes || [];
  return (nodes || []).map((inputNode) => {
    const node = { ...inputNode };
    if (node.type === "Unit" && node.name === "Armory") node.name = "DwarvenArmory";
    if (node.parent === "Armory") node.parent = "DwarvenArmory";
    return node;
  });
}


function atlanteanBaseArmoryRightSideNodes(age, config) {
  const useDwarven = selectedHasThorDwarvenArmoryBonus(config);
  const armory = useDwarven ? "DwarvenArmory" : "Armory";
  const node = (type, name, parent, position) => {
    const [xRaw, yRaw] = String(position).split(",");
    return { type, name, parent: parent || "", position, x: Number(xRaw) || 0, y: Number(yRaw) || 0 };
  };
  if (useDwarven) {
    if (age === "ArchaicAge") {
      return [
        node("Unit", armory, "", "24,0"),
        node("Tech", "Ballistics", armory, "25,1"),
        node("Tech", "CopperWeapons", armory, "26,0"),
        node("Tech", "BronzeWeapons", "CopperWeapons", "26,1"),
        node("Tech", "CopperArmor", armory, "27,0"),
        node("Tech", "BronzeArmor", "CopperArmor", "27,1"),
        node("Tech", "CopperShields", armory, "28,0"),
        node("Tech", "BronzeShields", "CopperShields", "28,1"),
      ];
    }
    if (age === "ClassicalAge") {
      return [
        node("Tech", "BurningPitch", armory, "25,1"),
        node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
        node("Tech", "DwarvenWeapons", "IronWeapons", "26,1"),
        node("Tech", "IronArmor", "BronzeArmor", "27,0"),
        node("Tech", "MeteoricIronArmor", "IronArmor", "27,1"),
        node("Tech", "IronShields", "BronzeShields", "28,0"),
        node("Tech", "DragonscaleShields", "IronShields", "28,1"),
      ];
    }
    return [];
  }
  if (age === "ClassicalAge") {
    return [
      node("Unit", armory, "", "24,0"),
      node("Tech", "Ballistics", armory, "25,1"),
      node("Tech", "CopperWeapons", armory, "26,1"),
      node("Tech", "CopperArmor", armory, "27,1"),
      node("Tech", "CopperShields", armory, "28,1"),
    ];
  }
  if (age === "HeroicAge") {
    return [
      node("Tech", "BronzeWeapons", "CopperWeapons", "26,0"),
      node("Tech", "BronzeArmor", "CopperArmor", "27,0"),
      node("Tech", "BronzeShields", "CopperShields", "28,0"),
    ];
  }
  if (age === "MythicAge") {
    return [
      node("Tech", "BurningPitch", armory, "25,0"),
      node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
      node("Tech", "IronArmor", "BronzeArmor", "27,0"),
      node("Tech", "IronShields", "BronzeShields", "28,0"),
    ];
  }
  return [];
}

function atlanteanThorDwarvenArmoryExtraRightSideNodes(age, config) {
  // Kept for compatibility; Atlantean Dwarven Armory right-side nodes are built
  // by atlanteanBaseArmoryRightSideNodes so the Armory/DwarvenArmory lane remains
  // complete and age-appropriate.
  return [];
}

function atlanteanRawTechTreeNodesForAge(age, config) {
  let nodes = [
    ...atlanteanCommonNodesForAge(age),
    ...atlanteanSelectedMinorNodesForAge(age, config),
    ...atlanteanThorDwarvenArmoryExtraRightSideNodes(age, config),
  ].filter(Boolean);
  if (age === "ArchaicAge") {
    const group = selectedUniqueTechGroup(config);
    const tech = selectedUniqueTechRightSideName(config, group);
    if (group && tech) {
      for (const spec of uniqueTechRightSideNodeSpecs(config, "", group)) {
        const [xRaw, yRaw] = String(spec.position || spec.preferred?.[0] || "18,1").split(",");
        nodes.push({
          type: "Tech",
          name: tech,
          parent: spec.parent,
          position: `${Number(xRaw) || 0},${Number(yRaw) || 1}`,
          x: Number(xRaw) || 0,
          y: Number(yRaw) || 1,
        });
      }
    }
  }
  nodes = applyGenericBonusRightSideNodes("Atlantean", age, config, nodes);
  return atlanteanApplyThorDwarvenArmoryRightSide(nodes, config);
}

function atlanteanMeasureGroupWidths(nodes, protectedColumnsByGroup = null, age = "", lineMemberKeys = null) {
  const widths = {};
  const grouped = new Map();
  for (const node of nodes || []) {
    const group = atlanteanResolveNodeGroupFromNodes(node, nodes || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }
  for (const [group, groupNodes] of grouped.entries()) {
    const protectedColumns = protectedColumnsByGroup && protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : null;
    const placed = atlanteanCompactGroupNodes(group, groupNodes, 0, protectedColumns, age, lineMemberKeys);
    widths[group] = placed.length ? Math.max(...placed.map((node) => Number(node.x) || 0)) + 1 : 0;
  }
  return widths;
}


function atlanteanBuildLineMemberKeySets(rawByAge) {
  const byAge = {};
  const global = new Set();
  const allNodes = Object.values(rawByAge || {}).flat().filter(Boolean);
  const parentRefs = new Set();
  const childKeys = new Set();

  const scopedKey = (group, key) => `${group || ""}::${key || ""}`;

  for (const node of allNodes) {
    const parentKey = techTreeNodeParentLookupKey(node);
    if (!parentKey) continue;
    const group = atlanteanResolveNodeGroupFromNodes(node, allNodes);
    if (atlanteanIsLaneRootParent(group, parentKey)) continue;
    // Scope parent references by resolved building lane. Otherwise duplicate
    // Atlantean names such as Berserk/Hersir/MediumInfantry can falsely mark an
    // unrelated building's node as part of a parent line.
    parentRefs.add(scopedKey(group, parentKey));
    childKeys.add(techTreeNodeKey(node));
  }

  for (const [age, nodes] of Object.entries(rawByAge || {})) {
    const set = new Set();
    for (const node of nodes || []) {
      const key = techTreeNodeKey(node);
      const group = atlanteanResolveNodeGroupFromNodes(node, nodes || []);
      const placementKeys = techTreeNodePlacementKeys(node);
      const isParentInLine = placementKeys.some((placementKey) => parentRefs.has(scopedKey(group, placementKey)));
      const isChildInLine = childKeys.has(key);
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      if (isParentInLine || isChildInLine || isSharedColumnException) {
        set.add(key);
        global.add(key);
      }
    }
    byAge[age] = set;
  }
  return { byAge, global };
}

function atlanteanBuildProtectedLineColumnsForNodes(nodesForAge, lineMemberKeys = null) {
  const grouped = new Map();
  for (const node of nodesForAge || []) {
    if (!node || !node.name) continue;
    const group = atlanteanResolveNodeGroupFromNodes(node, nodesForAge || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }

  const out = {};
  for (const [group, groupNodes] of grouped.entries()) {
    const activeColumns = new Set();
    for (const node of groupNodes) {
      const fixed = atlanteanFixedLocalX(node, group);
      if (!Number.isFinite(Number(fixed))) continue;
      const localX = Number(fixed);
      const isLineMember = lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      // Protect only actual active parent-line columns in this age. A column is
      // protected when a node in this age is part of a parent/child line, even
      // when the rest of that line appears in a different age. This keeps
      // multi-age lines aligned without reserving dead columns in ages where
      // the line has no node.
      if (isLineMember || isSharedColumnException) activeColumns.add(localX);
    }
    if (activeColumns.size) out[group] = activeColumns;
  }
  return out;
}

function atlanteanBuildGlobalProtectedLineColumns(rawByAge) {
  const allNodes = Object.values(rawByAge || {}).flat();
  return atlanteanBuildProtectedLineColumnsForNodes(allNodes, atlanteanBuildLineMemberKeySets({ All: allNodes }).byAge.All);
}

function buildAtlanteanTechTreeGroupStarts(config) {
  if (config?.baseCulture !== "Atlantean") return null;
  const rawByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    rawByAge[age] = atlanteanRawTechTreeNodesForAge(age, config);
  }
  const lineKeySets = atlanteanBuildLineMemberKeySets(rawByAge);
  config._atlanteanTechTreeLineMemberKeysByAge = lineKeySets.byAge;
  config._atlanteanTechTreeLineMemberKeys = lineKeySets.global;

  const protectedColumnsByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    protectedColumnsByAge[age] = atlanteanBuildProtectedLineColumnsForNodes(rawByAge[age], lineKeySets.byAge[age]);
  }
  config._atlanteanTechTreeProtectedColumnsByAge = protectedColumnsByAge;
  config._atlanteanTechTreeProtectedColumns = protectedColumnsByAge.ArchaicAge || {};

  const maxWidths = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    const widths = atlanteanMeasureGroupWidths(rawByAge[age], protectedColumnsByAge[age], age, lineKeySets.byAge[age]);
    for (const [group, width] of Object.entries(widths)) maxWidths[group] = Math.max(maxWidths[group] || 0, width);
  }

  const starts = {};
  let nextX = 0;
  for (const group of ATLANTEAN_TECHTREE_GROUP_ORDER) {
    starts[group] = nextX;
    nextX += Math.max(maxWidths[group] || 0, 0);
  }
  return starts;
}

function generateAtlanteanDynamicTechTreeTechnologies(age, config) {
  if (config?.baseCulture !== "Atlantean") return "";
  const nodes = atlanteanRawTechTreeNodesForAge(age, config);
  const protectedColumns = config?._atlanteanTechTreeProtectedColumnsByAge?.[age] || config?._atlanteanTechTreeProtectedColumns || null;
  const lineMemberKeys = config?._atlanteanTechTreeLineMemberKeysByAge?.[age] || config?._atlanteanTechTreeLineMemberKeys || null;
  const normalized = atlanteanNormalizeTechTreeNodes(age, nodes, config?._atlanteanTechTreeGroupStarts || null, protectedColumns, lineMemberKeys);
  const body = normalized.map((node) => buildTechTreeNodeXml(node)).join("\n");
  const block = `<local:TechTreeAge.Technologies>
${body}
            </local:TechTreeAge.Technologies>`;
  return applyCustomTechNamesToUiBlock(block, config || {});
}




const CHINESE_TECHTREE_MAJOR_SOURCES = ["Fuxi", "Nuwa", "Shennong"];
const CHINESE_TECHTREE_MINOR_BY_AGE = {
  ClassicalAge: ["ClassicalAgeChiyou", "ClassicalAgeHoutu", "ClassicalAgeXuannu"],
  HeroicAge: ["HeroicAgeGoumang", "HeroicAgeNuba", "HeroicAgeRushou"],
  MythicAge: ["MythicAgeGonggong", "MythicAgeHuangdi", "MythicAgeZhurong"],
};

const CHINESE_TECHTREE_GROUP_ORDER = [
  "TownCenter", "Silo", "Farm", "House", "WallConnector", "Dock", "Temple", "SkyPassage",
  "SentryTower", "Armory", "Market", "MilitaryCamp", "MachineWorkshop", "ImperialAcademy", "Baolei", "Wonder",
];

const CHINESE_TECHTREE_PARENT_LANE = {
  TownCenter: "TownCenter",
  VillagerChinese: "TownCenter",
  Kuafu: "TownCenter",
  TerracottaRiders: "TownCenter",
  KuafuChieftain: "TownCenter",
  ChasingTheSun: "TownCenter",
  Masons: "TownCenter",
  Architects: "TownCenter",
  FortifiedTownCenter: "TownCenter",
  SecretsOfTheTitans: "TownCenter",
  TitanGate: "TownCenter",

  Silo: "Silo",
  HuntingEquipment: "Silo",
  Husbandry: "Silo",
  Plow: "Silo",
  Irrigation: "Silo",
  FloodControl: "Silo",
  HandAxe: "Silo",
  BowSaw: "Silo",
  Carpenters: "Silo",
  Pickaxe: "Silo",
  ShaftMine: "Silo",
  Quarry: "Silo",
  Abundance: "Silo",
  MountainousMight: "Silo",
  SlashAndBurn: "Silo",

  Farm: "Farm",
  House: "House",
  WallConnector: "WallConnector",
  StoneWall: "WallConnector",
  FortifiedWall: "WallConnector",
  BronzeWall: "WallConnector",
  IronWall: "WallConnector",
  GreatWall: "WallConnector",
  AdvancedDefenses: "WallConnector",

  Dock: "Dock",
  FishingShipChinese: "Dock",
  HeroicFleet: "Dock",
  DouJian: "Dock",
  MengChong: "Dock",
  LouChuan: "Dock",
  TransportShipChinese: "Dock",
  EnclosedDeck: "Dock",
  PurseSeine: "Dock",
  FishBasket: "Dock",
  SaltAmphora: "Dock",
  XuanWu: "Dock",
  HeavyWarShips: "Dock",
  ChampionWarShips: "Dock",
  RedCliffsFleet: "Dock",
  DroughtShips: "Dock",
  ConscriptSailors: "Dock",

  Temple: "Temple",
  Pioneer: "Temple",
  DivineLight: "Temple",
  EastWind: "Temple",
  SkyFire: "Temple",
  QiLin: "Temple",
  YaZi: "Temple",
  QiongQi: "Temple",
  Pixiu: "Temple",
  BaiHu: "Temple",
  TaoWu: "Temple",
  TaoTie: "Temple",
  ChiWen: "Temple",
  QingLong: "Temple",
  Hundun: "Temple",
  HunDun: "Temple",
  ZhuQue: "Temple",
  QiLinsBlessing: "Temple",
  SonOfLoong: "Temple",
  RageOfSlaughter: "Temple",
  Reincarnation: "Temple",
  SinisterDefiance: "Temple",
  Maelstrom: "Temple",
  HoovesOfTheWind: "Temple",
  BottomlessStomach: "Temple",
  RockSolid: "Temple",
  GildedShields: "Temple",
  DivineJudgement: "Temple",
  AutumnOfAbundance: "Temple",
  RisingTide: "Temple",
  PowerOfChaos: "Temple",
  SongOfMidsummer: "Temple",
  FlamingBlood: "Temple",
  Omniscience: "Temple",
  OlympianParentage: "Temple",
  EmpyreanSpeed: "Temple",
  TemporalChaos: "Temple",
  Channels: "Temple",

  SkyPassage: "SkyPassage",

  SentryTower: "SentryTower",
  SignalFires: "SentryTower",
  WatchTower: "SentryTower",
  GuardTower: "SentryTower",
  CrossbowTower: "SentryTower",
  Crenellations: "SentryTower",
  BoilingOil: "SentryTower",

  Armory: "Armory",
  DwarvenArmory: "Armory",
  Ballistics: "Armory",
  BurningPitch: "Armory",
  CopperWeapons: "Armory",
  BronzeWeapons: "Armory",
  IronWeapons: "Armory",
  DwarvenWeapons: "Armory",
  CopperArmor: "Armory",
  BronzeArmor: "Armory",
  IronArmor: "Armory",
  MeteoricIronArmor: "Armory",
  CopperShields: "Armory",
  BronzeShields: "Armory",
  IronShields: "Armory",
  DragonscaleShields: "Armory",
  MasterOfWeaponry: "Armory",
  CelestialWeapons: "Armory",
  LeizusSilk: "Armory",

  Market: "Market",
  SilkRoad: "Market",
  CaravanChinese: "Market",
  TaxCollectors: "Market",
  Coinage: "Market",
  Ambassadors: "Market",

  MilitaryCamp: "MilitaryCamp",
  DaoSwordsman: "MilitaryCamp",
  GeHalberdier: "MilitaryCamp",
  WuzuJavelineer: "MilitaryCamp",
  MediumInfantry: "MilitaryCamp",
  HeavyInfantry: "MilitaryCamp",
  ChampionInfantry: "MilitaryCamp",
  MediumArchers: "MilitaryCamp",
  HeavyArchers: "MilitaryCamp",
  ChampionArchers: "MilitaryCamp",
  WhiteHorseCavalry: "MilitaryCamp",
  HeavyCavalry: "MilitaryCamp",
  ChampionCavalry: "MilitaryCamp",
  DivineBooks: "MilitaryCamp",
  FrenziedDash: "MilitaryCamp",
  ImperialOrder: "MilitaryCamp",
  XuanyuansBloodline: "MilitaryCamp",

  MachineWorkshop: "MachineWorkshop",
  FireArcher: "MachineWorkshop",
  ChuKoNu: "MachineWorkshop",
  SiegeCrossbow: "MachineWorkshop",
  AxeCart: "MachineWorkshop",
  ScorchingFeathers: "MachineWorkshop",
  SouthernFire: "MachineWorkshop",
  DraftHorses: "MachineWorkshop",
  Engineers: "MachineWorkshop",

  ImperialAcademy: "ImperialAcademy",
  Sage: "ImperialAcademy",
  JiangZiYa: "ImperialAcademy",
  YangJian: "ImperialAcademy",
  LiJing: "ImperialAcademy",
  WenZhong: "ImperialAcademy",
  NezhaChild: "ImperialAcademy",
  NezhaYouth: "ImperialAcademy",
  Nezha: "ImperialAcademy",
  TaiChi: "ImperialAcademy",
  PeachOfImmortality: "ImperialAcademy",
  HerbalMedicine: "ImperialAcademy",
  TempestuousStorm: "ImperialAcademy",
  ShakerOfHeaven: "ImperialAcademy",

  Baolei: "Baolei",
  TigerCavalry: "Baolei",
  LevyBaoleiSoldiers: "Baolei",
  ConscriptBaoleiSoldiers: "Baolei",
  AdvancedFortifications: "Baolei",
  LastStand: "Baolei",
  ChampionCavalry: "Baolei",
  HeavyCavalry: "Baolei",

  Wonder: "Wonder",
};

const CHINESE_TECHTREE_AMBIGUOUS_PARENT_NAMES = new Set([
  "MediumArchers", "HeavyArchers", "ChampionArchers",
  "MediumInfantry", "HeavyInfantry", "ChampionInfantry",
  "HeavyCavalry", "ChampionCavalry",
  "Pioneer", "DivineLight", "EastWind", "SkyFire",
  "AdvancedDefenses", "DivineBooks", "LeizusSilk", "MasterOfWeaponry",
]);

function chineseCanUseStaticParentLane(name) {
  return !!name && !CHINESE_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(name) && !!CHINESE_TECHTREE_PARENT_LANE[name];
}

function chineseGroupFromUniqueReference(ref) {
  const value = String(ref || "");
  if (!value) return "";
  return CHINESE_TECHTREE_GROUP_ORDER.find((group) => value.startsWith(group)) || "";
}

function chineseGroupFromAmbiguousParentReference(parent, node) {
  if (!parent || node?.uniqueParent || !CHINESE_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(parent)) return "";
  if (["MediumArchers", "HeavyArchers", "ChampionArchers"].includes(parent)) {
    if (String(node?.uniqueParent || node?.uniqueIdentifier || "").startsWith("MachineWorkshop")) return "MachineWorkshop";
    if (String(node?.uniqueParent || node?.uniqueIdentifier || "").startsWith("MilitaryCamp")) return "MilitaryCamp";
  }
  if (["MediumInfantry", "HeavyInfantry", "ChampionInfantry"].includes(parent)) return "MilitaryCamp";
  if (["HeavyCavalry", "ChampionCavalry"].includes(parent)) {
    // Chinese heavy/champion cavalry in the provided Chinese trees belong to
    // the Baolei line. If the current node has an explicit MilitaryCamp marker
    // in UniqueParent/UniqueIdentifier we keep it there, otherwise preserve the
    // visible Baolei parent line across ages.
    const marker = String(node?.uniqueParent || node?.uniqueIdentifier || "");
    if (marker.startsWith("MilitaryCamp")) return "MilitaryCamp";
    return "Baolei";
  }
  if (["Pioneer", "DivineLight", "EastWind", "SkyFire"].includes(parent)) {
    if (String(node?.uniqueParent || node?.uniqueIdentifier || "").startsWith("Temple")) return "Temple";
    return "ImperialAcademy";
  }
  if (parent === "AdvancedDefenses") return node?.parent === "Baolei" || node?.name === "AdvancedFortifications" ? "Baolei" : "SentryTower";
  if (parent === "DivineBooks") return node?.parent === "MachineWorkshop" ? "MachineWorkshop" : "MilitaryCamp";
  if (parent === "LeizusSilk") return node?.parent === "MachineWorkshop" ? "MachineWorkshop" : (node?.parent === "MilitaryCamp" ? "MilitaryCamp" : "Armory");
  if (parent === "MasterOfWeaponry") return node?.parent === "GeHalberdier" ? "MilitaryCamp" : "Armory";
  return "";
}

function chineseChooseParentNodeForChain(current, node, candidates) {
  const list = (candidates || []).filter(Boolean);
  if (!list.length) return null;
  if (node?.uniqueParent) {
    const exact = list.find((candidate) => candidate?.uniqueIdentifier === node.uniqueParent);
    if (exact) return exact;
  }
  const nodeX = Number(node?.x);
  return list.slice().sort((a, b) => {
    const ax = Number(a.x) || 0;
    const bx = Number(b.x) || 0;
    const aDistance = Number.isFinite(nodeX) ? Math.abs(ax - nodeX) : ax;
    const bDistance = Number.isFinite(nodeX) ? Math.abs(bx - nodeX) : bx;
    const aAfterPenalty = Number.isFinite(nodeX) && ax > nodeX ? 1000 : 0;
    const bAfterPenalty = Number.isFinite(nodeX) && bx > nodeX ? 1000 : 0;
    return (aDistance + aAfterPenalty) - (bDistance + bAfterPenalty) || ax - bx || (Number(a.y) || 0) - (Number(b.y) || 0);
  })[0];
}

function chineseNodeGroupRoot(node) {
  const parent = node?.parent || "";
  const name = node?.name || "";
  const uniqueGroup = chineseGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = chineseGroupFromAmbiguousParentReference(parent, node);
  if (ambiguousGroup) return ambiguousGroup;
  if (CHINESE_TECHTREE_GROUP_ORDER.includes(parent)) return parent;
  if (chineseCanUseStaticParentLane(parent)) return CHINESE_TECHTREE_PARENT_LANE[parent];
  if (!parent && CHINESE_TECHTREE_GROUP_ORDER.includes(name)) return name;
  if (chineseCanUseStaticParentLane(name)) return CHINESE_TECHTREE_PARENT_LANE[name];
  return parent || name;
}

function chineseNodeGroupOrder(node) {
  const root = chineseNodeGroupRoot(node);
  const idx = CHINESE_TECHTREE_GROUP_ORDER.indexOf(root);
  return idx >= 0 ? idx : 99;
}

const CHINESE_TECHTREE_FIXED_LOCAL_X = {
  // Town Center
  VillagerChinese: 1,
  Kuafu: 2,
  TerracottaRiders: 1,
  KuafuChieftain: 1,
  ChasingTheSun: 1,
  Masons: 1,
  Architects: 1,
  SecretsOfTheTitans: 1,
  TitanGate: 1,

  // Silo economy chains
  Husbandry: 1,
  HuntingEquipment: 1,
  Abundance: 1,
  MountainousMight: 2,
  Plow: 2,
  Irrigation: 2,
  FloodControl: 2,
  HandAxe: 3,
  BowSaw: 3,
  Carpenters: 3,
  Pickaxe: 4,
  ShaftMine: 4,
  Quarry: 4,
  SlashAndBurn: 1,

  // Wall / Dock
  StoneWall: 0,
  FortifiedWall: 0,
  BronzeWall: 0,
  IronWall: 0,
  GreatWall: 0,
  HeroicFleet: 1,
  DouJian: 2,
  MengChong: 3,
  LouChuan: 4,
  TransportShipChinese: 5,
  EnclosedDeck: 5,
  FishingShipChinese: 6,
  PurseSeine: 6,
  FishBasket: 6,
  SaltAmphora: 6,
  HeavyWarShips: 4,
  ChampionWarShips: 4,
  ConscriptSailors: 5,

  // Temple fallback columns
  Pioneer: 1,
  DivineLight: 1,
  EastWind: 1,
  SkyFire: 1,
  QiLin: 2,
  YaZi: 3,
  QiongQi: 3,
  BaiHu: 2,
  Pixiu: 3,
  TaoWu: 2,
  TaoTie: 3,
  ChiWen: 4,
  QingLong: 2,
  Hundun: 3,
  HunDun: 3,
  ZhuQue: 4,
  Omniscience: 0,

  // Tower / Armory / Market
  SignalFires: 0,
  WatchTower: 1,
  GuardTower: 1,
  CrossbowTower: 1,
  Crenellations: 1,
  BoilingOil: 1,
  Ballistics: 1,
  BurningPitch: 1,
  CopperWeapons: 2,
  BronzeWeapons: 2,
  IronWeapons: 2,
  DwarvenWeapons: 2,
  CopperArmor: 3,
  BronzeArmor: 3,
  IronArmor: 3,
  MeteoricIronArmor: 3,
  CopperShields: 4,
  BronzeShields: 4,
  IronShields: 4,
  DragonscaleShields: 4,
  CaravanChinese: 1,
  SilkRoad: 1,
  Coinage: 1,
  TaxCollectors: 2,
  Ambassadors: 2,

  // Production lanes
  DaoSwordsman: 1,
  GeHalberdier: 2,
  WuzuJavelineer: 3,
  MediumArchers: 3,
  HeavyArchers: 3,
  ChampionArchers: 3,
  MediumInfantry: 4,
  HeavyInfantry: 4,
  ChampionInfantry: 4,
  WhiteHorseCavalry: 5,
  HeavyCavalry: 5,
  ChampionCavalry: 5,
  FireArcher: 1,
  ChuKoNu: 2,
  SiegeCrossbow: 3,
  AxeCart: 1,
  DraftHorses: 3,
  Engineers: 3,

  // Imperial Academy / Baolei
  Sage: 1,
  JiangZiYa: 2,
  YangJian: 1,
  LiJing: 1,
  WenZhong: 1,
  NezhaChild: 2,
  NezhaYouth: 2,
  Nezha: 2,
  TaiChi: 3,
  PeachOfImmortality: 4,
  HerbalMedicine: 3,
  TigerCavalry: 1,
  LevyBaoleiSoldiers: 2,
  ConscriptBaoleiSoldiers: 2,
  HeavyCavalry: 3,
  ChampionCavalry: 3,
  AdvancedFortifications: 2,
};

function chineseFixedLocalX(node, group) {
  const name = node?.name || "";
  if (group === "TownCenter" && /^SkinOfTheRhino/.test(name)) return 2;
  if (group === "SkyPassage" && name === "SkyPassage") return 0;
  if (group === "ImperialAcademy" && ["NezhaChild", "NezhaYouth", "Nezha"].includes(name)) return 2;
  if (group === "Temple" && ["NezhaChild", "NezhaYouth", "Nezha"].includes(name)) return undefined;
  if (group === "Armory") {
    const map = {
      Armory: 0, DwarvenArmory: 0, Ballistics: 1, BurningPitch: 1,
      CopperWeapons: 2, BronzeWeapons: 2, IronWeapons: 2, DwarvenWeapons: 2,
      CopperArmor: 3, BronzeArmor: 3, IronArmor: 3, MeteoricIronArmor: 3,
      CopperShields: 4, BronzeShields: 4, IronShields: 4, DragonscaleShields: 4,
      MasterOfWeaponry: 1, CelestialWeapons: 1, LeizusSilk: 1,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "MilitaryCamp") {
    const map = {
      MilitaryCamp: 0, DaoSwordsman: 1, DivineBooks: 1, GeHalberdier: 2, MasterOfWeaponry: 2,
      WuzuJavelineer: 3, MediumArchers: 3, HeavyArchers: 3, ChampionArchers: 3,
      MediumInfantry: 4, HeavyInfantry: 4, ChampionInfantry: 4,
      WhiteHorseCavalry: 5, HeavyCavalry: 5, ChampionCavalry: 5,
      FrenziedDash: 1, LeizusSilk: 1, XuanyuansBloodline: 1, ImperialOrder: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "MachineWorkshop") {
    const map = {
      MachineWorkshop: 0, DivineBooks: 1, FireArcher: 1, MediumArchers: 1, HeavyArchers: 1, ChampionArchers: 1,
      ChuKoNu: 2, ScorchingFeathers: 2, SiegeCrossbow: 3, DraftHorses: 3, AxeCart: 1,
      Engineers: 3, SouthernFire: 1, LeizusSilk: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "ImperialAcademy") {
    const map = {
      ImperialAcademy: 0, Sage: 1, JiangZiYa: 2, YangJian: 1, LiJing: 1, WenZhong: 1,
      NezhaChild: 2, NezhaYouth: 2, Nezha: 2, Pioneer: 3, DivineLight: 3, EastWind: 3, SkyFire: 3,
      CelestialWeapons: 1, TaiChi: 3, PeachOfImmortality: 4, HerbalMedicine: 3,
      TempestuousStorm: 1, ShakerOfHeaven: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "SentryTower") {
    const map = {
      SentryTower: 0,
      WatchTower: 1,
      Crenellations: 1,
      GuardTower: 1,
      BoilingOil: 1,
      CrossbowTower: 1,
      // Keep standalone tower techs out of the protected WatchTower line so
      // WatchTower -> GuardTower -> CrossbowTower can stay in one column.
      SignalFires: 2,
      CarrierPigeons: 2,
      AdvancedDefenses: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "Baolei") {
    const map = {
      Baolei: 0, TigerCavalry: 1, LastStand: 1, LevyBaoleiSoldiers: 2, ConscriptBaoleiSoldiers: 2,
      HeavyCavalry: 3, ChampionCavalry: 3, AdvancedDefenses: 1, AdvancedFortifications: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (Object.prototype.hasOwnProperty.call(CHINESE_TECHTREE_FIXED_LOCAL_X, name)) return CHINESE_TECHTREE_FIXED_LOCAL_X[name];
  return undefined;
}

const CHINESE_TECHTREE_PROTECTED_LINE_LOCAL_X = {
  TownCenter: [1, 2],
  Silo: [1, 2, 3, 4],
  WallConnector: [0],
  Dock: [1, 2, 3, 4, 5, 6, 7, 8],
  Temple: [0, 1, 2, 3, 4],
  SentryTower: [0, 1],
  Armory: [1, 2, 3, 4],
  Market: [1, 2],
  MilitaryCamp: [1, 2, 3, 4, 5],
  MachineWorkshop: [1, 2, 3],
  ImperialAcademy: [1, 2, 3, 4],
  Baolei: [1, 2, 3],
};

function chineseProtectedLineColumns(group, groupNodes = null) {
  const candidateColumns = new Set(CHINESE_TECHTREE_PROTECTED_LINE_LOCAL_X[group] || []);
  if (!Array.isArray(groupNodes)) return candidateColumns;
  const activeColumns = new Set();
  for (const node of groupNodes) {
    const fixed = chineseFixedLocalX(node, group);
    if (!Number.isFinite(Number(fixed))) continue;
    const localX = Number(fixed);
    if (candidateColumns.has(localX)) activeColumns.add(localX);
  }
  return activeColumns;
}

function chineseIsLaneRootParent(group, parent) {
  return parent === group
    || (group === "Armory" && parent === "DwarvenArmory")
    || (group === "TownCenter" && parent === "TownCenter")
    || (group === "Monument" && /^MonumentTo/.test(parent || ""));
}

function chineseNextNonProtectedLocalX(group, minX, protectedColumns = null) {
  const columns = protectedColumns instanceof Set ? protectedColumns : chineseProtectedLineColumns(group);
  for (let x = Math.max(0, Number(minX) || 0); x < 64; x += 1) {
    if (!columns.has(x)) return x;
  }
  return Math.max(0, Number(minX) || 0);
}

function chineseTechTreeSourceNodes(age) {
  const templates = window.AOM_TECHTREE || {};
  const byMajor = {};
  for (const major of CHINESE_TECHTREE_MAJOR_SOURCES) {
    const block = age === "ArchaicAge"
      ? extractXmlPropertyBlock(lookupTemplateBlock(templates.archaicByMajor, major) || "", "Technologies")
      : templates.ageTechnologiesByMajorAge?.[`${major}|${age}`] || "";
    byMajor[major] = parseTechTreeNodesFromBlock(block);
  }
  return byMajor;
}

function chineseMinorBonusTokens(minorTech) {
  const block = window.AOM_TECHTREE?.bonusTrackByGod?.[canonicalMinorTech(minorTech)] || "";
  return parseTechTreeNodesFromBlock(block).filter((node) => node.type === "Unit" || node.type === "Tech");
}

function chineseAllConditionalNodeNames() {
  const names = new Set();
  (UNIQUE_TECH_GROUPS || []).forEach((group) => {
    names.add(group.id);
    (group.techs || []).forEach((tech) => names.add(tech));
  });
  Object.values(CHINESE_TECHTREE_MINOR_BY_AGE).flat().forEach((minor) => {
    chineseMinorBonusTokens(minor).forEach((node) => names.add(node.name));
  });
  return names;
}

function chineseCommonNodesForAge(age) {
  const byMajor = chineseTechTreeSourceNodes(age);
  const excluded = chineseAllConditionalNodeNames();
  const keySets = Object.fromEntries(Object.entries(byMajor).map(([major, nodes]) => [major, new Set(nodes.map(techTreeNodeKey))]));
  const baseSource = CHINESE_TECHTREE_MAJOR_SOURCES[0];
  const allKeys = [...(keySets[baseSource] || new Set())];
  const commonKeys = allKeys.filter((key) => CHINESE_TECHTREE_MAJOR_SOURCES.every((major) => keySets[major]?.has(key)));
  const sourceNodes = Object.values(byMajor).flat();
  const result = [];
  for (const key of commonKeys) {
    const matches = sourceNodes.filter((node) => techTreeNodeKey(node) === key);
    const rep = chooseGreekRepresentativeNode(matches);
    if (!rep || excluded.has(rep.name)) continue;
    result.push({ ...rep });
  }
  return result;
}

function chineseFindRightSideNodesForToken(age, tokenNode) {
  const byMajor = chineseTechTreeSourceNodes(age);
  const matches = Object.values(byMajor).flat().filter((node) => node.type === tokenNode.type && node.name === tokenNode.name);
  if (!matches.length) return [];
  const byKey = new Map();
  for (const node of matches) {
    const key = techTreeNodeKey(node);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(node);
  }
  const reps = [...byKey.values()].map((nodes) => ({ count: nodes.length, node: chooseGreekRepresentativeNode(nodes) }));
  reps.sort((a, b) => chineseNodeGroupOrder(a.node) - chineseNodeGroupOrder(b.node) || (a.node.x - b.node.x) || (a.node.y - b.node.y) || String(a.node.parent).localeCompare(String(b.node.parent)) || (b.count - a.count));
  return reps.map((entry) => ({ ...entry.node }));
}

function chineseMinorNodeSameBuildingKey(node, contextNodes = []) {
  if (!node?.type || !node?.name) return "";
  const group = chineseResolveNodeGroupFromNodes(node, contextNodes && contextNodes.length ? contextNodes : [node]);
  return `${node.type}|${node.name}|${group}`;
}

function chinesePriorSelectedMinorBuildingKeys(age, config) {
  const out = new Set();
  const order = ["ClassicalAge", "HeroicAge", "MythicAge"];
  const index = order.indexOf(age);
  if (index <= 0) return out;
  for (const priorAge of order.slice(0, index)) {
    const selected = (config.minorGods?.[priorAge] || []).map(canonicalMinorTech);
    const priorNodes = [];
    for (const minor of selected) {
      for (const token of chineseMinorBonusTokens(minor)) {
        priorNodes.push(...chineseFindRightSideNodesForToken(priorAge, token));
      }
    }
    for (const node of priorNodes) {
      const key = chineseMinorNodeSameBuildingKey(node, priorNodes);
      if (key) out.add(key);
    }
  }
  return out;
}

function chineseSelectedMinorNodesForAge(age, config) {
  const selected = (config.minorGods?.[age] || []).map(canonicalMinorTech);
  const nodes = [];
  const seenSameBuilding = chinesePriorSelectedMinorBuildingKeys(age, config);
  for (const minor of selected) {
    for (const token of chineseMinorBonusTokens(minor)) {
      for (const candidate of chineseFindRightSideNodesForToken(age, token)) {
        const key = chineseMinorNodeSameBuildingKey(candidate, [...nodes, candidate]);
        if (key && seenSameBuilding.has(key)) continue;
        nodes.push(candidate);
        if (key) seenSameBuilding.add(key);
      }
    }
  }
  return nodes;
}

function chineseResolveNodeGroupFromNodes(node, allNodes) {
  const byName = new Map();
  const byUniqueIdentifier = new Map();
  for (const candidate of allNodes || []) {
    if (!candidate?.name) continue;
    if (!byName.has(candidate.name)) byName.set(candidate.name, []);
    byName.get(candidate.name).push(candidate);
    if (candidate.uniqueIdentifier) byUniqueIdentifier.set(candidate.uniqueIdentifier, candidate);
  }
  const uniqueGroup = chineseGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = chineseGroupFromAmbiguousParentReference(node?.parent || "", node);
  if (ambiguousGroup) return ambiguousGroup;
  const seen = new Set();
  let current = node?.uniqueParent || node?.parent || node?.name || "";
  let walkerNode = node;
  for (let i = 0; i < 16 && current && !seen.has(current); i += 1) {
    seen.add(current);
    if (CHINESE_TECHTREE_GROUP_ORDER.includes(current)) return current;
    if (chineseCanUseStaticParentLane(current)) return CHINESE_TECHTREE_PARENT_LANE[current];
    let parentNode = byUniqueIdentifier.get(current) || null;
    if (!parentNode) parentNode = chineseChooseParentNodeForChain(current, walkerNode, byName.get(current) || []);
    if (parentNode?.uniqueParent || parentNode?.parent) {
      walkerNode = parentNode;
      current = parentNode.uniqueParent || parentNode.parent;
      continue;
    }
    if (parentNode?.name && parentNode.name !== current) {
      walkerNode = parentNode;
      current = parentNode.name;
      continue;
    }
    break;
  }
  if (chineseCanUseStaticParentLane(node?.name)) return CHINESE_TECHTREE_PARENT_LANE[node.name];
  return chineseNodeGroupRoot(node);
}

function chineseCompactGroupNodes(group, groupNodes, groupStartX = 0, protectedColumnsOverride = null, age = "", lineMemberKeys = null) {
  const nodes = (groupNodes || []).map((inputNode) => {
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    return node;
  });

  const isGroupRootNode = (node) => !node?.parent && (node?.name === group || (group === "Armory" && node?.name === "DwarvenArmory") || (group === "Monument" && /^MonumentTo/.test(node?.name || "")));
  const hasRoot = nodes.some((node) => isGroupRootNode(node));
  const preSortDirectChildCountByName = new Map();
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    preSortDirectChildCountByName.set(parentKey, (preSortDirectChildCountByName.get(parentKey) || 0) + 1);
  }
  const nodeHasPreSortDirectChildren = (node) => (preSortDirectChildCountByName.get(node?.uniqueIdentifier || node?.name) || 0) > 0;
  const sourceOrder = (node) => (Number(node.x) || 0) * 10 + (Number(node.y) || 0);
  const sorted = nodes.slice().sort((a, b) => {
    const aIsRoot = isGroupRootNode(a);
    const bIsRoot = isGroupRootNode(b);
    if (aIsRoot !== bIsRoot) return aIsRoot ? -1 : 1;
    if (a.name === b.parent && b.name !== a.parent) return -1;
    if (b.name === a.parent && a.name !== b.parent) return 1;
    const aRootChild = chineseIsLaneRootParent(group, a.parent) && !nodeHasPreSortDirectChildren(a);
    const bRootChild = chineseIsLaneRootParent(group, b.parent) && !nodeHasPreSortDirectChildren(b);
    if (aRootChild && bRootChild && a.type !== b.type) {
      // For direct childless nodes in a building lane, place units before
      // childless techs. This lets units claim row 0 when the parent building
      // was introduced in an earlier age, while the techs fall to row 1.
      // The actual X column still comes from fixed/parent placement rules.
      if (a.type === "Unit") return -1;
      if (b.type === "Unit") return 1;
    }
    const af = chineseFixedLocalX(a, group);
    const bf = chineseFixedLocalX(b, group);
    if (Number.isFinite(Number(af)) !== Number.isFinite(Number(bf))) return Number.isFinite(Number(af)) ? -1 : 1;
    if (Number.isFinite(Number(af)) && af !== bf) return af - bf;
    return sourceOrder(a) - sourceOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name) || String(a.parent).localeCompare(String(b.parent));
  });

  const localOccupied = new Set();
  const placedLocalByName = new Map();
  const placedRowByName = new Map();
  const placed = [];
  const protectedLineColumns = protectedColumnsOverride instanceof Set ? protectedColumnsOverride : chineseProtectedLineColumns(group, nodes);
  const isLineMemberNode = (node) => lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
  const directChildCountByName = new Map();
  const directChildFixedLocalXByName = new Map();
  const rootDirectChildTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildWithChildrenTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypesByLocalX = new Map();
  const isLaneRootParent = (parent) => chineseIsLaneRootParent(group, parent);
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    directChildCountByName.set(parentKey, (directChildCountByName.get(parentKey) || 0) + 1);
    const childFixed = chineseFixedLocalX(child, group);
    if (Number.isFinite(Number(childFixed))) {
      const current = directChildFixedLocalXByName.get(parentKey);
      const childFixedX = Number(childFixed);
      if (!Number.isFinite(Number(current)) || childFixedX < Number(current)) {
        directChildFixedLocalXByName.set(parentKey, childFixedX);
      }
    }
  }
  for (const child of nodes) {
    if (!child || !isLaneRootParent(child.parent)) continue;
    if (child.type === "Unit" || child.type === "Tech") {
      rootDirectChildTypeCounts[child.type] += 1;
      const childKey = child.uniqueIdentifier || child.name;
      if (directChildCountByName.get(childKey) || 0) {
        rootDirectChildWithChildrenTypeCounts[child.type] += 1;
      } else {
        rootDirectChildlessTypeCounts[child.type] += 1;
        const fixedLocal = chineseFixedLocalX(child, group);
        const localX = Number.isFinite(Number(fixedLocal)) ? Number(fixedLocal) : undefined;
        if (Number.isFinite(localX)) {
          if (!rootDirectChildlessTypesByLocalX.has(localX)) rootDirectChildlessTypesByLocalX.set(localX, new Set());
          rootDirectChildlessTypesByLocalX.get(localX).add(child.type);
        }
      }
    }
  }

  const canUse = (x, y, allowProtectedLineColumn = true) => {
    if (localOccupied.has(`${x},${y}`)) return false;
    if (!allowProtectedLineColumn && protectedLineColumns.has(x)) return false;
    return true;
  };
  const reserve = (node, localX, y) => {
    localOccupied.add(`${localX},${y}`);
    for (const placementKey of techTreeNodePlacementKeys(node)) {
      if (!placedLocalByName.has(placementKey) || localX < placedLocalByName.get(placementKey)) {
        placedLocalByName.set(placementKey, localX);
        placedRowByName.set(placementKey, y);
      }
    }
    const cleanNode = { ...node };
    delete cleanNode._group;
    placed.push({ ...cleanNode, x: groupStartX + localX, y, position: `${groupStartX + localX},${y}` });
  };
  const firstFree = (minX, preferredY = 0, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) if (canUse(x, y, allowProtectedLineColumn)) return { x, y };
    }
    return { x: Math.max(0, minX || 0), y: preferredY === 1 ? 1 : 0 };
  };
  const firstFreeParentColumn = (minX, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn) && canUse(x, 1, allowProtectedLineColumn)) return { x, y: 0 };
    }
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn)) return { x, y: 0 };
    }
    return firstFree(minX, 0, allowProtectedLineColumn);
  };

  for (const node of techTreeParentDepthFirstOrder(sorted, isGroupRootNode)) {
    const isRoot = isGroupRootNode(node);
    if (isRoot) {
      const fixed = chineseFixedLocalX(node, group);
      const x = Number.isFinite(Number(fixed)) ? Number(fixed) : 0;
      const y = 0;
      if (!canUse(x, y, true)) {
        const alt = firstFree(x, y, true);
        reserve(node, alt.x, alt.y);
      } else {
        reserve(node, x, y);
      }
      continue;
    }

    const fixed = chineseFixedLocalX(node, group);
    const parentLookupKey = techTreeNodeParentLookupKey(node);
    const parentLocal = placedLocalByName.get(parentLookupKey);
    const parentRow = placedRowByName.get(parentLookupKey);
    const childFixedLocal = directChildFixedLocalXByName.get(node.uniqueIdentifier || node.name);
    const parentFixedLocalRaw = parentLookupKey ? chineseFixedLocalX({ type: "Unit", name: parentLookupKey, parent: group }, group) : undefined;
    const parentFixedLocal = Number.isFinite(Number(parentFixedLocalRaw)) ? Number(parentFixedLocalRaw) : undefined;
    let desiredX;
    let preferredY = Number(node.y) === 0 ? 0 : 1;

    if (Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent)) {
      // Parent-line rule: once a parent is placed, every direct child follows
      // the parent's actual column. Fixed local X values are only preferred
      // before the parent is placed; they must not break the visible line if
      // the parent had to move to a cleaner/available column.
      desiredX = Number(parentLocal);
      if (Number.isFinite(Number(parentRow))) preferredY = Number(parentRow) === 0 ? 1 : 0;
    } else if (Number.isFinite(Number(parentFixedLocal)) && !isLaneRootParent(node.parent)) {
      // Multi-age parent-line rule: if the visible parent belongs to this
      // building lane but is placed in another age, still use the parent's
      // canonical local column. This keeps lines such as DouJian -> Maelstrom
      // and CaravanChinese -> Coinage aligned even when only the child appears
      // in the current age.
      desiredX = Number(parentFixedLocal);
      preferredY = node.type === "Tech" ? 1 : preferredY;
    } else if (Number.isFinite(Number(fixed))) {
      desiredX = Number(fixed);
    } else if (Number.isFinite(Number(childFixedLocal))) {
      // Generic parent-line rule: if a direct child is part of a fixed upgrade
      // line, place the parent in that same column first. Example: Anubite
      // inherits FeetOfTheJackal's column, so the pair forms a clean vertical
      // parent line instead of the child occupying the protected column alone.
      desiredX = Number(childFixedLocal);
    } else {
      desiredX = 1;
    }

    const hasDirectChildren = (directChildCountByName.get(node.uniqueIdentifier || node.name) || 0) > 0;
    const directFromRootBuilding = hasRoot && isLaneRootParent(node.parent);
    const rootHasChildlessUnitAndTech = rootDirectChildlessTypeCounts.Unit > 0 && rootDirectChildlessTypeCounts.Tech > 0;
    const rootChildlessTypesAtDesiredX = rootDirectChildlessTypesByLocalX.get(Number(desiredX)) || new Set();
    const rootColumnHasChildlessUnitAndTech = rootChildlessTypesAtDesiredX.has("Unit") && rootChildlessTypesAtDesiredX.has("Tech");
    const rootHasOnlyChildlessUnits = directFromRootBuilding
      && !hasDirectChildren
      && node.type === "Unit"
      && !isLineMemberNode(node)
      && rootDirectChildlessTypeCounts.Unit > 0
      && rootDirectChildlessTypeCounts.Tech === 0
      && rootDirectChildWithChildrenTypeCounts.Unit === 0
      && rootDirectChildWithChildrenTypeCounts.Tech === 0;
    if (rootHasOnlyChildlessUnits) {
      // When a building appears in the current age and only trains units from
      // its root command row, keep those units together on row 1 and pack them
      // compactly from the first available column. This avoids gaps like an
      // empty TownCenter column 1/2 while all trained units are shifted right.
      desiredX = 1;
      preferredY = 1;
    } else if (directFromRootBuilding && !hasDirectChildren) {
      // Direct children of a building that appears in this age should keep the
      // building row clean. Childless units prefer row 1 unless a childless tech
      // also wants that exact column; only then use the classic unit row 0 /
      // tech row 1 split. This keeps Longhouse units together on row 1 while
      // still handling HillFort columns that contain both a unit and a tech.
      if (node.type === "Unit") preferredY = rootColumnHasChildlessUnitAndTech ? 0 : 1;
      if (node.type === "Tech") preferredY = 1;
    } else if (node.type === "Unit") {
      preferredY = 0;
    }
    if (age === "ArchaicAge" && !isRoot && node.type === "Unit" && !hasDirectChildren && !rootHasChildlessUnitAndTech && !localOccupied.has(`${desiredX},1`)) preferredY = 1;
    if (age === "ArchaicAge" && !isRoot && node.type !== "Unit" && !localOccupied.has(`${desiredX},1`)) preferredY = 1;

    if (!hasRoot && !isLaneRootParent(node.parent)) desiredX = Math.max(desiredX, 0);
    if (hasRoot || group === "TownCenter") desiredX = Math.max(desiredX, 1);

    const hasFixedLocalX = Number.isFinite(Number(fixed));
    const isChildOfPlacedChain = Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent) && Number(parentLocal) === Number(desiredX);
    const isParentOfFixedChildLine = Number.isFinite(Number(childFixedLocal)) && Number(childFixedLocal) === Number(desiredX);
    const isGlobalLineMember = isLineMemberNode(node);
    const isFixedLineNode = hasFixedLocalX && protectedLineColumns.has(Number(fixed)) && (isGlobalLineMember || !isLaneRootParent(node.parent) || hasDirectChildren || isParentOfFixedChildLine);
    const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
      || (group === "Temple" && node.name === "Omniscience");
    const allowProtectedLineColumn = rootHasOnlyChildlessUnits || isChildOfPlacedChain || isParentOfFixedChildLine || isFixedLineNode || isSharedColumnException;
    if (!allowProtectedLineColumn && protectedLineColumns.has(desiredX)) {
      desiredX = chineseNextNonProtectedLocalX(group, desiredX + 1, protectedLineColumns);
    }

    let placedHere = false;
    if (rootHasOnlyChildlessUnits) {
      for (let x = Math.max(1, Number(desiredX) || 1); x < 64; x += 1) {
        if (canUse(x, 1, true)) {
          reserve(node, x, 1);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere && hasDirectChildren) {
      // If this node is itself a child in an already placed parent line, keep it
      // in the parent column first. This handles three-step lines such as
      // YaZi -> SonOfLoong -> RageOfSlaughter: the middle node should sit under
      // the unit parent before its own child pushes to a later free column.
      if (isChildOfPlacedChain && canUse(desiredX, preferredY, allowProtectedLineColumn)) {
        reserve(node, desiredX, preferredY);
        placedHere = true;
      }
      if (!placedHere) {
        // Any visible parent line, including tech upgrade chains, should reserve
        // a clean column first. This keeps chains such as CopperWeapons ->
        // BronzeWeapons and Valkyrie -> Disablot in one vertical line instead
        // of letting an unrelated node occupy the child row.
        const cleanColumn = firstFreeParentColumn(desiredX, allowProtectedLineColumn);
        reserve(node, cleanColumn.x, cleanColumn.y);
        placedHere = true;
      }
    }
    if (!placedHere) {
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) {
        if (canUse(desiredX, y, allowProtectedLineColumn)) {
          reserve(node, desiredX, y);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere) {
      const fallbackPreferredY = node.type === "Tech" ? 1 : preferredY;
      const alt = firstFree(desiredX + 1, fallbackPreferredY, allowProtectedLineColumn);
      reserve(node, alt.x, alt.y);
    }
  }

  // Final row cleanup: if a direct childless unit and a direct childless tech
  // from the same building lane ended up in the same column, keep the unit on
  // row 0 and the tech on row 1. This preserves the compact column while
  // keeping units visually prominent.
  const childlessRootNode = (node) => isLaneRootParent(node?.parent) && !(directChildCountByName.get(node?.uniqueIdentifier || node?.name) || 0);
  const byColumn = new Map();
  for (const node of placed) {
    if (!childlessRootNode(node)) continue;
    if (!byColumn.has(node.x)) byColumn.set(node.x, []);
    byColumn.get(node.x).push(node);
  }
  for (const columnNodes of byColumn.values()) {
    const unitRow1 = columnNodes.find((node) => node.type === "Unit" && Number(node.y) === 1);
    const techRow0 = columnNodes.find((node) => node.type === "Tech" && Number(node.y) === 0);
    if (unitRow1 && techRow0) {
      unitRow1.y = 0;
      unitRow1.position = `${unitRow1.x},0`;
      techRow0.y = 1;
      techRow0.position = `${techRow0.x},1`;
    }
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function chineseNormalizeTechTreeNodes(age, nodes, forcedGroupStarts = null, protectedColumnsByGroup = null, lineMemberKeys = null) {
  const unique = new Map();
  for (const inputNode of nodes) {
    if (!inputNode || !inputNode.type || !inputNode.name) continue;
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    node.position = `${node.x},${node.y}`;
    const key = techTreeNodeKey(node);
    if (!unique.has(key)) unique.set(key, node);
  }

  const allNodes = [...unique.values()];
  const grouped = new Map();
  for (const node of allNodes) {
    const group = chineseResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push({ ...node, _group: group });
  }

  const orderedGroups = [...grouped.entries()].sort(([groupA], [groupB]) => {
    const ai = CHINESE_TECHTREE_GROUP_ORDER.indexOf(groupA);
    const bi = CHINESE_TECHTREE_GROUP_ORDER.indexOf(groupB);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || String(groupA).localeCompare(String(groupB));
  });

  const placed = [];
  let nextGroupX = 0;
  for (const [group, groupNodes] of orderedGroups) {
    const forcedX = forcedGroupStarts && Number.isFinite(Number(forcedGroupStarts[group])) ? Number(forcedGroupStarts[group]) : undefined;
    const groupStartX = Number.isFinite(Number(forcedX)) ? Number(forcedX) : nextGroupX;
    const hasProtectionMap = protectedColumnsByGroup && typeof protectedColumnsByGroup === "object";
    const protectedColumns = hasProtectionMap ? (protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : new Set()) : null;
    const groupPlaced = chineseCompactGroupNodes(group, groupNodes, groupStartX, protectedColumns, age, lineMemberKeys);
    placed.push(...groupPlaced);
    const width = groupPlaced.length ? Math.max(...groupPlaced.map((node) => Number(node.x) - groupStartX)) + 1 : 0;
    nextGroupX = groupStartX + Math.max(width, 0);
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || chineseNodeGroupOrder(a) - chineseNodeGroupOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function chineseApplyThorDwarvenArmoryRightSide(nodes, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return nodes || [];
  return (nodes || []).map((inputNode) => {
    const node = { ...inputNode };
    if (node.type === "Unit" && node.name === "Armory") node.name = "DwarvenArmory";
    if (node.parent === "Armory") node.parent = "DwarvenArmory";
    return node;
  });
}


function chineseBaseArmoryRightSideNodes(age, config) {
  const useDwarven = selectedHasThorDwarvenArmoryBonus(config);
  const armory = useDwarven ? "DwarvenArmory" : "Armory";
  const node = (type, name, parent, position) => {
    const [xRaw, yRaw] = String(position).split(",");
    return { type, name, parent: parent || "", position, x: Number(xRaw) || 0, y: Number(yRaw) || 0 };
  };
  if (useDwarven) {
    if (age === "ArchaicAge") {
      return [
        node("Unit", armory, "", "24,0"),
        node("Tech", "Ballistics", armory, "25,1"),
        node("Tech", "CopperWeapons", armory, "26,0"),
        node("Tech", "BronzeWeapons", "CopperWeapons", "26,1"),
        node("Tech", "CopperArmor", armory, "27,0"),
        node("Tech", "BronzeArmor", "CopperArmor", "27,1"),
        node("Tech", "CopperShields", armory, "28,0"),
        node("Tech", "BronzeShields", "CopperShields", "28,1"),
      ];
    }
    if (age === "ClassicalAge") {
      return [
        node("Tech", "BurningPitch", armory, "25,1"),
        node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
        node("Tech", "DwarvenWeapons", "IronWeapons", "26,1"),
        node("Tech", "IronArmor", "BronzeArmor", "27,0"),
        node("Tech", "MeteoricIronArmor", "IronArmor", "27,1"),
        node("Tech", "IronShields", "BronzeShields", "28,0"),
        node("Tech", "DragonscaleShields", "IronShields", "28,1"),
      ];
    }
    return [];
  }
  if (age === "ClassicalAge") {
    return [
      node("Unit", armory, "", "24,0"),
      node("Tech", "Ballistics", armory, "25,1"),
      node("Tech", "CopperWeapons", armory, "26,1"),
      node("Tech", "CopperArmor", armory, "27,1"),
      node("Tech", "CopperShields", armory, "28,1"),
    ];
  }
  if (age === "HeroicAge") {
    return [
      node("Tech", "BronzeWeapons", "CopperWeapons", "26,0"),
      node("Tech", "BronzeArmor", "CopperArmor", "27,0"),
      node("Tech", "BronzeShields", "CopperShields", "28,0"),
    ];
  }
  if (age === "MythicAge") {
    return [
      node("Tech", "BurningPitch", armory, "25,0"),
      node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
      node("Tech", "IronArmor", "BronzeArmor", "27,0"),
      node("Tech", "IronShields", "BronzeShields", "28,0"),
    ];
  }
  return [];
}

function chineseThorDwarvenArmoryExtraRightSideNodes(age, config) {
  // Kept for compatibility; Chinese Dwarven Armory right-side nodes are built
  // by chineseBaseArmoryRightSideNodes so the Armory/DwarvenArmory lane remains
  // complete and age-appropriate.
  return [];
}


function chineseSelectedMythicHeroRightSideNode(age, config) {
  if (age !== "MythicAge" || config?.baseCulture !== "Chinese") return null;
  const hero = Object.values(CHINESE_MYTHIC_HEROES).includes(config.chineseMythicHero) ? config.chineseMythicHero : CHINESE_MYTHIC_HEROES.Fuxi;
  return rightSideNode("Unit", hero, "ImperialAcademy", "1,0");
}

function chineseRawTechTreeNodesForAge(age, config) {
  let nodes = [
    ...chineseCommonNodesForAge(age),
    ...chineseSelectedMinorNodesForAge(age, config),
    chineseSelectedMythicHeroRightSideNode(age, config),
    ...chineseThorDwarvenArmoryExtraRightSideNodes(age, config),
  ].filter(Boolean);
  if (age === "ArchaicAge") {
    const group = selectedUniqueTechGroup(config);
    const tech = selectedUniqueTechRightSideName(config, group);
    if (group && tech) {
      for (const spec of uniqueTechRightSideNodeSpecs(config, "", group)) {
        const [xRaw, yRaw] = String(spec.position || spec.preferred?.[0] || "18,1").split(",");
        nodes.push({
          type: "Tech",
          name: tech,
          parent: spec.parent,
          position: `${Number(xRaw) || 0},${Number(yRaw) || 1}`,
          x: Number(xRaw) || 0,
          y: Number(yRaw) || 1,
        });
      }
    }
  }
  nodes = applyGenericBonusRightSideNodes("Chinese", age, config, nodes);
  if (age === "MythicAge" && !nodes.some((node) => node?.type === "Tech" && node?.name === "Coinage")) {
    nodes.push(rightSideNode("Tech", "Coinage", "CaravanChinese", "1,0"));
  }
  return chineseApplyThorDwarvenArmoryRightSide(nodes, config);
}

function chineseMeasureGroupWidths(nodes, protectedColumnsByGroup = null, age = "", lineMemberKeys = null) {
  const widths = {};
  const grouped = new Map();
  for (const node of nodes || []) {
    const group = chineseResolveNodeGroupFromNodes(node, nodes || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }
  for (const [group, groupNodes] of grouped.entries()) {
    const hasProtectionMap = protectedColumnsByGroup && typeof protectedColumnsByGroup === "object";
    const protectedColumns = hasProtectionMap ? (protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : new Set()) : null;
    const placed = chineseCompactGroupNodes(group, groupNodes, 0, protectedColumns, age, lineMemberKeys);
    widths[group] = placed.length ? Math.max(...placed.map((node) => Number(node.x) || 0)) + 1 : 0;
  }
  return widths;
}


function chineseBuildLineMemberKeySets(rawByAge) {
  const byAge = {};
  const global = new Set();
  const allNodes = Object.values(rawByAge || {}).flat().filter(Boolean);
  const parentRefs = new Set();
  const childKeys = new Set();

  const scopedKey = (group, key) => `${group || ""}::${key || ""}`;

  for (const node of allNodes) {
    const parentKey = techTreeNodeParentLookupKey(node);
    if (!parentKey) continue;
    const group = chineseResolveNodeGroupFromNodes(node, allNodes);
    if (chineseIsLaneRootParent(group, parentKey)) continue;
    // Scope parent references by resolved building lane. Otherwise duplicate
    // Chinese names such as Berserk/Hersir/MediumInfantry can falsely mark an
    // unrelated building's node as part of a parent line.
    parentRefs.add(scopedKey(group, parentKey));
    childKeys.add(techTreeNodeKey(node));
  }

  for (const [age, nodes] of Object.entries(rawByAge || {})) {
    const set = new Set();
    for (const node of nodes || []) {
      const key = techTreeNodeKey(node);
      const group = chineseResolveNodeGroupFromNodes(node, nodes || []);
      const placementKeys = techTreeNodePlacementKeys(node);
      const isParentInLine = placementKeys.some((placementKey) => parentRefs.has(scopedKey(group, placementKey)));
      const isChildInLine = childKeys.has(key);
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      if (isParentInLine || isChildInLine || isSharedColumnException) {
        set.add(key);
        global.add(key);
      }
    }
    byAge[age] = set;
  }
  return { byAge, global };
}

function chineseBuildProtectedLineColumnsForNodes(nodesForAge, lineMemberKeys = null) {
  const grouped = new Map();
  for (const node of nodesForAge || []) {
    if (!node || !node.name) continue;
    const group = chineseResolveNodeGroupFromNodes(node, nodesForAge || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }

  const out = {};
  for (const [group, groupNodes] of grouped.entries()) {
    const activeColumns = new Set();
    for (const node of groupNodes) {
      const fixed = chineseFixedLocalX(node, group);
      if (!Number.isFinite(Number(fixed))) continue;
      const localX = Number(fixed);
      const isLineMember = lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      // Protect only actual active parent-line columns in this age. A column is
      // protected when a node in this age is part of a parent/child line, even
      // when the rest of that line appears in a different age. This keeps
      // multi-age lines aligned without reserving dead columns in ages where
      // the line has no node.
      if (isLineMember || isSharedColumnException) activeColumns.add(localX);
    }
    if (activeColumns.size) out[group] = activeColumns;
  }
  return out;
}

function chineseBuildGlobalProtectedLineColumns(rawByAge) {
  const allNodes = Object.values(rawByAge || {}).flat();
  return chineseBuildProtectedLineColumnsForNodes(allNodes, chineseBuildLineMemberKeySets({ All: allNodes }).byAge.All);
}

function buildChineseTechTreeGroupStarts(config) {
  if (config?.baseCulture !== "Chinese") return null;
  const rawByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    rawByAge[age] = chineseRawTechTreeNodesForAge(age, config);
  }
  const lineKeySets = chineseBuildLineMemberKeySets(rawByAge);
  config._chineseTechTreeLineMemberKeysByAge = lineKeySets.byAge;
  config._chineseTechTreeLineMemberKeys = lineKeySets.global;

  const protectedColumnsByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    protectedColumnsByAge[age] = chineseBuildProtectedLineColumnsForNodes(rawByAge[age], lineKeySets.byAge[age]);
  }
  config._chineseTechTreeProtectedColumnsByAge = protectedColumnsByAge;
  config._chineseTechTreeProtectedColumns = protectedColumnsByAge.ArchaicAge || {};

  const maxWidths = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    const widths = chineseMeasureGroupWidths(rawByAge[age], protectedColumnsByAge[age], age, lineKeySets.byAge[age]);
    for (const [group, width] of Object.entries(widths)) maxWidths[group] = Math.max(maxWidths[group] || 0, width);
  }

  const starts = {};
  let nextX = 0;
  for (const group of CHINESE_TECHTREE_GROUP_ORDER) {
    starts[group] = nextX;
    nextX += Math.max(maxWidths[group] || 0, 0);
  }
  return starts;
}

function generateChineseDynamicTechTreeTechnologies(age, config) {
  if (config?.baseCulture !== "Chinese") return "";
  const nodes = chineseRawTechTreeNodesForAge(age, config);
  const protectedColumns = config?._chineseTechTreeProtectedColumnsByAge?.[age] || config?._chineseTechTreeProtectedColumns || null;
  const lineMemberKeys = config?._chineseTechTreeLineMemberKeysByAge?.[age] || config?._chineseTechTreeLineMemberKeys || null;
  const normalized = chineseNormalizeTechTreeNodes(age, nodes, config?._chineseTechTreeGroupStarts || null, protectedColumns, lineMemberKeys);
  const body = normalized.map((node) => buildTechTreeNodeXml(node)).join("\n");
  const block = `<local:TechTreeAge.Technologies>
${body}
            </local:TechTreeAge.Technologies>`;
  return applyCustomTechNamesToUiBlock(block, config || {});
}






const JAPANESE_TECHTREE_MAJOR_SOURCES = ["Amaterasu", "Susanoo", "Tsukuyomi"];
const JAPANESE_TECHTREE_MINOR_BY_AGE = {
  ClassicalAge: ["ClassicalAgeAmeNoUzume", "ClassicalAgeInariOkami", "ClassicalAgeMinakatatomi"],
  HeroicAge: ["HeroicAgeFujin", "HeroicAgeHachiman", "HeroicAgeRaijin"],
  MythicAge: ["MythicAgeOkuninushi", "MythicAgeTakemikazuchi", "MythicAgeWatatsumi"],
};

const JAPANESE_TECHTREE_GROUP_ORDER = [
  "TownCenter", "Watermill", "MiningCampJapanese", "Farm", "House", "WallConnector", "Dock", "Temple", "SkyPassage",
  "ShrineJapanese", "SentryTower", "Armory", "Market", "Guardhouse", "Dojo", "StableJapanese", "Castle", "Wonder",
];

const JAPANESE_TECHTREE_PARENT_LANE = {
  TownCenter: "TownCenter",
  VillagerJapanese: "TownCenter", Miko: "TownCenter", Masons: "TownCenter", Architects: "TownCenter", FortifiedTownCenter: "TownCenter",
  SecretsOfTheTitans: "TownCenter", TitanGate: "TownCenter", DivinePrefecture: "TownCenter",

  Watermill: "Watermill", Husbandry: "Watermill", HuntingEquipment: "Watermill", SaltwaterSpring: "Watermill",
  Plow: "Watermill", Irrigation: "Watermill", FloodControl: "Watermill", HandAxe: "Watermill", BowSaw: "Watermill", Carpenters: "Watermill",

  MiningCampJapanese: "MiningCampJapanese", Pickaxe: "MiningCampJapanese", ShaftMine: "MiningCampJapanese", Quarry: "MiningCampJapanese",
  Farm: "Farm", House: "House",

  WallConnector: "WallConnector", StoneWall: "WallConnector", FortifiedWall: "WallConnector", BronzeWall: "WallConnector", IronWall: "WallConnector",

  Dock: "Dock", FishingShipJapanese: "Dock", PurseSeine: "Dock", FishBasket: "Dock", SaltAmphora: "Dock",
  Wasen: "Dock", RammingWasen: "Dock", Junkozosen: "Dock", TransportShipJapanese: "Dock", EnclosedDeck: "Dock",
  HeroicFleet: "Dock", Honengyo: "Dock", Umibozu: "Dock", DanNoUraTactics: "Dock", HeavenlyBarrage: "Dock",
  HeavyWarships: "Dock", ChampionWarships: "Dock", ConscriptSailors: "Dock",

  Temple: "Temple", Kitsune: "Temple", Kamaitachi: "Temple", Wanyudo: "Temple", Jorogumo: "Temple",
  Tengu: "Temple", Raiju: "Temple", Oni: "Temple", Shinigami: "Temple", Asura: "Temple", Onmoraki: "Temple",
  WindSickles: "Temple", CondemnedSoul: "Temple", DeadlySnare: "Temple", WisdomOfNine: "Temple", IvoryNetsuke: "Temple",
  AsceticPractices: "Temple", ThunderousPresence: "Temple", DeadlyRage: "Temple", OniMask: "Temple", DenDenDrums: "Temple",
  EternalHaunting: "Temple", BurningMalevolence: "Temple", RestlessArmy: "Temple", Omniscience: "Temple", CrushingWaves: "Temple", NezhaChild: "Temple", NezhaYouth: "Temple", Nezha: "Temple",

  SkyPassage: "SkyPassage",
  ShrineJapanese: "ShrineJapanese", SacredCustodians: "ShrineJapanese", Kagura: "ShrineJapanese", GoheiWands: "ShrineJapanese", SakuraGardens: "ShrineJapanese",

  SentryTower: "SentryTower", SignalFires: "SentryTower", WatchTower: "SentryTower", Crenellations: "SentryTower", CarrierPigeons: "SentryTower", GuardTower: "SentryTower", BoilingOil: "SentryTower", Tenshu: "SentryTower",

  Armory: "Armory", DwarvenArmory: "Armory", Ballistics: "Armory", BurningPitch: "Armory",
  CopperWeapons: "Armory", BronzeWeapons: "Armory", IronWeapons: "Armory", DwarvenWeapons: "Armory",
  CopperArmor: "Armory", BronzeArmor: "Armory", IronArmor: "Armory", MeteoricIronArmor: "Armory",
  CopperShields: "Armory", BronzeShields: "Armory", IronShields: "Armory", DragonscaleShields: "Armory",
  GoldenKite: "Armory", HuntersStrength: "Armory",

  Market: "Market", CaravanJapanese: "Market", Coinage: "Market", TaxCollectors: "Market", Ambassadors: "Market",

  Guardhouse: "Guardhouse", YariSpearman: "Guardhouse", YumiArcher: "Guardhouse", Bushi: "Guardhouse",
  MediumGuardhouseSoldiers: "Guardhouse", HeavyGuardhouseSoldiers: "Guardhouse", ChampionGuardhouseSoldiers: "Guardhouse",
  LevyGuardhouseSoldiers: "Guardhouse", ConscriptGuardhouseSoldiers: "Guardhouse",
  Kumiki: "Guardhouse", Katagi: "Guardhouse", HannyaMask: "Guardhouse", Sojutsu: "Guardhouse", SumoTraining: "Guardhouse",

  Dojo: "Dojo", Samurai: "Dojo", OnnaMusha: "Dojo", Shinobi: "Dojo",
  MediumDojoSoldiers: "Dojo", HeavyDojoSoldiers: "Dojo", ChampionDojoSoldiers: "Dojo", EliteDojoSoldiers: "Dojo",
  LevyDojoSoldiers: "Dojo", ConscriptDojoSoldiers: "Dojo", TenFistSword: "Dojo", SeasideInfiltrators: "Dojo",

  StableJapanese: "StableJapanese", NaginataRider: "StableJapanese", YumiHorseArcher: "StableJapanese", Daimyo: "StableJapanese",
  MediumStableSoldiers: "StableJapanese", HeavyStableSoldiers: "StableJapanese", ChampionStableSoldiers: "StableJapanese",
  LevyStableSoldiers: "StableJapanese", ConscriptStableSoldiers: "StableJapanese", SashimonoBannermen: "StableJapanese", GalesFury: "StableJapanese", AsymmetricalBows: "StableJapanese",

  Castle: "Castle", Oyumi: "Castle", Onmyoji: "Castle", DraftHorses: "Castle", EightBanners: "Castle", Engineers: "Castle", AdvancedFortifications: "Castle", MechanicalArtisans: "Castle", Onmyodo: "Castle",
  Wonder: "Wonder",
};

const JAPANESE_TECHTREE_AMBIGUOUS_PARENT_NAMES = new Set([
  "GoldenKite", "HuntersStrength", "Katagi", "HannyaMask", "Kumiki", "SumoTraining", "Tenshu",
  "MediumGuardhouseSoldiers", "HeavyGuardhouseSoldiers", "ChampionGuardhouseSoldiers",
  "MediumDojoSoldiers", "HeavyDojoSoldiers", "ChampionDojoSoldiers", "EliteDojoSoldiers",
  "MediumStableSoldiers", "HeavyStableSoldiers", "ChampionStableSoldiers"
]);

function japaneseCanUseStaticParentLane(name) {
  return !!name && !JAPANESE_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(name) && !!JAPANESE_TECHTREE_PARENT_LANE[name];
}

function japaneseGroupFromUniqueReference(ref) {
  const value = String(ref || "");
  if (!value) return "";
  return JAPANESE_TECHTREE_GROUP_ORDER.find((group) => value.startsWith(group)) || "";
}

function japaneseGroupFromAmbiguousParentReference(parent, node) {
  if (!parent || node?.uniqueParent || !JAPANESE_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(parent)) return "";
  const marker = String(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (["MediumGuardhouseSoldiers", "HeavyGuardhouseSoldiers", "ChampionGuardhouseSoldiers"].includes(parent)) return "Guardhouse";
  if (["MediumDojoSoldiers", "HeavyDojoSoldiers", "ChampionDojoSoldiers", "EliteDojoSoldiers"].includes(parent)) return "Dojo";
  if (["MediumStableSoldiers", "HeavyStableSoldiers", "ChampionStableSoldiers"].includes(parent)) return "StableJapanese";
  if (parent === "GoldenKite" || parent === "HuntersStrength") return marker.startsWith("Guardhouse") ? "Guardhouse" : "Armory";
  if (parent === "Katagi" || parent === "HannyaMask" || parent === "SumoTraining") return marker.startsWith("Dojo") ? "Dojo" : "Guardhouse";
  if (parent === "Kumiki") return marker.startsWith("Castle") || node?.parent === "Castle" ? "Castle" : "Guardhouse";
  if (parent === "Tenshu") return marker.startsWith("Castle") || node?.parent === "Castle" ? "Castle" : "SentryTower";
  return "";
}

function japaneseChooseParentNodeForChain(current, node, candidates) {
  const list = (candidates || []).filter(Boolean);
  if (!list.length) return null;
  if (node?.uniqueParent) {
    const exact = list.find((candidate) => candidate?.uniqueIdentifier === node.uniqueParent);
    if (exact) return exact;
  }
  const nodeX = Number(node?.x);
  return list.slice().sort((a, b) => {
    const ax = Number(a.x) || 0;
    const bx = Number(b.x) || 0;
    const aDistance = Number.isFinite(nodeX) ? Math.abs(ax - nodeX) : ax;
    const bDistance = Number.isFinite(nodeX) ? Math.abs(bx - nodeX) : bx;
    const aAfterPenalty = Number.isFinite(nodeX) && ax > nodeX ? 1000 : 0;
    const bAfterPenalty = Number.isFinite(nodeX) && bx > nodeX ? 1000 : 0;
    return (aDistance + aAfterPenalty) - (bDistance + bAfterPenalty) || ax - bx || (Number(a.y) || 0) - (Number(b.y) || 0);
  })[0];
}

function japaneseNodeGroupRoot(node) {
  const parent = node?.parent || "";
  const name = node?.name || "";
  const uniqueGroup = japaneseGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = japaneseGroupFromAmbiguousParentReference(parent, node);
  if (ambiguousGroup) return ambiguousGroup;
  if (JAPANESE_TECHTREE_GROUP_ORDER.includes(parent)) return parent;
  if (japaneseCanUseStaticParentLane(parent)) return JAPANESE_TECHTREE_PARENT_LANE[parent];
  if (!parent && JAPANESE_TECHTREE_GROUP_ORDER.includes(name)) return name;
  if (japaneseCanUseStaticParentLane(name)) return JAPANESE_TECHTREE_PARENT_LANE[name];
  return parent || name;
}

function japaneseNodeGroupOrder(node) {
  const root = japaneseNodeGroupRoot(node);
  const idx = JAPANESE_TECHTREE_GROUP_ORDER.indexOf(root);
  return idx >= 0 ? idx : 99;
}

const JAPANESE_TECHTREE_FIXED_LOCAL_X = {
  VillagerJapanese: 1, Miko: 2, Masons: 1, Architects: 1, FortifiedTownCenter: 1, SecretsOfTheTitans: 1, TitanGate: 1, DivinePrefecture: 2,
  Husbandry: 1, HuntingEquipment: 1, SaltwaterSpring: 1, Plow: 2, Irrigation: 2, FloodControl: 2, HandAxe: 3, BowSaw: 3, Carpenters: 3,
  Pickaxe: 1, ShaftMine: 1, Quarry: 1,
  StoneWall: 0, FortifiedWall: 0, BronzeWall: 0, IronWall: 0,
  HeroicFleet: 1, Wasen: 2, DanNoUraTactics: 2, Honengyo: 2, Umibozu: 2,
  RammingWasen: 3, Junkozosen: 4, HeavenlyBarrage: 4, TransportShipJapanese: 5, EnclosedDeck: 5,
  FishingShipJapanese: 6, PurseSeine: 6, FishBasket: 6, SaltAmphora: 6, HeavyWarships: 4, ChampionWarships: 4, ConscriptSailors: 5,
  Omniscience: 0, Kitsune: 1, Kamaitachi: 1, WindSickles: 1, Wanyudo: 2, CondemnedSoul: 2, Jorogumo: 3, DeadlySnare: 3, WisdomOfNine: 1, IvoryNetsuke: 1, NezhaChild: 3, NezhaYouth: 3, Nezha: 3,
  Tengu: 1, AsceticPractices: 1, Raiju: 2, ThunderousPresence: 2, Oni: 3, DeadlyRage: 3, OniMask: 1, DenDenDrums: 2,
  Shinigami: 1, EternalHaunting: 1, Asura: 2, BurningMalevolence: 2, Onmoraki: 3, RestlessArmy: 3,
  SacredCustodians: 1, Kagura: 1, GoheiWands: 1, SakuraGardens: 1,
  SignalFires: 2, WatchTower: 1, GuardTower: 1, Crenellations: 1, BoilingOil: 1, CarrierPigeons: 2, Tenshu: 1,
  Ballistics: 1, BurningPitch: 1, CopperWeapons: 2, BronzeWeapons: 2, IronWeapons: 2, DwarvenWeapons: 2, CopperArmor: 3, BronzeArmor: 3, IronArmor: 3, MeteoricIronArmor: 3, CopperShields: 4, BronzeShields: 4, IronShields: 4, DragonscaleShields: 4, GoldenKite: 1, HuntersStrength: 1,
  CaravanJapanese: 1, Coinage: 1, TaxCollectors: 2, Ambassadors: 2,
  YariSpearman: 1, YumiArcher: 2, Bushi: 3, MediumGuardhouseSoldiers: 4, LevyGuardhouseSoldiers: 3, HeavyGuardhouseSoldiers: 4, ConscriptGuardhouseSoldiers: 3, ChampionGuardhouseSoldiers: 4, Kumiki: 2, Katagi: 3, HannyaMask: 1, Sojutsu: 1, SumoTraining: 2,
  Samurai: 1, Shinobi: 1, OnnaMusha: 2, MediumDojoSoldiers: 4, LevyDojoSoldiers: 3, HeavyDojoSoldiers: 4, ConscriptDojoSoldiers: 3, ChampionDojoSoldiers: 4, EliteDojoSoldiers: 4, TenFistSword: 2, SeasideInfiltrators: 1,
  NaginataRider: 1, YumiHorseArcher: 1, Daimyo: 2, MediumStableSoldiers: 4, LevyStableSoldiers: 3, HeavyStableSoldiers: 4, ConscriptStableSoldiers: 3, ChampionStableSoldiers: 4, SashimonoBannermen: 1, GalesFury: 1, AsymmetricalBows: 1,
  Oyumi: 1, Onmyoji: 1, DraftHorses: 1, Onmyodo: 1, Engineers: 2, AdvancedFortifications: 2, MechanicalArtisans: 3, EightBanners: 2,
};

function japaneseFixedLocalX(node, group) {
  const name = node?.name || "";
  if (group === "TownCenter" && /^SkinOfTheRhino/.test(name)) return 2;
  if (group === "SkyPassage" && name === "SkyPassage") return 0;
  if (group === "Armory") {
    const map = { Armory: 0, DwarvenArmory: 0, Ballistics: 1, BurningPitch: 1, CopperWeapons: 2, BronzeWeapons: 2, IronWeapons: 2, DwarvenWeapons: 2, CopperArmor: 3, BronzeArmor: 3, IronArmor: 3, MeteoricIronArmor: 3, CopperShields: 4, BronzeShields: 4, IronShields: 4, DragonscaleShields: 4, GoldenKite: 1, HuntersStrength: 1, CelestialWeapons: 1 };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "SentryTower") {
    const map = { SentryTower: 0, WatchTower: 1, Crenellations: 1, GuardTower: 1, BoilingOil: 1, SignalFires: 2, CarrierPigeons: 2, Tenshu: 1 };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "Castle") {
    const map = { Castle: 0, Oyumi: 1, Onmyoji: 1, DraftHorses: 1, Onmyodo: 1, Tenshu: 2, EightBanners: 2, Engineers: 2, AdvancedFortifications: 2, MechanicalArtisans: 3, Kumiki: 1 };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "TownCenter" && /^SkinOfTheRhino/.test(name)) return 2;
  if (group === "SkyPassage" && name === "SkyPassage") return 0;
  if (group === "Temple" && ["NezhaChild", "NezhaYouth", "Nezha"].includes(name)) return 3;
  if (group === "Armory") {
    const map = {
      Armory: 0, DwarvenArmory: 0, Ballistics: 1, BurningPitch: 1,
      CopperWeapons: 2, BronzeWeapons: 2, IronWeapons: 2, DwarvenWeapons: 2,
      CopperArmor: 3, BronzeArmor: 3, IronArmor: 3, MeteoricIronArmor: 3,
      CopperShields: 4, BronzeShields: 4, IronShields: 4, DragonscaleShields: 4,
      MasterOfWeaponry: 1, CelestialWeapons: 1, LeizusSilk: 1,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "MilitaryCamp") {
    const map = {
      MilitaryCamp: 0, DaoSwordsman: 1, DivineBooks: 1, GeHalberdier: 2, MasterOfWeaponry: 2,
      WuzuJavelineer: 3, MediumArchers: 3, HeavyArchers: 3, ChampionArchers: 3,
      MediumInfantry: 4, HeavyInfantry: 4, ChampionInfantry: 4,
      WhiteHorseCavalry: 5, HeavyCavalry: 5, ChampionCavalry: 5,
      FrenziedDash: 1, LeizusSilk: 1, XuanyuansBloodline: 1, ImperialOrder: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "MachineWorkshop") {
    const map = {
      MachineWorkshop: 0, DivineBooks: 1, FireArcher: 1, MediumArchers: 1, HeavyArchers: 1, ChampionArchers: 1,
      ChuKoNu: 2, ScorchingFeathers: 2, SiegeCrossbow: 3, DraftHorses: 3, AxeCart: 1,
      Engineers: 3, SouthernFire: 1, LeizusSilk: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "ImperialAcademy") {
    const map = {
      ImperialAcademy: 0, Sage: 1, JiangZiYa: 2, YangJian: 1, LiJing: 1, WenZhong: 1,
      NezhaChild: 2, NezhaYouth: 2, Nezha: 2, Pioneer: 3, DivineLight: 3, EastWind: 3, SkyFire: 3,
      CelestialWeapons: 1, TaiChi: 3, PeachOfImmortality: 4, HerbalMedicine: 3,
      TempestuousStorm: 1, ShakerOfHeaven: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "SentryTower") {
    const map = {
      SentryTower: 0,
      WatchTower: 1,
      Crenellations: 1,
      GuardTower: 1,
      BoilingOil: 1,
      CrossbowTower: 1,
      // Keep standalone tower techs out of the protected WatchTower line so
      // WatchTower -> GuardTower -> CrossbowTower can stay in one column.
      SignalFires: 2,
      CarrierPigeons: 2,
      AdvancedDefenses: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "Baolei") {
    const map = {
      Baolei: 0, TigerCavalry: 1, LastStand: 1, LevyBaoleiSoldiers: 2, ConscriptBaoleiSoldiers: 2,
      HeavyCavalry: 3, ChampionCavalry: 3, AdvancedDefenses: 1, AdvancedFortifications: 2,
    };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (Object.prototype.hasOwnProperty.call(JAPANESE_TECHTREE_FIXED_LOCAL_X, name)) return JAPANESE_TECHTREE_FIXED_LOCAL_X[name];
  return undefined;
}

const JAPANESE_TECHTREE_PROTECTED_LINE_LOCAL_X = {
  TownCenter: [1, 2],
  Watermill: [1, 2, 3],
  MiningCampJapanese: [1],
  WallConnector: [0],
  Dock: [1, 2, 3, 4, 5, 6, 7, 8],
  Temple: [0, 1, 2, 3],
  ShrineJapanese: [1],
  SentryTower: [0, 1],
  Armory: [1, 2, 3, 4],
  Market: [1, 2],
  Guardhouse: [1, 2, 3, 4],
  Dojo: [1, 2, 3, 4],
  StableJapanese: [1, 2, 3, 4],
  Castle: [1, 2, 3],
};

function japaneseProtectedLineColumns(group, groupNodes = null) {
  const candidateColumns = new Set(JAPANESE_TECHTREE_PROTECTED_LINE_LOCAL_X[group] || []);
  if (!Array.isArray(groupNodes)) return candidateColumns;
  const activeColumns = new Set();
  for (const node of groupNodes) {
    const fixed = japaneseFixedLocalX(node, group);
    if (!Number.isFinite(Number(fixed))) continue;
    const localX = Number(fixed);
    if (candidateColumns.has(localX)) activeColumns.add(localX);
  }
  return activeColumns;
}

function japaneseIsLaneRootParent(group, parent) {
  return parent === group
    || (group === "Armory" && parent === "DwarvenArmory")
    || (group === "TownCenter" && parent === "TownCenter")
    || (group === "Monument" && /^MonumentTo/.test(parent || ""));
}

function japaneseNextNonProtectedLocalX(group, minX, protectedColumns = null) {
  const columns = protectedColumns instanceof Set ? protectedColumns : japaneseProtectedLineColumns(group);
  for (let x = Math.max(0, Number(minX) || 0); x < 64; x += 1) {
    if (!columns.has(x)) return x;
  }
  return Math.max(0, Number(minX) || 0);
}

function japaneseTechTreeSourceNodes(age) {
  const templates = window.AOM_TECHTREE || {};
  const byMajor = {};
  for (const major of JAPANESE_TECHTREE_MAJOR_SOURCES) {
    const block = age === "ArchaicAge"
      ? extractXmlPropertyBlock(lookupTemplateBlock(templates.archaicByMajor, major) || "", "Technologies")
      : templates.ageTechnologiesByMajorAge?.[`${major}|${age}`] || "";
    byMajor[major] = parseTechTreeNodesFromBlock(block);
  }
  return byMajor;
}

function japaneseCanonicalMinorTech(tech) {
  const aliases = { ClassicalAgeAmenouzume: "ClassicalAgeAmeNoUzume", ClassicalAgeAmeNoUzume: "ClassicalAgeAmeNoUzume" };
  return aliases[tech] || tech;
}

function japaneseMinorBonusTokens(minorTech) {
  const canonical = japaneseCanonicalMinorTech(canonicalMinorTech(minorTech));
  const block = window.AOM_TECHTREE?.bonusTrackByGod?.[canonical] || "";
  return parseTechTreeNodesFromBlock(block).filter((node) => node.type === "Unit" || node.type === "Tech");
}

function japaneseAllConditionalNodeNames() {
  const names = new Set();
  (UNIQUE_TECH_GROUPS || []).forEach((group) => {
    names.add(group.id);
    (group.techs || []).forEach((tech) => names.add(tech));
  });
  Object.values(JAPANESE_TECHTREE_MINOR_BY_AGE).flat().forEach((minor) => {
    japaneseMinorBonusTokens(minor).forEach((node) => names.add(node.name));
  });
  return names;
}

function japaneseCommonNodesForAge(age) {
  const byMajor = japaneseTechTreeSourceNodes(age);
  const excluded = japaneseAllConditionalNodeNames();
  const keySets = Object.fromEntries(Object.entries(byMajor).map(([major, nodes]) => [major, new Set(nodes.map(techTreeNodeKey))]));
  const baseSource = JAPANESE_TECHTREE_MAJOR_SOURCES[0];
  const allKeys = [...(keySets[baseSource] || new Set())];
  const commonKeys = allKeys.filter((key) => JAPANESE_TECHTREE_MAJOR_SOURCES.every((major) => keySets[major]?.has(key)));
  const sourceNodes = Object.values(byMajor).flat();
  const result = [];
  for (const key of commonKeys) {
    const matches = sourceNodes.filter((node) => techTreeNodeKey(node) === key);
    const rep = chooseGreekRepresentativeNode(matches);
    if (!rep || excluded.has(rep.name)) continue;
    result.push({ ...rep });
  }
  return result;
}

function japaneseFindRightSideNodesForToken(age, tokenNode) {
  const byMajor = japaneseTechTreeSourceNodes(age);
  const matches = Object.values(byMajor).flat().filter((node) => node.type === tokenNode.type && node.name === tokenNode.name);
  if (!matches.length) return [];
  const byKey = new Map();
  for (const node of matches) {
    const key = techTreeNodeKey(node);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(node);
  }
  const reps = [...byKey.values()].map((nodes) => ({ count: nodes.length, node: chooseGreekRepresentativeNode(nodes) }));
  reps.sort((a, b) => japaneseNodeGroupOrder(a.node) - japaneseNodeGroupOrder(b.node) || (a.node.x - b.node.x) || (a.node.y - b.node.y) || String(a.node.parent).localeCompare(String(b.node.parent)) || (b.count - a.count));
  return reps.map((entry) => ({ ...entry.node }));
}

function japaneseMinorNodeSameBuildingKey(node, contextNodes = []) {
  if (!node?.type || !node?.name) return "";
  const group = japaneseResolveNodeGroupFromNodes(node, contextNodes && contextNodes.length ? contextNodes : [node]);
  return `${node.type}|${node.name}|${group}`;
}

function japanesePriorSelectedMinorBuildingKeys(age, config) {
  const out = new Set();
  const order = ["ClassicalAge", "HeroicAge", "MythicAge"];
  const index = order.indexOf(age);
  if (index <= 0) return out;
  for (const priorAge of order.slice(0, index)) {
    const selected = (config.minorGods?.[priorAge] || []).map(canonicalMinorTech);
    const priorNodes = [];
    for (const minor of selected) {
      for (const token of japaneseMinorBonusTokens(minor)) {
        priorNodes.push(...japaneseFindRightSideNodesForToken(priorAge, token));
      }
    }
    for (const node of priorNodes) {
      const key = japaneseMinorNodeSameBuildingKey(node, priorNodes);
      if (key) out.add(key);
    }
  }
  return out;
}

function japaneseSelectedMinorNodesForAge(age, config) {
  const selected = (config.minorGods?.[age] || []).map((tech) => japaneseCanonicalMinorTech(canonicalMinorTech(tech)));
  const nodes = [];
  const seenSameBuilding = japanesePriorSelectedMinorBuildingKeys(age, config);
  for (const minor of selected) {
    for (const token of japaneseMinorBonusTokens(minor)) {
      for (const candidate of japaneseFindRightSideNodesForToken(age, token)) {
        const key = japaneseMinorNodeSameBuildingKey(candidate, [...nodes, candidate]);
        if (key && seenSameBuilding.has(key)) continue;
        nodes.push(candidate);
        if (key) seenSameBuilding.add(key);
      }
    }
  }
  return nodes;
}

function japaneseResolveNodeGroupFromNodes(node, allNodes) {
  const byName = new Map();
  const byUniqueIdentifier = new Map();
  for (const candidate of allNodes || []) {
    if (!candidate?.name) continue;
    if (!byName.has(candidate.name)) byName.set(candidate.name, []);
    byName.get(candidate.name).push(candidate);
    if (candidate.uniqueIdentifier) byUniqueIdentifier.set(candidate.uniqueIdentifier, candidate);
  }
  const uniqueGroup = japaneseGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = japaneseGroupFromAmbiguousParentReference(node?.parent || "", node);
  if (ambiguousGroup) return ambiguousGroup;
  const seen = new Set();
  let current = node?.uniqueParent || node?.parent || node?.name || "";
  let walkerNode = node;
  for (let i = 0; i < 16 && current && !seen.has(current); i += 1) {
    seen.add(current);
    if (JAPANESE_TECHTREE_GROUP_ORDER.includes(current)) return current;
    if (japaneseCanUseStaticParentLane(current)) return JAPANESE_TECHTREE_PARENT_LANE[current];
    let parentNode = byUniqueIdentifier.get(current) || null;
    if (!parentNode) parentNode = japaneseChooseParentNodeForChain(current, walkerNode, byName.get(current) || []);
    if (parentNode?.uniqueParent || parentNode?.parent) {
      walkerNode = parentNode;
      current = parentNode.uniqueParent || parentNode.parent;
      continue;
    }
    if (parentNode?.name && parentNode.name !== current) {
      walkerNode = parentNode;
      current = parentNode.name;
      continue;
    }
    break;
  }
  if (japaneseCanUseStaticParentLane(node?.name)) return JAPANESE_TECHTREE_PARENT_LANE[node.name];
  return japaneseNodeGroupRoot(node);
}

function japaneseCompactGroupNodes(group, groupNodes, groupStartX = 0, protectedColumnsOverride = null, age = "", lineMemberKeys = null) {
  const nodes = (groupNodes || []).map((inputNode) => {
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    return node;
  });

  const isGroupRootNode = (node) => !node?.parent && (node?.name === group || (group === "Armory" && node?.name === "DwarvenArmory") || (group === "Monument" && /^MonumentTo/.test(node?.name || "")));
  const hasRoot = nodes.some((node) => isGroupRootNode(node));
  const preSortDirectChildCountByName = new Map();
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    preSortDirectChildCountByName.set(parentKey, (preSortDirectChildCountByName.get(parentKey) || 0) + 1);
  }
  const nodeHasPreSortDirectChildren = (node) => (preSortDirectChildCountByName.get(node?.uniqueIdentifier || node?.name) || 0) > 0;
  const sourceOrder = (node) => (Number(node.x) || 0) * 10 + (Number(node.y) || 0);
  const sorted = nodes.slice().sort((a, b) => {
    const aIsRoot = isGroupRootNode(a);
    const bIsRoot = isGroupRootNode(b);
    if (aIsRoot !== bIsRoot) return aIsRoot ? -1 : 1;
    if (a.name === b.parent && b.name !== a.parent) return -1;
    if (b.name === a.parent && a.name !== b.parent) return 1;
    const aRootChild = japaneseIsLaneRootParent(group, a.parent) && !nodeHasPreSortDirectChildren(a);
    const bRootChild = japaneseIsLaneRootParent(group, b.parent) && !nodeHasPreSortDirectChildren(b);
    if (aRootChild && bRootChild && a.type !== b.type) {
      // For direct childless nodes in a building lane, place units before
      // childless techs. This lets units claim row 0 when the parent building
      // was introduced in an earlier age, while the techs fall to row 1.
      // The actual X column still comes from fixed/parent placement rules.
      if (a.type === "Unit") return -1;
      if (b.type === "Unit") return 1;
    }
    const af = japaneseFixedLocalX(a, group);
    const bf = japaneseFixedLocalX(b, group);
    if (Number.isFinite(Number(af)) !== Number.isFinite(Number(bf))) return Number.isFinite(Number(af)) ? -1 : 1;
    if (Number.isFinite(Number(af)) && af !== bf) return af - bf;
    return sourceOrder(a) - sourceOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name) || String(a.parent).localeCompare(String(b.parent));
  });

  const localOccupied = new Set();
  const placedLocalByName = new Map();
  const placedRowByName = new Map();
  const placed = [];
  const protectedLineColumns = protectedColumnsOverride instanceof Set ? protectedColumnsOverride : japaneseProtectedLineColumns(group, nodes);
  const isLineMemberNode = (node) => lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
  const directChildCountByName = new Map();
  const directChildFixedLocalXByName = new Map();
  const rootDirectChildTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildWithChildrenTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypesByLocalX = new Map();
  const isLaneRootParent = (parent) => japaneseIsLaneRootParent(group, parent);
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    directChildCountByName.set(parentKey, (directChildCountByName.get(parentKey) || 0) + 1);
    const childFixed = japaneseFixedLocalX(child, group);
    if (Number.isFinite(Number(childFixed))) {
      const current = directChildFixedLocalXByName.get(parentKey);
      const childFixedX = Number(childFixed);
      if (!Number.isFinite(Number(current)) || childFixedX < Number(current)) {
        directChildFixedLocalXByName.set(parentKey, childFixedX);
      }
    }
  }
  for (const child of nodes) {
    if (!child || !isLaneRootParent(child.parent)) continue;
    if (child.type === "Unit" || child.type === "Tech") {
      rootDirectChildTypeCounts[child.type] += 1;
      const childKey = child.uniqueIdentifier || child.name;
      if (directChildCountByName.get(childKey) || 0) {
        rootDirectChildWithChildrenTypeCounts[child.type] += 1;
      } else {
        rootDirectChildlessTypeCounts[child.type] += 1;
        const fixedLocal = japaneseFixedLocalX(child, group);
        const localX = Number.isFinite(Number(fixedLocal)) ? Number(fixedLocal) : undefined;
        if (Number.isFinite(localX)) {
          if (!rootDirectChildlessTypesByLocalX.has(localX)) rootDirectChildlessTypesByLocalX.set(localX, new Set());
          rootDirectChildlessTypesByLocalX.get(localX).add(child.type);
        }
      }
    }
  }

  const canUse = (x, y, allowProtectedLineColumn = true) => {
    if (localOccupied.has(`${x},${y}`)) return false;
    if (!allowProtectedLineColumn && protectedLineColumns.has(x)) return false;
    return true;
  };
  const reserve = (node, localX, y) => {
    localOccupied.add(`${localX},${y}`);
    for (const placementKey of techTreeNodePlacementKeys(node)) {
      if (!placedLocalByName.has(placementKey) || localX < placedLocalByName.get(placementKey)) {
        placedLocalByName.set(placementKey, localX);
        placedRowByName.set(placementKey, y);
      }
    }
    const cleanNode = { ...node };
    delete cleanNode._group;
    placed.push({ ...cleanNode, x: groupStartX + localX, y, position: `${groupStartX + localX},${y}` });
  };
  const firstFree = (minX, preferredY = 0, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) if (canUse(x, y, allowProtectedLineColumn)) return { x, y };
    }
    return { x: Math.max(0, minX || 0), y: preferredY === 1 ? 1 : 0 };
  };
  const firstFreeParentColumn = (minX, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn) && canUse(x, 1, allowProtectedLineColumn)) return { x, y: 0 };
    }
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn)) return { x, y: 0 };
    }
    return firstFree(minX, 0, allowProtectedLineColumn);
  };

  for (const node of techTreeParentDepthFirstOrder(sorted, isGroupRootNode)) {
    const isRoot = isGroupRootNode(node);
    if (isRoot) {
      const fixed = japaneseFixedLocalX(node, group);
      const x = Number.isFinite(Number(fixed)) ? Number(fixed) : 0;
      const y = 0;
      if (!canUse(x, y, true)) {
        const alt = firstFree(x, y, true);
        reserve(node, alt.x, alt.y);
      } else {
        reserve(node, x, y);
      }
      continue;
    }

    const fixed = japaneseFixedLocalX(node, group);
    const parentLookupKey = techTreeNodeParentLookupKey(node);
    const parentLocal = placedLocalByName.get(parentLookupKey);
    const parentRow = placedRowByName.get(parentLookupKey);
    const childFixedLocal = directChildFixedLocalXByName.get(node.uniqueIdentifier || node.name);
    const parentFixedLocalRaw = parentLookupKey ? japaneseFixedLocalX({ type: "Unit", name: parentLookupKey, parent: group }, group) : undefined;
    const parentFixedLocal = Number.isFinite(Number(parentFixedLocalRaw)) ? Number(parentFixedLocalRaw) : undefined;
    let desiredX;
    let preferredY = Number(node.y) === 0 ? 0 : 1;

    if (Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent)) {
      // Parent-line rule: once a parent is placed, every direct child follows
      // the parent's actual column. Fixed local X values are only preferred
      // before the parent is placed; they must not break the visible line if
      // the parent had to move to a cleaner/available column.
      desiredX = Number(parentLocal);
      if (Number.isFinite(Number(parentRow))) preferredY = Number(parentRow) === 0 ? 1 : 0;
    } else if (Number.isFinite(Number(parentFixedLocal)) && !isLaneRootParent(node.parent)) {
      // Multi-age parent-line rule: if the visible parent belongs to this
      // building lane but is placed in another age, still use the parent's
      // canonical local column. This keeps lines such as DouJian -> Maelstrom
      // and CaravanJapanese -> Coinage aligned even when only the child appears
      // in the current age.
      desiredX = Number(parentFixedLocal);
      preferredY = node.type === "Tech" ? 1 : preferredY;
    } else if (Number.isFinite(Number(fixed))) {
      desiredX = Number(fixed);
    } else if (Number.isFinite(Number(childFixedLocal))) {
      // Generic parent-line rule: if a direct child is part of a fixed upgrade
      // line, place the parent in that same column first. Example: Anubite
      // inherits FeetOfTheJackal's column, so the pair forms a clean vertical
      // parent line instead of the child occupying the protected column alone.
      desiredX = Number(childFixedLocal);
    } else {
      desiredX = 1;
    }

    const hasDirectChildren = (directChildCountByName.get(node.uniqueIdentifier || node.name) || 0) > 0;
    const directFromRootBuilding = hasRoot && isLaneRootParent(node.parent);
    const rootHasChildlessUnitAndTech = rootDirectChildlessTypeCounts.Unit > 0 && rootDirectChildlessTypeCounts.Tech > 0;
    const rootChildlessTypesAtDesiredX = rootDirectChildlessTypesByLocalX.get(Number(desiredX)) || new Set();
    const rootColumnHasChildlessUnitAndTech = rootChildlessTypesAtDesiredX.has("Unit") && rootChildlessTypesAtDesiredX.has("Tech");
    const rootHasOnlyChildlessUnits = directFromRootBuilding
      && !hasDirectChildren
      && node.type === "Unit"
      && !isLineMemberNode(node)
      && rootDirectChildlessTypeCounts.Unit > 0
      && rootDirectChildlessTypeCounts.Tech === 0
      && rootDirectChildWithChildrenTypeCounts.Unit === 0
      && rootDirectChildWithChildrenTypeCounts.Tech === 0;
    if (rootHasOnlyChildlessUnits) {
      // When a building appears in the current age and only trains units from
      // its root command row, keep those units together on row 1 and pack them
      // compactly from the first available column. This avoids gaps like an
      // empty TownCenter column 1/2 while all trained units are shifted right.
      desiredX = 1;
      preferredY = 1;
    } else if (directFromRootBuilding && !hasDirectChildren) {
      // Direct children of a building that appears in this age should keep the
      // building row clean. Childless units prefer row 1 unless a childless tech
      // also wants that exact column; only then use the classic unit row 0 /
      // tech row 1 split. This keeps Longhouse units together on row 1 while
      // still handling HillFort columns that contain both a unit and a tech.
      if (node.type === "Unit") preferredY = rootColumnHasChildlessUnitAndTech ? 0 : 1;
      if (node.type === "Tech") preferredY = 1;
    } else if (node.type === "Unit") {
      preferredY = 0;
    }
    if (age === "ArchaicAge" && !isRoot && node.type === "Unit" && !hasDirectChildren && !rootHasChildlessUnitAndTech && !localOccupied.has(`${desiredX},1`)) preferredY = 1;
    if (age === "ArchaicAge" && !isRoot && node.type !== "Unit" && !localOccupied.has(`${desiredX},1`)) preferredY = 1;

    if (!hasRoot && !isLaneRootParent(node.parent)) desiredX = Math.max(desiredX, 0);
    if (hasRoot || group === "TownCenter") desiredX = Math.max(desiredX, 1);

    const hasFixedLocalX = Number.isFinite(Number(fixed));
    const isChildOfPlacedChain = Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent) && Number(parentLocal) === Number(desiredX);
    const isParentOfFixedChildLine = Number.isFinite(Number(childFixedLocal)) && Number(childFixedLocal) === Number(desiredX);
    const isGlobalLineMember = isLineMemberNode(node);
    const isFixedLineNode = hasFixedLocalX && protectedLineColumns.has(Number(fixed)) && (isGlobalLineMember || !isLaneRootParent(node.parent) || hasDirectChildren || isParentOfFixedChildLine);
    const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
      || (group === "Temple" && node.name === "Omniscience");
    const allowProtectedLineColumn = rootHasOnlyChildlessUnits || isChildOfPlacedChain || isParentOfFixedChildLine || isFixedLineNode || isSharedColumnException;
    if (!allowProtectedLineColumn && protectedLineColumns.has(desiredX)) {
      desiredX = japaneseNextNonProtectedLocalX(group, desiredX + 1, protectedLineColumns);
    }

    let placedHere = false;
    if (rootHasOnlyChildlessUnits) {
      for (let x = Math.max(1, Number(desiredX) || 1); x < 64; x += 1) {
        if (canUse(x, 1, true)) {
          reserve(node, x, 1);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere && hasDirectChildren) {
      // If this node is itself a child in an already placed parent line, keep it
      // in the parent column first. This handles three-step lines such as
      // YaZi -> SonOfLoong -> RageOfSlaughter: the middle node should sit under
      // the unit parent before its own child pushes to a later free column.
      if (isChildOfPlacedChain && canUse(desiredX, preferredY, allowProtectedLineColumn)) {
        reserve(node, desiredX, preferredY);
        placedHere = true;
      }
      if (!placedHere) {
        // Any visible parent line, including tech upgrade chains, should reserve
        // a clean column first. This keeps chains such as CopperWeapons ->
        // BronzeWeapons and Valkyrie -> Disablot in one vertical line instead
        // of letting an unrelated node occupy the child row.
        const cleanColumn = firstFreeParentColumn(desiredX, allowProtectedLineColumn);
        reserve(node, cleanColumn.x, cleanColumn.y);
        placedHere = true;
      }
    }
    if (!placedHere) {
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) {
        if (canUse(desiredX, y, allowProtectedLineColumn)) {
          reserve(node, desiredX, y);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere) {
      const fallbackPreferredY = node.type === "Tech" ? 1 : preferredY;
      const alt = firstFree(desiredX + 1, fallbackPreferredY, allowProtectedLineColumn);
      reserve(node, alt.x, alt.y);
    }
  }

  // Final row cleanup: if a direct childless unit and a direct childless tech
  // from the same building lane ended up in the same column, keep the unit on
  // row 0 and the tech on row 1. This preserves the compact column while
  // keeping units visually prominent.
  const childlessRootNode = (node) => isLaneRootParent(node?.parent) && !(directChildCountByName.get(node?.uniqueIdentifier || node?.name) || 0);
  const byColumn = new Map();
  for (const node of placed) {
    if (!childlessRootNode(node)) continue;
    if (!byColumn.has(node.x)) byColumn.set(node.x, []);
    byColumn.get(node.x).push(node);
  }
  for (const columnNodes of byColumn.values()) {
    const unitRow1 = columnNodes.find((node) => node.type === "Unit" && Number(node.y) === 1);
    const techRow0 = columnNodes.find((node) => node.type === "Tech" && Number(node.y) === 0);
    if (unitRow1 && techRow0) {
      unitRow1.y = 0;
      unitRow1.position = `${unitRow1.x},0`;
      techRow0.y = 1;
      techRow0.position = `${techRow0.x},1`;
    }
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function japaneseNormalizeTechTreeNodes(age, nodes, forcedGroupStarts = null, protectedColumnsByGroup = null, lineMemberKeys = null) {
  const unique = new Map();
  for (const inputNode of nodes) {
    if (!inputNode || !inputNode.type || !inputNode.name) continue;
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    node.position = `${node.x},${node.y}`;
    const key = techTreeNodeKey(node);
    if (!unique.has(key)) unique.set(key, node);
  }

  const allNodes = [...unique.values()];
  const grouped = new Map();
  for (const node of allNodes) {
    const group = japaneseResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push({ ...node, _group: group });
  }

  const orderedGroups = [...grouped.entries()].sort(([groupA], [groupB]) => {
    const ai = JAPANESE_TECHTREE_GROUP_ORDER.indexOf(groupA);
    const bi = JAPANESE_TECHTREE_GROUP_ORDER.indexOf(groupB);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || String(groupA).localeCompare(String(groupB));
  });

  const placed = [];
  let nextGroupX = 0;
  for (const [group, groupNodes] of orderedGroups) {
    const forcedX = forcedGroupStarts && Number.isFinite(Number(forcedGroupStarts[group])) ? Number(forcedGroupStarts[group]) : undefined;
    const groupStartX = Number.isFinite(Number(forcedX)) ? Number(forcedX) : nextGroupX;
    const hasProtectionMap = protectedColumnsByGroup && typeof protectedColumnsByGroup === "object";
    const protectedColumns = hasProtectionMap ? (protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : new Set()) : null;
    const groupPlaced = japaneseCompactGroupNodes(group, groupNodes, groupStartX, protectedColumns, age, lineMemberKeys);
    placed.push(...groupPlaced);
    const width = groupPlaced.length ? Math.max(...groupPlaced.map((node) => Number(node.x) - groupStartX)) + 1 : 0;
    nextGroupX = groupStartX + Math.max(width, 0);
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || japaneseNodeGroupOrder(a) - japaneseNodeGroupOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function japaneseApplyThorDwarvenArmoryRightSide(nodes, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return nodes || [];
  return (nodes || []).map((inputNode) => {
    const node = { ...inputNode };
    if (node.type === "Unit" && node.name === "Armory") node.name = "DwarvenArmory";
    if (node.parent === "Armory") node.parent = "DwarvenArmory";
    return node;
  });
}


function japaneseBaseArmoryRightSideNodes(age, config) {
  const useDwarven = selectedHasThorDwarvenArmoryBonus(config);
  const armory = useDwarven ? "DwarvenArmory" : "Armory";
  const node = (type, name, parent, position) => {
    const [xRaw, yRaw] = String(position).split(",");
    return { type, name, parent: parent || "", position, x: Number(xRaw) || 0, y: Number(yRaw) || 0 };
  };
  if (useDwarven) {
    if (age === "ArchaicAge") {
      return [
        node("Unit", armory, "", "24,0"),
        node("Tech", "Ballistics", armory, "25,1"),
        node("Tech", "CopperWeapons", armory, "26,0"),
        node("Tech", "BronzeWeapons", "CopperWeapons", "26,1"),
        node("Tech", "CopperArmor", armory, "27,0"),
        node("Tech", "BronzeArmor", "CopperArmor", "27,1"),
        node("Tech", "CopperShields", armory, "28,0"),
        node("Tech", "BronzeShields", "CopperShields", "28,1"),
      ];
    }
    if (age === "ClassicalAge") {
      return [
        node("Tech", "BurningPitch", armory, "25,1"),
        node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
        node("Tech", "DwarvenWeapons", "IronWeapons", "26,1"),
        node("Tech", "IronArmor", "BronzeArmor", "27,0"),
        node("Tech", "MeteoricIronArmor", "IronArmor", "27,1"),
        node("Tech", "IronShields", "BronzeShields", "28,0"),
        node("Tech", "DragonscaleShields", "IronShields", "28,1"),
      ];
    }
    return [];
  }
  if (age === "ClassicalAge") {
    return [
      node("Unit", armory, "", "24,0"),
      node("Tech", "Ballistics", armory, "25,1"),
      node("Tech", "CopperWeapons", armory, "26,1"),
      node("Tech", "CopperArmor", armory, "27,1"),
      node("Tech", "CopperShields", armory, "28,1"),
    ];
  }
  if (age === "HeroicAge") {
    return [
      node("Tech", "BronzeWeapons", "CopperWeapons", "26,0"),
      node("Tech", "BronzeArmor", "CopperArmor", "27,0"),
      node("Tech", "BronzeShields", "CopperShields", "28,0"),
    ];
  }
  if (age === "MythicAge") {
    return [
      node("Tech", "BurningPitch", armory, "25,0"),
      node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
      node("Tech", "IronArmor", "BronzeArmor", "27,0"),
      node("Tech", "IronShields", "BronzeShields", "28,0"),
    ];
  }
  return [];
}

function japaneseThorDwarvenArmoryExtraRightSideNodes(age, config) {
  // Kept for compatibility; Japanese Dwarven Armory right-side nodes are built
  // by japaneseBaseArmoryRightSideNodes so the Armory/DwarvenArmory lane remains
  // complete and age-appropriate.
  return [];
}



function japaneseRawTechTreeNodesForAge(age, config) {
  let nodes = [
    ...japaneseCommonNodesForAge(age),
    ...japaneseSelectedMinorNodesForAge(age, config),
    ...japaneseThorDwarvenArmoryExtraRightSideNodes(age, config),
  ].filter(Boolean);
  if (age === "ArchaicAge") {
    const group = selectedUniqueTechGroup(config);
    const tech = selectedUniqueTechRightSideName(config, group);
    if (group && tech) {
      for (const spec of uniqueTechRightSideNodeSpecs(config, "", group)) {
        const [xRaw, yRaw] = String(spec.position || spec.preferred?.[0] || "18,1").split(",");
        nodes.push({
          type: "Tech",
          name: tech,
          parent: spec.parent,
          position: `${Number(xRaw) || 0},${Number(yRaw) || 1}`,
          x: Number(xRaw) || 0,
          y: Number(yRaw) || 1,
        });
      }
    }
  }
  nodes = applyGenericBonusRightSideNodes("Japanese", age, config, nodes);
  if (age === "MythicAge" && !nodes.some((node) => node?.type === "Tech" && node?.name === "Coinage")) {
    nodes.push(rightSideNode("Tech", "Coinage", "CaravanJapanese", "1,0"));
  }
  return japaneseApplyThorDwarvenArmoryRightSide(nodes, config);
}

function japaneseMeasureGroupWidths(nodes, protectedColumnsByGroup = null, age = "", lineMemberKeys = null) {
  const widths = {};
  const grouped = new Map();
  for (const node of nodes || []) {
    const group = japaneseResolveNodeGroupFromNodes(node, nodes || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }
  for (const [group, groupNodes] of grouped.entries()) {
    const hasProtectionMap = protectedColumnsByGroup && typeof protectedColumnsByGroup === "object";
    const protectedColumns = hasProtectionMap ? (protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : new Set()) : null;
    const placed = japaneseCompactGroupNodes(group, groupNodes, 0, protectedColumns, age, lineMemberKeys);
    widths[group] = placed.length ? Math.max(...placed.map((node) => Number(node.x) || 0)) + 1 : 0;
  }
  return widths;
}


function japaneseBuildLineMemberKeySets(rawByAge) {
  const byAge = {};
  const global = new Set();
  const allNodes = Object.values(rawByAge || {}).flat().filter(Boolean);
  const parentRefs = new Set();
  const childKeys = new Set();

  const scopedKey = (group, key) => `${group || ""}::${key || ""}`;

  for (const node of allNodes) {
    const parentKey = techTreeNodeParentLookupKey(node);
    if (!parentKey) continue;
    const group = japaneseResolveNodeGroupFromNodes(node, allNodes);
    if (japaneseIsLaneRootParent(group, parentKey)) continue;
    // Scope parent references by resolved building lane. Otherwise duplicate
    // Japanese names such as Berserk/Hersir/MediumInfantry can falsely mark an
    // unrelated building's node as part of a parent line.
    parentRefs.add(scopedKey(group, parentKey));
    childKeys.add(techTreeNodeKey(node));
  }

  for (const [age, nodes] of Object.entries(rawByAge || {})) {
    const set = new Set();
    for (const node of nodes || []) {
      const key = techTreeNodeKey(node);
      const group = japaneseResolveNodeGroupFromNodes(node, nodes || []);
      const placementKeys = techTreeNodePlacementKeys(node);
      const isParentInLine = placementKeys.some((placementKey) => parentRefs.has(scopedKey(group, placementKey)));
      const isChildInLine = childKeys.has(key);
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      if (isParentInLine || isChildInLine || isSharedColumnException) {
        set.add(key);
        global.add(key);
      }
    }
    byAge[age] = set;
  }
  return { byAge, global };
}

function japaneseBuildProtectedLineColumnsForNodes(nodesForAge, lineMemberKeys = null) {
  const grouped = new Map();
  for (const node of nodesForAge || []) {
    if (!node || !node.name) continue;
    const group = japaneseResolveNodeGroupFromNodes(node, nodesForAge || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }

  const out = {};
  for (const [group, groupNodes] of grouped.entries()) {
    const activeColumns = new Set();
    for (const node of groupNodes) {
      const fixed = japaneseFixedLocalX(node, group);
      if (!Number.isFinite(Number(fixed))) continue;
      const localX = Number(fixed);
      const isLineMember = lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      // Protect only actual active parent-line columns in this age. A column is
      // protected when a node in this age is part of a parent/child line, even
      // when the rest of that line appears in a different age. This keeps
      // multi-age lines aligned without reserving dead columns in ages where
      // the line has no node.
      if (isLineMember || isSharedColumnException) activeColumns.add(localX);
    }
    if (activeColumns.size) out[group] = activeColumns;
  }
  return out;
}

function japaneseBuildGlobalProtectedLineColumns(rawByAge) {
  const allNodes = Object.values(rawByAge || {}).flat();
  return japaneseBuildProtectedLineColumnsForNodes(allNodes, japaneseBuildLineMemberKeySets({ All: allNodes }).byAge.All);
}

function buildJapaneseTechTreeGroupStarts(config) {
  if (config?.baseCulture !== "Japanese") return null;
  const rawByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    rawByAge[age] = japaneseRawTechTreeNodesForAge(age, config);
  }
  const lineKeySets = japaneseBuildLineMemberKeySets(rawByAge);
  config._japaneseTechTreeLineMemberKeysByAge = lineKeySets.byAge;
  config._japaneseTechTreeLineMemberKeys = lineKeySets.global;

  const protectedColumnsByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    protectedColumnsByAge[age] = japaneseBuildProtectedLineColumnsForNodes(rawByAge[age], lineKeySets.byAge[age]);
  }
  config._japaneseTechTreeProtectedColumnsByAge = protectedColumnsByAge;
  config._japaneseTechTreeProtectedColumns = protectedColumnsByAge.ArchaicAge || {};

  const maxWidths = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    const widths = japaneseMeasureGroupWidths(rawByAge[age], protectedColumnsByAge[age], age, lineKeySets.byAge[age]);
    for (const [group, width] of Object.entries(widths)) maxWidths[group] = Math.max(maxWidths[group] || 0, width);
  }

  const starts = {};
  let nextX = 0;
  for (const group of JAPANESE_TECHTREE_GROUP_ORDER) {
    starts[group] = nextX;
    nextX += Math.max(maxWidths[group] || 0, 0);
  }
  return starts;
}

function generateJapaneseDynamicTechTreeTechnologies(age, config) {
  if (config?.baseCulture !== "Japanese") return "";
  const nodes = japaneseRawTechTreeNodesForAge(age, config);
  const protectedColumns = config?._japaneseTechTreeProtectedColumnsByAge?.[age] || config?._japaneseTechTreeProtectedColumns || null;
  const lineMemberKeys = config?._japaneseTechTreeLineMemberKeysByAge?.[age] || config?._japaneseTechTreeLineMemberKeys || null;
  const normalized = japaneseNormalizeTechTreeNodes(age, nodes, config?._japaneseTechTreeGroupStarts || null, protectedColumns, lineMemberKeys);
  const body = normalized.map((node) => buildTechTreeNodeXml(node)).join("\n");
  const block = `<local:TechTreeAge.Technologies>
${body}
            </local:TechTreeAge.Technologies>`;
  return applyCustomTechNamesToUiBlock(block, config || {});
}








const AZTEC_TECHTREE_MAJOR_SOURCES = ["Huitzilopochtli", "Quetzalcoatl", "Tezcatlipoca"];
const AZTEC_TECHTREE_MINOR_BY_AGE = {
  ClassicalAge: ["ClassicalAgeHuehuecoyotl", "ClassicalAgeMalinalxochitl", "ClassicalAgePatecatl"],
  HeroicAge: ["HeroicAgeCoatlicue", "HeroicAgeCoyolxauhqui", "HeroicAgeItzpapalotl"],
  MythicAge: ["MythicAgeMictlantecutli", "MythicAgeTlaloc", "MythicAgeXolotl"],
};

const AZTEC_TECHTREE_GROUP_ORDER = [
  "TownCenter", "Calpulli", "House", "Farm", "WallConnector", "Dock", "Temple", "SkyPassage",
  "TzompantliTowerTechTree", "Armory", "Market", "WarHut", "SmokeTrap", "SpikeTrap", "NoblesHut", "GreatTemple", "Wonder",
];

const AZTEC_TECHTREE_PARENT_LANE = {
  TownCenter: "TownCenter",
  VillagerAztec: "TownCenter", QuimichinSpy: "TownCenter", Masons: "TownCenter", Architects: "TownCenter", FortifiedTownCenter: "TownCenter", SerpentSkirt: "TownCenter", CoatepecShrines: "TownCenter",
  SecretsOfTheTitans: "TownCenter", TitanGate: "TownCenter",

  Calpulli: "Calpulli", CalpulliToLivestockPen: "Calpulli", CalpulliToLumberOutpost: "Calpulli", CalpulliToCraftWorkshop: "Calpulli",
  Husbandry: "Calpulli", HuntingEquipment: "Calpulli", MagueyCultivation: "Calpulli", Plow: "Calpulli", Chinampas: "Calpulli",
  HandAxe: "Calpulli", BowSaw: "Calpulli", Carpenters: "Calpulli", Pickaxe: "Calpulli", ShaftMine: "Calpulli", Quarry: "Calpulli", Tlaloques: "Calpulli", Tonacatepetl: "Calpulli",
  Farm: "Farm", House: "House",

  WallConnector: "WallConnector", StoneWall: "WallConnector", FortifiedWall: "WallConnector", BronzeWall: "WallConnector", IronWall: "WallConnector",

  Dock: "Dock", FishingShipAztec: "Dock", PurseSeine: "Dock", FishBasket: "Dock", SaltAmphora: "Dock",
  ArrowCanoe: "Dock", TepoztliCanoe: "Dock", AtlatlSiegeCanoe: "Dock", TransportShipAztec: "Dock", EnclosedDeck: "Dock", HeroicFleet: "Dock",
  Axolotl: "Dock", AxolotlMutant: "Dock", HeavyWarShips: "Dock", ChampionWarShips: "Dock", ConscriptSailors: "Dock", ShardsOfItztli: "Dock", CipactlisScales: "Dock", Metzliapan: "Dock",

  Temple: "Temple", WarriorPriest: "Temple", TeixiptlaHuitz: "Temple", TeixiptlaQuetz: "Temple", TeixiptlaTezca: "Temple",
  Chaneque: "Temple", OldCoyotesSpirit: "Temple", CentzonTotochtin: "Temple", OmetochtlisRevelry: "Temple", Maquizcoatl: "Temple", OmenOfMalinalco: "Temple", TeponaztliDrums: "Temple",
  Ayotochtli: "Temple", TecciztecatlsPenance: "Temple", Tzitzimitl: "Temple", CentzonHuitznahua: "Temple", ObsidianButterfly: "Temple", WingsOfItzpapalotl: "Temple", FloweryWars: "Temple",
  SoulGuide: "Temple", TorchOfMisfortune: "Temple", Ahuizotl: "Temple", Tunkuluchu: "Temple", NecklaceOfEyeballs: "Temple", OmenOfDeath: "Temple", Omniscience: "Temple", FeastOfTlaxochimaco: "Temple", NezhaChild: "Temple", NezhaYouth: "Temple", Nezha: "Temple",

  SkyPassage: "SkyPassage",

  TzompantliTowerTechTree: "TzompantliTowerTechTree", SignalFires: "TzompantliTowerTechTree", TzompantliWatchTower: "TzompantliTowerTechTree", CrenellationsAztec: "TzompantliTowerTechTree", CarrierPigeons: "TzompantliTowerTechTree", TemiminaloyanTrials: "TzompantliTowerTechTree", BurntWater: "TzompantliTowerTechTree",

  Armory: "Armory", DwarvenArmory: "Armory", Ballistics: "Armory", BurningPitch: "Armory", FlintWeapons: "Armory", JadeWeapons: "Armory", ObsidianWeapons: "Armory",
  FeatheredArmor: "Armory", CeremonialArmor: "Armory", SacredArmor: "Armory", FeatheredShields: "Armory", CeremonialShields: "Armory", SacredShields: "Armory", StringOfHearts: "Armory",
  CopperWeapons: "Armory", BronzeWeapons: "Armory", IronWeapons: "Armory", DwarvenWeapons: "Armory", CopperArmor: "Armory", BronzeArmor: "Armory", IronArmor: "Armory", MeteoricIronArmor: "Armory", CopperShields: "Armory", BronzeShields: "Armory", IronShields: "Armory", DragonscaleShields: "Armory",

  Market: "Market", CaravanAztec: "Market", TaxCollectors: "Market", Coinage: "Market", Ambassadors: "Market",

  WarHut: "WarHut", WingsOfTheSouth: "WarHut", Nahuallatolli: "WarHut", ToloacheTrance: "WarHut", StingOfYappan: "WarHut", TlamanihSpearman: "WarHut", TequihuaArcher: "WarHut", MediumWarHutSoldiers: "WarHut", LevyWarHutSoldiers: "WarHut", HeavyWarHutSoldiers: "WarHut", ConscriptWarHutSoldiers: "WarHut", ChampionWarHutSoldiers: "WarHut", AdvancedTraps: "WarHut", PreciousBones: "WarHut", OcpatliInfusions: "WarHut",
  SmokeTrap: "SmokeTrap", SpikeTrap: "SpikeTrap",

  NoblesHut: "NoblesHut", CoyoteWarrior: "NoblesHut", OcelotlWarrior: "NoblesHut", EagleWarrior: "NoblesHut", TepeyollotlsReach: "NoblesHut", CuicacalliTraining: "NoblesHut", ObsidianKnapping: "NoblesHut", MediumNoblesHutSoldiers: "NoblesHut", LevyNoblesHutSoldiers: "NoblesHut", HeavyNoblesHutSoldiers: "NoblesHut", ConscriptNoblesHutSoldiers: "NoblesHut", ChampionNoblesHutSoldiers: "NoblesHut", TwistedLimbs: "NoblesHut",

  GreatTemple: "GreatTemple", GreatTempleNewFireCeremony: "GreatTemple", GreatTempleCosmicGuard: "GreatTemple", GreatTempleArrivalOfTheGodsQuetzalcoatl: "GreatTemple", GreatTempleArrivalOfTheGodsHuitzilopochtli: "GreatTemple", GreatTempleArrivalOfTheGodsTezcatlipoca: "GreatTemple",
  AdvancedFortifications: "GreatTemple", CoyolxauhquiStone: "GreatTemple", Otontin: "GreatTemple", ShornOne: "GreatTemple", JaguarRider: "GreatTemple", Quinametzin: "GreatTemple", StoneskinQuinametzin: "GreatTemple", Mictecah: "GreatTemple", EveningStar: "GreatTemple", FourJars: "GreatTemple", LevyGreatTempleSoldiers: "GreatTemple", HeavyGreatTempleSoldiers: "GreatTemple", ConscriptGreatTempleSoldiers: "GreatTemple", ChampionGreatTempleSoldiers: "GreatTemple",

  Wonder: "Wonder",
};

const AZTEC_TECHTREE_AMBIGUOUS_PARENT_NAMES = new Set([
  "ToloacheTrance", "OcpatliInfusions", "MediumWarHutSoldiers", "HeavyWarHutSoldiers", "LevyWarHutSoldiers", "ConscriptWarHutSoldiers", "ChampionWarHutSoldiers",
  "MediumNoblesHutSoldiers", "HeavyNoblesHutSoldiers", "LevyNoblesHutSoldiers", "ConscriptNoblesHutSoldiers", "ChampionNoblesHutSoldiers",
  "CoyolxauhquiStone", "PreciousBones", "TepeyollotlsReach",
]);

function aztecCanUseStaticParentLane(name) {
  return !!name && !AZTEC_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(name) && !!AZTEC_TECHTREE_PARENT_LANE[name];
}

function aztecGroupFromUniqueReference(ref) {
  const value = String(ref || "");
  if (!value) return "";
  return AZTEC_TECHTREE_GROUP_ORDER.find((group) => value.startsWith(group)) || "";
}

function aztecGroupFromAmbiguousParentReference(parent, node) {
  if (!parent || node?.uniqueParent || !AZTEC_TECHTREE_AMBIGUOUS_PARENT_NAMES.has(parent)) return "";
  const marker = String(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (["MediumWarHutSoldiers", "HeavyWarHutSoldiers", "LevyWarHutSoldiers", "ConscriptWarHutSoldiers", "ChampionWarHutSoldiers"].includes(parent)) return "WarHut";
  if (["MediumNoblesHutSoldiers", "HeavyNoblesHutSoldiers", "LevyNoblesHutSoldiers", "ConscriptNoblesHutSoldiers", "ChampionNoblesHutSoldiers"].includes(parent)) return "NoblesHut";
  if (parent === "ToloacheTrance" || parent === "OcpatliInfusions") {
    if (node?.parent === "GreatTemple" || marker.startsWith("GreatTemple")) return "GreatTemple";
    if (node?.parent === "NoblesHut" || marker.startsWith("NoblesHut")) return "NoblesHut";
    return "WarHut";
  }
  if (parent === "CoyolxauhquiStone") return node?.parent === "GreatTemple" ? "GreatTemple" : "Temple";
  if (parent === "PreciousBones") return node?.parent === "NoblesHut" ? "NoblesHut" : "WarHut";
  if (parent === "TepeyollotlsReach") return node?.parent === "GreatTemple" ? "GreatTemple" : "NoblesHut";
  return "";
}

function aztecChooseParentNodeForChain(current, node, candidates) {
  const list = (candidates || []).filter(Boolean);
  if (!list.length) return null;
  if (node?.uniqueParent) {
    const exact = list.find((candidate) => candidate?.uniqueIdentifier === node.uniqueParent);
    if (exact) return exact;
  }
  const nodeX = Number(node?.x);
  return list.slice().sort((a, b) => {
    const ax = Number(a.x) || 0;
    const bx = Number(b.x) || 0;
    const aDistance = Number.isFinite(nodeX) ? Math.abs(ax - nodeX) : ax;
    const bDistance = Number.isFinite(nodeX) ? Math.abs(bx - nodeX) : bx;
    const aAfterPenalty = Number.isFinite(nodeX) && ax > nodeX ? 1000 : 0;
    const bAfterPenalty = Number.isFinite(nodeX) && bx > nodeX ? 1000 : 0;
    return (aDistance + aAfterPenalty) - (bDistance + bAfterPenalty) || ax - bx || (Number(a.y) || 0) - (Number(b.y) || 0);
  })[0];
}

function aztecNodeGroupRoot(node) {
  const parent = node?.parent || "";
  const name = node?.name || "";
  const uniqueGroup = aztecGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = aztecGroupFromAmbiguousParentReference(parent, node);
  if (ambiguousGroup) return ambiguousGroup;
  if (AZTEC_TECHTREE_GROUP_ORDER.includes(parent)) return parent;
  if (aztecCanUseStaticParentLane(parent)) return AZTEC_TECHTREE_PARENT_LANE[parent];
  if (!parent && AZTEC_TECHTREE_GROUP_ORDER.includes(name)) return name;
  if (aztecCanUseStaticParentLane(name)) return AZTEC_TECHTREE_PARENT_LANE[name];
  return parent || name;
}

function aztecNodeGroupOrder(node) {
  const root = aztecNodeGroupRoot(node);
  const idx = AZTEC_TECHTREE_GROUP_ORDER.indexOf(root);
  return idx >= 0 ? idx : 99;
}

const AZTEC_TECHTREE_FIXED_LOCAL_X = {
  VillagerAztec: 1, QuimichinSpy: 2, Masons: 1, Architects: 1, FortifiedTownCenter: 1, SerpentSkirt: 1, CoatepecShrines: 1, SecretsOfTheTitans: 1, TitanGate: 1,
  CalpulliToLivestockPen: 1, Husbandry: 1, HuntingEquipment: 1, MagueyCultivation: 1, Plow: 1, Chinampas: 1,
  CalpulliToLumberOutpost: 2, HandAxe: 2, BowSaw: 2, Carpenters: 2,
  CalpulliToCraftWorkshop: 3, Pickaxe: 3, ShaftMine: 3, Quarry: 3, Tlaloques: 1, Tonacatepetl: 2,
  StoneWall: 0, FortifiedWall: 0, BronzeWall: 0, IronWall: 0,
  HeroicFleet: 1, Axolotl: 1, AxolotlMutant: 1, ArrowCanoe: 2, ShardsOfItztli: 2, TepoztliCanoe: 3, AtlatlSiegeCanoe: 4, CipactlisScales: 4, TransportShipAztec: 5, EnclosedDeck: 5, FishingShipAztec: 6, PurseSeine: 6, FishBasket: 6, SaltAmphora: 6, HeavyWarShips: 7, ChampionWarShips: 7, ConscriptSailors: 8, Metzliapan: 3,
  Omniscience: 0, WarriorPriest: 1, TeixiptlaHuitz: 1, TeixiptlaQuetz: 1, TeixiptlaTezca: 1, Chaneque: 2, OldCoyotesSpirit: 2, CentzonTotochtin: 3, OmetochtlisRevelry: 3, Maquizcoatl: 4, OmenOfMalinalco: 4, TeponaztliDrums: 5, Ayotochtli: 1, TecciztecatlsPenance: 1, FloweryWars: 1, Tzitzimitl: 2, CentzonHuitznahua: 2, ObsidianButterfly: 3, WingsOfItzpapalotl: 3, SoulGuide: 1, TorchOfMisfortune: 1, Ahuizotl: 2, Tunkuluchu: 3, NecklaceOfEyeballs: 1, OmenOfDeath: 2, FeastOfTlaxochimaco: 1, NezhaChild: 4, NezhaYouth: 4, Nezha: 4,
  SignalFires: 1, CarrierPigeons: 1, TzompantliWatchTower: 2, CrenellationsAztec: 2, TemiminaloyanTrials: 2, BurntWater: 3,
  Ballistics: 1, BurningPitch: 1, FlintWeapons: 2, JadeWeapons: 2, ObsidianWeapons: 2, CopperWeapons: 2, BronzeWeapons: 2, IronWeapons: 2, DwarvenWeapons: 2, FeatheredArmor: 3, CeremonialArmor: 3, SacredArmor: 3, CopperArmor: 3, BronzeArmor: 3, IronArmor: 3, MeteoricIronArmor: 3, FeatheredShields: 4, CeremonialShields: 4, SacredShields: 4, CopperShields: 4, BronzeShields: 4, IronShields: 4, DragonscaleShields: 4, StringOfHearts: 1,
  CaravanAztec: 1, Coinage: 1, TaxCollectors: 2, Ambassadors: 2,
  WingsOfTheSouth: 1, Nahuallatolli: 1, ToloacheTrance: 1, StingOfYappan: 2, TlamanihSpearman: 2, OcpatliInfusions: 3, TequihuaArcher: 3, MediumWarHutSoldiers: 4, LevyWarHutSoldiers: 4, HeavyWarHutSoldiers: 4, ConscriptWarHutSoldiers: 4, ChampionWarHutSoldiers: 4, AdvancedTraps: 2, PreciousBones: 1,
  CoyoteWarrior: 1, OcelotlWarrior: 2, EagleWarrior: 3, TepeyollotlsReach: 2, CuicacalliTraining: 2, ObsidianKnapping: 1, MediumNoblesHutSoldiers: 4, LevyNoblesHutSoldiers: 4, HeavyNoblesHutSoldiers: 4, ConscriptNoblesHutSoldiers: 4, ChampionNoblesHutSoldiers: 4, TwistedLimbs: 2,
  GreatTempleNewFireCeremony: 1, GreatTempleCosmicGuard: 1, AdvancedFortifications: 2, GreatTempleArrivalOfTheGodsQuetzalcoatl: 2, GreatTempleArrivalOfTheGodsHuitzilopochtli: 2, GreatTempleArrivalOfTheGodsTezcatlipoca: 2, CoyolxauhquiStone: 3, Otontin: 3, ShornOne: 4, Mictecah: 4, JaguarRider: 5, EveningStar: 5, Quinametzin: 6, StoneskinQuinametzin: 6, FourJars: 7, TepeyollotlsReach: 5, ToloacheTrance: 1, LevyGreatTempleSoldiers: 8, HeavyGreatTempleSoldiers: 8, ConscriptGreatTempleSoldiers: 8, ChampionGreatTempleSoldiers: 8,
};

function aztecFixedLocalX(node, group) {
  if (Number.isFinite(Number(node?._fixedLocalX))) return Number(node._fixedLocalX);
  const name = node?.name || "";
  if (group === "TownCenter" && /^SkinOfTheRhino/.test(name)) return 2;
  if (group === "SkyPassage" && name === "SkyPassage") return 0;
  if (group === "Armory") {
    const map = { Armory: 0, DwarvenArmory: 0, Ballistics: 1, BurningPitch: 1, FlintWeapons: 2, JadeWeapons: 2, ObsidianWeapons: 2, CopperWeapons: 2, BronzeWeapons: 2, IronWeapons: 2, DwarvenWeapons: 2, FeatheredArmor: 3, CeremonialArmor: 3, SacredArmor: 3, CopperArmor: 3, BronzeArmor: 3, IronArmor: 3, MeteoricIronArmor: 3, FeatheredShields: 4, CeremonialShields: 4, SacredShields: 4, CopperShields: 4, BronzeShields: 4, IronShields: 4, DragonscaleShields: 4, StringOfHearts: 1 };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "TzompantliTowerTechTree") {
    const map = { TzompantliTowerTechTree: 0, SignalFires: 1, CarrierPigeons: 1, TzompantliWatchTower: 2, CrenellationsAztec: 2, TemiminaloyanTrials: 2, BurntWater: 3 };
    if (Object.prototype.hasOwnProperty.call(map, name)) return map[name];
  }
  if (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(name)) return 0;
  if (group === "Temple" && name === "Omniscience") return 0;
  if (group === "Temple" && ["NezhaChild", "NezhaYouth", "Nezha"].includes(name)) return 4;
  if (Object.prototype.hasOwnProperty.call(AZTEC_TECHTREE_FIXED_LOCAL_X, name)) return AZTEC_TECHTREE_FIXED_LOCAL_X[name];
  return undefined;
}

const AZTEC_TECHTREE_PROTECTED_LINE_LOCAL_X = {
  TownCenter: [1, 2],
  Calpulli: [1, 2, 3],
  WallConnector: [0],
  Dock: [1, 2, 3, 4, 5, 6, 7, 8],
  Temple: [0, 1, 2, 3, 4],
  TzompantliTowerTechTree: [1],
  Armory: [1, 2, 3, 4],
  Market: [1, 2],
  WarHut: [1, 2, 3, 4],
  NoblesHut: [1, 2, 3, 4],
  GreatTemple: [1, 2, 3, 4, 5, 6, 7, 8],
};

function aztecProtectedLineColumns(group, groupNodes = null) {
  const candidateColumns = new Set(AZTEC_TECHTREE_PROTECTED_LINE_LOCAL_X[group] || []);
  if (!Array.isArray(groupNodes)) return candidateColumns;
  const activeColumns = new Set();
  for (const node of groupNodes) {
    const fixed = aztecFixedLocalX(node, group);
    if (!Number.isFinite(Number(fixed))) continue;
    const localX = Number(fixed);
    if (candidateColumns.has(localX)) activeColumns.add(localX);
  }
  return activeColumns;
}

function aztecIsLaneRootParent(group, parent) {
  return parent === group
    || (group === "Armory" && parent === "DwarvenArmory")
    || (group === "TownCenter" && parent === "TownCenter")
    || (group === "Monument" && /^MonumentTo/.test(parent || ""));
}

function aztecNextNonProtectedLocalX(group, minX, protectedColumns = null) {
  const columns = protectedColumns instanceof Set ? protectedColumns : aztecProtectedLineColumns(group);
  for (let x = Math.max(0, Number(minX) || 0); x < 64; x += 1) {
    if (!columns.has(x)) return x;
  }
  return Math.max(0, Number(minX) || 0);
}

function aztecTechTreeSourceNodes(age) {
  const templates = window.AOM_TECHTREE || {};
  const byMajor = {};
  for (const major of AZTEC_TECHTREE_MAJOR_SOURCES) {
    const block = age === "ArchaicAge"
      ? extractXmlPropertyBlock(lookupTemplateBlock(templates.archaicByMajor, major) || "", "Technologies")
      : templates.ageTechnologiesByMajorAge?.[`${major}|${age}`] || "";
    byMajor[major] = parseTechTreeNodesFromBlock(block);
  }
  return byMajor;
}

function aztecCanonicalMinorTech(tech) {
  return tech;
}

function aztecMinorBonusTokens(minorTech) {
  const canonical = aztecCanonicalMinorTech(canonicalMinorTech(minorTech));
  const block = window.AOM_TECHTREE?.bonusTrackByGod?.[canonical] || "";
  return parseTechTreeNodesFromBlock(block).filter((node) => node.type === "Unit" || node.type === "Tech");
}

function aztecAllConditionalNodeNames() {
  const names = new Set();
  (UNIQUE_TECH_GROUPS || []).forEach((group) => {
    names.add(group.id);
    (group.techs || []).forEach((tech) => names.add(tech));
  });
  Object.values(AZTEC_TECHTREE_MINOR_BY_AGE).flat().forEach((minor) => {
    aztecMinorBonusTokens(minor).forEach((node) => names.add(node.name));
  });
  return names;
}

function aztecCommonNodesForAge(age) {
  const byMajor = aztecTechTreeSourceNodes(age);
  const excluded = aztecAllConditionalNodeNames();
  const keySets = Object.fromEntries(Object.entries(byMajor).map(([major, nodes]) => [major, new Set(nodes.map(techTreeNodeKey))]));
  const baseSource = AZTEC_TECHTREE_MAJOR_SOURCES[0];
  const allKeys = [...(keySets[baseSource] || new Set())];
  const commonKeys = allKeys.filter((key) => AZTEC_TECHTREE_MAJOR_SOURCES.every((major) => keySets[major]?.has(key)));
  const sourceNodes = Object.values(byMajor).flat();
  const result = [];
  for (const key of commonKeys) {
    const matches = sourceNodes.filter((node) => techTreeNodeKey(node) === key);
    const rep = chooseGreekRepresentativeNode(matches);
    if (!rep || excluded.has(rep.name)) continue;
    result.push({ ...rep });
  }
  return result;
}

function aztecFindRightSideNodesForToken(age, tokenNode) {
  const byMajor = aztecTechTreeSourceNodes(age);
  const matches = Object.values(byMajor).flat().filter((node) => node.type === tokenNode.type && node.name === tokenNode.name);
  if (!matches.length) return [];
  const byKey = new Map();
  for (const node of matches) {
    const key = techTreeNodeKey(node);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(node);
  }
  const reps = [...byKey.values()].map((nodes) => ({ count: nodes.length, node: chooseGreekRepresentativeNode(nodes) }));
  reps.sort((a, b) => aztecNodeGroupOrder(a.node) - aztecNodeGroupOrder(b.node) || (a.node.x - b.node.x) || (a.node.y - b.node.y) || String(a.node.parent).localeCompare(String(b.node.parent)) || (b.count - a.count));
  return reps.map((entry) => ({ ...entry.node }));
}

function aztecMinorNodeSameBuildingKey(node, contextNodes = []) {
  if (!node?.type || !node?.name) return "";
  const group = aztecResolveNodeGroupFromNodes(node, contextNodes && contextNodes.length ? contextNodes : [node]);
  return `${node.type}|${node.name}|${group}`;
}

function aztecPriorSelectedMinorBuildingKeys(age, config) {
  const out = new Set();
  const order = ["ClassicalAge", "HeroicAge", "MythicAge"];
  const index = order.indexOf(age);
  if (index <= 0) return out;
  for (const priorAge of order.slice(0, index)) {
    const selected = (config.minorGods?.[priorAge] || []).map(canonicalMinorTech);
    const priorNodes = [];
    for (const minor of selected) {
      for (const token of aztecMinorBonusTokens(minor)) {
        priorNodes.push(...aztecFindRightSideNodesForToken(priorAge, token));
      }
    }
    for (const node of priorNodes) {
      const key = aztecMinorNodeSameBuildingKey(node, priorNodes);
      if (key) out.add(key);
    }
  }
  return out;
}

function aztecSelectedMinorNodesForAge(age, config) {
  const selected = (config.minorGods?.[age] || []).map((tech) => aztecCanonicalMinorTech(canonicalMinorTech(tech)));
  const nodes = [];
  const seenSameBuilding = aztecPriorSelectedMinorBuildingKeys(age, config);
  for (const minor of selected) {
    for (const token of aztecMinorBonusTokens(minor)) {
      for (const candidate of aztecFindRightSideNodesForToken(age, token)) {
        const key = aztecMinorNodeSameBuildingKey(candidate, [...nodes, candidate]);
        if (key && seenSameBuilding.has(key)) continue;
        nodes.push(candidate);
        if (key) seenSameBuilding.add(key);
      }
    }
  }
  return nodes;
}

function aztecResolveNodeGroupFromNodes(node, allNodes) {
  const byName = new Map();
  const byUniqueIdentifier = new Map();
  for (const candidate of allNodes || []) {
    if (!candidate?.name) continue;
    if (!byName.has(candidate.name)) byName.set(candidate.name, []);
    byName.get(candidate.name).push(candidate);
    if (candidate.uniqueIdentifier) byUniqueIdentifier.set(candidate.uniqueIdentifier, candidate);
  }
  const uniqueGroup = aztecGroupFromUniqueReference(node?.uniqueParent || node?.uniqueIdentifier || "");
  if (uniqueGroup) return uniqueGroup;
  const ambiguousGroup = aztecGroupFromAmbiguousParentReference(node?.parent || "", node);
  if (ambiguousGroup) return ambiguousGroup;
  const seen = new Set();
  let current = node?.uniqueParent || node?.parent || node?.name || "";
  let walkerNode = node;
  for (let i = 0; i < 16 && current && !seen.has(current); i += 1) {
    seen.add(current);
    if (AZTEC_TECHTREE_GROUP_ORDER.includes(current)) return current;
    if (aztecCanUseStaticParentLane(current)) return AZTEC_TECHTREE_PARENT_LANE[current];
    let parentNode = byUniqueIdentifier.get(current) || null;
    if (!parentNode) parentNode = aztecChooseParentNodeForChain(current, walkerNode, byName.get(current) || []);
    if (parentNode?.uniqueParent || parentNode?.parent) {
      walkerNode = parentNode;
      current = parentNode.uniqueParent || parentNode.parent;
      continue;
    }
    if (parentNode?.name && parentNode.name !== current) {
      walkerNode = parentNode;
      current = parentNode.name;
      continue;
    }
    break;
  }
  if (aztecCanUseStaticParentLane(node?.name)) return AZTEC_TECHTREE_PARENT_LANE[node.name];
  return aztecNodeGroupRoot(node);
}

function aztecCompactGroupNodes(group, groupNodes, groupStartX = 0, protectedColumnsOverride = null, age = "", lineMemberKeys = null) {
  const nodes = (groupNodes || []).map((inputNode) => {
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    return node;
  });

  const isGroupRootNode = (node) => !node?.parent && (node?.name === group || (group === "Armory" && node?.name === "DwarvenArmory") || (group === "Monument" && /^MonumentTo/.test(node?.name || "")));
  const hasRoot = nodes.some((node) => isGroupRootNode(node));
  const preSortDirectChildCountByName = new Map();
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    preSortDirectChildCountByName.set(parentKey, (preSortDirectChildCountByName.get(parentKey) || 0) + 1);
  }
  const nodeHasPreSortDirectChildren = (node) => (preSortDirectChildCountByName.get(node?.uniqueIdentifier || node?.name) || 0) > 0;
  const sourceOrder = (node) => (Number(node.x) || 0) * 10 + (Number(node.y) || 0);
  const sorted = nodes.slice().sort((a, b) => {
    const aIsRoot = isGroupRootNode(a);
    const bIsRoot = isGroupRootNode(b);
    if (aIsRoot !== bIsRoot) return aIsRoot ? -1 : 1;
    if (a.name === b.parent && b.name !== a.parent) return -1;
    if (b.name === a.parent && a.name !== b.parent) return 1;
    const aRootChild = aztecIsLaneRootParent(group, a.parent) && !nodeHasPreSortDirectChildren(a);
    const bRootChild = aztecIsLaneRootParent(group, b.parent) && !nodeHasPreSortDirectChildren(b);
    if (aRootChild && bRootChild && a.type !== b.type) {
      // For direct childless nodes in a building lane, place units before
      // childless techs. This lets units claim row 0 when the parent building
      // was introduced in an earlier age, while the techs fall to row 1.
      // The actual X column still comes from fixed/parent placement rules.
      if (a.type === "Unit") return -1;
      if (b.type === "Unit") return 1;
    }
    const af = aztecFixedLocalX(a, group);
    const bf = aztecFixedLocalX(b, group);
    if (Number.isFinite(Number(af)) !== Number.isFinite(Number(bf))) return Number.isFinite(Number(af)) ? -1 : 1;
    if (Number.isFinite(Number(af)) && af !== bf) return af - bf;
    return sourceOrder(a) - sourceOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name) || String(a.parent).localeCompare(String(b.parent));
  });

  const localOccupied = new Set();
  const placedLocalByName = new Map();
  const placedRowByName = new Map();
  const placed = [];
  const protectedLineColumns = protectedColumnsOverride instanceof Set ? protectedColumnsOverride : aztecProtectedLineColumns(group, nodes);
  const isLineMemberNode = (node) => lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
  const directChildCountByName = new Map();
  const directChildFixedLocalXByName = new Map();
  const rootDirectChildTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildWithChildrenTypeCounts = { Unit: 0, Tech: 0 };
  const rootDirectChildlessTypesByLocalX = new Map();
  const isLaneRootParent = (parent) => aztecIsLaneRootParent(group, parent);
  for (const child of nodes) {
    const parentKey = techTreeNodeParentLookupKey(child);
    if (!parentKey) continue;
    directChildCountByName.set(parentKey, (directChildCountByName.get(parentKey) || 0) + 1);
    const childFixed = aztecFixedLocalX(child, group);
    if (Number.isFinite(Number(childFixed))) {
      const current = directChildFixedLocalXByName.get(parentKey);
      const childFixedX = Number(childFixed);
      if (!Number.isFinite(Number(current)) || childFixedX < Number(current)) {
        directChildFixedLocalXByName.set(parentKey, childFixedX);
      }
    }
  }
  for (const child of nodes) {
    if (!child || !isLaneRootParent(child.parent)) continue;
    if (child.type === "Unit" || child.type === "Tech") {
      rootDirectChildTypeCounts[child.type] += 1;
      const childKey = child.uniqueIdentifier || child.name;
      if (directChildCountByName.get(childKey) || 0) {
        rootDirectChildWithChildrenTypeCounts[child.type] += 1;
      } else {
        rootDirectChildlessTypeCounts[child.type] += 1;
        const fixedLocal = aztecFixedLocalX(child, group);
        const localX = Number.isFinite(Number(fixedLocal)) ? Number(fixedLocal) : undefined;
        if (Number.isFinite(localX)) {
          if (!rootDirectChildlessTypesByLocalX.has(localX)) rootDirectChildlessTypesByLocalX.set(localX, new Set());
          rootDirectChildlessTypesByLocalX.get(localX).add(child.type);
        }
      }
    }
  }

  const canUse = (x, y, allowProtectedLineColumn = true) => {
    if (localOccupied.has(`${x},${y}`)) return false;
    if (!allowProtectedLineColumn && protectedLineColumns.has(x)) return false;
    return true;
  };
  const reserve = (node, localX, y) => {
    localOccupied.add(`${localX},${y}`);
    for (const placementKey of techTreeNodePlacementKeys(node)) {
      if (!placedLocalByName.has(placementKey) || localX < placedLocalByName.get(placementKey)) {
        placedLocalByName.set(placementKey, localX);
        placedRowByName.set(placementKey, y);
      }
    }
    const cleanNode = { ...node };
    delete cleanNode._group;
    placed.push({ ...cleanNode, x: groupStartX + localX, y, position: `${groupStartX + localX},${y}` });
  };
  const firstFree = (minX, preferredY = 0, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) if (canUse(x, y, allowProtectedLineColumn)) return { x, y };
    }
    return { x: Math.max(0, minX || 0), y: preferredY === 1 ? 1 : 0 };
  };
  const firstFreeParentColumn = (minX, allowProtectedLineColumn = true) => {
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn) && canUse(x, 1, allowProtectedLineColumn)) return { x, y: 0 };
    }
    for (let x = Math.max(0, minX || 0); x < 64; x += 1) {
      if (!allowProtectedLineColumn && protectedLineColumns.has(x)) continue;
      if (canUse(x, 0, allowProtectedLineColumn)) return { x, y: 0 };
    }
    return firstFree(minX, 0, allowProtectedLineColumn);
  };

  for (const node of techTreeParentDepthFirstOrder(sorted, isGroupRootNode)) {
    const isRoot = isGroupRootNode(node);
    if (isRoot) {
      const fixed = aztecFixedLocalX(node, group);
      const x = Number.isFinite(Number(fixed)) ? Number(fixed) : 0;
      const y = 0;
      if (!canUse(x, y, true)) {
        const alt = firstFree(x, y, true);
        reserve(node, alt.x, alt.y);
      } else {
        reserve(node, x, y);
      }
      continue;
    }

    const fixed = aztecFixedLocalX(node, group);
    const parentLookupKey = techTreeNodeParentLookupKey(node);
    const parentLocal = placedLocalByName.get(parentLookupKey);
    const parentRow = placedRowByName.get(parentLookupKey);
    const childFixedLocal = directChildFixedLocalXByName.get(node.uniqueIdentifier || node.name);
    const parentLineOverrideRaw = parentLookupKey && node?._lineColumnByPlacementKey ? node._lineColumnByPlacementKey[`${group}::${parentLookupKey}`] : undefined;
    const parentFixedLocalRaw = Number.isFinite(Number(parentLineOverrideRaw))
      ? parentLineOverrideRaw
      : (parentLookupKey ? aztecFixedLocalX({ type: "Unit", name: parentLookupKey, parent: group }, group) : undefined);
    const parentFixedLocal = Number.isFinite(Number(parentFixedLocalRaw)) ? Number(parentFixedLocalRaw) : undefined;
    let desiredX;
    let preferredY = Number(node.y) === 0 ? 0 : 1;

    if (Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent)) {
      // Parent-line rule: once a parent is placed, every direct child follows
      // the parent's actual column. Fixed local X values are only preferred
      // before the parent is placed; they must not break the visible line if
      // the parent had to move to a cleaner/available column.
      desiredX = Number(parentLocal);
      if (Number.isFinite(Number(parentRow))) preferredY = Number(parentRow) === 0 ? 1 : 0;
    } else if (Number.isFinite(Number(parentFixedLocal)) && !isLaneRootParent(node.parent)) {
      // Multi-age parent-line rule: if the visible parent belongs to this
      // building lane but is placed in another age, still use the parent's
      // canonical local column. This keeps lines such as DouJian -> Maelstrom
      // and CaravanAztec -> Coinage aligned even when only the child appears
      // in the current age.
      desiredX = Number(parentFixedLocal);
      preferredY = node.type === "Tech" ? 1 : preferredY;
    } else if (Number.isFinite(Number(fixed))) {
      desiredX = Number(fixed);
    } else if (Number.isFinite(Number(childFixedLocal))) {
      // Generic parent-line rule: if a direct child is part of a fixed upgrade
      // line, place the parent in that same column first. Example: Anubite
      // inherits FeetOfTheJackal's column, so the pair forms a clean vertical
      // parent line instead of the child occupying the protected column alone.
      desiredX = Number(childFixedLocal);
    } else {
      desiredX = 1;
    }

    const hasDirectChildren = (directChildCountByName.get(node.uniqueIdentifier || node.name) || 0) > 0;
    const directFromRootBuilding = hasRoot && isLaneRootParent(node.parent);
    const rootHasChildlessUnitAndTech = rootDirectChildlessTypeCounts.Unit > 0 && rootDirectChildlessTypeCounts.Tech > 0;
    const rootChildlessTypesAtDesiredX = rootDirectChildlessTypesByLocalX.get(Number(desiredX)) || new Set();
    const rootColumnHasChildlessUnitAndTech = rootChildlessTypesAtDesiredX.has("Unit") && rootChildlessTypesAtDesiredX.has("Tech");
    const rootHasOnlyChildlessUnits = directFromRootBuilding
      && !hasDirectChildren
      && node.type === "Unit"
      && !isLineMemberNode(node)
      && rootDirectChildlessTypeCounts.Unit > 0
      && rootDirectChildlessTypeCounts.Tech === 0
      && rootDirectChildWithChildrenTypeCounts.Unit === 0
      && rootDirectChildWithChildrenTypeCounts.Tech === 0;
    if (rootHasOnlyChildlessUnits) {
      // When a building appears in the current age and only trains units from
      // its root command row, keep those units together on row 1 and pack them
      // compactly from the first available column. This avoids gaps like an
      // empty TownCenter column 1/2 while all trained units are shifted right.
      desiredX = 1;
      preferredY = 1;
    } else if (directFromRootBuilding && !hasDirectChildren) {
      // Direct children of a building that appears in this age should keep the
      // building row clean. Childless units prefer row 1 unless a childless tech
      // also wants that exact column; only then use the classic unit row 0 /
      // tech row 1 split. This keeps Longhouse units together on row 1 while
      // still handling HillFort columns that contain both a unit and a tech.
      if (node.type === "Unit") preferredY = rootColumnHasChildlessUnitAndTech ? 0 : 1;
      if (node.type === "Tech") preferredY = 1;
    } else if (node.type === "Unit") {
      preferredY = 0;
    }
    if (age === "ArchaicAge" && !isRoot && node.type === "Unit" && !hasDirectChildren && !rootHasChildlessUnitAndTech && !localOccupied.has(`${desiredX},1`)) preferredY = 1;
    if (age === "ArchaicAge" && !isRoot && node.type !== "Unit" && !localOccupied.has(`${desiredX},1`)) preferredY = 1;

    if (!hasRoot && !isLaneRootParent(node.parent)) desiredX = Math.max(desiredX, 0);
    if (hasRoot || group === "TownCenter") desiredX = Math.max(desiredX, 1);

    const hasFixedLocalX = Number.isFinite(Number(fixed));
    const isChildOfPlacedChain = Number.isFinite(Number(parentLocal)) && !isLaneRootParent(node.parent) && Number(parentLocal) === Number(desiredX);
    const isParentOfFixedChildLine = Number.isFinite(Number(childFixedLocal)) && Number(childFixedLocal) === Number(desiredX);
    const isGlobalLineMember = isLineMemberNode(node);
    const isFixedLineNode = hasFixedLocalX && protectedLineColumns.has(Number(fixed)) && (isGlobalLineMember || !isLaneRootParent(node.parent) || hasDirectChildren || isParentOfFixedChildLine);
    const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
      || (group === "Temple" && node.name === "Omniscience");
    const allowProtectedLineColumn = rootHasOnlyChildlessUnits || isChildOfPlacedChain || isParentOfFixedChildLine || isFixedLineNode || isSharedColumnException;
    if (!allowProtectedLineColumn && protectedLineColumns.has(desiredX)) {
      desiredX = aztecNextNonProtectedLocalX(group, desiredX + 1, protectedLineColumns);
    }

    let placedHere = false;
    if (rootHasOnlyChildlessUnits) {
      for (let x = Math.max(1, Number(desiredX) || 1); x < 64; x += 1) {
        if (canUse(x, 1, true)) {
          reserve(node, x, 1);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere && hasDirectChildren) {
      // If this node is itself a child in an already placed parent line, keep it
      // in the parent column first. This handles three-step lines such as
      // YaZi -> SonOfLoong -> RageOfSlaughter: the middle node should sit under
      // the unit parent before its own child pushes to a later free column.
      if (isChildOfPlacedChain && canUse(desiredX, preferredY, allowProtectedLineColumn)) {
        reserve(node, desiredX, preferredY);
        placedHere = true;
      }
      if (!placedHere) {
        // Any visible parent line, including tech upgrade chains, should reserve
        // a clean column first. This keeps chains such as CopperWeapons ->
        // BronzeWeapons and Valkyrie -> Disablot in one vertical line instead
        // of letting an unrelated node occupy the child row.
        const cleanColumn = firstFreeParentColumn(desiredX, allowProtectedLineColumn);
        reserve(node, cleanColumn.x, cleanColumn.y);
        placedHere = true;
      }
    }
    if (!placedHere) {
      const rows = preferredY === 1 ? [1, 0] : [0, 1];
      for (const y of rows) {
        if (canUse(desiredX, y, allowProtectedLineColumn)) {
          reserve(node, desiredX, y);
          placedHere = true;
          break;
        }
      }
    }
    if (!placedHere) {
      const fallbackPreferredY = node.type === "Tech" ? 1 : preferredY;
      const alt = firstFree(desiredX + 1, fallbackPreferredY, allowProtectedLineColumn);
      reserve(node, alt.x, alt.y);
    }
  }

  // Final row cleanup: if a direct childless unit and a direct childless tech
  // from the same building lane ended up in the same column, keep the unit on
  // row 0 and the tech on row 1. This preserves the compact column while
  // keeping units visually prominent.
  const childlessRootNode = (node) => isLaneRootParent(node?.parent) && !(directChildCountByName.get(node?.uniqueIdentifier || node?.name) || 0);
  const byColumn = new Map();
  for (const node of placed) {
    if (!childlessRootNode(node)) continue;
    if (!byColumn.has(node.x)) byColumn.set(node.x, []);
    byColumn.get(node.x).push(node);
  }
  for (const columnNodes of byColumn.values()) {
    const unitRow1 = columnNodes.find((node) => node.type === "Unit" && Number(node.y) === 1);
    const techRow0 = columnNodes.find((node) => node.type === "Tech" && Number(node.y) === 0);
    if (unitRow1 && techRow0) {
      unitRow1.y = 0;
      unitRow1.position = `${unitRow1.x},0`;
      techRow0.y = 1;
      techRow0.position = `${techRow0.x},1`;
    }
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

function aztecNormalizeTechTreeNodes(age, nodes, forcedGroupStarts = null, protectedColumnsByGroup = null, lineMemberKeys = null) {
  const unique = new Map();
  for (const inputNode of nodes) {
    if (!inputNode || !inputNode.type || !inputNode.name) continue;
    const node = { ...inputNode };
    const [xRaw, yRaw] = String(node.position || `${node.x || 0},${node.y ?? 1}`).split(",");
    node.x = Number.isFinite(Number(xRaw)) ? Number(xRaw) : Number(node.x || 0) || 0;
    node.y = Number.isFinite(Number(yRaw)) ? Number(yRaw) : Number(node.y ?? 1) || 1;
    if (node.y > 1) node.y = 1;
    if (node.y < 0) node.y = 0;
    node.position = `${node.x},${node.y}`;
    const key = techTreeNodeKey(node);
    if (!unique.has(key)) unique.set(key, node);
  }

  const allNodes = [...unique.values()];
  const grouped = new Map();
  for (const node of allNodes) {
    const group = aztecResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push({ ...node, _group: group });
  }

  const orderedGroups = [...grouped.entries()].sort(([groupA], [groupB]) => {
    const ai = AZTEC_TECHTREE_GROUP_ORDER.indexOf(groupA);
    const bi = AZTEC_TECHTREE_GROUP_ORDER.indexOf(groupB);
    return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || String(groupA).localeCompare(String(groupB));
  });

  const placed = [];
  let nextGroupX = 0;
  for (const [group, groupNodes] of orderedGroups) {
    const forcedX = forcedGroupStarts && Number.isFinite(Number(forcedGroupStarts[group])) ? Number(forcedGroupStarts[group]) : undefined;
    const groupStartX = Number.isFinite(Number(forcedX)) ? Number(forcedX) : nextGroupX;
    const hasProtectionMap = protectedColumnsByGroup && typeof protectedColumnsByGroup === "object";
    const protectedColumns = hasProtectionMap ? (protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : new Set()) : null;
    const groupPlaced = aztecCompactGroupNodes(group, groupNodes, groupStartX, protectedColumns, age, lineMemberKeys);
    placed.push(...groupPlaced);
    const width = groupPlaced.length ? Math.max(...groupPlaced.map((node) => Number(node.x) - groupStartX)) + 1 : 0;
    nextGroupX = groupStartX + Math.max(width, 0);
  }

  return placed.sort((a, b) => (a.x - b.x) || (a.y - b.y) || aztecNodeGroupOrder(a) - aztecNodeGroupOrder(b) || a.type.localeCompare(b.type) || a.name.localeCompare(b.name));
}

const AZTEC_STANDARD_ARMORY_TECHTREE_NAMES = new Set([
  "Armory", "FlintWeapons", "JadeWeapons", "ObsidianWeapons",
  "FeatheredArmor", "CeremonialArmor", "SacredArmor",
  "FeatheredShields", "CeremonialShields", "SacredShields",
  "StringOfHearts"
]);

function aztecApplyThorDwarvenArmoryRightSide(nodes, config) {
  if (!selectedHasThorDwarvenArmoryBonus(config)) return nodes || [];
  return (nodes || [])
    .filter((node) => !(AZTEC_STANDARD_ARMORY_TECHTREE_NAMES.has(node.name) || AZTEC_STANDARD_ARMORY_TECHTREE_NAMES.has(node.parent)))
    .map((inputNode) => {
      const node = { ...inputNode };
      if (node.type === "Unit" && node.name === "Armory") node.name = "DwarvenArmory";
      if (node.parent === "Armory") node.parent = "DwarvenArmory";
      return node;
    });
}


function aztecBaseArmoryRightSideNodes(age, config) {
  const useDwarven = selectedHasThorDwarvenArmoryBonus(config);
  const armory = useDwarven ? "DwarvenArmory" : "Armory";
  const node = (type, name, parent, position) => {
    const [xRaw, yRaw] = String(position).split(",");
    return { type, name, parent: parent || "", position, x: Number(xRaw) || 0, y: Number(yRaw) || 0 };
  };
  if (useDwarven) {
    if (age === "ArchaicAge") {
      return [
        node("Unit", armory, "", "24,0"),
        node("Tech", "Ballistics", armory, "25,1"),
        node("Tech", "CopperWeapons", armory, "26,0"),
        node("Tech", "BronzeWeapons", "CopperWeapons", "26,1"),
        node("Tech", "CopperArmor", armory, "27,0"),
        node("Tech", "BronzeArmor", "CopperArmor", "27,1"),
        node("Tech", "CopperShields", armory, "28,0"),
        node("Tech", "BronzeShields", "CopperShields", "28,1"),
      ];
    }
    if (age === "ClassicalAge") {
      return [
        node("Tech", "BurningPitch", armory, "25,1"),
        node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
        node("Tech", "DwarvenWeapons", "IronWeapons", "26,1"),
        node("Tech", "IronArmor", "BronzeArmor", "27,0"),
        node("Tech", "MeteoricIronArmor", "IronArmor", "27,1"),
        node("Tech", "IronShields", "BronzeShields", "28,0"),
        node("Tech", "DragonscaleShields", "IronShields", "28,1"),
      ];
    }
    return [];
  }
  if (age === "ClassicalAge") {
    return [
      node("Unit", armory, "", "24,0"),
      node("Tech", "Ballistics", armory, "25,1"),
      node("Tech", "CopperWeapons", armory, "26,1"),
      node("Tech", "CopperArmor", armory, "27,1"),
      node("Tech", "CopperShields", armory, "28,1"),
    ];
  }
  if (age === "HeroicAge") {
    return [
      node("Tech", "BronzeWeapons", "CopperWeapons", "26,0"),
      node("Tech", "BronzeArmor", "CopperArmor", "27,0"),
      node("Tech", "BronzeShields", "CopperShields", "28,0"),
    ];
  }
  if (age === "MythicAge") {
    return [
      node("Tech", "BurningPitch", armory, "25,0"),
      node("Tech", "IronWeapons", "BronzeWeapons", "26,0"),
      node("Tech", "IronArmor", "BronzeArmor", "27,0"),
      node("Tech", "IronShields", "BronzeShields", "28,0"),
    ];
  }
  return [];
}

function aztecThorDwarvenArmoryExtraRightSideNodes(age, config) {
  // Kept for compatibility; Aztec Dwarven Armory right-side nodes are built
  // by aztecBaseArmoryRightSideNodes so the Armory/DwarvenArmory lane remains
  // complete and age-appropriate.
  return [];
}



function aztecRawTechTreeNodesForAge(age, config) {
  let nodes = [
    ...aztecCommonNodesForAge(age),
    ...aztecSelectedMinorNodesForAge(age, config),
    ...aztecThorDwarvenArmoryExtraRightSideNodes(age, config),
  ].filter(Boolean);
  if (age === "ArchaicAge") {
    const group = selectedUniqueTechGroup(config);
    const tech = selectedUniqueTechRightSideName(config, group);
    if (group && tech) {
      for (const spec of uniqueTechRightSideNodeSpecs(config, "", group)) {
        const [xRaw, yRaw] = String(spec.position || spec.preferred?.[0] || "18,1").split(",");
        nodes.push({
          type: "Tech",
          name: tech,
          parent: spec.parent,
          position: `${Number(xRaw) || 0},${Number(yRaw) || 1}`,
          x: Number(xRaw) || 0,
          y: Number(yRaw) || 1,
        });
      }
    }
  }
  nodes = applyGenericBonusRightSideNodes("Aztec", age, config, nodes);
  nodes = aztecApplyFarmBaselineRightSide(age, config, nodes);
  nodes = aztecApplyGreatTempleSelectionRightSide(age, config, nodes);
  return aztecApplyThorDwarvenArmoryRightSide(nodes, config);
}

function aztecApplyFarmBaselineRightSide(age, config, nodes) {
  let out = nodes || [];
  // Aztec vanilla trees show Farm in ClassicalAge unless the Shennong bonus
  // explicitly moves Farm to ArchaicAge. Shennong handling is applied by the
  // generic bonus rule before this helper, so only add the normal Classical
  // Farm when that bonus is not selected.
  if (selectedHasShennongFarmArchaicBonus(config)) return out;
  out = out.filter((node) => !(node.type === "Unit" && node.name === "Farm"));
  if (age === "ClassicalAge") out.push(rightSideNode("Unit", "Farm", "", "1,0"));
  return out;
}

function aztecApplyGreatTempleSelectionRightSide(age, config, nodes) {
  let out = (nodes || []).filter((node) => {
    if (node.type === "Tech" && /^GreatTempleArrivalOfTheGods/.test(node.name)) return false;
    if (node.type === "Unit" && node.name === "JaguarRider" && node.parent === "GreatTemple") return false;
    return true;
  });
  const arrival = Object.values(AZTEC_MYTHIC_ARRIVALS).includes(config?.aztecMythicArrival)
    ? config.aztecMythicArrival
    : AZTEC_MYTHIC_ARRIVALS.Quetzalcoatl;
  const jaguarHeroic = selectedHasBonusId(config, "bonus_93") || selectedHasBonusLabel(config, TEZCAT_JAGUAR_RIDER_BONUS_LABEL);
  if (age === "MythicAge") {
    out.push(rightSideNode("Tech", arrival, "GreatTemple", "2,1"));
    if (!jaguarHeroic) out.push(rightSideNode("Unit", "JaguarRider", "GreatTemple", "5,0"));
  }
  if (jaguarHeroic && age === "HeroicAge") out.push(rightSideNode("Unit", "JaguarRider", "GreatTemple", "5,0"));
  return out;
}

function aztecApplyJaguarRiderHeroicRightSide(age, config, nodes) {
  // Compatibility wrapper. The selected Great Temple arrival and the
  // Tezcatlipoca heroic-Jaguar bonus are handled together so the unit is never
  // dropped from the right-side techtree.
  return aztecApplyGreatTempleSelectionRightSide(age, config, nodes);
}

function aztecMeasureGroupWidths(nodes, protectedColumnsByGroup = null, age = "", lineMemberKeys = null) {
  const widths = {};
  const grouped = new Map();
  for (const node of nodes || []) {
    const group = aztecResolveNodeGroupFromNodes(node, nodes || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }
  for (const [group, groupNodes] of grouped.entries()) {
    const hasProtectionMap = protectedColumnsByGroup && typeof protectedColumnsByGroup === "object";
    const protectedColumns = hasProtectionMap ? (protectedColumnsByGroup[group] instanceof Set ? protectedColumnsByGroup[group] : new Set()) : null;
    const placed = aztecCompactGroupNodes(group, groupNodes, 0, protectedColumns, age, lineMemberKeys);
    widths[group] = placed.length ? Math.max(...placed.map((node) => Number(node.x) || 0)) + 1 : 0;
  }
  return widths;
}



function aztecScopedLineColumnKey(group, key) {
  return `${group || ""}::${key || ""}`;
}

function aztecBuildDynamicLineColumnOverrides(rawByAge) {
  const byNodeKey = {};
  const byPlacementKey = {};
  const allNodes = [];
  for (const [age, nodes] of Object.entries(rawByAge || {})) {
    for (const node of nodes || []) allNodes.push({ ...node, _age: age });
  }

  const grouped = new Map();
  for (const node of allNodes) {
    if (!node || !node.name) continue;
    const group = aztecResolveNodeGroupFromNodes(node, allNodes);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }

  const agesOverlap = (a, b) => {
    for (const age of a || []) if ((b || new Set()).has(age)) return true;
    return false;
  };

  for (const [group, groupNodes] of grouped.entries()) {
    const childrenByParent = new Map();
    const parentRefs = new Set();
    const nodesByPlacementKey = new Map();

    for (const node of groupNodes) {
      for (const placementKey of techTreeNodePlacementKeys(node)) {
        if (!nodesByPlacementKey.has(placementKey)) nodesByPlacementKey.set(placementKey, []);
        nodesByPlacementKey.get(placementKey).push(node);
      }
    }

    for (const node of groupNodes) {
      const parentKey = techTreeNodeParentLookupKey(node);
      if (!parentKey || aztecIsLaneRootParent(group, parentKey)) continue;
      if (!childrenByParent.has(parentKey)) childrenByParent.set(parentKey, []);
      childrenByParent.get(parentKey).push(node);
      parentRefs.add(parentKey);
    }

    const lineRoots = [];
    for (const node of groupNodes) {
      const placementKeys = techTreeNodePlacementKeys(node);
      const hasChildren = placementKeys.some((placementKey) => childrenByParent.has(placementKey));
      if (!hasChildren) continue;
      const parentKey = techTreeNodeParentLookupKey(node);
      const parentIsNonRootLine = parentKey && !aztecIsLaneRootParent(group, parentKey) && parentRefs.has(parentKey);
      if (!parentIsNonRootLine) lineRoots.push(node);
    }

    const seenRootKeys = new Set();
    const lines = [];
    for (const root of lineRoots) {
      const rootKey = techTreeNodeKey(root);
      if (seenRootKeys.has(rootKey)) continue;
      seenRootKeys.add(rootKey);
      const members = [];
      const seen = new Set();
      const walk = (node) => {
        const key = techTreeNodeKey(node);
        if (seen.has(key)) return;
        seen.add(key);
        members.push(node);
        for (const placementKey of techTreeNodePlacementKeys(node)) {
          for (const child of childrenByParent.get(placementKey) || []) walk(child);
        }
      };
      walk(root);
      if (members.length < 2) continue;
      const activeAges = new Set(members.map((node) => node._age).filter(Boolean));
      const rootFixed = aztecFixedLocalX(root, group);
      let baseX = Number.isFinite(Number(rootFixed)) ? Number(rootFixed) : undefined;
      if (!Number.isFinite(Number(baseX))) {
        const fixedValues = members.map((node) => Number(aztecFixedLocalX(node, group))).filter(Number.isFinite);
        baseX = fixedValues.length ? Math.min(...fixedValues) : 1;
      }
      lines.push({ root, members, activeAges, baseX: Number(baseX) || 0 });
    }

    lines.sort((a, b) => a.baseX - b.baseX
      || (Number(a.root.x) || 0) - (Number(b.root.x) || 0)
      || (Number(a.root.y) || 0) - (Number(b.root.y) || 0)
      || String(a.root.name).localeCompare(String(b.root.name))
      || String(a.root.parent || a.root.uniqueParent || "").localeCompare(String(b.root.parent || b.root.uniqueParent || "")));

    const assigned = [];
    for (const line of lines) {
      let x = Math.max(0, Number(line.baseX) || 0);
      while (assigned.some((entry) => entry.x === x && agesOverlap(entry.activeAges, line.activeAges))) x += 1;
      assigned.push({ x, activeAges: line.activeAges });
      for (const member of line.members) {
        byNodeKey[aztecScopedLineColumnKey(group, techTreeNodeKey(member))] = x;
        for (const placementKey of techTreeNodePlacementKeys(member)) {
          const scoped = aztecScopedLineColumnKey(group, placementKey);
          const existing = byPlacementKey[scoped];
          if (!Number.isFinite(Number(existing)) || x < Number(existing)) byPlacementKey[scoped] = x;
        }
      }
    }
  }

  return { byNodeKey, byPlacementKey };
}

function aztecApplyLineColumnOverridesToNodes(age, config, nodes) {
  const overrides = config?._aztecTechTreeLineColumnOverrides;
  if (!overrides || typeof overrides !== "object") return nodes || [];
  const byNodeKey = overrides.byNodeKey || {};
  const byPlacementKey = overrides.byPlacementKey || {};
  const sourceNodes = nodes || [];
  return sourceNodes.map((node) => {
    if (!node || !node.name) return node;
    const group = aztecResolveNodeGroupFromNodes(node, sourceNodes);
    const override = byNodeKey[aztecScopedLineColumnKey(group, techTreeNodeKey(node))];
    const next = { ...node, _lineColumnByPlacementKey: byPlacementKey };
    if (Number.isFinite(Number(override))) next._fixedLocalX = Number(override);
    return next;
  });
}

function aztecBuildLineMemberKeySets(rawByAge) {
  const byAge = {};
  const global = new Set();
  const allNodes = Object.values(rawByAge || {}).flat().filter(Boolean);
  const parentRefs = new Set();
  const childKeys = new Set();

  const scopedKey = (group, key) => `${group || ""}::${key || ""}`;

  for (const node of allNodes) {
    const parentKey = techTreeNodeParentLookupKey(node);
    if (!parentKey) continue;
    const group = aztecResolveNodeGroupFromNodes(node, allNodes);
    if (aztecIsLaneRootParent(group, parentKey)) continue;
    // Scope parent references by resolved building lane. Otherwise duplicate
    // Aztec names such as Berserk/Hersir/MediumInfantry can falsely mark an
    // unrelated building's node as part of a parent line.
    parentRefs.add(scopedKey(group, parentKey));
    childKeys.add(techTreeNodeKey(node));
  }

  for (const [age, nodes] of Object.entries(rawByAge || {})) {
    const set = new Set();
    for (const node of nodes || []) {
      const key = techTreeNodeKey(node);
      const group = aztecResolveNodeGroupFromNodes(node, nodes || []);
      const placementKeys = techTreeNodePlacementKeys(node);
      const isParentInLine = placementKeys.some((placementKey) => parentRefs.has(scopedKey(group, placementKey)));
      const isChildInLine = childKeys.has(key);
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      if (isParentInLine || isChildInLine || isSharedColumnException) {
        set.add(key);
        global.add(key);
      }
    }
    byAge[age] = set;
  }
  return { byAge, global };
}

function aztecBuildProtectedLineColumnsForNodes(nodesForAge, lineMemberKeys = null) {
  const grouped = new Map();
  for (const node of nodesForAge || []) {
    if (!node || !node.name) continue;
    const group = aztecResolveNodeGroupFromNodes(node, nodesForAge || []);
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(node);
  }

  const out = {};
  for (const [group, groupNodes] of grouped.entries()) {
    const activeColumns = new Set();
    for (const node of groupNodes) {
      const fixed = aztecFixedLocalX(node, group);
      if (!Number.isFinite(Number(fixed))) continue;
      const localX = Number(fixed);
      const isLineMember = lineMemberKeys instanceof Set && lineMemberKeys.has(techTreeNodeKey(node));
      const isSharedColumnException = (group === "WallConnector" && ["StoneWall", "FortifiedWall", "BronzeWall", "IronWall"].includes(node.name))
        || (group === "Temple" && node.name === "Omniscience");
      // Protect only actual active parent-line columns in this age. A column is
      // protected when a node in this age is part of a parent/child line, even
      // when the rest of that line appears in a different age. This keeps
      // multi-age lines aligned without reserving dead columns in ages where
      // the line has no node.
      if (isLineMember || isSharedColumnException) activeColumns.add(localX);
    }
    if (activeColumns.size) out[group] = activeColumns;
  }
  return out;
}

function aztecBuildGlobalProtectedLineColumns(rawByAge) {
  const allNodes = Object.values(rawByAge || {}).flat();
  return aztecBuildProtectedLineColumnsForNodes(allNodes, aztecBuildLineMemberKeySets({ All: allNodes }).byAge.All);
}

function buildAztecTechTreeGroupStarts(config) {
  if (config?.baseCulture !== "Aztec") return null;
  const rawByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    rawByAge[age] = aztecRawTechTreeNodesForAge(age, config);
  }
  const lineColumnOverrides = aztecBuildDynamicLineColumnOverrides(rawByAge);
  config._aztecTechTreeLineColumnOverrides = lineColumnOverrides;
  for (const age of ["ArchaicAge", ...AGES]) {
    rawByAge[age] = aztecApplyLineColumnOverridesToNodes(age, config, rawByAge[age]);
  }

  const lineKeySets = aztecBuildLineMemberKeySets(rawByAge);
  config._aztecTechTreeLineMemberKeysByAge = lineKeySets.byAge;
  config._aztecTechTreeLineMemberKeys = lineKeySets.global;

  const protectedColumnsByAge = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    protectedColumnsByAge[age] = aztecBuildProtectedLineColumnsForNodes(rawByAge[age], lineKeySets.byAge[age]);
  }
  config._aztecTechTreeProtectedColumnsByAge = protectedColumnsByAge;
  config._aztecTechTreeProtectedColumns = protectedColumnsByAge.ArchaicAge || {};

  const maxWidths = {};
  for (const age of ["ArchaicAge", ...AGES]) {
    const widths = aztecMeasureGroupWidths(rawByAge[age], protectedColumnsByAge[age], age, lineKeySets.byAge[age]);
    for (const [group, width] of Object.entries(widths)) maxWidths[group] = Math.max(maxWidths[group] || 0, width);
  }

  const starts = {};
  let nextX = 0;
  for (const group of AZTEC_TECHTREE_GROUP_ORDER) {
    starts[group] = nextX;
    nextX += Math.max(maxWidths[group] || 0, 0);
  }
  return starts;
}

function generateAztecDynamicTechTreeTechnologies(age, config) {
  if (config?.baseCulture !== "Aztec") return "";
  const nodes = aztecApplyLineColumnOverridesToNodes(age, config, aztecRawTechTreeNodesForAge(age, config));
  const protectedColumns = config?._aztecTechTreeProtectedColumnsByAge?.[age] || config?._aztecTechTreeProtectedColumns || null;
  const lineMemberKeys = config?._aztecTechTreeLineMemberKeysByAge?.[age] || config?._aztecTechTreeLineMemberKeys || null;
  const normalized = aztecNormalizeTechTreeNodes(age, nodes, config?._aztecTechTreeGroupStarts || null, protectedColumns, lineMemberKeys);
  const body = normalized.map((node) => buildTechTreeNodeXml(node)).join("\n");
  const block = `<local:TechTreeAge.Technologies>
${body}
            </local:TechTreeAge.Technologies>`;
  return applyCustomTechNamesToUiBlock(block, config || {});
}










function applyTechTreeRightSideSelectionFixes(block, age, config) {
  let out = String(block || "");
  out = replaceTechTreeUnitNodeUnits(out, greekHeroReplacementMap(config));
  if (age === "ArchaicAge") {
    out = addSelectedUniqueTechRightSideNodes(out, config);
  }
  return out;
}

function adjustTechTreeAgeTechnologiesForSelections(block, age, config) {
  if (!block) return block;
  let out = block;
  const bestMajor = bestTechTreeMajorForSelectedAge(age, config);
  if (bestMajor && bestMajor !== config.uiTemplateMajor) {
    const alternate = window.AOM_TECHTREE?.ageTechnologiesByMajorAge?.[`${bestMajor}|${age}`];
    if (alternate) out = alternate;
  }
  return applyTechTreeRightSideSelectionFixes(out, age, config);
}

function techTreeBonusTrack(tech, config) {
  const templates = window.AOM_TECHTREE || {};
  const canonical = canonicalMinorTech(tech);
  const block = lookupTemplateBlock(templates.bonusTrackByGod, canonical);
  if (block) return applyCustomTechNamesToUiBlock(block, config);
  return `<local:TechTreeBonusTrack God="${escapeXml(canonical)}">
    <local:TechTreeBonusTrack.Technologies>
    </local:TechTreeBonusTrack.Technologies>
</local:TechTreeBonusTrack>`;
}

function generateTechTreeAge(age, config) {
  const techs = config.minorGods[age] || [];
  const sourceMajor = config.uiTemplateMajor;
  const technologies = techTreeAgeTechnologiesBlock(sourceMajor, age, config);
  return `        <local:TechTreeAge AgeName="${age}">

            <local:TechTreeAge.Bonuses>
${techs.map((tech) => indentBlock(techTreeBonusTrack(tech, config), 4)).join("\n\n")}
            </local:TechTreeAge.Bonuses>
${technologies ? "\n" + indentBlock(technologies, 3) + "\n" : ""}
        </local:TechTreeAge>`;
}

function generateReadme(config) {
  const presetFileName = `${config.internalName}-preset.json`;
  const bonusLines = selectedBonusEntries(config).map((entry) => `- ${entry.sourcePantheon} - ${dynamicBonusLabel(entry, config)}`);
  return `AoM:R Major God Builder export

Major god: ${config.displayName}
Title: ${config.majorTitle}
Pantheon: ${config.baseCulture}
Starting god power: ${config.godPower}${config.godPowerPantheon ? ` (${config.godPowerPantheon})` : ""}
Unique technology: ${uniqueTechNames(config).map(displayTechName).join(", ") || "None"}
God bonuses:
${bonusLines.length ? bonusLines.join("\n") : "- None"}

How to install:
1. Unzip the generated mod folder.
2. Go to C:\Users\UserName\Games\Age of Mythology Retold\SteamID\mods\local
3. Drop the unzipped mod folder there.
4. Start the game and enjoy!

Generated files:
${config.internalName}/${presetFileName}
${config.internalName}/game/data/gameplay/major_gods_mods.xml
${config.internalName}/game/data/gameplay/minor_gods_mods.xml
${config.internalName}/game/data/gameplay/techtree_mods.xml
${config.internalName}/game/data/gameplay/proto_mods.xml
${config.internalName}/game/data/gameplay/powers_mods.xml
${config.internalName}/game/data/strings/English/stringmods.txt
${config.internalName}/game/ui_myth/content/pregame/godpicker/GodPicker_${config.baseCulture}_${config.internalName}.xaml
${config.internalName}/game/ui_myth/content/pregame/techtree/TechTree_${config.baseCulture}_${config.internalName}.xaml
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
  files.push(textFile(`${root}${config.internalName}-preset.json`, JSON.stringify(presetFromConfig(config), null, 2)));
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

function presetFromConfig(config) {
  const preset = {
    displayName: config.displayName,
    majorTitle: config.majorTitle,
    baseCulture: config.baseCulture,
    godPower: config.godPower,
    uniqueTechs: config.uniqueTechs || [],
    bonuses: config.bonuses || [],
    minorGods: config.minorGods || {},
  };

  if (config.majorFocus) preset.majorFocus = config.majorFocus;

  if (config.baseCulture === "Greek") {
    preset.greekHeroes = config.greekHeroes;
    preset.greekUniqueUnit = config.greekUniqueUnit;
  } else if (config.baseCulture === "Chinese") {
    preset.chineseMythicHero = config.chineseMythicHero;
  } else if (config.baseCulture === "Aztec") {
    preset.aztecClassicalForm = config.aztecClassicalForm;
    preset.aztecMythicArrival = config.aztecMythicArrival;
  }

  return preset;
}

function presetFromForm() {
  return presetFromConfig(getConfig());
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
  if (els.sameCultureOnly) els.sameCultureOnly.checked = true;
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

function previewElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined && text !== null) el.textContent = String(text);
  return el;
}

function previewCard(title) {
  const card = previewElement("section", "preview-card");
  if (title) card.appendChild(previewElement("h3", "", title));
  return card;
}

function previewRow(label, value) {
  const row = previewElement("div", "preview-row");
  row.appendChild(previewElement("span", "preview-label", label));
  row.appendChild(previewElement("span", "preview-value", value || "—"));
  return row;
}

function previewList(items, emptyText = "None selected") {
  const ul = previewElement("ul", "preview-list");
  const values = (items || []).filter(Boolean);
  if (!values.length) {
    const li = previewElement("li", "preview-pill");
    li.appendChild(previewElement("span", "preview-value", emptyText));
    ul.appendChild(li);
    return ul;
  }
  for (const item of values) {
    const li = previewElement("li", "preview-pill");
    li.appendChild(previewElement("span", "preview-value", item));
    ul.appendChild(li);
  }
  return ul;
}

function previewValueLine(label, value) {
  const line = previewElement("div", "preview-value-line");
  line.appendChild(previewElement("span", "preview-label", label));
  line.appendChild(previewElement("span", "preview-value", value || "—"));
  return line;
}

const PREVIEW_AGE_ICONS = {
  ArchaicAge: "icons/archaic_age_icon_48x48_round.png",
  ClassicalAge: "icons/classical_age_icon_48x48_round.png",
  HeroicAge: "icons/heroic_age_icon_48x48_round.png",
  MythicAge: "icons/mythic_age_icon_48x48_round.png",
};

const PREVIEW_MINOR_GOD_ICON_FILES = {
  amenouzume: "ame_no_uzume_icon_48x48_round.png",
  inariokami: "inari_okami_icon_48x48_round.png",
  minakatatomi: "minakatatomi_icon_48x48_round.png",

  huehuecoyotl: "Huehuecoyotl_icon_48x48_round.png",
  malinalxochitl: "Malinalxochitl_icon_48x48_round.png",
  patecatl: "Patecatl_icon_48x48_round.png",
  coatlicue: "Coatlicue_icon_48x48_round.png",
  coyolxauhqui: "Coyolxauhqui_icon_48x48_round.png",
  itzpapalotl: "Itzpapalotl_icon_48x48_round.png",
  mictlantecutli: "Mictlantecutli_icon_48x48_round.png",
  tlaloc: "Tlaloc_icon_48x48_round.png",
  xolotl: "Xolotl_icon_48x48_round.png",
};

function previewImage(src, alt, className) {
  const img = document.createElement("img");
  img.className = className || "preview-icon";
  img.src = src;
  img.alt = alt || "";
  img.width = 48;
  img.height = 48;
  img.loading = "lazy";
  return img;
}

let previewMajorGodIconFile = null;
let previewMajorGodIconUrl = "";

function isBrowserPreviewableIconFile(file) {
  if (!file) return false;
  const type = String(file.type || "").toLowerCase();
  const ext = String(file.name || "").split(".").pop().toLowerCase();
  return type === "image/png" || type === "image/jpeg" || ["png", "jpg", "jpeg"].includes(ext);
}

function currentMajorGodIconPreviewUrl() {
  const file = els.iconFile?.files?.[0];
  if (!file || !isBrowserPreviewableIconFile(file)) {
    if (previewMajorGodIconUrl) URL.revokeObjectURL(previewMajorGodIconUrl);
    previewMajorGodIconFile = null;
    previewMajorGodIconUrl = "";
    return "";
  }
  if (previewMajorGodIconFile !== file) {
    if (previewMajorGodIconUrl) URL.revokeObjectURL(previewMajorGodIconUrl);
    previewMajorGodIconFile = file;
    previewMajorGodIconUrl = URL.createObjectURL(file);
  }
  return previewMajorGodIconUrl;
}

function makePreviewMajorGodIcon(src, alt) {
  const frame = previewElement("div", "preview-major-god-icon-frame");
  const img = previewImage(src, alt || "Major god icon", "preview-major-god-icon");
  frame.appendChild(img);
  return frame;
}

async function selectedMajorGodIconDataUrl() {
  const file = els.iconFile?.files?.[0];
  if (!file || !isBrowserPreviewableIconFile(file)) return "";
  try {
    return await blobToDataUrl(file);
  } catch (err) {
    console.warn("Could not read selected major god icon for preview export:", err);
    return "";
  }
}

function previewMinorGodIconPath(god) {
  const rawName = String(god?.name || "");
  const key = rawName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const file = PREVIEW_MINOR_GOD_ICON_FILES[key] || `${key}_icon_48x48_round.png`;
  return `icons/${file}`;
}

function previewMinorGodData(tech) {
  const god = getMinorByTech(tech);
  if (god) {
    return {
      name: displayGodName(god.name),
      icon: previewMinorGodIconPath(god),
    };
  }
  return {
    name: displayTechName(canonicalMinorTech(tech)),
    icon: "",
  };
}

function previewMinorGodTile(minor) {
  const tile = previewElement("div", "preview-minor-god-tile");
  if (minor?.icon) tile.appendChild(previewImage(minor.icon, minor.name, "preview-minor-god-icon"));
  tile.appendChild(previewElement("span", "preview-minor-god-name", minor?.name || "—"));
  return tile;
}

function previewAgeHeader(age) {
  const header = previewElement("div", "preview-age-heading");
  const iconPath = PREVIEW_AGE_ICONS[age];
  if (iconPath) header.appendChild(previewImage(iconPath, ageDisplayName(age), "preview-age-icon"));
  header.appendChild(previewElement("h3", "", ageDisplayName(age)));
  return header;
}

function previewAgeRow(age, minors, extras) {
  const row = previewElement("section", "preview-age-row");
  row.appendChild(previewAgeHeader(age));
  const body = previewElement("div", "preview-age-row-body");

  const ageMinors = (minors || []).filter((minor) => minor?.name);
  const ageExtras = (extras || []).filter(Boolean);
  if (ageMinors.length) {
    const minorTiles = previewElement("div", "preview-minor-god-row");
    for (const minor of ageMinors) minorTiles.appendChild(previewMinorGodTile(minor));
    body.appendChild(minorTiles);
  } else if (!ageExtras.length) {
    const minorTiles = previewElement("div", "preview-minor-god-row");
    const empty = previewElement("div", "preview-minor-god-empty", age === "ArchaicAge" ? "No minor god" : "No minor god selected");
    minorTiles.appendChild(empty);
    body.appendChild(minorTiles);
  }

  if (ageExtras.length) {
    const extrasWrap = previewElement("div", "preview-age-extras");
    for (const item of ageExtras) {
      const [rawLabel, ...rest] = String(item).split(":");
      const label = rest.length ? rawLabel : "Choice";
      const value = rest.length ? rest.join(":").trim() : item;
      extrasWrap.appendChild(previewValueLine(label, value));
    }
    body.appendChild(extrasWrap);
  }

  row.appendChild(body);
  return row;
}

function ageDisplayName(age) {
  return String(age || "").replace("ArchaicAge", "Archaic Age").replace("ClassicalAge", "Classical Age").replace("HeroicAge", "Heroic Age").replace("MythicAge", "Mythic Age");
}

function selectedGodPowerDisplay(config) {
  return displayTechName(config.godPower);
}

function previewMinorGodName(tech) {
  const god = getMinorByTech(tech);
  return god ? displayGodName(god.name) : displayTechName(canonicalMinorTech(tech));
}

function previewGreekHeroForAge(config, age) {
  if (config.baseCulture !== "Greek") return [];
  const map = {
    ArchaicAge: config.greekHeroes?.archaic,
    ClassicalAge: config.greekHeroes?.classical,
    HeroicAge: config.greekHeroes?.heroic,
    MythicAge: config.greekHeroes?.mythic,
  };
  const extras = [];
  if (map[age]) extras.push(`Hero: ${displayGodName(map[age])}`);
  if (age === "MythicAge" && config.greekUniqueUnit) extras.push(`Unique unit: ${displayTechName(config.greekUniqueUnit)}`);
  return extras;
}

function previewChineseSpecialForAge(config, age) {
  if (config.baseCulture !== "Chinese" || age !== "MythicAge") return [];
  return config.chineseMythicHero ? [`Special hero: ${displayTechName(config.chineseMythicHero)}`] : [];
}

function aztecClassicalFormPreviewName(tech) {
  const found = Object.entries(AZTEC_CLASSICAL_FORMS).find(([, data]) => data.tech === tech);
  return found ? found[0] : displayTechName(tech);
}

function aztecMythicArrivalPreviewName(tech) {
  const found = Object.entries(AZTEC_MYTHIC_ARRIVALS).find(([, value]) => value === tech);
  return found ? found[0] : displayTechName(tech);
}

function previewAztecSpecialForAge(config, age) {
  if (config.baseCulture !== "Aztec") return [];
  if (age === "ClassicalAge" && config.aztecClassicalForm) return [`Teixiptla Form: ${aztecClassicalFormPreviewName(config.aztecClassicalForm)}`];
  if (age === "MythicAge" && config.aztecMythicArrival) return [`Incarnate: ${aztecMythicArrivalPreviewName(config.aztecMythicArrival)}`];
  return [];
}


function makePreviewExportButton() {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "secondary preview-export-button";
  button.textContent = "Export picture";
  button.addEventListener("click", async () => {
    await exportGodPreviewImage();
  });
  return button;
}

function collectDocumentCssText() {
  let css = "";
  for (const sheet of Array.from(document.styleSheets || [])) {
    try {
      css += Array.from(sheet.cssRules || []).map((rule) => rule.cssText).join("\n") + "\n";
    } catch (err) {
      // Cross-origin stylesheets cannot be read. This app uses local styles, so
      // this is only a fallback for unusual hosting setups.
    }
  }
  return css;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error || new Error("Could not read image data."));
    reader.readAsDataURL(blob);
  });
}

async function inlinePreviewImages(root) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(images.map(async (img) => {
    const src = img.getAttribute("src");
    if (!src || /^data:/i.test(src)) return;
    try {
      const response = await fetch(new URL(src, document.baseURI).href);
      if (!response.ok) throw new Error(`Could not load ${src}`);
      img.setAttribute("src", await blobToDataUrl(await response.blob()));
    } catch (err) {
      console.warn("Preview export could not embed image:", src, err);
    }
  }));
}

function previewIconDataUrlForCanvas(src) {
  const map = window.AOM_PREVIEW_ICON_DATA_URLS || {};
  const raw = String(src || "");
  if (!raw) return "";
  const clean = raw.replace(/^\.\//, "").replace(/\\/g, "/");
  const file = clean.split("/").pop();
  return map[raw] || map[clean] || map[file] || "";
}

function waitForCanvasImage(src) {
  if (!src) return Promise.resolve(null);
  return new Promise((resolve) => {
    const rawSrc = String(src || "");
    const dataUrl = /^data:/i.test(rawSrc) ? rawSrc : previewIconDataUrlForCanvas(rawSrc);
    // When index.html is opened directly with file://, drawing file:// images to
    // canvas can taint it and block toBlob(). Use embedded data URLs for the
    // bundled preview icons and for the user-selected major-god icon, and skip
    // unknown local images rather than tainting the export canvas.
    if (!dataUrl && window.location?.protocol === "file:") return resolve(null);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    if (!dataUrl) img.crossOrigin = "anonymous";
    img.src = dataUrl || new URL(rawSrc, document.baseURI).href;
  });
}

function canvasFont(size, weight = 700) {
  return `${weight} ${size}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Arial, sans-serif`;
}

function roundRectPath(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function fillRoundRect(ctx, x, y, width, height, radius, fill, stroke) {
  roundRectPath(ctx, x, y, width, height, radius);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawCenteredText(ctx, text, x, y, maxWidth, font, fillStyle, baseline = "middle") {
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = "center";
  ctx.textBaseline = baseline;
  ctx.fillText(String(text || ""), x, y, maxWidth);
}

function drawLeftText(ctx, text, x, y, maxWidth, font, fillStyle, baseline = "middle") {
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = "left";
  ctx.textBaseline = baseline;
  ctx.fillText(String(text || ""), x, y, maxWidth);
}

function wrapCanvasText(ctx, text, maxWidth) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.length ? lines : [""];
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, font, fillStyle) {
  ctx.font = font;
  ctx.fillStyle = fillStyle;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  const lines = wrapCanvasText(ctx, text, maxWidth);
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight, maxWidth));
  return lines.length * lineHeight;
}

function drawCircleImage(ctx, img, cx, cy, size) {
  if (!img) return;
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
  ctx.clip();
  ctx.drawImage(img, cx - size / 2, cy - size / 2, size, size);
  ctx.restore();
}

function previewExportRowsForConfig(config) {
  const rows = [];
  rows.push({ label: "Pantheon", value: config.baseCulture || "—" });
  rows.push({ label: "God power", value: selectedGodPowerDisplay(config) || "—" });
  const uniqueNames = uniqueTechEntries(config).map((group) => displayTechName(group.label || group.id));
  rows.push({ label: "Unique tech", value: uniqueNames.join(", ") || "None" });
  return rows;
}

function previewExportAgesForConfig(config) {
  return PREVIEW_AGES.map((age) => {
    const minors = age === "ArchaicAge" ? [] : (config.minorGods[age] || []).map(previewMinorGodData).filter((minor) => minor?.name);
    const extras = [
      ...previewGreekHeroForAge(config, age),
      ...previewChineseSpecialForAge(config, age),
      ...previewAztecSpecialForAge(config, age),
    ].filter(Boolean);
    if (age === "ArchaicAge" && !minors.length && !extras.length) return null;
    return { age, minors, extras };
  }).filter(Boolean);
}

function previewExportSplitExtra(item) {
  const [rawLabel, ...rest] = String(item).split(":");
  return {
    label: rest.length ? rawLabel : "Choice",
    value: rest.length ? rest.join(":").trim() : String(item),
  };
}

async function exportGodPreviewImage() {
  const config = getConfig();
  const target = els.configPreview;
  if (!target) return setMessage("God preview is unavailable.", true);
  try {
    if (document.fonts?.ready) await document.fonts.ready;

    const width = Math.max(900, Math.ceil(target.getBoundingClientRect().width || 900));
    const pad = 28;
    const gap = 18;
    const innerWidth = width - pad * 2;
    const colors = {
      page: "#120f0b",
      card: "#1d1913",
      cardAlt: "#2a2117",
      row: "#15120f",
      stroke: "rgba(214,169,94,.35)",
      softStroke: "rgba(255,255,255,.12)",
      gold: "#ffd993",
      text: "#fff9ef",
      muted: "#d7c7ae",
      label: "#bba98e",
    };

    const rows = previewExportRowsForConfig(config);
    const bonuses = selectedBonusEntries(config).map((entry) => dynamicBonusLabel(entry, config));
    const ages = previewExportAgesForConfig(config);
    const ageIcons = Object.fromEntries(await Promise.all(Object.entries(PREVIEW_AGE_ICONS).map(async ([age, src]) => [age, await waitForCanvasImage(src)])));
    const minorIconEntries = [];
    for (const age of ages) for (const minor of age.minors || []) if (minor.icon) minorIconEntries.push([minor.icon, await waitForCanvasImage(minor.icon)]);
    const minorIcons = new Map(minorIconEntries);
    const majorIconDataUrl = await selectedMajorGodIconDataUrl();
    const majorIcon = majorIconDataUrl ? await waitForCanvasImage(majorIconDataUrl) : null;

    const measure = document.createElement("canvas").getContext("2d");
    const bonusesHeight = bonuses.length
      ? bonuses.reduce((sum, bonus) => {
          measure.font = canvasFont(18, 750);
          return sum + Math.max(32, wrapCanvasText(measure, bonus, innerWidth - 78).length * 24 + 10);
        }, 62)
      : 98;
    const ageRowHeights = ages.map((entry) => {
      const extras = entry.extras || [];
      const extraHeight = extras.length ? (extras.length * 44 + 10) : 0;
      return Math.max(132, 116 + extraHeight);
    });
    const agesHeight = ages.length ? 58 + ageRowHeights.reduce((a, b) => a + b, 0) + Math.max(0, ages.length - 1) * 12 + 18 : 0;
    const headerHeight = config.majorFocus ? 198 : 176;
    const overviewHeight = 180;
    const height = pad + headerHeight + gap + overviewHeight + gap + bonusesHeight + (agesHeight ? gap + agesHeight : 0) + pad;

    const scale = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(width * scale);
    canvas.height = Math.ceil(height * scale);
    const ctx = canvas.getContext("2d");
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.fillStyle = colors.page;
    ctx.fillRect(0, 0, width, height);

    let y = pad;
    fillRoundRect(ctx, pad, y, innerWidth, headerHeight, 18, colors.cardAlt, colors.stroke);
    const nameText = config.displayName || "My Custom Major God";
    const titleText = config.majorTitle || "";
    const nameFont = canvasFont(56, 900);
    const titleFont = canvasFont(28, 800);
    const focusLabelFont = canvasFont(18, 900);
    const focusValueFont = canvasFont(18, 750);
    if (majorIcon) {
      const iconSize = 96;
      const iconGap = 24;
      const maxTextW = innerWidth - iconSize - iconGap - 120;
      measure.font = nameFont;
      const textW = Math.min(maxTextW, Math.max(measure.measureText(nameText).width, measure.measureText(titleText).width, 220));
      const groupW = iconSize + iconGap + textW;
      const startX = width / 2 - groupW / 2;
      const iconCx = startX + iconSize / 2;
      const textX = startX + iconSize + iconGap;
      drawCircleImage(ctx, majorIcon, iconCx, y + 78, iconSize);
      drawLeftText(ctx, nameText, textX, y + 62, maxTextW, nameFont, colors.gold);
      drawLeftText(ctx, titleText, textX, y + 108, maxTextW, titleFont, colors.muted);
      if (config.majorFocus) {
        ctx.font = focusLabelFont;
        const label = "Focus:";
        const labelWidth = ctx.measureText(label).width;
        drawLeftText(ctx, label, textX, y + 146, labelWidth + 4, focusLabelFont, colors.text);
        drawLeftText(ctx, ` ${config.majorFocus}`, textX + labelWidth, y + 146, maxTextW - labelWidth, focusValueFont, colors.text);
      }
    } else {
      drawCenteredText(ctx, nameText, width / 2, y + 66, innerWidth - 80, nameFont, colors.gold);
      drawCenteredText(ctx, titleText, width / 2, y + 112, innerWidth - 90, titleFont, colors.muted);
      if (config.majorFocus) {
        ctx.font = focusLabelFont;
        const label = "Focus:";
        const labelWidth = ctx.measureText(label).width;
        ctx.font = focusValueFont;
        const value = ` ${config.majorFocus}`;
        const total = labelWidth + ctx.measureText(value).width;
        const start = width / 2 - total / 2;
        drawLeftText(ctx, label, start, y + 150, labelWidth + 4, focusLabelFont, colors.text);
        drawLeftText(ctx, value, start + labelWidth, y + 150, innerWidth - 80, focusValueFont, colors.text);
      }
    }
    y += headerHeight + gap;

    fillRoundRect(ctx, pad, y, innerWidth, overviewHeight, 18, colors.card, colors.stroke);
    drawCenteredText(ctx, "Overview", width / 2, y + 30, innerWidth, canvasFont(18, 850), colors.gold);
    let rowY = y + 58;
    for (const row of rows) {
      const rowX = pad + 86;
      const rowW = innerWidth - 172;
      fillRoundRect(ctx, rowX, rowY, rowW, 42, 12, colors.row, colors.softStroke);
      drawLeftText(ctx, row.label.toUpperCase(), rowX + 18, rowY + 21, 150, canvasFont(14, 900), colors.label);
      drawLeftText(ctx, row.value, rowX + 188, rowY + 21, rowW - 206, canvasFont(18, 800), colors.text);
      rowY += 52;
    }
    y += overviewHeight + gap;

    fillRoundRect(ctx, pad, y, innerWidth, bonusesHeight, 18, colors.card, colors.stroke);
    drawCenteredText(ctx, "God bonuses", width / 2, y + 30, innerWidth, canvasFont(18, 850), colors.gold);
    let bonusY = y + 58;
    if (!bonuses.length) {
      fillRoundRect(ctx, pad + 24, bonusY, innerWidth - 48, 42, 12, colors.row, colors.softStroke);
      drawCenteredText(ctx, "No bonuses selected", width / 2, bonusY + 21, innerWidth - 80, canvasFont(17, 750), colors.label);
    } else {
      for (const bonus of bonuses) {
        measure.font = canvasFont(18, 750);
        const lines = wrapCanvasText(measure, bonus, innerWidth - 86);
        const boxH = Math.max(34, lines.length * 24 + 10);
        fillRoundRect(ctx, pad + 24, bonusY, innerWidth - 48, boxH, 12, colors.row, colors.softStroke);
        drawWrappedText(ctx, `• ${bonus}`, pad + 42, bonusY + 8, innerWidth - 86, 24, canvasFont(18, 750), colors.text);
        bonusY += boxH + 8;
      }
    }
    y += bonusesHeight + gap;

    if (ages.length) {
      fillRoundRect(ctx, pad, y, innerWidth, agesHeight, 18, colors.card, colors.stroke);
      drawCenteredText(ctx, "Minor gods and age choices", width / 2, y + 30, innerWidth, canvasFont(18, 850), colors.gold);
      let ageY = y + 62;
      ages.forEach((entry, index) => {
        const rowH = ageRowHeights[index];
        fillRoundRect(ctx, pad + 20, ageY, innerWidth - 40, rowH, 14, "#211d17", colors.softStroke);
        const leftW = 150;
        const leftX = pad + 20;
        const bodyX = leftX + leftW + 18;
        drawCircleImage(ctx, ageIcons[entry.age], leftX + leftW / 2, ageY + 48, 54);
        drawCenteredText(ctx, ageDisplayName(entry.age), leftX + leftW / 2, ageY + 92, leftW - 12, canvasFont(18, 850), colors.gold);

        const minors = entry.minors || [];
        const tileGap = 18;
        const bodyW = innerWidth - 40 - leftW - 30;
        if (minors.length) {
          const tileW = (bodyW - tileGap) / 2;
          minors.slice(0, 2).forEach((minor, i) => {
            const tx = bodyX + i * (tileW + tileGap);
            fillRoundRect(ctx, tx, ageY + 16, tileW, 82, 14, colors.row, colors.softStroke);
            drawCircleImage(ctx, minorIcons.get(minor.icon), tx + tileW / 2, ageY + 42, 48);
            drawCenteredText(ctx, minor.name, tx + tileW / 2, ageY + 76, tileW - 14, canvasFont(18, 850), colors.text);
          });
        }
        let extraY = minors.length ? ageY + 110 : ageY + 24;
        for (const extra of entry.extras || []) {
          const parts = previewExportSplitExtra(extra);
          fillRoundRect(ctx, bodyX, extraY, bodyW, 42, 12, colors.row, colors.softStroke);
          drawLeftText(ctx, parts.label.toUpperCase(), bodyX + 16, extraY + 21, 150, canvasFont(14, 900), colors.label);
          drawLeftText(ctx, parts.value, bodyX + 176, extraY + 21, bodyW - 196, canvasFont(22, 800), colors.text);
          extraY += 48;
        }
        ageY += rowH + 12;
      });
    }

    const blob = await new Promise((resolve, reject) => {
      canvas.toBlob((result) => result ? resolve(result) : reject(new Error("Could not create PNG image.")), "image/png");
    });
    downloadBlob(blob, `${config.internalName}-preview.png`);
    setMessage("God preview picture exported.");
  } catch (err) {
    console.error(err);
    setMessage(`Could not export god preview picture: ${err.message}`, true);
  }
}

function updatePreview() {
  const config = getConfig();
  const root = els.configPreview;
  if (!root) return;
  root.replaceChildren();

  const header = previewElement("section", "preview-card preview-god-header");
  header.appendChild(makePreviewExportButton());
  const iconUrl = currentMajorGodIconPreviewUrl();
  const identityWrap = previewElement("div", iconUrl ? "preview-god-identity" : "preview-god-identity no-major-icon");
  if (iconUrl) identityWrap.appendChild(makePreviewMajorGodIcon(iconUrl, config.displayName));
  const textWrap = previewElement("div", "preview-god-text");
  textWrap.appendChild(previewElement("h3", "preview-god-name", config.displayName));
  textWrap.appendChild(previewElement("p", "preview-god-title", config.majorTitle));
  if (config.majorFocus) {
    const focus = previewElement("p", "preview-note preview-focus");
    const focusLabel = previewElement("strong", "", "Focus:");
    focus.appendChild(focusLabel);
    focus.appendChild(document.createTextNode(` ${config.majorFocus}`));
    textWrap.appendChild(focus);
  }
  identityWrap.appendChild(textWrap);
  header.appendChild(identityWrap);
  root.appendChild(header);

  const identity = previewCard("Overview");
  identity.classList.add("preview-overview-card");
  identity.appendChild(previewRow("Pantheon", config.baseCulture));
  identity.appendChild(previewRow("God power", selectedGodPowerDisplay(config)));
  const uniqueNames = uniqueTechEntries(config).map((group) => displayTechName(group.label || group.id));
  identity.appendChild(previewRow("Unique tech", uniqueNames.join(", ") || "None"));
  root.appendChild(identity);

  const bonuses = previewCard("God bonuses");
  bonuses.appendChild(previewList(selectedBonusEntries(config).map((entry) => dynamicBonusLabel(entry, config)), "No bonuses selected"));
  root.appendChild(bonuses);

  const agesCard = previewCard("Minor gods and age choices");
  const ageGrid = previewElement("div", "preview-age-grid preview-age-rows");
  for (const age of PREVIEW_AGES) {
    const minors = age === "ArchaicAge" ? [] : (config.minorGods[age] || []).map(previewMinorGodData).filter((minor) => minor?.name);
    const extras = [
      ...previewGreekHeroForAge(config, age),
      ...previewChineseSpecialForAge(config, age),
      ...previewAztecSpecialForAge(config, age),
    ];
    if (age === "ArchaicAge" && !minors.length && !extras.length) continue;
    ageGrid.appendChild(previewAgeRow(age, minors, extras));
  }
  agesCard.appendChild(ageGrid);
  root.appendChild(agesCard);
}


function wireEvents() {
  els.baseMajor.addEventListener("change", () => { initGreekSpecificSelects(true); initChineseSpecificSelects(true); initAztecSpecificSelects(true); initGodPowerSelect(true); initUniqueTechSelects(true); initBonusSelects(true); refreshMinorOptions(true); });
  if (els.sameCultureOnly) els.sameCultureOnly.addEventListener("change", () => refreshMinorOptions(true));
  els.displayName.addEventListener("input", updatePreview);
  if (els.majorTitle) els.majorTitle.addEventListener("input", updatePreview);
  if (els.majorFocus) {
    els.majorFocus.addEventListener("input", updatePreview);
    els.majorFocus.addEventListener("change", updatePreview);
    els.majorFocus.addEventListener("blur", updatePreview);
  }
  els.iconFile.addEventListener("change", updatePreview);
  els.godPower.addEventListener("change", () => { initUniqueTechSelects(true); updatePreview(); });
  for (const select of [els.greekHeroArchaic, els.greekHeroClassical, els.greekHeroHeroic, els.greekHeroMythic, els.greekUniqueUnit, els.chineseMythicHero, els.aztecClassicalForm, els.aztecMythicArrival]) {
    if (select) select.addEventListener("change", updatePreview);
  }
  els.uniqueTech1.addEventListener("change", (event) => { enforceUniqueTechDifference(event.target); enforceChannelsGaiaLushBonusLock(); updatePreview(); });
  if (els.bonusPickers) els.bonusPickers.addEventListener("change", (event) => { enforceBonusDifference(event.target); enforceChannelsGaiaLushBonusLock(); updatePreview(); });
  els.minorPickers.addEventListener("change", (event) => { enforceMinorDifference(event.target); updatePreview(); });
  els.downloadZip.addEventListener("click", handleDownload);
  els.loadPreset.addEventListener("click", () => {
    if (!els.presetFile) return setMessage("Preset file input is unavailable.", true);
    els.presetFile.value = "";
    els.presetFile.click();
  });
  if (els.presetFile) {
    els.presetFile.addEventListener("change", async () => {
      const file = els.presetFile.files && els.presetFile.files[0];
      if (!file) return;
      try {
        const raw = await file.text();
        applyPreset(JSON.parse(raw));
        setMessage(`Preset loaded from ${file.name}.`);
      } catch (err) {
        console.error(err);
        setMessage(`Could not load preset JSON: ${err.message}`, true);
      }
    });
  }
  els.exportPreset.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(presetFromForm(), null, 2)], { type: "application/json" });
    downloadBlob(blob, `${getConfig().internalName}-preset.json`);
    setMessage("Preset JSON exported.");
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
