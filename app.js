/* AoM Retold Major God Creator - static GitHub Pages draft
   This is intentionally backend-free. All files are generated locally in the browser. */

const AGES = ["ClassicalAge", "HeroicAge", "MythicAge"];
const MAX_BONUS_CHOICES = 4;
const EXCLUDED_MINOR_GOD_NAMES = new Set(["malinalxochitldummy"]);


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
const HUITZ_TONALLI_RESOURCES_BONUS_LABEL = "Collecting Tonalli grants resources in addition to favor";
const HUITZ_SHORN_TONALLI_BONUS_LABEL = "Shorn Ones have more hit points. Shorn Ones generate extra Tonalli in combat";
const QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL = "Eagle Warriors gain +1 range in the Heroic and Mythic Ages.Eagle Warriors gain +1 line of sight in the Heroic and Mythic Ages";
const TEZCAT_DEVOTE_FAVOR_BONUS_LABEL = "Devoting Settlers gives higher immediate favor by age";
const TEZCAT_JAGUAR_RIDER_BONUS_LABEL = "Jaguar Riders are available from the Heroic Age";
const TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL = "Every 2 lost trainable myth units can create an Obsidian Shard. Obsidian Shards may summon a free myth unit";

const ORANOS_SKY_PASSAGE_ARCHAIC_EFFECTS = `<effect type="Data" amount="1.00" subtype="Enable" relativity="Absolute">
	<target type="ProtoUnit">SkyPassage</target>
</effect>`;

const ORANOS_SKY_PASSAGE_AGE_EFFECTS = `<effect type="Data" amount="1.00" subtype="BuildLimit" relativity="Absolute">
	<target type="ProtoUnit">SkyPassage</target>
</effect>`;

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

const GAIA_ECON_GUILD_ARCHAIC_EFFECTS = `<effect type="TechStatus" status="obtainable">Plow</effect>
<effect type="TechStatus" status="obtainable">HuntingEquipment</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Wood" relativity="Percent">
	<target type="ProtoUnit">EconomicGuild</target>
</effect>
<effect type="Data" amount="0.65" subtype="Cost" resource="Gold" relativity="Percent">
	<target type="ProtoUnit">EconomicGuild</target>
</effect>
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

const GAIA_ECON_GUILD_CLASSICAL_EFFECTS = `<effect type="TechStatus" status="obtainable">BowSaw</effect>
<effect type="TechStatus" status="obtainable">ShaftMine</effect>
<effect type="TechStatus" status="obtainable">Irrigation</effect>`;

const GAIA_ECON_GUILD_HEROIC_EFFECTS = `<effect type="TechStatus" status="obtainable">Carpenters</effect>
<effect type="TechStatus" status="obtainable">Quarry</effect>
<effect type="TechStatus" status="obtainable">FloodControl</effect>`;

function selectedHasBonusLabel(config, label) {
  return selectedBonusEntries(config).some((entry) => entry.label === label);
}

function bonusTechEffects(config) {
  return selectedBonusEntries(config)
    .map((entry) => {
      if (entry.label === GAIA_ECON_GUILD_BONUS_LABEL) return GAIA_ECON_GUILD_ARCHAIC_EFFECTS;
      if (entry.label === ORANOS_SKY_PASSAGE_BONUS_LABEL) return ORANOS_SKY_PASSAGE_ARCHAIC_EFFECTS;
      if (entry.label === TEZCAT_DEVOTE_FAVOR_BONUS_LABEL) return TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS;
      if (entry.label === KRONOS_EXTRA_MYTH_UNITS_BONUS_LABEL) return "";
      if (entry.label === QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL) return "";
      if (entry.label === TEZCAT_JAGUAR_RIDER_BONUS_LABEL) return "";
      if (entry.label === TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL) return "";
      return sanitizeBonusTechEffects(entry.techEffects || "");
    })
    .filter(Boolean)
    .join("\n");
}

function bonusClassicalTechEffects(config) {
  const effects = [];
  if (selectedHasBonusLabel(config, GAIA_ECON_GUILD_BONUS_LABEL)) effects.push(GAIA_ECON_GUILD_CLASSICAL_EFFECTS);
  if (selectedHasBonusLabel(config, ORANOS_SKY_PASSAGE_BONUS_LABEL)) effects.push(ORANOS_SKY_PASSAGE_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_DEVOTE_FAVOR_BONUS_LABEL)) effects.push(TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) effects.push(TEZCAT_OBSIDIAN_SHARD_CLASSICAL_EFFECTS);
  return effects.filter(Boolean).join("\n");
}
function bonusHeroicTechEffects(config) {
  const effects = [];
  if (selectedHasBonusLabel(config, GAIA_ECON_GUILD_BONUS_LABEL)) effects.push(GAIA_ECON_GUILD_HEROIC_EFFECTS);
  if (selectedHasBonusLabel(config, ORANOS_SKY_PASSAGE_BONUS_LABEL)) effects.push(ORANOS_SKY_PASSAGE_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL)) effects.push(QUETZ_EAGLE_RANGE_LOS_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_DEVOTE_FAVOR_BONUS_LABEL)) effects.push(TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_JAGUAR_RIDER_BONUS_LABEL)) effects.push(TEZCAT_JAGUAR_RIDER_HEROIC_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) effects.push(TEZCAT_OBSIDIAN_SHARD_HEROIC_EFFECTS);
  return effects.filter(Boolean).join("\n");
}
function bonusMythicTechEffects(config) {
  const effects = [];
  if (selectedHasBonusLabel(config, ORANOS_SKY_PASSAGE_BONUS_LABEL)) effects.push(ORANOS_SKY_PASSAGE_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, QUETZ_EAGLE_RANGE_LOS_BONUS_LABEL)) effects.push(QUETZ_EAGLE_RANGE_LOS_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_DEVOTE_FAVOR_BONUS_LABEL)) effects.push(TEZCAT_DEVOTE_FAVOR_AGE_EFFECTS);
  if (selectedHasBonusLabel(config, TEZCAT_OBSIDIAN_SHARD_BONUS_LABEL)) effects.push(TEZCAT_OBSIDIAN_SHARD_MYTHIC_EFFECTS);
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
    .filter((entry) => ![HUITZ_TONALLI_RESOURCES_BONUS_LABEL, HUITZ_SHORN_TONALLI_BONUS_LABEL].includes(entry.label))
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
    const allowed = ["image/png", "image/jpeg", "image/webp"];
    if (!allowed.includes(icon.type)) errors.push("Icon must be PNG, JPG, or WebP.");
    if (icon.size > 2 * 1024 * 1024) errors.push("Icon must be 2 MB or smaller for this draft.");
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
  setText(doc, civ, "key", config.internalName.slice(0, 1).toUpperCase());
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

  const xml = new XMLSerializer().serializeToString(civ);
  return `<civmods>\n${indent(xml, 1)}\n</civmods>\n`;
}


function hasSelectedBonus(config, sourceMajor, label) {
  return selectedBonusEntries(config).some((entry) => entry.sourceMajor === sourceMajor && entry.label === label);
}

function applyMajorGodSpecialBonusPatches(doc, civ, config) {
  if (hasSelectedBonus(config, "Gaia", "Starts with 2 Hero Citizens")) {
    replaceAtlanteanStartingCitizensWithHeroes(civ);
  }
  if (hasSelectedBonus(config, "Huitzilopochtli", HUITZ_TONALLI_RESOURCES_BONUS_LABEL)) {
    insertIntoBountyResourceEarning(doc, civ, HUITZ_TONALLI_RESOURCE_REWARDS);
  }
  if (hasSelectedBonus(config, "Huitzilopochtli", HUITZ_SHORN_TONALLI_BONUS_LABEL)) {
    insertIntoBountyResourceEarning(doc, civ, HUITZ_SHORN_TONALLI_MULTIPLIER);
  }
}

const HUITZ_TONALLI_RESOURCE_REWARDS = `<bountyreward unittype="MilitaryUnit" resourcetype="Favor" condition="Destroy" asspawnedunit="Tonalli">0.75</bountyreward>
<bountyreward unittype="MilitaryUnit" resourcetype="Food" multiplybyunitcost="true" condition="Destroy" asspawnedunit="Tonalli">0.05</bountyreward>
<bountyreward unittype="MilitaryUnit" resourcetype="Wood" multiplybyunitcost="true" condition="Destroy" asspawnedunit="Tonalli">0.05</bountyreward>
<bountyreward unittype="MilitaryUnit" resourcetype="Gold" multiplybyunitcost="true" condition="Destroy" asspawnedunit="Tonalli">0.05</bountyreward>`;

const HUITZ_SHORN_TONALLI_MULTIPLIER = `<bountytargetmultiplier relativity="basepercent" unittype="MilitaryUnit" attackertype="ShornOne" condition="Destroy" resourcetype="Favor">1.0</bountytargetmultiplier>`;

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
${techStatusEffects([...classical, c.classical])}
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
${indentTabBlock(bonusMythicTechEffects(config), 3)}
		</effects>
	</tech>
${kronosExtraMythUnitTechs(config) ? `

	${kronosExtraMythUnitTechs(config)}` : ""}
</techtreemods>\n`;
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
    const ext = icon.type === "image/jpeg" ? "jpg" : icon.type === "image/webp" ? "webp" : "png";
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
  files.push(textFile(`${root}game/data/gameplay/proto_mods.xml`, `<protomods>\n\t<!-- Empty in this draft. -->\n</protomods>\n`));
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
  els.baseMajor.addEventListener("change", () => { initGodPowerSelect(true); initUniqueTechSelects(true); initBonusSelects(true); refreshMinorOptions(true); });
  els.sameCultureOnly.addEventListener("change", () => refreshMinorOptions(true));
  els.displayName.addEventListener("input", updatePreview);
  els.iconFile.addEventListener("change", updatePreview);
  els.godPower.addEventListener("change", () => { initUniqueTechSelects(true); updatePreview(); });
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
initGodPowerSelect(false);
initUniqueTechSelects(false);
initBonusSelects(false);
initMinorPickers();
wireEvents();
updatePreview();
