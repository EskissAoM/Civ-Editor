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
