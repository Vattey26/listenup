# ListenUp

A web app where teenagers can chat in writing with approved volunteers and find therapy and support services. This is a course prototype: it is not a crisis service, it uses fake data only, and it is not deployed publicly.

## Run it locally (M1 prototype)

Requires Node 22.18 or newer.

```bash
cd web
npm install
npm run api   # terminal 1: mock API on http://localhost:3000
npm run dev   # terminal 2: app on http://localhost:5173
```

## Test accounts (fake, prototype login by username only)

| Role | Username |
|---|---|
| Member | member_01 |
| Volunteer (approved) | volunteer_01 |
| Volunteer (not approved) | volunteer_02 |
| Admin | admin_01 |

## See the four states

- Loading: run `npx json-server --watch mock/db.json --port 3000 --delay 1500` and open /providers
- Error: stop `npm run api` and reload /providers
- Empty: type nonsense in the provider search box
- Success: the normal list