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
  { id: "SkinOfTheRhino", techs: ["SkinOfTheRhino"], pantheon: "Egyptian", label: "Skin Of The Rhino" },
  { id: "FloodOfTheNile", techs: ["FloodOfTheNile"], pantheon: "All", label: "Flood Of The Nile" },
  { id: "Clairvoyance", techs: ["Clairvoyance"], pantheon: "All", label: "Clairvoyance", requiresGodPower: "Vision" },
  { id: "HammerOfThunder", techs: ["HammerOfThunder"], pantheon: "Norse", label: "Hammer Of Thunder" },
  { id: "Hamask", techs: ["Hamask"], pantheon: "Norse", label: "Hamask" },
  { id: "EyesInTheForest", techs: ["EyesInTheForest"], pantheon: "All", label: "Eyes In The Forest" },
  { id: "FreyrsGift", techs: ["FreyrsGift"], pantheon: "All", label: "Freyr's Gift", extraArchaicEffect: "FreyrTechCostBonus" },
  { id: "TemporalChaos", techs: ["TemporalChaos"], pantheon: "Atlantean", label: "Temporal Chaos" },
  { id: "EmpyreanSpeed", techs: ["EmpyreanSpeed"], pantheon: "All", label: "Empyrean Speed" },
  { id: "Channels", techs: ["Channels"], pantheon: "Atlantean" },
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



const TECH_DISPLAY_NAME_OVERRIDES = {
  FreyrsGift: "Freyr's Gift",
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

const CHINESE_MYTHIC_HEROES = {
  Fuxi: "YangJian",
  Nüwa: "LiJing",
  Shennong: "WenZhong",
};

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
  for (const [major, unit] of Object.entries(GREEK_UNIQUE_UNITS)) {
    const opt = document.createElement("option");
    opt.value = unit;
    opt.textContent = `${major}: ${unit}`;
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
    opt.textContent = `${major}: ${hero}`;
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

function availableUniqueTechGroups() {
  const pantheon = selectedPantheon();
  const godPower = els.godPower.value;
  return UNIQUE_TECH_GROUPS.filter((group) => {
    if (group.pantheon !== "All" && group.pantheon !== pantheon) return false;
    if (group.requiresGodPower && group.requiresGodPower !== godPower) return false;
    return true;
  });
}

function selectedUniqueTechGroups() {
  return [els.uniqueTech1?.value || "", els.uniqueTech2?.value || ""].filter(Boolean);
}

function getUniqueTechGroup(id) {
  return UNIQUE_TECH_GROUPS.find((group) => group.id === id);
}

function uniqueTechEntries(configOrIds) {
  const ids = Array.isArray(configOrIds) ? configOrIds : (configOrIds.uniqueTechs || []);
  return ids.map(getUniqueTechGroup).filter(Boolean);
}

function uniqueTechNames(configOrIds) {
  const seen = new Set();
  const names = [];
  for (const group of uniqueTechEntries(configOrIds)) {
    for (const tech of group.techs) {
      if (!seen.has(tech)) {
        seen.add(tech);
        names.push(tech);
      }
    }
  }
  return names;
}

function initUniqueTechSelects(keep = true) {
  const previous = keep ? selectedUniqueTechGroups() : [];
  const options = availableUniqueTechGroups();
  for (const [index, select] of [els.uniqueTech1, els.uniqueTech2].entries()) {
    if (!select) continue;
    const current = previous[index] || "";
    select.innerHTML = "";
    const none = document.createElement("option");
    none.value = "";
    none.textContent = "None";
    select.appendChild(none);

    const allGroup = document.createElement("optgroup");
    allGroup.label = "Available to all pantheons";
    const pantheonGroup = document.createElement("optgroup");
    pantheonGroup.label = `${selectedPantheon()} only`;

    for (const group of options) {
      const opt = document.createElement("option");
      opt.value = group.id;
      opt.textContent = displayTechName(group.label || group.id);
      opt.title = group.techs.map(displayTechName).join(", ");
      if (group.requiresGodPower) opt.textContent += ` (requires ${group.requiresGodPower})`;
      if (group.pantheon === "All") allGroup.appendChild(opt);
      else pantheonGroup.appendChild(opt);
    }
    if (allGroup.children.length) select.appendChild(allGroup);
    if (pantheonGroup.children.length) select.appendChild(pantheonGroup);

    if (current && options.some((group) => group.id === current)) select.value = current;
    else select.value = "";
  }
  enforceUniqueTechDifference();
}

function enforceUniqueTechDifference(changedSelect) {
  if (!els.uniqueTech1 || !els.uniqueTech2) return;
  if (els.uniqueTech1.value && els.uniqueTech1.value === els.uniqueTech2.value) {
    if (changedSelect === els.uniqueTech1) els.uniqueTech2.value = "";
    else els.uniqueTech1.value = "";
  }
  const one = els.uniqueTech1.value;
  const two = els.uniqueTech2.value;
  for (const opt of els.uniqueTech1.options) opt.disabled = Boolean(two && opt.value === two);
  for (const opt of els.uniqueTech2.options) opt.disabled = Boolean(one && opt.value === one);
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

function selectedBonusEntries(configOrIds) {
  const ids = Array.isArray(configOrIds) ? configOrIds : (configOrIds.bonuses || []);
  return ids.map(getBonusById).filter(Boolean);
}

function initBonusSelects(keep = true) {
  const previous = keep ? selectedBonusIds() : [];
  const options = availableBonuses();
  for (const [index, select] of bonusSelects().entries()) {
    const current = previous[index] || "";
    select.innerHTML = "";
    const none = document.createElement("option");
    none.value = "";
    none.textContent = "None";
    select.appendChild(none);

    for (const sourcePantheon of Array.from(new Set(options.map((entry) => entry.sourcePantheon)))) {
      const group = document.createElement("optgroup");
      group.label = sourcePantheon;
      for (const entry of options.filter((item) => item.sourcePantheon === sourcePantheon)) {
        const opt = document.createElement("option");
        opt.value = entry.id;
        opt.textContent = `${entry.sourceMajor}: ${entry.label}`;
        opt.title = `Allowed: ${(entry.allowedPantheons || []).join(", ")} | Files: ${entry.files}`;
        group.appendChild(opt);
      }
      if (group.children.length) select.appendChild(group);
    }

    if (current && options.some((entry) => entry.id === current)) select.value = current;
    else select.value = "";
  }
  enforceBonusDifference();
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
  }
}

const GAIA_ECON_GUILD_BONUS_LABEL = "Economic Guild and upgrades are cheaper and available earlier";
const KRONOS_EXTRA_MYTH_UNITS_BONUS_LABEL = "Receives 2 free Temple myth units instead of 1 on age-up";
const ORANOS_SKY_PASSAGE_BONUS_LABEL = "Can build a new Sky Passage each age.Units can travel instantly between Sky Passages";
const POSEIDON_SPEED_BY_AGE_BONUS_LABEL = "Cavalry, Caravans, and myth units gain speed by age";
const POSEIDON_STABLE_MARKET_DISCOUNT_BONUS_LABEL = "Stables and Markets are 30% cheaper";
const HUITZ_TONALLI_RESOURCES_BONUS_LABEL = "Collecting Tonalli grants resources in addition to favor";
const HUITZ_CONSTRUCTION_REFUND_BONUS_LABEL = "Temples, Fortress-type building, Village Centers, and Town Centers refund part of their wood/gold cost on completion";
const ZEUS_STARTING_FAVOR_BONUS_LABEL = "Starts with 10 favor";
const ZEUS_COUNTER_CAV_INFANTRY_SPEED_BONUS_LABEL = "Hoplite and other counter-cavalry infantry move 15% faster";
const HUITZ_SHORN_TONALLI_BONUS_LABEL = "Shorn Ones have more hit points. Shorn Ones generate extra Tonalli in combat";
const QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL = "Eagle Warriors gain +1 range in the Heroic and Mythic Ages.Eagle Warriors gain +1 line of sight in the Heroic and Mythic Ages";
const TEZCAT_DEVOTE_FAVOR_BONUS_LABEL = "Devoting Settlers gives higher immediate favor by age";
const TEZCAT_JAGUAR_RIDER_BONUS_LABEL = "Jaguar Riders are available from the Heroic Age";
const TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL = "Every 2 lost trainable myth units can create an Obsidian Shard. Obsidian Shards may summon a free myth unit";
const FUXI_NEZHA_BONUS_LABEL = "Gains access to Nezha in the Classical Age";
const NUWA_FAVORED_LAND_FARTHER_BONUS_LABEL = "Buildings spread Favored Land farther";
const SHENNONG_MYTH_REGEN_FAVORED_LAND_BONUS_LABEL = "Myth units regenerate hit points on Favored Land. Myth-unit regeneration on Favored Land scales by age";
const SHENNONG_GIFT_OF_BEASTS_BONUS_LABEL = "Gift of Beasts summons myth units from the next age as favor is earned";
const SHENNONG_FARM_LINE_UPGRADES_BONUS_LABEL = "Farm Line Upgrades are researched free and instantly in their respective ages";
const SET_ANIMALS_BONUS_LABEL = "Pharaohs can summon Animals of Set. Priests can convert wild animals.Starts with a Baboon of Set.Gets Animals of Set on age-up";
const DEMETER_HERDABLES_TEMPLE_FAVOR_BONUS_LABEL = "Herdables near Temples improve favor-gathering";
const DEMETER_HERDABLES_FATTEN_BONUS_LABEL = "Herdables fatten faster and hold more food";
const DEMETER_HERDABLES_SPAWN_ON_AGE_UP_BONUS_LABEL = "Town Centers and Village Centers spawn herdables on age-up";
const DEMETER_TRAIN_FASTER_BY_AGE_BONUS_LABEL = "Human soldiers and myth units train faster by age";
const HADES_MYTH_HP_BY_AGE_BONUS_LABEL = "Myth units gain bonus hit points by age";
const HADES_RANGED_TECH_DISCOUNT_BONUS_LABEL = "Ranged-soldier technologies are cheaper";
const FREYR_FORTRESS_DAMAGE_BONUS_LABEL = "Fortress-type building units deal +10% damage";
const RA_FORTRESS_HP_BONUS_LABEL = "Fortress-type building units get +15% hit points";
const SET_MILITARY_BUILDING_DISCOUNT_BONUS_LABEL = "Military production buildings including Fortress-type cost 25% less resources excluding favor";

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

const TEZCAT_OBSIDIAN_SHARD_CLASSICAL_EFFECTS = `<effect type="Data" action="MaintainTrainClassical" amount="1.00" subtype="ActionEnable" relativity="Absolute">
	<target type="ProtoUnit">ObsidianShard</target>
</effect>`;

const TEZCAT_OBSIDIAN_SHARD_HEROIC_EFFECTS = `<effect type="Data" action="MaintainTrainHeroic" amount="1.00" subtype="ActionEnable" relativity="Absolute">
	<target type="ProtoUnit">ObsidianShard</target>
</effect>
<effect type="Data" action="MaintainTrainClassical" amount="0.00" subtype="ActionEnable" relativity="Assign">
	<target type="ProtoUnit">ObsidianShard</target>
</effect>`;

const TEZCAT_OBSIDIAN_SHARD_MYTHIC_EFFECTS = `<effect type="Data" action="MaintainTrainMythic" amount="1.00" subtype="ActionEnable" relativity="Absolute">
	<target type="ProtoUnit">ObsidianShard</target>
</effect>
<effect type="Data" action="MaintainTrainHeroic" amount="0.00" subtype="ActionEnable" relativity="Assign">
	<target type="ProtoUnit">ObsidianShard</target>
</effect>`;

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
      if (entry.label === HUITZ_CONSTRUCTION_REFUND_BONUS_LABEL || entry.id === "bonus_87") return huitzConstructionRefundEffects(config);
      if (entry.label === SET_MILITARY_BUILDING_DISCOUNT_BONUS_LABEL || entry.id === "bonus_33") return setMilitaryBuildingDiscountEffects(config);
      if (entry.label === FREYR_FORTRESS_DAMAGE_BONUS_LABEL) return freyrFortressDamageEffects(config);
      if (entry.label === RA_FORTRESS_HP_BONUS_LABEL) return raFortressHitpointsEffects(config);
      if (entry.label === POSEIDON_SPEED_BY_AGE_BONUS_LABEL) return POSEIDON_SPEED_BY_AGE_EFFECTS;
      if (entry.label === POSEIDON_STABLE_MARKET_DISCOUNT_BONUS_LABEL) return poseidonStableMarketDiscountEffects(config);
      if (entry.label === ORANOS_SKY_PASSAGE_BONUS_LABEL) return ORANOS_SKY_PASSAGE_ARCHAIC_EFFECTS;
      if (entry.label === TEZCAT_DEVOTE_FAVOR_BONUS_LABEL) return TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS;
      if (entry.label === KRONOS_EXTRA_MYTH_UNITS_BONUS_LABEL) return "";
      if (entry.label === QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL) return "";
      if (entry.label === TEZCAT_JAGUAR_RIDER_BONUS_LABEL) return "";
      if (entry.label === TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL) return "";
      if (entry.label === FUXI_NEZHA_BONUS_LABEL) return "";
      if (entry.label === SHENNONG_GIFT_OF_BEASTS_BONUS_LABEL) return "";
      if (entry.label === SHENNONG_FARM_LINE_UPGRADES_BONUS_LABEL) return "";
      if (entry.label === SET_ANIMALS_BONUS_LABEL) return SET_ANIMALS_ARCHAIC_EFFECTS;
      if (entry.label === SHENNONG_MYTH_REGEN_FAVORED_LAND_BONUS_LABEL) return SHENNONG_MYTH_REGEN_FAVORED_LAND_AGE_EFFECTS;
      if (entry.label === SUSANOO_BUSHIDO_MYTH_XP_BONUS_LABEL) return SUSANOO_BUSHIDO_MYTH_XP_ARCHAIC_EFFECTS;
      if (entry.label === TSUKUYOMI_FREE_KITSUNE_BONUS_LABEL) return TSUKUYOMI_FREE_KITSUNE_EFFECT;
      if (entry.label === THOR_DWARVEN_ARMORY_BONUS_LABEL) return thorDwarvenArmoryArchaicEffects(config);
      if (entry.label === THOR_DWARF_SPAWN_BONUS_LABEL) return thorDwarfSpawnArchaicEffects(config);
      if (entry.label === "Building repair is free. Gatherers and Dwarves can repair") {
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
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) effects.push(TEZCAT_OBSIDIAN_SHARD_CLASSICAL_EFFECTS);
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
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) effects.push(TEZCAT_OBSIDIAN_SHARD_HEROIC_EFFECTS);
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
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) effects.push(TEZCAT_OBSIDIAN_SHARD_MYTHIC_EFFECTS);
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
    .filter((entry) => ![ZEUS_STARTING_FAVOR_BONUS_LABEL, HUITZ_TONALLI_RESOURCES_BONUS_LABEL, HUITZ_SHORN_TONALLI_BONUS_LABEL, NUWA_FAVORED_LAND_FARTHER_BONUS_LABEL, SET_ANIMALS_BONUS_LABEL, SUSANOO_POWER_COST_FACTOR_BONUS_LABEL, SUSANOO_BUSHIDO_MYTH_XP_BONUS_LABEL, TSUKUYOMI_RESEARCH_BUSHIDO_XP_BONUS_LABEL, ODIN_GREAT_HALL_FAVOR_BONUS_LABEL].includes(entry.label))
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
  if (uniquePicks.length > 2) errors.push("Choose no more than two unique technologies.");
  if (new Set(uniquePicks).size !== uniquePicks.length) errors.push("Unique technology choices must be different.");
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

function applyMajorGodSpecialBonusPatches(doc, civ, config) {
  if (hasSelectedBonus(config, "Zeus", ZEUS_STARTING_FAVOR_BONUS_LABEL)) {
    addZeusStartingFavor(doc, civ);
  }
  if (hasSelectedBonus(config, "Gaia", "Starts with 2 Hero Citizens")) {
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

const SUSANOO_POWER_COST_FACTOR_BONUS_LABEL = "Invoking a god power makes other god powers cheaper to reinvoke";
const SUSANOO_BUSHIDO_MYTH_XP_BONUS_LABEL = "Myth units generate Bushidō XP passively. Myth units generate Bushidō XP in combat";
const SUSANOO_BUSHIDO_MYTH_XP_BOUNTY = `<bountyreward unittype="MythUnit" condition="Damage" combatxp="">2.0</bountyreward>`;

const TSUKUYOMI_FREE_KITSUNE_BONUS_LABEL = "A free Kitsune appears at the Temple on each age-up except Wonder Age";
const TSUKUYOMI_RESEARCH_BUSHIDO_XP_BONUS_LABEL = "Researching technologies grants Bushidō XP";
const TSUKUYOMI_RESEARCH_BUSHIDO_XP_BOUNTY = `<researchreward techtype="all" combatxp="">1.0</researchreward>
<researchcostmultiplier techtype="all" resourcetype="Food">1.0</researchcostmultiplier>
<researchcostmultiplier techtype="all" resourcetype="Wood">1.0</researchcostmultiplier>
<researchcostmultiplier techtype="all" resourcetype="Gold">1.0</researchcostmultiplier>
<researchcostmultiplier techtype="all" resourcetype="Favor">10.0</researchcostmultiplier>
<excludedtechflag>AgeUpgrade</excludedtechflag>
<excludedtechflag>DynamicCost</excludedtechflag>`;
const ODIN_GREAT_HALL_FAVOR_BONUS_LABEL = "Great Hall units generate +25% favor in battle";
const ODIN_GREAT_HALL_FAVOR_BOUNTY = `<bountyreward protounit="Hersir" condition="Damage" resourcetype="Favor">1.25</bountyreward>
<bountyreward protounit="Jarl" condition="Damage" resourcetype="Favor">1.25</bountyreward>
<bountyreward protounit="Godi" condition="Damage" resourcetype="Favor">1.25</bountyreward>
<bountyreward protounit="RaidingCavalry" condition="Damage" resourcetype="Favor">1.25</bountyreward>`;
const ODIN_RAVEN_SCOUTS_BONUS_LABEL = "Two Raven scouts spawn after the first Temple and respawn when killed";
const ODIN_RAVEN_LOS_AGE_EFFECT = `<effect type="Data" amount="2" subtype="LOS" relativity="Absolute">
	<target type="ProtoUnit">Raven</target>
</effect>`;

const THOR_DWARVEN_ARMORY_BONUS_LABEL = "Dwarven Armory can be built and researched in any age.Dwarven Armory has extra upgrades";

const THOR_DWARVEN_ARMORY_CLASSICAL_RESEARCH_RATE_EFFECT = `<effect type="Data" amount="0.67" subtype="ResearchRate" relativity="Absolute">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`;
const THOR_DWARVEN_ARMORY_LATER_RESEARCH_RATE_EFFECT = `<effect type="Data" amount="0.5" subtype="ResearchRate" relativity="Absolute">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`;

function thorDwarvenArmoryBuilderUnits(config) {
  const buildersByPantheon = {
    Greek: [
      { name: "VillagerGreek" },
      { name: "LykaonVillager", orderhint: "3" },
    ],
    Egyptian: [
      { name: "VillagerEgyptian" },
    ],
    Norse: [
      { name: "Gatherer" },
      { name: "Dwarf" },
    ],
    Atlantean: [
      { name: "VillagerAtlantean" },
      { name: "VillagerAtlanteanHero" },
    ],
    Chinese: [
      { name: "VillagerChinese" },
      { name: "VillagerChineseClay" },
    ],
    Japanese: [
      { name: "VillagerJapanese" },
    ],
    Aztec: [
      { name: "VillagerAztec", orderhint: "5" },
    ],
  };
  return buildersByPantheon[config.baseCulture] || [];
}

function thorDwarvenArmoryVillagerCommandEffects(config) {
  return thorDwarvenArmoryBuilderUnits(config).map((builder) => `<effect type="Data" amount="1.00" subtype="CommandRemove" proto="Armory" relativity="Assign">
	<target type="ProtoUnit">${escapeXml(builder.name)}</target>
</effect>
<effect type="Data" amount="1.00" subtype="CommandAdd" proto="DwarvenArmory" row="1" column="5" relativity="Assign">
	<target type="ProtoUnit">${escapeXml(builder.name)}</target>
</effect>`).join("\n");
}

function thorDwarvenArmoryArchaicEffects(config) {
  const effects = [];
  const commandEffects = thorDwarvenArmoryVillagerCommandEffects(config);
  if (commandEffects) effects.push(commandEffects);
  effects.push(`<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">DwarvenArmory</target>
</effect>`);
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
  return effects.join("\n");
}

function thorDwarvenArmoryMinorGodPrereqTechs(config) {
  if (!selectedHasBonusLabel(config, THOR_DWARVEN_ARMORY_BONUS_LABEL)) return "";
  const heroicMinorTechs = (config.minorGods.HeroicAge || []).filter(Boolean);
  return Array.from(new Set(heroicMinorTechs)).map((techName) => `	<tech name="${escapeXml(techName)}">
		<prereqs>
			<typecount unit="DwarvenArmory" count="1.00" state="aliveState" operator="gte" mergemode="add"></typecount>
		</prereqs>
	</tech>`).join("\n\n");
}

const THOR_DWARF_SPAWN_BONUS_LABEL = "Each Dwarven Armory upgrade grants a free Dwarf";

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

function extraGeneratedTechs(config) {
  const extras = [];
  const kronosTechs = kronosExtraMythUnitTechs(config);
  if (kronosTechs) extras.push(`	${kronosTechs}`);
  const thorArmoryPrereqs = thorDwarvenArmoryMinorGodPrereqTechs(config);
  if (thorArmoryPrereqs) extras.push(thorArmoryPrereqs);
  const thorDwarfTech = thorDwarfSpawnExtraTech(config);
  if (thorDwarfTech) extras.push(thorDwarfTech);
  return extras.join("\n\n");
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
  return `<protomods>
	<!-- Empty in this draft. -->
</protomods>
`;
}
function generateMinorGodsMods() {
  return `<minorgodsmods>\n\t<!-- Existing vanilla minor gods are referenced directly, so no new minor god definitions are required for this draft. -->\n</minorgodsmods>\n`;
}

function techStringBase(techName) {
  return `STR_TECH_${sanitizeId(techName).toUpperCase()}`;
}

function generateStringMods(config) {
  return `Language = "English"

// GENERATED BY AOM RETOLD MAJOR GOD CREATOR DRAFT
// Only the mandatory General strings used by major_gods_mods.xml are generated.
// Existing minor-god and age-tech strings remain vanilla.

// GENERAL

ID = "${config.stringPrefix}"   ;   Str = "${escapeStringMod(config.displayName)}"
ID = "${config.stringPrefix}_LR"   ;   Str = "${escapeStringMod(config.displayName)}"
ID = "${config.stringPrefix}_T"   ;   Str = "${escapeStringMod(config.majorTitle)}"
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
God bonuses: ${selectedBonusEntries(config).map((entry) => `${entry.sourceMajor}: ${entry.label}`).join("; ") || "None"}
GodPicker Archaic block generated from the selected god power and unique technologies.
TechTree Archaic block generated from the selected god power and unique technologies.
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
major_gods_mods.xml is generated from the clean pantheon template file, not from a vanilla major god clone. GodPicker and TechTree XAML use compact generated ArchaicAge blocks for the selected god power and unique technologies, plus full vanilla bonus tracks for the selected minor gods. stringmods.txt intentionally contains only the mandatory General strings referenced by major_gods_mods.xml. The remaining likely test points are age-tech effects and whether any selected minor god requires additional gameplay files.
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
  files.push(textFile(`${root}game/data/gameplay/powers_mods.xml`, `<powersmod>\n\t<!-- Empty in this draft. -->\n</powersmod>\n`));
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
    const selects = [els.uniqueTech1, els.uniqueTech2];
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
    pantheon: config.baseCulture,
    majorGodTemplate: config.templateSource,
    pregameUiLayoutFallback: config.uiTemplateMajor,
    startingGodPower: config.godPower,
    godPowerPantheon: config.godPowerPantheon,
    greekChoices: config.baseCulture === "Greek" ? { heroes: config.greekHeroes, mythicUniqueUnit: config.greekUniqueUnit } : undefined,
    chineseChoices: config.baseCulture === "Chinese" ? { mythicSpecialHero: config.chineseMythicHero } : undefined,
    aztecChoices: config.baseCulture === "Aztec" ? { classicalFormTech: config.aztecClassicalForm, mythicArrivalTech: config.aztecMythicArrival } : undefined,
    uniqueTechs: uniqueTechEntries(config).map((group) => ({ choice: displayTechName(group.label || group.id), grants: group.techs.map(displayTechName), internal: group.techs })),
    godBonuses: selectedBonusEntries(config).map((entry) => ({ source: `${entry.sourcePantheon} / ${entry.sourceMajor}`, bonus: entry.label, files: entry.files })),
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
  els.uniqueTech1.addEventListener("change", (event) => { enforceUniqueTechDifference(event.target); updatePreview(); });
  els.uniqueTech2.addEventListener("change", (event) => { enforceUniqueTechDifference(event.target); updatePreview(); });
  if (els.bonusPickers) els.bonusPickers.addEventListener("change", (event) => { enforceBonusDifference(event.target); updatePreview(); });
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
