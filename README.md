# LittleCommander

## About

A Simple bot that can interact with

## Currently Avalaile Command:

| Command                  | Description                                   |
| ------------------------ | --------------------------------------------- |
| note all                 | Reading all Notes if any note have been saved |
| note new [CONTENT]       | Insert a note and store to database           |
| note delete [DocumentID] | Deleting Note base from note ID               |
| maid clean [NUMBER]      | clearing chat in one server Channel           |

## For Development Purpose

| Command | Description                    |
| ------- | ------------------------------ |
| help    | Direct link to This Repository |
|         |                                |

## For Future Development

## Todo

- [x] Making interaction with database (Simple Create, Read, Update, Delete)
- [x] Recode the bot interaction (Bot Command)
- [x] Tiddy up the Code

## Requierments

- Node
- npm
- MongoDB

## Instalation

Make sure you run this command at same folder.

```
npm install

-> for development
npm run dev

-> for production
npm run prod
```

## Docker

Make sure you run this command at same folder.

```
docker build username/name:tag .

docker run -d --env-file ./.env <DOCKER CONTAINER ID>
```
