# Description

This is a smiple project to pass entry test. It loads data from json to database and serves it to client. There is abiliy to generate tree-like structure from data

Description can be found at "../JS Fullstack Home Task.docx"

# Used technologies

- mongoose

- NestJS

- Honorable mentions: 
    - swagger-ui-express
    - lodash
    - eslint

# How to run

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