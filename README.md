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
│   │   ├── README.md               │ << Strapi, Mongoose 
│   │   ├── api                     │ ( CMS & Database for static content )
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
│   │   ├── babel.config.js         │ ( Frontend framewwork )
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
│   │   └── models                  | ( Database for dynamic content )
│   └── tests
│       └── socketioload.yaml       │ << Artillery ( tests ) 
└── minimap.png
```
## Development

There needs to be several running processes.

### Backend

Using Strapi to create a framework-agnostic API with a draft/publish system for static content.

First, on your local device:
```
cd dev/back
npm install
```
Then, 
```
npm run develop
```

Here, you can make changes to the API, add and remove extensions, change user roles, etc... Please note, removing a property from an object could delete all the entries from the database for that object.

Then stage, commit and push your changes to your remote server.

On the remote server, the initial set up starts with the build command:
```
NODE_ENV=production npm run build
```
Then,
```
pm2 start "NODE_ENV=production npm run start" --name "API.OBFS" # name is optional
```

We are using `pm2` to manage the service. 

Strapi will run on http://localhost:1337 .

If changes have been made and pushed to the server, re-build the admin interface if necessary, and then restart the process:
```
pm2 restart API.OBFS
```

Instructions on populating the CMS, specific to this project can be found at [dev/back].

### Server

A node server is set-up with:
- Express to serve the statically generated front-end files
- SocketIO to handle real-time networking ( for the chat functions )
- Mongoose to communicate with a Mongo database dedicated only to the chat


#### Mongo

#### Express & SocketIO
#### Apache


### Frontend


### Testing


### Authors

[Karl](https://moubarak.eu), [Anja](https://anjagroten.info/)

### License 

[Creative Commons Attribution-ShareAlike 4.0](LICENSE)




