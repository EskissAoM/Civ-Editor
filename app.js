// AoM Retold Civ Creator - static GitHub Pages draft
// No backend, no uploads. ZIP is generated locally in the browser.

const DATA = {
  cultures: {
    greek: {
      label: "Greek",
      majorGods: ["Zeus", "Poseidon", "Hades"],
      minorGods: {
        classical: ["Athena", "Ares", "Hermes"],
        heroic: ["Apollo", "Dionysus", "Aphrodite"],
        mythic: ["Hera", "Hephaestus", "Artemis"]
      }
    },
    egyptian: {
      label: "Egyptian",
      majorGods: ["Ra", "Isis", "Set"],
      minorGods: {
        classical: ["Bast", "Ptah", "Anubis"],
        heroic: ["Hathor", "Nephthys", "Sekhmet"],
        mythic: ["Horus", "Osiris", "Thoth"]
      }
    },
    norse: {
      label: "Norse",
      majorGods: ["Odin", "Thor", "Loki"],
      minorGods: {
        classical: ["Freyja", "Heimdall", "Forseti"],
        heroic: ["Skadi", "Njord", "Bragi"],
        mythic: ["Baldr", "Tyr", "Hel"]
      }
    },
    atlantean: {
      label: "Atlantean",
      majorGods: ["Kronos", "Oranos", "Gaia"],
      minorGods: {
        classical: ["Prometheus", "Leto", "Oceanus"],
        heroic: ["Hyperion", "Rheia", "Theia"],
        mythic: ["Helios", "Atlas", "Hekate"]
      }
    }
  },
  bonuses: [
    { id: "eco_gather", label: "Efficient Gatherers", description: "+10% villager gather rate placeholder" },
    { id: "cheaper_infantry", label: "Cheaper Infantry", description: "Infantry cost -10% placeholder" },
    { id: "stronger_myth", label: "Mythic Bloodline", description: "Myth units +10% hitpoints placeholder" },
    { id: "faster_build", label: "Master Builders", description: "Buildings construct faster placeholder" },
    { id: "naval_focus", label: "Sea Dominion", description: "Ships train faster placeholder" },
    { id: "favor_income", label: "Sacred Rites", description: "Improved favor generation placeholder" },
    { id: "tower_range", label: "Watchful Towers", description: "Towers gain range placeholder" },
    { id: "cav_speed", label: "Swift Cavalry", description: "Cavalry move speed placeholder" }
  ]
};

const $ = (id) => document.getElementById(id);

function init() {
  fillCultureSelect();
  fillBonusList();
  loadPresetFromStorage(false);
  updateCultureDependentSelects();
  bindEvents();
  updatePreview();
}

function bindEvents() {
  ["displayName", "internalId", "description", "culture", "majorGod", "minorClassical", "minorHeroic", "minorMythic"].forEach(id => {
    $(id).addEventListener("input", updatePreview);
    $(id).addEventListener("change", updatePreview);
  });

  $("culture").addEventListener("change", () => {
    updateCultureDependentSelects();
    updatePreview();
  });

  document.querySelectorAll("input[name='bonus']").forEach(input => {
    input.addEventListener("change", () => {
      enforceBonusLimit();
      updatePreview();
    });
  });

  $("savePreset").addEventListener("click", savePreset);
  $("loadPreset").addEventListener("click", () => loadPresetFromStorage(true));
  $("downloadPreset").addEventListener("click", downloadPresetJson);
  $("generateZip").addEventListener("click", generateZip);
}

function fillCultureSelect() {
  const select = $("culture");
  select.innerHTML = Object.entries(DATA.cultures)
    .map(([id, c]) => `<option value="${id}">${escapeHtml(c.label)}</option>`)
    .join("");
  select.value = "greek";
}

function fillSelect(selectId, values) {
  $(selectId).innerHTML = values.map(v => `<option value="${slugify(v)}">${escapeHtml(v)}</option>`).join("");
}

function updateCultureDependentSelects() {
  const culture = DATA.cultures[$("culture").value];
  fillSelect("majorGod", culture.majorGods);
  fillSelect("minorClassical", culture.minorGods.classical);
  fillSelect("minorHeroic", culture.minorGods.heroic);
  fillSelect("minorMythic", culture.minorGods.mythic);
}

function fillBonusList() {
  $("bonusList").innerHTML = DATA.bonuses.map(bonus => `
    <label class="checkbox-item">
      <input type="checkbox" name="bonus" value="${bonus.id}" />
      <span>
        ${escapeHtml(bonus.label)}
        <small>${escapeHtml(bonus.description)}</small>
      </span>
    </label>
  `).join("");
}

function enforceBonusLimit() {
  const checked = [...document.querySelectorAll("input[name='bonus']:checked")];
  if (checked.length > 4) {
    checked[checked.length - 1].checked = false;
    showMessages(["Pick up to 4 bonuses for this prototype."], "error");
  }
}

function readConfig() {
  const selectedBonuses = [...document.querySelectorAll("input[name='bonus']:checked")].map(x => x.value);
  const displayName = $("displayName").value.trim();
  const internalId = sanitizeId($("internalId").value || displayName || "custom_civ");

  return {
    displayName,
    internalId,
    description: $("description").value.trim(),
    culture: $("culture").value,
    majorGod: $("majorGod").value,
    minorGods: {
      classical: $("minorClassical").value,
      heroic: $("minorHeroic").value,
      mythic: $("minorMythic").value
    },
    bonuses: selectedBonuses,
    createdAt: new Date().toISOString()
  };
}

function validateConfig(config) {
  const errors = [];
  if (!config.displayName) errors.push("Civilization display name is required.");
  if (!config.internalId) errors.push("Internal ID is required.");
  if (config.bonuses.length > 4) errors.push("Choose no more than 4 bonuses.");
  const ids = [config.majorGod, config.minorGods.classical, config.minorGods.heroic, config.minorGods.mythic];
  if (ids.some(Boolean) === false) errors.push("Choose a major god and all three minor gods.");
  return errors;
}

function updatePreview() {
  const config = readConfig();
  $("xmlPreview").textContent = makeCivXml(config) + "\n\n" + makeTechTreeXml(config);
}

function makeCivXml(config) {
  const bonusComments = config.bonuses.map(id => {
    const bonus = DATA.bonuses.find(b => b.id === id);
    return `    <!-- bonus: ${escapeXml(bonus?.label || id)} / ${escapeXml(bonus?.description || "")} -->`;
  }).join("\n");

  return `<?xml version="1.0" encoding="utf-8"?>
<!--
  Prototype file generated by AoM Retold Civ Creator.
  IMPORTANT: This is a placeholder template. Replace names/paths/schema with confirmed AoM Retold mod data after manual testing.
-->
<civ id="${escapeXml(config.internalId)}">
  <displayname>${escapeXml(config.displayName)}</displayname>
  <description>${escapeXml(config.description)}</description>
  <culture>${escapeXml(config.culture)}</culture>
  <majorGod>${escapeXml(config.majorGod)}</majorGod>
  <minorGods>
    <classical>${escapeXml(config.minorGods.classical)}</classical>
    <heroic>${escapeXml(config.minorGods.heroic)}</heroic>
    <mythic>${escapeXml(config.minorGods.mythic)}</mythic>
  </minorGods>
  <icon>game/art/icons/${escapeXml(config.internalId)}_icon</icon>
  <bonuses>
${bonusComments || "    <!-- no bonuses selected -->"}
  </bonuses>
</civ>`;
}

function makeTechTreeXml(config) {
  return `<?xml version="1.0" encoding="utf-8"?>
<!-- Placeholder tech tree file. Use this as a generated starting point, not as final confirmed AoM Retold schema. -->
<techtree civ="${escapeXml(config.internalId)}">
  <inheritsFrom culture="${escapeXml(config.culture)}" majorGod="${escapeXml(config.majorGod)}" />
  <enabledMinorGod age="classical" id="${escapeXml(config.minorGods.classical)}" />
  <enabledMinorGod age="heroic" id="${escapeXml(config.minorGods.heroic)}" />
  <enabledMinorGod age="mythic" id="${escapeXml(config.minorGods.mythic)}" />
</techtree>`;
}

function makeStringModsXml(config) {
  return `<?xml version="1.0" encoding="utf-8"?>
<stringmods>
  <string id="${escapeXml(config.internalId)}_name">${escapeXml(config.displayName)}</string>
  <string id="${escapeXml(config.internalId)}_description">${escapeXml(config.description)}</string>
</stringmods>`;
}

function makeReadme(config) {
  return `AoM Retold Civ Creator - Generated Prototype

Civilization: ${config.displayName}
Internal ID: ${config.internalId}

This ZIP was generated fully in your browser.

IMPORTANT:
This first draft contains placeholder XML files. It proves the website export pipeline works, but the XML schema and file paths must be adapted to confirmed Age of Mythology: Retold modding files.

Suggested workflow:
1. Create one tiny manual mod that the game recognizes.
2. Compare its folder structure and XML/data files.
3. Update this website's generator functions in app.js.
4. Generate again.

Install idea:
Extract the generated folder into your AoM Retold local mods folder, then enable it in-game if the game recognizes the structure.
`;
}

async function generateZip() {
  const config = readConfig();
  const errors = validateConfig(config);
  if (errors.length) {
    showMessages(errors, "error");
    return;
  }

  const iconInput = $("iconFile");
  const icon = iconInput.files && iconInput.files[0];
  if (icon && icon.size > 2 * 1024 * 1024) {
    showMessages(["Icon is too large. Please use an image under 2 MB."], "error");
    return;
  }

  const root = config.internalId;
  const files = [
    { path: `${root}/README_INSTALL.txt`, data: textBytes(makeReadme(config)) },
    { path: `${root}/mod-info.json`, data: textBytes(JSON.stringify({
      title: config.displayName,
      internalId: config.internalId,
      description: config.description,
      generatedBy: "AoM Retold Civ Creator Draft",
      createdAt: config.createdAt
    }, null, 2)) },
    { path: `${root}/game/data/generated-civ.xml`, data: textBytes(makeCivXml(config)) },
    { path: `${root}/game/data/generated-techtree.xml`, data: textBytes(makeTechTreeXml(config)) },
    { path: `${root}/game/data/stringmods.xml`, data: textBytes(makeStringModsXml(config)) }
  ];

  if (icon) {
    const ext = icon.name.split(".").pop()?.toLowerCase() || "png";
    const allowed = ["png", "jpg", "jpeg", "webp"];
    if (!allowed.includes(ext)) {
      showMessages(["Icon must be PNG, JPG, JPEG, or WEBP."], "error");
      return;
    }
    files.push({ path: `${root}/game/art/icons/${config.internalId}_icon.${ext}`, data: new Uint8Array(await icon.arrayBuffer()) });
  }

  const zipBlob = createZip(files);
  downloadBlob(zipBlob, `${config.internalId}.zip`);
  showMessages([`Generated ${config.internalId}.zip locally in your browser.`], "ok");
}

function savePreset() {
  localStorage.setItem("aomCivCreatorPreset", JSON.stringify(readConfig()));
  showMessages(["Preset saved in this browser."], "ok");
}

function loadPresetFromStorage(showMessage) {
  const raw = localStorage.getItem("aomCivCreatorPreset");
  if (!raw) {
    if (showMessage) showMessages(["No saved preset found in this browser."], "error");
    return;
  }
  try {
    const config = JSON.parse(raw);
    $("displayName").value = config.displayName || "";
    $("internalId").value = config.internalId || "";
    $("description").value = config.description || "";
    if (config.culture && DATA.cultures[config.culture]) $("culture").value = config.culture;
    updateCultureDependentSelects();
    if (config.majorGod) $("majorGod").value = config.majorGod;
    if (config.minorGods?.classical) $("minorClassical").value = config.minorGods.classical;
    if (config.minorGods?.heroic) $("minorHeroic").value = config.minorGods.heroic;
    if (config.minorGods?.mythic) $("minorMythic").value = config.minorGods.mythic;
    document.querySelectorAll("input[name='bonus']").forEach(input => {
      input.checked = config.bonuses?.includes(input.value) || false;
    });
    updatePreview();
    if (showMessage) showMessages(["Preset loaded."], "ok");
  } catch {
    if (showMessage) showMessages(["Saved preset could not be read."], "error");
  }
}

function downloadPresetJson() {
  const config = readConfig();
  downloadBlob(new Blob([JSON.stringify(config, null, 2)], { type: "application/json" }), `${config.internalId || "civ_preset"}.json`);
}

function showMessages(messages, type) {
  $("messages").innerHTML = messages.map(m => `<div class="message ${type}">${escapeHtml(m)}</div>`).join("");
}

function sanitizeId(value) {
  return slugify(value).replace(/[^a-z0-9_]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "") || "custom_civ";
}

function slugify(value) {
  return String(value).trim().toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
}

function escapeXml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textBytes(text) {
  return new TextEncoder().encode(text);
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

// Minimal ZIP writer, stored-file mode. Avoids a dependency/CDN for the first draft.
function createZip(files) {
  const encoder = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const file of files) {
    const nameBytes = encoder.encode(file.path.replaceAll("\\", "/"));
    const data = file.data instanceof Uint8Array ? file.data : new Uint8Array(file.data);
    const crc = crc32(data);
    const dos = dosDateTime(new Date());

    const local = new Uint8Array(30 + nameBytes.length);
    const lv = new DataView(local.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, dos.time, true);
    lv.setUint16(12, dos.date, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, data.length, true);
    lv.setUint32(22, data.length, true);
    lv.setUint16(26, nameBytes.length, true);
    lv.setUint16(28, 0, true);
    local.set(nameBytes, 30);

    localParts.push(local, data);

    const central = new Uint8Array(46 + nameBytes.length);
    const cv = new DataView(central.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, dos.time, true);
    cv.setUint16(14, dos.date, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, data.length, true);
    cv.setUint32(24, data.length, true);
    cv.setUint16(28, nameBytes.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    central.set(nameBytes, 46);
    centralParts.push(central);

    offset += local.length + data.length;
  }

  const centralSize = centralParts.reduce((sum, part) => sum + part.length, 0);
  const centralOffset = offset;

  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, centralOffset, true);
  ev.setUint16(20, 0, true);

  return new Blob([...localParts, ...centralParts, end], { type: "application/zip" });
}

function dosDateTime(date) {
  const year = Math.max(1980, date.getFullYear());
  const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
  const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
  return { time: dosTime, date: dosDate };
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

init();
