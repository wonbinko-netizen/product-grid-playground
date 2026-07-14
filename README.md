# Product Item Grid Playground

Figma `Product Item grid guide`의 상태값을 편집 권한 없이 확인하기 위한 정적 playground입니다.

## 사용 방법

`index.html`을 브라우저에서 열면 됩니다. 별도 패키지 설치나 빌드 과정이 없습니다.

- 레이아웃(small 109px / smedium 156px / medium 163px / big 250px / 1grid 343px / horizontal 343px / compact 316px)을 같은 상태값으로 즉시 전환
- 서비스(렌트/구매), 브랜드/상품명 유무, 품절을 포함한 6개 boolean 옵션을 즉시 전환
- Figma의 실제 카드 폭 기준 1×/2× 미리보기
- Component JSX / Props JSON 복사
- 현재 조합을 쿼리 파라미터가 포함된 링크로 공유
- 자주 쓰는 6개 조합 프리셋

## 파일 구성

- `index.html`: 화면 구조와 컨트롤
- `styles.css`: 반응형 UI 및 Product Item 스타일
- `app.js`: 상태 관리, 미리보기, 코드 출력, 공유 링크
