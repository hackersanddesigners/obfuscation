# Obfuscation Platframe

Website (platform, platframe, tool convergence, realm, etc...) for the 3rd Workshop on Obfuscation.

-> https://3rd.obfuscationworkshop.org/ <-

![](minimap.png)
## Introduction

This project brings together Strapi, VueJS, SocketIO, and some parts of Big Blue Button to leverage an obfuscated yet accessible platform for the 3rd Workshop on Obfuscation, which took place on May 4 & 7, 2021.

## Project Structure

```
# some files ommitted
├── LICENSE
├── README.md
├── dev
│   ├── package-lock.json
│   ├── package.json
│   ├── node_modules
│   ├── back
│   │   ├── README.md               │ << Strapi 
│   │   ├── api                     │ Database for static content
│   │   ├── build                   │   
│   │   ├── components              │
│   │   ├── config                  │
│   │   ├── extensions              │
│   │   ├── favicon.ico             │
│   │   ├── node_modules            │
│   │   ├── package-lock.json       │
│   │   ├── package.json            │
│   │   └── public                  │
│   ├── front
│   │   ├── README.md               │ << VueJS
│   │   ├── babel.config.js         │ Frontend framewwork
│   │   ├── dist                    │
│   │   ├── logs                    │
│   │   ├── node_modules            │
│   │   ├── package-lock.json       │
│   │   ├── package.json            │
│   │   ├── public                  │
│   │   ├── src                     │
│   │   └── vue.config.js           │
│   ├── server
│   │   ├── index.js                │ << Express, SocketIO, Mongoose
│   │   └── models                  | Database for dynamic content
│   └── tests
│       └── socketioload.yaml       │ << Artillery ( tests ) 
└── minimap.png
```
## Development


### Server

#### Mongo

#### Express & SocketIO
#### Apache

### Backend

### Frontend


### Testing


### Authors

[Karl](https://moubarak.eu), [Anja](https://anjagroten.info/)

### License 

[Creative Commons Attribution-ShareAlike 4.0](LICENSE)




