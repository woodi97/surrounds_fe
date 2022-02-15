# Voicechat SNS Surrounds

## How to use

```bash
1. git clone repository_name
2. npm install -g yarn
3. yarn install
4. yarn postinstall(resolve peerjs issue)
5. yarn dev(for dev mode) or yarn build && yarn start(for build mode)
6. cp .env.example .env.local
7. deploy!
```

## Caution before deploy to Heroku

`should open 443 port before deploy`

```bash:.env
PEER_HOST =
PEER_PORT = 443
PEER_DEBUG = 0
PEER_PATH = /peer
PEER_SERVER = true
```

## 코드 작성전 유의사항

```bash
1. vscode 설치
2. vscode market에서 prettier 설치
3. vscode market에서 eslint 설치
4. git flow 사용중
5. git flow feature start "기능이름"
6. git flow feature finish "기능이름"
7. 단 develop 브랜치 pull은 주기적으로 할 것
```

## 저장할때마다 코드 자동 prettieerc & eslintrc 적용하는 방법

```bash
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
```

## `If you need https on localhost env`

````bash
1. openssl req -x509 -out localhost.crt -keyout localhost.key \
  -days 365 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
2. change to 'secure' branch
3. write your code
4. rebase to develop branch

## POSTMAN 테스트 방법

```bash
1. postman을 설치한다
2. My Workspace 오른쪽에 New/Import 버트중에 Import를 누른다
3. 위에 File/Folder/Link/Raw text/Code Repository중에 Link를 누른다
4. https://www.getpostman.com/collections/4cf4b9b5ce30cc7a14e0 해당 링크를 붙여넣는다
5. import를 완료한다
````
