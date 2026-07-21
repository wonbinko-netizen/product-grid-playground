const defaults = {
  layout: "small",
  service: "rent",
  brand: "yes brand",
  product: "yes product",
  soldOut: false,
  heart: true,
  priceVisible: true,
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

const titleDefaults = {
  type: "short",
  accessory: "none",
  title: "큰 타이틀 한 줄",
  subtitle: "작은 타이틀 한 줄",
  timer: "04:21:39",
  currentCount: "1",
  totalCount: "20",
  viewAllLabel: "전체 보기",
};

const gridDefaults = {
  grid: "grid1",
  service: "rent",
  pickBackground: "#292a2d",
  superdealBackground: "mint-pink",
};

const pickBackgrounds = [
  "#ff6b6d", "#18b17b", "#6e92ff", "#9f73f6", "#b5bfcd", "#292a2d", "#625240",
  "#ffbe74", "#ffd27e", "#feec9a", "#6adab7", "#aad9ff", "#ffbce5",
];
const pickDarkBackgrounds = new Set(pickBackgrounds.slice(0, 7));

function sanitizePickBackground(value) {
  const normalized = String(value || "").toLowerCase();
  return pickBackgrounds.includes(normalized) ? normalized : gridDefaults.pickBackground;
}

function pickTheme(background) {
  const safeBackground = sanitizePickBackground(background);
  const usesLightText = pickDarkBackgrounds.has(safeBackground);
  return {
    background: safeBackground,
    main: usesLightText ? "#ffffff" : "#111111",
    sub: usesLightText ? "#f8f8f8" : "#333333",
  };
}

const superdealBackgrounds = [
  { key: "mint-pink", label: "민트 핑크", src: "./assets/superdeal/mint-pink.png", dark: false },
  { key: "pink-lilac", label: "핑크 라일락", src: "./assets/superdeal/pink-lilac.png", dark: false },
  { key: "black-leather", label: "블랙 레더", src: "./assets/superdeal/black-leather.png", dark: true },
  { key: "blue-fabric", label: "블루 패브릭", src: "./assets/superdeal/blue-fabric.png", dark: true },
  { key: "black-satin", label: "블랙 새틴", src: "./assets/superdeal/black-satin.png", dark: true },
  { key: "blue-texture", label: "블루 텍스처", src: "./assets/superdeal/blue-texture.png", dark: true },
  { key: "rainbow-gradient", label: "레인보우", src: "./assets/superdeal/rainbow-gradient.png", dark: false },
];

function superdealTheme(value) {
  const background = superdealBackgrounds.find((item) => item.key === value) || superdealBackgrounds[0];
  return {
    ...background,
    main: background.dark ? "#ffffff" : "#111111",
    sub: background.dark ? "#f3f4f6" : "#333333",
  };
}

const gridLayouts = {
  grid1: {
    label: "상품 1개 그리드",
    columns: 1,
    itemCount: 1,
    cardLayout: "1grid",
    columnGap: 0,
    rowGap: 20,
  },
  grid2: {
    label: "상품 2개 그리드",
    columns: 2,
    itemCount: 4,
    cardLayout: "medium",
    columnGap: 17,
    rowGap: 32,
  },
  grid3: {
    label: "상품 3개 그리드",
    columns: 3,
    itemCount: 6,
    cardLayout: "small",
    columnGap: 8,
    rowGap: 32,
  },
  swipe1: {
    label: "상품 1개 스와이프",
    mode: "swipe",
    columns: 1,
    itemCount: 2,
    visibleCount: 1,
    cardLayout: "big",
    columnGap: 14,
    rowGap: 0,
  },
  swipe2: {
    label: "상품 2개 스와이프",
    mode: "swipe",
    columns: 2,
    itemCount: 3,
    visibleCount: 2,
    cardLayout: "smedium",
    columnGap: 14,
    rowGap: 0,
  },
  swipe3: {
    label: "상품 3개 스와이프",
    mode: "swipe",
    columns: 3,
    itemCount: 4,
    visibleCount: 3,
    cardLayout: "small",
    columnGap: 8,
    rowGap: 0,
  },
  list: {
    label: "상품 리스트",
    mode: "list",
    columns: 1,
    itemCount: 3,
    cardLayout: "horizontal",
    columnGap: 0,
    rowGap: 22,
  },
  listSwipe: {
    label: "리스트 스와이프",
    mode: "swipe-list",
    columns: 1,
    itemCount: 8,
    visibleCount: 4,
    groupSize: 4,
    cardLayout: "compact",
    columnGap: 24,
    rowGap: 32,
  },
  brandSwipe: {
    label: "브랜드 스와이프",
    mode: "brand-swipe",
    columns: 1,
    itemCount: 2,
    visibleCount: 1,
    cardLayout: "brand",
    columnGap: 14,
    rowGap: 0,
    serviceLocked: "rent",
  },
  pick: {
    label: "Pick",
    mode: "pick",
    columns: 3,
    itemCount: 3,
    visibleCount: 3,
    maxItemCount: 15,
    cardLayout: "pick",
    columnGap: 14,
    rowGap: 0,
  },
  superdeal: {
    label: "Superdeal",
    mode: "superdeal",
    columns: 1,
    itemCount: 2,
    visibleCount: 1,
    maxItemCount: 15,
    cardLayout: "superdeal",
    columnGap: 14,
    rowGap: 0,
  },
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
let titleState = { ...titleDefaults };
let gridState = { ...gridDefaults };
let activeGuide = "product";
let activeTab = "jsx";
let toastTimer;

const form = document.querySelector("#controlsForm");
const preview = document.querySelector("#productPreview");
const stage = document.querySelector("#previewStage");
const codeOutput = document.querySelector("#codeOutput");
const stateSummary = document.querySelector("#stateSummary");
const logicText = document.querySelector("#logicText");
const toast = document.querySelector("#toast");
const titleForm = document.querySelector("#titleControlsForm");
const titlePreview = document.querySelector("#titlePreview");
const titleCodeOutput = document.querySelector("#titleCodeOutput");
const titleStateSummary = document.querySelector("#titleStateSummary");
const titleLogicText = document.querySelector("#titleLogicText");
const gridForm = document.querySelector("#gridControlsForm");
const gridPreview = document.querySelector("#gridPreview");
const gridPreviewStage = document.querySelector("#gridPreviewStage");
const gridCodeOutput = document.querySelector("#gridCodeOutput");
const gridStateSummary = document.querySelector("#gridStateSummary");
const gridLogicText = document.querySelector("#gridLogicText");

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
    const isDisabled = control instanceof HTMLInputElement && control.disabled;
    if (isDisabled) next[key] = state[key];
    else next[key] = typeof defaultValue === "boolean" ? data.has(key) : (data.get(key) ?? defaultValue);
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

function readTitleForm() {
  const data = new FormData(titleForm);
  titleState = Object.fromEntries(Object.entries(titleDefaults).map(([key, defaultValue]) => {
    const control = titleForm.elements[key];
    return [key, control instanceof HTMLInputElement && control.disabled ? titleState[key] : (data.get(key) ?? defaultValue)];
  }));
}

function applyTitleState(nextState) {
  titleState = { ...titleDefaults, ...nextState };
  Object.entries(titleState).forEach(([name, value]) => {
    const elements = titleForm.elements[name];
    if (!elements) return;
    if (elements instanceof RadioNodeList) elements.value = value;
    else elements.value = value;
  });
  renderTitle();
}

function readGridForm() {
  const data = new FormData(gridForm);
  gridState = Object.fromEntries(Object.entries(gridDefaults).map(([key, defaultValue]) => [key, data.get(key) ?? defaultValue]));
}

function applyGridState(nextState) {
  gridState = { ...gridDefaults, ...nextState };
  Object.entries(gridState).forEach(([name, value]) => {
    const elements = gridForm.elements[name];
    if (!elements) return;
    if (elements instanceof RadioNodeList) elements.value = value;
    else elements.value = value;
  });
  renderGrid();
}

function titleTemplate(s = titleState, tagName = "article") {
  const accessoryTemplate = s.accessory === "count"
    ? `<div class="title-template-accessory title-count"><strong>${escapeHtml(s.currentCount)}</strong>/${escapeHtml(s.totalCount)}</div>`
    : s.accessory === "viewAll"
      ? `<div class="title-template-accessory title-view-all"><span>${escapeHtml(s.viewAllLabel)}</span><img src="./assets/chevron-right.svg" alt="" /></div>`
      : "";
  const secondaryTemplate = s.type === "basic"
    ? `<p class="title-template-subtitle">${escapeHtml(s.subtitle)}</p>`
    : s.type === "clock"
      ? `<p class="title-template-timer">${escapeHtml(s.timer)}</p>`
      : "";

  return `<${tagName} class="title-template type-${s.type} accessory-${s.accessory}" aria-label="${s.type} 타이틀 · ${s.accessory}">
    <div class="title-template-main">
      <h3 class="title-template-heading">${escapeHtml(s.title)}</h3>
      ${secondaryTemplate}
    </div>
    ${accessoryTemplate}
  </${tagName}>`;
}

function titlePropsObject() {
  const props = {
    type: titleState.type,
    accessory: titleState.accessory,
    title: titleState.title,
  };
  if (titleState.type === "basic") props.subtitle = titleState.subtitle;
  if (titleState.type === "clock") props.timer = titleState.timer;
  if (titleState.accessory === "count") {
    props.currentCount = titleState.currentCount;
    props.totalCount = titleState.totalCount;
  }
  if (titleState.accessory === "viewAll") props.viewAllLabel = titleState.viewAllLabel;
  return props;
}

function titleRawCode() {
  const props = titlePropsObject();
  if (activeTab === "json") return JSON.stringify(props, null, 2);
  const lines = Object.entries(props).map(([key, value]) => `  ${key}="${value}"`);
  return ["<TitleTemplate", ...lines, "/>"].join("\n");
}

function titleHighlightedCode() {
  return escapeHtml(titleRawCode())
    .replace(/(&quot;.*?&quot;)/g, '<span class="code-string">$1</span>')
    .replace(/^\s{2}([a-zA-Z]+)/gm, '  <span class="code-key">$1</span>');
}

function updateTitleLogic() {
  const notes = ["너비 375px, 좌우 16px·상하 24px 패딩을 사용합니다."];
  if (titleState.type === "short") notes.push("SHORT는 큰 타이틀만 한 줄로 표시합니다.");
  if (titleState.type === "basic") notes.push("BASIC은 큰 타이틀과 작은 타이틀 사이 간격을 10px로 둡니다.");
  if (titleState.type === "clock") notes.push("CLOCK은 타이틀 아래 12px 간격으로 Rubik Bold 40px 타이머를 표시합니다.");
  if (titleState.accessory === "none") notes.push("우측 옵션이 없으면 오른쪽 패딩을 66px로 둡니다.");
  if (titleState.accessory === "count") notes.push("타이틀과 카운트 사이 간격은 40px이며, 별도의 카운트 UI는 추가하지 않습니다.");
  if (titleState.accessory === "viewAll") notes.push("타이틀과 전체 보기 사이 간격은 40px이며, 하단 전체 보기 버튼은 추가하지 않습니다.");
  notes.push("제목은 한 줄을 넘기지 않으며, 메인·서브 타이틀의 영문도 Pretendard를 사용합니다.");
  titleLogicText.textContent = notes.join(" ");
}

function updateTitleControls() {
  const relevance = {
    subtitle: titleState.type === "basic",
    timer: titleState.type === "clock",
    count: titleState.accessory === "count",
    viewAll: titleState.accessory === "viewAll",
  };
  Object.entries(relevance).forEach(([name, isRelevant]) => {
    document.querySelectorAll(`[data-title-field="${name}"]`).forEach((label) => {
      label.classList.toggle("is-irrelevant", !isRelevant);
      label.querySelector("input").disabled = !isRelevant;
    });
  });
}

function renderTitle() {
  titlePreview.innerHTML = titleTemplate();
  titleCodeOutput.innerHTML = titleHighlightedCode();
  titleStateSummary.textContent = `${titleState.type} · ${titleState.accessory} · 375px`;
  updateTitleLogic();
  updateTitleControls();
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
    showPreviousPrice: s.service === "vintage" && s.priceVisible && s.previousPrice && hasAnyInfo && s.layout !== "compact",
    showPrice: hasAnyInfo && s.priceVisible,
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
  const standardPriceTemplate = v.showPrice ? `
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
  ` : "";
  const oneGridPriceTemplate = v.showPrice ? `
    <div class="price-area one-grid-price-area">
      ${v.showPreviousPrice ? `<span class="previous-price">${escapeHtml(s.originalPrice)}</span>` : ""}
      <div class="one-grid-current-row">
        ${s.sale ? `<span class="discount">${escapeHtml(s.discount)}</span>` : ""}
        <span class="current-price">${escapeHtml(s.price)}${s.service === "rent" ? `<span class="period">${escapeHtml(s.period)}</span>` : ""}</span>
      </div>
    </div>
  ` : "";
  const horizontalPriceTemplate = v.showPrice ? `
    <div class="price-area horizontal-price-area">
      ${v.showPreviousPrice ? `<span class="previous-price">${escapeHtml(s.originalPrice)}</span>` : ""}
      <div class="horizontal-current-row">
        ${s.sale ? `<span class="discount">${escapeHtml(s.discount)}</span>` : ""}
        <span class="current-price">${escapeHtml(s.price)}${s.service === "rent" ? `<span class="period">${escapeHtml(s.period)}</span>` : ""}</span>
      </div>
    </div>
  ` : "";

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

function brandCardTemplate(index = 0) {
  const brandName = state.brandName === defaults.brandName ? "브랜드명_한글" : state.brandName;
  return `
    <article class="brand-swipe-card" aria-label="브랜드 카드 ${index + 1}">
      <strong class="brand-swipe-name">${escapeHtml(brandName)}</strong>
      <span class="brand-swipe-image" aria-hidden="true"></span>
      <div class="brand-swipe-price"><span>일</span><strong>NN,NNN원부터</strong></div>
    </article>
  `;
}

function pickCardTemplate(size, s, index) {
  const v = getVisibility(s);
  const brandName = v.hasAnyInfo ? (v.hasBrand ? s.brandName : s.productName) : "콘텐츠 없음";
  const productName = v.hasBrand && v.hasProduct ? s.productName : "";
  const currentPrice = escapeHtml(s.price);
  const period = s.service === "rent" ? `<span class="pick-card-period">${escapeHtml(s.period)}</span>` : "";
  const discount = s.sale ? `<span class="pick-card-discount">${escapeHtml(s.discount)}</span>` : "";
  const price = v.showPrice ? `<div class="pick-card-price">${discount}<strong>${currentPrice}</strong>${period}</div>` : "";
  return `
    <article class="pick-card ${size} ${s.service}${s.soldOut ? " is-sold-out" : ""}" aria-label="Pick 상품 ${index + 1}">
      <div class="pick-card-media">
        ${s.soldOut ? `<span class="pick-card-sold-out">품절</span>` : ""}
      </div>
      <div class="pick-card-info">
        <div class="pick-card-name">
          <strong>${escapeHtml(brandName)}</strong>
          ${productName ? `<span>${escapeHtml(productName)}</span>` : ""}
        </div>
        ${price}
      </div>
    </article>
  `;
}

function pickTemplate(cardState) {
  const theme = pickTheme(gridState.pickBackground);
  const styles = `--pick-bg:${theme.background};--pick-main:${theme.main};--pick-sub:${theme.sub}`;
  return `
    <div class="pick-template" style="${styles}">
      <header class="pick-header">
        <div class="pick-heading">
          <strong>타이틀 한 줄</strong>
          <span>서브 타이틀 한 줄</span>
        </div>
        <button class="pick-view-all" type="button">전체 보기 <i aria-hidden="true"></i></button>
      </header>
      <div class="pick-carousel" aria-label="Pick 상품 캐러셀">
        <div class="pick-carousel-track">
          ${pickCardTemplate("side", cardState, 0)}
          ${pickCardTemplate("center", cardState, 1)}
          ${pickCardTemplate("side", cardState, 2)}
        </div>
      </div>
      <div class="pick-pagination" aria-hidden="true"><i></i></div>
    </div>
  `;
}

function superdealCardTemplate(s, index) {
  const v = getVisibility(s);
  const brandName = v.hasAnyInfo ? (v.hasBrand ? s.brandName : s.productName) : "콘텐츠 없음";
  const productName = v.hasBrand && v.hasProduct ? s.productName : "";
  const discount = s.sale ? `<span class="superdeal-card-discount">${escapeHtml(s.discount)}</span>` : "";
  const period = s.service === "rent" ? `<span class="superdeal-card-period">${escapeHtml(s.period)}</span>` : "";
  const price = v.showPrice
    ? `<div class="superdeal-card-price">${discount}<strong>${escapeHtml(s.price)}</strong>${period}</div>`
    : "";
  return `
    <article class="superdeal-card ${s.service}${s.soldOut ? " is-sold-out" : ""}" aria-label="Superdeal 상품 ${index + 1}">
      <div class="superdeal-card-media">
        ${s.soldOut ? `<span class="superdeal-card-sold-out">품절</span>` : ""}
      </div>
      <div class="superdeal-card-info">
        <div class="superdeal-card-name">
          <strong>${escapeHtml(brandName)}</strong>
          ${productName ? `<span>${escapeHtml(productName)}</span>` : ""}
        </div>
        ${price}
      </div>
    </article>
  `;
}

function superdealTemplate(cardState) {
  const theme = superdealTheme(gridState.superdealBackground);
  const styles = `--superdeal-main:${theme.main};--superdeal-sub:${theme.sub}`;
  return `
    <div class="superdeal-template">
      <div class="superdeal-shell" style="${styles}">
        <img class="superdeal-background" src="${theme.src}" alt="" />
        <div class="superdeal-content">
          <header class="superdeal-heading">
            <strong>타이틀 한 줄</strong>
            <span>서브 타이틀 한 줄</span>
          </header>
          <div class="superdeal-carousel" aria-label="Superdeal 상품 캐러셀">
            <div class="superdeal-carousel-track">
              ${superdealCardTemplate(cardState, 0)}
              ${superdealCardTemplate(cardState, 1)}
            </div>
          </div>
          <div class="superdeal-pagination" aria-hidden="true"><i></i></div>
        </div>
      </div>
    </div>
  `;
}

function gridPropsObject() {
  const config = gridLayouts[gridState.grid];
  const effectiveService = config.serviceLocked || gridState.service;
  const props = {
    type: gridState.grid,
    service: effectiveService,
    mode: config.mode || "grid",
    columns: config.columns,
    itemCount: config.itemCount,
    columnGap: config.columnGap,
    rowGap: config.rowGap,
    cardLayout: config.cardLayout,
  };
  if (config.visibleCount) props.visibleCount = config.visibleCount;
  if (config.groupSize) props.groupSize = config.groupSize;
  if (config.serviceLocked) props.serviceLocked = true;
  if (config.maxItemCount) props.maxItemCount = config.maxItemCount;
  if (config.mode === "pick") {
    const theme = pickTheme(gridState.pickBackground);
    props.background = theme.background;
    props.titleColor = theme.main;
    props.subtitleColor = theme.sub;
  }
  if (config.mode === "superdeal") {
    const theme = superdealTheme(gridState.superdealBackground);
    props.backgroundImage = theme.src;
    props.titleColor = theme.main;
    props.subtitleColor = theme.sub;
  }
  return props;
}

function gridRawCode() {
  const props = gridPropsObject();
  if (activeTab === "json") return JSON.stringify(props, null, 2);
  const lines = Object.entries(props).map(([key, value]) => {
    const rendered = typeof value === "string" ? `"${value}"` : `{${value}}`;
    return `  ${key}=${rendered}`;
  });
  return ["<ProductGridTemplate", ...lines, "/>"].join("\n");
}

function gridHighlightedCode() {
  return escapeHtml(gridRawCode())
    .replace(/(&quot;.*?&quot;)/g, '<span class="code-string">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="code-bool">$1</span>')
    .replace(/^\s{2}([a-zA-Z]+)/gm, '  <span class="code-key">$1</span>');
}

function updateGridLogic() {
  const config = gridLayouts[gridState.grid];
  const effectiveService = config.serviceLocked || gridState.service;
  const serviceLabel = effectiveService === "rent" ? "렌트" : "구매";
  const common = config.mode === "pick"
    ? `현재 ${serviceLabel} 상품 데이터를 사용하는 375px Pick 캐러셀입니다.`
    : config.mode === "superdeal"
      ? `현재 ${serviceLabel} 상품 데이터를 사용하는 375px Superdeal 캐러셀입니다.`
    : `현재 ${serviceLabel} 상품 카드를 사용합니다. 모바일 375px 기준 좌측 16px에서 시작합니다.`;
  const details = {
    grid1: "콘텐츠 너비는 343px입니다. 상품은 최대 5개까지 노출하며 이미지 옵션·랭킹 옵션·전체 보기 버튼을 사용하지 않습니다.",
    grid2: "163px 카드 2개를 17px 간격으로 배치합니다. 상품은 최소 4개부터 짝수 단위로 노출하며 랭킹 옵션을 사용하지 않습니다.",
    grid3: "109px 카드 3개를 8px 간격으로 배치하고 줄 사이는 32px입니다. 상품은 최소 6개부터 3의 배수 단위로 노출하며 천만원대 상품 노출은 지양합니다.",
    swipe1: "250px 카드 사이 간격은 14px입니다. 한 화면에 1개와 다음 카드 일부를 노출하고 가로 스와이프를 사용합니다. 1줄 고정이며 상품은 최소 3개 이상입니다. 이미지·랭킹 옵션은 사용하지 않습니다.",
    swipe2: "156px 카드 사이 간격은 14px입니다. 한 화면에 2개와 다음 카드 일부를 노출하고 가로 스와이프를 사용합니다. 하단 그리드를 추가할 경우 최대 2줄이며 상품은 최소 4개 이상입니다.",
    swipe3: "109px 카드 사이 간격은 8px입니다. 한 화면에 3개와 다음 카드 일부를 노출하고 가로 스와이프를 사용합니다. 하단 그리드를 추가할 경우 최대 2줄이며 상품은 최소 6개 이상입니다.",
    list: "125px 이미지의 horizontal 카드를 세로로 배치하며 카드 사이는 22px입니다. 상품은 최소 3개, 최대 10개까지 노출합니다.",
    listSwipe: "72px 이미지의 compact 카드를 4개씩 묶고 카드 사이는 32px, 스와이프 묶음 사이는 24px입니다. 상품은 최소 8개부터 4의 배수로 노출하며 최대 3개 묶음까지 사용합니다. 이미지 옵션은 사용하지 않습니다.",
    brandSwipe: "184px 브랜드 카드를 14px 간격으로 배치하는 렌트 전용 1줄 스와이프입니다. 브랜드는 최소 4개 이상 노출하며 이미지·랭킹·타임딜 옵션과 더 보기 버튼을 사용하지 않습니다.",
    pick: "가운데 242px 카드와 양옆 190px 카드로 구성하며 최대 3개를 전시합니다. 배경은 지정된 13개 색상만 사용하고 타이틀·전체 보기·서브 타이틀 색상은 자동 전환됩니다. 타이틀과 서브 타이틀은 각각 한 줄, 좌우 패딩은 60px이며 상품은 최대 15개입니다.",
    superdeal: "343×527px 배경 이미지 위에 267px 상품 카드를 14px 간격으로 배치합니다. 지정된 7개 이미지는 페이지 파일에 포함되며 배경에 맞춰 타이틀 색상이 자동 전환됩니다. 메인·서브 타이틀은 각각 한 줄, 좌우 패딩은 60px이며 상품은 최대 15개입니다.",
  };
  const detail = details[gridState.grid];
  gridLogicText.textContent = `${common} ${detail}`;
}

function renderGrid() {
  const config = gridLayouts[gridState.grid];
  if (config.serviceLocked && gridState.service !== config.serviceLocked) {
    gridState.service = config.serviceLocked;
    gridForm.elements.service.value = config.serviceLocked;
  }
  const purchaseServiceControl = gridForm.querySelector('[name="service"][value="vintage"]');
  purchaseServiceControl.disabled = Boolean(config.serviceLocked);
  document.querySelector("#gridServiceFieldset").classList.toggle("is-locked", Boolean(config.serviceLocked));
  document.querySelector("#pickControls").hidden = config.mode !== "pick";
  document.querySelector("#superdealControls").hidden = config.mode !== "superdeal";
  const effectiveService = config.serviceLocked || gridState.service;
  const serviceLabel = effectiveService === "rent" ? "렌트" : "구매";
  const cardState = { ...state, service: effectiveService, layout: config.cardLayout };
  let content = "";
  if (config.mode === "pick") {
    content = pickTemplate(cardState);
  } else if (config.mode === "superdeal") {
    content = superdealTemplate(cardState);
  } else if (config.mode === "brand-swipe") {
    content = Array.from({ length: config.itemCount }, (_, index) => brandCardTemplate(index)).join("");
  } else if (config.groupSize) {
    const cards = Array.from({ length: config.itemCount }, () => cardTemplate(cardState));
    const groups = [];
    for (let i = 0; i < cards.length; i += config.groupSize) {
      groups.push(`<div class="list-swipe-column">${cards.slice(i, i + config.groupSize).join("")}</div>`);
    }
    content = `<div class="list-swipe-track">${groups.join("")}</div>`;
  } else {
    content = Array.from({ length: config.itemCount }, () => cardTemplate(cardState)).join("");
  }
  gridPreview.innerHTML = `<section class="product-grid-template ${gridState.grid}" aria-label="${config.label} 미리보기">${content}</section>`;
  gridPreviewStage.dataset.grid = gridState.grid;
  gridCodeOutput.innerHTML = gridHighlightedCode();
  const exposure = config.visibleCount ? `${config.visibleCount} visible · ${config.itemCount} rendered` : `${config.columns} column${config.columns > 1 ? "s" : ""} · ${config.itemCount} item${config.itemCount > 1 ? "s" : ""}`;
  gridStateSummary.textContent = `${config.label} · ${serviceLabel} · ${exposure}`;
  updateGridLogic();
}

function propsObject() {
  return {
    layout: state.layout,
    service: state.service,
    brand: state.brand,
    product: state.product,
    soldOut: state.soldOut,
    heart: state.layout === "compact" ? false : state.heart,
    priceVisible: state.priceVisible,
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
  if (!v.showPrice && v.hasAnyInfo) notes.push("가격 표시를 끄면 할인율·현재 가격·이전 가격·렌트 기간을 모두 표시하지 않습니다.");
  notes.push(`${state.layout} 레이아웃은 ${layoutWidths[state.layout]}px 카드 규격을 사용합니다.`);
  if (state.layout === "1grid") notes.push("1grid는 라벨을 브랜드명 위에 배치하고 카드 외곽에 stroke를 표시합니다. 이전 가격 유무에 따라 가격 영역 간격이 달라집니다.");
  if (state.layout === "horizontal") notes.push("horizontal은 125px 이미지와 정보 영역을 가로로 배치하며, 신규 배지는 브랜드명과 같은 줄에 두고 서비스 라벨은 가격 아래에 표시합니다.");
  if (state.layout === "compact") notes.push("compact는 72px 이미지와 정보 영역을 가로로 배치하며, 찜 버튼·서비스 라벨·구매 컨디션 라벨을 사용하지 않습니다.");
  if (!v.showPrice) {
    notes.push("가격 관련 옵션과 입력값은 유지되지만 미리보기에는 적용되지 않습니다.");
  } else if (state.layout === "compact") {
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
  const noPrice = !state.priceVisible || noInfo;
  const previousPriceControl = document.querySelector('[data-option="previousPrice"]');
  previousPriceControl.classList.toggle("is-irrelevant", isCompact || state.service !== "vintage" || noPrice);
  previousPriceControl.querySelector("input").disabled = isCompact || noPrice;
  document.querySelector('[data-option="propNew"]').classList.toggle("is-irrelevant", noInfo);
  const saleControl = document.querySelector('[data-option="sale"]');
  saleControl.classList.toggle("is-irrelevant", noPrice);
  saleControl.querySelector("input").disabled = noPrice;
  document.querySelector('[data-option="priceVisible"]').classList.toggle("is-irrelevant", noInfo);
  document.querySelector('[data-option="heart"]').classList.toggle("is-irrelevant", isCompact);
  document.querySelector('[data-option="sticker"]').classList.toggle("is-irrelevant", isCompact || noInfo);
  document.querySelectorAll("[data-price-field]").forEach((label) => {
    label.classList.toggle("is-irrelevant", noPrice);
    label.querySelector("input").disabled = noPrice;
  });
}

function render() {
  preview.innerHTML = cardTemplate();
  codeOutput.innerHTML = highlightedCode();
  stage.dataset.layout = state.layout;
  document.querySelector(".measure-x span").textContent = `${layoutWidths[state.layout]} px`;
  stateSummary.textContent = `${state.layout} · ${state.service} · ${state.brand} · ${state.product}${state.priceVisible ? "" : " · no price"}${state.soldOut ? " · sold out" : ""}`;
  document.querySelector("#serviceDot").classList.toggle("vintage", state.service === "vintage");
  updateLogic();
  updateIrrelevantControls();
}

function renderActive() {
  if (activeGuide === "title") renderTitle();
  else if (activeGuide === "grid") renderGrid();
  else render();
}

function activePropsObject() {
  if (activeGuide === "title") return titlePropsObject();
  if (activeGuide === "grid") return gridPropsObject();
  return propsObject();
}

function activeRawCode() {
  if (activeGuide === "title") return titleRawCode();
  if (activeGuide === "grid") return gridRawCode();
  return rawCode();
}

function setActiveGuide(guide) {
  activeGuide = ["product", "title", "grid"].includes(guide) ? guide : "product";
  document.querySelectorAll("[data-guide-section]").forEach((section) => {
    section.hidden = section.dataset.guideSection !== activeGuide;
  });
  document.querySelectorAll("[data-guide-tab]").forEach((button) => {
    const isActive = button.dataset.guideTab === activeGuide;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  const figmaSourceLink = document.querySelector("#figmaSourceLink");
  const guideMeta = {
    product: {
      href: "https://www.figma.com/design/qvPTRPZfih4sMEBTO7AYZt/Product-Item-grid-guide?node-id=3271-12778",
      title: "Product Item · Playground",
    },
    title: {
      href: "https://www.figma.com/design/qvPTRPZfih4sMEBTO7AYZt/Product-Item-grid-guide?node-id=2899-2712",
      title: "Title Template · Playground",
    },
    grid: {
      href: "https://www.figma.com/design/qvPTRPZfih4sMEBTO7AYZt/Product-Item-grid-guide?node-id=3196-8459",
      title: "Product Grid · Playground",
    },
  };
  figmaSourceLink.href = guideMeta[activeGuide].href;
  document.title = guideMeta[activeGuide].title;
  renderActive();
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
  url.searchParams.set("guide", activeGuide);
  if (activeGuide === "grid") {
    url.searchParams.set("grid", gridState.grid);
    url.searchParams.set("service", gridState.service);
    url.searchParams.set("pickBackground", sanitizePickBackground(gridState.pickBackground));
    url.searchParams.set("superdealBackground", superdealTheme(gridState.superdealBackground).key);
    Object.entries(state).forEach(([key, value]) => url.searchParams.set(`card_${key}`, String(value)));
  } else {
    Object.entries(activePropsObject()).forEach(([key, value]) => url.searchParams.set(key, String(value)));
  }
  return url.toString();
}

function loadFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedGuide = params.get("guide");
  const guide = ["product", "title", "grid"].includes(requestedGuide) ? requestedGuide : "product";
  if (guide === "title") {
    const next = {};
    Object.keys(titleDefaults).forEach((key) => {
      if (params.has(key)) next[key] = params.get(key);
    });
    applyTitleState(next);
    setActiveGuide("title");
    return;
  }
  if (guide === "grid") {
    const nextCardState = {};
    Object.entries(defaults).forEach(([key, defaultValue]) => {
      const paramKey = `card_${key}`;
      if (!params.has(paramKey)) return;
      nextCardState[key] = typeof defaultValue === "boolean" ? params.get(paramKey) === "true" : params.get(paramKey);
    });
    applyState(nextCardState);
    const nextGrid = gridLayouts[params.get("grid")] ? params.get("grid") : gridDefaults.grid;
    const nextService = ["rent", "vintage"].includes(params.get("service")) ? params.get("service") : gridDefaults.service;
    const nextPickBackground = sanitizePickBackground(params.get("pickBackground"));
    const nextSuperdealBackground = superdealTheme(params.get("superdealBackground")).key;
    applyGridState({
      grid: nextGrid,
      service: nextService,
      pickBackground: nextPickBackground,
      superdealBackground: nextSuperdealBackground,
    });
    setActiveGuide("grid");
    return;
  }
  if (params.size) {
    const next = {};
    Object.entries(defaults).forEach(([key, defaultValue]) => {
      if (!params.has(key)) return;
      next[key] = typeof defaultValue === "boolean" ? params.get(key) === "true" : params.get(key);
    });
    applyState(next);
    if (["big", "1grid", "horizontal", "compact"].includes(next.layout)) setZoom("1");
  }
  setActiveGuide("product");
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

titleForm.addEventListener("input", () => {
  readTitleForm();
  renderTitle();
});

gridForm.addEventListener("input", () => {
  readGridForm();
  renderGrid();
});

document.querySelectorAll("[data-guide-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    setActiveGuide(button.dataset.guideTab);
    document.querySelector(".guide-nav").scrollIntoView({ behavior: "smooth", block: "start" });
  });
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
      const isActive = item.dataset.tab === activeTab;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
    renderActive();
  });
});

document.querySelector("#presetGrid").addEventListener("click", (event) => {
  const card = event.target.closest("[data-preset]");
  if (!card) return;
  applyState({ ...presets[Number(card.dataset.preset)], layout: state.layout });
  document.querySelector(".workspace").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast("프리셋을 적용했습니다.");
});

document.querySelector("#resetButton").addEventListener("click", () => {
  if (activeGuide === "title") applyTitleState(titleDefaults);
  else if (activeGuide === "grid") applyGridState(gridDefaults);
  else applyState(defaults);
  showToast("기본값으로 초기화했습니다.");
});
document.querySelector("#copyCodeButton").addEventListener("click", () => copyText(rawCode(), "코드를 복사했습니다."));
document.querySelector("#titleCopyCodeButton").addEventListener("click", () => copyText(titleRawCode(), "코드를 복사했습니다."));
document.querySelector("#gridCopyCodeButton").addEventListener("click", () => copyText(gridRawCode(), "코드를 복사했습니다."));
document.querySelector("#copyHeaderButton").addEventListener("click", () => copyText(JSON.stringify(activePropsObject(), null, 2), "Props를 복사했습니다."));
document.querySelector("#shareButton").addEventListener("click", () => copyText(stateUrl(), "현재 설정 링크를 복사했습니다."));
document.querySelector("#titleShareButton").addEventListener("click", () => copyText(stateUrl(), "현재 설정 링크를 복사했습니다."));
document.querySelector("#gridShareButton").addEventListener("click", () => copyText(stateUrl(), "현재 설정 링크를 복사했습니다."));

renderPresets();
loadFromUrl();
renderActive();
