# UI Guide Playground

Figma `Product Item grid guide`의 상품 카드와 템플릿 상태값을 편집 권한 없이 확인하기 위한 정적 playground입니다.

## 사용 방법

`index.html`을 브라우저에서 열면 됩니다. 별도 패키지 설치나 빌드 과정이 없습니다.

GitHub Pages를 업데이트할 때는 ZIP 안의 `index.html`, `styles.css`, `app.js`, `README.md`, `assets` 폴더를 모두 저장소 최상단에 덮어써야 합니다. 일부 파일만 교체하면 화면 스타일과 클릭 기능의 버전이 맞지 않을 수 있습니다.

- 레이아웃(small 109px / smedium 156px / medium 163px / big 250px / 1grid 343px / horizontal 343px / compact 316px)을 같은 상태값으로 즉시 전환
- 서비스(렌트/구매), 브랜드/상품명 유무, 품절·가격 표시를 포함한 7개 boolean 옵션을 즉시 전환
- Figma의 실제 카드 폭 기준 1×/2× 미리보기
- Component JSX / Props JSON 복사
- 현재 조합을 쿼리 파라미터가 포함된 링크로 공유
- 자주 쓰는 6개 조합 프리셋
- 타이틀 템플릿 SHORT / BASIC / CLOCK 타입 전환
- 우측 옵션 없음 / 카운트 / 전체 보기 조합과 표시 문구 편집
- 타이틀 템플릿의 Component JSX / Props JSON 및 공유 링크 제공
- 상품 1개 / 2개 / 3개 그리드, 상품 1개 / 2개 / 3개 스와이프, 상품 리스트 / 리스트 스와이프 / 브랜드 스와이프를 375px 모바일 규격으로 전환
- 상품 카드 탭의 현재 설정을 재사용한 그리드 미리보기
- 상품 그리드의 Component JSX / Props JSON, 적용 규칙 및 공유 링크 제공

## 파일 구성

- `index.html`: 화면 구조와 컨트롤
- `styles.css`: 반응형 UI 및 Product Item·Title Template·Product Grid 스타일
- `app.js`: 상태 관리, 미리보기, 코드 출력, 공유 링크
- `assets/chevron-right.svg`: Figma에서 내보낸 전체 보기 화살표
