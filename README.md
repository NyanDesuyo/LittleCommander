# LittleCommander

## About

A Simple bot that can interact with

## Currently Avalaile Command:

### Note

| Command                  | Description                                   |
| ------------------------ | --------------------------------------------- |
| note all                 | Reading all Notes if any note have been saved |
| note new [CONTENT]       | Insert a note and store to database           |
| note delete [DocumentID] | Deleting Note base from note ID               |

### Maid

| Command             | Description                         |
| ------------------- | ----------------------------------- |
| maid clean [NUMBER] | clearing chat in one server Channel |

### Other

| Command | Description                    |
| ------- | ------------------------------ |
| help    | Direct link to This Repository |

## Requierments

- NodeJS 15.11.0
- npm 7.1.2
- MongoDB

## Instalation

Make sure you run this command at same folder.

```
npm install

-> for development
npm run dev

-> for production
npm run prod

-> linting
npm run lint
```

## Docker

Make sure you run this command at same folder.

```
docker build username/name:tag .
ex: docker build nyandesuyo/littercommander:1.0 .

docker run -d --env-file ./.env <DOCKER CONTAINER ID>
```
