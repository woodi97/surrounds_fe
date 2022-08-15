# Surrounds - GPS Based SNS

## What is it?

Surrounds 프론트앤드 레포지토리

## To DO

1. Social Login Kakao Hook만 완성됨(나머지는 관련 로직 완성해야합니다 - Hooks기반)
2. 5명 이상 넘어갔을때 서버로부터 수신해서 방을 나가는 로직 작성해야함

## 시작하기 전

### 사이트 설정 및 개발시 주의사항

```js
const appConfig = {
  notchColor: '#f8eee2',
  headerHeight: '3rem',
  bottomNavigationHeight: '5rem',
  sidePadding: '1rem',
  backgroundColor: '#fff8e5',
  mobileAppMaxWidth: '768px',
};
```

#### 1. src/config/appConfig.js에 있는 설정 파일을 수정해주세요.

- 해당 파일은 tailwindconfig.js, header, bottom navigtaion 등에서 사용됩니다

#### 2. 페이지를 제작할때 최상단 컴포넌트는 PageLayout으로 감싸주세요

- fixedHeight, fullWidth등을 지원하며 fixedHeight의 경우 모바일 브라우저에서도 작동합니다
- `PageLayout`으로 감싸야 Redux에서 사용자의 라우터를 관리할 수 있습니다. 또한 useBackward 훅을 통해서 이전 페이지로 옮길때 자연스러운 전환효과를 줄 수 있습니다.

#### 3. 페이지를 제작할때 PageLayout 컴포넌트를 감싼후 가장 첫번째 children중 하나로 PaseSEO 컴포넌트를 사용해주세요

- Search Engine Optimization을 할때 꼭 필요합니다

#### 4. ClientSide Rendering 및 ServerSide Rendering 관련

- Redux Toolkit + next-redux-wrapper 모듈을 통해 서버와 클라이언트간 전역 redux store가 설정되어 있습니다. 따라서 서버에서도 클라이언트에서도 각자 변경한 내용에 대해
  반영됩니다.
- 서버에서 redux store 내용이 필요할 경우 src/hocnf 폴더에 있는 withStoreSSR hof를 사용해주세요
- 서버에서 사용자 Authorization이 필요한 경우 src/hocnf 폴더에 있는 withAuthSSR hof를 사용해주세요
- 클라이언트에서 사용자 Authorization이 필요한 경우 src/hocnf 폴더에 있는 withAuthCSR hoc를 사용해주세요

#### 5. 기타 사항

- 서버와 api call을 할시 Authorization 토큰을 저장하는 곳은 axios.default.headers.common["Authorizaton"]이며 브라우저 cookie값에 jwt로
  저장됩니다(`해당부분은 백앤드 부분이 개발되면서 변경될 수 있습니다`)
- 어플리케이션과 관련된 Navigator 요소들(ex. GPS, Camera)로 부터 불러온 정보는 Redux Store에서 관리됩니다. 관련된 Hooks도 Redux Store에 Dispatch하는 형식으로
  사용됩니다

## Husky Hook 설정 방법

### precommit hook 설정

```bash
1. ./husky/pre-commit.sh에 필요한 커맨드 추가
```

### prepush hook 설정

```bash
1. ./husky/pre-push.sh에 필요한 커맨드 추가
```

### 현재 husky hook 상태

1. commit 시 build 테스트 통과 여부 확인
2. commit 시 package.json 에 설정된 lint-staged 명령어 셋 통과 여부 확인

### 현재 개발 상태

#### `발견된 문제점`

1. 브라우저의 뒤로가기 버튼에서 redux store 정보를 제대로 들고오지 못하는 문제가 있었다. 이를 해결하기 위해 history를 redux에서 관리하는 것을 포기하고 browser history api를
   사용하는
   것으로 바꾸었다

#### 활성화된 라우터

```js
const routes = ['/', '/login'];
```

#### 추가해야하는 라우터

```js
const routes = ['/chatroom'];
```
