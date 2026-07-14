const defaults = {
  layout: "small",
  service: "rent",
  brand: "yes brand",
  product: "yes product",
  soldOut: false,
  heart: true,
  previousPrice: true,
  propNew: true,
  sale: true,
  sticker: true,
  brandName: "브랜드명",
  productName: "상품명 한줄",
  price: "1,290,000원",
  originalPrice: "1,590,000원",
  discount: "19%",
  period: "/30일",
  condition: "VERY_GOOD",
  eventLabel: "타임세일",
};

const layoutWidths = {
  small: 109,
  smedium: 156,
  medium: 163,
  big: 250,
  "1grid": 343,
  horizontal: 343,
  compact: 316,
};

const presets = [
  { name: "렌트 · 기본", caption: "브랜드 + 상품명", service: "rent", brand: "yes brand", product: "yes product" },
  { name: "렌트 · 상품만", caption: "브랜드 없는 상품", service: "rent", brand: "no brand", product: "yes product" },
  { name: "렌트 · 브랜드만", caption: "상품명 없는 구성", service: "rent", brand: "yes brand", product: "no product" },
  { name: "구매 · 기본", caption: "컨디션 + 이전 가격", service: "vintage", brand: "yes brand", product: "yes product" },
  { name: "구매 · 상품만", caption: "브랜드 없는 상품", service: "vintage", brand: "no brand", product: "yes product" },
  { name: "구매 · 미니멀", caption: "브랜드 + 현재 가격", service: "vintage", brand: "yes brand", product: "no product", previousPrice: false, sticker: false },
];

let state = { ...defaults };
let activeTab = "jsx";
let toastTimer;

const form = document.querySelector("#controlsForm");
const preview = document.querySelector("#productPreview");
const stage = document.querySelector("#previewStage");
const codeOutput = document.querySelector("#codeOutput");
const stateSummary = document.querySelector("#stateSummary");
const logicText = document.querySelector("#logicText");
const toast = document.querySelector("#toast");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readForm() {
  const data = new FormData(form);
  const next = {};
  for (const [key, defaultValue] of Object.entries(defaults)) {
    const control = form.elements[key];
    const isDisabledBoolean = typeof defaultValue === "boolean" && control instanceof HTMLInputElement && control.disabled;
    next[key] = typeof defaultValue === "boolean" ? (isDisabledBoolean ? state[key] : data.has(key)) : (data.get(key) ?? defaultValue);
  }
  state = next;
}

function applyState(nextState) {
  state = { ...defaults, ...nextState };
  Object.entries(state).forEach(([name, value]) => {
    const elements = form.elements[name];
    if (!elements) return;
    if (typeof value === "boolean") {
      elements.checked = value;
    } else if (elements instanceof RadioNodeList) {
      elements.value = value;
    } else {
      elements.value = value;
    }
  });
  render();
}

function getVisibility(s = state) {
  const hasBrand = s.brand === "yes brand";
  const hasProduct = s.product === "yes product";
  const hasAnyInfo = hasBrand || hasProduct;
  return {
    hasBrand,
    hasProduct,
    hasAnyInfo,
    showCondition: s.service === "vintage" && hasAnyInfo && s.layout !== "compact",
    showPreviousPrice: s.service === "vintage" && s.previousPrice && hasAnyInfo && s.layout !== "compact",
    showPrice: hasAnyInfo,
  };
}

function cardTemplate(s = state) {
  const v = getVisibility(s);
  const primaryName = v.hasBrand ? s.brandName : s.productName;
  const showSecondLine = v.hasBrand && v.hasProduct;
  const serviceLabel = s.service === "rent" ? "렌트" : "구매";
  const newBadgeLabel = s.layout === "small" ? "N" : "신규";
  const layoutClass = s.layout === "1grid" ? "one-grid" : s.layout;
  const labelsTemplate = s.sticker && s.layout !== "compact" ? `<div class="labels"><span class="label">${serviceLabel}</span><span class="label event">${escapeHtml(s.eventLabel)}</span></div>` : "";
  const primaryTemplate = `
    <div class="info-primary">
      <div class="brand-line">
        ${s.propNew ? `<span class="new-badge">${newBadgeLabel}</span>` : ""}
        <span class="brand-name">${escapeHtml(primaryName)}</span>
      </div>
      ${showSecondLine ? `<span class="product-name">${escapeHtml(s.productName)}</span>` : ""}
    </div>
  `;
  const standardPriceTemplate = `
    <div class="price-area">
      ${v.showPreviousPrice ? `<span class="previous-price">${escapeHtml(s.originalPrice)}</span>` : ""}
      ${s.service === "vintage" ? `
        <div class="purchase-price-row">
          ${s.sale ? `<span class="discount">${escapeHtml(s.discount)}</span>` : ""}
          <span class="current-price">${escapeHtml(s.price)}</span>
        </div>
      ` : s.layout === "big" ? `
        <div class="big-rent-price-row">
          ${s.sale ? `<span class="discount">${escapeHtml(s.discount)}</span>` : ""}
          <span class="current-price">${escapeHtml(s.price)}<span class="period">${escapeHtml(s.period)}</span></span>
        </div>
      ` : `
        ${s.sale ? `<span class="discount">${escapeHtml(s.discount)}</span>` : ""}
        <span class="current-price">${escapeHtml(s.price)}<span class="period">${escapeHtml(s.period)}</span></span>
      `}
    </div>
  `;
  const oneGridPriceTemplate = `
    <div class="price-area one-grid-price-area">
      ${v.showPreviousPrice ? `<span class="previous-price">${escapeHtml(s.originalPrice)}</span>` : ""}
      <div class="one-grid-current-row">
        ${s.sale ? `<span class="discount">${escapeHtml(s.discount)}</span>` : ""}
        <span class="current-price">${escapeHtml(s.price)}${s.service === "rent" ? `<span class="period">${escapeHtml(s.period)}</span>` : ""}</span>
      </div>
    </div>
  `;
  const horizontalPriceTemplate = `
    <div class="price-area horizontal-price-area">
      ${v.showPreviousPrice ? `<span class="previous-price">${escapeHtml(s.originalPrice)}</span>` : ""}
      <div class="horizontal-current-row">
        ${s.sale ? `<span class="discount">${escapeHtml(s.discount)}</span>` : ""}
        <span class="current-price">${escapeHtml(s.price)}${s.service === "rent" ? `<span class="period">${escapeHtml(s.period)}</span>` : ""}</span>
      </div>
    </div>
  `;

  return `
    <article class="product-card ${layoutClass} ${s.service}${s.soldOut ? " is-sold-out" : ""}${v.showPreviousPrice ? " has-previous-price" : ""}" data-layout="${s.layout}" aria-label="${s.layout} · ${escapeHtml(serviceLabel)} 상품 카드 미리보기${s.soldOut ? " · 품절" : ""}">
      <div class="product-media">
        ${s.soldOut ? `<div class="sold-out-overlay"><span>품절</span></div>` : ""}
        ${s.heart && s.layout !== "compact" ? `<button class="heart-button" type="button" aria-label="찜하기">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.2 5.8a5.4 5.4 0 0 0-7.64 0L12 6.36l-.56-.56A5.4 5.4 0 0 0 3.8 13.44L12 21l8.2-7.56a5.4 5.4 0 0 0 0-7.64Z" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>` : ""}
        ${v.showCondition && !s.soldOut ? `<span class="condition-badge">${escapeHtml(s.condition)}</span>` : ""}
      </div>
      <div class="product-info">
        ${v.hasAnyInfo ? s.layout === "1grid" ? `
          <div class="one-grid-primary">
            ${labelsTemplate}
            ${primaryTemplate}
          </div>
          ${oneGridPriceTemplate}
        ` : s.layout === "horizontal" ? `
          ${primaryTemplate}
          <div class="horizontal-secondary">
            ${horizontalPriceTemplate}
            ${labelsTemplate}
          </div>
        ` : s.layout === "compact" ? `
          ${primaryTemplate}
          ${horizontalPriceTemplate}
        ` : `
          ${primaryTemplate}
          ${standardPriceTemplate}
          ${labelsTemplate}
        ` : `<div class="empty-info">콘텐츠 없음</div>`}
      </div>
    </article>
  `;
}

function propsObject() {
  return {
    layout: state.layout,
    service: state.service,
    brand: state.brand,
    product: state.product,
    soldOut: state.soldOut,
    heart: state.layout === "compact" ? false : state.heart,
    previousPrice: state.layout === "compact" ? false : state.previousPrice,
    propNew: state.propNew,
    sale: state.sale,
    sticker: state.layout === "compact" ? false : state.sticker,
  };
}

function rawCode() {
  const props = propsObject();
  if (activeTab === "json") return JSON.stringify(props, null, 2);
  const lines = Object.entries(props).map(([key, value]) => {
    const rendered = typeof value === "string" ? `"${value}"` : `{${value}}`;
    return `  ${key}=${rendered}`;
  });
  return ["<ProductGrid2026", ...lines, "/>"].join("\n");
}

function highlightedCode() {
  return escapeHtml(rawCode())
    .replace(/(&quot;.*?&quot;)/g, '<span class="code-string">$1</span>')
    .replace(/\b(true|false)\b/g, '<span class="code-bool">$1</span>')
    .replace(/^\s{2}([a-zA-Z]+)/gm, '  <span class="code-key">$1</span>');
}

function updateLogic() {
  const v = getVisibility();
  const notes = [];
  if (!v.hasBrand && !v.hasProduct) notes.push("브랜드와 상품명이 모두 없으면 정보·가격 영역을 표시하지 않습니다.");
  else if (!v.hasBrand) notes.push("브랜드가 없으면 상품명이 첫 번째 강조 행으로 이동합니다.");
  else if (!v.hasProduct) notes.push("상품명이 없으면 브랜드명만 한 줄로 표시됩니다.");
  else notes.push("브랜드명과 상품명을 각각 한 줄로 표시합니다.");
  notes.push(`${state.layout} 레이아웃은 ${layoutWidths[state.layout]}px 카드 규격을 사용합니다.`);
  if (state.layout === "1grid") notes.push("1grid는 라벨을 브랜드명 위에 배치하고 카드 외곽에 stroke를 표시합니다. 이전 가격 유무에 따라 가격 영역 간격이 달라집니다.");
  if (state.layout === "horizontal") notes.push("horizontal은 125px 이미지와 정보 영역을 가로로 배치하며, 신규 배지는 브랜드명과 같은 줄에 두고 서비스 라벨은 가격 아래에 표시합니다.");
  if (state.layout === "compact") notes.push("compact는 72px 이미지와 정보 영역을 가로로 배치하며, 찜 버튼·서비스 라벨·구매 컨디션 라벨을 사용하지 않습니다.");
  if (state.layout === "compact") {
    notes.push(state.service === "vintage" ? "compact 구매는 컨디션 배지와 이전 가격 없이 현재 판매 가격만 표시합니다." : "compact 렌트는 기간 단위가 가격 뒤에 붙습니다.");
  } else {
    notes.push(state.service === "vintage" ? "구매는 컨디션 배지와 일반 판매 가격을 사용하며, 할인율이 현재 가격 왼쪽에 표시됩니다." : "렌트는 기간 단위가 가격 뒤에 붙습니다.");
  }
  if (state.soldOut) notes.push("품절 상태에서는 이미지 위에 품절 오버레이를 표시합니다.");
  logicText.textContent = notes.join(" ");
}

function updateIrrelevantControls() {
  const noInfo = state.brand === "no brand" && state.product === "no product";
  const isCompact = state.layout === "compact";
  const previousPriceControl = document.querySelector('[data-option="previousPrice"]');
  previousPriceControl.classList.toggle("is-irrelevant", isCompact || state.service !== "vintage" || noInfo);
  previousPriceControl.querySelector("input").disabled = isCompact;
  ["propNew", "sale"].forEach((name) => {
    document.querySelector(`[data-option="${name}"]`).classList.toggle("is-irrelevant", noInfo);
  });
  document.querySelector('[data-option="heart"]').classList.toggle("is-irrelevant", isCompact);
  document.querySelector('[data-option="sticker"]').classList.toggle("is-irrelevant", isCompact || noInfo);
}

function render() {
  preview.innerHTML = cardTemplate();
  codeOutput.innerHTML = highlightedCode();
  stage.dataset.layout = state.layout;
  document.querySelector(".measure-x span").textContent = `${layoutWidths[state.layout]} px`;
  stateSummary.textContent = `${state.layout} · ${state.service} · ${state.brand} · ${state.product}${state.soldOut ? " · sold out" : ""}`;
  document.querySelector("#serviceDot").classList.toggle("vintage", state.service === "vintage");
  updateLogic();
  updateIrrelevantControls();
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1700);
}

async function copyText(text, message = "복사했습니다.") {
  try {
    await navigator.clipboard.writeText(text);
    showToast(message);
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    document.body.append(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
    showToast(message);
  }
}

function stateUrl() {
  const url = new URL(window.location.href);
  url.search = "";
  Object.entries(propsObject()).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  return url.toString();
}

function loadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if (!params.size) return;
  const next = {};
  Object.entries(defaults).forEach(([key, defaultValue]) => {
    if (!params.has(key)) return;
    next[key] = typeof defaultValue === "boolean" ? params.get(key) === "true" : params.get(key);
  });
  applyState(next);
  if (["big", "1grid", "horizontal", "compact"].includes(next.layout)) setZoom("1");
}

function renderPresets() {
  const grid = document.querySelector("#presetGrid");
  grid.innerHTML = presets.map((preset, index) => {
    const merged = { ...defaults, ...preset };
    return `<button type="button" class="preset-card ${merged.service}" data-preset="${index}">
      <span class="number">0${index + 1}</span>
      <strong>${escapeHtml(preset.name)}</strong>
      <small>${escapeHtml(preset.caption)}</small>
      <span class="preset-swatches" aria-hidden="true">
        <i class="on"></i><i class="${merged.previousPrice ? "on" : ""}"></i><i class="${merged.sticker ? "on" : ""}"></i>
      </span>
    </button>`;
  }).join("");
}

function setZoom(value) {
  document.querySelectorAll("[data-zoom]").forEach((item) => item.classList.toggle("active", item.dataset.zoom === value));
  stage.dataset.zoom = value;
}

form.addEventListener("input", (event) => {
  readForm();
  if (event.target.name === "layout" && ["big", "1grid", "horizontal", "compact"].includes(state.layout)) setZoom("1");
  render();
});

document.querySelectorAll("[data-zoom]").forEach((button) => {
  button.addEventListener("click", () => {
    setZoom(button.dataset.zoom);
  });
});

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    activeTab = button.dataset.tab;
    document.querySelectorAll("[data-tab]").forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
    render();
  });
});

document.querySelector("#presetGrid").addEventListener("click", (event) => {
  const card = event.target.closest("[data-preset]");
  if (!card) return;
  applyState({ ...presets[Number(card.dataset.preset)], layout: state.layout });
  document.querySelector(".workspace").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("프리셋을 적용했습니다.");
});

document.querySelector("#resetButton").addEventListener("click", () => { applyState(defaults); showToast("기본값으로 초기화했습니다."); });
document.querySelector("#copyCodeButton").addEventListener("click", () => copyText(rawCode(), "코드를 복사했습니다."));
document.querySelector("#copyHeaderButton").addEventListener("click", () => copyText(JSON.stringify(propsObject(), null, 2), "Props를 복사했습니다."));
document.querySelector("#shareButton").addEventListener("click", () => copyText(stateUrl(), "현재 설정 링크를 복사했습니다."));

renderPresets();
loadFromUrl();
render();
