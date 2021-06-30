# How to use WEB Surrounds

<h1>사용법</h1>
<pre>
1. git clone repository_name
2. npm install -g yarn
3. yarn install
4. yarn dev(for dev mode) or yarn build && yarn start(for build mode)
5. Root 디렉토리에 .env.local, .env.development.local, .env.production.local 생성 후 아래와 같은 형식으로 작성

5-1. .env.local
SECRET_KEY = YOUR_SECRET_KEY
MONGODB_DB = YOUR_DB_NAME
MONGODB_URI = YOUR_DB_URI

STUN_URL = YOUR_STUN_URL
TURN_URL = YOUR_TURN_URL
TURN_USERNAME = YOUR_TURN_USERNAME
TURN_CREDENTIAL = YOUR_TURN_CREDENTIAL

NEXT_PUBLIC_MAPBOX_TOKEN = YOUR_MAPBOX_TOKEN

5-2. .env.development.local
SERVER_URL = YOUR_SERVER_URL
IMAGE_URL = YOUR_SERVER_URL/profiles/
NEXT_PUBLIC_IMAGE_URL = YOUR_SERVER_URL/profiles/

PEER_HOST = YOUR_PEER_HOST(ex.localhost)
PEER_PORT = YOUR_PEER_PORT
PEER_DEBUG = YOUR_PEER_DEBUG_OPTION
PEER_PATH = /media-chat
PEER_SECURE = YOUR_PEER_SECURE_OPTION

5-3. .env.production.local
SERVER_URL = YOUR_SERVER_URL
IMAGE_URL = YOUR_SERVER_URL/profiles/
NEXT_PUBLIC_IMAGE_URL = YOUR_SERVER_URL/profiles/

PEER_HOST = YOUR_PEER_HOST(ex.https://surrounds.herokuapp.com)
PEER_PORT = 443
PEER_DEBUG = 0
PEER_PATH = /media-chat
PEER_SERVER = true

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
    "editor.formatOnSave": true,
    // per-language
    "[javascript]": {
    "editor.formatOnSave": false
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
