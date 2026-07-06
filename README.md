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
- Susanoo's `Unit abilities recharge faster` bonus is now under the Japanese pantheon and is Japanese-only.

## Latest change

- Susanoo's `Unit abilities recharge faster` bonus keeps Japanese/Susanoo as its source, but is now allowed for all pantheons.
