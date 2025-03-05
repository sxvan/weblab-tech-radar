# weblab-tech-radar

## how to run

- `git clone https://github.com/sxvan/weblab-tech-radar.git`

- `cd weblab-tech-radar/api`

- `npm i`

- edit .env (.env.example for guidance)

- `docker-compose up -d` (requires docker to be installed)

- `npx prisma migrate deploy`

- `npm run seed`

- `npm start`

- `cd ../web`

- `npm i`

- `ng serve`

## default login data

employee:
- email: user.user@gmail.com
- password: user

CTO:
- email: admin.admin@gmail.com
- password: admin
