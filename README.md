# AoM Retold Major God Creator - GitHub Pages Draft

Static, backend-free prototype for generating a custom Age of Mythology: Retold major god mod ZIP in the browser.

## Current features

- Choose a pantheon/culture.
- Choose a custom major god display name.
- Choose a custom major god title for `STR_CIV_<NAME>_T`.
- Internal name is generated automatically from the display name.
- Choose any existing Archaic Age god power, grouped by pantheon.
- Choose up to two major-god unique technologies.
  - Options are filtered by pantheon.
  - `Clairvoyance` only appears when the selected god power is `Vision`.
  - `NepheleanHarpy` is intentionally excluded.
  - Unique technology labels are shown in readable form, while exports keep the exact internal tech IDs. For example, `Olympian Parentage` exports as `OlympianParentage`.
- `Channels` is treated as the exact unique technology only; old leftover entries like `Plow` and `HuntingEquipment` are not granted.
  - `FreyrsGift` adds the extra `SetOnTechResearchedTech` effect for `FreyrTechCostBonus`.
- Choose two existing minor gods for each age.
- Prevents duplicate minor gods in the same age.
- Excludes `malinalxochitldummy`.
- Generates:
  - `major_gods_mods.xml`
  - `minor_gods_mods.xml`
  - `techtree_mods.xml`
  - `stringmods.txt`
  - GodPicker XAML
  - TechTree XAML
  - empty placeholder `proto_mods.xml`
  - empty placeholder `powers_mods.xml`

## GitHub Pages usage

Upload these files to a GitHub repository root:

- `index.html`
- `style.css`
- `app.js`
- `aomData.js`
- `godPickerTemplates.js`
- `techTreeTemplates.js`
- `bonusData.js`
- `majorGodTemplates.js`
- `README.md`

Then enable GitHub Pages from **Settings → Pages → Deploy from branch → main → root**.

## Notes

The app generates the ZIP locally in the user's browser. Nothing is uploaded to a server.

The generated ArchaicAge block now includes:

- selected god power node/effect
- selected unique tech nodes/effects
- selected god-bonus techtree effects from `bonusData.js`
- `ArchaicAgeWeakenUnits`
- the extra Freyr cost-bonus effect when `FreyrsGift` is chosen

The generated strings are intentionally limited to the mandatory General strings referenced from `major_gods_mods.xml`.


## God bonus implementation notes

This draft adds up to four major-god bonuses from `major_god_bonus_implementation_map_v1.xlsx`. Bonuses are filtered by the selected pantheon using the compatibility column.

Runtime behavior:

- `major_gods.xml` snippets are inserted into `major_gods_mods.xml`. `startingresources` and `startingunits` replace the template's matching sections; standalone `<unit>` snippets are appended under `<startingunits>`.
- `techtree.xml` snippets are inserted into the custom Archaic Age tech in `techtree_mods.xml`, so they activate at game start.
- Complex age-scaling bonuses may still need refinement if the effect should be split across Classical/Heroic/Mythic instead of applied immediately.


## Latest fixes

- Unique technology labels now display as readable names, for example `Olympian Parentage`, while exported XML still uses `OlympianParentage`.
- Susanoo's `Unit abilities recharge faster` bonus keeps Japanese/Susanoo as its source, but is allowed for all pantheons.
- Bonus techtree snippets are sanitized so copied vanilla minor-god age unlocks such as `HeroicAgeTheia`, `HeroicAgeRheia`, or `HeroicAgeGaia` are not injected into the generated custom Archaic age tech. Minor-god age unlocks should only come from the user-selected minor-god dropdowns.
- `major_gods_mods.xml` is now generated from `majorGodTemplates.js`, which comes from the clean `major_gods_template.xml` pantheon templates, instead of cloning a vanilla major god.

## Pantheon template change

The generator no longer clones Zeus/Ra/Kronos/etc. for `major_gods_mods.xml`. It starts from the clean pantheon template matching the selected pantheon, then patches only the custom major god name, string IDs, ArchaicAge tech, optional custom icon, and selected major-god bonus snippets. This is intended to prevent vanilla major-god-specific data from leaking into unrelated custom gods.


## Latest fix

- Kronos bonus `Buildings construct faster near Manors` now also adds `ProtoUnitFlag DisplayRange` to `Manor` in the generated Archaic age tech.

- Fixed Oranos bonus “All units gain +4 line of sight” to also add the AbstractOracle AutoGatherFavor ModifyRateCap effect to the generated Archaic age tech.

## Latest Gaia bonus fixes

- `Gaia - Starts with 2 Hero Citizens` now patches `major_gods_mods.xml` by replacing `VillagerAtlantean` with `VillagerAtlanteanHero` inside both normal and deathmatch `<startingunits>` blocks instead of appending an extra unit line.
- `Gaia - Economic buildings grow Lush. Lush heals friendly units and buildings` is now available to all pantheons and inserts the full `terraincreeps` block, including `House`.

## Kronos extra myth-unit bonus

The Kronos bonus **Receives 2 free Temple myth units instead of 1 on age-up** is now handled as a special case.

When selected, the generator:

- Adds `CustomExtra<MythUnit>` obtainability effects to the custom age tech before the relevant minor-god age choice becomes active.
- Generates one hidden extra tech per selected minor-god option.
- Uses `minorGodMythUnits.js` as the minor-god → temple myth-unit mapping.

Example:

```xml
<effect type="TechStatus" status="obtainable">MyCustomExtraSatyr</effect>
```

and:

```xml
<tech name="MyCustomExtraSatyr">
  <prereqs>
    <techstatus status="Active">HeroicAgeHyperion</techstatus>
  </prereqs>
  <effects>
    <effect type="CreateUnit" unit="Satyr" generator="AbstractTemple">
      <pattern type="Leaving" speed="0.00" radius="0.00" quantity="1.00" minradius="0.00">
        <offset x="-5.00" y="0.00" z="0.00"></offset>
      </pattern>
    </effect>
  </effects>
</tech>
```


## Kronos extra myth-unit mapping update

The `minorGodMythUnits.js` database is now extracted from `techtree(2).xml` by scanning each `ClassicalAge*`, `HeroicAge*`, and `MythicAge*` tech for the first temple-created myth unit (`<effect type="CreateUnit" ... generator="...Temple">`). `ClassicalAgeMalinalxochitlDummy` is excluded.

This database drives the Kronos bonus `Receives 2 free Temple myth units instead of 1 on age-up`.


## Kronos myth-unit map corrections

Applied manual corrections:

- Removed Set animal rows: `ClassicalAgeSet`, `HeroicAgeSet`, `MythicAgeSet`.
- Removed Tsukuyomi Kitsune rows: `ClassicalAgeTsukuyomi`, `HeroicAgeTsukuyomi`, `MythicAgeTsukuyomi`.
- Forced `HeroicAgeSobek` to `Petsuchos` with count `1` in the verification CSV.

The generator itself creates one extra unit per selected minor god, using `AbstractTemple`, as requested for the Kronos bonus template.


## Latest Aztec bonus fixes

- Quetzalcoatl Eagle Warrior range/LOS bonus is now applied only in HeroicAge and MythicAge custom techs.
- Tezcatlipoca Devoting Settlers favor bonus is now applied once in Archaic, Classical, Heroic, and Mythic custom age techs.
- Tezcatlipoca Jaguar Rider bonus is now applied only in HeroicAge custom tech.

## Latest change

- Added special handling for Tezcatlipoca — Every 2 lost trainable myth units can create an Obsidian Shard.
- The major_gods.xml bonus spawning block remains in major_gods_mods.xml.
- Companion ObsidianShard action enables are now split by age:
  - ClassicalAge<CustomGod>: enables MaintainTrainClassical.
  - HeroicAge<CustomGod>: enables MaintainTrainHeroic and disables MaintainTrainClassical.
  - MythicAge<CustomGod>: enables MaintainTrainMythic and disables MaintainTrainHeroic.

## Update - Fuxi Nezha age handling

The bonus `Fuxi - Gains access to Nezha in the Classical Age` is now handled as a special age-split bonus:

- `ClassicalAge<CustomGod>` enables `NezhaChild`.
- `HeroicAge<CustomGod>` disables `NezhaChild`, enables `NezhaYouth`, and transforms queued/existing `NezhaChild` into `NezhaYouth`.
- `MythicAge<CustomGod>` disables `NezhaYouth`, enables `Nezha`, and transforms queued/existing `NezhaYouth` into `Nezha`.

## Latest Chinese bonus fixes

- Nüwa — Buildings spread Favored Land farther: now replaces the existing `<buildingchain>` block in `major_gods_mods.xml` instead of appending a second one.
- Shennong — Myth units regenerate hit points on Favored Land: now adds one `BuildingChainEffect` heal-rate effect to each custom age tech: Archaic, Classical, Heroic, and Mythic.

## Latest Shennong bonus fixes

- `Gift of Beasts summons myth units from the next age as favor is earned` keeps its existing `major_gods.xml` behavior and now adds the required techtree buff icon overrides:
  - `ClassicalAge<CustomGod>`: `STR_CIV_SHENNONG_GIFT_ICON_AGE_HEROIC`
  - `HeroicAge<CustomGod>`: `STR_CIV_SHENNONG_GIFT_ICON_AGE_MYTHIC`
- Renamed `Plow, Irrigation, and Flood Control are researched free and instantly in their respective ages` to `Farm Line Upgrades are researched free and instantly in their respective ages`.
- The farm-line bonus is now sourced as `Chinese / Shennong`, allowed for all pantheons, and handled by age:
  - `ClassicalAge<CustomGod>` activates `Plow`
  - `HeroicAge<CustomGod>` activates `Irrigation`, except Aztec activates `Chinampas`
  - `MythicAge<CustomGod>` activates `FloodControl`, except Aztec receives no Mythic farm-line effect


## Latest fix

- Ra — Pharaoh-empowered Monuments empower nearby buildings now also adds `DisplayedRange` 10.00 to `AbstractMonument` in `ArchaicAge<CustomGod>`.

## Latest change

Set bonus `Pharaohs can summon Animals of Set. Priests can convert wild animals.Starts with a Baboon of Set.Gets Animals of Set on age-up` is now handled as a special case:
- adds `BaboonOfSet` to `startingunits mode="deathmatch"` in `major_gods_mods.xml`
- adds Pharaoh / PharaohNewKingdom animal summon commands in Archaic
- adds Hyena/Gazelle age-up units and enables in Classical
- adds Crocodile/Giraffe age-up units and enables in Heroic
- adds Rhinoceros/Hippopotamus age-up units and enables Rhinoceros/Hippopotamus/Elephant in Mythic

## Latest fix

Set animal bonus now also adds Priest Convert enablement to `ArchaicAge<CustomGod>`:

```xml
<effect type="Data" action="Convert" amount="1.00" subtype="ActionEnable" relativity="Absolute">
  <target type="ProtoUnit">Priest</target>
</effect>
```

### Latest fix

Set's Animals of Set bonus now adds `BaboonOfSet` to both normal `<startingunits>` and `<startingunits mode="deathmatch">` in `major_gods_mods.xml`.

## Latest change

- Fixed Demeter — Herdables near Temples improve favor-gathering: generated Archaic age tech now uses the explicit TempleFavorBonus, HerdableMagnet, and MoveNearbyLiveStockToUnit effects.
- Fixed Demeter — Herdables fatten faster and hold more food: generated Archaic age tech now only adds the fatten/carry effects, without leaking the Temple favor-gathering effects.


## Latest fix

Demeter — Town Centers and Village Centers spawn herdables on age-up now adds Goat effects to ClassicalAge<CustomGod>, Pig effects to HeroicAge<CustomGod>, and Cow effects to MythicAge<CustomGod>.


## Latest fix

- Demeter — Human soldiers and myth units train faster by age: now adds the train-time effects once in each custom age tech from Archaic through Mythic.
- Hades — Myth units gain bonus hit points by age: now adds the 1.04 MythUnit hitpoint effect once in each custom age tech from Archaic through Mythic.


## Latest fix

- Hades — Ranged soldiers and heroes get extra range and line of sight: removed the unintended Building +2 RangedAttack MaximumRange effect from this bonus. The separate fortification range bonus remains unchanged.


## Latest fix

- Hades — Ranged-soldier technologies are cheaper now uses the corrected full cost-reduction list, including SunRay and ShaftsOfPlague.


## Latest fix

- Poseidon — Cavalry, Caravans, and myth units gain speed by age now adds MythUnit, AbstractCavalry, and TradeUnit +0.10 MaximumVelocity once in each custom age tech from Archaic through Mythic.


## Latest fixes

- Poseidon — A free Hippocampus respawns at the first Dock: allowed for all pantheons and removed the direct `CreateUnit` Hippocampus-at-Dock effect.
- Poseidon — Market exchange rates are improved by 15%: allowed for all pantheons and now adds only BuyFactor/SellFactor effects in ArchaicAge.
- Poseidon — Stables and Markets are 30% cheaper: confirmed ArchaicAge effects for Market and Stable wood cost at 70%.

## Latest fix
- Poseidon — Cavalry, Caravans, and myth units gain speed by age now adds the speed block exactly once in Archaic, Classical, Heroic, and Mythic age techs. The accidental triple insertion in Classical was removed.


## Latest fix

- Susanoo — Invoking a god power makes other god powers cheaper to reinvoke now adds `<oncastpowercostfactor>0.80</oncastpowercostfactor>` as a clean separate line before `</civ>` in `major_gods_mods.xml`.


## Latest fix

- Susanoo — Myth units generate Bushidō XP passively / in combat now inserts the MythUnit combat XP bounty into existing bountyresourceearning and adds the exact Archaic-age Autogather CombatXP effects.

## Latest fixes

- Tsukuyomi — A free Kitsune appears at the Temple on each age-up except Wonder Age:
  - Adds one Kitsune CreateUnit effect to Archaic, Classical, Heroic, and Mythic custom age techs.
- Tsukuyomi — Researching technologies grants Bushidō XP:
  - Inserts only the research reward/cost multiplier entries into the existing bountyresourceearning block.


## Latest fix

- Added Norse Classical Age special case: Armory enabled and CopperWeapons, CopperArmor, CopperShields, and Ballistics become obtainable in ClassicalAge<CustomGod>.


## Latest change

Norse custom major gods now receive the special Armory upgrade unlocks by age:

- Classical: Armory, CopperWeapons, CopperArmor, CopperShields, Ballistics
- Heroic: BronzeWeapons, BronzeArmor, BronzeShields
- Mythic: IronWeapons, IronArmor, IronShields, BurningPitch


## Latest fix

- Odin — Two Raven scouts spawn after the first Temple and respawn when killed: Classical, Heroic, and Mythic age techs now each add +2 LOS to Raven, while the Archaic tech keeps the existing RavenRespawn/RavenFirstSpawn unlocks.

## Latest fix

- Removed the two `OxCartBuilding` cost effects from Loki — Military-built buildings are constructed faster.
- The Ox Cart cost effects remain only on the separate Loki — Ox Carts are cheaper bonus.

## Latest fix

- Thor — Dwarves cost less gold and gather food and wood faster: removed the unintended `<effect type="SetOnTechResearchedTech" amount="1.00" techtype="ArmoryTechnology">ThorDwarfSpawn</effect>` entry. The free-Dwarf-on-Armory-upgrade trigger remains only on the separate Thor bonus.


## Latest fix

- Added the mandatory selected-pantheon Archaic age activation to `ArchaicAge<CustomGod>` in `techtree_mods.xml`, for example `<effect type="TechStatus" status="active">ArchaicAgeAtlantean</effect>` when the selected pantheon is Atlantean.

### Latest fix
- Treats `<bonusunitspawning>` as a single shared major-god block and merges child goals from multiple selected bonuses into that one block.

Update: Thor Dwarven Armory simplification
- The Thor "Dwarven Armory can be built and researched in any age. Dwarven Armory has extra upgrades" bonus no longer generates proto_mods builder train additions, Classical/Heroic/Mythic research-rate effects, or DisableStandardArmory generated techs.
- It now adds Archaic techtree CommandRemove Armory + CommandAdd DwarvenArmory effects for the selected pantheon's villager list.
- It enables DwarvenArmory in Archaic and makes the listed Armory/Dwarven Armory technologies obtainable.
- It adds a DwarvenArmory alive prereq merge to each selected minor-god age tech.


Update in this build:
- Restored Thor Dwarven Armory research-rate effects for the simplified Thor bonus: Classical uses 0.67, Heroic uses 0.5, and Mythic uses 0.5 on DwarvenArmory.


Update: Thor Dwarven Armory prereq patches are now added only to the selected Heroic-age minor god techs, not Classical or Mythic minor god techs.
