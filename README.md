### Installation on Server

Create a database with those follow configuration

```
host: 'localhost',
port: 3306,
username: 'root',
password: '12345',
database: 'schoolapp',

```
```
cd ./server/app
```

run next commands
```
yarn add
yarn run dev
```
check the server runs on PORT:3000

### Installation on Client

Confirm the .env.develoment file connection to back
```
VITE_BASE_API_URL='http://localhost:3000'
```

```
cd ./client/college-app
```

run next commands
```
yarn add
yarn dev
```

check the client runs on PORT:5173
