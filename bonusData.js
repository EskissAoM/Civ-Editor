// AoM:R Major God Builder bonus database
//
// Editing guide:
// - Edit `label` for normal bonus wording shown in the UI, preview, README, and exports.
// - Use `displayLabels` only when a bonus needs pantheon-specific wording.
// - Do not change `id` unless app.js is updated too; IDs are the stable export keys.
// - `majorXml` and `techEffects` are raw export snippets; leave them unchanged unless you know the XML change you need.
//
window.AOM_BONUS_DATA = [
  // Greek — Zeus
  {
    "id": "bonus_1",
    "sourcePantheon": "Greek",
    "sourceMajor": "Zeus",
    "label": "Starts with 10 favor.",
    "allowedPantheons": [
      "All"
    ],
    "files": "major_gods.xml",
    "notes": "Add <favor>10</favor> in Zeus' normal startingresources. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_2",
    "sourcePantheon": "Greek",
    "sourceMajor": "Zeus",
    "label": "Villagers gather favor 20% faster.",
    "allowedPantheons": [
      "Greek"
    ],
    "files": "techtree.xml",
    "notes": "Multiplies Greek villager temple/favor gather work rate by 1.20.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"Gather\" amount=\"1.20\" subtype=\"WorkRate\" unittype=\"AbstractTemple\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">EconomicUpgraded</target>\n</effect>"
  },
  {
    "id": "bonus_3",
    "sourcePantheon": "Greek",
    "sourceMajor": "Zeus",
    "label": "Myth units cost 1 less population.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Subtracts 1 from myth-unit population count.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"-1.00\" subtype=\"PopulationCount\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">MythUnit</target>\n</effect>"
  },
  {
    "id": "bonus_4",
    "sourcePantheon": "Greek",
    "sourceMajor": "Zeus",
    "label": "Infantry deal +60% damage to buildings.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Adds +0.60 absolute building damage bonus on AbstractInfantry HandAttack.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"HandAttack\" amount=\"0.60\" subtype=\"Damagebonus\" unittype=\"Building\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractInfantry</target>\n</effect>"
  },
  {
    "id": "bonus_5",
    "sourcePantheon": "Greek",
    "sourceMajor": "Zeus",
    "label": "Hoplite and other counter-cavalry infantry move 15% faster.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Multiplies the selected pantheon counter-cavalry infantry movement speed by 1.15. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },

  // Greek — Hades
  {
    "id": "bonus_6",
    "sourcePantheon": "Greek",
    "sourceMajor": "Hades",
    "label": "Fallen human soldiers have a 20% chance to return as Shades.",
    "allowedPantheons": [
      "All"
    ],
    "files": "major_gods.xml",
    "notes": "The <chance>0.2</chance> controls the 20% shade return chance.",
    "majorXml": "<shades>\n\t<protounit>HadesShade</protounit>\n\t<targetunit>HumanSoldier</targetunit>\n\t<chance>0.2</chance>\n\t<delay>10.0</delay>\n\t<maxqueued>50</maxqueued>\n</shades>",
    "techEffects": ""
  },
  {
    "id": "bonus_7",
    "sourcePantheon": "Greek",
    "sourceMajor": "Hades",
    "label": "Myth units gain +4% bonus hit points by age.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Each age tech adds a 1.04 BasePercent HP multiplier to MythUnit. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_8",
    "sourcePantheon": "Greek",
    "sourceMajor": "Hades",
    "label": "Ranged soldiers and heroes get +1 extra range and line of sight.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Adds range/LOS to AbstractArcher and Hero targets.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"RangedAttack\" amount=\"1.00\" subtype=\"MaximumRange\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractArcher</target>\n</effect>\n<effect type=\"Data\" action=\"RangedAttack\" amount=\"1.00\" subtype=\"MaximumRange\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Hero</target>\n</effect>\n<effect type=\"Data\" action=\"RangedAttackFlying\" amount=\"1.00\" subtype=\"MaximumRange\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Hero</target>\n</effect>\n<effect type=\"Data\" amount=\"1\" subtype=\"LOS\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractArcher</target>\n</effect>\n<effect type=\"Data\" amount=\"1\" subtype=\"LOS\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Hero</target>\n</effect>"
  },
  {
    "id": "bonus_9",
    "sourcePantheon": "Greek",
    "sourceMajor": "Hades",
    "label": "Ranged-soldier technologies are 33% cheaper.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Pantheon-aware handler applies Ballistics and BurningPitch for all pantheons, then only ranged-soldier technologies relevant to the selected pantheon.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_10",
    "sourcePantheon": "Greek",
    "sourceMajor": "Hades",
    "label": "Ranged fortifications get +2 extra range.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Adds +2 max range to ranged attack on Building.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"RangedAttack\" amount=\"2.00\" subtype=\"MaximumRange\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Building</target>\n</effect>"
  },

  // Greek — Poseidon
  {
    "id": "bonus_11",
    "sourcePantheon": "Greek",
    "sourceMajor": "Poseidon",
    "label": "Militia spawn from razed buildings.",
    "allowedPantheons": [
      "Greek"
    ],
    "files": "major_gods.xml + techtree.xml",
    "notes": "major_gods enables partisans; techtree enables Militia.",
    "majorXml": "<partisans>1</partisans>",
    "techEffects": "<effect type=\"Data\" amount=\"1.00\" subtype=\"Enable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Militia</target>\n</effect>"
  },
  {
    "id": "bonus_12",
    "sourcePantheon": "Greek",
    "sourceMajor": "Poseidon",
    "label": "Cavalry, Caravans, and myth units gain +0.1 speed by age.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Each age adds +0.10 absolute MaximumVelocity to MythUnit, AbstractCavalry, and CaravanGreek. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_13",
    "sourcePantheon": "Greek",
    "sourceMajor": "Poseidon",
    "label": "Stables and Markets are 30% cheaper.",
    "allowedPantheons": [
      "Greek",
      "Japanese"
    ],
    "files": "techtree.xml",
    "notes": "Archaic wood cost discount for Market and Stable. Japanese uses StableJapanese instead of Stable. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_14",
    "sourcePantheon": "Greek",
    "sourceMajor": "Poseidon",
    "label": "Market exchange rates are improved by 15%.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Greek source bonus, allowed for all pantheons. Improves market exchange rates via BuyFactor/SellFactor in ArchaicAge.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"-0.1\" subtype=\"Market\" component=\"BuyFactor\" relativity=\"Absolute\">\n\t<target type=\"Player\"></target>\n</effect>\n<effect type=\"Data\" amount=\"0.1\" subtype=\"Market\" component=\"SellFactor\" relativity=\"Absolute\">\n\t<target type=\"Player\"></target>\n</effect>"
  },
  {
    "id": "bonus_15",
    "sourcePantheon": "Greek",
    "sourceMajor": "Poseidon",
    "label": "A free Hippocampus respawns at the first Dock.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Greek source bonus, allowed for all pantheons. Removed the direct CreateUnit Hippocampus-at-Dock effect; keeps Hippocampus enable and respawn tech obtainable.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"1.00\" subtype=\"Enable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Hippocampus</target>\n</effect>\n<effect type=\"TechStatus\" status=\"obtainable\">HippocampusRespawn</effect>"
  },

  // Greek — Demeter
  {
    "id": "bonus_16",
    "sourcePantheon": "Greek",
    "sourceMajor": "Demeter",
    "label": "Herdables near Temples improve favor-gathering by 3% (up to 30%).",
    "allowedPantheons": [
      "Greek"
    ],
    "files": "techtree.xml",
    "notes": "Adds temple-favor action to herdables and makes temples attract nearby livestock. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_17",
    "sourcePantheon": "Greek",
    "sourceMajor": "Demeter",
    "label": "Town Centers and Village Centers spawn herdables on age-up.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Creates Goat/Pig/Cow from TownCenter, VillageCenter, and CitadelCenter when the relevant Demeter age tech is applied. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_18",
    "sourcePantheon": "Greek",
    "sourceMajor": "Demeter",
    "label": "Village Centers train units 25% faster.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Multiplies VillageCenter training rate by 1.25.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"1.25\" subtype=\"TrainingRate\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">VillageCenter</target>\n</effect>"
  },
  {
    "id": "bonus_19",
    "sourcePantheon": "Greek",
    "sourceMajor": "Demeter",
    "label": "Herdables fatten 40% faster and hold 20% more food.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Increases herdable food autogather/fattening and food carry capacity. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_20",
    "sourcePantheon": "Greek",
    "sourceMajor": "Demeter",
    "label": "Human soldiers and myth units train 10% faster by age.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Each age reduces TrainPoints to 0.90 for HumanSoldier and MythUnit. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },

  // Egyptian — Ra
  {
    "id": "bonus_21",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Ra",
    "label": "Workers gather berries 30% faster.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Multiplies EconomicUpgraded gather work rate from WildCrops by 1.30.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"Gather\" amount=\"1.30\" subtype=\"WorkRate\" unittype=\"WildCrops\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">EconomicUpgraded</target>\n</effect>"
  },
  {
    "id": "bonus_22",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Ra",
    "label": "Fortress-type building units get +15% hit points.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Pantheon-aware handler grants +15% hit points to fortress-type building units for the selected pantheon.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_23",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Ra",
    "label": "Pharaoh-empowered Monuments empower nearby buildings at 60% efficiency.",
    "allowedPantheons": [
      "Egyptian"
    ],
    "files": "techtree.xml",
    "notes": "Enables the MonumentEmpowerAura action on AbstractMonument and displays its 10 range.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"MonumentEmpowerAura\" amount=\"1.00\" subtype=\"ActionEnable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractMonument</target>\n</effect>\n<effect type=\"Data\" amount=\"10.00\" subtype=\"DisplayedRange\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractMonument</target>\n</effect>"
  },
  {
    "id": "bonus_24",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Ra",
    "label": "Priests can empower at 60% efficiency of Pharaoh.",
    "allowedPantheons": [
      "Egyptian"
    ],
    "files": "techtree.xml",
    "notes": "Enables the Empower action for Priest.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"Empower\" amount=\"1.00\" subtype=\"ActionEnable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Priest</target>\n</effect>"
  },

  // Egyptian — Isis
  {
    "id": "bonus_25",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Isis",
    "label": "Monuments block enemy god powers in a 25 range.",
    "allowedPantheons": [
      "Egyptian"
    ],
    "files": "techtree.xml",
    "notes": "Sets god-power block radius on AbstractMonument.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"25.00\" subtype=\"GodPowerBlockRadius\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractMonument</target>\n</effect>"
  },
  {
    "id": "bonus_26",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Isis",
    "label": "Town Centers and Citadel Centers support +5 population.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Adds +5 population cap to socketed Town Center-type buildings.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"5.00\" subtype=\"PopulationCapAddition\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractSocketedTownCenter</target>\n</effect>"
  },
  {
    "id": "bonus_27",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Isis",
    "label": "Most technologies cost 10% less.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Applies cost multipliers to technology targets.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.90\" subtype=\"Cost\" resource=\"Food\" relativity=\"Percent\">\n\t<target type=\"techAll\" ignoreageups=\"\" />\n</effect>\n<effect type=\"Data\" amount=\"0.90\" subtype=\"Cost\" resource=\"Wood\" relativity=\"Percent\">\n\t<target type=\"techAll\" ignoreageups=\"\" />\n</effect>\n<effect type=\"Data\" amount=\"0.90\" subtype=\"Cost\" resource=\"Gold\" relativity=\"Percent\">\n\t<target type=\"techAll\" ignoreageups=\"\" />\n</effect>\n<effect type=\"Data\" amount=\"80.00\" subtype=\"Cost\" resource=\"Food\" relativity=\"Absolute\">\n\t<target type=\"Tech\">SecretsOfTheTitans</target>\n</effect>\n<effect type=\"Data\" amount=\"80.00\" subtype=\"Cost\" resource=\"Gold\" relativity=\"Absolute\">\n\t<target type=\"Tech\">SecretsOfTheTitans</target>\n</effect>\n<effect type=\"Data\" amount=\"80.00\" subtype=\"Cost\" resource=\"Wood\" relativity=\"Absolute\">\n\t<target type=\"Tech\">SecretsOfTheTitans</target>\n</effect>"
  },
  {
    "id": "bonus_28",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Isis",
    "label": "Obelisks are -5 gold cheaper and built 40% faster by Priests.",
    "allowedPantheons": [
      "Egyptian"
    ],
    "files": "techtree.xml",
    "notes": "Modifies Obelisk cost/build-related data.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"-5.00\" subtype=\"cost\" resource=\"Gold\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Obelisk</target>\n</effect>\n<effect type=\"Data\" action=\"Build\" amount=\"1.40\" subtype=\"WorkRate\" unittype=\"Obelisk\" relativity=\"Percent\">\n\t<target type=\"ProtoUnit\">Priest</target>\n</effect>"
  },
  {
    "id": "bonus_29",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Isis",
    "label": "Empowered Monuments heal nearby units by 1 hp/s and generate favor 100% faster.",
    "allowedPantheons": [
      "Egyptian"
    ],
    "files": "techtree.xml",
    "notes": "Enables monument area healing and improves favor-gather rate when empowered.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"Empower\" amount=\"1.667\" subtype=\"EmpowerModify\" empowertype=\"self\" unittype=\"LogicalTypeBuildingThatCanBeEmpowered\" modifytype=\"FavorGatherRate\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">AbstractEmpowerer</target>\n</effect>\n<effect type=\"Data\" action=\"AreaHeal\" amount=\"1.00\" subtype=\"ActionEnable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractMonument</target>\n</effect>"
  },

  // Egyptian — Set
  {
    "id": "bonus_30",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Set",
    "label": "Monuments reduce nearby Barracks and Migdol Stronghold unit costs by 10%.",
    "allowedPantheons": [
      "Egyptian"
    ],
    "files": "techtree.xml",
    "notes": "Enables monument devotee/cost-reduction aura actions.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"DevoteesMedium\" amount=\"1.00\" subtype=\"ActionEnable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractMonument</target>\n</effect>\n<effect type=\"Data\" action=\"DevoteesLarge\" amount=\"1.00\" subtype=\"ActionEnable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractMonument</target>\n</effect>"
  },
  {
    "id": "bonus_31",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Set",
    "label": "Starts with a Baboon of Set and gets Animals of Set on age-up. Pharaohs can summon Animals of Set.",
    "allowedPantheons": [
      "Egyptian"
    ],
    "files": "techtree.xml\nmajor_gods.xml",
    "notes": "Adds animal summon commands to Pharaoh. Adds one BaboonOfSet to Set's starting units. Enables and/or grants Set animal units by age. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_31b",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Set",
    "label": "Priests can convert wild animals.",
    "allowedPantheons": [
      "Egyptian"
    ],
    "files": "techtree.xml",
    "notes": "Enables the Priest Convert action. Split from the original Animals of Set bonus so it can be selected separately.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_32",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Set",
    "label": "Spearmen, Axemen, and Slingers move 5% faster.",
    "allowedPantheons": [
      "Egyptian"
    ],
    "files": "techtree.xml",
    "notes": "Multiplies movement speed by 1.05 for Slinger, Spearman, and Axeman.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"1.05\" subtype=\"MaximumVelocity\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">Slinger</target>\n</effect>\n<effect type=\"Data\" amount=\"1.05\" subtype=\"MaximumVelocity\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">Spearman</target>\n</effect>\n<effect type=\"Data\" amount=\"1.05\" subtype=\"MaximumVelocity\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">Axeman</target>\n</effect>"
  },
  {
    "id": "bonus_33",
    "sourcePantheon": "Egyptian",
    "sourceMajor": "Set",
    "label": "Military production buildings including Fortress-type cost 25% less resources excluding favor.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Pantheon-aware handler. Egyptian keeps original gold-only discounts for MigdolStronghold, Barracks, and SiegeWorks. Other pantheons discount wood-only military buildings and wood+gold fortress-type buildings.",
    "majorXml": "",
    "techEffects": ""
  },

  // Norse — Thor
  {
    "id": "bonus_34",
    "sourcePantheon": "Norse",
    "sourceMajor": "Thor",
    "label": "Starts with Dwarves instead of Gatherers.",
    "allowedPantheons": [
      "Norse"
    ],
    "files": "major_gods.xml",
    "notes": "Thor starting units use VillagerDwarf where Odin/Loki/Freyr use VillagerNorse.",
    "majorXml": "<startingunits>\n\t<unit count=\"3\" delay=\"2.00\" x=\"-4.00\" y=\"0.00\" z=\"-6.00\">VillagerDwarf</unit>\n\t<unit count=\"1\" delay=\"3.00\" x=\"-10.00\" y=\"0.00\" z=\"-5.00\">OxCart</unit>\n\t<unit count=\"1\" delay=\"4.50\" x=\"6.00\" y=\"0.00\" z=\"-5.00\">Berserk</unit>\n</startingunits>",
    "techEffects": ""
  },
  {
    "id": "bonus_35",
    "sourcePantheon": "Norse",
    "sourceMajor": "Thor",
    "label": "Dwarves cost -10 gold and gather food and wood 25% faster.",
    "allowedPantheons": [
      "Norse"
    ],
    "files": "techtree.xml",
    "notes": "Modifies Dwarf cost/gather behavior and enables Dwarven Armory. Removed unintended ThorDwarfSpawn SetOnTechResearchedTech effect; that belongs only to the separate Thor free-Dwarf Armory-upgrade bonus.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"Gather\" amount=\"1.25\" subtype=\"WorkRate\" unittype=\"Huntable\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">VillagerDwarf</target>\n</effect>\n<effect type=\"Data\" action=\"Gather\" amount=\"1.25\" subtype=\"WorkRate\" unittype=\"Herdable\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">VillagerDwarf</target>\n</effect>\n<effect type=\"Data\" action=\"Gather\" amount=\"1.25\" subtype=\"WorkRate\" unittype=\"NonConvertableHerdable\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">VillagerDwarf</target>\n</effect>\n<effect type=\"Data\" action=\"Gather\" amount=\"1.25\" subtype=\"WorkRate\" unittype=\"WildCrops\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">VillagerDwarf</target>\n</effect>\n<effect type=\"Data\" action=\"Gather\" amount=\"1.25\" subtype=\"WorkRate\" unittype=\"AbstractFarm\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">VillagerDwarf</target>\n</effect>\n<effect type=\"Data\" action=\"Gather\" amount=\"1.25\" subtype=\"WorkRate\" unittype=\"WoodResource\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">VillagerDwarf</target>\n</effect>\n<effect type=\"Data\" amount=\"-10.00\" subtype=\"Cost\" resource=\"Gold\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">VillagerDwarf</target>\n</effect>\n"
  },
  {
    "id": "bonus_36",
    "sourcePantheon": "Norse",
    "sourceMajor": "Thor",
    "label": "Dwarven Armory can be built and researched in any age, adding extra upgrades.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Enables DwarvenArmory in ArchaicAgeThor.Makes Thor's extra Dwarven Armory upgrades obtainable. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_37",
    "sourcePantheon": "Norse",
    "sourceMajor": "Thor",
    "label": "Each Dwarven Armory upgrade grants a free Dwarf.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_38",
    "sourcePantheon": "Norse",
    "sourceMajor": "Thor",
    "label": "Technologies researched at Armory are 10% cheaper.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Archaic age special handler uses CostBuildingTechs on Armory by default, or DwarvenArmory when the Thor Dwarven Armory bonus is also selected. Uses concrete building targets instead of AbstractArmory.",
    "majorXml": "",
    "techEffects": ""
  },

  // Norse — Odin
  {
    "id": "bonus_39",
    "sourcePantheon": "Norse",
    "sourceMajor": "Odin",
    "label": "Hunters gather 10% faster.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Multiplies EconomicUpgraded gather work rate from Huntable by 1.1.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"Gather\" amount=\"1.1\" subtype=\"WorkRate\" unittype=\"Huntable\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">EconomicUpgraded</target>\n</effect>"
  },
  {
    "id": "bonus_40",
    "sourcePantheon": "Norse",
    "sourceMajor": "Odin",
    "label": "Great Hall units generate +25% favor in battle.",
    "allowedPantheons": [
      "Norse"
    ],
    "files": "major_gods.xml",
    "notes": "Adds Great Hall unit favor bounty rewards into the existing Norse bountyresourceearning block.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_41",
    "sourcePantheon": "Norse",
    "sourceMajor": "Odin",
    "label": "Human units and heroes regenerate 0.4 hp/s.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Adds 0.4 regen to HumanSoldier and LogicalTypeHealableHero.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.4\" subtype=\"UnitRegenRate\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">HumanSoldier</target>\n</effect>\n<effect type=\"Data\" amount=\"0.4\" subtype=\"UnitRegenRate\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">LogicalTypeHealableHero</target>\n</effect>"
  },
  {
    "id": "bonus_42",
    "sourcePantheon": "Norse",
    "sourceMajor": "Odin",
    "label": "Two Raven scouts spawn after the first Temple and respawn when killed.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Makes Raven-related techs active/obtainable and adds dependent raven units.",
    "majorXml": "",
    "techEffects": "<effect type=\"TechStatus\" status=\"obtainable\">RavenRespawn</effect>\n<effect type=\"TechStatus\" status=\"obtainable\">RavenFirstSpawn</effect>"
  },

  // Norse — Loki
  {
    "id": "bonus_43",
    "sourcePantheon": "Norse",
    "sourceMajor": "Loki",
    "label": "Damaging enemies can spawn myth units.",
    "allowedPantheons": [
      "All"
    ],
    "files": "major_gods.xml",
    "notes": "Norse keeps Hersir/Godi contributors. Other pantheons replace those with <contributor type=\"Hero\">0.15</contributor> while keeping HumanSoldier. Excludes water/special myth units from Loki reward pool.",
    "majorXml": "<bonusunitspawning>\n\t<damagegoal name=\"LokiSpawn\" rewardtracking=\"Single\">\n\t\t<goalamount>1.0</goalamount>\n\t\t<spawnlocation type=\"DamageTarget\" />\n\t\t<reward>MythUnit</reward>\n\t\t<excludefromreward>Dryad</excludefromreward>\n\t\t<excludefromreward>Kraken</excludefromreward>\n\t\t<excludefromreward>JormunElver</excludefromreward>\n\t\t<excludefromreward>Maquizcoatl</excludefromreward>\n\t\t<excludefromreward>PiXiu</excludefromreward>\n\t\t<excludefromreward>ChiWen</excludefromreward>\n\t\t<excludefromreward>XuanWu</excludefromreward>\n\t\t<excludefromreward>Fei</excludefromreward>\n\t\t<excludefromreward>Scylla</excludefromreward>\n\t\t<excludefromreward>Carcinos</excludefromreward>\n\t\t<excludefromreward>Leviathan</excludefromreward>\n\t\t<excludefromreward>WarTurtle</excludefromreward>\n\t\t<excludefromreward>Servant</excludefromreward>\n\t\t<excludefromreward>Nereid</excludefromreward>\n\t\t<excludefromreward>ManOWar</excludefromreward>\n\t\t<excludefromreward>Honengyo</excludefromreward>\n\t\t<excludefromreward>Umibōzu</excludefromreward>\n\t\t<excludefromreward>Axolotl</excludefromreward>\n\t\t<excludefromreward>AxolotlMutant</excludefromreward>\n\t\t<excludedtarget>Building</excludedtarget>\n\t\t<excludedtarget>MythUnit</excludedtarget>\n\t\t<excludedtarget>Huntable</excludedtarget>\n\t\t<contributor unit=\"Hersir\">0.5</contributor>\n\t\t<contributor unit=\"Godi\">0.15</contributor>\n\t\t<contributor type=\"HumanSoldier\">0.15</contributor>\n\t\t<rewardpointcost resourcetype=\"Food\">1.0</rewardpointcost>\n\t\t<rewardpointcost resourcetype=\"Wood\">1.0</rewardpointcost>\n\t\t<rewardpointcost resourcetype=\"Gold\">1.0</rewardpointcost>\n\t\t<rewardpointcost resourcetype=\"Favor\">10.0</rewardpointcost>\n\t</damagegoal>\n</bonusunitspawning>",
    "techEffects": ""
  },
  {
    "id": "bonus_44",
    "sourcePantheon": "Norse",
    "sourceMajor": "Loki",
    "label": "Human soldiers and heroes get 10% bonus counter damage.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Pantheon-aware handler generated from counter-bonus rule database. Adds +0.20 BasePercent Damagebonus using allactions=1 for each selected pantheon record; Hero receives the shared MythUnit counter bonus.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_45",
    "sourcePantheon": "Norse",
    "sourceMajor": "Loki",
    "label": "Military-built buildings are constructed 10% faster.",
    "displayLabels": {
      "Norse": "Infantry units construct buildings 10% faster.",
      "default": "Villagers construct buildings 10% faster."
    },
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Norse uses AbstractInfantry and Godi. Other pantheons use AbstractVillager for Building Build WorkRate. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_46",
    "sourcePantheon": "Norse",
    "sourceMajor": "Loki",
    "label": "Ox Carts are 50% cheaper.",
    "allowedPantheons": [
      "Norse"
    ],
    "files": "techtree.xml",
    "notes": "Applies resource cost reductions to OxCart.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.5\" subtype=\"Cost\" resource=\"Food\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">OxCartBuilding</target>\n</effect>\n<effect type=\"Data\" amount=\"0.5\" subtype=\"Cost\" resource=\"Wood\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">OxCartBuilding</target>\n</effect>\n<effect type=\"Data\" amount=\"0.5\" subtype=\"Cost\" resource=\"Food\" relativity=\"Percent\">\n\t<target type=\"ProtoUnit\">OxCart</target>\n</effect>\n<effect type=\"Data\" amount=\"0.5\" subtype=\"Cost\" resource=\"Wood\" relativity=\"Percent\">\n\t<target type=\"ProtoUnit\">OxCart</target>\n</effect>"
  },
  {
    "id": "bonus_47",
    "sourcePantheon": "Norse",
    "sourceMajor": "Loki",
    "label": "Transforming Gatherers and Dwarves into Berserks is 50% cheaper.",
    "allowedPantheons": [
      "Norse"
    ],
    "files": "techtree.xml",
    "notes": "Reduces food/gold cost on VillagerNorseToBerserk and VillagerDwarfToBerserk.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.5\" subtype=\"Cost\" resource=\"Food\" relativity=\"BasePercent\">\n\t<target type=\"Tech\">VillagerNorseToBerserk</target>\n</effect>\n<effect type=\"Data\" amount=\"0.5\" subtype=\"Cost\" resource=\"Gold\" relativity=\"BasePercent\">\n\t<target type=\"Tech\">VillagerNorseToBerserk</target>\n</effect>\n<effect type=\"Data\" amount=\"0.5\" subtype=\"Cost\" resource=\"Food\" relativity=\"BasePercent\">\n\t<target type=\"Tech\">VillagerDwarfToBerserk</target>\n</effect>\n<effect type=\"Data\" amount=\"0.5\" subtype=\"Cost\" resource=\"Gold\" relativity=\"BasePercent\">\n\t<target type=\"Tech\">VillagerDwarfToBerserk</target>\n</effect>"
  },

  // Norse — Freyr
  {
    "id": "bonus_48",
    "sourcePantheon": "Norse",
    "sourceMajor": "Freyr",
    "label": "Technologies cost 50% less food, wood, and gold but take 150% longer to research.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Freyr adds a broad technology cost reducer via ArchaicAgeFreyr/FreyrTechCostBonus.Multiplies research points by 2.50.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.50\" subtype=\"Cost\" resource=\"Food\" relativity=\"BasePercent\">\n\t<target type=\"techAll\" ignoreageups=\"\" excludetypes=\"HeroPromotion|ResearchableCommand\" />\n</effect>\n<effect type=\"Data\" amount=\"0.50\" subtype=\"Cost\" resource=\"Wood\" relativity=\"BasePercent\">\n\t<target type=\"techAll\" ignoreageups=\"\" excludetypes=\"HeroPromotion|ResearchableCommand\" />\n</effect>\n<effect type=\"Data\" amount=\"0.50\" subtype=\"Cost\" resource=\"Gold\" relativity=\"BasePercent\">\n\t<target type=\"techAll\" ignoreageups=\"\" excludetypes=\"HeroPromotion|ResearchableCommand\" />\n</effect>\n<effect type=\"Data\" amount=\"2.50\" subtype=\"ResearchPoints\" relativity=\"Percent\">\n\t<target type=\"techAll\" ignoreageups=\"\" excludetypes=\"HeroPromotion|ResearchableCommand\" />\n</effect>"
  },
  {
    "id": "bonus_49",
    "sourcePantheon": "Norse",
    "sourceMajor": "Freyr",
    "label": "Fortress-type building units deal +10% damage.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Pantheon-aware handler keeps AbstractFortress damage and applies +10% damage to the selected pantheon fortress-type units.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_50",
    "sourcePantheon": "Norse",
    "sourceMajor": "Freyr",
    "label": "Building repair is free. Gatherers and Dwarves can repair.",
    "displayLabels": {
      "Norse": "Building repair is free. Gatherers and Dwarves can repair.",
      "default": "Building repair is free."
    },
    "allowedPantheons": [
      "All"
    ],
    "files": "major_gods.xml + techtree.xml",
    "notes": "Merged Freyr repair bonus. Building repair is free and Gatherers/Dwarves can repair; selectable for all pantheons.",
    "majorXml": "<buildingrepairfactor>0.0</buildingrepairfactor>",
    "techEffects": "<effect type=\"Data\" action=\"Repair\" amount=\"0.2500\" subtype=\"WorkRate\" unittype=\"AbstractWall\" relativity=\"Assign\">\n\t<target type=\"ProtoUnit\">EconomicUpgraded</target>\n</effect>\n<effect type=\"Data\" action=\"Repair\" amount=\"0.5000\" subtype=\"WorkRate\" unittype=\"Building\" relativity=\"Assign\">\n\t<target type=\"ProtoUnit\">EconomicUpgraded</target>\n</effect>"
  },

  // Atlantean — Kronos
  {
    "id": "bonus_52",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Kronos",
    "label": "Can Time-Shift buildings. Most are free, except Towers and Fortress-type buildings costing 50% of their price.",
    "allowedPantheons": [
      "All"
    ],
    "files": "major_gods.xml",
    "notes": "Pantheon-aware handler fills one <timeshifting maxconcurrenttimeshifts=\"2\"> block with shared and selected-pantheon buildings. Most buildings use costratio 0.0; towers and fortress-type buildings use costratio 0.50.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_53",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Kronos",
    "label": "Buildings construct faster near Manors.",
    "displayLabels": {
      "Atlantean": "Buildings construct 25% faster near Manors.",
      "default": "Buildings construct 12.5% faster near Houses."
    },
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml + proto.xml",
    "notes": "Pantheon-aware handler: Atlantean uses Manor as before; other pantheons use House and add the TemporalScaffolding protoactions to House in proto_mods.xml.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_54",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Kronos",
    "label": "Receives 2 free Temple myth units instead of 1 on age-up.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "KronosExtra* techs create additional free myth units at age-up. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_55",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Kronos",
    "label": "Lost siege and myth units refund 20% of their cost.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Sets resource return rates on AbstractSiegeWeapon and MythUnit.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.20\" subtype=\"ResourceReturnRate\" resource=\"Wood\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractSiegeWeapon</target>\n</effect>\n<effect type=\"Data\" amount=\"0.20\" subtype=\"ResourceReturnRate\" resource=\"Gold\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractSiegeWeapon</target>\n</effect>\n<effect type=\"Data\" amount=\"0.20\" subtype=\"ResourceReturnRate\" resource=\"Food\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">MythUnit</target>\n</effect>\n<effect type=\"Data\" amount=\"0.20\" subtype=\"ResourceReturnRate\" resource=\"Wood\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">MythUnit</target>\n</effect>\n<effect type=\"Data\" amount=\"0.20\" subtype=\"ResourceReturnRate\" resource=\"Gold\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">MythUnit</target>\n</effect>\n<effect type=\"Data\" amount=\"0.20\" subtype=\"ResourceReturnRate\" resource=\"Favor\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">MythUnit</target>\n</effect>\n<effect type=\"Data\" amount=\"0.0\" subtype=\"ResourceReturnRate\" resource=\"Favor\" relativity=\"Assign\">\n\t<target type=\"ProtoUnit\">PrometheanOffspring</target>\n</effect>\n<effect type=\"Data\" amount=\"0.0\" subtype=\"ResourceReturnRate\" resource=\"Food\" relativity=\"Assign\">\n\t<target type=\"ProtoUnit\">PrometheanOffspring</target>\n</effect>"
  },

  // Atlantean — Oranos
  {
    "id": "bonus_56",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Oranos",
    "label": "Villagers can build a new Sky Passage each age, enabling instant travel between them.",
    "displayLabels": {
      "Norse": "Infantry units can build a new Sky Passage each age, enabling instant travel between them.",
      "Egyptian": "Priests can build a new Sky Passage each age, enabling instant travel between them.",
      "default": "Villagers can build a new Sky Passage each age, enabling instant travel between them."
    },
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Enables SkyPassage and adjusts build limit/availability through Oranos age techs. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_57",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Oranos",
    "label": "All units gain +4 line of sight.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Adds +4 LOS to Unit; separate oracle adjustment offsets oracle behavior.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"4\" subtype=\"LOS\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Unit</target>\n</effect>\n<effect type=\"Data\" amount=\"-4\" subtype=\"LOS\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractOracle</target>\n</effect>\n<effect type=\"Data\" action=\"AutoLOS\" amount=\"4.0\" subtype=\"ModifyRateCap\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractOracle</target>\n</effect>\n<effect type=\"Data\" action=\"AutoGatherFavor\" amount=\"4.0\" subtype=\"ModifyRateCap\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractOracle</target>\n</effect>"
  },
  {
    "id": "bonus_58",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Oranos",
    "label": "Damaged enemy units remain visible for 25 seconds.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Adds attaching revealer units to attacks. Duration may be defined on OranosRevealer outside supplied files.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"RangedAttack\" amount=\"1.00\" subtype=\"ActionAddAttachingUnit\" unittype=\"OranosRevealer\" targetunittype=\"Unit\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">HumanSoldier</target>\n</effect>\n<effect type=\"Data\" action=\"HandAttack\" amount=\"1.00\" subtype=\"ActionAddAttachingUnit\" unittype=\"OranosRevealer\" targetunittype=\"Unit\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">HumanSoldier</target>\n</effect>\n<effect type=\"Data\" action=\"RangedAttack\" amount=\"1.00\" subtype=\"ActionAddAttachingUnit\" unittype=\"OranosRevealer\" targetunittype=\"Unit\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Hero</target>\n</effect>\n<effect type=\"Data\" action=\"RangedAttackFlying\" amount=\"1.00\" subtype=\"ActionAddAttachingUnit\" unittype=\"OranosRevealer\" targetunittype=\"Unit\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Hero</target>\n</effect>\n<effect type=\"Data\" action=\"HandAttack\" amount=\"1.00\" subtype=\"ActionAddAttachingUnit\" unittype=\"OranosRevealer\" targetunittype=\"Unit\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Hero</target>\n</effect>"
  },

  // Atlantean — Gaia
  {
    "id": "bonus_59",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Gaia",
    "label": "Economic buildings grow Lush that heals friendly units and buildings by 1hp/s.",
    "allowedPantheons": [
      "All"
    ],
    "files": "major_gods.xml",
    "notes": "Inserts Gaia terraincreeps block on economic buildings; available to all pantheons.",
    "majorXml": "<terraincreeps>\n\t<terraincreep creep=\"GaiaCreep\" maxradius=\"24.0\" growthrate=\"0.50\" decayrate=\"0.5\" minupdateinterval=\"3.0\" maxupdateinterval=\"4.0\" avoidunbuildable=\"\" avoidimpassable=\"\">\n\t\t<protounit>TownCenter</protounit>\n\t\t<protounit>VillageCenter</protounit>\n\t\t<protounit>CitadelCenter</protounit>\n\t\t<protounit>Manor</protounit>\n\t\t<protounit>EconomicGuild</protounit>\n\t\t<protounit>Market</protounit>\n\t\t<protounit>House</protounit>\n\t</terraincreep>\n</terraincreeps>",
    "techEffects": ""
  },
  {
    "id": "bonus_60",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Gaia",
    "label": "Starts with 2 Hero Citizens.",
    "allowedPantheons": [
      "Atlantean"
    ],
    "files": "major_gods.xml",
    "notes": "Special patch: replaces Atlantean starting VillagerAtlantean entries with VillagerAtlanteanHero in normal and deathmatch startingunits.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_61",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Gaia",
    "label": "Citizen hero promotion is 25% cheaper.",
    "allowedPantheons": [
      "Atlantean"
    ],
    "files": "techtree.xml",
    "notes": "Search shows Gaia-specific hero/citizen promotion modifiers in ArchaicAgeGaia.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.75\" subtype=\"Cost\" resource=\"Food\" relativity=\"BasePercent\">\n\t<target type=\"Tech\">VillagerAtlanteanToHero</target>\n</effect>\n<effect type=\"Data\" amount=\"0.75\" subtype=\"Cost\" resource=\"Wood\" relativity=\"BasePercent\">\n\t<target type=\"Tech\">VillagerAtlanteanToHero</target>\n</effect>\n<effect type=\"Data\" amount=\"0.75\" subtype=\"Cost\" resource=\"Favor\" relativity=\"BasePercent\">\n\t<target type=\"Tech\">VillagerAtlanteanToHero</target>\n</effect>"
  },
  {
    "id": "bonus_62",
    "sourcePantheon": "Atlantean",
    "sourceMajor": "Gaia",
    "label": "Economic Guild and upgrades are 35% cheaper and available earlier.",
    "displayLabels": {
      "Atlantean": "Economic Guild and upgrades are 35% cheaper and available earlier.",
      "default": "Standard economic upgrades are 35% cheaper and available earlier."
    },
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Cost reductions and obtainable tech statuses make Economic Guild/economic upgrades cheaper/earlier. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },

  // Chinese — Fuxi
  {
    "id": "bonus_63",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Fuxi",
    "label": "Yin and Yang blessing alternates bonuses. Yin gives a +10% gather-rate boost. Yang gives human and siege units a +10% damage boost.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "CreatePower enables the YinAndYang blessing; internal alternation logic is likely in power files not supplied.",
    "majorXml": "",
    "techEffects": "<effect type=\"CreatePower\" protopower=\"YinAndYang\" />"
  },
  {
    "id": "bonus_64",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Fuxi",
    "label": "Buildings on Favored Land research 300% faster.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "BuildingChainEffect modifies ResearchRate for connected Buildings.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" subtype=\"BuildingChainEffect\" unittype=\"Building\" effecttype=\"Connected\" modifytype=\"ResearchRate\" amount=\"4.000\" relativity=\"Percent\">\n\t<target type=\"Player\" />\n</effect>"
  },
  {
    "id": "bonus_65",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Fuxi",
    "label": "Military Camp and Machine Workshop additions are 25% cheaper on Favored Land.",
    "allowedPantheons": [
      "Chinese"
    ],
    "files": "techtree.xml",
    "notes": "BuildingChainEffect reduces command research cost for connected emplacement/add-on buildings.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" subtype=\"BuildingChainEffect\" unittype=\"EmplacementBuilding\" effecttype=\"Connected\" modifytype=\"CommandResearchCost\" amount=\"0.75\" relativity=\"Percent\">\n\t<target type=\"Player\" />\n</effect>"
  },
  {
    "id": "bonus_66",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Fuxi",
    "label": "Gains access to Nezha in the Classical Age.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Chinese uses existing Nezha age enable/transform effects. Non-Chinese pantheons also add Temple command buttons in Archaic so Nezha can be trained from the Temple. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },

  // Chinese — Nüwa
  {
    "id": "bonus_67",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Nüwa",
    "label": "Creator’s Auspice improves as favor is earned, reducing standard Villager cost by 25% and increasing building hit points by 10% for each tier (up to 75% and 30% respectively).",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml + powers_mods.xml + strings",
    "notes": "Pantheon-aware handler creates ShieldBlessing<Pantheon>, creates the selected power in Archaic, and targets the selected pantheon standard villager.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_68",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Nüwa",
    "label": "Buildings on Favored Land self-construct at 25% speed.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "BuildingChainEffect modifies AutoBuildRate for affected buildings in range.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" subtype=\"BuildingChainEffect\" unittype=\"LogicalTypeAffectedByBuildingChainAutoBuild\" effecttype=\"InRange\" modifytype=\"AutoBuildRate\" amount=\"-0.5\" relativity=\"Absolute\">\n\t<target type=\"Player\" />\n</effect>"
  },
  {
    "id": "bonus_69",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Nüwa",
    "label": "Buildings spread Favored Land 2 range farther.",
    "allowedPantheons": [
      "All"
    ],
    "files": "major_gods.xml",
    "notes": "Handled by app.js favored-land buildingchain generator. Adds +2 to generated chainradius values.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_70",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Nüwa",
    "label": "Cavalry gain +10% hit points.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Adds 1.10 BasePercent HP to AbstractCavalry.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"1.10\" subtype=\"Hitpoints\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">AbstractCavalry</target>\n</effect>"
  },

  // Chinese — Shennong
  {
    "id": "bonus_71",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Shennong",
    "label": "Gift of Beasts summons myth units from the next age as favor is earned.",
    "allowedPantheons": [
      "All"
    ],
    "files": "major_gods.xml",
    "notes": "Excludes water/other special myth units from Shennong reward pool.",
    "majorXml": "<bonusunitspawning>\n\t\t\t<resourcegoal name=\"ShennongSpawn\" rewardtracking=\"Single\">\n\t\t\t\t<agerestricted>true</agerestricted>\n\t\t\t\t<archaicspawn>true</archaicspawn>\n\t\t\t\t<nextageonly>true</nextageonly>\n\t\t\t\t<displayonhud>true</displayonhud>\n\t\t\t\t<displayinfo>\n\t\t\t\t\t<displaynameid>STR_ABILITY_SPAWN_REWARD</displaynameid>\n\t\t\t\t\t<rolloverid>STR_ABILITY_SPAWN_REWARD_LR</rolloverid>\n\t\t\t\t\t<progresstooltipid>STR_ABILITY_SPAWN_REWARD_PROG</progresstooltipid>\n\t\t\t\t\t<nextunittooltipid>STR_ABILITY_SPAWN_REWARD_NEXT_UNIT</nextunittooltipid>\n\t\t\t\t\t<progresstype>SpawnReward</progresstype>\n\t\t\t\t\t<icon>chinese\\static_color\\god_powers\\shennong_gift_classical.png</icon>\n\t\t\t\t\t<notificationsound>GodBlessingCircleComplete</notificationsound>\n\t\t\t\t\t<notificationmessageid>STR_ABILITY_SPAWN_REWARD_NOTIFICATION</notificationmessageid>\n\t\t\t\t</displayinfo>\n\t\t\t\t<goalamount>1</goalamount>\n\t\t\t\t<reward>MythUnit</reward>\n\t\t\t\t<contributor resource=\"Favor\">1.0</contributor>\n\t\t\t\t<excludefromreward>Dryad</excludefromreward>\n\t\t\t\t<excludefromreward>PiXiu</excludefromreward>\n\t\t\t\t<excludefromreward>ChiWen</excludefromreward>\n\t\t\t\t<excludefromreward>XuanWu</excludefromreward>\n\t\t\t\t<excludefromreward>Fei</excludefromreward>\n\t\t\t\t<excludefromreward>Scylla</excludefromreward>\n\t\t\t\t<excludefromreward>Carcinos</excludefromreward>\n\t\t\t\t<excludefromreward>Leviathan</excludefromreward>\n\t\t\t\t<excludefromreward>WarTurtle</excludefromreward>\n\t\t\t\t<excludefromreward>Kraken</excludefromreward>\n\t\t\t\t<excludefromreward>JormunElver</excludefromreward>\n\t\t\t\t<excludefromreward>Servant</excludefromreward>\n\t\t\t\t<excludefromreward>Nereid</excludefromreward>\n\t\t\t\t<excludefromreward>ManOWar</excludefromreward>\n\t\t\t\t<excludefromreward>Honengyo</excludefromreward>\n\t\t\t\t<excludefromreward>Umibōzu</excludefromreward>\n\t\t\t\t<excludefromreward>Axolotl</excludefromreward>\n\t\t\t\t<excludefromreward>AxolotlMutant</excludefromreward>\n\t\t\t\t<spawnlocation type=\"FromBuilding\" landbuilding=\"Temple\" waterbuilding=\"Dock\"></spawnlocation>\n\t\t\t\t<rewardpointcost resourcetype=\"Food\">0.20</rewardpointcost>\n\t\t\t\t<rewardpointcost resourcetype=\"Wood\">0.20</rewardpointcost>\n\t\t\t\t<rewardpointcost resourcetype=\"Gold\">0.20</rewardpointcost>\n\t\t\t\t<rewardpointcost resourcetype=\"Favor\">0.60</rewardpointcost>\n\t\t\t</resourcegoal>\n\t\t</bonusunitspawning>",
    "techEffects": ""
  },
  {
    "id": "bonus_72",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Shennong",
    "label": "Myth units regenerate +1.5 hit points by age on Favored Land up to +6hp/s.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "BuildingChainEffect gives LogicalTypeMythUnitNotTitan a HealRate while in range/on Favored Land.Age techs adjust/stack the BuildingChainEffect HealRate. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_73",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Shennong",
    "label": "Farms are available in the Archaic Age and auto-build on Favored Land.",
    "displayLabels": {
      "Chinese": "Farms are available in the Archaic Age and auto-build on Favored Land.",
      "default": "Farms are available in the Archaic Age."
    },
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Enables Farm/FarmShennong in ArchaicAgeShennong.BuildingChainEffect gives Farm AutoBuildRate while in range.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"1.00\" subtype=\"Enable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">FarmShennong</target>\n</effect>\n<effect type=\"Data\" amount=\"1.00\" subtype=\"Enable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">Farm</target>\n</effect>\n<effect type=\"Data\" subtype=\"BuildingChainEffect\" unittype=\"Farm\" effecttype=\"InRange\" modifytype=\"AutoBuildRate\" amount=\"10.0\" relativity=\"Absolute\">\n\t<target type=\"Player\" />\n</effect>"
  },
  {
    "id": "bonus_74",
    "sourcePantheon": "Chinese",
    "sourceMajor": "Shennong",
    "label": "Farm Line Upgrades are researched for free and instantly in their respective ages.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Special handler: Classical activates Plow; Heroic activates Irrigation except Aztec uses Chinampas; Mythic activates FloodControl.",
    "majorXml": "",
    "techEffects": ""
  },

  // Japanese — Amaterasu
  {
    "id": "bonus_75",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Amaterasu",
    "label": "Way of the Sun grants +1 passive gold by Bushidō tier.",
    "allowedPantheons": [
      "Greek",
      "Egyptian",
      "Norse",
      "Atlantean",
      "Chinese",
      "Japanese"
    ],
    "files": "major_gods.xml / techtree.xml / powers_mods.xml",
    "notes": "Implemented by app.js: creates custom BushidoAmaterasu power, Combat XP major-god data, and pantheon line-upgrade tiers.",
    "majorXml": "",
    "techEffects": "<effect type=\"CreatePower\" protopower=\"BushidoAmaterasu\" />"
  },
  {
    "id": "bonus_76",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Amaterasu",
    "label": "Samurai and Onna-mushas generate Bushidō XP 300% faster.",
    "allowedPantheons": [
      "Japanese"
    ],
    "files": "techtree.xml",
    "notes": "Raises AutoGather CombatXP work rate for Samurai/OnnaMusha.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"AutoGather\" amount=\"4.0\" subtype=\"WorkRate\" unittype=\"CombatXP\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">AbstractSamurai</target>\n</effect>\n<effect type=\"Data\" action=\"AutoGather\" amount=\"4.0\" subtype=\"WorkRate\" unittype=\"CombatXP\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">OnnaMusha</target>\n</effect>"
  },
  {
    "id": "bonus_77",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Amaterasu",
    "label": "Samurai and Onna-mushas regenerate +0.5 hit points, doubled in combat.",
    "allowedPantheons": [
      "Japanese"
    ],
    "files": "techtree.xml",
    "notes": "Adds UnitRegenRate and combat multiplier for Samurai/OnnaMusha.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.5\" subtype=\"UnitRegenRate\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractSamurai</target>\n</effect>\n<effect type=\"Data\" amount=\"0.5\" subtype=\"UnitRegenRate\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">OnnaMusha</target>\n</effect>\n<effect type=\"Data\" amount=\"2.00\" subtype=\"UnitRegenCombatMultiplier\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractSamurai</target>\n</effect>\n<effect type=\"Data\" amount=\"2.00\" subtype=\"UnitRegenCombatMultiplier\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">OnnaMusha</target>\n</effect>"
  },
  {
    "id": "bonus_78",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Amaterasu",
    "label": "Shrines slowly increase nearby resource contents up to 40%.",
    "allowedPantheons": [
      "Japanese"
    ],
    "files": "techtree.xml",
    "notes": "Enables shrine resource inventory aura/cap aura.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"ResourceInventoryAura\" amount=\"1.00\" subtype=\"ActionEnable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractShrineJapanese</target>\n</effect>\n<effect type=\"Data\" action=\"ResourceInventoryCapAura\" amount=\"1.00\" subtype=\"ActionEnable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">AbstractShrineJapanese</target>\n</effect>"
  },

  // Japanese — Tsukuyomi
  {
    "id": "bonus_79",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Tsukuyomi",
    "label": "Way of the Moon gives cavalry and Shinobi +4% attack by Bushidō tier.",
    "displayLabels": {
      "Japanese": "Way of the Moon gives cavalry and Shinobi +4% attack by Bushidō tier.",
      "default": "Way of the Moon gives cavalry +4% attack by Bushidō tier."
    },
    "allowedPantheons": [
      "Greek",
      "Egyptian",
      "Norse",
      "Atlantean",
      "Chinese",
      "Japanese"
    ],
    "files": "major_gods.xml / techtree.xml / powers_mods.xml",
    "notes": "Implemented by app.js: creates custom BushidoTsukuyomi power, Combat XP major-god data, and pantheon line-upgrade tiers.",
    "majorXml": "",
    "techEffects": "<effect type=\"CreatePower\" protopower=\"BushidoTsukuyomi\" />"
  },
  {
    "id": "bonus_80",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Tsukuyomi",
    "label": "Researching technologies grants Bushidō XP equal to their resource cost.",
    "allowedPantheons": [
      "Greek",
      "Egyptian",
      "Norse",
      "Atlantean",
      "Chinese",
      "Japanese"
    ],
    "files": "major_gods.xml",
    "notes": "Adding Research reward and research cost multiplier in major god file Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_81",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Tsukuyomi",
    "label": "Age-up is 33% faster.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Sets AgeUpgrade ResearchPoints to 0.75 percent.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.75\" subtype=\"ResearchPoints\" relativity=\"Percent\">\n\t<target type=\"techWithFlag\">AgeUpgrade</target>\n</effect>"
  },
  {
    "id": "bonus_82",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Tsukuyomi",
    "label": "A free Kitsune appears at the Temple on each age-up except Wonder Age.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Age techs create or enable Kitsune at Temple. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },

  // Japanese — Susanoo
  {
    "id": "bonus_83",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Susanoo",
    "label": "Way of the Storm starts with 15 favor, granting increasingly more favor on Bushidō tier-ups.",
    "allowedPantheons": [
      "Greek",
      "Egyptian",
      "Norse",
      "Atlantean",
      "Chinese",
      "Japanese"
    ],
    "files": "major_gods.xml / techtree.xml / powers_mods.xml",
    "notes": "Implemented by app.js: creates custom BushidoSusanoo power, Combat XP major-god data, and pantheon line-upgrade tiers.",
    "majorXml": "",
    "techEffects": "<effect type=\"CreatePower\" protopower=\"BushidoSusanoo\" />"
  },
  {
    "id": "bonus_84",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Susanoo",
    "label": "Myth units generate Bushidō XP passively (between 0.5XP/s and 3Xp/s depending on their age) and in combat (equal to twice the hit point damage they inflict on enemy units).",
    "allowedPantheons": [
      "Greek",
      "Egyptian",
      "Norse",
      "Atlantean",
      "Chinese",
      "Japanese"
    ],
    "files": "techtree.xml + major_gods.xml",
    "notes": "Enables Autogather on MythUnit / LogicalTypeDependentMyth.\nAdd <bountyreward unittype=\"MythUnit\" condition=\"Damage\" combatxp=\"\">2.0</bountyreward> for myth unit for combat Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_85",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Susanoo",
    "label": "Invoking a god power makes other god powers 20% cheaper to reinvoke.",
    "allowedPantheons": [
      "All"
    ],
    "files": "Major_gods.xml",
    "notes": "Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_86",
    "sourcePantheon": "Japanese",
    "sourceMajor": "Susanoo",
    "label": "Unit abilities recharge 34% faster.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Multiplies Unit RechargeTime by 0.66. [Fixed: Susanoo is Japanese, so this bonus is Japanese-only.]",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.66\" subtype=\"RechargeTime\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">Unit</target>\n</effect>"
  },

  // Aztec — Huitzilopochtli
  {
    "id": "bonus_87",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Huitzilopochtli",
    "label": "Temples, Fortress-type building, Village Centers, and Town Centers refund 25% of their wood/gold cost on completion.",
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Pantheon-aware handler: Temple and AbstractTownCenter are shared; fortress-type target is selected by pantheon (Aztec uses GreatTemple).",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_88",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Huitzilopochtli",
    "label": "Collecting Tonalli grants +5% standard resources in addition to favor.",
    "allowedPantheons": [
      "Aztec"
    ],
    "files": "major_gods.xml",
    "notes": "Add <bountyreward unittype=\"MilitaryUnit\" resourcetype=\"Food\" multiplybyunitcost=\"true\" condition=\"Destroy\" asspawnedunit=\"Tonalli\">0.05</bountyreward>\n\t\t\t<bountyreward unittype=\"MilitaryUnit\" resourcetype=\"Wood\" multipl Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_89",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Huitzilopochtli",
    "label": "Shorn Ones have +10% hit points and generate 100% extra Tonalli in combat.",
    "allowedPantheons": [
      "Aztec"
    ],
    "files": "techtree.xml",
    "notes": "Adds 1.10 BasePercent HP to ShornOne.+ add <bountytargetmultiplier relativity=\"basepercent\" unittype=\"MilitaryUnit\" attackertype=\"ShornOne\" condition=\"Destroy\" resourcetype=\"Favor\">1.0</bountytargetmultiplier> to bounty ",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"1.10\" subtype=\"Hitpoints\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">ShornOne</target>\n</effect>"
  },

  // Aztec — Tezcatlipoca
  {
    "id": "bonus_90",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Tezcatlipoca",
    "label": "Every 2 lost trainable myth units can create an Obsidian Shard that may summons a free myth unit.",
    "allowedPantheons": [
      "All"
    ],
    "files": "major_gods.xml",
    "notes": "Bonus spawning",
    "majorXml": "<bonusunitspawning>\n\t\t\t<deathcountgoal name=\"ObsidianShardSpawn\" rewardtracking=\"Single\">\n\t\t\t\t<culturerestricted>false</culturerestricted>\n\t\t\t\t<ignoreageroll>true</ignoreageroll>\n\t\t\t\t<goalamount>2.0</goalamount>\n\t\t\t\t<contributor type=\"LogicalTypeTrainableMythUnit\">1.0</contributor>\n\t\t\t\t<reward>ObsidianShard</reward>\n\t\t\t\t<spawnlocation type=\"DeathLocation\"></spawnlocation>\n\t\t\t</deathcountgoal>\n\t\t</bonusunitspawning>",
    "techEffects": ""
  },
  {
    "id": "bonus_91",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Tezcatlipoca",
    "label": "Sentry Towers, Spike Traps, and Smoke Traps build 25% faster and deal 25% more damage.",
    "displayLabels": {
      "default": "Sentry Towers build 25% faster and deal 25% more damage.",
      "Aztec": "Sentry Towers, Spike Traps, and Smoke Traps build 25% faster and deal 25% more damage."
    },
    "allowedPantheons": [
      "All"
    ],
    "files": "techtree.xml",
    "notes": "Aztec receives SentryTower and AbstractTrap effects. Other pantheons receive only the SentryTower effects.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"0.75\" subtype=\"BuildPoints\" relativity=\"Percent\">\n\t<target type=\"ProtoUnit\">SentryTower</target>\n</effect>\n<effect type=\"Data\" amount=\"0.75\" subtype=\"BuildPoints\" relativity=\"Percent\">\n\t<target type=\"ProtoUnit\">AbstractTrap</target>\n</effect>\n<effect type=\"Data\" allactions=\"1\" amount=\"1.25\" subtype=\"Damage\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">SentryTower</target>\n</effect>\n<effect type=\"Data\" allactions=\"1\" amount=\"1.25\" subtype=\"Damage\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">AbstractTrap</target>\n</effect>"
  },
  {
    "id": "bonus_92",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Tezcatlipoca",
    "label": "Devoting Settlers gives +10% higher immediate favor by age.",
    "allowedPantheons": [
      "Aztec"
    ],
    "files": "techtree.xml",
    "notes": "Increases DevoteMinor Favor work rate on VillagerAztec, potentially scaling with age. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_93",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Tezcatlipoca",
    "label": "Jaguar Riders are available from the Heroic Age.",
    "allowedPantheons": [
      "Aztec"
    ],
    "files": "techtree.xml",
    "notes": "HeroicAgeTezcatlipoca enables or makes Jaguar Rider tech/unit available. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  },

  // Aztec — Quetzalcoatl
  {
    "id": "bonus_94",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Quetzalcoatl",
    "label": "Warrior Priests generate favor with Bloodletting at Temples.",
    "allowedPantheons": [
      "Aztec"
    ],
    "files": "techtree.xml",
    "notes": "Enables DevoteMinor/Bloodletting action on WarriorPriest.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" action=\"DevoteMinor\" amount=\"1.00\" subtype=\"ActionEnable\" relativity=\"Absolute\">\n\t<target type=\"ProtoUnit\">WarriorPriest</target>\n</effect>"
  },
  {
    "id": "bonus_95",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Quetzalcoatl",
    "label": "Dropsite and their additions cost 33% less.",
    "allowedPantheons": [
      "Greek",
      "Chinese",
      "Japanese",
      "Aztec"
    ],
    "files": "techtree.xml",
    "notes": "Pantheon-aware handler: Aztec keeps original Calpulli/socket effects; Greek, Chinese, and Japanese apply 0.666 Wood cost to their dropsite buildings. Norse, Atlantean, and Egyptian are excluded.",
    "majorXml": "",
    "techEffects": ""
  },
  {
    "id": "bonus_96",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Quetzalcoatl",
    "label": "Noble’s Hut units gain +10% hit points.",
    "allowedPantheons": [
      "Aztec"
    ],
    "files": "techtree.xml",
    "notes": "Adds 1.10 BasePercent HP to Noble's Hut units.",
    "majorXml": "",
    "techEffects": "<effect type=\"Data\" amount=\"1.10\" subtype=\"Hitpoints\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">CoyoteWarrior</target>\n</effect>\n<effect type=\"Data\" amount=\"1.10\" subtype=\"Hitpoints\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">OcelotlWarrior</target>\n</effect>\n<effect type=\"Data\" amount=\"1.10\" subtype=\"Hitpoints\" relativity=\"BasePercent\">\n\t<target type=\"ProtoUnit\">EagleWarrior</target>\n</effect>"
  },
  {
    "id": "bonus_97",
    "sourcePantheon": "Aztec",
    "sourceMajor": "Quetzalcoatl",
    "label": "Eagle Warriors gain +1 range and line of sight in the Heroic and Mythic Ages.",
    "allowedPantheons": [
      "Aztec"
    ],
    "files": "techtree.xml",
    "notes": "Adds +1 MaximumRange to EagleWarrior in Heroic and Mythic age techs.Adds +1 LOS to EagleWarrior in Heroic and Mythic age techs. Raw XML cleared: implemented by app.js special handler.",
    "majorXml": "",
    "techEffects": ""
  }
];
