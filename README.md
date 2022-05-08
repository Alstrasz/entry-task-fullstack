# Description

This is a smiple project to pass entry test. It loads data from json to database and serves it to client. There is abiliy to generate tree-like structure from data

Description can be found at "./JS Fullstack Home Task.docx"

# Used technologies

- Mongodb used as database

- NestJS used as backend framework

- Angular used as frontend framework

- Honorable mentions: 
    - swagger-ui-express
    - lodash
    - eslint

# How to run

## With docker compose

From project's root folder:

- ```docker-compose up``` (can take a long time first time due to downloading of images and libraries)

Client will be available at http://127.0.0.1:3000

Swagger will be available at http://127.0.0.1:3000/api

## With node

Requiers mongodb to be launched

From ./entry-task-fullstack-nest
- ```npm i```
- ```npm start```

Supported env variables: 
- PORT - port to be served at. Example: 8080
- HOST - host to be served at. Example: 0.0.0.0
- MONGO_URI - mongodb url(with credentials). Example: mongodb://mongodb:27017

Swagger available at /api endpoint

Index served at / endpoint