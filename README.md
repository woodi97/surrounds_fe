# How to use WEB Surrounds

<h1>사용법</h1>
<pre>
1.git clone repository_name
2.npm install -g yarn
3.yarn install
4.yarn dev(for dev mode) or yarn build && yarn start(for build mode)
5.root 디렉토리에 config.js 생성 후 아래와 같은 형식으로 작성
const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }, {urls:"url", "username":"username", "credential":"credential"}] };
module.exports = {
    peerConfig : {
        // for deployment enable below
        host: "localhost",
        port: 3000
        // for local test enable below
        // host: "serverURL",
        // port: 443
        path: "/media-chat",
        config,
        // deploy to aws or herokuapp enable secure:true option
        // secure: true,
    },
    apiConfig : {
        // baseURL: "https://serverURL",
		baseURL: "http://localhost:3000",
    }
}
</pre>

<h1>코드 작성전 유의사항</h1>
<pre>
1. vscode 설치
2. vscode market에서 prettier 설치
3. vscode market에서 eslint 설치
4. git flow 사용중
5. git flow feature start "기능이름"
6. git flow feature finish "기능이름"
7. 단 develop 브랜치 pull은 주기적으로 할 것
</pre>

<h1>저장할때마다 코드 자동 prettieerc & eslintrc 적용하는 방법</h1>
<pre>
1. VS Code에서 settings.json파일을 들어간다(윈도우, 리눅스에서는 Ctrl + ,, 맥에서는 Cmd + , 를 누르고 오른쪽 위에 작은 문서 아이콘 누르면 settings.json 볼 수 있음)
2. 아래 내용을 붙여넣기
{
    // Set the default
    "editor.formatOnSave": false,
    // Enable per-language
    "[javascript]": {
    "editor.formatOnSave": true
    },
    "editor.codeActionsOnSave": {
    // For ESLint
    "source.fixAll.eslint": true
    }
}
</pre>

<h1>POSTMAN 테스트 방법</h1>
<pre>
1. postman을 설치한다
2. My Workspace 오른쪽에 New/Import 버트중에 Import를 누른다
3. 위에 File/Folder/Link/Raw text/Code Repository중에 Link를 누른다
4. https://www.getpostman.com/collections/4cf4b9b5ce30cc7a14e0 해당 링크를 붙여넣는다
5. import를 완료한다
</pre>
